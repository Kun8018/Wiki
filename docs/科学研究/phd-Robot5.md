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

## 具身智能

### tensorflow

#### 初始化

tf.compat.v1 里“初始化”相关的东西主要分两类：会话中一次性执行的初始化器（返回一个 op，需要 sess.run），以及为变量提供初始值的“初始器”（传给 get_variable/Variable 的 initializer 参数）

会话级初始化器（运行一次以初始化图中的对象）

- global_variables_initializer() / initializers.global_variables()
  初始化所有“全局变量”（模型参数等，Variable 被加入 GLOBAL_VARIABLES 集合）。

- local_variables_initializer() / initializers.local_variables()
  初始化所有“局部变量”（常用于指标、临时计数等，加入 LOCAL_VARIABLES 集合）。

- variables_initializer(var_list) / initializers.variables(var_list)
  按需初始化指定变量列表。

- tables_initializer() / initializers.tables()
  初始化查找表（tf.lookup 等），不初始化变量。

- 兼容别名（已弃用，但在 compat.v1 仍可用）

  - initialize_all_variables() ≡ global_variables_initializer()
  - initialize_local_variables() ≡ local_variables_initializer()
  - initialize_variables(var_list) ≡ variables_initializer(var_list)
  - initialize_all_tables() ≡ tables_initializer()

- 辅助检查

  - report_uninitialized_variables(var_list=None)
    返回未初始化变量的名字（sess.run 后得到字符串列表），用于排查。

  - assert_variables_initialized(var_list=None)
    断言变量已初始化，未初始化则抛错

    sess.run(tf.compat.v1.global_variables_initializer())

  - sess.run([tf.compat.v1.local_variables_initializer(), tf.compat.v1.tables_initializer()])

变量初始值“初始器”（传给变量创建时的 initializer）

- constant_initializer(value=0)
  常量初值。
- zeros_initializer() / ones_initializer()
  全 0 / 全 1。
- random_uniform_initializer(minval=0.0, maxval=1.0, seed=None, dtype=None)
  区间均匀分布。
- random_normal_initializer(mean=0.0, stddev=1.0, seed=None, dtype=None)
  正态分布。
- truncated_normal_initializer(mean=0.0, stddev=1.0, seed=None, dtype=None)
  截断正态（去除远离均值的尾部）。
- orthogonal_initializer(gain=1.0, seed=None)
  正交矩阵初始化（常用于线性层/卷积核）。
- identity_initializer(gain=1.0)
  单位矩阵（仅适用于方阵形状）。
- uniform_unit_scaling_initializer(factor=1.0, seed=None, dtype=tf.float32)
  单位尺度均匀分布（v1 经典初始化器）
- 方差缩放初始化，把权重按 fan_in/fan_out 计算出尺度，再用均匀或正态分布采样。它们的等价关系与公式如下（fan_in=输入通道数，fan_out=输出通道数；Dense 的 [in, out]，Conv2D 的 [kh, kw, inC, outC] 则 fan_in=kh*kw*inC，fan_out=kh*kw*outC）
  - tf.compat.v1.glorot_normal_initializer()（Xavier/Glorot Normal）
    - 分布：截断正态（truncated normal）
    - 标准差：stddev = sqrt(2 / (fan_in + fan_out))
    - 适用：tanh、sigmoid、线性等非 ReLU 激活常用
  - tf.compat.v1.glorot_uniform_initializer()（Xavier/Glorot Uniform）
    - 分布：均匀
    - 范围：[-limit, limit]，limit = sqrt(6 / (fan_in + fan_out))
    - 适用：同上
  - tf.compat.v1.keras.initializers.he_normal()（Kaiming/He Normal）
    - 分布：正态（Keras实现为未截断的 normal）
    - 标准差：stddev = sqrt(2 / fan_in)
    - 适用：ReLU/LeakyReLU/ELU 等 ReLU 系列激活
  - tf.compat.v1.keras.initializers.he_uniform()（Kaiming/He Uniform）
    - 分布：均匀
    - 范围：[-limit, limit]，limit = sqrt(6 / fan_in)
    - 适用：同上
  - tf.compat.v1.keras.initializers.lecun_normal()
    - 分布：正态
    - 标准差：stddev = sqrt(1 / fan_in)
    - 适用：SELU（自归一化网络）推荐；也可用于线性/softsign 等
  - tf.compat.v1.keras.initializers.lecun_uniform()
    - 分布：均匀
    - 范围：[-limit, limit]，limit = sqrt(3 / fan_in)
    - 适用：同上

- “xavier_*”就是“glorot_*”的别称；TF 提供的是 glorot_*。
- TF v1 的 glorot_normal 使用截断正态（更稳一些）；Keras 的 he/lecun normal 用未截断正态。
- 选择建议：
  - ReLU 系列：he_normal / he_uniform
  - tanh/sigmoid/线性：glorot_normal / glorot_uniform
  - SELU：lecun_normal（配合 AlphaDropout）

#### layer

tf.compat.v1.layers 是 TF1 的“简易层”API（已弃用，TF2 请用 tf.keras.layers）。里面主要是两类：函数式层（返回张量）和对应的层类

tf.keras.layers

核心与形状

- Input/InputLayer：定义输入张量
- Dense：全连接
- Activation：独立激活
- Lambda：自定义运算
- Flatten、Reshape、Permute、RepeatVector
- Dropout、SpatialDropout1D/2D/3D、GaussianDropout、GaussianNoise、AlphaDropout
- ActivityRegularization
- Masking（基于掩码的序列填充忽略）

卷积与转置卷积

- Conv1D/2D/3D
- SeparableConv2D（深度可分离卷积）
- DepthwiseConv2D（纯深度卷积）
- Conv2DTranspose/Conv3DTranspose（反卷积/上采样）
- Conv1DTranspose（部分 TF2 版本提供，2.9+）

池化

- MaxPooling1D/2D/3D、AveragePooling1D/2D/3D
- GlobalMaxPooling1D/2D/3D、GlobalAveragePooling1D/2D/3D

归一化与标准化

- BatchNormalization
- LayerNormalization
- 说明：Group/Instance Norm 不在核心 Keras，通常用 tensorflow_addons.layers.GroupNormalization/InstanceNormalization

嵌入与注意力

- Embedding
- Attention、AdditiveAttention
- MultiHeadAttention（Transformer 常用）

序列与循环网络

- RNN（通用容器）
- SimpleRNN、GRU、LSTM
- Bidirectional、TimeDistributed（包装器）
- ConvLSTM2D（时空卷积 LSTM）

合并/运算层

- Add、Subtract、Multiply、Average、Maximum、Minimum、Concatenate、Dot

采样/几何变换/边界

- UpSampling1D/2D/3D
- ZeroPadding1D/2D/3D、Cropping1D/2D/3D
- Resizing（尺寸缩放，插值）、Rescaling（数值缩放）

预处理（可在模型内端到端使用）

- Numeric: Normalization、Discretization、CategoryEncoding
- Lookup: StringLookup、IntegerLookup、Hashing
- 图像: Rescaling、Resizing、CenterCrop、RandomFlip、RandomRotation、RandomZoom、RandomTranslation、RandomContrast
- 文本: TextVectorization

### pytorch

https://datawhalechina.github.io/thorough-pytorch/%E7%AC%AC%E4%BA%8C%E7%AB%A0/2.1%20%E5%BC%A0%E9%87%8F.html

- torch：张量与基础运算、设备管理（CPU/GPU）、随机数、保存/加载
- torch.nn：模型构建（Module、层、Loss）
- torch.nn.functional：函数式 API（无状态的激活/卷积/损失等）
- torch.optim：优化器（SGD、Adam 等）
- torch.utils.data：Dataset、DataLoader
- torch.cuda：CUDA 相关（设备查询、显存等）

#### fsdp

https://huggingface.co/docs/transformers/zh/performance

[完全分片数据并行（FSDP）](https://pytorch.org/blog/introducing-pytorch-fully-sharded-data-parallel-api/)是一种数据并行方法， 它将模型的参数、梯度和优化器状态在可用 GPU（也称为 Worker 或 *rank*）的数量上进行分片。 与[分布式数据并行（DDP）](https://pytorch.org/docs/stable/generated/torch.nn.parallel.DistributedDataParallel.html)不同， FSDP 减少了内存使用量，因为模型在每个 GPU 上都被复制了一次。这就提高了 GPU 内存效率， 使您能够用较少的 GPU 训练更大的模型。FSDP 已经集成到 Accelerate 中， 这是一个用于在分布式环境中轻松管理训练的库，这意味着可以从 `Trainer` 类中调用这个库。

在开始之前，请确保已安装 Accelerate，并且至少使用 PyTorch 2.1.0 或更高版本

```shell
pip install accelerate
```

FSDP 提供了多种可选择的分片策略：

- `FULL_SHARD` - 将模型参数、梯度和优化器状态跨 Worker 进行分片；为此选项选择 `1`
- `SHARD_GRAD_OP`- 将梯度和优化器状态跨 Worker 进行分片；为此选项选择 `2`
- `NO_SHARD` - 不分片任何内容（这等同于 DDP）；为此选项选择 `3`
- `HYBRID_SHARD` - 在每个 Worker 中分片模型参数、梯度和优化器状态，其中每个 Worker 也有完整副本；为此选项选择 `4`
- `HYBRID_SHARD_ZERO2` - 在每个 Worker 中分片梯度和优化器状态，其中每个 Worker 也有完整副本；为此选项选择 `5`

这由 `fsdp_sharding_strategy` 标志启用

当参数和梯度在不使用时可以卸载到 CPU 上，以节省更多 GPU 内存并帮助您适应即使 FSDP 也不足以容纳大型模型的情况。 在运行 `accelerate config` 时，通过设置 `fsdp_offload_params: true` 来启用此功能

FSDP 是通过包装网络中的每个层来应用的。通常，包装是以嵌套方式应用的，其中完整的权重在每次前向传递后被丢弃， 以便在下一层使用内存。**自动包装**策略是实现这一点的最简单方法，您不需要更改任何代码。 您应该选择 `fsdp_auto_wrap_policy: TRANSFORMER_BASED_WRAP` 来包装一个 Transformer 层， 并且 `fsdp_transformer_layer_cls_to_wrap` 来指定要包装的层（例如 `BertLayer`）。

否则，您可以选择基于大小的包装策略，其中如果一层的参数超过一定数量，则应用 FSDP。通过设置 `fsdp_wrap_policy: SIZE_BASED_WRAP` 和 `min_num_param` 来启用此功能，将参数设置为所需的大小阈值。

#### 多GPU推理

某些模型现已支持内置的**张量并行**（Tensor Parallelism, TP），并通过 PyTorch 实现。张量并行技术将模型切分到多个 GPU 上，从而支持更大的模型尺寸，并对诸如矩阵乘法等计算任务进行并行化。

要启用张量并行，只需在调用 `from_pretrained()` 时传递参数 `tp_plan="auto"`

```python

```

减少批量大小

```bash
--batch_size 16
```



#### DDP

模型与变量必须存在于同一个设备上（CPU or GPU） pytorch使用to函数实现变量或模型的存储转移，to函数的对象要么是数据Tensor，要么是模型Module 张量**不执行inplace**(即 执行之后重新构建一个新的张量)，模型**执行inplace**(执行之后不重新构建一个新的模型)

原理：当给定model时，主要实现功能是将**input**数据依据**batch**的这个维度，将数据划分到指定的设备上。其他的对象(objects)复制到每个设备上。在前向传播的过程中，module被复制到每个设备上，每个复制的副本处理一部分输入数据。在反向传播过程中，每个副本module的梯度被汇聚到原始的module上计算(一般为第0块GPU)

DP在每个训练批次（batch）中，因为模型的权重都是在 一个进程上先算出来 然后再把他们分发到每个GPU上，所以**网络通信**就成为了一个瓶颈，而GPU使用率也通常很低。
2、因为它在每一次的前向传播的时候把模型也复制了（即每次更新都复制一遍模型），并且单进程多线程会造成[GIL contention](https://link.zhihu.com/?target=https%3A//wiki.python.org/moin/GlobalInterpreterLock) （全局解释器锁争用） 这里**进程计算权重使通信成为瓶颈**造成了大量的时间浪费，因此引入了DDP。

DDP采用**多进程控制**多GPU，共同训练模型，一份代码会被pytorch自动分配到n个进程并在n个GPU上运行。 DDP运用[Ring-Reduce](https://zhida.zhihu.com/search?content_id=196800777&content_type=Article&match_order=1&q=Ring-Reduce&zhida_source=entity)通信算法在每个GPU间对梯度进行通讯，交换彼此的梯度，从而获得所有GPU的梯度。对比DP，不需要在进行模型本体的通信，因此可以加速训练。

需要注意以下几点：
1、设置DistributedSampler来打乱数据，因为一个batch被分配到了好几个进程中，要确保不同的GPU拿到的不是同一份数据。
2、要告诉每个进程自己的id，即使用哪一块GPU。
3、如果需要做BatchNormalization，需要对数据进行同步

TorchRun

https://docs.pytorch.ac.cn/docs/stable/elastic/run.html

Torchrun 使用 [DistributedDataParallel](https://docs.pytorch.org/docs/2.7/notes/ddp.html#internal-design) 模块来管理分布式训练。使用 Torchrun 在多个 GPU 上训练时，会出现以下情况:

- 每个 GPU 运行独立的进程。
- 每个进程执行完整训练脚本
- 每个进程都保持自己的:
  - Isaac Lab 环境实例（具有 *n* 个并行环境）
  - 策略网络复制
  - 用于rollout收集的经验缓冲区
- 所有进程仅在梯度更新时进行同步

模块 `torch.distributed.run`。

`torch.distributed.run` 是一个在每个训练节点上启动多个分布式训练进程的模块。

`torchrun` 是一个指向主模块 [torch.distributed.run](https://github.com/pytorch/pytorch/blob/master/torch/distributed/run.py) 的 Python [控制台脚本](https://packaging.pythonlang.cn/en/latest/specifications/entry-points/#use-for-scripts)，该脚本在 [setup.py](https://github.com/pytorch/pytorch/blob/master/setup.py) 的 `entry_points` 配置中声明。它等同于调用 `python -m torch.distributed.run`。

`torchrun` 可用于单节点分布式训练，其中每个节点将启动一个或多个进程。它既可以用于 CPU 训练，也可以用于 GPU 训练。如果用于 GPU 训练，每个分布式进程将运行在单个 GPU 上。这可以显著提高单节点训练性能。`torchrun` 也可用于多节点分布式训练，通过在每个节点上启动多个进程，同样可以大幅提升多节点分布式训练的性能。这对于具有多个支持直接 GPU 访问的 Infiniband 接口的系统尤其有利，因为所有接口都可以被利用来获得聚合通信带宽。

无论是单节点分布式训练还是多节点分布式训练，`torchrun` 都会在每个节点上启动给定数量的进程 (`--nproc-per-node`)。如果用于 GPU 训练，该数量需要小于或等于当前系统上的 GPU 数量 (`nproc_per_node`)，且每个进程将在从 *GPU 0 到 GPU (nproc_per_node - 1)* 的单个 GPU 上运行





#### 版本

2.8开始支持12.8



### diffusers

https://github.com/huggingface/diffusers



### transformers

目前各种Pretraining的Transformer模型层出不穷，虽然这些模型都有开源代码，但是它们的实现各不相同，我们在对比不同模型时也会很麻烦。[Huggingface Transformer](https://huggingface.co/transformers/)能够帮我们跟踪流行的新模型，并且提供统一的代码风格来使用BERT、XLNet和GPT等等各种不同的模型。而且它有一个[模型仓库](https://huggingface.co/models)，所有常见的预训练模型和不同任务上fine-tuning的模型都可以在这里方便的下载。截止目前，最新的版本是4.5.0

Huggingface Transformer 4.5.0需要安装Tensorflow 2.0+ **或者** PyTorch 1.1.0+

Transformers的目的是为了：

- 帮助NLP研究者进行大规模的transformer模型
- 帮助工业界的使用者微调模型并且不是到生产环境
- 帮助工程师下载预训练模型并且解决实际问题

使用预训练模型最简单的方法就是使用pipeline函数，它支持如下的任务：

- 情感分析(Sentiment analysis)：一段文本是正面还是负面的情感倾向
- 文本生成(Text generation)：给定一段文本，让模型补充后面的内容
- 命名实体识别(Name entity recognition)：识别文字中出现的人名地名的命名实体
- 问答(Question answering)：给定一段文本以及针对它的一个问题，从文本中抽取答案
- 填词(Filling masked text)：把一段文字的某些部分mask住，然后让模型填空
- 摘要(Summarization)：根据一段长文本中生成简短的摘要
- 翻译(Translation)：把一种语言的文字翻译成另一种语言
- 特征提取(Feature extraction)：把一段文字用一个向量来表示

https://fancyerii.github.io/2021/05/11/huggingface-transformers-1/

### hugging face

[`huggingface-cli` ](https://hf-mirror.com/docs/huggingface_hub/guides/download#download-from-the-cli)是 Hugging Face 官方提供的命令行工具，自带完善的下载功能。使用方法如下

```bash
pip install -U huggingface_hub

export HF_ENDPOINT=https://hf-mirror.com

huggingface-cli download --resume-download gpt2 --local-dir gpt2

huggingface-cli download --repo-type dataset --resume-download wikitext --local-dir wikitext
```

以添加 `--local-dir-use-symlinks False` 参数禁用文件软链接，这样下载路径下所见即所得

**[hfd](https://gist.github.com/padeoe/697678ab8e528b85a2a7bddafea1fa4f)** 是本站开发的 huggingface 专用下载工具，基于成熟工具 `aria2`，可以做到稳定高速下载不断线

```shell
wget https://hf-mirror.com/hfd/hfd.sh
chmod a+x hfd.sh

export HF_ENDPOINT=https://hf-mirror.com

$env:HF_ENDPOINT = "https://hf-mirror.com"

./hfd.sh gpt2
```



```shell
HF_ENDPOINT=https://hf-mirror.com python your_script.py
```

