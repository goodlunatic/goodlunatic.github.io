# Python Basic Knowledge

Basic knowledge of Python Language.

<!--more-->

## 字符串处理

####  ljust和rjust

- `str.ljust(width, fillchar)`: 这个方法返回一个左对齐的版本的原字符串，并使用 `fillchar` 填充至少 `width` 长度的字符。
- 如果原字符串的长度超过了 `width`，则返回原字符串。
- `str.rjust(width, fillchar)`: 与 `ljust` 相似，但是它返回一个右对齐的版本

```python
res = "1101"
## 使用 rjust 在 res 的前面补零直到其长度是 8 的倍数
## ((len(res) + 7) // 8) * 8: 得到下一个8的倍数
required_length = ((len(res) + 7) // 8) * 8
res = res.rjust(required_length, '0')
print(res)  ## 输出: 00001101
```

## format_string

####  Python字符串前u、r、b、f的含义

```
字符串前加u——表示unicode字符串
	可能是因为这段字符串中含有中文
字符串前加r——表示非转义的原始字符串
	去掉反斜杠的转义机制
字符串前加b——表示这是一个bytes类型的对象
	python2默认字符编码是ASCII
	python3默认的字符编码是Unicode
	在python3中bytes和str的互相转换方式是：
		str.encode('utf-8')
		bytes.decode('utf-8')
字符串前加f——表示在字符串内支持大括号包裹的Python表达式
```

```python
name = "Li"
age = 16
## print("Hello " + name + " you are " + str(age) + " years old")
print("Hello %s ,you are %d years old" % (name, age))
print('%.3f' % 3.14159)
```

```python
your_name = input("please input your name:\n")
print(f"Hello,{your_name}")
print(f"Hello,{your_name}")
print("Hello", your_name)
print("Hello" + your_name)
'''
Hello,Tom
Hello,Tom
Hello Tom
HelloTom
'''
```

```python
b = 1
a = 1.05555
## 第一种方式
print(f'b 的值为:{b}')
## float 类型输出
print(f'a 的值为:{a:f}')
## float 保留两位小数 五舍六入
print(f'a 的值为:{a:.4f}')
## 第二种方式
print('a 的值为:'+str(a))
## 第三种方式
print('a 的值为:{}'.format(a))
```

## 匿名函数Lambda

```python
def add_lambda(a, b=1): return a+b
print(add_lambda(10, 20))
print(add_lambda(10))
```

```python
#三项表达式
get_odd_even = lambda x:'even' if x%2==0 else 'odd'
print(get_odd_even(8))
print(get_odd_even(9))
```

```python
#无参数表达式
import random
ran_lambda = lambda:random.random()
print(ran_lambda)
```

```python
#map函数，将列表中的元素作为参数传入指定函数
mobj = map(lambda x:x**2,[1,2,3,4])
print(list(mobj))
```

## enumerate关键字的使用

在Python中，enumerate()是一个内建函数，它允许你在遍历一个序列（例如列表、字符串或元组）的同时，追踪当前元素的索引

基本用法如下：

```python
for i, value in enumerate(some_list):
    print(f"At index {i}, the value is {value}")
```

## open函数打开文件的模式

open()函数完整的语法格式为：

```python
open(file, mode=‘r’, buffering=None, encoding=None, errors=None, newline=None, closefd=True)
```

####  文件格式相关参数

```
t：以文本格式打开文件（默认）。一般用于文本文件，如：txt。
b：以二进制格式打开文件。一般用于非文本文件，如：图片。
```

####  读写模式相关参数

```
r：以只读方式打开文件（默认模式）。文件指针定位在文件头的位置。如果文件不存在会报错。
w：以只写方式打开文件。如果文件存在，则打开文件，清空文件内容，从文件头开始编辑；如果文件不存在，则创建新文件，打开编辑。
a：以追加方式打开文件，同样是只写，不允许进行读操作。如果文件存在，则打开文件，将文件指针定位到文件尾。因此，新的内容是追加在已有内容之后。如果文件不存在，则创建新文件进行写入。
+：打开一个文件进行更新（可读写）。注意：该模式不能单独使用，需要与r/w/a组合使用。打开文件后文件指针的位置取决于另一个组合参数。
```

####  组合模式

```
r+：打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件头，新写入的内容在原有内容的前面；如果文件不存在会报错。
w+：打开一个文件用于读写。如果文件存在，则打开文件，清空原有内容，进入编辑模式；如果文件不存在，则创建一个新文件进行读写操作。
a+：以追加模式打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件尾，新写入的内容在原有内容的后面；如果文件不存在，则创建一个新文件用于读写。

所有上面这些模式默认都是t——文本模式，如果要以二进制模式打开，需要加上参数b，如：rb、rb+、wb、wb+、ab、ab+。
```

## try语句的使用

```python
## -*- encoding: utf-8 -*-
'''
@File    :   try.py
@Time    :   2022/11/14 15:27:12
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
'''
import os
import traceback

## try:
##     <statements>        #运行try语句块，并试图捕获异常
## except <name1>:
##     <statements>        #如果name1异常发现，那么执行该语句块。
## except (name2, name3):
##     <statements>        #如果元组内的任意异常发生，那么捕获它
## except <name4> as <variable>:
##     <statements>        #如果name4异常发生，那么进入该语句块，并把异常实例命名为variable
## except:
##     <statements>        #发生了以上所有列出的异常之外的异常
## else:
## <statements>            #如果没有异常发生，那么执行该语句块
## finally:
##     <statement>         #无论是否有异常发生，均会执行该语句块。

## try:
##     num = int(input('请输入一个整数:'))
##     result = 8 / num
##     print(result)
## ## except ZeroDivisionError:
## ##     print('0不能做除数')
## except ValueError as r:
##     ## r 是前面 ValueError 类的一个实例,下面是打印报错的明细
##     print('输入的值不是合法的整数 %s' % (r))
## except Exception as r:
##     print('未知错误 %s' % (r))
## ## 没有预先判断到的错误怎么办?
## finally:
##     ## 无论是否有异常，都会执行的代码
##     print('%%%%%%%%%%%%%%%')

## def demo1():
##     return int(input('请输入整数:'))
## def demo2():
##     return demo1()
## ## 函数的错误：一级一级的去找，最终会将异常传递到主函数里
## try:
##     print(demo2())
## except Exception as r:
##     print('未知错误 %s' % r)
## print(demo2())

## def input_passwd():
##     ## 1.提示用户输入密码
##     pwd = input('请输入密码：')
##     ## 2.判断密码的长度
##     if len(pwd) >= 8:
##         return pwd
##     ## 3.如果<8就主动抛出异常
##     print('主动抛出异常')
##     #a.创建异常对象
##     ex = Exception('长度不够')
##     #b.主动抛出
##     raise ex
## ## 注意：只抛出异常而不捕获异常 代码会出错
## try:
##     print(input_passwd())
## except Exception as re:
##     print(re)

#-----------以下是断言(assert())的内容
## def func(num, div):
##     ## 断言，可以理解为提前预言，让人更清楚报错的原因
##     assert (div != 0), 'div不能为0'
##     return num / div

## print(func(10, 0))

## a = 1
## assert (a < 0), '出错了，a>=0'
## print("正常运行")

## a = 1
## try:
##     assert a < 0
## except AssertionError as er:  #明确抛出此异常
##     #抛出AssertionError 不含任何信息，所以无法通过er.__str__()获取异常描述
##     print('AssertionError', er, er.__str__())
##     ## 通过traceback打印详细异常信息
##     print('traceback 打印异常')
##     traceback.print_exc()
## except:  #不会命中其他异常
##     print('assert except')

## try:
##     raise AssertionError('测试 raise AssertionError')
## except AssertionError as er:
##     print('raise AssertionError 异常', er.__str__())


#函数调用异常
def foo(value, divide):
    assert divide != 0, 'divide 不能为0'
    return value / divide


print(foo(4, 2))
print(foo(4, 0))
```

## 第三方模块(库)的使用

#### libnum模块的使用

```python
import libnum
str = "flag{114514}"
bin = "11001100110110001100001011001110111101100110001001100010011010000110101001100010011010001111101"
print(libnum.n2s(97))  ## a
print(libnum.s2n(str))  ## 31698494968735985349289915517
print(hex(libnum.s2n(str)))  ## 0x666c61677b3131343531347d
print(libnum.s2b(str))
## 011001100110110001100001011001110111101100110001001100010011010000110101001100010011010001111101
print(libnum.b2s(bin))
## 会自动在前面补零对齐8位 b'flag{114514}'
```

#### itertools模块的使用

##### 1. product生成笛卡尔积（嵌套循环）
```python
import itertools
from string import printable

# for i in printable:
#     for j in printable:
#         for k in printable:
#             for l in printable:
#                 print(i+j+k+l)
                
for strs in itertools.product(printable, repeat=4):
    print(''.join(strs))
```

##### 2. permutations生成排列组合
```python
from itertools import permutations
# 生成长度为2的排列组合
print(list(permutations("ABC", 2)))  
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
```

##### 3. combinations生成组合
```python
from itertools import combinations
# 生成长度为2的组合
print(list(combinations("ABC", 2)))  
# [('A', 'B'), ('A', 'C'), ('B', 'C')]
```


#### hashlib模块的使用

常见的加密

```python
import hashlib

text = "Hello"

# md5加密
md5_hash = hashlib.md5()
md5_hash.update(text.encode('utf-8'))
res = md5_hash.hexdigest()

# SHA1加密
sha1_hash = hashlib.sha1()
sha1_hash.update(text.encode('utf-8'))
res = sha1_hash.hexdigest()
```

####  re模块的使用

|   字符   |                             描述                             |
| :------: | :----------------------------------------------------------: |
|    \d    |         代表任意数字，就是阿拉伯数字 0-9 这些玩意。          |
|    \D    | 大写的就是和小写的唱反调，d 你代表的是任意数字是吧？那么我 D 就代表不是数字的。 |
|    \w    |   代表字母，数字，下划线。也就是 a-z、A-Z、0-9、中文字符。   |
|    \W    |     跟 w 唱反调，代表不是字母，不是数字，不是下划线的。      |
|    \n    |                        代表一个换行。                        |
|    \r    |                        代表一个回车。                        |
|    \f    |                          代表换页。                          |
|    \t    |                       代表一个 Tab 。                        |
|    \s    |      代表所有的空白字符，也就是上面这个：\n、\r、\t、\f      |
|    \S    |            跟 s 唱反调，代表所有不是空白的字符。             |
|   `A`    |                      代表字符串的开始。                      |
|   `Z`    |                      代表字符串的结束。                      |
|    ^     |                    匹配字符串开始的位置。                    |
|    $     |                    匹配字符创结束的位置。                    |
|    .     |                代表所有的单个字符，除了 \n \r                |
| `[...]`  |     代表在 [] 范围内的字符，比如 [a-z] 就代表 a到z的字母     |
| `[^...]` |           跟 […] 唱反调，代表不在 [] 范围内的字符            |
|   {n}    | 匹配在 {n} 前面的东西，比如: o{2} 不能匹配 Bob 中的 o ，但是能匹配 food 中的两个o。 |
| `{n,m}`  | 匹配在 {n,m} 前面的东西，比如：o{1,3} 将匹配“fooooood”中的前三个o。 |
| `{n，}`  | 匹配在 {n,} 前面的东西，比如：o{2,} 不能匹配“Bob”中的“o”，但能匹配“foooood”中的所有o。 |
|   `*`    | 和 {0,} 一个样，匹配 * 前面的 0 次或多次。 比如 zo* 能匹配“z”、“zo”以及“zoo”。 |
|   `+`    | 和{1，} 一个样，匹配 + 前面 1 次或多次。 比如 zo+”能匹配“zo”以及“zoo”，但不能匹配“z”。 |
|   `？`   |          和{0,1} 一个样，匹配 ？前面 0 次或 1 次。           |
|   a\|b   |                       匹配 a 或者 b。                        |
|  `（）`  |                     匹配括号里面的内容。                     |

```python
## -*- encoding: utf-8 -*-

## *代表匹配零次或多次
## +代表匹配一次或多次
## ?代表匹配零次或一次
## $匹配输入字符串的结束位置
## \\.代表小数点
## \\s代表空格，则\\s*代表匹配多个空格
## \\d代表匹配一个数字字符，等价于[0-9]，则\\d+\\.\\d*可匹配1.或1.0等\\d*\\.\\d+可匹配.0或1.0等
## [+-]代表匹配包含的任一字符+或-，[+-]?则说明+或-可有可无

import re

str = 'aabbabaabbaa'
# 一个"."就是匹配除 \n (换行符)以外的任意一个字符
print(re.findall(r'a.b', str))  #['aab', 'aab']
# *前面的字符出现0次或以上
print(re.findall(r'a*b', str))  #['aab', 'b', 'ab', 'aab', 'b']
# 贪婪，匹配从.*前面为开始到后面为结束的所有内容
print(re.findall(r'a.*b', str))  #['aabbabaabb']
# 非贪婪，遇到开始和结束就进行截取，因此截取多次符合的结果，中间没有字符也会被截取
print(re.findall(r'a.*?b', str))  #['aab', 'ab', 'aab']
# 非贪婪，与上面一样，只是与上面的相比多了一个括号，只保留括号的内容
print(re.findall(r'a(.*?)b', str))  #['a', '', 'a']

str = '''aabbab
         aabbaa
         bb'''

# 后面多加了2个b
# 没有把最后一个换行的aab算进来
print(re.findall(r'a.*?b', str))  #['aab', 'ab', 'aab']
# re.S不会对\n进行中断
print(re.findall(r'a.*?b', str, re.S))  #['aab', 'ab', 'aab', 'aa\n         b']
```

```python
import re

content = """苹果是绿色的
橙子是橙色的
香蕉是黄色的
乌鸦是黑色的"""
p = re.compile(r".色")
# 代表所有的单个字符，除了 \n \r
print(type(p))
for one in p.findall(content):
    # 找出所有符合条件的文本
    print(type(one))
    print(one)
```

```python
import re

source = """王亚辉
tony
刘文武"""

# p = re.compile(r"\w{2,4}")
p = re.compile(r"\w{2,4}", re.A)
# 不匹配中文
print(p.findall(source))
```

```python
import re

content = """001-苹果价格-60
002-橙子价格-78
003-香蕉价格-88"""
# p = re.compile(r"^\d+")
p = re.compile(r"^\d+", re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = """001-苹果价格-60
002-橙子价格-78
003-香蕉价格-88"""
# p = re.compile(r"^\d+")
p = re.compile(r"\d+$", re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = """张三，手机号码15945678901
李四，手机号码13945677701
王二，手机号码13845666901"""
p = re.compile(r"^(.+)，.+(\d{11})", re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = """Python3高级开发工程师上海互教教育科技有限公司上海-浦东新区2万/月02-18满员
测试开发工程师(C+/python)上海墨鹍数码科技有限公司上海-浦东新区2.5万/每月02-18未满员
Python.3开发工程师上海德拓信息技术股份有限公司上海-徐汇区1.3万/每月02-18乘剩余11人
测试开发工程师(Python)赫里普（上海）信息科技有限公司上海-浦东新区1.1万/每月02-18剩余5人"""
p = re.compile(r"([\d.]+)万/每{0,1}月", re.M)
# p = re.compile(r"([\d.]+)万/每{0,1}月")
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

names = "关羽; 张飞, 赵云,马超, 黄忠  李逵"
namelist = re.split(r"[;,\s]\s*", names)
print(namelist)
```

```python
import re

## PhoneNumRegex = re.compile(r"\d{3}-\d{3}-\d{3}")
PhoneNumRegex = re.compile(r"(\d{3})-(\d{3}-\d{3})")
## 向 re.compile()传入一个字符串值，表示正则表达式，它将返回一个 Regex 模式对象
mo = PhoneNumRegex.search("My Phone number is 415-555-4242")
print(mo.group(0))
print(mo.group())
print(mo.group(1))
print(mo.group(2))
print(mo.groups())
areacode, mainNumber = mo.groups()
print(areacode)
print(mainNumber)
## print("Phone number founded:" + mo.group())
## Regex 对象的 search()方法查找传入的字符串，寻找该正则表达式的所有匹配。如
## 果字符串中没有找到该正则表达式模式，search()方法将返回 None。如果找到了该模式，
## search()方法将返回一个 Match 对象。Match 对象有一个 group()方法，它返回被查找字
## 符串中实际匹配的文本
PhoneNumRegex2 = re.compile(r"(\(\d{3}\))-(\d{3}-\d{3})")
mo2 = PhoneNumRegex2.search("My Phone number is (415)-555-4242")
print(mo2.groups())
print(mo2.group(1))
PhoneNumRegex3 = re.compile(r"(\d{3}-)?\d{3}-\d{4}")
mo3 = PhoneNumRegex3.search("My Phonenumber is 415-555-4224")
print(mo3.group())
mo4 = PhoneNumRegex3.search("My Phonenumber is 555-4224")
print(mo4.group())
```

```python
import re

agentNamesRegex = re.compile(r"Agent (\w)\w*")
res = agentNamesRegex.sub(
    r"\1****",
    "Agent Alice told Agent Carol that Agent Eve knew Agent Bob was a double agent.",
)
print(res)
## 字符串中的\1 将由分组 1 匹配的文本所替代，也就是正则表达式的(\w)分组。
```

```python
## phoneAndEmail.py - Finds phone numbers and email addresses on the clipboard.
import pyperclip, re

phoneRegex = re.compile(
    r"""(
(\d{3}|\(\d{3}\))? ## area code
(\s|-|\.)? ## separator
(\d{3}) ## first 3 digits
(\s|-|\.) ## separator
(\d{4}) ## last 4 digits
(\s*(ext|x|ext.)\s*(\d{2,5}))? ## extension
)""",
    re.VERBOSE,
)

emailRegex = re.compile(
    r"""(
[a-zA-Z0-9._%+-]+ ## username
@ ## @ symbol
[a-zA-Z0-9.-]+ ## domain name
(\.[a-zA-Z]{2,4}) ## dot-something
)""",
    re.VERBOSE,
)

text = str(pyperclip.paste())
## 从剪切板获取内容
matches = []
for groups in phoneRegex.findall(text):
    phoneNum = "-".join([groups[1], groups[3], groups[5]])
    ## 用-连接各部分
if groups[8] != "":
    phoneNum += " x" + groups[8]
    matches.append(phoneNum)
for groups in emailRegex.findall(text):
    matches.append(groups[0])
    ## group[0]是匹配r''中的所有东西

if len(matches) > 0:
    pyperclip.copy("\n".join(matches))
    ## 以换行符为行分隔符复制到剪切板
    print("Copied to clipboard:")
    print("\n".join(matches))
else:
    print("No phone numbers or email addresses found.")
```

#### PIL(Pillow)模块的使用

##### 1.打开  显示  保存图片

png格式的图片保存为jpg格式时会报错是因为PNG和JPG的通道数不同

PNG:RGBA

JPG:RGB

所以，PNG格式图片要保存成JPG格式就要丢弃A通道

```python
from PIL import Image

image = Image.open('0.jpg')
#打开这张图片
image.show()
## 显示这张图片
image.save('1.jpg')
#保持打开的图片
print(image.mode, image.size, image.format)
## RGB (1920, 1080) JPEG
## mode代表图片的属性，RGB代表彩色图像，L代表光照图像即灰度图像等
## size属性为图片的大小（长度，宽度）
## format属性为图片的格式
```

##### 2.转换图片模式

任何支持的图片模式都可以直接转为彩色模式或者灰度模式，但是，若是想转化为其他模式，

则需要借助一个中间模式（通常是彩色）来进行过转

```python
from PIL import Image

image = Image.open('0.jpg')
## image.show()
grey_image=image.convert('L')
grey_image.show()
grey_image.save('grey.jpg')
```

##### 3.通道的分离合并

彩色图像可以分离出 R、G、B 通道，但若是灰度图像，则返回灰度图像本身。

然后，可以将 R、G、B 通道按照一定的顺序再合并成彩色图像。

```python
from PIL import Image

image = Image.open('0.jpg')
r,g,b = image.split()
im = Image.merge('RGB',(b,g,r))
print(im)
```

##### 4.图片的裁剪、缩放、旋转和镜像

```python
from PIL import Image

img = Image.open('0.jpg')
## 获取图像尺寸
w,h = img.size
## 缩放50%
img.thumbnail((w//2,h//2))
img.show()
## 水平翻转图片
img1 = img.transpose(Image.FLIP_LEFT_RIGHT)
## 保存图片
img1.show()
img1.save('1.png')
#垂直翻转图片
img2 = img.rotate(180)
img2.show()
#水平+垂直翻转图片
img3 = img.transpose(Image.FLIP_LEFT_RIGHT).rotate(180)
img3.show()
#裁剪图片
#图片裁剪用到的方法是image.crop()，这个方法能从图像中提取出某个矩形大小的图像。它接收一个四元素的元组作为参数，各元素为（left, upper, right, lower），坐标系统的原点（0, 0）是左上角。
print(img.size)
imgcut = img.crop((100,200,500,600))
imgcut.show()
```

transpose有这么几种模式：

- FLIP_LEFT_RIGHT：左右镜像
- FLIP_TOP_BOTTOM：上下镜像
- ROTATE_90：逆时针转90度
- ROTATE_180：逆时针转180度
- ROTATE_270：逆时针转270度
- TRANSPOSE：像素矩阵转置
- TRANSVERSE：对角线对转

##### 5.给图片添加文字

```python
from PIL import Image,ImageDraw,ImageFont

img = Image.open('0.jpg')
## 调用画图模块
draw = ImageDraw.Draw(img)
## 设置字体
tfont = ImageFont.truetype("arial.ttf",24)
## 添加文字
"""
    参数一：文字在图片的位置：(x, y)
    参数二：文字内容
    参数三：字体颜色，当然颜色也可以用RGB值指定
    参数四：字体类型
"""
draw.text((50,30),"eyes++",fill="red",font=tfont)
## 保存图片
img.save("addword.png")
img.show()
```

##### 6.PIL滤镜功能

```python
from PIL import Image,ImageFilter

img = Image.open('0.jpg')
img = img.filter(ImageFilter.CONTOUR)
img.save('filter.png')
img.show()
```

滤镜类型如下：

```
mageFilter.BLUR			模糊滤镜
mageFilter.CONTOUR			轮廓
mageFilter.EDGE_ENHANCE			边界加强
mageFilter.EDGE_ENHANCE_MORE			边界加强（阀值更大）
mageFilter.EMBOSS			浮雕滤镜
mageFilter.FIND_EDGES			边界滤镜
mageFilter.SMOOTH			平滑滤镜
mageFilter.SMOOTH MORE			平滑滤镜（阀值更大）
mageFilter.SHARPEN			锐化滤镜
ImageFilter.DETAIL			细节滤镜
```

##### 7.图片的拼接

```python
from PIL import Image

img1 = Image.open('0.jpg')
img2 = Image.open('1.jpg')
#先查看图片尺寸
print(img1.size)
print(img2.size)
## 新建空白图片,三个参数分别是模式(RGB/RGBA) 大小 颜色
newimg = Image.new(mode="RGB",size=(3840,2160),color=(255,100,50))
## 拼接图片 第一个参数是图片 第二个参数是图片的位置
newimg.paste(img1,(0,0))
newimg.paste(img1,(1920,0))
newimg.show()
```

将小图片合成为大图片(二维码)

```python
from PIL import Image
import os

IMAGES_PATH = 'signal1\\'  ## 图片集（文件夹）地址
IMAGES_FORMAT = ['.png', '.PNG']  ## 图片格式
IMAGE_WIDTH = 100  ## 每张小图片的宽
IMAGE_HEIGHT = 100  ## 每张小图片的高
IMAGE_ROW = 25  ## 大图片一共有几行
IMAGE_COLUMN = 25  ## 大图片一共有几列
## IMAGE_SAVE_PATH = 'final.jpg'  ## 图片转换后的地址

newimg = Image.new('RGB',(IMAGE_COLUMN * IMAGE_HEIGHT, IMAGE_ROW * IMAGE_WIDTH))
## 新建一个2500x2500的图像
for y in range(25):
    for x in range(25):
        timg = Image.open(IMAGES_PATH + str(y*IMAGE_COLUMN + x) + '.png')
        ## 打开文件夹中的图片
        newimg.paste(timg, (x*IMAGE_WIDTH, y*IMAGE_HEIGHT))
        ## 将打开的图片粘贴到newimg的指定位置
newimg.save('new.png')
## 将图片保存new.png
```

##### 8.二进制数据转图片
```python
def bin2img(bin_data):
    imgname = "tmp.png"
    pixels = []
    img = Image.new("RGB",(50,50))
    for item in bin_data:
        if item =='0':
            pixels.append((0,0,0))
        else :
            pixels.append((255,255,255))
    img.putdata(pixels)
    # img.show()
    img = img.resize((500,500)) 
    # 这里调整一下图片的大小，便于后面pyzbar的识别
    img.save(imgname)
    return imgname
```

##### 比赛中使用的例子
例题1-2024浙江省赛初赛-EZtraffic(100张图片按照顺序合并)
```python
def merge_img():
    cols = 10
    rows = 10
    img_list = []
    new_img = Image.new("RGB",(500,500))
    
    for i in range(1,101):
        img = Image.open(f"./final_out/{i}.png")
        img_list.append(img)
        
    for y in range(rows):
        for x in range(cols):
            idx = y * cols + x
            img = img_list[idx]
            x_offset = x * 50
            y_offset = y * 50
            new_img.paste(img,(x_offset,y_offset))
            
    # new_img.show()
    new_img.save("flag.png")
```

例题2-2023SICTF-color
```python
import itertools
from PIL import Image

num = [0, 128, 255]
lis = list(itertools.product(num, repeat=3))
img = Image.open("./save.png")

# 创建一张灰度图，并设置图像的初始颜色为255（白色）
new_img = Image.new("L", size=(img.width, img.height), color=255)
# 创建一个 RGB 模式的图像
# new_img = Image.new("RGB", size=(img.width, img.height), color=(255, 255, 255))

for y in range(img.height):
    for x in range(img.width):
        if img.getpixel((x, y)) in lis:
            new_img.putpixel((x, y), value=0)
            # 设置像素值为 (0, 0, 0)（黑色）
            # new_img.putpixel((x, y), (0, 0, 0))
            
new_img.show()
```

例题3-2023楚慧杯-gb2312-80(元组转图片)

```python
def draw2pic2():
    with open("hint.txt","r") as f:
        data = f.read()
    row_list = data.split()
    for idx,row in enumerate(row_list):
        # print(row)
        pixel_data = []
        img = Image.new(mode="RGB",size=(16,16))
        for bin_data in row:                
            if bin_data != '0':
                pixel_data.append((255,255,255))
            else:
                pixel_data.append((0,0,0))
        img.putdata(pixel_data)
        img = img.resize((250,250)) # 调整一下图片大小，便于查看
        # img.show()
        img.save(f"./out1/{idx}.png") 
```

#### pyzipper模块的使用

##### 比赛中的使用记录

例题1-2024HITCTF邀请赛-BOMB
```python
import os
import pyzipper


def extract_zip(zip_file,passwd):
    if not os.path.exists('./tmp'):
        os.mkdir('./tmp')
    with pyzipper.ZipFile(zip_file,"r") as zip_ref:
        for zipinfo in zip_ref.filelist:
            if '.txt' not in zipinfo.filename:
                zip_ref.extract(zipinfo,'./tmp',pwd=passwd.encode())
            else:
                # 提取压缩包中特定压缩大小的文件
                if zipinfo.compress_size > 17:
                    zip_ref.extract(zipinfo,'./tmp',pwd=passwd.encode())
    with open("./tmp/Password.txt","r") as f:
        passwd = f.read()
    os.remove(zip_file)
    os.system("mv ./tmp/*.zip .")
    return passwd

if __name__ == "__main__":
    zip_file = "nextlevel.zip"
    passwd = "Ll3zHsArHF"
    cnt = 1
    while True:
        print(f"[+] 第{cnt}层的密码是：{passwd}")
        passwd = extract_zip(zip_file,passwd)
        cnt += 1
```


#### pyzbar模块的使用

##### 识别二维码
```python
from pyzbar.pyzbar import decode

def read_qrcode(imgname):
    img = Image.open(imgname)
    img = img.resize((500,500)) 
    # 这里调整一下图片的大小，便于二维码的识别
    decode_data = decode(img)
    # print(decode_data)
    res = decode_data[0].data.decode()
    os.remove(imgname)
    return res
```

#### subprocess模块的使用

##### subprocess.run() 函数的基本用法：

> `subprocess.run()` 用来启动一个子进程，并等待该进程执行完毕。它的返回值是一个 `CompletedProcess` 对象，包含了子进程的返回码、标准输出、标准错误等信息。

函数签名：
```python
subprocess.run(args, *, stdin=None, stdout=None, stderr=None, input=None, capture_output=False, timeout=None, check=False, shell=False, cwd=None, env=None, universal_newlines=False, text=None, encoding=None, errors=None, bufsize=-1, pass_fds=(), preexec_fn=None, close_fds=True, shell=True)
```

常见参数：
```
args：表示命令和参数，通常是一个字符串（如果shell=True）或一个列表（如果shell=False）。
stdout：指定标准输出的流，通常是一个文件对象或subprocess.PIPE（捕获输出）。
stderr：指定标准错误的流，通常是一个文件对象或subprocess.PIPE（捕获错误输出）。
shell：如果是True，命令会通过shell执行，可以使用shell特性（如管道、重定向等）。
capture_output：如果是True，会捕获标准输出和标准错误的内容。可以用来替代stdout=subprocess.PIPE和stderr=subprocess.PIPE。
check：如果是True，当命令返回非零退出码时会抛出subprocess.CalledProcessError异常。
```

返回值：

subprocess.run()会返回一个CompletedProcess对象，其中包含以下信息：
```
args：传入的命令和参数。
returncode：子进程的退出码。
stdout：标准输出（如果使用了capture_output=True）。
stderr：标准错误输出（如果使用了capture_output=True）。
```

举例：

1、简单的命令执行

```python
import subprocess

# 执行命令，返回结果并打印
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print("命令输出：", result.stdout)
print("返回码：", result.returncode)
```

这个例子中，`subprocess.run()` 执行了 `ls -l` 命令，捕获了命令的标准输出，并打印出来。如果命令执行成功，返回码 `returncode` 会是 0。

2、使用 `shell=True` 执行复杂的命令

```python
import subprocess

# 使用shell执行命令，允许使用管道
result = subprocess.run("echo 'Hello World' | grep 'Hello'", shell=True, capture_output=True, text=True)
print("命令输出：", result.stdout)
print("返回码：", result.returncode)
```

这里使用了 `shell=True`，可以在命令中使用管道（`|`）。命令 `echo 'Hello World' | grep 'Hello'` 会输出 `Hello World`，因为 `grep 'Hello'` 会过滤出包含 "Hello" 的行。

3、捕获标准错误

```python
import subprocess

# 运行一个不存在的命令
result = subprocess.run(["nonexistent_command"], capture_output=True, text=True)

# 打印标准错误
print("标准错误：", result.stderr)
```

在这个例子中，我们尝试执行一个不存在的命令。`subprocess.run()` 会捕获标准错误，并将其存储在 `stderr` 中。可以通过 `result.stderr` 打印出来。

4、检查命令是否成功执行（`check=True`）

```python
import subprocess

# 运行一个可能失败的命令，使用 check=True
try:
    result = subprocess.run(["ls", "non_existent_directory"], check=True, capture_output=True, text=True)
except subprocess.CalledProcessError as e:
    print(f"命令失败！返回码：{e.returncode}")
    print(f"标准错误：{e.stderr}")
```

在这个例子中，命令 `ls non_existent_directory` 会失败（因为目录不存在）。设置 `check=True` 后，`subprocess.run()` 会在命令返回非零退出码时抛出 `CalledProcessError` 异常。

5、设置超时（`timeout`）

```python
import subprocess

# 设置超时，如果命令运行超过5秒，会抛出 TimeoutExpired 异常
try:
    result = subprocess.run(["sleep", "10"], timeout=5)
except subprocess.TimeoutExpired as e:
    print(f"命令超时！命令：{e.cmd}")
```

在这个例子中，`sleep 10` 会执行 10 秒，但因为设置了 `timeout=5`，它会在 5 秒后超时并抛出 `TimeoutExpired` 异常。

6、与输入交互（`input` 参数）

```python
import subprocess

# 向命令传递输入数据
result = subprocess.run(["grep", "Hello"], input="Hello World\nHello Python", capture_output=True, text=True)

print("命令输出：", result.stdout)
```

这个例子中，我们通过 `input="Hello World\nHello Python"` 向 `grep` 命令传递了输入数据，`grep` 会搜索包含 "Hello" 的行并输出。

##### 使用subprocess运行tshark处理流量包

```python
tshark_path = r"D:\MD\CTF\Tools\Misc\Wireshark\tshark.exe"
output = ""
command = [
	tshark_path,  # 使用完整的 tshark 路径
	'-r', file_path,  # 读取指定的 pcapng 文件
	'-Y', 'http',  # 过滤出 HTTP 数据包
	'-T', 'json',  # 输出为 JSON 格式
	'-e', 'http.request.method',  # 请求方法
	'-e', 'http.host',  # 请求主机
	'-e', 'http.request.uri',  # 请求 URI
	'-e', 'http.user_agent',  # 用户代理
	'-e', 'http.file_data',  # 请求中的文件数据（POST 请求的内容）
	'-e', 'http.response.code',  # 响应代码
	'-e', 'http.response.phrase',  # 响应短语
	'-e', 'http.content_type'  # 响应内容类型
]
	result = subprocess.run(
		command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
	json_output = json.loads(result.stdout)
	# print(json.dumps(json_output, indent=4))  # 这个输出是用来调试的，可以移除
	
	# 遍历 JSON 数据并提取字段
	for packet in json_output:
		layers = packet.get('_source', {}).get('layers', {})
		# 提取请求方法、主机、URI等字段
		request_method = layers.get('http.request.method', ['None'])[0]
		request_host = layers.get('http.host', ['None'])[0]
		request_uri = layers.get('http.request.uri', ['None'])[0]
		user_agent = layers.get('http.user_agent', ['None'])[0]
		file_data = layers.get('http.file_data', ['None'])[0]
		response_code = layers.get('http.response.code', ['None'])[0]
		response_phrase = layers.get('http.response.phrase', ['None'])[0]
		content_type = layers.get('http.content_type', ['None'])[0]
```

#### CSV模块的使用

```python
## -*- encoding: gbk -*-
import os
import csv

with open("xiaoshuaib.csv", mode="w", encoding="gbk") as csv_file:
    fieldnames = ["你是谁", "你几岁", "你多高"]
    writer = csv.DictWriter(csv_file, fieldnames)

    writer.writeheader()
    writer.writerow({"你是谁": "小帅b", "你几岁": "18岁", "你多高": "18cm"})
    writer.writerow({"你是谁": "小帅c", "你几岁": "19岁", "你多高": "17cm"})
    writer.writerow({"你是谁": "小帅d", "你几岁": "20岁", "你多高": "16cm"})
```

##### 比赛中使用的例子

例1-2024浙江省赛初赛-ds-encode

```python
import csv

data_list = []
res_list = []

# 读取csv文件
with open("data.csv", "r", encoding='utf-8') as f:
    reader = csv.reader(f) # 创建 CSV 读取器
    for row in reader:
        data_list.append(row)


data_list[0].remove(data_list[0][6])
res_list.append(data_list[0])

for line in data_list[1:]:
    basedecode(line)
    line[1] = username_solve(line[1])
    line[2] = password_solve(line[2])
    line[3] = name_solve(line[3])
    line[4] = id_solve(line[4])
    line[5] = phone_solve(line[5])
    line.remove(line[6])
    res_list.append(line)

# 保存列表到csv文件
with open('data1.csv',"w",newline='',encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(res_list)
```
#### pandas模块的使用

```python
## -*- encoding: gbk -*-
import os
import pandas

xiaoshuaib = pandas.read_csv("xiaoshuaib.csv", encoding="gbk")
print(xiaoshuaib)
```

```python
import pandas as pd

b = ["xiaoshuaib", "xiaoshuaic", "xiaoshuaid"]
c = ["18", "19", "20"]
d = ["18", "17", "16"]

df = pd.DataFrame({"你是谁": b, "你几岁": c, "你多高": d})
df.to_csv("xsb.csv", index=False, sep=",")
```

```python
#这个代码有点问题
import pandas as pd

obj = pd.Series([40, 12, -3, 25])
## print(obj)
## print(obj[0])
## print(obj.index)
## print(obj.values)
obj1 = pd.Series([40, 12, -3, 25], index=["a", "b", "c", "d"])
## print(obj1)
## print(obj1["c"])
## print(obj1[obj1 > 15])
## a    40
## d    25
## abcd是索引，25、40是值，这里打印的是值大于15的obj中的元素
## print(obj.describe())  ## 查看obj中的count、mean、std、min、max、25%、50%、75%
dic = obj.to_dict()  ## Series可以转换为字典
## print(dic)
d = {
    "one": pd.Series(
        [
            1.0,
            2.0,
            3.0,
        ],
        index=[
            "a",
            "b",
            "c",
        ],
    ),
    "two": pd.Series([1.0, 2.0, 3.0, 4.0], index=["a", "b", "c", "d"]),
}
df = pd.DataFrame(d)
print(df)
## 当由多个Series组成DataFrame时，Pandas会自动按照index对齐数据，如果某个Series的index缺失，则Pandas会将其自动填写为np.nan
```

#### numpy库模块的使用

```python
import numpy as np
import numpy.random as npr
import matplotlib.pyplot as plt

data = [1, 2, 3, 4]
arr = np.array(data)
## 创建一个一维数组
## print(arr)
## print(arr.dtype)
data1 = [data, data]
arr1 = np.array(data1)
## 创建一个二维数组
## print(arr1)


arr2 = np.zeros((3, 3))
## 创建3x3的全0的数组
## print(arr2)
arr3 = np.ones((3, 3))
## print(arr3)
arr4 = np.arange(1, 10, 2)
## 创建1-10且差为2的等差数列
## print(arr4)
arr5 = np.linspace(1, 10, 4)
## 创建1~10且长度为4的等差数列
## print(arr5)

arr6 = np.array(["量", "话"])
## print(arr6.dtype)  ## <U1 是unicode数据类型
arr1_1 = arr1.astype(np.unicode_)
## 不同的数据类型之间也能互相转换
## print(arr1_1)
arr7 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
## print(arr7)
## print(arr7[1])
## print(arr7[1][1])
## print(arr7[:2])
## print(arr7[:2, :2])
arr7[:2, :2] = 10


## print(arr7)
## print(arr7 * arr7)
## print(arr7.sum())
## print(arr7.std())
## print(arr7.mean())
def f(x):
    return x**2


## print(f(arr7))
print(npr.rand(3, 2))  ## npr.rand函数可以用来生成[0，1）的随机多维数组
print(npr.rand(3, 2) * 2 + 2)  ## 随机区间转化为[2，4）
```

```python
import numpy.random as npr
import matplotlib.pyplot as plt

size = 1000
rn1 = npr.rand(size, 2)
rn2 = npr.randn(size)
rn3 = npr.randint(0, 10, size)
ranq = [0, 10, 20, 30, 40]
rn4 = npr.choice(ranq, size=size)

fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(nrows=2, ncols=2, figsize=(10, 10))
ax1.hist(rn1, bins=25, stacked=True)
ax1.set_title("rard")
ax1.set_ylabel("frequency")
ax1.grid(True)
ax2.hist(rn2, bins=25)
ax2.set_title("rardn")
ax2.grid(True)
ax3.hist(rn3, bins=25)
ax3.set_title("rardint")
ax3.set_ylabel("frequency")
ax3.grid(True)
ax4.hist(rn4, bins=25)
ax4.set_title("choice")
ax4.grid(True)
plt.show()
```

```python
#np.concatenate()的用法
import numpy as np

a = np.array([1, 2, 3])
b = np.array([11, 22, 33])
c = np.array([44, 55, 66])
print(np.concatenate((a, b, c), axis=0))
## 默认情况下，axis=0可以不写
## 对于一维数组拼接，axis的值不影响最后的结果
## [ 1  2  3 11 22 33 44 55 66]

a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([[11, 21, 31], [7, 8, 9]])
## print(np.concatenate((a, b), axis=0))
## [[ 1  2  3]
##  [ 4  5  6]
##  [11 21 31]
##  [ 7  8  9]]
print(np.concatenate((a, b), axis=1))
## axis=1表示对应行的数组进行拼接
## [[ 1  2  3 11 21 31]
##  [ 4  5  6  7  8  9]]
```

##### 使用numpy处理图像

根据RGB值爆破宽高并还原图像
```python
import numpy as np
import math
from PIL import Image

with open('basic.txt', 'r') as file:
    lines = file.readlines()

# 将每行数据转换为元组，并存储在列表中
data = [eval(line.strip()) for line in lines]

# 将列表转换为NumPy数组，形状为 (N, 3)
data = np.array(data, dtype=np.uint8)

data_length = len(data)
sqrt_length = int(math.sqrt(data_length))
for i in range(sqrt_length, 0, -1):
    if data_length % i == 0:  # 如果长度可以整除
        rows = i
        cols = data_length // i
        print(f"尝试重塑为 {rows} 行, {cols} 列")
        try:
            reshaped_data = data.reshape(rows, cols, 3)
            image = Image.fromarray(reshaped_data, 'RGB')
            image.save(f"{rows}x{cols}.png")
        except Exception as e:
            print(f"无法重塑为 {rows} 行, {cols} 列: {e}")
```

#### cv2模块的使用

##### 比赛中的使用记录

读取视频中每一帧第一行前225个像素的红色通道LSB数据

```python
def extract_flag(video_path):
    # 使用cv2读取视频
    cap = cv2.VideoCapture(video_path)
    # frame_width = cap.get(3)
    # frame_height = cap.get(4)
    # print(frame_width,frame_height)# 224,224
    res = ""
    frames_cnt = 1
    while True: 
        # 读取视频的下一帧，并返回布尔值和当前帧的图像数据
        ret, frame = cap.read()
        # print(frame[0][0][0])
        if(frames_cnt == 5):# 经过尝试发现flag就藏在每个视频的第 5 帧中
            # 自动计算行数，待转换的列数为3，并取出前225个像素R通道的值
            pixels = frame.reshape((-1,3))[:224][:,0]
            for i in range(len(pixels)):
                if pixels[i] > 200:
                    pixels[i] = 1
                else:
                    pixels[i] = 0
            res = decode_pixel(pixels)
            break
        frames_cnt += 1
    return res

```

读取视频黑白帧转二进制

```python
import cv2
import libnum


cap = cv2.VideoCapture('s4cret.mov')
frame_count = 0
res = ''

while True:
    ret, frame = cap.read()
    if not ret:
        break
    pixel = frame.reshape((-1,3)) # 将像素化为3列n行的格式
    r = pixel[0][0] # 获取第一个像素r通道的数值
    if r > 200:
        res += '0'
    else:
        res += '1'
cap.release()

# print(libnum.b2s(res))
lenth = len(res) # 259
res += (8 - (lenth % 8)) * '0'
print(libnum.b2s(res))
# b'the flag3 is -13891ba324da}\xff\xff\xff\xff\xff\xe0'
```

#### urllib模块
URL编码和解码
```python
import urllib.parse

encoded_text = urllib.parse.quote(text)
decoded_str = urllib.parse.unquote(encoded_str)
```

#### urllib3模块
使用 urllib3 模块禁用 SSL 警告
```python
import requests
import urllib3

# 禁用 SSL 警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

response = requests.get('https://example.com', verify=False)
print(response.text)

```

#### wave模块

TODO...

#### librosa模块

##### 比赛中的使用记录

例题1-2024极客大挑战-音乐大师

```python
import librosa
import libnum

res = []
flag = ""
table = {'19':"01","9":"00","39":"11","29":"10"}
# 使用文件原始采样率获取音频数据和采样率
data1,sr1 = librosa.load("secret.wav",sr=None,dtype="float32")
data2,sr2 = librosa.load("1.wav",sr=None,dtype="float32")

for i in range(148):
    res.append(str(int((data1[i]-data2[i])*1e7)))

for item in res:
    flag += table[item]

print(libnum.b2s(flag))
# b'SYC{wav_LSB_but_You_can_get_M3_Coll!}'
```

#### scipy模块的使用

TODO...


#### turtle模块的使用

```python
## 画太极图
from turtle import *


def rset():
    pensize(1)  ## 设置画笔大小为1px
    pencolor('black')  ## 设置画笔颜色为黑色
    penup()  ## 提起画笔
    home()  ## 将画笔移动到屏幕中心
    pendown()  ## 放下画笔


def offset(off_set, angle=0, mode='taiji'):
    ## 设置画笔偏移量。该函数用于设置画笔开始绘图的位置。
    ## off_set太极时为大圆半径，八卦时要大于半径，否则会与太极重合。
    ## angle：当画八卦时用于旋转特定角度。
    penup()
    home()  ## 回到原点，朝向东
    if mode == 'taiji':  ## 太极模式
        right(90)  ## 向右旋转90度，使画笔指向南方。
        fd(off_set)
        seth(0)  ## 朝向东
    pendown()


## 绘制太极函数
## radius：太极的大圆半径。
## pen_size：画笔大小，默认为2像素。
## color：画笔颜色，默认为黑色。
def taiji(radius, pen_size=2, color='black'):
    rset()  ## 初始化画笔
    pensize(pen_size)
    pencolor(color)
    offset(radius)  ## 画笔偏移至起始点
    fillcolor('black')  ## 填充颜色
    begin_fill()  ## 开始填充
    circle(radius, 180)  ## 画大圆的半圆
    circle(radius / 2, 180)  ## 画s型
    circle(-radius / 2, 180)  ## 反向画s型
    end_fill()  ## 结束填充
    circle(-radius, 180)  ## 画大圆的另一半圆，且不用填充
    ## 上面小圆
    begin_fill()
    fillcolor('white')
    penup()
    home()  ## 返回原点，默认朝东
    left(90)
    fd(radius * 0.7)  ## 初始化小圆画笔起始点
    right(90)
    pendown()
    circle(-radius * 0.2)  ## 画小圆
    end_fill()
    rset()
    penup()
    ## 下面的小圆
    begin_fill()
    fillcolor('black')
    right(90)
    fd(radius * 0.7)
    left(90)
    pendown()
    circle(radius * 0.2)
    end_fill()


taiji(200)
done()
```

```python
## 画奥运五环
from turtle import *


def draw_ring(radius, ring_color):
    pensize(5)          ## 设置线宽，使五环更显眼
    pendown()
    pencolor(ring_color)  ## 设置画笔颜色
    circle(radius)
    penup()


def draw_olympic_rings():
    speed(10)
    penup()

    ## 修改环的颜色
    colors = ["blue", "black", "red", "yellow", "green"]
    ## 上面三个环的间距是2*70，下面两个环相对于上面的环稍微向右移动了35
    positions = [(-3*35, 0), (-1*35, 0), (1*35, 0),
                 (-2*35, -60), (0, -60)]

    for i in range(5):
        goto(positions[i])  ## 使用预设的位置
        draw_ring(50, colors[i])


if __name__ == "__main__":
    draw_olympic_rings()
    done()
```



#### struct模块的使用

```python
import struct

def display_binary(data):
    #将字节数据转化为十六进制表示形式
    ## return ' '.join(['{:02x}'.format(byte) for byte in data])
    return ' '.join([f"{byte:02x}" for byte in data])

## 定义要打包的数据
int_data = 10240099
float_data = 123.456

## 使用默认端序（小端序）打包
packed_int_little = struct.pack('I', int_data)
packed_float_little = struct.pack('f', float_data)

## 使用大端序打包
packed_int_big = struct.pack('>I', int_data)
packed_float_big = struct.pack('>f', float_data)

## 打印打包的结果,display_binary()是以十六进制的形式显示
print("Packed data (Little Endian):")
print(packed_int_little)
print("Int:", display_binary(packed_int_little))
print(packed_float_little)
print("Float:", display_binary(packed_float_little))

print("\nPacked data (Big Endian):")
print(packed_int_big)
print("Int:", display_binary(packed_int_big))
print(packed_float_big)
print("Float:", display_binary(packed_float_big))

## 解包数据,由于返回的是一个元组，所以需要[0]
unpacked_int_little = struct.unpack('I', packed_int_little)[0]
unpacked_float_little = struct.unpack('f', packed_float_little)[0]

unpacked_int_big = struct.unpack('>I', packed_int_big)[0]
unpacked_float_big = struct.unpack('>f', packed_float_big)[0]

## 打印解包的结果
print("\nUnpacked data (Little Endian):")
print("Int:", unpacked_int_little)
print("Float:", unpacked_float_little)

print("\nUnpacked data (Big Endian):")
print("Int:", unpacked_int_big)
print("Float:", unpacked_float_big)

## 验证打包和解包是否保持数据的完整性(float类型的数据先打包再解包后可能会有误差)
assert int_data == unpacked_int_little
## assert float_data == unpacked_float_little

assert int_data == unpacked_int_big
## assert float_data == unpacked_float_big

print("\nData integrity maintained!")
```

#### time模块的使用

```python
## -*- encoding: utf-8 -*-
'''
@File    :   time.py
@Time    :   2022/11/14 17:55:10
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
'''
import os
import time
## 通常来说，时间戳表示的是从1970年1月1日00:00:00开始按秒计算的偏移量。

print(time.time())
## 返回当前时间的时间戳,是一个浮点数
print(time.localtime())
## 将一个时间戳转换为当前时区的struct_time。secs参数未提供，则以当前时间为准
print(time.gmtime())
## gmtime()方法是将一个时间戳转换为UTC时区（0时区）的struct_time
print(time.mktime(time.localtime()))
#time.mktime()接收struct_time对象转化用秒数来表示时间的浮点数
time.sleep(1)
## 线程推迟指定的时间运行。单位为秒
## time.clock()
## time.clock()在不同的系统上含义不同。在UNIX系统上，它返回的是“进程时间”，它是用秒表示的浮点数（时间戳）。而在WINDOWS中，第一次调用，返回的是进程运行的实际时间。而第二次之后的调用是自第一次调用以后到现在的运行时间。（实际上是以WIN32上QueryPerformanceCounter()为基础，它比毫秒表示更为精确）

print(time.asctime())
#把一个表示时间的元组或者struct_time表示为这种形式：'Sun Jun 20 23:21:05 1993'
print(time.ctime())
## 把一个时间戳（按秒计算的浮点数）转化为time.asctime()的形式

## time.strptime(string[, format])：把一个格式化时间字符串转化为struct_time。实际上它和strftime()是逆操作
print(time.strptime('2011-05-05 16:37:06', '%Y-%m-%d %X'))
```

#### datetime模块的使用

```python
import datetime

today_date = datetime.date.today()
## 今天的日期
print(today_date)
print(datetime.datetime(2012, 1, 1))
start_time = datetime.datetime(2012, 1, 1)
print(start_time + datetime.timedelta(0))
## datetime.timedelta()常用于日期的加减
print(start_time + datetime.timedelta(-1))
print(start_time.strftime("%Y-%m-%d"))
## .strftime()用于日期格式的转换
print(start_time.strftime("%Y%m%d"))
```

#### Urllib模块使用

```python
from urllib import request, parse
import ssl

import requests

## 使用ssl未经验证的上下文
context = ssl._create_unverified_context()
url = 'https://biihu.cc//account/ajax/login_process/'
headers = {
    ## 假装自己是浏览器
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 '
                  'Safari/537.36',
}
dict = {
    ## 定义请求参数
    'return_url': 'https://biihu.cc/',
    'user_name': 'xiaoshuaib@gmail.com',
    'password': '123456789',
    '_post_type': 'ajax',
}
## 把请求参数转化为byte
data = bytes(parse.urlencode(dict), 'utf-8')
## response = urllib.request.urlopen('http://www.baidu.com')
## 封装request
req = requests.Request(url,data=data,headers=headers,method='POST')
#最后进行请求
response = request.urlopen(req,context=context)
print(response.read().decode('utf-8'))
"""urllib.request.urlopen(url, data=None, [timeout, ]*)
data是给post请求携带参数的，timeout是设置请求超时时间"""
## print(response.read().decode('utf-8'))
"""urllib.request.Request(url, data=None, headers={}, method=None)
## urlopen 默认是 Get 请求，当我们传入参数它就为 Post 请求了
## 而 Request 可以让我们自己定义请求的方式"""
```

#### requests模块的使用

##### 使用python脚本发送HTTP请求

**requests支持的请求协议有GET POST PUT...**

```python
#GET请求带参数使用params，POST请求带参数使用data
import requests
rep=requests.get("http://111.200.241.244:62607")
rep=requests.post("http://111.200.241.244:62607",params={"a":"1"},data={"b":"2"})
#获得响应包中的数据
print(rep.text)
#以byte类型返回响应包中的数据
print(rep.content)
#将byte类型的数据转换为字符串
print(rep.content.decode)
#获取HTTP状态码
print(rep.status_code)
#获取请求头和响应头
print(rep.headers)#获取请求头
print(rep.request.headers)#获取响应头
#获取请求url
print(r.url)
#获取Cookie
print(r.cookies)
```

```python
#没有参数传递的GET请求
import requests
url = "https://www.baidu.com"
r = requests.get(url=url)
print(r.url)
print(r.status_code)

#有参数传递的GET请求
import requests
url = "http://127.0.0.1/index.php"
payload={'username':'admin','password':'admin','submit':'登录'}
r = requests.get(url,params=payload)
result = r.content
if str(result).find('succ'):
    #在返回报文中找到succ字符时：
    print("admin:admin"+'successful')
#但是实际情况下，一般都是通过读取字典文件来获取用户名和密码
 
#有参数传递的POST请求
import requests
url = "http://127.0.0.1/index.php"
data = {'username':'admin', 'password':'admin', 'submit':'登录'}
r = requests.post(url, data=data)
print(r.status_code)
if r.text.find('succ'):
    print('admin:admin' + 'successful')
 
#自定义请求头
import requests
url = "http://127.0.0.1/index.php"
headers = {"User-Agent":"HAHA"}
r1 = requests.get(url)
print(r1.request.headers)
r = requests.get(url, headers=headers)
print(r.request.headers)

#HTTP代理和BP截断
import requests
url = "https://www.baidu.com"
#kali的ip:192.168.1.101
proxies = {'http':'http://192.168.100.9:8080', 'https':'https://192.168.100.9:8080'}
r = requests.get(url, proxies=proxies, verify=False)
#verify=False不进行证书合法性的验证
print(r.status_code)  
 
#Python IIS PUT漏洞探测工具
import requests
url = "http://192.168.0.107"
r = requests.options(url)
## print(r.headers)       
## print(r.headers["Allow"])
## print(r.headers["Public"])
result = r.headers['Public']
## print(type(result))
if result.find("PUT") and result.find("MOVE"):
    print(result)
    print("exist IIS put vul")
else:
    print("not exist")
 
#获取HTTP服务器信息
import requests
url = "http://192.168.0.107"
r = requests.get(url)
print(r.headers)
print("服务器中间件为："+r.headers['Server'])
print("服务器脚本语言为："+r.headers['X-Powered-By'])
 
#Python漏洞检测工具
import requests
url = "http://192.168.0.107"
r = requests.get(url)
## print(r.headers)
## print(r.headers['Server'])
remote_server = r.headers['Server']
print(remote_server)
print(type(remote_server))
if remote_server.find("IIS/7.5") or remote_server("IIS/8.0"):
    payload = {}
    r1 = requests.get(url,headers=headers)
    print(r1.requests.headers)
    print(r1.content)
    if str(r1.content).find("Requested Range Not Satisfiable"):
        print(url+"exist vuln ms15-034")
    else:
        print(url+"not exist vuln ms15-034")
    #开始探测
else:
    print("Server not a iis 7.5 or iis 8.0")
```

##### 使用session发送请求

```python
import requests
from fake_useragent import UserAgent

session = requests.session()
ua = UserAgent()
headers = {
    ## 使用随机的UA头
    'user-agent': ua.random
}
url = "http://www.baidu.com"
response = session.get(url=url,headers=headers)
print(response.status_code)
print(response.text)
```

##### 关闭SSL警告

方法一：使用 verify=False 关闭 SSL 验证
```python
import requests

response = requests.get('https://example.com', verify=False)
print(response.text)

```

方法二：使用urllib3模块禁用 SSL 警告
```python
import requests
import urllib3

# 禁用 SSL 警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

response = requests.get('https://example.com', verify=False)
print(response.text)

```
#### requests-html模块的使用

**基本用法**

```python
from requests_html import HTMLSession
from fake_useragent import UserAgent

random_UA = UserAgent().random
## print(random_UA)
headers = {
    'user-agent': random_UA
}
proxy = '127.0.0.1:7890'
port = proxy.split(':')[1]
proxy = proxy.split(':')[0]
## print(proxy,port)
proxies = {
    "http":f"http://{proxy}:{port}",
    "https":f"http://{proxy}:{port}"
}

if __name__ == "__main__":
    url = "https://www.baidu.com"
    ## 获取实例化session对象
    session = HTMLSession()
    responese = session.get(url=url,headers=headers,proxies=proxies)
    print(responese.status_code)
    ## 获取html页面
    ## html = responese.content.decode()
    ## 使用requests_html中的方法
    html = responese.html.html
    ## print(responese.text)
    ## print(html[:15])
    ## 获取相对链接
    ## print(responese.html.links)
    ## 获取拼接URL后的绝对链接
    ## print(responese.html.absolute_links)
    ## 使用xpath选择器
    ## print(responese.html.xpath('//li[@class="hotsearch-item odd"]/a'))
    ## print(responese.html.xpath('//li[@class="hotsearch-item odd"]/a', first=True).text)
    ## 使用CSS选择器(find方法)
    print(responese.html.find('a.mnav'))
    print(responese.html.find('a.mnav', first=True).text)
```

##### 例子

**爬取简书用户的文章**

```python
from requests_html import HTMLSession
from fake_useragent import UserAgent

random_UA = UserAgent().random
## print(random_UA)
headers = {
    'user-agent': random_UA
}
proxy = '127.0.0.1:7890'
port = proxy.split(':')[1]
proxy = proxy.split(':')[0]
## print(proxy,port)
proxies = {
    "http":f"http://{proxy}:{port}",
    "https":f"http://{proxy}:{port}"
}

if __name__ == "__main__":
    url = "https://www.jianshu.com/u/7753478e1554"
    ## 获取实例化session对象
    session = HTMLSession()
    responese = session.get(url=url,headers=headers,proxies=proxies)
    responese.html.render(scrolldown=50,sleep=.2)
    titles = responese.html.find('a.title')
    for i ,title in enumerate(titles):
        print(f"[+]{i+1}[{title.text}](https://www.jianshu.com/u/7753478e1554{title.attrs['href']})")
```

#### optparse模块的使用

```python
#optparse模块的使用
from email import parser
from email.parser import Parser
import optparse
 
parser = optparse.OptionParser()#初始化
parser.usage = "command_args.py -u user_file"
parser.add_option("-u", "--user_file", help="read username from file", action="store", type="string", metavar="FILE", dest="username_file")
(option, args)=parser.parse_args()
print(options.username_file)

#Web密码破解命令行读取模板编写（username password url threads）
from email import parser
from email.parser import Parser
from yaml import parse
import optparse

parser = optparse.OptionParser()
parser.usage = "web_brute_command.py -s url -u user_file -p -pass_file -t num"
parser.add_option("-s", "--site", dest="website", help="website to test", action="store", type="string", metavar="URL")
parser.add_option("-u", "--userfile", dest="userfile", help="username from file", action="store", type="string", metavar="USERFILE")
parser.add_option("-p", "--passfile", dest="passfile", help="password from file", action="store", type="string", metavar="PASSFILE")
parser.add_option("-t", "--threads", dest="threads", help="number of threads", actions="store", type="int", metavar="THREADS")
(option, args)=parser.parse_args()
print(options.website)
print(options.userfile)
print(options.passfile)
print(options.threads)
```

#### xlwt模块的简单使用

```python
import xlwt

## 1.创建Workbook
wb = xlwt.Workbook(encoding="utf-8")
## 2。创建worksheet
ws = wb.add_sheet("test_sheet")
## 3.写入第一行内容
## ws.write(a,b,c)    a:行 b:列 c:内容
ws.write(0, 0, "球队")
ws.write(0, 1, "号码")
ws.write(0, 2, "姓名")
ws.write(0, 3, "位置")

wb.save("myExcel.xls")
```

```python
import xlwt

data = [
    {"Team": "湖人", "Number": "34", "Name": "奥尼尔", "Positions": "中锋"},
    {"Team": "湖人", "Number": "24", "Name": "科比", "Positions": "后卫"},
    {"Team": "湖人", "Number": "23", "Name": "詹姆斯", "Positions": "前锋"},
]

wb = xlwt.Workbook()
ws = wb.add_sheet("test_sheet")
for i, item in enumerate(data):
    ## enumerate()函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在for 循环当中
    ws.write(i + 1, 0, item["Team"])
    ws.write(i + 1, 1, item["Number"])
    ws.write(i + 1, 2, item["Name"])
    ws.write(i + 1, 3, item["Positions"])

    wb.save("myExcel1.xls")
```

#### xlsxwriter模块的使用

```python
def write2xlsx(data,filename):
    workbook = xw.Workbook(filename)
    worksheet1 = workbook.add_worksheet("sheet1")
    ## 激活子表
    worksheet1.activate()
    title = ['Url','Title']
    worksheet1.write_row('A1',title)
    i=2
    for j in range(len(data)):
        insertdata = [data[j]["url"],data[j]["title"]]
        row = 'A'+str(i)
        worksheet1.write_row(row,insertdata)
        i+=1
    workbook.close()
```

#### json模块的简单使用

```python
import json

jsondata = """
{
"Uin":0,
"UserName":"@c482d142bc698bc3971d9f8c26335c5c",
"NickName":"小帅b",
"HeadImgUrl":"/cgi-bin/mmwebwx-bin/webwxgeticon?seq=500080&username=@c482d142bc698bc3971d9f8c26335c5c&skey=@crypt_b0f5e54e_b80a5e6dffebd14896dc9c72049712bf",
"ContactFlag":3,
"MemberCount":0,
"MemberList":[

],
"RemarkName":"",
"HideInputBarFlag":0,
"Sex":1,
"Signature":"",
"VerifyFlag":0,
"OwnerUin":0,
"PYInitial":"XSB",
"PYQuanPin":"xiaoshuaib",
"RemarkPYInitial":"",
"RemarkPYQuanPin":"",
"StarFriend":0,
"AppAccountFlag":0,
"Statues":0,
"AttrStatus":98491,
"Province":"广东",
"City":"广州",
"Alias":"",
"SnsFlag":48,
"UniFriend":0,
"DisplayName":"",
"ChatRoomId":0,
"KeyWord":"che",
"EncryChatRoomId":"",
"IsOwner":0
}
"""

myfriend = json.loads(jsondata)
## json.load() 和 json.loads() 区别：
## loads() 传的是json字符串，而 load() 传的是文件对象
## 使用 loads() 时需要先读取文件在使用，而 load() 则不用
print(myfriend)
NickName = myfriend.get("NickName")
print(NickName)
```

```python
import json

jsondata = """{
"MemberList":[
{
"UserName":"小帅b",
"sex":"男"
},
{
"UserName":"小帅b的1号女朋友",
"sex":"女"
},
{
"UserName":"小帅b的2号女朋友",
"sex":"女"
}
]
}"""
myfriend = json.loads(jsondata)
## print(myfriend)
memberList = myfriend.get("MemberList")
print(memberList)
```

#### scipy模块的使用

\#经常要导入csv数据

```python
import numpy as np
import scipy.stats as stats
import scipy.optimize as opt

## rv_unif = stats.uniform.rvs(size=10)
## 均匀分布
## print(rv_unif)
## rv_beta = stats.beta.rvs(size=10, a=4, b=2)
## 贝塔分布
## print(rv_beta)
np.random.seed(seed=2015)
## 随机数生成的seed
rv_beta = stats.beta.rvs(size=10, a=4, b=2)
print("method 1:")
print(rv_beta)

np.random.seed(seed=2015)
beta = stats.beta(a=4, b=2)
print("method 2:")
print(beta.rvs(size=10))
```

#### seaborn模块的使用

```

```

#### asyncio模块的学习与使用

##### 协程的概念

在同一线程内，一段执行代码过程中，可以中断并跳转到另一段代码中，接着之前中断的地方继续执行。协程运行状态于多线程类似。

##### 协程的优点

-无需线程上下文切换，避免了无意义的调度，可以提高性能
-无需原子操作锁定及同步开销【避免的资源竞争】
-方便切换控制流，简化编程模型
-高并发+高扩展性+低成本，一个CPU支特上万的协程不是问题，一很适合用于高并发处理

##### 协程缺点：

-无法利用多核资源。协程的本质是单线程，不能同时将单个CPU的多个核用上，协程需要进程配合才能运行在多CPU上。（不过我们日常编程不会有这个问题，除非是CPU密集型应用)
-进行阻塞操作（如IO时)会阻塞掉整个程序

##### 生成器的学习

```python
def func():
    print("这是一个生成器函数...")
    while True:
        ## Cpython遇到yield关键字会暂停，下一次运行的时候会接着上一次运行的位置继续运行
        yield "这是生成器函数返回的数据..."

## 会返回一个对象：生成器对象
obj = func()
print(obj)
## 生成器需要通过next方法进行驱动
## 中断暂停的特点：在运行第一个任务的时候遇到yield暂停并切换到另外一个任务上继续执行
print(next(obj))
print(next(obj))
```

```python
## 利用生成器特性进行任务切换
import time

def func_a():
    while True:
        print("这是func_a函数")
        yield 
        time.sleep(0.5) ## 让程序进行休眠

def func_b(obj):
    while True:
        print("这是func_b函数")
        obj.__next__()

a = func_a()
func_b(a)
```

##### 同步程序与异步程序的区别

```python
## 同步程序
import time
def func(i):
    time.sleep(1)
    print(i)
    
now = lambda:time.time()
start = now()
for i in range(5):
    func(i)
print(f"[+]同步程序所花费的时间为{now()-start}")
```

```python
## 异步程序
import time
import asyncio

now = lambda:time.time()
start = now()
## 创建一个协程函数
async def func(i):
    asyncio.sleep(1) ## 要用asyncio中的sleep
    print(i)    

for i in range(5):
    asyncio.run(func(i))
    
print(f"[+]异步程序所花费的时间为{now()-start}")
```

##### asyncio中的概念

事件循环

```
类似于一个无限死循环的列表，在创建一些协程任务的时候，会将任务放到事件循环中，事件循环会对当前存在的任务进行状态的判断：已完成/未完成。对已完成的任务进行删除，对未完成的任务/等待执行的任务会被事件循环调度。若当前事件循环中的任务已经全部完成，则事件循环列表为空。若事件循环列表为空，则中断循环并退出。
```

```python
## 使用事件循环
import asyncio

## 协程任务1
async def work_1():
    for _ in range(5):
        print("我是协程任务1...")
        await asyncio.sleep(1)
        
## 协程任务1
async def work_2():
    for _ in range(5):
        print("我是协程任务2...")
        await asyncio.sleep(1)
        
## 将当前的协程函数转为协程对象，并把多个协程对象添加到一个列表中
tasks = [
    work_1(),
    work_2()
]

## 创建一个事件循环对象
## loop = asyncio.get_event_loop()
## 使用事件循环调度执行多个协程任务
## loop.run_until_complete(asyncio.wait(tasks))
## print(loop)
"""
1.需要使用asyncio创建事件循环对象
2.使用事件循环对象执行多个协程任务
"""
## 使用python3.7以上版本语法运行多个任务
asyncio.run(asyncio.wait(tasks))
```

协程

```
通过async关键字装饰的程序是一个协程函数。若一个协程函数后存在()，则会返回一个协程对象。
```

```python
## 快速上手.py
"""
协程函数
    使用async关键字定义的函数
协程对象
    协程函数()会返回一个协程对象，可以使用事件循环去调度协程对象
"""
import asyncio
async def work():
    print("运行协程任务...")
    
## print(obj)
## python3.6
## 获取一个事件循环
## loop = asyncio.get_event_loop()
## loop.run_until_complete(work())

## python3.7以上版本
## async def main():
##     tasks = [
##         asyncio.create_task(work())
##     ]
##     await asyncio.wait(tasks)
task = [
    work()
]
#asyncio.run(main())
asyncio.run(asyncio.wait(task))
```

task对象

```
一个协程对象可以原生进行任务的挂起。
task对象就是往事件循环中加入任务用的，用于开发调度协程
task可以用来进行并发调度任务
```

```python
## task对象
import asyncio

async def other():
    print("协程任务启动...")
    await asyncio.sleep(2)
    print("协程任务完成...")
    return "这是当前协程任务的返回值..."

async def main():
    print("正在执行协程任务函数: other...")
    task1 = asyncio.create_task(other())
    #提交任务到事件循环
    task2 = asyncio.create_task(other())
    res_1 = await task1
    res_2 = await task2
    print(f"当前任务的返回值为: {res_1}")
    print(f"当前任务的返回值为: {res_2}")

asyncio.run(main())
```

future对象

```
类似于task对象，task对象其实是future对象的一个子类。
```

async / await关键字

```
async用于定义协程函数，await用于挂起/堵塞协程任务
```

```python
"""
await可以获取到可等待对象的返回值
    当事件循环遇到await关键字之后会调度其他任务
协程对象
future对象
task对象
"""
import asyncio

async def work():
    ## 模拟耗时任务
    await asyncio.sleep(1)
    return "这是一个协程任务"

async def main():
    res = await work()
    ## 如果当前任务是一个耗时任务，则会阻塞当前代码
    print(1)
    print(res)
    
asyncio.run(main())
```

##### 协程嵌套

```python
## 协程嵌套
import asyncio

async def other():
    print("协程任务启动...")
    await asyncio.sleep(2)
    print("协程任务完成...")
    return "这是当前协程任务的返回值..."

async def main():
    print("正在执行协程任务函数: other...")
    ## 当前程序是一个同步任务,await遇到耗时任务会阻塞主程序代码
    res_1 = await other()
    ## await拿到任务返回值后才会解阻塞
    ## await用来等待任务的返回结果的，不是用来进行异步任务并发的
    ## 任务的并发要用到task对象
    res_2 = await other()
    print(f"当前任务的返回值为: {res_1}")
    print(f"当前任务的返回值为: {res_2}")

asyncio.run(main())
```

##### 协程并发

```python
## 协程并发
import asyncio

async def work(x):
    print(f"当前接受的参数为:{x}")
    ## 模拟一个耗时任务
    await asyncio.sleep(x)
    return f"当前任务的返回值为:{x}"

async def main():
    ## 创建十个任务，并将十个任务提交到事件循环
    tasks = [asyncio.create_task(work(i))for i in range(10)]
    ## wait方法获取的返回值是无序的
    ## done,pending = await asyncio.wait(tasks) 
    #asyncio.wait接受的是一个可迭代的对象
    ## done可以拿到task任务的返回值
    ## pending表示当前任务的执行状态
    ## print(done,pending)
    ## for item in done:
        ## print(item.result())
    res = await asyncio.gather(*tasks)
    ## gather函数会对当前列表进行解包
    ## gather用来收集所有已完成任务的返回值，并且获取到的任务的返回值是有顺序的
    print(res)    
    
asyncio.run(main())
```

#### aiohttp模块的使用

```python
import aiohttp ## 导入异步HTTP请求库 aiohttp
import asyncio ## 导入异步编程库 asyncio

url = 'http://www.example.com'
async def fetch(session,url):
    ## 使用session对象发出GET请求
    async with session.get(url) as response:
        ## 返回响应文本
        return await response.text()
async def main():
    ## 创建异步HTTP会话
    async with aiohttp.ClientSession() as session:
        ## 调用fetch函数
        html = await fetch(session,url)
        print(html)

if __name__ == "__main__":
    asyncio.run(main())
```

```python
import aiohttp
import asyncio
import json

async def main():
    async with aiohttp.ClientSession() as session:
        ## 发送get请求
        async with session.get('<https://www.example.com>') as resp:
            print(await resp.text())
        ## 发送post请求
        async with session.post('<https://www.example.com>', json={'key': 'value'}) as resp:
            print(await resp.text())
        ## 发送put请求
        async with session.put('<https://www.example.com>', json={'key': 'value'}) as resp:
            print(await resp.text())
        ## 发送delete请求
        async with session.delete('<https://www.example.com>', json={'key': 'value'}) as resp:
            print(await resp.text())

asyncio.run(main())
```

```python
import aiohttp
import asyncio

urls = [
    "https://images.pexels.com/photos/17743151/pexels-photo-17743151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/17742455/pexels-photo-17742455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/17820682/pexels-photo-17820682.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
]

async def aiodownload(url):
    name = url.split('?')[0].rsplit("/",1)[1]
    #这里rsplit是指从右边开始切一次，取第二个元素
    print(name)
    ## 发送请求
    ## 写了with后，就有了上下文管理器，运行完后会自动关闭session
    async with aiohttp.ClientSession() as session:
        ## 得到图片数据
        async with session.get(url=url) as response:
        ## 保存到文件
            with open(name,mode='wb') as f:
                ## 读取内容是异步的，因此需要await
                f.write(await response.content.read())
    print("[+]任务结束")


async def main():
    tasks = []
    for url in urls:
        tasks.append(aiodownload(url))        
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
```

#### pydocx库的使用

```python
from docx import Document

def GenerateNewWord(filename):
    document = Document()
    document.save(filename)

if __name__ == "__main__":
    newname = "114514.docx"
    GenerateNewWord(newname)
```

#### colorama模块的使用

```python
from colorama import Fore, Back, Style, init

## 初始化colorama
init(autoreset=True)

print(Fore.BLUE + '蓝色文字')
print(Back.BLACK + Fore.LIGHTGREEN_EX+ '黑底绿字')
print(Style.BRIGHT + '这是明亮的文字')

## 由于设置了 autoreset=True，所以每次输出后颜色都会重置，所以下面的文本将会是默认的颜色
print('这是普通文本')
```

#### prettytable模块的使用

```python
from prettytable import PrettyTable
x = PrettyTable(["姓名", "性别", "年龄", "存款"])
x.add_row(["赵一","男", 20, 100000])
x.add_row(["钱二","男", 21, 500])
x.add_row(["孙三", "男", 22, 400.7])
x.add_row(["李四", "男", 23, 619.5])
x.add_row(["周五", "男", 24, 1214.8])
x.add_row(["吴六", "女", 25, 646.9])
x.add_row(["郑七", "女", 26, 869.4])
x.add_row(["王七加一", "男", 21, 869.4])
print(x)
"""
+----------+------+------+--------+
|   姓名   | 性别 | 年龄 |  存款  |
+----------+------+------+--------+
|   赵一   |  男  |  20  | 100000 |
|   钱二   |  男  |  21  |  500   |
|   孙三   |  男  |  22  | 400.7  |
|   李四   |  男  |  23  | 619.5  |
|   周五   |  男  |  24  | 1214.8 |
|   吴六   |  女  |  25  | 646.9  |
|   郑七   |  女  |  26  | 869.4  |
| 王七加一 |  男  |  21  | 869.4  |
+----------+------+------+--------+
"""
```

#### paramiko模块的使用

使用用户名和密码 ssh 连接（执行一个命令就要连接一次）

```python
import paramiko
## 初始化
ssh = paramiko.SSHClient()
## 允许连接不在know_hosts文件中的主机
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
## 建立连接
ssh.connect("192.168.58.133", username="kali", port=22, password="kali")
## 执行命令
ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("neofetch")
print(ssh_stdout.read().decode())
ssh.close()
```

**使用户名和密码的 transport 方式登录**

```python
import paramiko
## 建立连接
trans = paramiko.Transport(("192.168.58.133", 22))
trans.connect(username="kali", password="kali")
## 将sshclient的对象的transport指定为以上的trans
ssh = paramiko.SSHClient()
ssh._transport = trans
ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("neofetch")
print(ssh_stdout.read().decode())
trans.close()
```

基于密钥的 Transport 方式登录

```python
import paramiko

## 指定本地的RSA私钥文件
## 如果建立密钥对时设置的有密码，password为设定的密码，如无不用指定password参数
pkey = paramiko.RSAKey.from_private_key_file('/home/you_username/.ssh/id_rsa', password='12345')

## 建立连接
trans = paramiko.Transport(('xx.xx.xx.xx', 22))
trans.connect(username='you_username', pkey=pkey)

## 将sshclient的对象的transport指定为以上的trans
ssh = paramiko.SSHClient()
ssh._transport = trans

## 执行命令，和传统方法一样
stdin, stdout, stderr = ssh.exec_command('df -hl')
print(stdout.read().decode())

## 关闭连接
trans.close()
```

实现 sftp 文件传输

```python
import paramiko

## 实例化一个trans对象## 实例化一个transport对象
trans = paramiko.Transport(('xx.xx.xx.xx', 22))

## 建立连接
trans.connect(username='you_username', password='you_passwd')

## 实例化一个 sftp对象,指定连接的通道
sftp = paramiko.SFTPClient.from_transport(trans)

## 发送文件
sftp.put(localpath='/tmp/11.txt', remotepath='/tmp/22.txt')

## 下载文件
sftp.get(remotepath='/tmp/22.txt', localpath='/tmp/33.txt')
trans.close()
```

## 利用Python脚本对数据库进行操作

####  pymysql模块的简单使用

```python
import pymysql

## 使用 connect 方法，传入数据库地址，账号密码，数据库名就可以得到你的数据库对象
db = pymysql.connect(
    host="localhost", user="root", password="root", database="avidol", charset="utf8"
)

## 接着我们获取 cursor 来操作我们的 avIdol 这个数据库
cursor = db.cursor()

## 比如我们来创建一张数据表
## sql = """create table beautyGirls (
##    name char(20) not null,
##    age int)"""
## sql = "insert into beautyGirls(name,age) values('Mrs.cang',18)"
sql = "delete from beautyGirls where age = '%d'" % (18)
try:
    cursor.execute(sql)
    db.commit()
except:
    ## 回滚
    db.rollback()
## 最后我们关闭这个数据库的连接
db.close()
```

```python
import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv("xsb.csv")

## 当engine连接的时候我们就插入数据
engine = create_engine("mysql://root:root@localhost/xsb?charset=utf8")
## user:password
with engine.connect() as conn, conn.begin():
    df.to_sql("xsb", conn, if_exists="replace")
```

####  pymongo模块的简单使用

```python
from pymongo import MongoClient

conn = MongoClient("mongodb://localhost:27017/")
## print(conn)
db = conn.avIdol
## 删除全部数据
db.col.remove()
db.col.insert(
    [
        {"name": "波多野結衣", "bwh": '{ "b": 90, "w": 59, "h": 85}', "age": 30},
        {"name": "吉泽明步", "bwh": '{ "b": 86, "w": 58, "h": 86}', "age": 35},
        {"name": "桃乃木香奈", "bwh": '{ "b": 80, "w": 54, "h": 80}', "age": 22},
        {"name": "西宫梦", "bwh": '{ "b": 85, "w": 56, "h": 86}', "age": 22},
        {"name": "松下纱荣子", "bwh": '{ "b": 88, "w": 57, "h": 86}', "age": 28},
    ]
)
## db.col.insert({"name": "波多野結衣", "bwh": '{ "b": 90, "w": 59, "h": 85}', "age": 30})
## print(db.col.find_one())
## 按name来删除
db.col.remove({"name": "波多野結衣"})
## 把 吉泽明步 换成 苍井空
db.col.update({"name": "吉泽明步"}, {"$set": {"name": "苍井空"}})
for item in db.col.find():
    print(item)
```

## 多线程、多进程、协程(微线程)

**简单的多线程**

```python
## -*- encoding: utf-8 -*-
import os
import threading
import time


class MyThread(threading.Thread):
    ## 创建一个线程类，并继承threading.Thread
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter

    def run(self):
        print("开始线程：" + self.name)
        moyu_time(self.name, self.counter, 10)
        print("退出线程：" + self.name)


def moyu_time(name, delay, counter):
    while counter:
        time.sleep(delay)
        print(
            "%s 开始摸鱼 %s " % (name, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
        )
        counter -= 1


if __name__ == "__main__":
    ## 创建新线程
    thread1 = MyThread(1, "小明", 1)
    thread2 = MyThread(2, "小红", 2)
    ## 开启新线程
    thread1.start()
    thread2.start()
    ## 等待线程终止
    thread1.join()
    thread2.join()
    ## 用到的join方法呢是为了让线程执行完再终止主程序
    print("退出主线程")
```

**线程池**

```python
## -*- encoding: utf-8 -*-
import os
import threading
import time
from concurrent.futures import ThreadPoolExecutor


def moyu_time(name, delay, counter):
    while counter:
        time.sleep(delay)
        print(
            "%s 开始摸鱼 %s" % (name, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
        )
        counter -= 1


if __name__ == "__main__":
    ## 线程池
    pool = ThreadPoolExecutor(20)
    ## 往池子里塞20个线程然后在循环的时候每次拿一个线程来摸鱼
    for i in range(1, 5):
        pool.submit(moyu_time("xiaoshuaib" + str(i), 1, 3))
```

**队列+多线程**

```python
## -*- encoding: utf-8 -*-
import threading
import time
from queue import Queue


class CustomThread(threading.Thread):
    ## 创建一个线程类，并继承threading.Thread
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.__queue = queue

    def run(self):
        while True:
            q_method = self.__queue.get()
            q_method()
            self.__queue.task_done()


def moyu():
    print(" 开始摸鱼 %s" % (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))


def queue_pool():
    ## 创建一个长度为5的队列
    queue = Queue(5)
    ## 根据队列的长度创建线程
    for i in range(queue.maxsize):
        t = CustomThread(queue)
        ## 将每个线程都置于守护状态
        t.setDaemon(True)
        t.start()

    for i in range(20):
        ## 利用put方法，将任务往队列里塞
        queue.put(moyu)
    queue.join()


if __name__ == "__main__":
    queue_pool()
```

```python
from multiprocessing import Process
## 使用 Process 这个类来创建进程

def f(name):
    print("hello", name)


if __name__ == "__main__":
    p = Process(target=f, args=("xiao",))
    p.start()
    p.join()
```

```python
## -*- encoding: utf-8 -*-
import os
from multiprocessing import Pool
## 使用进程池的方式

def f(x):
    return x * x

if __name__ == "__main__":
    with Pool(5) as p:
        print(p.map(f, [1, 2, 3]))
```

## Python启动一个本地服务

```bash
python -m http.server 8888
```

## Python数据可视化

####  画sin和cos线

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-np.pi, np.pi, 256)

cos = np.cos(x)
sin = np.sin(x)

plt.plot(x, cos, "--", linewidth=2)
plt.plot(x, sin)

plt.show()
```

####  画个饼图

```python
import matplotlib.pyplot as plt
import numpy as np


## Pie chart, where the slices will be ordered and plotted counter-clockwise:
labels = "Frogs", "Hogs", "Dogs", "Logs"
sizes = [15, 30, 45, 10]
explode = (0, 0.1, 0, 0)
## only "explode" the 2nd slice (i.e. 'Hogs')

fig1, ax1 = plt.subplots()
ax1.pie(
    sizes, explode=explode, labels=labels, autopct="%1.1f%%", shadow=True, startangle=90
)
ax1.axis("equal")
## Equal aspect ratio ensures that pie is drawn as a circle.

plt.show()
```

####  画直方图

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(0)

mu = 200
sigma = 25
x = np.random.normal(mu, sigma, size=100)

fig, (ax0, ax1) = plt.subplots(ncols=2, figsize=(8, 4))

ax0.hist(x, 20, density=True, histtype="stepfilled", facecolor="g", alpha=0.75)
ax0.set_title("stepfilled")

## Create a histogram by providing the bin edges (unequally spaced).
bins = [100, 150, 180, 195, 205, 220, 250, 300]
ax1.hist(x, bins, density=True, histtype="bar", rwidth=0.8)
ax1.set_title("unequal bins")

fig.tight_layout()
plt.show()
```

####  画散点图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style="darkgrid")


tips = sns.load_dataset("tips", data_home="seaborn-data", cache=True)
## name: str，代表数据集名字；
## cache: boolean，当为True时，从本地加载数据，反之则从网上下载；
## data_home: string，代表本地数据的路径
sns.relplot(x="total_bill", y="tip", data=tips)
plt.show()
```

####  画折线图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style="darkgrid")

fmri = sns.load_dataset("fmri", data_home="seaborn-data", cache=True)
sns.relplot(x="timepoint", y="signal", hue="event", kind="line", data=fmri)
plt.show()
```

####  画直方图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style="darkgrid")

titanic = sns.load_dataset("titanic", data_home="seaborn-data", cache=True)
sns.catplot(x="sex", y="survived", hue="class", kind="bar", data=titanic)
plt.show()
```

####  pyecharts

直方图

```python
from pyecharts.charts import Bar
from pyecharts import options as opts

bar = (
    Bar()
    .add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
    .add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
    .add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
    .set_global_opts(title_opts=opts.TitleOpts(title="某商场销售情况"))
)
bar.render()

```

饼图

```python
from pyecharts import options as opts
from pyecharts.charts import Bar, WordCloud, Pie
from pyecharts.faker import Faker
from pyecharts.render import make_snapshot
from snapshot_selenium import snapshot

def pie_base() -> Pie:
    c = (
        Pie()
        .add("", [list(z) for z in zip(Faker.choose(), Faker.values())])
        .set_global_opts(title_opts=opts.TitleOpts(title="Pie-基本示例"))
        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}"))
    )
    return c

## 需要安装 snapshot_selenium
make_snapshot(snapshot, pie_base().render(), "pie.png")
```

词云图

```python
from pyecharts import options as opts
from pyecharts.charts import Bar, WordCloud
from pyecharts.render import make_snapshot
from snapshot_selenium import snapshot


words = [
    ("Sam S Club", 10000),
    ("Macys", 6181),
    ("Amy Schumer", 4386),
    ("Jurassic World", 4055),
    ("Charter Communications", 2467),
    ("Chick Fil A", 2244),
    ("Planet Fitness", 1868),
    ("Pitch Perfect", 1484),
    ("Express", 1112),
    ("Home", 865),
    ("Johnny Depp", 847),
    ("Lena Dunham", 582),
    ("Lewis Hamilton", 555),
    ("KXAN", 550),
    ("Mary Ellen Mark", 462),
    ("Farrah Abraham", 366),
    ("Rita Ora", 360),
    ("Serena Williams", 282),
    ("NCAA baseball tournament", 273),
    ("Point Break", 265),
]

def wordcloud_base() -> WordCloud:
    c = (
        WordCloud()
        .add("", words, word_size_range=[20, 100])
        .set_global_opts(title_opts=opts.TitleOpts(title="WordCloud-基本示例"))
    )
    return c

## 需要安装 snapshot_selenium
make_snapshot(snapshot, wordcloud_base().render(), "WordCloud.png")
```

## Object-Oriented-Programe

```python
#运算符重载
## -*- encoding: utf-8 -*-
'''
@File    :   运算符重载.py
@Time    :   2022/11/16 17:23:01
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
'''
import os

class Vector:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def __str__(self):
        return 'Vector (%d, %d)' % (self.a, self.b)
    def __add__(self, other):
        return Vector(self.a + other.a, self.b + other.b)

v1 = Vector(2, 10)
v2 = Vector(5, -2)
print(v1 + v2)
```

```python
#demo1
## -*- encoding: utf-8 -*-
'''
@File    :   demo.py
@Time    :   2022/11/14 19:16:38
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
'''


class Employee:
    '所有员工的基类'
    empCount = 0

    ## empCount是一个类变量，它的值将在这个类的所有实例之间共享。可以在内部类或外部类使用 Employee.empCount 访问
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    ## 这个方法被称为类的构造函数或初始化方法，当创建了这个类的实例时就会调用该方法
    ## self 代表类的实例，self 在定义类的方法时是必须有的，虽然在调用时不必传入相应的参数
    def displayCount(self):
        print("Total Empolyee %d" % Employee.empCount)

    def displayEmployee(self):
        print("Name:", self.name, ",Salary: ", self.salary)

class Test:

    def prt(self):
        print(self)
        print(self.__class__)

## t = Test()  #<__main__.Test object at 0x000002C122827880>
## t.prt()  #<class '__main__.Test'>

## 创建实例对象
## "创建 Employee 类的第一个对象emp1"
emp1 = Employee("zara", 2000)
emp2 = Employee("manni", 5000)

emp1.displayEmployee()
emp2.displayEmployee()
print("Total Employee %d" % Employee.empCount)

emp1.age = 7
emp2.age = 8
del emp1.age
print("age=", emp2.age)
## hasattr(emp2, 'age')
## 检查是否存在一个属性
## getattr(emp2, 'age')
## 访问对象的属性
## setattr(emp2, 'age')
## 设置一个属性。如果属性不存在，会创建一个新属性
## delattr(emp2, 'age')
## 删除属性

print("Employee.__doc__:", Employee.__doc__)
print("Empolyee.__name__:", Employee.__name__)
print("Employee.__module__:", Employee.__module__)
print("Employee.__bases__:", Employee.__bases__)
print("Employee.__dict__:", Employee.__dict__)
```

```python
#demo2
## -*- coding: UTF-8 -*-
class Point:

    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def __del__(self):
        class_name = self.__class__.__name__
        print(class_name, "销毁")


pt1 = Point()
pt2 = pt1
pt3 = pt1
print(id(pt1), id(pt2), id(pt3))  ## 打印对象的id
del pt1
del pt2
del pt3
```

```python
#demo3
## -*- coding: UTF-8 -*-


class Parent:  ## 定义父类
    parentAttr = 100

    def __init__(self):
        print("调用父类构造函数")

    def parentMethod(self):
        print('调用父类方法')

    def setAttr(self, attr):
        Parent.parentAttr = attr

    def getAttr(self):
        print("父类属性 :", Parent.parentAttr)

    def myMethod(self):
        print("调用父类方法")


class Child(Parent):  ## 定义子类

    def __init__(self):
        print("调用子类构造方法")

    def childMethod(self):
        print('调用子类方法')

    def myMethod(self):
        print("调用子类方法")


c = Child()  ## 实例化子类
c.childMethod()  ## 调用子类的方法
c.parentMethod()  ## 调用父类方法
c.setAttr(200)  ## 再次调用父类的方法 - 设置属性值
c.getAttr()  ## 再次调用父类的方法 - 获取属性值
c.myMethod()  #在子类重写父类的方法
```

## 人工智能

**详见博客中 Artificial Intelligence 这篇文章**

## 数字图像处理

####  基于opencv的svm算法识别手写数字

**训练模型**

```python
import cv2
import numpy as np
from keras.datasets import mnist
from keras import utils


if __name__ == "__main__":
    ## 使用 Keras 载入训练数据
    (train_images, train_labels), (test_images, test_labels) = mnist.load_data()
    ## print(train_images.shape)  ## (60000, 28, 28) 60000个样本、每个样本的宽高是28*28
    ## 变换数据的形状并归一化,将每张图像转换成了一个长度为 784 的一维数组
    train_images = train_images.reshape(train_images.shape[0], -1)
    ## print(train_images.shape)
    ## 将数据类型转换为 float32 类型
    ## 因为像素值原本的范围是 0 到 255，所以除以 255 可以将它们归一化到 0 到 1 之间
    train_images = train_images.astype('float32') / 255
    test_images = test_images.reshape(test_images.shape[0], -1)
    test_images = test_images.astype('float32') / 255

    ## print(train_labels)
    ## 将标签数据转为int32 并且形状为(60000,1)
    train_labels = train_labels.astype(np.int32)
    test_labels = test_labels.astype(np.int32)
    ## 将 train_labels 的形状重新塑形为一个二维数组，第一维度填-1即让numpy自动计算
    ## 第二维度填1即每个样本的标签数量为 1
    train_labels = train_labels.reshape(-1, 1)
    test_labels = test_labels.reshape(-1, 1)
    ## print(train_labels)
    ## 创建svm模型
    svm = cv2.ml.SVM_create()
    ## 设置类型为SVM_C_SVC代表分类
    svm.setType(cv2.ml.SVM_C_SVC)
    ## 设置核函数
    svm.setKernel(cv2.ml.SVM_POLY)
    ## 设置其他参数
    svm.setGamma(3)
    svm.setDegree(3)
    ## 设置迭代终止条件
    svm.setTermCriteria((cv2.TermCriteria_MAX_ITER, 300, 1e-3))
    ## 开始训练
    svm.train(train_images, cv2.ml.ROW_SAMPLE, train_labels)
    svm.save("mnist_svm.xml")
    ## 在测试集上对模型准确度进行测试,第一个值为数据1的预测结果
    test_pre = svm.predict(test_images)
    print(test_pre)
    test_ret = test_pre[1]
    ## print(test_ret)
    ## 计算准确率
    test_ret = test_ret.reshape(-1,)
    test_labels = test_labels.reshape(-1,)
    ## 比较相同位置的两个元素是否相等，会生成一个bool数组
    test_sum = (test_ret == test_labels)
    ## print(test_sum)
    acc = test_sum.mean()
    print(acc)  ## 0.9687
```

**预测手写数字**

```python
import cv2 as cv
import numpy as np

img0 = cv.imread('test.png', 0)
## 显示图像，2是窗口名称，img0是要显示的图像对象
## cv.imshow('img0', img0)
## 使窗口等待用户按下任意键。参数 0 表示无限期等待用户的按键输入。
## cv.waitKey(0)
## 图像二值化
ret, img1 = cv.threshold(img0, 100, 255, cv.THRESH_BINARY_INV)
## cv.imshow('2', img1)
## cv.waitKey(0)
## 创建一个3x3的矩形核，用于图像膨胀
kernel1 = np.ones((3, 3), np.uint8)
img2 = cv.dilate(img1, kernel1)
## cv.imshow("img2",img2)
## cv.waitKey(0)

## 剔除小连通域(噪点)
## 函数返回检测到的轮廓列表 contours 和层级信息 hierarchy
contours, hierarchy = cv.findContours(
    img2, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE)
for i in range(len(contours)):
    area = cv.contourArea(contours[i])
    ## 设定连通域最小阈值，小于该值被清理(填充为黑色)
    if area < 200:
        cv.drawContours(img2, [contours[i]], 0, 0, -1)
## 再次进行膨胀
kernel2 = np.ones((15, 15), np.uint8)
img3 = cv.dilate(img2, kernel2)

## roi提取
contours, hierarchy = cv.findContours(
    img3, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
x, y, w, h = cv.boundingRect(contours[0])
a = 100
brcnt = np.array([[[x-a, y-a]], [[x+w+a, y-a]],
                 [[x+w+a, y+h+a]], [[x-a, y+h+a]]])
cv.drawContours(img3, [brcnt], -1, (255, 255, 255), 2)
## cv.imshow('img3', img3)
## cv.waitKey(0)
## img4就是提取roi后的图片
img4 = img3[y-a:y+h+a, x-a:x+w+a]
## cv.imshow('img4', img4)
## cv.waitKey(0)
img5 = cv.resize(img4, (28, 28))
## cv.imshow('img5', img5)
## cv.waitKey(0)
cv.imwrite('img5.png', img5)
## 这里就是读取预处理好的图片了
img = cv.imread('img5.png', 0)

## 将数据类型由uint8转为float32
img = img.astype(np.float32)
## 图片形状由(28,28)转为(784,)
img = img.reshape(-1,)
## 增加一个维度变为(1,784)
img = img.reshape(1, -1)
## 图片数据归一化
img = img/255

## 载入svm模型
svm = cv.ml.SVM_load('mnist_svm.xml')
## 进行预测
img_pre = svm.predict(img)
print(img_pre[1])
```



## 利用Python进行自动化处理

####  1.读取指定目录下的文件列表，并按照数字顺序排列

```python
## -*- encoding: utf-8 -*-
import os

filedir = r'C:\Users\GoodLunatic\Desktop\500\file'
filenames = os.listdir(filedir)
filenames.sort(key=lambda x: int(x.split("p")[1]))
print(filenames)
```

####  2.读取目录中的文件并合并到一个文件中

```python
## -*- encoding: utf-8 -*-
import os
fileobjs = []
filedir = input('please input the dir:')
filenames = os.listdir(filedir)
filenames.sort(key=lambda x: int(x.split("p")[1]))
for filename in filenames:
    filename = filedir+'\\'+filename
    fileobjs.append(filename)
## print(fileobjs)
f1 = open('flag.txt', 'w+', encoding='utf-8')
for fileobj in fileobjs:
    with open(fileobj, 'r') as f:
        for line in f.readlines():
            line = line.strip('\n')
            f1.write(line)
f.close()
f1.close()
```

####  2.压缩包相关（zipfile模块）

zipfile模块常用高度两个类：ZipFile和ZipInfo

ZipFile：用来创建和读取zip文件

ZipInfo：读取存储的zip文件中每个文件的信息

（1）class zipfile.ZipFile(file[, mode[, compression[, allowZip64]]])

```
file-表示文件的路径或类文件对象
mode-表示打开zip文件的格式，默认值为'r'，但是可以改为'w','a'
compression-表示在写zip文档时所使用的压缩方法：zipfile.ZIP_STORED或zipfile._DEFLATED
allowZip64-如果要操作的压缩文件大小超过2G，要把allowZip64设为true
```

```python
import zipfile

filename = "1.zip"
f = zipfile.ZipFile(filename, 'r')
for f_name in f.namelist():
    #namelist()会返回一个包含压缩包内所有文件的列表
    print(f_name)
#ZipFile.getinfo()获取zip文件中指定文件的信息
print(f.getinfo('Matryoshka1000.zip'))
#Zipfile.infolist()获取zip文件中所有文件的信息，并返回一个列表
print(f.infolist())
```

ZipFile.extract(member[, path[, pwd]])

```
#将zip文件中的指定文件解压到指定目录
-member指定要解压的文件名称或者对应的Zipinfo对象
-path指定了解析文件保存的文件夹
```

```python
import zipfile
import os

filename = "2.zip"
## os.getcwd()返回当前文件运行的路径
f = zipfile.ZipFile(os.path.join(os.getcwd(),filename))
for file in f.namelist():
    ## 将压缩包中的文件解压到Desktop,这里也可以解压到还未创建的文件夹
    ## f.extract(file,r'C:\Users\GoodLunatic\Desktop')
    f.extract(file,r'C:\Users\GoodLunatic\Desktop\2')
f.close()
```

ZipFile.write(filename[, arcname[, compress_type]])

```
#将指定文件添加到zip文件中
filename-文件路径
arcname-添加到zip文档之后保存的名称
compress_type表示压缩方法：zipfile.ZIP_STORED或zipfile.ZIP_DEFLATED
```

```python
import zipfile
import os
#新建一个3.zip压缩包
zipFile = zipfile.ZipFile(r'C:\Users\GoodLunatic\Desktop\3.zip','w')
#将flag.txt名称修改后使用ZIP_DEFLATED算法添加到3.zip
zipFile.write(r'C:\Users\GoodLunatic\Desktop\flag.txt','修改后的flag.txt',zipfile.ZIP_DEFLATED)
zipFile.close()
```

ZipFile.writestr(zinfo_or_arcname, pwd(byte))

```
writestr()支持将二进制数据直接写入到压缩文档
pwd-解压密码，byte格式
```

（2）Class ZipInfo

```
ZipFile.getinfo(name) 方法返回的是一个ZipInfo对象，表示zip文档中相应文件的信息。它支持如下属性：
ZipInfo.filename： 获取文件名称。
ZipInfo.date_time： 获取文件最后修改时间。返回一个包含6个元素的元组：(年, 月, 日, 时, 分, 秒)
ZipInfo.compress_type： 压缩类型。
ZipInfo.comment： 文档说明。
ZipInfo.extr： 扩展项数据。
ZipInfo.create_system： 获取创建该zip文档的系统。
ZipInfo.create_version： 获取 创建zip文档的PKZIP版本。
ZipInfo.extract_version： 获取 解压zip文档所需的PKZIP版本。
ZipInfo.reserved： 预留字段，当前实现总是返回0。
ZipInfo.flag_bits： zip标志位。
ZipInfo.volume： 文件头的卷标。
ZipInfo.internal_attr： 内部属性。
ZipInfo.external_attr： 外部属性。
ZipInfo.header_offset： 文件头偏移位。
ZipInfo.CRC： 未压缩文件的CRC-32。
ZipInfo.compress_size： 获取压缩后的大小。
ZipInfo.file_size： 获取未压缩的文件大小。
```

```python
#将目录中多个文件添加到压缩包
import zipfile
import os

z = zipfile.ZipFile(r'C:\Users\GoodLunatic\Desktop\testzip.zip', 'w')
testdir = r"testdir"
if os.path.isdir(testdir):
    for d in os.listdir(testdir):
        z.write(testdir+os.sep+d)
    z.close()
```

ZipFile.extractall([path[, members[, pwd]]])

```
解压zip文档中的所有文件到当前目录。参数members的默认值为zip文档内的所有文件名称列表，也可以自己设置，选择要解压的文件名称
```

## Python中各种框架的使用

####  Scrapy框架的使用

创建一个爬虫项目

```bash
scrapy startproject qiushibaike
```

然后在spiders目录下创建我们的爬虫代码demo.py

scrapy 创建出来的文件目录解释

```
spiders目录—
用来存放我们写的爬虫文件
items.py—
用来定义我们要存储数据的字段
middlewares.py
中间件，在这里面可以做一些在爬虫过程中想干的事情，比如爬虫在响应的时候你可以做一些操作
pipelines.py
来定义一些存储信息的文件，比如我们要连接 MySQL或者 MongoDB 就可以在这里定义
settings.py
这个文件用来定义我们的各种配置，比如配置请求头信息等
```

运行我们的爬虫

```bash
cd qiushibaike/
scrapy crawl qiushibaike
```

可以使用scrapy shell 来请求网页

```bash
scrapy shell /home/wistbean/PycharmProjects/spider/qiushibaike/qiushi-1.html
```

shell 后面可以是你爬下来的 HTML 文件

也可以是你一个链接

获取相关数据的命令

```bash
content_left_div = response.xpath('//*[@id="content-left"]')
content_list_div = content_left_div.xpath('./div')
content_div = content_list_div[0]
author = content_div.xpath('./div/a[2]/h2/text()').get()
content = content_div.xpath('./a/div/span/text()').getall()
```

将爬下来的数据存储为 json 文件

```bash
scrapy crawl qiushibaike -o qiushibaike.json
```

若出现中文乱码，就在setting.py中加一句

```
FEED_EXPORT_ENCODING = 'utf-8'
```

```python
import scrapy

from Scrapy.qiushibaike.qiushibaike.items import QiushibaikeItem


class Qiushibaike(scrapy.Spider):
    name = "qiushibaike"
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36"
    }

    def start_requests(self):
        urls = [
            "https://www.qiushibaike.com/text/page/1/",
            "https://www.qiushibaike.com/text/page/2/",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, headers=self.headers)
            ## 需要返回一个 yield 生成的迭代
            ## callback = self.parse就是要让它去回调我们的数据解析方法

        ## def parse(self, response):
        ##     page = response.url.split("/")[-2]
        ##     filename = "qiushi-%s.html" % page
        ##     with open(filename, "wb") as f:
        ##         f.write(response.body)
        ##     self.log("[+]Save file %s" % filename)
        ## def parse(self, response):
        ##     content_left_div = response.xpath('//*[@id="content-left"]')
        ##     content_list_div = content_left_div.xpath("./div")
        ##     for content_div in content_list_div:
        ##         yield {
        ##             "author": content_div.xpath("./div/a[2]/h2/text()").get(),
        ##             "content": content_div.xpath("./a/div/span/text()").getall(),
        ##         }

    def parse(self, response):
        content_left_div = response.xpath('//*[@id="content-left"]')
        content_list_div = content_left_div.xpath("./div")

        for content_div in content_list_div:
            item = QiushibaikeItem()
            item["author"] = content_div.xpath("./div/a[2]/h2/text()").get()
            item["content"] = content_div.xpath("./a/div/span/text()").getall()
            item["_id"] = content_div.attrib["id"]
            yield item

        next_page = response.xpath('//*[@id="content-left"]/ul/li[last()]/a').attrib[
            "href"
        ]

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

        ## if next_page is not None:
        ##     next_page = response.urljoin(next_page)
        ##     yield scrapy.Request(next_page, callback=self.parse)
```

```python
## Define your item pipelines here
#
## Don't forget to add your pipeline to the ITEM_PIPELINES setting
## See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo

## useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class QiushibaikePipeline:
    def __init__(self):
        self.connection = pymongo.Mongo.MongoClient("localhost", 27017)
        self.db = self.connection.scrapy
        self.collection = self.db.qiushibaike

    def process_item(self, item, spider):
        if not self.connection or not item:
            return
        self.collection.save(item)

    def __del__(self):
        if self.connection:
            self.connection.close()
```

```python
## Define here the models for your scraped items
#
## See documentation in:
## https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class QiushibaikeItem(scrapy.Item):
    ## define the fields for your item here like:
    ## name = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    _id = scrapy.Field()
```

####  Flask后端框架的使用

#### Helloworld

```python
from flask import Flask

app = Flask(__name__)

## 使用了一个装饰器
@app.route("/")
def index():
    return "<h1>hello world</h1>"

app.run()
```

#### 路由的使用

```python
from flask import Flask

app = Flask(__name__)


## 使用了一个装饰器
@app.route("/hello")
def hello():
    return "<h1>hello world</h1>"


@app.route("/hi")
def hi():
    return "hi hi"


if __name__ == "__main__":
    app.run()
```

```python
from flask import Flask

app = Flask(__name__)


## 使用了一个装饰器
@app.route("/hello", methods=["GET", "POST"], endpoint="hello")
def hello():
    return "<h1>hello world</h1>"


@app.route("/hi", methods=["POST"], endpoint="hi")
def hi():
    return "hi hi"


if __name__ == "__main__":
    app.run()
```

#### 变量规则

```python
from flask import Flask

app = Flask(__name__)


## 用了正则表达式
@app.route("/user/<id>")
def index(id):
    if id == "1":
        return "python"
    if id == "2":
        return "java"


if __name__ == "__main__":
    app.run()
```

```python
from flask import Flask

app = Flask(__name__)


## 用了正则表达式
## 使用了转换器 string-接受任何不包含斜杠的文本 int-接受正整数 float-接受正浮点数 path-接受包含斜杠的文本
@app.route("/user/<int:id>")
def index(id):
    if id == 1:
        return "python"
    if id == 2:
        return "java"


if __name__ == "__main__":
    app.run()
```

#### 自定义转换器

```python
from werkzeug.routing import BaseConverter
from flask import Flask

app = Flask(__name__)


class RegexConverter(BaseConverter):
    def __init__(self, url_map, regex):
        ## 调用父类方法
        super(RegexConverter, self).__init__(url_map)
        self.regex = regex

    def to_python(self, value):
        ## 父类的方法 功能已经实现
        print("to_python方法被调用")
        return value


## 将自定义的转换器类添加到flask应用中
app.url_map.converters["re"] = RegexConverter


@app.route('/index/<re("1\d{5}"):value>')
def index(value):
    print(value)
    return "hello"


if __name__ == "__main__":
    app.run()
```

#### 渲染form表单

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/index", methods=["GET", "POST"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
```

#### request对象



## Python中的进程与线程

####  进程与线程的关系

```
进程只是占内存
线程才消耗CPU
默认一个进程至少一个线程
我们一般称为主进程和主线程
```

####  Python中的GIL锁(全局解释器锁)

GIL并不是Python的特性，它是在实现Python解释器(CPython)时所引入的一个概念，是Python原始解释器CPython内部的一把锁

每一个Python进程运行时都对应一个CPython解释器进程。在CPython解释器内部运行多个线程的时候，每个线程在解释器内部申请相应的全局资源，为了防止资源竞争而发生错误，对所有线程申请全局资源增加了限制-全局解释器锁GL。每个线程想要运行首先获取这个解释器进程中唯一的GL,因此Python进程中所有线程只能个一个交替的执行。所以在Python程序里，就算使用多线程，其实还是一个线程在工作，这是CPython的一个缺陷，其他语言没有。

####  解决GIL限制Python并行计算问题的方法

1.使用进程而非线程，如Python的 multiprocessing 模块

2.使用协程，如Python的asyncio模块

3.使用Jython或者IronPython



## Python中的算法

####  二分查找

```python
list = [12,15,22,35,48,53,129,657,999]
low = 0
high = len(list)-1
n = int(input("请输入待查找的数:"))
while low<=high:
    mid = (low+high)//2
    if list[mid]<=n:
        low = mid+1
    else:
        high = mid-1
print(f"需要查找的数的下标为{high}")
```

####  Python运行时 -u 参数的作用

一个例子

```python
import sys
sys.stdout.write("stdout1")
sys.stderr.write("stderr1")
sys.stdout.write("stdout2")
sys.stderr.write("stderr2")
```

```bash
$ python -u .\exp.py
stdout1stderr1stdout2stderr2
$ python .\exp.py
stderr1stderr2stdout1stdout2
#以上输出存在差异的原因是python具有缓存机制
#sys.stderr是无缓存的，sys.stdout是有缓存的，只有遇到换行或者积累到一定大小才会显示出来
#加了 -u 参数后，其实就是强制其标准输出不通过缓存直接打印到屏幕
```

平常我们使用的print函数其实也是调用了sys.stdout.write(obj+'\n')函数

####  踩过的坑

以下代码，加-u和不加，输出的内容是不同的

```python
from PIL import Image

image = Image.open('flag1.png')
w,h = image.size
## print(w,h)
data = ''
output = ''
for i in range(w):
    for j in range(h):
        pixel_data = image.getpixel((i,j))[0]
        if(pixel_data <=10):
            data+='0'
        else:
            data+='1'
## print(len(data))
if len(data) % 8!=0:
    data+='0'*(8-len(data)%8)
    
for i in range(0,len(data),8):
    binary_segment = data[i:i+8]
    int_value = int(binary_segment,2)
    char_value = chr(int_value)
    output += char_value
print(output)
```



---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/e19da63/  

