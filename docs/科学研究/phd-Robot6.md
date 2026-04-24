---
title: 机器人研究(二)
date: 2020-03-06 21:40:33
categories: 技术博客
tags:
    - IT,Web
toc: true
thumbnail:
---

<!--more-->

## Jax

https://www.aidoczh.com/jax/jep/9419-jax-versioning.html

PyTorch很好用，然而并不擅长处理大规模训练大模型。在高性能训练领域，JAX是很流行的一套框架。然而，**熟悉PyTorch的用户，在初次看到JAX代码时，经常容易一头雾水**，不知道代码在做什么、不知道代码为什么要这样写。本文将从框架设计API的角度理解JAX的API，并且介绍它与PyTorch相关API的转换。有了这些概念之后，我们就能比较轻松地看懂JAX的代码，能够在PyTorch与JAX之间自由切换了

PyTorch的`nn.Module`相关API广受欢迎，就是因为它捕捉了深度学习模型训练过程中的核心步骤。概括来说，PyTorch里面有六个核心API：

```text
model = Model(arg_model) # 1. 模型初始化

opt = Optimizer(arg_opt, model.parameters()) # 2. 优化器初始化

y = model(x) # 3. 模型计算

loss = loss_f(y, target) # 4. 损失函数计算

loss.backward() # 5. 反向传播

opt.step() # 6. 优化器更新参数
```

JAX的核心思想是函数式编程，一个函数必须是纯函数：计算输出结果时只能使用函数参数里面的数据，不能使用函数以外的数据。这样的纯函数也叫做**无状态函数**。具体到神经网络的训练过程，就是说**一个函数只能使用函数参数及内部创建的张量，不能使用函数外部的张量**。

从PyTorch走向JAX的核心问题，就是搞清楚每一个函数调用中有哪些状态，并且把这些状态变成新的函数参数

**1. 模型初始化**

用户调用模型初始化代码`model = Model(arg_model)`后，变量`model`里面存储着模型的参数值等状态。因此，这段代码在JAX里面应该写成`model, params = Model(arg_model)`。考虑到大家习惯写`model = Model(arg_model)`，于是我们可以拆成`model = Model(arg_model); params = model.init()`。这里的`Model`一般是`flax`，JAX的神经网络模块库。

特别声明，有一类重要的状态叫做随机数种子，在PyTorch里面随机数种子是全局共享的，而在JAX里面没有真正的随机函数，必须明确地为生成随机数的函数指定随机数种子。由于模型初始化过程经常涉及到生成随机数，因此模型参数初始化的步骤应该写成`params = model.init(key)`。这个`key`就是随机数种子

**2. 优化器初始化**

用户调用优化器初始化代码`opt = Optimizer(arg_opt, model.parameters())`后，变量`opt`里面存储着梯度的冲量等状态。所以这段代码应该写成`opt = Optimizer(arg_opt); state = opt.init(params)`。注意，优化器状态初始化一般没有随机数，因此这里的`init`不用传入key。

**3. 模型计算**

用户调用代码`y = model(x)`，而其中`model`里面包含状态。上面模型初始化的时候我们已经把状态抽离出来了，于是JAX里面这段代码对应于`y = model.apply(params, x)`。

**4. 损失函数计算**

这一步即使在PyTorch里也是不包含状态的，因此可以直接沿用：`loss = loss_f(y, target)`

**5. 反向传播**

这一步在PyTorch里面由`loss.backward()`完成。这一步的函数化比较困难，我们首先分析这一步使用了什么状态、产生了什么状态：

- `loss.backaward()`实际上依赖于之前计算`y = model.apply(params, x)`时保留的计算图，计算图的输入就是`params`与`x`。
- `loss.backaward()`计算结束之后，会生成参数的梯度。这部分虽然在PyTorch里面没有写出来，但是也是计算结果。

因此，JAX里面的反向传播函数应该长这样：输入`params`与`x`，输出与`params`对应的梯度。由于深度学习框架都是自动微分的，用户只需要写损失函数计算即可，为了把损失函数计算的接口暴露给用户，我们就需要一个函数的函数：

```text
# 概念上jax.grad函数的实现方式
def grad(loss_func, params, x):
    loss = loss_func(params, x)
    grads = loss.backward()
    return grads
```

这差不多就是`jax.grad`的用法了。我们再对它进行一些包装、加一些语法糖，让用户好用一些，并且让用户能够拿到计算得到的`loss`值，最后用户用起来就是这个样子

```text
def loss_func(params, x, target):
    y = model.apply(params, x)
    return loss_f(y, target)
loss, grads = jax.value_and_grad(loss_func)(params, x, target)
```

**6. 优化器更新参数**

这一步在PyTorch里面由`opt.step()`完成。从函数式编程的角度，我们同样需要分析它改变了什么、产生了什么。不难分析得到，这一步的输入为参数、参数的梯度、优化器的状态，输出为新的参数、新的优化器状态。也就是说，JAX里面的优化器更新大概是`opt_state, params = opt.step(grads, opt_state, params)`。

实际上，JAX为了让优化器相关的操作可以级联，将这个函数拆成了两步：`updates, opt_state = opt.update(grads, opt_state); params = optax.apply_updates(params, updates)`。这里的`optax`是JAX的优化器的库。

至此，我们已经将PyTorch的核心API都转换成了JAX的API，并且能够一一对应。只要能实现六个核心函数，我们就可以灵活地切换到PyTorch或者JAX

### 分布式数组

创建一个分布式数组

```python
from jax.sharding import PartitionSpec as P, NamedSharding

# Create a Sharding object to distribute a value across devices:
mesh = jax.make_mesh((4, 2), ('x', 'y'))

# Create an array of random values:
x = jax.random.normal(jax.random.key(0), (8192, 8192))
# and use jax.device_put to distribute it across devices:
y = jax.device_put(x, NamedSharding(mesh, P('x', 'y')))
jax.debug.visualize_array_sharding(y)

z = jnp.sin(y)
jax.debug.visualize_array_sharding(z)

# `x` is present on a single device
%timeit -n 5 -r 5 jnp.sin(x).block_until_ready()
```

pmap

```python
import jax
from jax import pmap, numpy as jnp

key = jax.random.PRNGKey(0)

# 定义一个函数，做向量点积
def f(x, y):
    return jnp.dot(x, y)

# 创建两个向量x, y
key, init_key1, init_key2 = jax.random.split(key, 3)
x = jax.random.normal(init_key1, (10, ))
y = jax.random.normal(init_key2, (10, ))

x.shape, y.shape
# ((10,), (10,))

# 使用pmap得到并行版本的f，并且是跨device执行哦
p_f = pmap(f)

# 注意：此时p_f的输入x和y的shape不再是向量了，而是增加了一个维度，(N, 10)
# N的值由硬件环境决定，N <= device数量
# 比如我在TPU v3-8上执行这段代码，则N的取值范围是N <=8
key, init_key1, init_key2 = jax.random.split(key, 3)
xs = jax.random.normal(init_key1, (jax.local_device_count(), 10))
ys = jax.random.normal(init_key2, (jax.local_device_count(), 10))
xs.shape, ys.shape
# ((8, 10), (8, 10))

p_f(xs, ys)
# ShardedDeviceArray([-0.2600838 ,  4.726631  ,  3.7643652 ,  1.5107703 ,
                    -0.64313316, -1.0984898 , -1.3667903 ,  6.053646  ],                   dtype=float32)

# 由于xs和ys的shape都是(8, 10)，在执行时，每个device中的local xs和local ys的shape都是
# (1, 10)
# 我们来验证下：
jnp.dot(xs[0], ys[0])  # 看下计算结果，是p_f(xs, ys)的第一个值
# DeviceArray(-0.2600838, dtype=float32)

jnp.dot(xs[1], ys[1])  # 再看下计算结果，是p_f(xs, ys)的第二个值
# DeviceArray(4.726631, dtype=float32)
```

上面的例子虽然简单，但是已经足够说明了`pmap`的作用，自动对函数输入数据进行分片 (partition/shard)，每个device拿到一个独立的[分片](https://zhida.zhihu.com/search?content_id=209099859&content_type=Article&match_order=2&q=分片&zhida_source=entity)数据进行计算。不过这样还不能实现数据并行，因为缺少对各个device上的梯度进行AllReduce的操作，`jax.lax`中提供了必备的[集合通信 (collective communication) 函数](https://link.zhihu.com/?target=https%3A//docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/collectives.html)来进行跨设备数据计算: `pmean`、`psum`、`all_gather`、`all_to_all`等等

```python
def mean_f(x, y):
    z = jnp.dot(x, y)
    return jax.lax.pmean(z, axis_name="batch")   # pmean，计算所有device中数据的均值(all-reduce mean)

p_mean_f = pmap(mean_f, axis_name="batch")  # 注意axis_name

key, init_key1, init_key2 = jax.random.split(key, 3)
xs = jax.random.normal(init_key1, (jax.local_device_count(), 10))
ys = jax.random.normal(init_key2, (jax.local_device_count(), 10))
p_mean_f(xs, ys)
# ShardedDeviceArray([-0.568686, -0.568686, -0.568686, -0.568686, -0.568686,
                    -0.568686, -0.568686, -0.568686], dtype=float32)

```





### API

JAX 的转换和编译设计为仅适用于函数式纯粹的 Python 函数：所有输入数据都通过函数参数传递，所有结果都通过函数结果输出。一个纯函数在用相同的输入调用时，总是会返回相同的结果

除了用于操作数组的函数外，JAX 还包含许多用于操作 JAX 函数的 [变换](https://jax.net.cn/en/latest/glossary.html#term-transformation)。这些变换包括：

- [`jax.jit()`](https://jax.net.cn/en/latest/_autosummary/jax.jit.html#jax.jit)：即时 (JIT) 编译；请参阅 [即时编译](https://jax.net.cn/en/latest/jit-compilation.html#jit-compilation)
- [`jax.vmap()`](https://jax.net.cn/en/latest/_autosummary/jax.vmap.html#jax.vmap)：向量化变换；请参阅 [自动向量化](https://jax.net.cn/en/latest/automatic-vectorization.html#automatic-vectorization)
- [`jax.grad()`](https://jax.net.cn/en/latest/_autosummary/jax.grad.html#jax.grad)：梯度变换；请参阅 [自动微分](https://jax.net.cn/en/latest/automatic-differentiation.html#automatic-differentiation)

jax.**jit**(*fun*, */*, ***, *in_shardings=UnspecifiedValue*, *out_shardings=UnspecifiedValue*, *static_argnums=None*, *static_argnames=None*, *donate_argnums=None*, *donate_argnames=None*, *keep_unused=False*, *device=None*, *backend=None*, *inline=False*, *abstracted_axes=None*, *compiler_options=None*)[[源码\]](https://github.com/jax-ml/jax/blob/main/jax/_src/api.py#L173-L320)

- **fun** (*Callable*) –

  要进行 jit 编译的函数。`fun` 必须是一个纯函数。

  `fun` 的参数和返回值应该是数组、标量，或者是它们的（嵌套的）标准 Python 容器（元组/列表/字典）。由 `static_argnums` 指定的位置参数可以是任何可哈希的类型。静态参数被包含在编译缓存键中，因此必须定义哈希和相等运算符。JAX 会保留 `fun` 的弱引用，用于作为编译缓存键，因此 `fun` 对象必须是可弱引用的。

- **in_shardings** (*Any*) – 可选，一个 `Sharding` 或带有 `Sharding` 叶子节点的 Pytree，其结构是 `fun` 的位置参数元组的前缀。如果提供了 `in_shardings`，传递给 `fun` 的位置参数必须具有与 `in_shardings` 兼容的分片，否则会引发错误，并且编译后的计算将具有对应于 `in_shardings` 的输入分片。如果未提供，则编译后的计算的输入分片将从参数分片中推断。

- **out_shardings** (*Any*) – 可选，一个 `Sharding` 或带有 `Sharding` 叶子节点的 Pytree，其结构是 `fun` 输出的前缀。如果提供了 `out_shardings`，其效果与在 `fun` 的输出上应用相应的 `jax.lax.with_sharding_constraint`s 相同。`

- **static_argnums** ([*int*](https://docs.pythonlang.cn/3/library/functions.html#int) *|* *Sequence**[*[*int*](https://docs.pythonlang.cn/3/library/functions.html#int)*]* *|* *None*) –

  可选，一个整数或一组整数，用于指定哪些位置参数应被视为静态（追踪和编译时常量）。

  静态参数应该是可哈希的，意味着 `__hash__` 和 `__eq__` 已实现，并且是不可变的。否则，它们可以是任意 Python 对象。使用不同的常量值调用 jit 编译的函数将触发重新编译。必须将非数组类或其容器的参数标记为静态。

  如果未提供 `static_argnums` 或 `static_argnames`，则没有参数被视为静态。如果未提供 `static_argnums` 但提供了 `static_argnames`（反之亦然），JAX 将使用 `inspect.signature(fun)` 来查找与 `static_argnames`（或反之）对应的任何位置参数。如果同时提供了 `static_argnums` 和 `static_argnames`，则不使用 `inspect.signature`，只有在 `static_argnums` 或 `static_argnames` 中列出的实际参数才会被视为静态。

- **static_argnames** ([*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str) *|* *Iterable**[*[*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str)*]* *|* *None*) – 可选，一个字符串或字符串集合，用于指定哪些命名参数应被视为静态（编译时常量）。有关详细信息，请参阅 `static_argnums` 的注释。如果未提供但设置了 `static_argnums`，则默认值基于调用 `inspect.signature(fun)` 来查找对应的命名参数。

- **donate_argnums** ([*int*](https://docs.pythonlang.cn/3/library/functions.html#int) *|* *Sequence**[*[*int*](https://docs.pythonlang.cn/3/library/functions.html#int)*]* *|* *None*) –

  可选，一组整数，用于指定哪些位置参数缓冲区可以在计算过程中被覆盖并标记为在调用者中删除。如果您在计算开始后不再需要参数缓冲区，将其捐赠是安全的。在某些情况下，XLA 可以利用捐赠的缓冲区来减少执行计算所需的内存量，例如回收您的一个输入缓冲区来存储结果。您不应该重复使用您捐赠给计算的缓冲区；如果您尝试这样做，JAX 会引发错误。默认情况下，不捐赠任何参数缓冲区。

  如果未提供 `donate_argnums` 或 `donate_argnames`，则不捐赠任何参数。如果未提供 `donate_argnums` 但提供了 `donate_argnames`（反之亦然），JAX 将使用 `inspect.signature(fun)` 来查找与 `donate_argnames`（或反之）对应的任何位置参数。如果同时提供了 `donate_argnums` 和 `donate_argnames`，则不使用 `inspect.signature`，只有在 `donate_argnums` 或 `donate_argnames` 中列出的实际参数才会被捐赠。

  有关缓冲区捐赠的更多详细信息，请参阅 [FAQ](https://jax.net.cn/en/latest/faq.html#buffer-donation)。

- **donate_argnames** ([*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str) *|* *Iterable**[*[*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str)*]* *|* *None*) – 可选，一个字符串或字符串集合，用于指定哪些命名参数被捐赠给计算。有关详细信息，请参阅 `donate_argnums` 的注释。如果未提供但设置了 `donate_argnums`，则默认值基于调用 `inspect.signature(fun)` 来查找对应的命名参数。

- **keep_unused** ([*bool*](https://docs.pythonlang.cn/3/library/functions.html#bool)) – 可选布尔值。如果为 False（默认值），JAX 确定 fun 未使用的参数*可能*会被从生成的编译后的 XLA 可执行文件中删除。这些参数不会传输到设备，也不会提供给底层可执行文件。如果为 True，则不会修剪未使用的参数。

- **device** (*xc.Device* *|* *None*) – 这是一个实验性功能，API 可能会发生变化。可选，jit 编译的函数将运行的设备。(可通过 [`jax.devices()`](https://jax.net.cn/en/latest/_autosummary/jax.devices.html#jax.devices) 检索可用设备。) 默认值继承自 XLA 的 DeviceAssignment 逻辑，通常是使用 `jax.devices()[0]`。

- **backend** ([*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str) *|* *None*) – 这是一个实验性功能，API 可能会发生变化。可选，一个字符串，表示 XLA 后端：`'cpu'`、`'gpu'` 或 `'tpu'`。

- **inline** ([*bool*](https://docs.pythonlang.cn/3/library/functions.html#bool)) – 可选布尔值。指定此函数是否应内联到外层的 jaxprs 中。默认为 False。

- **abstracted_axes** (*Any* *|* *None*)

- **compiler_options** ([*dict*](https://docs.pythonlang.cn/3/library/stdtypes.html#dict)*[*[*str*](https://docs.pythonlang.cn/3/library/stdtypes.html#str)*,* *Any**]* *|* *None*)



使用 `vmap()` 进行自动矢量化

JAX 的 API 中还有一种转换可能会让你觉得有用：`vmap()`，即矢量化映射。它具有我们熟悉的沿着数组轴映射函数的语义，但它并没有将循环保留在外部，而是将循环下推到函数的原始操作中，以获得更好的性能。当与 `jit()` 一起使用时，它的速度与手工添加批次维度一样快



您可以使用 [`jax.grad()`](https://jax.net.cn/en/latest/_autosummary/jax.grad.html#jax.grad) 变换来微分一个标量值函数。

```python
import jax
import jax.numpy as jnp
from jax import grad

grad_tanh = grad(jnp.tanh)
print(grad_tanh(2.0))
```

### sharding

要在多个设备上并行计算，我们首先必须将输入数据布局到多个设备上。

在 JAX 中，`Sharding` 对象描述分布式内存布局。它们可以与 `jax.device_put` 一起使用，以生成具有分布式布局的值

`jax.debug.visualize_array_sharding` 函数来显示值 `x` 存储在内存中的位置。所有 `x` 都存储在单个设备上，因此可视化非常无聊！

但是，我们可以通过使用 `jax.device_put` 和 `Sharding` 对象将 `x` 分片到多个设备上。首先，我们使用 `jax.make_mesh` 创建一个 `Devices` 的 `numpy.ndarray`，它会考虑 `Device` 顺序的硬件拓扑

```python
from jax.sharding import Mesh, PartitionSpec, NamedSharding

P = PartitionSpec

mesh = jax.make_mesh((4, 2), ('a', 'b'))
y = jax.device_put(x, NamedSharding(mesh, P('a', 'b')))
jax.debug.visualize_array_sharding(y)
```

- *class* jax.sharding.**Sharding**(**args*, ***kwargs*)

  描述一个 [`jax.Array`](https://jax.net.cn/en/latest/_autosummary/jax.Array.html#jax.Array) 如何跨设备布局

- *class* jax.sharding.**SingleDeviceSharding**(**args*, ***kwargs*)

  Bases: [`Sharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Sharding)一个将数据放置在单个设备上的 [`Sharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Sharding)。

- *class* jax.sharding.**NamedSharding**(**args*, ***kwargs*)

  Bases: [`Sharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Sharding)[`NamedSharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.NamedSharding) 使用命名轴（named axes）表达分片。一个 [`NamedSharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.NamedSharding) 是一个设备 [`Mesh`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Mesh) 和 [`PartitionSpec`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.PartitionSpec) 的组合，它描述了如何在该 mesh 上分片一个数组。一个 [`Mesh`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Mesh) 是一个 JAX 设备的（多维）NumPy 数组，其中 mesh 的每个轴都有一个名称，例如 `'x'` 或 `'y'`。一个 [`PartitionSpec`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.PartitionSpec) 是一个元组，其元素可以是 `None`、一个字符串或一个字符串元组。每个元素描述一个输入维度如何跨零个或多个 mesh 维度进行分区。例如，`PartitionSpec('x', 'y')` 表示数据的第一个维度在 mesh 的 `x` 轴上分片，第二个维度在 mesh 的 `y` 轴上分片。有关 [`Mesh`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Mesh) 和 [`PartitionSpec`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.PartitionSpec) 用法的更多详细信息和图示，请参阅 [分布式数组和自动并行化](https://jax.net.cn/en/latest/notebooks/Distributed_arrays_and_automatic_parallelization.html) 和 [显式分片](https://jax.net.cn/en/latest/notebooks/explicit-sharding.html) 教程

- *class* jax.sharding.**PmapSharding**(**args*, ***kwargs*)

  Bases: [`Sharding`](https://jax.net.cn/en/latest/jax.sharding.html#jax.sharding.Sharding)描述 [`jax.pmap()`](https://jax.net.cn/en/latest/_autosummary/jax.pmap.html#jax.pmap) 使用的分片

- *class* jax.sharding.**PartitionSpec**(**args*, ***kwargs*)

  描述如何跨设备 mesh 对数组进行分区的元组

- *class* jax.sharding.**Mesh**(*devices*, *axis_names*, *axis_types=None*)[[source\]](https://github.com/jax-ml/jax/blob/main/jax/_src/mesh.py#L219-L446)

  声明此管理器作用域内可用的硬件资源。请参阅 [分布式数组和自动并行化](https://jax.net.cn/en/latest/notebooks/Distributed_arrays_and_automatic_parallelization.html) 和 [显式分片](https://jax.net.cn/en/latest/notebooks/explicit-sharding.html) 教程

通过分片输入数据，编译器可以为我们提供并行计算。特别是，用 `jax.jit` 装饰的函数可以在不将数据复制到单个设备的情况下操作分片数组。相反，计算遵循分片：基于输入数据的分片，编译器会决定中间值和输出值的分片，并并行化它们的评估，甚至在必要时插入通信操作。



### pytree

Pytree 是一个由类容器 Python 对象构建的容器状结构——“叶子” Pytree 和/或更多的 Pytree。Pytree 可以包含列表、元组和字典。叶子是任何不是 Pytree 的东西，例如数组，但单个叶子也是一个 Pytree。

在机器学习（ML）的上下文中，Pytree 可以包含

- 模型参数
- 数据集条目
- 强化学习代理的观察

在使用数据集时，您经常会遇到 Pytrees（例如，字典的列表的列表）

```python
import jax
import jax.numpy as jnp

example_trees = [
    [1, 'a', object()],
    (1, (2, 3), ()),
    [1, {'k1': 2, 'k2': (3, 4)}, 5],
    {'a': 2, 'b': (2, 3)},
    jnp.array([1, 2, 3]),
]

# Print how many leaves the pytrees have.
for pytree in example_trees:
  # This `jax.tree.leaves()` method extracts the flattened leaves from the pytrees.
  leaves = jax.tree.leaves(pytree)
  print(f"{repr(pytree):<45} has {len(leaves)} leaves: {leaves}")
```







### jaxlib

我们以两个独立的Python轮子发布JAX，即 `jax`，这是一个纯Python轮子，以及 `jaxlib`，这是一个主要由C++编写的轮子，包含以下库：

- XLA,
- XLA 使用的 LLVM 组件，
- MLIR 基础设施，例如 StableHLO Python 绑定。
- 用于快速JIT和PyTree操作的JAX特定C++库

我们分发独立的 `jax` 和 `jaxlib` 包，因为这使得在不构建 C++ 代码或甚至不安装 C++ 工具链的情况下，也能轻松处理 JAX 的 Python 部分。`jaxlib` 是一个大型库，对许多用户来说不容易构建，但大多数对 JAX 的更改只涉及 Python 代码。通过允许 Python 部分独立于 C++ 部分更新，我们提高了 Python 更改的开发速度。

此外，`jaxlib` 的构建成本不低，但我们希望能够在 CPU 资源不多的环境中迭代和运行 JAX 测试，例如在 Github Actions 或笔记本电脑上。我们的许多 CI 构建只是使用预构建的 `jaxlib`，而不是需要在每个 PR 上重新构建 JAX 的 C++ 部分。

正如我们将看到的，单独分发 `jax` 和 `jaxlib` 是有代价的，因为这要求对 `jaxlib` 的更改保持向后兼容的 API。然而，我们认为总体上更容易进行 Python 更改是可取的，即使这使得 C++ 更改稍微困难一些





### flax

flax是基于jax生态的神经网络框架: 类似于[pytorch](https://zhida.zhihu.com/search?content_id=240577506&content_type=Article&match_order=1&q=pytorch&zhida_source=entity) or [tensorflow](https://zhida.zhihu.com/search?content_id=240577506&content_type=Article&match_order=1&q=tensorflow&zhida_source=entity)。
可以看到越来越多fancy的项目中，如蛋白质结构预测，强化学习，量化交易,还有各类GPT项目采用flax的神经网络框架。flax相对于这两者的优势:

1. 计算效率(computational efficiency):相比pytorch, tensorflow, flax在计算效率上有着诸多的优势。
2. 可移植性:基于jax的框架可以很容易迁移至如GPU,TPU和其他类型的设备中。
3. 可复现性(reproducibility): 前面我们介绍了jax中的随机数生成与状态机制，在jax中我们需要显式地定义随机变量的状态(states), 使得基于jax与flax的神经网络项目在不现的设备可以更好地复现。

https://zhuanlan.zhihu.com/p/686013120

https://jax.net.cn/en/latest/index.html

https://flax.jax.net.cn/en/latest/key_concepts.html

Flax 是一个**神经网络工具包**，为模型开发者提供了方便的高级抽象，例如：

- **面向对象的 `Module` 类**，用于表示层/模型和记录参数。
- **建模工具**，如随机数处理、模型遍历和修改、优化器、高级参数记录、分片注解等。
- **一些内置的常用**层、初始化器和模型示例。

以下面的例子为例：一个 Flax 层 `Linear`，在初始化期间，接收一个 RNG 密钥并自动将所有内部参数初始化为 `jax.Array`。在前向传播中，它通过 JAX API 执行完全相同的计算

一个 pytree *包含* JAX 数组，但一个 pytree *不仅仅是*它的 JAX 数组。例如，一个字典保留了每个数组的键等信息，并且它可能包含非 JAX 数组的条目。从 JAX 的角度来看，所有数据都属于以下两种类型之一：

- **被追踪的**（“动态”）数据：JAX 会在编译期间追踪它们，并优化对它们的操作。如果它们位于一个 pytree 参数内部，`jax.tree.flatten` 必须将它们作为叶子节点返回。它们必须是数据值（`jax.Array`、Numpy 数组、标量等），并实现 `__eq__` 和 `__hash__` 等基本功能。
- **“静态”**数据：它们是简单的 Python 对象，不会被 JAX 追踪。

在实践中，您会希望控制哪些数据是动态的，哪些是静态的。动态数据及其计算将由 JAX 优化，但您不能根据其值来决定代码的控制流。像字符串这样的非数据值必须保持静态



#### NNX

2024 年，Flax 团队开发了 Flax NNX——它试图保留 Flax Linen 对用户有用的特性，同时引入一些新原则。Flax NNX 背后的核心思想是将引用语义引入 JAX。以下是其主要特性：

- **NNX 符合 Python 风格**：模块遵循常规的 Python 语义，包括支持可变性和共享引用。
- **NNX 很简单**：Flax Linen 中的许多复杂 API 要么使用 Python 惯用法进行了简化，要么被完全移除。
- **更好的 JAX 集成**：自定义的 NNX 变换采用与 JAX 变换相同的 API

通过子类化 `nnx.Module`，使用 Flax NNX 创建一个用于分类的 CNN

```python
from flax import nnx  # The Flax NNX API.
from functools import partial

class CNN(nnx.Module):
  """A simple CNN model."""

  def __init__(self, *, rngs: nnx.Rngs):
    self.conv1 = nnx.Conv(1, 32, kernel_size=(3, 3), rngs=rngs)
    self.conv2 = nnx.Conv(32, 64, kernel_size=(3, 3), rngs=rngs)
    self.avg_pool = partial(nnx.avg_pool, window_shape=(2, 2), strides=(2, 2))
    self.linear1 = nnx.Linear(3136, 256, rngs=rngs)
    self.linear2 = nnx.Linear(256, 10, rngs=rngs)

  def __call__(self, x):
    x = self.avg_pool(nnx.relu(self.conv1(x)))
    x = self.avg_pool(nnx.relu(self.conv2(x)))
    x = x.reshape(x.shape[0], -1)  # flatten
    x = nnx.relu(self.linear1(x))
    x = self.linear2(x)
    return x

# Instantiate the model.
model = CNN(rngs=nnx.Rngs(0))
# Visualize it.
nnx.display(model)
```





### [optax](https://github.com/google-deepmind/optax)



### openxla

https://github.com/openxla/xla

XLA中提供了三种Scheduler：

- ListMemoryScheduler
- PostOrderMemoryScheduler
- DFSMemoryScheduler





### 版本

0.6.0 开始使用cuda 12.8构建



### 性能优化

长循环的融合利器Scan

```python
from jax import lax  

def rnn_cell(carry, x):  
    h = carry  
    h = jnp.tanh(W_hh @ h + W_xh @ x + b)  
    y = W_hy @ h  
    return h, y  # (carry, output)  

def rnn_forward(h0, xs):  
    hT, ys = lax.scan(rnn_cell, h0, xs)  # xs: [T, B, D]  
     return hT, ys
```

批次大了TPU/GPU的FLOP利用率往往更高

```python
 from jax import remat  

def block(params, x):  
    x = jax.nn.gelu(x @ params['w1'])  
    x = x @ params['w2']  
    return x  

fast_block = remat(block)  # checkpointed  

@jax.jit  
def forward(params, x):  
    for _ in range(6):  
        x = x + fast_block(params, x)  
     return x
```

pmap多卡数据并行

```python
 from jax import pmap, lax  

@pmap(axis_name='d')  
def train_step(params, batch, lr):  
    x, y = batch  # each device sees [local_B, ...]  
    def loss_fn(p):  
        pred = model_apply(p, x)  
        loss = jnp.mean((pred - y) ** 2)  
        return loss  
    loss, grads = jax.value_and_grad(loss_fn)(params)  
    loss = lax.pmean(loss, axis_name='d')  
    grads = lax.pmean(grads, axis_name='d')  
    params = jax.tree_map(lambda p, g: p - lr * g, params, grads)  
     return params, loss
```

pjit+ 命名分片：SPMD并行

```python
 import jax  
from jax.sharding import Mesh, PartitionSpec as P  
import numpy as np  

devices = np.array(jax.devices()).reshape(2, 4)  # 2 × 4 mesh (dp × mp)  
mesh = Mesh(devices, ('dp', 'mp'))  

@jax.jit  # jit is optional when using pjit; shown when composing  
def model_apply_sharded(params, x):  
    return model_apply(params, x)  

from jax.experimental.pjit import pjit  

with mesh:  
    in_shard  = (P('mp',), P('dp',))  # example; tailor to your shapes  
    out_shard = P('dp',)              # e.g., shard batch across dp  
    step = pjit(model_apply_sharded,  
                in_shardings=(P('mp',), P('dp',)),  
                out_shardings=out_shard)  
     y = step(params_sharded, x_sharded)
```

value_and_grad的正确堆叠方式

```python
 def loss_with_aux(params, batch):  
    x, y = batch  
    pred = model_apply(params, x)  
    loss = jnp.mean((pred - y) ** 2)  
    aux  = {'mse': loss, 'mean_pred': jnp.mean(pred)}  
    return loss, aux  

@jax.jit  
def train_step(params, opt_state, batch, lr):  
    (loss, aux), grads = jax.value_and_grad(loss_with_aux, has_aux=True)(params, batch)  
    updates, opt_state = optimizer_update(grads, opt_state, params, lr)  
    params = optax_apply(updates, params)  
     return params, opt_state, loss, aux
```

