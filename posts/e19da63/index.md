# Python Basic Knowledge

Basic knowledge of Python Language.

&lt;!--more--&gt;

## 字符串处理

####  ljust和rjust

- `str.ljust(width, fillchar)`: 这个方法返回一个左对齐的版本的原字符串，并使用 `fillchar` 填充至少 `width` 长度的字符。
- 如果原字符串的长度超过了 `width`，则返回原字符串。
- `str.rjust(width, fillchar)`: 与 `ljust` 相似，但是它返回一个右对齐的版本

```python
res = &#34;1101&#34;
## 使用 rjust 在 res 的前面补零直到其长度是 8 的倍数
## ((len(res) &#43; 7) // 8) * 8: 得到下一个8的倍数
required_length = ((len(res) &#43; 7) // 8) * 8
res = res.rjust(required_length, &#39;0&#39;)
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
		str.encode(&#39;utf-8&#39;)
		bytes.decode(&#39;utf-8&#39;)
字符串前加f——表示在字符串内支持大括号包裹的Python表达式
```

```python
name = &#34;Li&#34;
age = 16
## print(&#34;Hello &#34; &#43; name &#43; &#34; you are &#34; &#43; str(age) &#43; &#34; years old&#34;)
print(&#34;Hello %s ,you are %d years old&#34; % (name, age))
print(&#39;%.3f&#39; % 3.14159)
```

```python
your_name = input(&#34;please input your name:\n&#34;)
print(f&#34;Hello,{your_name}&#34;)
print(f&#34;Hello,{your_name}&#34;)
print(&#34;Hello&#34;, your_name)
print(&#34;Hello&#34; &#43; your_name)
&#39;&#39;&#39;
Hello,Tom
Hello,Tom
Hello Tom
HelloTom
&#39;&#39;&#39;
```

```python
b = 1
a = 1.05555
## 第一种方式
print(f&#39;b 的值为:{b}&#39;)
## float 类型输出
print(f&#39;a 的值为:{a:f}&#39;)
## float 保留两位小数 五舍六入
print(f&#39;a 的值为:{a:.4f}&#39;)
## 第二种方式
print(&#39;a 的值为:&#39;&#43;str(a))
## 第三种方式
print(&#39;a 的值为:{}&#39;.format(a))
```

## 匿名函数Lambda

```python
def add_lambda(a, b=1): return a&#43;b
print(add_lambda(10, 20))
print(add_lambda(10))
```

```python
#三项表达式
get_odd_even = lambda x:&#39;even&#39; if x%2==0 else &#39;odd&#39;
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
    print(f&#34;At index {i}, the value is {value}&#34;)
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
&#43;：打开一个文件进行更新（可读写）。注意：该模式不能单独使用，需要与r/w/a组合使用。打开文件后文件指针的位置取决于另一个组合参数。
```

####  组合模式

```
r&#43;：打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件头，新写入的内容在原有内容的前面；如果文件不存在会报错。
w&#43;：打开一个文件用于读写。如果文件存在，则打开文件，清空原有内容，进入编辑模式；如果文件不存在，则创建一个新文件进行读写操作。
a&#43;：以追加模式打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件尾，新写入的内容在原有内容的后面；如果文件不存在，则创建一个新文件用于读写。

所有上面这些模式默认都是t——文本模式，如果要以二进制模式打开，需要加上参数b，如：rb、rb&#43;、wb、wb&#43;、ab、ab&#43;。
```

## try语句的使用

```python
## -*- encoding: utf-8 -*-
&#39;&#39;&#39;
@File    :   try.py
@Time    :   2022/11/14 15:27:12
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
&#39;&#39;&#39;
import os
import traceback

## try:
##     &lt;statements&gt;        #运行try语句块，并试图捕获异常
## except &lt;name1&gt;:
##     &lt;statements&gt;        #如果name1异常发现，那么执行该语句块。
## except (name2, name3):
##     &lt;statements&gt;        #如果元组内的任意异常发生，那么捕获它
## except &lt;name4&gt; as &lt;variable&gt;:
##     &lt;statements&gt;        #如果name4异常发生，那么进入该语句块，并把异常实例命名为variable
## except:
##     &lt;statements&gt;        #发生了以上所有列出的异常之外的异常
## else:
## &lt;statements&gt;            #如果没有异常发生，那么执行该语句块
## finally:
##     &lt;statement&gt;         #无论是否有异常发生，均会执行该语句块。

## try:
##     num = int(input(&#39;请输入一个整数:&#39;))
##     result = 8 / num
##     print(result)
## ## except ZeroDivisionError:
## ##     print(&#39;0不能做除数&#39;)
## except ValueError as r:
##     ## r 是前面 ValueError 类的一个实例,下面是打印报错的明细
##     print(&#39;输入的值不是合法的整数 %s&#39; % (r))
## except Exception as r:
##     print(&#39;未知错误 %s&#39; % (r))
## ## 没有预先判断到的错误怎么办?
## finally:
##     ## 无论是否有异常，都会执行的代码
##     print(&#39;%%%%%%%%%%%%%%%&#39;)

## def demo1():
##     return int(input(&#39;请输入整数:&#39;))
## def demo2():
##     return demo1()
## ## 函数的错误：一级一级的去找，最终会将异常传递到主函数里
## try:
##     print(demo2())
## except Exception as r:
##     print(&#39;未知错误 %s&#39; % r)
## print(demo2())

## def input_passwd():
##     ## 1.提示用户输入密码
##     pwd = input(&#39;请输入密码：&#39;)
##     ## 2.判断密码的长度
##     if len(pwd) &gt;= 8:
##         return pwd
##     ## 3.如果&lt;8就主动抛出异常
##     print(&#39;主动抛出异常&#39;)
##     #a.创建异常对象
##     ex = Exception(&#39;长度不够&#39;)
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
##     assert (div != 0), &#39;div不能为0&#39;
##     return num / div

## print(func(10, 0))

## a = 1
## assert (a &lt; 0), &#39;出错了，a&gt;=0&#39;
## print(&#34;正常运行&#34;)

## a = 1
## try:
##     assert a &lt; 0
## except AssertionError as er:  #明确抛出此异常
##     #抛出AssertionError 不含任何信息，所以无法通过er.__str__()获取异常描述
##     print(&#39;AssertionError&#39;, er, er.__str__())
##     ## 通过traceback打印详细异常信息
##     print(&#39;traceback 打印异常&#39;)
##     traceback.print_exc()
## except:  #不会命中其他异常
##     print(&#39;assert except&#39;)

## try:
##     raise AssertionError(&#39;测试 raise AssertionError&#39;)
## except AssertionError as er:
##     print(&#39;raise AssertionError 异常&#39;, er.__str__())


#函数调用异常
def foo(value, divide):
    assert divide != 0, &#39;divide 不能为0&#39;
    return value / divide


print(foo(4, 2))
print(foo(4, 0))
```

## 第三方模块(库)的使用

#### libnum模块的使用

```python
import libnum
str = &#34;flag{114514}&#34;
bin = &#34;11001100110110001100001011001110111101100110001001100010011010000110101001100010011010001111101&#34;
print(libnum.n2s(97))  ## a
print(libnum.s2n(str))  ## 31698494968735985349289915517
print(hex(libnum.s2n(str)))  ## 0x666c61677b3131343531347d
print(libnum.s2b(str))
## 011001100110110001100001011001110111101100110001001100010011010000110101001100010011010001111101
print(libnum.b2s(bin))
## 会自动在前面补零对齐8位 b&#39;flag{114514}&#39;
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
#                 print(i&#43;j&#43;k&#43;l)
                
for strs in itertools.product(printable, repeat=4):
    print(&#39;&#39;.join(strs))
```

##### 2. permutations生成排列组合
```python
from itertools import permutations
# 生成长度为2的排列组合
print(list(permutations(&#34;ABC&#34;, 2)))  
# [(&#39;A&#39;, &#39;B&#39;), (&#39;A&#39;, &#39;C&#39;), (&#39;B&#39;, &#39;A&#39;), (&#39;B&#39;, &#39;C&#39;), (&#39;C&#39;, &#39;A&#39;), (&#39;C&#39;, &#39;B&#39;)]
```

##### 3. combinations生成组合
```python
from itertools import combinations
# 生成长度为2的组合
print(list(combinations(&#34;ABC&#34;, 2)))  
# [(&#39;A&#39;, &#39;B&#39;), (&#39;A&#39;, &#39;C&#39;), (&#39;B&#39;, &#39;C&#39;)]
```


#### hashlib模块的使用

常见的加密

```python
import hashlib

text = &#34;Hello&#34;

# md5加密
md5_hash = hashlib.md5()
md5_hash.update(text.encode(&#39;utf-8&#39;))
res = md5_hash.hexdigest()

# SHA1加密
sha1_hash = hashlib.sha1()
sha1_hash.update(text.encode(&#39;utf-8&#39;))
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
|   `&#43;`    | 和{1，} 一个样，匹配 &#43; 前面 1 次或多次。 比如 zo&#43;”能匹配“zo”以及“zoo”，但不能匹配“z”。 |
|   `？`   |          和{0,1} 一个样，匹配 ？前面 0 次或 1 次。           |
|   a\|b   |                       匹配 a 或者 b。                        |
|  `（）`  |                     匹配括号里面的内容。                     |

```python
## -*- encoding: utf-8 -*-

## *代表匹配零次或多次
## &#43;代表匹配一次或多次
## ?代表匹配零次或一次
## $匹配输入字符串的结束位置
## \\.代表小数点
## \\s代表空格，则\\s*代表匹配多个空格
## \\d代表匹配一个数字字符，等价于[0-9]，则\\d&#43;\\.\\d*可匹配1.或1.0等\\d*\\.\\d&#43;可匹配.0或1.0等
## [&#43;-]代表匹配包含的任一字符&#43;或-，[&#43;-]?则说明&#43;或-可有可无

import re

str = &#39;aabbabaabbaa&#39;
# 一个&#34;.&#34;就是匹配除 \n (换行符)以外的任意一个字符
print(re.findall(r&#39;a.b&#39;, str))  #[&#39;aab&#39;, &#39;aab&#39;]
# *前面的字符出现0次或以上
print(re.findall(r&#39;a*b&#39;, str))  #[&#39;aab&#39;, &#39;b&#39;, &#39;ab&#39;, &#39;aab&#39;, &#39;b&#39;]
# 贪婪，匹配从.*前面为开始到后面为结束的所有内容
print(re.findall(r&#39;a.*b&#39;, str))  #[&#39;aabbabaabb&#39;]
# 非贪婪，遇到开始和结束就进行截取，因此截取多次符合的结果，中间没有字符也会被截取
print(re.findall(r&#39;a.*?b&#39;, str))  #[&#39;aab&#39;, &#39;ab&#39;, &#39;aab&#39;]
# 非贪婪，与上面一样，只是与上面的相比多了一个括号，只保留括号的内容
print(re.findall(r&#39;a(.*?)b&#39;, str))  #[&#39;a&#39;, &#39;&#39;, &#39;a&#39;]

str = &#39;&#39;&#39;aabbab
         aabbaa
         bb&#39;&#39;&#39;

# 后面多加了2个b
# 没有把最后一个换行的aab算进来
print(re.findall(r&#39;a.*?b&#39;, str))  #[&#39;aab&#39;, &#39;ab&#39;, &#39;aab&#39;]
# re.S不会对\n进行中断
print(re.findall(r&#39;a.*?b&#39;, str, re.S))  #[&#39;aab&#39;, &#39;ab&#39;, &#39;aab&#39;, &#39;aa\n         b&#39;]
```

```python
import re

content = &#34;&#34;&#34;苹果是绿色的
橙子是橙色的
香蕉是黄色的
乌鸦是黑色的&#34;&#34;&#34;
p = re.compile(r&#34;.色&#34;)
# 代表所有的单个字符，除了 \n \r
print(type(p))
for one in p.findall(content):
    # 找出所有符合条件的文本
    print(type(one))
    print(one)
```

```python
import re

source = &#34;&#34;&#34;王亚辉
tony
刘文武&#34;&#34;&#34;

# p = re.compile(r&#34;\w{2,4}&#34;)
p = re.compile(r&#34;\w{2,4}&#34;, re.A)
# 不匹配中文
print(p.findall(source))
```

```python
import re

content = &#34;&#34;&#34;001-苹果价格-60
002-橙子价格-78
003-香蕉价格-88&#34;&#34;&#34;
# p = re.compile(r&#34;^\d&#43;&#34;)
p = re.compile(r&#34;^\d&#43;&#34;, re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = &#34;&#34;&#34;001-苹果价格-60
002-橙子价格-78
003-香蕉价格-88&#34;&#34;&#34;
# p = re.compile(r&#34;^\d&#43;&#34;)
p = re.compile(r&#34;\d&#43;$&#34;, re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = &#34;&#34;&#34;张三，手机号码15945678901
李四，手机号码13945677701
王二，手机号码13845666901&#34;&#34;&#34;
p = re.compile(r&#34;^(.&#43;)，.&#43;(\d{11})&#34;, re.M)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

content = &#34;&#34;&#34;Python3高级开发工程师上海互教教育科技有限公司上海-浦东新区2万/月02-18满员
测试开发工程师(C&#43;/python)上海墨鹍数码科技有限公司上海-浦东新区2.5万/每月02-18未满员
Python.3开发工程师上海德拓信息技术股份有限公司上海-徐汇区1.3万/每月02-18乘剩余11人
测试开发工程师(Python)赫里普（上海）信息科技有限公司上海-浦东新区1.1万/每月02-18剩余5人&#34;&#34;&#34;
p = re.compile(r&#34;([\d.]&#43;)万/每{0,1}月&#34;, re.M)
# p = re.compile(r&#34;([\d.]&#43;)万/每{0,1}月&#34;)
# ^可以表示每行开头
for one in p.findall(content):
    print(one)
```

```python
import re

names = &#34;关羽; 张飞, 赵云,马超, 黄忠  李逵&#34;
namelist = re.split(r&#34;[;,\s]\s*&#34;, names)
print(namelist)
```

```python
import re

## PhoneNumRegex = re.compile(r&#34;\d{3}-\d{3}-\d{3}&#34;)
PhoneNumRegex = re.compile(r&#34;(\d{3})-(\d{3}-\d{3})&#34;)
## 向 re.compile()传入一个字符串值，表示正则表达式，它将返回一个 Regex 模式对象
mo = PhoneNumRegex.search(&#34;My Phone number is 415-555-4242&#34;)
print(mo.group(0))
print(mo.group())
print(mo.group(1))
print(mo.group(2))
print(mo.groups())
areacode, mainNumber = mo.groups()
print(areacode)
print(mainNumber)
## print(&#34;Phone number founded:&#34; &#43; mo.group())
## Regex 对象的 search()方法查找传入的字符串，寻找该正则表达式的所有匹配。如
## 果字符串中没有找到该正则表达式模式，search()方法将返回 None。如果找到了该模式，
## search()方法将返回一个 Match 对象。Match 对象有一个 group()方法，它返回被查找字
## 符串中实际匹配的文本
PhoneNumRegex2 = re.compile(r&#34;(\(\d{3}\))-(\d{3}-\d{3})&#34;)
mo2 = PhoneNumRegex2.search(&#34;My Phone number is (415)-555-4242&#34;)
print(mo2.groups())
print(mo2.group(1))
PhoneNumRegex3 = re.compile(r&#34;(\d{3}-)?\d{3}-\d{4}&#34;)
mo3 = PhoneNumRegex3.search(&#34;My Phonenumber is 415-555-4224&#34;)
print(mo3.group())
mo4 = PhoneNumRegex3.search(&#34;My Phonenumber is 555-4224&#34;)
print(mo4.group())
```

```python
import re

agentNamesRegex = re.compile(r&#34;Agent (\w)\w*&#34;)
res = agentNamesRegex.sub(
    r&#34;\1****&#34;,
    &#34;Agent Alice told Agent Carol that Agent Eve knew Agent Bob was a double agent.&#34;,
)
print(res)
## 字符串中的\1 将由分组 1 匹配的文本所替代，也就是正则表达式的(\w)分组。
```

```python
## phoneAndEmail.py - Finds phone numbers and email addresses on the clipboard.
import pyperclip, re

phoneRegex = re.compile(
    r&#34;&#34;&#34;(
(\d{3}|\(\d{3}\))? ## area code
(\s|-|\.)? ## separator
(\d{3}) ## first 3 digits
(\s|-|\.) ## separator
(\d{4}) ## last 4 digits
(\s*(ext|x|ext.)\s*(\d{2,5}))? ## extension
)&#34;&#34;&#34;,
    re.VERBOSE,
)

emailRegex = re.compile(
    r&#34;&#34;&#34;(
[a-zA-Z0-9._%&#43;-]&#43; ## username
@ ## @ symbol
[a-zA-Z0-9.-]&#43; ## domain name
(\.[a-zA-Z]{2,4}) ## dot-something
)&#34;&#34;&#34;,
    re.VERBOSE,
)

text = str(pyperclip.paste())
## 从剪切板获取内容
matches = []
for groups in phoneRegex.findall(text):
    phoneNum = &#34;-&#34;.join([groups[1], groups[3], groups[5]])
    ## 用-连接各部分
if groups[8] != &#34;&#34;:
    phoneNum &#43;= &#34; x&#34; &#43; groups[8]
    matches.append(phoneNum)
for groups in emailRegex.findall(text):
    matches.append(groups[0])
    ## group[0]是匹配r&#39;&#39;中的所有东西

if len(matches) &gt; 0:
    pyperclip.copy(&#34;\n&#34;.join(matches))
    ## 以换行符为行分隔符复制到剪切板
    print(&#34;Copied to clipboard:&#34;)
    print(&#34;\n&#34;.join(matches))
else:
    print(&#34;No phone numbers or email addresses found.&#34;)
```

#### PIL(Pillow)模块的使用

##### 1.打开  显示  保存图片

png格式的图片保存为jpg格式时会报错是因为PNG和JPG的通道数不同

PNG:RGBA

JPG:RGB

所以，PNG格式图片要保存成JPG格式就要丢弃A通道

```python
from PIL import Image

image = Image.open(&#39;0.jpg&#39;)
#打开这张图片
image.show()
## 显示这张图片
image.save(&#39;1.jpg&#39;)
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

image = Image.open(&#39;0.jpg&#39;)
## image.show()
grey_image=image.convert(&#39;L&#39;)
grey_image.show()
grey_image.save(&#39;grey.jpg&#39;)
```

##### 3.通道的分离合并

彩色图像可以分离出 R、G、B 通道，但若是灰度图像，则返回灰度图像本身。

然后，可以将 R、G、B 通道按照一定的顺序再合并成彩色图像。

```python
from PIL import Image

image = Image.open(&#39;0.jpg&#39;)
r,g,b = image.split()
im = Image.merge(&#39;RGB&#39;,(b,g,r))
print(im)
```

##### 4.图片的裁剪、缩放、旋转和镜像

```python
from PIL import Image

img = Image.open(&#39;0.jpg&#39;)
## 获取图像尺寸
w,h = img.size
## 缩放50%
img.thumbnail((w//2,h//2))
img.show()
## 水平翻转图片
img1 = img.transpose(Image.FLIP_LEFT_RIGHT)
## 保存图片
img1.show()
img1.save(&#39;1.png&#39;)
#垂直翻转图片
img2 = img.rotate(180)
img2.show()
#水平&#43;垂直翻转图片
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

img = Image.open(&#39;0.jpg&#39;)
## 调用画图模块
draw = ImageDraw.Draw(img)
## 设置字体
tfont = ImageFont.truetype(&#34;arial.ttf&#34;,24)
## 添加文字
&#34;&#34;&#34;
    参数一：文字在图片的位置：(x, y)
    参数二：文字内容
    参数三：字体颜色，当然颜色也可以用RGB值指定
    参数四：字体类型
&#34;&#34;&#34;
draw.text((50,30),&#34;eyes&#43;&#43;&#34;,fill=&#34;red&#34;,font=tfont)
## 保存图片
img.save(&#34;addword.png&#34;)
img.show()
```

##### 6.PIL滤镜功能

```python
from PIL import Image,ImageFilter

img = Image.open(&#39;0.jpg&#39;)
img = img.filter(ImageFilter.CONTOUR)
img.save(&#39;filter.png&#39;)
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

img1 = Image.open(&#39;0.jpg&#39;)
img2 = Image.open(&#39;1.jpg&#39;)
#先查看图片尺寸
print(img1.size)
print(img2.size)
## 新建空白图片,三个参数分别是模式(RGB/RGBA) 大小 颜色
newimg = Image.new(mode=&#34;RGB&#34;,size=(3840,2160),color=(255,100,50))
## 拼接图片 第一个参数是图片 第二个参数是图片的位置
newimg.paste(img1,(0,0))
newimg.paste(img1,(1920,0))
newimg.show()
```

将小图片合成为大图片(二维码)

```python
from PIL import Image
import os

IMAGES_PATH = &#39;signal1\\&#39;  ## 图片集（文件夹）地址
IMAGES_FORMAT = [&#39;.png&#39;, &#39;.PNG&#39;]  ## 图片格式
IMAGE_WIDTH = 100  ## 每张小图片的宽
IMAGE_HEIGHT = 100  ## 每张小图片的高
IMAGE_ROW = 25  ## 大图片一共有几行
IMAGE_COLUMN = 25  ## 大图片一共有几列
## IMAGE_SAVE_PATH = &#39;final.jpg&#39;  ## 图片转换后的地址

newimg = Image.new(&#39;RGB&#39;,(IMAGE_COLUMN * IMAGE_HEIGHT, IMAGE_ROW * IMAGE_WIDTH))
## 新建一个2500x2500的图像
for y in range(25):
    for x in range(25):
        timg = Image.open(IMAGES_PATH &#43; str(y*IMAGE_COLUMN &#43; x) &#43; &#39;.png&#39;)
        ## 打开文件夹中的图片
        newimg.paste(timg, (x*IMAGE_WIDTH, y*IMAGE_HEIGHT))
        ## 将打开的图片粘贴到newimg的指定位置
newimg.save(&#39;new.png&#39;)
## 将图片保存new.png
```

##### 8.二进制数据转图片
```python
def bin2img(bin_data):
    imgname = &#34;tmp.png&#34;
    pixels = []
    img = Image.new(&#34;RGB&#34;,(50,50))
    for item in bin_data:
        if item ==&#39;0&#39;:
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
    new_img = Image.new(&#34;RGB&#34;,(500,500))
    
    for i in range(1,101):
        img = Image.open(f&#34;./final_out/{i}.png&#34;)
        img_list.append(img)
        
    for y in range(rows):
        for x in range(cols):
            idx = y * cols &#43; x
            img = img_list[idx]
            x_offset = x * 50
            y_offset = y * 50
            new_img.paste(img,(x_offset,y_offset))
            
    # new_img.show()
    new_img.save(&#34;flag.png&#34;)
```

例题2-2023SICTF-color
```python
import itertools
from PIL import Image

num = [0, 128, 255]
lis = list(itertools.product(num, repeat=3))
img = Image.open(&#34;./save.png&#34;)

# 创建一张灰度图，并设置图像的初始颜色为255（白色）
new_img = Image.new(&#34;L&#34;, size=(img.width, img.height), color=255)
# 创建一个 RGB 模式的图像
# new_img = Image.new(&#34;RGB&#34;, size=(img.width, img.height), color=(255, 255, 255))

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
    with open(&#34;hint.txt&#34;,&#34;r&#34;) as f:
        data = f.read()
    row_list = data.split()
    for idx,row in enumerate(row_list):
        # print(row)
        pixel_data = []
        img = Image.new(mode=&#34;RGB&#34;,size=(16,16))
        for bin_data in row:                
            if bin_data != &#39;0&#39;:
                pixel_data.append((255,255,255))
            else:
                pixel_data.append((0,0,0))
        img.putdata(pixel_data)
        img = img.resize((250,250)) # 调整一下图片大小，便于查看
        # img.show()
        img.save(f&#34;./out1/{idx}.png&#34;) 
```

#### puzipper模块的使用


##### 比赛中的使用记录

例题1-2024HITCTF邀请赛-BOMB
```python
import os
import pyzipper


def extract_zip(zip_file,passwd):
    if not os.path.exists(&#39;./tmp&#39;):
        os.mkdir(&#39;./tmp&#39;)
    with pyzipper.ZipFile(zip_file,&#34;r&#34;) as zip_ref:
        for zipinfo in zip_ref.filelist:
            if &#39;.txt&#39; not in zipinfo.filename:
                zip_ref.extract(zipinfo,&#39;./tmp&#39;,pwd=passwd.encode())
            else:
                # 提取压缩包中特定压缩大小的文件
                if zipinfo.compress_size &gt; 17:
                    zip_ref.extract(zipinfo,&#39;./tmp&#39;,pwd=passwd.encode())
    with open(&#34;./tmp/Password.txt&#34;,&#34;r&#34;) as f:
        passwd = f.read()
    os.remove(zip_file)
    os.system(&#34;mv ./tmp/*.zip .&#34;)
    return passwd

if __name__ == &#34;__main__&#34;:
    zip_file = &#34;nextlevel.zip&#34;
    passwd = &#34;Ll3zHsArHF&#34;
    cnt = 1
    while True:
        print(f&#34;[&#43;] 第{cnt}层的密码是：{passwd}&#34;)
        passwd = extract_zip(zip_file,passwd)
        cnt &#43;= 1
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


#### CSV模块的使用

```python
## -*- encoding: gbk -*-
import os
import csv

with open(&#34;xiaoshuaib.csv&#34;, mode=&#34;w&#34;, encoding=&#34;gbk&#34;) as csv_file:
    fieldnames = [&#34;你是谁&#34;, &#34;你几岁&#34;, &#34;你多高&#34;]
    writer = csv.DictWriter(csv_file, fieldnames)

    writer.writeheader()
    writer.writerow({&#34;你是谁&#34;: &#34;小帅b&#34;, &#34;你几岁&#34;: &#34;18岁&#34;, &#34;你多高&#34;: &#34;18cm&#34;})
    writer.writerow({&#34;你是谁&#34;: &#34;小帅c&#34;, &#34;你几岁&#34;: &#34;19岁&#34;, &#34;你多高&#34;: &#34;17cm&#34;})
    writer.writerow({&#34;你是谁&#34;: &#34;小帅d&#34;, &#34;你几岁&#34;: &#34;20岁&#34;, &#34;你多高&#34;: &#34;16cm&#34;})
```

##### 比赛中使用的例子

例1-2024浙江省赛初赛-ds-encode

```python
import csv

data_list = []
res_list = []

# 读取csv文件
with open(&#34;data.csv&#34;, &#34;r&#34;, encoding=&#39;utf-8&#39;) as f:
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
with open(&#39;data1.csv&#39;,&#34;w&#34;,newline=&#39;&#39;,encoding=&#39;utf-8&#39;) as f:
    writer = csv.writer(f)
    writer.writerows(res_list)
```
#### pandas模块的使用

```python
## -*- encoding: gbk -*-
import os
import pandas

xiaoshuaib = pandas.read_csv(&#34;xiaoshuaib.csv&#34;, encoding=&#34;gbk&#34;)
print(xiaoshuaib)
```

```python
import pandas as pd

b = [&#34;xiaoshuaib&#34;, &#34;xiaoshuaic&#34;, &#34;xiaoshuaid&#34;]
c = [&#34;18&#34;, &#34;19&#34;, &#34;20&#34;]
d = [&#34;18&#34;, &#34;17&#34;, &#34;16&#34;]

df = pd.DataFrame({&#34;你是谁&#34;: b, &#34;你几岁&#34;: c, &#34;你多高&#34;: d})
df.to_csv(&#34;xsb.csv&#34;, index=False, sep=&#34;,&#34;)
```

```python
#这个代码有点问题
import pandas as pd

obj = pd.Series([40, 12, -3, 25])
## print(obj)
## print(obj[0])
## print(obj.index)
## print(obj.values)
obj1 = pd.Series([40, 12, -3, 25], index=[&#34;a&#34;, &#34;b&#34;, &#34;c&#34;, &#34;d&#34;])
## print(obj1)
## print(obj1[&#34;c&#34;])
## print(obj1[obj1 &gt; 15])
## a    40
## d    25
## abcd是索引，25、40是值，这里打印的是值大于15的obj中的元素
## print(obj.describe())  ## 查看obj中的count、mean、std、min、max、25%、50%、75%
dic = obj.to_dict()  ## Series可以转换为字典
## print(dic)
d = {
    &#34;one&#34;: pd.Series(
        [
            1.0,
            2.0,
            3.0,
        ],
        index=[
            &#34;a&#34;,
            &#34;b&#34;,
            &#34;c&#34;,
        ],
    ),
    &#34;two&#34;: pd.Series([1.0, 2.0, 3.0, 4.0], index=[&#34;a&#34;, &#34;b&#34;, &#34;c&#34;, &#34;d&#34;]),
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

arr6 = np.array([&#34;量&#34;, &#34;话&#34;])
## print(arr6.dtype)  ## &lt;U1 是unicode数据类型
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
print(npr.rand(3, 2) * 2 &#43; 2)  ## 随机区间转化为[2，4）
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
ax1.set_title(&#34;rard&#34;)
ax1.set_ylabel(&#34;frequency&#34;)
ax1.grid(True)
ax2.hist(rn2, bins=25)
ax2.set_title(&#34;rardn&#34;)
ax2.grid(True)
ax3.hist(rn3, bins=25)
ax3.set_title(&#34;rardint&#34;)
ax3.set_ylabel(&#34;frequency&#34;)
ax3.grid(True)
ax4.hist(rn4, bins=25)
ax4.set_title(&#34;choice&#34;)
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
    res = &#34;&#34;
    frames_cnt = 1
    while True: 
        # 读取视频的下一帧，并返回布尔值和当前帧的图像数据
        ret, frame = cap.read()
        # print(frame[0][0][0])
        if(frames_cnt == 5):# 经过尝试发现flag就藏在每个视频的第 5 帧中
            # 自动计算行数，待转换的列数为3，并取出前225个像素R通道的值
            pixels = frame.reshape((-1,3))[:224][:,0]
            for i in range(len(pixels)):
                if pixels[i] &gt; 200:
                    pixels[i] = 1
                else:
                    pixels[i] = 0
            res = decode_pixel(pixels)
            break
        frames_cnt &#43;= 1
    return res

```

读取视频黑白帧转二进制

```python
import cv2
import libnum


cap = cv2.VideoCapture(&#39;s4cret.mov&#39;)
frame_count = 0
res = &#39;&#39;

while True:
    ret, frame = cap.read()
    if not ret:
        break
    pixel = frame.reshape((-1,3)) # 将像素化为3列n行的格式
    r = pixel[0][0] # 获取第一个像素r通道的数值
    if r &gt; 200:
        res &#43;= &#39;0&#39;
    else:
        res &#43;= &#39;1&#39;
cap.release()

# print(libnum.b2s(res))
lenth = len(res) # 259
res &#43;= (8 - (lenth % 8)) * &#39;0&#39;
print(libnum.b2s(res))
# b&#39;the flag3 is -13891ba324da}\xff\xff\xff\xff\xff\xe0&#39;
```

#### wave模块的使用

TODO...

#### librosa模块的使用

##### 比赛中的使用记录

例题1-2024极客大挑战-音乐大师

```python
import librosa
import libnum

res = []
flag = &#34;&#34;
table = {&#39;19&#39;:&#34;01&#34;,&#34;9&#34;:&#34;00&#34;,&#34;39&#34;:&#34;11&#34;,&#34;29&#34;:&#34;10&#34;}
# 使用文件原始采样率获取音频数据和采样率
data1,sr1 = librosa.load(&#34;secret.wav&#34;,sr=None,dtype=&#34;float32&#34;)
data2,sr2 = librosa.load(&#34;1.wav&#34;,sr=None,dtype=&#34;float32&#34;)

for i in range(148):
    res.append(str(int((data1[i]-data2[i])*1e7)))

for item in res:
    flag &#43;= table[item]

print(libnum.b2s(flag))
# b&#39;SYC{wav_LSB_but_You_can_get_M3_Coll!}&#39;
```

#### scipy模块的使用

TODO...


#### turtle模块的使用

```python
## 画太极图
from turtle import *


def rset():
    pensize(1)  ## 设置画笔大小为1px
    pencolor(&#39;black&#39;)  ## 设置画笔颜色为黑色
    penup()  ## 提起画笔
    home()  ## 将画笔移动到屏幕中心
    pendown()  ## 放下画笔


def offset(off_set, angle=0, mode=&#39;taiji&#39;):
    ## 设置画笔偏移量。该函数用于设置画笔开始绘图的位置。
    ## off_set太极时为大圆半径，八卦时要大于半径，否则会与太极重合。
    ## angle：当画八卦时用于旋转特定角度。
    penup()
    home()  ## 回到原点，朝向东
    if mode == &#39;taiji&#39;:  ## 太极模式
        right(90)  ## 向右旋转90度，使画笔指向南方。
        fd(off_set)
        seth(0)  ## 朝向东
    pendown()


## 绘制太极函数
## radius：太极的大圆半径。
## pen_size：画笔大小，默认为2像素。
## color：画笔颜色，默认为黑色。
def taiji(radius, pen_size=2, color=&#39;black&#39;):
    rset()  ## 初始化画笔
    pensize(pen_size)
    pencolor(color)
    offset(radius)  ## 画笔偏移至起始点
    fillcolor(&#39;black&#39;)  ## 填充颜色
    begin_fill()  ## 开始填充
    circle(radius, 180)  ## 画大圆的半圆
    circle(radius / 2, 180)  ## 画s型
    circle(-radius / 2, 180)  ## 反向画s型
    end_fill()  ## 结束填充
    circle(-radius, 180)  ## 画大圆的另一半圆，且不用填充
    ## 上面小圆
    begin_fill()
    fillcolor(&#39;white&#39;)
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
    fillcolor(&#39;black&#39;)
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
    colors = [&#34;blue&#34;, &#34;black&#34;, &#34;red&#34;, &#34;yellow&#34;, &#34;green&#34;]
    ## 上面三个环的间距是2*70，下面两个环相对于上面的环稍微向右移动了35
    positions = [(-3*35, 0), (-1*35, 0), (1*35, 0),
                 (-2*35, -60), (0, -60)]

    for i in range(5):
        goto(positions[i])  ## 使用预设的位置
        draw_ring(50, colors[i])


if __name__ == &#34;__main__&#34;:
    draw_olympic_rings()
    done()
```



#### struct模块的使用

```python
import struct

def display_binary(data):
    #将字节数据转化为十六进制表示形式
    ## return &#39; &#39;.join([&#39;{:02x}&#39;.format(byte) for byte in data])
    return &#39; &#39;.join([f&#34;{byte:02x}&#34; for byte in data])

## 定义要打包的数据
int_data = 10240099
float_data = 123.456

## 使用默认端序（小端序）打包
packed_int_little = struct.pack(&#39;I&#39;, int_data)
packed_float_little = struct.pack(&#39;f&#39;, float_data)

## 使用大端序打包
packed_int_big = struct.pack(&#39;&gt;I&#39;, int_data)
packed_float_big = struct.pack(&#39;&gt;f&#39;, float_data)

## 打印打包的结果,display_binary()是以十六进制的形式显示
print(&#34;Packed data (Little Endian):&#34;)
print(packed_int_little)
print(&#34;Int:&#34;, display_binary(packed_int_little))
print(packed_float_little)
print(&#34;Float:&#34;, display_binary(packed_float_little))

print(&#34;\nPacked data (Big Endian):&#34;)
print(packed_int_big)
print(&#34;Int:&#34;, display_binary(packed_int_big))
print(packed_float_big)
print(&#34;Float:&#34;, display_binary(packed_float_big))

## 解包数据,由于返回的是一个元组，所以需要[0]
unpacked_int_little = struct.unpack(&#39;I&#39;, packed_int_little)[0]
unpacked_float_little = struct.unpack(&#39;f&#39;, packed_float_little)[0]

unpacked_int_big = struct.unpack(&#39;&gt;I&#39;, packed_int_big)[0]
unpacked_float_big = struct.unpack(&#39;&gt;f&#39;, packed_float_big)[0]

## 打印解包的结果
print(&#34;\nUnpacked data (Little Endian):&#34;)
print(&#34;Int:&#34;, unpacked_int_little)
print(&#34;Float:&#34;, unpacked_float_little)

print(&#34;\nUnpacked data (Big Endian):&#34;)
print(&#34;Int:&#34;, unpacked_int_big)
print(&#34;Float:&#34;, unpacked_float_big)

## 验证打包和解包是否保持数据的完整性(float类型的数据先打包再解包后可能会有误差)
assert int_data == unpacked_int_little
## assert float_data == unpacked_float_little

assert int_data == unpacked_int_big
## assert float_data == unpacked_float_big

print(&#34;\nData integrity maintained!&#34;)
```

#### time模块的使用

```python
## -*- encoding: utf-8 -*-
&#39;&#39;&#39;
@File    :   time.py
@Time    :   2022/11/14 17:55:10
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
&#39;&#39;&#39;
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
#把一个表示时间的元组或者struct_time表示为这种形式：&#39;Sun Jun 20 23:21:05 1993&#39;
print(time.ctime())
## 把一个时间戳（按秒计算的浮点数）转化为time.asctime()的形式

## time.strptime(string[, format])：把一个格式化时间字符串转化为struct_time。实际上它和strftime()是逆操作
print(time.strptime(&#39;2011-05-05 16:37:06&#39;, &#39;%Y-%m-%d %X&#39;))
```

#### datetime模块的使用

```python
import datetime

today_date = datetime.date.today()
## 今天的日期
print(today_date)
print(datetime.datetime(2012, 1, 1))
start_time = datetime.datetime(2012, 1, 1)
print(start_time &#43; datetime.timedelta(0))
## datetime.timedelta()常用于日期的加减
print(start_time &#43; datetime.timedelta(-1))
print(start_time.strftime(&#34;%Y-%m-%d&#34;))
## .strftime()用于日期格式的转换
print(start_time.strftime(&#34;%Y%m%d&#34;))
```

#### Urllib模块使用

```python
from urllib import request, parse
import ssl

import requests

## 使用ssl未经验证的上下文
context = ssl._create_unverified_context()
url = &#39;https://biihu.cc//account/ajax/login_process/&#39;
headers = {
    ## 假装自己是浏览器
    &#39;User-Agent&#39;: &#39;Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 &#39;
                  &#39;Safari/537.36&#39;,
}
dict = {
    ## 定义请求参数
    &#39;return_url&#39;: &#39;https://biihu.cc/&#39;,
    &#39;user_name&#39;: &#39;xiaoshuaib@gmail.com&#39;,
    &#39;password&#39;: &#39;123456789&#39;,
    &#39;_post_type&#39;: &#39;ajax&#39;,
}
## 把请求参数转化为byte
data = bytes(parse.urlencode(dict), &#39;utf-8&#39;)
## response = urllib.request.urlopen(&#39;http://www.baidu.com&#39;)
## 封装request
req = requests.Request(url,data=data,headers=headers,method=&#39;POST&#39;)
#最后进行请求
response = request.urlopen(req,context=context)
print(response.read().decode(&#39;utf-8&#39;))
&#34;&#34;&#34;urllib.request.urlopen(url, data=None, [timeout, ]*)
data是给post请求携带参数的，timeout是设置请求超时时间&#34;&#34;&#34;
## print(response.read().decode(&#39;utf-8&#39;))
&#34;&#34;&#34;urllib.request.Request(url, data=None, headers={}, method=None)
## urlopen 默认是 Get 请求，当我们传入参数它就为 Post 请求了
## 而 Request 可以让我们自己定义请求的方式&#34;&#34;&#34;
```

#### requests模块的使用

##### 使用python脚本发送HTTP请求

**requests支持的请求协议有GET POST PUT...**

```python
#GET请求带参数使用params，POST请求带参数使用data
import requests
rep=requests.get(&#34;http://111.200.241.244:62607&#34;)
rep=requests.post(&#34;http://111.200.241.244:62607&#34;,params={&#34;a&#34;:&#34;1&#34;},data={&#34;b&#34;:&#34;2&#34;})
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
url = &#34;https://www.baidu.com&#34;
r = requests.get(url=url)
print(r.url)
print(r.status_code)

#有参数传递的GET请求
import requests
url = &#34;http://127.0.0.1/index.php&#34;
payload={&#39;username&#39;:&#39;admin&#39;,&#39;password&#39;:&#39;admin&#39;,&#39;submit&#39;:&#39;登录&#39;}
r = requests.get(url,params=payload)
result = r.content
if str(result).find(&#39;succ&#39;):
    #在返回报文中找到succ字符时：
    print(&#34;admin:admin&#34;&#43;&#39;successful&#39;)
#但是实际情况下，一般都是通过读取字典文件来获取用户名和密码
 
#有参数传递的POST请求
import requests
url = &#34;http://127.0.0.1/index.php&#34;
data = {&#39;username&#39;:&#39;admin&#39;, &#39;password&#39;:&#39;admin&#39;, &#39;submit&#39;:&#39;登录&#39;}
r = requests.post(url, data=data)
print(r.status_code)
if r.text.find(&#39;succ&#39;):
    print(&#39;admin:admin&#39; &#43; &#39;successful&#39;)
 
#自定义请求头
import requests
url = &#34;http://127.0.0.1/index.php&#34;
headers = {&#34;User-Agent&#34;:&#34;HAHA&#34;}
r1 = requests.get(url)
print(r1.request.headers)
r = requests.get(url, headers=headers)
print(r.request.headers)

#HTTP代理和BP截断
import requests
url = &#34;https://www.baidu.com&#34;
#kali的ip:192.168.1.101
proxies = {&#39;http&#39;:&#39;http://192.168.100.9:8080&#39;, &#39;https&#39;:&#39;https://192.168.100.9:8080&#39;}
r = requests.get(url, proxies=proxies, verify=False)
#verify=False不进行证书合法性的验证
print(r.status_code)  
 
#Python IIS PUT漏洞探测工具
import requests
url = &#34;http://192.168.0.107&#34;
r = requests.options(url)
## print(r.headers)       
## print(r.headers[&#34;Allow&#34;])
## print(r.headers[&#34;Public&#34;])
result = r.headers[&#39;Public&#39;]
## print(type(result))
if result.find(&#34;PUT&#34;) and result.find(&#34;MOVE&#34;):
    print(result)
    print(&#34;exist IIS put vul&#34;)
else:
    print(&#34;not exist&#34;)
 
#获取HTTP服务器信息
import requests
url = &#34;http://192.168.0.107&#34;
r = requests.get(url)
print(r.headers)
print(&#34;服务器中间件为：&#34;&#43;r.headers[&#39;Server&#39;])
print(&#34;服务器脚本语言为：&#34;&#43;r.headers[&#39;X-Powered-By&#39;])
 
#Python漏洞检测工具
import requests
url = &#34;http://192.168.0.107&#34;
r = requests.get(url)
## print(r.headers)
## print(r.headers[&#39;Server&#39;])
remote_server = r.headers[&#39;Server&#39;]
print(remote_server)
print(type(remote_server))
if remote_server.find(&#34;IIS/7.5&#34;) or remote_server(&#34;IIS/8.0&#34;):
    payload = {}
    r1 = requests.get(url,headers=headers)
    print(r1.requests.headers)
    print(r1.content)
    if str(r1.content).find(&#34;Requested Range Not Satisfiable&#34;):
        print(url&#43;&#34;exist vuln ms15-034&#34;)
    else:
        print(url&#43;&#34;not exist vuln ms15-034&#34;)
    #开始探测
else:
    print(&#34;Server not a iis 7.5 or iis 8.0&#34;)
```

##### 使用session发送请求

```python
import requests
from fake_useragent import UserAgent

session = requests.session()
ua = UserAgent()
headers = {
    ## 使用随机的UA头
    &#39;user-agent&#39;: ua.random
}
url = &#34;http://www.baidu.com&#34;
response = session.get(url=url,headers=headers)
print(response.status_code)
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
    &#39;user-agent&#39;: random_UA
}
proxy = &#39;127.0.0.1:7890&#39;
port = proxy.split(&#39;:&#39;)[1]
proxy = proxy.split(&#39;:&#39;)[0]
## print(proxy,port)
proxies = {
    &#34;http&#34;:f&#34;http://{proxy}:{port}&#34;,
    &#34;https&#34;:f&#34;http://{proxy}:{port}&#34;
}

if __name__ == &#34;__main__&#34;:
    url = &#34;https://www.baidu.com&#34;
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
    ## print(responese.html.xpath(&#39;//li[@class=&#34;hotsearch-item odd&#34;]/a&#39;))
    ## print(responese.html.xpath(&#39;//li[@class=&#34;hotsearch-item odd&#34;]/a&#39;, first=True).text)
    ## 使用CSS选择器(find方法)
    print(responese.html.find(&#39;a.mnav&#39;))
    print(responese.html.find(&#39;a.mnav&#39;, first=True).text)
```

##### 例子

**爬取简书用户的文章**

```python
from requests_html import HTMLSession
from fake_useragent import UserAgent

random_UA = UserAgent().random
## print(random_UA)
headers = {
    &#39;user-agent&#39;: random_UA
}
proxy = &#39;127.0.0.1:7890&#39;
port = proxy.split(&#39;:&#39;)[1]
proxy = proxy.split(&#39;:&#39;)[0]
## print(proxy,port)
proxies = {
    &#34;http&#34;:f&#34;http://{proxy}:{port}&#34;,
    &#34;https&#34;:f&#34;http://{proxy}:{port}&#34;
}

if __name__ == &#34;__main__&#34;:
    url = &#34;https://www.jianshu.com/u/7753478e1554&#34;
    ## 获取实例化session对象
    session = HTMLSession()
    responese = session.get(url=url,headers=headers,proxies=proxies)
    responese.html.render(scrolldown=50,sleep=.2)
    titles = responese.html.find(&#39;a.title&#39;)
    for i ,title in enumerate(titles):
        print(f&#34;[&#43;]{i&#43;1}[{title.text}](https://www.jianshu.com/u/7753478e1554{title.attrs[&#39;href&#39;]})&#34;)
```

#### optparse模块的使用

```python
#optparse模块的使用
from email import parser
from email.parser import Parser
import optparse
 
parser = optparse.OptionParser()#初始化
parser.usage = &#34;command_args.py -u user_file&#34;
parser.add_option(&#34;-u&#34;, &#34;--user_file&#34;, help=&#34;read username from file&#34;, action=&#34;store&#34;, type=&#34;string&#34;, metavar=&#34;FILE&#34;, dest=&#34;username_file&#34;)
(option, args)=parser.parse_args()
print(options.username_file)

#Web密码破解命令行读取模板编写（username password url threads）
from email import parser
from email.parser import Parser
from yaml import parse
import optparse

parser = optparse.OptionParser()
parser.usage = &#34;web_brute_command.py -s url -u user_file -p -pass_file -t num&#34;
parser.add_option(&#34;-s&#34;, &#34;--site&#34;, dest=&#34;website&#34;, help=&#34;website to test&#34;, action=&#34;store&#34;, type=&#34;string&#34;, metavar=&#34;URL&#34;)
parser.add_option(&#34;-u&#34;, &#34;--userfile&#34;, dest=&#34;userfile&#34;, help=&#34;username from file&#34;, action=&#34;store&#34;, type=&#34;string&#34;, metavar=&#34;USERFILE&#34;)
parser.add_option(&#34;-p&#34;, &#34;--passfile&#34;, dest=&#34;passfile&#34;, help=&#34;password from file&#34;, action=&#34;store&#34;, type=&#34;string&#34;, metavar=&#34;PASSFILE&#34;)
parser.add_option(&#34;-t&#34;, &#34;--threads&#34;, dest=&#34;threads&#34;, help=&#34;number of threads&#34;, actions=&#34;store&#34;, type=&#34;int&#34;, metavar=&#34;THREADS&#34;)
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
wb = xlwt.Workbook(encoding=&#34;utf-8&#34;)
## 2。创建worksheet
ws = wb.add_sheet(&#34;test_sheet&#34;)
## 3.写入第一行内容
## ws.write(a,b,c)    a:行 b:列 c:内容
ws.write(0, 0, &#34;球队&#34;)
ws.write(0, 1, &#34;号码&#34;)
ws.write(0, 2, &#34;姓名&#34;)
ws.write(0, 3, &#34;位置&#34;)

wb.save(&#34;myExcel.xls&#34;)
```

```python
import xlwt

data = [
    {&#34;Team&#34;: &#34;湖人&#34;, &#34;Number&#34;: &#34;34&#34;, &#34;Name&#34;: &#34;奥尼尔&#34;, &#34;Positions&#34;: &#34;中锋&#34;},
    {&#34;Team&#34;: &#34;湖人&#34;, &#34;Number&#34;: &#34;24&#34;, &#34;Name&#34;: &#34;科比&#34;, &#34;Positions&#34;: &#34;后卫&#34;},
    {&#34;Team&#34;: &#34;湖人&#34;, &#34;Number&#34;: &#34;23&#34;, &#34;Name&#34;: &#34;詹姆斯&#34;, &#34;Positions&#34;: &#34;前锋&#34;},
]

wb = xlwt.Workbook()
ws = wb.add_sheet(&#34;test_sheet&#34;)
for i, item in enumerate(data):
    ## enumerate()函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在for 循环当中
    ws.write(i &#43; 1, 0, item[&#34;Team&#34;])
    ws.write(i &#43; 1, 1, item[&#34;Number&#34;])
    ws.write(i &#43; 1, 2, item[&#34;Name&#34;])
    ws.write(i &#43; 1, 3, item[&#34;Positions&#34;])

    wb.save(&#34;myExcel1.xls&#34;)
```

#### xlsxwriter模块的使用

```python
def write2xlsx(data,filename):
    workbook = xw.Workbook(filename)
    worksheet1 = workbook.add_worksheet(&#34;sheet1&#34;)
    ## 激活子表
    worksheet1.activate()
    title = [&#39;Url&#39;,&#39;Title&#39;]
    worksheet1.write_row(&#39;A1&#39;,title)
    i=2
    for j in range(len(data)):
        insertdata = [data[j][&#34;url&#34;],data[j][&#34;title&#34;]]
        row = &#39;A&#39;&#43;str(i)
        worksheet1.write_row(row,insertdata)
        i&#43;=1
    workbook.close()
```

#### json模块的简单使用

```python
import json

jsondata = &#34;&#34;&#34;
{
&#34;Uin&#34;:0,
&#34;UserName&#34;:&#34;@c482d142bc698bc3971d9f8c26335c5c&#34;,
&#34;NickName&#34;:&#34;小帅b&#34;,
&#34;HeadImgUrl&#34;:&#34;/cgi-bin/mmwebwx-bin/webwxgeticon?seq=500080&amp;username=@c482d142bc698bc3971d9f8c26335c5c&amp;skey=@crypt_b0f5e54e_b80a5e6dffebd14896dc9c72049712bf&#34;,
&#34;ContactFlag&#34;:3,
&#34;MemberCount&#34;:0,
&#34;MemberList&#34;:[

],
&#34;RemarkName&#34;:&#34;&#34;,
&#34;HideInputBarFlag&#34;:0,
&#34;Sex&#34;:1,
&#34;Signature&#34;:&#34;&#34;,
&#34;VerifyFlag&#34;:0,
&#34;OwnerUin&#34;:0,
&#34;PYInitial&#34;:&#34;XSB&#34;,
&#34;PYQuanPin&#34;:&#34;xiaoshuaib&#34;,
&#34;RemarkPYInitial&#34;:&#34;&#34;,
&#34;RemarkPYQuanPin&#34;:&#34;&#34;,
&#34;StarFriend&#34;:0,
&#34;AppAccountFlag&#34;:0,
&#34;Statues&#34;:0,
&#34;AttrStatus&#34;:98491,
&#34;Province&#34;:&#34;广东&#34;,
&#34;City&#34;:&#34;广州&#34;,
&#34;Alias&#34;:&#34;&#34;,
&#34;SnsFlag&#34;:48,
&#34;UniFriend&#34;:0,
&#34;DisplayName&#34;:&#34;&#34;,
&#34;ChatRoomId&#34;:0,
&#34;KeyWord&#34;:&#34;che&#34;,
&#34;EncryChatRoomId&#34;:&#34;&#34;,
&#34;IsOwner&#34;:0
}
&#34;&#34;&#34;

myfriend = json.loads(jsondata)
## json.load() 和 json.loads() 区别：
## loads() 传的是json字符串，而 load() 传的是文件对象
## 使用 loads() 时需要先读取文件在使用，而 load() 则不用
print(myfriend)
NickName = myfriend.get(&#34;NickName&#34;)
print(NickName)
```

```python
import json

jsondata = &#34;&#34;&#34;{
&#34;MemberList&#34;:[
{
&#34;UserName&#34;:&#34;小帅b&#34;,
&#34;sex&#34;:&#34;男&#34;
},
{
&#34;UserName&#34;:&#34;小帅b的1号女朋友&#34;,
&#34;sex&#34;:&#34;女&#34;
},
{
&#34;UserName&#34;:&#34;小帅b的2号女朋友&#34;,
&#34;sex&#34;:&#34;女&#34;
}
]
}&#34;&#34;&#34;
myfriend = json.loads(jsondata)
## print(myfriend)
memberList = myfriend.get(&#34;MemberList&#34;)
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
print(&#34;method 1:&#34;)
print(rv_beta)

np.random.seed(seed=2015)
beta = stats.beta(a=4, b=2)
print(&#34;method 2:&#34;)
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
-高并发&#43;高扩展性&#43;低成本，一个CPU支特上万的协程不是问题，一很适合用于高并发处理

##### 协程缺点：

-无法利用多核资源。协程的本质是单线程，不能同时将单个CPU的多个核用上，协程需要进程配合才能运行在多CPU上。（不过我们日常编程不会有这个问题，除非是CPU密集型应用)
-进行阻塞操作（如IO时)会阻塞掉整个程序

##### 生成器的学习

```python
def func():
    print(&#34;这是一个生成器函数...&#34;)
    while True:
        ## Cpython遇到yield关键字会暂停，下一次运行的时候会接着上一次运行的位置继续运行
        yield &#34;这是生成器函数返回的数据...&#34;

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
        print(&#34;这是func_a函数&#34;)
        yield 
        time.sleep(0.5) ## 让程序进行休眠

def func_b(obj):
    while True:
        print(&#34;这是func_b函数&#34;)
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
print(f&#34;[&#43;]同步程序所花费的时间为{now()-start}&#34;)
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
    
print(f&#34;[&#43;]异步程序所花费的时间为{now()-start}&#34;)
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
        print(&#34;我是协程任务1...&#34;)
        await asyncio.sleep(1)
        
## 协程任务1
async def work_2():
    for _ in range(5):
        print(&#34;我是协程任务2...&#34;)
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
&#34;&#34;&#34;
1.需要使用asyncio创建事件循环对象
2.使用事件循环对象执行多个协程任务
&#34;&#34;&#34;
## 使用python3.7以上版本语法运行多个任务
asyncio.run(asyncio.wait(tasks))
```

协程

```
通过async关键字装饰的程序是一个协程函数。若一个协程函数后存在()，则会返回一个协程对象。
```

```python
## 快速上手.py
&#34;&#34;&#34;
协程函数
    使用async关键字定义的函数
协程对象
    协程函数()会返回一个协程对象，可以使用事件循环去调度协程对象
&#34;&#34;&#34;
import asyncio
async def work():
    print(&#34;运行协程任务...&#34;)
    
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
    print(&#34;协程任务启动...&#34;)
    await asyncio.sleep(2)
    print(&#34;协程任务完成...&#34;)
    return &#34;这是当前协程任务的返回值...&#34;

async def main():
    print(&#34;正在执行协程任务函数: other...&#34;)
    task1 = asyncio.create_task(other())
    #提交任务到事件循环
    task2 = asyncio.create_task(other())
    res_1 = await task1
    res_2 = await task2
    print(f&#34;当前任务的返回值为: {res_1}&#34;)
    print(f&#34;当前任务的返回值为: {res_2}&#34;)

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
&#34;&#34;&#34;
await可以获取到可等待对象的返回值
    当事件循环遇到await关键字之后会调度其他任务
协程对象
future对象
task对象
&#34;&#34;&#34;
import asyncio

async def work():
    ## 模拟耗时任务
    await asyncio.sleep(1)
    return &#34;这是一个协程任务&#34;

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
    print(&#34;协程任务启动...&#34;)
    await asyncio.sleep(2)
    print(&#34;协程任务完成...&#34;)
    return &#34;这是当前协程任务的返回值...&#34;

async def main():
    print(&#34;正在执行协程任务函数: other...&#34;)
    ## 当前程序是一个同步任务,await遇到耗时任务会阻塞主程序代码
    res_1 = await other()
    ## await拿到任务返回值后才会解阻塞
    ## await用来等待任务的返回结果的，不是用来进行异步任务并发的
    ## 任务的并发要用到task对象
    res_2 = await other()
    print(f&#34;当前任务的返回值为: {res_1}&#34;)
    print(f&#34;当前任务的返回值为: {res_2}&#34;)

asyncio.run(main())
```

##### 协程并发

```python
## 协程并发
import asyncio

async def work(x):
    print(f&#34;当前接受的参数为:{x}&#34;)
    ## 模拟一个耗时任务
    await asyncio.sleep(x)
    return f&#34;当前任务的返回值为:{x}&#34;

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

url = &#39;http://www.example.com&#39;
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

if __name__ == &#34;__main__&#34;:
    asyncio.run(main())
```

```python
import aiohttp
import asyncio
import json

async def main():
    async with aiohttp.ClientSession() as session:
        ## 发送get请求
        async with session.get(&#39;&lt;https://www.example.com&gt;&#39;) as resp:
            print(await resp.text())
        ## 发送post请求
        async with session.post(&#39;&lt;https://www.example.com&gt;&#39;, json={&#39;key&#39;: &#39;value&#39;}) as resp:
            print(await resp.text())
        ## 发送put请求
        async with session.put(&#39;&lt;https://www.example.com&gt;&#39;, json={&#39;key&#39;: &#39;value&#39;}) as resp:
            print(await resp.text())
        ## 发送delete请求
        async with session.delete(&#39;&lt;https://www.example.com&gt;&#39;, json={&#39;key&#39;: &#39;value&#39;}) as resp:
            print(await resp.text())

asyncio.run(main())
```

```python
import aiohttp
import asyncio

urls = [
    &#34;https://images.pexels.com/photos/17743151/pexels-photo-17743151.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2&#34;,
    &#34;https://images.pexels.com/photos/17742455/pexels-photo-17742455.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2&#34;,
    &#34;https://images.pexels.com/photos/17820682/pexels-photo-17820682.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600&amp;lazy=load&#34;
]

async def aiodownload(url):
    name = url.split(&#39;?&#39;)[0].rsplit(&#34;/&#34;,1)[1]
    #这里rsplit是指从右边开始切一次，取第二个元素
    print(name)
    ## 发送请求
    ## 写了with后，就有了上下文管理器，运行完后会自动关闭session
    async with aiohttp.ClientSession() as session:
        ## 得到图片数据
        async with session.get(url=url) as response:
        ## 保存到文件
            with open(name,mode=&#39;wb&#39;) as f:
                ## 读取内容是异步的，因此需要await
                f.write(await response.content.read())
    print(&#34;[&#43;]任务结束&#34;)


async def main():
    tasks = []
    for url in urls:
        tasks.append(aiodownload(url))        
    await asyncio.gather(*tasks)


if __name__ == &#34;__main__&#34;:
    asyncio.run(main())
```

#### subprocess模块的使用

##### Windows下执行命令

```python
import subprocess
with open(&#39;output.txt&#39;,&#39;w&#39;) as f:
    p = subprocess.run([&#39;dir&#39;],shell=True,capture_output=True,text=True)
print(p.args)
print(p.stdout)
```

```python
import subprocess
with open(&#39;output.txt&#39;,&#39;w&#39;) as f:
    p = subprocess.run([&#39;dir&#39;],shell=True,stdout=f,text=True)
```

```python
import subprocess
option = &#39;--help&#39;
p = subprocess.run([&#39;ciphey&#39;,option],shell=True,capture_output=True,text=True)
## p = subprocess.run([&#39;.\shentou.rdp&#39;],shell=True,capture_output=True,text=True)
print(p.args)
print(p.stdout)
```

#### pydocx库的使用

```python
from docx import Document

def GenerateNewWord(filename):
    document = Document()
    document.save(filename)

if __name__ == &#34;__main__&#34;:
    newname = &#34;114514.docx&#34;
    GenerateNewWord(newname)
```

#### colorama模块的使用

```python
from colorama import Fore, Back, Style, init

## 初始化colorama
init(autoreset=True)

print(Fore.BLUE &#43; &#39;蓝色文字&#39;)
print(Back.BLACK &#43; Fore.LIGHTGREEN_EX&#43; &#39;黑底绿字&#39;)
print(Style.BRIGHT &#43; &#39;这是明亮的文字&#39;)

## 由于设置了 autoreset=True，所以每次输出后颜色都会重置，所以下面的文本将会是默认的颜色
print(&#39;这是普通文本&#39;)
```

#### prettytable模块的使用

```python
from prettytable import PrettyTable
x = PrettyTable([&#34;姓名&#34;, &#34;性别&#34;, &#34;年龄&#34;, &#34;存款&#34;])
x.add_row([&#34;赵一&#34;,&#34;男&#34;, 20, 100000])
x.add_row([&#34;钱二&#34;,&#34;男&#34;, 21, 500])
x.add_row([&#34;孙三&#34;, &#34;男&#34;, 22, 400.7])
x.add_row([&#34;李四&#34;, &#34;男&#34;, 23, 619.5])
x.add_row([&#34;周五&#34;, &#34;男&#34;, 24, 1214.8])
x.add_row([&#34;吴六&#34;, &#34;女&#34;, 25, 646.9])
x.add_row([&#34;郑七&#34;, &#34;女&#34;, 26, 869.4])
x.add_row([&#34;王七加一&#34;, &#34;男&#34;, 21, 869.4])
print(x)
&#34;&#34;&#34;
&#43;----------&#43;------&#43;------&#43;--------&#43;
|   姓名   | 性别 | 年龄 |  存款  |
&#43;----------&#43;------&#43;------&#43;--------&#43;
|   赵一   |  男  |  20  | 100000 |
|   钱二   |  男  |  21  |  500   |
|   孙三   |  男  |  22  | 400.7  |
|   李四   |  男  |  23  | 619.5  |
|   周五   |  男  |  24  | 1214.8 |
|   吴六   |  女  |  25  | 646.9  |
|   郑七   |  女  |  26  | 869.4  |
| 王七加一 |  男  |  21  | 869.4  |
&#43;----------&#43;------&#43;------&#43;--------&#43;
&#34;&#34;&#34;
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
ssh.connect(&#34;192.168.58.133&#34;, username=&#34;kali&#34;, port=22, password=&#34;kali&#34;)
## 执行命令
ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(&#34;neofetch&#34;)
print(ssh_stdout.read().decode())
ssh.close()
```

**使用户名和密码的 transport 方式登录**

```python
import paramiko
## 建立连接
trans = paramiko.Transport((&#34;192.168.58.133&#34;, 22))
trans.connect(username=&#34;kali&#34;, password=&#34;kali&#34;)
## 将sshclient的对象的transport指定为以上的trans
ssh = paramiko.SSHClient()
ssh._transport = trans
ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command(&#34;neofetch&#34;)
print(ssh_stdout.read().decode())
trans.close()
```

基于密钥的 Transport 方式登录

```python
import paramiko

## 指定本地的RSA私钥文件
## 如果建立密钥对时设置的有密码，password为设定的密码，如无不用指定password参数
pkey = paramiko.RSAKey.from_private_key_file(&#39;/home/you_username/.ssh/id_rsa&#39;, password=&#39;12345&#39;)

## 建立连接
trans = paramiko.Transport((&#39;xx.xx.xx.xx&#39;, 22))
trans.connect(username=&#39;you_username&#39;, pkey=pkey)

## 将sshclient的对象的transport指定为以上的trans
ssh = paramiko.SSHClient()
ssh._transport = trans

## 执行命令，和传统方法一样
stdin, stdout, stderr = ssh.exec_command(&#39;df -hl&#39;)
print(stdout.read().decode())

## 关闭连接
trans.close()
```

实现 sftp 文件传输

```python
import paramiko

## 实例化一个trans对象## 实例化一个transport对象
trans = paramiko.Transport((&#39;xx.xx.xx.xx&#39;, 22))

## 建立连接
trans.connect(username=&#39;you_username&#39;, password=&#39;you_passwd&#39;)

## 实例化一个 sftp对象,指定连接的通道
sftp = paramiko.SFTPClient.from_transport(trans)

## 发送文件
sftp.put(localpath=&#39;/tmp/11.txt&#39;, remotepath=&#39;/tmp/22.txt&#39;)

## 下载文件
sftp.get(remotepath=&#39;/tmp/22.txt&#39;, localpath=&#39;/tmp/33.txt&#39;)
trans.close()
```

## 利用Python脚本对数据库进行操作

####  pymysql模块的简单使用

```python
import pymysql

## 使用 connect 方法，传入数据库地址，账号密码，数据库名就可以得到你的数据库对象
db = pymysql.connect(
    host=&#34;localhost&#34;, user=&#34;root&#34;, password=&#34;root&#34;, database=&#34;avidol&#34;, charset=&#34;utf8&#34;
)

## 接着我们获取 cursor 来操作我们的 avIdol 这个数据库
cursor = db.cursor()

## 比如我们来创建一张数据表
## sql = &#34;&#34;&#34;create table beautyGirls (
##    name char(20) not null,
##    age int)&#34;&#34;&#34;
## sql = &#34;insert into beautyGirls(name,age) values(&#39;Mrs.cang&#39;,18)&#34;
sql = &#34;delete from beautyGirls where age = &#39;%d&#39;&#34; % (18)
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

df = pd.read_csv(&#34;xsb.csv&#34;)

## 当engine连接的时候我们就插入数据
engine = create_engine(&#34;mysql://root:root@localhost/xsb?charset=utf8&#34;)
## user:password
with engine.connect() as conn, conn.begin():
    df.to_sql(&#34;xsb&#34;, conn, if_exists=&#34;replace&#34;)
```

####  pymongo模块的简单使用

```python
from pymongo import MongoClient

conn = MongoClient(&#34;mongodb://localhost:27017/&#34;)
## print(conn)
db = conn.avIdol
## 删除全部数据
db.col.remove()
db.col.insert(
    [
        {&#34;name&#34;: &#34;波多野結衣&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 90, &#34;w&#34;: 59, &#34;h&#34;: 85}&#39;, &#34;age&#34;: 30},
        {&#34;name&#34;: &#34;吉泽明步&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 86, &#34;w&#34;: 58, &#34;h&#34;: 86}&#39;, &#34;age&#34;: 35},
        {&#34;name&#34;: &#34;桃乃木香奈&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 80, &#34;w&#34;: 54, &#34;h&#34;: 80}&#39;, &#34;age&#34;: 22},
        {&#34;name&#34;: &#34;西宫梦&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 85, &#34;w&#34;: 56, &#34;h&#34;: 86}&#39;, &#34;age&#34;: 22},
        {&#34;name&#34;: &#34;松下纱荣子&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 88, &#34;w&#34;: 57, &#34;h&#34;: 86}&#39;, &#34;age&#34;: 28},
    ]
)
## db.col.insert({&#34;name&#34;: &#34;波多野結衣&#34;, &#34;bwh&#34;: &#39;{ &#34;b&#34;: 90, &#34;w&#34;: 59, &#34;h&#34;: 85}&#39;, &#34;age&#34;: 30})
## print(db.col.find_one())
## 按name来删除
db.col.remove({&#34;name&#34;: &#34;波多野結衣&#34;})
## 把 吉泽明步 换成 苍井空
db.col.update({&#34;name&#34;: &#34;吉泽明步&#34;}, {&#34;$set&#34;: {&#34;name&#34;: &#34;苍井空&#34;}})
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
        print(&#34;开始线程：&#34; &#43; self.name)
        moyu_time(self.name, self.counter, 10)
        print(&#34;退出线程：&#34; &#43; self.name)


def moyu_time(name, delay, counter):
    while counter:
        time.sleep(delay)
        print(
            &#34;%s 开始摸鱼 %s &#34; % (name, time.strftime(&#34;%Y-%m-%d %H:%M:%S&#34;, time.localtime()))
        )
        counter -= 1


if __name__ == &#34;__main__&#34;:
    ## 创建新线程
    thread1 = MyThread(1, &#34;小明&#34;, 1)
    thread2 = MyThread(2, &#34;小红&#34;, 2)
    ## 开启新线程
    thread1.start()
    thread2.start()
    ## 等待线程终止
    thread1.join()
    thread2.join()
    ## 用到的join方法呢是为了让线程执行完再终止主程序
    print(&#34;退出主线程&#34;)
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
            &#34;%s 开始摸鱼 %s&#34; % (name, time.strftime(&#34;%Y-%m-%d %H:%M:%S&#34;, time.localtime()))
        )
        counter -= 1


if __name__ == &#34;__main__&#34;:
    ## 线程池
    pool = ThreadPoolExecutor(20)
    ## 往池子里塞20个线程然后在循环的时候每次拿一个线程来摸鱼
    for i in range(1, 5):
        pool.submit(moyu_time(&#34;xiaoshuaib&#34; &#43; str(i), 1, 3))
```

**队列&#43;多线程**

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
    print(&#34; 开始摸鱼 %s&#34; % (time.strftime(&#34;%Y-%m-%d %H:%M:%S&#34;, time.localtime())))


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


if __name__ == &#34;__main__&#34;:
    queue_pool()
```

```python
from multiprocessing import Process
## 使用 Process 这个类来创建进程

def f(name):
    print(&#34;hello&#34;, name)


if __name__ == &#34;__main__&#34;:
    p = Process(target=f, args=(&#34;xiao&#34;,))
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

if __name__ == &#34;__main__&#34;:
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

plt.plot(x, cos, &#34;--&#34;, linewidth=2)
plt.plot(x, sin)

plt.show()
```

####  画个饼图

```python
import matplotlib.pyplot as plt
import numpy as np


## Pie chart, where the slices will be ordered and plotted counter-clockwise:
labels = &#34;Frogs&#34;, &#34;Hogs&#34;, &#34;Dogs&#34;, &#34;Logs&#34;
sizes = [15, 30, 45, 10]
explode = (0, 0.1, 0, 0)
## only &#34;explode&#34; the 2nd slice (i.e. &#39;Hogs&#39;)

fig1, ax1 = plt.subplots()
ax1.pie(
    sizes, explode=explode, labels=labels, autopct=&#34;%1.1f%%&#34;, shadow=True, startangle=90
)
ax1.axis(&#34;equal&#34;)
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

ax0.hist(x, 20, density=True, histtype=&#34;stepfilled&#34;, facecolor=&#34;g&#34;, alpha=0.75)
ax0.set_title(&#34;stepfilled&#34;)

## Create a histogram by providing the bin edges (unequally spaced).
bins = [100, 150, 180, 195, 205, 220, 250, 300]
ax1.hist(x, bins, density=True, histtype=&#34;bar&#34;, rwidth=0.8)
ax1.set_title(&#34;unequal bins&#34;)

fig.tight_layout()
plt.show()
```

####  画散点图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style=&#34;darkgrid&#34;)


tips = sns.load_dataset(&#34;tips&#34;, data_home=&#34;seaborn-data&#34;, cache=True)
## name: str，代表数据集名字；
## cache: boolean，当为True时，从本地加载数据，反之则从网上下载；
## data_home: string，代表本地数据的路径
sns.relplot(x=&#34;total_bill&#34;, y=&#34;tip&#34;, data=tips)
plt.show()
```

####  画折线图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style=&#34;darkgrid&#34;)

fmri = sns.load_dataset(&#34;fmri&#34;, data_home=&#34;seaborn-data&#34;, cache=True)
sns.relplot(x=&#34;timepoint&#34;, y=&#34;signal&#34;, hue=&#34;event&#34;, kind=&#34;line&#34;, data=fmri)
plt.show()
```

####  画直方图

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style=&#34;darkgrid&#34;)

titanic = sns.load_dataset(&#34;titanic&#34;, data_home=&#34;seaborn-data&#34;, cache=True)
sns.catplot(x=&#34;sex&#34;, y=&#34;survived&#34;, hue=&#34;class&#34;, kind=&#34;bar&#34;, data=titanic)
plt.show()
```

####  pyecharts

直方图

```python
from pyecharts.charts import Bar
from pyecharts import options as opts

bar = (
    Bar()
    .add_xaxis([&#34;衬衫&#34;, &#34;毛衣&#34;, &#34;领带&#34;, &#34;裤子&#34;, &#34;风衣&#34;, &#34;高跟鞋&#34;, &#34;袜子&#34;])
    .add_yaxis(&#34;商家A&#34;, [114, 55, 27, 101, 125, 27, 105])
    .add_yaxis(&#34;商家B&#34;, [57, 134, 137, 129, 145, 60, 49])
    .set_global_opts(title_opts=opts.TitleOpts(title=&#34;某商场销售情况&#34;))
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

def pie_base() -&gt; Pie:
    c = (
        Pie()
        .add(&#34;&#34;, [list(z) for z in zip(Faker.choose(), Faker.values())])
        .set_global_opts(title_opts=opts.TitleOpts(title=&#34;Pie-基本示例&#34;))
        .set_series_opts(label_opts=opts.LabelOpts(formatter=&#34;{b}: {c}&#34;))
    )
    return c

## 需要安装 snapshot_selenium
make_snapshot(snapshot, pie_base().render(), &#34;pie.png&#34;)
```

词云图

```python
from pyecharts import options as opts
from pyecharts.charts import Bar, WordCloud
from pyecharts.render import make_snapshot
from snapshot_selenium import snapshot


words = [
    (&#34;Sam S Club&#34;, 10000),
    (&#34;Macys&#34;, 6181),
    (&#34;Amy Schumer&#34;, 4386),
    (&#34;Jurassic World&#34;, 4055),
    (&#34;Charter Communications&#34;, 2467),
    (&#34;Chick Fil A&#34;, 2244),
    (&#34;Planet Fitness&#34;, 1868),
    (&#34;Pitch Perfect&#34;, 1484),
    (&#34;Express&#34;, 1112),
    (&#34;Home&#34;, 865),
    (&#34;Johnny Depp&#34;, 847),
    (&#34;Lena Dunham&#34;, 582),
    (&#34;Lewis Hamilton&#34;, 555),
    (&#34;KXAN&#34;, 550),
    (&#34;Mary Ellen Mark&#34;, 462),
    (&#34;Farrah Abraham&#34;, 366),
    (&#34;Rita Ora&#34;, 360),
    (&#34;Serena Williams&#34;, 282),
    (&#34;NCAA baseball tournament&#34;, 273),
    (&#34;Point Break&#34;, 265),
]

def wordcloud_base() -&gt; WordCloud:
    c = (
        WordCloud()
        .add(&#34;&#34;, words, word_size_range=[20, 100])
        .set_global_opts(title_opts=opts.TitleOpts(title=&#34;WordCloud-基本示例&#34;))
    )
    return c

## 需要安装 snapshot_selenium
make_snapshot(snapshot, wordcloud_base().render(), &#34;WordCloud.png&#34;)
```

## Object-Oriented-Programe

```python
#运算符重载
## -*- encoding: utf-8 -*-
&#39;&#39;&#39;
@File    :   运算符重载.py
@Time    :   2022/11/16 17:23:01
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
&#39;&#39;&#39;
import os

class Vector:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def __str__(self):
        return &#39;Vector (%d, %d)&#39; % (self.a, self.b)
    def __add__(self, other):
        return Vector(self.a &#43; other.a, self.b &#43; other.b)

v1 = Vector(2, 10)
v2 = Vector(5, -2)
print(v1 &#43; v2)
```

```python
#demo1
## -*- encoding: utf-8 -*-
&#39;&#39;&#39;
@File    :   demo.py
@Time    :   2022/11/14 19:16:38
@Author  :   Lunatic 
@Version :   1.0
@Contact :   goodlunatic0@gmail.com
&#39;&#39;&#39;


class Employee:
    &#39;所有员工的基类&#39;
    empCount = 0

    ## empCount是一个类变量，它的值将在这个类的所有实例之间共享。可以在内部类或外部类使用 Employee.empCount 访问
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount &#43;= 1

    ## 这个方法被称为类的构造函数或初始化方法，当创建了这个类的实例时就会调用该方法
    ## self 代表类的实例，self 在定义类的方法时是必须有的，虽然在调用时不必传入相应的参数
    def displayCount(self):
        print(&#34;Total Empolyee %d&#34; % Employee.empCount)

    def displayEmployee(self):
        print(&#34;Name:&#34;, self.name, &#34;,Salary: &#34;, self.salary)

class Test:

    def prt(self):
        print(self)
        print(self.__class__)

## t = Test()  #&lt;__main__.Test object at 0x000002C122827880&gt;
## t.prt()  #&lt;class &#39;__main__.Test&#39;&gt;

## 创建实例对象
## &#34;创建 Employee 类的第一个对象emp1&#34;
emp1 = Employee(&#34;zara&#34;, 2000)
emp2 = Employee(&#34;manni&#34;, 5000)

emp1.displayEmployee()
emp2.displayEmployee()
print(&#34;Total Employee %d&#34; % Employee.empCount)

emp1.age = 7
emp2.age = 8
del emp1.age
print(&#34;age=&#34;, emp2.age)
## hasattr(emp2, &#39;age&#39;)
## 检查是否存在一个属性
## getattr(emp2, &#39;age&#39;)
## 访问对象的属性
## setattr(emp2, &#39;age&#39;)
## 设置一个属性。如果属性不存在，会创建一个新属性
## delattr(emp2, &#39;age&#39;)
## 删除属性

print(&#34;Employee.__doc__:&#34;, Employee.__doc__)
print(&#34;Empolyee.__name__:&#34;, Employee.__name__)
print(&#34;Employee.__module__:&#34;, Employee.__module__)
print(&#34;Employee.__bases__:&#34;, Employee.__bases__)
print(&#34;Employee.__dict__:&#34;, Employee.__dict__)
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
        print(class_name, &#34;销毁&#34;)


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
        print(&#34;调用父类构造函数&#34;)

    def parentMethod(self):
        print(&#39;调用父类方法&#39;)

    def setAttr(self, attr):
        Parent.parentAttr = attr

    def getAttr(self):
        print(&#34;父类属性 :&#34;, Parent.parentAttr)

    def myMethod(self):
        print(&#34;调用父类方法&#34;)


class Child(Parent):  ## 定义子类

    def __init__(self):
        print(&#34;调用子类构造方法&#34;)

    def childMethod(self):
        print(&#39;调用子类方法&#39;)

    def myMethod(self):
        print(&#34;调用子类方法&#34;)


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


if __name__ == &#34;__main__&#34;:
    ## 使用 Keras 载入训练数据
    (train_images, train_labels), (test_images, test_labels) = mnist.load_data()
    ## print(train_images.shape)  ## (60000, 28, 28) 60000个样本、每个样本的宽高是28*28
    ## 变换数据的形状并归一化,将每张图像转换成了一个长度为 784 的一维数组
    train_images = train_images.reshape(train_images.shape[0], -1)
    ## print(train_images.shape)
    ## 将数据类型转换为 float32 类型
    ## 因为像素值原本的范围是 0 到 255，所以除以 255 可以将它们归一化到 0 到 1 之间
    train_images = train_images.astype(&#39;float32&#39;) / 255
    test_images = test_images.reshape(test_images.shape[0], -1)
    test_images = test_images.astype(&#39;float32&#39;) / 255

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
    svm.save(&#34;mnist_svm.xml&#34;)
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

img0 = cv.imread(&#39;test.png&#39;, 0)
## 显示图像，2是窗口名称，img0是要显示的图像对象
## cv.imshow(&#39;img0&#39;, img0)
## 使窗口等待用户按下任意键。参数 0 表示无限期等待用户的按键输入。
## cv.waitKey(0)
## 图像二值化
ret, img1 = cv.threshold(img0, 100, 255, cv.THRESH_BINARY_INV)
## cv.imshow(&#39;2&#39;, img1)
## cv.waitKey(0)
## 创建一个3x3的矩形核，用于图像膨胀
kernel1 = np.ones((3, 3), np.uint8)
img2 = cv.dilate(img1, kernel1)
## cv.imshow(&#34;img2&#34;,img2)
## cv.waitKey(0)

## 剔除小连通域(噪点)
## 函数返回检测到的轮廓列表 contours 和层级信息 hierarchy
contours, hierarchy = cv.findContours(
    img2, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE)
for i in range(len(contours)):
    area = cv.contourArea(contours[i])
    ## 设定连通域最小阈值，小于该值被清理(填充为黑色)
    if area &lt; 200:
        cv.drawContours(img2, [contours[i]], 0, 0, -1)
## 再次进行膨胀
kernel2 = np.ones((15, 15), np.uint8)
img3 = cv.dilate(img2, kernel2)

## roi提取
contours, hierarchy = cv.findContours(
    img3, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
x, y, w, h = cv.boundingRect(contours[0])
a = 100
brcnt = np.array([[[x-a, y-a]], [[x&#43;w&#43;a, y-a]],
                 [[x&#43;w&#43;a, y&#43;h&#43;a]], [[x-a, y&#43;h&#43;a]]])
cv.drawContours(img3, [brcnt], -1, (255, 255, 255), 2)
## cv.imshow(&#39;img3&#39;, img3)
## cv.waitKey(0)
## img4就是提取roi后的图片
img4 = img3[y-a:y&#43;h&#43;a, x-a:x&#43;w&#43;a]
## cv.imshow(&#39;img4&#39;, img4)
## cv.waitKey(0)
img5 = cv.resize(img4, (28, 28))
## cv.imshow(&#39;img5&#39;, img5)
## cv.waitKey(0)
cv.imwrite(&#39;img5.png&#39;, img5)
## 这里就是读取预处理好的图片了
img = cv.imread(&#39;img5.png&#39;, 0)

## 将数据类型由uint8转为float32
img = img.astype(np.float32)
## 图片形状由(28,28)转为(784,)
img = img.reshape(-1,)
## 增加一个维度变为(1,784)
img = img.reshape(1, -1)
## 图片数据归一化
img = img/255

## 载入svm模型
svm = cv.ml.SVM_load(&#39;mnist_svm.xml&#39;)
## 进行预测
img_pre = svm.predict(img)
print(img_pre[1])
```



## 利用Python进行自动化处理

####  1.读取指定目录下的文件列表，并按照数字顺序排列

```python
## -*- encoding: utf-8 -*-
import os

filedir = r&#39;C:\Users\GoodLunatic\Desktop\500\file&#39;
filenames = os.listdir(filedir)
filenames.sort(key=lambda x: int(x.split(&#34;p&#34;)[1]))
print(filenames)
```

####  2.读取目录中的文件并合并到一个文件中

```python
## -*- encoding: utf-8 -*-
import os
fileobjs = []
filedir = input(&#39;please input the dir:&#39;)
filenames = os.listdir(filedir)
filenames.sort(key=lambda x: int(x.split(&#34;p&#34;)[1]))
for filename in filenames:
    filename = filedir&#43;&#39;\\&#39;&#43;filename
    fileobjs.append(filename)
## print(fileobjs)
f1 = open(&#39;flag.txt&#39;, &#39;w&#43;&#39;, encoding=&#39;utf-8&#39;)
for fileobj in fileobjs:
    with open(fileobj, &#39;r&#39;) as f:
        for line in f.readlines():
            line = line.strip(&#39;\n&#39;)
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
mode-表示打开zip文件的格式，默认值为&#39;r&#39;，但是可以改为&#39;w&#39;,&#39;a&#39;
compression-表示在写zip文档时所使用的压缩方法：zipfile.ZIP_STORED或zipfile._DEFLATED
allowZip64-如果要操作的压缩文件大小超过2G，要把allowZip64设为true
```

```python
import zipfile

filename = &#34;1.zip&#34;
f = zipfile.ZipFile(filename, &#39;r&#39;)
for f_name in f.namelist():
    #namelist()会返回一个包含压缩包内所有文件的列表
    print(f_name)
#ZipFile.getinfo()获取zip文件中指定文件的信息
print(f.getinfo(&#39;Matryoshka1000.zip&#39;))
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

filename = &#34;2.zip&#34;
## os.getcwd()返回当前文件运行的路径
f = zipfile.ZipFile(os.path.join(os.getcwd(),filename))
for file in f.namelist():
    ## 将压缩包中的文件解压到Desktop,这里也可以解压到还未创建的文件夹
    ## f.extract(file,r&#39;C:\Users\GoodLunatic\Desktop&#39;)
    f.extract(file,r&#39;C:\Users\GoodLunatic\Desktop\2&#39;)
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
zipFile = zipfile.ZipFile(r&#39;C:\Users\GoodLunatic\Desktop\3.zip&#39;,&#39;w&#39;)
#将flag.txt名称修改后使用ZIP_DEFLATED算法添加到3.zip
zipFile.write(r&#39;C:\Users\GoodLunatic\Desktop\flag.txt&#39;,&#39;修改后的flag.txt&#39;,zipfile.ZIP_DEFLATED)
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

z = zipfile.ZipFile(r&#39;C:\Users\GoodLunatic\Desktop\testzip.zip&#39;, &#39;w&#39;)
testdir = r&#34;testdir&#34;
if os.path.isdir(testdir):
    for d in os.listdir(testdir):
        z.write(testdir&#43;os.sep&#43;d)
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
content_left_div = response.xpath(&#39;//*[@id=&#34;content-left&#34;]&#39;)
content_list_div = content_left_div.xpath(&#39;./div&#39;)
content_div = content_list_div[0]
author = content_div.xpath(&#39;./div/a[2]/h2/text()&#39;).get()
content = content_div.xpath(&#39;./a/div/span/text()&#39;).getall()
```

将爬下来的数据存储为 json 文件

```bash
scrapy crawl qiushibaike -o qiushibaike.json
```

若出现中文乱码，就在setting.py中加一句

```
FEED_EXPORT_ENCODING = &#39;utf-8&#39;
```

```python
import scrapy

from Scrapy.qiushibaike.qiushibaike.items import QiushibaikeItem


class Qiushibaike(scrapy.Spider):
    name = &#34;qiushibaike&#34;
    headers = {
        &#34;User-Agent&#34;: &#34;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36&#34;
    }

    def start_requests(self):
        urls = [
            &#34;https://www.qiushibaike.com/text/page/1/&#34;,
            &#34;https://www.qiushibaike.com/text/page/2/&#34;,
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, headers=self.headers)
            ## 需要返回一个 yield 生成的迭代
            ## callback = self.parse就是要让它去回调我们的数据解析方法

        ## def parse(self, response):
        ##     page = response.url.split(&#34;/&#34;)[-2]
        ##     filename = &#34;qiushi-%s.html&#34; % page
        ##     with open(filename, &#34;wb&#34;) as f:
        ##         f.write(response.body)
        ##     self.log(&#34;[&#43;]Save file %s&#34; % filename)
        ## def parse(self, response):
        ##     content_left_div = response.xpath(&#39;//*[@id=&#34;content-left&#34;]&#39;)
        ##     content_list_div = content_left_div.xpath(&#34;./div&#34;)
        ##     for content_div in content_list_div:
        ##         yield {
        ##             &#34;author&#34;: content_div.xpath(&#34;./div/a[2]/h2/text()&#34;).get(),
        ##             &#34;content&#34;: content_div.xpath(&#34;./a/div/span/text()&#34;).getall(),
        ##         }

    def parse(self, response):
        content_left_div = response.xpath(&#39;//*[@id=&#34;content-left&#34;]&#39;)
        content_list_div = content_left_div.xpath(&#34;./div&#34;)

        for content_div in content_list_div:
            item = QiushibaikeItem()
            item[&#34;author&#34;] = content_div.xpath(&#34;./div/a[2]/h2/text()&#34;).get()
            item[&#34;content&#34;] = content_div.xpath(&#34;./a/div/span/text()&#34;).getall()
            item[&#34;_id&#34;] = content_div.attrib[&#34;id&#34;]
            yield item

        next_page = response.xpath(&#39;//*[@id=&#34;content-left&#34;]/ul/li[last()]/a&#39;).attrib[
            &#34;href&#34;
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
## Don&#39;t forget to add your pipeline to the ITEM_PIPELINES setting
## See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo

## useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class QiushibaikePipeline:
    def __init__(self):
        self.connection = pymongo.Mongo.MongoClient(&#34;localhost&#34;, 27017)
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
@app.route(&#34;/&#34;)
def index():
    return &#34;&lt;h1&gt;hello world&lt;/h1&gt;&#34;

app.run()
```

#### 路由的使用

```python
from flask import Flask

app = Flask(__name__)


## 使用了一个装饰器
@app.route(&#34;/hello&#34;)
def hello():
    return &#34;&lt;h1&gt;hello world&lt;/h1&gt;&#34;


@app.route(&#34;/hi&#34;)
def hi():
    return &#34;hi hi&#34;


if __name__ == &#34;__main__&#34;:
    app.run()
```

```python
from flask import Flask

app = Flask(__name__)


## 使用了一个装饰器
@app.route(&#34;/hello&#34;, methods=[&#34;GET&#34;, &#34;POST&#34;], endpoint=&#34;hello&#34;)
def hello():
    return &#34;&lt;h1&gt;hello world&lt;/h1&gt;&#34;


@app.route(&#34;/hi&#34;, methods=[&#34;POST&#34;], endpoint=&#34;hi&#34;)
def hi():
    return &#34;hi hi&#34;


if __name__ == &#34;__main__&#34;:
    app.run()
```

#### 变量规则

```python
from flask import Flask

app = Flask(__name__)


## 用了正则表达式
@app.route(&#34;/user/&lt;id&gt;&#34;)
def index(id):
    if id == &#34;1&#34;:
        return &#34;python&#34;
    if id == &#34;2&#34;:
        return &#34;java&#34;


if __name__ == &#34;__main__&#34;:
    app.run()
```

```python
from flask import Flask

app = Flask(__name__)


## 用了正则表达式
## 使用了转换器 string-接受任何不包含斜杠的文本 int-接受正整数 float-接受正浮点数 path-接受包含斜杠的文本
@app.route(&#34;/user/&lt;int:id&gt;&#34;)
def index(id):
    if id == 1:
        return &#34;python&#34;
    if id == 2:
        return &#34;java&#34;


if __name__ == &#34;__main__&#34;:
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
        print(&#34;to_python方法被调用&#34;)
        return value


## 将自定义的转换器类添加到flask应用中
app.url_map.converters[&#34;re&#34;] = RegexConverter


@app.route(&#39;/index/&lt;re(&#34;1\d{5}&#34;):value&gt;&#39;)
def index(value):
    print(value)
    return &#34;hello&#34;


if __name__ == &#34;__main__&#34;:
    app.run()
```

#### 渲染form表单

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route(&#34;/index&#34;, methods=[&#34;GET&#34;, &#34;POST&#34;])
def index():
    return render_template(&#34;index.html&#34;)


if __name__ == &#34;__main__&#34;:
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
n = int(input(&#34;请输入待查找的数:&#34;))
while low&lt;=high:
    mid = (low&#43;high)//2
    if list[mid]&lt;=n:
        low = mid&#43;1
    else:
        high = mid-1
print(f&#34;需要查找的数的下标为{high}&#34;)
```

####  Python运行时 -u 参数的作用

一个例子

```python
import sys
sys.stdout.write(&#34;stdout1&#34;)
sys.stderr.write(&#34;stderr1&#34;)
sys.stdout.write(&#34;stdout2&#34;)
sys.stderr.write(&#34;stderr2&#34;)
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

平常我们使用的print函数其实也是调用了sys.stdout.write(obj&#43;&#39;\n&#39;)函数

####  踩过的坑

以下代码，加-u和不加，输出的内容是不同的

```python
from PIL import Image

image = Image.open(&#39;flag1.png&#39;)
w,h = image.size
## print(w,h)
data = &#39;&#39;
output = &#39;&#39;
for i in range(w):
    for j in range(h):
        pixel_data = image.getpixel((i,j))[0]
        if(pixel_data &lt;=10):
            data&#43;=&#39;0&#39;
        else:
            data&#43;=&#39;1&#39;
## print(len(data))
if len(data) % 8!=0:
    data&#43;=&#39;0&#39;*(8-len(data)%8)
    
for i in range(0,len(data),8):
    binary_segment = data[i:i&#43;8]
    int_value = int(binary_segment,2)
    char_value = chr(int_value)
    output &#43;= char_value
print(output)
```



---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/e19da63/  

