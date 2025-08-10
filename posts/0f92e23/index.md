# CTF-Reverse学习记录

**感觉逆向真的是一个不得不学的领域呀**
&lt;!--more--&gt;

## IDA常用快捷键

|    快捷键    |         功能         |
| :-------: | :----------------: |
|    F2     |        添加断点        |
|    F4     |        开始运行        |
|    F5     |      反编译成伪代码       |
|    F7     |        进入函数        |
|    F8     |        单步调试        |
|    F9     |      运行到下一个断点      |
|   Space   | 切换反汇编窗口(列表视图&amp;图形视图) |
|    Tab    |       返回栈视图        |
|    ESC    |     跳转到返回前的地址      |
|     /     |        添加注释        |
|     N     |       修改变量名        |
|     D     |      代码解析成数据       |
|     C     |      数据解析成代码       |
|     G     |     跳转到指定地址查看      |
|     H     |      转换为十进制数       |
|     Q     |      转换为十六进制数      |
|     R     |       转换为字符        |
|     X     |     查看函数的交叉引用      |
|     Y     |     指定当前函数的命名      |
| Shift&#43;F12 |      打开字符串窗口       |
|  Shift&#43;E  | 批量复制数据为字符串或者c数组格式  |

## 逆向中常见的数据类型

|              数据类型              |  位数  |
| :----------------------------: | :--: |
|         1 byte = 8 bit         | 8 位  |
|        1 word = 2 byte         | 16 位 |
| 1 dword(Double Word) = 2 word  | 32 位 |
| 1 qword(Quadra Word) = 2 dword | 64 位 |

## 汇编基础

|    快捷键    |         功能         |
| :-------: | :----------------: |
|    F2     |        添加断点        |
|    F4     |        开始运行        |
|    F5     |      反编译成伪代码       |
|    F7     |        进入函数        |
|    F8     |        单步调试        |
|    F9     |      运行到下一个断点      |
|   Space   | 切换反汇编窗口(列表视图&amp;图形视图) |
|    Tab    |       返回栈视图        |
|    ESC    |     跳转到返回前的地址      |
|     /     |        添加注释        |
|     N     |       修改变量名        |
|     D     |      代码解析成数据       |
|     C     |      数据解析成代码       |
|     G     |     跳转到指定地址查看      |
|     H     |      转换为十进制数       |
|     Q     |      转换为十六进制数      |
|     R     |       转换为字符        |
|     X     |     查看函数的交叉引用      |
|     Y     |     指定当前函数的命名      |
| Shift&#43;F12 |      打开字符串窗口       |
|  Shift&#43;E  | 批量复制数据为字符串或者c数组格式  |

## Python逆向

有部分exe是由 pyinstaller 打包的，通常可以直接根据文件的图标看出来

针对这种exe的逆向，我可以按照如下步骤：

1、使用 pyinstxtractor 先进行解包

&gt; pyinstxtractor: https://github.com/extremecoders-re/pyinstxtractor

```bash
# 可以用如下命令进行解包
[&#43;] Usage: pyinstxtractor.py &lt;filename&gt;
# 这里要注意，如果本地版本和出题人打包用的版本不同，某些依赖可能无法正常解包
```

2、反编译解包后得到的 pyc 文件

第一种方法是用如下的在线网站反编译：

```
https://tool.lu/pyc/
https://www.lddgo.net/string/pyc-compile-decompile
https://www.toolkk.com/tools/pyc-decomplie
```

第二中方法就是用本地工具进行反编译，这里有以下三个常用的反编译工具：

uncompyle6: https://github.com/rocky/python-uncompyle6

```bash
# 直接 pip 安装即可
pip3 install uncompyle6
# 然后将 Script 目录添加到环境变量中
C:\Users\XXX\AppData\Local\Programs\Python\Python38\Scripts
# 之后就可以直接在终端中使用了
uncompyle6 filename.pyc &gt; decompile.py
```

pyinstxtractor: https://github.com/extremecoders-re/pyinstxtractor

```bash
python pyinstxtractor.py reverse_1_PyHaHa.pyc
```





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/0f92e23/  

