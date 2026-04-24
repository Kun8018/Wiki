---
title: 机器人研究(二)
date: 2020-03-06 21:40:33
categories: 技术博客
tags:
    - IT,Web，
toc: true
thumbnail:
---

<!--more-->

## 数据集





## 遥操作(远程操作)与模仿学习(Imitation Learning)

| 特性           | Imitation Learning       | Reinforcement Learning |
| -------------- | ------------------------ | ---------------------- |
| **数据来源**   | 人类/专家演示            | 试错经验               |
| **安全性**     | 非常安全（学习成功案例） | 可能危险（探索过程）   |
| **收敛速度**   | 快（演示是最优的）       | 慢（需要探索）         |
| **所需数据量** | 少（高质量演示）         | 多（大量试错）         |
| **应用场景**   | 危险/复杂任务            | 简单/重复任务          |

https://zhuanlan.zhihu.com/p/1897200096430518846

#### Aloha

https://zhuanlan.zhihu.com/p/707610493

https://tonyzhaozh.github.io/aloha/

https://github.com/tonyzhaozh/aloha



#### gello

https://github.com/wuphilipp/gello_software

https://zhuanlan.zhihu.com/p/720266031



Open-TeleVision：具有沉浸式主动视觉反馈的远程操作

https://zhuanlan.zhihu.com/p/720858221



#### DAgger 框架

DAgger（Dataset Aggregation）是一种**交互式模仿学习方法**：

第1步：人类演示 → 训练模型
第2步：模型执行 → 记录错误
第3步：人类纠正错误 → 增强数据集
第4步：重复步骤2-3，直到模型完美



其他现有方案

https://docs.galaxea-dynamics.com/zh/Guide/R1Pro/vr_teleop/ros2/R1Pro_VR_Teleop_Usage_Tutorial_ros2/

https://wiki.pndbotics.com/teleoperation/teleoperation/ 



## 基于代理设备的数据采集

直接控制物理机器人对数据收集的规模化实施构成了重大挑战。通过将人类运动与物理机器人控制分离，近年来的方法借助代理设备，实现了更直观、灵活且可扩展的数据收集。例如，UMI是一种配备GoPro相机的手持抓手，其6自由度轨迹通过视觉SLAM进行估计。收集的数据可用于训练策略，之后将UMI安装为机器人的末端执行器，机器人即可复现演示的运动，而无需在数据收集过程中实际使用机器人。最近，LBM利用UMI收集了32小时的演示数据。DexUMI将这一概念扩展到灵巧操作，用五指机器人手替代了简单的抓手。人类演示者佩戴配备与目标机器人相同相机和触觉传感器的外骨骼手套，从而能够忠实地记录手部运动并将其迁移到机器人。

基于类似原理，Dobb-E使用一种类似Hello Stretch末端执行器的杆状设备来捕捉人类演示。RUMs通过增加收集任务的多样性、集成故障检测机制和改进网络架构，进一步增强了这一范式。这些改进使机器人仅通过预训练就能泛化到广泛的任务中。DexCap是一种数据收集设备，通过在Rokoko EMF手套上安装Realsense T265相机（双手各一个），并在胸部额外安装Realsense T265和L515传感器，实现基于SLAM的6自由度腕部姿态估计和基于手套的手部姿态跟踪。相比之下，DexWild通过将EMF手套与双手掌向前的相机以及通过外部相机进行的ArUco标记跟踪相结合，解决了DexCap的布线复杂性和SLAM校准挑战

### umi(Universal Manipulation Interface)

https://umi-gripper.github.io/

过去两年，机器人操作这条线有点像2020年之前的大模型世界：模型层面已经有了很强的模板（Diffusion Policy、各种[VLA](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=VLA&zhida_source=entity)、[RDT](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=RDT&zhida_source=entity)），真正卡住的反而是——怎么稳定、便宜、大规模地收"人类教机器"的数据。

传统两条路各有硬伤：

**纯teleop路径**：人在远程操控真实机械臂，优点是动作空间对齐、可直接部署，但缺点也很致命——硬件贵、搭建复杂、实时性差、难scale。一套双臂teleop系统动辄几十万美元，还需要专门的实验室空间。

**纯人类视频路径**：直接从YouTube、Ego4D这类视频里学，数据量巨大，但没有显式动作、形态差异大，embodiment gap和[observation gap](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=observation+gap&zhida_source=entity)都很严重。机器人看着人类做饭的视频，根本不知道该输出什么动作指令。

UMI（Universal Manipulation Interface）本质上是在回答一个问题：能不能让"人类在真实世界随手做事"变成**直接可用**的机器人训练数据，同时又不用动真实机器人？

这条线从最初的UMI，演化出了[Fast-UMI](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=Fast-UMI&zhida_source=entity)、[MV-UMI](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=MV-UMI&zhida_source=entity)、[DexUMI](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=DexUMI&zhida_source=entity)、[ActiveUMI](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=ActiveUMI&zhida_source=entity)一整个家族，基本把"手部操作"这块的数据接口打磨得很成熟了

UMI的核心设计可以概括成三句话：

**第一，手持3D打印夹爪+GoPro**。手里拿的是一个平行夹爪（软指尖），扳机控制开合，夹爪前面挂一台GoPro，配超广角鱼眼镜头，还在两边贴了物理小镜子，直接在一张图里搞出多视角"隐式双目"。整套东西完全可以装进背包，去哪儿都能收数据。

**第二，只用"手腕相机"对齐人和机器人**。人演示时是"GoPro+夹爪"的第一视角，真机部署时，在机器人末端挂同样的GoPro+夹爪，看出去的画面几乎一模一样。这就把人类和机器人统一到同一个观察空间，极大减小了embodiment gap。

**第三，用Diffusion Policy学"相对轨迹+延迟补偿"**。UMI把从[视觉SLAM](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=视觉SLAM&zhida_source=entity)+[IMU](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=IMU&zhida_source=entity)估出来的6DoF末端轨迹，转成"相对轨迹"，不依赖绝对世界坐标，在训练和部署时都显式建模传感、推理、执行延迟，保证真实机器人动作和当时的视觉是对齐的。Policy本身用的是Diffusion Policy，一口气预测一个短时轨迹段，天然适合多模态的人类数据。

效果上，一代UMI已经能做到：动态、双臂、长时序的真实任务（比如倒饮料、切菜、复杂装配），只要换训练数据就能换任务，同一套数据可以零样本迁移到不同自由度的机械臂上，成功率在OOD环境里还能保持在70%左右

**关键insight**：UMI不是在做"更强的网络"，而是把"人类如何用手和世界交互"这件事装进了一个**高保真、低摩擦的接口**里，再交给一个足够强的生成式policy去拟合。

3 工程化进阶：从实验室demo到数据工厂▸▸

一代UMI虽然好用，但在工程上还有两个痛点：依赖基于视频的SLAM+IMU，部署流程不够"傻瓜"，只有手腕视角，复杂场景下的视觉上下文仍然有限。于是就有了两条演化支线。

**Fast-UMI**干的事情很直接：把UMI做成真正可扩散的工程系统。用更通用的跟踪模块和标定方式取代原来对特定相机/SLAM的依赖，明确把"人类手持设备"和"机器人端"全流程打通，做成硬件无关pipeline，顺带开源了一套包含多类任务的数据集，直接为VLA/Diffusion Policy提供训练燃料。

它的意义不在于提出新算法，而在于：把"UMI这种接口"从一篇论文demo，变成**任何团队都能复现&改造&堆数据**的基础设施。对于后续做manipulation foundation model的团队，这是非常关键的一步

**MV-UMI**（Multi-View UMI）解决的是另一个问题：Wrist-only视角对齐了人和机器人，但**上下文严重受限**。那能不能在不引入观察空间gap的前提下，再加一个环境视角？

它的做法很巧：人演示时，同时录制手腕视角（和UMI一样）和顶视/侧视第三人称相机，然后对第三人称视频做两件事——用SAM-2把人整块segment掉，用静态背景帧做inpainting，把人抹掉，只留下场景和被操作物体。训练时，policy输入的是"手腕视角+去人后的第三人称视角"。

这样一来，机器人部署时也可以用第三人称视角（甚至可以再做一次inpainting去掉机器人本体），两边视觉分布保持一致，但模型获得了远比wrist-only更完整的环境上下文，特别适合长时序、多物体任务。论文里在严重依赖上下文的任务上，性能提升可以做到接近50%量级

UMI系列最有意思的一支是DexUMI：直接把"人手"变成universal manipulation interface。

大致思路可以理解为：**硬件侧**，人戴一个手部外骨骼，一边做各种高自由度操作（抓、捏、转、拧），外骨骼实时测量每根手指的关节角，甚至还能提供一定的力反馈。**软件侧**，通过几何映射+约束优化，把人手的高维关节空间映射到机器人手（比如Allegro hand、其他五指手）的可行姿态，同时在视频层面做"手替换"：对原始人手视频做inpainting，用高保真的机器人手渲染替换掉人手，避免视觉domain gap。

**学习侧**，在两套真实机器人手上做实验，任务包括旋转物体、精细抓取等高难度dexterous任务，实验里平均成功率能做到86%左右。

从设计哲学上看，DexUMI和一代UMI是同一种思路：把"人自然的控制通道"（这里是手）当成黄金标准，用一套硬件+软件把它**映射进机器人可执行的动作空间**。差别在于：UMI处理的是"平行夹爪+末端6DoF"，更适合日常工具型操作，DexUMI直接打到高自由度dexterous hand，针对的是精细抓取和复杂操作。

这一支线给"通用手部操作基础模型"补上了最难的一块——**精细接触操作的数据接口**

ActiveUMI：告诉机器人"看哪里"和"怎么动手"一样重要▸▸

UMI系列还有一条非常符合直觉，但之前基本没人系统做好的方向：ActiveUMI。

问题非常朴素：人在做复杂任务时，手在动，头也在动。传统UMI只把"手"映射给机器人，**忽略了"头怎么动"这个信号**。

ActiveUMI就是在把这件事补上：**数据采集**用VR头显+双手控制器，人戴VR头显+手持控制器，在一个虚拟环境里操作"虚拟机械臂"，系统同时记录双手控制器的6DoF轨迹（对应双机械臂末端）、头显的6DoF轨迹（对应机器人"头/摄像头"的pose）。

**机器人侧**，两只机械臂做双臂操作，第三只机械臂专门拿着"头部相机"，训练出一个policy，不仅预测双臂动作，还预测"头往哪里看"。

**学习到的是"注意力模式"**。模型学到的不是一个固定相机，而是："在人类做rope boxing/折衣服/关工具箱/放瓶子的过程中，**头是怎么转的**"。部署时，机器人可以主动移动视角去消除遮挡、检查抓取结果，真正具备了active perception。

实验结果很直观：同样一套任务，UMI（仅腕部摄像）平均成功率26%，加一个固定顶视摄像头42%，ActiveUMI（主动控制头部视角）能到~70%。换到新环境，ActiveUMI还能在OOD场景维持56%的成功率，而UMI baseline掉到6%。

更有意思的是数据混合实验：大量ActiveUMI数据+少量真实teleop轨迹（1%级别），在复杂的折衣服任务上，成功率可以从80%拉到95%。这基本说明了一件事：**"廉价、可扩展"的UMI/ActiveUMI数据+"少量昂贵"的teleop数据，是一个非常稳的组合**

如果把现在机器人界各种"数据接口"放在一起看，会发现一个清晰的谱系：**手持接口**（UMI/Fast-UMI/MV-UMI/ActiveUMI系列）、**外骨骼接口**（Airexo/Airexo-2/DexOp/Nuexo等上肢exoskeleton，用整条手臂甚至身体作为接口）、**全身VR接口**（TWIST/[TWIST2](https://zhida.zhihu.com/search?content_id=267316009&content_type=Article&match_order=1&q=TWIST2&zhida_source=entity)、OmniH2O这类基于VR+全身追踪的人形数据采集系统）。

UMI系列的独特之处在于三点：

**第一，完全robot-free的in-the-wild数据路径**。手持设备本身就是一个"机器人末端代理"，收数据时完全不需要真实机器人，极大降低了扩展成本。你可以带着UMI夹爪去厨房、去车库、去任何地方收集数据，而传统teleop必须在机器人旁边操作。

**第二，观察/动作空间都是"机器人视角"**。Wrist camera+末端6DoF/轨迹，天然容易映射到真实机械臂，这让它非常适合作为通用VLA/Diffusion Policy的data back-end。

**第三，从"如何动手"逐步扩展到"如何看+如何动手"**。MV-UMI引入了多视角静态上下文，ActiveUMI进一步引入了"人类头部运动"这一attention信号

https://zhuanlan.zhihu.com/p/1980925297101653137

https://umi-ft.github.io/



## 人类数据集

收集人类数据比收集机器人数据更具可扩展性，因为它不需要访问物理机器人、进行精确校准或在安全关键的执行环境中操作。尽管仍在使用第三人称视觉数据，但第一人称数据由于更接近实际机器人（尤其是配备头部安装传感器或类人实体的机器人）的感知输入，在VLA预训练中变得尤为重要。因此，第一人称视觉数据现已被广泛用作VLA模型预训练的关键资源。例如，Ego4D是规模最大、最全面的第一人称视频数据集之一，包含超过3000小时的头部佩戴RGB录像，由来自9个国家74个城市的800多名参与者提供。其他著名示例包括记录日常厨房活动的EPIC-KITCHENS，以及捕捉细粒度人机交互的HOI4D。有多个数据集专门关注操作任务：OAKINK2和H2O利用RGB-D传感器和运动捕捉系统捕捉双手物体操作；ARCTIC专注于通过灵巧双手操作铰接物体；EgoPAT3D则从第一人称视角研究人类动作目标预测

此外，基于智能眼镜的记录设备的出现，使得更自然、无干扰的第一人称数据收集成为可能（详见第6.1节）。著名示例包括Aria Everyday Activities；整合第一人称和第三人称视角的Ego-Exo4D；专注于细粒度手部-物体跟踪的HOT3D；以及扩展第一人称烹饪数据的HD-EPIC。这些数据集常通过LAPA等潜在动作预测方法用于VLA模型预训练。尽管HowTo100M、SomethingSomething V2和Kinetics-700等大规模视频-语言数据集并非第一人称视角，但也被用于模型预训练，有时会针对VLA相关任务进行适配。随着VLA研究越来越多地采用类人机器人和具有类人传感配置的系统，捕捉自然、目标导向行为的第一人称数据集，预计将在该领域发挥日益重要的作用



## 模拟数据集

模拟环境一直被用于生成机器人数据集，这种方式具有可扩展性、安全性和成本效益等优势。模拟环境支持可控的数据收集和灵活的场景配置调整，特别适合模仿学习和大规模模型预训练。例如，RoboTurk包含在MuJoCo物理引擎中Sawyer机器人的任务演示数据，通过云端远程人类操作收集。然而，在模拟环境中收集大规模演示数据（尤其是通过远程操作）仍然耗时。为缓解这一限制，MimicGen提出了一个从少量专家演示生成大规模数据集的框架。该框架将演示分解为以物体为中心的子任务，并通过在新场景中对这些子任务进行转换和重组，合成新的轨迹。DexMimicGen将这一方法扩展到更复杂的实体，如双臂机器人和多手指手。

与此同时，COSMOS等大规模视频世界模型已被开发用于生成多样化的虚拟轨迹，为VLA模型提供丰富且可扩展的训练数据。

尽管模拟在早期VLA研究中占据核心地位，但随着大规模实际机器人数据集（见下一类，即实际机器人数据集）的日益普及，模拟的主导地位有所下降。尽管如此，模拟仍然是生成多样化、可控数据的强大工具，尤其在实际场景收集不可行或成本过高的情况下





## 真实数据集

实际机器人数据集在VLA模型的开发和评估中起着至关重要的作用。这些数据集在物理机器人硬件上收集，包含多样化的实体、真实的交互过程和丰富的传感输入，对于训练能够泛化到实际任务的模型至关重要。MIME是最早的大规模机器人数据集之一，包含20个任务的8200条轨迹，由人类演示和对Baxter机器人的动觉教学组成。与此同时，QT-Opt被提出，包含在四个月内使用七个KUKA LBR iiwa机械臂收集的58万次抓取尝试数据。MT-Opt作为QT-Opt的扩展，将任务范围从抓取扩展到更广泛的操作技能。RoboNet包含从七种机器人（Sawyer、Baxter、WidowX、Franka Emika Panda、KUKA LBR iiwa、Fetch和Google Robot）收集的16.2万条轨迹。尽管这些轨迹是通过随机或基于规则的动作生成的，而非专家演示，但该数据集为跨不同平台和环境的泛化研究提供了支持。BridgeData通过Oculus Quest 2和WidowX 250机器人，采用VR远程操作收集数据，包含10个环境和71个任务的7200条轨迹。该研究的扩展版本BridgeData V2将数据集规模扩大到24个不同环境的6万条轨迹。BC-Z涉及12个Google机器人，由七名人类远程操作员控制，执行100多项操作任务。此外，还通过在人类监督下执行策略来收集额外数据，最终形成25900条轨迹。Language Table包含60万条积木操作轨迹（41.3万条来自实际场景，18.1万条来自模拟），并配有自然语言指令。这些数据通过长时间、无目标的演示收集，并通过众包进行标注，支持基于指令的训练。RH20T提供了从四种机器人（Franka Emika Panda、UR5、KUKA LBR iiwa和Flexiv Rizon）收集的多模态数据，涵盖147个任务和七种配置。与早期数据集不同，它包含同步的RGB-D、6轴力-扭矩、关节扭矩和音频信号，支持多模态感知和控制研究。RT-1包含17个月内使用13个Google机器人收集的13万条实际机器人演示轨迹，为RT系列基于Transformer的VLA模型提供了基础，支持实时、基于指令的行为。最后，Open-X Embodiment（OXE）数据集采用RLDS模式，将RT-1、BC-Z、BridgeData和Language Table等多个数据集统一为标准化格式。该数据集由21个机构和173位作者共同协作开发，是迄今为止最全面、应用最广泛的实际机器人VLA数据集之一

已有多项额外的实际机器人数据集发布，以进一步推动VLA研究。DROID是一个大规模数据集，由13个机构使用标准化硬件设置收集的7.6万条轨迹组成。每个参与实验室都使用配备Robotiq 2F-85抓手的Franka Emika Panda机械臂、两个外部立体相机和一个腕部安装相机。与Open X-Embodiment数据集（整合来自异构机器人平台的数据）不同，DROID确保了环境和实体的一致性，非常适合基准测试。FuSe提供了使用WidowX 250平台收集的2.7万条多模态轨迹。该机器人配备了外部相机、腕部安装相机、DIGIT触觉传感器、麦克风和IMU，支持VLA任务的跨模态学习。RoboMIND提供了从多种机器人实体（包括单臂、双臂、类人机器人和灵巧手）收集的10.7万条轨迹。该数据集强调形态和操作策略的多样性，支持泛化和迁移研究。AgiBot World Dataset是一个大规模数据集，包含使用100多个AgiBot G1机器人收集的100万条轨迹。其前所未有的规模使在高度多样化条件下训练大型VLA模型成为可能。除这些主要数据集外，还发布了多个特定任务或特定平台的数据集，包括Task-Agnostic Robot Play、Jaco Play、Cable Routing、Berkeley Autolab UR5、TOTO和RoboSet。专注于导航的VLA数据集也已出现，如SACSoN、SCAND、RECON和BDD100K，支持移动平台的指令跟随和目标导向行为。最后，RoboVQA等专业数据集针对机器人特定的问答任务，进一步扩大了VLA应用的范围，使其超越操作和导航领域



## 数据增强

在大多数计算机视觉任务中，旋转、裁剪和缩放等增强技术常被用于提升泛化能力。然而，在机器人技术中，机器人的实体特征及其与相机的空间关系至关重要，此类变换可能会扭曲这些关系，对性能产生负面影响。为解决这一问题，近年来的方法提出使用Stable Diffusion等图像生成模型进行实体感知增强。例如，CACTI利用Stable Diffusion对图像的特定区域进行修改，以增强小型但高质量的数据集。GenAug通过利用Stable Diffusion应用三种更复杂的视觉增强：改变物体纹理、插入与任务无关的干扰物以及修改背景。这些增强旨在通过增加视觉多样性（同时保留与任务相关的语义）来提升策略的稳健性。ROSIE在CACTI和GenAug的基础上，利用LLM、OWL-ViT和Imagen Editor，根据文本提示自动识别并修改掩码区域，能够对目标物体、背景进行受控编辑或插入新物体。增强后的数据用于训练RT-1。DreamGen利用视频世界模型生成多样化的视觉变体，并结合逆动力学模型（IDM）推断相应的动作。这种组合能够合成训练数据，有助于在新环境中学习策略并提升泛化能力。相比之下，MOO没有采用显式的视觉增强，而是利用VLM分离物体和技能表征，使策略能够从有限数据中泛化到未见过的物体-技能组合。它通过利用预训练VLM的广泛泛化能力，间接解决了视觉变异性问题。此外，BYOVLA在运行时提取并修复图像观测中与任务无关的区域，旨在增强对视觉干扰的稳健性。

DIAL从少量人工标注的轨迹-指令对种子集开始。首先，在该种子集上训练一个VLM，用于计算轨迹与指令之间的相似度。同时，利用LLM生成种子指令的多样化释义，形成大型候选池。然后，利用训练好的VLM将这些候选指令与剩余的未标注轨迹进行匹配，并为每条轨迹分配相似度最高的前k条指令。生成的数据集用于训练RT-1

由于动作与机器人的物理行为和实体特征直接相关，动作数据的增强通常具有挑战性。解决这一挑战的常用方法是通过DAgger等交互式方法扩展数据集，该方法在学习到的策略所访问的状态中迭代收集专家动作。类似地，CCIL通过学习局部平滑动力学模型，在策略遇到分布外状态时生成修正数据。它合成能够将机器人从新状态引导回专家访问过的状态的动作，并将生成的修正数据与原始演示数据相结合，以优化策略



## 其他数据集

涂鸦数据集：https://github.com/googlecreativelab/quickdraw-dataset
