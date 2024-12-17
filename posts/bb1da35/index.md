# 群友们问的一些来路不明的题

**其实感觉时常做做群友给的题，对自我实力提升其实帮助挺大的**
&lt;!--more--&gt;
## 题目名称 大威天龙

题目附件： https://pan.baidu.com/s/1F-88ZgXGLi2iEuQI0kVVWg?pwd=x64u 提取码: x64u

题目附件给了一个DOC和一个加密的RAR压缩包

![](imgs/image-20241217162427407.png)

RAR压缩包的注释中有提示

![](imgs/image-20241217162453240.png)

然后用010打开那个doc，发现其实是一个ZIP压缩包

![](imgs/image-20241217162534874.png)

改后缀为.zip然后解压，在`gogog`路径下可以得到一张JPG图片

![](imgs/image-20241217162629300.jpeg)

结合之前RAR注释中的提示，猜测就是steghide隐写，因此我们直接使用stegseek进行爆破

![](imgs/image-20241217162848465.png)

可以得到一个txt文件，内容如下

![](imgs/image-20241217162955725.png)

因此压缩包解压密码就是：`恭喜你找到了rar压缩包的密码，快去解压吧！`

&gt; Tips:这里有的师傅用010打开会发现看不到中文，是因为这里使用的是GBK编码，可以使用记事本或者CyberChef查看

![](imgs/image-20241217163150370.png)

解压RAR压缩包后可以得到一张PNG图片和一个filename.c的代码

猜测图片被这个代码加密了，因此我们尝试逆向这个代码，结果发现原来的Python代码就写在注释里

![](imgs/image-20241217163442113.png)

![](imgs/image-20241217163637471.png)

因此直接写个脚本还原一下flag.png即可，还原后可以得到一张二维码

```python
from PIL import Image


img = Image.open(r&#34;out.png&#34;)
width,height = img.size
pix = img.load()

new_img = Image.new(&#34;RGBA&#34;, img.size)
new_pix = new_img.load()

for y in range(height):
    for x in range(width):
        b, a, r, g = pix[x, y]
        # 恢复亮度和对比度
        r = (r - 10) / 0.01
        g = (g - 10) / 0.01
        b = (b - 10) / 0.01
        a = (a - 10) / 0.01
        new_pix[x, y] = (int(r), int(g), int(b), int(a))

new_img.show()
new_img.save(r&#34;flag.png&#34;)
```

最后扫码即可得到flag：`flag{5fbb5f2b0f9234576d2742f225044463}`

![](imgs/image-20241217164317654.png)



---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/bb1da35/  

