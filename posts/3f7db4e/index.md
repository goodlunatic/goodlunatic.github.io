# 2022 浙江省大学生网络与信息安全竞赛初赛 Writeup

**菜鸟第一次打省赛，浅浅混了个省三QAQ。。**
&lt;!--more--&gt;
## Misc
### 题目名称 好怪哦
下载下来得到一个数据逆置的压缩包，直接用逆置脚本
```python
input = open(&#39;fuck.zip&#39;, &#39;rb&#39;)
input_all = input.read()
ss = input_all[::-1]
output = open(&#39;flag.zip&#39;, &#39;wb&#39;)
output.write(ss)
input.close()
output.close()
```

然后解压得到一个缺少png文件头的png文件，补上文件头：89 50 4e 47

打开得到一张CRC有问题的图片，直接上脚本爆破即可拿到flag

```python
import binascii
import struct
import sys

file = input(&#34;图片的地址&#34;)
fr = open(file,&#39;rb&#39;).read()
data = bytearray(fr[0x0c:0x1d])
crc32key = eval(&#39;0x&#39;&#43;str(binascii.b2a_hex(fr[0x1d:0x21]))[2:-1])
#原来的代码: crc32key = eval(str(fr[29:33]).replace(&#39;\\x&#39;,&#39;&#39;).replace(&#34;b&#39;&#34;,&#39;0x&#39;).replace(&#34;&#39;&#34;,&#39;&#39;))
n = 4095
for w in range(n):
    width = bytearray(struct.pack(&#39;&gt;i&#39;, w))
    for h in range(n):
        height = bytearray(struct.pack(&#39;&gt;i&#39;, h))
        for x in range(4):
            data[x&#43;4] = width[x]
            data[x&#43;8] = height[x]
        crc32result = binascii.crc32(data) &amp; 0xffffffff
        if crc32result == crc32key:
            print(width,height)
            newpic = bytearray(fr)
            for x in range(4):
                newpic[x&#43;16] = width[x]
                newpic[x&#43;20] = height[x]
            fw = open(file&#43;&#39;.png&#39;,&#39;wb&#39;)
            fw.write(newpic)
            fw.close
            sys.exit()
```

### 题目名称 神奇的棋盘
下载解压得到一张棋盘图片和一段棋盘加密后的密码：

![](imgs/image-20241018142926523.png)

这段密码是古典密码中的Polybius密码，直接去除逗号拉入随波逐流解密

得到密文：agaxxdaggvggvdvadavxdgadvgdvaaddddfxafafdgdvxxdggdggdxddfddxvgxadgvdfxvvaaddxdxxaddvgggxgxxxxgxxggxgdvvvgggagaaaagaaggagdddagagggaggagagaaavaaaxgxgggxggxgxgxxxv

然后用zsteg跑那个board的图片，得到一串base32，解密得到位移key：

JRQXG5CLMV4XWWLVONQXS6LEON6Q====

LastKey{Yusayyds}

然后用CaptfEncode解ADFGVX密码：

![](imgs/image-20241018143453096.png)

得到一串十六进制字符串 ，最后直接十六进制转字符串得到flag

![](imgs/image-20241018143356128.png)

DASCTF{d859c41c530afc1c1ad94abd92f4baf8}

### 题目名称 segmentFlow

下载后得到一个压缩包，里面有一个流量文件和七个4字节的文本文件

使用Github上的CRC爆破脚本进行爆破每个文本文件的CRC值，得到解压密码

![](imgs/image-20241018143645279.png)

![](imgs/image-20241018143656396.png)

用tshark导出数据

tshark -r segmentFlow.pcapng -Y &#34;http.request&#34; -T fields -e http.file_data &gt; data1.txt

```python
f = open(&#39;data.txt&#39;,&#39;r&#39;)
data=f.read()
data=data.split(&#39;&amp;sa066b32bfb3e7=&#39;)
#print(data.split(&#39;&amp;sa066b32bfb3e7=&#39;))
#以这个字符串为分隔符，后面八位就是我们要的数据
for i in range(1,len(data)):
    #从第一个到最后一个列表
    print(data[i][:8],end=&#39;&#39;)
    #一个列表元素的前八位
```

打开压缩包即可得到flag

## Reverse
### 题目名称 ManyCheck
三层验证，前两层拉入ida看或者直接用计算器算出结果：77、55、49

第三层根据ida里的算法，直接写个for循环就出来了：1198089844

```python
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
​
int main()
{
    for (int v1 = 0; v1 &lt;= 1718896489; v1&#43;&#43;)
    {
        int v2 = 16;
        int v3 = (v1 &gt;&gt; (32 - v2)) | (v1 &lt;&lt; v2);
        if (v3 == 1718896489)
            printf(&#34;%d&#34;, v1);
    }
    return 0;
}
```

## Web
### 题目名称 nisc_easyweb

扫出 /api/record/文件 里面有个发送get请求功能的php,利用hackbar发送get请求即可得到flag

### 题目名称 nisc_学校门户网站

不知道是不是非预期，直接注册然后登录即可得到flag

### 题目名称 吃豆人吃豆魂

进入web开发者工具，找到game的源码，在index.js中有对生命值和分数的定义，修改分数为10000000，再次请求页面，直接弹出flag

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/3f7db4e/  

