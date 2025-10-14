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

附件给了一个流量包，打开翻看发现主要是 TPKT 协议

尝试用 tshark 导出 tpkt.continuation_data

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y &#39;_ws.col.protocol == &#34;TPKT&#34;&#39; -e tpkt.continuation_data &gt; out.txt
```

![](imgs/image-20250925095605474.png)

发现用很多数据是相同的，然后其中穿插了几个不同的数据，因此我们可以过滤一下再导出

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y &#39;!(tpkt.continuation_data == 4d:4d:53:5f:50:41:59:4c:4f:41:44:5f:4e:4f:52:4d:41:4c)&#39; -e tpkt.continuation_data &gt; out.txt
```

![](imgs/image-20250925095806676.png)

第一行数据解 Hex 可以得到一串密码

![](imgs/image-20250925095831203.png)

然后我们主要观察剩下数据的倒数第二字节，可以发现有个 zip 压缩包

![](imgs/image-20250925095937171.png)

但是提取出来发现文件是不完整的，于是我们尝试用以下这个命令直接去提取 TCP 中的数据

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y &#39;!(tcp.payload == 4d:4d:53:5f:50:41:59:4c:4f:41:44:5f:4e:4f:52:4d:41:4c)&#39; -e tcp.payload &gt; out.txt
```

这个时候提取出来的 zip 数据就是完整的了，用`MMS12345`作为密码解压即可得到最后的 flag

![](imgs/image-20250925100145539.png)

![](imgs/image-20250925100300740.png)

`flag{6a46756d-df7e-4b66-87e4-1b2661676e40}`

## 题目名称 工业控制协议流量分析 3

附件给了一个流量包，打开发现存在 mqtt 流量，直接用以下命令导出 mqtt.msg

```bash
tshark -r protocal.pcapng -T fields -Y &#39;mqtt&#39; -e &#39;mqtt.msg&#39; &gt; out.txt
```

然后 CyberChef 转一下 Hex ，拉倒末尾即可看到 flag：`flag{ruEf6OmqhAlXIYxmnR1XLC6R1]}`

![](imgs/image-20250925100707429.png)

## 题目名称 音频隐写

附件给了一个 字符频率映射表.txt 还有一个 wav 文件，映射表中的内容如下：

```
&#39;a&#39;: 440, &#39;b&#39;: 466, &#39;c&#39;: 494, &#39;d&#39;: 523, &#39;e&#39;: 554,
&#39;f&#39;: 587, &#39;g&#39;: 622, &#39;h&#39;: 659, &#39;i&#39;: 698, &#39;j&#39;: 740,
&#39;k&#39;: 784, &#39;l&#39;: 830, &#39;m&#39;: 880, &#39;n&#39;: 932, &#39;o&#39;: 988,
&#39;p&#39;: 1047, &#39;q&#39;: 1109, &#39;r&#39;: 1175, &#39;s&#39;: 1245, &#39;t&#39;: 1319,
&#39;u&#39;: 1397, &#39;v&#39;: 1480, &#39;w&#39;: 1568, &#39;x&#39;: 1661, &#39;y&#39;: 1760, &#39;z&#39;: 1865,
&#39;1&#39;: 1000, &#39;2&#39;: 2000, &#39;3&#39;: 3000, &#39;4&#39;: 4000, &#39;5&#39;: 5000,
&#39;6&#39;: 6000, &#39;7&#39;: 7000, &#39;8&#39;: 8000, &#39;9&#39;: 9000, &#39;0&#39;: 10000,
&#39;A&#39;: 445, &#39;B&#39;: 471, &#39;C&#39;: 499, &#39;D&#39;: 528, &#39;E&#39;: 559,
&#39;F&#39;: 592, &#39;G&#39;: 627, &#39;H&#39;: 664, &#39;I&#39;: 703, &#39;J&#39;: 745,
&#39;K&#39;: 789, &#39;L&#39;: 835, &#39;M&#39;: 885, &#39;N&#39;: 937, &#39;O&#39;: 993,
&#39;P&#39;: 1052, &#39;Q&#39;: 1114, &#39;R&#39;: 1180, &#39;S&#39;: 1250, &#39;T&#39;: 1324,
&#39;U&#39;: 1402, &#39;V&#39;: 1485, &#39;W&#39;: 1573, &#39;X&#39;: 1666, &#39;Y&#39;: 1765, &#39;Z&#39;: 1870,
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
    &#39;a&#39;: 440, &#39;b&#39;: 466, &#39;c&#39;: 494, &#39;d&#39;: 523, &#39;e&#39;: 554,
    &#39;f&#39;: 587, &#39;g&#39;: 622, &#39;h&#39;: 659, &#39;i&#39;: 698, &#39;j&#39;: 740,
    &#39;k&#39;: 784, &#39;l&#39;: 830, &#39;m&#39;: 880, &#39;n&#39;: 932, &#39;o&#39;: 988,
    &#39;p&#39;: 1047, &#39;q&#39;: 1109, &#39;r&#39;: 1175, &#39;s&#39;: 1245, &#39;t&#39;: 1319,
    &#39;u&#39;: 1397, &#39;v&#39;: 1480, &#39;w&#39;: 1568, &#39;x&#39;: 1661, &#39;y&#39;: 1760, &#39;z&#39;: 1865,
    
    # 数字
    &#39;1&#39;: 1000, &#39;2&#39;: 2000, &#39;3&#39;: 3000, &#39;4&#39;: 4000, &#39;5&#39;: 5000,
    &#39;6&#39;: 6000, &#39;7&#39;: 7000, &#39;8&#39;: 8000, &#39;9&#39;: 9000, &#39;0&#39;: 10000,
    
    # 大写字母（比对应小写字母稍高频率）
    &#39;A&#39;: 445, &#39;B&#39;: 471, &#39;C&#39;: 499, &#39;D&#39;: 528, &#39;E&#39;: 559,
    &#39;F&#39;: 592, &#39;G&#39;: 627, &#39;H&#39;: 664, &#39;I&#39;: 703, &#39;J&#39;: 745,
    &#39;K&#39;: 789, &#39;L&#39;: 835, &#39;M&#39;: 885, &#39;N&#39;: 937, &#39;O&#39;: 993,
    &#39;P&#39;: 1052, &#39;Q&#39;: 1114, &#39;R&#39;: 1180, &#39;S&#39;: 1250, &#39;T&#39;: 1324,
    &#39;U&#39;: 1402, &#39;V&#39;: 1485, &#39;W&#39;: 1573, &#39;X&#39;: 1666, &#39;Y&#39;: 1765, &#39;Z&#39;: 1870,
}

def find_closest_char(target_freq):
    if not FREQ_MAP or target_freq &lt; LOW_FREQ_THRESHOLD:
        return None
    
    # 找到最接近的频率对应的字符
    closest_char = min(FREQ_MAP.keys(), 
                      key=lambda char: abs(FREQ_MAP[char] - target_freq))
    
    # 检查频率差异是否在可接受范围内
    if abs(FREQ_MAP[closest_char] - target_freq) &gt; FREQ_DIFF_THRESHOLD:
        return None
    
    return closest_char


def analyze_wav_sequentially(file_path, chunk_duration_ms=DEFAULT_CHUNK_DURATION_MS):
    sample_rate, data = wavfile.read(file_path)
    # 如果是立体声，只使用左声道
    if data.ndim &gt; 1:
        data = data[:, 0]
    
    # 计算每个块的大小（样本数）
    chunk_size = int(sample_rate * chunk_duration_ms / 1000)
    num_chunks = len(data) // chunk_size
    decoded_chars = []
    last_char = None
    
    print(f&#34;[&#43;] 采样率: {sample_rate} Hz, 块时长: {chunk_duration_ms} ms, 总块数: {num_chunks}&#34;)
    
    for i in range(num_chunks):
        start = i * chunk_size
        end = start &#43; chunk_size
        chunk = data[start:end]
        
        # 对当前块进行 FFT 分析
        fft_spectrum = np.fft.rfft(chunk)
        fft_freq = np.fft.rfftfreq(len(chunk), 1.0 / sample_rate)
        
        # 找到主频率（忽略直流分量）
        if len(fft_spectrum) &gt; 1:
            peak_index = np.argmax(np.abs(fft_spectrum[1:])) &#43; 1
            dominant_frequency = fft_freq[peak_index]
            
            # 查找对应的字符
            char = find_closest_char(dominant_frequency)
            
            # 为了避免一个长音被重复记录，只有当字符变化时才记录
            if char and char != last_char:
                decoded_chars.append(char)
                last_char = char
    
    final_message = &#34;&#34;.join(decoded_chars)
    
    print(f&#34;[&#43;] 解码出的字符序列: {final_message}&#34;)
    print(f&#34;[&#43;] 字符数量: {len(decoded_chars)}&#34;)
    return final_message


def func():    
    wav_file = &#34;video.wav&#34;
    analyze_wav_sequentially(wav_file)
    

if __name__ == &#34;__main__&#34;:
    func()

# [&#43;] 采样率: 44100 Hz, 块时长: 100 ms, 总块数: 73
# [&#43;] 解码出的字符序列: FvoelrnoBjmFz1aknoF7U24gFe5204521Be19B3voh9BSaqhGRlyXio6m0xtkEZ21nUmhelP
# [&#43;] 字符数量: 72
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

&gt; 所解即所得；
&gt; 
&gt; 一组格式为盘&#43;当前柱&#43;去往柱

经典的汉诺塔问题，写个脚本递归一下即可

```python
def hanio(n, a, b, c):
    res = &#34;&#34;
    if n == 1:
        res &#43;= f&#34;{n}{a}{c}&#34;
    else:
        # 将n-1个盘从a通过c移动到b
        res &#43;= hanio(n-1, a, c, b)
        # 将最大的盘从a移动到c
        res &#43;= f&#34;{n}{a}{c}&#34;
        # 将n-1个盘从b通过a移动到c
        res &#43;= hanio(n-1, b, a, c)
    return res

if __name__ == &#39;__main__&#39;:
    n = 9
    result = hanio(n, &#39;A&#39;, &#39;B&#39;, &#39;C&#39;)
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

&gt; 这道题的 TCP 流量好像有部分是损坏的，所以导致追踪流的时候会看不全
&gt; 
&gt; 但是在分组字节流或者直接用 tshark 导出是可以看到的
&gt; 
&gt; tshark -r industrial_traffic_with_flag.pcap -T fields -Y &#39;tcp&#39; -e &#39;tcp.segment_data&#39;

## 题目名称 工控协议隐蔽通道分析附件

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
flag{zip_ascii_values_of_&#39;flag&#39;}
DATA_BEGIN_AT_ASCII_VALUES_OF_&#39;f&#39;
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

肉眼观察并手动组合一下，可以整理出如下内容

```
ADDRESS_ORDER
WARNING: READ_RESPONSES_CONTAIN_INVALID_DATA
READ_RESPONSES_ARE_INVALID_CHECK_WRITE_OPS
FOCUS_ON_S7_WRITE_VARIABLE_OPERATIONS
FOCUS_ON_S7_WRITE_VARIABLE_OPERATIONS_ONLY

ZIP_HINT_1
ZIP_FILE_SCATTERED_ACROSS_FOUR_PARTS

ZIP_PASSWORD_HINT
PASSWORD_IN_DB_AREA_ADDRESS_0x60_WITH_CAESAR_CIPHER
HINT: PASSWORD_ENCRYPTED_WITH_CAESAR_SHIFT_3

flag{n0t_fl4g_k33p_looking_at_M_area}
flag{zip_ascii_values_of_&#39;flag&#39;}

CAES_l_3:V0F3PP34

DATA_BEGIN_AT_ASCII_VALUES_OF_&#39;f&#39;
RED_HERRING
CHECK_DB2_AND_M
ALL_DATA_FRAGMENTS_IN_M_AREA
JUST_NOISE
OT_IMPORTANT
NOT_THE_DROID
K_MAGIC_BYTE
RED_HERRING
```

`FOCUS_ON_S7_WRITE_VARIABLE_OPERATIONS_ONLY` 和 `READ_RESPONSES_CONTAIN_INVALID_DATA` 提示了我们要主要关注 write 操作

因此我们过滤了一下，并筛去了包长度小于 100 字节的干扰流量

![](imgs/image-20251014145954432.png)

`ZIP_FILE_SCATTERED_ACROSS_FOUR_PARTS` 提示了我们压缩包被拆成了四部分

因此我们去上面过滤出来的几个包里找 zip 压缩包的数据，首先搜索 504B0304 和 504B0506 定位头尾

然后中间两部分组合一下，最后提取出来压缩包的十六进制数据如下：

```
504b03041400010063008b81db5aea95ecdb8d0000007000000017000b00696e647573747269616c5f70726f746f636f6c2e74787401990700010041450308009ed176b901ca032e4951f509d6963e9c6678412c14325ca3d781cd0b63d2f857a53e1a96e550dca69ad0fe56ab00ac1f1326039ab18eee705724d6514ff791ce5e18f1d8b33dbf133b84216737ffd870bdae00e56084fdbd54a2c4c8227df5b4f425fa01090eb4e6c742ebf5bcd38156fd02815df6d8ab97fc5931469fd66034f1bbfc182f55f86693754da5e5504b010214031400010063008b81db5aea95ecdb8d0000007000000017000b000000000000000000ff8100000000696e647573747269616c5f70726f746f636f6c2e7478740199070001004145030800504b0506000000000100010050000000cd0000000000
```

提取出来的压缩包是加密的

结合提示：`PASSWORD_ENCRYPTED_WITH_CAESAR_SHIFT_3`，我们写个脚本解密一下 `V0F3PP34`

因为 `CAES_l_3` 提示的是凯撒密码左减三位

```python
def caesar_decrypt(data, shift=3):
    result = []
    for char in data:
        if char.isdigit():
            decrypted_digit = (int(char) - shift) % 10
            result.append(str(decrypted_digit))
        elif char.isalpha():
            if char.isupper():
                decrypted_char = chr((ord(char) - ord(&#39;A&#39;) - shift) % 26 &#43; ord(&#39;A&#39;))
            else:
                decrypted_char = chr((ord(char) - ord(&#39;a&#39;) - shift) % 26 &#43; ord(&#39;a&#39;))
            result.append(decrypted_char)
        else:
            # 其他字符保持不变
            result.append(char)
    return &#39;&#39;.join(result)

data  = &#34;V0F3PP34&#34;
print(caesar_decrypt(data))
# S7C0MM01
```

用`S7C0MM01`作为解压密码去解压即可得到最后的flag: `flag{S7c0mm_pr0t0col_st3g4n0graphy_mast3r}`

```
恭喜你找到了S7comm协议的秘密通道！
这是真正的flag: flag{S7c0mm_pr0t0col_st3g4n0graphy_mast3r}
```


## 题目名称 异常的数据流量包

附件给了一个流量包，打开发现主要是 Modbus 流量，翻看一下发现传输了一个 PDF 文件

![](imgs/image-20250925101138944.png)

观察可以发现有三个 ip 在传输 PDF，因此我们用以下命令提取一下传输的数据

```bash
tshark -r test.pcap -T fields -Y &#39;(((ip.src == 192.168.1.200) || (ip.src == 192.168.1.201)) || (ip.src == 192.168.1.202)) &amp;&amp; (modbus.func_code == 3)&#39; -e &#39;tcp.payload&#39; &gt; out.txt
```

观察可以发现提取出来数据的前 9 字节是无效数据，因此我们可以写个脚本处理一下

```python
with open(&#39;out.txt&#39;,&#39;r&#39;) as f:
    data = f.read().split()
    
# print(data)

res = &#34;&#34;
for item in data:
    if len(item) &gt; 18:
        res &#43;= item[18:]
        
print(len(res))
print(bytes.fromhex(res))

with open(&#34;out.pdf&#34;,&#39;wb&#39;) as f:
    f.write(bytes.fromhex(res))
```

运行以上脚本后可以得到一个加密的 PDF 文件

因此我们继续看流量包，在最后一个 TCP 流中发现传了一个网址：`https://wwfu.lanzouo.com/i6D1D2y2vy8h/`

![](imgs/image-20251014154815065.png)

访问并下载可以得到一个 `打开看看.txt` ，里面的内容如下：

&gt; ....- ...-- ...-- ----- ..... .---- ---.. .. ... .- ... - .-. .. -. --. --- ..-. ..- ... . ..-. ..- .-.. -. ..- -- -... . .-. ...

解摩斯可以得到：`4330518ISASTRINGOFUSEFULNUMBERS`

![](imgs/image-20251014155517112.png)

肉眼观察一下，手动拆分可以得到：`4330518 IS A STRING OF USEFUL NUMBERS`

用 `4330518` 作为密码，即可正常打开 PDF（感觉 7 位纯数字的弱密码，好像直接爆破也行

打开 PDF 后移开上面的图片即可得到最后的 flag：`flag{MB03_40001}`

![](imgs/image-20251014160238184.png)

## 题目名称 why_not_substitution

题目附件给了如下内容：

```python
from string import ascii_lowercase, digits
import hashlib
from flag import flag

CHARSET = &#34;!@#¥%&#34; &#43; ascii_lowercase &#43; digits

n = len(CHARSET)
def encrypt(msg, f):
    chiper = &#39;&#39;
    for m in msg:
        chiper &#43;= CHARSET[f.substitute(CHARSET.index(m))]
    return chiper

P.&lt;x&gt; = PolynomialRing(GF(n))
f = P.random_element(6)


enc = encrypt(flag, f)
print(&#34;flag[0:7]&#34;, flag[0:7])
print(&#34;enc&#34;, enc)
print(&#34;hash&#34;, hashlib.sha256(flag.encode(&#39;utf-8&#39;)).hexdigest())


# flag[0:7] flkejiy
# enc quw7f59u51q¥##w¥w6q6s¥¥#w#661d¥
# hash 7d41757168a2199b32cb1744de130fdebda25271116bc64eccf4e397770d73c2
```

简单的密码题，GPT 直接一把梭了：`flkejiyliafg77c3c4f49335c711avg`

```python
from hashlib import sha256
from itertools import product
from multiprocessing import Pool, cpu_count
import math

CHARSET = &#34;!@#¥%&#34; &#43; &#34;abcdefghijklmnopqrstuvwxyz&#34; &#43; &#34;0123456789&#34;
p = len(CHARSET)  # 41

known_prefix = &#34;flkejiy&#34;  # flag[0:7]
enc = &#34;quw7f59u51q¥##w¥w6q6s¥¥#w#661d¥&#34;
target_hash = &#34;7d41757168a2199b32cb1744de130fdebda25271116bc64eccf4e397770d73c2&#34;

def inv_mod(a, p):
    a %= p
    if a == 0:
        raise ZeroDivisionError(&#34;no inverse&#34;)
    return pow(a, p-2, p)  # p prime

def lagrange_eval(t, xs, ys, p):
    total = 0
    k = len(xs)
    for i in range(k):
        xi, yi = xs[i], ys[i]
        num = 1
        den = 1
        for j in range(k):
            if j == i: continue
            xj = xs[j]
            num = (num * (t - xj)) % p
            den = (den * (xi - xj)) % p
        li = (num * inv_mod(den, p)) % p
        total = (total &#43; yi * li) % p
    return total

def build_f_map(known_prefix, enc_prefix):
    xs = [CHARSET.index(ch) for ch in known_prefix]
    ys = [CHARSET.index(ch) for ch in enc_prefix]
    f_map = [lagrange_eval(i, xs, ys, p) for i in range(p)]
    return f_map

def build_candidates(enc, f_map):
    cand_list = []
    for c in enc:
        if c not in CHARSET:
            raise ValueError(f&#34;cipher char {c!r} not in CHARSET&#34;)
        y = CHARSET.index(c)
        cands = [i for i, v in enumerate(f_map) if v == y]
        if len(cands) == 0:
            raise ValueError(f&#34;No candidate for cipher char {c!r}&#34;)
        cand_list.append(cands)
    return cand_list

# single-worker search for product of candidates iterables
def search_chunk(prefix_indices, remaining_cands, target_hash):
    # prefix_indices: chosen indices for first k positions (list of ints)
    # remaining_cands: list of candidate-lists for positions k..end
    prefix = &#39;&#39;.join(CHARSET[i] for i in prefix_indices)
    # iterate remaining
    for tail in product(*remaining_cands):
        candidate = prefix &#43; &#39;&#39;.join(CHARSET[i] for i in tail)
        if sha256(candidate.encode(&#34;utf-8&#34;)).hexdigest() == target_hash:
            return candidate
    return None

# helper for worker map: each worker gets a fixed prefix to extend
def worker_task(args):
    prefix_indices, remaining_cands, target_hash = args
    return search_chunk(prefix_indices, remaining_cands, target_hash)

def main():
    workers = cpu_count()
    print(&#34;CHARSET:&#34;, CHARSET)
    print(&#34;p:&#34;, p)
    print(&#34;known_prefix:&#34;, known_prefix)
    print(&#34;enc:&#34;, enc)
    print(&#34;target_hash:&#34;, target_hash)
    # build interpolation using known 7 pairs
    f_map = build_f_map(known_prefix, enc[:len(known_prefix)])
    cand_list = build_candidates(enc, f_map)
    counts = [len(c) for c in cand_list]
    total = 1
    for c in counts: total *= c
    print(&#34;candidate counts per position:&#34;, counts)
    print(&#34;total combinations:&#34;, total)

    # if small, brute force single-thread
    if total &lt;= 5_000_000:
        print(&#34;Total combinations small: using single-thread brute force...&#34;)
        for combo in product(*cand_list):
            text = &#39;&#39;.join(CHARSET[i] for i in combo)
            if sha256(text.encode(&#39;utf-8&#39;)).hexdigest() == target_hash:
                print(&#34;Found flag:&#34;, text)
                return
        print(&#34;Not found.&#34;)
        return

    # otherwise use multiprocessing by splitting on first k positions
    # choose k so that number of prefixes ~= workers * ~2000 (tunable)

    target_prefix_count = workers * 2000
    k = 1
    prefix_space = len(cand_list[0])
    while prefix_space &lt; target_prefix_count and k &lt; len(cand_list):
        k &#43;= 1
        prefix_space *= len(cand_list[k-1])
    print(f&#34;Splitting on first {k} positions -&gt; prefix count {prefix_space}, using {workers} workers&#34;)

    # generate all prefixes (could be large but manageable for typical sizes)
    from itertools import product
    prefixes = list(product(*cand_list[:k]))
    remaining = cand_list[k:]

    # prepare tasks (each task: a fixed prefix)
    tasks = [(list(pref), remaining, target_hash) for pref in prefixes]

    print(&#34;Starting pool...&#34;)
    found = None
    with Pool(processes=workers) as pool:
        for res in pool.imap_unordered(worker_task, tasks, chunksize=1):
            if res:
                found = res
                pool.terminate()
                break

    if found:
        print(&#34;Found flag:&#34;, found)
        print(&#34;SHA256:&#34;, sha256(found.encode()).hexdigest())
    else:
        print(&#34;Not found (tried full parallel search).&#34;)

if __name__ == &#34;__main__&#34;:
    main()

# CHARSET: !@#¥%abcdefghijklmnopqrstuvwxyz0123456789
# p: 41
# known_prefix: flkejiy
# enc: quw7f59u51q¥##w¥w6q6s¥¥#w#661d¥
# target_hash: 7d41757168a2199b32cb1744de130fdebda25271116bc64eccf4e397770d73c2
# candidate counts per position: [1, 1, 3, 2, 1, 4, 1, 1, 4, 1, 1, 2, 2, 2, 3, 2, 3, 2, 1, 2, 1, 2, 2, 2, 3, 2, 2, 2, 1, 4, 2]
# total combinations: 84934656
# Splitting on first 18 positions -&gt; prefix count 27648, using 8 workers
# Starting pool...
# Found flag: flkejiyliafg77c3c4f49335c711avg
# SHA256: 7d41757168a2199b32cb1744de130fdebda25271116bc64eccf4e397770d73c2
```

## [TODO] 题目名称 图片的奥秘

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

&gt; 车联网的内涵主要指：车辆上的车载设备通过无线通信技术，对信息网络平台中的所有车辆动态信息进行有效利用，在车辆运行中提供不同的功能服务。可以发现，车联网表现出以下几点特征：车联网能够为车与车之间的间距提供保障，降低车辆发生碰撞事故的几率；车联网可以帮助车主实时导航，并通过与其它车辆和网络系统的通信，提高交通运行的效率

![](imgs/image-20251013205419271.png)

![](imgs/image-20251013205432260.png)

在末尾可以得到这样一串字符串：`qwertyuisdfghdfghjasdfghasdfgh-----no`


## [TODO] 题目名称 Autopilot Ghost

附件给了一个流量包，主要是 TCP 和 UDP 流量

![](imgs/image-20250925140233657.png)

结合题目的提示，翻译为中文大致的意思是：自动驾驶的幽灵

发现 UDP 传输的数据都是 1118 字节，然后 010 diff 了一下，发现每段数据的差异还是挺大的




---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/49bdad5/  

