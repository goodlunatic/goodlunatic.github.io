# 2025 能源网络安全大赛 Misc Writeup

**2025 能源网络安全大赛 Misc Writeup**

&lt;!--more--&gt;

&gt; 题目附件：https://github.com/CTF-Archives/energyCTF2025

## 题目名称 black_white

解压附件压缩包，得到得到一张PNG，010打开发现末尾藏了一张数据逆置的PNG

![](imgs/image-20250420161628445.png)

把末尾的PNG提取出来，可以得到两张由黑白像素组成的图片，同时两张图片的分辨率也是一样的

![](imgs/image-20250420161723457.png)

看到黑白图片，第一反应便是把黑白像素转为0和1

然后再结合两张这个数量，猜测是提取二进制数据后再进行二进制操作(异或的可能性最大)

因此写个脚本尝试一下

```python
from PIL import Image
import numpy as np
import libnum

img_array1 = np.array(Image.open(&#34;black_white.png&#34;))
img_array2 = np.array(Image.open(&#34;download.png&#34;))

data = ((img_array1 &amp; 1) ^ (img_array2 &amp; 1)).flatten()
bin_data = &#34;&#34;.join(data.astype(str))  # 将0/1转换为字符串后连接
res = libnum.b2s(bin_data)
print(res)

# with open(&#34;flag.zip&#34;,&#39;wb&#39;) as f:
#     f.write(res)
```

![](imgs/image-20250420162048349.png)

发现二进制数据异或后可以得到一个压缩包

于是我们保存为`flag.zip`，打开得到一个未知后缀的`flag`文件

我们在010中打开这个文件

![](imgs/image-20250420162232119.png)

经过尝试，发现在前面补上BMP的文件头`42 4D`并改后缀为`.bmp`后可以得到一张被篡改过的汉信码

![](imgs/image-20250420162341266.png)

仔细对比正常的汉信码，可以发现是左下角被旋转了180°

因此我们在PPT中修复好，然后扫码即可得到最后的flag：`flag{89b58e77-7b42-4fd1-9e58-e50d98cc5894}`

![](imgs/image-20250420162508301.png)

![](imgs/image-20250420162451069.png)


## 题目名称 alarm_clock





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/87bd986/  

