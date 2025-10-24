# C/C++程序开发学习记录

**最近科研上遇到一些项目需要使用C/C++开发，因此打算学习并记录一下**
<!--more-->

## 环境配置

作者这里使用的系统是`Ubuntu20.04 LTS`

首先需要安装`gcc`和`cmake`

```bash
bashsudo apt-get install build-essential
sudo apt install cmake 

# 如果cmake的版本太低，可以尝试手动下载
apt-get autoremove cmake
mv cmake-3.5.0-Linux-x86_64.tar.gz /usr
cd /usr
tar zxvf cmake-3.5.0-Linux-x86_64.tar.gz
ln -s /usr/cmake-3.5.0-Linux-x86_64/bin/* /usr/bin/ 
```

## cmake入门

这里就用下面这个例子来简要说明一下，通常一个C/C++项目的结构如下所示：

```bash
project
├── bin
│   └── main
├── build
├── CMakeLists.txt
├── include
│   ├── test1.h
│   └── test2.h
└── src
    ├── main.cpp
    ├── test1.cpp
    └── test2.cpp
```

其中各个文件的内容如下所示

`CMakeLists.txt`
```cmake
# 项目所支持的最低cmake版本
cmake_minimum_required(VERSION 3.10) 

# 设置项目名称
project(project) 

# 最后生成的可执行文件保存在bin目录下
set(EXECUTABLE_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/bin)

# 将源码文件保存在src目录下，并赋值到SRC_LIST中
aux_source_directory(src SRC_LIST)

# 指定头文件的路径
include_directories(include)

# 声明生成的可执行文件名和所依赖文件的路径
add_executable(main ${SRC_LIST})
```

`test1.h`
```c
#ifndef _TEST1_H // 防止头文件被重复包含的预处理指令
#define _TEST1_H // 防止这个头文件在同一个编译单元中被多次包含

#include<iostream>

void testfunc1(); // // 声明一个函数 testfunc1()

// 结束 #ifndef 的条件编译块
#endif /*_TEST1_H*/
```

`test2.h`
```c
#ifndef _TEST2_H // 防止头文件被重复包含的预处理指令
#define _TEST2_H // 防止这个头文件在同一个编译单元中被多次包含

#include<iostream>

void testfunc2(); // // 声明一个函数 testfunc2()

// 结束 #ifndef 的条件编译块
#endif /*_TEST22_H*/
```

`test1.cpp`
```c
#include "test1.h"
#include <iostream>
using namespace std;

void testfunc1(){
    cout << "this is testfunc1" << endl;
}
```

`test2.cpp`
```c
#include "test2.h"
#include <iostream>
using namespace std;

void testfunc2(){
    cout << "this is testfunc2" << endl;
}
```

`main.cpp`
```c
#include <iostream>
#include "test1.h"
#include "test2.h"
using namespace std;

int main()
{
    cout << "Hello" << endl;
    testfunc1();
    testfunc2();
    return 0;
}
```

上面的文件写好后，我们执行以下命令编译即可

```bash
cd build && cmake
make
```

编译完成后，我们就能在`bin`目录下找到生成的可执行文件`main`

---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/e393438/  

