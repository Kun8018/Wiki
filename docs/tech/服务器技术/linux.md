---
title: Linux
date: 2021-09-02 21:40:33
categories: 技术博客
tags: IT，
toc: true
thumbnail: https://s1.ax1x.com/2020/03/27/G9OI3V.th.jpg
---

## Linux概述

　　在我看来，Linux是一个对软件开发非常友好的操作系统。它去除了很多windows下的杂质，保留了非常干净的系统。Mac系统也是与它有很多相似的地方，才这样好用。

　　<!--more-->

## 下载与安装

​       以linux为内核的有Ubuntu，Debian、Centos，操作方式大同小异

​       因为linux是开源系统，所以在百度或者谷歌直接搜索ubuntu16.0，就能找到安装包。安装的时候找阿里镜像源，会下载的快一些。





## 修改镜像源和网络



清华大学镜像源网站：https://mirrors.tuna.tsinghua.edu.cn/



## 常用命令

查看进程

```shell
ps aux
ps -elf
```

查看端口状态

```shell
lsof -i:端口号
##查看tcp udp端口和进程等情况
netstat -tunlp | grep 端口号
netstat -ntlp ## 查看当前所有tcp端口
netstat -ntulp | grep 80 ##查看所有80端口使用情况
netstat -l ##只显示监听端口
netstat -lt ## 只列出所有监听TCP端口
netstat -lu ## 只列出所有监听UDP端口
netstat -lx ## 只列出所有监听UNIX端口
netstat -pt ## 在netstat输出中显示PIC和进程名称
netstat -an | grep ':80' ##找出运行在指定端口的进程
```

服务器常用端口

21 ftp ftp服务器所开放的端口，用于上传下载

22 ssh 22端口就是ssh端口，用于通过命令行模式远程连接Linux系统的服务器

25 SMTP SMTP服务器所开放的端口，用于发送邮件

80 HTTP 用于网站服务例如IIS、Apache、Nginx等提供对外访问

113 POP3 110端口是为POP3服务开放的

143 IMAP 143端口主页用于Internet Message

443 HTTPS 网页浏览端口，能提供加密和通过安全端口传输的另一种HTTP

3306 MySQL  3306端口是MySQL数据库的默认端口，用于MySQL对外提供服务

8080 代理端口 8080端口同80端口，是被用于www代理服务的，可以实现网页浏览，经常在访问某个网站或使用代理服务器时会加上8080端口，此外Apache Tomcat web server默认服务端口就是8080

清除端口进程

```shell
kill [信号] PID//pid号
```

kill信号

```shell
kill -0:程序退出时收到该信息
kill -1:挂掉电话线或者终端连接的挂起信号，这个信号也会造成某些进程在没有终止的情况下重新初始化
kill -2:表示结束进程，但不是强制性的，常用的ctrl+c就是发出一个kill -2命令
kill -3:退出
kill -9:杀死进程，即强制结束进程，有可能会导致程序崩溃等
kill -11:段错误
kill -15:正常结束进程，是kill命令段默认信号
```

删除文件/文件夹

```shell
rm -f filename

rm -rf filename
```

set

set命令用于设置shell



关机/重启

```shell
## 立即关机
shutdown -h now
## 10分钟后关机
shutdown -h 10
## 立刻关机
power off
## 重启
reboot
## 重启
shutdown -r now
```

传输文件

```shell
## 从服务器上下载文件
scp username@servernama:/path/filename /var/www/local_dir

## 上传文件到服务器
scp /path/filename username@servernama:/path

## 下载目录
scp -r username@servernama:/path/ /var/www/local_dir

## 上传目录
scp -r /var/www/local_dir username@servernama:/path
```

修改文件

```shell
sed 's/properties/property/g' build.xml
## 批量替换
grep -ilr 'log(' *|xargs-|@ sed -i "'s/print(///Log(/g'@
## 
sed -i "s/hello/hi/g" test.txt
## 删除行首空格
sed -i 's/^ //g'test
## 删除行尾空格
sed -i 's/$//g' test
## 替换当前目录中所有含有hello字符的文件中的hello为hi
sed -i "s/hello/hi/g" `grep "hello" -rl ./`
## 批量操作当前目录以m开头的文件
sed -i 's/foo/bar/g' ./m*
## 查找所有子目录中m开头的文件并进行替换
sed -i 's/foo/bar/g' `grep foo -rl --include="m*" ./`
```



### systemd

历史上，linux的启动一直采用init进程

init进程有两个缺点：

启动时间长、启动脚本复杂

systemd就是为解决这个问题而生的，d是守护进程daemon的缩写。

systemd取代了initd，成为了系统的第一个进程（pid等于1），其他进程都是它的子进程

systemd的优点是功能强大，使用方便，缺点是体系庞大，非常复杂

systemd的常用命令

```shell
## 重启系统
sudo systemctl reboot
## 关闭系统，切断电源
sudo systemctl poweroff
## cpu停止工作
sudo systemctl halt
## 暂停系统
sudo systemctl suspend
## 让系统进入冬眠状态
sudo systemctl hibernate
## 让系统进入交互式休眠状态
sudo systemctl hybrid-sleep
## 启动救援状态
sudo systemctl rescue
```

查看本机信息

```shell
## 查看当前主机信息
hostnamectl

## 设置主机名
sudo hostnamectl set-hostname rhel7

## 查看本地化设置
localectl

## 设置本地化参数
sudo localectl set-locale LANG=en_GB.utf8
sudo lccalectl set-keymap en_GB

## 查看当前登陆的用户
loginctl list-users

## 列出当前session
loginctl list-sessions

## 列出显示指定用户的信息
loginctl show-user ruanyf

## 查看当前时区设置
timedatectl 

## 显示所有可用的时区
timedatectl list-timezones

## 设置当前时区
sudo timedatectl set-timezone America/New_York
sudo timedatectl set-time YYYY-MM-DD
sudo timedatectl set-time HH:MM:SS
```

查看Unit信息



nohup命令

nohup命令用于在后台不挂断地运行命令，挂起进程，退出终端不会影响程序的运行

nohup命令在默认情况下，也就是非重定向时，会输出一个名叫nohup。out的文件到当前目录，如果当前目录到nohup。out文件不可写，输出到HOME/nohu。pout文件中

```shell
nohup ./nebula-httpd &
```



#### node应用的systemd启动

创建配置文件,后缀为service

```bash
[Unit]
Description=node simple server

[Service]
##启动命令
ExecStart=
Restart=always
User=nobody
Group=nobody
Environment=PATH=/usr/bin:/user/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/tmp/node-systemd-demo

[Install]
WantedBy=multi-user.target
```

将配置文件拷贝到systemd之中

```shell
sudo cp node-server.service /etc/systemd/system
```

重载配置文件

```shell
sudo systemctl daemon-reload
```



### 什么命令都不能用了

环境变量配置错误造成的，输入

```shell
export PATH=/usr/local/sbin:usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

或者手动在/etc/profile中添加此行



## 用户



普通用户可以用sudo

如果提示不再sudoers文件中，在sudoers文件中添加用户

```shell
vim /etc/sudoers
```

添加语句

```properties
username ALL=(ALL)  ALL
```





## 连接

linux最重要的用途还是服务器吧，目前绝大多数服务器都是linux系统。centos或者ubuntu、debian，在本地可以远程连接服务器进行操作

通过密码连接服务器

直接输入命令

```linux
ssh 用户名@IP地址 -p 端口号
```

运行后会要求输入密码，输入即可登录

通过密钥连接服务器

首先在服务器端创建密钥对，下载私钥

将私钥保存在.ssh文件下，如果没有.ssh目录，创建一个

```mac
cd ~
mkdir .ssh
```

修改密钥权限

```mac
cd ~/.ssh
chmod 400 密钥文件名
```

通过ssh密钥方式连接服务器

```linux
ssh -i ~/.ssh/mac root@192.168.0.1
```

~/.ssh/mac为下载的私钥的路径和文件名

root是服务器端管理员账号，一般是root

192.168.0.1是服务器的公网ip

终端变成root就说明连接成功

让mac终端始终保持与远程连接状态（Broken pipe）

```linux
sudo vim /etc/ssh/ssh_config
```

添加设置

```linux
# 断开时重试连接的次数
ServerAliveCountMax 5
# 每隔5s发送一个空请求以保持连接
ServerAliveInterval 5
```





## 快捷键

　　启动终端：ctrl+alt+T

​        创建目录：mkdir

​        返回上层目录：cd ..

​        停止运行：Ctrl+c

​        关闭终端   Ctrl+alt+Q

​        新建终端   Ctrl+alt+N



## 增加CPU占有率

```shell
for i in `seq 1 $(cat/proc/cpuinfo |grep "physical id" |wc -l)`;do dd if=/dev/zero of=/dev/null & done
```



## centos

查找操作系统的内核版本

```shell
uname -r
```

更新系统底层的库文件

```centos
yum update
```





## Vim

vim命令

```vim
:w 保存文件但不退出vim 
:w! 强制保存文件但不退出vim 
:wq 保存文件并退出vim
:wq!强制保存文件并退出vim
:q 不保存文件直接退出
:q! 不保存文件强制退出vim
:e! 放弃所有修改，从上次保存文件开始再编辑命令历史
```



## linux下软件包

linux下应用程序的软件包按**内容类别**分为两类：

1.可执行文件(编译后的二进制软件包)

解压包之后就可以直接运行，类似于windows下的软件包，安装完可以直接使用，但是看不到源程序，而且下载时要注意这个软件是否是你所使用的平台，否则无法正常安装，如centos与ubuntu

优点：使用简单，只需要几个命令就能实现软件包的安装、卸载、升级、查询，安装速度快

缺点：不能看源代码，功能选择不如源代码灵活，依赖性

2.源程序(源码包)

解开包之后你还需要使用编译器将其编译为可执行文件，这是linux独有的，windows的思想是不开放源程序

优点：开源，可以自由选择所需功能，可看源码，卸载方便

缺点：安装步骤过多，编译时间过长

二进制软件包与源码包区别：

与直接从源代码安装相比，软件包管理易于安装和卸载，易于更新已安装的软件包，易于保护配置文件，易于跟踪已安装文件

通常用tar打包的都是源程序，用rpm、dpkg打包的则常是可执行程序，一般来说，自己动手打包源程序更具灵活性，但是容易遇到各种问题，而可执行程序包更容易安装，但是灵活性会差很多，所以一般一个软件会提供多种打包格式的安装程序。

linux下应用程序的软件包按**格式**分类：

linux下的软件安装包主要有rpm、deb、tar.gz三种格式

软件后缀为.rpm最初是Red Hat Linux提供的一种包封装格式，rpm较deb发行早，所以现在许多linux发行版本都使用。rpm包本质就是一个可以在特定机器上运行的Linux软件，可以在红帽Linux、Suse、Fedora直接进行安装，但在Ubuntu上无法识别

软件后缀为.deb是Debian linux提供的包封装格式。deb的包管理器dpkg只在debian上有，ubuntu也支持，可以在ubuntu上进行安装

软件后缀.tar.gz、tar.Z、tar.bz2、.tgz是使用unix系统打包工具tar打包的。tar包在所有Linux版本中都能运行，但是安装过程也最麻烦，tar包就是一个压缩包，是为了便于传输所产生的一种专门用于网络流通的文件格式，tar包与deb、rpm包相比，tar包不一定是软件，也可能是图片、文本等等

软件后缀为.bin的一般是一些商业软件

### 安装方法

rpm包：

查询系统中所有的rpm包

```shell
rpm -qa

## 查询所有包含某个字符串sql的软件包
rpm -qa |grep sql
```

安装

```shell
rpm -i your-package.rpm
## 强制安装
rpm -i --force your-package.rpm
```

卸载（后缀不能包含rpm）

```shell
rpm -e your-package
```

升级软件包

```shell
rpm -Uvh your-package.rpm
```

安装rpm-build

```shell
yum list |grep rpm-build
yum install -y rpm-build.x86_64
```





tar包：



### 下载方法

wget可以下载整个页面和文件

wget会遵守robots.txt文件。

```shell
 wget -r -p -e robots=off http://www.example.com
```



### 安装cmake

准备编译环境

```shell
yum -y install gcc gcc-c++
```

获取源码并解压

```shell
wget https://github.com/Kitware/CMake/releases/download/3.15.5/cmake-3.15.5.tar.gz
## 备用下载地址 https://down.24kplus.com/linux/cmake/cmake-3.15.5.tar.gz

tar -zxf cmake-3.15.5.tar.gz

cd cmake-3.15.5
```

编译安装

```shell
./bootstrap --prefix=/usr --datadir=share/cmake --docdir=doc/cmake && make 
sudo make install
```

验证安装

```shell
cmake --version
```



### rpm-build

如果你想打包rpm包，可能还需要rpm-build包

```shell
sudo yum install rpm-build 
```





## Selinux

安全增强型 Linux（SELinux）是一种采用安全架构的 [Linux® 系统](https://www.redhat.com/zh/topics/linux/what-is-linux)，它能够让管理员更好地管控哪些人可以访问系统。它最初是作为 [Linux 内核](https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel)的一系列补丁，由美国国家安全局（NSA）利用 Linux 安全模块（LSM）开发而成。

SELinux 于 2000 年发布到开源社区，并于 2003 年集成到上游 Linux 内核中。

SELinux 定义了每个人对系统上的应用、进程和文件的访问权限。它利用安全策略（一组告知 SELinux 哪些能访问，哪些不能访问的规则）来强制执行策略所允许的访问。

当应用或进程（称为主体）发出访问对象（如文件）的请求时，SELinux 会检查访问向量缓存（AVC），其中缓存有主体和对象的访问权限。

查看selinux状态

```shell
## 命令1
/usr/sbin/sestatus -v
## SELinux status:                 enabled
## 命令2
getenforce
```

临时关闭

```shell
setenforce 0 ##设置SELinux 成为permissive模式
##setenforce 1 设置SELinux 成为enforcing模式
```

也可以修改/etc/selinux/config 文件

将SELINUX=enforcing改为SELINUX=disabled

## firewalld和utf



### 全局端口转发

iptables 是一个配置 Linux 内核 防火墙 的命令行工具，是 netfilter 项目的一部分。
 术语 iptables 也经常代指该内核级防火墙。
 iptables 用于 ipv4，ip6tables 用于 ipv6。
 需要root账户执行以下操作

开启iptables

```shell
echo 1 >/proc/sys/net/ipv4/ip_forward
```

默认值0是禁止ip转发，修改为1即开启ip转发功能。

简单转发

```shell
#-- 把访问本机 8091 端口的请求转发到 8090端口
$ iptables -t nat -A PREROUTING -p tcp --dport 8091 -j REDIRECT --to-ports 8090
#-- 把访问本机 8093 端口的请求转发到 192.168.1.3 的 8090端口
$ iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 8093 -j DNAT --to 192.168.1.3:8090
```



## 定时执行脚本

crontab可以在指定的时间执行一个shell脚本以及一系列Linux命令

常用于定时备份数据库、日志等

常用命令

```shell
crontab -e     ##修改crontab文件，
crontab -l     ##显示crontab文件
crontab -r     ##删除crontab文件
crontab -ir    ##删除crontab文件之前提醒用户

service crond status
service crond start
service crond stop
service crond restart
service crond reload
```

基本格式

```shell
* * * * * command
#分 时 日 月 周 + 命令
10 0 * * * command ./a.sh
## 每天0点10分执行命令
```



## Nginx

Nginx是常用的网络服务器，ubuntu和debian类似，这里以centos7为例

```nginx
yum install nginx
```

nginx的默认安装目录为`/usr/local/nginx`,配置文件的目录为`/usr/local/nginx/conf/nginx.conf`

启动nginx服务

```nginx
systemctl enable nginx.service 
systemctl start nginx.service
systemctl stop nginx.service
systemctl restart nginx.service
```

nginx命令

```nginx
nginx -s reload  # 热重启
nginx -s reopen  # 重启Nginx
nginx -s stop    # 快速关闭
nginx -s quit    # 等待工作进程处理完成后关闭
nginx -T         # 查看配置文件的实际内容
```

### 默认主页、目录访问

```nginx
server {
  root /网站根目录;
  # 优先使用默认主页
  index index.html index.htm index.php;
  # 当默认主页不存在时直接列出目录内文件树
  autoindex on;
}
```



### 反向代理

先了解正向代理

正向代理：局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理。

反向代理是一个`Web`服务器，它接受客户端的连接请求，然后将请求转发给上游服务器，并将从服务器得到的结果返回给连接的客户端。

客户端访问网络不需要配置，只要把请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据，然后再返回到客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址

location匹配规则：

～：正则匹配，区分大小写

～*：正则匹配，不区分大小写

@：定义一个命名的location，用于内部定向，例如error_page、try_files

=：普通字符匹配，精确匹配

^～：普通字符匹配，如果该选项匹配，则只匹配该选项，不再向下匹配其他选项

匹配优先级（与location书写的先后顺序关系不大）：

1.精确匹配：=符号严格匹配这个查询，如果找到，停止搜索，

2.普通字符匹配：所有剩下的常规字符串，最长的匹配；如果找到^~这个符号停止搜索；

3.正则匹配；

4.默认匹配：如果第三条条件生效使用第三条，否则使用第二条

nginx做http反向代理

```nginx
location ^~ /api {
  proxy_pass http://192.168.40.174:32020;
}

server{
  listen:90;
  server_name:192.168.0.1
    
  location /edu/{
    root html;
    proxy_pass http://192.168.40.174:32020;
  }
  location /ovd/{
    root html;
    proxy_pass http://192.168.40.174:32020;
  }
}
```

更多指令说明

| 指令                     | 说明                                                         |
| :----------------------- | :----------------------------------------------------------- |
| `proxy_connect_timeout`  | `Nginx`从接受请求至连接到上游服务器的最长等待时间            |
| `proxy_send_timeout`     | 后端服务器数据回传时间(代理发送超时)                         |
| `proxy_read_timeout`     | 连接成功后，后端服务器响应时间(代理接收超时)                 |
| `proxy_cookie_domain`    | 替代从上游服务器来的`Set-Cookie`头的`domain`属性             |
| `proxy_cookie_path`      | 替代从上游服务器来的`Set-Cookie`头的`path`属性               |
| `proxy_buffer_size`      | 设置代理服务器（`nginx`）保存用户头信息的缓冲区大小          |
| `proxy_buffers`          | `proxy_buffers`缓冲区，网页平均在多少`k`以下                 |
| `proxy_set_header`       | 重写发送到上游服务器头的内容，也可以通过将某个头部的值设置为空字符串，而不发送某个头部的方法实现 |
| `proxy_ignore_headers`   | 这个指令禁止处理来自代理服务器的应答。                       |
| `proxy_intercept_errors` | 使`nginx`阻止`HTTP`应答代码为400或者更高的应答。             |



#### 泛域名转发

```nginx
server {
  listen 80;
  server_name ~^([\w-]+)\.user\.demo\.com$;
  
  #配合上面语句可以把不同的域名转发到不同目录，如xuexb.user.demo.com-> /home/user/wwwroot/user/xuexb a01.user.demo.com-> /home/user/wwwroot/user/a01
  root /home/user/wwwroot/user/$1;
  
  ## xuexb.user.demo.com/path -> 127.0.0.1:8080/xuexb/path a01.user.demo.com/path -> 127.0.0.1:8080/a01/path
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:8080/$1$request_uri;
  }
}
```

#### Nodejs



```nginx
server {
  server_name www.xxoo.com;
  listen 80;
  
  root /wwwroot/www.xxoo.com/;
  
  if (-f $request_filename/index.html) {
    rewrite (.*) $1/index.html break;
  }
  
  if (!-f $request_filename) {
    rewrite (.*) /index.js;
  }
  
  location = /index.js {
    
    proxy_set_header Connection "";
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    
    proxy_pass http://127.0.0.1:8001$request_uri;
    
    proxy_redirect off;
  }
}
```



### 配置浏览器缓存

不缓存

```nginx
server {
  expires -1;
  if_modified_since off;##
}
## Cache-Control: no-cache;
```



设置缓存

```nginx
server {
  expires 1d;
  ## expires max;
}
## Cache-Control: max-age=315360000
```



根据路径设置不同的缓存策略

```nginx
server {
  set $expires_time 1M;
  
  if($request_uri ~* ^/admin(\/.*)?$) {
    set $expires_time -1;
  }
  
  if($request_uri ~* ^/admin(\/.*)?$) {
    set $expires_time max;
  }
  
  expires $expires_time;
}
```





### 负载均衡

`upstream`模块能够使用3种负载均衡算法：轮询、`IP`哈希、最少连接数。

**轮询：** 默认情况下使用轮询算法，不需要配置指令来激活它，它是基于在队列中谁是下一个的原理确保访问均匀地分布到每个上游服务器；

轮询时考研指定轮询几率，`weight`和访问比率成正比，用于后端服务器性能不均的情况。 

```nginx
#10次一般只会有1次会访问到8081，而有9次会访问到8080
upstream test {
    server localhost:8080 weight=9;
    server localhost:8081 weight=1;
}
```

**IP哈希：** 通过`ip_hash`指令来激活，`Nginx`通过`IPv4`地址的前`3`个字节或者整个`IPv6`地址作为哈希键来实现，同一个IP地址总是能被映射到同一个上游服务器；

```nginx
upstream test {
    ip_hash;
    server localhost:8080;
    server localhost:8081;
}
```

**最少连接数：** 通过`least_conn`指令来激活，该算法通过选择一个活跃数最少的上游服务器进行连接。如果上游服务器处理能力不同，可以通过给`server`配置`weight`权重来说明，该算法将考虑到不同服务器的加权最少连接数。

upstream使用第三方模块

Fair：按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```nginx
upstream backend {
    fair;
    server localhost:8080;
    server localhost:8081;
}
```

url_hash:这是个第三方模块，按访问`url`的`hash`结果来分配请求，使每个`url`定向到同一个后端服务器，后端服务器为缓存时比较有效。 在`upstream`中加入`hash`语句，`server`语句中不能写入`weight`等其他的参数，`hash_method`是使用的`hash`算法

```nginx
upstream backend {
    hash $request_uri;
    hash_method crc32;
    server localhost:8080;
    server localhost:8081;
}
```

### 支持CORS跨域

nginx配置做跨域处理--添加请求头

```nginx
location ^~ /p/asm {
  proxy_pass http://192.168.40.174:32020;
  add_header 'Access-Control-Allow-Origin' '*' always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET,POST,PUT,DELETE,PATCH,OPTIONS';
  add_header 'Access-Control-Allow-Headers' 'Content-Type,ssid';
  if ($request_method = 'OPTIONS') {return 204;}
  proxy_redirect     off;
  proxy_set_header   Host $host;
}
```

### 高可用keep-alived

正常情况下nginx是可以访问的，但是如果nginx出现宕机或者内存不够等程序错误，就会堵塞请求。为了防止这种情况的发生，配置高可用keep-alived进行预防

安装keep-alived

```shell
yum install keepalived -y
rpm -q -a keepalived
//keepalived-1.3.5-16.el7.x86_64
```

修改配置文件

```shell
systemctl start keepalived.service
vi keepalived.conf 
```

把原主机ip地址换为虚拟ip

```shell
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 192.168.25.147
   smtp_connect_timeout 30
   router_id LVS_DEVEL # 访问的主机地址
}
vrrp_script chk_nginx {
  script "/usr/local/src/nginx_check.sh"  # 检测文件的地址
  interval 2   # 检测脚本执行的间隔
  weight 2   # 权重
}
vrrp_instance VI_1 {
    state BACKUP    # 主机MASTER、备机BACKUP    
    interface ens33   # 网卡
    virtual_router_id 51 # 同一组需一致
    priority 90  # 访问优先级，主机值较大，备机较小
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.25.50  # 虚拟ip
    }
}
```

启动keep-alived

```shell
systemctl start keepalived.service
```





### 屏蔽ip/国外ip

在`nginx`的配置文件`nginx.conf`中加入如下配置，可以放到`http`, `server`, `location`, `limit_except`语句块，需要注意相对路径，本例当中`nginx.conf`，`blocksip.conf`在同一个目录中

```nginx
include blockip.conf;
```

blockip.conf

```nginx
deny IP;   # 屏蔽单个ip访问
allow IP;  # 允许单个ip访问
deny all;  # 屏蔽所有ip访问
allow all; # 允许所有ip访问
deny 123.0.0.0/8   # 屏蔽整个段即从123.0.0.1到123.255.255.254访问的命令
deny 124.45.0.0/16 # 屏蔽IP段即从123.45.0.1到123.45.255.254访问的命令
deny 123.45.6.0/24 # 屏蔽IP段即从123.45.6.1到123.45.6.254访问的命令
```

国外ip

基于 Nginx 的 ngx_http_geoip2 模块来禁止国外 IP 访问网站。

安装模块依赖

```shell
yum install libmaxminddb-devel -y
```

下载模块

```shell
git clone https://github.com/leev/ngx_http_geoip2_module.git
```

解压到/usr/local目录

```shell
mv ngx_http_geoip2_module/ /usr/local/
```

模块安装成功后，还要在 Nginx 里指定数据库，在安装运行库时默认安装了两个，位于 /usr/share/GeoIP/ 目录下，一个只有 IPv4，一个包含 IPv4 和 IPv6。

登录 www.maxmind.com 网址，创建账户，下载最新的库文件。（账户创建就不演示了）点击左侧，Download Files：

选择 GeoLite2 Country，点击 Download GZIP 下载即可：

上传到 /usr/share/GeoIP/ 下并解压：

```shell
cd /usr/share/GeoIP/
```

在nginx.conf中的http中引入数据库文件

```shell
geoip2 /usr/share/GeoIP/GeoLite2-City.mmdb {
        auto_reload 5m;
        $geoip2_data_country_code country iso_code;
        }
        map $geoip2_data_country_code $allowed_country {
default yes;
        CN no;
        }
```

在 server 中的 location 下添加条件，如果满足 IP 是国外 IP，就执行下面的 return 动作，

可以直接返回 404或者别的页面：

```nginx
if ($allowed_country = yes) {
    # return https://www.baidu.com;
    # return /home/japan;
    return 404;
}
```



### 重定向

```nginx
//重定向网站
server {
    server_name old-site.com
    return 301 $scheme://new-site.com$request_uri;
}
//重定向单页面
server {
    location = /oldpage.html {
        return 301 http://example.org/newpage.html;
    }
}
//重定向子路径
location /old-site {
    rewrite ^/old-site/(.*) http://example.org/new-site/$1 permanent;
}
```

### 配置图片防盗链

防盗链是指当图片不是自己网站打开时返回403或者指定图片，通过判断请求的来路判断是否是自己的站点来设置

```nginx
server {
  location ~* \.(gif|jpg|png|bmp)$ {
    valid_referers none blocked *.xuexb.com server_names
      
      if ($invalid_referer) {
      	return 403;
    	}
  }
}
```



### Https配置

#### let's Encrypt

let's Encrypt作为一个公共且免费SSL的项目逐渐被广大用户传播和使用，由Mozilla、Cisco、Akamai、IdenTrust等组织发起，主要的目的也是为了推进网站由http向https过度。

let's Encrypt免费SSL证书的出现，也会对传统提供付费SSL证书服务的商家有不少的打击。目前Let‘s Encrypt获得IndenTrust交叉签名，也就是可以应用且支持包括Firefox、Chrome在内的主流浏览器的兼容和支持。

使用git安装

```shell
git clone https://github.com/letsencrypt/letsencrypt
```

生成证书

```shell
cd letsencrypt
./lensencrypt-auto certonly --standalone --email quiniton@163.com -d www.zhaoheqiang.me -d zhaoheqiang.me
```

执行命令之后，会在/etc/letsencrypt/live/下找到各个域名的文件夹，每个文件夹里面会有四个密钥证书文件：

cert.pem：Apache服务器端证书

chain.pem：Apache根证书和中继证书

fullchain.pem：Nginx所需要的ssl_certificate文件

privkey.pem：安全证书KEY文件

如果是Nginx，使用fullchain.pem和privacy.pem文件，在配置文件中加入语句

```nginx
server {
  listen 443 https;
	ssl_certificate /etc/letsencrypt/live/www.zhaoheqiang.me/fullchain.pem
	ssl_certificate_key /etc/letsencrypt/live/www.zhaoheqiang.me/privkey.pem
}
```

延长有效期

let's Encrypt的证书一般有有效期，需要手动更新续期

```shell
./lensencrypt-auto certonly --renew-by-default --email quiniton@163.com -d www.zhaoheqiang.me -d zhaoheqiang.me
```

#### certbot

certbot是let's Encrypt官方推荐的获取证书的客户端。可以帮我们获取免费的let's Encrypt证书。certbot支持所有unix内核的操作系统。

安装certbot

```shell
yum install certbot
```

获取证书

```shell
certbot certonly --standalone -d example.com -d www.example.com
```

也可以用指定根目录的方式生成证书

```shell
certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com
```

证书生成后就可以在/etc/letsencrypt/live目录下看到对应域名的证书

let's Encrypt提供的证书一般都有90天有效期，在证书到期之前需要更新证书，certbot提供自动更新

```shell
certbot renew --dry-run
```

安装时如果报错

```shell
Problem binding to port 80:Could not bind to IPv4 or IPv6
```

因为nginx占用80端口，需要先停掉nginx进行操作，执行自动更新时也需要停掉nginx



#### openssl

先生成一个key

```shell
openssl genrsa -des3 -out ssl.key 1024
```

根据key生成证书请求文件

```shell
openssl req -new -key ssl.key -out ssl.csr
```

最后根据这两个文件生成crt证书文件，如果需要pfx可以用第二个命令生成

```shell
openssl x509 -req -days 3650 -in ssl.csr -signkey ssl.key -out ssl.cer
openssl pkcs12 -export -inkey ssl.key -in ssl.crt -out ssl.pfx
```

在需要使用证书的server中配置

```nginx
server {
  ssl on;
  ssl_certificate /home/ssl.crt;
  ssl_certificate_key /home/ssl.key;
  ssl_session_timeout 5m;
  ssl_protocols SSLv2 SSLv3 TLSv1;
  ssl_ciphers ALL:!EXPORT56:RC4+RSA+HIGH:+MEDIUM+LOW:+SSLv2:+EXP;
  ssl_prefer_server_cipher on;
  
  listen 443;
  ssl on;
  ssl_certificate /usr/local/webserver/nginx/conf/vhost/ssl/server.crt;
  ssl_certificate_key /usr/local/webserver/nginx/conf/vhost/ssl/server.key;
}
```



重启nginx就可以，使用https进行访问

#### nginx配置/http重定向到https

不可以把301和proxy_pass写在同一个server中，会产生重定向次数过多的问题

```nginx
server {
    server_name www.kunzhang.me kunzhnag.me;
    if ($host = www.kunzhang.me){
       return 301 https://$host/$request_url;
    }
}
server {
    listen 443 ssl http 1.1;
    ssl_certificate /etc/letsencrypt/live/diamondfsd.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/diamondfsd.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3999;
        proxy_http_version 1.1;
        proxy_set_header X_FORWARDED_PROTO https;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

### 缓冲优化

Nginx代理之后会有相应的代理缓存区，缓存区默认只有几十K，某些版本的nginx默认设置中没有相关处理，导致部分文件代理是会出现加载不全的现象，其实不仅仅是JS文件。只是因为框架的JS文件略大，所以经常出现类似问题。

在nginx.conf中添加

```conf
http {
	proxy_buffer_size 128k;
	proxy_buffers   32 128k;
	proxy_busy_buffers_size 128k;
}
```

### gzip压缩

```nginx
http {
  # 开启gzip
  gzip on;

  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;

  # gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间
  gzip_comp_level 1;

  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;

  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";
}
```



### 错误日志

打开nginx.conf文件

```shell
vim /etc/nginx/nginx.conf
```



### 性能

内容缓存：允许浏览器基本上永久地缓存静态内容。 `Nginx`将为您设置`Expires`和`Cache-Control`头信息。

设置nginx的静态文件地址

```nginx
location / {
  add_header Cache-Control max-age=360000;
  root /usr/share/nginx/html/webrtc-sdk/dist/;
}
```

设置nginx做websocket代理

```nginx
location ^~ /websocket {
  proxy_pass         http://192.168.40.174:31089;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
}
```

设置nginx最大打开文件限制

```nginx
user root root;
worker_processes 4;
worker_rlimit_nofile 65535;
```

设置nginx拦截某个请求，并直接返回状态码

```nginx
location ^~ /p/asm {
  return 204 "OK";
}
```

设置nginx给某个路径单独的日志文件

```nginx
location ^~ /p/asm {
  access_log /var/log/nginx/a.log;
  error_log /var/log/nginx/a.err.log;
}
```

#### 警告

```
Starting nginx: nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64; ignoring proxy_headers_hash_bucket_size
nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64; ignoring proxy_headers_hash_bucket_size
nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64;
```

在代理中设置

```conf
proxy_headers_hash_max_size 51200;
proxy_headers_hash_bucket_size 6400;
```

### 伪静态

伪静态即是网站本身动态网页，如。php、。asp、。aspx等格式动态网页，加？参数来读取数据库内不同资料，伪静态就是做url重写操作，伪静态最主要的作用是利于seo，

```nginx
location / {
  rewrite c(\d+1)_(.*).html /index.php?c=user&id=$1&title=$2 last;
  root /usr/share/nginx/html/sta;
  index index.html index.htm index.php
}
```



### 资源

Https://xuexb.github.io/learn-nginx



## Apache

apache在linux下的文件是httpd，centos自带apache,文件目录为cd/etc/init.d

启动apache服务

```centos
service httpd start
service httpd restart
service httpd stop
```



## 部署项目

### react

system limit for number of file watchers reached 

文件监控数量超过了系统限制，直接修改系统参数

```shell
cat /proc/sys/fs/inotify/max_user_matches
##8192
sudo vim /etc/sysctl.conf

## 添加语句 fs.inotify.max_user_watches=524288

sudo sysctl -p 

cat /proc/sys/fs/inotify/max_user_matches
##524288
```

### Node

运行命令

```shell
## 14.*
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
## 12.*
curl -sL https://rpm.nodesource.com/setup_12.x | bash -

yum -y install nodejs

## 安装gcc插件
yum install gcc-c++ cmake
```



## 服务器翻墙GitHub太慢问题

使用代理网址https://github.com.cnpmjs.org/



## linux端口无法访问问题排查

1.确认服务器的项目部署成功

2.确认访问地址是否存在。访问地址和端口是否正常。

3.确定服务器安全规则是否添加了要访问的端口。在控制台检查安全规则。

4.连接服务器的用户。一般服务器有root管理员，和其他个人创建用户。

5.服务器防火墙问题。服务器一般配置80端口为开放端口，在外网访问服务器80端口



使用telnet判断端口是否可以访问

```shell
telnet 47.49.182.93:7001
```





　　

## docker

Docker作为容器管理的平台，早已在服务部署等领域有非常广泛的应用。容器是轻量级的虚拟化方案，依托于overlayfs、Linux下的namespace、cgroups等OS级别的虚拟化技术，性能相比于基于VM的虚拟化更加突出。

更重要的是，通过Docker安装和配置软件更加方便

移除可能有旧的Docker版本

```shell
yum erase -y docker docker-common docker-engine
```

安装工具包和依赖，设置仓库源

```linux
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager \ 
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

使用yum安装docker-ce

```linux
##最新稳定版
yum install docker-ce docker-ce-cli containerd.io
##指定版本
yum install docker-ce-18.09.6 docker-ce-cli-18.09.6 containerd.io
```

启动docker服务

```centos
systemctl start docker
```

检查docker的信息和版本

```shell
docker version
docker info
```

验证docker，通过下载镜像和创建容器来看看Docker是否可以运转起来。可以使用下面的命令从Docker的镜像仓库下载名为hello-world的镜像文件。

```shell
docker pull hello-world
```

docker安装容器

```dockerfile
docker pull gitlab/gitlab-ce
```

如果docker拉取较慢更换docker源，docker默认为docker国内镜像，可以腾讯源、中科大源或者dcloud

启动容器

```dockerfile
docker run 
```

查看容器



## V2ray

一键安装脚本

```linux
bash <(curl -s -L https://git.io/v2ray.sh)
```

运行后自动安装，安装过程中：

输入1进行安装

选择tcp协议（默认）

选择端口号：为了不和别的软件冲突，推荐使用10000以上不超过65535的端口号，我选的10086

广告拦截：是否开启广告拦截，推荐不要开启，开启广告拦截会消耗服务器资源，且国外环境略由于国内环境

配置shadowsocks：选择开启，后面使用游戏加速器会用上

选择shadowsocks端口号：随意，不要和上面v2ray一样，我选2333

ss连接密码：123456

ss加密协议：选择默认

然后继续回车，直到安装完毕

开启BBR加速：google BBR是一款免费开源的TCP拥塞控制传输协议，可以使linux服务器显著提高吞吐量和减少TCP连接的延迟

修改系统变量

```linux
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >>/etc/sysctl.conf
```

保存生效

```linux
sysctl -p
```

检查BBR是否开启

```linux
sysctl net.ipv4.tcp_available_congestion_control
```

返回变量==bbr则说明开启成功

检查BBR是否启动成功

```linux
lsmod | grep bbr
```

如果返回tcp_bar 20480说明启动成功

### 客户端使用

windows客户端使用v2rayN

​       在服务器端输入v2ray url，复制vmess链接

​      下载v2rayN软件，打开软件点击服务器，点击从剪贴板批量导入url

​      右键点击刚刚导入的服务器，测试服务器延迟，表示连接成功

​      在小图标点击右键，选择pcahttp代理模式，表示只有被墙的网站才会启用代理，全局模式是所有链接都走代理

mac端使用v2rayU

ios端使用shadowsocks扫描

Android端使用v2rayNG

在服务器端输入

```linux
v2ray qr
```

打开二维码链接，然后在手机上下载v2rayNG，打开客户端用扫一扫扫描二维码就能添加到节点

路由器端

在服务器段输入

```linux
v2ray url
```

复制链接，代开路由器端openwrt，勾选代理开关，点击服务器列表，在通过vmess链接添加节点处粘贴刚刚复制的链接

然后点击账号设置，代理模式选择gtwlist模式，服务器选择刚刚添加的服务器，点击提交就完成

https://noobyy.com/31.html

## Nextcloud个人网盘服务器















