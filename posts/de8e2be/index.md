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

flag{140c7366-c217-4039-af6a-d36c4591a4c8}

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

flag{5108a32f-1c7f-4a40-a4fa-fd8982e6eb49}

## 题目名称 Find way to read video



## 题目名称 Streaming


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/de8e2be/  

