# 2025 UCSCCTF Misc Writeup

**周末闲来无事，找了个比赛练练手，Misc题整体上来说出的还是比较传统，光速AK下机**
<!--more-->

|                 ![](imgs/image-20250420211547450.png)<br>                 |
| :-----------------------------------------------------------------------: |
| 本文中涉及的具体题目附件可以进我的[知识星球](https://t.zsxq.com/an6p6)获取 |

## 题目名称 three

![](imgs/image-20250420212129203.png)

第一层，Java盲水印

![](imgs/image-20250420212137213.png)

![](imgs/image-20250420212140371.png)

第二层，CyberChef一把梭

![](imgs/image-20250420212148043.png)

第三层给了一个加密压缩包和一个流量，从流量里找到字典，然后爆破即可

![](imgs/image-20250420212159236.png)

![](imgs/image-20250420212203259.png)

解压压缩包即可得到第三段flag：5d0cb5695077

把第二段flag改小写，然后三段合起来即可得到最后的flag：`flag{8f02d3e7-ce89-4d6b-830e-5d0cb5695077}`

## 题目名称 小套不是套

![](imgs/image-20250420212252054.png)

![](imgs/image-20250420212255934.png)

附件给了以上几个文件，扫码可以得到tess.zip的解压密码

![](imgs/image-20250420212302602.png)

套.zip可以直接爆破CRC得到里面的内容

![](imgs/image-20250420212309690.png)

![](imgs/image-20250420212312189.png)

> R1JWVENaUllJVkNXMjZDQ0pKV1VNWTNIT1YzVTROVEdLVjJGTVYyWU5NNFdRTTNWR0ZCVVdNS1hNSkZXQ00zRklaNUVRUVRCR0pVVlVUS0VQQktHMlozWQ==
> 
> Key is SecretIsY0u

mushroom.zip是伪加密，去除伪加密后可以得到一张JPG

末尾藏了一张去除了文件头的PNG，提出来后发现有明显的Oursecret的特征

![](imgs/image-20250420212339696.png)

![](imgs/image-20250420212343601.png)

输入之前得到的密钥`SecretIsY0u`解密即可得到最后的flag：`flag{6f6bf445-8c9e-11ef-a06b-a4b1c1c5a2d2}`

![](imgs/image-20250420212359221.png)

## 题目名称 No.shArk

![](imgs/image-20250420212410553.png)

翻看流量包，发现上传了一张cat.png

![](imgs/image-20250420212417068.png)

![](imgs/image-20250420212419797.png)

图片末尾有一些信息：keyis:keykeyishere

cat.png的文件名以及宽高大小相等提示了我们是猫脸变换

直接用下面这个脚本爆破一下即可得到第一段flag：`flag{46962f4d-8d29-`

```python
import matplotlib.pyplot as plt
import cv2
import numpy as np

def arnold_decode(image, shuffle_times, a, b):
    decode_image = np.zeros(shape=image.shape)
    h, w = image.shape[0], image.shape[1]
    N = h  # 或N=w
    for time in range(shuffle_times):
        for ori_x in range(h):
            for ori_y in range(w):
                # 按照公式坐标变换
                new_x = ((a * b + 1) * ori_x + (-b) * ori_y) % N
                new_y = ((-a) * ori_x + ori_y) % N
                decode_image[new_x, new_y, :] = image[ori_x, ori_y, :]
        image = np.copy(decode_image)
        
    return image

def arnold_brute(image,shuffle_times_range,a_range,b_range):
    for c in range(shuffle_times_range[0],shuffle_times_range[1]):
        for a in range(a_range[0],a_range[1]):
            for b in range(b_range[0],b_range[1]):
                print(f"[+] Trying shuffle_times={c} a={a} b={b}")
                decoded_img = arnold_decode(image,c,a,b)
                output_filename = f"flag_decodedc{c}_a{a}_b{b}.png"
                cv2.imwrite(output_filename, decoded_img, [int(cv2.IMWRITE_PNG_COMPRESSION), 0])
                
if __name__ == "__main__":
    img = cv2.imread("download.png")
    arnold_brute(img, (1,6), (1,11), (1,11))
```

![](imgs/image-20250420212438843.png)

![](imgs/image-20250420212442361.png)

继续翻看流量包，发现DNS流量中有可疑数据

用tshark提取出来，从数据长度和数据形状可以看出来很明显隐写了一个二维码

![](imgs/image-20250420212449767.png)

![](imgs/image-20250420212452580.png)


提取出来后发现二维码定位块缺失，用PPT补一下定位块

![](imgs/image-20250420212459987.png)

扫码得到：Y0U_Fi8d_ItHa@aaHH

继续翻看流量包，发现FTP中还传了两个文件

![](imgs/image-20250420212507036.png)

经过diff发现其中SNOW.DOC和原始项目中的文件是一样的，然后那张next.jpg如下

![](imgs/image-20250420212516249.jpeg)

发现这张图片可以用之前的密钥：keykeyishere

解silenteye得到猫脸变换的参数：shuffle=5,a=7,b=3（但是其实直接爆破也能出。。）

![](imgs/image-20250420212521724.png)

尝试把HTTP流量中传输的数据都导出来，发现在w1.html中发现可疑的信息

![](imgs/image-20250420212529325.png)


结合之前SNOW.DOC的提示，猜测就是这段文本里用SNOW隐写了内容

尝试把html文件后缀改为.txt，然后用之前得到的密钥：`Y0U_Fi8d_ItHa@aaHH`

解密SNOW隐写即可得到第二段的flag：`11ef-b3b6-a4b1c1c5a2d2}`

![](imgs/image-20250420212545469.png)

把上述两段flag合起来即可得到最后的flag：`flag{46962f4d-8d29-11ef-b3b6-a4b1c1c5a2d2}`

## 题目名称 USB

![](imgs/image-20250420212556365.png)

USB键盘流量分析，CTF-NetA一把梭：`flag{ebdfea9b-3469-41c7-9070-d7833ecc6102}`

![](imgs/image-20250420212607388.png)



---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/e9c4fc7/  

