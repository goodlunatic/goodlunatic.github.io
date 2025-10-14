---
title: 2024 国城杯网络安全挑战赛 Misc Writeup
subtitle: 
date: 2024-12-12T19:25:56+08:00
slug: 7bf9cb0
draft: false
author:
  name: Lunatic
  link: 
  email: 
  avatar: 
description: 
keywords: 
license: 
comment: true
weight: 0
tags:
  - CTF
  - Misc
  - Writeup
categories:
  - Writeup
hiddenFromHomePage: false
hiddenFromSearch: false
hiddenFromRss: false
hiddenFromRelated: false
summary: 
resources:
  - name: featured-image
    src: featured-image.jpg
  - name: featured-image-preview
    src: featured-image-preview.jpg
toc: true
math: false
lightgallery: false
password: 
message: 
repost:
  enable: false
  url:
---
**忙里抽闲，简单地看了看题，感觉这场比赛的取证确实出得挺好的**

**给取证题 Just_F0r3n51Cs 的出题人点个赞👍**
<!--more-->

|                   ![](imgs/image-20241211164828734.png)                   |
| :-----------------------------------------------------------------------: |
| 本文中涉及的具体题目附件可以进我的交流群获取，进群详见 [About](https://goodlunatic.github.io/about/) |

## 线上初赛

### 题目名称 Tr4ffIc_w1th_Ste90

解压附件压缩包，可以得到一个流量包和一个加密的压缩包

![](imgs/image-20241207211703547.png)

打开流量包，发现主要是UDP流量，然后还有H264的视频数据

直接追踪UDP流，复制原始Hex数据，用Cyberchef转换一下

然后下载到本地改后缀为.264，VLC打开即可得到压缩包的解压密码：`!t15tH3^pAs5W#RD*f0RFL@9`

![](imgs/image-20241207211831895.png)

解压压缩包可以得到一张图片和加密图片的代码，遛一遛GPT写一个解密代码

```python
import numpy as np
import cv2
import sys
import os

def decode(input_image, output_dir, seed_range):
    to_recover = cv2.imread(input_image, cv2.IMREAD_GRAYSCALE)
    
    if to_recover is None:
        print(f"Error: Unable to load image {input_image}")
        exit(1)

    to_recover_array = np.asarray(to_recover)
    
    for seed in seed_range:
        np.random.seed(seed)
        
        row_indices = list(range(to_recover_array.shape[0]))
        col_indices = list(range(to_recover_array.shape[1]))

        np.random.shuffle(row_indices)
        np.random.shuffle(col_indices)
        
        row_reverse = np.argsort(row_indices)
        col_reverse = np.argsort(col_indices)
        
        recovered_image = to_recover_array[row_reverse, :]
        recovered_image = recovered_image[:, col_reverse]

        output_image = os.path.join(output_dir, f"recovered_seed_{seed}.png")
        cv2.imwrite(output_image, recovered_image)
        print(f"Decoded image saved as {output_image}")

def main():
    if len(sys.argv) != 4:
        print('error! Please provide input image path, output directory, and seed range as command-line arguments.')
        exit(1)
    
    input_image = sys.argv[1]
    output_dir = sys.argv[2]
    seed_start = int(sys.argv[3].split('-')[0])  # start of seed range
    seed_end = int(sys.argv[3].split('-')[1])    # end of seed range
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    seed_range = range(seed_start, seed_end + 1)
    decode(input_image, output_dir, seed_range)

if __name__ == '__main__':
    main()
```

运行上面的脚本爆破一下seed

```bash
python decode.py encoded.png ./recovered_images 0-1000
```

然后可以得到一张`DataMatrix`二维码

![](imgs/image-20241207212023512.png)

在线网站扫码可以得到如下内容

![](imgs/image-20241207212039582.png)

> I randomly found a word list to encrypt the flag. I only remember that Wikipedia said this word list is similar to the NATO phonetic alphabet.

> crumpled chairlift freedom chisel island dashboard crucial kickoff crucial chairlift drifter classroom highchair cranky clamshell edict drainage fallout clamshell chatter chairlift goldfish chopper eyetooth endow chairlift edict eyetooth deadbolt fallout egghead chisel eyetooth cranky crucial deadbolt chatter chisel egghead chisel crumpled eyetooth clamshell deadbolt chatter chopper eyetooth classroom chairlift fallout drainage klaxon

最后找个PGP词汇表解密脚本解密即可得到flag：`D0g3xGC{C0N9rA7ULa710n5_Y0U_HaV3_ACH13V3D_7H15_90aL}`

```python
aaa = [['00', 'aardvark', 'adroitness'], ['01', 'absurd', 'adviser'], ['02', 'accrue', 'aftermath'], ['03', 'acme', 'aggregate'], ['04', 'adrift', 'alkali'], ['05', 'adult', 'almighty'], ['06', 'afflict', 'amulet'], ['07', 'ahead', 'amusement'], ['08', 'aimless', 'antenna'], ['09', 'Algol', 'applicant'], ['0A', 'allow', 'Apollo'], ['0B', 'alone', 'armistice'], ['0C', 'ammo', 'article'], ['0D', 'ancient', 'asteroid'], ['0E', 'apple', 'Atlantic'], ['0F', 'artist', 'atmosphere'], ['10', 'assume', 'autopsy'], ['11', 'Athens', 'Babylon'], ['12', 'atlas', 'backwater'], ['13', 'Aztec', 'barbecue'], ['14', 'baboon', 'belowground'], ['15', 'backfield', 'bifocals'], ['16', 'backward', 'bodyguard'], ['17', 'banjo', 'bookseller'], ['18', 'beaming', 'borderline'], ['19', 'bedlamp', 'bottomless'], ['1A', 'beehive', 'Bradbury'], ['1B', 'beeswax', 'bravado'], ['1C', 'befriend', 'Brazilian'], ['1D', 'Belfast', 'breakaway'], ['1E', 'berserk', 'Burlington'], ['1F', 'billiard', 'businessman'], ['20', 'bison', 'butterfat'], ['21', 'blackjack', 'Camelot'], ['22', 'blockade', 'candidate'], ['23', 'blowtorch', 'cannonball'], ['24', 'bluebird', 'Capricorn'], ['25', 'bombast', 'caravan'], ['26', 'bookshelf', 'caretaker'], ['27', 'brackish', 'celebrate'], ['28', 'breadline', 'cellulose'], ['29', 'breakup', 'certify'], ['2A', 'brickyard', 'chambermaid'], ['2B', 'briefcase', 'Cherokee'], ['2C', 'Burbank', 'Chicago'], ['2D', 'button', 'clergyman'], ['2E', 'buzzard', 'coherence'], ['2F', 'cement', 'combustion'], ['30', 'chairlift', 'commando'], ['31', 'chatter', 'company'], ['32', 'checkup', 'component'], ['33', 'chisel', 'concurrent'], ['34', 'choking', 'confidence'], ['35', 'chopper', 'conformist'], ['36', 'Christmas', 'congregate'], ['37', 'clamshell', 'consensus'], ['38', 'classic', 'consulting'], ['39', 'classroom', 'corporate'], ['3A', 'cleanup', 'corrosion'], ['3B', 'clockwork', 'councilman'], ['3C', 'cobra', 'crossover'], ['3D', 'commence', 'crucifix'], ['3E', 'concert', 'cumbersome'], ['3F', 'cowbell', 'customer'], ['40', 'crackdown', 'Dakota'], ['41', 'cranky', 'decadence'], ['42', 'crowfoot', 'December'], ['43', 'crucial', 'decimal'], ['44', 'crumpled', 'designing'], ['45', 'crusade', 'detector'], ['46', 'cubic', 'detergent'], ['47', 'dashboard', 'determine'], ['48', 'deadbolt', 'dictator'], ['49', 'deckhand', 'dinosaur'], ['4A', 'dogsled', 'direction'], ['4B', 'dragnet', 'disable'], ['4C', 'drainage', 'disbelief'], ['4D', 'dreadful', 'disruptive'], ['4E', 'drifter', 'distortion'], ['4F', 'dropper', 'document'], ['50', 'drumbeat', 'embezzle'], ['51', 'drunken', 'enchanting'], ['52', 'Dupont', 'enrollment'], ['53', 'dwelling', 'enterprise'], ['54', 'eating', 'equation'], ['55', 'edict', 'equipment'], ['56', 'egghead', 'escapade'], ['57', 'eightball', 'Eskimo'], ['58', 'endorse', 'everyday'], ['59', 'endow', 'examine'], ['5A', 'enlist', 'existence'], ['5B', 'erase', 'exodus'], ['5C', 'escape', 'fascinate'], ['5D', 'exceed', 'filament'], ['5E', 'eyeglass', 'finicky'], ['5F', 'eyetooth', 'forever'], ['60', 'facial', 'fortitude'], ['61', 'fallout', 'frequency'], ['62', 'flagpole', 'gadgetry'], ['63', 'flatfoot', 'Galveston'], ['64', 'flytrap', 'getaway'], ['65', 'fracture', 'glossary'], ['66', 'framework', 'gossamer'], ['67', 'freedom', 'graduate'], ['68', 'frighten', 'gravity'], ['69', 'gazelle', 'guitarist'], ['6A', 'Geiger', 'hamburger'], ['6B', 'glitter', 'Hamilton'], ['6C', 'glucose', 'handiwork'], ['6D', 'goggles', 'hazardous'], ['6E', 'goldfish', 'headwaters'], ['6F', 'gremlin', 'hemisphere'], ['70', 'guidance', 'hesitate'], ['71', 'hamlet', 'hideaway'], ['72', 'highchair', 'holiness'], ['73', 'hockey', 'hurricane'], ['74', 'indoors', 'hydraulic'], ['75', 'indulge', 'impartial'], ['76', 'inverse', 'impetus'], ['77', 'involve', 'inception'], ['78', 'island', 'indigo'], ['79', 'jawbone', 'inertia'], ['7A', 'keyboard', 'infancy'], ['7B', 'kickoff', 'inferno'], ['7C', 'kiwi', 'informant'], ['7D', 'klaxon', 'insincere'], ['7E', 'locale', 'insurgent'], ['7F', 'lockup', 'integrate'], ['80', 'merit', 'intention'], ['81', 'minnow', 'inventive'], ['82', 'miser', 'Istanbul'], ['83', 'Mohawk', 'Jamaica'], ['84', 'mural', 'Jupiter'], ['85', 'music', 'leprosy'], ['86', 'necklace', 'letterhead'], ['87', 'Neptune', 'liberty'], ['88', 'newborn', 'maritime'], ['89', 'nightbird', 'matchmaker'], ['8A', 'Oakland', 'maverick'], ['8B', 'obtuse', 'Medusa'], ['8C', 'offload', 'megaton'], ['8D', 'optic', 'microscope'], ['8E', 'orca', 'microwave'], ['8F', 'payday', 'midsummer'], ['90', 'peachy', 'millionaire'], ['91', 'pheasant', 'miracle'], ['92', 'physique', 'misnomer'], ['93', 'playhouse', 'molasses'], ['94', 'Pluto', 'molecule'], ['95', 'preclude', 'Montana'], ['96', 'prefer', 'monument'], ['97', 'preshrunk', 'mosquito'], ['98', 'printer', 'narrative'], ['99', 'prowler', 'nebula'], ['9A', 'pupil', 'newsletter'], ['9B', 'puppy', 'Norwegian'], ['9C', 'python', 'October'], ['9D', 'quadrant', 'Ohio'], ['9E', 'quiver', 'onlooker'], ['9F', 'quota', 'opulent'], ['A0', 'ragtime', 'Orlando'], ['A1', 'ratchet', 'outfielder'], ['A2', 'rebirth', 'Pacific'], ['A3', 'reform', 'pandemic'], ['A4', 'regain', 'Pandora'], ['A5', 'reindeer', 'paperweight'], ['A6', 'rematch', 'paragon'], ['A7', 'repay', 'paragraph'], ['A8', 'retouch', 'paramount'], ['A9', 'revenge', 'passenger'], ['AA', 'reward', 'pedigree'], ['AB', 'rhythm', 'Pegasus'], ['AC', 'ribcage', 'penetrate'], ['AD', 'ringbolt', 'perceptive'], ['AE', 'robust', 'performance'], ['AF', 'rocker', 'pharmacy'], ['B0', 'ruffled', 'phonetic'], ['B1', 'sailboat', 'photograph'], ['B2', 'sawdust', 'pioneer'], ['B3', 'scallion', 'pocketful'], ['B4', 'scenic', 'politeness'], ['B5', 'scorecard', 'positive'], ['B6', 'Scotland', 'potato'], ['B7', 'seabird', 'processor'], ['B8', 'select', 'provincial'], ['B9', 'sentence', 'proximate'], ['BA', 'shadow', 'puberty'], ['BB', 'shamrock', 'publisher'], ['BC', 'showgirl', 'pyramid'], ['BD', 'skullcap', 'quantity'], ['BE', 'skydive', 'racketeer'], ['BF', 'slingshot', 'rebellion'], ['C0', 'slowdown', 'recipe'], ['C1', 'snapline', 'recover'], ['C2', 'snapshot', 'repellent'], ['C3', 'snowcap', 'replica'], ['C4', 'snowslide', 'reproduce'], ['C5', 'solo', 'resistor'], ['C6', 'southward', 'responsive'], ['C7', 'soybean', 'retraction'], ['C8', 'spaniel', 'retrieval'], ['C9', 'spearhead', 'retrospect'], ['CA', 'spellbind', 'revenue'], ['CB', 'spheroid', 'revival'], ['CC', 'spigot', 'revolver'], ['CD', 'spindle', 'sandalwood'], ['CE', 'spyglass', 'sardonic'], ['CF', 'stagehand', 'Saturday'], ['D0', 'stagnate', 'savagery'], ['D1', 'stairway', 'scavenger'], ['D2', 'standard', 'sensation'], ['D3', 'stapler', 'sociable'], ['D4', 'steamship', 'souvenir'], ['D5', 'sterling', 'specialist'], ['D6', 'stockman', 'speculate'], ['D7', 'stopwatch', 'stethoscope'], ['D8', 'stormy', 'stupendous'], ['D9', 'sugar', 'supportive'], ['DA', 'surmount', 'surrender'], ['DB', 'suspense', 'suspicious'], ['DC', 'sweatband', 'sympathy'], ['DD', 'swelter', 'tambourine'], ['DE', 'tactics', 'telephone'], ['DF', 'talon', 'therapist'], ['E0', 'tapeworm', 'tobacco'], ['E1', 'tempest', 'tolerance'], ['E2', 'tiger', 'tomorrow'], ['E3', 'tissue', 'torpedo'], ['E4', 'tonic', 'tradition'], ['E5', 'topmost', 'travesty'], ['E6', 'tracker', 'trombonist'], ['E7', 'transit', 'truncated'], ['E8', 'trauma', 'typewriter'], ['E9', 'treadmill', 'ultimate'], ['EA', 'Trojan', 'undaunted'], ['EB', 'trouble', 'underfoot'], ['EC', 'tumor', 'unicorn'], ['ED', 'tunnel', 'unify'], ['EE', 'tycoon', 'universe'], ['EF', 'uncut', 'unravel'], ['F0', 'unearth', 'upcoming'], ['F1', 'unwind', 'vacancy'], ['F2', 'uproot', 'vagabond'], ['F3', 'upset', 'vertigo'], ['F4', 'upshot', 'Virginia'], ['F5', 'vapor', 'visitor'], ['F6', 'village', 'vocalist'], ['F7', 'virus', 'voyager'], ['F8', 'Vulcan', 'warranty'], ['F9', 'waffle', 'Waterloo'], ['FA', 'wallet', 'whimsical'], ['FB', 'watchword', 'Wichita'], ['FC', 'wayside', 'Wilmington'], ['FD', 'willow', 'Wyoming'], ['FE', 'woodlark', 'yesteryear'], ['FF', 'Zulu', 'Yucatan']]

_string = "crumpled chairlift freedom chisel island dashboard crucial kickoff crucial chairlift drifter classroom highchair cranky clamshell edict drainage fallout clamshell chatter chairlift goldfish chopper eyetooth endow chairlift edict eyetooth deadbolt fallout egghead chisel eyetooth cranky crucial deadbolt chatter chisel egghead chisel crumpled eyetooth clamshell deadbolt chatter chopper eyetooth classroom chairlift fallout drainage klaxon"

def tihuan(s):
    for i in aaa:
        s = s.replace(i[1],i[0])
        s = s.replace(i[2],i[0])
    return s

bbb = tihuan(_string)
print(bbb)
ccc = bbb.split(" ")
ddd = ""
for i in ccc:
    ddd+=chr(int(i,16))

print(ddd)
```

> 参考链接：https://gryffinbit.top/2020/11/14/%E4%B8%80%E4%BA%9B%E6%9D%82%E4%B9%B1%E7%9A%84%E5%AF%86%E7%A0%81/#PGP%E8%AF%8D%E6%B1%87%E8%A1%A8-%EF%BC%88%E7%94%9F%E7%89%A9%E8%AF%86%E5%88%AB%E8%AF%8D%E6%B1%87%E8%A1%A8%EF%BC%89

### 题目名称 Just_F0r3n51Cs

题目附件给了一个`E01`的磁盘镜像，可以使用`FTK image`进行挂载

![](imgs/image-20241211200047575.png)

虽然会提示报错，但是依旧是可以成功挂载的

![](imgs/image-20241211200131377.png)

挂载成功后，看用户目录下的桌面文件夹，有一个流量包文件

![](imgs/image-20241211200221507.png)

翻看流量包，发现主要是`HTTP`和`OICQ`流量，HTTP流量中可以导出下面这张JPG图片

![](imgs/image-20241211200356477.png)

010打开，发现末尾给了提示

![](imgs/image-20241211200444071.png)

base64解码可以得到：`oursecret is D0g3xGC`

![](imgs/image-20241211200534288.png)

因此猜测这张JPG图片用`oursecret`隐写了信息，尝试用`D0g3xGC`作为密钥进行提取

![](imgs/image-20241211200724231.png)

可以得到一个`hidden.txt`，内容如下

> ECB's key is
> 
> N11c3TrYY6666111
> 
> 记得给我秋秋空间点赞
  
给了密钥，并提示密文在QQ空间里，因此我们需要分析流量包中OICQ协议的内容

![](imgs/image-20241211200910204.png)

展开OICQ数据包的内容，可以得到QQ号：`293519770`

因此我们可以尝试访问这个人的QQ空间

![](imgs/image-20241211201027857.png)

可以得到密文：

> 5e19e708fa1a2c98d19b1a92ebe9c790d85d76d96a6f32ec81c59417595b73ad

![](imgs/image-20241211201217651.png)

结合密文密钥，AES-ECB解密可以得到第一段的flag：`flag1:D0g3xGC{Y0u_`

然后我们回到刚刚挂载磁盘的用户目录下，可以发现有一个`flag4.zip`

![](imgs/image-20241211201507162.png)

提取出来并解压，可以得到如下两个文件，其中的exe是由python打包的exe文件

![](imgs/image-20241211201554986.png)

因此猜测需要我们逆向exe中的加密逻辑，解密出bin文件中的内容

首先我们可以使用 [pyinstxtractor-ng](https://github.com/pyinstxtractor/pyinstxtractor-ng/) 对exe文件进行解包得到.pyc文件

![](imgs/image-20241211202359356.png)

在一堆pyc文件中找到关键的`enc_png.pyc`，然后使用`uncompyle6`对pyc文件进行反编译

![](imgs/image-20241211202557430.png)

`uncompyle6`可以直接使用 `pip install` 进行安装

![](imgs/image-20241211202951277.png)

反编译成功后可以得到如下代码

```python
# uncompyle6 version 3.9.2
# Python bytecode version base 3.8.0 (3413)
# Decompiled from: Python 3.10.16 | packaged by conda-forge | (main, Dec  5 2024, 14:16:10) [GCC 13.3.0]
# Embedded file name: enc_png.py


def xor_encrypt(data, key):
    encrypted_data = bytearray()
    for i in range(len(data)):
        encrypted_data.append(data[i] ^ key[i % len(key)])
    else:
        return encrypted_data


def read_file(file_path):
    with open(file_path, "rb") as file:
        data = file.read()
    return data


def write_file(file_path, data):
    with open(file_path, "wb") as file:
        file.write(data)


def encrypt_file(input_file_path, output_file_path, key):
    data = read_file(input_file_path)
    encrypted_data = xor_encrypt(data, key)
    write_file(output_file_path, encrypted_data)


if __name__ == "__main__":
    key = b'GCcup_wAngwaNg!!'
    input_file = "flag4.png"
    encrypted_file = "flag4_encrypted.bin"
    encrypt_file(input_file, encrypted_file, key)
```

其实就是一个简单的逐字节异或，看懂加密逻辑后直接CyberChef解密即可得到：`F0R3N51c5_Ch4Ll3N93}`

![](imgs/image-20241211203417686.png)

flag1和flag4可以通过`FTK Image`挂载并结合上述步骤获得，但是flag2和flag3就需要使用`Autopsy`工具进行辅助取证了

首先是查看环境变量，Windows的环境变量保存在注册表`SYSTEM\CurrentControlSet001\Control\Session Manager\Environment`中，注册表在`C:\Windows\System32\config`目录下

![](imgs/image-20241212113939533.png)

然后我们在环境变量中发现了`u_can_get_flag2_here`，并且它的值指向了一个文件`C:\Program Files (x86)\Internet Explorer\SIGNUP\2`

我们尝试把这个文件提取出来，看文件头发现是个zip压缩包

改后缀为zip并打开，发现是加密的，但是注释中有关于密码的提示

![](imgs/image-20241212114346468.png)

然后我们可以在注册表中寻找上述问题的答案

问题一的答案在`C:\Windows\System32\Config\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner`

![](imgs/image-20241212114834870.png)

问题二的答案在`C:\Windows\System32\Config\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName`

![](imgs/image-20241212115003470.png)

问题三的答案在`C:\Windows\System32\Config\SOFTWARE\Mozilla\Mozilla Firefox\CurrentVersion`

![](imgs/image-20241212115105918.png)

综上，压缩包的密码就是`D0g3xGC_Windows_7_Ultimate_115.0`，解压后可以得到下面这段密文

```vbe
#@~^HAAAAA==W^lLyPb/P@#@&4*.2{W!!x[mFC&|0AcAAA==^#~@
```

赛后知道了这是vbe格式加密后的密文，直接使用以.vbe格式保存，再用[在线网站](https://master.ayra.ch/vbs/vbs.aspx)解密即可

![](imgs/image-20241212115620811.png)

打开解密完成的vbs文件即可得到flag2

```
flag2 is 
h4V3_f0und_7H3_
```

然后回到Autopsy中继续看，可以找到一个加密的`Original.zip`

![](imgs/image-20241212115852676.png)

压缩包的路径为`C:/Users/D0g3xGC/Pictures/Original.zip`

并且发现同一路径下还有一个`CatWatermark_666.png`的可疑图片

![](imgs/image-20241212120049479.png)

尝试把两个文件都提取出来，压缩包发现是一个加密的，注释中有关于密码的提示

![](imgs/image-20241212120109646.png)

对于用户的登录密码，我们可以导出`C:\Windows\System32\config`目录下的`SYSTEM`和`SAM`两个文件

然后用`mimikatz`抓取hash，可以得到用户`D0g3xGC`用户的NTLM哈希为`c377ba8a4dd52401bc404dbe49771bbc`

![](imgs/image-20241212190241930.png)

拿到NTLM哈希后可以选择使用Hashcat爆破或者直接使用在线网站查询

![](imgs/image-20241212190657827.png)

CMD5上可以直接查找密码为：`qwe123!@#`

然后我们需要获取用户登录`otterctf`网站的密码，结合之前发现这个系统中存在firefox，因此大概就是`火狐浏览器登录凭证`取证了

火狐的登录凭证可以参考这个[开源项目](https://github.com/lclevy/firepwd)进行破解，运行脚本后即可得到密码：`Y0u_f1Nd^_^m3_233`

![](imgs/image-20241212192248259.png)

因此最后的解压密码为`qwe123!@#_Y0u_f1Nd^_^m3_233`，解压压缩包后得到一张`Original.png`

结合之前的提示`CatWatermark_666.png`，可以使用[CatWatermark](https://github.com/Konano/CatWatermark)这个开源项目进行解密

参考项目中的Usage，发现解密需要提供`arnold_dx arnold_dy arnold_rd`这三个参数，结合图片名称，猜测三个参数应该就是`6 6 6`

```bash
# encode
python3 encode.py original_image watermark_text output_image
# decode
python3 decode.py original_image watermarked_image output_image arnold_dx arnold_dy arnold_rd
```

所以直接把项目下载到本地然后Decode即可得到flag3：`F1N4L_s3CR3t_0F_Th15_`

```python
python decode.py Original.png CatWatermark_666.png out.png 6 6 6
```

![](imgs/image-20241212193243341.png)

综上，结合上述四段flag，本题完整的flag为：`D0g3xGC{Y0u_h4V3_f0und_7H3_F1N4L_s3CR3t_0F_Th15F0R3N51c5_Ch4Ll3N93}`

> 一些个人的碎碎念：
> 
> 感觉这题取证确实出的挺好的，可以看出来出题人花了挺多心思，结合了挺多知识点
> 
> 感觉可以作为一道考察取证基础的典型例题了

### 题目名称 eZ_Steg0

解压题目附件，可以得到以下几个文件，其中key.zip是加密的，猜测密码藏在图片中

![](imgs/image-20241211161300773.png)

打开01.png，发现都是二值化的图像

![](imgs/image-20241211161327316.png)

写一个脚本提取一下里面的数据，发现是PNG图片的十六进制数据
```python
from PIL import Image
import libnum


img = Image.open("01.png")
width,height = img.size

bin_data = ""
for y in range(height):
    for x in range(width):
        pixel = img.getpixel((x,y))
        if pixel == 0:
            bin_data += '0'
        else:
            bin_data += '1'
            
bin_data = bin_data + '0' * (8-len(bin_data)%8)
# print(libnum.b2s(bin_data))
hex_data = libnum.b2s(bin_data)[::-1]
hex_data = hex_data[30:].decode()
png_data = bytes.fromhex(hex_data)
# print(png_data)

with open("out.png","wb") as f:
    f.write(png_data)
```

运行以上脚本可以得到下图，因此压缩吧密码就是：`!!SUp3RP422W0RD^/??.&&`

![](imgs/image-20241211161534160.png)

使用得到的密码解压压缩包，可以得到一个未知类型的key文件

010打开发现前面有一段base64编码

![](imgs/image-20241211161705299.png)

CyberChef解码一下可以得到提示：`stl  stl  stl`

![](imgs/image-20241211161854426.png)

上网搜索一下stl文件，发现是一种三位图形文件格式

![](imgs/image-20241211161942128.png)

可以直接用这个[在线网站](https://www.3dpea.com/cn/view-STL-online)打开

![](imgs/image-20241211162032588.png)

得到一个密钥：`sSeCre7keY?!!@$`，用这个密钥去异或一下flag文件，可以得到一个wav

![](imgs/image-20241211162129988.png)

用010打开得到的wav文件，提示dAta有问题

![](imgs/image-20241211162223557.png)

找一个正常的wav，发现把dAta改成data就正常了

![](imgs/image-20241211162343496.png)

然后根据题面的提示，猜测是wav文件的LSB隐写

参考文章：[Audio Steganography : The art of hiding secrets within earshot (part 2 of 2) | by Sumit Kumar Arora | Medium](https://sumit-arora.medium.com/audio-steganography-the-art-of-hiding-secrets-within-earshot-part-2-of-2-c76b1be719b3)

编写以下脚本提取隐写的内容即可得到flag：`D0g3xGC{U_4rE_4_WhI2_4t_Ste9An09r4pHY}`

```python
import wave
import libnum


bin_data = ""
song = wave.open("flag.wav", mode='rb')
# Convert audio to byte array
frame_bytes = bytearray(list(song.readframes(song.getnframes())))

for item in frame_bytes:
    bin_data += str(item & 1)

bin_data = bin_data +'0'*(8-len(bin_data)%8)
flag = libnum.b2s(bin_data)[:50]
print(flag)
# b'D0g3xGC{U_4rE_4_WhI2_4t_Ste9An09r4pHY}############'
```

### 题目名称 保险柜的秘密(固件逆向)

附件给了一个`demo1.hex`和一个`tips.txt`，其中`tips`内容如下

> - 这是一个提取自普通功耗的，使用Cortex-M3内核的72Mhz，48引脚，64kb闪存的保险柜芯片
> - 摩斯密码常常用.和-来表示，且每一位中间都会被空格隔开

从tips中可以分析得到固件所用芯片为`stm32f103c8t6`

IDA32中打开反编译可以得到加密逻辑

![](imgs/image-20241212195923876.png)

![](imgs/image-20241212195425884.png)

```c
void __noreturn sub_8000850()
{
  int v0; // r4
  int v1; // r0
  int v2; // r5
  int v3; // r0
  int v4[4]; // [sp+4h] [bp-14h]
  __int16 v5; // [sp+14h] [bp-4h] BYREF
  char v6; // [sp+16h] [bp-2h]
  char v7; // [sp+17h] [bp-1h]

  sub_8000654(8, 1);
  v5 = 1;
  v7 = 16;
  v6 = 3;
  sub_8000518(1073810432, &v5);
  v0 = 0;
  while ( 1 )
  {
    do
    {
      v1 = sub_8000678();
      v2 = v1;
    }
    while ( v1 < 0 );
    if ( v1 <= 9 )
    {
      v3 = v0++;
      v4[v3] = v2;
      if ( v0 == 4 )
      {
        sub_80004B8(1000 * (2 * v4[0] + 1) + 100 * (2 * v4[1] + 1) + 10 * (2 * v4[2] + 1) + 2 * v4[3] + 1);
        v0 = 0;
      }
    }
  }
}
```

## 线下决赛

### 题目名称 d0_U_kn0w_J4v4

解压附件压缩包得到下图和一个加密的压缩包，猜测需要从图片中获得压缩包的解压密码

![](imgs/image-20250331170929789.png)

题目名称和图片的信息很明显的提示了我们是Java盲水印

因此我们直接用开源项目解密即可

https://github.com/ww23/BlindWatermark

```
java -jar .\BlindWatermark-v0.0.3-windows-x86_64.jar decode -c .\password.png output.png
```

![](imgs/image-20250331171326943.png)

得到压缩包的解压密码：`A7f#9xQ!r3b$T`

解压后得到一张名为`reverse.png`的二维码和一个`flag.txt`

我们给二维码反色然后扫码，用微信扫码甚至可以不用反色

![](imgs/image-20250331171518871.png)

扫码得到：`qwe：tewatnolzsarffuykjydyayd`

然后在`flag.txt`中得到如下内容：

1b4ca7febefae20c5386205caefb85a9a7dbce284563b24afde4a1c9624a9e75

由qwe联想到键盘QWE密码，对照解密后得到：`ecbkeyistlkdnngfrqfmfkfm`

![](imgs/image-20250331184805847.jpeg)

因此最后用得到的密钥解一个AES即可得到最后的flag：`D0g3xGC{Hat5_0ff_t0_y0U!!!}`

![](imgs/image-20250331184902223.png)


