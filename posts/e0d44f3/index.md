# 2024 NKCTF Misc Writeup

**从这场比赛可以看出自己还是有很多东西需要去学**  
**感觉 Misc 很大程度上还是看经验，自己见过的东西还是太少了**
<!--more-->

![](imgs/image-20240803101932804.png)

## 题目名称 Webshell_pro
打开流量包，追踪TCP流，可以很明显的看出是一个webshell流量
用base64解码响应中的数据，一个个试过去，发现存在hint.py和小明的日记.txt
以及后面才出现的flag.txt
![](imgs/image-20240430190843840.png)
![](imgs/image-20240430190854576.png)
先base64解码，再去除换行符，最后再base64解码，即可得到请求中shell的加密代码——hint.py
![](imgs/image-20240430190909480.png)
叫ChatGPT写一个解密的代码，开头加上一个urldecode即可
```python
import base64  
import libnum  
from Crypto.PublicKey import RSA  
from urllib.parse import unquote  
  
pubkey_str = """-----BEGIN PUBLIC KEY-----  
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCK/qv5P8ixWjoFI2rzF62tm6sDFnRsKsGhVSCuxQIxuehMWQLmv6TPxyTQPefIKufzfUFaca/YHkIVIC19ohmE5X738TtxGbOgiGef4bvd9sU6M42k8vMlCPJp1woDFDOFoBQpr4YzH4ZTR6Ps+HP8VEIJMG5uiLQOLxdKdxi41QIDAQAB  
-----END PUBLIC KEY-----  
"""  
  
prikey_str = """-----BEGIN PRIVATE KEY-----  
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIr+q/k/yLFaOgUjavMXra2bqwMWdGwqwaFVIK7FAjG56ExZAua/pM/HJNA958gq5/N9QVpxr9geQhUgLX2iGYTlfvfxO3EZs6CIZ5/hu932xTozjaTy8yUI8mnXCgMUM4WgFCmvhjMfhlNHo+z4c/xUQgkwbm6ItA4vF0p3GLjVAgMBAAECgYBDsqawT5DAUOHRft6oZ+//jsJMTrOFu41ztrKkbPAUqCesh+4R1WXAjY4wnvY1WDCBN5CNLLIo4RPuli2R81HZ4OpZuiHv81sNMccauhrJrioDdbxhxbM7/jQ6M9YajwdNisL5zClXCOs1/y01+9vDiMDk0kX8hiIYlpPKDwjqQQJBAL6Y0fuoJng57GGhdwvN2c656tLDPj9GRi0sfeeMqavRTMz6/qea1LdAuzDhRoS2Wb8ArhOkYns0GMazzc1q428CQQC6sM9OiVR4EV/ewGnBnF+0p3alcYr//Gp1wZ6fKIrFJQpbHTzf27AhKgOJ1qB6A7P/mQS6JvYDPsgrVkPLRnX7AkEAr/xpfyXfB4nsUqWFR3f2UiRmx98RfdlEePeo9YFzNTvX3zkuo9GZ8e8qKNMJiwbYzT0yft59NGeBLQ/eynqUrwJAE6Nxy0Mq/Y5mVVpMRa+babeMBY9SHeeBk22QsBFlt6NT2Y3Tz4CeoH547NEFBJDLKIICO0rJ6kF6cQScERASbQJAZy088sVY6DJtGRLPuysv3NiyfEvikmczCEkDPex4shvFLddwNUlmhzml5pscIie44mBOJ0uX37y+co3q6UoRQg==  
-----END PRIVATE KEY-----  
"""  
  
pubkey = RSA.import_key(pubkey_str)  
prikey = RSA.import_key(prikey_str)  
n = pubkey.n  
  
  
def dec_replace(base64_str: str):  
    base64_str = base64_str.replace("e5Lg^FM5EQYe5!yF&62%V$UG*B*RfQeM", "/")  
    base64_str = base64_str.replace("n6&B8G6nE@2tt4UR6h3QBt*5&C&pVu8W", "+")  
    base64_str = base64_str.replace("JXWUDuLUgwRLKD9fD6&VY2aFeE&r@Ff2", "=")  
    return base64_str  
  
  
def decrypt(cipher_text):  
    # 使用公钥解密  
    plain_text = b""  
    cipher_text = base64.b64decode(dec_replace(cipher_text))  
    for i in range(0, len(cipher_text), 128):  
        part = cipher_text[i:i+128]  
        dec = libnum.n2s(pow(libnum.s2n(part), pubkey.e, n))  
        plain_text += dec  
    return plain_text.decode()  
  
  
if __name__ == '__main__':  
    cipher_text = input("请输入要解密的密文: ")  
    cipher_text = unquote(cipher_text)  
    decrypted_text = decrypt(cipher_text)  
    print("解密后的明文为:", decrypted_text)
```

然后就可以很清楚的知道shell命令都干了啥
![](imgs/image-20240430190941256.png)
去除换行符然后base64解码小明的日记.txt，可以得到解密的密钥
![](imgs/image-20240430190952441.png)
然后用这个密钥去AES解密上面得到的密文即可得到flag
![](imgs/image-20240430191003341.png)

## 题目名称 Minecraft:SEED

服务器IP: nkctf-mc-01.shenghuo2.cn / nkctf-mc-02.shenghuo2.cn / nkctf-mc-03.shenghuo2.cn

装一个 SeedCrackerX 和一个 Wurst 加速飞行跑图

然后找到5个沉船就行，mod会自己开始爆破seed

![](imgs/image-20240430191021053.png)

Seed: 2150463978431929967 

然后输入/getflag 2150463978431929967即可得到flag

![](imgs/image-20240430191027459.png)
## 题目名称 cain_is_hacker
内存取证，经典开头用 vol_all_in_one 梭一把
![](imgs/image-20240430191057005.png)

然后在 filescan 的结果中找到一个h4re.zip，尝试导出
桌面上那个 raw 文件应该就是题目附件给我们的 raw 文件
所以这里也没必要导出，当然也是无法导出的
![](imgs/image-20240430191104016.png)
![](imgs/image-20240430191107942.png)

解压这个压缩包，得到两个奇怪的文件，查看其中的importfile后可以知道这个是用Encfs加密后的加密卷
![](imgs/image-20240430191117376.png)
![](imgs/image-20240430191120037.png)

根据[参考文章](https://www.cnblogs.com/truthmaster/p/15776610.html)可知，我们可以在Windows下用 Encfs4win 来挂载这个加密卷  
但是解密这个加密卷，需要 .encfs6.xml（即文件夹中的importfile)，以及解密的密码  
因此接下来我们就需要去寻找解密的密码  
比赛的时候一直在找破解这个密码的方法，找到了一个 CVE-2014-3462，但是没有能用的exp  
查看 psscan 命令的结果，可以发现存在 StikyNot 进程，这个是Windows自带的便签软件
![](imgs/image-20240430191134602.png)

参考[Lazzaro大佬的博客](https://lazzzaro.github.io/2020/06/20/misc-取证/)可知  
StikyNot 的文件会保存在C:\Users\XXX\AppData\Roaming\Microsoft\Sticky Notes\目录下
![](imgs/image-20240430191146138.png)

因此在文件中搜索 Sticky Notes ，发现有一个StickyNotes.snt文件，尝试导出
![](imgs/image-20240430191152930.png)

比赛的时候就是卡在了这里，因为这个文件需要用Windows7的便签或记事本打开，然后Win11下是无法直接查看的
官方的wp说的是这个东西需要用 WIndows7 的虚拟机打开，这里真的很坑，要专业版的Win7才有
这里需要将这个.snt文件放到C:\Users\XXX\AppData\Roaming\Microsoft\Sticky Notes\\路径下
最后再打开便签即可看到下面这样的一串字符串
![](imgs/image-20240430191201976.png)

将得到的字符串base58解码后即可得到解密的密码：welcome_to_NkCTF_and_this_is_the_enkey
然后将importfile重命名为.encfs6.xml然后用Encfs MP直接挂载即可
![](imgs/image-20240430191210101.png)
![](imgs/image-20240430191213926.png)

挂载后打开挂载的磁盘，得到一个ez.xlsx
无法使用Excel直接打开，于是我们使用010打开，发现vba字符，因此猜测存在宏
![](imgs/image-20240430191221687.png)

因此我们直接使用olevba分析文件中的vba代码，发现存在base64解码的操作
![](imgs/image-20240430191231780.png)
![](imgs/image-20240430191234934.png)

用CyberChef解码后得到一些未知的Hex值
联系题面猜测这个就是被勒索病毒加密后的flag文件
>_在fault的配合下，cain宝成功入侵了我的电脑，她使用勒索软件加密了flag文件并将其隐藏了起来。当我发现的时候，cain早已将她使用的勒索软件和密钥删除了，但是匆忙下她还是留下了一些信息，你能在内存中获取并解密flag文件吗？_

![](imgs/image-20240430191254553.png)

因此，我接下来要去寻找那个勒索病毒的信息，看看是哪种勒索病毒并尝试寻找它的解密方式
在Console命令的结果中发现hidden-tear.exe文件
![](imgs/image-20240430191304205.png)

网上一搜，发现这个程序就是我们要找的勒索病毒

![](imgs/image-20240430191315352.png)

已知它是完全开源的，因此我们在github中搜索，发现它连解密的软件一起开源了  
但是这个解密软件好像不是很好用，这里贴一个[更好用的解密软件](https://www.bleepingcomputer.com/download/hidden-tear-decrypter/)
![](imgs/image-20240430191326585.png)

运行 HiddenTearDecrypter.exe ，发现解密需要解密密钥
根据题面可知，密钥被删除了，因此我们需要尝试使用vol的mftparser命令去恢复密钥
![](imgs/image-20240430191336367.png)

然后在mftparser命令的结果中发现了key，删去空格即可得到恢复密钥：nT0XoHBA2!Uc?
![](imgs/image-20240430191343578.png)

其实这里如果用vol没找到的话，可以使用R-stdio找这个密钥
个人感觉用R-stdio找起来更方便，直接在$Recycle.bin中翻就行
![](imgs/image-20240430191351185.png)

最后将之前保存的加密文件后缀改为.locked，输入密钥用HiddenTearDecrypter.exe解密即可得到flag
![](imgs/image-20240430191358504.png)
NKCTF{C0ngr@tu1atiOns_On_coMpleting_t3e_Fo3eNs1cs_Ch41lenge_I_wi1l_giv4_y0u_A_cain!!!!}
## 题目名称 1z_F0r3ns1c5
给了一个1.raw内存镜像文件，直接 all_in_one 脚本开扫

![](imgs/image-20240430191420441.png)

查看镜像的环境变量，发现有好多个叫做nowayback的变量

![](imgs/image-20240430191426322.png)

随波逐流一键解码（XXencode解密）即可得到第一段flag：nkctf{39c429eb-2faf

![](imgs/image-20240430191432559.png)

flag1：nkctf{39c429eb-2faf
查看pslist命令的结果，发现存在mspaint的进程

![](imgs/image-20240430191445217.png)

尝试用memdump命令导出这个进程，导出后一个得到一个dmp文件
然后就是这里折腾了好久，后来翻来覆去找了好多资料才知道【最后还是通过谷歌识图找到了类似的题目】
这里需要将导出的进程文件的后缀改成.data，Gimp才能当成raw导入【涨知识了】
改成.data后直接拖到Gimp中，慢慢调分辨率和位移就可以了（下图使用的分辨率是2560*1600）
![](imgs/image-20240430191500026.png)
flag2：-49a0-bd24-
之后在consoles命令的记录中看到出题人git了一个项目的源码
![](imgs/image-20240430191513036.png)

我们这里也将源码 git clone 到本地，查看README发现源码被删了，提示我们恢复源码

![](imgs/image-20240430191522097.png)

使用 git log 命令查看历史 commit 记录，发现前面有一个 9eb2 开头的版本
![](imgs/image-20240430191624918.png)

我们使用 git reset —hard 命令恢复到之前的版本，然后目录下就可以看到源码了
![](imgs/image-20240430191634223.png)

根据之前README文件中的提示，我们只能使用 Docker 或者 Python3.7.2 部署这项目
于是我们这里使用 docker-compose 部署，到源码 docker 目录下运行 docker-compose up 即可
然后我们访问 8080 端口，可以看到下面这个界面，要求我们输入加密信息并上传字体

![](imgs/image-20240430191645542.png)
我们随便上传一个 tff 字体文件，然后输入一段文本，网页都会返回一张加密(类似于马赛克)后的图片
因此结合附件中某段 flag.zip 中的 pass.png，可以猜测题目的意思就是让我们通过马赛克图片还原 pass
```python
# 源码中的马赛克函数  
def mosaic_img(img, L, H, R, D):  
    w, h = R - L, D - H  
    a = [0, 0, 0]  
    cnt = 0  
    for x in range(w):  
        for y in range(h):  
            j = img.getpixel((L+x, H+y))  
            for ch in range(len(a)):  
                a[ch] += j[ch]  
            cnt += 1  
    b = [k//cnt for k in a]  
    mosaic = Image.new('RGB', (w, h), tuple(b))  
    img.paste(mosaic, (L, H, R, D))
```

分析源码中的加密函数可知，这个加密是直接通过图像处理来实现的
因此我们就需要去找到和出题人一模一样的字体，结合题目附件中 readme.txt 中的信息：
本鼠鼠的flag总共分为三段捏，flag为nkctf{uuid}形式，另外鼠鼠最喜欢等宽字体了，快快去找吧。
结合题目中鼠鼠正在 coding 可以联想到 vscode 进程，因此我们就需要去获取出题人 vscode 中的等宽字体
在 首选项-设置 中打开我们自己的 vscode 的settings.json 可以看到 vscode 配置文件的路径
C:\Users\XXX\AppData\Roaming\Code\User\settings.json
我们使用 R-Stdio 来提取镜像中 vscode 的配置文件
![](imgs/image-20240430191746373.png)

恢复完后，配置文件中的内容如下，对比我们自己的 vscode 可以发现 Fira Code 这个非默认的等宽字体
```json
{  
    "editor.fontFamily": "'Fira Code', Consolas, 'Comrier New', monospace",  
    "window.zoomLevel": 1,  
    "security.workspace.trust.untrustedFiles": "open"  
}
```

因此我们直接去下载 [FiraCode](https://github.com/tonsky/FiraCode) 即可，下载完后选择 FiraCode-Regular.ttf 上传即可
为了破解这个加密，我们就需要进行打表，获取每个字符加密后的图片
![](imgs/image-20240430191836523.png)

从代码逻辑中可以看出，代码没有对前5个字符(pass)和最后一个字符(即上图中字符串末尾的 9)进行加密
![](imgs/image-20240430191845508.png)

因此，我需要在字符串末尾多输入一个 9，然后保存加密后的图片
![](imgs/image-20240430191853550.png)

将两张图片放到同一目录下，并分别命名为 table.png 和 pass.png
然后写脚本切割两张图片，通过计算并比较图片的md5值来获得下一步的密钥：b143a6268e2a233
```python
from PIL import Image  
import hashlib  
import os  
  
  
def calculate_md5(filename):  
    # 计算文件的 MD5 值  
    hasher = hashlib.md5()  
    with open(filename, 'rb') as f:  
        for chunk in iter(lambda: f.read(4096), b""):  
            hasher.update(chunk)  
    return hasher.hexdigest()  
  
  
def get_pass():  
    res = ''  
    dict_images = os.listdir("table/")  
    for i in range(14):  
        pass_image_md5 = calculate_md5(f"pass/{i}.png")  
        for dict_image in dict_images:  
            dict_image_md5 = calculate_md5(f"table/{dict_image}")  
            if pass_image_md5 == dict_image_md5:  
                print(f"{i}.png 与 {dict_image} 相同")  
                res += chr(int((dict_image.split('.')[0])))  
    print("还原后的pass如下：")  
    print(res+'3')  
  
  
def crop_table():  
    table = "pass ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567899"  
    # print(len(table))  
    img = Image.open("table.png")  
    width, height = img.size  
    # print(width, height)  
    cols = width // 30  
  
    if os.path.exists("table"):  
        print("[+] table目录已存在")  
        pass  
    else:  
        os.mkdir("table")  
        print("[+] out目录创建成功")  
  
    for col in range(5, cols-1):  
        left = col*30  
        upper = 0  
        right = left+30  
        lower = 60  
        cropped_img = img.crop((left, upper, right, lower))  
        cropped_img.save(f"table/{ord(table[col])}.png")  
        print(f"table/{ord(table[col])}.png保存成功")  
  
  
def crop_pass():  
    img = Image.open("pass.png")  
    width, height = img.size  
    cols = width // 30  
    if os.path.exists("pass"):  
        print("[+] pass目录已存在")  
        pass  
    else:  
        os.mkdir("pass")  
        print("[+] pass目录创建成功")  
  
    for col in range(5, cols-1):  
        left = col*30  
        upper = 0  
        right = left+30  
        lower = 60  
        cropped_img = img.crop((left, upper, right, lower))  
        cropped_img.save(f"pass/{col-5}.png")  
        print(f"pass/{col-5}.png保存成功")  
  
  
if __name__ == "__main__":  
    crop_table()  
    crop_pass()  
    get_pass()
```

VeraCrypt 用得到的密钥挂载附件中的 secret 文件即可得到flag3：c4f222879312
最终的flag：nkctf{39c429eb-2faf-49a0-bd24-c4f222879312}
## 题目名称 HackMyCQL

没有火眼、弘连和取证大师【卑微】

---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/e0d44f3/  

