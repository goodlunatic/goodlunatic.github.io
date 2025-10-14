---
title: 2025 第九届工业信息安全技能大赛-典型工业场景锦标赛 Misc Writeup
subtitle:
date: 2025-10-08T15:00:45+08:00
slug: 49bdad5
draft: false
author:
  name: Lunatic
  link:
  email:
  avatar:
description:
keywords:
license:
comment: false
weight: 0
tags:
  - CTF
  - Misc
  - Writeup
categories:
  - Writeup
hiddenFromHomePage: false
hiddenFromSearch: false
hiddenFromRss: false
hiddenFromRelated: false
summary:
resources:
  - name: featured-image
    src: featured-image.jpg
  - name: featured-image-preview
    src: featured-image-preview.jpg
toc: true
math: false
lightgallery: false
password:
message:
repost:
  enable: false
  url:
---
**2025 第九届工业信息安全技能大赛-典型工业场景锦标赛 Writeup**

**赛后有师傅来问这场比赛里的题，部分题目出的挺好的，有一定的难度，于是打算记录一下**
<!--more-->

> 本文中涉及的具体题目附件可以进我的交流群获取，进群详见 [About](https://goodlunatic.github.io/about/)

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

> E4MC01MGE4LTRm

但是发现拼不出完整的 flag，于是尝试直接 strings 整个 img，可以得到另外几段内容

![](imgs/image-20250924101653034.png)

最后尝试在 CyberChef 中组合一下，把三段 base64 调整到相同的长度，然后解码即可得到完整的 flag

`flag{a6300a80-50a8-4f3f-b339-3ac9c76ae902}`

![](imgs/image-20250924101852975.png)


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
tshark -r 工业控制协议流量分析1.pcap -T fields -Y 'tcp' -e 'tcp.segment_data' > out.txt
```

发现大多数数据的长度都是 13 字节，有少部分不是，因此我们重点关注这些长度不为 13 字节的数据

![](imgs/image-20250924140703856.png)

用以下命令导出一下长度不为 13 字节的数据

```bash
tshark -r 工业控制协议流量分析1.pcap -T fields -Y 'len(tcp.segment_data) != 13' -e 'tcp.segment_data' > out.txt
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

附件给了一个流量包，打开翻看发现主要是 TPKT 协议

尝试用 tshark 导出 tpkt.continuation_data

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y '_ws.col.protocol == "TPKT"' -e tpkt.continuation_data > out.txt
```

![](imgs/image-20250925095605474.png)

发现用很多数据是相同的，然后其中穿插了几个不同的数据，因此我们可以过滤一下再导出

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y '!(tpkt.continuation_data == 4d:4d:53:5f:50:41:59:4c:4f:41:44:5f:4e:4f:52:4d:41:4c)' -e tpkt.continuation_data > out.txt
```

![](imgs/image-20250925095806676.png)

第一行数据解 Hex 可以得到一串密码

![](imgs/image-20250925095831203.png)

然后我们主要观察剩下数据的倒数第二字节，可以发现有个 zip 压缩包

![](imgs/image-20250925095937171.png)

但是提取出来发现文件是不完整的，于是我们尝试用以下这个命令直接去提取 TCP 中的数据

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y '!(tcp.payload == 4d:4d:53:5f:50:41:59:4c:4f:41:44:5f:4e:4f:52:4d:41:4c)' -e tcp.payload > out.txt
```

这个时候提取出来的 zip 数据就是完整的了，用`MMS12345`作为密码解压即可得到最后的 flag

![](imgs/image-20250925100145539.png)

![](imgs/image-20250925100300740.png)

`flag{6a46756d-df7e-4b66-87e4-1b2661676e40}`

## 题目名称 工业控制协议流量分析 3

附件给了一个流量包，打开发现存在 mqtt 流量，直接用以下命令导出 mqtt.msg

```bash
tshark -r protocal.pcapng -T fields -Y 'mqtt' -e 'mqtt.msg' > out.txt
```

然后 CyberChef 转一下 Hex ，拉倒末尾即可看到 flag：`flag{ruEf6OmqhAlXIYxmnR1XLC6R1]}`

![](imgs/image-20250925100707429.png)

## 题目名称 音频隐写

附件给了一个 字符频率映射表.txt 还有一个 wav 文件，映射表中的内容如下：

```
'a': 440, 'b': 466, 'c': 494, 'd': 523, 'e': 554,
'f': 587, 'g': 622, 'h': 659, 'i': 698, 'j': 740,
'k': 784, 'l': 830, 'm': 880, 'n': 932, 'o': 988,
'p': 1047, 'q': 1109, 'r': 1175, 's': 1245, 't': 1319,
'u': 1397, 'v': 1480, 'w': 1568, 'x': 1661, 'y': 1760, 'z': 1865,
'1': 1000, '2': 2000, '3': 3000, '4': 4000, '5': 5000,
'6': 6000, '7': 7000, '8': 8000, '9': 9000, '0': 10000,
'A': 445, 'B': 471, 'C': 499, 'D': 528, 'E': 559,
'F': 592, 'G': 627, 'H': 664, 'I': 703, 'J': 745,
'K': 789, 'L': 835, 'M': 885, 'N': 937, 'O': 993,
'P': 1052, 'Q': 1114, 'R': 1180, 'S': 1250, 'T': 1324,
'U': 1402, 'V': 1485, 'W': 1573, 'X': 1666, 'Y': 1765, 'Z': 1870,
```

因此我们写个脚本提取一下即可得到 flag: `FvoelrnoBjmFz1aknoF7U24gFe5204521Be19B3voh9BSaqhGRlyXio6m0xtkEZ21nUmhelP`

```python
import numpy as np
from scipy.io import wavfile

# 常量定义
DEFAULT_CHUNK_DURATION_MS = 100  # 默认分析块时长（毫秒）
FREQ_DIFF_THRESHOLD = 30         # 频率差异阈值
LOW_FREQ_THRESHOLD = 100         # 低频噪声阈值

# 频率与字符的对照表
FREQ_MAP = {
    # 小写字母
    'a': 440, 'b': 466, 'c': 494, 'd': 523, 'e': 554,
    'f': 587, 'g': 622, 'h': 659, 'i': 698, 'j': 740,
    'k': 784, 'l': 830, 'm': 880, 'n': 932, 'o': 988,
    'p': 1047, 'q': 1109, 'r': 1175, 's': 1245, 't': 1319,
    'u': 1397, 'v': 1480, 'w': 1568, 'x': 1661, 'y': 1760, 'z': 1865,
    
    # 数字
    '1': 1000, '2': 2000, '3': 3000, '4': 4000, '5': 5000,
    '6': 6000, '7': 7000, '8': 8000, '9': 9000, '0': 10000,
    
    # 大写字母（比对应小写字母稍高频率）
    'A': 445, 'B': 471, 'C': 499, 'D': 528, 'E': 559,
    'F': 592, 'G': 627, 'H': 664, 'I': 703, 'J': 745,
    'K': 789, 'L': 835, 'M': 885, 'N': 937, 'O': 993,
    'P': 1052, 'Q': 1114, 'R': 1180, 'S': 1250, 'T': 1324,
    'U': 1402, 'V': 1485, 'W': 1573, 'X': 1666, 'Y': 1765, 'Z': 1870,
}

def find_closest_char(target_freq):
    if not FREQ_MAP or target_freq < LOW_FREQ_THRESHOLD:
        return None
    
    # 找到最接近的频率对应的字符
    closest_char = min(FREQ_MAP.keys(), 
                      key=lambda char: abs(FREQ_MAP[char] - target_freq))
    
    # 检查频率差异是否在可接受范围内
    if abs(FREQ_MAP[closest_char] - target_freq) > FREQ_DIFF_THRESHOLD:
        return None
    
    return closest_char


def analyze_wav_sequentially(file_path, chunk_duration_ms=DEFAULT_CHUNK_DURATION_MS):
    sample_rate, data = wavfile.read(file_path)
    # 如果是立体声，只使用左声道
    if data.ndim > 1:
        data = data[:, 0]
    
    # 计算每个块的大小（样本数）
    chunk_size = int(sample_rate * chunk_duration_ms / 1000)
    num_chunks = len(data) // chunk_size
    decoded_chars = []
    last_char = None
    
    print(f"[+] 采样率: {sample_rate} Hz, 块时长: {chunk_duration_ms} ms, 总块数: {num_chunks}")
    
    for i in range(num_chunks):
        start = i * chunk_size
        end = start + chunk_size
        chunk = data[start:end]
        
        # 对当前块进行 FFT 分析
        fft_spectrum = np.fft.rfft(chunk)
        fft_freq = np.fft.rfftfreq(len(chunk), 1.0 / sample_rate)
        
        # 找到主频率（忽略直流分量）
        if len(fft_spectrum) > 1:
            peak_index = np.argmax(np.abs(fft_spectrum[1:])) + 1
            dominant_frequency = fft_freq[peak_index]
            
            # 查找对应的字符
            char = find_closest_char(dominant_frequency)
            
            # 为了避免一个长音被重复记录，只有当字符变化时才记录
            if char and char != last_char:
                decoded_chars.append(char)
                last_char = char
    
    final_message = "".join(decoded_chars)
    
    print(f"[+] 解码出的字符序列: {final_message}")
    print(f"[+] 字符数量: {len(decoded_chars)}")
    return final_message


def func():    
    wav_file = "video.wav"
    analyze_wav_sequentially(wav_file)
    

if __name__ == "__main__":
    func()

# [+] 采样率: 44100 Hz, 块时长: 100 ms, 总块数: 73
# [+] 解码出的字符序列: FvoelrnoBjmFz1aknoF7U24gFe5204521Be19B3voh9BSaqhGRlyXio6m0xtkEZ21nUmhelP
# [+] 字符数量: 72
```

## 题目名称 所见即是开始

附件给了一个加密的 zip 压缩包还有下面这张 PNG

![](imgs/image-20250925131246166.png)

 结合图片中的提示，很容易联想到盲文

![](imgs/image-20250925131419542.png)

结合上面这个对照表，得到解压密码：`hanoi floor is 9`

解压后可以得到一个 hint.txt 和一张 PNG 图片

![](imgs/image-20250925131634540.png)

hint.txt 中的内容如下：

> 所解即所得；
> 
> 一组格式为盘+当前柱+去往柱

经典的汉诺塔问题，写个脚本递归一下即可

```python
def hanio(n, a, b, c):
    res = ""
    if n == 1:
        res += f"{n}{a}{c}"
    else:
        # 将n-1个盘从a通过c移动到b
        res += hanio(n-1, a, c, b)
        # 将最大的盘从a移动到c
        res += f"{n}{a}{c}"
        # 将n-1个盘从b通过a移动到c
        res += hanio(n-1, b, a, c)
    return res

if __name__ == '__main__':
    n = 9
    result = hanio(n, 'A', 'B', 'C')
    print(result)

# 1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC6AB1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA5CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB7AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC5BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA6BC1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC8AB1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA5CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB6CA1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC5BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA7CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC6AB1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA5CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB9AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC5BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA6BC1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC7BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA5CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB6CA1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC5BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA8BC1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC6AB1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA5CB1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB7AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC5BA1CB2CA1BA3CB1AC2AB1CB4CA1BA2BC1AC3BA1CB2CA1BA6BC1AC2AB1CB3AC1BA2BC1AC4AB1CB2CA1BA3CB1AC2AB1CB5AC1BA2BC1AC3BA1CB2CA1BA4BC1AC2AB1CB3AC1BA2BC1AC
```


## 题目名称 工业流量隐写分析

附件给了一张 `larger_lbCN3pEh1o`，是个二维码，扫码可以得到：`Fake_one`

![](imgs/image-20250925140651055.png)

010 打开，发现末尾也没有多的数据，因此尝试拿 stegsolve 查看一下

![](imgs/image-20250925140758107.png)

![](imgs/image-20250925140807150.png)

![](imgs/image-20250925140815137.png)

然后尝试用 stegseek 爆破一下，发现用无密钥解密 steghide 可以得到一个文件

![](imgs/image-20251008145141513.png)
 
 010 打开查看，发现是个 zip 压缩包

![](imgs/image-20251008145403581.png)

改后缀为 .zip 并解压可以得到一张二维码，和一个加密的压缩包

二维码扫码可以得到：`wo_lei_ge_dou`，用这个作为密码去解压压缩包可以得到一个流量包文件

追踪一下 TCP 流，发现可以得到前半段的 flag：`flag{S7_PLC`

![](imgs/image-20251008150613092.png)

![](imgs/image-20251008150543502.png)

然后再继续翻看一下，可以发现后半段 flag：`-2025_#_ICS}`

![](imgs/image-20251008151433511.png)

![](imgs/image-20251008151503783.png)

综上，最后的flag为：`flag{S7_PLC-2025_#_ICS}`

当然，这里也可以尝试直接 strings 这个流量包，去快速定位关键信息

![](imgs/image-20251008151746606.png)

> 这道题的 TCP 流量好像有部分是损坏的，所以导致追踪流的时候会看不全
> 
> 但是在分组字节流或者直接用 tshark 导出是可以看到的
> 
> tshark -r industrial_traffic_with_flag.pcap -T fields -Y 'tcp' -e 'tcp.segment_data'


## [TODO] 题目名称 图片的奥秘

附件给了一个加密的压缩包，首先尝试弱密码爆破，得到解压密码：`54450`

![](imgs/image-20250924102048066.png)

解压后得到一张 PNG 图片，010 打开提示报错，发现末尾有一张 base64 编码后的 PNG 图片

![](imgs/image-20250924102620223.png)

![](imgs/image-20250924102223747.png)

提取出来解码后可以得到下图，扫码得到：`flag{asdf%^&*ghjkl}`

![](imgs/image-20250924102338576.png)

但是我们常用 010 打开这张图片，发现末尾还有数据

![](imgs/image-20250924102803864.png)

并且尝试搜索一下 PNG 文件尾，可以发现这里应该存在不止一张 PNG 图片

![](imgs/image-20250924102908341.png)

把后面多余的数据提取出来后，尝试搜索了一下 PNG 文件头

![](imgs/image-20250924103307043.png)


## [TODO] 题目名称 异常的数据流量包

附件给了一个流量包，打开发现主要是 Modbus 流量，翻看一下发现传输了一个 PDF 文件

![](imgs/image-20250925101138944.png)

提取出 PDF 后，全选复制 PDF 里面的内容，粘贴到文本文件里，即可得到 flag`flag{MB03_40001}`

> 这里我提取出来的 PDF 文件还是有点问题，待完善

用 tshark 提取的命令如下：

```bash
tshark -r test.pcap -T fields -Y '((_ws.col.protocol == "Modbus/TCP") && (modbus.func_code == 3)) && (modbus.request_frame)' -e 'modbus.regval_uint16' > out.txt
```


## [TODO] 题目名称 工控协议隐蔽通道分析附件

题目附件给了个流量包，翻看了一下主要是 S7common 和 Modbus 流量

然后发现还传了一个 PNG 和一个 ZIP 压缩包

因为不知道具体的顺序，所以无法完整的提取出来

尝试直接 strings 流量包，可以得到如下内容：

```
ADDRESS_ORDER
$ZIP_FILE_SCATTERED_ACROSS_FOUR_PARTS
WARNING: READ_RESPONSES_CONTAIN_INVALID_DATA
ZIP_PASSWORD_HINT
NOT_THE_DROID
ZIP_HINT_1
CHECK_DB2_AND_M
fl4g_k33p_
flag{zip_ascii_values_of_'flag'}
DATA_BEGIN_AT_ASCII_VALUES_OF_'f'
CAES_l_3:V0F3PP34
K_MAGIC_BYTE
looking_at_M_area}
READ_RESPONSES_ARE_INVALID_CHECK_WRITE_OPS
FOCUS_ON_S7_WRITE_VARIABLE_OPERATIONS
RED_HERRING
JUST_NOISE
HINT: PASSWORD_ENCRYPTED_WITH_CAESAR_SHIFT_3
FOCUS_ON_S7_WRITE_VARIABLE_OPERATIONS_ONLY
OT_IMPORTANT
flag{n0t_
ALL_DATA_FRAGMENTS_IN_M_AREA
PASSWORD_IN_DB_AREA_ADDRESS_0x60_WITH_CAESAR_CIPHER
```


## [TODO] 题目名称 文件分析

附件给了一个 16个八戒.bin，010 打开查看

![](imgs/image-20250925132928952.png)

strings 一下，根据可打印信息推测

这可能是一个用于特定硬件的 OTA 远程升级固件包。

## [TODO] 题目名称 勒索病毒攻击

附件给了一个 `勒索事件截图.png`，还有一个 `车辆OEM厂商重要数据@Hack`

PNG 图片如下所示：

![](imgs/image-20250925133301580.png)

010 打开另一个文件，发现其实是一个加密的 zip 压缩包

![](imgs/image-20250925133326627.png)

zsteg 扫一下这张 PNG，发现图片 LSB 隐写了一个文件

![](imgs/image-20250925133609217.png)

## [TODO] 题目名称 多注意观察

附件给了一个 flag.blf，010 打开查看发现其实是个 rar 压缩包

![](imgs/image-20250925135138223.png)

改后缀为 .rar 后打开，发现是加密的，并且注释里有提示：`FFD8FFE000104A46494600`

![](imgs/image-20250925135252669.png)

`FFD8FFE000104A46494600` 解码后发现其实是 JPG 的文件头

后来尝试弱密码爆破，发现 rar 的解压密码是 `123456789`( rar 压缩包的爆破速度可能会有点慢...)

![](imgs/image-20251013204751636.png)

解压后得到一个未知后缀的 flag 文件，010 打开后可以得到如下内容，很明显是文件头被篡改了的 JPG 图片

![](imgs/image-20251013204942358.png)

我们把之前压缩包注释里的文件头给它补上，改后缀为.jpg 即可得到一张二维码

![](imgs/image-20251013205038464.png)

扫码得到：`fxyj760umlfca9xdjl0cye7gde7d00c28da982d9ALW8InzKyYip6JShjP1qBVt9buXRMc4aZdlight`

然后我们在用 010 打开这张 JPG 图片，并加载 JPG 的模板，可以发现末尾有多余数据

![](imgs/image-20251013205217447.png)

我们把字符集改成 UTF-8 就可以看到如下内容

![](imgs/image-20251013205253863.png)

为了方便查看，我直接复制到 CyberChef 里了，CyberChef 右下角改成 UTF-8 即可正常显示

> 车联网的内涵主要指：车辆上的车载设备通过无线通信技术，对信息网络平台中的所有车辆动态信息进行有效利用，在车辆运行中提供不同的功能服务。可以发现，车联网表现出以下几点特征：车联网能够为车与车之间的间距提供保障，降低车辆发生碰撞事故的几率；车联网可以帮助车主实时导航，并通过与其它车辆和网络系统的通信，提高交通运行的效率

![](imgs/image-20251013205419271.png)

![](imgs/image-20251013205432260.png)

在末尾可以得到这样一串字符串：`qwertyuisdfghdfghjasdfghasdfgh-----no`


## [TODO] 题目名称 Autopilot Ghost

附件给了一个流量包，主要是 TCP 和 UDP 流量

![](imgs/image-20250925140233657.png)

结合题目的提示，翻译为中文大致的意思是：自动驾驶的幽灵

发现 UDP 传输的数据都是 1118 字节，然后 010 diff 了一下，发现每段数据的差异还是挺大的


