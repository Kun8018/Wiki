(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{340:function(e,t,r){"use strict";r.r(t);var s=r(14),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("​        基于云原生的周边工具")]),e._v(" "),r("h2",{attrs:{id:"kubefwd"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubefwd"}},[e._v("#")]),e._v(" Kubefwd")]),e._v(" "),r("p",[r("strong",[e._v("kubefwd")]),e._v(" 是一个用于端口转发Kubernetes中指定namespace下的全部或者部分pod的命令行工具。 "),r("strong",[e._v("kubefwd")]),e._v(" 使用本地的环回IP地址转发需要访问的service，并且使用与service相同的端口。 "),r("strong",[e._v("kubefwd")]),e._v(" 会临时将service的域条目添加到 "),r("code",[e._v("/etc/hosts")]),e._v(" 文件中")]),e._v(" "),r("p",[e._v("安装")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[e._v("brew "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" txn2/tap/kubefwd\n")])])]),r("p",[r("strong",[e._v("kubefwd")]),e._v(" 默认你已经安装了 "),r("strong",[e._v("kubectl")]),e._v(" 工具并且也已经设置好了访问Kubernetes集群的配置文件。"),r("strong",[e._v("kubefwd")]),e._v(" 使用 "),r("strong",[e._v("kubectl")]),e._v(" 的上下文运行环境. "),r("strong",[e._v("kubectl")]),e._v(" 工具并不会用到，但是它的配置文件会被用来访问Kubernetes集群。")]),e._v(" "),r("p",[e._v("使用前首先确保上下文运行环境")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[e._v("kubectl config current-context\n")])])]),r("p",[e._v("启动"),r("strong",[e._v("kubefwd")]),e._v("后，在本地就能像在Kubernetes集群中一样使用service名字与端口访问对应的应用程序。")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[r("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubefwd services "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" the project\n")])])]),r("p",[e._v("转发namespace "),r("code",[e._v("the-project")]),e._v("下所有的带有label为"),r("code",[e._v("system: wx")]),e._v("的service\\")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[r("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubefwd svc "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-l")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("system")]),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("wx "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" the-project\n")])])]),r("h2",{attrs:{id:"kubeshark"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubeshark"}},[e._v("#")]),e._v(" Kubeshark")]),e._v(" "),r("p",[e._v("Kubeshark由2021年UP9公司开源的K8s API流量查看器 Mizu 发展而来，试图成为一款K8s全过程流量监控工具")]),e._v(" "),r("p",[e._v("Kubeshark 也被叫做 Kubernetes 的可观测性工具，可以对微服务进行动态分析，检测异常并在运行时出现某些模式时触发功能。")]),e._v(" "),r("ol",[r("li",[e._v("可以将 Kubeshark 视为 Wireshark、BPF 编译器集合 (BCC) 工具等的 Kubernetes 感知组合。")]),e._v(" "),r("li",[e._v("Kubeshark 可以嗅探集群中的部分或所有 TCP 流量，将其记录到 PCAP 文件中并剖析。")]),e._v(" "),r("li",[e._v("Kubeshark 使用 eBPF 来跟踪内核空间和用户空间中的函数调用。")])]),e._v(" "),r("p",[e._v("Kubeshark 由三个不同的软件组成，它们可以协同工作：CLI、Hub 和 Worker。")]),e._v(" "),r("ol",[r("li",[e._v("CLI，它是客户端的 二进制文件，通过 K8s API 与集群通信。")]),e._v(" "),r("li",[e._v("Hub，它协调 worker 部署，接收来自每个 worker 的嗅探和剖析，并收集到一个中心位置。它还提供一个Web界面，用于在浏览器上显示收集到的流量。")]),e._v(" "),r("li",[e._v("Work，作为 DaemonSet 部署到集群中，以确保集群中的每个节点都被 Kubeshark 覆盖。")])]),e._v(" "),r("p",[e._v("在底层实现当中，Kubeshark主要使用到了Linux内核中的各种内置方法和API，隐藏了对流量数据的加解密实现，可以直接收集到K8s集群中的加密和未加密流量。对网络数据的收集主要使用了直接抓包法和基于拓展伯克利包过滤（eBPF）的数据包获取。直接抓包法涉及"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//www.tcpdump.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("libpcap"),r("OutboundLink")],1),e._v("、"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//man7.org/linux/man-pages/man7/packet.7.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("AF_PACKET"),r("OutboundLink")],1),e._v("和"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//www.ntop.org/products/packet-capture/pf_ring/",target:"_blank",rel:"noopener noreferrer"}},[e._v("PF_RING"),r("OutboundLink")],1),e._v("获取集群TCP流量，eBPF的方法主要使用到了"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Transport_Layer_Security",target:"_blank",rel:"noopener noreferrer"}},[e._v("加密流量 (TLS)"),r("OutboundLink")],1),e._v("，并挂钩到"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//www.openssl.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenSSL"),r("OutboundLink")],1),e._v("库和 Go 的"),r("a",{attrs:{href:"https://link.zhihu.com/?target=https%3A//pkg.go.dev/crypto/tls",target:"_blank",rel:"noopener noreferrer"}},[e._v("crypto/tls"),r("OutboundLink")],1),e._v("包中某些函数的入口点和出口点。")]),e._v(" "),r("p",[e._v("Kubeshark具体功能")]),e._v(" "),r("p",[e._v("网络嗅探")]),e._v(" "),r("p",[e._v("Kubeshark 可以使用 Linux 内核中内置的各种方法和 API 嗅探集群中的加密和未加密流量。")]),e._v(" "),r("ol",[r("li",[e._v("直接抓包，直接使用 libpcap、AF_PACKET 和 PF_RING 嗅探集群中的 TCP 流量，并将其记录到 PCAP 文件中。例如在使用服务网格的场景中，Kubeshark 会自动检测任何 Envoy Proxy并将其包含到其 TCP 数据包捕获源列表中。")]),e._v(" "),r("li",[e._v("基于 eBPF 抓包，基于 eBPF 的数据包捕获使用 eBPF 嗅探集群中的加密流量 (TLS)，而无需实际进行解密。事实上，它挂钩到 OpenSSL 库和 Go 的 crypto/tls 包中某些函数的入口点和出口点。")])]),e._v(" "),r("p",[e._v("查询")]),e._v(" "),r("p",[e._v("内核跟踪")]),e._v(" "),r("p",[e._v("Kubeshark 使用 🐝 eBPF（扩展伯克利数据包过滤器）提供跟踪内核空间和用户空间功能。")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[e._v("kubeshark tap "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--tls")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-n")]),e._v(" harbor\n")])])]),r("p",[e._v("流量校验")]),e._v(" "),r("p",[e._v("服务地图")]),e._v(" "),r("p",[e._v("部署完成后，Kubeshark CLI 将在 http://localhost:8899 打开 UI 单击右上角名为 Service Map 的按钮打开服务依赖关系图。该图根据网络流量显示 Pod 以及它们之间的关系。")]),e._v(" "),r("p",[e._v("数据脱敏")]),e._v(" "),r("p",[e._v("Kubeshark 捕获的流量包含敏感信息。用户可以配置 Kubeshark 以隐藏某些关键字或数据片段将在 UI 中显示为 [REDACTED]。")]),e._v(" "),r("p",[e._v("默认的脱敏字段 “token”, “authorization”, “authentication”, “cookie”, “userid”, “password”, “username”,")]),e._v(" "),r("p",[e._v("“user”, “key”, “passcode”, “pass”, “auth”, “authtoken”, “jwt”, “bearer”, “clientid”,")]),e._v(" "),r("p",[e._v("“clientsecret”, “redirecturi”, “phonenumber”, “zip”, “zipcode”, “address”, “country”,")]),e._v(" "),r("p",[e._v("“firstname”, “lastname”, “middlename”, “fname”, “lname”, “birthdate”")]),e._v(" "),r("p",[e._v("Kubeshark Cli指南")]),e._v(" "),r("ul",[r("li",[e._v("check：检查 Kubeshark 安装是否存在潜在问题")]),e._v(" "),r("li",[e._v("clean：删除所有 kubeshark 资源")]),e._v(" "),r("li",[e._v("completion：为指定的 shell 生成自动完成脚本")]),e._v(" "),r("li",[e._v("config：使用默认值生成配置")]),e._v(" "),r("li",[e._v("help：帮助文档")]),e._v(" "),r("li",[e._v("install：安装 kubeshark 组件")]),e._v(" "),r("li",[e._v("logs：创建一个包含 Github 问题或故障排除日志的 zip 文件")]),e._v(" "),r("li",[e._v("tap：记录 kubernetes pod 的传入流量")]),e._v(" "),r("li",[e._v("version：打印版本信息")]),e._v(" "),r("li",[e._v("view：在浏览器中打开 GUI")])]),e._v(" "),r("p",[e._v("命令")]),e._v(" "),r("p",[r("code",[e._v("kubeshark tap catalogue-b87b45784-sxc8q")]),e._v(": 监控指定的Pod")]),e._v(" "),r("p",[r("code",[e._v('kubeshark tap "(catalo*|front-ent*)"')]),e._v(": 使用正则表达式监控一组Pod")]),e._v(" "),r("p",[r("code",[e._v("kubeshark tap -n sock-shop")]),e._v(":指定监控的Namespace")]),e._v(" "),r("p",[r("code",[e._v("kubeshark tap -A")]),e._v("指定所有Namespace")]),e._v(" "),r("h2",{attrs:{id:"okteto"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#okteto"}},[e._v("#")]),e._v(" okteto")]),e._v(" "),r("h2",{attrs:{id:"kubevirt"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubevirt"}},[e._v("#")]),e._v(" KubeVirt")]),e._v(" "),r("p",[e._v("管理K8s集群上的虚拟化服务")]),e._v(" "),r("h2",{attrs:{id:"kail"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kail"}},[e._v("#")]),e._v(" Kail")]),e._v(" "),r("p",[e._v("K8s日志工具")]),e._v(" "),r("p",[e._v("安装")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[e._v("$ brew tap boz/repo\n$ brew "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" boz/repo/kail\n")])])]),r("p",[e._v("使用")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# match pods belonging to a replicaset named 'workers' in any namespace.")]),e._v("\n$ kail "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--rs")]),e._v(" workers\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# match pods belonging to the replicaset named 'workers' only in the 'staging' namespace")]),e._v("\n$ kail "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--rs")]),e._v(" staging/workers\n\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v('# match pods belonging to both the service "frontend" and the deployment "webapp"')]),e._v("\n$ kail "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--svc")]),e._v(" frontend "),r("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--deploy")]),e._v(" webapp\n")])])]),r("h2",{attrs:{id:"rainbond"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rainbond"}},[e._v("#")]),e._v(" Rainbond")]),e._v(" "),r("p",[r("code",[e._v("Rainbond")]),e._v(" 遵循 "),r("strong",[e._v("以应用为中心")]),e._v(" 的设计理念，统一封装容器、Kubernetes和底层基础设施相关技术，让使用者专注于业务本身, 避免在业务以外技术上花费大量学习和管理精力。同时，Rainbond 深度整合应用开发、微服务架构、应用交付、应用运维、资源管理，管理高度自动化，实现统一管理所有应用、所有基础设施和所有IT流程。")]),e._v(" "),r("p",[e._v("Rainbond 通过“无侵入”技术，让传统应用不需要改动或少量改动就能快速变成云原生应用。 传统应用转成成云原生应用的方式：")]),e._v(" "),r("ul",[r("li",[e._v("有源代码和软件包的应用，平台自动识别开发语言类型和包类型，不改变开发者习惯，代码直接编译、构建成支持云原生特性的应用。")]),e._v(" "),r("li",[e._v("对于想实现微服务架构的传统应用，Rainbond提供Service Mesh 微服务架构，应用不改代码就能变成微服务架构。")]),e._v(" "),r("li",[e._v("传统应用想要扩展运维和治理功能，Rainbond提供“无侵入”的插件，按需加载插件，开启运维和服务治理能力。")])]),e._v(" "),r("p",[e._v("Rainbond能将企业内部各种数字化能力一键发布成组件，并具备组件安装使用、组件编排、组件版本管理、组件升级和持续迭代等完整的管理流程，将企业内部可复用的能力积累到组件库，既避免重复建设，还能将这些组件变成数字资产，为企业创新提供动力。")]),e._v(" "),r("p",[e._v("Rainbond提供企业应用的业务集成、多云交付、私有交付、SaaS交付、离线交付、个性化交付、应用市场等能力，将交付过程最大限度自动化，提高企业应用交付效率，降低交付成本")]),e._v(" "),r("p",[e._v("https://www.rainbond.com/docs/")]),e._v(" "),r("h2",{attrs:{id:"kube-rs"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kube-rs"}},[e._v("#")]),e._v(" Kube-rs")]),e._v(" "),r("p",[e._v("rust的kubernetes客户端")]),e._v(" "),r("p",[e._v("https://liangyuanpeng.com/post/fundation-rust/quick-start-kubernetes-client-rust/")]),e._v(" "),r("h2",{attrs:{id:"kubesphere"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubesphere"}},[e._v("#")]),e._v(" KubeSphere")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://kubesphere.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeSphere"),r("OutboundLink")],1),e._v(" 是在 "),r("a",{attrs:{href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes"),r("OutboundLink")],1),e._v(" 之上构建的面向云原生应用的"),r("strong",[e._v("分布式操作系统")]),e._v("，完全开源，支持多云与多集群管理，提供全栈的 IT 自动化运维能力，简化企业的 DevOps 工作流。它的架构可以非常方便地使第三方应用与云原生生态组件进行即插即用 (plug-and-play) 的集成。")]),e._v(" "),r("p",[e._v("作为全栈的多租户容器平台，KubeSphere 提供了运维友好的向导式操作界面，帮助企业快速构建一个强大和功能丰富的容器云平台。KubeSphere 为用户提供构建企业级 Kubernetes 环境所需的多项功能，例如"),r("strong",[e._v("多云与多集群管理、Kubernetes 资源管理、DevOps、应用生命周期管理、微服务治理（服务网格）、日志查询与收集、服务与网络、多租户管理、监控告警、事件与审计查询、存储管理、访问权限控制、GPU 支持、网络策略、镜像仓库管理以及安全管理")]),e._v("等。")]),e._v(" "),r("p",[e._v("KubeSphere 还开源了 "),r("a",{attrs:{href:"https://github.com/kubesphere/kubekey",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeKey"),r("OutboundLink")],1),e._v(" 帮助企业一键在公有云或数据中心快速搭建 Kubernetes 集群，提供单节点、多节点、集群插件安装，以及集群升级与运维。")]),e._v(" "),r("p",[e._v("KubeSphere 为用户屏蔽了基础设施底层复杂的技术细节，帮助企业在各类基础设施之上无缝地部署、更新、迁移和管理现有的容器化应用。通过这种方式，KubeSphere 使开发人员能够专注于应用程序开发，使运维团队能够通过企业级可观测性功能和故障排除机制、统一监控和日志查询、存储和网络管理，以及易用的 CI/CD 流水线等来加快 DevOps 自动化工作流程和交付流程等。")]),e._v(" "),r("p",[e._v("KubeSphere 作为开源的企业级全栈化容器平台，为用户提供了一个健壮、安全、功能丰富、具备极致体验的 Web 控制台。拥有企业级 Kubernetes 所需的最常见的功能，如工作负载管理，网络策略配置，微服务治理（基于 Istio），DevOps 项目 (CI/CD) ，安全管理，Source to Image/Binary to Image，多租户管理，多维度监控，日志查询和收集，告警通知，审计，应用程序管理和镜像管理、应用配置密钥管理等功能模块。")]),e._v(" "),r("p",[e._v("它还支持各种开源存储和网络解决方案以及云存储服务。例如，KubeSphere 为用户提供了功能强大的云原生工具"),r("a",{attrs:{href:"https://openelb.github.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("负载均衡器插件 OpenELB"),r("OutboundLink")],1),e._v("，这是为 Kubernetes 集群开发的 CNCF 认证的负载均衡插件。")]),e._v(" "),r("p",[e._v("生态：https://kubesphere.io/zh/docs/v3.3/pluggable-components/app-store/")]),e._v(" "),r("h3",{attrs:{id:"kubekey"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kubekey"}},[e._v("#")]),e._v(" Kubekey")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/kubesphere/kubekey",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeKey"),r("OutboundLink")],1),e._v(" 允许用户直接在基础架构上部署 Kubernetes，为 Kubernetes 集群提供高可用性。建议在生产环境至少配置三个主节点。")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/kubesphere/kubekey",target:"_blank",rel:"noopener noreferrer"}},[e._v("KubeKey"),r("OutboundLink")],1),e._v(" 提供了一种简单的安装，管理和维护方式。它支持 Kubernetes 集群的滚动升级，以便集群服务在升级时始终可用。另外，也可以使用 KubeKey 将新节点添加到 Kubernetes 集群中以使用更多工作负载。")]),e._v(" "),r("h2",{attrs:{id:"pg-for-k8s"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#pg-for-k8s"}},[e._v("#")]),e._v(" Pg for K8s")]),e._v(" "),r("p",[e._v("https://portworx.com/blog/choosing-a-kubernetes-operator-for-postgresql/")]),e._v(" "),r("p",[e._v("https://github.com/CrunchyData/postgres-operator/")]),e._v(" "),r("p",[e._v("https://github.com/zalando/postgres-operator")]),e._v(" "),r("p",[e._v("https://github.com/ankane/pgsync")]),e._v(" "),r("h2",{attrs:{id:"google-k8s-engine"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#google-k8s-engine"}},[e._v("#")]),e._v(" Google K8s Engine")]),e._v(" "),r("h2",{attrs:{id:"kube-monkey"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kube-monkey"}},[e._v("#")]),e._v(" Kube-monkey")]),e._v(" "),r("h2",{attrs:{id:"vault"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#vault"}},[e._v("#")]),e._v(" Vault")]),e._v(" "),r("p",[e._v("Vault提供令牌管理，基于K8s的令牌管理系统")]),e._v(" "),r("p",[e._v("https://github.com/hashicorp/vault")]),e._v(" "),r("h2",{attrs:{id:"packer、"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#packer、"}},[e._v("#")]),e._v(" Packer、")]),e._v(" "),r("p",[e._v("自动构建镜像")]),e._v(" "),r("h2",{attrs:{id:"k3s"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#k3s"}},[e._v("#")]),e._v(" K3s")]),e._v(" "),r("h2",{attrs:{id:"k9s"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#k9s"}},[e._v("#")]),e._v(" K9s")]),e._v(" "),r("p",[e._v("与K8s互动的操作面板")]),e._v(" "),r("div",{staticClass:"language-shell extra-class"},[r("pre",{pre:!0,attrs:{class:"language-shell"}},[r("code",[e._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Via Homebrew")]),e._v("\n brew "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" derailed/k9s/k9s\n "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Via MacPort")]),e._v("\n "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" port "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" k9s\n")])])]),r("p",[e._v("https://k9scli.io/")]),e._v(" "),r("h2",{attrs:{id:"k8s的问题和局限性"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#k8s的问题和局限性"}},[e._v("#")]),e._v(" K8s的问题和局限性")]),e._v(" "),r("p",[e._v("2014 年发布的 Kubernetes 在今天俨然已成为容器编排领域的事实标准，相信谈到 Kubernetes 的开发者都会一再复述上述现象。如下图所示，今天的大多数个人或者团队都会选择 Kubernetes 管理容器，而也有 75% 的人会在生产环境中使用 Kubernetes。")]),e._v(" "),r("p",[e._v("在这种全民学习和使用 Kubernetes 的大背景下，我们也应该非常清晰地知道 Kubernetes 有哪些局限性。虽然 Kubernetes 能够解决容器编排领域的大多数问题，但是仍然有一些场景是它很难处理、甚至无法处理的，只有对这些潜在的风险有清晰的认识，才能更好地驾驭这项技术，")]),e._v(" "),r("h3",{attrs:{id:"集群管理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#集群管理"}},[e._v("#")]),e._v(" 集群管理")]),e._v(" "),r("p",[e._v("集群是一组能够在一起协同工作的计算机，我们可以将集群中的所有计算机看成一个整体，所有资源调度系统都是以集群为维度进行管理的，集群中的所有机器构成了资源池，这个巨大的资源池会为待运行的容器提供资源执行计算任务，这里简单谈一谈 Kubernetes 集群管理面对的几个复杂问题。")]),e._v(" "),r("p",[r("strong",[e._v("水平扩展性")])]),e._v(" "),r("p",[e._v("集群大小是我们在评估资源管理系统时需要关注的重要指标之一，然而 Kubernetes 能够管理的集群规模远远小于业界的其他资源管理系统。集群大小为什么重要呢，我们先来看另一个同样重要的指标 — 资源利用率，很多工程师可能没有在公有云平台上申请过资源，这些资源都相当昂贵，在 AWS 上申请一个与主机差不多配置的虚拟机实例（8 CPU、16 GB）每个月大概需要 150 美金，约为 1000 人民币"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:2",target:"_blank",rel:"noopener noreferrer"}},[e._v("2"),r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("大多数的集群都会使用 48 CPU 或者 64 CPU 的物理机或者虚拟机作为集群中的节点，如果我们的集群中需要包含 5,000 个节点，那么这些节点每个月大概要 8,000,000 美元，约为 50,000,000 人民币，在这样的集群中"),r("strong",[e._v("提升 1% 的资源利用率就相当于每个月节省了 500,000 的成本")]),e._v("。")]),e._v(" "),r("p",[e._v("多数在线任务的资源利用率都很低，更大的集群意味着能够运行更多的工作负载，而多种高峰和低谷期不同的负载部署在一起可以实现超售，这样能够显著地提高集群的资源利用率，如果单个集群的节点数足够多，我们在部署不同类型的任务时会有更合理的组合，可以完美错开不同服务的高峰期。")]),e._v(" "),r("p",[e._v("Kubernetes 社区对外宣传的是单个集群最多支持 5,000 节点，Pod 总数不超过 150,000，容器总数不超过 300,000 以及单节点 Pod 数量不超过 100 个"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:3",target:"_blank",rel:"noopener noreferrer"}},[e._v("3"),r("OutboundLink")],1),e._v("，与几万节点的 Apache Mesos 集群、50,000 节点的微软 YARN 集群"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:4",target:"_blank",rel:"noopener noreferrer"}},[e._v("4"),r("OutboundLink")],1),e._v("相比，Kubernetes 的集群规模整整差了一个数量级。虽然阿里云的工程师也通过优化 Kubernetes 的各个组件实现了 5 位数的集群规模，但是与其他的资源管理方式相比却有比较大的差距")]),e._v(" "),r("p",[e._v("需要注意的是 Kubernetes 社区虽然对外宣称单集群可以支持 5,000 节点，同时社区也有各种各样的集成测试保证每个改动都不会影响它的伸缩性"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:6",target:"_blank",rel:"noopener noreferrer"}},[e._v("6"),r("OutboundLink")],1),e._v("，但是 Kubernetes 真的非常复杂，我们没有办法保证你使用的每个功能在扩容的过程中都不出问题。而在生产环境中，我们甚至可能在集群扩容到 1000 ~ 1500 节点时遇到瓶颈。")]),e._v(" "),r("p",[e._v("每个稍具规模的大公司都想要实现更大规模的 Kubernetes 集群，但是这不是一个改几行代码就能解决的简单问题，它可能需要我们限制 Kubernetes 中一些功能的使用，在扩容的过程中，etcd、API 服务器、调度器以及控制器都有可能出现问题。社区中已经有一些开发者注意到了其中的一些问题，例如在节点上增加缓存降低 API 服务器的负载"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:7",target:"_blank",rel:"noopener noreferrer"}},[e._v("7"),r("OutboundLink")],1),e._v("，但是要推动类似的改变还是很困难的，有志之士可以尝试在社区推动类似的项目。")]),e._v(" "),r("p",[r("strong",[e._v("多集群管理")])]),e._v(" "),r("p",[e._v("单个集群的容量再大也无法解决企业面对的问题，哪怕有一天 Kubernetes 集群可以达到 50,000 节点的规模，我们仍然需要管理多个集群，多集群管理也是 Kubernetes 社区目前正在探索的方向，社区中的多集群兴趣小组（SIG Multi-Cluster）目前就在完成相关的工作"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:8",target:"_blank",rel:"noopener noreferrer"}},[e._v("8"),r("OutboundLink")],1),e._v("。在作者看来，Kubernetes 的多集群会带来资源不平衡、跨集群访问困难以及提高运维和管理成本三大问题，我们在这里谈一谈目前在开源社区和业界几种可供参考和选择的解决方案。")]),e._v(" "),r("p",[e._v("Kubefed项目是 Kubernetes 社区给出的解决方案，它同时提供了跨集群的资源和网络管理的功能，社区的多集群兴趣小组（SIG Multi-Cluster）负责了该项目的开发工作")]),e._v(" "),r("p",[e._v("kubefed 通过一个中心化的联邦控制面板管理多集群中的元数据，上层的控制面板会为管理器群中的资源创建对应的联邦对象")]),e._v(" "),r("p",[e._v("上层的控制面板会根据联邦对象 "),r("code",[e._v("FederatedDeployment")]),e._v(" 的规格文件生成对应的 "),r("code",[e._v("Deployment")]),e._v(" 并推送到下层的集群，下层集群可以正常根据 "),r("code",[e._v("Deployment")]),e._v(" 中的定义创建特定数量的副本。")]),e._v(" "),r("p",[r("code",[e._v("FederatedDeployment")]),e._v(" 只是一种最简单的分发策略，在生产环境中我们希望通过联邦的集群实现容灾等复杂功能，这时可以利用 "),r("code",[e._v("ReplicaSchedulingPreference")]),e._v(" 在不同集群中实现更加智能的分发策略：")]),e._v(" "),r("p",[e._v("我们可以认为 kubefed 的主要作用是将多个松散的集群组成强耦合的联邦集群，并提供更加高级的网络和部署功能，这样我们可以更容易地解决集群之间资源不平衡和连通性的一些问题，然而该项目的关注点不包含集群生命周期的管理，")]),e._v(" "),r("p",[r("strong",[e._v("集群接口")])]),e._v(" "),r("p",[r("a",{attrs:{href:"https://cluster-api.sigs.k8s.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cluster API"),r("OutboundLink")],1),e._v(" 也是 Kubernetes 社区中与多集群管理相关的项目，该项目由集群生命周期小组（SIG Cluster-Lifecycle）负责开发，其主要目标是通过声明式的 API 简化多集群的准备、更新和运维工作，")]),e._v(" "),r("p",[e._v("在该项目中最重要的资源就是 "),r("code",[e._v("Machine")]),e._v("，它表示一个 Kubernetes 集群中的节点。当该资源被创建时，特定提供商的控制器会根据机器的定义初始化并将新的节点注册到集群中，在该资源被更新或者删除时，也会执行操作达到用户的状态。")]),e._v(" "),r("p",[e._v("这种策略与阿里的多集群管理的方式有一些相似，它们都使用声明式的 API 定义机器和集群的状态，然后使用 Kubernetes 原生的 Operator 模型在更高一层的集群中管理下层集群，这能够极大降低集群的运维成本并提高集群的运行效率"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:10",target:"_blank",rel:"noopener noreferrer"}},[e._v("10"),r("OutboundLink")],1),e._v("，不过类似的项目都没有考虑跨集群的资源管理和网络管理。")]),e._v(" "),r("h3",{attrs:{id:"应用场景"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[e._v("#")]),e._v(" 应用场景")]),e._v(" "),r("p",[r("strong",[e._v("应用分发")])]),e._v(" "),r("p",[e._v("Kubernetes 主项目提供了几种部署应用的最基本方式，分别是 "),r("code",[e._v("Deployment")]),e._v("、"),r("code",[e._v("StatefulSet")]),e._v(" 和 "),r("code",[e._v("DaemonSet")]),e._v("，这些资源分别适用于无状态服务、有状态服务和节点上的守护进程，这些资源能够提供最基本的策略，但是它们无法处理更加复杂的应用。")]),e._v(" "),r("p",[e._v("随着 CRD 的引入，目前社区的应用管理小组（SIG Apps）基本不会向 Kubernetes 主仓库引入较大的改动，大多数的改动都是在现有资源上进行的修补，很多常见的场景，例如只运行一次的 DaemonSet"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:11",target:"_blank",rel:"noopener noreferrer"}},[e._v("11"),r("OutboundLink")],1),e._v(" 以及金丝雀和蓝绿部署等功能，现在的资源也存在很多问题，例如 StatefulSet 在初始化容器中卡住无法回滚和更新"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:12",target:"_blank",rel:"noopener noreferrer"}},[e._v("12"),r("OutboundLink")],1),e._v("。")]),e._v(" "),r("p",[e._v("我们可以理解社区不想在 Kubernetes 中维护更多的基本资源，通过几个基本的资源可以覆盖 90% 的场景，剩下的各种复杂场景可以让其他社区通过 CRD 的方式实现。不过作者认为如果社区能够在上游实现更多高质量的组件，这对于整个生态都是很有价值并且很重要的工作，需要注意的是假如各位读者想要在 Kubernetes 项目中成为贡献者，SIG Apps 可能不是一个很好的选择。")]),e._v(" "),r("p",[r("strong",[e._v("批处理调度")])]),e._v(" "),r("p",[e._v("机器学习、批处理任务和流式任务等工作负载的运行从 Kubernetes 诞生第一天起到今天都不是它的强项，大多数的公司都会使用 Kubernetes 运行在线服务处理用户请求，用 Yarn 管理的集群运行批处理的负载。")]),e._v(" "),r("p",[e._v("在线任务和离线任务往往是两种截然不同的作业，大多数的在线任务都是无状态的服务，它们可以在不同机器上进行迁移，彼此很难有极强的依赖关系；但是很多离线任务的拓扑结构都很复杂，有些任务需要多个作业一同执行，而有些任务需要按照依赖关系先后执行，这种复杂的调度场景在 Kubernetes 中比较难以处理。")]),e._v(" "),r("p",[e._v("在 Kubernetes 调度器引入调度框架之前，所有的 Pod 在调度器看来是没有任何关联的，不过有了调度框架，我们可以在调度系统中实现更加复杂的调度策略，例如保证一组 Pod 同时调度的 PodGroup"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:13",target:"_blank",rel:"noopener noreferrer"}},[e._v("13"),r("OutboundLink")],1),e._v("，这对于 Spark 和 TensorFlow 任务非常有用。")]),e._v(" "),r("p",[e._v("Volcano 也是在 Kubernetes 上构建的批处理任务管理系统"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:14",target:"_blank",rel:"noopener noreferrer"}},[e._v("14"),r("OutboundLink")],1),e._v("，它能够处理机器学习、深度学习以及其他大数据应用，可以支持包括 TensorFlow、Spark、PyTorch 和 MPI 在内的多个框架。")]),e._v(" "),r("p",[e._v("虽然 Kubernetes 能够运行一些批处理任务，但是距离在这个领域上取代 Yarn 等老牌资源管理系统上还有非常大的差距，相信在较长的一段时间内，大多数公司都会同时维护 Kubernetes 和 Yarn 两种技术栈，分别管理和运行不同类型的工作负载。")]),e._v(" "),r("p",[r("strong",[e._v("硬多租户")])]),e._v(" "),r("p",[e._v("多租户是指同一个软件实例可以为不同的用户组提供服务，Kubernetes 的多租户是指多个用户或者用户组使用同一个 Kubernetes 集群，今天的 Kubernetes 还很难做到硬多租户支持，也就是同一个集群的多个租户不会相互影响，也感知不到彼此的存在。")]),e._v(" "),r("p",[e._v("硬多租户在 Kubernetes 中是一个很重要、也很困难的课题，合租公寓就是一个典型的多租户场景，多个租客共享房屋内的基础设施，硬多租户要求多个访客之间不会相互影响，你可以想象这有多么困难，Kubernetes 社区甚至有一个工作小组专门讨论和研究相关的问题"),r("a",{attrs:{href:"https://draveness.me/kuberentes-limitations/#fn:15",target:"_blank",rel:"noopener noreferrer"}},[e._v("15"),r("OutboundLink")],1),e._v("，然而虽然感兴趣的工程师很多，但是成果却非常有限。")]),e._v(" "),r("p",[e._v("尽管 Kubernetes 使用命名空间来划分虚拟机群，然而这也很难实现真正的多租户。多租户的支持到底有哪些作用呢，这里简单列几个多租户带来的好处：")]),e._v(" "),r("ul",[r("li",[e._v("Kubernetes 带来的额外部署成本对于小集群来说非常高昂，稳定的 Kubernetes 集群一般都需要至少三个运行 etcd 的主节点，如果大多数的集群都是小集群，这些额外的机器会带来很高的额外开销；")]),e._v(" "),r("li",[e._v("Kubernetes 中运行的容器可能需要共享物理机和虚拟机，一些开发者可能在公司内部遇到过自己的服务被其他业务影响，因为主机上容器可能隔离了 CPU 和内存资源，但是没有隔离 I/O、网络 和 CPU 缓存等资源，这些资源的隔离是相对困难的；")])]),e._v(" "),r("p",[e._v("如果 Kubernetes 能够实现硬多租户，这不仅对云服务商和小集群的使用者来说都是个福音，它还能够隔离不同容器之间的影响并防止潜在安全问题的发生，不过这在现阶段还是比较难实现的。")]),e._v(" "),r("p",[r("strong",[e._v("总结")])]),e._v(" "),r("p",[e._v("每个技术都有自己的生命周期，越底层的技术生命周期会越长，而越上层的技术生命周期也就越短，虽然 Kubernetes 是当今容器界的扛把子，但是未来的事情没有人可以说的准。我们要时刻清楚手中工具的优点和缺点，花一些时间学习 Kubernetes 中设计的精髓，不过如果在未来的某一天 Kubernetes 也成为了过去，我们也应该感到喜悦，因为会有更好的工具取代它")])])}),[],!1,null,null,null);t.default=a.exports}}]);