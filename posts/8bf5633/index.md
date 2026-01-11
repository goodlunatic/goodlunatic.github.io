# 2025 鹏城杯联邦网络靶场协同攻防演练 Misc Writeup

**这个比赛来问的师傅比较多，于是打算写篇文章详细复现一下**
<!--more-->

|         ![](imgs/image-20260111164642203.png)         |
| :---------------------------------------------------: |
| 本文中涉及的具体题目附件可以进我的 [知识星球](https://t.zsxq.com/an6p6) 获取 |


## 题目名称 SMB

> Do you know SMB?

附件给了一个pcapng流量包，打开翻看，发现是试用了NTLMv2认证的SMB2协议

![](imgs/image-20260110220207954.png)

拿脚本提取一下hash，然后拿hashcat爆破可以得到密码：`12megankirwin12`

![](imgs/image-20260110220259336.png)

```bash
rockyou::PC:5649f6b5969a9fbf:f8cb9296a5206484b1baf6bce47abe3b:0101000000000000f68d75c3fb59dc01ba30ab51dc5395c3000000000200160046004c00410047002d005300450052005600450052000100160046004c00410047002d005300450052005600450052000400160046004c00410047002d005300450052005600450052000300160046004c00410047002d0053004500520056004500520007000800f68d75c3fb59dc0106000400020000000800300030000000000000000100000000200000c06bb8a56b86b084ba3cfc2b7e5a0eaef96088346e865b0c93bdd8b4de440ff70a001000000000000000000000000000000000000900200063006900660073002f0046004c00410047002d005300450052005600450052000000000000000000
rockyou::PC:a230ee46968b6116:c3b172a7df39f6d1765de24170d5f387:0101000000000000ed3fabc7fb59dc01d9b1245c055f29b2000000000200160046004c00410047002d005300450052005600450052000100160046004c00410047002d005300450052005600450052000400160046004c00410047002d005300450052005600450052000300160046004c00410047002d0053004500520056004500520007000800ed3fabc7fb59dc0106000400020000000800300030000000000000000100000000200000c06bb8a56b86b084ba3cfc2b7e5a0eaef96088346e865b0c93bdd8b4de440ff70a001000000000000000000000000000000000000900200063006900660073002f0046004c00410047002d005300450052005600450052000000000000000000
rockyou::PC:12e83c96f85b09d7:14266416151fcfce3b420575ef030028:0101000000000000ed3fabc7fb59dc01ab5b9b0cfe9b35d0000000000200160046004c00410047002d005300450052005600450052000100160046004c00410047002d005300450052005600450052000400160046004c00410047002d005300450052005600450052000300160046004c00410047002d0053004500520056004500520007000800ed3fabc7fb59dc0106000400020000000800300030000000000000000100000000200000c06bb8a56b86b084ba3cfc2b7e5a0eaef96088346e865b0c93bdd8b4de440ff70a001000000000000000000000000000000000000900200063006900660073002f0046004c00410047002d005300450052005600450052000000000000000000
rockyou::PC:3822c6dbeba60ca2:4b35d5e49a18a4bf1ce0e68f591799d0:0101000000000000ed3fabc7fb59dc01c0f5befb4ddd6648000000000200160046004c00410047002d005300450052005600450052000100160046004c00410047002d005300450052005600450052000400160046004c00410047002d005300450052005600450052000300160046004c00410047002d0053004500520056004500520007000800ed3fabc7fb59dc0106000400020000000800300030000000000000000100000000200000c06bb8a56b86b084ba3cfc2b7e5a0eaef96088346e865b0c93bdd8b4de440ff70a001000000000000000000000000000000000000900200063006900660073002f0046004c00410047002d005300450052005600450052000000000000000000
```

![](imgs/image-20260110221404842.png)

用wireshark导入密码后即可解密传输的文件

![](imgs/image-20260110221514753.png)

发现zip里只有一个exe文件，并且还是 zipcrypto+store，很明显提示了要明文攻击

![](imgs/image-20260110221608590.png)

![](imgs/image-20260110222053603.png)

然后IDA打开解压后得到的letter.exe，发现是rust写的，一坨shit

![](imgs/image-20260110223317734.png)

下个断点，直接启动动调后搜索flag即可：`flag{N0w_U-V1ctory}`

![](imgs/image-20260110224108190.png)


## 题目名称 blue

> 蓝色的世界。

附件给了一张png，stegsolve打开发现蓝色通道隐写了一个zip的hex数据

![](imgs/image-20260110224835956.png)

只不过这里的hex数据中插入了一些干扰的0，我们写个脚本提取一下即可

```python
with open('out.bin', 'rb') as f:
    data = f.read()

res = ''.join(hex(b >> 4)[2:] for b in data)

with open('zip_hex.txt', 'w') as f:
    f.write(res)
```

提取出来的hex数据后面有干扰数据，因此我们可以手动转换一下

![](imgs/image-20260110225835427.png)


![](imgs/image-20260110225823819.png)

提取得到的压缩包中只有一张png，zipcrypto+store 很明显提示了明文攻击

![](imgs/image-20260110225936584.png)

![](imgs/image-20260111130538826.png)

解压后得到xor.png

![](imgs/image-20260111130624364.png)

010打开，发现末尾还有一张png

![](imgs/image-20260111130713291.png)

手动提取出来可以得到下图，放大后仔细看可以看到很多蓝色的横向分布的像素

![](imgs/image-20260111130959003.png)

结合之前的图片名称xor，很容易联想到双图盲水印的一个考点：`原图和盲水印后的图像异或会得到下图这种横向蓝色虚线`

因此，我们拿stegsolve异或一下这两张图片，然后再解个双图盲水印即可

![](imgs/image-20260111131844294.png)

![](imgs/image-20260111131955012.png)

`flag{a5e2ffeb-133e-4eb0-9855-d4d0073326ee}`

## 题目名称 ZipCracker

> do u know zip and fm？

附件给了个zip，经过尝试后发现是伪加密

![](imgs/image-20260111132143243.png)

用010手动去除伪加密后解压，010打开其中的jpg，发现末尾有个zip

![](imgs/image-20260111132406238.png)

手动提取出来并解压可以得到两个txt

![](imgs/image-20260111132510800.png)

然后再去看那个`do u know it`，发现是 GNU Radio 的 grc 文件

![](imgs/image-20260111132544080.png)

直接让AI快速搓个脚本还原一下

```python
import numpy as np
import struct
import scipy.io.wavfile as wav

def read_binary_float_file(filename):
    """读取二进制浮点数文件"""
    with open(filename, 'rb') as f:
        data_bytes = f.read()
    
    # 每个浮点数4字节
    num_floats = len(data_bytes) // 4
    fmt = 'f' * num_floats  # 'f' 表示32位浮点数
    
    # 解析二进制数据
    data = struct.unpack(fmt, data_bytes[:num_floats*4])
    return np.array(data, dtype=np.float32)

# 读取二进制数据
print("读取flag1.txt...")
real_part = read_binary_float_file('flag1.txt')
print("读取flag2.txt...")
imag_part = read_binary_float_file('flag2.txt')

print(f"读取完成: real_part长度={len(real_part)}, imag_part长度={len(imag_part)}")

# 确保两个文件长度相同
min_len = min(len(real_part), len(imag_part))
real_part = real_part[:min_len]
imag_part = imag_part[:min_len]

# 重构复数信号
signal_data = real_part + 1j * imag_part
print(f"复数信号长度: {len(signal_data)}")

# 参数（来自GRC流图）
if_rate = 192000      # 576000 / 3
samp_rate = 48000     # 音频采样率
max_dev = 5000        # FM最大频偏

# 1. FM解调（相位差分法）
print("进行FM解调...")
phase = np.angle(signal_data)
phase_diff = np.diff(phase)
phase_diff = np.mod(phase_diff + np.pi, 2 * np.pi) - np.pi  # 处理相位跳变
audio_if = phase_diff * if_rate / (2 * np.pi * max_dev)

# 2. 下采样到音频采样率
print("下采样...")
factor = if_rate // samp_rate  # 4倍下采样
# 使用平均下采样简化处理
audio_samp = audio_if[::factor]

# 3. 归一化
print("归一化...")
audio_samp = audio_samp / np.max(np.abs(audio_samp)) * 0.9

# 4. 保存音频
output_file = 'recovered.wav'
print(f"保存音频到 {output_file}...")
wav.write(output_file, samp_rate, audio_samp.astype(np.float32))

print(f"\n完成！")
print(f"音频已保存为: {output_file}")
print(f"采样率: {samp_rate}Hz")
print(f"时长: {len(audio_samp)/samp_rate:.2f}秒")
print(f"音频峰值: {np.max(np.abs(audio_samp)):.4f}")
```

![](imgs/image-20260111133307556.png)

发现是摩斯电码，对照着敲一下然后用Cyberchef转换一下即可得到 flag.zip 的解压密码：`114514350234114514`

![](imgs/image-20260111133434465.png)

解压后可以得到一个flag.txt，内容如下

```
flag{Y0u*****************!!!}
```

然后还有一个flag.zip，是 store+zipcrypto，很明显又是明文攻击

![](imgs/image-20260111134330680.png)

解压后即可得到flag: `flag{Y0u_r_th3_Z1p_k1ng!!!!!}`

## 题目名称 whiteout

> 一份离线备份的 Docker 镜像。

题面提示了是导出的docker镜像，因此我们可以尝试直接用7z去解压

`6ad10b1fede380e2db5571dfe343455d33dd1f07588368ff59ee2a9a826739a9\opt\app\`目录下有个`decode.py`，内容如下：

```python
# decode.py
KEY = 0x37

def decode(path):
    with open(path, "rb") as f:
        data = f.read()
    return bytes(b ^ KEY for b in data)

if __name__ == "__main__":
    print(decode("/opt/.data/.logs/syslog.bin"))

```

因此我们要去找这个文件，发现在`d53154d4f2499c5c31fdd61d359d2a9a0b9076ac639b102bb913c752f5769cfb\opt\.data\.logs\`目录下

直接提取出来然后改一下文件路径，用上面的脚本解密即可得到flag: `flag{docker_whiteout_forensics_is_fun}`

```python
# decode.py
KEY = 0x37

def decode(path):
    with open(path, "rb") as f:
        data = f.read()
    return bytes(b ^ KEY for b in data)

if __name__ == "__main__":
    print(decode("syslog.bin"))
    # b'flag{docker_whiteout_forensics_is_fun}'
```


## 题目名称 Hidden

> 我们从一名嫌疑人的硬盘中恢复了这张图片。我们认为它不仅仅是一张普通的图片。对文件属性的初步分析没有结果，但我们怀疑需要一个密码才能解开秘密。请找出其中隐藏的数据。

附件给了一张bmp图片，zsteg扫一下可以得到：`PixelWhisper`

![](imgs/image-20260111140513325.png)

然后把上面得到的内容作为密钥，解一下steghide即可得到flag: `flag{a9a3c2872e428b6d859a0e63458a43f8}`

![](imgs/image-20260111141219709.png)

## 题目名称 The_Rogue_Beacon

> 某自动驾驶初创公司的测试车在进行极限速度测试时发生了数剧中断。竞争对手截获了测试期间的 CAN 总线广播数据。
> 
> 我们需要评估这辆原型车的动力性能极限。附件是一个.pcap 文件，记录了底盘动力域（Chassis Domain）的所有通信。
> 
> 请剥离出干扰数据，锁定车速信号，并向总部报告车辆达到的峰值速度发生的确切位置。

根据车速一开始是不断增长的这个特点，筛选出车速信号的id是580

![](imgs/image-20260111142736980.png)

一直往下翻，发现包序号为12149的时候车速达到最大，sha256一下即可得到flag

![](imgs/image-20260111143040004.png)

因此最后的flag为：`9db878fd06dd7587a91c0fb600e0e9f7c3ea310e75f36253ef57ac2d92dd8c29`

## 题目名称 超越感官极致

> 人間の感覚の極致を超えてみせる！おれは人間をやめるぞ！

附件给了一张niko.png，010打开发现评论中有提示，并且文件末尾还有个zip

![](imgs/image-20260111145731600.png)

![](imgs/image-20260111143420847.png)

手动提取出来并解压，可以得到一张 ?.png

![](imgs/image-20260111143521984.png)

经过尝试发现是IDAT块隐写

![](imgs/image-20260111143815334.png)

因此我们写个脚本，把上图中所有IDAT块的数据都提取出来并拼接

```python
import struct

def extract_idat_simple(png_file):
    with open(png_file, 'rb') as f:
        # 读取并验证PNG文件头
        header = f.read(8)
        idat_data = b''
        chunk_count = 0
        
        while True:
            try:
                # 读取块长度
                len_bytes = f.read(4)
                length = struct.unpack('>I', len_bytes)[0]
                # 读取块类型
                chunk_type = f.read(4)
                chunk_count += 1
                # 读取块数据
                data = f.read(length)
                # 跳过CRC
                f.read(4)
                
                # 处理IDAT块
                if chunk_type == b'IDAT':
                    idat_data += data
                    print(f"[+] 正在处理IDAT块{chunk_count}，长度: {length}")
                
                # 如果是IEND块，结束
                if chunk_type == b'IEND':
                    print(f"[+] 到达IEND块，IDAT块提取完毕，共提取 {chunk_count} 个块")
                    break
                    
            except struct.error:
                break
        
        return idat_data
            
if __name__ == "__main__":
    png_file = '？.png'
    data = extract_idat_simple(png_file)
    # print(len(data))
    # print(data.hex())
    with open('idat_hex.txt', 'w') as f:
        f.write(data.hex())
```

提取出来后用CyberChef解压一下，暂时不知道是什么文件

![](imgs/image-20260111145758744.png)

结合之前图片评论中的 `key player` 以及现在得到的这个数据文件，猜测可能是VC加密容器，然后密钥文件就是那张Niko.png

挂载后发现可以得到一个`mystery_sound.wav`，Audacity打开，波形图中可以看到有余弦和正弦波

![](imgs/image-20260111150204881.png)

然后频谱图中可以看到，音频在时间上存在明显的周期，下图中每一小段都是在0.4秒左右

![](imgs/image-20260111151251145.png)


并且我们尝试播放，会发现这里的每一小段，有的是有声音，但是有的又是没有声音的

结合题目名称`超越感官极致`，猜测这些听不到的地方才是题目考察的重点

然后谷歌一下很容易找到人耳能听到的声音频率范围是 20 Hz 到 20,000 Hz（20 kHz）

结合上面的频谱图，我们应该考虑的就只有2种情况的，一种是小于20hz的，另一种就是大于20000hz的

我们写个脚本提取一下，并把这2种情况分别对应到二进制的0和1上

```python
import numpy as np
from scipy.io import wavfile

def get_frequency_every_04s(wav_file):
    sample_rate, audio_data = wavfile.read(wav_file)
    window_size = int(0.4 * sample_rate)  # 0.4秒窗口
    results = []
    
    for i in range(0, len(audio_data), window_size):
        if i + window_size > len(audio_data):
            break
            
        # 获取窗口数据
        window = audio_data[i:i+window_size]
        # 应用窗函数
        window = window * np.hanning(len(window))
        # FFT分析
        fft_result = np.abs(np.fft.fft(window))
        frequencies = np.fft.fftfreq(len(window), 1/sample_rate)
        # 取正频率部分
        positive_freq_mask = frequencies >= 0
        positive_freqs = frequencies[positive_freq_mask]
        positive_magnitude = fft_result[positive_freq_mask]
        # 找到主频（跳过直流分量）
        if len(positive_magnitude) > 10:
            # 找幅度最大的频率
            dominant_idx = np.argmax(positive_magnitude[5:]) + 5  # 跳过前几个低频分量
            dominant_freq = positive_freqs[dominant_idx]
            
            time_mid = (i + window_size/2) / sample_rate
            results.append((time_mid, dominant_freq))
    
    return results

if __name__ == "__main__":
    wav_file = "mystery_sound.wav"
    frequencies = get_frequency_every_04s(wav_file)
    res = ""

    print(f"分析文件: {wav_file}")
    print("时间(秒) | 频率(Hz)")
    print("-" * 30)

    for time, freq in frequencies:
        print(f"{time:7.2f} | {freq:8.1f}")
        if freq < 20:
            res += "0"
        elif freq > 20000:
            res += "1"

    print(res)
    
# 分析文件: mystery_sound.wav
# 时间(秒) | 频率(Hz)
# ------------------------------
#    0.20 |  21420.0
#    0.60 |  15610.0
#    1.00 |  21705.0
#    1.40 |   7885.0
#    1.80 |     17.5
#    2.20 |  18272.5
#    2.60 |     12.5
#    3.00 |  10612.5
#    3.40 |  21430.0
#    3.80 |   8610.0
#    4.20 |  20230.0
#    4.60 |   7212.5
#    5.00 |     12.5
#        ...
#  331.80 |   1587.5
#  332.20 |  20680.0
#  332.60 |  17495.0
#  333.00 |  20915.0
#  333.40 |  14415.0
#  333.80 |  20392.5
#  334.20 |   7647.5
#  334.60 |     12.5
#  335.00 |    787.5
#  335.40 |  21215.0
#  335.80 |  17547.5
# 110011011011001100001110011111110111001111110111001100011111001101111111000101111001101111111100001101001011001111100101100011110100111011100111001101111101101111101000110010110111110110101111010111100101100110100000011000111100101101111110000110110100110111010111110110000110111011001011011111111010111011101100011011000011101100110011111001010111111110100110100001100111011111011011111100101110101111010011010001111101
```

最后7位二进制一组转为ASCII即可得到flag：`flag{On1y_by_pi3rcin9_7he_5urf@ce_C4n_0ne_unc0v3r_th3_7ruth}`

![](imgs/image-20260111152812608.png)

## 题目名称 PunkFace

> look。

附件给了一个docx文件，文件有点大，将近90MB

因此我们改后缀为.zip后解压

`PunkFace\word\media`路径下有两张png

![](imgs/image-20260111153409459.png)

我们拿stegsolve打开image1.png，发现RGB的`plane 4`中有明显LSB的痕迹

| ![](imgs/image-20260111153540399.png) | ![](imgs/image-20260111153547760.png) | ![](imgs/image-20260111153553952.png) |
| :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |

发现LSB隐写了一张png图片

![](imgs/image-20260111153636697.png)

提取出来后可以得到下图

![](imgs/image-20260111153738731.png)


发现图片中有字符，但不是很清晰，因此我们可以调整一下

![](imgs/2.png)

图中的内容如下：

```
4e 65 74 77 6f 72 6b 20 73 65 63 75 72 69 74 79 20 69 73 20 61 6e 20 75 6d 62 72
65 6c 6c 61 20 74 65 72 6d 20 74 6f 20 64 65 73 63 72 69 62 65 20 73 65 63 75 72
69 74 79 20 63 6f 6e 74 72 6f 6c 73 2c 20 70 6f 6c 69 63 69 65 73 2c 20 70 72 6f 63
65 73 73 65 73 20 61 6e 64 20 70 72 61 63 74 69 63 65 73 20 61 64 6f 70 74 65 64
20 74 6f 20 70 72 65 76 65 6e 74 2c 20 64 65 74 65 63 74 20 61 6e 64 20 6d 6f 6e 69
74 6f 72 20 75 6e 61 75 74 68 6f 72 69 7a 65 64 20 61 63 63 65 73 73 2c 20 6d 69 73
75 73 65 2c 20 6d 6f 64 69 66 69 63 61 74 69 6f 6e 2c 20 6f 72 20 64 65 6e 69 61 6c
20 6f 66 20 61 20 63 6f 6d 70 75 74 65 72 20 6e 65 74 77 6f 72 6b 20 61 6e 64 20 6e
65 74 77 6f 72 6b 2d 61 63 63 65 73 73 69 62 6c 65 20 72 65 73 6f 75 72 63 65 73 2e
4e 65 74 77 6f 72 6b 20 73 65 63 75 72 69 74 79 20 69 6e 76 6f 6c 76 65 73 20 74 68
65 20 61 75 74 68 6f 72 69 7a 61 74 69 6f 6e 20 6f 66 20 61 63 63 65 73 73 20 74 6f
20 64 61 74 61 20 69 6e 20 61 20 6e 65 74 77 6f 72 6b 20 76 65 72 61 63 72 79 70
74 2c 20 77 68 69 63 68 20 69 73 20 63 6f 6e 74 72 6f 6c 6c 65 64 20 62 79 20 74 68
65 20 6e 65 74 77 6f 72 6b 20 61 20 69 73 20 36 3f 2c 20 62 20 69 73 20 3f 37 2c 20
73 20 69 73 20 3f 2c 20 61 64 6d 69 6e 69 73 74 72 61 74 6f 72 2e 20 55 73 65 72 73
20 63 68 6f 6f 73 65 20 6f 72 20 61 72 65 20 61 73 73 69 67 6e 65 64
```

拿CyberChef转一下可以得到如下内容

![](imgs/image-20260111154151641.png)

```
Network security is an umbrella term to describe security controls, policies, processes and practices adopted to prevent, detect and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.Network security involves the authorization of access to data in a network veracrypt, which is controlled by the network a is 6?, b is ?7, s is ?, administrator. Users choose or are assigned
```

其中给了一个关键的提示：`a is 6?, b is ?7, s is ?`，猜测是Arnold变换的参数

最后爆破得到的参数为：`a = 68, b = 77, s = 8`

![](imgs/image-20260111154751274.png)

`CCC35EF6EC2A7F5C67B2A3DA51C78DBB`

然后再回头去看那个PunkFace\word\document.xml，这个docx很大的原因基本上就是出在这个文件上

这一个xml就有 84.2MB

这里的分析是参考：https://www.aristore.top/posts/PengChengBei2025/#PunkFace-%E6%9C%AA%E5%AE%8C%E6%88%90

`<w:r>`标签中隐写了RGB像素值，可以用如下脚本提取出来

```python
import re
from PIL import Image
import math

def get_closest_dimensions(total):
    root = int(math.sqrt(total))
    for w in range(root, 0, -1):
        if total % w == 0:
            h = total // w
            return w, h
    return 1, total

def main():
    try:
        with open('document.xml', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return

    # 提取被单独封装在一个 Run 里的彩色空格
    pattern = r'<w:r><w:rPr><w:color w:val="([0-9A-Fa-f]{6})"/></w:rPr><w:t xml:space="preserve"> </w:t></w:r>'

    colors = re.findall(pattern, content)
    total_pixels = len(colors)

    if total_pixels == 0:
        return

    # 计算宽高
    w_base, h_base = get_closest_dimensions(total_pixels)

    dimensions = [(w_base, h_base)]
    if w_base != h_base:
        dimensions.append((h_base, w_base))

    for _, (width, height) in enumerate(dimensions):
        img = Image.new('RGB', (width, height))

        for i in range(total_pixels):
            hex_color = colors[i]
            r = int(hex_color[0:2], 16)
            g = int(hex_color[2:4], 16)
            b = int(hex_color[4:6], 16)

            x = i % width
            y = i // width
            img.putpixel((x, y), (r, g, b))

        img.save('result.png')

if __name__ == '__main__':
    main()
```

运行以上脚本后可以得到下图

![](imgs/image-20260111155738944.png)

图片的宽高也很可疑，是1024x1024的，并且每个像素点都是RGB，因此总大小就是3MB

写个脚本提取一下

```python
from PIL import Image

img = Image.open("result.png")
w,h = img.size
pixel_list = []

for y in range(h):
    for x in range(w):
        r,g,b = img.getpixel((x,y))
        # pixel_list.append((r,g,b))
        pixel_list.append(hex(r)[2:].zfill(2))
        pixel_list.append(hex(g)[2:].zfill(2))
        pixel_list.append(hex(b)[2:].zfill(2))


hex_data = ''.join(pixel_list)
byte_data = bytes.fromhex(hex_data)

with open("output", "wb") as f:
    f.write(byte_data)

# print(pixel_list[:100])
```

结合之前得到的那串字符串，以及这个文件大小，猜测是VC加密容器，挂载密钥就是 `CCC35EF6EC2A7F5C67B2A3DA51C78DBB`

挂载后可以得到一张 punkworld.png

![](imgs/image-20260111161503439.png)

发现是打乱过的拼图，一共16x16=256块碎片，直接用工具拼一下图即可得到最后的flag

`flag{0671b07f6b7908bd718dc969b056ab26}`

![](imgs/image-20260111162109683.png)


## 题目名称 time

> What time is it?（flag 为全小写）

题目附件给了个elf可执行文件

远程交互题，大概意思就是给你base64，解码出来是张带有时间的图片，需要在2秒内告诉远程，图片中显示的是几点

题目本身不难，就是根据题意写脚本+明文攻击

比赛已结束，我这里无法复现，感兴趣的师傅可以参考 [这篇文章](https://bili33.top/posts/CTF-PCB2025-Preliminary-Round-Writeup/#time-Solved)



---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/8bf5633/  

