# 2024 浙江省大学生网络与信息安全竞赛 Misc Writeup

**2024 浙江省大学生网络与信息安全竞赛 Misc Writeup**
&lt;!--more--&gt;

## 初赛
### 题目名称 签到题2
题目给了如下密文
```
6L&lt;Ak3,*@VM*&gt;7U&amp;FZFNWc,Ib=t,X!&#43;,BnSDfoaNhdiO*][5F];eV^]Lm&amp;?$&#39;&lt;oeGH&amp;6tqcgK_JDp-3;8wh?Si,G$BarTFjE?b$eR/,Igij&lt;({u90M$5If589[&lt;4&#43;jp%3_%R(526#1J|m5p&amp;H&#43;%.#d0&lt;DmLK*#-\8w:xD2Y[3jO{l8[)&lt;(F[=Bcixb&gt;Jp^%L2XvVTzW@9OTko/P74d1sFscEbMO7Vhp&amp;HM;&#43;ww/v[KM1%2M*7O\}rEZM.LM0&#39;\iwK:])pg-nJef\Rt4
```

先尝试用`basecrack`梭一把

![](imgs/image-20241105104912974.png)

`basecrack`可以得到如下密文
```
5C9VB8W09FG6DC9LX6J1A3T9ZY9P7BKG6&#43;M9B1AO7BI%6OTAZY91G60Z9%IBG09NIBNB9TB9
```

然后放到CyberChef中 `From base45` &#43; `From base32` 即可得到flag：`DASCTF{welcome_to_zjctf_2024}`

![](imgs/image-20241105105025178.png)

当然这里也可以直接在CyberChef中一个个尝试（要求CyberChef的版本要比较新）

![](imgs/image-20241105105416966.png)

### 题目名称 RealSignin

解压附件压缩包，得到一张`out.png`

![](imgs/image-20241105105530228.png)

直接使用`zsteg`一把梭，可以得到一串编码和一个表，猜测是换表的base64

因此直接把两个东西复制到CyberChef中解码即可得到flag：`DASCTF{We1C0me_2_ZJCTF2024!}`

![](imgs/image-20241105105634178.png)

![](imgs/image-20241105105726992.png)

### 题目名称 机密文档

解压附件压缩包，得到一个加密的`机密文档.zip`

里面有一个`the_secret_you_never_ever_know_hahahaha.zip`，文件名很长并且还是用的Store压缩方法

![](imgs/image-20241105105822401.png)

因此我们猜测考察的是压缩包的明文攻击，压缩包考点的详细讲解可以看[我的这篇博客](https://goodlunatic.github.io/posts/1ad9200/#3%E5%88%A9%E7%94%A8%E5%8E%8B%E7%BC%A9%E5%8C%85%E6%A0%BC%E5%BC%8F%E7%A0%B4%E8%A7%A3)

直接使用`bkcrack`进行明文攻击可以得到三段密钥，然后用密钥修改压缩包密码即可

![](imgs/image-20241105110654694.png)

解压压缩包后得到`the_secret_you_never_ever_know_hahahaha.docm`

打开文件发现存在宏代码，因此我们尝试使用`olevba`提取宏代码

![](imgs/image-20241105110910813.png)

```python
olevba 0.60.1 on Python 3.8.10 - http://decalage.info/python/oletools
===============================================================================
FILE: .\the_secret_you_never_ever_know_hahahaha.docm
Type: OpenXML
WARNING  For now, VBA stomping cannot be detected for files in memory
-------------------------------------------------------------------------------
VBA MACRO ThisDocument.cls
in file: word/vbaProject.bin - OLE stream: &#39;VBA/ThisDocument&#39;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(empty macro)
-------------------------------------------------------------------------------
VBA MACRO NewMacros.bas
in file: word/vbaProject.bin - OLE stream: &#39;VBA/NewMacros&#39;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Sub key()
    Dim decValues As Variant
    Dim str As String
    Dim result As String
    Dim i As Integer
    Dim xorValue As Integer

    decValues = Array(26, 25, 28, 0, 16, 1, 74, 75, 45, 29, 19, 49, 61, 60, 3)
    str = &#34;outguess&#34;
    result = &#34;&#34;

    For i = LBound(decValues) To UBound(decValues)
        xorValue = decValues(i) Xor Asc(Mid(str, (i Mod Len(str)) &#43; 1, 1))
        result = result &amp; Chr(xorValue)
    Next i

End Sub
&#43;----------&#43;--------------------&#43;---------------------------------------------&#43;
|Type      |Keyword             |Description                                  |
&#43;----------&#43;--------------------&#43;---------------------------------------------&#43;
|Suspicious|Chr                 |May attempt to obfuscate specific strings    |
|          |                    |(use option --deobf to deobfuscate)          |
|Suspicious|Xor                 |May attempt to obfuscate specific strings    |
|          |                    |(use option --deobf to deobfuscate)          |
|Suspicious|Base64 Strings      |Base64-encoded strings were detected, may be |
|          |                    |used to obfuscate strings (option --decode to|
|          |                    |see all)                                     |
&#43;----------&#43;--------------------&#43;---------------------------------------------&#43;
```

发现就是一个简单的异或，因此我们可以使用CyberChef或者自己写个脚本解出密钥：`ulhged98BhgVHYp`

![](imgs/image-20241105111108767.png)

这里我脚本里给出了两种方法

```python
from pwn import xor

data = [26, 25, 28, 0, 16, 1, 74, 75, 45, 29, 19, 49, 61, 60, 3]
str = &#34;outguess&#34;
res = []

def func1():
    key = xor(data,str)
    print(key.decode())
    
def func2():
    for i in range(len(data)):
        tmp = data[i] ^ ord(str[i%(len(str))])
        res.append(chr(tmp))
    print(&#39;&#39;.join(res))
    
if __name__ == &#34;__main__&#34;:
    func1() # ulhged98BhgVHYp
    func2() # ulhged98BhgVHYp
```

这里的`str`提示了`outguess`，因此猜测这里就是图片的`outguess`隐写

把`the_secret_you_never_ever_know_hahahaha.docm`后缀改为`zip`并解压

在`the_secret_you_never_ever_know_hahahaha\word\media`目录下得到`image1.jpeg`

直接使用之前得到的密钥`outguess`解密即可得到flag：`DASCTF{B1g_S3CR3t_F0R_Y0u}`

&gt; tips：这里会报错未知的数据类型，我们直接把后缀改成jpg即可正常解密

![](imgs/image-20241105112122910.png)

### 题目名称 EZtraffic

解压附件压缩包，得到一个pcapng文件，翻看流量包发现主要是`SMB`流量

追踪流发现传输了压缩包，因此我们直接使用Wireshark导出传输的压缩包即可

![](imgs/image-20241105112511221.png)

![](imgs/image-20241105121519197.png)

![](imgs/image-20241105121553929.png)

这里导出的时候要注意，选择那个`100%`的压缩包导出，另外两个压缩包是不完整的

![](imgs/image-20241105121842911.png)

在导出的压缩包注释中发现提示：`NTLM v2 plaintext &#43; \d{5}`

因此猜测需要我们提取 NTLMv2 哈希值并破解密码，详细的步骤可以看[我的这篇博客](https://goodlunatic.github.io/posts/5422d65/#ntlm%E6%B5%81%E9%87%8F%E5%88%86%E6%9E%90)





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/c216d58/  

