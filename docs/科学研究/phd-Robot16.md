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

### checkpoint

在深度学习领域，检查点（Checkpoint） 是指模型训练过程中某一时刻的完整状态快照，包含以下关键信息：

1. **模型参数：网络权重、偏置等可训练参数。**
2. **优化器状态：如动量缓存、梯度二阶矩（Adam优化器中的`momentum`和`variance`）。**
3. **训练元数据：当前训练步数（step/epoch）、学习率、损失值等。**

**检查点的核心功能是保存训练中间状态，其用途包括：** **容错恢复：训练意外中断后可从中断点继续。**

**模型选择：通过验证集筛选最优性能的中间模型。**

**迁移学习：作为预训练权重供下游任务微调。**

**训练动态分析：研究模型收敛过程（如损失曲面轨迹）**

此外 ViT作为纯Transformer架构的视觉模型，其检查点包含以下特有组件：

1. **[Patch Embedding](https://zhida.zhihu.com/search?content_id=257472804&content_type=Article&match_order=1&q=Patch+Embedding&zhida_source=entity)层：将输入图像分割为16x16补丁的线性投影矩阵。**
2. **位置编码（Positional Encoding）：捕获空间关系的可学习向量。**
3. **多头自注意力权重：每个Transformer层的Q/K/V矩阵。**
4. **[MLP层](https://zhida.zhihu.com/search?content_id=257472804&content_type=Article&match_order=1&q=MLP层&zhida_source=entity)参数：前馈网络的权重矩阵。**

ViT的检查点规模通常较大（如ViT-L/16参数达3.07亿），需高效存储策略（如FP16量化）



### diffusion Policy

https://github.com/columbia-ai-robotics/diffusion_policy. https://diffusion-policy.cs.columbia.edu/

传统机器人策略的局限性

| 传统方法                          | 局限性                                     |
| --------------------------------- | ------------------------------------------ |
| **行为克隆 (Behavioral Cloning)** | 容易过拟合，缺乏泛化能力                   |
| **高斯分布预测**                  | 动作空间过于简化，无法建模复杂的多模态分布 |
| **确定性策略**                    | 对于复杂任务，单一最优解不够               |
| **自回归模型**                    | 误差累积，时序一致性差                     |

为什么扩散模型适合机器人策略？

| 扩散模型的优势   | 对机器人策略的价值             |
| ---------------- | ------------------------------ |
| **建模复杂分布** | 可以表示动作的不确定性和多样性 |
| **多模态输出**   | 不同的情况可以有不同的最优动作 |
| **渐进生成**     | 可以生成时序一致的动作序列     |
| **条件生成**     | 可以基于视觉观测条件化生成     |

架构概览

```
视觉观测 (images)
     ↓
视觉编码器 (ResNet, ViT, etc.)
     ↓
条件特征
     ↓
扩散模型 UNet
     ↓
动作序列 (actions)
```

扩散过程

前向过程（加噪）

```python
for t in 0..T:
    x_t = sqrt(α_t) * x_{t-1} + sqrt(1-α_t) * ε
```

反向过程（去噪）

```python
for t in T..1:
    ε_pred = UNet(x_t, t, condition)
    x_{t-1} = denoise(x_t, ε_pred)
```

关键技术创新

1. **动作扩散 (Action Diffusion)**

**传统动作预测**：

```python
action = policy(observation)  # 确定性输出
```

**Diffusion Policy**：

```python
# 渐进生成动作序列
for t in reversed(range(num_steps)):
    action = diffusion_step(action, observation, t)
```

**优势**：

- 可以生成更精确的动作
- 建模动作的不确定性
- 生成更自然的运动轨迹

2. **条件扩散模型**

```python
# 扩散模型以视觉观测为条件
ε_pred = UNet(x_t, timestep, visual_condition)
```

3. **Chained Diffusion Policy**

对于长视界任务：

```
t=0: 生成第一个动作
t=1: 生成第二个动作（条件化为第一个动作）
t=2: 生成第三个动作（条件化为前两个动作）
...
```

Diffusion Policy 的核心贡献

1. **首次将扩散模型用于机器人策略学习**

- 开辟了新的研究方向
- 证明扩散模型在机器人领域的价值

2. **建模复杂动作分布**

- 超越简单的高斯分布
- 可以表示多模态、不确定的动作

3. **条件化生成**

- 视觉观测 → 动作序列
- 端到端的 visuomotor 学习

4. **渐进式动作生成**

- 更精确的控制
- 更好的时序一致性



### SFT

精选博主： https://www.zhihu.com/people/yilan-zhong-shan-xiao-29-98/posts

现在的大模型在进行预训练时大部分都采用了[GPT](https://zhida.zhihu.com/search?content_id=232733945&content_type=Article&match_order=1&q=GPT&zhida_source=entity)的预训练任务，即 [Next token prediction](https://zhida.zhihu.com/search?content_id=232733945&content_type=Article&match_order=1&q=Next+token+prediction&zhida_source=entity)。

- **Token**：在NLP中，一个“token”可以是一个词、一个字或一个标点符号。例如，句子“我爱北京”被切分成三个tokens: “我”, “爱” 和 “北京”。
- **Prediction**：预测是指根据模型的当前输入，猜测接下来应该出现的token是什么。

在训练过程中，模型通过大量的文本数据来学习文本之间的模式和结构。例如，模型会看到成千上万次的“我爱X”这样的模式，其中X可以是各种不同的词。通过这样的训练，模型会学会哪些词最有可能出现在“我爱”之后。

要理解清楚这一训练过程，最主要的就是搞清楚**预训练的数据怎么构造，数据怎么喂给模型，模型输出的是什么，以及如何计算loss**。

假设现在有一个用来预训练的数据集

```text
你知道什么是预训练吗？
```

假设经过分词后

```text
你: 9
知道: 3
什么: 6
是: 4
预训练: 2
吗: 1
？: 5
```

原来的数据变为如下序列，后面补了三个0（假设我们希望最大序列长度是10）

```text
9 3 6 4 2 1 5 0 0 0
```

预测下一个token就类似于9预测3，93预测6，以此类推，但是如果这样拆成很多个数据段其实比较低效，因此就可以考虑**移位**来构造数据，即

- 模型输入X为 `9 3 6 4 2 1 5 0 0 0`
- 模型输出targets为 `3 6 4 2 1 5 0 0 0 0`

这样就可以一次性把整条序列喂给模型，计算一次就包含了个预测下一个token的损失了。注意这里模型的设计是有讲究的，我们**不能让输入看到后面的词**（如果看得到的话就没必要进行预测了），也就是“你”在模型内看不到“知道”，“你 知道”在模型内看不到“什么”，这个可以通过注意力机制实现，不是本文的关注点，这里就不展开了

现在模型的输入的维度为，第一维为batch_size，然后经过embedding层后变为，这里假设embedding的维度为768。

记住**进入transfomer前后数据的维度不会发生变化，把transfomer当作一个黑盒**，也就是[transformer](https://zhida.zhihu.com/search?content_id=232733945&content_type=Article&match_order=1&q=transformer&zhida_source=entity)(X)的维度还是，接下来就是基于它来进行预测了，因为要预测哪个词，词的可能情况就是词表的大小，所以做的就是一个**分类任务**，预测下一个token是词表中的哪一个（词表中的每一个词当作一个类别）

为了完成分类任务，需要对transformer的输出做一个映射，**映射到跟词表一样大**，也就需要定义这样一个线性变换

```shell
output_layer = nn.Linear(768, vocab_size, bias=False)
```

然后`logits=output_layer(transformer(X))`的维度就是`(1,10,vocab_size)`，接下来就可以计算loss了，具体来说就是计算logits（模型预测）与targets（真实标签）之间的[交叉熵损失](https://zhida.zhihu.com/search?content_id=232733945&content_type=Article&match_order=1&q=交叉熵损失&zhida_source=entity)，同时忽略了填充值对应的损失。

```shell
loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1), ignore_index=0)
```

Supervised fine-tuning

“有监督微调”意味着使用有标签的数据来调整一个已预训练好的语言模型（LLM），使其更适应某一特定任务。通常LLM的预训练是无监督的，但微调过程往往是有监督的

当进行有监督微调时，模型权重会根据与真实标签的差异进行调整。通过这个微调过程，模型能够捕捉到标签数据中特定于某一任务的模式和特点。使得模型更加精确，更好地适应某一特定任务。

以一个简单的例子来说，你有一个已经预训练好的LLM。当输入“我不能登录我的账号，我该怎么办？”时，它可能简单地回答：“尝试使用‘忘记密码’功能来重置你的密码。”

这个回答很直接，适用于一般问题，但如果是客服场景，可能就不太合适了。一个好的客服回答应该更有同情心，并且可能不会这么直接，甚至可能包含联系信息或其他细节。这时候，有监督微调就显得非常重要了。

经过有监督微调后，你的模型可以提供更加符合特定指导原则的答案。例如，经过一系列专业的培训示例后，你的模型可以更有同情心地回答客服问题。

接下来我们还是从数据到模型输出，计算loss的步骤来看看SFT的实现原理。

首先还是来看看数据怎么构造，SFT的每一条样本一般由两部分组成，也就是prompt（instruction）+ answer，比如：

- prompt: `翻译以下句子: What is pretrain`
- answer: `什么是预训练`

也就是我们要给模型提供一些类似于问答形式的答案来学习，有了前面预训练的经验后，SFT其实就很好理解的，它本质上也在做next token prediction，只是我们更希望模型关注answer部分的预测，这可以通过生成一个`mask`向量来屏蔽不希望计算loss的部分，下面就是数据构造的一个示意：做的事情就是拼接prompt和answer，并在answer两侧添加一个开始和结束的符号，算一下prompt/instruction的长度，以及后面需要pad的长度，然后生成一个mask向量，answer部分为1，其他部分为0

```python
input_id=prompt+[bos]+answer+[eos]
context_length = input_id.index(bos)
mask_position = context_length - 1
pad_len = max_length - len(input_id)
input_id = input_id + [pad] * pad_len
loss_mask = [0]*context_length+[1]*(len(input_id[mask_position+1:])) + [0]*pad_len
```

构造好输入后，**token转为embedding，经过transformer的过程跟之前预训练完全一样**，也就是我们又得到了一个维度是`(1,10,vocab_size)`的输出`logits=output_layer(transformer(X))`，进一步就可以**计算answer部分的loss**了，其实就是通过mask把不希望考虑的地方乘以0，保留answer部分loss

```python
loss = F.cross_entropy(logits.view(-1, logits.size(-1)), Y.view(-1), ignore_index=0,reduce=False)
loss_mask = loss_mask.view(-1)
loss = torch.sum(loss*loss_mask)/loss_mask.sum()
```

有了loss，进行反向传播更新模型参数就OK啦

#### 什么情况下需要微调

语言风格有要求 比如ai恋爱 ai面试

#### 微调方式

**全模型微调（Full Fine-Tuning）**

- **含义**：在预训练模型的基础上，**对所有参数** 进行进一步训练，使其适应特定任务。
- **优点**：通常效果最好，模型能充分适应新数据。
- **缺点**：计算量大、容易过拟合、需要大量标注数据。

**冻结部分参数微调（Partial Fine-Tuning / Layer Freezing）**

- **含义**：只训练模型的部分层（通常是靠近输出的几层），而**冻结（不更新）** 其他层的参数。
- **优点**：减少计算量、降低过拟合风险、适合数据量较小的场景。
- **缺点**：可能不如全模型微调灵活

**轻量化微调（Parameter-Efficient Fine-Tuning, PEFT）**

- **含义**：通过引入少量可训练参数（如适配器模块、LoRA、Prefix Tuning等），在保持预训练参数不变的情况下进行微调。
- **优点**：大大减少训练参数和内存占用，适合大模型微调。
- **缺点**：效果可能略低于全模型微调。

**渐进微调（Progressive Fine-Tuning）**

- **含义**：分阶段、渐进地解冻并训练模型的不同部分（例如从顶层到底层逐步解冻）。
- **优点**：平衡训练效率和模型性能，避免一次性全参数训练带来的过拟合。
- **缺点**：训练流程更复杂，需要更多调优。

**多任务微调（Multi-Task Fine-Tuning）**

- **含义**：同时使用多个相关任务的数据进行微调，使模型能同时适应多个任务。
- **优点**：提升模型的泛化能力和鲁棒性，避免单任务过拟合。
- **缺点**：任务之间可能存在冲突，需要精心设计任务权重或架构。

科研用1就行

https://github.com/huggingface/peft

```python
from peft import PeftModel

device = torch.accelerator.current_accelerator().type if hasattr(torch, "accelerator") else "cuda"
model_id = "Qwen/Qwen2.5-3B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, device_map=device)
model = PeftModel.from_pretrained(model, "qwen2.5-3b-lora")

inputs = tokenizer("Preheat the oven to 350 degrees and place the cookie dough", return_tensors="pt")
outputs = model.generate(**inputs.to(device), max_new_tokens=50)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

| 你的情况             | 推荐方法           | 理由                         |
| :------------------- | :----------------- | :--------------------------- |
| **数据量小（<1k）**  | 冻结+LoRA          | 防止过拟合，高效利用参数     |
| **数据量大（>10k）** | 全微调或LoRA       | 全微调效果最好，LoRA性价比高 |
| **计算资源有限**     | QLoRA              | 单卡微调大模型的唯一选择     |
| **需要多任务能力**   | 多任务微调+LoRA    | 共享表示，任务特定适配       |
| **快速实验迭代**     | LoRA/Prompt Tuning | 训练快，切换方便             |
| **生产部署**         | LoRA（合并后）     | 无推理开销，性能接近全微调   |

PEFT 方法可以分为三类，不同的方法对 PLM 的不同部分进行下游任务的适配：

- **Prefix/Prompt-Tuning**：在模型的输入或隐层添加 个额外可训练的前缀 tokens（这些前缀是连续的伪 tokens，不对应真实的 tokens），只训练这些前缀参数；
- **Adapter-Tuning**：将较小的神经网络层或模块插入预训练模型的每一层，这些新插入的神经模块称为 adapter（适配器），下游任务微调时也只训练这些适配器参数；
- **LoRA**：通过学习小参数的低秩矩阵来近似模型权重矩阵 的参数更新，训练时只优化低秩矩阵参数

**Prefix-Tuning 在模型输入前添加一个连续的且任务特定的向量序列**（continuous task-specific vectors），称之为**前缀（prefix）**。前缀被视为一系列“虚拟 tokens”，但是它由不对应于真实 tokens 的自由参数组成。与更新所有 PLM 参数的全量微调不同，**Prefix-Tuning 固定 PLM 的所有参数，只更新优化特定任务的 prefix**。因此，在生产部署时，只需要存储一个大型 PLM 的副本和一个学习到的特定任务的 prefix，每个下游任务只产生非常小的额外的计算和存储开销

P-Tuning 的方法思路与 Prefix-Tuning 很相近，P-Tuning 利用少量连续的 embedding 参数作为 prompt **使 GPT 更好的应用于 NLU 任务，而 Prefix-Tuning 是针对 NLG 任务设计**，同时，**P-Tuning 只在 embedding 层增加参数，而 Prefix-Tuning 在每一层都添加可训练参数**

Prompt Tuning 方式可以看做是 Prefix Tuning 的简化，**固定整个预训练模型参数，只允许将每个下游任务的额外** **个可更新的 tokens 前置到输入文本中，也没有使用额外的编码层或任务特定的输出层**。如下图所示，在模型大小增加到一定规模时，仅仅使用 Prompt Tuning 就足以达到 Fine Tuning 的性能

与 Prefix Tuning 和 Prompt Tuning 这类在输入前可训练添加 prompt embedding 参数来以少量参数适配下游任务，**Adapter Tuning 则是在预训练模型内部的网络层之间添加新的网络层或模块来适配下游任务**。假设预训练模型函数表示为 ，对于 Adapter Tuning ，添加适配器之后模型函数更新为： ， 是预训练模型的参数， 是新添加的适配器的参数，在训练过程中， 被固定，只有 被更新。 ，这使得不同下游任务只需要添加少量可训练的参数即可，节省计算和存储开销，同时共享大规模预训练模型。

Adapter 主要包括 Series Adapter（串行） 和 Parallel Adapter（并行）：

- Series Adapter[[6\]](https://zhuanlan.zhihu.com/p/621700272#ref_6) 的适配器结构和与 Transformer 的集成如下图（a）所示。适**配器模块被添加到每个 Transformer 层两次：多头注意力映射之后和两层前馈神经网络之后**。适配器是一个 bottleneck（瓶颈）结构的模块，由一个两层的前馈神经网络（由向下投影矩阵、非线性函数和向上投影矩阵构成）和一个输出输出之间的残差连接组成。
- Parallel Adapter[[7\]](https://zhuanlan.zhihu.com/p/621700272#ref_7) 如下图（b）所示。**将适配器模块与每层 Transformer 的多头注意力和前馈层并行计算集成**

#### LoRA

传统大模型微调的问题

| 特性         | 传统微调                  | LoRA 微调                     |
| ------------ | ------------------------- | ----------------------------- |
| **参数量**   | 全部参数（2B → 2B）       | 只训练适配器（≈0.1B）         |
| **内存消耗** | 大（可能需要 48GB+ VRAM） | 小（8-16GB VRAM 即可）        |
| **训练速度** | 慢（几小时）              | 快（几十分钟）                |
| **磁盘存储** | 大（需要保存完整模型）    | 小（只保存适配器参数）        |
| **部署难度** | 高（需要加载完整模型）    | 低（加载预训练模型 + 适配器） |

LoRA 在项目中的优势

1. **内存节省**

```python
# 传统微调需要 ~20GB VRAM
# LoRA 微调只需要 ~8GB VRAM
```

2. **快速训练**

```
传统微调：5万步 → 6小时
LoRA 微调：5万步 → 1小时
```

3. **参数共享**

```
预训练权重可以在所有任务之间共享
只需要为每个任务保存适配器参数
```

4. **高效部署**

```python
# 部署时只需要：
base_model = load_pretrained_model()
lora_adapter = load_adapter()
model = base_model + lora_adapter
```

| 方法               | 参数效率           | 内存 | 训练速度 | 部署复杂度 |
| ------------------ | ------------------ | ---- | -------- | ---------- |
| **传统微调**       | 全部参数（2B）     | 大   | 慢       | 简单       |
| **LoRA**           | 低秩适配器（0.1B） | 小   | 快       | 中等       |
| **Prefix Tuning**  | 前缀嵌入           | 中   | 中       | 高         |
| **Adapter Tuning** | 额外网络           | 中   | 中       | 高         |

测试代码

```python
import torch
print(torch.cuda.device_count())

from torch import nn
from peft import LoraConfig, get_peft_model, PeftModel
import time

x_train = torch.randn((100, 10))
y_train = torch.randn((100, 1))

net = nn.Sequential(
    nn.Linear(10, 20),
    nn.Sigmoid(),
    nn.Linear(20, 30),
    nn.Sigmoid(),
    nn.Linear(30, 1)
)
print(net)

config = LoraConfig(target_modules=["0"],r=2)
model = get_peft_model(net, config)                       # 加了lora的网络
criterion = torch.nn.MSELoss(reduction='mean')            # 定义损失函数，采用均方误差
optimizer = torch.optim.Adam(model.parameters(), lr=0.3)  # 定义优化器，采用Adam


# base 前向计算时间
time1 = time.time()
for i in range(100000):
    y_pre = net(x_train)            # 前向传播
print("base 前向计算时间: ", time.time() - time1)

# lora 前向计算时间
time1 = time.time()
for i in range(100000):  
    y_pre = model(x_train)            # 前向传播
print("lora 前向计算时间", time.time() - time1)

# base 反向传播时间
time1 = time.time()
for i in range(100000):  
    y_pre = model(x_train)            # 前向传播
    loss = criterion(y_pre, y_train)  # 计算损失
    optimizer.zero_grad()             # 梯度清零
    loss.backward()                   # 反向传播
    optimizer.step()                  # 使用优化器更新梯度
print("base 反向计算时间", time.time() - time1)

# lora 反向传播时间
time1 = time.time()
for i in range(100000):
    y_pre = model(x_train)            # 前向传播
    loss = criterion(y_pre, y_train)  # 计算损失
    optimizer.zero_grad()             # 梯度清零
    loss.backward()                   # 反向传播
    optimizer.step()                  # 使用优化器更新梯度
print("lora 反向计算时间", time.time() - time1)
```

https://github.com/Akegarasu/lora-scripts/blob/main/README-zh.md

##### Lora 变体

**LoRA+**

- 一种修改学习率优化训练效果的办法
- 在本文中证明对适配器矩阵 A 和 B 使用相同的学习率并不能实现有效的特征学习。
- 使用LoRA对大宽度（嵌入维度）模型微调是次优的，通过精心选择的固定比率为 LoRA 适配器矩阵 A 和 B 设置不同的学习率，即可纠正 LoRA 的这种次优性，该算法称为 LoRA+。将矩阵B的学习率设置为远高于矩阵A的学习率，可以使得训练更加高效。
- LoRA+ 提高了1% ‑ 2%的性能和高达两倍的微调速度，而计算成本与 LoRA 相同。
- 对于如何设置矩阵A和B的学习率，默认使用 ，也可根据具体任务调整。

**DoRA**

- 一种拆分权重矩阵来提升训练效果的办法，可以增强 LoRA 的学习能力和训练稳定性。
- DoRA (Weight-Decomposed Low-Rank Adaptation) 的灵感来自于：矢量可以分解为幅度 （magnitude，表示其长度的标量值) 和方向 (direction，表示其空间方向的单位矢量)。其中，幅度表示权重矩阵的大小，而方向则描述了权重向量的方向变化。可以更好地捕捉复杂的特征关系。
- DoRA 基于对 LoRA 和全参数微调方法的分析和比较，发现LoRA 总是按比例增加或减少幅度和方向更新，但缺乏对方向进行细微调整的能力，而全参数微调可以实现只对方向矩阵进行细微的改变。因此，DoRA提出对幅度和方向分量的解耦，将 LoRA 仅应用于方向分量 ，同时也允许幅度分量 单独训练 (即对 进行全量微调，对 做 LoRA 微调)，以有效地减少可训练参数的数量

**[rsLoRA](https://zhida.zhihu.com/search?content_id=245130667&content_type=Article&match_order=1&q=rsLoRA&zhida_source=entity)**

- 一种优化矩阵的秩等参数提升训练效果的办法
- RSLoRA（rank-stabilized LoRA）通过动态调整低秩矩阵的秩和缩放系数来进行适配。这种动态调整机制可以在训练过程中根据数据分布和模型需求进行优化，保持模型的稳定性，避免过拟合或欠拟合

主要贡献就是研究了缩放因子对模型的影响，证明了应该除以秩的平方根，相比原始LoRA的方法，具有更好的性能和学习稳定性



**AdaLoRA**

- 一种通过更改矩阵的秩优化训练效果的办法
- AdaLoRA（Adaptive Low-Rank Adaptation）与相同秩的标准LoRA相比，两种方法总共有相同数量的参数，但在LoRA中所有矩阵的秩都是相同的，而在AdaLoRA中，不同适配器矩阵的秩不同。
- AdaLoRA使用[奇异值分解](https://zhida.zhihu.com/search?content_id=245130667&content_type=Article&match_order=1&q=奇异值分解&zhida_source=entity)的形式对增量更新进行参数化，大体上它给接近模型末尾的层提供了更高的秩。
- 通过两个方面来优化LoRA，（1）SVD形式参数更新（SVD-based adaptation）：将增量矩阵参数化为SVD的形式，避免了在训练过程中进行SVD计算带来的资源消耗；(2)基于重要程度的参数分配，裁剪一些冗余的奇异值。



### cot

**机器人必须能够在广泛的现实场景中进行泛化**一直是机器人领域的一个长期关注点。RT-X、RT-1、Octo、CrossFormer 这些都是在大量多样化机器人数据集训练的，明显提高了泛化能力

https://zhuanlan.zhihu.com/p/1943972298639013811

https://www.zhihu.com/tardis/zm/art/670907685?source_id=1003

uc伯克利有人在做 https://ecot-lite.github.io/。https://verityw.github.io/



### parquet

Parquet 是一种开源的列式存储文件格式，用于高效存储和分析大数据。与传统的行式存储格式（如 CSV 或 JSON）不同，Parquet 将同一列的数据存储在一起，从而提高了查询性能，并能通过先进的压缩和编码技术降低存储成本。它在 Hadoop 生态系统中被广泛使用，并被 [Apache Spark](https://www.ibm.com/cn-zh/think/topics/parquet)、[Apache Hive](https://www.infoq.cn/article/tsp7pghp8dcbhsdhaxds) 等多种大数据处理框架所支持和采用

随着大模型AI的进一步发展，我们需要存储和处理的数据量呈指数级增长，寻找存储各种数据风格的最佳方式依然是最大的挑战之一。

相信现在几乎已经没有人还会认为关系数据库是依然是唯一数据存储处理方式。

比如说抖音的视频和直播等信息，其原始数据通常是无法实现以传统（关系）数据库方式存储的，或者以传统方式存储它们需要大量的精力和时间，同时会增加总体数据的分析时间。

即使我们还在以某种方式坚持传统方法，结构化方式存储数据，但我们需要设计复杂且耗时的 ETL 工作负载来将这些数据移动到企业数据仓库中。

这种架构方式使得数据分析从业人员，可能被分为两类，一类人主要每天接触 Python负责处理转换数据到关系型数仓，一类主要接触SQL针对关系型数据库进行分析

可以说最近几年 Parquet 已经被认为是当今存储数据的事实上的标准了，它主要有以下几个优势：

1. **数据压缩：**通过应用各种编码和压缩算法，Parquet 文件可减少内存消耗，减少存储数据的体积。
2. **[列式存储](https://zhida.zhihu.com/search?content_id=239272919&content_type=Article&match_order=1&q=列式存储&zhida_source=entity)：**快速数据读取操作在数据分析工作负载中至关重要，列式存储是快速读取的关键要求。
3. **与语言无关：**开发人员可以使用不同的编程语言来操作 Parquet 文件中的数据。
4. **开源格式：**这意味着您不会被特定供应商锁定
5. **支持复杂数据类型**

我们已经提到过 Parquet 是一种基于列的存储格式。

然而，要了解使用 Parquet 文件格式的好处，我们首先需要区分基于行和基于列的数据存储方式。

在传统的基于行的存储中，数据存储为行序列

现在我们举例OLAP数据分析中的一个场景，用户可能会问的一些常见问题：

- 我们卖了多少个球？
- 有多少美国用户购买了 T 恤？
- 客户 Maria Adams 的总消费金额是多少？
- 1 月 2 日我们有多少销售额？

为了能够回答这些问题，引擎必须从头到尾扫描每一行！

因此，为了回答这个问题：有多少美国用户购买了 T 恤，引擎必须执行以下操作

本质上，我们只需要两列中的信息：产品（T 恤）和国家/地区（美国），但引擎将会扫描所有五列数据！

这不是我们想要的最有效的解决方案。

现在让我们看看列存储是如何工作的，是否如您可能猜想的那样

如上图所示，在这种情况下，每一列都是一个单独的实体 - 这意味着，每一列在物理上都与其他列分开的！

回到我们之前的业务问题：引擎现在可以只扫描查询所需的列（产品和国家/地区），同时跳过不必要扫描的列。

在大多数情况下，这种数据跳过应该会提高分析查询的性能。

好的，但在Parquet诞生之前，列式存储早已经出现

实际上我们在OLAP场景中，主要关心两个概念：

1. **投影**
2. **谓词**

投影是指SQL 语言中的**SELECT**语句 - 查询需要哪些列。回到之前的示例，我们只需要“产品”和“国家/地区”列，因此引擎可以跳过扫描其余的列。

谓词是指SQL 语言中的**WHERE**子句 – 哪些行满足查询中定义的条件。在我们的例子中，我们只对 T 恤感兴趣，因此引擎可以完全跳过扫描第 2 行组，其中“产品”列中的所有值都等于袜子！

让我们暂停总结分析一下，因为我希望您认识到各种类型的存储在引擎需要执行的工作方面的差异：

- 行存储——引擎需要扫描所有 5 列和所有 6 行
- 列存储 – 引擎需要扫描 2 列和所有 6 行
- 具有行组的列存储 – 引擎需要扫描 2 列和 4 行

显然，这是一个过于简化的示例，只有 6 行和 5 列，您绝对看不到这三种存储选项之间的性能差异。然而，在现实生活中，当您处理大量数据时，差异就会变得更加明显。

**现在，最急切的问题是：Parquet 是如何“知道”要跳过/扫描哪个行组？**

**Parquet 文件包含元数据**

这意味着，每个 Parquet 文件都包含“有关数据的数据”，例如特定行组内特定列中的最小值和最大值等信息。

此外，每个 Parquet 文件都包含一个页脚，其中保存有关格式版本、架构信息、列元数据等信息。[您可以在此处](https://link.zhihu.com/?target=https%3A//parquet.apache.org/docs/file-format/metadata/)找到有关 Parquet 元数据类型的更多详细信息。

为了优化性能并消除不必要的数据结构（行组和列），引擎首先需要“熟悉”数据，因此它首先读取元数据。

虽然这个操作不算慢，但还是需要一定的时间，因此，如果您从多个小型 Parquet 文件中查询数据，查询性能可能会降低，因为引擎必须从每个文件中读取元数据。

因此，您最好将多个较小的文件合并为一个较大的文件（但仍然不要太大)

那么什么是“大”，什么是“小”呢，这里没有单一的“黄金”数字，因为这和任务的处理瓶颈是相关的，一般我们建议[单个 Parquet 文件的大小至少应为几百 MB](https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DRxjMibOx__A)。

当说数据湖文件组织格式所提供能力时，主要是 Parquet 文件的版本控制。它还存储事务日志，以便跟踪应用于 Parquet 文件的所有更改。这也称为[ACID 兼容事务](https://link.zhihu.com/?target=https%3A//www.ibm.com/docs/en/cics-ts/5.4%3Ftopic%3Dprocessing-acid-properties-transactions)。

由于它不仅支持 ACID 事务，还支持时间旅行（回滚、审计跟踪等）和 DML（数据操作语言）语句，例如 INSERT、UPDATE 和 DELETE，等数据仓库的行为，所以又被叫做“data warehouse on the data lake”

https://zhuanlan.zhihu.com/p/680143641



### CUDA

cuda

[CUDA](https://zhida.zhihu.com/search?content_id=236817005&content_type=Article&match_order=1&q=CUDA&zhida_source=entity)（Compute Unified Device Architecture）是由[NVIDIA](https://zhida.zhihu.com/search?content_id=236817005&content_type=Article&match_order=1&q=NVIDIA&zhida_source=entity)推出的一种并行计算平台和编程模型。它允许开发者使用通用编程语言（如C、C++）来利用NVIDIA GPU进行并行计算。CUDA提供了一组库、编译器、运行时系统和开发工具，使开发者能够更轻松地利用GPU的计算能力

cuda-toolkit

[CUDA Toolkit](https://zhida.zhihu.com/search?content_id=236817005&content_type=Article&match_order=1&q=CUDA+Toolkit&zhida_source=entity)是用于CUDA开发的软件包，包括了CUDA编译器、运行时库、GPU驱动程序、开发工具等。CUDA Toolkit提供了一整套用于开发GPU加速应用程序的工具和库，以及与NVIDIA硬件和驱动程序的兼容性。

CUDA Toolkit 完整和不完整的区别：在安装了CUDA Toolkit (Pytorch)后，只要系统上存在与当前的 cudatoolkit 所兼容的 Nvidia 驱动，则已经编译好的 CUDA 相关的程序就可以直接运行，不需要重新进行编译过程。如需要为 Pytorch 框架添加 CUDA 相关的拓展时（Custom C++ and CUDA Extensions），需要对编写的 CUDA 相关的程序进行编译等操作，则需安装完整的 Nvidia 官方提供的 CUDA Toolkit

[nvidia-driver](https://zhida.zhihu.com/search?content_id=236817005&content_type=Article&match_order=1&q=nvidia-driver&zhida_source=entity)

nvidia-driver(NVIDIA驱动程序)是操作系统与NVIDIA GPU硬件之间的软件接口。它负责管理GPU硬件的操作、资源分配、性能优化等任务。CUDA依赖于NVIDIA的驱动程序，因为它需要与GPU硬件进行通信以执行并行计算任务。在使用CUDA进行开发时，确保安装了与CUDA兼容的NVIDIA驱动程序是很重要的。

理解驱动的定义，有助于理解nvidia-driver

[cuDNN](https://zhida.zhihu.com/search?content_id=236817005&content_type=Article&match_order=1&q=cuDNN&zhida_source=entity)

CuDNN（CUDA Deep Neural Network library）是NVIDIA提供的用于**深度学习任务的GPU加速库**。它是专门为使用CUDA（Compute Unified Device Architecture）平台的深度学习框架而设计的，旨在优化深度神经网络的计算性能。

CuDNN提供了一系列**高度优化的基本操作和算法，例如卷积、池化、归一化等**，这些操作是深度学习中常见的基本构建块。通过使用CuDNN，深度学习框架可以利用NVIDIA GPU的并行计算能力，加速神经网络的训练和推理过程。



