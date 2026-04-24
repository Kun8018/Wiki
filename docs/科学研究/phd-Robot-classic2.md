---
title: 经典论文工作导读(二)
date: 2020-03-06 21:40:33
categories: 技术博客
tags:
  - IT,Web，
toc: true
thumbnail: 
---

<!--more-->

## pi0

https://zhuanlan.zhihu.com/p/2007787328899421642

### config

openpi\src\openpi\training\config.py  基础config

| 参数                       | 类型              | 含义                                                         |
| -------------------------- | ----------------- | ------------------------------------------------------------ |
| name                       | str               | 配置唯一名称，用于引用该配置。                               |
| proj_name                  | str               | 项目名称。默认值为 "openpi"，通常用于 WandB 实验分组。       |
| exp_name                   | str               | 实验名称。必填项。决定了具体的检查点保存路径。               |
| model                      | BaseModelConfig   | 模型架构配置，默认使用 Pi0Config。                           |
| weight_loader              | WeightLoader      | 权重加载器。默认使用NoOpWeightLoader。                       |
| pytorch_weight_path        | str \| None       | PyTorch 权重路径。                                           |
| pytorch_training_precision | Literal           | 训练精度。可选 bfloat16或 float32，默认bfloat16              |
| lr_schedule                | LRScheduleConfig  | 学习率调度配置。默认采用余弦退火                             |
| optimizer                  | OptimizerConfig   | 优化器配置。默认使用 AdamW。                                 |
| ema_decay                  | float \| None     | EMA 衰减系数。默认 0.99。                                    |
| freeze_filter              | Filter            | 冻结过滤器。指定哪些参数不参与训练（默认不冻结任何参数）     |
| data                       | DataConfigFactory | 数据源配置。定义训练使用的数据集，默认是 FakeDataConfig      |
| batch_size                 | int               | 批大小。                                                     |
| num_workers                | int               | 数据加载线程数。                                             |
| assets_base_dir            | str               | 静态资源基础目录。存放归一化统计数据等。                     |
| checkpoint_base_dir        | str               | 检查点基础目录。                                             |
| seed                       | int               | 随机种子。                                                   |
| num_train_steps            | int               | 总训练步数。                                                 |
| log_interval               | int               | 日志打印频率。                                               |
| save_interval              | int               | 每隔多少步保存一次模型检查点。                               |
| keep_period                | int \| None       | 永久保留周期。每隔多少步的检查点被标记为“不自动删除”。       |
| overwrite                  | bool              | 如果为 True，将强制删除已存在的同名检查点目录。              |
| resume                     | bool              | 如果为 True，将从上一次训练中断的地方继续。                  |
| wandb_enabled              | bool              | 是否将训练曲线上传至 Weights & Biases 平台。                 |
| policy_metadata            | dict \| None      | 传给策略服务器的元数据。                                     |
| fsdp_devices               | int               | FSDP 设备数。>1 时启用全分片并行，通过分片模型参数来降低单卡显存占用。 |

其他config

BaseModelConfig

openpi\src\openpi\models\model.py

**模板**。它规定了：

1. 所有模型必须有action_dim、action_horizon、max_token_len参数。
2. 所有模型必须能通过create初始化，能通过inputs_spec告知输入形状。
3. 它内置了load方法和load_pytorch方法来加载模型，当使用load_pytorch函数时会直接实例化PI0Pytorch模型并加载

WeightLoader

openpi\src\openpi\training\weight_loaders.py

 WeightLoader 是一个协议。它不定义具体实现，只定义“行为规范”，任何拥有 load 方法并符合输入输出类型的类，都被视为一个 WeightLoader 。在 Python 的类型系统中，协议默认只在静态检查阶段有效，而装饰器@runtime_checkable 允许在程序运行过程中，使用 isinstance() 或 issubclass() 来检查一个对象是否符合该协议

LRScheduleConfig

openpi\src\openpi\training\optimizer.py

LRScheduleConfig是一个协议，要求继承它的类有create函数并符合相关的输入输出格式。余弦退火调度即学习率先线性上升（Warmup），然后像余弦波形一样平滑下降；平方根倒数退火则是在 Warmup 后，按照 的速率缓慢下降。在这里这两种方法的具体实现都是通过optax库实现的，它是一个为 JAX 设计的梯度处理和优化库

OptimizerConfig

openpi\src\openpi\training\optimizer.py

OptimizerConfig是一个协议，要求继承它的类有create函数。AdamW和SGD的实现也很简单，依然是直接调用optax库。

这个文件中还有一个函数create_optimizer，它会整合LRScheduleConfig和OptimizerConfig，得到最终的梯度变换器



DataConfigFactory

openpi\src\openpi\training\config.py

DataConfigFactory是一个抽象基类，要求继承它的子类实现create方法，repo_id是机器人数据集的唯一标识符，tyro.MISSING 表示在命令行启动时必须提供此参数。

assets：它是一个AssetsConfig对象，默认使用AssetsConfig。

AssetsConfig类实际上只包含assets_dir和asset_id，这里的资源主要指的是归一化参数，assets_dir表示资源存放的根目录，asset_id是特定资源的唯一标识符，可以用来表示不同机器人平台的资源

base_config: 使用 tyro.conf.Suppress 隐藏，不会被tyro自动变成可更改的命令行参数。它是一个DataConfig类对象。

create_base_config函数负责在base_config的基础上进行修改(由于frozen=True，只能使用dataclasses.replace创建一个新的副本进行更改)，_load_norm_stats函数则从本地的assets文件夹中加载归一化参数(若本地没有，还会尝试下载)

DARACONFIG

repo_id: 原始数据集仓库 ID。asset_id: 特定资源的唯一标识符。norm_stats: 归一化参数。

repack_transforms：将不同来源、格式各异的数据集统一重命名并封装成代码预期的标准格式。

data_transforms：在归一化之前执行，进行数据预处理。

model_transforms：在归一化之后执行。专门针对模型架构的需求，比如将数据转换为 bfloat16 精度，或者将多张图像堆叠。

use_quantile_norm：是否使用分位数归一化，若为False，使用z-score归一化。

action_sequence_keys: 告诉加载器去数据集的哪个键里找动作。

prompt_from_task: 是否直接把LeRobot数据集里的任务描述作为模型的语言输入。

rlds_data_dir：这部分是为 RLDS (Reinforcement Learning Datasets) 格式准备的，它支持从多个子数据集中进行加权采样，目前只在DROID中使用。

action_space：用于选择DROID数据集的动作空间(末端位姿或是关节角)。

datasets：一个由 RLDSDataset 配置对象组成的序列，在该架构中，RLDSDataset 通常包含以下四个关键属性：子数据集的路径或 ID，数据集的版本号，子数据集的权重，过滤器(可选字段，用于剔除不合格的数据点)



### Model

src/openpi/models/pi0_config.py

piConfig 这个类继承自抽象基类BaseModelConfig，dtype表示权重和计算的数据类型默认为bfloat16，paligemma_variant表示用于基座的vlm(paligemma)的版本，action_expert_variant表示动作专家模型的版本。

action_dim表示动作空间维度，action_horizon表示一次性预测多少步的动作(如果一次只预测一步，推理时太卡了，动作的连贯性也不好)，max_token_len表示文本指令(prompt)的最大长度

pi05表示是否使用pi05结构（所以实际上Pi0Config不仅仅是pi0的config），discrete_state_input表示是否将状态输入离散化为 Token。

__post_init__会在类初始化后执行，使得max_token_len 、discrete_state_input能根据是否使用pi05结构来进行不同的初始化。model_type顾名思义，直接返回此时配置所使用的模型结构的类别，_model.ModelType.PI0或 _model.ModelType.PI05。

在create函数中，会真正返回一个**Pi0**模型实例；inputs_spec函数调用了**_model.Observation**，它定义了传入给模型的数据的形状。

get_freeze_filter返回应该冻结的模型参数，若paligemma_variant有"lora"字段，则会冻结模型中所有路径包含llm的参数，若此时action_expert_variant中不带有"lora"字段，它需要确保不会冻结动作专家的参数；若只有action_expert_variant中有"lora"字段，则会冻结模型中所有径包含llm._1的参数（这里 _1 是因为动作专家通常被挂载为 LLM 结构的第二个实例）。在最后，如果使用了lora（任一部分带有lora字段），需要确保lora的相关参数不被冻结

openpi\src\openpi\models\pi0.py

init函数

init函数会通过_gemma.get_config分别得到paligemma_config和action_expert_config，nnx_bridge.ToNNX是一个适配器，将旧版 Flax 实现的gemma转换成新一代 nnx 风格的对象，使其能使用 nnx 的过滤器和状态管理（注意这里同时传入了两个config，说明同时实例化了两个gemma）。要搞懂这里的底层逻辑，我们需要去看**gemma**的实现。

llm.lazy_init中，若使用pi05结构，则动作专家部分将会使用adaRMSNorm，这是对adaLN的一种改进，我们会在稍后讲解**gemma**时详细介绍。

img也同样创建了一个**siglip**模块的实例，并使用了So400m/14版本，img.lazy_init会使用fake_obs()生成伪造的图像输入来进行初始化。此时我们同样先不关注其实现逻辑，先解读Pi0的总体逻辑。

注意这里会将llm部分和img部分组合起来并挂载到 self.PaliGemma 属性下，这样做之后，模型内部的参数路径会变成 PaliGemma.llm... 和 PaliGemma.img...

若使用pi05结构，这里对时间步time会经过一个mlp，这是为了adaRMSNorm所准备的，adaRMSNorm会将时间步的特征作为条件输入，来学习缩放。若不使用pi05结构，会直接将state的维度投影到与动作专家相同的维度，action_time_mlp_in直接将状态向量和时间向量拼接起来作为输入。

这两种结构最后都会将动作专家的输出重新映射到真实的动作空间中，deterministic属性会通过model.train和model.eval自动设置



#### gemma

src/openpi/models/gemma.py

初始化一个嵌入层embedder，Embedder类的代码如下，它实现了一个简单的嵌入层，encode用于将输入的token转换为向量嵌入，并将嵌入向量乘以 。因为在初始化时，权重的方差通常较小，乘以这个系数可以缩放激活值的量级。decode会计算当前向量与词表中每一个 Token 的相似度，得到一个(vocab_size,) 的向量



#### pi0-fast





### script

### compute_norm_stats.py

这个脚本用于**计算数据集的归一化统计信息**（均值和标准差），是训练前的一个重要步骤。

主要功能

1. **遍历数据集**：加载配置中指定的数据集

2. 计算统计量

   ：

   - `state`（机器人状态）的均值和标准差
   - `actions`（机器人动作）的均值和标准差

3. **保存统计信息**：将计算出的归一化统计保存到 `assets/` 目录下

为什么需要归一化？

在机器人学习中，归一化非常重要：

- **稳定训练**：将不同维度的数据缩放到相似的范围
- **加速收敛**：使优化器更容易找到最优解
- **数值稳定性**：避免某些维度的数值过大或过小

使用流程

```bash
# 第一步：计算归一化统计
uv run scripts/compute_norm_stats.py --config-name pi0_aloha_sim

# 第二步：开始训练
uv run scripts/train.py pi0_aloha_sim --exp-name=aloha_test --overwrite
```

脚本会生成类似这样的文件结构：

```
assets/
└── pi0_aloha_sim/
    └── lerobot/aloha_sim_transfer_cube_human/
        └── norm_stats.json
```

这个 `norm_stats.json` 文件包含了训练时需要使用的归一化参数
