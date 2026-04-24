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



## 训练监督策略

VLA模型的训练方法分为监督学习、自监督学习和强化学习三类

监督学习

大多数VLA模型采用监督学习的方式，在由图像、语言和动作组成的数据集上进行训练。由于许多VLA模型基于LLMs构建，训练通常被构建为下一个token预测任务。动作损失函数的选择取决于动作头部的架构（如MLPs、扩散模型或流匹配网络），以确保为每种模型类型提供适当的监督。

VLA训练通常包括两个阶段：预训练和后训练。在很多情况下，首先使用在网络规模数据上预训练的LLM或VLM作为初始骨干网络进行训练。虽然有些模型从零开始训练，但更常见的做法是利用预训练的VLM（已获取常识知识）进行初始化，以提升泛化能力。预训练通常使用人类演示数据、异构机器人演示数据或与机器人规划相关的视觉问答（VQA）数据集。与LLMs类似，数据规模对VLA预训练至关重要。利用大规模、多样化的数据集，能够开发出在任务和实体方面具有更强泛化能力的VLA模型。在预训练阶段，通常对预训练的VLM进行全量微调，以适应机器人相关领域。有关预训练的更多细节，请参见第5.4.1节。

预训练之后，使用特定于任务或机器人的数据集进行后训练。在这一阶段，数据质量往往比数量更重要，且所使用的数据集通常比预训练数据集小。不同实现的微调策略有所不同：有些方法对整个模型进行全量微调，而另一些方法则仅对动作头部进行适配。

此外，原本为LLMs开发的上下文学习技术，也已应用于VLA系统。上下文VLA模型无需在演示数据上进行显式微调，而是在测试时以少量人类远程操作轨迹作为提示，即可推断出相应的机器人动作。例如，ICRT提出了一种框架，提供1-3个远程操作演示作为提示，使模型能够以零样本方式生成相应的机器人动作

自监督学习有时会用于VLA模型的训练，主要用于以下三个目的。

（1）**模态对齐**：模态对齐旨在学习VLA模型中跨模态的时序和任务级一致性。例如，TRA利用对比学习，在共享潜在空间中对齐当前状态和未来状态的表征，实现时序对齐。类似地，通过对比目标将语言指令嵌入与目标图像嵌入对齐，实现任务对齐。

（2）**视觉表征学习**：视觉表征学习旨在通过掩码自编码（如MAE）、对比学习（如CLIP）和自蒸馏（如DINOv2）等技术，从图像或视频中提取视觉特征。这些预训练模型作为基础视觉编码器，在VLA模型中得到了广泛应用。

（3）**潜在动作表征学习**：如第4.2节和第4.4.3节所述，潜在动作表征学习利用自监督技术学习动作嵌入。通过从初始图像和目标图像中提取潜在动作，并利用初始图像和提取的潜在动作重建目标图像，模型能够在无需显式标签的情况下学习有意义的动作表征。这种方法具有高度的可扩展性，适用于大规模无标注数据集

强化学习

尽管VLA模型通常通过模仿学习进行训练，但仅依靠模仿学习存在一些局限性，例如无法处理新行为，且需要大量高质量的专家演示数据。为解决这些问题，已有多项研究探索利用RL（如PPO和SAC）对VLA模型进行微调或训练低层策略

（1）**利用RL改进VLA**：近年来的研究利用RL提升VLA模型的稳健性、适应性和实际场景性能。有多种方法通过RL对VLA模型进行微调，以任务成功或失败作为奖励信号。例如，iRe-VLA通过以下步骤实现高性能：在专家数据上进行SFT；利用成功和失败奖励对动作头部进行在线RL训练；然后利用专家数据和在线学习过程中收集的成功轨迹再次进行SFT。ConRFT首先在少量演示数据上进行模仿学习；然后通过离线RL学习Q函数；最后通过人类干预在线微调策略。这种方法受到SERL和HIL-SERL等现有框架的启发，这些框架是为实际机器人学习设计的无重置、离策略RL方法。VLA-RL引入了机器人过程奖励模型（RPRM），用基于抓手动作和任务进展的密集伪奖励替代稀疏的二元奖励，实现了更稳定的基于PPO的训练。RLDG利用通过HIL-SERL收集的成功轨迹，对OpenVLA和Octo等大型VLA模型进行微调，能够将多个专家策略整合到一个统一的VLA模型中。MoRE在VLA中引入了MoE结构，支持按token选择专家，并通过RL进行优化。RLRC通过剪枝移除OpenVLA中高达90%的参数来压缩模型，通过SFT恢复性能，然后利用任务级反馈通过RL进行最终微调。这些研究表明，将RL与专家演示或人类干预相结合，能够显著提升VLA模型在实际场景中的灵活性和可靠性。最近，为解决扩散链反向传播可能带来的不稳定性，DSRL提出在扩散策略的潜在噪声空间中应用RL。这种方法在RL微调过程中无需更新底层VLA模型的参数，而是学习潜在噪声的分布，使模型能够采样出具有信息性的初始噪声向量，而非从标准高斯分布中采样。值得注意的是，DSRL的研究表明，仅使用10K样本，就能将的成功率从约20%提升到近100%。

（2）**VLA作为高层策略，RL用于低层控制**：这类方法将高层决策交给VLA，而低层控制则由通过RL训练的策略负责。例如，Humanoid-VLA利用VLA生成高层指令，由通过RL训练的全身控制器为类人机器人执行这些指令。NaVILA采用类似策略，利用RL将VLA输出的速度指令转换为腿部机器人的力矩控制。更先进的系统SLIM针对由四足基座和机械臂组成的移动操作机器人，首先利用特权输入（如脚步规划、物体放置和子任务标识）通过RL训练一个教师策略，生成基座和机械臂轨迹；然后通过模仿学习将该策略蒸馏到学生VLA中，实现从图像和语言到动作的端到端映射。RPD采用互补方法，利用预训练的VLA指导RL过程中的探索。在这种方法中，VLA作为教师，为学习过程提供指导，而非作为高层控制器。

此外，LUMOS通过在世界模型的潜在空间中进行强化学习，实现模仿学习，其内在奖励用于量化潜在空间中与专家轨迹的偏差。DexTOG利用扩散模型生成多种抓取位姿候选，并通过强化学习评估每个候选位姿是否能导致任务成功。通过利用成功轨迹进行迭代微调，扩散模型能够学习到适合后续任务的特定于物体的抓取位姿。

尽管越来越多的VLA方法整合了RL，但由于样本效率低、实际场景探索存在安全风险以及计算效率低等问题，大多数现有研究仍局限于模拟环境或简化的实际场景设置

### 预训练和后训练

VLA模型的训练通常包含多个阶段，每个阶段针对学习的特定方面。预训练旨在获取通用能力，促进跨不同机器人实体的迁移。当使用预训练的VLM作为VLA模型的骨干网络时，需要对其进行机器人领域适配，以实现语言和视觉理解与动作的有效关联。随后的后训练阶段，利用高质量的机器人演示数据对模型进行进一步优化，以提升在特定下游任务中的性能

预训练对VLA模型的泛化能力和语义关联能力具有关键影响。本小节将概述近年来预训练流程中的关键策略和设计选择，重点说明大规模多模态数据、强大的VLM骨干网络以及训练稳定技术如何助力有效的策略初始化。

（1）**数据规模与来源**：训练数据的规模和异构性对VLA模型在不同场景、物体和任务中的泛化能力具有显著影响。近年来的模型越来越多地利用大规模数据集，这些数据集整合了机器人演示数据、网络规模的视觉-语言语料库和结构化标注，以提升语义理解和视觉-运动关联能力。

例如，在跨越不同实体和任务的数百万条实际场景轨迹上进行训练。其后续模型通过进一步整合机器人数据和常用于目标检测与视觉推理的大规模视觉-语言数据集（如COCO、VQA），扩展了这一方法。该模型通过多种辅助交叉熵损失进行训练，涵盖边界框预测、图像描述生成、子任务语言生成和离散动作预测等多个任务。

类似地，Gr00T N1引入了辅助边界框损失，以提升空间定位和可用性检测能力。这些边界框标签通过OWL-ViT获取，使模型能够从弱监督视觉数据中学习。Gr00T N1进一步利用第一人称人类视频，从中提取潜在动作表征，用于监督VLA模型。此外，该模型还引入了在模拟环境中生成的多样化合成轨迹，并利用COSMOS世界模型将这些轨迹转换为真实感强的视觉观测，提升了模型学习长周期、多阶段行为的能力。

这些方法表明，VLA训练数据不仅在规模上不断扩大，在结构和模态多样性方面也在不断丰富。通过在动作、关联和推理任务上进行联合训练，现代VLA模型能够学习到更丰富的表征，为稳健的策略学习和泛化提供支持。

**VLM骨干网络**：近年来VLA模型的一个常见做法是利用在大规模网络数据上预训练的视觉-语言模型（VLMs）。这种策略使模型能够继承广泛的视觉和语言先验知识，包括常识知识、语义关联能力和推理能力。通过将低层感知关联与动作策略学习分离，预训练的VLMs为各种机器人任务提供了灵活的基础，且只需少量额外监督。下文将介绍已应用于VLA模型的代表性VLM骨干网络。

- 谷歌开发的PaLM-E与PaLI-X一起，被用作RT-2及其后续VLA模型的骨干网络。
- PaliGemma将Gemma与SigLIP相结合，被Physical Intelligence开发的和采用。
- PrismaticVLM基于LLaMA 2，将其与DINOv2和SigLIP相结合。目前广泛应用于OpenVLA和CogACT等VLA模型中。
- 阿里巴巴开发的Qwen2.5-VL将Qwen2.5 LLM与基于ViT的视觉编码器相结合，应用于NORA、Interleave-VLA和CombatVLA等多种VLA模型。
- LLaVA通过MLP将基于LLaMA的LLM Vicuna与CLIP的视觉编码器整合，广泛应用于OpenHelix、OE-VLA和RationalVLA等模型。
- 谷歌开发的Gemini 2.0包含多种变体，如用于机器人问答的Gemini Robotics-ER，以及将功能扩展到VLA应用的Gemini Robotics。
- Fuyu-8B：应用于QUAR-VLA和MoRE。
- OpenFlamingo：应用于RoboFlamingo、DeeRVLA和RoboMM。
- BLIP-2：应用于3D-VLA。
- LLaMA3.2：应用于FOREWARN。
- AnyGPT：应用于SOLAMI。
- Phi：应用于TraceVLA、UP-VLA和HybridVLA。
- Molmo：应用于UAV-VLA。
- VILA：应用于NaVILA和HAMSTER。
- InternVL：应用于GO-1。
- Eagle-2：应用于GR00T N1。
- Chameleon：应用于WorldVLA。

这表明当前VLA领域中使用的VLM骨干网络具有广泛的多样性。

（3）**梯度隔离**：VLA模型训练中的一个新兴趋势是防止梯度从动作头部传播到视觉-语言骨干网络。允许从随机初始化的动作头部传播梯度，可能会破坏已学习到常识知识的预训练表征，导致训练不稳定且效率低下。已有研究表明，这种梯度隔离策略能显著提升训练稳定性和效率。GR00T N1.5也将VLA模型完全冻结，可能出于类似原因。类似地，RevLA通过受模型融合启发的方法，逐步恢复骨干模型权重，以解决灾难性遗忘问题。

（4）**稳定性与效率策略**：Re-Mix根据超额损失（excess loss）调整各个数据集的采样权重，超额损失用于量化每个领域中策略仍有提升空间的程度

后训练

与依赖大规模、多样化数据集的预训练不同，后训练需要高质量的特定于机器人和任务的数据。由于全量微调通常需要大量计算资源，因此一种替代策略是仅微调动作头部，同时冻结骨干网络权重。另一种方法是使用LoRA，这种方法能够实现参数高效的微调，在性能和资源消耗之间取得良好平衡。

此外，BitVLA引入了一种基于蒸馏的方法对视觉编码器进行量化，旨在实现内存高效的训练。具体而言，通过将全精度编码器蒸馏到量化的学生模型中，将视觉编码器压缩到1.58位。这种策略在大幅节省内存的同时，仅导致轻微的性能损失，从而有助于在资源受限的系统上实现高效部署。

（1）**冻结骨干网络vs全量微调**：在将预训练的VLMs适配到机器人任务时，一个关键的设计选择是冻结视觉-语言骨干网络还是进行全量微调。这一决策涉及多个维度的根本权衡

（a）**计算效率**：冻结骨干网络只需计算动作头部的梯度，因此显著减少了GPU内存占用和训练时间，甚至可以在消费级GPU上进行训练。相比之下，全量微调需要大量计算资源，通常需要大型GPU集群和较长的训练时间，这对许多研究者来说难以实现。

（b）**领域适配**：全量微调通过端到端优化，能够联合学习感知和控制，使模型能够适应机器人特定的视觉模式和领域知识。然而，冻结的骨干网络无法适应这些领域差异，可能导致预训练表征与机器人感知需求之间存在差距。

（c）**性能-资源权衡**：当有足够的数据和计算资源时，对VLA模型进行全量微调通常能获得最佳的特定任务性能，但这需要承担高昂的计算成本。为缓解这一问题，低秩适应（LoRA）等参数高效适配方法提供了一种可行的替代方案。例如，OpenVLA的研究表明，LoRA能够在显著减少内存和计算需求的同时，实现具有竞争力的性能，使训练可以在消费级GPU上进行，而无需依赖大型集群。近年来的研究还探索了中间策略，如分阶段解冻或选择性微调特定层，以在适配能力和效率之间取得平衡。

（d）**知识保留**：冻结的骨干网络能够保留从网络规模数据中学习到的丰富视觉和语言表征，避免了对通用视觉-语言能力的灾难性遗忘。尽管全量微调使模型能够针对机器人视觉特征和动作关联语言进行特化，但可能会导致这些预训练表征的退化，从而可能丢失对零样本泛化有益的宝贵通用知识

为解决实际场景执行过程中的延迟问题，实时分块（RTC）技术引入了一种异步动作生成策略。RTC通过固定已执行的动作，同时生成序列中的后续动作，来缓解延迟问题。该方法利用软掩码（soft masking）维持与历史轨迹的时序一致性，同时能够根据更新的传感输入进行动态重规划。

此外，DeeR-VLA经过训练，能够在Transformer的每一层预测动作。如果连续两层预测的动作差异较小，则跳过剩余层以加速推理。VLA-Cache通过识别静态token并复用先前步骤中计算的特征，提高了推理速度



### rlhf

https://huggingface.co/blog/zh/rlhf

过去几年里各种 LLM 根据人类输入提示 (prompt) 生成多样化文本的能力令人印象深刻。然而，对生成结果的评估是主观和依赖上下文的，例如，我们希望模型生成一个有创意的故事、一段真实的信息性文本，或者是可执行的代码片段，这些结果难以用现有的基于规则的文本生成指标 (如 [BLEU](https://en.wikipedia.org/wiki/BLEU) 和 [ROUGE](https://en.wikipedia.org/wiki/ROUGE_(metric))) 来衡量。除了评估指标，现有的模型通常以预测下一个单词的方式和简单的损失函数 (如交叉熵) 来建模，没有显式地引入人的偏好和主观意见。

如果我们 **用生成文本的人工反馈作为性能衡量标准，或者更进一步用该反馈作为损失来优化模型**，那不是更好吗？这就是 RLHF 的思想：使用强化学习的方式直接优化带有人类反馈的语言模型。RLHF 使得在一般文本数据语料库上训练的语言模型能和复杂的人类价值观对齐

RLHF 是一项涉及多个模型和不同训练阶段的复杂概念，这里我们按三个步骤分解：

1. 预训练一个语言模型 (LM) ；
2. 聚合问答数据并训练一个奖励模型 (Reward Model，RM) ；
3. 用强化学习 (RL) 方式微调 LM

RLHF的训练分为两个关键阶段：

1. **奖励模型训练**：根据人类提供的偏好数据构建奖励函数，这个奖励函数为每个生成的响应分配一个分数。
2. **策略优化**：通过强化学习算法优化语言模型，使生成的内容能够最大化奖励函数的输出。

在这种背景下，RLHF有以下几个核心需求：

- **稳定性和效率**：语言模型参数通常高达数十亿甚至更多，训练中的不稳定性会导致训练崩溃或结果不可用。
- **对[KL散度](https://zhida.zhihu.com/search?content_id=251181114&content_type=Article&match_order=1&q=KL散度&zhida_source=entity)的控制**：语言模型需要在优化奖励函数的同时，保持与初始参考策略的相似性，以避免生成质量的退化。
- **高效的采样和更新**：算法需要在有限的计算资源下，对复杂策略进行高效更新

https://github.com/huggingface/trl

https://github.com/CarperAI/trlx

https://github.com/allenai/RL4LMs

https://github.com/facebookresearch/Pearl

https://github.com/BVLC/caffe    https://caffe.berkeleyvision.org/

https://github.com/Farama-Foundation/Gymnasium



#### RL算法

https://hrl.boyuai.com/chapter/3/%E6%A8%A1%E4%BB%BF%E5%AD%A6%E4%B9%A0

https://zhuanlan.zhihu.com/p/10791831521

- **Off-policy方法——将收集数据当做一个单独的任务**

智能体用来更新其策略（πθ\pi_\theta\pi_\theta）的数据，**可以由任意其他策略**（行为策略 μ\mu\mu）生成。这意味着你可以使用旧数据、其他智能体的数据，甚至随机数据来训练你的目标策略。

- **样本效率高**：可以重复利用历史数据（通过「[经验回放缓冲区](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=经验回放缓冲区&zhida_source=entity)」 Replay Buffer），极大地减少了与环境的交互次数。这对于交互成本高的任务尤其重要。
- **探索与利用分离**：行为策略 μ\mu\mu 可以专注于探索，而目标策略 πθ\pi_\theta\pi_\theta 可以专注于优化，两者可以并行进行。
- **需要校正**：由于数据来源与目标策略不一致，直接使用会导致偏差。因此，需要引入重要性采样（Importance Sampling, IS）、Q-learning、V-trace、或者通过价值函数学习等机制来校正这种分布差异，以保证学习的正确性。校正不当可能导致高方差或不收敛。

- **[On-policy](https://zhida.zhihu.com/search?content_id=165115221&content_type=Article&match_order=1&q=On-policy&zhida_source=entity)——行为策略与目标策略相同**

智能体用来更新其策略（πθ\pi_\theta\pi_\theta）的数据，**必须由当前正在学习和优化的目标策略** πθ\pi_\theta\pi_\theta 自己生成。如果策略参数 θ\theta\theta 发生了变化，那么就需要重新与环境交互，采集由新策略生成的数据。

- **理论推导简单**：由于数据来源与目标策略一致，梯度计算通常更直接，无需[重要性采样](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=重要性采样&zhida_source=entity)这种复杂的校正机制。
- **无偏估计**：在满足一定条件下（如 tabular 情形或兼容函数逼近），梯度估计是无偏的，有助于算法稳定收敛。
- **样本效率低**：一旦策略更新，旧数据就「作废」了，不能直接用于新策略的更新，必须重新采样。这导致了大量的环境交互。
- **探索与利用的矛盾**：为了确保数据来自当前策略，需要在探索和利用之间取得平衡。过于激进的探索可能导致策略不稳定，过于保守则可能陷入局部最优

Off-policy方法——将收集数据当做一个单独的任务

RL算法中需要带有随机性的策略对环境进行探索获取学习样本，一种视角是：off-policy的方法将收集数据作为RL算法中单独的一个任务，它准备两个策略：行为策略(behavior policy)与目标策略(target policy)。行为策略是专门负责学习数据的获取，具有一定的随机性，总是有一定的概率选出潜在的最优动作。而目标策略借助行为策略收集到的样本以及策略提升方法提升自身性能，并最终成为最优策略。Off-policy是一种灵活的方式，如果能找到一个“聪明的”行为策略，总是能为算法提供最合适的样本，那么算法的效率将会得到提升

| 特性             | **On-Policy (PPO)**  | **Off-Policy (BC)**    |
| ---------------- | -------------------- | ---------------------- |
| **数据来源**     | 环境交互采样         | 离线数据集             |
| **与预训练结合** | ✅ 互补（纠正错误）   | ❌ 重复（已有 BC 训练） |
| **任务适应**     | ✅ 非常强             | ✅ 强，但依赖数据覆盖   |
| **计算效率**     | ❌ 低（需要交互）     | ✅ 高（只训练一次）     |
| **稳定性**       | ✅ 稳定（KL惩罚保护） | ✅ 稳定                 |

Online + On-policy

这是最直观、理论推导最「纯粹」的 RL 设置。智能体在训练过程中不断与环境交互，并确保每次更新策略时，所用的数据都来自当前策略的最新版本。一旦策略更新，旧数据就被丢弃。

这种方法梯度估计通常无偏，理论收敛性好。但样本效率极低，每次策略更新都需要新的数据。这在环境交互成本高昂时是不可接受的。

典型算法：

- **[PPO](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=PPO&zhida_source=entity)**：目前工业界和学术界最受欢迎的 On-policy 算法之一，通过 Clip 或 KL 散度约束来限制策略更新幅度，保证稳定性。当前 LLM + RL 后训练流行的诸多算法都是它的变种。
- **[A2C](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=A2C&zhida_source=entity) / [A3C](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=A3C&zhida_source=entity)**：Actor-Critic 架构的代表，通过异步或同步方式并行收集数据并更新策略。
- **[REINFORCE](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=REINFORCE&zhida_source=entity)**：最基础的策略梯度方法，直接基于回合回报更新策略。

Online + Off-policy

智能体在训练过程中**仍然与环境交互**，但它会将收集到的经验存储在一个「经验回放缓冲区」（Replay Buffer）中。在策略更新时，算法可以从这个缓冲区中随机抽取历史数据进行学习，而这些数据可能由过去不同版本的策略生成。

这极大地提高了样本效率，因为数据可以被重复利用多次。同时，通过行为策略（通常带有探索机制，如 ϵ\epsilon\epsilon-greedy 或噪声）来收集数据，而**目标策略则专注于优化**，实现了探索与利用的分离。

但由于数据来自不同的行为策略，需要特殊的校正机制（如 Q-learning 的贝尔曼更新、重要性采样）来消除偏差。但要注意，校正只在行为与目标差异不大时效果才好，不可无限度偏离。

典型算法：

- **DQN**：通过 Q 值函数学习，利用经验回放和目标网络来稳定离散动作空间的学习。
- **[SAC](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=SAC&zhida_source=entity)**：结合了最大熵原理的 Actor-Critic 算法，利用经验回放，在连续动作空间表现出色。
- **[DDPG](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=DDPG&zhida_source=entity)/ TD3**：用于连续动作空间的 Actor-Critic 算法，也广泛使用经验回放。
- **[IMPALA](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=IMPALA&zhida_source=entity)**：一种分布式 RL 框架，通过 V-trace 算法实现 Off-policy 校正，允许学习器使用来自多个行为器的旧数据。

Offline + On-policy

这个组合在「策略改进」的语境下，几乎是矛盾的，因此在实际的 RL 算法中很少见到。

- Offline：意味着训练期间不与环境交互，只能使用一个预先固定的静态数据集。
- On-policy：意味着用来更新策略的数据必须来自当前的目标策略。

如果你有一个静态数据集，它是由某个固定的行为策略 μ\mu\mu 采集的。如果你想「改进」策略，那就意味着你的目标策略 π\pi\pi 会发生变化，从而不再是最初的 μ\mu\mu。一旦 π≠μ\pi \neq \mu\pi \neq \mu，那么你手中的静态数据就立刻变成了「异策略」数据，不再满足 On-policy 的条件。

这个组合只在一种情况下有意义——当你**不打算改进策略，而只是想离线评估**一个已部署策略的价值时。例如，你有一份由某个生产系统采集的历史数据，你只希望计算出当前系统策略的期望回报，而不去改变它。这种情况下，你的目标策略就是那个数据采集策略，并且你没有新的交互。

代表场景：

- **Batch Policy Evaluation**：使用 Monte Carlo 或 TD(λ\lambda\lambda) 等方法，在静态数据集上估计一个给定策略的价值函数，而不进行策略更新。

作者：tomsheep
链接：https://www.zhihu.com/question/1923492665154049281/answer/1923493513200378057
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Offline + Off-policy

这是当前「离线强化学习」研究的主战场。智能体只能从一个预先收集好的静态数据集中学习，并且由于数据是由旧的或不同的行为策略采集的，可以说它**天然就是异策略**的。算法的核心挑战在于如何利用这些「陈旧」且可能与目标策略分布不符的数据，安全有效地学习一个高性能的策略，避免 OOD error。

优点是无需实时交互，极大地降低了训练成本和安全风险。但由于数据分布差异，很容易导致策略在数据未覆盖的区域做出错误的、过高的 Q 值估计，从而导致性能崩溃。需要特殊的算法设计来解决这个问题。

典型算法：

- **[CQL](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=CQL&zhida_source=entity)**：通过增加一个正则项，强制 Q 值函数在数据集中观察到的动作上保守，避免在未观察到的动作上过高估计。
- **[BCQ](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=BCQ&zhida_source=entity)**：通过限制智能体的动作选择，使其尽可能接近数据集中出现的动作，从而避免 OOD 问题。
- **[IQL](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=IQL&zhida_source=entity)**：通过隐含地学习价值函数来避免 Q 值过高估计的问题，并结合优势加权策略。
- **[BEAR](https://zhida.zhihu.com/search?content_id=734945665&content_type=Answer&match_order=1&q=BEAR&zhida_source=entity)**：关注如何减少自举误差积累，并通过 MMD（最大均值差异）约束行为策略与目标策略的相似性。
- **Decision Transformer**：将 RL 问题转化为序列建模问题，利用 Transformer 架构直接从历史数据中学习给定期望回报的动作序列。

DQN,

DQN适用于离散动作空间的强化学习问题，其目标是学习一个近似的Q值函数。Q值函数的更新公式为：

在DQN中，动作是离散的，通常使用-贪婪策略进行选择。然而，LLM（Large Language Models）的输出是连续概率分布，无法直接适配离散动作的Q学习方法。要应用DQN，需要对动作空间进行离散化，但这会引入近似误差，导致生成质量下降。

同时，DQN存在样本效率较低和收敛性不稳定的问题，在RLHF的大规模复杂任务中会放大这些缺点

##### PPO



##### GRPO

在目前大语言模型中进行微调的流程中，一般在监督微调（[Supervised Fine-Tuning](https://zhida.zhihu.com/search?content_id=253231707&content_type=Article&match_order=1&q=Supervised+Fine-Tuning&zhida_source=entity), SFT）阶段之后，进一步通过强化学习对模型进行优化可以显著提升其性能。而**Group Relative Policy Optimization (GRPO)，就是使用在该阶段，替换传统的[PPO](https://zhida.zhihu.com/search?content_id=253231707&content_type=Article&match_order=1&q=PPO&zhida_source=entity)算法**

**Proximal Policy Optimization (PPO)** 是一种广泛使用的强化学习算法，尤其适用于对 LLMs 进行微调。PPO 的目标是通过最大化以下替代目标函数来优化策略模型

其中，*πθ* 和 *πθ_old* 分别是当前策略模型和旧策略模型，q 和 o 是从问题数据集和旧策略 *πθ_old* 中采样的问题和输出。超参数 *ϵ* 用于稳定训练过程。优势 *A_i* 是通过广义优势估计（Generalized Advantage Estimation, GAE）计算的，计算过程基于奖励 {*ri*≥*j*} 和学习到的值函数 *Vπold*。为了减轻对奖励模型的过度优化，标准方法是在每个标记的奖励中添加一个来自参考模型的每个标记的KL惩罚

其中， 是奖励模型， 是参考模型，通常是初始的监督微调（SFT）模型，而 是 KL 惩罚项的系数。

然而，PPO 中的***值函数通常是一个与策略模型大小相当的模型\***，***这带来了显著的内存和计算负担\***。此外，在 LLMs 的上下文中，值函数在训练过程中被用作优势计算中的Baseline，但通常只有最后一个 token 会被奖励模型赋予奖励分数，这可能使得值函数的训练变得复杂。

为了解决这些问题，我们提出了 **Group Relative Policy Optimization (GRPO)**，不再需要像PPO那样加入额外的价值函数近似***，而是直接使用多个采样输出的平均奖励作为Baseline\***，显著减少了训练资源的使用

结果监督强化学习与 GRPO：

对于每个问题 q，从旧策略模型 πθ_old 中抽取一组输出 {o1, o2, ..., oG}。然后使用奖励模型对这些输出进行评分，产生相应的 G 个奖励 r={r1, r2, ..., rG}。随后，通过减去组平均值并除以组标准差来对这些奖励进行标准化处理。结果监督在每个输出 oi 的末尾提供标准化的奖励，并将输出中所有token的优势 Aˆi,t 设定为该标准化奖励，即 Aˆi,t = (ri - mean(r)) / std(r)，然后通过最大化方程（3）中定义的目标来优化策略。

过程监督强化学习与GRPO:

结果监督仅在每个输出结束时提供奖励，这可能不足以有效监督复杂数学任务中的策略。遵循历史方法，我们还探讨了过程监督，它在每个推理步骤结束时提供奖励。

具体来说，给定问题 q 和 G 个抽样输出 {o1, o2, ..., oG}，使用过程奖励模型对每个输出步骤进行评分，从而得到相应的奖励：R={{rindex(1), ..., rindex(K1)}, ..., {rindex(1)11G, ..., rindex(KG)G}}，其中 index(j) 是第 j 步的结束标记索引，Ki 是第 i 个输出中的总步数。

我们也用平均值和标准差对这些奖励进行标准化处理，即 ˜rindex(j)i = (rindex(j) - mean(R)) / std(R)。接下来，过程监督计算每个标记的优势作为后续步骤的标准化奖励之和，即 Aˆi,t = ∑index(j)≥t ˜rindex(j)i，并通过最大化方程（3）中定义的目标来优化策略。

迭代强化学习与GRPO：

在强化学习的训练进程中，随着策略模型的不断进化，旧的奖励模型可能不足以有效地监督当前的策略模型。因此，为了应对这个问题，我们引入了带有组相对策略优化（Group Relative Policy Optimization, GRPO）的迭代强化学习方法。

具体来说，在每次迭代中，基于当前策略模型生成的数据创建新的奖励模型训练集，并通过一种包含重播机制的方法来持续训练奖励模型，其中历史数据占比10%。这一过程有助于确保奖励模型能够跟上策略模型的进步，从而更有效地指导后续的训练。



##### flow-GRPO

https://arxiv.org/pdf/2505.05470

https://github.com/yifan123/flow_grpo

https://jingw193.github.io/GRPO-Guard/



##### SAC 

**Soft Actor-Critic**

- Off-policy算法
- 最大化熵（鼓励探索）
- 双Critic网络（减少过估计）
- 连续动作空间

基于值函数的方法（DQN）和基于策略的方法（REINFORCE），其中基于值函数的方法只学习一个价值函数，而基于策略的方法只学习一个策略函数

在 [Value Based](https://zhida.zhihu.com/search?content_id=217067784&content_type=Article&match_order=1&q=Value+Based&zhida_source=entity) 中，策略是概率集合；在 [Policy Based](https://zhida.zhihu.com/search?content_id=217067784&content_type=Article&match_order=1&q=Policy+Based&zhida_source=entity) 中，策略是函数，被参数化为神经网络。

两者各有优劣：Policy Based 可以在高维的连续状态下选择合适动作，而 Value Based 会出现维度灾难；Policy Based 按照回合进行更新，学习效率不如 Value Based。

因此诞生了结合 Value Based 和 Policy Based 的 [Actor-Critic 算法](https://zhida.zhihu.com/search?content_id=217067784&content_type=Article&match_order=1&q=Actor-Critic+算法&zhida_source=entity)。什么方法既学习价值函数，又学习策略函数呢？答案就是 Actor-Critic。Actor-Critic 是囊括一系列算法的整体架构，目前很多高效的前沿算法都属于 Actor-Critic 算法

**核心组成与工作流程**

1. **Actor 网络（演员，Policy Network \(\pi_{\theta}(a|s)\)）**
   - **作用：** 这是一个策略函数，负责输入当前状态 \(s_{t}\)，输出动作为 \(a_{t}\) 的概率分布。
   - **学习目标：** 根据 Critic 的评价反馈，通过策略梯度优化参数 \(\theta \)，以最大化预期的累计回报。
2. **Critic 网络（评论家，Value Network \(V_{\omega}(s)\) 或 \(Q_{\omega}(s,a)\)）**
   - **作用：** 这是一个价值函数，输入当前状态 \(s_{t}\) 或状态-动作对 \((s_t, a_t)\)，评估 Actor 执行动作的好坏。
   - **学习目标：** 通过时序差分（TD）误差 \(\delta_t = r_{t+1} + \gamma V_{\omega}(s_{t+1}) - V_{\omega}(s_t)\) 来学习参数 \(\omega \)，使得评估值越来越准。 [[1](https://zhuanlan.zhihu.com/p/1906416850373435824), [2](https://zhuanlan.zhihu.com/p/20058130791#:~:text=Actor-Critic 方法的基本概念 为了解决REINFORCE 算法的这些缺陷，本章将介绍一种新的方法：Actor-Critic 方法。 它巧妙地结合了基于值函数(Value-based) 和基于策略(Policy-based),的目标是学习一个好的策略，使得智能体可以获得尽可能高的回报。 Critic (值函数)：Critic 是一个值函数网络Q_w(s%2C a)\或V_w(s)\，它接收当前状态s\（和动作a\）作为输入，输出一个对当前状态（或状态-动作对）的评估值。 Critic 的目标是准确地评估当前策略的好坏。), [3](https://github.com/PaddlePaddle/awesome-DeepLearning/blob/master/docs/tutorials/reinforcement_learning/Actor-Critic.md#:~:text=演员-评论家算法(Actor-Critic Algorithm)是一种结合策略梯度和时序差分学习的强化学习方法，包括两部分，演员(Actor)和评价者(Critic)，跟生成对抗网络（GAN）的流程类似： * 演员(Actor)是指策略函数 $\pi_{\theta}(a|s)$ ，即学习一个策略来得到尽量高的回报。 用于生成动作(Action)并和环境交互。 * 评论家(Critic)是指值函数 $V^{\pi}(s)$ ，对当前策略的值函数进行估计，即评估演员的好坏。 用于评估Actor的表现，并指导Actor下一阶段的动作。)]

**协作机制（Actor-Critic Algorithm）**
Actor 在环境交互得到即时奖励 \(r_{t+1}\)，同时 Critic 评估该动作的分数。Actor 根据该分数（通常是 TD 误差，即“优势”函数）的正负来更新其选择策略：若 Critic 评价该动作为正（比平均情况好），则增加该动作的概率，反之则降低

事实上，用值或者值本质上也是用奖励来进行指导，但是用神经网络进行估计的方法可以减小方差、提高鲁棒性。除此之外，REINFORCE 算法基于蒙特卡洛采样，只能在序列结束后进行更新，这同时也要求任务具有有限的步数，而 Actor-Critic 算法则可以在每一步之后都进行更新，并且不对任务的步数做限制。

我们将 Actor-Critic 分为两个部分：Actor（策略网络）和 Critic（价值网络），如图 10-1 所示。

- Actor 要做的是与环境交互，并在 Critic 价值函数的指导下用策略梯度学习一个更好的策略。
- Critic 要做的是通过 Actor 与环境交互收集的数据学习一个价值函数，这个价值函数会用于判断在当前状态什么动作是好的，什么动作不是好的，进而帮助 Actor 进行策略更新

##### RLPD

RLPD (结合先验数据的强化学习) 是一种高样本效率的强化学习算法，旨在利用离线数据集加速在线强化学习。该算法构建于 [SAC](https://rlinf.readthedocs.io/zh-cn/latest/rst_source/tutorials/rlalg/sac.html) 框架之上，RLPD引入了三个极小但关键的设计选择来稳定训练并提高样本效率：

- 对称采样：一种平衡的采样策略，即使用智能体的在线经验回放池和离线演示数据集按50/50的比例构建训练批次。
- 层归一化：在Critic网络中集成层归一化，以防止在从静态数据集学习时出现灾难性的值过估计和外推误差。
- 稳定样本高效更新(针对高UTD或异步更新)：RLPD采用大规模Critic集成 (例如10个网络) 和随机子集 (随机集成蒸馏) 来稳定高更新数据比 (UTD) 或异步更新下的训练。

RLPD 证明了标准的异策略 RL 算法无需复杂的预训练即可有效利用离线数据，已被广泛应用于真实世界强化学习中。

RLPD继续使用SAC的最大熵目标。策略 𝜋 被训练为最大化预期回报和策略的熵。与SAC的核心区别在于Critic的更新。RLPD利用了一个包含 𝐸 个Critic网络的集成 (例如 𝐸 =10 )。 每个Critic 𝑄𝜃𝑖 的损失函数是在由在线数据 Donline 和离线数据 Doffline 等量组成的混合批次 B 上计算的

RLPD依靠特定的架构来处理由离线数据引起的分布偏移：

- 对称采样：RLPD从在线经验回放池 Donline 和离线数据集 Doffline 中采样不同的小批次，并将它们连接成单个训练批次。标准比例是50%在线和50%离线。这确保了智能体在适应新的在线经验的同时保留离线数据的稳定性。
- 层归一化：为了缓解分布外动作的Q值发散的问题，RLPD在Q网络的MLP第一层之后应用层归一化。这通过权重矩阵的范数隐式地限制了Q值，从而在稀疏奖励或复杂设置中稳定学习。
- 集成Q：为了提高样本效率，我们的 RLPD 执行异步更新。为了防止通常与频繁更新相关的过拟合，RLPD使用Critic集成 (例如 𝐸 =10 或 𝐸 =20) 并在目标计算期间对它们进行子集化，类似于REDQ

```yaml
data: # 添加离线演示数据
   type: robot_demo
   channel:
   name: demo_data
   path: "/path/to/demo_data"

algorithm:
   update_epoch: 30
   group_size: 1
   agg_q: mean


   backup_entropy: False # 移除熵项
   critic_subsample_size: 2 # 目标计算时采样的 Critic 数量
   eval_rollout_epoch: 1

   adv_type: embodied_sac
   loss_type: embodied_sac

   loss_agg_func: "token-mean"

   bootstrap_type: standard
   gamma: 0.96
   tau: 0.005

rollout:
   group_name: "RolloutGroup"
   backend: "huggingface"
   enable_offload: False
   pipeline_stage_num: 1

model:
   model_path: "/path/to/model"
   precision: \${actor.model.precision}
   num_q_heads: 10 # 集成的 Q 网络数量
```

https://arxiv.org/abs/2302.02948。Efficient Online Reinforcement Learning with Offline Data



##### A3C

相比Actor-Critic，A3C的优化主要有3点，分别是**Critic评估点的优化、异步训练框架、网络结构优化**。其中异步训练框架是最大的优化

除了A3C算法，在前面还有个A2C算法，顾名思义是用**[优化函数](https://zhuanlan.zhihu.com/p/579730942)**来作为Critic评估点。

Actor网络的更新： 

但是在实际操作中，一般用TD误差代替优势函数进行计算，因为TD误差是优势函数的无偏估计

A3C算法在Actor Critic算法的基础上增加了经验回放技术，但是是改进版的。

由于回放池数据相关性太强，A3C利用多线程的方法，同时在多个线程里分别和环境进行交互学习，每个线程都把学习的成果汇总起来保存在一个公共的神经网络，并且定期从公共的神经网络拿出成果指导后面的学习交互，做到了异步并发的学习模型。

这个公共的神经网络包括Actor网络和Critic网络两部分的功能。下面有n个worker线程，每个线程里有和公共的神经网络一样的网络结构，每个线程会独立的和环境进行交互得到经验数据，这些线程之间互不干扰，独立运行。

每个线程和环境交互到一定量的数据后，就计算在自己线程里的神经网络损失函数的梯度，但是这些梯度并不更新自己线程里的神经网络，而是去更新公共的神经网络。也就是n个线程会独立的使用累积的梯度分别更新公共部分的神经网络模型参数。每隔一段时间，线程会将自己的神经网络的参数更新为公共神经网络的参数，进而指导后面的环境交互。

可见，公共部分的网络模型就是我们要学习的模型，而线程里的网络模型主要是用于和环境交互使用的，这些线程里的模型可以帮助线程更好的和环境交互，拿到高质量的数据帮助模型更快收敛

在Actor Critic算法中，我们用了Actor和Critic两个不同的网络。在A3C中，我们把两个网络（类似两个子网络）放在一起，输入状态后可以同时输出状态价值和策略



##### DDPG

PPO是一种基于信任区域的强化学习算法，它通过限制策略更新的幅度，在稳定性和效率之间找到了平衡。以下是PPO在RLHF中的核心优势：

1. **策略更新的稳定性** PPO通过引入裁剪的目标函数（clipped objective），限制新旧策略的相对熵（KL散度）。这一机制能够有效防止策略更新过大导致的训练不稳定性。在RLHF中，这一点尤为重要，因为奖励模型本身可能带有噪声或不确定性

MC、TD、SARSA、Q-learning、DQN、REINFORCE、PPO、SAC、TD3……这些名字听起来像是完全不同的东西。但其实，它们都在回答同一个问题：**怎么让智能体学会做决策**。

后来我发现，如果你用”三个问题”来看这些算法，它们就不再是一堆孤立的名字，而是有清晰脉络的一个体系：

1. **它在学什么？**（状态价值、动作价值、还是策略）
2. **它的学习目标从哪来？**（真实回报 vs 估计值）
3. **数据能不能重复用？**（on-policy vs off-policy）

https://www.infyai.cn/2025/12/28/rl-algorithms-unified-framework/#DQN%EF%BC%9AQ-learning-%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C-%E7%A8%B3%E5%AE%9A%E5%99%A8

##### TD3

TD3是Twin Delayed Deep Deterministic policy gradient algorithm的简称，双延迟深度确定性策略梯度

TD3是DDPG的一个优化版本。

其中有三个非常重要的优化。明白了这三个优化，就明白了TD3了

DDPG起源于DQN，是DQN解决连续控制问题的一个解决方法。

而DQN有一个众所周知的问题，就是Q值会被高估。这是因为我们用argmaxQ(s')去代替V(s')，去评估Q(s)。当我们每一步都这样做的时候，很容易就会出现高估Q值的情况。

而这个问题也会出现在DDPG中。而要解决这个问题的思路，也在DQN的优化版本中。相信大家很快就明白，就是double DQN。

在TD3中，我们可以用了两套网络估算Q值，相对较小的那个作为我们更新的目标。这就是TD3的基本思路。

但要注意，DDPG算法涉及了4个网络，所以TD3需要用到6个网络。所以在实做得时候是比较容易出错的。所以我们有必要理清楚之间的关系

Critic部分的学习

只有我们在计算Critic的更新目标时，我们才用target network。其中就包括了一个[Policy network](https://zhida.zhihu.com/search?content_id=112871420&content_type=Article&match_order=1&q=Policy+network&zhida_source=entity)，用于计算A'；两个Q network ,用于计算两个Q值：Q1(A') 和Q2(A')。

Q1(A') 和Q2(A') 取最小值 min(Q1,Q2) 将代替DDPG的 Q(a') 计算更新目标，也就是说： target = min(Q1,Q2) * gamma + r

target 将会是 Q_network_1 和 Q_network_2 两个网络的更新目标。

这里可能会有同学问，既然更新目标是一样的，那么为什么还需要两个网络呢?

虽然更新目标一样，两个网络会越来越趋近与和实际q值相同。但由于网络参数的初始值不一样，会导致计算出来的值有所不同。所以我们可以有空间选择较小的值去估算q值，避免q值被高估

Actor部分的学习

我们在DDPG中说过，DDPG网络图像上就可以想象成一张布，覆盖在qtable上。当我们输入某个状态的时候，相当于这块布上的一个截面，我们我们能够看到在这个状态下的一条曲线。

而actor的任务，就是用梯度上升的方法，寻着这条线的最高点。

对于actor来说，其实并不在乎Q值是否会被高估，他的任务只是不断做梯度上升，寻找这条最大的Q值。随着更新的进行Q1和Q2两个网络，将会变得越来越像。所以用Q1还是Q2，还是两者都用，对于actor的问题不大

Delayed - 延迟

这里说的Dalayed ，是actor更新的delay。也就是说相对于critic可以更新多次后，actor再进行更新。

为什么要这样做呢？

还是回到我们qnet拟合出来的那块"布"上。

qnet在学习过程中，我们的q值是不断变化的，也就是说这块布是不断变形的。所以要寻着最高点的任务有时候就挺难为为的actor了。

可以想象，本来是最高点的，当actor好不容易去到最高点；q值更新了，这并不是最高点。这时候actor只能转头再继续寻找新的最高点。更坏的情况可能是actor被困在次高点，没有找到正确的最高点。

所以我们可以把Critic的更新频率，调的比Actor要高一点。让critic更加确定，actor再行动

##### DSRL

[Steering Your Diffusion Policy with Latent Space Reinforcement Learning](https://arxiv.org/abs/2506.15799) （CoRL 2025, Wagenmaker et al.）

核心思路：

1. **轻量级 SAC 智能体**：一个小型 SAC 智能体（约 500K 参数），配备紧凑的 CNN/MLP 编码器，处理观测并在潜在空间中生成噪声。
2. **噪声注入**：生成的噪声作为初始噪声输入到 Pi0 的扩散去噪器中，替代随机采样。
3. **冻结 VLM 主干**：预训练的 Pi0 VLM 和扩散专家模块保持冻结，保留泛化能力。
4. **噪声空间中的 SAC 训练**：SAC 智能体在噪声空间上使用环境奖励进行训练，采用 10 个 Q-head 集成的 Critic 实现稳定的价值估计

**DSRL 流程**

1. **观测编码**：轻量级 CNN（64×64 → 64维）和状态编码器（8维 → 64维）处理观测数据。
2. **噪声生成**： `GaussianPolicy` （SquashedNormal 分布）为每个动作步生成 32 维噪声动作。
3. **扩散去噪**：噪声作为初始噪声注入 Pi0 的 `sample_actions()`，冻结的扩散去噪器将噪声转换为真实动作。
4. **SAC 训练**：标准 SAC 配合自动熵调节训练噪声生成器：
   - **Actor**： `GaussianPolicy` ，3 层 MLP（128维隐藏层）
   - **Critic**： `CompactMultiQHead` — 10 个 Q 网络集成（共约 500K 参数）
   - **目标网络**：Float32 EMA 影子缓冲区，解决 bfloat16 精度问题



#### tianshou

https://github.com/thu-ml/tianshou



#### rlinf

https://github.com/RLinf/RLinf/tree/main

rlinf底层是用  https://serl-robot.github.io/  实现rl的



### RLDS

https://github.com/google-research/rlds

https://arxiv.org/abs/2111.02767

具身智能开源数据集[OpenX-Embodiment](https://zhida.zhihu.com/search?content_id=256060710&content_type=Article&match_order=1&q=OpenX-Embodiment&zhida_source=entity)是通过RLDS的格式构建的，将20多种不同的机器人数据进行了综合，由于原先不同数据集的格式存在着较大差异，如[Berkeley Cable Routing](https://zhida.zhihu.com/search?content_id=256060710&content_type=Article&match_order=1&q=Berkeley+Cable+Routing&zhida_source=entity)采用HDFS格式进行存储，[Stanford Hydra Dataset](https://zhida.zhihu.com/search?content_id=256060710&content_type=Article&match_order=1&q=Stanford+Hydra+Dataset&zhida_source=entity)采用多个层级的json格式存储actions和观测数据observations等等，RLDS则定义了统一的存储规则即数据模式，同时在实现上以[TFRecord](https://zhida.zhihu.com/search?content_id=256060710&content_type=Article&match_order=1&q=TFRecord&zhida_source=entity)进行二进制序列化，并提供了[tensorflow_dataset](https://zhida.zhihu.com/search?content_id=256060710&content_type=Article&match_order=1&q=tensorflow_dataset&zhida_source=entity)库将其解析为`tf.data.Dataset`类方便模型训练和验证。

RLDS以层级字典的形式进行标准化的数据格式定义，强化学习的一次完整采样Rollout一般称为trajectory，其数据形式类似于{“steps”:{"observation":[obs_t1,obst2,...obstn],"action":[act_t1,act_t2,...act_tn]}}。以下代码为对OpenX-Embodiment的数据集的一个名为fractal20220817_data的子集采用tensorflow_dataset库进行解析的代码示例。OpenX-Embodiment的数据集在google cloud storage（如gs://gresearch/robotics/fractal20220817_data/0.1.0)上采用TFRecord序列化格式进行存储





### vecl

火山引擎强化学习

https://github.com/verl-project/verl

#### trl

https://github.com/huggingface/trl



