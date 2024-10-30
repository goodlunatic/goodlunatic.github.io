# 2023 浙江省大学生网络与信息安全竞赛 Misc Writeup

**全靠队友带飞。拿了省一**

**这里对赛中的部分Misc题进行一个简单的复盘**
&lt;!--more--&gt;
## 初赛
### Easy_Cipher
题目如下：
```
[&#34;Kln/qZwlOsux&#43;b/Gv0WsxkOec5E70dNhvczSLFs&#43;0pkHaovEOBqUApBGBDBUrH08。RUNCIDAgMTI4IHNpeCBudW1iZXJz&#34;,&#34;Kln/qZwlOsux&#43;b/Gv0WsxkOec5E70dNhvczSLFs&#43;0pkHaovEOBqUApBGBDBUrH08&#34;]
```

把中间的那段密文base64解码可以得到
```
RUNCIDAgMTI4IHNpeCBudW1iZXJz
ECB 0 128 six numbers
```

因此写个Python脚本爆破一下AES-ECB模式的密钥即可
```python
import base64
from Crypto.Cipher import AES
def aes_decrypt(data, key):
    key = key.encode(&#39;utf-8&#39;)&#43;b&#39;\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00&#39;
    # print(key)
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted = cipher.decrypt(base64.b64decode(data))
    return decrypted
    
if __name__ == &#34;__main__&#34;:
    data = &#39;Kln/qZwlOsux&#43;b/Gv0WsxkOec5E70dNhvczSLFs&#43;0pkHaovEOBqUApBGBDBUrH08&#39;
    for i in range(100000,999999):
        key = str(i)
        res = aes_decrypt(data=data,key=key)
        res = str(res)
        if &#39;flag&#39; in res or &#39;DASCTF&#39; in res:
            print(f&#34;key:{key}&#34;)
            print(f&#34;flag:{res}&#34;)
            break
#key:515764
#flag:b&#39;DASCTF{W0w_Y0u_Succ3s5ful1y_Cr4ck_Th1s_C1ph3r}\x00\x00&#39;
```

### Steins_Gate
#### 解法一：根据像素点还原原图
```python
from PIL import Image

def get_pixel():
    img = Image.open(&#39;Steins_Gate.png&#39;)
    width, height = img.size
    pixel = img.load()
    target_data = []
    # 从行开始取
    for i in range(0, width, 16):
        # 从列开始取
        for j in range(0, height, 16):
            # 统计每个区块的像素
            dic = {}
            for x in range(i, i&#43;16):
                for y in range(j, j&#43;16):
                    r, g, b = pixel[x, y]
                    if (r, g, b) in dic:
                        dic[(r, g, b)] &#43;= 1
                    else:
                        dic[(r, g, b)] = 1
            # sorted_data = sorted(dic.items(), key=lambda x: x[1], reverse=True)
            # print(sorted_data)
            # return 0
            # 按照字典中值来进行排序
            sorted_data = sorted(dic.items(), key=lambda x: x[1], reverse=True)
            if sorted_data[0][0] != (211, 211, 211):
                target_pixel = sorted_data[0][0]
            else:
                target_pixel = sorted_data[1][0]
            target_data.append(target_pixel)
    return target_data


def fix_image(width, height, target_data):
    # 创建一个新的图像对象
    img1 = Image.new(&#34;RGB&#34;, (width, height))
    for i in range(width):
        for j in range(height):
            index = i * height &#43; j
            target_pixel = target_data[index]
            img1.putpixel((i, j), target_pixel)

    img1.show()
    img1.save(&#34;fixed.png&#34;)


if __name__ == &#34;__main__&#34;:
    target_data = get_pixel()
    img = Image.open(&#39;Steins_Gate.png&#39;)
    width, height = img.size
    width = width // 16
    height = height // 16
    fix_image(width, height, target_data)
```

#### 解法二：
```python
from PIL import Image
import libnum
import base64

def get_data():
    res = []
    base64_data = &#39;&#39;
    img = Image.open(&#39;Steins_Gate.png&#39;)
    f=open(&#39;lsb_low.txt&#39;,&#39;wb&#39;)
    width,height=img.size
    for i in range(6,height,16):
        try:
            bins = &#34;&#34;
            for j in range(2,width,16):
                tmp = img.getpixel((j,i))
                # 将每个通道的最低位（即最不重要的位）提取出来，并将其转换为字符串
                bins &#43;= str(tmp[0] &amp; 1) &#43; str(tmp[1] &amp; 1) &#43; str(tmp[2] &amp; 1)
            # 将二进制字符串bins转换为字节数据data
            data = libnum.b2s(bins)
            data = data[:data.index(b&#34;==&#34;)&#43;2]
            # print(data)
            res.append(data.decode())
            # print(res)
        except:
            break
    base64_data = &#39;\n&#39;.join([item for item in res])
    # print(base64_data) # 这里的base64_data可以转为一张jpg图片
    return res

def decode_base64_steg(data):
    bin_str = &#39;&#39;
    b64chars = &#39;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#43;/&#39;
    for stegb64 in data:
        rowb64 = str(base64.b64encode(base64.b64decode(stegb64)), &#34;utf-8&#34;).strip(&#34;\n&#34;)
        offset = abs(b64chars.index(stegb64.replace(&#39;=&#39;, &#39;&#39;)[-1]) - b64chars.index(rowb64.replace(&#39;=&#39;, &#39;&#39;)[-1]))
        equalnum = stegb64.count(&#39;=&#39;)  # no equalnum no offset
        if equalnum:
            bin_str &#43;= bin(offset)[2:].zfill(equalnum * 2)
        print(&#39;&#39;.join([chr(int(bin_str[i:i &#43; 8], 2)) for i in range(0, len(bin_str), 8)]))  # 8位一组
        
if __name__ == &#34;__main__&#34;:
    data = get_data()
    res = decode_base64_steg(data)
    # DuDuLu~T0_Ch3@t_THe_w0r1d
```

```shell
$ outguess -k &#39;DuDuLu~T0_Ch3@t_THe_w0r1d&#39; -r flag.jpg flag.txt
Reading flag.jpg....
Extracting usable bits:   67087 bits
Steg retrieve: seed: 65, len: 40

$ cat flag.txt
DASCTF{699948e3ae1195f819b23b759684ac8e}
```
## 决赛
### 蝎子
Byxs20出的题，给了一个冰蝎webshell流量，最后一步套了一个光栅

最后是卡在了光栅上，没有解出来，这里就贴一下解光栅的脚本吧

```python
from PIL import Image
import numpy as np

img = np.array(Image.open(&#39;flag.png&#39;))
print(img.shape)
for i in range(5):
    z = np.zeros_like(img)
    z[:, i::5, :] = img[:, i::5, :]
    Image.fromarray(z).show()
```

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/db7acab/  

