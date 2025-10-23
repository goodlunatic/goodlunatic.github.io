# CTF-Misc Guide

**最开始接触CTF时，学的最多的就是Misc，各种编码与加密还有各种软件的使用等等**

**但Misc涉及的范围实在太广了，于是就想着一边学习一边记录，因而就有了这篇文章**

<!--more-->

{{< admonition type=success title="阅前须知" open=true >}}

**文章更新周期较长，如有疏漏，欢迎指正**

**若你也对Misc感兴趣或者对本文中的内容有疑问，欢迎加入我的交流群**

**进群后可第一时间获取文章后续更新，入群详见 [About](https://goodlunatic.github.io/about/)** 

**文章创作不易，感谢你能看到这里，转载还请标明出处**

{{< /admonition >}}

## 一些奇奇怪怪的经历：

1、rockstar 编程语言，在github上面可以找到，然后在本地用pip安装库，把rock文件转换为py文件，运行即可得到flag

2、给你一个.exe安装包文件，flag藏在安装之前的一大串协议中

3、实在做不出来的时候，可以把flag的格式转其他的编码和题目中的信息比对找规律

4、给你一个gpx文件，在线网站https://www.gpsvisualizer.com/map_input解密，然后地名的首字母连起来就是flag

## CTF中的常用关键词

```python
# 要搜索的字符列表
search_items = [
    "key", "password", "dasctf", "k3y", "p@ssword", "passw0rd",
    "p@ssw0rd", "secret", "s3cret", "s3cr3t", "s3cre4","F14ggg",
    "Ic4unq1U", "ISCC"
    # 遇到⼀个加⼀个，CTFer的好习惯
]
```

查找的Python代码：

```python
import re

# 要搜索的字符列表
search_items = [
    b"key", b"password", b"dasctf", b"k3y", b"p@ssword", b"passw0rd",
    b"p@ssw0rd", b"secret", b"s3cret", b"s3cr3t", b"s3cre4",b"F14ggg"
    # 遇到⼀个加⼀个，CTFer的好习惯
]

file_path = "test.txt"

with open(file_path,'rb') as f:
    data = f.read()
    
for item in search_items:
    # re.escape(item) 用于转义 item 中的特殊字符, 确保它们被当作普通字符处理
    # re.IGNORECASE 标志使得匹配不区分大小写。
    regex = re.compile(re.escape(item) + b'.*', re.IGNORECASE)
    for match in regex.finditer(data): # finditer 返回一个迭代器，每次迭代返回一个匹配对象
        matched_text = match.group() # 返回匹配到的完整文本
        # 若匹配到，则显示前50个字节
        print(f"[+] Found {item.decode()} match: {matched_text[:50]}...")
```

```python
# 各种常用关键字的bash64编码
flag                          Zmxh
F14g                          RjE0
DASCTF                        REFTQ1RGe
s3cr3t                        czNjcjN0
secret                        c2VjcmV0
password                      cGFzc3dvc
PNG文件头                      iVBORw0KGgo
ZIP文件头                      UEsDBA
```


## 各种文件头/尾：

这里要注意，出题人可能会把文件头的小写字母偷偷改成大写，例如：Rar -> RAR

```python
zip 文件头：50 4B 03 04 14 00 08 00
rar 文件头：52 61 72 21 (Rar!)               文件尾：C4 3D 7B 00 40 07 00
7z  文件头：37 7A BC AF 27 1C
gz 文件头：1F 8B 08 00

png 文件头：89504E47 0D0A1A0A 0000000D 49484452   文件尾：00000000 49454E44 AE426082
jpg 文件头：FF D8 FF E0 00 10 4A 46 49 46 00 01
gif 文件头：47 49 46 38 39 61（GIF89A）或 47 49 46 38 37 61（GIF87A）    文件尾：00 3B
bmp 文件头：42 4D
psd 文件头：38 42 50 53
TIFF 文件头：49 49 2A 00

mp3 文件头：49 44 33 03 00 00 00 00
wav 文件头：57 41 56 45 或 52 49 46 46
mid 文件头：4D 54 68 64
avi 文件头：41 56 49 20
mov 文件头：00 00 00 20 66 74 79 70 71 74 20 20 20 05 03 00
swf 文件头：46 57 53 08 AC 43 00 00

pyc 文件头：03 F3 0D 0A
MS-Office2003 文件头：D0 CF 11 E0
xml 文件头：3C 3F 78 6D 6C
html 文件头：68 74 6D 6C 3E
CAD (dwg)，文件头：41433130
Rich Text Format (rtf)，文件头：7B5C727466
Email [thorough only] (eml)，文件头：44656C69766572792D646174653A
Outlook Express (dbx)，文件头：CFAD12FEC5FD746F
Outlook (pst)，文件头：2142444E
MS Access (mdb)，文件头：5374616E64617264204A
WordPerfect (wpd)，文件头：FF575043
Postscript (eps.or.ps)，文件头：252150532D41646F6265
Adobe Acrobat (pdf)，文件头：255044462D312E
Quicken (qdf)，文件头：AC9EBD8F
Windows Password (pwl)，文件头：E3828596
Real Audio (ram)，文件头：2E7261FD
Real Media (rm)，文件头：2E524D46
MPEG (mpg)，文件头：000001BA 或 000001B3
Quicktime (mov)，文件头：6D6F6F76
Windows Media (asf)，文件头：3026B2758E66CF11
M4a，文件头：00000018667479704D3441
```

## 各种加密/编码：

### 进制转换

#### 二进制

首先我们要知道可打印字符(包括空格)的Ascii码的范围在 `32-126`

因此在二进制的情况下，应该在 `00100000 - 01111110` 这个范围

所以当我们拿到一串经过变换的二进制字符串，可以根据这个范围来猜测变换

举个例子：

```python
data = "1100001 000011 0111011 1110011 0100111 001011 0010111 1010111 100011 1000011 0010111 1001011 1111011 0111011 100001 100001 1001101 000011 1010111 1111101 0001011 1000011 0110111 110011 1111101 0000111 1000011 1100111 1100111 1010011 0010011 1111101 0010111 0001011 110011 1111101 0110011 1001011 0100111 1100111 0010111 1111101 0011011 110011 0110111 1010011 100011 100001 100001".split()
for item in data:
    print(chr(int(item[::-1],2)), end = '')
```

例题1-2023 CISCN初赛 Tough_DNS

#### 四进制

```python
from Crypto.Util.number import long_to_bytes

data = "121212301201121313230311120103100320030212011210121102310301030012111210023103100321030003110231120103200320031202310303031203210320031003121210030203131201030003201331"

print(long_to_bytes(int(data,4)))
# b'flag{5a482ade-10ed-4905-a886-369846d27a08}'
```

例题1-2025 能源网络安全大赛 Bluetooth

例题2-2024 蓝桥杯全国总决赛 nothing 

#### 八进制

```python
from Crypto.Util.number import long_to_bytes

data = ""

print(long_to_bytes(int(data,8)))
```

例题1-2025 上海市赛 两个数

### base家族

详细请看：https://www.cnblogs.com/0yst3r-2046/p/11962942.html

```
1、base16                       flag         666C6167
2、base32[A-Z2-7]               flag         MZWGCZY=
3、base36                       flag         727432
4、base58                       flag         3cr9Ae
5、base64                       flag         Zmxh
6、base85                       flag         Ao(mg
7、base91                       flag         @iH<Z
8、base92                       flag         F#S<I
9、base100(emoji)               flag         👝👣👘👞
10、base1024                    flag
11、base2048                    flag         ڥڊװ
12、base65535                   flag         ꍦ鱡
```

base64还可以换表(表中的字符要求不重复)编码，例如

```
sQ+3ja02RchXLUFmNSZoYPlr8e/HVqxwfWtd7pnTADK15Evi9kGOMgbuIzyB64CJ
SjaoNgS0xgagUTpwe3QwHn4MrbkD/OUwqOQG/bpveg6Mqa4WH0k46
第一行是表，第二行是编码后的密文
cyberchef解密即可得到flag
```

Tips：base64可以与其他文件格式互相转换（比如图片[会有很多行的base64]），使用在线网站或者随波逐流转换即可
如果出现了很多层乱七八糟的base编码，连CyberChef都识别不出来的话，可以试试用BaseCrack这个开源工具
输入 python basecrack.py -m 运行即可

![basecrack](imgs/basecrack.png)

### base64隐写

可以使用以下脚本解密
```python
# base64隐写解密脚本1
import base64
b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
with open('stego.txt', 'rb') as f:
    bin_str = ''
    for line in f.readlines():
        stegb64 = str(line, "utf-8").strip("\n")
        rowb64 = str(base64.b64encode(base64.b64decode(stegb64)), "utf-8").strip("\n")
        offset = abs(b64chars.index(stegb64.replace('=', '')[-1]) - b64chars.index(rowb64.replace('=', '')[-1]))
        equalnum = stegb64.count('=')  # no equalnum no offset
        if equalnum:
            bin_str += bin(offset)[2:].zfill(equalnum * 2)
        print(''.join([chr(int(bin_str[i:i + 8], 2)) for i in range(0, len(bin_str), 8)]))  # 8 位一组
```

```python
# base64隐写解密脚本2
file = open('./base64.txt','r')
a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
aaa = ''
while True:
    text = file.readline()  # 只读取一行内容
    # 判断是否读取到内容
    text = text.replace("\n", "")
    if not text:
        break
    if text.count('=') == 1:
        aaa = aaa + \
            str('{:02b}'.format((a.find(text[len(text)-2])) % 4))
    if text.count('=') == 2:
        aaa = aaa + \
            str('{:04b}'.format((a.find(text[len(text)-3])) % 16))
file.close()
t = ""
ttt = len(aaa)
ttt = ttt//8*8
for i in range(0,ttt,8):
    t = t + chr(int( aaa[i:i+8],2))
print(t)
```

或者直接使用PuzzleSolver解密

![](imgs/image-20241120164908626.png)

> 这里要注意多行base64编码可能会出现需要我们自己补全=的情况（例题-攻防世界 MISC - tunnel）
> 
> 可以使用下面的脚本补全，也可以直接用上面那个工具补全

```python
import re
with open('./result.txt','r') as f:
    content = f.readlines()
    for i in content:
        result = re.findall('(.*?).evil.im',i)
        result = result[0] + (4 - len(result[0])%4) * '='
        with open('./base64.txt','a+') as f1:
            f1.write(result+'\n')
```

### MD5加密

```
明文：admin
32位小写21232f297a57a5a743894a0e4a801fc3 
32位大写21232F297A57A5A743894A0E4A801FC3 
16位小写7a57a5a743894a0e 
16位大写7A57A5A743894A0E 
Tips：十六位其实就是取32位的8-24位
```

MD5 加密后的密文都是十六进制字符

可以尝试在[somd5](https://www.somd5.com/)或者[CMD5](https://cmd5.com/)上反查MD5

### emoji-aes加密

密文由一大串emoji表情组成，解密需要密钥

例如已知key：`th1sisKey`，直接使用[在线网站](https://aghorler.github.io/emoji-aes/)解密即可，也可以下载源码然后本地解密

```
🙃💵🌿🎤🚪🌏🐎🥋🚫😆😍🔬👣🖐🌏😇🥋😇😊🍎🏹👌🌊☃🦓🌏🐅🥋🚨📮🐍🎈📮📂✅🐍⏩⌨🎈😍🌊😇🐍☺💧🥋🍌🎤🍍😇👁🦓😇🍍📮📂🎅😡🍵✖✉🏹⌨🍵🎤😆🍵🚹🏹🍎🚨ℹ☃👑🎤🚪💵😎😀😎🔬💵🦓🏹👉🦓✖😀🐘🔪⌨🎈🥋👌🍌🚹😂✉🍎🍌🏎👌🏹💵👌👁🎃🗒
```

> 如果题目给了emoji但是没给密钥，可能就是base100编码

### 字频爆破

给一段字符串，看着什么编码都不像然后也没啥规律的，可能是字频爆破

可以尝试用在线网站[quipquip](https://quipqiup.com/)进行词频爆破

> 这个的爆破原理就是，我们平常可读的字符串中，某些字母出现的频率是差不多的
> 
> 当我们在解某段密文时不知道具体单表替换的表，也可以尝试直接词频爆破

例题1-2025SUCTF-SU_forensics

### 字频统计

直接用`随波逐流CTF编码工具`统计每个字母出现的次数就行

### 摩斯电码

> 从原理上来说，只要是三种字符构成的编码都有可能是摩斯电码

用 `空格` 或者 `/` 做分隔符，然后字符可以用 `0和1` 或者 `.和-`

下面举几个典型例子：

```
..-. .-.. .- --.  - .... .. ... ..--.- .. ... ..--.- - . ... - ..--.- ..-. .-.. .- --. 
```

```bash
.--/./.-../-.-./---/--/./-/---/-./-.-/-.-./-/..-./--..--/-/...././.--./.-/.../.../.--/---/.-./-../../.../.----/-..../-.../-.--/-/./.../.-./.-/-./-../---/--/.-../-.--/--././-././.-./.-/-/./-../--..-
```

```
# C替换为-, P替换为., D替换为空格即可
CCPPDPCCCDCPDPPCDCPCPDCDPPCPDDCPCPDPCCPDCPPDCPPDPPCCPCDPCCCCDPPPDPPCCPCDCCDCCCCCDPPPCCDPPPDPD
```

### 栅栏(fence)密码

所谓栅栏密码，就是把要加密的明文分成N个一组，然后把每组的第1个字连起来，形成一段无规律的话。栅栏密码可以分为标准型和W型

可以直接用随波逐流或者[在线网站](https://ctf.bugku.com/tool/railfence)解密

有时候题目提示了栅栏密码，不一定是栅栏密码解密，也有可能是要用栅栏密码加密

举个例子：

> 密文: eXV5d2V4eDV0OHc2ejEwNXt5dTgwNXUzMzl5MjcxNDAydn00OHQ=
> 
> base64_deocde: yuywexx5t8w6z105{yu805u339y271402v}48t
> 
> W型栅栏加密(偏移量为3): yetz{03728uwx58615y8539210v4tyxw0uuy4}
> 
> 凯撒密码: flag{03728bde58615f8539210c4afed0bbf4}

### vigenere(维吉尼亚)密码

1、给了密文和密钥：

可以用`cyberchef`或者[在线网站](https://ctf.bugku.com/tool/vigenere)解密

2、给了密文，没给密钥：

可以尝试用[在线网站](https://www.guballa.de/vigenere-solver)爆破

3、给了密文，没给密钥，但是知道明文的前几位：

可以根据对照表，手搓密钥的前几位，说不定就找到规律直接解出来了

![vigenere](imgs/vigenere.png)
4、给了密钥字典，直接写脚本爆破

```python
from pycipher import Vigenere

cipher = "rla xymijgpf ppsoto wq u nncwel ff tfqlgnxwzz sgnlwduzmy vcyg ib bhfbe u tnaxua ff satzmpibf vszqen eyvlatq cnzhk dk hfy mnciuzj ou s yygusfp bl dq e okcvpa hmsz vi wdimyfqqjqubzc hmpmbgxifbgi qs lciyaktb jf clntkspy drywuz wucfm"

with open("keys.txt","r") as f:
    lines = f.readlines()

for line in lines:
    key = line.strip()
    res = Vigenere(key).decipher(cipher)
    if "PASSWORD" in res:
        print(f"[+] key: {key}")
        print(f"[+] res: {res.lower()}")
```

### 希尔密码

解密网站:http://www.metools.info/code/hillcipher243.html

已知密文和密钥，并且密钥(key)是一个网址，如http://www.verymuch.net

已知密文和密钥，并且密钥是四个数字

```
密文：ymyvzjtxswwktetpyvpfmvcdgywktetpyvpfuedfnzdjsiujvpwktetpyvnzdjpfkjssvacdgywktetpyvnzdjqtincduedfpfkjssne
密钥：3 4 19 11
```

### Rabbit加密

通常题目会提示是用`Rabbit加密`，然后密文通常以`U2FsdGVkX1`开头，其实就是`Salted`加盐了

直接[在线网站](https://www.sojson.com/encrypt_rabbit.html)解密即可

### 云影密码

特征是：密文只由01248组成

用`随波逐流CTF编码工具`解密或者用下面的脚本解密

> 云影密码的原理就是：以0作为分隔符分组，然后把每组数字相加得到一个数字，这个数字对应的就是26字母中的下标

```python
# 云影密码
ciphey="8842101220480224404014224202480122"
enc_list=ciphey.split('0')
res=[]
print(enc_list)
for item in enc_list:
    sum=0
    for num in item:
        sum += int(num)
    res.append(chr(sum+64))
print(''.join(res))

```

### 曼彻斯特与差分曼彻斯特编码


![](imgs/image-20240529203318823.png)

> 1. 曼彻斯特码：从高到低表示 1，从低到高表示 0
> 2. 差分曼彻斯特码：在每个时钟周期的起始处（虚线处）有跳变表示 0；无跳变则表示1。

可以直接使用 曼彻斯特编码 转换工具转换

![](imgs/image-20240529203746999.png)

例题1 2016CISCN-传感器1

> 5555555595555A65556AA696AA6666666955
> 
> 这是某压力传感器无线数据包解调后但未解码的报文(hex)
> 
> 已知其ID为0xFED31F，请继续将报文完整解码，提交hex。
> 
> 提示1：曼联

```python
enc = "5555555595555A65556AA696AA6666666955"
res = ''
flag = ''
flag_final = ''
for item in enc:
    # tmp = bin(int(item, 16))[2:].rjust(4, '0')
    # print(tmp, end=' ')
    res += str(bin(int(item, 16))[2:].rjust(4, '0'))
# print(res)
for i in range(0, len(res), 2):
    if res[i:i+2] == '01':
        flag += '1'
    elif res[i:i+2] == '10':
        flag += '0'
# print(flag)
# 这里需要每8位进行一次反转，要不然无法得到校验ID:0xFED31F
for i in range(0, len(flag), 8):
    flag_final += hex(int(flag[i:i+8][::-1], 2))[2:]

print(flag_final.upper())
# FFFFFED31F645055F9
```

例题2 2016CISCN-传感器2

> 现有某ID为0xFED31F的压力传感器，已知测得  
> 压力为45psi时的未解码报文为：5555555595555A65556A5A96AA666666A955  
> 压力为30psi时的未解码报文为：5555555595555A65556A9AA6AA6666665665  
> 请给出ID为0xFEB757的传感器在压力为25psi时的解码后报文

和上面那题的思路一样，就是最后多了一步压力位算法和校验位算法猜测

压力位算法：压力每增加5psi压力值增加11

校验位算法：校验值为从ID开始每字节相加的和模256的十六进制值即为校验值

例题3 2017CISCN-传感器1

> 已知ID为0x8893CA58的温度传感器的未解码报文为：3EAAAAA56A69AA55A95995A569AA95565556  
> 此时有另一个相同型号的传感器，其未解码报文为：3EAAAAA56A69AA556A965A5999596AA95656  
> 请解出其ID，提交flag{不含0x的hex值}

开头的3E提示了差分曼彻斯特编码，就是根据上图中的跳变位置解码

```python
# enc = "3EAAAAA56A69AA55A95995A569AA95565556"
enc = "3EAAAAA56A69AA556A965A5999596AA95656"
res = ''
flag = ''
flag_final = ''
for item in enc:
    # tmp = bin(int(item, 16))[2:].rjust(4, '0')
    # print(tmp, end=' ')
    res += str(bin(int(item, 16))[2:].rjust(4, '0'))
print(res)
for i in range(8, len(res), 2):
    if res[i:i+2][0] != res[i-1]:
        flag += '0'
    else:
        flag += '1'
print(hex(int(flag, 2))[2:].upper())
# 24D8845ABF34119
# 8845ABF3
```

例题4 2017CISCN-传感器2

> 已知ID为0x8893CA58的温度传感器未解码报文为：3EAAAAA56A69AA55A95995A569AA95565556  
> 为伪造该类型传感器的报文ID（其他报文内容不变），请给出ID为0xDEADBEEF的传感器1的报文校验位（解码后hex）
> 
> 以及ID为0xBAADA555的传感器2的报文校验位（解码后hex），并组合作为flag提交。  
> 例如，若传感器1的校验位为0x123456，传感器2的校验位为0xABCDEF，则flag为flag{123456ABCDEF}。

解码步骤和上题一样，就是多考察了一个校验位算法（CRC8）

在最后的结果前面补一个0，然后再计算 CRC8 即可

### 社会主义核心价值观密码

密文由社会主义核心价值观种的词语构成

直接用[在线网站](https://ctf.bugku.com/tool/cvecode)或者`随波逐流CTF编码工具`解密即可

当然也可以写Python脚本调用第三方模块解密

### 音乐符号加密

> Tips：这里要注意，加密的密文一定是以 = 结尾的，有时候需要自己把=加上

eg：♭♯♪‖¶♬♭♭♪♭‖‖♭♭♬‖♫♪‖♩♬‖♬♬♭♭♫‖♩♫‖♬♪♭♭♭‖¶∮‖‖‖‖♩♬‖♬♪‖♩♫♭♭♭♭♭§‖♩♩♭♭♫♭♭♭‖♬♭‖¶§♭♭♯‖♫∮‖♬¶‖¶∮‖♬♫‖♫♬‖♫♫§=

直接用在线网站解密即可：https://www.qqxiuzi.cn/bianma/wenbenjiami.php?s=yinyue

### 敲击码

![敲击码](imgs/敲击码.jpeg)
```
5,2   3,1  3,1  3,2 
 W     L    L    M
```

### 博多码

> 最明显的特征就是五位二进制一组

```
11011 10101 10101 10101 11111 01110 11011 10101 10111 10101 00111 00111 11111 11001 11011 10000 00111 00001 10110 00111 00111 00111 00111 00111 00111 10000 11111 01101 11011 01010 11111 01001 11011 00001 10111 00111 00001 10101 00001 10000 11111 01101 11011 01010 11111 01001 11011 01010 10110 00111 00001 00111 01010 00001 00001 00111 10011 00001 00001 00001 00001 00001 00001 10011 10111 10011 10111 10011 10111 00111 11111 01001
```

直接用`随波逐流CTF编码工具`解密即可

例题1-2025宁波市赛-吾的字节

### 格雷码

```python
def binary_to_gray(binary_str):
    """将两位二进制转换为两位格雷码"""
    if len(binary_str) != 2:
        raise ValueError("输入必须是两位二进制")
    # 格雷码转换：第一位不变，第二位是第一位和第二位的异或
    gray = binary_str[0] + str(int(binary_str[0]) ^ int(binary_str[1]))
    return gray
```

例题1-2025上海市赛 两个数

### Polybius密码(波利比奥斯方针密码)

类似于`11，22，11，24`这样的

逗号改成空格，拉入随波逐流CTF编码工具直接解密即可


### RC4加密算法

举个例子：

```
密文：VWap58FvOtV1VNlmdcyKiaNVhPsWQRFYqt/duezhcddcVXmz5zhQyoc7
密钥：20250606
明文：flag{edb99a94-f84d-e175-8a7d-e7f658789447}
```

### DES加密算法

DES加密算法的密钥是8字节，举个例子：
```
密文：AK5O3BaZi+p1ci0JxythDZWToTXkFj4dexQ3cOAmYfUwtUVyJahFOcNroC8nAsHyCnmiuOOpJYyOWBV5npW3pg==
密钥：hristina
```

直接用在线网站解密即可

![](imgs/image-20241105212634286.png)

DES由于安全性上的问题，后来逐渐被AES所替代，详细可以参考[这篇文章](https://crypto.stackexchange.com/questions/7938/may-the-problem-with-des-using-ofb-mode-be-generalized-for-all-feistel-ciphers)

因此DES存在以下四个弱密钥，当题目没给密钥的时候可以用下面几个试试

```
b'\x00\x00\x00\x00\x00\x00\x00\x00'
b'\x1E\x1E\x1E\x1E\x0F\x0F\x0F\x0F'
b"\xE1\xE1\xE1\xE1\xF0\xF0\xF0\xF0"
b"\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF"
```

当然这里也可以延伸出去，用下面这个脚本去爆破密钥

```python
from Crypto.Cipher import DES
from itertools import product
from base64 import b64decode

BYTES = [b'\x1E', b'\xE1', b'\xF0', b'\x0F', b'\x00', b'\xFF']

def generate_keys():
    byte_combinations = product(BYTES, repeat=8)
    for combo in byte_combinations:
        yield b''.join(combo)

def brute_force_decrypt(encrypted_data):
    for key in generate_keys():
        cipher = DES.new(key, DES.MODE_ECB)
        try:
            decrypted = cipher.decrypt(encrypted_data)
            if decrypted.startswith(b"FLAG"):
                print(f"Found valid key: {key}")
                print(f"Decrypted data: {decrypted}")
                return key
        except:
            continue
    return None

encrypted_data = b64decode("ftNbIBh+yU8rzOhvbAplhB1hoQkblsKa+uGaNnTudD2LGw0+5fOHXycXZDujJFWwHZjIg5bfDpKFsqI18Ts7ZGG8dpqWAzar")
found_key = brute_force_decrypt(encrypted_data)
if not found_key:
    print("No valid key found.")
```


### AES加密算法

可以尝试用`CyberChef`或者在线网站解密：
```
https://tool.lmeee.com/jiami/aes
https://www.sojson.com/encrypt_aes.html
https://the-x.cn/cryptography/aes.aspx
```

> 因为 AES 的密钥长度可以是 16/24/32 字节，即 128/192/256位
> 
> 因此解不出来的时候可以试试 Padding \x00 到更长的位数
> 
> 例如下面这道题：
> 
> AES-ECB 密文：q8TTfmlBwyT1QPLiZS9ixWKzS5h7aYgOUlaxNMJmE763AIoZ66FRHXFeYYWZBbLn
> 
> AES-ECB 密钥：MySuperSecretKey!
> 
> 需要把密钥用 \x00 Padding 到 32 字节才能正确解密

#### AES-ECB(不需要IV)

如果 `key` 不足16字节可以尝试在后面补0

#### AES-CBC(需要IV)

> Tips: CBC模式下key的长度必须是16bytes的整数倍，但是IV不一定

![](imgs/image-20241116212331838.png)

密钥不足16字节时需要padding补齐16字节

可以使用能自动补齐的在线网站解密 https://www.sojson.com/encrypt_aes.html

![](imgs/aes1.png)

也可以用`CaptfEncoder-win-x64-1.3.0`解密

![](imgs/aes2.png)

如何使用openssl进行加解密

```bash
# ==================== 加密命令 ====================
tar -czvf - flag | openssl des3 -salt -k th1sisKey -out ./flag.tar.gz
# 功能：打包压缩文件并用3DES加密
# 参数说明：
#   tar: 
#     -c 创建归档
#     -z 使用gzip压缩 
#     -v 显示过程
#     -f - 输出到stdout
#   openssl:
#     des3 使用3DES算法
#     -salt 添加随机盐值
#     -k 密码(此处为th1sisKey)
#     -out 输出文件

# ==================== 解密命令 ==================== 
openssl des3 -d -salt -k th1sisKey -in ./flag.tar.gz -out decrypted_file
# 功能：解密3DES加密的文件
# 参数说明：
#   openssl:
#     -d 解密模式
#     -in 输入文件
#     -out 输出文件
```

### 国密(SM)系列加密算法

|   算法    | 算法类型  |   密钥类型   |  长度（位）   |   长度（字节）   |         备注         |
| :-----: | :---: | :------: | :------: | :--------: | :----------------: |
| **SM4** | 对称加密  |    密钥    | 128 bits | **16 字节**  |        固定长度        |
| **SM2** | 非对称加密 |    私钥    | 256 bits | **32 字节**  |    固定长度（一个大整数）     |
|         |       | 公钥（原始值）  | 512 bits | **64 字节**  |   两个32字节的整数（x，y）   |
|         |       | 公钥（编码后）  |    -     | 65 或 33 字节 | 常见带`0x04`前缀的为65字节  |
| **SM9** | 非对称加密 | 主密钥/用户密钥 |    可变    |   **可变**   | 取决于安全参数，通常远长于SM2密钥 |

![](imgs/image-20250819214101200.png)


### 埃特巴什码(Atbash)

例如下面这段密文

```
WZHXGU{5v0u98z95u79829y7z484z54066xy08u}
DASCTF{5e0f98a95f79829b7a484a54066cb08f}
```

直接用`CyberChef`或者`随波逐流CTF编码工具`解密即可

```
flag{ ==> Atbash加密 ==> UOZT{
```

### DNA编码

```
AATTCAACAACATGCTGC
```

1、使用CTFD中的DNAcode脚本解密

https://github.com/omemishra/DNA-Genetic-Python-Scripts-CTF

2、网上找的脚本（红明谷杯2023——hacker）

```python
table = 'ACGT'
dic = {'AAA': 'a', 'AAC': 'b', 'AAG': 'c',
       'AAT': 'd', 'ACA': 'e', 'ACC': 'f', 'ACG': 'g', 'ACT': 'h', 'AGA': 'i', 'AGC': 'j', 'AGG': 'k', 'AGT': 'l', 'ATA': 'm', 'ATC': 'n', 'ATG': 'o', 'ATT': 'p', 'CAA': 'q', 'CAC': 'r', 'CAG': 's', 'CAT': 't', 'CCA': 'u', 'CCC': 'v', 'CCG': 'w', 'CCT': 'x', 'CGA': 'y', 'CGC': 'z', 'CGG': 'A', 'CGT': 'B', 'CTA': 'C', 'CTC': 'D', 'CTG': 'E', 'CTT': 'F', 'GAA': 'G', 'GAC': 'H', 'GAG': 'I', 'GAT': 'J', 'GCA': 'K', 'GCC': 'L', 'GCG': 'M', 'GCT': 'N', 'GGA': 'O', 'GGC': 'P', 'GGG': 'Q', 'GGT': 'R', 'GTA': 'S', 'GTC': 'T', 'GTG': 'U', 'GTT': 'V', 'TAA': 'W', 'TAC': 'X', 'TAG': 'Y', 'TAT': 'Z', 'TCA': '1', 'TCC': '2', 'TCG': '3', 'TCT': '4', 'TGA': '5', 'TGC': '6', 'TGG': '7', 'TGT': '8', 'TTA': '9', 'TTC': '0', 'TTG': ' '}
cipher = 'TCATCAACAAAT'
plain = ''
for i in range(0, len(cipher), 3):
    plain += dic[cipher[i:i+3]]
print(plain)
```

3、使用在线网站解密（例题-BUGKU-粉色的猫）

DNA编码在线解密：https://earthsciweb.org/js/bio/dna-writer/

![](imgs/image-20241121212750865.png)

### 金笛短信PDU编码

直接使用在线网站解码：http://www.sendsms.cn/pdu/ （特别注意：需要一行一行地解码）

形如下面这串数字

```
0001000D91683106019196F4000872003800390035003000340045003400370030004400300041003100410030004100300030003000300030003000300044003400390034003800340034003500320030003000300030003000300034003700300030003000300030003000300038003000380030003200300030003000300030
0001000D91683106019196F4000872003000320034004400430037003500460031003000300030003000300030004200430034003900340034003400310035003400370038003500450044004400390032003400310031003200380035003300300030003800340033004200390031003900460037003300460031003500390046
0001000D91683106019196F400087000380034004600410038003700310032003100370036004500370034003500310032003600450033004400340041003600320044003700390035003500420033003800380032003100310037003900390042004200320045004100420039003500410036004200330042004200450037
0001000D91683106019196F400086E0042003600300039003900330045004500360033004600320036004600440044003100420043004400410042003300300033003300310046004500350045003600440039003300370035004200300036003500360036004100320031003000410033004100420037003100440038
0001000D91683106019196F400087000450033004400370032003100300031004400420034003900310036003900360038003000310033003200340046003800450046003200380034004500420033003500430030004600420036003400450046003100300030004100310042004100300043003200300044004400450042
0001000D91683106019196F400086E0038003400410032004200440038004200350038004200330039004500410043003600450030004100420031003000380044003600440036004600340034004300460044003800310044003000330042003600390034004200430039003400430032003300310033004400340046
0001000D91683106019196F400087000360038003900390031003600440036003200360041003700390035003800460035004300440039003500390042004500320038004300340034003300410045003700360043003100300035003800380030003200380035003900320039003600310042004600430044003400300044
0001000D91683106019196F4000872003100350037004600310033003400310033003800390043004600410042003600410045003500460032003300300038003700370035004500380031004500420032003000330030004300300035003000340037003500310044003900460041003400450045004600320032004600440030
0001000D91683106019196F400085200300037004400450044003500420036003800410033003100350046004400310031003000300030003000300030003000300034003900340035003400450034003400410045003400320036003000380032
```

一行一行解码后可以得到

![](imgs/image-20241121214741210.png)

```
89504E470D0A1A0A0000000D494844520000004700000008080200000024DC75F1000000BC49444154785EDD92411285300843B919F73F159F84FA8712176E745126E3D4A62D7955B388211799BB2EAB95A6B3BBE7B60993EE63F26FDD1BCDAB30331FE5E6D9375B06566A210A3AB71D8E3D72101DB491696801324F8EF284EB35C0FB64EF100A1BA0C20DDEB84A2BD8B58B39EAC6E0AB108D6D6F44CFD81D03B694BC94C2313D4F689916D626A7958F5CD959BE28C443AE76C10588028592961BFCD40D157F1341389CFAB6AE5F2308775E81EB2030C0504751D9FA4EEF22FD007DED5B68A315FD110000000049454E44AE426082
```

例题-BUGKU-粉色的猫

### Text Encoding Brute Force

如果赛博厨子转完两次Hex后依然是乱码，可以用`Text Encoding Brute Force`爆破试试看

例子：红明谷杯2023——阿尼亚

### Decabit编码

正常的 Decabit编码 是十个字符一组的，如果不是十个一组，就很可能不是 Decabit编码

```
+-+-++--+- ++---+-++- -+--++-++- +--++-++-- --+++++--- ++-++---+- +++-+-+--- +-+-+---++ ---+++-++- -+--++-++- -+--+++-+- -+--++-++- -+--++-++- ++-+-+-+-- -+--+++-+- ++-++---+- -++++---+- -+--++-++- ++-+-+-+-- +-+++---+- +++-++---- ---+++-++- +-+-+---++ ++-+-+-+-- +-+-+--++- ++--+--++- -++++---+- +---+++-+- ++-+-+-+-- -++++---+- -+--+++-+- +--+-+-++- +++-+-+--- +-+++---+- -+--+-+++- -+--++-++- ---+++-++- ++++----+- -++++---+- -+--+++-+- -+--++-++- ----+++++-
```

直接使用 [在线网站](https://www.dcode.fr/decabit-code) 解密即可

如果不是Decabit编码，可以试试看把+-分别用01替换 (例题1-2023楚慧杯-Easy_zip）

### 仿射密码

密钥有两个参数a和b，a为必须是`1,3,5,7,9,11,15,17,19,21,23,25`中的一个(与26互质)

b可以是0到25之间的任意整数

可以使用[在线网站](http://www.hiencode.com/affine.html)或者`随波逐流CTF编码工具`解密

```
gezx{j13p5oznp_1t_z_900y_k3z771h_k001}
密钥：a=17 b=77
flag{w13e5hake_1s_a_900d_t3a771c_t001}
```

### Brainfuck和Ook!编码

可以直接用以下几个在线网站解密：

https://www.splitbrain.org/services/ook

https://www.geocachingtoolbox.com/index.php?lang=en&page=brainfuckOok

https://www.cachesleuth.com/bfook.html


![](imgs/image-20250421200218788.png)

#### Brainfuck

```
+++++ +++++ [->++ +++++ +++<] >++.+ +++++ .<+++ [->-- -<]>- -.+++ +++.<
++++[ ->+++ +<]>+ +++.- ----- -.<++ +[->- --<]> ---.+ .<+++ [->++ +<]>+
.<+++ +[->- ---<] >---- .<+++ [->++ +<]>+ .<+++ [->++ +<]>+ .<+++ +[->-
---<] >---- .<+++ +[->+ +++<] >++++ +.<++ +[->- --<]> ----- -.<++ +[->+
++<]> +++++ .+.<+ +++[- >---- <]>-- ---.+ +++++ +.+++ +++.< +++[- >---<
]>--. +++++ +.<++ ++[-> ++++< ]>+++ +++.< 
```

#### Ook!

```
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook! Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook! Ook! Ook! Ook!
Ook! Ook! Ook? Ook. Ook? Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook? Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook! Ook! Ook! Ook! Ook! Ook! Ook!
Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook?
Ook. Ook? Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook. Ook.
Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook.
Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook.
Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook!
Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook? Ook. Ook? Ook!
Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook.
Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook.
Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook! Ook!
Ook! Ook! Ook! Ook! Ook! Ook! Ook? Ook. Ook? Ook! Ook. Ook? Ook! Ook! Ook!
Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook!
Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook? Ook. Ook? Ook! Ook. Ook?
Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook?
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook.
Ook. Ook. Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook. Ook. Ook! Ook. Ook? Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook! Ook! Ook!
Ook! Ook! Ook! Ook! Ook! Ook? Ook. Ook? Ook! Ook. Ook? Ook! Ook! Ook! Ook!
Ook! Ook! Ook! Ook! Ook! Ook! Ook! Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook! Ook? Ook.
Ook? Ook! Ook. Ook? Ook! Ook! Ook! Ook! Ook! Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook! Ook? Ook! Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook? Ook. Ook? Ook! Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook.
Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook. Ook? Ook. 
```

#### short Ook!

```
..... ..... ..... ..... !?!!. ?.... ..... ..... ..... .?.?! .?... .!...
..... ..... !.?.. ..... !?!!. ?!!!! !!?.? !.?!! !!!.. ..... ..... .!.?.
..... ...!? !!.?. ..... ..?.? !.?.. ..... .!.!! !!!!! !!!!! !!!.? .....
..!?! !.?!! !!!!? .?!.? !!!!! !!... !.?.. ..... !?!!. ?.... ..?.? !.?..
!.?.. ..... ..!?! !.?!! !!!!! !?.?! .?!!! !!!!! !.?.. ..... !?!!. ?....
..?.? !.?.. !.?.. ..... !?!!. ?.... ..?.? !.?.. !.?.. ..... ..!?! !.?!!
!!!!! !?.?! .?!!! !!!!! !.?.. ..... ..!?! !.?.. ..... .?.?! .?... .....
..!.? ..... ..!?! !.?!! !!!!? .?!.? !!!!! !!!!! !!!.? ..... ..!?! !.?..
....? .?!.? ..... ..... !...! .?... ..... .!?!! .?!!! !!!!! ?.?!. ?!!!!
!!!!! !!... ..... ..... ..!.. ..... ..... .!.?. ..... .!?!! .?!!! !!!?.
?!.?! !!!!. ..... ..... ..!.? ..... ....! ?!!.? ..... ...?. ?!.?. .....
..... .!.?. 
```

有时候flag可能会被删去，导致直接在线网站解密看不到flag，需要我们到内存中查看被删除的内容

因此可以用下面这个代码输出之前放在内存中的内容

```c
#define  _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
char s[30000]={0};
char code[2000];
int len = 0;
int stack[10000];
int stack_len=0;
int main()
{
    char c;
    int i=0,j,k,x=0;
    FILE* f;
    char* p=s+10000;
    f=fopen("./bf.txt","r");
    while(fread(&code[len],1,1,f)==1)
	{
        len++;
    }
    setbuf(stdout,NULL);
    while(i<len) {
        switch(code[i]) {
            case '+':
                (*p)++;
                break;
            case '-':
                (*p)--;
                break;
            case '>':
                p++;
                break;
            case '<':
                p--;
                break;
            case '.':
                putchar((int)(*p));
                break;
            case ',':
                *p=getchar();
                break;
            case '[':
                if(*p) {
                    stack[stack_len++]=i;
                } else {
                    for(k=i,j=0;k<len;k++) {
                        code[k]=='['&&j++;
                        code[k]==']'&&j--;
                        if(j==0)break;
                    }
                    if(j==0)
                        i=k;
                    else {
                        fprintf(stderr,"%s:%dn",__FILE__,__LINE__);
                        return 3;
                    }
                }
                break;
            case ']':
                i=stack[stack_len-- - 1]-1;
                break;
            default:
                break;
        }
        i++;
        x++;
    }
    for(int i = 0; i < stack_len; i++) {
		printf("%c", stack[i]);
	}
    printf("\n");
    for(int i = 0; i < 30000; i++) {
		printf("%c", s[i]);
	}
    return 0;
}
```

### Gronsfeld密码

1、可以直接使用这个[在线网站](https://www.boxentriq.com/code-breaking/gronsfeld-cipher)解密或爆破

2、也可以写Python脚本解密

```python
# 解密脚本
from pycipher import Gronsfeld

cipher = 'TGLBOMSJNSRAJAZDEZXGHSJNZWHG'
key = [1,50,61,8,9,20,63,41]
secret = Gronsfeld(key).decipher(cipher)

print(secret)
```

### UUencode编码

看起来有点像base85编码，可以直接使用[在线网站](https://ctf.bugku.com/tool/uuencode)或者`随波逐流CTF编码工具`解密

```
=8S4U,3DR8SDY,C`S-F5F-C(S,S<R-C`Q9F8S87T`
# c55192c992036ef623372601ff3a}
```

### AAencode编码

可以直接使用[在线网站](https://ctf.bugku.com/tool/uuencode)或者`随波逐流CTF编码工具`解密

### XXencode编码

可以直接使用[在线网站](https://ctf.bugku.com/tool/uuencode)或者`随波逐流CTF编码工具`解密

例题1-2023浙江省赛决赛-签到

### 无字天书(whitespace)或者snow隐写

一个文件打开都是空白字符

whitespace可以使用[在线网站](https://vii5ard.github.io/whitespace/)解密，复制进去直接run即可

snow隐写可以下载源码，然后到根目录下运行 `SNOW.EXE -C -p password flag.txt` 命令即可

> Tips：snow隐写有时候可以不全是空白字符，然后也可以无密码，如果懒得敲命令行可以直接用下面这个工具

![](imgs/image-20250421200534255.png)

### 零宽字符隐写

可以用在线网站解密，也可以用`PuzzleSolver`解密

![](imgs/image-20250421200734831.png)

```
# 几个解零宽比较好用的在线网站，也可以下载源码到本地
https://www.wetools.com/text-cloaking
https://330k.github.io/misc_tools/unicode_steganography.html
https://www.mzy0.com/ctftools/zerowidth1/
https://yuanfux.github.io/zero-width-web/
```

如果网站默认的字符集解不出来，可以尝试先在vim里查看，看看都有哪些字符

![](imgs/image-20250828223508020.png)

然后再到解码网址上勾选对应字符

![](imgs/image-20250828223608794.png)

### 中文电报（中文电码）

类似于下面这种四位数一组的编码，直接在线网站或`随波逐流CTF编码工具`解码即可

```
5337 5337 2448 2448 0001 2448 0001 2161 1721 1869 6671 0008 3296 4430 0001 3945 0260 3945 1869 4574 5337 0344 2448 0037 5337 5337 0260 0668 5337 6671 0008 3296 1869 6671 0008 3296 1869 2161 1721 
```

```
艾艾斯斯一斯一括弧恩达不溜科一由偶由恩第艾克斯之艾艾偶可艾达不溜恩达不溜恩括弧
ISCC{NWQOUNDXJLKWNWN}
```

### Quote-Printable编码

类似于下面这样的编码，直接使用 [在线网站](https://try8.cn/tool/code/qp) 或`随波逐流CTF编码工具`解密即可

```
flag{ichunqiu_=E6=8A=80=E6=9C=AF=E6=9C=89=E6=B8=A9=E5=BA=A6}
flag{ichunqiu_技术有温度}
```

### Unicode编码

这个编码有很多种格式，比如`+U、\u、\x、&#`啥的

可以使用这个在线网站解码：https://r12a.github.io/app-conversion/

![](imgs/image-20241101155218913.png)

### 中文ascii码

```
27880 30693 25915 21892 38450 23454 39564 23460 21457 36865 112 108 98 99 116 102 33719 21462 21069 27573 102 108 97 103 20851 27880 79 110 101 45 70 111 120 23433 20840 22242 38431 22238 22797 112 108 98 99 116 102 33719 21462 21518 27573 102 108 97 103
```

加上&#和分号，直接`CyberChef`或者 [在线网站](https://www.xuhuhu.com/beautify/ascii/) 解密即可

```
&#27880;&#30693;&#25915;&#21892;&#38450;&#23454;&#39564;&#23460;&#21457;&#36865;&#112;&#108;&#98;&#99;&#116;&#102;&#33719;&#21462;&#21069;&#27573;&#102;&#108;&#97;&#103;&#20851;&#27880;&#79;&#110;&#101;&#45;&#70;&#111;&#120;&#23433;&#20840;&#22242;&#38431;&#22238;&#22797;&#112;&#108;&#98;&#99;&#116;&#102;&#33719;&#21462;&#21518;&#27573;&#102;&#108;&#97;&#103;
```

### 培根密码

密文由`ab`或者`AB`或者`01`组成，密文中只有两种字符，可以直接使用`随波逐流CTF编码工具`解密

> Tips：CyberChef 的培根密码解密可能会有点问题，这里建议用随波逐流解密

### 锟斤拷

这个东西的成因是`Unicode`的替换字符与`UTF-8`编码下的结果`EF BF BD`重复

然后这几个字符在`GBK`编码中被解码为汉字 “锟斤拷”（EF BF BD EF BF BD）

```python
import os

a = input('请选择你的功能（1、加密 2、解密）：')
if a == "1":
    s = input('请输入你要加密的话：')
    utf = s.encode('utf')
    gbk = s.encode('utf').decode('gbk', errors='ignore')
    if len(s)%2 == 1:
        gbk = gbk + "�"
    print(gbk)
    os.system("pause")
if a == "2":
    s = input('请输入你要解密的话：')
    gbk = s.encode('gbk')
    utf = s.encode('gbk').decode('utf-8', errors='ignore')
    print(utf)
    os.system("pause")
```

### 电脑键盘密码

#### 电脑键盘坐标密码

```
  1 2 3 4 5 6 7 8 9 0
1 Q W E R T Y U I O P
2 A S D F G H J K L
3 Z X C V B N M
```

例题-i春秋-misc3

```
flag{11 21 31 18 27 33 34}
flag{QAZIJCV}
```

#### 电脑键盘QWE加密

![](imgs/image-20250331164724999.jpeg)

```
密文：tewatnolzsarffuykjydyayd
明文：ecbkeyistlkdnngfrqfmfkfm
```

#### 电脑键盘位移加密

```
&&&* &&&!! %%%!! @@^^* %%# ^^!!( ##* $$!!^^^%%
思路：符号代表了位置，重复的次数代表了键盘上，向下移动的格数。&&&就代表了字母M，而*则代表字母I
mi ma ba shi ge hao di fang
```

### 手机键盘密码

#### 26键键盘密码

字母对应上档的数字

```
ooo yyy ii w uuu ee iii ee uuu ooo r yyy yyy e
999 666 88 2 777 33 888 33 777 999 4 666 666 3
```

![](imgs/image-20250421202022903.jpeg)

然后数字对应九键上的按键，出现次数对应第几个字母
```
999 666 88 2 777 33 888 33 777 999 4 666 666 3
 y   o  u  a  r  e   v   e  r  y   g  o   o  d
```

![](imgs/image-20250421202056717.jpeg)


#### 九宫格键盘密码

##### 第一种

参考链接：[https://blog.csdn.net/qq_55011640/article/details/123626280](https://blog.csdn.net/qq_55011640/article/details/123626280)

对照表如下：

| 密码  | 明文  | 密码  | 明文  |
| :-: | :-: | :-: | :-: |
| 11  |  :  | 61  |  m  |
| 12  | \_  | 62  |  n  |
| 13  |  -  | 63  |  o  |
| 21  |  a  | 71  |  p  |
| 22  |  b  | 72  |  q  |
| 23  |  c  | 73  |  r  |
| 31  |  d  | 74  |  s  |
| 32  |  e  | 81  |  t  |
| 33  |  f  | 82  |  u  |
| 41  |  g  | 83  |  v  |
| 42  |  h  | 91  |  w  |
| 43  |  i  | 92  |  x  |
| 51  |  j  | 93  |  y  |
| 52  |  k  | 94  |  z  |
| 53  |  l  |     |     |

举个栗子就理解了：

```
82  73  42  31  22  31  33  41  32
 U   R   H   D   B   D   F   G   E
```

##### 第二种

仔细看看就会发现其实和上面那种是一样的，就是这种情况下是用数字出现的次数表示方格中的位置

| 密码  | 明文  |  密码  | 明文  |
| :-: | :-: | :--: | :-: |
| 111 |  :  | 666  |  m  |
| 11  | \_  |  66  |  n  |
|  1  |  -  |  6   |  o  |
| 222 |  a  | 7777 |  p  |
| 22  |  b  | 777  |  q  |
|  2  |  c  |  77  |  r  |
| 333 |  d  |  7   |  s  |
| 33  |  e  | 888  |  t  |
|  3  |  f  |  88  |  u  |
| 444 |  g  |  8   |  v  |
| 44  |  h  | 9999 |  w  |
|  4  |  i  | 999  |  x  |
| 555 |  j  |  99  |  y  |
| 55  |  k  |  9   |  z  |
|  5  |  l  |      |     |

### 不同键盘布局的编码

#### Qwerty

![](imgs/image-20241113151943395.png)
#### Qwertz

![](imgs/image-20241113152029297.png)

#### Azerty

![](imgs/image-20241113152112365.png)

#### Dvorak(德沃夏克键盘)

![](imgs/image-20241113151817733.png)

![](imgs/image-20241113151927957.png)

#### Colemak

![](imgs/image-20241113151902536.png)

例题-2023台州市赛初赛-Black Mamba

### 棋盘密码(ADFGVX,ADFGX,Polybius)

![](imgs/image-20241018145022295.png)

直接使用CaptfEncoder或者随波逐流等工具输入密文和密钥解密即可
![](imgs/image-20241018145101804.png)

ADFGVX密码 默认棋盘：`ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8` 默认密钥：`german`

ADFGX密码 默认棋盘：`phqgmeaynofdxkrcvszwbutil` 默认密钥：`german`

波利比奥斯方阵密码 密钥：随机 默认密文字符：`ABCDE`

### 利用编程代码画图

1、LOGO编程语言【例题-RCTF2019-draw】

在线编译器：https://www.calormen.com/jslogo/

2、CFRS编程语言【例题-2024宁波市赛初赛-Misc2】

在线画图网站：https://susam.net/cfrs.html

### 通过拼音和声调进行编码

例题-惠州学院红帽协会CTF招新赛-Crypto-xuanxue

```
哷哸哹哻哼哽咤娻屇庎忈咤煈炼呶呵呷呸
```

```python
import pypinyin
from pypinyin import pinyin, lazy_pinyin


# 利用拼音库将每个汉字的拼音的字母转成ascii码相加,然后再与音调相加,最后取余128得到最后的字母
def decrypt(s):
    result = 0
    pin = lazy_pinyin(s)[0]
    k = pinyin(s, style=pypinyin.Style.TONE3, heteronym=True)[0][0]
    for i in pin:
        result += ord(i)
    result += ord(k[len(k) - 1])
    return chr(result % 128)


if __name__ == '__main__':
    r = ''
    s = "哷哸哹哻哼哽咤娻屇庎忈咤煈炼呶呵呷呸"
    for i in s:
        r += decrypt(i)
    print(r)
```

### 当铺密码

> 当铺密码就是一种将中文和数字进行转化的密码：
> 
> 当前汉字有多少笔画出头，就是转化成数字几

```
王夫 井工 夫口 由中人 井中 夫夫 由中大
 67  84  70   123   82  77   125
```

### 简/繁体汉字笔画编码

```python
table = {"许":11,"史":5,"李":7,"赵":9,"周":8,"秦":10,"吕":6,"乙":1,"王":4,"丁":2,"温":12,"万":3}
text = "李李 王周 史乙 吕李 史丁 周王 温万 吕李 秦王 秦史 李周 秦乙 许史 秦乙 赵史 赵赵 许李 秦周 许吕 许李 许王 秦乙 赵史 秦史 许史 赵史 许周 赵李 许史 许吕 赵史 赵李 李周 吕周 赵史 许丁 许王 许乙 秦丁 许乙 许李 李周 吕周 温史".split()

tmp = ""
for item in text:
    for char in item:
        tmp += str(table[char])
    tmp += ' '
tmp = tmp.split()

for item in tmp:
    print(chr(int(item)),end="")
    
# M03C4T{ChiNese_culture_is_vast_aND_profouND}
```

### PGP词汇表加密
密文格式大致如下:

例题1
> endow gremlin indulge bison flatfoot fallout goldfish bison hockey fracture fracture bison goggles jawbone bison flatfoot gremlin glucose glucose fracture flatfoot indoors gazelle gremlin goldfish bison guidance indulge keyboard keyboard glucose fracture hockey bison gazelle goldfish bison cement frighten gazelle goldfish indoors buzzard highchair fallout highchair bison fallout goldfish flytrap bison fallout goldfish gremlin indoors frighten fracture highchair bison cement fracture goldfish flatfoot gremlin flytrap fracture buzzard guidance goldfish freedom buzzard allow crowfoot jawbone bison indoors frighten fracture bison involve fallout jawbone Burbank indoors frighten fracture bison guidance gazelle flatfoot indoors indulge highchair fracture bison hockey frighten gremlin indulge flytrap bison flagpole fracture bison indulge hockey fracture flytrap bison allow blockade endow indulge hockey fallout blockade bison gazelle hockey bison inverse fracture highchair jawbone bison gazelle goggles guidance gremlin highchair indoors fallout goldfish indoors bison gazelle goldfish bison indoors frighten gazelle hockey bison flatfoot frighten fallout glucose glucose fracture goldfish freedom fracture blackjack blackjack

例题2-2024国城杯-Tr4ffIc_w1th_Ste90

> I randomly found a word list to encrypt the flag. I only remember that Wikipedia said this word list is similar to the NATO phonetic alphabet.
> 
> crumpled chairlift freedom chisel island dashboard crucial kickoff crucial chairlift drifter classroom highchair cranky clamshell edict drainage fallout clamshell chatter chairlift goldfish chopper eyetooth endow chairlift edict eyetooth deadbolt fallout egghead chisel eyetooth cranky crucial deadbolt chatter chisel egghead chisel crumpled eyetooth clamshell deadbolt chatter chopper eyetooth classroom chairlift fallout drainage klaxon

解密脚本：
```python
aaa = [['00', 'aardvark', 'adroitness'], ['01', 'absurd', 'adviser'], ['02', 'accrue', 'aftermath'], ['03', 'acme', 'aggregate'], ['04', 'adrift', 'alkali'], ['05', 'adult', 'almighty'], ['06', 'afflict', 'amulet'], ['07', 'ahead', 'amusement'], ['08', 'aimless', 'antenna'], ['09', 'Algol', 'applicant'], ['0A', 'allow', 'Apollo'], ['0B', 'alone', 'armistice'], ['0C', 'ammo', 'article'], ['0D', 'ancient', 'asteroid'], ['0E', 'apple', 'Atlantic'], ['0F', 'artist', 'atmosphere'], ['10', 'assume', 'autopsy'], ['11', 'Athens', 'Babylon'], ['12', 'atlas', 'backwater'], ['13', 'Aztec', 'barbecue'], ['14', 'baboon', 'belowground'], ['15', 'backfield', 'bifocals'], ['16', 'backward', 'bodyguard'], ['17', 'banjo', 'bookseller'], ['18', 'beaming', 'borderline'], ['19', 'bedlamp', 'bottomless'], ['1A', 'beehive', 'Bradbury'], ['1B', 'beeswax', 'bravado'], ['1C', 'befriend', 'Brazilian'], ['1D', 'Belfast', 'breakaway'], ['1E', 'berserk', 'Burlington'], ['1F', 'billiard', 'businessman'], ['20', 'bison', 'butterfat'], ['21', 'blackjack', 'Camelot'], ['22', 'blockade', 'candidate'], ['23', 'blowtorch', 'cannonball'], ['24', 'bluebird', 'Capricorn'], ['25', 'bombast', 'caravan'], ['26', 'bookshelf', 'caretaker'], ['27', 'brackish', 'celebrate'], ['28', 'breadline', 'cellulose'], ['29', 'breakup', 'certify'], ['2A', 'brickyard', 'chambermaid'], ['2B', 'briefcase', 'Cherokee'], ['2C', 'Burbank', 'Chicago'], ['2D', 'button', 'clergyman'], ['2E', 'buzzard', 'coherence'], ['2F', 'cement', 'combustion'], ['30', 'chairlift', 'commando'], ['31', 'chatter', 'company'], ['32', 'checkup', 'component'], ['33', 'chisel', 'concurrent'], ['34', 'choking', 'confidence'], ['35', 'chopper', 'conformist'], ['36', 'Christmas', 'congregate'], ['37', 'clamshell', 'consensus'], ['38', 'classic', 'consulting'], ['39', 'classroom', 'corporate'], ['3A', 'cleanup', 'corrosion'], ['3B', 'clockwork', 'councilman'], ['3C', 'cobra', 'crossover'], ['3D', 'commence', 'crucifix'], ['3E', 'concert', 'cumbersome'], ['3F', 'cowbell', 'customer'], ['40', 'crackdown', 'Dakota'], ['41', 'cranky', 'decadence'], ['42', 'crowfoot', 'December'], ['43', 'crucial', 'decimal'], ['44', 'crumpled', 'designing'], ['45', 'crusade', 'detector'], ['46', 'cubic', 'detergent'], ['47', 'dashboard', 'determine'], ['48', 'deadbolt', 'dictator'], ['49', 'deckhand', 'dinosaur'], ['4A', 'dogsled', 'direction'], ['4B', 'dragnet', 'disable'], ['4C', 'drainage', 'disbelief'], ['4D', 'dreadful', 'disruptive'], ['4E', 'drifter', 'distortion'], ['4F', 'dropper', 'document'], ['50', 'drumbeat', 'embezzle'], ['51', 'drunken', 'enchanting'], ['52', 'Dupont', 'enrollment'], ['53', 'dwelling', 'enterprise'], ['54', 'eating', 'equation'], ['55', 'edict', 'equipment'], ['56', 'egghead', 'escapade'], ['57', 'eightball', 'Eskimo'], ['58', 'endorse', 'everyday'], ['59', 'endow', 'examine'], ['5A', 'enlist', 'existence'], ['5B', 'erase', 'exodus'], ['5C', 'escape', 'fascinate'], ['5D', 'exceed', 'filament'], ['5E', 'eyeglass', 'finicky'], ['5F', 'eyetooth', 'forever'], ['60', 'facial', 'fortitude'], ['61', 'fallout', 'frequency'], ['62', 'flagpole', 'gadgetry'], ['63', 'flatfoot', 'Galveston'], ['64', 'flytrap', 'getaway'], ['65', 'fracture', 'glossary'], ['66', 'framework', 'gossamer'], ['67', 'freedom', 'graduate'], ['68', 'frighten', 'gravity'], ['69', 'gazelle', 'guitarist'], ['6A', 'Geiger', 'hamburger'], ['6B', 'glitter', 'Hamilton'], ['6C', 'glucose', 'handiwork'], ['6D', 'goggles', 'hazardous'], ['6E', 'goldfish', 'headwaters'], ['6F', 'gremlin', 'hemisphere'], ['70', 'guidance', 'hesitate'], ['71', 'hamlet', 'hideaway'], ['72', 'highchair', 'holiness'], ['73', 'hockey', 'hurricane'], ['74', 'indoors', 'hydraulic'], ['75', 'indulge', 'impartial'], ['76', 'inverse', 'impetus'], ['77', 'involve', 'inception'], ['78', 'island', 'indigo'], ['79', 'jawbone', 'inertia'], ['7A', 'keyboard', 'infancy'], ['7B', 'kickoff', 'inferno'], ['7C', 'kiwi', 'informant'], ['7D', 'klaxon', 'insincere'], ['7E', 'locale', 'insurgent'], ['7F', 'lockup', 'integrate'], ['80', 'merit', 'intention'], ['81', 'minnow', 'inventive'], ['82', 'miser', 'Istanbul'], ['83', 'Mohawk', 'Jamaica'], ['84', 'mural', 'Jupiter'], ['85', 'music', 'leprosy'], ['86', 'necklace', 'letterhead'], ['87', 'Neptune', 'liberty'], ['88', 'newborn', 'maritime'], ['89', 'nightbird', 'matchmaker'], ['8A', 'Oakland', 'maverick'], ['8B', 'obtuse', 'Medusa'], ['8C', 'offload', 'megaton'], ['8D', 'optic', 'microscope'], ['8E', 'orca', 'microwave'], ['8F', 'payday', 'midsummer'], ['90', 'peachy', 'millionaire'], ['91', 'pheasant', 'miracle'], ['92', 'physique', 'misnomer'], ['93', 'playhouse', 'molasses'], ['94', 'Pluto', 'molecule'], ['95', 'preclude', 'Montana'], ['96', 'prefer', 'monument'], ['97', 'preshrunk', 'mosquito'], ['98', 'printer', 'narrative'], ['99', 'prowler', 'nebula'], ['9A', 'pupil', 'newsletter'], ['9B', 'puppy', 'Norwegian'], ['9C', 'python', 'October'], ['9D', 'quadrant', 'Ohio'], ['9E', 'quiver', 'onlooker'], ['9F', 'quota', 'opulent'], ['A0', 'ragtime', 'Orlando'], ['A1', 'ratchet', 'outfielder'], ['A2', 'rebirth', 'Pacific'], ['A3', 'reform', 'pandemic'], ['A4', 'regain', 'Pandora'], ['A5', 'reindeer', 'paperweight'], ['A6', 'rematch', 'paragon'], ['A7', 'repay', 'paragraph'], ['A8', 'retouch', 'paramount'], ['A9', 'revenge', 'passenger'], ['AA', 'reward', 'pedigree'], ['AB', 'rhythm', 'Pegasus'], ['AC', 'ribcage', 'penetrate'], ['AD', 'ringbolt', 'perceptive'], ['AE', 'robust', 'performance'], ['AF', 'rocker', 'pharmacy'], ['B0', 'ruffled', 'phonetic'], ['B1', 'sailboat', 'photograph'], ['B2', 'sawdust', 'pioneer'], ['B3', 'scallion', 'pocketful'], ['B4', 'scenic', 'politeness'], ['B5', 'scorecard', 'positive'], ['B6', 'Scotland', 'potato'], ['B7', 'seabird', 'processor'], ['B8', 'select', 'provincial'], ['B9', 'sentence', 'proximate'], ['BA', 'shadow', 'puberty'], ['BB', 'shamrock', 'publisher'], ['BC', 'showgirl', 'pyramid'], ['BD', 'skullcap', 'quantity'], ['BE', 'skydive', 'racketeer'], ['BF', 'slingshot', 'rebellion'], ['C0', 'slowdown', 'recipe'], ['C1', 'snapline', 'recover'], ['C2', 'snapshot', 'repellent'], ['C3', 'snowcap', 'replica'], ['C4', 'snowslide', 'reproduce'], ['C5', 'solo', 'resistor'], ['C6', 'southward', 'responsive'], ['C7', 'soybean', 'retraction'], ['C8', 'spaniel', 'retrieval'], ['C9', 'spearhead', 'retrospect'], ['CA', 'spellbind', 'revenue'], ['CB', 'spheroid', 'revival'], ['CC', 'spigot', 'revolver'], ['CD', 'spindle', 'sandalwood'], ['CE', 'spyglass', 'sardonic'], ['CF', 'stagehand', 'Saturday'], ['D0', 'stagnate', 'savagery'], ['D1', 'stairway', 'scavenger'], ['D2', 'standard', 'sensation'], ['D3', 'stapler', 'sociable'], ['D4', 'steamship', 'souvenir'], ['D5', 'sterling', 'specialist'], ['D6', 'stockman', 'speculate'], ['D7', 'stopwatch', 'stethoscope'], ['D8', 'stormy', 'stupendous'], ['D9', 'sugar', 'supportive'], ['DA', 'surmount', 'surrender'], ['DB', 'suspense', 'suspicious'], ['DC', 'sweatband', 'sympathy'], ['DD', 'swelter', 'tambourine'], ['DE', 'tactics', 'telephone'], ['DF', 'talon', 'therapist'], ['E0', 'tapeworm', 'tobacco'], ['E1', 'tempest', 'tolerance'], ['E2', 'tiger', 'tomorrow'], ['E3', 'tissue', 'torpedo'], ['E4', 'tonic', 'tradition'], ['E5', 'topmost', 'travesty'], ['E6', 'tracker', 'trombonist'], ['E7', 'transit', 'truncated'], ['E8', 'trauma', 'typewriter'], ['E9', 'treadmill', 'ultimate'], ['EA', 'Trojan', 'undaunted'], ['EB', 'trouble', 'underfoot'], ['EC', 'tumor', 'unicorn'], ['ED', 'tunnel', 'unify'], ['EE', 'tycoon', 'universe'], ['EF', 'uncut', 'unravel'], ['F0', 'unearth', 'upcoming'], ['F1', 'unwind', 'vacancy'], ['F2', 'uproot', 'vagabond'], ['F3', 'upset', 'vertigo'], ['F4', 'upshot', 'Virginia'], ['F5', 'vapor', 'visitor'], ['F6', 'village', 'vocalist'], ['F7', 'virus', 'voyager'], ['F8', 'Vulcan', 'warranty'], ['F9', 'waffle', 'Waterloo'], ['FA', 'wallet', 'whimsical'], ['FB', 'watchword', 'Wichita'], ['FC', 'wayside', 'Wilmington'], ['FD', 'willow', 'Wyoming'], ['FE', 'woodlark', 'yesteryear'], ['FF', 'Zulu', 'Yucatan']]

_string = "crumpled chairlift freedom chisel island dashboard crucial kickoff crucial chairlift drifter classroom highchair cranky clamshell edict drainage fallout clamshell chatter chairlift goldfish chopper eyetooth endow chairlift edict eyetooth deadbolt fallout egghead chisel eyetooth cranky crucial deadbolt chatter chisel egghead chisel crumpled eyetooth clamshell deadbolt chatter chopper eyetooth classroom chairlift fallout drainage klaxon"

def tihuan(s):
    for i in aaa:
        s = s.replace(i[1],i[0])
        s = s.replace(i[2],i[0])
    return s

bbb = tihuan(_string)
print(bbb)
ccc = bbb.split(" ")
ddd = ""
for i in ccc:
    ddd+=chr(int(i,16))

print(ddd)
```

### VBS加密

例题1-2024国城杯-Just_F0r3n51Cs

`enc.vbe`内容如下
```
#@~^HAAAAA==W^lLyPb/P@#@&4*.2{W!!x[mFC&|0AcAAA==^#~@
```

直接使用[在线网站](https://master.ayra.ch/vbs/vbs.aspx)解密为vbs即可

### 日历密码

例题1-QHCTF For Year 2025

![](imgs/image-20250307145358642.png)

### Twitter Secret Messages

特点就是密文中有很多`Unicode`字符，直接用在线网站解密即可：https://holloway.nz/steg/

![](imgs/image-20250307145735098.png)

### 盲文

![](imgs/image-20250925131554313.png)

![](imgs/image-20250925131524373.png)

### 旗语

![](imgs/image-20250421203306482.png)


### Tupper自指公式

> 题目通常会给一个0-9组成的十进制长整数

```
64302039943980618121484184873128503074609076299244422107146064367058121738007282650851520841656649070683123403821937513267391370346165645908933956953599129037238861474390287394253991334205788122863003605507035424785292830536282067025856204240859500900770386319047433635878298987553848841486636769829855797015618861382395619672208366605793866695702843978585628878996390708495917362310741277717465790690657480858197797078816624813513712771929056001109014477328987890335180242509040895793315048815591172058129474723554263040
```

可以直接用在线网站画图：https://tuppers-formula.ovh/

![](imgs/image-20250817140518358.png)

也可以写一个脚本画图：

```python
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

def Tupper_self_referential_formula(k):
    aa = np.zeros((17, 106))

    def f(x, y):
        y += k
        a1 = 2 ** -(-17 * x - y % 17)
        a2 = (y // 17) // a1
        return 1 if a2 % 2 > 0.5 else 0

    for y in range(17):
        for x in range(106):
            aa[y, x] = f(x, y)

    return aa[:, ::-1]

k = 1594199391770250354455183081054802631580554590456781276981302978243348088576774816981145460077422136047780972200375212293357383685099969525103172039042888918139627966684645793042724447954308373948403404873262837470923601139156304668538304057819343713500158029312192443296076902692735780417298059011568971988619463802818660736654049870484193411780158317168232187100668526865378478661078082009408188033574841574337151898932291631715135266804518790328831268881702387643369637508117317249879868707531954723945940226278368605203277838681081840279552

aa = Tupper_self_referential_formula(k)
plt.figure(figsize=(15, 10))
plt.imshow(aa, origin='lower')

# 绘制图像
plt.savefig("tupper.png")
img = Image.open("tupper.png")
out1 = img.transpose(Image.FLIP_TOP_BOTTOM)
out2 = img.transpose(Image.FLIP_LEFT_RIGHT)
out2.show()
```

### 各种各样的异形文字

> 这一栏目主要搜集了比赛中遇到的一些异形文字，当然如果实在找不到对照表，也可以直接映射到字母上，然后拿quipquip爆破，详细可以参考 2025-SUCTF 的 SU_forensics

#### 原神提瓦特通用文字对照表

![](imgs/image-20250823182424652.png)


#### 瓦坎达文字对照表

![](imgs/image-20250315123245293.png)

#### 喜羊羊与灰太狼-羊文对照表

![](imgs/image-20250421190228589.png)


## Misc——流量分析题思路

详见作者博客中的 **[Network Traffic Analysis](https://goodlunatic.github.io/posts/5422d65/)** 这篇文章

## Misc——工控题思路

详见作者博客中的 **[CTF-ICS Learning Record](https://goodlunatic.github.io/posts/01ebd40/)** 这篇文章

## Misc——数据安全题思路

详见作者博客中的 **[CTF-数据安全](https://goodlunatic.github.io/posts/c49ae8a/)** 这篇文章

## MIsc——图片题思路：

> Tips：
> 
> 1.各种隐写可以先拉入一键梭哈网站解析一下:https://aperisolve.fr/
> 
> 2.各种乱七八糟的隐写可以先看看这个UP主的视频：https://space.bilibili.com/39665558
> 

### 通用思路

#### 1、查看图片属性的详细信息(可能关键信息就在里面)

#### 2、拉入010，查看文件头尾

#### 3、foremost 或者 binwalk

如果`foremost`没有提取出东西，可以用`binwalk`试一下，可能`binwalk`可以提取出东西

例题-i春秋CTF-Misc-class10

#### 4、盲水印隐写(可能是一张图片或者两张图片)

可以直接用`PuzzleSolver`处理

**一张图片的情况**

可以使用`隐形水印工具V1.2`或者`WaterMark`工具来提取水印

![](imgs/bw1.png)

**两张图片的情况**

可以直接用`PuzzleSolver`处理

也可以下载 [原项目](https://github.com/chishaxie/BlindWaterMark) 处理

```bash
# 先把要处理的图片拉入BlindWaterMark-master文件夹，然后使用如下命令
python bwmforpy3.py decode day1.png day2.png flag.png --oldseed
# Tips:这里还会出现FFT（傅里叶盲水印）:直接运行CTFD中的FFT.py
```

> Tips：这里构成盲水印的两张图片不一定要都是 PNG 或者都是 JPG，有时候一张 JPG 一张 PNG，也可以构成 BWM 盲水印隐写

#### 5、图片的分离和拼接

(1)可以用kali的convert分离和montage拼接命令

```
分解GIF的命令：convert glance.gif flag.png
水平镜像翻转图片：convert -flop reverse.jpg reversed.jpg
垂直镜像翻转图片：convert -flip reverse.jpg reversed.jpg
合成图片的命令：montage flag*.png -tile x1 -geometry +0+0 flag.png
-tile是拼接时每行和每列的图片数，这里用x1，就是只一行
-geometry是首选每个图和边框尺寸，我们边框为0，图照原始尺寸即可
```

(2)使用在线网站分解：https://tu.sioe.cn/gj/fenjie/

(3)用Python脚本跑

```python
import os
from PIL import Image
im = Image.new('RGB', (2*201, 600))  # new(mode,size) size is long and width
PATH = 'E:/ctf/glance.gif'
FILE_NAME = [i for i in os.listdir(PATH)]
width = 0
for i in FILE_NAME:
    im.paste(Image.open(PATH+i), (width, 0, width+2, 600))  # box is 左，上，右,下
    width += 2
im.show()
```

#### 6、Image conbiner(两张图片)

 两张图片可能有部分残缺（可以互补）

 给了两张图片时，用`Stegsolve`打开其中一张，

 然后再`Analyze`-`Image conbiner`打开另一张图片

还有可能是给了两张二维码，需要两个二维码每个像素亦或

#### 7、OurSecret隐写(可以无密码)

拉入OurSecret，输入密码(也可以无密码)解密，得到隐藏文件

> OurSecret隐写的特征非常明显，如下图中标蓝的那40字节

```
9E 97 BA 2A 00 80 88 C9 A3 70 97 5B A2 E4 99 B8
C1 78 72 0F 88 DD DC 34 2B 4E 7D 31 7F B5 E8 70
39 A8 B8 42 75 68 71 91
```

![](imgs/image-20250312191643162.png)

#### 8、拼图题

**碎图片合成一张图片**

```bash
#在Windows中使用imagemagick处理
magick.exe montage *.png -tile 18x10 -geometry 125x125+0+0 flag.jpg
magick montage *.png -tile 40x22 -geometry +0+0 flag-0.png
```

```bash
#在kali中处理
拉入kali里处理，如果是碎的图片，
先使用 montage *.PNG -tile 12x12 -geometry +0+0 out.png合成一张图片
*.png表示匹配所有图片
-tile表示图片的张数
-geometry +0+0表示每张图片的间距为0
合成后要先查看图片的宽高（宽高要相等，不相等要用PS调整）
```

**然后把上面合成好的图片使用 Puzzle-Merak 工具进行智能拼图**

![](imgs/puzzles1.png)

![](imgs/puzzles2.png)

**这里只需要输入 generation、population、size 并用分号分开即可开始自动拼图**

**也可以使用gaps智能拼图(在kali和wsl里使用都可以)**

```bash
gaps --image=out.png --generation=30 --population=144 --size=30 --save 

--image 指向拼图的路径
--size 拼图块的像素尺寸
--generations 遗传算法的代的数量
--population 个体数量
--verbose 每一代训练结束后展示最佳结果
--save 将拼图还原为图像
```

```bash
gaps --image=flag.jpg --generations=50 --population=180 --size=125 --verbose

-generations 你要迭代多少次
-population 你有多少个小拼图
--size 每张小图，也就是拼图小块的大小
--verbose 实时显示
```

#### 9、提取图中等距像素点/近邻法缩放图片
参考链接：

https://www.bilibili.com/video/BV1Lf4y1r7dZ/?spm_id_from=333.999.0.0

https://github.com/Byxs20

例题-2024浙江省赛决赛-天命人

拿下面这张图片举个栗子

![](imgs/image-20241120171656554.png)

方法一：直接在PS中将宽高都缩小为原来的十分之一，并选择邻近硬边缘即可直接得到隐藏的图片

![](imgs/image-20241120171835713.png)

方法二：在windows的终端中运行CTFD中的Get_Pixels.py（注意所有路径中都不要出现中文）

```bash
py main.py -f arcaea.png -p 0x0+3828x2148 -n 12x12
py main.py -f 要解密的图片 -p 第一个像素点的XY坐标+最后一个像素点的XY坐标 -n 两个等距像素点的XY距离的差值
如果是等距离提取整张图片中所有像素点，要注意右下角那个点的位置XY都要减去一倍的距离
Tips:在PS中按F8就可以看到每个像素点的具体坐标了
```

> 这里有时候运行会报错，需要把main.py脚本拉到桌面上运行或者检查一下图片的CRC对不对

一样可以得到隐藏的图片

![](imgs/image-20241120172043964.png)

#### 10、pixeljihad（有密码）

直接使用在线网站解密即可：[PixelJihad (sekao.net)](https://sekao.net/pixeljihad/)

#### 11、隐写文本可能藏在原图片和隐写文件的中间

直接在010中运行对应文件类型的模板，依次查看文件头尾有无额外内容即可

#### 12、DeEgger Embedder隐写

可以直接使用 DeEgger Embedder 工具 extract files

#### 13、flag可能藏在 exif 中

直接在 WSL 中输入以下命令查看即可，如果偷懒也可以直接使用 破空 flag 查找工具 进行查找

```
exiftool 3.jpg
```

#### 14、给了两张图片，flag藏在每行不同像素的个数中

例题1-2023羊城杯初赛-两支老虎

```python
from PIL import Image, ImageChops

img1 = Image.open("1.png")
width1,heigth1 = img1.size # 1134,720
img2 = Image.open("2.png") 
width2,heigth2 = img2.size # 1144,720
img2 = img2.crop((0,0,1134,720))
width2,heigth2 = img2.size
# img2.save("3.png")

diff_dit = {}
# 返回差异图像，表示 img1 和 img2 之间的像素差异。
diff = ImageChops.difference(img1,img2)
width3,heigth3 = diff.size
for x in range(width3):
    for y in range(heigth3):
        pixel3 = str(diff.getpixel((x,y)))
        # 统计一下差异像素
        if pixel3 not in diff_dit: 
            diff_dit[pixel3] = 0
        else:
            diff_dit[pixel3] += 1
print(diff_dit) 
# {'(0, 0, 0)': 813891, '(1, 1, 1)': 2533, '(1, 1, 0)': 53}

for y in range(heigth1):
    cnt = 0
    for x in range(width1):
        pixel1 = img1.getpixel((x,y))
        pixel2 = img2.getpixel((x,y))
        if pixel1 != pixel2:
            cnt += 1
    if cnt != 0:
        print(chr(cnt),end='')
# DASCTF{tWo_t1gers_rUn_f@st}
```

#### 15、两张图片，用StegSolve中的Image Conbiner合成为一张bmp

![](imgs/image-20241106154249826.png)

合成一张bmp后，再使用zsteg扫描

![](imgs/image-20241106154358962.png)

#### 16、图片多个通道存在LSB隐写，StegSolve中把背景颜色相同的勾选上

#### 17、把小说藏进图片

参考链接：https://www.bilibili.com/video/BV1Ai4y1V7rg/?spm_id_from=333.999.0.0&vd_source=31399c09aa0c93655468bde7b13fcc03

```python
# 脚本一
from PIL import Image

img = Image.open("1.bmp")
width,height = img.size # 1326 1326

res = ""
for y in range(height):
    for x in range(width):
        r,g,b = img.getpixel((x,y))
        data = (r << 8) + b
        res += chr(data)
    
with open("decode.txt","w") as f:
    f.write(res)
```

```python
# 脚本二
from PIL import Image
from numpy import array
res = bytes(array(Image.open('1.bmp'))[:, :, ::2].flatten()).rstrip(b'\0').decode('utf-16-be')
print(res)
```

#### 18、Arnold猫脸变换

参考链接：https://1cepeak.cn/post/arnold/

如果已经得到了`shuffle_times`、`a`和`b`，然后直接使用下面这个脚本恢复即可

```python
import matplotlib.pyplot as plt
import cv2
import numpy as np
from PIL import Image

img = cv2.imread('flag.png')

def arnold_encode(image, shuffle_times, a, b):
    arnold_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    N = h   # 或N=w

    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                new_x = (1*ori_x + b*ori_y)% N
                new_y = (a*ori_x + (a*b+1)*ori_y) % N
                arnold_image[new_x, new_y, :] = image[ori_x, ori_y, :]

        image = np.copy(arnold_image)

    cv2.imwrite('flag_arnold_encode.png', arnold_image, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
    return arnold_image

def arnold_decode(image, shuffle_times, a, b):
    decode_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    N = h  # 或N=w

    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                new_x = ((a * b + 1) * ori_x + (-b) * ori_y) % N
                new_y = ((-a) * ori_x + ori_y) % N
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]

    cv2.imwrite('flag.png', decode_image, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
    return decode_image

# arnold_encode(img, 1, 2, 3)
arnold_decode(img, 1, 29294, 7302244)
```

如果题目没有给我们上面的三个参数，我可以尝试爆破一下

例题-cat(技能兴鲁)

```python
import matplotlib.pyplot as plt
import cv2
import numpy as np

def arnold_decode(image, shuffle_times, a, b):
    decode_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    N = h  # 或N=w
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                # 按照公式坐标变换
                new_x = ((a * b + 1) * ori_x + (-b) * ori_y) % N
                new_y = ((-a) * ori_x + ori_y) % N
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]
        image = np.copy(decode_image)
        
    return image

def arnold_brute(image,shuffle_times_range,a_range,b_range):
    for c in range(shuffle_times_range[0],shuffle_times_range[1]):
        for a in range(a_range[0],a_range[1]):
            for b in range(b_range[0],b_range[1]):
                print(f"[+] Trying shuffle_times={c} a={a} b={b}")
                decoded_img = arnold_decode(image,c,a,b)
                output_filename = f"flag_decodedc{c}_a{a}_b{b}.png"
                cv2.imwrite(output_filename, decoded_img, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
                
if __name__ == "__main__":
    img = cv2.imread("cat.png")
    arnold_brute(img, (1,6), (1,11), (1,11))
```

**正常来说猫脸变换的图像长和宽都是相等的，如果遇到抽象的长宽不相等的图像，脚本中的N需要改一下**

```python
import cv2
import numpy as np

def arnold_decode(image, shuffle_times, a, b):
    decode_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                new_x = ((a * b + 1) * ori_x + (-b) * ori_y) % h
                new_y = ((-a) * ori_x + ori_y) % w
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]
        image = np.copy(decode_image)
    return image

if __name__ == "__main__":
    img = cv2.imread("fla@.bmp")
    decode_img = arnold_decode(img, 12, 0, 9)
    cv2.imwrite('flag.png',decode_img)
```

#### 19、二进制数据转图片

```python
import os
import math
from PIL import Image

bin_data = "010000001010101101110001000010001110010110101100111010011101001010111011111101111111110110100100011001001100011001000001010111100001101000001010001011101111000100001010110110101101100111010000010000110101100001100110010100010011100011100011010100100000111101111111010010111101100010001100100010111111111001011101011101000000110111011000001001010011001001110101111111010110011011001000101010010110101011011111001010100011100001100001011010011"

data_len = len(bin_data)
sqrt_len = int(math.sqrt(data_len))
os.makedirs("pic_out",exist_ok=True)
for i in range(sqrt_len, 0, -1):
    if data_len % i == 0:
        width, height = i, data_len // i
        print(f"尝试图像尺寸: {width} x {height}")
        img = Image.new("L", (width, height), 255)          # 原始图像
        inverted_img = Image.new("L", (width, height), 0)   # 反色图像
        for idx, item in enumerate(bin_data):
            y, x = idx // width, idx % width
            color = 0 if item == '1' else 255
            img.putpixel((x, y), color)
            inverted_img.putpixel((x, y), 255 - color)  # 反色

        img.save(f"pic_out/{width}x{height}.png")
        inverted_img.save(f"pic_out/{width}x{height}_inverted.png")
```

#### 20、 脚本提取LSB数据并分析

```python
def extract_lsb():
    data = np.array(Image.open("flag.png"))
    r_lsb = (data[:,:,0] & 1).flatten().astype(str)
    g_lsb = (data[:,:,1] & 1).flatten().astype(str)
    b_lsb = (data[:,:,2] & 1).flatten().astype(str)
    # lsb_data = libnum.b2s("".join(r_lsb))
    print(lsb_data)
```

#### 21、像素点RGB值转图片

题目提供了类似如下的数据：

```python
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
(255,255,255)
```

直接写一个Python脚本爆破宽高并还原图像即可

```python
import numpy as np
import math
from PIL import Image

with open('basic.txt', 'r') as file:
    lines = file.readlines()

# 将每行数据转换为元组，并存储在列表中
data = [eval(line.strip()) for line in lines]

# 将列表转换为NumPy数组，形状为 (N, 3)
data = np.array(data, dtype=np.uint8)

data_length = len(data)
sqrt_length = int(math.sqrt(data_length))
for i in range(sqrt_length, 0, -1):
    if data_length % i == 0:  # 如果长度可以整除
        rows = i
        cols = data_length // i
        print(f"尝试重塑为 {rows} 行, {cols} 列")
        try:
            reshaped_data = data.reshape(rows, cols, 3)
            image = Image.fromarray(reshaped_data, 'RGB')
            image.save(f"{rows}x{cols}.png")
        except Exception as e:
            print(f"无法重塑为 {rows} 行, {cols} 列: {e}")
```

#### 22、图片套娃

图片的每个像素的RGB值其实都是另一张图片的字节数据

例题1-2025软件系统安全赛

附件给了下面这张图片

![](imgs/image-20250324153749556.png)

```python
def func2():
    with open("flag.png","rb") as f:
        data = f.read()
    data = np.array(Image.open(io.BytesIO(data))).flatten()
    for i in data[:20]:
        print((i,hex(i)[2:]),end=" ")
```

用以上脚本把像素的每个RGB值都转为hex，就可以在图片头几个像素发现PNG文件头

![](imgs/image-20250324154302576.png)

```python
import io
import numpy as np
from PIL import Image

def func1():
    cnt = 1
    img_file = "flag.png"
    while True:
        out = []
        img = Image.open(img_file)
        w,h = img.size
        for y in range(h):
            for x in range(w):
                r,g,b = img.getpixel((x,y))
                out.append(r)
                out.append(g)
                out.append(b)
        outfile = f"{cnt}.png"
        with open(outfile,'wb') as f:
            f.write(bytes(out))
        print(f"[+] {cnt}.png 处理完毕")
        img_file = f"{cnt}.png"
        cnt += 1

# 在利用io.BytesIO内存中处理文件数据：避免频繁读写磁盘，提高性能。
def func2():
    with open("flag.png","rb") as f:
        data = f.read()
    cnt = 1
    while True:
        try:
            data = bytes(np.array(Image.open(io.BytesIO(data))).flatten()).rstrip(b'\xff')
            Image.open(io.BytesIO(data)).save(f"{cnt}.png")
            print(f"[+] {cnt}.png 处理完毕")
        except:
            break
        cnt += 1

if __name__ == "__main__":
    # func1()
    func2()
```

运行以上脚本循环485次后即可得到flag

![](imgs/image-20250324153842745.png)
#### 23、Java-BlindWatermark

1、直接用`Byxs20`写的`PuzzleSolver`一把梭

2、Github上的开源项目：https://github.com/ww23/BlindWatermark

```bash
java -jar .\BlindWatermark-v0.0.3-windows-x86_64.jar decode -c .\password.png output.png
```

#### 24、在线网站一把梭

> 这种情况常常发生在某些Misc出题人水平不够，图片隐写道行不够的情况

```bash
# 在线网站：
https://www.a.tools/Tool.php?Id=100
```

### PNG思路

#### 1、PNG图片宽高被篡改

010打开图片改宽高即可，17~20字节是宽，21~24字节是高

当然也可以用PuzzleSolver或随波逐流工具直接爆破图片宽高

#### 2、LSB隐写:

**没有密钥的情况**

```bash
# 用zsteg快速查看
zsteg -a (文件名)
# 提取数据并导出
zsteg -e b1,r,lsb,xy 3.png > 123.jpg
```

有时候图片隐写的内容，zsteg识别不出来，因此最保险的还是用`stegsolve`肉眼过一遍

然后根据LSB隐写的痕迹尝试手动提取

> 这里详细讲一下zsteg扫出来的参数的含义：
> 
> 参考链接：https://www.anquanke.com/post/id/189154
> 
> -c：rgba的组合理解，r3g2b3则表示r通道的低3bit，g通道2bit，r通道3bit，如果设置为rbg不加数字的，则表示每个通道读取bit数相同，bit数由-b参数设置
> 
> -b：设置每个通道读取的bit数，从低位开始，如果不是顺序的低位开始，则可以使用掩码，比如取最低位和最高位，则可以-b 10000001或者-b 0x81
> 
> -o：设置行列的读取顺序，xy就是从上到下，从左到右，xy任意有大写的，表示倒序，其中当图片是BMP时，bY的顺序和xY是一样的，Yb和Yx的顺序是一样的
> 
> 行列顺序：zsteg可以通过-o选项设置8种组合（xy,xY,Xy,XY,yx,yX,Yx,YX），Stegsolve只有Extract By Row or Column，对应到zsteg的-o选项上就是xy和yx
> 
> 字节顺序：Stegsolve字节上的读取顺序与Bit Order选项有关，如果设置了MSBFirst，是从高位开始读取，LSBFirst是从低位开始读取。zsteg只能从高位开始读，比如-b 0x81，在读取不同通道数据时，都是先读取一个字节的高位，再读取该字节的低位。对应到Stegsolve就是MSBFirst的选项。
> 
> 组合顺序：zsteg的--lsb和--msb决定了组合顺序：lsb-大端存放，msb-小端存放。stegsolve的MSBFirst表示从高位读取到低位，LSBFirst表示从低位读取到高位。只有当通道勾选的Bit个数大于1时，该选项才会影响返回的结果。

 **有密钥的情况（cloacked-pixel）**

直接下载开源项目到本地，根据`README`输入命令解密即可

如果懒得敲命令行，也可以用`PuzzleSolver`辅助解密

> 原项目: https://github.com/livz/cloacked-pixel
> 
> Python3重写的版本: https://github.com/Grazee/cloacked-pixel-python3


```bash
python2 cloacked-pixel-master/lsb.py extract 0.png out.data f78dcd383f1b574b
# 0.png是隐写后的图片
# out.data是隐写内容保存的位置
# f78dcd383f1b574b是密钥
```

用Ai搓了一个爆破clocked-pixel密钥的脚本，将其放到clocked-pixel-python3目录下运行即可
```python
import struct
from Crypto.Util.number import long_to_bytes
from PIL import Image
from crypt import AESCipher
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np

# Assemble an array of bits into a binary file
def assemble(v):
    bs = b""
    length = len(v)
    for idx in range(0, length, 8):
        b = 0
        end_idx = min(idx + 8, length)
        for i in range(idx, end_idx):
            b = (b << 1) + v[i]
        bs += long_to_bytes(b)
    
    try:
        payload_size = struct.unpack("i", bs[:4])[0]
        return bs[4: payload_size + 4]
    except:
        return None

# 批量解密函数
def decrypt_batch(passwords, data_out):
    results = []
    for passwd in passwords:
        try:
            cipher = AESCipher(passwd)
            data_dec = cipher.decrypt(data_out)
            if data_dec and (b'ctf{' in data_dec or b'CTF{' in data_dec or b'flag{' in data_dec or b'FLAG{' in data_dec or b'\x50\x4b\x03\x04' in data_dec or b'\x89\x50\x4e\x47' in data_dec):
                print(f'[+] Found password: {passwd}')
                print(data_dec)
        except:
            continue
    return None, None

# Extract data embedded into LSB of the input file
def burp_func(png_path,dic_path):
    with open(dic_path, 'r') as f:
        passwd_list = [p.strip() for p in f.readlines() if p.strip()]
    print(f'[+] Loaded {len(passwd_list)} passwords')
    
    # 使用numpy加速图像处理
    img = Image.open(png_path)
    width, height = img.size
    print(f"[+] Image size: {width}x{height} pixels.")
    
    # 转换为numpy数组进行快速处理
    img_array = np.array(img.convert("RGBA"))
    
    # 一次性提取所有LSB
    v = []
    # 使用numpy的位操作加速
    red_lsb = (img_array[:, :, 0] & 1).flatten()
    green_lsb = (img_array[:, :, 1] & 1).flatten()
    blue_lsb = (img_array[:, :, 2] & 1).flatten()
    
    # 交错排列RGB的LSB
    v = np.empty(red_lsb.size + green_lsb.size + blue_lsb.size, dtype=np.uint8)
    v[0::3] = red_lsb
    v[1::3] = green_lsb
    v[2::3] = blue_lsb
    
    data_out = assemble(v.tolist())
    if data_out is None:
        print("[-] Failed to assemble data from LSBs")
        return

    # 多线程爆破密码
    num_threads = 8
    batch_size = max(1, len(passwd_list) // num_threads)
    
    print(f"[*] Starting multi-threaded decryption with {num_threads} threads...")
    
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = []
        
        # 分批处理密码
        for i in range(0, len(passwd_list), batch_size):
            batch = passwd_list[i:i + batch_size]
            futures.append(executor.submit(decrypt_batch, batch, data_out))
        
        # 等待结果
        for future in as_completed(futures):
            password, decrypted_data = future.result()
            if password and decrypted_data:
                print(f'[+] Found password: {password}')
                print(decrypted_data)
                # 立即关闭其他线程
                executor.shutdown(wait=False)
                return

if __name__ == "__main__":
    png_path = 'steg.png'
    dic_path = 'passwd_list.txt'
    burp_func(png_path,dic_path)
```

#### 3、IDAT块隐写

**(1) 解压zlib获得原始数据**

用010提取数据扔进zlib脚本解压获得原始数据

将异常的IDAT数据块去头去尾之后使用以下脚本解压

> 这里要注意的是 zlib 压缩数据流的文件头不一定是789C，还有可能是785E

```python
import zlib
import binascii

IDAT = bytes.fromhex("789C5D91011280400802BF04FFFF5C75294B5537738A21A27D1E49CFD17DB3937A92E7E603880A6D485100901FB0410153350DE83112EA2D51C54CE2E585B15A2FC78E8872F51C6FC1881882F93D372DEF78E665B0C36C529622A0A45588138833A170A2071DDCD18219DB8C0D465D8B6989719645ED9C11C36AE3ABDAEFCFC0ACF023E77C17C7897667")
data = binascii.hexlify(zlib.decompress(IDAT))
# print(data)
print(bytes.fromhex(data.decode()))
```

当然，这里也可以直接用 cyberchef 解码

![](imgs/image-20250809215320909.png)

**(2) 加上文件头爆破宽高得到新的图片**

一般出问题的 IDAT Chunk 大小都是比正常的小的，很可能在图片末尾

如果不确定是哪一个有问题，可以尝试都提取出来，一个一个分析

可以使用 tweakpng 辅助分析，但是一般用 010 的模板提取分析就够了

我们可用 WSL 中的 pngcheck -v 0.png 检查 IDAT

如下图，最后一个和倒数第二个IDAT明显有问题，因此可以对这两部分进行尝试

![](imgs/image-20240724171411362.png)

借助 010 的模板功能把IDAT块提取出来，加上文件头尾并爆破宽高即可得到另一张图片

```
# 图片头(其中后面部分的数据可以不一样，但是数据长度要一样)
89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52
00 00 04 E0 00 00 03 0C 08 06 00 00 00 FA 9A D8
07
#图片尾
00 00 00 00 49 45 4E 44 AE 42 60 82
```

![](imgs/image-20240724171723828.png)

Tips：这里有时候也可以不用补文件尾

![](imgs/image-20240724171731445.png)

把文件头尾补完整后直接爆破一下宽高即可

例题1-2023安洵杯-dacongのsecret

例题2-DASCTF2024 暑期挑战赛-png_master

#### 4、PNG末尾隐藏内容


010打开PNG，根据PNG模板定位到文件尾，看看后面有没有多余的数据

当然，也可以尝试直接`binwalk`或者`foremost`提取（但是如果隐藏文件的文件结构不完整可能识别不出来）

#### 5、APNG格式

一张后缀为.png的图片，还可能是apng格式的

可以用exiftool看一下，apng格式是支持动图的，我们可以用`apngdis_gui`将每一帧分离出来

然后每一帧图片里可能藏了二维码或者有盲水印，或者每张图片的时间间隔转ASCII码就是flag

例题1-2021 GKCTF 你知道apng吗

例题2-2022 HGAME Week4摆烂

#### 6、CVE-2023-28303 截图工具漏洞

一张图片如果有两个`IEND`块：`AE 42 60 82` 

就很有可能考察的是这个漏洞

可以使用[Github上大佬写好的工具](https://github.com/frankthetank-music/Acropalypse-Multi-Tool)一把梭，恢复完整图片前需要知道原图的分辨率

#### 7、stegpy隐写

[ stegpy 开源地址](https://github.com/izcoser/stegpy) 下载好后直接用WSL输入以下命令并输入密码解密即可

也可以直接用 pip 安装： pip3 install stegpy

```bash
stegpy 1.png -p
```

#### 8、npiet编程语言

**白底**+很多彩色的小像素点组成的图片，形如下图

![](imgs/image-20241121215108269.png)

方法一：直接使用在线网站：https://www.bertnase.de/npiet/npiet-execute.php 运行即可

方法二：下载源代码`npiet-1.3a-win32`到本地，然后使用以下命令运行

```bash
.\npiet.exe -tpic solved.png
```


#### 9、Image Steganography隐写

直接使用`Image Steganography`工具解密即可，如果需要密码，就勾选上`Decrypt`选项

> 当然也可以直接用PuzzleSolver解密

![](imgs/image-20241229152552878.png)

#### 10、关键信息藏在图片被篡改的宽高中

#### 11、关键信息藏在图片每个被篡改的IDAT块长度中


### JPG思路

#### 1、LSB隐写

用`StegSolve`打开查看即可

#### 2、可以试试用stegdectet看看是什么加密：

```
.\stegdetect.exe -t jopi -s 10.0 .\0.jpg
```

![stegdectet](imgs/stegdectet-171427285283031.gif)

出现三颗星不一定就代表一定是这种加密方式

#### 2、JPHS隐写(可以无密码)

导出步骤 Select File --> seek --> demo.txt --> Save the file

#### 3、steghide隐写(可以无密码)

```bash
#如果密码已经知道了
steghide extract -sf filename -p passwd
```

在WSL或者kali里用Stegseek跑（字典在wordlist里）

```bash
#如果密码未知
可以用下面这个脚本爆破
#bruteStegHide.sh
#!/bin/bash

for line in `cat $2`;do
    steghide extract -sf $1 -p $line > /dev/null 2>&1
    if [[ $? -eq 0 ]];then
        echo 'password is: '$line
        exit
    fi
done
```

```bash
#或者在WSL或者kali里用Stegseek跑（字典在wordlist里）
stegseek filename rockyou.txt
```

#### 4、Silenteye隐写

直接用`silenteye`打开输入密钥decode即可，默认密钥是`silenteye`，也可以填入自己的密钥

#### 5、outguess隐写

```bash
outguess -k "abc" -r mmm.jpg flag.txt
#-k 后面跟的是解密的密钥
#flag.txt是解密后数据保存的位置
```

#### 6、F5-steganography-master

把要解密的图片拉到F5文件夹中

```bash
#有密码的情况
java Extract beautiful.jpg -p passwd
#无密码的情况
java Extract beautiful.jpg
#解密出来的数据会放到F5文件夹下的output.txt中
```

#### 7、JPG宽高隐写
010打开JPG图片，找到 struct SOF 块数据，手动调整宽高即可

![](imgs/image-20240911103611924.png)

#### 8、jsteg

JPG图片的`jsteg隐写`可以直接用下面这个工具一把梭

![](imgs/image-20250524115606248.png)

#### 9、关键信息混在 jpg 的十六进制数据中

如果实在没有思路，可以尝试在010中打开并搜索`flag`等关键字词

假如关键数据放到 jpg 文件尾前面，010可能不会报错，这时候就需要我们肉眼丁真手动提取

### BMP思路

> BMP图片通道排列顺序是BGR

#### 1、bmp宽高爆破：

删除文件头，并保存为文件名.data，然后用GIMP打开修改宽高（这个比较方便）

或者直接用bmp爆破脚本跑 python script.py -f filename.bmp

```bash
#用这个脚本要注意对图片一个个使用
```

```python
import os
import time
import math
import argparse


parser = argparse.ArgumentParser()
parser.add_argument("-f", type=str, default=None, required=True,
                    help="输入同级目录下图片的名称")
args = parser.parse_args()

SAVE_DIR = os.getcwd()


def save_img(data, width=None, height=None, sqrt_num=None):
    with open(os.path.join(SAVE_DIR, "fix_width.bmp"), "wb") as f:
        f.write(data[:0x12] + width.to_bytes(4,
                byteorder="little", signed=False) + data[0x16:])

    with open(os.path.join(SAVE_DIR, "fix_height.bmp"), "wb") as f:
        f.write(data[:0x16] + height.to_bytes(4,
                byteorder="little", signed=False) + data[0x1a:])

    with open(os.path.join(SAVE_DIR, "fix_sqrt.bmp"), "wb") as f:
        f.write(data[:0x12] + sqrt_num.to_bytes(4,
                byteorder="little", signed=False) * 2 + data[0x1a:])


def get_pixels_size(data):
    bfSize = int.from_bytes(data[0x2:0x2+4], byteorder="little", signed=False)
    bfOffBits = int.from_bytes(
        data[0xa:0xa+4], byteorder="little", signed=False)
    biBitCount = int.from_bytes(
        data[0x1c:0x1c+2], byteorder="little", signed=False)
    channel = biBitCount // 8
    # 由于宽高都会被修改，所以我计算出来的Padding_size也不是正确的，没有意义
    # padding_size = (4 - col * channel % 4) * row if col * channel % 4 != 0 else 0
    # pixels_size = (bfSize - bfOffBits - padding_size) // channel
    return (bfSize - bfOffBits) // channel


if __name__ == '__main__':
    file_path = os.path.abspath(args.f)
    if os.path.splitext(args.f)[-1] != ".bmp":
        print("您的文件后缀名不为BMP!")
        time.sleep(1)
        exit(-1)

    with open(file_path, "rb") as f:
        data = f.read()
    col = abs(int.from_bytes(data[0x12:0x12+4],
              byteorder="little", signed=True))
    row = abs(int.from_bytes(data[0x16:0x16+4],
              byteorder="little", signed=True))
    pixels_size = get_pixels_size(data)

    width, height = pixels_size // row, pixels_size // col
    sqrt_num = int(math.sqrt((pixels_size)))
    save_img(data, width=width, height=height, sqrt_num=sqrt_num)

    print("温馨提示：由于填充字节的问题，所以可能会偏差几个像素!")
    print(f"1.修复宽度: {width}")
    print(f"2.修复高度: {height}")
    print(f"3.修复宽度高度为: {sqrt_num}")
    time.sleep(1)
```

#### 2、wbStego4open隐写(可以无密钥)

用`wbStego4open`输入密钥后decode即可

#### 3、Silenteye隐写

直接用`silenteye`打开输入密钥decode即可，默认密钥是`silenteye`，可以填入自己的密钥

### GIF思路

做GIF图像的相关的隐写题之前，我们首先需要对GIF图像大概的参数又一定的了解

下图我用Linux下的`identify`工具提取了一张GIF图像的一些参数

![](imgs/image-20250309155001150.png)

这里简要介绍一下每一行中的参数
```
 flag.gif[195]     GIF      465x294      481x305+8+11          8-bit            sRGB 
图像名称及对应帧数  图像格式  帧的实际尺寸  画布尺寸及xy的偏移量  图像使用 8 位色深  颜色空间为标准 RGB

      16c                   0.010u                         0:00.080
使用了 16 种颜色  处理该图像消耗的 CPU 用户时间，单位是秒  处理该图像所用的总时间，单位是秒

```

#### 1、GIF分帧(在线网站或者工具)

**[推荐] Linux下使用`convert`提取**

```bash
convert flag.gif flag.png
```

使用`ffmpeg`提取（如果帧间隔不同，提取出来会有问题）
```bash
# 在Windows或者WSL中执行以下命令进行分离
ffmpeg -i filename.gif frame%04d.png
```

使用`PuzzleSolver`提取，是按照帧来进行提取

![](imgs/image-20241111093328214.png)

#### 2、帧间隔隐写

**[推荐] 方法一：直接使用`PuzzleSolver`提取帧间隔**

![](imgs/image-20241111093420194.png)

方法二：使用`identify`提取

```bash
identify -format "%s %T \n" flag.gif  #格式：帧序号 时间间隔（单位是1/100秒）
```

![](imgs/image-20250309155841569.png)

例题1-2024羊城杯初赛-checkin

例题2-2024浙江省赛决赛-非黑即白

#### GIF图像每帧的XY偏移量隐写

使用`identify`提取出偏移量然后再分析

```bash
identify flag.gif
```

例题1-Boxing Boxer

```python
import subprocess
from PIL import Image
from datetime import datetime

time_space = [...]

def get_pos(gif_file):
    offset_x = []
    offset_y = []
    pic_width = []
    pic_height = []
    cmd = f'identify {gif_file}'
    res = subprocess.run(cmd,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    output = res.stdout
    lines = output.strip().split('\n')
    
    for line in lines:
        tmp_lst = line.split(' ')
        frame_size,tmp_x,tmp_y = tmp_lst[3].split('+')
        offset_x.append(int(tmp_x))
        offset_y.append(int(tmp_y))
        tmp_x,tmp_y = tmp_lst[2].split('x')
        pic_width.append(int(tmp_x))
        pic_height.append(int(tmp_y))
        
    return offset_x,offset_y,pic_width,pic_height

def draw2pic(offset_x,offset_y,pic_width,pic_height):
    img = Image.new("RGB",(500,500),(255,255,255)) # 新建一张尺寸为500x500的RGB图像
    for idx,item in enumerate(time_space):
        if item == '70':
            continue
        elif item == '50':
            img.putpixel((offset_x[idx],offset_y[idx]),(255,255,255))
            img.putpixel((offset_x[idx]+pic_width[idx],offset_y[idx]+pic_height[idx]),(255,255,255))
        elif item == '60':
            img.putpixel((offset_x[idx],offset_y[idx]),(0,0,0))
            img.putpixel((offset_x[idx]+pic_width[idx],offset_y[idx]+pic_height[idx]),(0,0,0))
            
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    print(timestamp)
    img.save(f"{timestamp}.png")

if __name__ == "__main__":
    gif_file = "flag.gif"
    offset_x,offset_y,pic_width,pic_height = get_pos(gif_file)
    draw2pic(offset_x,offset_y,pic_width,pic_height)
```

#### GIF图像每帧的实际尺寸隐写

例题1-Boxing Boxer

### Webp思路

webp文件用电脑自带的图片看可能会有点问题，建议用浏览器打开这种文件

webp可能是动图，可以用下面这个脚本分离webp中的每帧图片

```python
from PIL import Image

img = Image.open('killer.webp')
n_frame = img.n_frames
for i in range(n_frame):
    img.seek(i)
    img.save(f'img/{i}.png')
```

### BPG图像文件

使用`bpg-0.9.8-win64`转换为PNG图片即可

```bash
.\bpgdec.exe .\flag.bpg
```

### RAW、ARW文件思路

#### 1、RAW的LSB隐写

ARW文件是 Sony 相机的原始数据格式

可以使用 rawpy 模块读取图片的像素数据，查看是否存在LSB隐写(例题1-2024-L3HCTF-RAWatermark)

示例脚本如下：

```python
import rawpy
import numpy as np
import libnum

with rawpy.imread('image.ARW') as raw:
    # 从 raw 对象中获取可见的 Bayer 格式图像数据
    bayer_visible = raw.raw_image_visible
    # print(bayer_visible)
    # 用 bitwise_and() 函数将 bayer_visible 中的每个像素值与 1 进行按位与操作，以提取每个像素的最低有效位（LSB）
    lsb_array = np.bitwise_and(bayer_visible, 1)
    # print(lsb_array)
    # 使用 NumPy 数组的 flatten() 方法将 lsb_array 数组展平成一维数组
    lsb_array_flat = lsb_array.flatten()
    # print(lsb_array_flat)
    hidden_message = ''.join(map(str, lsb_array_flat))
    # 将隐写的数据转为十六进制，便于查看文件头
    hex_data = hex(int(hidden_message, 2))
    # print(hex_data[:10]) # 0x504b0304
    # 将二进制数据转换为byte类型数据
    data = libnum.b2s(hidden_message)

with open('flag.zip', 'wb') as f:
    f.write(data)
```

#### 2、直接改后缀为.data，然后拖入Gimp调整即可

### 二维码思路

#### 1、bmp转二维码

#### 2、16进制转pyc

#### 3、字符串制作二维码

```
直接右键使用B神的脚本制作二维码，制作前注意要把字符串的长度手动修正为平方数
1.0 1制作二维码
2.00 11制作二维码
```

#### 4、四个TTL值转换一个字节的二进制数

#### 5、Aztec code、DataMatrix、GridMatrix、汉信码、PDF417code等

我们平常见的最多的二维码就是QRcode，但是实际上还有很多不同类型的二维码，这里就简单举几个例子：

![AztecCode](imgs/image-20250421205934212.png)

![DataMatrix](imgs/image-20250421210022191.png)

![GridMatrix](imgs/image-20250421210051456.png)

![MaxiCode](imgs/image-20250912223855981.png)

![DotCode](imgs/image-20250912224010642.png)

![汉信码](imgs/image-20250421210117218.png)

> 汉信码这里要注意，左下角的那块定位块的方向和另外几块是不一样的
> 
> 有时候题目会把这块定位块反过来

![PDF417code](imgs/image-20250421210137589.png)

这里要注意的是，出题人可能会把图片反相导致无法直接扫描

因此我们可以先将二维码拉入`StegSolve`或者`PS`进行反相处理，再扫描

#### QRcode 二维码标准的一些考点

关于 QRcode标准可以出的考点实在是太多了，有时间的话还是建议直接去读官方标准，我 Github 上存了一份

https://github.com/goodlunatic/ISO-IEC-18004-Standard

> 参考链接：
> 
> [https://note.tonycrane.cc/ctf/misc/qrcode/](https://note.tonycrane.cc/ctf/misc/qrcode/)
> 
> [https://www.cnblogs.com/luogi/p/15469106.html](https://www.cnblogs.com/luogi/p/15469106.html)
> 
> https://cabelis.ink/2023/01/16/crash-qrcode-by-hand/

例题1-2022NCTF qrssssssss

例题2-2023羊城杯决赛-LmqHmAsk

例题3-GEEKCTF2024 QRcode2

例题4-SHCTF2024 week2 练假成真

### 信号和图像处理中的一些变换方法

#### 快速傅里叶变换（FFT）



#### 离散傅里叶变换（DFT）



#### 离散余弦变换（DCT）



#### 离散小波变换（DWT）


## Misc——PDF题思路：

1、直接`binwalk`或者`foremost`提取出隐藏文件

2、可能是`wbStego4open`隐写，用`wbStego4open`输入密钥直接decode

3、PDF中可能携带了什么文件，可以在`firefox`或者别的PDF软件中打开并提取

4、PDF中可能有透明的文字，直接全选复制然后粘贴到记事本中查看即可

5、使用`DeEgger Embedder`工具`extract files`

6、使用PS打开，里面可能有多个图层(例题1-2024古剑山-jpg)

7、若PDF加密，可以尝试使用`pdfcrack`爆破一下密码（Ubuntu下可以直接 apt install）

```bash
pdfcrack -f enc.pdf -w rockyou.txt
```

## Misc——MS-Office题思路

有时候会遇到不知道是MS-Office中具体什么类型的情况，如下图

![](imgs/image-20250315203340810.png)

并且这个文件还是加密的，我们可以尝试把后缀改成`docx`或者`pptx`，然后用`PasswareKit`先爆破出密码

再用`msoffcrypto-tool`输入密码解密一下：https://github.com/nolze/msoffcrypto-tool

```bash
pip install msoffcrypto-tool
msoffcrypto-tool encrypted.docx decrypted.docx -p Passw0rd
```

解密完成后010打开就能判断出准确的文件类型了

### 新版本的文件类型(docx/xlsx/pptx)

#### Excel文件：.xls .xlsx

1、拉入010或者记事本，查找flag

2、取消隐藏先前隐藏的行和列

3、条件格式里设置突出显示某些单元格(黑白后可能会有图案)

4、要先将数据按照行列排序后再进行处理

#### Word文件：.doc .docx

1、直接foremost出隐藏文件

2、与宏有关系的各种攻击与隐写

```bash
分析word中的宏需要用到这样一个工具：oletools
这个工具直接在pip中安装即可使用: pip3 install oletools
doc格式可以不需要文档密码直接提取其中的vba宏代码
安装好oletools后直接运行以下代码提取即可，可能加密文档的加密算法就在期中
olevba .\attachment.doc > test.txt
```

3、利用行距来隐写（例：ISCC2023-汤姆历险记）

```
word中可能有一段是1倍行距，可能又有一段是1.5倍行距，需要根据不同行距敲出摩斯电码（单倍转为.多倍转为-空行转为空格或者分隔符）
```

4、docx中有emf和oleobject

```
可以直接双击word中那个emf图标，激活相关内容(如音频文件)然后再进一步分析
```

### MS-Office97-2003

#### OLEHeader修复

| 字段名称      | 偏移量       | 字段描述                                                         |
| --------- | --------- | ------------------------------------------------------------ |
| 文件签名      | 0x0-0-x7  | 固定值：D0CF11E0A1B11AE100                                       |
| 对象标识符     | 0x8-0x17  | 通常全为0                                                        |
| 次要版本号     | 0x18-0x19 | 通常为固定值：3E00                                                  |
| DLL版本号    | 0x1A-0x1B | 通常为固定值：0300                                                  |
| 字节序       | 0x1C-0x1D | 通常为小段序：FEFF                                                  |
| 每个扇区的大小   | 0x1E-0x1F | 通常为固定值0900（即2的9次方=512字节）                                     |
| 迷你扇区大小    | 0x20-0x21 | 通常为固定值0600（即2的6次方=64字节）                                      |
| 保留字段      | 0x22-0x23 | 通常为0000                                                      |
| 保留字段      | 0x24-0x27 | 通常为00000000                                                  |
| 目录扇区的数量   | 0x28-0x2B | 通常为00000000                                                  |
| FAT表扇区的数量 | 0x2C-0x2F | 存储文件分配表（FAT）占用的扇区数量（01000000）                                |
| 根目录扇区索引   | 0x30-0x33 | 根目录所在扇区的索引号，找RootEntry所载的扇区，计算时需要把第一个扇区排除0x6800/0x200-1=0x33 |

```
6800  52 00 6F 00 6F 00 74 00 20 00 45 00 6E 00 74 00  R.o.o.t. .E.n.t. 
6810  72 00 79 00 00 00 00 00 00 00 00 00 00 00 00 00  r.y............. 
6820  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................ 
6830  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................ 
6840  16 00 05 01 FF FF FF FF FF FF FF FF 03 00 00 00  ....ÿÿÿÿÿÿÿÿ.... 
6850  06 09 02 00 00 00 00 00 C0 00 00 00 00 00 00 46  ........À......F
```

| 事务签名           | 0x34-0x37 | 通常为固定值：00000000                                                      |
| -------------- | --------- | -------------------------------------------------------------------- |
| 迷你流最大大小        | 0x38-0x3B | 通常为固定值：00010000                                                      |
| 第一个迷你 FAT 扇区索引 | 0x3C-0x3F | 短扇区分配表的扇区位置,一般紧接着RootEntry,得看RootEntry占用多少扇区,这里是占用两个扇区,因此这里的值应该填0x35 |
| 迷你 FAT 扇区数量    | 0x40-0x43 | 短扇区分配表占用的扇区数，这里长度为0x200，因此只占用了一个扇区                                   |

```
6C00  01 00 00 00 FE FF FF FF FF FF FF FF FF FF FF FF  ....þÿÿÿÿÿÿÿÿÿÿÿ 
6C10  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6C20  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6C30  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6C40  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6C50  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6C60  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
...
6DB0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6DC0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6DD0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6DE0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
6DF0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
```

| 第一个 DIFAT 扩展扇区索引 | 0x44-0x47 | 指向第一个 DIFAT（双 FAT）扇区的起始位置（FAT 索引） |
| ---------------- | --------- | --------------------------------- |
| DIFAT 扇区数量       | 0x48-0x4B | 存储 DIFAT（双 FAT）表占用的扇区数量           |

0x44-0x4B：主扇区分配表的扩展部分的索引以及其数量，因为文件比较小没有用到扩展部分，第一个应该是-2即0xFEFFFFFF，然后数量为0

| DIFAT 表 | 0x4C-0x1FF | 主扇区分配表，因为文件不是很大,基本只有前面几个字节是有意义的,后面都是0xFF，取值和RootEntry的扇区号有关，一般就是root扇区倒着写，因为root为0x33,这里我们填一个0x32000000 |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------- |

最后修复完整后的OLEHeader如下

```
0000  D0 CF 11 E0 A1 B1 1A E1 00 00 00 00 00 00 00 00  ÐÏ.à¡±.á........ 
0010  00 00 00 00 00 00 00 00 3E 00 03 00 FE FF 09 00  ........>...þÿ.. 
0020  06 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00  ................ 
0030  33 00 00 00 00 00 00 00 00 10 00 00 35 00 00 00  3...........5... 
0040  01 00 00 00 FE FF FF FF 00 00 00 00 32 00 00 00  ....þÿÿÿ....2... 
0050  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
0060  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
0070  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
0080  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
0090  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
...
01C0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
01D0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
01E0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ 
01F0  FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF  ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
```

## Misc——txt题思路：

### 1、 有可能是ntfs，直接用NtfsStreamsEditor2扫描所在文件夹，然后导出可疑文件【如果是压缩包，一定要用winrar解压】

### 2、可能是wbStego4open隐写，用wbStego4open直接decode(可能有密钥)

### 3、如果是那种文件夹套文件夹的题目，可以直接把路径粘贴到everything中，让everything一把梭

### 4、无字天书(whitespace)&snow隐写

一个文件打开都是空白字符

可以使用在线网站解密：https://vii5ard.github.io/whitespace/ 复制进去直接run即可

snow隐写，到snowdos32工具目录下运行 SNOW.EXE -C -p password flag.txt 命令即可

### 5、垃圾邮件隐写(spammimic)

例题1-2024强网拟态初赛-PvZ

直接使用以下在线网站解密即可：

https://www.spammimic.com/

### 6、Cloakify隐写

例题1-群友发的题

附件下载链接：https://pan.baidu.com/s/1EMAMOeot_aKXIs5pckTQfQ?pwd=93np 提取码：93np

解密需要用到[Cloakify](https://github.com/TryCatchHCF/Cloakify)这个项目

拿到密文和字典后，直接Python运行解密即可

```bash
python2 decloakify.py cipher.txt passwd.txt
```

> Tips：如果碰到解密失败的情况，可以试试看在windows下重新复制文本，并在末尾加一个换行符

## Misc——html题思路：

1、可能是`wbStego4open`隐写，用`wbStego4open`直接输入密钥decode

## Misc——压缩包思路：

Tips：压缩包的密码可以是可打印字符(中英文数字+特殊符号)，也可以是不可打印字符

没有思路时可以直接纯数字/字母暴力爆破一下

### zip文件结构

三部分：压缩文件源数据区 + 压缩源文件目录区 + 压缩源文件目录结束标志

**文件源数据区**

|        字段名称        |              字段描述              |
| :----------------: | :----------------------------: |
|    frSignature     |       ZIP文件头，固定值504B0304       |
|     frVersion      |        解压所需的 pkware 版本         |
|      frFLags       | 全局方式位标记，最低位的1bit是1表示加密，是0表示未加密 |
|   frCompression    |    压缩方法（具体值如Store、Deflate等）    |
|     frFileTime     |          被压缩文件的最后修改时间          |
|     frFileDate     |          被压缩文件的最后修改日期          |
|       frCrc        |        文件压缩前 CRC-32 的值         |
|  frCompressedSize  |          被压缩文件压缩后的大小           |
| frUncompressedSize |          被压缩文件压缩前的大小           |
|  frFileNameLength  |          被压缩文件的文件名长度           |
| frExtraFieldLength |         扩展字段长度（具体值如0等）         |
|     frFileName     |           被压缩文件的文件名            |
|       frData       |          被压缩文件压缩后的数据           |

**文件目录区**

|         字段名称         |                              字段描述                               |
| :------------------: | :-------------------------------------------------------------: |
|     deSignature      |                         签名，通常是504B0102                          |
|   deVersionMadeBy    |                         制作于哪个 pkware 版本                         |
|  deVersionToExtract  |                  解析该目录需要的版本号，与数据区frVersion的值一致                  |
|       deFLags        |                      一般标志位，与数据区frFlags的值一致                      |
|    deCompression     |                   压缩方法，与数据区frCompression的值一致                    |
|      deFileTime      |                   被压缩文件的最后修改时间，与数据区中对应字段的值一致                    |
|      deFileDate      |                   被压缩文件的最后修改日期，与数据区中对应字段的值一致                    |
|        deCrc         |                         文件压缩前 CRC-32 的值                         |
|   deCompressedSize   |                           被压缩文件压缩后的大小                           |
|  deUncompressedSize  |                           被压缩文件压缩前的大小                           |
|   deFileNameLength   |                           被压缩文件的文件名长度                           |
|  deExtraFieldLength  |                      扩展字段长度（与数据区的对应值可能不一致）                      |
| deFileCommentLength  |                             文件备注长度                              |
|  deDiskNumberStart   |               文件起始位置所在的磁盘编号（早期磁盘很小的情况下，压缩包可能跨磁盘）                |
| deInternalAttributes |                             内部文件属性                              |
| deExternalAttributes |                             外部文件属性                              |
| uint deHeaderOffset  | 本目录指向的entry相对于第一个entry的起始位置，单位byte，这也就限制了ZIP文件最大也就是4G了，再大就无法定位了 |
|      deFileName      |                            被压缩文件的文件名                            |
|     deExtraField     |                              扩展字段                               |

**文件目录结束**

|         字段名称         |         字段描述         |
| :------------------: | :------------------: |
|     elSignature      |    签名，通常是504B0506    |
|     elDiskNumber     |        当前磁盘编号        |
|  elStartDiskNumber   |      中央目录起始磁盘编号      |
|   elEntriesOnDisk    |    当前磁盘上的中央目录记录数     |
| elEntriesInDirectory |       中央目录总条目数       |
|   elDirectorySize    |       中央目录的总大小       |
|  elDirectoryOffset   | 中央目录相对于第一个entry的起始位置 |
|   elCommentLength    |         注释长度         |
|    char elComment    |        压缩包注释         |

#### 常见报错及对应解决方法（借助010的模板功能）

1. 该文件已损坏-源数据区和目录区的文件名长度被修改了

![](imgs/image-20240724172656435.png)

2. CRC校验错误-源数据区或目录区的压缩方法被修改了

![](imgs/image-20240724172708418.png)

### rar文件结构

| HEX 数据             | 描述                        | 010Editor 模板数据 |
| -------------------- | --------------------------- | ------------------ |
| 52 61 72 21 1A 07 00 | rar 文件头标记，文本为 Rar! |                    |

**Main block**

| HEX 数据    | 描述              | 010Editor 模板数据      |
| ----------- | ----------------- | ----------------------- |
| 33 92 B5 E5 | 全部块的 CRC32 值 | uint32 HEAD_CRC         |
| 0A          | 块大小            | struct uleb128 HeadSize |
| 01          | 块类型            | struct uleb128 HeadType |
| 05          | 阻止标志          | struct uleb128 HeadFlag |

**File Header**

| HEX 数据    | 描述              | 010Editor 模板数据      |
| ----------- | ----------------- | ----------------------- |
| 43 06 35 17 | 单独块的 CRC32 值 | uint32 HEAD_CRC         |
| 55          | 块大小            | struct uleb128 HeadSize |
| 02          | 块类型            | struct uleb128 HeadType |
| 03          | 阻止标志          | struct uleb128 HeadFlag |

**Terminator**

| HEX 数据    | 描述            | 010Editor 模板数据      |
| ----------- | --------------- | ----------------------- |
| 1D 77 56 51 | 固定的 CRC32 值 | uint32 HEAD_CRC         |
| 03          | 块大小          | struct uleb128 HeadSize |
| 05          | 块类型          | struct uleb128 HeadType |
| 04 00       | 阻止标志        | struct uleb128 HeadFlag |

### 1、压缩包伪加密

> 感觉网上很多讲压缩包伪加密的博客都是有问题的，因此打算这里详细总结一下
> 
> 首先，frFlags 只是用于告诉压缩软件这个压缩包是否被加密，**没有任何一个标志可以直接表示压缩包是否是伪加密**。我们只能通过frFlags这个标志位判断出压缩包当前是否是加密状态，如果是加密状态，我们再进一步尝试判断是否是伪加密。

#### zip文件：

Bandizip判断压缩包是否加密的方式：压缩源文件数据区的 `frFlags`

7zip判断压缩包是否加密的方式：压缩源文件目录区的 `frFlags`

因此，出题的时候需要把这两个位置都改了，要不然换个软件可能就直接非预期了

**去除伪加密的方法：直接用`010editor`打开，将压缩源文件数据区第8字节和压缩源文件目录区第10字节改为00即可**

#### rar文件：

rar的伪加密有两种方式：

第一种是把第24字节尾数改成1：因此`010editor`打开，第24个字节尾数为4表示加密，0表示无加密，将尾数改为0即可去除伪加密

第二种是把第11字节的尾数改成1：因此`010editor`打开，把第11字节改为`\x00`即可

### 2、CRC爆破

适用于压缩包中文件比较小，比如只有几字节的时候

可以直接用网上的脚本爆破，但是要注意有些脚本只能提取zip压缩包的CRC32：

https://github.com/AabyssZG/CRC32-Tools

https://github.com/theonlypwner/crc32

```bash
python3 crc32.py reverse 0x7c2df918
```

发现网上大部分的脚本只能爆破可打印字符的结果，因此这里我自己写了一个包含不可打印字符的脚本

```python
import binascii

class CRC32Reverse:
    def __init__(self, crc32, length, tbl=bytes(range(256)), poly=0xEDB88320, accum=0):
        self.char_set = set(tbl)  # 支持所有字节
        self.crc32 = crc32
        self.length = length
        self.poly = poly
        self.accum = accum
        self.table = []
        self.table_reverse = []

    def init_tables(self, poly, reverse=True):
        """构建 CRC32 表及其反向查找表"""
        # CRC32 表构建
        for i in range(256):
            for j in range(8):
                if i & 1:
                    i >>= 1
                    i ^= poly
                else:
                    i >>= 1
            self.table.append(i)

        assert len(self.table) == 256, "CRC32 表的大小错误"

        # 构建反向查找表
        if reverse:
            for i in range(256):
                found = [j for j in range(256) if self.table[j] >> 24 == i]
                self.table_reverse.append(tuple(found))
            
            assert len(self.table_reverse) == 256, "反向查找表的大小错误"

    def calc(self, data, accum=0):
        """计算 CRC32 校验值"""
        accum = ~accum
        for b in data:
            accum = self.table[(accum ^ b) & 0xFF] ^ ((accum >> 8) & 0x00FFFFFF)
        accum = ~accum
        return accum & 0xFFFFFFFF

    def find_reverse(self, desired, accum):
        """查找反向字节序列"""
        solutions = set()
        accum = ~accum
        stack = [(~desired,)]
        
        while stack:
            node = stack.pop()
            for j in self.table_reverse[(node[0] >> 24) & 0xFF]:
                if len(node) == 4:
                    a = accum
                    data = []
                    node = node[1:] + (j,)
                    for i in range(3, -1, -1):
                        data.append((a ^ node[i]) & 0xFF)
                        a >>= 8
                        a ^= self.table[node[i]]
                    solutions.add(tuple(data))
                else:
                    stack.append(((node[0] ^ self.table[j]) << 8,) + node[1:] + (j,))
        
        return solutions

    def dfs(self, length, outlist=[b'']):
        """深度优先搜索生成字节序列"""
        if length == 0:
            return outlist
        tmp_list = [item + bytes([x]) for item in outlist for x in self.char_set]
        return self.dfs(length - 1, tmp_list)

    def run_reverse(self):
        """执行 CRC32 反向查找"""
        self.init_tables(self.poly)

        desired = self.crc32
        accum = self.accum
        result_list = []

        # 处理至少为 4 字节的情况
        if self.length >= 4:
            patches = self.find_reverse(desired, accum)
            for patch in patches:
                checksum = self.calc(patch, accum)
                # print(f"verification checksum: 0x{checksum:08x} ({'OK' if checksum == desired else 'ERROR'})")
            for item in self.dfs(self.length - 4):
                patch = list(item)
                patches = self.find_reverse(desired, self.calc(patch, accum))
                for last_4_bytes in patches:
                    patch.extend(last_4_bytes)
                    checksum = self.calc(patch, accum)
                    if checksum == desired:
                        result_list.append(bytes(patch))  # 添加符合条件的字节序列
        else:
            for item in self.dfs(self.length):
                if self.calc(item) == desired:
                    result_list.append(bytes(item))  # 添加符合条件的字节序列
        return result_list

def crc32_reverse(crc32, length, char_set=bytes(range(256)), poly=0xEDB88320, accum=0):
    obj = CRC32Reverse(crc32, length, char_set, poly, accum)
    return obj.run_reverse()  # 返回所有结果

def crc32(s):
    return binascii.crc32(s) & 0xFFFFFFFF

if __name__ == "__main__":
    crc_values = [0xf72c104b, 0x39004188]
    for item in crc_values:
        print(crc32_reverse(item, 5))
```

例题1-BugKu MISC 就五层你能解开吗?

参考文章：https://blog.csdn.net/mochu7777777/article/details/110206427

### 3、暴力破解压缩包密码

可以使用的工具：`Advanced Archive Password Recovery(ARCHPR)`、`Passware Kit Forensic`、`Hashcat` 

爆破效率:`Advanced Archive Password Recovery(ARCHPR)` < `Passware Kit Forensic`< `Hashcat`

爆破的类型主要可以分为`限制字符集及长度的爆破`、`掩码爆破`、`字典爆破`这三种

> Tips：
> 1. 掩码爆破这里，`ARCHPR`是用`?`表示占位符、而`Passware Kit Forensic`是用例如`?d`等正则表达式表示占位符
> 
> 2. 字典爆破推荐使用`rockyou.txt`这个字典，`kali`系统中自带了，在`/usr/share/wordlists`目录下

**Hashcat爆破压缩包密码的步骤**

1. 生成待爆破的Hash值

```
联网的情况下可以使用在线网站生成：https://hashes.com/en/johntheripper
断网的情况下可以使用johntheripper生成 .\zip2john.exe .\layer3.zip
```

2.找到对应的Hash类型：https://hashcat.net/wiki/doku.php?id=example_hashes

3.使用Hashcat进行爆破
```bash
.\hashcat.exe -a 3 -m 17200 hash1.txt --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d --force
.\hashcat.exe -a 3 -m 17200 -1 ?d hash2.txt Y3p_P@ssW0rd_1s_?1?1?1?1?1?1 --force
.\hashcat.exe -a 0 -m 17200 hash3.txt rockyou.txt --force
.\hashcat.exe -a 3 -m 11600 -1 ?d hash4.txt Y3p_Ke9_1s_?1?1?1?1?1 --force
```

> 参数含义：
> 
> -a 后跟使用的攻击类型 3表示掩码攻击 0表示字典攻击
> 
> -m 后跟待爆破的Hash类型，具体类型参考上面的链接
> 
> --increment --increment-min 1 --increment-max 6 表示限制长度1-6位
> 
> -1 表示自定义字符集 ?d代表数字  ?l代表小写字母  ?u代表大写字母  ?s代表特殊符号
> 
> --force 代表忽略破解过程中的警告信息
> 
> --show 输出已爆破出的Hash值及对应明文，爆破成功的Hash会保存在hashcat.potfile文件中

### 4、压缩包套娃解套

压缩包套娃可能会包含多种类型的压缩混合套娃，但是流程都差不多，这里就贴一下我写的脚本吧

```python
import zipfile
import rarfile
import py7zr
import os

def decompress_7z(archive_file):
    with py7zr.SevenZipFile(archive_file, 'r') as archive:
        file_list = archive.list()
        new_archive_file = file_list[0].filename
    with py7zr.SevenZipFile(archive_file, mode='r') as archive:
        archive.extractall("tmp/")
    print(f"[+] {archive_file} 解压成功 ==>")
    os.remove(archive_file)
    os.system("mv tmp/* .")
    os.rmdir("tmp")
    return new_archive_file

def decompress_zip(archive_file):
    with zipfile.ZipFile(archive_file, 'r') as zip_ref:
        file_list = zip_ref.namelist()
        new_archive_file = file_list[0]
    os.mkdir("tmp")
    with zipfile.ZipFile(archive_file, 'r') as zip_ref:
        zip_ref.extractall(path="tmp/")
    print(f"[+] {archive_file} 解压成功 ==>")
    os.remove(archive_file)
    os.system("mv tmp/* .")
    os.rmdir("tmp")
    return new_archive_file

def decompress_rar(archive_file):
    with rarfile.RarFile(archive_file) as rar_ref:
        file_list = rar_ref.namelist()
        new_archive_file = file_list[0]
    os.mkdir("tmp")
    with rarfile.RarFile(archive_file) as rar_ref:
        rar_ref.extractall(path="tmp/")
    print(f"[+] {archive_file} 解压成功 ==>")
    os.remove(archive_file)
    os.system("mv tmp/* .")
    os.rmdir("tmp")
    return new_archive_file

if __name__ == "__main__":
    archive_file = "flag.zip"
    while True:
        if "7z" in archive_file:
            archive_file = decompress_7z(archive_file)
        elif "rar" in archive_file:
            archive_file = decompress_rar(archive_file)
        elif "zip" in archive_file:
            archive_file = decompress_zip(archive_file)
        else:
            break
```

```python
import os
import subprocess
import py7zr

input_file = 'shell9999.tar.gz'  # 更改为你的文件路径

def get_compressed_type(filepath: str) -> str:
    cmd = ['file', filepath]
    file_cmd_output = subprocess.run(cmd, stdout=subprocess.PIPE).stdout.decode().strip()

    if 'gzip compressed data' in file_cmd_output:
        return 'tar.gz'
    if 'Zip archive data' in file_cmd_output:
        return 'zip'
    if '7-zip archive data' in file_cmd_output:
        return '7z'
    if 'gzip compressed data' in file_cmd_output:
        return 'gzip'
    if 'XZ compressed data' in file_cmd_output:
        return 'xz'
    if 'bzip2 compressed data' in file_cmd_output:
        return 'bzip2'
    if 'LZMA compressed data' in file_cmd_output:
        return 'lzma'
    if 'Zstandard compressed data' in file_cmd_output:
        return 'zstd'
    return ''

while True:
    ctype = get_compressed_type(input_file)
    if ctype == "tar.gz":
        cmd = ['tar', '-xzf', input_file]
        subprocess.run(cmd)
    elif ctype == "zip":
        cmd = ['unzip', input_file]
        subprocess.run(cmd)
    elif ctype == "7z":
        with py7zr.SevenZipFile(input_file, mode='r') as z:
            z.extractall()
    elif ctype == "gzip":
        tmp_file = input_file + ".gz"
        cmd = "mv {} {}; gunzip {}".format(input_file, tmp_file, tmp_file)
    elif ctype == "xz":
        tmp_file = input_file + ".xz"
        cmd = "mv {} {}; unxz {}".format(input_file, tmp_file, tmp_file)
    elif ctype == "bzip2":
        tmp_file = input_file + ".bz2"
        cmd = "mv {} {}; bunzip2 {}".format(input_file, tmp_file, tmp_file)
    elif ctype == "lzma":
        tmp_file = input_file + ".lzma"
        cmd = "mv {} {}; unlzma {}".format(input_file, tmp_file, tmp_file)
    elif ctype == "zstd":
        tmp_file = input_file + ".zst"
        cmd = "mv {} {}; unzstd --force {}".format(input_file, tmp_file, tmp_file)
    else:
        print("Unsupported file type or done extracting!")
        break

    # 删除已解压的文件并更新input_file为新解压的文件
    os.remove(input_file)
    files = [f for f in os.listdir() if os.path.isfile(f) and f != "test.py"]
    if len(files) == 1:
        input_file = files[0]
    else:
        print("Unexpected number of files in directory!")
        break

```

> Tips：ZIP压缩包套娃建议用`pyzipper`模块写脚本解套，不要用`zipfile`了，这个模块有点过时了

### 5、分卷压缩包合并

使用以下命令合并或者直接`Bandizip`打开
```bash
copy /B topic.zip.001 + topic.zip.002+topic.zip.003+topic.zip.004+topic.zip.005+topic.zip.006 topic.zip
```

### 6、压缩包炸弹

很小的压缩文件，解压出来会占据巨大的空间，甚至撑爆磁盘

处理方法：010中直接编辑压缩包文件，看看是否藏有另一个压缩包

### 7、根据010中的模板修改了某些参数

有些题目可能会修改源数据中压缩包文件中被压缩文件的文件名的长度

源数据中被压缩文件名字的长度对不上也会导致解压后文件无法打开

所以...010的模板功能真的非常非常的好用！

![](imgs/010.png)

### 8、压缩包密码是不可见字符

#### 字节数很短的情况

直接写个Python脚本爆破即可

```python
import zipfile
import libnum

def solve():
    # 在ASCII编码中，一个字符占用8位（1字节）
    for i in range(256):
        for j in range(256):
            fz = zipfile.ZipFile('secret key.zip', 'r')
            password = libnum.n2s(i) + libnum.n2s(j)
            print(f"[+]正在尝试密码{password}")
            try:
                fz.extractall(pwd=password)
                fz.close()
                return password
            except:
                fz.close()
                continue
    return None

if __name__ == "__main__":
    password = solve()
    if password:
        print(f"[+]压缩包解压成功,密码是{password}")
    else:
        print(f"[+]在该范围内找不到压缩包密码，压缩包解压失败")
```

#### 字节数较长的情况

需要先把密码base64编码一下，然后再base64解码成byte类型作为密码

```python
import base64
import pyzipper

target_zip = '1.zip'
outfile = './solved'

pwd = base64.b64decode(b'aEXigItjVOKAjEbigI8=')
# b'hE\xe2\x80\x8bcT\xe2\x80\x8cF\xe2\x80\x8f'
with pyzipper.AESZipFile(target_zip, 'r') as f:
    f.pwd = pwd
    f.extractall(outfile)
```

### 9、明文攻击

压缩包使用明文攻击的具体要求如下：

> 1. 至少已知明文的12个字节及偏移，其中至少8字节需要连续
> 
> 2. 如果是已知**部分明文**进行明文攻击，对应的**加密算法**和**压缩算法**需要分别是：`ZipCrypto`和 `store`；如果是已知**全部明文或其中一个文件**，对应的压缩算法可以是 `deflate`（具体原理可以参考明文攻击的那篇论文）
> 
> 3. 需要知道出题人用的压缩工具

如何判断压缩工具（参考自Byxs20的博客）

|     压缩工具     | VersionMadeBy(压缩所用版本) |
| :----------: | :-------------------: |
| Bandzip 7.06 |          20           |
|  Windows自带   |          20           |
|    WinRAR    |          20           |
| WinRAR 4.20  |          31           |
| WinRAR 5.70  |          31           |
|    7-Zip     |          63           |

**bkcrack常用参数**

```bash
-c 要解密的文件
-P 已知明文所在的压缩包
-p 已知的明文部分
-x 压缩包内目标文件的偏移地址  部分已知明文值
-C 加密压缩包
-o offset  -p参数指定的明文在压缩包内目标文件的偏移量
-k 后面加破解出的三段密钥
-d 后面加解密后数据的保存位置
-U 修改压缩包密码并导出	bkcrack -C flag.zip -c hint.jpg -k afb9fee3 f8795353 f6de1d4e -U out.zip 114514
```


#### 已知所有的明文或三段密钥

方法一、直接使用Advanced Archive Password Recovery破解

> 有和压缩包中的一样(CRC值一样)的文件时，压缩然后用上面那个软件进行明文攻击,这个攻击的过程可能需要几分钟
> 
> 有了完整的三段密钥也可以使用这个工具破解密码

方法二、使用 bkcrack破解(推荐)

> 把相同文件按照对应的压缩方法，压缩成压缩包，然后使用bkcrack破解即可

例题1-2023古剑山-幸运饼干

  ```bash
  $ bkcrack -C flag.zip -c hint.jpg -p hint.jpg -P hint.zip
  bkcrack 1.5.0 - 2023-03-08
  [14:37:27] Z reduction using 25761 bytes of known plaintext
  100.0 % (25761 / 25761)
  [14:37:29] Attack on 289 Z values at index 21821
  Keys: afb9fee3 f8795353 f6de1d4e
  100.0 % (289 / 289)
  [14:37:29] Keys
  afb9fee3 f8795353 f6de1d4e
  ```

例题2-2023铁三决赛-baby_jpg

> 先从部分伪加密的压缩包中分离出`serect.pdf`，然后从PDF中 foremost 出了加密压缩包中的`sha512.txt`
> 
> 将`sha512.txt`压缩成`sha512.zip`，然后使用下面的命令进行明文攻击即可：

```bash
$ bkcrack -C 00000218.zip -c 'sha512.txt' -P sha512.zip -p sha512.txt
bkcrack 1.5.0 - 2023-03-08
[16:14:25] Z reduction using 78 bytes of known plaintext
100.0 % (78 / 78)
[16:14:25] Attack on 104916 Z values at index 6
Keys: ed3fb6a9 1c4a7211 c07461ed
59.9 % (62867 / 104916)
[16:14:52] Keys
ed3fb6a9 1c4a7211 c07461ed

$ bkcrack -C 00000218.zip -k ed3fb6a9 1c4a7211 c07461ed -U out.zip 111
bkcrack 1.5.0 - 2023-03-08
[16:15:44] Writing unlocked archive out.zip with password "111"
100.0 % (3 / 3)
Wrote unlocked archive.
```

> 参数含义：
> 
> -C 后跟待破解的压缩包，
> 
> -c 后跟压缩包中我们要攻击的明文文件
> 
> -P 后跟我们压缩好的压缩包
> 
> -p 后跟我们已得的明文文件
> 
> -U 参数用于修改压缩包密码并导出

#### 已知部分明文

##### 1)利用明文文本破解

```
已知 flag{16e371fa-0555-47fc-b343-74f6754f6c01} 字符串中的flag{16e*********************74f6********
```

```bash
echo -n "lag{16e3" > plain1.txt   #连续的8明文
echo -n "74f6" | xxd             #额外明文的十六进制格式，37346636
bkcrack -C 7-2.zip -c flag.txt -p plain1.txt -o 0 -x 29 37346636
bkcrack -C 7-2.zip -c flag.txt -p plain1.txt -o 0 -x 29 37346636
bkcrack -C 7-2.zip -c flag.txt -k b21e5df4 ab9a9430 8c336475 -U out.zip 123

# -o 和 -x 后需要已知明文在文件中的偏移量
# -o 指定的明文不需要转为十六进制
# -x 指定的明文需要转成十六进制
```

##### 2)利用PNG图片文件头破解

```bash
echo 89504E470D0A1A0A0000000D49484452 | xxd -r -ps > png_header
bkcrack -C png4.zip -c 2.png -p png_header -o 0
bkcrack -C png4.zip -c flag.txt -k e0be8d5d 70bb3140 7e983fff -U out.zip 123
```

##### 3)利用压缩包格式破解

> 将一个名为flag.txt的文件打包成ZIP压缩包后，发现文件名称会出现在压缩包文件头中，且偏移固定为30
> 
> 且默认情况下，flag.zip也会作为该压缩包的名称
> 
> 已知的明文片段有：
> 
> “flag.txt”  8个字节，偏移30
> 
> ZIP本身文件头：50 4B 03 04 ，4字节
> 
> 满足12字节的要求

```bash
echo -n "flag.txt" > plain1.txt # -n参数避免换行，不然文件中会出现换行符，导致攻击失效
bkcrack -C 7-4.zip -c flag.zip -p plain1.txt -o 30  -x 0 504B0304
bkcrack -C 7-4.zip -c flag.zip -k b21e5df4 ab9a9430 8c336475  -U out.zip 123
```

> Tips：如果这里用 `XXXXX.txt`作为明文无法破解成功，可以试试直接去掉后缀`.txt`

当然，这里还有另外一种攻击方式，因为 ZIP 压缩包的尾部 22 字节肯定是`504b050600000000`开头的

所以当 ZIP 压缩包内压缩的是一个压缩包或者一个目录的时候，偏移量就等于`被压缩文件的大小-22`

因此我们可以用 010 把 `504b050600000000` 导入 Hex 到 plain.txt 中做一个已知明文

然后偏移量 -o 参数后跟上 `被压缩文件的大小-22`


![](imgs/image-20250920222741333.png)


例题1-NKCTF2023——五年Misc，三年模拟

```bash
#echo -n "handsome.txt" > plain1.txt 破解失败
echo -n "handsome" > plain1.txt
bkcrack -C test5.zip -c handsome.zip -p plain1.txt -o 30  -x 0 504B0304
```

##### 4)利用EXE文件格式破解

> EXE文件默认加密情况下，不太会以store方式被加密，但它文件格式中的的明文及其明显，长度足够。
> 
> 如果加密ZIP压缩包出现以store算法存储的EXE格式文件，很容易进行破解。
> 
> 大部分exe中都有这相同一段，且偏移固定为64：

![img](https://image.3001.net/images/20201117/1605593956_5fb36b64db62588f96dcc.png!small)

```bash
echo -n "0E1FBA0E00B409CD21B8014CCD21546869732070726F6772616D2063616E6E6F742062652072756E20696E20444F53206D6F64652E0D0D0A2400000000000000" | xxd -r -ps > mingwen # 需要在Linux下使用，Windows下可以用010或者CyberChef
bkcrack -C 7-5.zip -c nc64.exe -p mingwen -o 64
bkcrack -C 7-5.zip -c nc64.exe -k b21e5df4 ab9a9430 8c336475  -U out.zip 123
```

##### 5)利用pcapng格式破解

```bash
echo -n "00004D3C2B1A01000000FFFFFFFFFFFFFFFF" | xxd -r -ps > pcap_plain # 需要在Linux下使用，Windows下可以用010或者CyberChef
bkcrack -C 7-6.zip -c capture.pcapng -p pcap_plain -o 6
bkcrack -C 7-6.zip -c capture.pcapng  -k 2c795462 fe9163bf 53086712  -U out.zip 123
```

##### 6)利用XML文件格式破解

```
robots.txt的文件开头内容通常是User-agent: * 
html文件开头通常是 <!DOCTYPE html>
xml文件开头通常是<?xml version="1.0" encoding="UTF-8"?>
```

```bash
echo -n '<?xml version="1.0" encoding="UTF-8"?>' > xml_plain
bkcrack -C 7-7.zip -c 123/web.xml -p xml_plain -o 0 # 注意相对路径
bkcrack -C 7-7.zip -c 123/web.xml  -k e0be8d5d 70bb3140 7e983fff  -U out.zip 123
```

##### 7)利用SVG文件格式破解

```bash
#SVG是一种基于XML的图像文件格式
echo -n '<?xml version="1.0" ' > plain.txt
bkcrack -C 7-8.zip -c spiral.svg -p plain.txt -o 0
bkcrack -C 7-8.zip -c advice.jpg -k c4038591 d5ff449d d3b0c696 -U out.zip 123
```

##### 8)利用VMDK文件格式破解

```bash
echo -n "4B444D560100000003000000" | xxd -r -ps > plain
bkcrack -C 7-9.zip -c flag.vmdk -p plain -o 0
bkcrack -C 7-9.zip -c flag.vmdk -k e6a73d9f 21ccfdbc f3e0c61c -U out.zip 123
```

**有时候直接给你部分明文的情况（2023 DASCTFxCBCTF）**

直接在bkcrack中使用以下命令即可，key是题目给的压缩包中被压缩文件的部分明文

```bash
bkcrack -C purezip.zip -c 'secret key.zip' -p key
```

#### 得到密钥后使用bkcrack修改压缩包密码

破解出压缩包的三段密钥后，可以用 -U 参数修改压缩包密码并导出

```bash
$ bkcrack -C 00000218.zip -k ed3fb6a9 1c4a7211 c07461ed -U out.zip 111
bkcrack 1.5.0 - 2023-03-08
[16:15:44] Writing unlocked archive out.zip with password "111"
100.0 % (3 / 3)
Wrote unlocked archive.
```

#### 得到密钥后反向爆破压缩包密码

```bash
bkcrack -k e48d3828 5b7223cc 71851fb0 -r 3 \?b

bkcrack 1.5.0 - 2023-03-08
[17:47:50] Recovering password
length 0-6...
[17:47:50] Password
as bytes: 8b e7 dc
as text: ���
```

#### 在比赛中的使用记录

**2022 西湖论剑zipeasy**

```
bkcrack -C zipeasy.zip -c dasflow.zip -x 30 646173666c6f772e706361706e67 -x 0 504B0304
```

**2023 DASCTFxCBCTF**

利用bkcrack反向爆破密钥

```bash
bkcrack -k e48d3828 5b7223cc 71851fb0 -r 3 \?b

bkcrack 1.5.0 - 2023-03-08
[17:47:50] Recovering password
length 0-6...
[17:47:50] Password
as bytes: 8b e7 dc
as text: ���
```

然后如果要对得到的密钥进行MD5加密，可以使用CyberChef（From Hex + MD5）

![](imgs/MD5.png)

> Tips：
> 1. 明文攻击失败可以尝试多换几个压缩软件：Bandizip、Winrar、7zip、360压缩、2345压缩、kali自带的压缩软件等
> 
> 2. 这里`echo -n xxx > 1.txt`要注意在Windows下使用默认是`utf-16LE`编码，Linux下使用才是`utf-8`，这个原因也会导致攻击失败
> 
> 3. 这里密钥爆破成功后推荐使用-U改密码导出压缩包，不推荐使用-d直接解出对应文件，因为文件如果是`deflate`压缩的直接解出来会乱码

> 参考资料:
> 
> https://www.freebuf.com/articles/network/255145.html
> 
> https://byxs20.github.io/posts/30731.html#%E6%80%BB%E7%BB%93

### 10、直接补上Zlib头解压

![](imgs/image-20250415103117200.png)

假如压缩包在压缩时选择的是无加密并且压缩方法是`Deflate`

![](imgs/image-20250415103228713.png)

我们可以直接在010中把`frData`的数据提取出来，前面加上`78 9C`然后`Zlib Inflate`解压即可

![](imgs/image-20250415103608664.png)

例题1-2025TGCTF-ez_zip

### 11、把加密的压缩包篡改成伪加密的情况

解决方案：将加密位修改回来即可

> 以下内容参考自八神：
> 
> frFlags和deFlags这两字节其实就叫Flags，010模板里写fr和de是为了区分数据存储区还是中央目录区
> 
> 然后这两字节一共16bit,只有最低位是记录加密与否的，倒数第二三两个bit记录压缩选项，大部分情况下改了没事
> 
> 但这两字节改成09的话就动了倒数第四个bt,记录数据描述符，这个bit是1的话，标头里的CRC32和文件大小是未知的
> 
> 实际数据会以额外的12或16字节结构出现在压缩数据后面，把一个实际上没有数据描述符的压缩包的flags倒数第四bit改成1
> 
> 会导致软件被指示去读取一个不存在的描述符片段，从而导致后续的数据读取全部错乱

### 12、压缩包文件时间戳隐写

如果是加密的压缩包，可以用下面的脚本提取时间戳，然后尝试转Ascii码

```python
import pyzipper
import datetime

def get_zip_timestamps(zip_path):
    timestamps = []
    with pyzipper.ZipFile(zip_path) as zip_file:
        for file_info in zip_file.infolist():
            filename = file_info.filename
            modified_datetime = datetime.datetime(*file_info.date_time)
            modified_timestamp = modified_datetime.timestamp()
            timestamps.append({
                'filename': filename,
                'modified_timestamp': modified_timestamp
            })
    return timestamps

def translate_data(timestamps):
    for entry in timestamps:
        # print(f"{entry['filename']} {entry['modified_timestamp']}")
        if '.txt' in entry['filename']:
            print(chr(int(entry['modified_timestamp']) - 1737276000+1),end='')
            # YUKWOU9sUYeWSU5qUUKOaA==

if __name__ == '__main__':
    zip_file_path = '1.zip'
    timestamps = get_zip_timestamps(zip_file_path)
    translate_data(timestamps)
```

如果压缩包没有加密，并且用上面的脚本提不出来有用的信息

可以尝试先解压到一个目录中，然后写脚本读取目录中所有文件修改时间的时间戳

```python
import os
import base64
from datetime import datetime

def get_numeric_part(filename):
    try:
        base_name = os.path.splitext(filename)[0]
        return int(base_name)
    except ValueError:
        return float('inf')

def get_file_timestamps(directory):
    file_timestamps = {}
    file_list = []
    
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            file_list.append((filename, filepath))
    
    file_list.sort(key=lambda x: get_numeric_part(x[0]))
    
    for filename, filepath in file_list:
        try:

            stat_info = os.stat(filepath)
            # 获取修改时间和创建时间
            modified_time = stat_info.st_mtime
            if os.name == 'nt':
                created_time = stat_info.st_ctime
            else:
                created_time = stat_info.st_ctime
            
            # 转换为datetime对象
            modified_dt = datetime.fromtimestamp(modified_time)
            created_dt = datetime.fromtimestamp(created_time)
            
            file_timestamps[filepath] = {
                'created_unix': created_time,
                'modified_unix': modified_time,
                'created_datetime': created_dt.strftime('%Y-%m-%d %H:%M:%S'),
                'modified_datetime': modified_dt.strftime('%Y-%m-%d %H:%M:%S')
            }
        except Exception as e:
            print(f"无法获取文件 {filepath} 的时间戳: {str(e)}")
            continue
    
    # 按排序后的顺序打印
    for filename, filepath in file_list:
        if filepath in file_timestamps:
            time_info = file_timestamps[filepath]
            print(f"{filepath} 创建时间: {time_info['created_unix']} 修改时间: {time_info['modified_unix']}")
    
    return file_timestamps

def extract_data(timestamps):
    res = ""
    # 按文件名中的数字排序，会把字典中的键值对转为元组列表
    sorted_files = sorted(timestamps.items(), key=lambda x: get_numeric_part(os.path.basename(x[0])))
    # print(sorted_files)
    for filepath, time_info in sorted_files:
        res += chr(int(time_info['modified_unix']-1737276000))
    print(res)

if __name__ == "__main__":
    target_directory = "out"
    timestamps = get_file_timestamps(target_directory)
    extract_data(timestamps)
    # YTJWNU9sTXdVRU5qTTJNaA==
```

例题1-2024ISCC-时间刺客

例题2-环环相扣

## Misc——视频题思路：

1、视频中的音频存在隐写

```bash
# 用 mkvtool 分离出 mka 音频，拉入Au看频谱图
# 也可以用 ffmpeg 分离出 mp3 或者 wav 音频，然后拉入Au看频谱图
ffmpeg -i lion.mp4
ffmpeg -i lion.mp4 -map 0:2 -q:a 0 output.wav
```

![](imgs/image-20250429115745570.png)

2、可能是视频中的每一帧图片都有LSB隐写（2023 WMCTF）

3、循环读取视频每一帧图像中指定列的指定像素（2023 极客大挑战）

```python
import cv2
from PIL import Image

# 创建一个视频读取对象，读取名为'kira.mp4'的视频文件。
video = cv2.VideoCapture('kira.mp4')  # type: ignore

# # 设置要提取的帧数，如现在指定的是第100帧
# video.set(cv2.CAP_PROP_POS_FRAMES, 100)
# # 读取视频的指定帧
# ret, frame = video.read()
# # 保存提取的帧为图像文件
# cv2.imwrite('1.png', frame)
# # 释放视频对象
# video.release()

# 定义视频的尺寸为1920x1080
video_size = [1920, 1080]
# 设置起始像素为5
start_pixel = 5
# 设置每个像素块的大小为10
size = 10
# 创建一个新的图像对象，大小为视频尺寸除以像素块大小，即原视频的帧的抽样结果
out = Image.new('RGB', (video_size[0] // size, video_size[1]//size))
# 初始化帧率计数为0
fps_count = 0
# 循环读取每一帧图像中指定列的指定像素
while True:
    print(f"[+] 当前正在读取视频的第{fps_count}帧")
    # 从视频文件中读取一帧，success为是否成功读取帧的结果，frame为读取的帧
    success, frame = video.read()
    # 如果读取失败，跳出循环
    if not success:
        print(f"[X] 视频的第{fps_count}帧读取失败")
        break
    # 对每一行像素进行遍历，从视频的高度减去起始像素并除以像素块大小，得到需要遍历的行数
    for y in range((video_size[1]-start_pixel)//size):
        try:
            # 从当前行中获取一个像素，使用getpixel方法获取指定坐标处的像素，并将其转换为PIL图像格式
            pixel = Image.fromarray(frame).getpixel(
                (start_pixel+fps_count*size, start_pixel+y*size))
            # 将获取的像素值设置为抽样图像的对应像素位置的值
            out.putpixel((fps_count, y), pixel)
        except:
            pass
    # 帧率计数加1，准备下一帧的处理
    fps_count += 1

# 将抽样图像保存为'out.png'文件
out.save('out.png')
out.show()
```

4、DeEgger Embedder隐写

可以直接使用 DeEgger Embedder 工具 extract files

例题-攻防世界 PyHaHa

## Misc——音频题思路：

### 1、波形图分析：摩斯电码

### 2、频谱图分析(有时要调高最高频率)：

### 3、Silenteye隐写

wav音频文件可能是`silenteye`隐写，可以拿`silenteye`用默认密码解密试试看

当然如果已知密钥的话就用密钥去解密

![](imgs/image-20250429203026980.png)

### 4、Deepsound隐写

先用 deepsound 打开试一下，如果需要密码说明就是 deepsound 隐写，有密钥直接填入密钥解密即可

如果是 deepsound 隐写并且没有密钥，就先用`deepsound2john`脚本获取wav文件的哈希值(注释里有使用方法)，

然后拉入kali用john爆破hash(如果编码有误，可以先用notepad另存为一下)

执行：john 1.txt

### 5、SSTV慢扫描电视：

**SSTV识别可以直接用这个项目里的脚本：https://github.com/colaclanth/sstv**

```bash
# 安装步骤：
sudo python3 setup.py install 
# 注意python版本如果低于python3.9，需要将setup.py中的numpy那一行注释
# 使用命令如下，图片会自动命名为result.png
sstv -d flag.wav
```

![](imgs/image-20241108232143418.png)

#### Windows中使用RX-SSTV

使用前还要安装虚拟声卡 Virtual Audio Cable

```bash
#使用步骤:
1.点击Setup-Sound Control and Devices将默认输入设备和输出设备都设置为虚拟声卡line1
2.用VLC播放音频（最好不要用Au播放）
3.如果扫描出来的图片有错位，可以点击slant手动修改
4.退出RX-SSTV前要注意把默认的输入/输出设备改回原来的参数
```

#### 拉入kali用qsstv（有时候要用到反向和反相）

### 6、电话音分析(DTMF)

用在线网站解码:http://www.dialabc.com/sound/detect/

或者在Windows下使用[ribt/dtmf-decoder](https://github.com/ribt/dtmf-decoder)这个开源项目解密

上面工具的识别可能有误差，如果想要更加精确，可以尝试按照下面这个对照表用肉眼去看

> 参考链接：https://blog.csdn.net/qawsedrf123lala/article/details/132084646

![](imgs/image-20241229101546924.png)

![](imgs/image-20241229102346611.png)

> Tips：如果音频中看不出来可以尝试在Au中把音频增幅，要求能看到两条白线

### 7、wav可能是业余无线电文件：

先用sox把wav转为raw：

sox -t wav latlong.wav -esigned-integer -b16 -r 22050 -t raw latlong.raw

再用multimon-ng分析:

multimon-ng -t raw -a AFSK1200 latlong.raw 

### 8、WAV可能是steghide隐写(可以无密码)

```bash
#如果密码已经知道了
steghide extract -sf filename -p passwd
```

在WSL或者kali里用Stegseek跑（字典在wordlist里）

```bash
#如果密码未知
可以用下面这个脚本爆破
#bruteStegHide.sh
#!/bin/bash

for line in `cat $2`;do
    steghide extract -sf $1 -p $line > /dev/null 2>&1
    if [[ $? -eq 0 ]];then
        echo 'password is: '$line
        exit
    fi
done
```

```bash
#或者在WSL或者kali里用Stegseek跑（字典在wordlist里）
stegseek filename rockyou.txt
```

### 9、MP3可能是mp3stego隐写(可以无密码)

使用前需要先把要处理的文件放到 mp3stego 目录下

```bash
# Encode
encode -E data.txt -P pass sound.wav sound.mp3    
data.txt里面放要隐写的txt信息 pass是解密时需要的密码
# Decode
decode -X -P pass sound.mp3   
-X 是提取出隐写的文件
pass是解密时需要的密码 
sound.mp3是待处理的MP3文件
# mp3stego可以使用无密码进行隐写
# 如果需要密码解密，但是没有密码，可以试试看音频中歌曲的名字（比如Canon）
```

### 10、WAV还可能是OpenPuff隐写（有密码）

直接用OpenPuff.exe解密即可

### 11、stegpy隐写

[ stegpy 开源地址](https://github.com/izcoser/stegpy) 下载好后直接用WSL输入以下命令并输入密码解密即可

也可以直接用 pip 安装： pip3 install stegpy

```bash
stegpy 1.wav -p
```

### 12、DeEgger Embedder隐写

可以直接使用 DeEgger Embedder 工具 extract files

### 13、提取WAV中LSB隐写的数据

```python
import wave
import libnum

wav = wave.open('996.wav', 'r')

# 读取前1000帧的音频数据并将其转换为十六进制字符串
# readframes()返回的是字节数据，.hex()将其转换为十六进制表示
frames_data = wav.readframes(1000).hex()
res = ''

# 遍历十六进制数据，每次处理4个字符(2字节)
# 因为WAV文件通常使用16位(2字节)采样
for i in range(0, len(frames_data), 4):
    data = frames_data[i:i+4]
    # 将数据从小端序转换为大端序，因为WAV文件使用小端序存储数据
    data_rev = int(data[2:] + data[:2], 16)
    # 使用位与运算(&)获取最低有效位(LSB)
    res += str(data_rev & 1)
    
print(libnum.b2s(res))
# 7avpassword:NO996!=
```

### 14、分析WAV左右声道的差值

```python
# 导入模块wavfile
import scipy.io.wavfile as wavfile
# 读取音频文件的采样率和数据
sample_rate, data = wavfile.read("1.wav")
# print(sample_rate, data)
# 创建两个列表来存储左右两声道的数据
left = []
right = []

for item in data:
    # print(item)
    # 第一列的数据是左声道，第二列是右声道
    left.append(item[0])
    right.append(item[1])

diff = [str(left-right) for left, right in zip(left, right)]
res = ''
for item in diff:
    if item == '2':
        res += '1'
    elif item == '1':
        res += '0'
    else:
        continue
with open('res.txt', 'w') as f:
    f.write(res)
```

### 15、使用脚本提取WAV数据进行分析

```python
# 2023 DASCTFxCBCTF
import numpy as np
import wave
import scipy.fftpack as fftpack

SAMPLE_RATE = 44100 # 表示采样率，即每秒钟有多少采样点
SAMPLE_TIME = 0.1 # 表示一个样本的时间，即0.1秒
SAMPLE_NUM = int(SAMPLE_RATE * SAMPLE_TIME) # 计算在SAMPLE_TIME时间内的采样点数
LIST = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700]   


def get_len():
    with wave.open('1.wav','rb') as f:
        # 使用numpy从音频文件中读取所有的帧并将其转换为int16数据类型的数组
        wav_data = np.frombuffer(f.readframes(-1),dtype=np.int16)
        N = len(wav_data)
        print(N)
    #这实际上计算了wav文件的总时长（以0.1秒为单位）
    a = (N/(44100*0.1)) / 189
    print(a)

# 傅立叶变换函数。给定时域数据，该函数返回其频域形式的前半部分
def fft(data):
    N = len(data)                                   #获取数据长度
    fft_data = fftpack.fft(data)                    #得到频域信号                      
    abs_fft = np.abs(fft_data)                      #计算幅值    
    abs_fft = abs_fft/(N/2)                             
    half_fft = abs_fft[range(N//2)]                 #取频域信号的前半部分

    return half_fft

# 此函数旨在解码100ms的音频数据。它首先对音频数据进行FFT变换，然后检查LIST中的每个频率，以确定哪些频率具有明显的活动（幅值大于0.8）  
def dec_100ms(wave_data_100_ms):
    fft_ret = fft(wave_data_100_ms)
    for index, freq in enumerate(LIST):
        if np.max(fft_ret[int(freq*SAMPLE_TIME) - 2 : int(freq*SAMPLE_TIME) + 2]) > 0.8:
            print(freq, 'Hz有值',end=" ")
            return index

# 解码整个音频文件中的句子。它首先确定音频中有多少个100ms的段，然后每次解码两个段来生成一个两位数的索引，该索引用于查找与之对应的字符
def dec_sentence(wav_data):
    _100ms_count = len(wav_data) // SAMPLE_NUM    
    # print(_100ms_count) 
    print('待解码音频包含', _100ms_count // 2, '个字')    
    ret = ''
    for i in range(0, _100ms_count, 2):              
        index = 0
        for k in range(2):
            index = index*10 + dec_100ms(wav_data[i*SAMPLE_NUM + k*SAMPLE_NUM : i*SAMPLE_NUM + (k+1)*SAMPLE_NUM])
        print('序号:', index)
        ret += string[index]
    return ret

if __name__ == '__main__':
    # get_len()
    # 题目给了一个字符串序列，所以就是从音频中提取出index，然后根据index找到对应的字符
    string ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_}{-?!"
    with wave.open('1.wav', 'rb') as f:          #读取为数组
        wav_data = np.frombuffer(f.readframes(-1), dtype=np.int16)
    print(dec_sentence(wav_data))
    # DASCTF{Wh1stling_t0_Convey_informat1on!!!}
```

### 16、提取两个WAV音频中的浮点集并分析

例题1-2024极客大挑战-音乐大师

```python
import librosa
import libnum

res = []
flag = ""
table = {'19':"01","9":"00","39":"11","29":"10"}
# 使用文件原始采样率获取音频数据和采样率
data1,sr1 = librosa.load("secret.wav",sr=None,dtype="float32")
data2,sr2 = librosa.load("1.wav",sr=None,dtype="float32")

for i in range(148):
    res.append(str(int((data1[i]-data2[i])*1e7)))

for item in res:
    flag += table[item]

print(libnum.b2s(flag))
# b'SYC{wav_LSB_but_You_can_get_M3_Coll!}'
```

### 17、频率映射到字符

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
```



## Misc——取证题思路：

详见作者博客中的 **[Misc-Forensics](https://goodlunatic.github.io/posts/761da51/)** 这篇文章

## Git文件泄露：

1、利用命令git stash show 显示做了哪些改动

2、利用命令git stash apply导出改动之前的文件

## OSINT

### 1.用yandex识图

## Others：

###  字节序

**字节的排列方式有两个通用规则:**

```
大端序（Big-Endian）将数据的低位字节存放在内存的高位地址，高位字节存放在低位地址。这种排列方式与数据用字节表示时的书写顺序一致，符合人类的阅读习惯。
小端序（Little-Endian），将一个多位数的低位放在较小的地址处，高位放在较大的地址处，则称小端序。小端序与人类的阅读习惯相反，但更符合计算机读取内存的方式，因为CPU读取内存中的数据时，是从低地址向高地址方向进行读取的。
```

**例子：**

```
整型数值168496141 需要4个字节
对应的16进制表示是0X0A0B0C0D
大端序：
0x0A 0x0B 0x0C 0x0D
小端序：
0x0D 0x0C 0xB 0xA
```

### 为何要有字节序

```
因为计算机电路先处理低位字节，效率比较高，因为计算都是从低位开始的。所以，计算机的内部处理都是小端字节序。在计算机内部，小端序被广泛应用于现代 CPU 内部存储数据；而在其他场景，比如网络传输和文件存储则使用大端序。
```

**使用Python中的struct模块来处理大小端序**

```python
import struct

def display_binary(data):
    #将字节数据转化为十六进制表示形式
    # return ' '.join(['{:02x}'.format(byte) for byte in data])
    return ' '.join([f"{byte:02x}" for byte in data])

# 定义要打包的数据
int_data = 10240099
float_data = 123.456

# 使用默认端序（小端序）打包
packed_int_little = struct.pack('I', int_data)
packed_float_little = struct.pack('f', float_data)

# 使用大端序打包
packed_int_big = struct.pack('>I', int_data)
packed_float_big = struct.pack('>f', float_data)

# 打印打包的结果,display_binary()是以十六进制的形式显示
print("Packed data (Little Endian):")
print(packed_int_little)
print("Int:", display_binary(packed_int_little))
print(packed_float_little)
print("Float:", display_binary(packed_float_little))

print("\nPacked data (Big Endian):")
print(packed_int_big)
print("Int:", display_binary(packed_int_big))
print(packed_float_big)
print("Float:", display_binary(packed_float_big))

# 解包数据,由于返回的是一个元组，所以需要[0]
unpacked_int_little = struct.unpack('I', packed_int_little)[0]
unpacked_float_little = struct.unpack('f', packed_float_little)[0]

unpacked_int_big = struct.unpack('>I', packed_int_big)[0]
unpacked_float_big = struct.unpack('>f', packed_float_big)[0]

# 打印解包的结果
print("\nUnpacked data (Little Endian):")
print("Int:", unpacked_int_little)
print("Float:", unpacked_float_little)

print("\nUnpacked data (Big Endian):")
print("Int:", unpacked_int_big)
print("Float:", unpacked_float_big)

# 验证打包和解包是否保持数据的完整性(float类型的数据先打包再解包后可能会有误差)
assert int_data == unpacked_int_little
# assert float_data == unpacked_float_little

assert int_data == unpacked_int_big
# assert float_data == unpacked_float_big

print("\nData integrity maintained!")
```

**十六进制数据大小端序转换**

```python
hex_data = """0x00006c66 0x00006761 0x0000617b 0x00006168 0x00005f21 0x00006f79 0x00005f75 0x00006f66 0x00006e75 0x00005f64 0x00007469 0x00007d21 0x00000000 """

def swap_endianness(hex_string):
    hex_bytes = bytes.fromhex(hex_string[2:])
    # 直接使用 bytes 类型的数据翻转即可
    swapped_bytes = hex_bytes[::-1]
    swapped_hex = swapped_bytes.hex()
    swapped_hex = '0x' + swapped_hex
    return swapped_hex


def solved():
    flag = ""
    # hex_data = input("请输入待转换的数据\n")
    hex_list = hex_data.split()
    for hex_num in hex_list:
        swapped_hex = swap_endianness(hex_num)
        print(swapped_hex)
        flag += bytes.fromhex(swapped_hex[2:]).decode()
    print(flag)


if __name__ == "__main__":
    solved()
```

### Linux tar命令

#### 打包压缩

```bash
# 打包单独的文件
tar -cvf target.tar filename.txt
# 打包整个目录
tar -cvf target.tar directory
# -c 表示创建新的tar包
# -v 表示显示详细信息
# -f 表示指定目标文件名
# 如果是.tar.gz，就用下面这个命令
tar -czvf out.tar.gz ./*
```

#### 解压提取

```bash
#把压缩包中的所有文件解压到当前目录
tar -xvf target.tar
#把压缩包解压到指定目录
tar -xvf target.tar -C path
# 如果是.tar.gz，就用下面这个命令
tar -xzvf file.tar.gz
```

### pyc隐写

使用开源工具：https://github.com/AngelKitty/stegosaurus

对隐写的内容进行提取即可

![](imgs/image-20241113181609346.png)



---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/1ad9200/  

