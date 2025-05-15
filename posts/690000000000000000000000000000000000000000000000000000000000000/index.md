# CTF-Reverse Record

**感觉逆向真的是一个不得不学的领域呀**
&lt;!--more--&gt;

## IDA常用快捷键

```
静态调试：

F5:反编译成伪代码
Shift&#43;f12:打开字符串窗口
空格:切换反汇编窗口(列表视图&amp;图形视图)
Tab:返回栈视图
N:修改变量名
D:修改变量类型
X:交叉引用
R:将ascii转换成字符
V:快速将当前函数修改成void类型(插件提供的功能)
*D:把汇编代码转成数据
*C:把数据转成汇编代码
*U:表示当前指令为未知,显示16进制原始硬编码
*P:从当前地址处解析成函数（一般和u一起用）
*G:跳到函数地址

动态调试：

F2:下断点
F4:运行
F7:进入函数
F8:单步调试
F9:跳到下一个断点
G:跳到函数地址
```

# python逆向

## pyc文件反编译

**1、在线网站反编译**

```
https://tool.lu/pyc/
https://www.lddgo.net/string/pyc-compile-decompile
https://www.toolkk.com/tools/pyc-decomplie
```

**2、使用本地工具反编译**

**uncompyle6**

安装及使用方法

```bash
# 直接 pip 安装即可
pip3 install uncompyle6
# 然后将 Script 目录添加到环境变量中
C:\Users\XXX\AppData\Local\Programs\Python\Python38\Scripts
# 之后就可以直接在终端中使用了
uncompyle6 filename.pyc &gt; decompile.py
```

**pyinstxtractor**

```bash
python .\pyinstxtractor.py .\reverse_1_PyHaHa.pyc
```


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/690000000000000000000000000000000000000000000000000000000000000/  

