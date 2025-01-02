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

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/d0736a7/  

