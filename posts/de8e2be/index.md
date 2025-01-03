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

因此，猜测需要从这些视频里提取flag

首先，我们需要批量下载这90个视频到本地，爬虫大佬可以自己写脚本爬，这里我就偷懒直接借助插件了

![](imgs/image-20241023171544503.png)

油猴插件直接安装这个脚本，然后本地需要先打开 [Aria2](https://github.com/aria2/aria2) 备用

然后刷新b站视频界面，可以在屏幕左侧看到脚本已启用

![](imgs/image-20241023171835641.png)

然后勾上所有的视频，选择 `AriaNgGUI` 下载即可

![](imgs/image-20241023171925914.png)

我们直接播放视频可以看到前面有几帧是条纹的干扰画面，因此将视频下载到本地后，我们可以先尝试用以下代码分离视频中的所有帧

```python
def video2imgs(video_path,imgs_dir): # 分离视频中的所有帧
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f&#34;[-] 视频读取失败&#34;)
        return
    frames_num = cap.get(7)
    print(f&#34;[&#43;] 视频读取成功，总帧数为 {frames_num}&#34;)
    if not os.path.exists(imgs_dir):
        os.mkdir(imgs_dir)
    frame_cnt = 1
    while True:
        ret,frame = cap.read()
        if not ret:
            break
        img_name = imgs_dir&#43;f&#34;{frame_cnt}.png&#34;
        cv2.imwrite(img_name,frame)
        print(f&#34;[&#43;] 视频第 {frame_cnt} 帧保存成功&#34;)
        frame_cnt &#43;= 1
    cap.release()
    print(f&#34;[&#43;] 视频 {video_path.split(&#39;/&#39;)[-1]} 所有帧已读取完毕&#34;)
```

分离出来后可以发现前四帧和最后四帧是干扰项，然后查看后面的图片可以明显看到图像上方有白色的原点，猜测隐写了内容

![](imgs/image-20241023205400995.png)

因此我们尝试提取图像中的的像素，因为所有白色的像素都在第一行，因此我们先分析第一行的225个像素

```python
def extract_flag(video_path):
    # 使用cv2读取视频
    cap = cv2.VideoCapture(video_path)
    # frame_width = cap.get(3)
    # frame_height = cap.get(4)
    # print(frame_width,frame_height)# 224,224
    res = &#34;&#34;
    frames_cnt = 1
    while True: 
        # 读取视频的下一帧，并返回布尔值和当前帧的图像数据
        ret, frame = cap.read()
        # print(frame[0][0][0])
        if(frames_cnt == 5):# 经过尝试发现flag就藏在每个视频的第 5 帧中
            # 自动计算行数，待转换的列数为3，并取出前225个像素R通道的值
            pixels = frame.reshape((-1,3))[:224][:,0]
            for i in range(len(pixels)):
                if pixels[i] &gt; 200:
                    pixels[i] = 1
                else:
                    pixels[i] = 0
            res = decode_pixel(pixels)
            break
        frames_cnt &#43;= 1
    return res

```

根据`flag{`头的八位二进制表示，我们可以找到隐写的对应位置

最后经过尝试，发现flag的每个字符都藏在每个视频第五帧第一行32-40的像素点中

```python
def decode_pixel(pixels):
    &#39;&#39;&#39;
    f：01100110
    l：01101100
    a：01100001
    g：01100111
    {：01111011
    &#39;&#39;&#39;
    res = &#34;&#34;
    for i in range(8):
        # 经过尝试，发现flag是隐写在24-40这十六个像素中
        res &#43;= str(pixels[32&#43;i])
    flag_char = libnum.b2s(res)
    return flag_char
```

最后，完整的解题代码如下：

```python
import cv2
import os
import libnum

def video2imgs(video_path,imgs_dir): # 分离视频中的所有帧
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f&#34;[-] 视频读取失败&#34;)
        return
    frames_num = cap.get(7)
    print(f&#34;[&#43;] 视频读取成功，总帧数为 {frames_num}&#34;)
    if not os.path.exists(imgs_dir):
        os.mkdir(imgs_dir)
    frame_cnt = 1
    while True:
        ret,frame = cap.read()
        if not ret:
            break
        img_name = imgs_dir&#43;f&#34;{frame_cnt}.png&#34;
        cv2.imwrite(img_name,frame)
        print(f&#34;[&#43;] 视频第 {frame_cnt} 帧保存成功&#34;)
        frame_cnt &#43;= 1
    cap.release()
    print(f&#34;[&#43;] 视频 {video_path.split(&#39;/&#39;)[-1]} 所有帧已读取完毕&#34;)
        

def decode_pixel(pixels):
    &#39;&#39;&#39;
    f：01100110
    l：01101100
    a：01100001
    g：01100111
    {：01111011
    &#39;&#39;&#39;
    res = &#34;&#34;
    for i in range(8):
        # 经过尝试，发现flag是隐写在24-40这十六个像素中
        res &#43;= str(pixels[32&#43;i])
    flag_char = libnum.b2s(res)
    return flag_char

def extract_flag(video_path):
    # 使用cv2读取视频
    cap = cv2.VideoCapture(video_path)
    # frame_width = cap.get(3)
    # frame_height = cap.get(4)
    # print(frame_width,frame_height)# 224,224
    res = &#34;&#34;
    frames_cnt = 1
    while True: 
        # 读取视频的下一帧，并返回布尔值和当前帧的图像数据
        ret, frame = cap.read()
        # print(frame[0][0][0])
        if(frames_cnt == 5):# 经过尝试发现flag就藏在每个视频的第 5 帧中
            # 自动计算行数，待转换的列数为3，并取出前225个像素R通道的值
            pixels = frame.reshape((-1,3))[:224][:,0]
            for i in range(len(pixels)):
                if pixels[i] &gt; 200:
                    pixels[i] = 1
                else:
                    pixels[i] = 0
            res = decode_pixel(pixels)
            break
        frames_cnt &#43;= 1
    return res

if __name__ == &#34;__main__&#34;:
    flag = [b&#39;&#39;]*100
    dir = os.listdir(&#34;./videos/&#34;)
    # print(dir)
    # output_dir = &#34;./output/&#34;
    # if not os.path.exists(output_dir):
        # os.mkdir(output_dir)
    for item in dir:
        index = int(item.split(&#39;_&#39;)[2])
        video_path = f&#34;./videos/{item}&#34;
        # imgs_dir = f&#34;./output/imgs_{index}/&#34;
        # video2imgs(video_path,imgs_dir)
        flag[index] = extract_flag(video_path)  
    print(b&#39;&#39;.join(flag))
```

![](imgs/image-20241023172017846.png)

`flag{833ac1e3-2476-441c-ae32-eefe1d03dd9e}`

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

下载附件，得到一个流量包和一个未知后缀的数据文件

发现协议中有RTCP协议，然后尝试追踪UDP流，发现有H.264的字样

![](imgs/image-20241122190444573.png)

因此我们手动修改解码方法

![](imgs/image-20241122190740529.png)

![](imgs/image-20241122190719484.png)

![](imgs/image-20241122190801891.png)

然后我们去Github上下载[这个插件](https://github.com/volvet/h264extractor)，然后放到wireshark安装目录中的plugin目录下即可

使用插件导出H.264流传输的数据

![](imgs/image-20241122191126086.png)

![](imgs/image-20241122191143029.png)

导出后可以得到一个后缀为.264的文件，直接使用爱奇艺万能播放器打开可以得到第一段flag和一堆FF字符

![](imgs/image-20241122191232867.png)

然后提示了flag1不仅仅是flag，联想到之前的那段未知数据，猜测这个也是密钥（算上引号长度刚好为16）

文本中的FF提示了需要先异或0xFF（别问为啥，问就是Misc手的经验）

![](imgs/image-20241122191404633.png)

AES-ECB解密后可以得到一个压缩包，解压后可以得到一个`badapple`和一个`secret`文件

badapple用010打开发现是一张png图片，因此我们改后缀为png，可以得到下图

![](imgs/image-20241122192000961.png)


![](imgs/image-20241122192747633.png)

010打开发现存在`IDOT`块，赛后知道了是一种特殊的图片文件，苹果和安卓系统上会显示出不同的图片

可以使用[在线网站](https://fotoforensics.com/analysis.php?id=49aa281215134389445673fd09e5ebb0f7d6ffe4.8537)直接看

![](imgs/image-20241122193003151.png)

也可以借助这个[开源项目](https://github.com/GGN-2015/macos_shadow_tank)，将图片重命名为`merged.png`，并放到`sample`目录下

运行 `preview_macos.py` 即可得到第二段flag

![](imgs/image-20241122193158584.png)

最后再看`s4cret`这个文件，补上文件头`00`，并改后缀为.mov

![](imgs/image-20241122193341274.png)

![](imgs/image-20241122193302414.png)

然后再用播放器打开，发现是由一组黑白帧组成的视频，直接写一个脚本提取黑白帧转二进制即可得到第三段flag

```python
import cv2
import libnum


cap = cv2.VideoCapture(&#39;s4cret.mov&#39;)
frame_count = 0
res = &#39;&#39;

while True:
    ret, frame = cap.read()
    if not ret:
        break
    pixel = frame.reshape((-1,3)) # 将像素化为3列n行的格式
    r = pixel[0][0] # 获取第一个像素r通道的数值
    if r &gt; 200:
        res &#43;= &#39;0&#39;
    else:
        res &#43;= &#39;1&#39;
cap.release()

# print(libnum.b2s(res))
lenth = len(res) # 259
res &#43;= (8 - (lenth % 8)) * &#39;0&#39;
print(libnum.b2s(res))
# b&#39;the flag3 is -13891ba324da}\xff\xff\xff\xff\xff\xe0&#39;
```

将三段flag组合即可得到最后的flag：`flag{3b3a9c08-88e4-4d65-b59e-13891ba324da}`

## 题目名称 Input Page Walk

参考链接：[强网拟态 2024 By W&amp;M - W&amp;M Team](https://blog.wm-team.cn/index.php/archives/84/#Input&#43;Page&#43;Walk)

解压附件压缩包，可以得到下面这几个文件

![](imgs/image-20241204222824693.png)

因为后缀未知，因此尝试用010打开，发现是`webp`图片

![](imgs/image-20241204222939434.png)

改后缀为`webp`后可以看到下面这张图片，然后发现五个文件显示的内容是一样的

![](imgs/image-20241204223043046.png)

因此猜测重点不在图片上，赛后参考了WM战队师傅的Writeup后知道了可以用`010`diff一下这几个文件

![](imgs/image-20241204223403680.png)

然后发现`0x3B140`前面的数据都是一样的，因此我们需要重点关注后面的数据

赛后知道了后面不一样的内容每个都是btrfs(B-tree文件系统)的磁盘镜像 【长见识了】

因此我们尝试在Linux中挂载这个磁盘镜像


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/de8e2be/  

