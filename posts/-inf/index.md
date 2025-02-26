# 2025 西湖论剑·中国杭州网络安全技能大赛 Misc Writeup

最近这一段时间一直被科研和毕设上的事拖着，因此就有段时间没有做Misc题了

趁着写毕设没啥思路和动力的功夫，来稍微复盘下今年西湖论剑的题
&lt;!--more--&gt;

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





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/-inf/  

