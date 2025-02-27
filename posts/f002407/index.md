# 2025 西湖论剑·中国杭州网络安全技能大赛 Misc Writeup

**最近这一段时间一直被科研和毕设上的事拖着，因此就有段时间没有做Misc题了**

**趁着写毕设没啥思路和动力的功夫，来稍微复盘下今年西湖论剑的题**
&lt;!--more--&gt;


|                 ![](imgs/image-20250118233839169.png)&lt;br&gt;&lt;br&gt;                 |
| :---------------------------------------------------------------------------: |
| **题目附件下载：https://pan.baidu.com/s/1vXVrxFeokGB4ETv9Bs7TAQ?pwd=nxaj 提取码: nxaj** |




## 题目名称 easydatalog

&gt; 题面信息如下：
&gt; 请你对附件中的日志文件进行分析，找出“张三”的身份证号和手机号，譬如其身份证号是119795199308186673，手机号是73628276413，则提交的flag为“119795199308186673_73628276413”。

题目附件给了 access.log 和 error.log 两个日志文件

简单翻看后，我们重点关注error.log，发现传了一个蚁剑的PHP Webshell

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

## 题目名称 糟糕的磁盘

## 题目名称 DSASignatureData

&gt; 题面信息如下：
&gt; 请你对附件中的流量文件进行分析，在该流量里有一些个人信息数据。附件中还有一份个人信息的签名数据 data-sign.csv（其中签名算法采用 DSA，哈希算法采用 SHA256）和一组公钥文件（位于 public 文件夹中，文件名格式为 public-XXXX.pem，其中 XXXX 为 userid 左侧补零至四位数，即个人用户对应的公钥文件）。由于数据可能在传输过程中被篡改过，因此需要你进行签名验证，验证数据是否被篡改。找出被篡改过的个人信息数据并保存到新的 csv 文件中（文件编码 utf-8，文件格式和 data.csv 保持一致），并将该文件上传至该题的校验平台（在该校验平台里可以下载该题的示例文件 example.csv，可作为该题的格式参考），校验达标即可拿到 flag。



## 题面名称 easyrawencode


## 题目名称 cscs

题目附件给了一个流量包，稍微翻看了一下发现主要是HTTP流量

然后结合题目的名称已经流量包中的特征`submit.php`以及心跳包，可以知道是CobalStrike流量分析

![](imgs/image-20250226234433708.png)

但是这题和之前遇见的常规的CS流量直接给java序列化后的密钥对文件不同，这题它给了我们 Beacon

&gt; 在 Cobalt Strike 中，Beacon 是一种后门 payload，旨在提供持续的访问控制和通信通道。它被植入目标系统后，能够通过多种隐蔽的通信方式（如 HTTP/HTTPS）与攻击者的控制服务器进行定期的交互，执行命令、获取敏感信息并保持持久化。这使得 Beacon 成为渗透测试和红队操作中用于维持长期控制、获取系统信息和横向移动的重要工具。

![](imgs/image-20250226235242533.png)

然后去网上找相关的文章，可以找到下面这些文章：

https://www.freebuf.com/articles/system/327060.html

https://www.freebuf.com/articles/network/407982.html

![](imgs/image-20250226235541882.jpeg)

从文章中我们可以知道 `mB9u` 其实是上图第三步中Beacon随机生成的URL地址

并且结合文章中中的计算方法 `(ord(&#39;m&#39;)&#43;ord(&#39;B&#39;)&#43;ord(&#39;9&#39;)&#43;ord(&#39;u&#39;)) % 256 = 93`

可以找到受害者的主机是64位的(上面结果如果是92对应32位，93则对应64位)

然后我们跟着参考文章中的，使用 [1768.py](https://github.com/minhangxiaohui/CSthing/blob/master/1768_v0_0_8/1768.py) 去解析题目中给我们的 Beacon 文件

![](imgs/image-20250226235842380.png)

我们可以在解析结果中得到公钥，用CyberChef转换一下，并补上PEM的开头和结尾

![](imgs/image-20250227000008671.png)

```
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd&#43;ZUnvR2bYsOFiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahxXKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
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
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd&#43;ZUnvR2bYsO
FiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I&#43;3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14&#43;VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH&#43;HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke&#43;zaDVMoXKbyxIH8DEJXFkhXjUgZ&#43;SnXZqVbmclPFEe48Cp&#43;cxGtkRjJhfAIZwg
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


privateKey = &#39;&#39;&#39;-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75Nd&#43;ZUnvR2bYsO
FiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAEC
gYApWVrrvY2c0zZKu/VjQ/ivQUPy0b63GmVyS1Lg8frzAiAaESnE2Pl6bwsGbxTE
I&#43;3jeYuE1IdWOAeMnKPhY80fOSgws6vSri7CcxnMUEEn3AMw4YSwBIaBGkdLnfxf
pbS/kUUb/z7/A1SRtNq1n4hZYinnG2NpUuiO1WqwHqOGoQJBAJE14&#43;VVt8ONGIZ1
qIf4cqAnAmtonPhyDNdYZQC0IlxNzyixo/lnlTc80b3jYUA4w8GGQQZea70op4RS
fIJV5J8CQQCRNePlVbfDjRiGdaiH&#43;HKgJwJraJz4cgzXWGUAtCJcTc8osaP5Z5U3
PNG942FAOMPBhkEGXmu9KKeEUnyCVeNtAkAhlDeuCcNj6hXYyg592tsO49ZwZhGe
dik4Bw3cOsuTUr7r5yBHBUgBLQRHh/QuOLIz50rUITOC24rZU4XNUfV7AkB6vJQu
Ke&#43;zaDVMoXKbyxIH8DEJXFkhXjUgZ&#43;SnXZqVbmclPFEe48Cp&#43;cxGtkRjJhfAIZwg
p/pk3lIJdDctay9ZAkBukZv1vD/LR3Y64R5xkoLIliyCTtHgUCY44xkJvQfCGchn
xSu0tBnGgSI3El1K1eOyT6NKSZGeQUGlLGcsBtcT
-----END RSA PRIVATE KEY-----&#39;&#39;&#39;

publicKey = &#39;&#39;&#39;-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFJeF4Hy8C0TKngYptJput2/OTUsjSApDsIpT75N
d&#43;ZUnvR2bYsOFiAACt&#43;9ev&#43;ZzXLwViPrDe8gImXPYx3YlazV6YHahCTAOilYlcgZSjFkHy7s1ahx
XKic2/lDPF1DdTh2dmbDvbD4YpVVN1tXT&#43;QIqUroL5KWAIXUFjdPFlSzAgMBAAE=
-----END PUBLIC KEY-----&#39;&#39;&#39;
    
def get_AES_HMAC_key(PRIVATE_KEY,encode_data):
    # 提取协商密钥和主机信息
    private_key = RSA.import_key(PRIVATE_KEY.encode())
    cipher = PKCS1_v1_5.new(private_key)
    ciphertext = cipher.decrypt(base64.b64decode(encode_data), 0)
    if ciphertext[0:4] == b&#39;\x00\x00\xBE\xEF&#39;:
        raw_aes_keys = ciphertext[8:24]
        raw_aes_hash256 = hashlib.sha256(raw_aes_keys).digest()
        aes_key = raw_aes_hash256[0:16]
        hmac_key = raw_aes_hash256[16:]
        hexdump.hexdump(ciphertext) # 主机信息
        return aes_key.hex(),hmac_key.hex()
    

if __name__ == &#34;__main__&#34;:
    # 协商密钥和主机信息用RSA公钥加密之后放在了心跳包的cookie中
    cookie_data = &#34;SLHAIOj8/1icVtP6fImtJz6B6wR0t/XwLg1G0Y3AxoxnseBfPONxoyjAWCCOH84IJULnCZZrO7cIRxJPS2PtmDD4MvD8/PIpoW8Gj8536vhwd&#43;tyXjNKyLNyNYcj&#43;JgO4N5FTnKtkONgv7KnsMjJC3E0eI0ctqmZll8SrXLUS9k=&#34;
    SHARED_KEY,HMAC_KEY = get_AES_HMAC_key(privateKey,cookie_data)
    print(f&#34;AES key: {SHARED_KEY}&#34;)
    print(f&#34;HMAC key: {HMAC_KEY}&#34;)

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

&gt; Tips:
&gt; 
&gt; /cm：心跳包主要用于C2服务端要求客户端执行命令
&gt; 
&gt; /submit.php：主要用于传输客户端回传的执行结果

**解密心跳包中传输的数据**

```python
import hmac
import binascii
import base64
import hexdump
from Crypto.Cipher import AES

def decrypt(encrypted_data, iv_bytes, signature, shared_key, hmac_key):
    if hmac.new(hmac_key, encrypted_data, digestmod=&#34;sha256&#34;).digest()[:16] != signature:
        print(&#34;message authentication failed&#34;)
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == &#34;__main__&#34;:
    SHARED_KEY = binascii.unhexlify(&#34;9fe14473479a283821241e2af78017e8&#34;)
    HMAC_KEY = binascii.unhexlify(&#34;1e3d54f1b9f0e106773a59b7c379a89d&#34;)
    with open(&#39;data.txt&#39;,&#39;r&#39;) as f:
        data = f.read()
    encrypt_data = bytes.fromhex(data)
    encrypt_data_length = len(encrypt_data)
    print(f&#34;[&#43;] 数据总长度为：{encrypt_data_length}&#34;)
    # encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder=&#39;big&#39;, signed=False)
    data = encrypt_data[:encrypt_data_length-16]
    signature = encrypt_data[encrypt_data_length-16:]
    iv_bytes = b&#34;abcdefghijklmnop&#34;

    dec = decrypt(data, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
    print(f&#34;{&#39;=&#39;*80}&#34;)
    print(&#34;[&#43;] counter: {}&#34;.format(int.from_bytes(dec[:4], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;[&#43;] 任务返回长度: {}&#34;.format(int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)))
    print(&#34;[&#43;] 任务输出类型: {}&#34;.format(int.from_bytes(dec[8:12], byteorder=&#39;big&#39;, signed=False)))
    pcapng_data = dec[64:-60]
    with open(&#34;out.pcapng&#34;,&#39;wb&#39;) as f:
        f.write(pcapng_data)
    print(hexdump.hexdump(pcapng_data))
    # output = dec[12:int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)].decode(&#39;gbk&#39;,errors=&#39;ignore&#39;)
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
    if hmac.new(hmac_key, encrypted_data, digestmod=&#34;sha256&#34;).digest()[:16] != signature:
        print(&#34;message authentication failed&#34;)
        return
    cipher = AES.new(shared_key, AES.MODE_CBC, iv_bytes)
    return cipher.decrypt(encrypted_data)

if __name__ == &#34;__main__&#34;:
    SHARED_KEY = binascii.unhexlify(&#34;9fe14473479a283821241e2af78017e8&#34;)
    HMAC_KEY = binascii.unhexlify(&#34;1e3d54f1b9f0e106773a59b7c379a89d&#34;)
    encrypt_datas = [&#34;00000040efeda3e57f7d7fd589d11640ea0f9a4fe6bc91332723ffc5f43f78b37c21cc7485c44d6c8eb6af74fc7044046059c76519e493e351c9f631d6785d5c07eae9e3&#34;,&#34;000001602a99f7cc51face35199e8b1a4a5616e0301591b6f1f48b1d000149cb83d6a81e9659849a52c4f50a8629b0dfb7c036df406b44d449e40fe18df3594721e1f5849662271c1ea18b18c8eb58af5ee2c3a784852dd1c4a5c699f9518d2e2fc70d756cd68361ac794eed4eae6b062be6c31651caf93954f2a89b10e25b1fd9757ec17ee8b97038c4babb73c4f21688f5d235797844c2c9c288fac3fd2bd9cf5373956389b7e5232e35b6f268f9d67ba54f3e7e1606d4cb4020d5f480c6e5f4409b8d87e0443ae0bcfe93d286291ba6bfd0c7f37593581d90bb4ab7cfb065b4421a727f120fb491c2dc01797e38996dfc123fb120c5ed312577cc917d8a435b73c25b6d29ef0bad595100256c9aa5571e5c0ce0a8ea2c173ca1fae577fa924506b75b86522052f019d6843d74dc6fbdf2219b77e020a049c4e77df3658c80bcb703f8f878ff2f70c5c69d0cf6f4efb5a755ba854dfa5777a23989286770da6e0444d0&#34;,&#34;000000d0c72ef8b74a7d8acc332695b62448280f9a4eaa12457de4adcad279b0563f2d4cb0707f7e2853c45acf28a365d905cf8ca421d557bd7655cbd50aafbdbe5f3f570c9c3d876d0c21b661ca5c46e09f987f7e1263f6d33c34db28a2fd342fe48e5801d1a97fb88e00f0c648ec889f6b72d71edd2eed5affd32bc8d51e27fcc148d16823c1bc235b0e16d9d477bd0b4582941db373e171cce78b10c869eb987baf3fd9f879b236be6f3af43b7742f6241dfe02ab696c96f1779d0003d6b2720d1c93890e75fcce939f1c8e0922ce5044bc3a&#34;,&#34;00000100f24f15cd6f33c36e70ca228d10babfac1cf6bfbb9b6923a7828c9ed30b76d3ce1cb3d8f97c358bf90004e771ac646b1b996fd248ac8f0b460e0a36950dffcde04f3bae831982b528393f3a3c771310ba0c0bb7418ba5e8734a6bd37bc8a51cc0683c0904e0f404180e4c4c34720a3e5d6767c435f1746e6b93a13a2ecdc8074089e684b90748fc1a7e24e66bd637673437d9e24a37ce6f584b478e2f0485f3c05414dd4c35eb9ecfed8d4fbdab54db4233258f4fea6ed515a1030feeb184db94a4841236b491d2f7379e10f52d50ae573cd6f4504aa9750da273fa65c2a9eaf9b9bb014cafc53a9e9f0042bfcd5d24fc1b29173fd3308ff08d30b2a7d42132d4&#34;]
    for encrypt_data in encrypt_datas:
        # encrypt_data = base64.b64decode(encrypt_data)
        encrypt_data = bytes.fromhex(encrypt_data)
        encrypt_data_length = int.from_bytes(encrypt_data[:4], byteorder=&#39;big&#39;, signed=False)
        encrypt_data_l = encrypt_data[4:]
        data1 = encrypt_data_l[:encrypt_data_length-16]
        signature = encrypt_data_l[encrypt_data_length-16:]
        iv_bytes = b&#34;abcdefghijklmnop&#34;

        dec = decrypt(data1, iv_bytes, signature, SHARED_KEY, HMAC_KEY)
        print(f&#34;{&#39;=&#39;*80}&#34;)
        print(&#34;[&#43;] counter: {}&#34;.format(int.from_bytes(dec[:4], byteorder=&#39;big&#39;, signed=False)))
        print(&#34;[&#43;] 任务返回长度: {}&#34;.format(int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)))
        print(&#34;[&#43;] 任务输出类型: {}&#34;.format(int.from_bytes(dec[8:12], byteorder=&#39;big&#39;, signed=False)))
        output = dec[12:int.from_bytes(dec[4:8], byteorder=&#39;big&#39;, signed=False)].decode(&#39;gbk&#39;,errors=&#39;ignore&#39;)
        print(hexdump.hexdump(dec))
        print(output)
```

上面两个代码的主要区别就在于：第二个代码中的加密数据是从源数据的第四字节开始的

我们用第二个代码解密`submit.php`的数据，可以得到如下内容，并且发现里面有个`secret.pcapng`

```
================================================================================
[&#43;] counter: 2
[&#43;] 任务返回长度: 35
[&#43;] 任务输出类型: 30
00000000: 00 00 00 02 00 00 00 23  00 00 00 1E 77 69 6E 2D  .......#....win-
00000010: 72 72 69 39 74 39 73 6E  38 35 64 5C 61 64 6D 69  rri9t9sn85d\admi
00000020: 6E 69 73 74 72 61 74 6F  72 0D 0A 00 5C 00 44 00  nistrator...\.D.
None
win-rri9t9sn85d\adminis
================================================================================
[&#43;] counter: 3
[&#43;] 任务返回长度: 324
[&#43;] 任务输出类型: 30
00000000: 00 00 00 03 00 00 01 44  00 00 00 1E 20 C7 FD B6  .......D.... ...
00000010: AF C6 F7 20 43 20 D6 D0  B5 C4 BE ED C3 BB D3 D0  ... C ..........
00000020: B1 EA C7 A9 A1 A3 0D 0A  20 BE ED B5 C4 D0 F2 C1  ........ .......
00000030: D0 BA C5 CA C7 20 31 38  37 30 2D 33 35 35 33 0D  ..... 1870-3553.
00000040: 0A 0D 0A 20 43 3A 5C 55  73 65 72 73 5C 41 64 6D  ... C:\Users\Adm
00000050: 69 6E 69 73 74 72 61 74  6F 72 5C 44 65 73 6B 74  inistrator\Deskt
00000060: 6F 70 20 B5 C4 C4 BF C2  BC 0D 0A 0D 0A 32 30 32  op ..........202
00000070: 34 2F 31 32 2F 31 36 20  20 31 35 3A 30 35 20 20  4/12/16  15:05
00000080: 20 20 3C 44 49 52 3E 20  20 20 20 20 20 20 20 20    &lt;DIR&gt;
00000090: 20 2E 0D 0A 32 30 32 34  2F 31 32 2F 31 36 20 20   ...2024/12/16
000000A0: 31 35 3A 30 35 20 20 20  20 3C 44 49 52 3E 20 20  15:05    &lt;DIR&gt;
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

2024/12/16  15:05    &lt;DIR&gt;          .
2024/12/16  15:05    &lt;DIR&gt;          ..
2024/12/16  15:05            17,920 artifact.exe
               1 个文件         17,920 字节
               2 个目录 51,166,601,216 可
================================================================================
[&#43;] counter: 4
[&#43;] 任务返回长度: 173
[&#43;] 任务输出类型: 22
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
[&#43;] counter: 5
[&#43;] 任务返回长度: 216
[&#43;] 任务输出类型: 22
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

我们用第一个代码解密`C2服务端(10.11.4.3)`要求客户端执行命令的数据包，可以得到一个`pacpng`流量包文件

结合第二个代码解密出来的`submit.php`的数据，应该就是那个`secret.pcapng`了

![](imgs/image-20250227214140287.png)


将得到的流量包文件保存为`secret.pcapng`，打开翻看，发现主要是UDP流量

![](imgs/image-20250227214805641.png)


![](imgs/image-20250227214831328.png)

赛后和师傅们交流后知道了是`CS1.6`的流量，这里的出题思路参考自 [2021L3HCTF Lambda](https://www.anquanke.com/post/id/261339#h2-0)

这也呼应了题目名(CSCS)，CS流量里套了一个CS1.6流量




---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/f002407/  

