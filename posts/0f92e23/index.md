# CTF-Reverse学习记录

**未来的研究方向里有好多要用到逆向工程的地方**

**感觉是绕不开逆向了，因此打算猛猛突击一下**
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

|   汇编指令   |           示例            |                  含义                  |              说明               |
| :------: | :---------------------: | :----------------------------------: | :---------------------------: |
|   MOV    |      MOV EAX, ECX       |              EAX = ECX               |          将ECX的值赋给EAX          |
|   ADD    |      ADD EAX, ECX       |              EAX &#43;= ECX              |         将EAX的值加上ECX的值         |
|   SUB    |      SUB EAX, ECX       |              EAX -= ECX              |         将EAX的值减去ECX的值         |
|   INC    |         INC EAX         |                EAX&#43;&#43;                 |           将EAX的值&#43;1            |
|   DEC    |         DEX EAX         |                EAX--                 |           将EAX的值-1            |
|   LEA    |      LEA EAX, ECX       |             EAX = ECX的地址             |         将ECX的地址存入EAX          |
|   AND    |      AND EAX, ECX       |           EAX = EAX &amp; ECX            |         EAX与ECX进行与运算          |
|    OR    |       OR EAX, ECX       |           EAX = EAX \| ECX           |         EAX与ECX进行或运算          |
|   XOR    |      XOR EAX, ECX       |           EAX = EAX ^ ECX            |         EAX与ECX进行异或运算         |
|   NOT    |         NOT EAX         |              EAX = ~EAX              |           将EAX的值取反            |
|   SHL    |       SHL EAX, 3        |            EAX = EAX &lt;&lt; 3            |          将EAX的值左移三位           |
|   SHR    |       SHR EAX, 3        |            EAX = EAX &gt;&gt; 3            |          将EAX的值右移三位           |
|   CMP    |      CMP EAX, ECX       | if(EAX == ECX) ZF = 1&lt;br&gt;else ZF = 0 | 对EAX和ECX的值进行比较并根据比较结果设置ZF标志的值 |
|   TEST   |      TEST EAX, EAX      |  if(EAX == 0) ZF = 1&lt;br&gt;else ZF = 0  |  将EAX的值与0进行比较并根据比较结果设置ZF标志的值  |
|  JE[JZ]  |       JZ 04001000       |     if(ZF == 1)&lt;br&gt;GOTO 04001000     |      若ZF为1则跳转至 04001000       |
| JNE[JNZ] |      JNZ 04001000       |     if(ZF == 0)&lt;br&gt;GOTO 04001000     |      若ZF为0则跳转至 04001000       |
|   JMP    |      JMP 04001000       |            GOTO 04001000             |        直接跳转至 04001000         |
|   CALL   | CALL printf&lt;br&gt;CALL $&#43;5 |                                      |    调用函数printf&lt;br&gt;跳转到下一条指令     |
|   PUSH   |        PUSH EAX         |                                      |          将EAX的值压入栈顶           |
|   POP    |         POP EAX         |                                      |          将栈顶的值弹给EAX           |

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

pycdc: https://github.com/zrax/pycdc

```bash
# 下载并编译
git clone https://github.com/zrax/pycdc.git
mkdir build &amp;&amp; cd build
cmake ..
make -j$(nproc)

# 使用方法
Usage:  ./pycdc [options] input.pyc

Options:
  -o &lt;filename&gt;  Write output to &lt;filename&gt; (default: stdout)
  -c             Specify loading a compiled code object. Requires the version to be set
  -v &lt;x.y&gt;       Specify a Python version for loading a compiled code object
  --help         Show this help text and then exit
```

&gt; Tips:
&gt; 
&gt; 有时候会遇到pyc文件魔术头被修改的情况，可以复制解包后的struct.pyc到要反编译的pyc文件中（就是文件前16个字节）

## 常见的编码与加密

### base64

```c&#43;&#43;
char base64_table[] = &#34;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#43;/&#34;
int __fastcall base64_encode(char *Str2, char *Str)
{
  int v3; // [rsp&#43;24h] [rbp-1Ch]
  int v4; // [rsp&#43;34h] [rbp-Ch]
  int v5; // [rsp&#43;38h] [rbp-8h]
  int v6; // [rsp&#43;3Ch] [rbp-4h]

  v3 = strlen(Str);
  if ( v3 % 3 )
    v6 = 4 * (v3 / 3 &#43; 1);
  else
    v6 = 4 * (v3 / 3);
  Str2[v6] = 0;
  v5 = 0;
  v4 = 0;
  while ( v6 - 2 &gt; v5 )
  {
    Str2[v5] = base64_table[(unsigned __int8)Str[v4] &gt;&gt; 2]; // 右移2位，获得第一个字符前6位的数据
    Str2[v5 &#43; 1] = base64_table[(16 * (Str[v4] &amp; 3)) | ((unsigned __int8)Str[v4 &#43; 1] &gt;&gt; 4)]; // 获取第二个6位
    Str2[v5 &#43; 2] = base64_table[(4 * (Str[v4 &#43; 1] &amp; 0xF)) | ((unsigned __int8)Str[v4 &#43; 2] &gt;&gt; 6)]; // 获得第三个6位
    Str2[v5 &#43; 3] = base64_table[Str[v4 &#43; 2] &amp; 0x3F]; // 获得第四个6位
    v4 &#43;= 3;
    v5 &#43;= 4;
  }
  if ( v3 % 3 == 1 )
  {
    Str2[v5 - 2] = &#34;=&#34;;
    Str2[v5 - 1] = &#34;=&#34;;
  }
  else if ( v3 % 3 == 2 )
  {
    Str2[v5 - 1] = &#34;=&#34;;
  }
  return putchar(&#34;\n&#34;);
}
```


### RC4

### TEA XTEA XXTEA

### MD5

## 常见的壳

可以先把待逆向的文件拖入 [DIE(Detect-It-Easy)](https://github.com/horsicq/Detect-It-Easy) 中查看是用的什么壳

### upx

一种压缩壳，可以尝试直接用upx脱壳

```bash
# 下载
upx: https://github.com/upx/upx
# 使用方法
upx -d re.exe
```

也可以尝试手动脱upx



---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/0f92e23/  

