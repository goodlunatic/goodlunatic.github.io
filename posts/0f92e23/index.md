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

## 常用的一些逆向工具

### Z3 约束求解器

&gt; Z3-solver是微软开发的自动定理证明器和约束求解器，能够将复杂问题转化为数学约束条件，然后自动寻找满足所有条件的解。它特别擅长处理包含布尔逻辑、算术运算、位运算等多种约束的复杂问题，广泛应用于程序验证、网络安全、人工智能等领域。Z3通过先进的符号推理和约束求解技术，能够解决传统方法难以处理的非线性约束和复杂逻辑关系，是一个强大的数学问题求解工具。

安装方法: `pip3 install z3-solver`

基本用法如下，更多用法可以参考[官方文档](https://z3prover.github.io/api/html/index.html)

```python
from z3 import *

# 1. 创建变量
x = Int(&#39;x&#39;)      # 整型变量
y = Int(&#39;y&#39;)      # 整型变量
p = Bool(&#39;p&#39;)     # 布尔变量p
q = Bool(&#39;q&#39;)     # 布尔变量q
r = Bool(&#39;r&#39;)     # 布尔变量r

# 2. 创建求解器
s = Solver()

# 3. 添加约束条件
# 数值约束
s.add(x &gt; 0)                    # x必须大于0
s.add(y &gt; 0)                    # y必须大于0
s.add(x &#43; y == 10)              # x&#43;y等于10
s.add(Implies(p, x &gt; y))        # 如果p为真，则x&gt;y

# 逻辑约束
s.add(Implies(p, q))            # p → q (如果p为真，则q为真)
s.add(r == Not(q))              # r = ¬q (r等于q的否定)
s.add(Or(Not(p), r))            # ¬p ∨ r (p的否定或r为真)

# 4. 检查约束是否可满足
if s.check() == sat:
    # 5. 获取解
    m = s.model()
    print(f&#34;找到解：x = {m[x]}, y = {m[y]}&#34;)
    print(f&#34;逻辑变量：p = {m[p]}, q = {m[q]}, r = {m[r]}&#34;)
else:
    print(&#34;约束不可满足&#34;)
```

示例代码：

```python
from z3 import *

enc = [0x0000B1B0, 0x00005678, 0x00007FF2, 0x0000A332, 0x0000A0E8, 0x0000364C, 0x00002BD4, 0x0000C8FE, 0x00004A7C, 0x00000018, 0x00002BE4, 0x00004144, 0x00003BA6, 0x0000BE8C, 0x00008F7E, 0x000035F8, 0x000061AA, 0x00002B4A, 0x00006828, 0x0000B39E, 0x0000B542, 0x000033EC, 0x0000C7D8, 0x0000448C, 0x00009310, 0x00008808, 0x0000ADD4, 0x00003CC2, 0x00000796, 0x0000C940, 0x00004E32, 0x00004E2E, 0x0000924A, 0x00005B5C]

s = Solver()

input = [BitVec(f&#34;input{i}&#34;, 8) for i in range(34)] # input0-input33 都是 0-255
var = [BitVec(f&#34;var{i}&#34;,32) for i in range(34)] # var0-var31 都是 0-4294967295

# 模拟加密算法
for i in range(34):
    var[i] = 47806 * (ZeroExt(24, input[i]) &#43; i) # 高位补零，将8位扩展至32位
    if i:
        var[i] ^= var[i-1] ^ 0x114514
    var[i] %= 51966

# 添加约束条件
for i in range(34):
    s.add(var[i] == enc[i])

while True:
    if s.check() == sat: # 找到解
        m = s.model()
        ascii_list = [m[input[i]].as_long() for i in range(34)] # 将Z3的符号值转换为Python的普通整数
        flag = &#34;moectf{&#34;  &#43; &#34;&#34;.join(chr(ascii_list[i]) for i in range(34)) &#43; &#34;}&#34;
        print(flag)

        # 添加阻塞条件，寻找下一个解
        block = []
        for i in range(34):
            block.append(input[i] != m[input[i]])
        s.add(Or(block)) # 至少有一个变量与当前解不同
    else:
        break
```

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/0f92e23/  

