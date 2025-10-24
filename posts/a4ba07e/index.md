# CTF-Crypto Record

This a simple record of Crypto in CTF.
<!--more-->
## 古典密码

古典密码这一块直接看 Misc 那篇文章吧

## 现代密码

### 前置知识

#### 模运算的基本规则

**分配律**

$$  
(a+b)\mod p=(a\mod p+b\mod p)\mod p\\(a*b)\mod p=(a\mod p*b\mod p)\mod p\\a^b\mod p=((a\mod p)^b)\mod p  
$$

  

**结合律**

$$  
((a+b)\mod p+c)\mod p=(a+(b+c)\mod p)\mod p\\((a*b)\mod p*c)\mod p=(a*(b*c)\mod p)\mod p  
$$

  

$$  
若a\equiv b\mod p，对于任意的c，都有(a+c)\equiv (b+c)\mod p\\若a\equiv b\mod p，对于任意的c，都有(a*c)\equiv (b*c)\mod p\\若a\equiv b\mod p，对于任意的c，有c\equiv d\mod p，\\则(a+c)\equiv (b+d)\mod p\\(a*c)\equiv(b*d)\mod p  
$$

  

#### 费马小定理

$$  
对于任意素数q和任意整数a，其a不是p的倍数，则\\a^{p-1}\mod p=1  
$$

  

#### 扩展欧几里得算法

### RSA

#### 基础知识

素数：一个数如果除了1与它本身之外没有其他的因数，那么这个数就被称为素数。  
合数：如果一个数大于1，且该数本身不是素数，那么这个数就是一个合数。  
互质数：如果两个整数a,b的最大公因数gcb(a,b)=1，那么称a,b两数互质。  
欧拉函数值:设m为正整数，则1,2,3,4…….,m中与m互素的整数的个数记为φ(m)叫做欧拉函数，欧拉函数的值叫做欧拉函数值。如果m为素数，那么φ(m)=n-1；如果m=pq，且p和q互素，那么φ(m)=(p-1)*(q-1)  
取模运算与同余的概念:如果存在一个正整数m与两个整数a,b，如果a-b能够被m整除，也就是说m|(a-b),那么a和b模m同余  记做：a=b mod m  
模指数运算:模指数运算即先进行指数运算，之后再进行取模运算。记做：a=b^e  mod m  
逆元：如果 gcd(a,b)=1 且 a * x ≡ 1(mod b) ，那么 x 为 a 的逆元。可以说 x 为 a 的倒数(a^-1) （或模反元素）  
模运算重要定理:若a≡b (mod p)，则对于任意的正整数c，都有(a * c) ≡ (b * c) (mod p)；

**最简单的RSA加密过程：**

1、选择一对不相等且足够大的质数 p、q

2、计算p、q的乘积n

3、计算n的欧拉函数：的∮(n)=(p-1)*(q-1)

4、选一个与∮(n)互质的整数e ：1<e<∮(n)

5、计算出e对于∮(n)的模反元素：ed mod ∮(n)=1

6、公钥：KU(e,n)

7、私钥：KR(d,n)

**pow(x, y, z)：等同于pow(x, y) mod z**

**明文 M：加密 M^e mod n = C 或者 C = pow(M, e, n)**

**密文 C： 解密 C^d mod n = M 或者 M = pow(c, d, n)**

**例子：**

s1: p=3 q=11  
s2: n=p*q=33  
s3:∮(n)=(p-1)*(q-1)=20  
s4: 取e=3  
s5: 找到d=7    (3d mod 20)=1  
s6: KU=(e,n)=(3,33)  
s7: KR=(d,n)=(7,33)  
若M=20  
C = M^e mod n=14  
解密原理同上

#### 一些脚本：

```python
def EX_GCD(a,b,arr): #扩展欧几里得  
    if b == 0:  
        arr[0] = 1  
        arr[1] = 0  
        return a  
    g = EX_GCD(b, a % b, arr)  
    t = arr[0]  
    arr[0] = arr[1]  
    arr[1] = t - int(a / b) * arr[1]  
    return g  
​  
def ModReverse(a,n): #ax=1(mod n) 求a模n的乘法逆x  
    arr = [0,1,]  
    gcd = EX_GCD(a,n,arr)  
    if gcd == 1:  
        return (arr[0] % n + n) % n  
    else:  
        return -1  
​  
e = 4  
d = 7  
print(ModReverse(e,d))
```

基础RSA加密脚本  

```python
from Crypto.Util.number import *  
import gmpy2  
​  
msg = 'flag is :testflag'  
hex_msg=int(msg.encode("hex"),16)  
#hex_msg=bytes_to_long(msg)  
print(hex_msg)  
p=getPrime(100)  
q=getPrime(100)  
n=p*q  
e=0x10001  
phi=(p-1)*(q-1)  
d=gmpy2.invert(e,phi) #求逆元  
print("d=",hex(d))  
c=pow(hex_msg,e,n)  
print("e=",hex(e))  
print("n=",hex(n))  
print("c=",hex(c))
```

基础RSA解密脚本  

```python
import binascii  
import gmpy2  
n=0x80b32f2ce68da974f25310a23144977d76732fa78fa29fdcbf  
p=780900790334269659443297956843  
q=1034526559407993507734818408829  
e=0x10001  
c=0x534280240c65bb1104ce3000bc8181363806e7173418d15762  
​  
phi=(p-1)*(q-1)  
d=gmpy2.invert(e,phi)  
m=pow(c,d,n)  
print(hex(m))  
print(binascii.unhexlify(hex(m)[2:].strip("L")))  
#print("c=", long_to_bytes (m))
```

dp泄露  
给出公钥n,e以及dp  
求解私钥d脚本:  

```python
def getd(n,e,dp):  
    for i in range(1,e):  
        if (dp*e-1)%i == 0:  
            if n%(((dp*e-1)/i)+1)==0:  
                p=((dp*e-1)/i)+1  
                q=n/(((dp*e-1)/i)+1)  
                phi = (p-1)*(q-1)  
                d = gmpy2.invert(e,phi)%phi  
                return d
```

低加密指数广播攻击  
如果选取的加密指数较低，并且使用了相同的加密指数给一个接受者的群发送相同的信息，那么可以进行广播攻击得到明文。  
这个识别起来比较简单，一般来说都是给了三组加密的参数和明密文，其中题目很明确地能告诉你这三组的明文都是一样的，并且e都取了一个较小的数字。  
​  
```python
import binascii,gmpy2  
​  
def CRT(mi, ai):  
    assert(reduce(gmpy2.gcd,mi)==1)  
    assert (isinstance(mi, list) and isinstance(ai, list))  
    M = reduce(lambda x, y: x * y, mi)  
    ai_ti_Mi = [a * (M / m) * gmpy2.invert(M / m, m) for (m, a) in zip(mi, ai)]  
    return reduce(lambda x, y: x + y, ai_ti_Mi) % M
```

公钥n由多个素数因子组成  
给出e，n，c；  
已知：n=p\*q\*r\*s，公钥n是由四个素数相乘得来的  
​  
如果四个素数接近，使用yafu直接分解  
​  
解题脚本：

```python
import binascii  
import gmpy2  
p=1249559655343546956371276497499  
q=1249559655343546956371276497489  
r=1249559655343546956371276497537  
s=1249559655343546956371276497423  
e=0x10001  
c=0x22fda6137013bac19754f78e8d9658498017f05a4b0814f2af97dc2c60fdc433d2949ea27b13337961ef3c4cf27452ad3c95  
n=p*q*r*s  
phi=(p-1)*(q-1)*(r-1)*(s-1)  
d=gmpy2.invert(e,phi)  
m=pow(c,d,n)  
print(binascii.unhexlify(hex(m)[2:].strip("L")))
```

小明文攻击  低加密指数攻击  
给出n，c，e；  
​  
明文过小，导致明文的e次方仍然小于n  
直接对密文e次开方，即可得到明文  
解密：  
```python
import binascii  
import gmpy2  
n=  
e=0x3  
c=  
m=gmpy2.iroot(c, 3)[0]  
print(binascii.unhexlify(hex(m)[2:].strip("L")))

明文的三次方虽然比n大，但是大不了多少  
爆破即可  
解密脚本：  
import binascii  
import gmpy2  
n=  
e=0x3  
c=  
i = 0  
while 1:  
    res = gmpy2.iroot(c+i*n,3)  
    if(res[1] == True):  
        m=res[0]  
        print(binascii.unhexlify(hex(m)[2:].strip("L")))  
        break  
    print "i="+str(i)  
    i = i+1
```

共模攻击  
若干次加密，e不同，n相同，m相同。就可以在不分解n和求d的前提下，解出明文m。  
如果已知：n1，n2，c1，c2，e1，e2，并且其中n1=n2的话，即C1=m^e1  mod n ；C2=m^e2  mod n  
脚本：  
​  
```python
def egcd(a, b):  
    if a == 0:  
      return (b, 0, 1)  
    else:  
      g, y, x = egcd(b % a, a)  
      return (g, x - (b // a) * y, y)  
def modinv(a, m):  
    g, x, y = egcd(a, m)  
    if g != 1:  
      raise Exception('modular inverse does not exist')  
    else:  
      return x % m  
s = egcd(e1, e2)  
s1 = s[1]  
s2 = s[2]  
if s1<0:  
   s1 = - s1  
   c1 = modinv(c1, n)  
elif s2<0:  
   s2 = - s2  
   c2 = modinv(c2, n)  
m=(pow(c1,s1,n)*pow(c2,s2,n)) % n  
​  
s0, s1, s2 = gmpy2.gcdext(e1, e2)  
if s1 < 0:  
    s1 = -s1  
    c1 = gmpy2.invert(c1, n)  
elif s2 < 0:  
    s2 = -s2  
    c2 = gmpy2.invert(c2, n)  
m = gmpy2.powmod(c1, s1, n)*gmpy2.powmod(c2, s2, n) % n  
print(binascii.unhexlify(hex(m)[2:].strip("L")))
```

## Hash长度扩展攻击

原理简单来说就是：

已知：1.secret的长度

2.data的值

3.secret+data的MD5值

我们就能求出 secret+data+任意值的MD5

### 工具

1.Hashpump(已在WSL中安装)

```shell
#用法如下  
cd HashPump && ./hashpump  
#签名就是我们之前说的secret  
Input Signature: 571580b26c65f306376d4f64e53cb5c7  
Input Data: adminadmin  
Input Key Length: 15  
Input Data to Add: 123  
961a38ded0b8553041ca20dd34e8e189  
adminadmin\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc8\x00\x00\x00\x00\x00\x00\x00123  
#这里要注意，最后输出的是两部分拼接后的data  
#发送时要两部分分开来发，比如username=admin，password=admin\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xc8\x00\x00\x00\x00\x00\x00\x00123  
#并且最后BP发包的时候，要把\x替换为%
```

### 例题

1.[http://ctf5.shiyanbar.com/web/kzhan.php](http://ctf5.shiyanbar.com/web/kzhan.php)

```python
#payload  
POST /web/kzhan.php HTTP/1.1  
Host: ctf5.shiyanbar.com  
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8  
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2  
Accept-Encoding: gzip, deflate  
Referer: http://ctf5.shiyanbar.com/web/kzhan.php  
Content-Type: application/x-www-form-urlencoded  
Content-Length: 149  
Origin: http://ctf5.shiyanbar.com  
Connection: close  
Cookie: sample-hash=571580b26c65f306376d4f64e53cb5c7; source=1; getmein=961a38ded0b8553041ca20dd34e8e189  
Upgrade-Insecure-Requests: 1  
​  
username=admin&password=admin%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%c8%00%00%00%00%00%00%00123
```

## 刷题记录

### buuoj-RSA1

```python
import gmpy2  
​  
p = 473398607161  
q = 4511491  
e = 17  
#使用invert求模反元素  
d = int(gmpy2.invert(e, (p-1)*(q-1)))  
print(d)
```

### buuoj-rsarsa

```python
import gmpy2  
​  
p = 9648423029010515676590551740010426534945737639235739800643989352039852507298491399561035009163427050370107570733633350911691280297777160200625281665378483  
q = 11874843837980297032092405848653656852760910154543380907650040190704283358909208578251063047732443992230647903887510065547947313543299303261986053486569407  
e = 65537  
c = 83208298995174604174773590298203639360540024871256126892889661345742403314929861939100492666605647316646576486526217457006376842280869728581726746401583705899941768214138742259689334840735633553053887641847651173776251820293087212885670180367406807406765923638973161375817392737747832762751690104423869019034  
n = p*q  
phi = (p-1)*(q-1)  
d = gmpy2.invert(e, phi)  
m = pow(c, d, n)  
print(m)
```

### buuoj-RSA1(dp&dq泄露)

$$  
d_p=d \mod (p-1)\\m_p=c^d\mod p\\m_q=c^d\mod q\\d=d_p+k*(p-1)  
$$

  

$$  
\begin{cases}mp=d_p \mod p\\mq=d_q\mod q \end{cases}  
$$

  

$$  
c^d=m_p+k_1*p\\k_1*p=mq-mp-k_2*q\\p*i\equiv1+k_3*q\\c^d=mp+i*p*(mq-mp)-(k_1k_2+k_3)pq\\m=c^d\mod n=(mp+i*p*(mq-mp))\mod n  
$$
```python
import gmpy2  
from Crypto.Util.number import *  
​  
p = 8637633767257008567099653486541091171320491509433615447539162437911244175885667806398411790524083553445158113502227745206205327690939504032994699902053229  
q = 12640674973996472769176047937170883420927050821480010581593137135372473880595613737337630629752577346147039284030082593490776630572584959954205336880228469  
dp = 6500795702216834621109042351193261530650043841056252930930949663358625016881832840728066026150264693076109354874099841380454881716097778307268116910582929  
dq = 783472263673553449019532580386470672380574033551303889137911760438881683674556098098256795673512201963002175438762767516968043599582527539160811120550041  
c = 24722305403887382073567316467649080662631552905960229399079107995602154418176056335800638887527614164073530437657085079676157350205351945222989351316076486573599576041978339872265925062764318536089007310270278526159678937431903862892400747915525118983959970607934142974736675784325993445942031372107342103852  
n = p*q  
i = gmpy2.invert(p, q)  
mp = gmpy2.powmod(c, dp, p)  
mq = gmpy2.powmod(c, dq, q)  
m = (mp+i*p*(mq-mp)) % n  
print(m)  
print(long_to_bytes(m))
```


---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/a4ba07e/  

