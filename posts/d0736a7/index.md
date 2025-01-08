# CTF-Misc &#34;雅&#34;题共赏

**用这篇博客来记录一下本人在比赛中遇到的一些疑难题（本人尚未解出的题）**

**如果师傅们有进一步的想法或者做出来了，可以联系我一起交流一下解题思路**
&lt;!--more--&gt;
{{&lt; admonition type=danger title=&#34;【重要】阅前须知&#34; open=true &gt;}}
**这篇博客可以算是本人的求助贴，因此本文中的大部分内容并不适合刚接触Misc方向的新同学**

**尝试本文中提到的相关题目可能会耗费大量时间，请各位读者量力而行【慎行】**
{{&lt; /admonition &gt;}}

## 题目名称 2024 ISCC-Fingers_play

题目附件： https://pan.baidu.com/s/1wSR_G9N-5739BeJgP4zouQ?pwd=6dqv 提取码: 6dqv


## 题目名称 2024 古剑山 one

题目附件： https://pan.baidu.com/s/1iSL1P1Z1Oa8WB0tXRWjSmg?pwd=vc66 提取码: vc66

题目附件给了一个`cnc.txt`，内容是10000行每行114个字符的十六进制数据

部分内容如下：

```
dd1bbd60cff3095f188b70af36a4ea2644f5241a425469a3b2b7c92fabd639ad55dfc8dd4393e4c572af31dbc4dab5173cc0bcb768331fb51d
a3f4057ce7fee14d7a79a28f9b51fb0e64063e41e09a0102b9024ed8da62c79a7e02155b23e9f2f66d8962260a04a6a92a4336aca932cc7431
be509b0be9e225cf2d639bbfb6e9595eb8111deb74b2b236265359a0bf5f2cdae1825a9072ce751f9fa40ea1bef650b5137506282ee02674c7
e8041edfc9dd08a5e74e4c4abe8c9dbca089572974798180fd5c11a15dad2a10968803c191592084600ce534cd9361194010759e97d30dfa15
9ab9a7966725e87fe0c92b4fdc95e7ae833aa180db6f295340cbcf294c7d08834e91dfdfafa98c7cc03404dbdf502bdc2e7e4c046ebd62fb23
c8725bb8060e13fead44e9a5ffb6f331383a717e9ec8498112a33ca8940a75947a8b191c68ac68e8459f7a6eb5737413a6484ff0b91004ec1a
cc385111badde9d78f2f5aee756eb34a09b86a4284a18902eee1bbbfadf1915bf8d19a03a7dc6b9bad117530dc505a76e6d5fc9f3897e89034
b318450ba8c7c8cd618ea3c4d396a2e99c3d99fe150218f2ff484003ed13e205ebe61b6108970ff530635f8fbc57e61e476618b3566de76ef2
95cda1e94b9d59843069fb8f2c4415404f31be077ebc1f83a61f08cd62d75e3d6379ca0b69e375372fd0f206d1009ebf397683c927da0ab63d
bc3cf1722bf8f617acc85ba7169649ecd70c7e9575c05ef04cde5bd8eb79120a756e1a7755acb17da63fe76286759b68f646178c8a01fac142
```

发现每行长度都一样，然后结合one联想到可能是一个密钥加密的，一开始猜测是OPT或者MPT但是发现做不出来

## 题目名称 2024 蓝桥杯国赛 pingping

题目附件： https://pan.baidu.com/s/1nE4F_kVzgRaDulA0xOjiWQ?pwd=33tm 提取码: 33tm






## 题目名称 tag(2023年福建省职业院校技能大赛高职组信息安全管理与评估)

题目附件：https://pan.baidu.com/s/1TJrAnVSDirjdl3xk6wJRHA?pwd=ee6p 提取码: ee6p

&gt; 参考链接：https://blog.csdn.net/m0_45155797/article/details/135027395

题目的内容就是要从下面这张图片中找出`evidence2`的字样

![](imgs/image-20241230185454044.jpeg)

已经知道答案，但是不知道这个`evidence2`被出题人藏哪了，感觉是内幕题。。

## 题目名称 Misc01(2024ISCC博弈对抗赛)

题目附件：https://pan.baidu.com/s/1GAhnDyy_2yplJeWibRsadg?pwd=py7u 提取码: py7u

附件给了一张图片和一个TXT，其中TXT内容如下

&gt; 不要忘记我们的接头暗号:58,20,36,40,32,60,48,88,42,46,70,21,42, 6,51,71,40,14,30,4,37,25,28,7,39,46,20,33

![](imgs/image-20241230190828836.png)

图片打开内容如下

![](imgs/image-20241230190908870.png)

用010打开发现图片末尾藏了以下数据，并且提示了后面那串base64是加密后的

&gt; IHaveEncryptedTheSignalToPreventLeakage:U2FsdGVkX18SCg3hRbbWKiIXLrevGD0Sv0aCNfGr5YEBzPi8f7oWRq5vQ5QziXjuYrfShzuxlEQe9qAN0SYZUU&#43;cQLB3wREFNCyhjvhHTlt3dmTjDFElG3okDzg3Eu4Xj&#43;2AINbme9zgOjdsJgpVZg==

![](imgs/image-20241230191013242.png)

解密需要密钥，但是找不到密钥，猜测会和图片中的那个时间有关系，但是不知道具体什么关系。。



## 题目名称 Misc02(2024ISCC博弈对抗赛)

题目附件： https://pan.baidu.com/s/1dyDJ_az_smtX6exFLinavg?pwd=pnet 提取码: pnet

附件给了两个txt还有三个7z压缩包

![](imgs/image-20250103191805347.png)

`皮箱封条.txt`的内容如下：

&gt; 大衍数列，来源于《乾坤谱》中对易传“大衍之数五十”的推论。主要用于解释中国传统文化中的太极衍生原理。
&gt; 
&gt; 数列中的每一项，都代表太极衍生过程中，曾经经历过的两仪数量总和。是中华传统文化中隐藏着的世界数学史上第一道数列题。
&gt; 
&gt; 请依据下面的提示总结出大衍数列的通项式
&gt; 
&gt; 0，2，4，8，12，18，24，32，40，50，60，72，84，98……
&gt; 
&gt; 最后请求出第22002244位是多少？（好像他比较喜欢十六进制）

解决该问题的脚本如下，最后算出答案是`242049370517768`，十六进制是`dc2482bf7108`

```python
lst = [0] * 22002245

for i in range(1,22002245):
    if i % 2 == 1:
        lst[i] = (i * i - 1) // 2
    else:
        lst[i] = (i * i) // 2
    
res = lst[22002244]
print(res,hex(res),hex(res)[2:])
# 242049370517768 0xdc2482bf7108 dc2482bf7108
```

尝试使用得到的答案去解压压缩包，但是发现不是解压密码，不知道哪里出问题了，因此打算直接爆破了

先用下面这个脚本生成所有可能的结果，然后把结果输出到一个字典中

用在线网站或者`7z2john`生成压缩包的hash，然后使用hashcat进行爆破

```python
lst = [0] * 22002245

for i in range(1,22002245):
    if i % 2 == 1:
        lst[i] = (i * i - 1) // 2
    else:
        lst[i] = (i * i) // 2
    print(hex(lst[i])[2:])
```

![](imgs/image-20250107200433630.png)

```bash
python3 1.py &gt; dic.txt
hashcat -a 0 -m 11600 hash.txt dic.txt 
```

![](imgs/image-20250107195608287.png)

爆破即可得到`皮箱左边.7z`压缩包的解压密码：`5a2dd7b80`，这个数字转十进制是`24207260544`，是数列的第`220033`项

解压后可以得到下面这5张二维码碎片

![](imgs/image-20250107201342425.png)

`皮箱封条2.txt`的内容如下：

&gt; 203879 * 203879 = 41566646641,
&gt; 
&gt; 仔细观察，203879 是个6位数，
&gt; 
&gt; 它的每个数位上的数字都是不同的，
&gt; 
&gt; 平方后的所有数位上都不出现组成它自身的数字。
&gt; 
&gt; 在1000000以内具有这样特点的6位数还有一个，两数相乘是多少？

解决该问题的脚本如下，可以得到另一个数为`639172`两数相乘的结果为`130313748188`

```python
for num in range(100000, 1000000):
    num_str = str(num)
    if len(set(num_str)) != len(num_str):
        continue
    tmp = num * num
    tmp_str = str(tmp)
    flag = False
    for digit in tmp_str:
        if digit in num_str:
            flag = True
            break
    if not flag:
        print(num, tmp)
        
# 203879 41566646641
# 639172 408540845584
```

经过尝试，发现`130313748188`的十六进制值`1e574dfedc`就是`皮箱右边.7z`的解压密码

解压后可以得到以下四个文件夹

![](imgs/image-20250103215857333.png)

第一个文件夹里有加急密信.word，010打开查看文件头发现是PNG图片，改后缀为.png可以得到下图

![](imgs/image-20250103220008449.png)

第二个文件夹里有个wav文件，au打开看频谱图可以得到下图

![](imgs/image-20250103220051153.png)

第三个文件夹里有一张宽高被修改导致CRC报错的PNG图片，还原宽高后可以得到下图

![](imgs/image-20250103220135167.png)

第四个文件夹里有一张food.png，直接stegsolve打开查看，发现红色通道里藏了下图

![](imgs/image-20250103220222869.png)

因此结合文件夹的名称和得到的类似二维码的碎片，大概就能猜到出题人的意图了。。

听说比赛快结束的时候，主办方给出了`fuxi.7z`的密码：`iscc1234`

&gt; 额，虽然确实是弱密码，但是大部分人字典里应该都没有这个吧
&gt; 
&gt; 直接爆破的话，8位的7zip密码也几乎不可能在赛中爆出来吧
&gt; 
&gt; 不知道出题人咋想的，有没有测过题？或者出题人就是一个完全不懂Misc的新手？

解压压缩包后，可以得到下面这张bmp图片

![](imgs/fuxi.bmp)

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/d0736a7/  

