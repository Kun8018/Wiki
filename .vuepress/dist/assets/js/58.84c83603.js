(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{338:function(e,t,s){"use strict";s.r(t);var a=s(14),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[e._v("​        基于云原生的周边工具")]),e._v(" "),s("h2",{attrs:{id:"kubevela"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubevela"}},[e._v("#")]),e._v(" KubeVela")]),e._v(" "),s("p",[e._v("KubeVela 是一个开箱即用的现代化应用交付与管理平台，它使得应用在面向混合云环境中的交付更简单、快捷。使用 KubeVela 的软件开发团队，可以按需使用云原生能力构建应用，随着团队规模的发展、业务场景的变化扩展其功能，一次构建应用，随处运行。")]),e._v(" "),s("p",[e._v("云原生技术的发展趋势正在朝着利用 Kubernetes 作为公共抽象层来实现高度一致的、跨云、跨环境的的应用交付而不断迈进。然而，尽管 Kubernetes 在统一底层基础架构细节方面表现出色，它并没有在混合的分布式部署环境之上提供应用层的软件交付模型和抽象。我们已经看到，这种缺乏统一上层抽象的软件交付过程，不仅降低了生产力、影响了用户体验，甚至还会导致生产中出现错误和故障。")]),e._v(" "),s("p",[e._v("然而，为现代微服务应用的交付过程建模是一个高度碎片化且充满挑战的事情。到目前为止，绝大多数试图解决上述问题的技术方案，要么过于简单以致于无法覆盖实际生产使用中的问题，要么过于复杂难以落地使用。云原生带来的基础设施能力爆发式增长也决定了新一代的应用管理平台不能以硬编码的方式做能力的集成和 UI 的构建，除了满足基础的功能和场景，平台本身的扩展能力成为了新时代应用管理平台的核心诉求。这就意味着平台不仅要简单易用，还要能够随着应用交付和管理的需求复杂度提升能够不断扩张，能够让开发者自助式的接入和使用，充分享受云原生生态的红利。")]),e._v(" "),s("p",[e._v("这也是 KubeVela 出现的核心价值：它既能够简化面向混合环境（多集群/多云/混合云/分布式云）的应用交付过程；同时又足够灵活可以随时满足业务不断高速变化所带来的迭代压力。它本身是一个面向混合交付环境同时又高可扩展的应用交付引擎，满足平台构建者的扩展和自建需求；同时又附加了一系列开箱即用的扩展组件，能够让开发者自助式的开发、交付云原生应用。")]),e._v(" "),s("h3",{attrs:{id:"与其他系统对比"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#与其他系统对比"}},[e._v("#")]),e._v(" 与其他系统对比")]),e._v(" "),s("p",[e._v("vs ci/cd(GitHub action gitlab jenkins)")]),e._v(" "),s("p",[e._v("KubeVela 是一个工作在 CI 流程下游的 CD 控制平面（Continuous Delivery Control Plane）。所以 KubeVela 希望你保持现有的 CI 流程，而在需要开始制品部署时让 KubeVela 接管 CD 流程。KubeVela 会给你的 CD 流程带来大量的现代化应用交付最佳实践，比如：声明式交付工作流、可编程的工作流步骤、Pull 模型、多云/多集群交付流程、统一的云服务部署和绑定等等。")]),e._v(" "),s("p",[e._v("如果你已经在 CD 环节中采纳了 GitOps 实践，KubeVela 会更容易跟你的 CI/CD 系统集成，因为 KubeVela 是完全声明式的。只需要把 KubeVela 的应用部署描述文件放置在你的配置仓库当中，所有的 KubeVela 特性（包括声明式交付工作流、多云/多集群交付流程等）就会立刻在你 的 GitOps 流程中出现。")]),e._v(" "),s("p",[e._v("Vs gitops(argoCD fluxCD)")]),e._v(" "),s("p",[e._v("KubeVela 可以基于你的 GitOps 流程，并在此之上增加跨云、跨环境的能力：")]),e._v(" "),s("ul",[s("li",[e._v("KubeVela 具有一个用户友好且可编程的工作流，可以让你集成现有的交付工具，包括通知和审批体系。")]),e._v(" "),s("li",[e._v("KubeVela 可以为你提供跨环境交付能力，让你在一个应用中描述多集群的差异化配置并统一的查看状态。")])]),e._v(" "),s("p",[e._v("Vs PaaS")]),e._v(" "),s("p",[e._v("传统 PaaS 提供完整的应用程序部署和管理功能，旨在提高开发人员的体验和效率。在这个场景下，KubeVela 也有着相同的目标。")]),e._v(" "),s("p",[e._v("不过，KubeVela 和它们最大的区别在于其"),s("strong",[e._v("可扩展性")]),e._v("。")]),e._v(" "),s("p",[e._v("KubeVela 是可编程的。它的交付工作流乃至整个应用交付与管理能力集都是由独立的可插拔模块构成的，这些模块可以随时通过编写 CUE 模板的方式进行增/删/重定义且变更会即时生效。与这种机制相比，传统的 PaaS 系统的限制非常多：它们需要对应用类型和提供的能力进行各种约束来实现更好的用户体验，但随着应用交付需求的增长，用户的诉求就一定会超出 PaaS 系统的能力边界。这种情况在 KubeVela 平台中则永远不会发生。")]),e._v(" "),s("p",[e._v("此外，KubeVela 是一个独立于运行时集群的应用交付控制平面（这是我们认为的下一代 PaaS 系统的合理形态），而现有的 PaaS 则往往选择以插件形式部署在运行时集群当中。")]),e._v(" "),s("p",[e._v("vs Helm")]),e._v(" "),s("p",[e._v("Helm 是 Kubernetes 的包管理器，它能够以 Chart 为一个单元，提供打包、安装和升级的一组 YAML 文件的能力。")]),e._v(" "),s("p",[e._v("KubeVela 作为一个应用交付系统天然可以部署各种制品类型，Kustomize、Kubernetes Yaml 等，当然也包括 Chart。Helm 可以便捷的把 Chart 交付到一个集群，KubeVela 可以帮你把 Chart 交付到多个集群。")]),e._v(" "),s("p",[e._v("当然，KubeVela 还支持其他制品格式比如 Kustomize。")]),e._v(" "),s("h3",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[e._v("#")]),e._v(" 安装")]),e._v(" "),s("p",[e._v("安装Vela UI")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ vela addon "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("enable")]),e._v(" ~/.vela/addons/velaux\n")])])]),s("p",[e._v("访问")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ vela port-forward addon-velaux "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" vela-system "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("8080")]),e._v(":80\n")])])]),s("h3",{attrs:{id:"核心概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心概念"}},[e._v("#")]),e._v(" 核心概念")]),e._v(" "),s("p",[e._v("每一个应用部署计划都由四个部分组成，分别是组件、运维能力、部署策略和工作流。其格式如下")]),e._v(" "),s("p",[e._v("这个 "),s("code",[e._v("Application")]),e._v(" 对象会引用 "),s("code",[e._v("component")]),e._v("、"),s("code",[e._v("trait")]),e._v("、"),s("code",[e._v("policy")]),e._v(" 以及 "),s("code",[e._v("workflow step")]),e._v(" 的类型，这些类型背后是平台构建者（运维团队）维护的可编程模块。可以看到，这种抽象的方式是高度可扩展、可定制的")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" core.oam.dev/v1beta1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Application\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("components")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <component name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <component type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("properties")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        <parameter values"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("traits")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <trait type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("properties")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n            <traits parameter values"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <component name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <component type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("properties")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        <parameter values"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("policies")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <policy name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <policy type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("properties")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      <policy parameter values"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("workflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <step name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <step type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("properties")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        <step parameter values"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("   \n")])])]),s("ul",[s("li",[s("strong",[e._v("组件（Component）")]),e._v(": 组件定义一个应用包含的待交付制品（二进制、Docker 镜像、Helm Chart...）或云服务。我们认为一个应用部署计划部署的是一个微服务单元，里面主要包含一个核心的用于频繁迭代的服务，以及一组服务所依赖的中间件集合（包含数据库、缓存、云服务等），一个应用中包含的组件数量应该控制在约 15 个以内。")]),e._v(" "),s("li",[s("strong",[e._v("运维特征（Trait）")]),e._v(": 运维特征是可以随时绑定给待部署组件的、模块化、可拔插的运维能力，比如：副本数调整（手动、自动）、数据持久化、 设置网关策略、自动设置 DNS 解析等。")]),e._v(" "),s("li",[s("strong",[e._v("应用策略（Policy）")]),e._v(": 应用策略负责定义指定应用交付过程中的策略，比如多集群部署的差异化配置、资源放置策略、安全组策略、防火墙规则、SLO 目标等。")]),e._v(" "),s("li",[s("strong",[e._v("工作流步骤（Workflow Step）")]),e._v(": 工作流由多个步骤组成，允许用户自定义应用在某个环境的交付过程。典型的工作流步骤包括人工审核、数据传递、多集群发布、通知等。")])]),e._v(" "),s("p",[e._v("以上这些概念的背后都是由一组称为"),s("a",{attrs:{href:"https://kubevela.io/zh/docs/platform-engineers/oam/x-definition",target:"_blank",rel:"noopener noreferrer"}},[e._v("模块定义（Definitions）"),s("OutboundLink")],1),e._v("的可编程模块提供具体功能。KubeVela 会像胶水一样基于 Kubernetes API 定义基础设施定义的抽象并将不同的能力组合起来")]),e._v(" "),s("h3",{attrs:{id:"cue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cue"}},[e._v("#")]),e._v(" Cue")]),e._v(" "),s("p",[e._v("Cue是自动化配置的一种语言。Dagger也使用这种语言")]),e._v(" "),s("h2",{attrs:{id:"kubespray"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubespray"}},[e._v("#")]),e._v(" Kubespray")]),e._v(" "),s("p",[e._v("Kubespray 是由若干 "),s("a",{attrs:{href:"https://docs.ansible.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ansible"),s("OutboundLink")],1),e._v(" Playbook、 "),s("a",{attrs:{href:"https://github.com/kubernetes-sigs/kubespray/blob/master/docs/ansible.md#inventory",target:"_blank",rel:"noopener noreferrer"}},[e._v("清单（inventory）"),s("OutboundLink")],1),e._v("、 制备工具和通用 OS/Kubernetes 集群配置管理任务的领域知识组成的。")]),e._v(" "),s("p",[e._v("Kubespray 提供：")]),e._v(" "),s("ul",[s("li",[e._v("高可用性集群")]),e._v(" "),s("li",[e._v("可组合属性（例如可选择网络插件）")]),e._v(" "),s("li",[e._v("支持大多数流行的 Linux 发行版")]),e._v(" "),s("li",[e._v("持续集成测试")])]),e._v(" "),s("p",[e._v("Kubespray 能够自定义部署的许多方面：")]),e._v(" "),s("ul",[s("li",[e._v("选择部署模式： kubeadm 或非 kubeadm")]),e._v(" "),s("li",[e._v("CNI（网络）插件")]),e._v(" "),s("li",[e._v("DNS 配置")]),e._v(" "),s("li",[e._v("控制平面的选择：本机/可执行文件或容器化")]),e._v(" "),s("li",[e._v("组件版本")]),e._v(" "),s("li",[e._v("Calico 路由反射器")]),e._v(" "),s("li",[e._v("组件运行时选项\n"),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.docker.com/engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://containerd.io/docs/",target:"_blank",rel:"noopener noreferrer"}},[e._v("containerd"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://cri-o.io/#what-is-cri-o",target:"_blank",rel:"noopener noreferrer"}},[e._v("CRI-O"),s("OutboundLink")],1)])])]),e._v(" "),s("li",[e._v("证书生成方式")])]),e._v(" "),s("p",[e._v("可以修改"),s("a",{attrs:{href:"https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("变量文件"),s("OutboundLink")],1),e._v("以进行 Kubespray 定制。 如果你刚刚开始使用 Kubespray，请考虑使用 Kubespray 默认设置来部署你的集群并探索 Kubernetes。")]),e._v(" "),s("p",[e._v("Kubespray 提供了一种使用 "),s("a",{attrs:{href:"https://github.com/kubernetes-sigs/kubespray/blob/master/docs/netcheck.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Netchecker"),s("OutboundLink")],1),e._v(" 验证 Pod 间连接和 DNS 解析的方法。 Netchecker 确保 netchecker-agents Pod 可以解析 DNS 请求， 并在默认命名空间内对每个请求执行 ping 操作。 这些 Pod 模仿其他工作负载类似的行为，并用作集群运行状况指示器。")]),e._v(" "),s("h2",{attrs:{id:"kubekey"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubekey"}},[e._v("#")]),e._v(" KubeKey")]),e._v(" "),s("h2",{attrs:{id:"kubeblocks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubeblocks"}},[e._v("#")]),e._v(" Kubeblocks")]),e._v(" "),s("h2",{attrs:{id:"capi-lcm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#capi-lcm"}},[e._v("#")]),e._v(" CAPI/LCM")]),e._v(" "),s("p",[e._v("云原生的核心之一是 Kubernetes，而 Kubernetes 的核心之一是集群生命周期管理（LCM）。解决了 LCM 的管理问题，可以一定程度上降低 Kubernetes 的使用成本。本文将主要探讨 LCM 相关问题。")]),e._v(" "),s("p",[e._v("LCM 包括但不局限于：")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("集群创建")])]),e._v(" "),s("li",[s("p",[e._v("集群删除")])]),e._v(" "),s("li",[s("p",[e._v("集群扩缩容，增加或减少节点数")])]),e._v(" "),s("li",[s("p",[e._v("集群升级，集群从低版本升级到更高的版本")])]),e._v(" "),s("li",[s("p",[e._v("集群故障恢复，集群出现故障，例如某节点故障，修复节点故障恢复正常工作")])])]),e._v(" "),s("p",[e._v("社区目前常用 "),s("a",{attrs:{href:"https://github.com/kubernetes/kubeadm?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("kubeadm"),s("OutboundLink")],1),e._v("、"),s("a",{attrs:{href:"https://github.com/kubernetes/kops?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("kOps"),s("OutboundLink")],1),e._v("、"),s("a",{attrs:{href:"https://github.com/kubernetes-sigs/kubespray?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("kubespray"),s("OutboundLink")],1),e._v("、"),s("a",{attrs:{href:"https://github.com/rancher/rke?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("RKE"),s("OutboundLink")],1),e._v("、"),s("a",{attrs:{href:"https://github.com/kubesphere/kubekey?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("kubekey"),s("OutboundLink")],1),e._v(" 等工具创建、扩容和升级集群。公有云和私有云则有自己的 Kubernetes 服务，但这些服务一般仅限本平台，对跨平台支持不友好。此外还有 "),s("a",{attrs:{href:"https://www.rancher.com/?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Rancher"),s("OutboundLink")],1),e._v("、"),s("a",{attrs:{href:"https://kubesphere.io/?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeSphere"),s("OutboundLink")],1),e._v(" 等开源或商业化的容器平台，但它们没有通用的多平台支持，LCM 功能不丰富或是不够自动化。")]),e._v(" "),s("p",[e._v("以上 LCM 方案可能存在的问题：")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("需要掌握一定的 Kubernetes 相关知识和经验")])]),e._v(" "),s("li",[s("p",[e._v("不够自动化，手工管理，命令行工具或没有 UI，效率低，容易出错")])]),e._v(" "),s("li",[s("p",[e._v("没有形成统一的技术标准，各自有自己的技术方案，可扩展性不强")])]),e._v(" "),s("li",[s("p",[e._v("跨平台支持不够好")])])]),e._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/kubernetes-sigs/cluster-api?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cluster API"),s("OutboundLink")],1),e._v("（CAPI）是一个 Kubernetes 声明式 API 风格的多 Kubernetes 集群生命周期管理项目。CAPI 的目标是简化 Kubernetes LCM，使得 LCM 自动化，并支持不同的 IaaS（AWS、VMware 等）。")]),e._v(" "),s("p",[e._v("Kubernetes 声明式 API 通过 Resource + Controller 的模式实现。Resource 包括 Kubernetes 原生资源（Pod 等）和自定义资源（CRD）。每个资源对象包含 Spec 表示资源对象预期是什么样的，Status 表示预期资源对象当前的实际状态，Controller 则负责把资源达到预期的 Spec 状态。")]),e._v(" "),s("p",[e._v("在此基础上，Kubernetes 社区发展出了 Operator 模式，用来管理应用和基础设施资源（例如 "),s("a",{attrs:{href:"https://github.com/prometheus-operator/prometheus-operator?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("prometheus-operator"),s("OutboundLink")],1),e._v("）")]),e._v(" "),s("p",[e._v("Kubernetes 声明式 API 具有组合的特点，不同的 API 可以组合使用，达到功能扩展的目的。例如 Deployment + ReplicaSet + Pod 组合实现多版本应用部署管理。")]),e._v(" "),s("p",[e._v("目前常见通过声明式的方式管理分布式系统，而 Kubernetes 本身也是分布式系统，所以通过声明式管理 Kubernetes 集群是合适的。")]),e._v(" "),s("p",[e._v("CAPI 属于 "),s("a",{attrs:{href:"https://github.com/kubernetes/community/tree/master/sig-cluster-lifecycle#readme?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes Cluster Lifecycle"),s("OutboundLink")],1),e._v(" 生态中的子项目，使用 Kubernetes 声明式风格也是比较天然的（Kube-On-Kube）。可以借用 Kubernetes 生态的优势，同时社区用户也更容易理解和使用。")]),e._v(" "),s("p",[e._v("声明式可以带来以下好处：")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("使用配置文件描述最终状态，不需要考虑流程和目标环境的细节")])]),e._v(" "),s("li",[s("p",[e._v("重复操作不会产生不一致的效果")])]),e._v(" "),s("li",[s("p",[e._v("天然符合不可变基础设施的理念")])]),e._v(" "),s("li",[s("p",[e._v("声明式自愈保证高可用")])])]),e._v(" "),s("p",[e._v("根据 Kubernetes 声明式 API 的特点，当我们需要一个 Kubernetes 集群的时候，可以通过一个 CRD 定义并描述我们的需求。CAPI 定义了 Cluster 用来描述 Kubernetes 集群")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cluster.x"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("k8s.io/v1beta1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Cluster\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("  \n\t"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" mycluster  \n\t"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("namespace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" default\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 需要一个什么样的集群")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("status")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 当前集群的状态")]),e._v("\n")])])]),s("p",[e._v("CAPI controllers 根据 Cluster 创建并管理集群。")]),e._v(" "),s("p",[e._v("CAPI 部署所在的 Kubernetes 集群称为管控集群（Management Cluster），基于 CAPI 创建的 Kubernetes 集群称为工作负载集群（Workload Cluster）")]),e._v(" "),s("p",[e._v("管控集群主要由 CAPI 和 CAPI Providers 组成。")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("CAPI：集群的基础管理工作、Worker 节点的生命周期管理、协调 Providers 完成集群 LCM 工作；")])]),e._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/user/concepts.html#infrastructure-provider?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Infrastructure Provider"),s("OutboundLink")],1),e._v("：管理集群所需要的基础设施资源")])]),e._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/user/concepts.html#control-plane?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("ControlPlane Provider"),s("OutboundLink")],1),e._v("：Control Plane 节点的生命周期管理")])]),e._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/user/concepts.html#bootstrap-provider?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Bootstrap Provider"),s("OutboundLink")],1),e._v("：部署节点")])])]),e._v(" "),s("p",[e._v("节点是集群的核心，节点的管理也是集群管理的重要部分。节点分为 Control Plane 和 Worker 节点，两者的角色和功能不一样，管理起来也有差异。")]),e._v(" "),s("p",[e._v("一个 Worker 节点包含多个 Kubernetes 组件程序（kubelet 等），集群升级过程会存在多个版本的节点同时存在的情况。这些特点和 Pod 有些相似之处，因此 CAPI 借鉴了 Deployment 的设计理念：MachineDeployment (MD) + MachineSet (MS) + Machine (Pod)，每个 MachineSet 管理同一个版本的节点")]),e._v(" "),s("p",[e._v("Control Plane 节点是集群的控制面，业务逻辑和 Worker 节点不一样，除了有 kubelet 还有 APIServer、Etcd 等不同的组件。")]),e._v(" "),s("p",[e._v("Control Plane 节点目前常见以下几种管理方式：")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("集群自身管理，例如 kubeadm 通过 "),s("a",{attrs:{href:"https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("static pods"),s("OutboundLink")],1),e._v(" 运行 Control Plane 节点")])]),e._v(" "),s("li",[s("p",[e._v("额外的 Kubernetes 集群部署，使用 Deployment 和 StatefulSet 的形式部署 Control Plane 节点")])]),e._v(" "),s("li",[s("p",[e._v("第三方托管，例如 GKE、AKS、EKS 等")])])]),e._v(" "),s("p",[e._v("CAPI 提供了 "),s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/user/concepts.html#control-plane?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("ControlPlane Provider"),s("OutboundLink")],1),e._v(" 的概念，我们可以根据不同的 Control Plane 节点")]),e._v(" "),s("p",[e._v("管理方式而选择不同的 Provider。CAPI 默认提供了 "),s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/developer/architecture/controllers/control-plane.html?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeadmControlPlane"),s("OutboundLink")],1),e._v("（KCP）管理 Control Plane 节点。")]),e._v(" "),s("p",[e._v("多平台")]),e._v(" "),s("p",[e._v("不同的 IaaS 管理 Kubernetes 集群会有差异。CAPI 封装了每个 IaaS 通用的 LCM 数据和逻辑，每个 IaaS 只需要处理自己特有的相关逻辑。为此 CAPI 提出了 "),s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/user/concepts.html#infrastructure-provider?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Infrastructure Provider"),s("OutboundLink")],1),e._v(" 的概念，每个 IaaS 按照规范实现即可（参考 "),s("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/developer/providers/implementers.html?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2ODE1NTI2MDQsImZpbGVHVUlEIjoiMTZxOE00UkJ4UVU1dlBrNyIsImlhdCI6MTY4MTU1MjMwNCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjowfQ.3XN8pyiqaehgqCWYJsa6iO_1hAQgpGFcHEonGPW2I_M",target:"_blank",rel:"noopener noreferrer"}},[e._v("Provider Implementers"),s("OutboundLink")],1),e._v("）。Provider 体现了 CAPI 利用 Kubernetes 声明式 API 抽象和组合的作用，带来了可以支持不同 IaaS 集群管理的可扩展性")]),e._v(" "),s("h2",{attrs:{id:"cri、oci、cri-o、runc和containerd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cri、oci、cri-o、runc和containerd"}},[e._v("#")]),e._v(" CRI、OCI、CRI-O、RUNC和containerd")]),e._v(" "),s("p",[e._v("CRI（Container Runtime Interface，容器运行时接口）是kubernetes定义的接口，定义了如何操作容器和镜像的统一规范，它主要包含ImageService和ContainerService。因为它已经是一个标准，所以你可以选择任何一个CRI的实现（ containerd和CRI-O）来使用。")]),e._v(" "),s("p",[e._v("CRI-O也是一个CRI的实现，它来自于Red Hat/IBM等")]),e._v(" "),s("p",[e._v("OCI（Open Container Initialtive）提供了容器镜像和运行容器的规范。runc是OCI的一个实现，它是一个创建和运行容器进程的工具。")]),e._v(" "),s("p",[e._v("RUNC 实际上是从libcontainer演化过来的，并且是docker贡献给社区的第一个OCI参考实现，它就是用来创建和运行容器进行的工具。")]),e._v(" "),s("p",[e._v("containerd是容器虚拟化技术，从docker中剥离出来，形成开放容器接口（OCI）标准的一部分。")]),e._v(" "),s("p",[e._v("docker对容器的管理和操作基本都是通过containerd完成的。Containerd 是一个工业级标准的容器运行时，它强调简单性、健壮性和可移植性。Containerd 可以在宿主机中管理完整的容器生命周期：容器镜像的传输和存储、容器的执行和管理、存储和网络等。详细点说，Containerd 负责干下面这些事情")]),e._v(" "),s("p",[e._v("管理容器的生命周期(从创建容器到销毁容器)\n拉取/推送容器镜像\n存储管理(管理镜像及容器数据的存储)\n调用 runC 运行容器(与 runC 等容器运行时交互)\n管理容器网络接口及网络")]),e._v(" "),s("h2",{attrs:{id:"rook"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rook"}},[e._v("#")]),e._v(" Rook")]),e._v(" "),s("p",[e._v("rook是面向k8s的分布式存储框架")]),e._v(" "),s("p",[e._v("https://github.com/rook/rook")]),e._v(" "),s("h2",{attrs:{id:"ansible"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ansible"}},[e._v("#")]),e._v(" Ansible")]),e._v(" "),s("p",[e._v("Ansible 是使用 Python 开发的自动化运维工具，如果这么说比较抽象的话，那么可以说 Ansible 可以让服务器管理人员使用文本来管理服务器，编写一段配置文件，在不同的机器上执行。")]),e._v(" "),s("p",[e._v("Ansible 使用 YAML 作为配置文件，YAML 是一个非常节省空间，并且没有丧失可读性的文件格式，其设计参考了很多语言和文件格式，包括 XML，JSON，C 语言，Python，Perl 以及电子邮件格式 RFC2822 等等。")]),e._v(" "),s("p",[e._v("Ansible 解决的问题正是在运维过程中多机器管理的问题。当有一台机器时运维比较简单，当如果要去管理 100 台机器，复杂度就上升了。使用 Ansible 可以让运维人员通过简单直观的文本配置来对所有纳入管理的机器统一进行管理。如果再用简单的话来概述 Ansible 的话，就是定义一次，无数次执行。")]),e._v(" "),s("p",[e._v("Ansible的主要工作")]),e._v(" "),s("ul",[s("li",[e._v("定义目标机器列表，也就是需要管理的机器")]),e._v(" "),s("li",[e._v("定义配置，使用 "),s("a",{attrs:{href:"https://einverne.github.io/post/2015/08/yaml.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("YAML"),s("OutboundLink")],1),e._v(" 文件配置任务")]),e._v(" "),s("li",[e._v("执行具体任务")])]),e._v(" "),s("p",[e._v("Ansible的特性")]),e._v(" "),s("ul",[s("li",[e._v("低学习成本")]),e._v(" "),s("li",[e._v("无需在服务器中安装客户端，基于 SSH 工作，可并行执行")]),e._v(" "),s("li",[e._v("无需服务端，直接终端命令即可")]),e._v(" "),s("li",[e._v("管理的对象可以包括物理机，虚拟机，容器等等")]),e._v(" "),s("li",[e._v("使用 YAML 格式文件编排 playbook")])]),e._v(" "),s("p",[e._v("基本概念")]),e._v(" "),s("p",[e._v("Ansible 中的一些概念。")]),e._v(" "),s("ul",[s("li",[s("strong",[e._v("control node")]),e._v(": 控制节点，可以在任何安装了 Python 环境的机器中使用 ansible，两个重要的可执行文件在 "),s("code",[e._v("/usr/bin/ansible")]),e._v(" 和 "),s("code",[e._v("/usr/bin/ansible-playbook")])]),e._v(" "),s("li",[s("strong",[e._v("managed node")]),e._v(": 被控制的节点")]),e._v(" "),s("li",[s("strong",[e._v("inventory")]),e._v(": 需要管理的节点，通常配置成 "),s("code",[e._v("hostfile")]),e._v(" 文件 "),s("a",{attrs:{href:"https://einverne.github.io/post/2020/05/ansible-introduction.html#fn:inventory",target:"_blank",rel:"noopener noreferrer"}},[e._v("1"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("modules: ansible 进行自动化任务时调用的模块，社区提供了非常多 "),s("a",{attrs:{href:"https://docs.ansible.com/ansible/latest/modules/list_of_all_modules.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("modules"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("strong",[e._v("Task")]),e._v(": Ansible 的执行单元")]),e._v(" "),s("li",[s("strong",[e._v("playbook")]),e._v(": 编排多个任务")]),e._v(" "),s("li",[s("strong",[e._v("roles")]),e._v(": roles 是将 playbook 划分多个部分的机制")]),e._v(" "),s("li",[s("strong",[e._v("plugins")]),e._v(": ansible 插件")])]),e._v(" "),s("p",[e._v("工作流程：")]),e._v(" "),s("ul",[s("li",[e._v("读取配置")]),e._v(" "),s("li",[e._v("获取机器列表及分组配置")]),e._v(" "),s("li",[e._v("确定执行模块和配置，modules 目录动态读取")]),e._v(" "),s("li",[e._v("Runner 执行")]),e._v(" "),s("li",[e._v("输出")])]),e._v(" "),s("p",[e._v("ubuntu安装")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt")]),e._v(" update\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" software-properties-common\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" apt-add-repository "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--yes")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--update")]),e._v(" ppa:ansible/ansible\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("apt")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" ansible\n")])])]),s("p",[e._v("配置")]),e._v(" "),s("p",[s("code",[e._v("ansible.cfg")]),e._v(" 文件是 Ansible 中最主要的配置文件，ansible 寻找配置文件按照如下的优先级进行：")]),e._v(" "),s("ul",[s("li",[e._v("由环境变量 "),s("code",[e._v("ANSIBLE_CONFIG")]),e._v(" 指定的文件")]),e._v(" "),s("li",[s("code",[e._v("./ansible.cfg")]),e._v(" ("),s("code",[e._v("ansible.cfg")]),e._v(" in the current directory)")]),e._v(" "),s("li",[s("code",[e._v("~/.ansible.cfg")]),e._v(" ("),s("code",[e._v(".ansible.cfg")]),e._v(" in your home directory)")]),e._v(" "),s("li",[s("code",[e._v("/etc/ansible/ansible.cfg")])])]),e._v(" "),s("p",[e._v("最简单的 "),s("code",[e._v("ansible.cfg")]),e._v(" 配置示例：")]),e._v(" "),s("div",{staticClass:"language-toml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-toml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token table class-name"}},[e._v("defaults")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key property"}},[e._v("hostfile")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" hosts\n"),s("span",{pre:!0,attrs:{class:"token key property"}},[e._v("remote_user")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" root\n"),s("span",{pre:!0,attrs:{class:"token key property"}},[e._v("remote_port")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("22")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key property"}},[e._v("host_key_checking")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("=")]),e._v(" False\n")])])]),s("ul",[s("li",[s("p",[e._v("Hostfile")]),e._v(" "),s("p",[e._v("文件指定了当前文件夹下的 hosts 文件。hosts 文件中会配置需要管理的机器 host")]),e._v(" "),s("ul",[s("li",[e._v("配置 SSH 免密登录的文章可以参考之前的"),s("a",{attrs:{href:"https://einverne.github.io/post/2016/06/ssh-copy-id.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("文章"),s("OutboundLink")],1),e._v(".")])])]),e._v(" "),s("li",[s("p",[s("code",[e._v("remote_user")]),e._v(" 配置默认操作的用户，如果没有配置，默认会使用当前用户")])]),e._v(" "),s("li",[s("p",[s("code",[e._v("host_key_checking")]),e._v(": 禁用 SSH key host checking")])])]),e._v(" "),s("p",[e._v("https://einverne.github.io/post/2020/05/ansible-introduction.html#%E5%B0%8F%E7%BB%93")])])}),[],!1,null,null,null);t.default=r.exports}}]);