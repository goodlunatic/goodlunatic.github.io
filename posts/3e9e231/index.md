# Misc-区块链安全


**平常打CTF比赛的时候，时常会遇到区块链类的题目，**

**然后好像这几年这个方向也比较火，所以就想着学习一下。**

<!--more-->

## 前言

智能合约语言目前以Solidity为主，除此以外，还有Vyper、Mandala和Obsidian等在不同方向改善智能合约的语言

开发工具推荐使用REMIX：http://remix.ethereum.org/，可以在浏览器中快速部署测试智能合约，不需要在本地安装任何程序，也是以太坊官方推荐的智能合约开发IDE。

REMIX IDE中的前两个选项就不多说了

第三个第四个选项是部署和执行，在代码编译完成后，可以在这里部署合约，也可以和已部署的合约进行交互。 

ENVIRONMENT：默认使用JS虚拟机本地模拟一条测试链，如果想要连接测试网，选择Injected Provider。 
ACCOUNT：当前使用的账户，如果是默认的JS虚拟机会分配数个有大量测试币的测试账户，如果 环境是Injected Provider，可以在					  MetaMask中切换账户。 
GAS LIMIT：合约的gas上限。 
VALUE：转入多少ETH。 
CONTARCT：一个文件中可能包含多个合约，这里选择具体部署哪一个合约。 At Address：如果合约已经部署，可以在这里输入该合约						的地址进行交互。

## 获取以太币

可以从这个水龙头中获取以太币（每天可以获取0.2）

https://goerlifaucet.com/

## 网络切换

可以使用metamask进行网络的切换，切换到你要使用的测试网络

## 反编译合约

可以使用在线网站：https://ethervm.io/decompile

可以得到合约反编译出来的代码，以及合约中的函数或变量。

## 区块链浏览器 

https://goerli.etherscan.io/

区块链浏览器是专门用来查看链上的各种信息的工具，可以检索的信息包括但不限于：账户地址、合约 地址、交易Hash等。

通过查询账户地址可以看到当前余额，近期交易等信息。

## Solidity学习记录

### 一、合约文件结构剖析：

#### 1.1一个合约文件的结构如下

```
合约文件：
	版本申明
	import
	合约：
		状态变量
		函数
		结构类型
		事件
		函数修改器
	代码注释
```

一个完整合约结构的例子

```solidity
pragma solidity ^0.4.0

import "";
/*This is a Contract
@auth:XXX
*/
contract Test{

}
```

#### 1.2合约的引入import

```solidity
import "filename.sol"
```

#### 1.3引入状态变量、函数、事件、函数修改器

```solidity
pragma solidity ^0.4.0;
import "solidity_for_import.sol";//引入另外一个合约
contract Test{
    //引入状态变量
    uint a;
    //引入函数
    function setA(uint x) public {
        a=x;
        //调用setA时触发事件Set_A
        emit Set_A(x);//利用web3随时监听我们的事件
    }
    //引入事件
    event Set_A(uint a);
    //定义结构体
    struct Position{
        int lat;
        int lng;
    }
    address public ownerAddr;
    //定义***函数修改器***
    modifier ownerAddr(){
        require(msg.sender==ownerAddr);
        _;
    }
    function mine() public owner {
        a+=1;
    }
}
```

### 二、Solidity语言类型

#### 2.1常量

- 有理数常量和整型常量
- 字符常量
- 十六进制常量
- 地址常量

#### 2.2地址类型

address:表示一个账户地址（20B）

balance表示账户地址的余额

函数transfer表示地址转移的以太币

#### 2.3bool真假值类型

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract BooleanTest{
    bool a;
    // view函数修饰符修饰的条件(只读取状态,但不修改状态)
    // 本地运行,不消耗gas
    function getBool() public view returns(bool){
        return a;
    }
    /*
       function getBool2() public view returns(bool){
        return !a;//取反
    }
    */
}
```

#### 2.4整型特性与运算

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract Math{
    uint numa=4;
    uint numb=2;
    // pure修饰符修饰的条件(不读取且不修改任何状态)
    // 本地运行,不消耗gas
    function add(uint a,uint b)public pure returns(uint){
        return a+b;
    }
     function jian(uint a,uint b)public pure returns(uint){
        return a-b;
    }
     function cheng(uint a,uint b)public pure returns(uint){
        return a*b;
    }
     function chu(uint a,uint b)public pure  returns(uint){
        return a/b;
    }
}
```

#### 2.5底层位运算

&

|

^

<< 左移

右移类似

```
1.& 操作数之间转换成二进制之后每位进行与运算操作（同1取1）
2.| 操作数之间转换成二进制之后每位进行或运算操作（有1取1）
3.~ 操作数转换成二进制之后每位进行取反操作（直接相反）
4.^ 操作数之间转换成二进制之后每位进行异或操作（不同取1）
5.<<操作数转换成二进制之后每位向左移动x位的操作
6.>>操作数转换成二进制之后每位向右移动x位的操作
```

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract Math{
    uint a=4;
    uint b=2;
    function weiyu()view public returns(uint){
        return a & b;
    }
     function weihuo()view public returns(uint){
        return a|b;
    }
     function weifan()view public returns(uint){
        return a^b;
    }
     function zuoyi()view public  returns(uint){
        return a<<b;
    }
      function youyi()view public  returns(uint){
        return a>>b;
    }
}
```

#### 2.6固定长度字节数组byte

一个byte=8个位（XXXX XXXX）X为0或1，二进制表示
byte数组为bytes1，bytes2，...，bytes32，以八个位递增，即是对**位的封装**
举例
bytes1=uint8
bytes2=unit16
...
bytes32=unit256

使用byte数组的理由：

1.bytesX可以更好地显示16进制
举例：bytes1=0x6A，bytes1=（XXXX XXXX）正好四个表示一个16进制，以此类推
2.bytes数据声明时加入public可以自动生成调用长度的函数，见下

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract Math{
    bytes1 public num1=0x12;
    bytes4 public num2=0x12121212;
}
```

3.bytes内部**自带length**长度函数，而且**长度固定**，而且**长度不可以被修改**

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract Math{
    bytes1 public num1=0x12;
    bytes4 public num2=0x12121212;
    function getlength1()public view returns(uint8){
        return num1.length;
    }
    function getlength2()public view returns(uint8){
        return num2.length;
    }
}
```

数组

Solidity中的数组可以具有编译时固定大小，也可以是动态的。

```solidity
uint[3] fixed;  //array of fixed length 3
uint[] dynamic; //a dynamic array has no fixed size, it can keep growing
```

也可以创建一个结构数组

Tips：将数组声明为public将自动为其创建getter方法

```solidity
Voter[] public voting;
```

### 三、数据存储

#### 3.1String内存原理

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract DynamicByte{
  string name="xxxx";
  function getLength() public view returns(uint){
       return bytes(name).length;//通过byte强制转换获取长度
  }
  function changename() public view returns(bytes1){
       return bytes(name)[1];
  }
  function getName() public view returns(bytes memory){
       return bytes(name);
  }
}
```

### 四、以太坊的本质

### 五、使用钱包转移资金

可以通过payable函数对合约进行充值、转账、默认

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.7;
contract PayableTest{
    function pay() payable{
    }
//获取账户上的金额
    function getBalance() returns(uint){
        return address(this).balance;
    }
}
```

地址主要有两个：

​	1、合约的地址（this代表合约的地址）

​	2、账户的地址

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.4.0;
contract Transfer{
     function transfer() public payable{
           address account=0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
           account.transfer(msg.value);//把钱转到account中去
     }
}
```

### 六、智能合约众筹的例子（还不是理解的很明白）

该案例涉及两个角色：

募集资金者（受益者）

资金投资者（捐赠者）

```solidity
// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.4.4;
contract zhongchou{
    //对象二：捐赠者
    struct funder{
        address Funderaddress;
        uint Tomoney;//捐款金额
    }
     //对象一：受益者
    struct needer{//声明受益者的结构体
        address Neederaddress;//声明一个变量地址，方便打钱给受益者
        uint goal;//目标金额
        uint amout;//已经募得金额
        uint funderAccount;//多少捐赠者
        mapping(uint=>funder)map;//映射，将捐赠者的id与捐赠者绑定在一起，从而能够得知，是谁给当前的受益人捐钱了。
    }
    uint neederAmount;//受益人的id数量
    mapping(uint=>needer) needmap;
    //行为：
    function NewNeeder(address _Neederaddress,uint _goal){
        //创建对象,将id号与受益者联系在一起了
        neederAmount++;
        needmap[neederAmount]=needer(_Neederaddress,_goal,0,0);
    }
    //@param _address 捐赠者的地址，
    //@param    _neederAmount   受益人的id
    function contribute( address _address, uint _neederAmount)  payable{
        //通过id获取到受益人对象
        needer storage  _needer =  needmap[_neederAmount];
       //聚集到的资金增加
        _needer.amount +=  msg.value;//动态获取
        // 捐赠人数增加
        _needer.funderAcoount++;
        //将受益人id与受益人绑定
        _needer.map[ _needer.funderAcoount] = funder(_address ,  msg.value );
    }
    //当募集到的资金满足条件，就会给给受益人的地址转账
   //@param    _neederAmount   受益人的id
    function   ISconpelete( uint _neederAmount){
        needer storage  _needer =  needmap[_neederAmount];
        if(_needer.amount  >=_needer.goal ){
            _needer.Neederaddress.transfer(_needer.amount);
        }
    }
}
```



## Chainflag刷题记录

Tips：The challenge contract will be deployed on the Sepolia network

**部署题目**

```bash
kali@LAPTOP-QD91EIJU:/mnt/c/Users/GoodLunatic$ nc chall.chainflag.org 10022
We design a pretty easy contract challenge. Enjoy it!
Your goal is to make isSolved() function returns true!

[1] - Create an account which will be used to deploy the challenge contract
[2] - Deploy the challenge contract using your generated account
[3] - Get your flag once you meet the requirement
[4] - Show the contract source code
[-] input your choice: 1
[+] deployer account: 0x5BaB25243D74E56affceD7393CDf6aFdc6A9a12F
#创建了一个账户，用于部署题目合约
[+] token: v4.local.pJvCWQxn1SbqGXvnM6RuvXv0F-UyOgi-cTXtIsVl4Rx1hzf1PMqscjCkAoYKgXEXPi2bVBQnohUNIlteHuguOjJb3nY6zJ4OQkFYPwGugyVOPh2tzLR5XGyuEeUkYJyQ-_F5ZmgN8dowE2_rlljYr4rCdKpTpuHRhFkd6u6rE8NzOw
#token用于选项2部署题目合约已经选项3获取flag
[+] please transfer 0.001 test ether to the deployer account for next step
#要先通过metamask向这个账户里发送点测试币，方法见下图（因为有gas费用所以建议稍微多转点）
kali@LAPTOP-QD91EIJU:/mnt/c/Users/GoodLunatic$ nc chall.chainflag.org 10022
We design a pretty easy contract challenge. Enjoy it!
Your goal is to make isSolved() function returns true!

[1] - Create an account which will be used to deploy the challenge contract
[2] - Deploy the challenge contract using your generated account
[3] - Get your flag once you meet the requirement
[4] - Show the contract source code
[-] input your choice: 2
[-] input your token: v4.local.pJvCWQxn1SbqGXvnM6RuvXv0F-UyOgi-cTXtIsVl4Rx1hzf1PMqscjCkAoYKgXEXPi2bVBQnohUNIlteHuguOjJb3nY6zJ4OQkFYPwGugyVOPh2tzLR5XGyuEeUkYJyQ-_F5ZmgN8dowE2_rlljYr4rCdKpTpuHRhFkd6u6rE8NzOw
[+] contract address: 0x17b96ca2944b1CaA75708d0f2b660D208f2DF1f7
#得到了合约的地址，即部署的题目的合约
[+] transaction hash: 0xe033e37636423b8cd65ea2d15c2e5ffb7e18f6e7b7d03051c90d411e4c3d708f
#部署合约的交易hash
```

![image-20221202115004855](C:\Users\GoodLunatic\AppData\Roaming\Typora\typora-user-images\image-20221202115004855.png)

**在REMIX上编写攻击脚本**

Hint：Your goal is to make isSolved() function returns true!

获取题目源码（这道题直接给了，如果没给的话就要反编译逆出合约的逻辑）

```solidity
contracts/Example.sol
pragma solidity 0.8.7;

contract Greeter {
    string greeting;

    constructor(string memory _greeting) public {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function isSolved() public view returns (bool) {
        string memory expected = "HelloChainFlag";
        return keccak256(abi.encodePacked(expected)) == keccak256(abi.encodePacked(greeting));
        //即要让expected==greeting=="HelloChainFlag"
        //solution:调用setGreeting函数来修改greeting的值
    }
}
```

**exp**

```solidity
pragma solidity 0.8.7;
//因为我们的攻击合约需要用到题目合约的函数，所以这里直接照搬题目合约的代码，用来提供定义。
contract Greeter {
    string greeting;
    constructor(string memory _greeting) public {
        greeting = _greeting;
    }
    function greet() public view returns (string memory) {
        return greeting;
    }
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
    function isSolved() public view returns (bool) {
    string memory expected = "HelloChainFlag";
    return keccak256(abi.encodePacked(expected)) == keccak256(abi.encodePacked(greeting));
    }
}
contract exp {
//首先要确定需要攻击的合约，因此这里填上之前选项2部署的合约的地址
    address instance_address = 0x17b96ca2944b1CaA75708d0f2b660D208f2DF1f7 ;
//这里把题目合约地址和模块简化一下，后面调用时直接用target就可以了
    Greeter target = Greeter(instance_address);
    constructor()payable{}
//在攻击合约里定义一个hack函数，public说明该函数可供外部、子合约、合约内部访问。后面的returns则是定义该函数的返回值类型
    function hack() public returns (bool){
        bool answer = false;
//定义一个string类型的变量greeting并赋值为"HelloChainFlag"，memory表示数据储存在内存中，并不会储存在链上，可以节省gas。
        string memory greeting = "HelloChainFlag";
//调用题目合约的setGreeting函数，并将greeting作为参数传输过去
        target.setGreeting(greeting);
//调用题目合约的isSolved函数，在执行完上一条语句后，题目合约中的expected就会等于greeting，因此isSolved会返回true，达成题目要求。
        answer = target.isSolved();
        return answer;
    }
}
```

部署好Environment和Account然后选择exp.sol,点击Deploy，支付交互所需的费用，

然后在下面Deployed Contracts中就可以看到hack按钮，点击hack开始攻击合约了。

在metamask里支付完以后，稍作等待，再nc那个容器，输入token得到flag

```bash
nc chall.chainflag.org 10022
We design a pretty easy contract challenge. Enjoy it!
Your goal is to make isSolved() function returns true!

[1] - Create an account which will be used to deploy the challenge contract
[2] - Deploy the challenge contract using your generated account
[3] - Get your flag once you meet the requirement
[4] - Show the contract source code
[-] input your choice: 3
[-] input your token: v4.local.pJvCWQxn1SbqGXvnM6RuvXv0F-UyOgi-cTXtIsVl4Rx1hzf1PMqscjCkAoYKgXEXPi2bVBQnohUNIlteHuguOjJb3nY6zJ4OQkFYPwGugyVOPh2tzLR5XGyuEeUkYJyQ-_F5ZmgN8dowE2_rlljYr4rCdKpTpuHRhFkd6u6rE8NzOw
[+] flag: flag{placeholder}
```



---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/3e9e231/  

