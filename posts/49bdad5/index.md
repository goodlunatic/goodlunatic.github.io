# 2025 第九届工业信息安全技能大赛-典型工业场景锦标赛 Misc Writeup

**2025 第九届工业信息安全技能大赛-典型工业场景锦标赛 Writeup**

**赛后有师傅来问这场比赛里的题，部分题目出的挺好的，有一定的难度，于是打算记录一下**
&lt;!--more--&gt;

&gt; 本文中涉及的具体题目附件可以进我的交流群获取，进群详见 [About](https://goodlunatic.github.io/about/)

## 题目名称 开局一张图

LSB 隐写，提取出来即可：`0fvx2enlh9k6ai4el2g960dd97c2f4805987fl3Aw4bZ0FGKJ2k6EDBqoYCiTWr8RXQdleg`

![](imgs/image-20250924094216987.png)

## 题目名称 设计图之秘

steghide 隐写，直接用 stegseek 爆破密钥即可

![](imgs/image-20250924100646435.png)

打开 .out 文件即可得到：`flk5lsdiaenorfa1yeag7d21c78ad28c3ae25V6swgqhSAc3eyHJoQzMWFr491xktO8dGYRTXmCiPZNufBpl7b2UDK0Larm`

## 题目名称 抓内鬼啦

题目附件给了一个流量包，打开发现 HTTP 流量中上传了几个文件

首先是传了了一张宽高被篡改过的 PNG 图片，并且图片末尾有段 base64，解码后可以得到宽高的提示

![](imgs/image-20250923233438173.png)

![](imgs/image-20250923233454698.png)

010 打开修改好宽高后可以得到一张二维码

![](imgs/image-20250923233708163.png)

![](imgs/image-20250923233714669.png)

扫码即可得到第一段的 flag: `Polis{W0w_Th1s_1s_f1agO1_`

然后流量中还传了一个 zip 压缩包，尝试提取出来，发现是伪加密的

010 打开发现压缩大小和压缩前大小也被篡改了，修改为正确的大小并去除伪加密后打开

即可得到第二段 flag: `Great_G0t_it!}`

![](imgs/image-20250923234803347.png)


综上，最后的 flag 为：`Polis{W0w_Th1s_1s_f1agO1_Great_G0t_it!}`

## 题目名称 固件分析 1

题目附件给了一个 img 文件，尝试直接用 DiskGenius 打开

![](imgs/image-20250924101145956.png)

![](imgs/image-20250924101158256.png)

![](imgs/image-20250924101207127.png)

可以得到上面这几个文件，其中 7z 压缩包是加密的

尝试直接 strings 一下 sh 和 motd 里面的内容，可以得到第一段 flag 和压缩包的解压密码：`Secret_PLC2025`

![](imgs/image-20250924101357328.png)

解压后可以得到一个 flag2.txt，内容如下：

&gt; E4MC01MGE4LTRm

但是发现拼不出完整的 flag，于是尝试直接 strings 整个 img，可以得到另外几段内容

![](imgs/image-20250924101653034.png)

最后尝试在 CyberChef 中组合一下，把三段 base64 调整到相同的长度，然后解码即可得到完整的 flag

`flag{a6300a80-50a8-4f3f-b339-3ac9c76ae902}`

![](imgs/image-20250924101852975.png)

## 题目名称 图片的奥秘

附件给了一个加密的压缩包，首先尝试弱密码爆破，得到解压密码：`54450`

![](imgs/image-20250924102048066.png)

解压后得到一张 PNG 图片，010 打开提示报错，发现末尾有一张 base64 编码后的 PNG 图片

![](imgs/image-20250924102620223.png)

![](imgs/image-20250924102223747.png)

提取出来解码后可以得到下图，扫码得到：`flag{asdf%^&amp;*ghjkl}`

![](imgs/image-20250924102338576.png)

但是我们常用 010 打开这张图片，发现末尾还有数据

![](imgs/image-20250924102803864.png)

并且尝试搜索一下 PNG 文件尾，可以发现这里应该存在不止一张 PNG 图片

![](imgs/image-20250924102908341.png)

把后面多余的数据提取出来后，尝试搜索了一下 PNG 文件头

![](imgs/image-20250924103307043.png)

## 题目名称 工控宣传的隐秘信号

附件给了一个 mp3 文件和一个加密的压缩包，直接用 audacity 倒放即可听到压缩包的解压密码：`s0803y0518` 

解压后可以得到一张 GIF，尝试分帧，可在第 156 帧得到一个少了定位块的二维码

![](imgs/image-20250924104432094.png)

补上定位块后扫码即可得到：`GNalVNrhVOLZjRK7pMrJjPn3x`

![](imgs/image-20250924104636303.png)

然后随波逐流解个 XXencode 即可得到最后的 flag: `flag{aiyoubucuoo1}`

![](imgs/image-20250924104717195.png)

## 题目名称 工业日志分析

附件给了一个 log 文件，直接 vscode 打开然后在里面找三段 base64

![](imgs/image-20250924105106061.png)

![](imgs/image-20250924105217619.png)

![](imgs/image-20250924105129642.png)

然后 CyberChef 组合一下解 base64 即可得到最后的 flag：`flag{4e54fa7c-c530-4c5c-985e-2e15871ddf04}`

![](imgs/image-20250924105322109.png)

## 题目名称 工业控制协议流量分析 1

题目附件给了一个流量包，打开发现主要是 TCP 流量，首先尝试用以下命令导出一下传输的数据

```bash
tshark -r 工业控制协议流量分析1.pcap -T fields -Y &#39;tcp&#39; -e &#39;tcp.segment_data&#39; &gt; out.txt
```

发现大多数数据的长度都是 13 字节，有少部分不是，因此我们重点关注这些长度不为 13 字节的数据

![](imgs/image-20250924140703856.png)

用以下命令导出一下长度不为 13 字节的数据

```bash
tshark -r 工业控制协议流量分析1.pcap -T fields -Y &#39;len(tcp.segment_data) != 13&#39; -e &#39;tcp.segment_data&#39; &gt; out.txt
```

可以得到如下内容：

```
6e310000000901666c0304cdd0141e
0a400000000901030461677b399dde,e50e
187a00000009013437316603045f10,8121
792d000000096433322d010304bc9a,b5b0
224600000009010361353832042917,411e
5da500000009010304a42d3438c4e9,22
7b2800000009013834030445c76c42
5f92000000090103042d6239da0959,97
956500000009010304d82b39302db8,9e
073800000009010304b631306666a5,94
cc6d0000000901030446903963380d,e4
57960000006563090103045d644a1a
3b6c00000009010304d86438300785,87
8f4200000009010304c9307dbeea4f
```

拿 CyberChef 解一下 Hex 已经能看到部分 flag 了

![](imgs/image-20250924141928161.png)

手动把不可打印字符和大写字符删去，即可得到最后的 flag：`flag{9471fd32-a582-4884-b990-10ff9c8dd800}`

![](imgs/image-20250924142020657.png)

## 题目名称 工业控制协议流量分析 2

## 题目名称 工业控制协议流量分析 3

## 题目名称 异常的数据流量包

## 题目名称 音频隐写

## 题目名称 所见即是开始


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/49bdad5/  

