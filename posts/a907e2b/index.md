# 2024 帕鲁杯 Misc Writeup


**2024 帕鲁杯 Misc Writeup**

&lt;!--more--&gt;

## 题目名称 签到

**中文ascii码**

![](imgs/18d3c407-9777-4bb2-b89b-7c28f17a1ce0.png) 

![](imgs/ebd3f978-6e31-463a-ad47-776e4de0d2b5.png)

**flag{TreJaiuLT1rgbdfG0Eay}**

## 题目名称 FM 145.8

**直接SSTV开扫就行**

 ![](imgs/a072dba0-818f-40a0-9921-f3e58120b889.png)

**flag{19b4dD77bF3c66f91c23F5A25Bc314CB}**

## 题目名称 350×350

**jpg图片foremost一下可以得到一个zip文件，解压后发现docx的结构，改后缀为.docx再打开**

![](imgs/4885bfb1-9176-4170-ad40-73fc91df7640.png)

**伏羲六十四卦解密**

```python
s = &#39;井兑未济大畜咸益升归妹旅中孚剥噬嗑小过中孚震归妹升兑艮随旅随蒙颐升益蛊颐咸涣豫兑咸观艮益升中孚复睽咸观解临旅涣噬嗑屯&#39;
dic = {&#39;坤&#39;: &#39;000000&#39;, &#39;剥&#39;: &#39;000001&#39;, &#39;比&#39;: &#39;000010&#39;, &#39;观&#39;: &#39;000011&#39;, &#39;豫&#39;: &#39;000100&#39;, &#39;晋&#39;: &#39;000101&#39;, &#39;萃&#39;: &#39;000110&#39;, &#39;否&#39;: &#39;000111&#39;, &#39;谦&#39;: &#39;001000&#39;, &#39;艮&#39;: &#39;001001&#39;, &#39;蹇&#39;: &#39;001010&#39;, &#39;渐&#39;: &#39;001011&#39;, &#39;小过&#39;: &#39;001100&#39;, &#39;旅&#39;: &#39;001101&#39;, &#39;咸&#39;: &#39;001110&#39;, &#39;遁&#39;: &#39;001111&#39;, &#39;师&#39;: &#39;010000&#39;, &#39;蒙&#39;: &#39;010001&#39;, &#39;坎&#39;: &#39;010010&#39;, &#39;涣&#39;: &#39;010011&#39;, &#39;解&#39;: &#39;010100&#39;, &#39;未济&#39;: &#39;010101&#39;, &#39;困&#39;: &#39;010110&#39;, &#39;讼&#39;: &#39;010111&#39;, &#39;升&#39;: &#39;011000&#39;, &#39;蛊&#39;: &#39;011001&#39;, &#39;井&#39;: &#39;011010&#39;, &#39;巽&#39;: &#39;011011&#39;, &#39;恒&#39;: &#39;011100&#39;, &#39;鼎&#39;: &#39;011101&#39;, &#39;大过&#39;: &#39;011110&#39;, &#39;姤&#39;: &#39;011111&#39;,
       &#39;复&#39;: &#39;100000&#39;, &#39;颐&#39;: &#39;100001&#39;, &#39;屯&#39;: &#39;100010&#39;, &#39;益&#39;: &#39;100011&#39;, &#39;震&#39;: &#39;100100&#39;, &#39;噬嗑&#39;: &#39;100101&#39;, &#39;随&#39;: &#39;100110&#39;, &#39;无妄&#39;: &#39;100111&#39;, &#39;明夷&#39;: &#39;101000&#39;, &#39;贲&#39;: &#39;101001&#39;, &#39;既济&#39;: &#39;101010&#39;, &#39;家人&#39;: &#39;101011&#39;, &#39;丰&#39;: &#39;101100&#39;, &#39;离&#39;: &#39;101101&#39;, &#39;革&#39;: &#39;101110&#39;, &#39;同人&#39;: &#39;101111&#39;, &#39;临&#39;: &#39;110000&#39;, &#39;损&#39;: &#39;110001&#39;, &#39;节&#39;: &#39;110010&#39;, &#39;中孚&#39;: &#39;110011&#39;, &#39;归妹&#39;: &#39;110100&#39;, &#39;睽&#39;: &#39;110101&#39;, &#39;兑&#39;: &#39;110110&#39;, &#39;履&#39;: &#39;110111&#39;, &#39;泰&#39;: &#39;111000&#39;, &#39;大畜&#39;: &#39;111001&#39;, &#39;需&#39;: &#39;111010&#39;, &#39;小畜&#39;: &#39;111011&#39;, &#39;大壮&#39;: &#39;111100&#39;, &#39;大有&#39;: &#39;111101&#39;, &#39;夬&#39;: &#39;111110&#39;, &#39;乾&#39;: &#39;111111&#39;}
li = []
k = 0
for i in range(len(s)):
    if k == 1:
        k = 0
        continue
    try:
        li.append(dic[s[i]])
    except:
        t = &#39;&#39;
        t = t&#43;s[i]&#43;s[i&#43;1]
        li.append(dic[t])
        k = 1
ss = &#39;&#39;.join(li)
print(ss)
enc = &#39;&#39;
for i in range(0, len(ss), 8):
    enc &#43;= chr(eval(&#39;0b&#39;&#43;ss[i:i&#43;8]))
print(enc)
```

![](imgs/e4ae26b3-be87-4527-a65c-5633ecda8b53.png)

**得到压缩包密码：6470e394cbf6dab6a91682cc8585059b**

**解压压缩包后得到一个伪加密的压缩包，去除伪加密，可以得到一张 jpg**

**直接 foremost 可以得到一个压缩包，解压后得到两张 png 图片**

**经过尝试，发现是盲水印加密的一种**

**&lt;https://github.com/guofei9987/blind_watermark&gt;**

**根据题目名称猜测分辨率是 350x350，直接写个脚本提取即可得到一张二维码**

```python
# -*- coding: utf-8 -*-
import cv2

from blind_watermark import WaterMark
import os

bwm1 = WaterMark(password_wm=1, password_img=1)
# 注意需要设定水印的长宽wm_shape
bwm1.extract(&#39;33.png&#39;, wm_shape=(350, 350),
             out_wm_name=&#39;output.png&#39;, mode=&#39;img&#39;)
```

 ![](imgs/f7c44114-ba69-422e-b069-8f74cc4c037d.png)

**扫码即可得到flag：flag{b3bd61023d129f9e39b4a26b98c0f366}**

## 题目名称 江

**flag{湖北省武汉市江汉二路与江汉路步行商业街交叉路口}**

![](imgs/2d88382b-17ad-4234-8142-d6737becaf34.png)

## 题目名称 ez_misc

**题目附件给了一个伪加密的压缩包，直接去除伪加密然后解压可以得到一个加密的 rar 和 一张 jpg**

**jpg 末尾有很多多余的空白数据**

**经过尝试不是 whitespace ，而是 SNOW，将多余数据另存为一个新文件**

**然后直接SONW解密即可得到压缩包密码：Carefree and carefree**

![](imgs/075ea6ec-0838-4d6a-ad89-31e8fe9a51e2.png) 

![](imgs/6cb15faf-d802-4ff6-bc94-384de0d7e896.png)

然后使用得到的密码解压rar即可得到 flag：flag{b220116fc6ca827ecf3cb6c6c06dac26}

## 题目名称 为什么我的新猫猫喂不饱

**题目附件给了一个压缩包，解压得到一张 gif 和一张 png**

**010打开 gif，在末尾可以看到多余的数据，看到关键的 UOZT{**

**直接拉入随波逐流一把梭，可以得到前半部分的 flag：flag{my_ca1_ssg5?**

![](imgs/89f878b6-01d8-471c-a44e-97696dac1592.png) 

![](imgs/c2d9064b-e9d6-48d6-b503-6273428674cf.png)

**然后使用 ffmpeg 命令分帧**

**ffmpeg -i Mycatisreallyhungry.gif frame%04d.png**

**然后发现第23帧的图片和那张png是一样的，猜测这里还有盲水印**

**经过尝试，发现是频域水印，直接使用网上的脚本解密即可**

 ![](imgs/8e1b90e5-bc4f-4cef-97bd-024d2907d6aa.png)

**最后经过尝试，得到最后的 flag：flag{my_ca1_1s_Fu11}**

## 题目名称 什么协议

**题目附件给了一个流量包，翻看一下 http 和 tcp 流，发现很多 curl 命令的特征\n直接导出所有的 HTTP 对象，然后在其中发现下载了一个网页**

![](imgs/862aa54e-2fa9-45f4-a8c2-4c9e3dcd3ddd.png)

**直接用 CyberChef 提取出网页数据，然后仔细翻看一下，发现在末尾有疑似 flag 的字符串** 

![](imgs/f957d625-10d0-459e-9203-6433a3f922f7.png)

**最后直接使用最新版的随波逐流一把梭了，发现是块排序压缩BWT编码**

![](imgs/b3bbc17d-5608-4ed3-87b6-0b9a318f0152.png)

**flag{go0d_finder_f0r_th1s}**


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/a907e2b/  

