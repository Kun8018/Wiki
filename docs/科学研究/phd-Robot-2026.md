---
title: 机器人研究进展
date: 2020-03-06 21:40:33
categories: 技术博客
tags:
    - IT,Web，
toc: true
thumbnail: 
---

​	本文主要研究的是2026年的会议和期刊论文

<!--more-->

https://comydream.github.io/about/

## 经典论文

dp3: https://3d-diffusion-policy.github.io/

Mujoco的强化学习  https://github.com/aravindr93/mjrl rss 2018



## RSS 2026



## ICLR 2026

- Any-step Dynamics Model Improves Future Predictions for Online and Offline Reinforcement Learning（ICLR 2025）

- 作者：Haoxin Lin, Yu-Yan Xu, Yihao Sun, Zhilong Zhang, Yi-Chen Li, Chengxing Jia, Junyin Ye, Jiaji Zhang, Yang Yu. 

- ADM-v2: Pursuing Full-Horizon Roll-out in Dynamics Models for Offline Policy Learning and Evaluation（ICLR 2026）
- 作者：Haoxin Lin, Siyuan Xiao, Yi-Chen Li, Zhilong Zhang, Yihao Sun, Chengxing Jia, Yang Yu

两篇论文沿着同一条主线持续推进：世界模型中的动力学，到底该如何建模，才能稳定支持长时域未来预测。

其中，ADM-v2 的代表性突破在于：***\*在离线强化学习的动力学模型设定下，它首次将完整时域滚动推演（\**\**full-horizon roll-out）稳定推进到上千步规模\******。**这意味着，世界模型正从「能做多步预测」进一步迈向「能够完成近整回合级别全程推演」的内部模拟器

过去几年，世界模型相关工作的很多进展都集中在状态表征上。更强的视觉编码器、更有效的潜变量表示、更长上下文的序列建模，都显著提升了模型对环境信息的压缩和表达能力。

相比之下，动力学建模虽然直接决定模型能否稳定推演未来，却长期没有得到同等强度的系统推进。

但从系统能力上看，动力学建模恰恰是最关键的一环。因为世界模型最核心的价值，不是「把环境压缩一下」，而是允许智能体**先在模型内部滚动推演 (roll-out)，再决定是否与真实环境交互。**

这件事直接关系到：模型型强化学习、离线强化学习、策略评估，以及更一般的具身智能规划与决策。

一旦世界模型只能做短程预测，它更像是一个局部预测器；只有当它能够稳定支撑长程甚至完整时域推演时，它才真正接近「内部模拟器」

ADM-v2 进一步提出了**并行任意步滚动推演** (PARoll, Parallel Any-step Roll-out)。

它的核心思想是：在长程推演过程中，同时维护多个由不同时间步幅构成的预测视角，并行地产生未来状态预测，再利用这些预测之间的差异来估计不确定性。

这样做带来两方面收益：

- 任意步直接预测可以更高效地执行；
- 不确定性估计可以自然伴随长程 rollout 一起产生

Routing Matters in MoE: Scaling Diffusion Transformers with Explicit Routing Guidance：https://github.com/ali-vilab/ProMoE  为了探究 MoE 在 DiT 中收益不明显的原因，研究团队发现，视觉 Token 具有两个独特的属性，导致传统的隐式路由分配策略产生次优的效果：

- 高度空间冗余性（High Spatial Redundancy）：离散的文本 Token 语义高度浓缩且差异明显，而连续的图像 Patch（视觉 Token）在空间上高度耦合，存在大量的冗余信息，导致视觉 MoE 中的专家往往学到同质化的特征。

- 功能异质性（Functional Heterogeneity）：扩散模型普遍依赖无分类器引导（CFG）技术。这就导致输入 Token 天然分为两派：条件 Token 和无条件 Token。标准 MoE 范式对它们一视同仁、同时分配，忽略了它们不同的功能角色。

MoE 的核心原则是专家专业化（Expert Specialization），即确保每个专家都能获取集中且不重叠的知识。为了在视觉模型中实现「专家内一致」和「专家间多样」，ProMoE 引入了两步路由器（Two-Step Router）和路由对比学习（Routing Contrastive Learning）

https://ctrl-world.github.io/ 

世界模型「盲目乐观地」自动补全了残缺的形状;世界模型「错误地」将真实世界里倒塌的方块误认为堆叠状态。

清华陈建宇(星动纪元创始人)团队和斯坦福 Chelsea Finn(PI 创始人) 团队基于 Ctrl-World (两个团队的首个合作成果)，再度携手，联合提出了 [VLAW 框架](https://zhida.zhihu.com/search?content_id=270769033&content_type=Article&match_order=1&q=VLAW+框架&zhida_source=entity)，首次实现了 VLA 策略与动作条件世界模型的协同迭代优化，让两者形成一个「互相促进的闭环」：

VLA 策略采集的真实交互数据，反过来用于提升世界模型的物理保真度;

世界模型生成的高质量虚拟数据，再用于持续强化 VLA 策略本身

VLAW 的工作流程：(1) 首先在真实世界中执行策略以收集少量在线轨迹;(2) 利用这些策略 rollout 数据微调预训练的动作条件世界模型，使世界模型适配目标任务并提升其预测保真度;(3) 利用优化后的世界模型，通过策略与世界模型的闭环交互生成大规模合成轨迹;(4) 最终，利用视觉 - 语言奖励模型自动评估奖励，结合真实世界和合成数据优化 VLA 策略

从理论思路到实际落地，VLAW 设计了四个精密咬合的步骤，通过迭代优化实现「让世界模型有用」的核心目标，同时让机器人借助校准后的世界模型完成「在想象中变强」的训练。

**第一步：使用真实 rollout 数据微调世界模型，戒掉盲目乐观**

研究团队用包含成功与失败的真实机器人在线轨迹数据微调预训练世界模型;同时为了防止模型过拟合，还加入了原始的 DROID 数据集一起训练，让它既能看懂失败，又不会过拟合，确保对真实场景的还原度。

**第二步：使用 [Qwen-VL](https://zhida.zhihu.com/search?content_id=270769033&content_type=Article&match_order=1&q=Qwen-VL&zhida_source=entity) 评判轨迹**

团队基于 Qwen3-VL-4B-Instruct 微调了一个视觉 - 语言奖励模型，用真实数据里的成功 / 失败标签校准它的判断能力，能自动判别世界模型生成数据的好坏。

**第三步：在世界模型中生成大量数据**

在校准后的世界模型里，让机器人策略进行大规模的 rollout，每个任务都生成 500 条合成轨迹。这一步就是机器人在「想象中」练手，但因为世界模型已经被真实数据校准，这些「想象中的数据」的质量大大提升。

**第四步：学成功样本优化策略，反向为世界模型校准提供更优质数据**

把真实世界里的成功轨迹，和世界模型生成的优质合成成功轨迹混在一起，用简单的监督学习目标来更新机器人的 VLA 策略。原因很实际：对于流匹配、扩散这类生成式策略，强化学习需要计算特定状态下的动作概率密度，但这类策略的动作是从噪声一步步推导出来的，概率计算难度极高。团队还从理论上证明，这种加权回归目标，其实是正则化强化学习的一种近似形式，兼顾了简单性和有效性。

而 VLA 策略的优化与性能提升，又能在真实世界中产生更优质的试错数据，为世界模型的下一轮校准与优化提供更好的基础，形成世界模型与 VLA 策略互相成就的闭环



How Far Can Unsupervised RLVR Scale LLM Training? 清华 上海ai lab icrl 2026

https://zhuanlan.zhihu.com/p/2014855336629117897

该研究针对无监督带验证奖励的强化学习（[Unsupervised Reinforcement Learning with Verifiable Rewards](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=Unsupervised+Reinforcement+Learning+with+Verifiable+Rewards&zhida_source=entity), URLVR）在[大型语言模型](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=大型语言模型&zhida_source=entity)（LLM）训练中的扩展能力进行了全面分析

研究将 URLVR 方法分为[内在奖励](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=内在奖励&zhida_source=entity)（Intrinsic Rewards）和[外部奖励](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=外部奖励&zhida_source=entity)（External Rewards）。**理论分析表明，所有内在奖励方法均通过操纵交叉熵收敛于对模型初始分布的“[锐化](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=锐化&zhida_source=entity)（Sharpening）”，即放大模型原有的偏好。**实证实验证实，内在奖励训练普遍呈现“先上升后下降（Rise-then-fall）”的模式，最终必然导致模型崩溃（Model Collapse），**崩溃的时间取决于模型的先验分布而非超参数工程。**尽管存在扩展瓶颈，内在奖励在小数据集和[测试时训练](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=测试时训练&zhida_source=entity)（Test-Time Training, TTT）中依然有效。基于此动态特性，本文提出了“[模型崩溃步数](https://zhida.zhihu.com/search?content_id=271270717&content_type=Article&match_order=1&q=模型崩溃步数&zhida_source=entity)（Model Collapse Step）”作为评估模型强化学习可训练性的指标。最后，研究探讨了基于生成-验证不对称性的外部奖励方法，指出其可能突破内在奖励面临的置信度-正确性天花板，为实现可扩展的 URLVR 提供了路径

带有可验证奖励的强化学习（RLVR）在提升大语言模型推理能力方面取得了显著进展。在 RLVR 范式下，模型通过可与真实标签（Ground Truth）进行验证的奖励（例如数学题的正确答案或代码的成功执行）进行学习。近期的主流模型通过扩展监督式 RLVR 在数学、代码和科学基准测试上获得了提升。然而，向更高智能水平发展的过程中，这种依赖人工标注数据的监督方法面临瓶颈：随着模型能力达到或超越特定领域的专家水平，获取可靠的真实监督信号的成本高昂且逐渐变得不切实际。

这种监督瓶颈促使研究者转向无监督 RLVR（URLVR）领域。URLVR 旨在不依赖人工提供真实标签的情况下提取奖励信号。类似于预训练阶段利用海量无标签数据实现的缩放定律（Scaling Laws），URLVR 被期望能够将这种自我进化的范式扩展至后训练（Post-training）阶段。

当前的 URLVR 方法主要依赖模型自身的内在信号作为奖励，例如多路径采样的多数投票（Majority Voting）或基于熵（Entropy）的指标。尽管这些方法在训练初期表现出收益，但随之而来的是奖励作弊（Reward Hacking）和模型崩溃（Model Collapse）等失败模式。此外，不同方法在不同模型家族和评估设置下的表现存在差异，缺乏系统性的比较。因此，本文提出一个核心问题：**内在奖励能否真正实现 LLM 训练的规模化扩展**

**TTRL** (Test-Time Reinforcement Learning), an open-source solution for online RL NeurIps 2025



SimpleVLA-RL: Scaling VLA Training via Reinforcement Learning", ICLR2026

 核心贡献

1. **Scalable VLA-RL框架。**第一次把[LLM](https://zhida.zhihu.com/search?content_id=269913899&content_type=Article&match_order=1&q=LLM&zhida_source=entity)中的pretrain + RL范式完整跑通并开源。
2. 在**[LIBERO](https://zhida.zhihu.com/search?content_id=269913899&content_type=Article&match_order=1&q=LIBERO&zhida_source=entity)和[RoboTwin](https://zhida.zhihu.com/search?content_id=269913899&content_type=Article&match_order=1&q=RoboTwin&zhida_source=entity)仿真中展示了SoTA的效果，实现了sim2real迁移**

本文的reward设计和DeepSeek-R1一致，只根据任务完成的结果来给奖励。如果VLA模型成功完成一个任务，**整条轨迹的所有action token** 都被赋予reward=1，否则reward=0。

为了鼓励探索，本文采用了类似DAPO[[3\]](https://zhuanlan.zhihu.com/p/2001960621546164373#ref_3)的处理方式：

- **Dynamic sampling**：当所有轨迹都有相同的reward时（比如都是0或者都是1），GAE是0，此时策略没有改进方向。为了应对这种情况，有一个符合直觉的处理方式：一直采样，直到非全1全0，这时就有改进方向了。
- **Clipping higher**：把clip range从[0.8, 1.2]改为[0.8, 1.28]。这里的分析可以参考DAPO。
- **Higher Rollout Temperature**：1.0 1.6

需要注意的是，action decoding有三种：**token distribution**、**diffusion-based**、**deterministic regression via MLP**。PPO类型的RL适合的场景有两个需求：(1) **支持随机探索**（比如有random sampling）(2) **高效计算policy gradient**（用于策略改进）。所以action token类型的VLA直接就可以用GRPO来训练，但是作者也在openreview rebuttal 阶段使用Flow-GRPO证明了：diffusion-based VLA也是可以使用RL做后训练的。

对于diffusion-based VLA (如pi0.5)，也可以用类似的方式进行后训练。这里主要参考的实现是Flow-GRPO[[4\]](https://zhuanlan.zhihu.com/p/2001960621546164373#ref_4)。Flow-GRPO解决的是如下的问题：

- 因为flow-matching这种ODE-based生成除了初始值是从噪声采样的，后面的迭代过程都是确定性的。**缺少对环境的探索**。
- 同样是因为flow-matching的确定性迭代生成，为了计算policy probability ratio ，需要追踪**整个迭代过程中的denoise probability ratio** 。
- flow model需要很多步迭代才能产生有效的action，能否在训练的时候**减少迭代次数**。

Flow-GRPO的核心贡献是：

- **[ODE-to-SDE转换](https://zhida.zhihu.com/search?content_id=269913899&content_type=Article&match_order=1&q=ODE-to-SDE转换&zhida_source=entity)**

原始的flow matching使用确定性的ODE过程作为forward pass.其中 注入了随机性。Flow-GRPO选择 （ 在实验中展现了最好的效果）。

这里的推导有点复杂。核心想法是在每一步引入随机性，但是marginal distribution和原始的flow model保持一致。除了引入随机性，还让 成为一个正态分布，方便计算。（在原始flow matching 版本中，因为 是一个 分布，所以无法计算）

为了便于理解，我们可以简单做一个类比，假如我们有一个确定性的函数 ，每次给定 都会输出一个确定的 。那么我们为了引入更多的随机性，同时保证无偏，可以考虑每次输出 。这里也是类似的，我们可以给flow model迭代中的每一步都增加随机性，但是在期望意义下，轨迹和原来的flow model保持一致。

- **Denoising Reduction**。在训练过程中把flow model的迭代次数从40减少到了10，发现训练速度变快了四倍，但是最终的reward没有减少



https://github.com/2toinf/X-VLA   https://thu-air-dream.github.io/X-VLA/



## Neurlps 2026





## ICRA 2026

https://computationalrobotics.seas.harvard.edu/SkillComposition/

Seeing Space and Motion: Enhancing Latent Actions with Geometric and Dynamic Awareness for Vision-Language-Action Models



## IROS 2026





https://sites.google.com/view/maunalvla

不同于 π0 等端到端模型在处理复杂长程任务时仍面临的推理与执行割裂问题，ManualVLA 摒弃了将「高层次规划」与「动作生成」拆分的传统分层级联方案，构建了全新通用基础模型 Mixture-of-Transformers (MoT) 架构，在同一模型中统一多专家模块，实现多模态生成与动作执行的紧密协同。

首先由「规划专家」生成由图像、空间位置提示和文字说明组成的多模态操作说明书，再通过显式与隐式相结合的「思维链」（ManualCoT）推理，将信息反馈给「动作专家」，为每一步操作提供清晰的显式控制条件的同时，通过潜在表征为动作生成提供持续的隐式引导，实现理解与生成的高度统一。

实验结果表明，ManualVLA 在现实场景任务中表现出显著优势，其平均成功率相较于分层结构的最新基线方法提升约 32%，充分验证了「生成手册–指导动作」这一统一范式的有效性



## CVPR 2026



ACOT-VLA： https://github.com/AgibotTech/ACoT-VLA

Atomic-VLA https://zhanglk9.github.io/atomicvla-web/ 

robomme： https://robomme.github.io/

编辑real采集数据 https://real2edit2real.github.io/

灵巧手pi0  清华大学 https://unidex-ai.github.io/



## 其他

pi 团队通用模型 https://www.pi.website/blog/partner?v=1  memory    https://www.pi.website/research/memory rlt https://www.pi.website/research/rlt  https://zhuanlan.zhihu.com/p/2019515495737487510

gen-1 https://generalistai.com/blog/apr-02-2026-GEN-1 

两篇苦涩的教训：关于计算机视觉 （Vincent Sitzmann, 2026）和关于通用人工智能 (Rich Sutton, 2019) http://www.incompleteideas.net/IncIdeas/BitterLesson.html   https://www.vincentsitzmann.com/blog/bitter_lesson_of_cv/  https://zhuanlan.zhihu.com/p/2009650489059455295

LeRobot v0.5.0： https://mp.weixin.qq.com/s/C911DKMJHICGKYbA661MOg?scene=1&click_id=152

最新dp分析  https://zhuanlan.zhihu.com/p/1977672036689151255   https://zhuanlan.zhihu.com/p/1998052390599950753    https://zhuanlan.zhihu.com/p/2002328291592401820

论文网站模版：https://github.com/nerfies/nerfies.github.io?tab=readme-ov-file

D4rt https://storage.googleapis.com/d4rt_assets/D4RT_paper.pdf



## 创意

做难的事情更容易想

柔性物体。 https://ieeexplore.ieee.org/document/7139725/authors#authors    https://www.bilibili.com/video/BV1a3AyzeEFy?buvid=XU4B61843F7FBF5FEB5357FE1B6611B4176EE&from_spmid=main.space-contribution.0.0&is_story_h5=false&mid=Rp1LgRK4xskPUvSL%2FP8FlA%3D%3D&plat_id=116&share_from=ugc&share_medium=android&share_plat=android&share_session_id=d7c745b4-9b04-4b40-a838-865e0d44c23a&share_source=WEIXIN&share_tag=s_i&spmid=united.player-video-detail.0.0&timestamp=1773228020&unique_k=9Inez5v&up_id=357509887

细状物体
有状态vla和无状态vla 如何区分长效记忆和短期记忆(无状态. 向量数据库存储

cot

环视摄像头 for safety



方向性vla  切入方向  长接触-方向性接触  举着  方向性pick pushT 不同边    动作链 拿杯子 拿鞋 拿东西

预测变化方法



模仿学习为主。强化学习补充 -> 强化学习为主。模仿学习补充的姿势

关键问题：

sim2real。采集数据成本很高  -> 

换个环境 换个机器人 vla失效 成功率降低

为什么有各种综述 -> 综述只是个人发表个人观点

模仿学习-> 举一反三 距离

四指灵巧手。指夹十字姿势



## 在追

1.清华 徐梦迪组： https://gcfy63821.github.io/ 

2.哈弗 hanqi https://han20192019.github.io/  https://computationalrobotics.seas.harvard.edu/ControlOriented_NC/

在机器人视觉控制中，图像编码器学到的表示空间是否存在有规律的几何结构？

核心发现：控制导向的神经坍缩

受图像分类中"**Neural Collapse（神经坍缩）**"现象启发，研究者发现：

- **离散控制任务**：视觉表示按动作标签聚类
- **连续控制任务**：视觉表示按"相对位姿"（目标与当前状态的关系）聚类

实用贡献

将这个现象变成一个**预训练正则化工具**——用神经坍缩作为约束预训练视觉编码器，使其学到更利于控制的特征。

实验效果

- 数据有限场景下，下游任务性能提升 **10–35%**
- 真实机器人推物任务中（100条演示），预训练策略成功率 **8/10**，基线仅 **5/10**

简单说：**这项工作解释了"为什么视觉表示会自然地对齐控制结构"，并把这个规律变成了提升机器人学习效率的工具。**

3.zhangshanghang。https://github.com/PKU-HMI-Lab

4.北大董豪 https://zsdonghao.github.io/。https://hwfan.io/about-me-chinese/

https://real2edit2real.github.io/ -> 世界模型 什么是fixed固定的 这件事。固定的场景可以不重建

北大 刘宗qing https://z0ngqing.github.io/

5. 南京大学 rl-lab https://lamda-rl.nju.edu.cn/papers.html 

6.  软体机器人和vla 结合 https://arxiv.org/pdf/2510.17369
