# 2024 强网拟态防御国际精英挑战赛初赛 Misc Writeup

**这比赛虽然有些Misc题比较搞心态，但是不得不说题目质量还是在的**

**出题师傅的水平还是挺可以的，然后经验啥的感觉还是比较老练**

&lt;!--more--&gt;

![](imgs/image-20241021155322167.png)

&gt; 题目附件下载地址： https://pan.baidu.com/s/1TNckSzEMj9XsOo8aGRyKqA?pwd=9jdh 提取码: 9jdh

## 题目名称 ezflag
打开流量包，发现直接传输了一个zip压缩包

![](imgs/image-20241021150156863.png)

因此我们直接把原始的Hex复制到cyberchef中

然后选择 From Hex 然后下载转换后的压缩包即可

&gt; Tips: 这里不推荐用CyberChef的magic功能，要不然转出来的压缩包会提示已损坏
&gt; 
&gt; 易损坏的压缩包，需要我们自己去修复文件目录区和文件目录结束区
&gt; 
&gt; 其实就是多了一位的错误数据

压缩包解压后可以得到一个flag.zip，010查看发现是一张png图片，改后缀为png即可得到flag

![](imgs/image-20241021150616473.png)

`flag{140c7366-c217-4039-af6a-d36c4591a4c8}`

## 题目名称 PvZ
解压题目给的压缩包，得到一个名为 `key is md5(price)` 的文件夹和一个加密的压缩包

文件夹里有一个txt和一张图片，内容如下

&gt; 李华的梦想是攒钱买毁灭菇加农炮，可是他总攒不住钱，请帮他理财，算一下他刚开始的这局游戏花了多少钱

![](imgs/image-20241021151311421.png)

很明显地提示了压缩包的解压密码，但是让我算是不可能算的，直接写个脚本生成一下MD5，然后爆破即可

```python
import hashlib

res = &#39;&#39;
for i in range(10000):
    res &#43;= hashlib.md5(str(i).encode()).hexdigest() &#43; &#39;\n&#39;

with open(&#34;dic.txt&#34;,&#39;w&#39;) as f:
    f.write(res)
```

![](imgs/image-20241021151748284.png)

爆破得到压缩包解压密码：217eedd1ba8c592db97d0dbe54c7adfc

解压后可以得到如下两张图片

![](imgs/image-20241021152745016.png)

用PS的透视裁剪工具调整图片，然后把前面那个角和三个定位块补上就能得到一张二维码

![](imgs/image-20241021152943211.png)

![](imgs/image-20241021153824960.png)

![](imgs/image-20241021153837437.png)

识别二维码得到如下内容
```
D&#39;`_q^K![YG{VDTveRc10qpnJ&#43;*)G!~f1{d@-}v&lt;)9xqYonsrqj0hPlkdcb(`Hd]#a`_A@VzZY;Qu8NMqKPONGkK-,BGF?cCBA@&#34;&gt;76Z:321U54-21*Non,&#43;*#G&#39;&amp;%$d&#34;y?w_uzsr8vunVrk1ongOe&#43;ihgfeG]#[ZY^W\UZSwWVUNrRQ3IHGLEiCBAFE&gt;=aA:9&gt;765:981Uvu-2&#43;O/.nm&#43;$Hi&#39;~}|B&#34;!~}|u]s9qYonsrqj0hmlkjc)gIedcb[!YX]\UZSwWVUN6LpP2HMFEDhHG@dDCBA:^!~&lt;;:921U/u3,&#43;*Non&amp;%*)(&#39;&amp;}C{cy?}|{zs[q7unVl2ponmleMib(fHG]b[Z~k
```

这个时候回头去看图片的名字：M41b0lg3.png

把M41b0lg3转换为malbolge，上网一搜发现是一种编程语言，直接在线网站运行即可得到flag

![](imgs/image-20241021154255576.png)

`flag{5108a32f-1c7f-4a40-a4fa-fd8982e6eb49}`

## 题目名称 Find way to read video
解压题目附件给的压缩包，得到一个bonan7654.txt，内容如下

&gt; bonan7654 has put his email template on a public platform.

然后就是要找bonan7654在哪个平台上发东西了，比赛的时候，社工这个人把我心态都搞崩了

国内外各大平台都搜了就是搜不到，赛后才知道是在gitcode上发的【无语】

![](imgs/image-20241021155911245.png)

唉，还是见的东西太少了，通过这次比赛也是让我知道了还有gitcode这个东西。。

下载这个项目中的README.md，发现是垃圾邮件隐写(spammimic)，找个在线网站解密一下

![](imgs/image-20241021160132194.png)

decode后得到如下内容：
```
BV1wm2EY2Egx eyJ2IjozLCJuIjoiZjE0ZyIsInMiOiIiLCJoIjoiZjczZDEyZCIsIm0iOjkwLCJrIjo4MSwibWciOjIwMCwia2ciOjEzMCwibCI6NDMsInNsIjoxLCJmaGwiOlsiMjUyZjEwYyIsImFjYWM4NmMiLCJjYTk3ODExIiwiY2QwYWE5OCIsIjAyMWZiNTkiLCIyYzYyNDIzIiwiNGUwNzQwOCIsIjRlMDc0MDgiLCJjYTk3ODExIiwiMmU3ZDJjMCIsIjZiODZiMjciLCIzZjc5YmI3IiwiNGUwNzQwOCIsIjM5NzNlMDIiLCJkNDczNWUzIiwiNGIyMjc3NyIsIjc5MDI2OTkiLCJlN2Y2YzAxIiwiMzk3M2UwMiIsIjRiMjI3NzciLCI0YjIyNzc3IiwiNmI4NmIyNyIsIjJlN2QyYzAiLCIzOTczZTAyIiwiY2E5NzgxMSIsIjNmNzliYjciLCI0ZTA3NDA4IiwiZDQ3MzVlMyIsIjM5NzNlMDIiLCIzZjc5YmI3IiwiM2Y3OWJiNyIsIjI1MmYxMGMiLCIzZjc5YmI3IiwiNmI4NmIyNyIsIjE4YWMzZTciLCI1ZmVjZWI2IiwiNGUwNzQwOCIsIjE4YWMzZTciLCIxOGFjM2U3IiwiMTk1ODFlMiIsIjNmNzliYjciLCJkMTBiMzZhIiwiMDFiYTQ3MSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNmUzNDBiOSIsIjZlMzQwYjkiLCI2ZTM0MGI5IiwiNzdhZGZjOSIsImRlN2QxYjciLCI0NGJkN2FlIiwiYmI3MjA4YiIsIjgzODkxZDciLCIyYTBhYjczIiwiZmUxZGNkMyIsIjU1OWFlYWQiLCJmMDMxZWZhIl19
```

CyberChef解base64可以得到一个json

![](imgs/image-20241021160232969.png)

```json
{
    &#34;v&#34;: 3,
    &#34;n&#34;: &#34;f14g&#34;,
    &#34;s&#34;: &#34;&#34;,
    &#34;h&#34;: &#34;f73d12d&#34;,
    &#34;m&#34;: 90,
    &#34;k&#34;: 81,
    &#34;mg&#34;: 200,
    &#34;kg&#34;: 130,
    &#34;l&#34;: 43,
    &#34;sl&#34;: 1,
    &#34;fhl&#34;: [
        &#34;252f10c&#34;,
        &#34;acac86c&#34;,
        &#34;ca97811&#34;,
        &#34;cd0aa98&#34;,
        &#34;021fb59&#34;,
        &#34;2c62423&#34;,
        &#34;4e07408&#34;,
        &#34;4e07408&#34;,
        &#34;ca97811&#34;,
        &#34;2e7d2c0&#34;,
        &#34;6b86b27&#34;,
        &#34;3f79bb7&#34;,
        &#34;4e07408&#34;,
        &#34;3973e02&#34;,
        &#34;d4735e3&#34;,
        &#34;4b22777&#34;,
        &#34;7902699&#34;,
        &#34;e7f6c01&#34;,
        &#34;3973e02&#34;,
        &#34;4b22777&#34;,
        &#34;4b22777&#34;,
        &#34;6b86b27&#34;,
        &#34;2e7d2c0&#34;,
        &#34;3973e02&#34;,
        &#34;ca97811&#34;,
        &#34;3f79bb7&#34;,
        &#34;4e07408&#34;,
        &#34;d4735e3&#34;,
        &#34;3973e02&#34;,
        &#34;3f79bb7&#34;,
        &#34;3f79bb7&#34;,
        &#34;252f10c&#34;,
        &#34;3f79bb7&#34;,
        &#34;6b86b27&#34;,
        &#34;18ac3e7&#34;,
        &#34;5feceb6&#34;,
        &#34;4e07408&#34;,
        &#34;18ac3e7&#34;,
        &#34;18ac3e7&#34;,
        &#34;19581e2&#34;,
        &#34;3f79bb7&#34;,
        &#34;d10b36a&#34;,
        &#34;01ba471&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;6e340b9&#34;,
        &#34;77adfc9&#34;,
        &#34;de7d1b7&#34;,
        &#34;44bd7ae&#34;,
        &#34;bb7208b&#34;,
        &#34;83891d7&#34;,
        &#34;2a0ab73&#34;,
        &#34;fe1dcd3&#34;,
        &#34;559aead&#34;,
        &#34;f031efa&#34;
    ]
}
```

在赛后参考了别的师傅的wp后，知道这里处理这段json有两种方法

### 解法一：根据题目名获取video

根据题目名字的提示：Find way to read video

可以猜测这段json与video有关，观察到原来那段base64数据前有一段BV开头的字符串：BV1wm2EY2Egx 

搜索这个字符串可以在B站上找到下面这个视频，视频标题：`ZjE0Zw==` base64解码后可以得到 `fl4g`

![](imgs/image-20241022183235798.png)






### 解法二：直接从json中获取flag
这里主要关注json中的fhl键，发现每个元素都是长度为7的字符串

然后字符串看起来有点像是某种Hash，然后只截取了其中的一部分

我这里先尝试了字符f的各种Hash

```
MD5：8fa14cdd754f91cc6554c9e71929cce7
SHA-256：252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111
```

然后发现第一个元素刚刚好是字符f的SHA-256的前七位，继续尝试lag{这四个字符的SHA-256
```
f: 252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111
l: acac86c0e609ca906f632b0e2dacccb2b77d22b0621f20ebece1a4835b93f6f0
a: ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
g: cd0aa9856147b6c5b4ff2b7dfee5da20aa38253099ef1b4a64aced233c9afe29
{: 021fb596db81e6d02bf3d2586ee3981fe519f275c0ac9ca76bbcf2ebb4097d96
```

发现刚刚好全对上了，因此我们接下来直接写个脚本提取flag即可

```python
import hashlib
from string import printable

table = {}

for item in printable:
    hash_data = hashlib.sha256(item.encode()).hexdigest()[:7]
    table[hash_data] = item

fhl=[&#34;252f10c&#34;,&#34;acac86c&#34;,&#34;ca97811&#34;,&#34;cd0aa98&#34;,&#34;021fb59&#34;,&#34;2c62423&#34;,&#34;4e07408&#34;,&#34;4e07408&#34;,&#34;ca97811&#34;,&#34;2e7d2c0&#34;,&#34;6b86b27&#34;,&#34;3f79bb7&#34;,&#34;4e07408&#34;,&#34;3973e02&#34;,&#34;d4735e3&#34;,&#34;4b22777&#34;,&#34;7902699&#34;,&#34;e7f6c01&#34;,&#34;3973e02&#34;,&#34;4b22777&#34;,&#34;4b22777&#34;,&#34;6b86b27&#34;,&#34;2e7d2c0&#34;,&#34;3973e02&#34;,&#34;ca97811&#34;,&#34;3f79bb7&#34;,&#34;4e07408&#34;,&#34;d4735e3&#34;,&#34;3973e02&#34;,&#34;3f79bb7&#34;,&#34;3f79bb7&#34;,&#34;252f10c&#34;,&#34;3f79bb7&#34;,&#34;6b86b27&#34;,&#34;18ac3e7&#34;,&#34;5feceb6&#34;,&#34;4e07408&#34;,&#34;18ac3e7&#34;,&#34;18ac3e7&#34;,&#34;19581e2&#34;,&#34;3f79bb7&#34;,&#34;d10b36a&#34;,&#34;01ba471&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;6e340b9&#34;,&#34;77adfc9&#34;,&#34;de7d1b7&#34;,&#34;44bd7ae&#34;,&#34;bb7208b&#34;,&#34;83891d7&#34;,&#34;2a0ab73&#34;,&#34;fe1dcd3&#34;,&#34;559aead&#34;,&#34;f031efa&#34;]
flag = &#39;&#39;

for item in fhl:
    try:
        flag &#43;= table[item]
    except:
        print(f&#34;[-] {item}解码失败，可能为不可打印字符！&#34;)

print(flag)
```

![](imgs/image-20241021161650367.png)

`flag{833ac1e3-2476-441c-ae32-eefe1d03dd9e}`

## 题目名称 Streaming


## 题目名称 Input Page Walk


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/de8e2be/  

