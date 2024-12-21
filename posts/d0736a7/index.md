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

## 题目名称 2024 蓝桥杯全国总决赛 nothing [SOLVED]

题目附件： https://pan.baidu.com/s/1eGIfajRXx3uqjlk54CaZ1g?pwd=ax6g 提取码: ax6g

下载附件，得到一个`noting.zip`，打开发现是DOCX的结构

![](imgs/image-20241219143340010.png)

因此改后缀为.docx并打开，发现有一张白色的图片，还有一段白色的文字：什么都没有

![](imgs/image-20241219143422926.png)

可以把DOCX作为ZIP解压，然后直接从`noting\word\media`路径中把这张白色图片`image1.png`提取出来

![](imgs/image-20241219143710413.png)

图片的大小是34x34，我们把图片分通道提取出来，猜测存在LSB隐写

![](imgs/image-20241219144046769.png)

仔细观察各通道的数据，发现RGBA的0通道中都隐写了信息

RGBA里面都有LSB的数据，按道理来说一共就4x3x2x1=24种排列组合，爆破一下组合的顺序应该就能得到flag

但是我尝试后并没有发现flag，下面放的是我尝试的提取LSB数据的脚本

```python
from PIL import Image
import libnum
import itertools

img = Image.open(&#34;image1.png&#34;)
width,height = img.size
# print(width,height) 34 34 
r = []
g = []
b = []
a = []

for y in range(height):
    for x in range(width):
        pixel = img.getpixel((x,y))
        r.append(pixel[0]&amp;1)
        g.append(pixel[1]&amp;1)
        b.append(pixel[2]&amp;1)
        a.append(pixel[3]&amp;1)

channels = [&#39;r&#39;, &#39;g&#39;, &#39;b&#39;, &#39;a&#39;]
color_arrays = {&#39;r&#39;: r, &#39;g&#39;: g, &#39;b&#39;: b, &#39;a&#39;: a}
permutations = itertools.permutations(channels)

for perm in permutations:
    res = &#34;&#34;
    for i in range(len(r)):
        for channel in perm:
            res &#43;= str(color_arrays[channel][i])
    print(f&#34;[&#43;] {&#39; &#39;.join(perm)}&#34;)
    print(libnum.b2s(res))
    print()
```

后来在`@byxs20`师傅的帮助下，获得了新的解题思路，其实这张图片种一共就一下五种像素点

```
(255, 255, 255, 255)
(255, 255, 255, 254)
(255, 255, 254, 255)
(255, 254, 255, 255)
(254, 255, 255, 255)
```

其中`(255, 255, 255, 255)`像素是没有隐写数据的，然后另外几个像素分别按照254的位置用四进制隐写了数据

&gt; 这里为啥能想到`(255, 255, 255, 255)`像素是没有隐写数据的呢？
&gt; 
&gt; 因为如果师傅们尝试把不同像素的坐标打出来，可以发现这个像素是主要集中在前两列和第三列的前16个像素的
&gt; 
&gt; 因此比较有经验的Misc师傅就会感觉到，大段连在一起的相同像素是不存在隐写数据的，因此需要把这个像素剔除
&gt; 
&gt; 并且这里这样的排列方式，也提示了我们后续步骤中提取像素点需要按列提取

具体的对照表如下：

```python
table = {
        (255, 255, 255, 254):0,
        (255, 255, 254, 255):1,
        (255, 254, 255, 255):2,
        (254, 255, 255, 255):3
    }
```

然后具体隐写的原理就是每轮的值x4，再加上当前的四进制值，最后可以得到一个长整型，具体解密代码如下：

```python
def extract_data_from_img(img_name):
    img = Image.open(img_name)
    width,height = img.size
    # 四进制的表
    table = {
        (255, 255, 255, 254):0,
        (255, 255, 254, 255):1,
        (255, 254, 255, 255):2,
        (254, 255, 255, 255):3
    }
    raw_long = 0
    # 按列提取
    for x in range(width):
        for y in range(height):
            pixel = img.getpixel((x,y))
            if pixel != (255, 255, 255, 255):
                # print(pixel)
                raw_long = raw_long*4&#43;table[pixel]
    
    print(raw_long)
    data = long_to_bytes(raw_long)
    print(data)
    
    with open(&#34;out.zip&#34;,&#39;wb&#39;) as f:
        f.write(data)
```

还得是感谢B神脚本提供的思路，要不然根本想不到这个原理

运行以上脚本后就可以得到一个ZIP压缩包，但是Windows下直接打开是看不到内容的

![](imgs/image-20241219202304066.png)

因为被压缩的文件内容包括文件名都是 `\r`、`\n`、`\t`、`空格` 这种空白字符

因此我们在**Linux**下使用脚本解压并提取其中的内容（因为Windows下看不到文件名为空格的文件）

然后里面内容的加密方式其实和上面的原理是一样的，也是四进制，就是具体的对照表是未知的

但是因为一共就四种字符，所以我们可以直接爆破一下

```python
def blankbytes_decode(raw, blank_character):
    raw_long = 0
    for c in raw:
        for i in range(len(blank_character)):
            if c == ord(blank_character[i]):
                raw_long = raw_long * 4 &#43; i
    return long_to_bytes(raw_long)

def blankbytes_brute(raw):
    blank_character_base = [b&#34;\x09&#34;, b&#34;\x0a&#34;, b&#34;\x0d&#34;, b&#34;\x20&#34;]
    for perm in permutations(blank_character_base):
        print(f&#34;Testing permutation: {perm}&#34;)
        try:
            result = blankbytes_decode(raw, perm)
            print(f&#34;Decoded result: {result}&#34;)
        except Exception as e:
            print(f&#34;Error with permutation {perm}: {e}&#34;)
```

爆破后即可得到正确的表和最后的flag：`flag{46eade75-846b-4d26-98f7-2cb3cb4686ed}`

![](imgs/image-20241219202718201.png)

完整的解题脚本如下：

```python
from Crypto.Util.number import long_to_bytes
from itertools import permutations
from PIL import Image
import pyzipper


def extract_data_from_img(img_name):
    img = Image.open(img_name)
    width,height = img.size
    # 四进制的表
    table = {
        (255, 255, 255, 254):0,
        (255, 255, 254, 255):1,
        (255, 254, 255, 255):2,
        (254, 255, 255, 255):3
    }
    raw_long = 0
    # 按列提取
    for x in range(width):
        for y in range(height):
            pixel = img.getpixel((x,y))
            if pixel != (255, 255, 255, 255):
                # print(pixel)
                raw_long = raw_long*4&#43;table[pixel]
    
    print(raw_long)
    data = long_to_bytes(raw_long)
    print(data)
    
    with open(&#34;out.zip&#34;,&#39;wb&#39;) as f:
        f.write(data)

def blankbytes_decode(raw, blank_character):
    raw_long = 0
    for c in raw:
        for i in range(len(blank_character)):
            if c == ord(blank_character[i]):
                raw_long = raw_long * 4 &#43; i
    return long_to_bytes(raw_long)

def blankbytes_brute(raw):
    blank_character_base = [b&#34;\x09&#34;, b&#34;\x0a&#34;, b&#34;\x0d&#34;, b&#34;\x20&#34;]
    for perm in permutations(blank_character_base):
        print(f&#34;Testing permutation: {perm}&#34;)
        try:
            result = blankbytes_decode(raw, perm)
            print(f&#34;Decoded result: {result}&#34;)
        except Exception as e:
            print(f&#34;Error with permutation {perm}: {e}&#34;)


if __name__ == &#34;__main__&#34;:
    img_name = &#34;image1.png&#34;
    extract_data_from_img(img_name)
    zip_file = &#34;out.zip&#34;
    with pyzipper.ZipFile(zip_file,&#34;r&#34;) as zip_ref:
        zip_ref.extract(&#34; &#34;,&#34;./&#34;)
    with open(&#34; &#34;,&#34;rb&#34;) as f:
        data = f.read()
    res = blankbytes_brute(data)
    print(res)
```

## 题目名称 2024 蓝桥杯国赛 pingping

题目附件： https://pan.baidu.com/s/1nE4F_kVzgRaDulA0xOjiWQ?pwd=33tm 提取码: 33tm






## 题目名称 单机取证

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/d0736a7/  

