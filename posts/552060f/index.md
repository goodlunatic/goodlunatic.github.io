# Preparation For Programming Proficiency Exam

时间过得真快呀，回想上次做算法题应该是大一的时候了

没想到现在回过头来，依旧需要重新拾起自己的算法功底
&lt;!--more--&gt;

## 输入与输出

| 函数                       | 用法                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `scanf()`                | 默认是以空白字符（空格、制表符、换行符）为分隔，当有多组样例的时候，可以使用`while(scanf(&#34;%d&#34;,&amp;a)!=EOF)`来进行多组样例的输入         |
| `getchar()`              | 从标准输入流中读取一个字符，常用来处理上一行末尾留下的换行符                                                       |
| `fgets()`                | `fgets(a,MAX_LEN,stdin);`读取一整行的文本，末尾会多一个换行符；可使用`str[strcspn(str, &#34;\n&#34;)] = &#39;\0&#39;;`进行处理 |
| `cin.getline()`          | `cin.getline(str, MAXN);` 其中 str 是 `char[]`，读取一整行的文本，末尾没有换行符                         |
| `getline()`              | `getline(cin,str)`其中 str 是 `string str`，读取一整行的文本，末尾没有换行符                             |
| `sprintf()`              | `sprintf(s, &#34;Integer: %d, Float: %.2f&#34;, num, fnum);`用于将格式化的数据写入到一个字符串中               |
| `istringstream iss(str)` | 流化一个字符串，从一个字符串中读取数据，包含在`#include &lt;sstream&gt;` 文件头中                                     |
|                          |                                                                                      |

## 一些函数

### 字符串相关的一些函数

| 函数                      | 用法                                                                          |
| ----------------------- | --------------------------------------------------------------------------- |
| `substr(pos,len)`       | `s.substr(pos,len)`返回从字符串的 `pos` 位置开始，长度为 `len` 的子字符串                       |
| `sprintf(字符数组,格式串,变量)`  | 将变量按格式字符串的格式写入到字符数组                                                         |
| `sscanf(字符数组,格式串,&amp;变量)`  | 从字符数组中按格式串提取变量，返回成功提取的变量数量                                                  |
| `strcspn(str,&#34;\\n&#34;)`    | 返回字符串 str 中第一个出现的字符 \\n 的位置                                                 |
| `strcmp(s1,s2)`         | 比较两个字符串的字典序大小, 如果`s1=s2`返回0, `s1&gt;s2`返回正值, `s1&lt;s2`返回负值                       |
| `strcat(s1,s2)`         | 将字符串`s2`拼接到`s1`后面                                                           |
| `strcpy(s1,s2)`         | 将字符串s2复制到字符串s1中                                                             |
| `string.erase(pos,len)` | `.erase()` 是 `string` 类型的成员函数,用于删除从 `pos` 开始长度为 `len` 的字符串                  |
| `stoi(str)`             | 将 `string` 类型的字符串转换为 `int` 类型，并且`stoi` 会隐式地将 `char` 数组转换为 `string`，然后再转换为整数 |
| `to_string()`           | 用于将各种基本数据类型（如 `int、float、double、long `等）转换为字符串`std::string`                 |
| `remove()`              | `remove(token.begin(), token.end(), &#39; &#39;)`将所有空格元素移动到末尾，并返回第一个空格的迭代器          |
### C&#43;&#43;的STL中一些常用的库函数
#### vector 数组

| 成员函数             | 用法                                   |
| ---------------- | ------------------------------------ |
| `size()`         | 返回数组当前包含的元素数量                        |
| `empty()`        | 检查当前的数组是否为空, 是则返回`true`, 否则返回`false` |
| `push_back()`    | 在数组末尾添加一个元素                          |
| `pop_back()`     | 删除数组末尾最后一个元素                         |
| `erase(pos,len)` | 删除数组从下标`pos`开始长度为`len`的元素            |
| `front()`        | 返回数组第一个元素的引用                         |
| `back()`         | 返回数组最后一个元素的引用                        |
| `begin()`        | 返回数组第一个元素的迭代器                        |
| `end()`          | 返回数组最后一个元素后一个位置的迭代器                  |
| `clear()`        | 清空数组                                 |

#### map 关联容器
&gt; `map`会自动按照键值排序

| 成员函数            | 用法                                   |
| --------------- | ------------------------------------ |
| `size()`        | 返回容器当前包含元素的数量                        |
| `empty()`       | 检查当前的数组是否为空, 是则返回`true`, 否则返回`false` |
| `begin()`       | 返回数组第一个元素的迭代器                        |
| `end()`         | 返回数组最后一个元素后一个位置的迭代器                  |
| `insert()`      | 可以插入一个`pair`                         |
| `find()`        | 若找到该元素则返回指向该元素的迭代器，否侧返回`.end()`      |
| `lower_bound()` | 返回大于等于x的最小的数的迭代器                     |
| `upper_bound()` | 返回大于x的最小的数的迭代器                       |
```c&#43;&#43;
map&lt;string, int&gt;mp;
mp[&#34;example&#34;] = 1;
```
#### pair 模板类
```c&#43;&#43;
using namespace std;
typedef pair&lt;int, int&gt; PII;
vector&lt;PII&gt; v;

cout &lt;&lt; v[i].first &lt;&lt; &#34; &#34; &lt;&lt; v[i].second &lt;&lt; &#39;\n&#39;;
```

#### queue 队列

| 成员函数      | 用法        |
| --------- | --------- |
| `size()`  | 返回队列长度    |
| `empty()` | 返回队列是否为空  |
| `push()`  | 向队尾插入一个元素 |
| `front()` | 返回队头元素    |
| `back()`  | 返回队尾元素    |
| `pop()`   | 弹出队头元素    |

```c&#43;&#43;
queue&lt;int&gt; q;// 循环队列

struct Person {
	int l, r;
	// 结构体rec中必须重载小于号
	bool operator &lt; (const Person &amp;w) const {
		return l * r &lt; w.l * w.r;
	}
};

priority_queue&lt;int&gt; q;// 大根堆
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt; q;// 小根堆
priority_queue&lt;pair&lt;int, int&gt;&gt;q;
```

#### priority_queue 优先队列
默认定义的话就是大根堆 `priority_queue&lt;int&gt; heap;`

如果需要定义小根堆的话 `priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int &gt;&gt; heap`

| 成员函数     | 用法     |
| -------- | ------ |
| `push()` | 插入一个元素 |
| `top()`  | 返回堆顶元素 |
| `pop()`  | 弹出堆顶元素 |

```c&#43;&#43;
priority_queue&lt;int&gt; maxHeap;
int main() {
	maxHeap.push(10);
	maxHeap.push(20);
	maxHeap.push(5);
	maxHeap.push(30);
	while (!maxHeap.empty()) {
		cout &lt;&lt; maxHeap.top() &lt;&lt; &#39;\n&#39;;
		maxHeap.pop();
	}
	return 0;
}
```

```c&#43;&#43;
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt; &gt;minHeap;
int main() {
	minHeap.push(10);
	minHeap.push(20);
	minHeap.push(5);
	minHeap.push(30);
	while (!minHeap.empty()) {
		cout &lt;&lt; minHeap.top() &lt;&lt; &#39;\n&#39;;
		minHeap.pop();
	}
	return 0;
}
```

#### stack 适配器容器
&gt; 栈是一种 $LIFO(后进先出)$ 的数据结构
&gt; 
&gt; `stack&lt;int&gt; stk;`

| 成员函数      | 用法        |
| --------- | --------- |
| `push()`  | 将元素压入栈顶   |
| `pop()`   | 移除栈顶元素    |
| `top()`   | 访问栈顶元素    |
| `empty()` | 判断栈是否为空   |
| `size()`  | 返回栈中的元素数量 |

#### set 关联容器
&gt; 集合的元素具有唯一性
&gt; `set&lt;int&gt; s;`

| 成员函数            | 用法                                                           |
| --------------- | ------------------------------------------------------------ |
| `insert()`      | 将元素插入到集合中                                                    |
| `erase()`       | 删除指定元素, 参数可以是一个元素, 也可以是一个迭代器                                 |
| `find()`        | 查找指定元素, 并返回指向该元素的迭代器, 如果找不到则返回 `set.end()`, 可以通过 `*it` 来访问元素 |
| `size()`        | 返回集合中的元素数量                                                   |
| `count()`       | 判断某个元素是否存在, 返回0或1                                            |
| `ckear()`       | 清空集合                                                         |
| `lower_bound()` | 返回大于等于x的最小的数的迭代器                                             |
| `upper_bound()` | 返回大于x的最小的数的迭代器                                               |

#### bitset 模板类
定义 `bitset&lt;10000&gt; S`;

| 成员函数       | 用法         |
| ---------- | ---------- |
| `count()`  | 返回有多少个1    |
| `any()`    | 判断是否至少有一个1 |
| `none()`   | 判断是否全为0    |
| `set()`    | 把所有位置置为1   |
| `set(k,v)` | 将第k位置成v    |
| `reset()`  | 把所有位置成0    |
| `flip()`   | 等价于~       |
| `flip(k)`  | 把第k位取反     |

#### 查找相关的函数

| 函数                                                              | 用法                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `find(iterator first, iterator last, const T&amp; value);`          | 在范围内**线性查找**第一个等于给定值的元素, 并返回迭代器                                                                        |
| `binary_search(iterator first, iterator last, const T&amp; value);` | 检查一个值是否存在于一个已排序的范围中, 并返回 `bool` 类型的结果                                                                  |
| `lower_bound(iterator first, iterator last, const T&amp; value);`   | 用于在有序序列中查找第一个不小于 `value` 的元素, 并返回迭代器, 获取具体下标需要减去 `begin()`                                             |
| `upper_bound(iterator first, iterator last, const T&amp; value);`   | 用于在有序序列中查找第一个严格大于 `value` 的元素, 并返回迭代器, 获取具体下标需要减去 `begin()`                                            |
| `equal_range(iterator first, iterator last, const T&amp; value);`   | 查找范围 `[first, last)` 中所有等于给定值的元素的区间, 返回一个 `pair` , `first` 指向第一个等于值的元素, `second`指向最后一个等于值的元素的**后一个位置** |
|                                                                 |                                                                                                        |


## 常用算法

### 排序算法
#### 冒泡排序

```c&#43;&#43;
//冒泡排序的基本思想是，将数组划分为尚未有序的部分（左边）和已经有序的部分（右边），
//每一轮从左到右遍历尚未有序部分的元素，判断相邻两个元素的大小，
//如果左大右小，那么就交换这两个元素，
//这样一直交换，直到把尚未有序部分中的最大元素交换到尚未有序部分的最右边。
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
#define MAXN 100

int a[MAXN];


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	scanf(&#34;%d&#34;, &amp;n);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
//	变量i这里的作用主要是用来确定需要执行的轮数:n-1
//	变量j表示这一轮需要比较的次数:n-i
	for (int i = 1; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; n - i; j&#43;&#43;) {
			if (a[j] &gt; a[j &#43; 1]) swap(a[j], a[j &#43; 1]);
		}
	}
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		printf(&#34;%d&#34;, a[i]);
		if (i &lt; n - 1) printf(&#34; &#34;);
	}
	return 0;
}
```

#### 快速排序

分治思想，时间复杂度为O(nlogn)，不稳定

```c&#43;&#43;
void quick_sort(int a[], int l, int r) {
	if (l &gt;= r) return;
	int x = a[l], i = l - 1, j = r &#43; 1;
	while (i &lt; j) {
		while (a[&#43;&#43;i] &lt; x);
		while (a[--j] &gt; x);
		if (i &lt; j) swap(a[i], a[j]);
	}
	quick_sort(a, l, j);
	quick_sort(a, j &#43; 1, r);
}
```

#### 归并排序

分治思想，时间复杂度为O(nlogn)，稳定

```c&#43;&#43;
const int N = 1e6 &#43; 10;
int a[N], tmp[N];

void merge_sort(int a[], int l, int r) {
	if (l &gt;= r) return ;
	int mid = l &#43; r &gt;&gt; 1;
	merge_sort(a, l, mid);
	merge_sort(a, mid &#43; 1, r);
	int cnt = 0, i = l, j = mid &#43; 1 ;
	while (i &lt;= mid &amp;&amp; j &lt;= r) {
		if (a[i] &lt;= a[j]) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
		else tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
	}
	while (i &lt;= mid) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
	while (j &lt;= r) tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
	for (int i = l, j = 0; i &lt;= r; i&#43;&#43;, j&#43;&#43;) a[i] = tmp[j];
}
```

### 查找

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;
#define MAXN 100005

int a[MAXN];

// 顺序查找
int linearSearch(int a[], int n, int target) {
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		if (a[i] == target) return i;
	}
	return -1;
}

// 二分查找-适用于有序的情况
int binarySearch(int a[], int n, int target) {
	int left = 0, right = n - 1, mid;
	while (left &lt;= right) {
		mid = left &#43; (right - left) / 2;
		printf(&#34;%d\n&#34;, mid);
		if (a[mid] == target) return mid;
		else if (a[mid] &lt; target) left = mid &#43; 1;
		else right = mid - 1;
	}
	return -1;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	int target;scanf(&#34;%d&#34;, &amp;target);
	int pos = linearSearch(a, n, target);
//	int pos = binarySearch(a,n,target);
	if (pos != -1) printf(&#34;%d&#34;, pos &#43; 1);
	else printf(&#34;NO&#34;);
	return 0;
}
```

#### 二分查找

**整数查找**

```c&#43;&#43;
int bin_searchh(int a[], int len, int x, int &amp;cnt) {
	int l = 0, r = len - 1, mid;
	while (l &lt;= r) {
		cnt&#43;&#43;;
		mid = l &#43; r &gt;&gt; 1;
		if (a[mid] &lt; x) l = mid &#43; 1;
		else if (a[mid] &gt; x) r = mid - 1;
		else return mid;
	}
	return -1;
}
```

**整数左右边界二分**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 100010;
int a[N];

// 找左边界
int binsearch_left(int l, int r, int x) {
	while (l &lt; r) {
		int mid = l &#43; r &gt;&gt; 1;
		if (a[mid] &gt;= x) r = mid;
		else l = mid &#43; 1;
	}
	return l;
}

// 找右边界
int binsearch_right(int l, int r, int x) {
	while (l &lt; r) {
		int mid = l &#43; r &#43; 1 &gt;&gt; 1;
		if (a[mid] &lt;= x) l = mid;
		else r = mid - 1;
	}
	return l;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, x, mid;
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	while (m--) {
		scanf(&#34;%d&#34;, &amp;x);
		int l = 0, r = n - 1;
		l = binsearch_left(l, r, x);
		if (a[l] != x) printf(&#34;-1 -1\n&#34;);
		else {
			printf(&#34;%d &#34;, l);
			l = 0, r = n - 1;
			l = binsearch_right(l, r, x);
			printf(&#34;%d\n&#34;, l);
		}
	}
	return 0;
}
```

例题1-Acwing789-数的范围

**浮点数二分**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	double x;
	while (scanf(&#34;%lf&#34;, &amp;x) != EOF) {
		double l = 0, r = x, mid;
		while (r - l &gt; 1e-8) {
			mid = (l &#43; r) / 2;
			if (mid * mid &gt;= x) r = mid;
			else l = mid;
		}
		printf(&#34;%lf\n&#34;, l);
	}
	return 0;
}
```

### 高精度

#### 高精度比较

```c&#43;&#43;
// 高精度比较
vector&lt;int&gt; max_vec(vector&lt;int&gt;A, vector&lt;int&gt;B) {
	if (A.size() &gt; B.size()) return A;
	if (A.size() &lt; B.size()) return B;
	for (int i = A.size() - 1; i &gt;= 0; i&#43;&#43;) {
		if (A[i] &gt; B[i]) return A;
		if (A[i] &lt; B[i]) return B;
	}
	return A;
}
```

#### 高精度加法

```c&#43;&#43;
vector&lt;int&gt; add(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {  
    vector&lt;int&gt;C;  
    int tmp = 0;  
    for (int i = 0; i &lt; A.size() || i &lt; B.size(); i&#43;&#43;) {  
        if (i &lt; A.size()) tmp &#43;= A[i];  
        if (i &lt; B.size()) tmp &#43;= B[i];  
        C.push_back(tmp % 10);  
        tmp /= 10;  
    }  
    if (tmp != 0) C.push_back(1);  
    return C;  
}
```

#### 高精度减法

```c&#43;&#43;
// 判断A &gt;= B ?
bool cmp(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {
	if (A.size() != B.size()) return A.size() &gt; B.size();
	for (int i = A.size() - 1; i &gt;= 0; i--) {
		if (A[i] != B[i]) return A[i] &gt; B[i];
	}
	return true;
}

vector&lt;int&gt; sub(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {
	vector&lt;int&gt;C;
	int tmp = 0;
	for (int i = 0; i &lt; A.size(); i&#43;&#43;) {
		tmp = A[i] - tmp;
		if (i &lt; B.size()) tmp -= B[i];
		C.push_back((tmp &#43; 10) % 10);
		if (tmp &lt; 0) tmp = 1;
		else tmp = 0;
	}
//	处理前导零，如果C的长度大于1，并且最后一位是0
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}
```

#### 高精度乘法

**A \* b的情况**

```c&#43;&#43;
vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, int b) {
	vector&lt;int&gt;C;
	int tmp = 0;
//	这里要注意，i结束了但是tmp还没处理完的情况
	for (int i = 0; i &lt; A.size() || tmp != 0; i&#43;&#43;) {
		if (i &lt; A.size()) tmp &#43;= A[i] * b;
		C.push_back(tmp % 10);
		tmp /= 10;
	}
//	处理前导零
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0)C.pop_back();
	return C;
}
```

**A \* B 的情况**

```c&#43;&#43;
vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {
	int len = A.size() &#43; B.size();
	vector&lt;int&gt;C(len &#43; 1);
	for (int i = 0; i &lt; A.size(); i&#43;&#43;) {
		for (int j = 0; j &lt; B.size(); j&#43;&#43;) {
//			注意这里的下标是 i&#43;j , 并且每一位可能由多次结果相加得到
			C[i &#43; j] &#43;= A[i] * B[j];
		}
	}
	for (int i = 0; i &lt; len; i&#43;&#43;) {
		if (C[i] &gt; 9) {
			C[i &#43; 1] &#43;= C[i] / 10;
			C[i] = C[i] % 10;
		}
	}
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}
```

#### 高精度除法

**A / b** 商是C, 余数是 tmp 的情况

```c&#43;&#43;
vector&lt;int&gt; div(vector&lt;int&gt;&amp;A, int b, int &amp;tmp) {
	tmp = 0;
	vector&lt;int&gt;C;
	for (int i = A.size() - 1; i &gt;= 0; i--) {
		tmp = tmp * 10 &#43; A[i];
		C.push_back(tmp / b);
		tmp %= b;
	}
	reverse(C.begin(), C.end());
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}
```

### 前缀和与差分

#### 前缀和

**一维前缀和**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int a[N], s[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, l, r;
	cin &gt;&gt; n &gt;&gt; m;
	memset(a, 0, sizeof(a));
	memset(s, 0, sizeof(s));
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		cin &gt;&gt; a[i];
		s[i] = s[i - 1] &#43; a[i];
	}
	while (m--) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
		printf(&#34;%d\n&#34;, s[r] - s[l - 1]);
	}
	return 0;
}
```

**二维前缀和**

&gt; 二维的情况很容易出错，建议还是画个表格辅助分析
&gt; 
&gt; 这里要特别注意，横轴是 y，竖轴是 x


![](imgs/image-20240810171006938.png)



```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int a[N][N], s[N][N];


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(a, 0, sizeof(a));
	memset(s, 0, sizeof(s));
	int n, m, q, x1, x2, y1, y2, res;
	cin &gt;&gt; n &gt;&gt; m &gt;&gt; q;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= m; j&#43;&#43;) {
			scanf(&#34;%d&#34;, &amp;a[i][j]);
			s[i][j] = s[i - 1][j] &#43; s[i][j - 1] - s[i - 1][j - 1] &#43; a[i][j];
		}
	}
	while (q--) {
		scanf(&#34;%d%d%d%d&#34;, &amp;x1, &amp;y1, &amp;x2, &amp;y2);
		res = s[x2][y2] - s[x2][y1 - 1] - s[x1 - 1][y2] &#43; s[x1 - 1][y1 - 1];
		printf(&#34;%d\n&#34;, res);
	}
	return 0;
}
```


#### 差分

&gt; 差分其实就是前缀和的逆运算，比如下面的代码中，b 数组就是差分数组，a 数组是前缀和数组
&gt; 
&gt; 只要修改差分数组中 l 和 r 位置的两个值，就可以很方便的修改前缀和中 l 到 r 区间所有的值
&gt; 
&gt; 差分常用于批量修改某一区间的值的情况，核心就是 `insert()` 函数

**一维差分**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int a[N], b[N];

void insert(int l, int r, int c) {
	b[l] &#43;= c;
	b[r &#43; 1] -= c;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(a, 0, sizeof(a));
	memset(b, 0, sizeof(b));
	int n, m, l, r, c;
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		scanf(&#34;%d&#34;, &amp;a[i]);
//		差分数组的初始化
		insert(i, i, a[i]);
	}
	while (m--) {
		scanf(&#34;%d%d%d&#34;, &amp;l, &amp;r, &amp;c);
		insert(l, r, c);
	}
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		a[i] = a[i - 1] &#43; b[i];
		printf(&#34;%d &#34;, a[i]);
	}
	return 0;
}
```

**二维差分（差分矩阵）**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int a[N][N], b[N][N];

void insert(int x1, int y1, int x2, int y2, int c) {
	b[x1][y1] &#43;= c;
	b[x2 &#43; 1][y1] -= c;
	b[x1][y2 &#43; 1] -= c;
	b[x2 &#43; 1][y2 &#43; 1] &#43;= c;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, q, x1, y1, x2, y2, c;
	cin &gt;&gt; n &gt;&gt; m &gt;&gt; q;
	memset(a, 0, sizeof(a));
	memset(b, 0, sizeof(b));
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= m; j&#43;&#43;) {
			scanf(&#34;%d&#34;, &amp;a[i][j]);
			insert(i, j, i, j, a[i][j]);
		}
	}
	while (q--) {
		scanf(&#34;%d%d%d%d%d&#34;, &amp;x1, &amp;y1, &amp;x2, &amp;y2, &amp;c);
		insert(x1, y1, x2, y2, c);
	}
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= m; j&#43;&#43;) {
			a[i][j] = a[i][j - 1] &#43; a[i - 1][j] - a[i - 1][j - 1] &#43; b[i][j];
			printf(&#34;%d &#34;, a[i][j]);
		}
		printf(&#34;\n&#34;);
	}
	return 0;
}
```

### 双指针

&gt; 双指针算法可以把时间复杂度为`O(n^2)`的算法优化到`O(n)`

**最简单的分隔字符串的情况**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
const int MAXN = 100010;  
char s[MAXN];  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    cin.getline(s, MAXN);  
    int len = strlen(s);  
    for (int i = 0; i &lt; len; i&#43;&#43;) {  
        int j = i;  
        while (j &lt; len &amp;&amp; s[j] != &#39; &#39;) j&#43;&#43;;  
        for (int k = i; k &lt; j; k&#43;&#43;) cout &lt;&lt; s[k];  
        cout &lt;&lt; &#39;\n&#39;;  
        i =  j;  
    }  
    return 0;  
}
```

**例题-AcWing-799.最长连续不重复子序列**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int a[N], s[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, res = 0;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	for (int i = 0, j = 0; i &lt; n; i&#43;&#43;) {
		s[a[i]]&#43;&#43;;
		while (s[a[i]] &gt; 1) {
//			关键部分,这里s[a[j]--的目的是确保i,j区间内每个元素出现的次数都为1
			s[a[j]]--;
			j&#43;&#43;;
		}
		res = max(res, i - j &#43; 1);
	}
	cout &lt;&lt; res;
	return 0;
}
 ```

### 位运算
**n的二进制表示中第k位是几**

`lowbit(X)` 返回x的最后一位1,相当于 `x&amp;-x` 或者 `x&amp;(~x&#43;1)`

`lowbit(1010)` 返回 `10`

`lowbit(1011000)` 返回 `1000`

例题1-AcWing801.求二进制中1的个数

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
int lowbitt(int x) {  
    return x &amp; -x;  
}  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n, x;  
    cin &gt;&gt; n;  
    for (int i = 0; i &lt; n; i&#43;&#43;) {  
        scanf(&#34;%d&#34;, &amp;x);  
        int res = 0;  
        while (x) {  
            x -= lowbitt(x);  
            res&#43;&#43;;  
        }  
        printf(&#34;%d &#34;, res);  
    }  
    return 0;  
}
```

&gt; 原码、反码、补码之间的关系，假设二进制表示的 `x=1010`
&gt; 
&gt; 原码：0...01010
&gt; 
&gt; 反码：1...10101
&gt; 
&gt; 补码(`~x&#43;1`)：1...10110，计算机中负数是用补码来表示的

```c&#43;&#43;
	int n = 10,x = -n;
	for (int i = 31; i &gt;= 0; i--) cout &lt;&lt; (n &gt;&gt; i &amp; 1);
//	00000000000000000000000000001010
	for (int i = 31; i &gt;= 0; i--) cout &lt;&lt; (x &gt;&gt; i &amp; 1);
//	11111111111111111111111111110110
```

### 离散化(TODO)

&gt; 整个值域的跨度很大, 但是分布很稀疏

#### 整数离散化-数组离散化

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e6 &#43; 10;
int a[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	for (int i = 1; i &lt;= n; i&#43;&#43;) cin &gt;&gt; a[i];
	sort(a &#43; 1, a &#43; n &#43; 1);
	int len = unique(a &#43; 1, a &#43; n &#43; 1) - (a &#43; 1);
	for (int i = 1; i &lt;= len; i&#43;&#43;) cout &lt;&lt; a[i] &lt;&lt; &#34; &#34; &lt;&lt; i &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

例题1-AcWing802.区间和
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef pair&lt;int, int&gt;PII;

const int N = 3e5 &#43; 10;
int a[N], s[N];
vector&lt;int&gt;alls;
vector&lt;PII&gt;add, query;

// 二分查找第一个不小于x的数
int find(int x) {
	int l = 0, r = alls.size();
	while (l &lt; r) {
		int mid = l &#43; r &gt;&gt; 1;
		if (alls[mid] &gt;= x) r = mid;
		else l = mid &#43; 1;
	}
//	这里便于后续的前缀和，映射到下标从1开始的数组
	return r &#43; 1;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, x, c, l, r;
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;x, &amp;c);
		add.push_back({x, c});
	}
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
		query.push_back({l, r});
//*******************************************************
		alls.push_back(l);
		alls.push_back(r);
//*******************************************************
	}
//	排序&#43;去重
	sort(alls.begin(), alls.end());
//	把所有不重复元素放到开头，返回第一个重复元素的位置
	alls.erase(unique(alls.begin(), alls.end()), alls.end());
	for (int i = 0; i &lt; add.size(); i&#43;&#43;) {
		int x = find(add[i].first);
		a[x] &#43;= add[i].second;
	}
//	前缀和
	for (int i = 1; i &lt;= alls.size(); i&#43;&#43;) s[i] = s[i - 1] &#43; a[i];
//	处理query
	for (int i = 0; i &lt; query.size(); i&#43;&#43;) {
		int l = find(query[i].first), r = find(query[i].second);
		cout &lt;&lt; s[r] - s[l - 1] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

### 区间合并

&gt; 区间合并算法的基本思路就是：
&gt; 
&gt; 1.先按左端点进行升序排序
&gt; 
&gt; 2.比较下一区间左端点和当前维护区间右端点的大小
&gt; 
&gt; 3.大于则将上一区间加入数组并更新当前区间的右端点，小则更新当前区间右端点为大的值

例题1-AcWing803.区间合并
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef pair&lt;int, int&gt; PII;

vector&lt;PII&gt;segs;

// 区间合并的关键代码
void merge(vector&lt;PII&gt;&amp;segs) {
	vector&lt;PII&gt;res;
	if (!segs.size()) return;
	sort(segs.begin(), segs.end());
	int st = segs[0].first, ed = segs[0].second;
	for (int i = 1; i &lt; segs.size(); i&#43;&#43;) {
		if (segs[i].first &gt; ed) {
			res.push_back({st, ed});
			ed = segs[i].second;
		} else {
			ed = max(ed, segs[i].second);
		}
	}
//	将最后一个区间也放入数组
	res.push_back({st, ed});
	segs = res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, l, r;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
		segs.push_back({l, r});
	}
	merge(segs);
	cout &lt;&lt; segs.size() &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

### 搜索与图论
#### 深度优先搜索(DFS)

**例题1-AcWing 842. 排列数字 **

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10;
int n, path[N];
bool st[N];

void dfs(int u) {
	if (u == n) {
		for (int i = 0; i &lt; n; i&#43;&#43;) printf(&#34;%d &#34;, path[i]);
		puts(&#34;&#34;);
		return;
	}
	for (int i = 1; i &lt;= n; i&#43;&#43;) {// 这里的i表示待选数字
		if (!st[i]) {
			path[u] = i;
			st[i] = true;
			dfs(u &#43; 1);
			st[i] = false;
		}
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n;
	dfs(0);
	return 0;
}
```

**例题2-AcWing 843. n-皇后问题**

优化后的搜索方法
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 20;
char g[N][N];
int n;
bool col[N], dg[N], udg[N];

void dfs(int u) {
	if (u == n) {
		for (int i = 0; i &lt; n; i&#43;&#43;) puts(g[i]);
		puts(&#34;&#34;);
		return;
	}
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		if (!col[i] &amp;&amp; !dg[u &#43; i] &amp;&amp; !udg[n - u &#43; i]) {
			g[u][i] = &#39;Q&#39;;
//			这里dg和udg下标的确定和直线的截距有关
			col[i] = dg[u &#43; i] = udg[n - u &#43; i] = true;
			dfs(u &#43; 1);
			col[i] = dg[u &#43; i] = udg[n - u &#43; i] = false;
			g[u][i] = &#39;.&#39;;
		}
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; n; j&#43;&#43;) g[i][j] = &#39;.&#39;;
	}
	dfs(0);
	return 0;
}
```

朴素的搜索方法
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 20;
char g[N][N];
int n;
bool row[N], col[N], dg[N], udg[N];

void dfs(int x, int y, int s) {
	if (y == n) y = 0, x&#43;&#43;;
	if (x == n) {
		if (s == n) {
			for (int i = 0; i &lt; n; i&#43;&#43;) puts(g[i]);
			puts(&#34;&#34;);
		}
		return;
	}
//	不放皇后
	dfs(x, y &#43; 1, s);
//	放皇后
	if (!row[x] &amp;&amp; !col[y] &amp;&amp; !dg[x &#43; y] &amp;&amp; !udg[x - y &#43; n]) {
		g[x][y] = &#39;Q&#39;;
		row[x] = col[y] = dg[x &#43; y] = udg[x - y &#43; n] = true;
		dfs(x, y &#43; 1, s &#43; 1);
		row[x] = col[y] = dg[x &#43; y] = udg[x - y &#43; n] = false;
		g[x][y] = &#39;.&#39;;
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; n; j&#43;&#43;) g[i][j] = &#39;.&#39;;
	}
	dfs(0, 0, 0);
	return 0;
}
```


#### 宽度优先搜索(BFS)

**例题1-AcWing 844. 走迷宫**

手动模拟队列的方法
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;

using namespace std;

typedef pair&lt;int, int&gt;PII;
const int N = 110;
int n, m;
int g[N][N];// 存储图
int d[N][N];// 存储每个点到起点的距离
PII q[N * N];// 手动模拟队列

int bfs() {
	int hh = 0, tt = 0;// 队头和队尾
	q[0] = {0, 0};// 第一个点入队
	memset(d, -1, sizeof(d));// 初始化, -1表示没有遍历到
	d[0][0] = 0;
	int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};// 向量
	while (hh &lt;= tt) {
		PII t = q[hh&#43;&#43;];// 取出队头元素
		for (int i = 0; i &lt; 4; i&#43;&#43;) {// 向四个方向移动
			int x = t.first &#43; dx[i], y = t.second &#43; dy[i];
			if (x &gt;= 0 &amp;&amp; x &lt; n &amp;&amp; y &gt;= 0 &amp;&amp; y &lt; m &amp;&amp; g[x][y] == 0 &amp;&amp; d[x][y] == -1) {
				d[x][y] = d[t.first][t.second] &#43; 1;// 更新距离数组
				q[&#43;&#43;tt] = {x, y};// 当前遍历到的元素入队
			}
		}
	}
	return d[n - 1][m - 1];// 输出终点的距离
}


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; m; j&#43;&#43;) {
			cin &gt;&gt; g[i][j];
		}
	}
	cout &lt;&lt; bfs() &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

使用STL库中的`queue`实现
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;queue&gt;
using namespace std;

typedef pair&lt;int, int&gt;PII;
const int N = 110;
int n, m, g[N][N], d[N][N];
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};
queue&lt;PII&gt;q;

int bfs() {
	q.push({0, 0});
	memset(d, -1, sizeof(d));
	d[0][0] = 0;
	while (!q.empty()) {
		if (~d[n - 1][m - 1]) break; // 如果已经找到最短路径, 就跳出循环, 剪枝
		auto tmp = q.front();// 取出队头元素
		q.pop();
		for (int i = 0; i &lt; 4; i&#43;&#43;) {
			int x = tmp.first &#43; dx[i], y = tmp.second &#43; dy[i];
			if (x &gt;= 0 &amp;&amp; x &lt; n &amp;&amp; y &gt;= 0 &amp;&amp; y &lt; m &amp;&amp; g[x][y] == 0 &amp;&amp; d[x][y] == -1) {
				d[x][y] = d[tmp.first][tmp.second] &#43; 1;
				q.push({x, y});
			}
		}
	}
	return d[n - 1][m - 1];
}


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; m; j&#43;&#43;) {
			cin &gt;&gt; g[i][j];
		}
	}
	cout &lt;&lt; bfs() &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

### 树与图的存储与遍历

##### 深度优先遍历

**例题1-AcWing 846. 树的重心(TODO)**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;

using namespace std;
const int N = 100010, M = 200010, INF = 0x3f3f3f3f;
int n, a, b, ans = INF;
int h[N], e[M], ne[M], idx;
bool st[N];

void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

// 以u为根的子树中点的数量
int dfs(int u) {
	st[u] = true;
	int sum = 1, res = 0;
	for (int i = h[u]; i != -1; i = ne[i]) {
		int j = e[i];
		if (!st[j]) {
			int s = dfs(j);
			res = max(res, s);
			sum &#43;= s;
		}
	}
	res = max(res, n - sum);
	ans = min(ans, res);
	return sum;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n;
	memset(h, -1, sizeof h);
	for (int i = 0; i &lt; n - 1; i&#43;&#43;) { // 有n-1条边
		cin &gt;&gt; a &gt;&gt; b;
		add(a, b);
		add(b, a);
	}
	dfs(1);
	cout &lt;&lt; ans &lt;&lt; &#39;\n&#39;;
	return 0;

}
```

##### 宽度优先遍历

**例题2-AcWing 847. 图中点的层次(TODO)**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 1e5 &#43; 10, M = 2e5 &#43; 10;
int h[N], e[M], ne[M], idx;
int d[N], q[N];
int n, m;

void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

int bfs() {
	int hh = 0, tt = 0;
	q[0] = 1;
	memset(d, -1, sizeof d);
	d[1] = 0;
	while (hh &lt;= tt) {
		int t = q[hh&#43;&#43;];
		for (int i = h[t]; i != -1; i = ne[i]) {
			int j = e[i];
			if (d[j] == -1) {
				d[j] = d[t] &#43; 1;
				q[&#43;&#43;tt] = j;
			}
		}
	}
	return d[n];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	memset(h, -1, sizeof h);
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		add(a, b);
	}
	cout &lt;&lt; bfs() &lt;&lt; &#39;\n&#39;;
	return 0;
}
```
#### 拓扑排序

**例题1-AcWing 848. 有向图的拓扑序列**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;
const int N = 1e5 &#43; 10;
int n, m;
int h[N], e[N], ne[N], idx;
int q[N], d[N];

void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

bool topsort() {
	int hh = 0, tt = -1;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		if (!d[i]) {
			q[&#43;&#43;tt] = i;
		}
	}
	while (hh &lt;= tt) {
		int t = q[hh&#43;&#43;];
		for (int i = h[t]; i != -1; i = ne[i]) {
			int j = e[i];
			d[j]--;
			if (d[j] == 0) q[&#43;&#43;tt] = j;
		}
	}
	return tt == n - 1;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(h, -1, sizeof h);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		add(a, b);
		d[b]&#43;&#43;;
	}
	if (topsort()) {
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			cout &lt;&lt; q[i] &lt;&lt; &#39; &#39;;
		}
		puts(&#34;&#34;);
	} else {
		cout &lt;&lt; &#34;-1&#34; &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

### 最短路
#### 单源最短路
##### dijkstra算法(正权边)

&gt; 稀疏图和稠密图的区别：
&gt; 
&gt; 稠密图：$边数\ m \approx 点数\ n^2$
&gt; 
&gt; 稀疏图：$边数\ m\ &lt;&lt;\ 点数\ n^2$

朴素Dijkstra算法 $时间复杂度:O(n^2)$, 适合稠密图

**例题1-AcWing 849. Dijkstra求最短路 I**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 510;
int g[N][N];
int dist[N];// 1号点到i号点的最短距离
bool st[N];// 节点状态-是否已经更新为最短距离节点
int n, m;

int dijkstra() {
	memset(dist, 0x3f, sizeof dist);
	dist[1] = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) {// 遍历所有节点
		int t = -1;
		for (int j = 1; j &lt;= n; j&#43;&#43;) {// 找到未处理的最短距离节点
			if (!st[j] &amp;&amp; (t == -1 || dist[t] &gt; dist[j])) {
				t = j;
			}
		}
		if (t == -1) break;
		st[t] = true;
		for (int j = 1; j &lt;= n; j&#43;&#43;) {// 通过新加入的点更新所有点的距离
			dist[j] = min(dist[j], dist[t] &#43; g[t][j]);
		}
	}
	if (dist[n] == 0x3f3f3f3f) return -1;
	else return dist[n];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	memset(g, 0x3f, sizeof g);
	while (m--) {
		int a, b, c;
		cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;
		g[a][b] = min(g[a][b], c);
	}
	int t = dijkstra();
	cout &lt;&lt; t &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

堆优化版的Dijkstra算法 $时间复杂度:O(mlog_n)$, 适合稀疏图
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
#include &lt;queue&gt;
using namespace std;
typedef pair&lt;int, int&gt; PII;
const int INF = 0x3f3f3f3f;
const int N  = 2e5 &#43; 10;
int h[N], e[N], ne[N], w[N];
int dist[N];// 1号点到i号点的最短距离
bool st[N];// 节点状态-是否已经更新为最短距离节点
int n, m, idx;

void add(int a, int b, int c) {// 邻接表存储
	e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

int dijkstra() {
	memset(dist, 0x3f, sizeof dist);
	dist[1] = 0;
	priority_queue&lt;PII, vector&lt;PII&gt;, greater&lt;PII&gt; &gt;heap;// 小顶堆
	heap.push({0, 1});
	while (heap.size()) {
		PII t = heap.top();// 取小根堆中离起点最近的元素
		heap.pop();
		int ver = t.second, distance = t.first;
		if (st[ver]) continue;
		st[ver] = true;
		for (int i = h[ver]; i != -1; i = ne[i]) {// 遍历当前节点 ver 的所有邻接边。
			int j = e[i];
			if (dist[j] &gt; distance &#43; w[i]) {
				dist[j] =  distance &#43; w[i];
				heap.push({dist[j], j});
			}
		}
	}
	if (dist[n] == INF) return -1;
	else return dist[n];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	memset(h, -1, sizeof h);
	while (m--) {
		int a, b, c;
		scanf(&#34;%d%d%d&#34;, &amp;a, &amp;b, &amp;c);
		add(a, b, c);
	}
	int t = dijkstra();
	printf(&#34;%d\n&#34;, t);
	return 0;
}
```

##### Bellman-Ford&#43;SPFA算法(负权边)

Bellman-Ford算法 $时间复杂度:O(n*m)$

**例题1-AcWing 853. 有边数限制的最短路**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 510, M = 10010, INF = 0x3f3f3f3f;
int dist[N];// 距离数组
int backup[N];// 备份数组
int n, m, k;

struct Edge {
	int a, b, w;
} edges[M];

int bellman_ford() {
	memset(dist, 0x3f, sizeof dist);
	dist[1] = 0;
	for (int i = 0; i &lt; k; i&#43;&#43;) {
		memcpy(backup, dist, sizeof dist);// 使用备份数组，防止串联
		for (int j = 0; j &lt; m; j&#43;&#43;) {
			int a = edges[j].a, b = edges[j].b, w = edges[j].w;
			dist[b] = min(dist[b], backup[a] &#43; w);
		}
	}
	if (dist[n] &gt; INF / 2) return -1;
	return dist[n];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%d%d%d&#34;, &amp;n, &amp;m, &amp;k);
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		int a, b, w;
		scanf(&#34;%d%d%d&#34;, &amp;a, &amp;b, &amp;w);
		edges[i] = {a, b, w};
	}
	int t = bellman_ford();
	if (t == -1) puts(&#34;impossible&#34;);
	else printf(&#34;%d\n&#34;, t);
	return 0;
}
```

SPFA算法 $时间复杂度:一般O(n), 最坏O(n*m)$

**例题1-AcWing 851. spfa求最短路**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 1e5 &#43; 10, INF = 0x3f3f3f3f;
int n, m;
int h[N], e[N], ne[N], w[N], idx;
int dist[N];
int st[N];// 判断某个节点是否在队列中

void add(int a, int b, int c) {
	e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

int spfa() {
	memset(dist, 0x3f, sizeof dist);
	dist[1] = 0;
	queue&lt;int&gt; q;
	q.push(1);
	st[1] = true;
	while (q.size()) {
		int t = q.front();
		q.pop();
		st[t] = false;
		for (int i = h[t]; i != -1; i = ne[i]) {// 遍历节点的所有邻接边
			int j = e[i];// 获取边的终点
			if (dist[j] &gt; dist[t] &#43; w[i]) {
				dist[j] = dist[t] &#43; w[i];
				if (!st[j]) {
					q.push(j);// 利用队列来进行优化，从而避免对所有边进行松弛操作
					st[j] = true;
				}
			}
		}
	}
	if (dist[n] == 0x3f3f3f3f) return -1;
	return dist[n];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	memset(h, -1, sizeof h);
	while (m--) {
		int a, b, c;
		scanf(&#34;%d%d%d&#34;, &amp;a, &amp;b, &amp;c);
		add(a, b, c);
	}
	int t = spfa();
	if (t == -1) puts(&#34;impossible&#34;);
	else printf(&#34;%d\n&#34;, t);
	return 0;
}
```

**例题2- AcWing 852. spfa判断负环**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 1e5 &#43; 10, INF = 0x3f3f3f3f;
int n, m;
int h[N], e[N], ne[N], w[N], idx;
int dist[N], cnt[N];
int st[N];// 判断某个节点是否在队列中

void add(int a, int b, int c) {
	e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

bool spfa() {
	queue&lt;int&gt; q;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		st[i] = true;
		q.push(i);
	}
	while (q.size()) {
		int t = q.front();
		q.pop();
		st[t] = false;
		for (int i = h[t]; i != -1; i = ne[i]) {// 遍历节点的所有邻接边
			int j = e[i];// 获取边的终点
			if (dist[j] &gt; dist[t] &#43; w[i]) {
				dist[j] = dist[t] &#43; w[i];
				cnt[j] = cnt[t] &#43; 1;
				if (cnt[j] &gt;= n) return true;
				if (!st[j]) {
					q.push(j);// 利用队列来进行优化，从而避免对所有边进行松弛操作
					st[j] = true;
				}
			}
		}
	}
	return false;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	memset(h, -1, sizeof h);
	while (m--) {
		int a, b, c;
		scanf(&#34;%d%d%d&#34;, &amp;a, &amp;b, &amp;c);
		add(a, b, c);
	}
	if (spfa()) puts(&#34;Yes&#34;);
	else puts(&#34;No&#34;);
	return 0;
}
```

#### 多源最短路
##### Floyed算法
Floyed算法 $时间复杂度:O(n^3)$
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 210, INF = 0x3f3f3f3f;
int d[N][N];
int n, m, k;

void floyd() {
	for (int k = 1; k &lt;= n; k&#43;&#43;) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			for (int j = 1; j &lt;= n; j&#43;&#43;) {
				d[i][j] =  min(d[i][j], d[i][k] &#43; d[k][j]);
			}
		}
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m &gt;&gt; k;
	memset(d, 0x3f, sizeof d);
	for (int i = 0; i &lt; n; i&#43;&#43;) d[i][i] = 0;
	while (m--) {
		int a, b, c;
		cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;
		d[a][b] = min(d[a][b], c);
	}
	floyd();
	while (k--) {
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		if (d[a][b] &gt; INF / 2) puts(&#34;impossible&#34;);
		else cout &lt;&lt; d[a][b] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```
### 最小生成树
#### Prim算法
稠密图用朴素版Prim, $时间复杂度:O(n^2)$
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 510, INF = 0x3f3f3f3f;
int g[N][N];
int dist[N];
bool st[N];
int n, m;

int prim() {
	memset(dist, 0x3f, sizeof dist);
	int res = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		int t = -1;
		for (int j = 1; j &lt;= n; j&#43;&#43;) {
			if (!st[j] &amp;&amp; (t == -1 || dist[t] &gt; dist[j])) {// 找到距离当前集合最小的点
				t = j;
			}
		}
		if (i &amp;&amp; dist[t] == INF) return INF;
		if (i) res &#43;= dist[t];// 如果是第一个点，需要通过下面的代码加入到集合中
		for (int j = 1; j &lt;= n; j&#43;&#43;) dist[j] = min(dist[j], g[t][j]);
		st[t] = true;
	}
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	memset(g, 0x3f, sizeof g);
	while (m--) {
		int a, b, c;
		cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;
		g[a][b] = c;
	}
	int t = prim();
	if (t == INF) puts(&#34;impossible&#34;);
	else cout &lt;&lt; t &lt;&lt; &#39;\n&#39;;
	return 0;
}
```
稀疏图用堆优化版的Prim, $时间复杂度:O(mlog_n)$ `一般不常用`

#### Kruskal算法, $时间复杂度:O(mlog_n)$
```c&#43;&#43;
struct Edge {  
    int x, y, v, st;  
    bool operator &lt; (const Edge &amp;w) const {  
        return v &lt; w.v;  
    }  
} edge[5000];  
  
int Find(int x) {  
    if (x != p[x]) p[x] = Find(p[x]);  
    return p[x];  
}  
  
void Union(int x, int y) {  
    x = Find(x), y = Find(y);  
    if (h[x] &lt; h[y]) p[x]  = y;  
    else if (h[y] &lt; h[x]) p[y] = x;  
    else p[y] = x, h[x]&#43;&#43;;  
}  
  
int kruskal(int n, int num) {  
    for (int i = 0; i &lt;= n; i&#43;&#43;) p[i] = i, h[i] = 0;  
    int cost = 0;  
    for (int i = 0; i &lt; num; i&#43;&#43;) {  
        int x = edge[i].x;  
        int y = edge[i].y;  
        if (Find(x) != Find(y)) {  
            Union(x, y);  
            cost &#43;= edge[i].v;  
        }  
    }  
    return cost;  
}
```

### 二分图
#### 染色法, $时间复杂度:O(m&#43;n)$
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 1e5 &#43; 10, M = 2e5 &#43; 10;
int h[N], e[N], ne[N], idx;
int color[N];

void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a], h[a] = idx&#43;&#43;;
}

bool dfs(int u, int c) {
	color[u] = c;// 进行染色
	for (int i = h[u]; i != -1; i = ne[i]) {
		int v = e[i];
		if (!color[v]) {// 这个邻接点未染色
			if (!dfs(v, 3 - c)) return false;
		} 
		else if (color[v] == c) return false; // 矛盾
	}
	return true;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(h, -1, sizeof h);
	int n, m;
	cin &gt;&gt; n &gt;&gt; m;
	while (m--) {
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		add(a, b), add(b, a);
	}
	bool flag = true;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		if (!color[i]) {
			if (!dfs(i, 1)) {
				flag = false;
				break;
			}
		}
	}
	if (flag) puts(&#34;Yes&#34;);
	else puts(&#34;No&#34;);
	return 0;
}
```
#### 匈牙利算法(月老算法), $时间复杂度:O(m*n)\ 一般远小于这个$
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 510, M = 1e5 &#43; 10;
int h[N], e[M], ne[M], idx;
int n1, n2, m;
int match[N];
bool st[N];

void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a],	h[a] = idx&#43;&#43;;
}

int find(int x) {// 遍历所有邻接点
	for (int i = h[x]; i != -1; i = ne[i]) {
		int j = e[i];
		if (!st[j]) { // 如果右半部的j没有被这个点标记，就先标记
			st[j] = true;
			if (match[j] == 0 || find(match[j])) {// 右半部的未匹配或者之前已经匹配
// 若之前已经匹配到的左半部元素无法找到另一个可匹配的对象就返回false
				match[j] = x;
				return true;
			}
		}
	}
	return false;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(h, -1, sizeof h);
	cin &gt;&gt; n1 &gt;&gt; n2 &gt;&gt; m;
	while (m--) {
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		add(a, b);
	}
	int res = 0;
	for (int i = 1; i &lt;= n1; i&#43;&#43;) {
		memset(st, false, sizeof st);
		if (find(i)) res&#43;&#43;; // 如果能正常匹配
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```


### 数学基础
#### 质素相关
##### 试除法判定质数
```c&#43;&#43;
bool is_prime(int n) {
	if (n &lt; 2) return false;
	for (int i = 2; i &lt;= n / i; i&#43;&#43;) {
		if (n % i == 0) return false;
	}
	return true;
}
```

##### 试除法分解质因数
```c&#43;&#43;
void divide(int n) {
	for (int i = 2; i &lt;= n / i; i&#43;&#43;) {
		if (n % i == 0) {
			int s = 0;
			while (n % i == 0) {
				n /= i;
				s&#43;&#43;;
			}
			cout &lt;&lt; i &lt;&lt; &#34; &#34; &lt;&lt; s &lt;&lt; &#39;\n&#39;;
		}
	}
	if (n &gt; 1) cout &lt;&lt; n &lt;&lt; &#34; &#34; &lt;&lt; &#34;1&#34; &lt;&lt; &#39;\n&#39;;
}
```

##### 埃氏筛($O(nlogn)$)
```c&#43;&#43;
void get_primes(int n) {
	for (int i = 2; i &lt;= n; i&#43;&#43;) {
		if (!st[i]) {
			primes[cnt&#43;&#43;] = i;
			for (int j = i &#43; i; j &lt;= n; j &#43;= i) st[j] = true;
		}
	}
}
```

##### 线性筛($O(nloglogn)$)
```c&#43;&#43;
void get_primes(int n) {
	for (int i = 2; i &lt;= n; i&#43;&#43;) {
		if (!st[i]) primes[cnt&#43;&#43;] = i;
		for (int j = 0; primes[j] &lt;= n / i; j&#43;&#43;) {
			st[primes[j] * i] = true;
			if (i % primes[j] == 0) break;// primes[j]一定是i的最小质因子
		}
	}
}
```
#### 约数相关
##### 试除法求约数
```c&#43;&#43;
vector&lt;int&gt; get_divisors(int n) {
	vector&lt;int&gt; res;
	for (int i = 1; i &lt;= n / i; i&#43;&#43;) {
		if (n % i == 0) {
			res.push_back(i);
			if (n / i != i) res.push_back(n / i);
		}
	}
	sort(res.begin(), res.end(),cmp);
	return res;
}
```

##### 求约数个数

![](imgs/image-20240823200607945.png)

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;map&gt;
using namespace std;
typedef long long ll;
const int MOD = 1e9 &#43; 7;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x;
	cin &gt;&gt; n;
	map&lt;int, int&gt;primes;
	while (n--) {
		cin &gt;&gt; x;
		for (int i = 2; i &lt;= x / i; i&#43;&#43;) {
			while (x % i == 0) {
				x /= i;
				primes[i]&#43;&#43;;
			}
		}
		if (x &gt; 1) primes[x]&#43;&#43;;
	}
	ll res = 1;
	for (auto prime : primes) res = res * (prime.second &#43; 1) % MOD;
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

##### 求约数之和

![](imgs/image-20240823200639160.png)

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;map&gt;
using namespace std;
typedef long long ll;
const int MOD = 1e9 &#43; 7;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x;
	cin &gt;&gt; n;
	map&lt;int, int&gt;primes;
	while (n--) {
		cin &gt;&gt; x;
		for (int i = 2; i &lt;= x / i; i&#43;&#43;) {
			while (x % i == 0) {
				x /= i;
				primes[i]&#43;&#43;;
			}
		}
		if (x &gt; 1) primes[x]&#43;&#43;;
	}
	ll res = 1;
	for (auto prime : primes) {
		int a = prime.first, b = prime.second;
		int t = 1;
		while (b--) t = (t * a &#43; 1) % MOD;
		res = res * t % MOD;// 每次累计res
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 欧几里得算法(辗转相除法)

&gt; GCD(a,b) = GCD(b,a % b)

```c&#43;&#43;
int gcd(int a, int b) {
	return b ? gcd(b, a % b) : a;
}
```


#### 欧拉函数

![](imgs/image-20240823204244353.png)

**例题1-AcWing 873. 欧拉函数**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	while (n--) {
		int a;
		cin &gt;&gt; a;
		int res = a;
		for (int i = 2; i &lt;= a / i; i&#43;&#43;) {
			if (a % i == 0) {
				res = res / i * (i - 1);
				while (a % i == 0) a /= i;
			}
		}
		if (a &gt; 1) res  = res / a * (a - 1);
		cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**例题2-AcWing874. 筛法求欧拉函数**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

const int N = 1e6 &#43; 10;
int cnt, primes[N], phi[N];
bool st[N];

ll get_eulers(int n) {
	phi[1] = 1;
	for (int i = 2; i &lt; n; i&#43;&#43;) {
		if (!st[i]) {
			primes[cnt&#43;&#43;] = i;
			phi[i] = i - 1;
		}
		for (int j = 0; primes[j] &lt;= n / i; j&#43;&#43;) {
			st[primes[j]*i]  = true;
			if (i % primes[j] == 0) {
				phi[primes[j]*i] = phi[i] * primes[j];
				break;
			}
			phi[primes[j]*i] = phi[i] * (primes[j] - 1);
		}
	}
	ll res = 0;
	for (int i = 1; i &lt;= n; i&#43;&#43;) res &#43;= phi[i];
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	cout &lt;&lt; get_eulers(n) &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 快速幂
##### 简单的快速幂
```c&#43;&#43;
int qmi(int a, int k) {
	int res = 1;
	while (k) {
		if (k &amp; 1) res = res * a;
		k &gt;&gt;= 1;
		a = a * a;
	}
	return res;
}
```

##### 带取模的快速幂
```c&#43;&#43;
ll qmi(int a, int k, int p) {
	ll res = 1;
	while (k) {
		if (k &amp; 1) res = res * a % p;
		k &gt;&gt;= 1;
		a = (ll)a * a % p;
	}
	return res;
}
```

##### 快速幂求逆元

![](imgs/image-20240824100411661.png)

&gt; 当 $p$ 为质数时, 由费马小定理可得:
$$a^{p-1} \equiv 1 \pmod{p}$$
 当 $p$ 为质数时，可以用费马小定理 &#43; 快速幂求逆元：

$$\because\ a^{p-1} \equiv 1 \pmod{p}$$
$$\therefore\ a \times a^{p-2} \equiv 1 \pmod{p}$$
$$\therefore\ a^{p-2} \text{ 就是 } a \text{ 的逆元。}$$

```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

ll qmi(int a, int k, int p) {
	ll res = 1;
	while (k) {
		if (k &amp; 1) res = res * a % p;
		k &gt;&gt;= 1;
		a = a * a % p;
	}
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	while (n--) {
		int b, m;
		cin &gt;&gt; b &gt;&gt; m;
		if (b % m != 0) cout &lt;&lt; qmi(b, m - 2, m) &lt;&lt; &#39;\n&#39;;
		else puts(&#34;impossible&#34;);
	}
	return 0;
}
```

#### 扩展欧几里得算法

&gt; 裴蜀定理：
&gt; 
&gt; 对于任意两个整数 a 和 b，它们的最大公约数 gcd(a, b) 可以表示为 a 和 b 的线性组合，即存在整数 x 和 y，使得：
$$ax &#43; by = \gcd(a, b)$$

```c&#43;&#43;
int exgcd(int a, int b, int &amp;x, int &amp;y) {
	if (!b) {
		x = 1, y = 0;
		return a;
	}
	int d = exgcd(b, a % b, y, x);
	y = y - a / b * x;
	return d;
}
```

**例题1-AcWing 878. 线性同余方程**

$$\begin{cases} a \cdot x &#43; m \cdot y = b \\ a \cdot x_0 &#43; m \cdot y_0 = \gcd(a, m) \end{cases}$$
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

int exgcd(int a, int b, int &amp;x, int &amp;y) {
	if (!b) {
		x = 1, y = 0;
		return a;
	}
	int d = exgcd(b, a % b, y, x);
	y = y - a / b * x;
	return d;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, a, b, m, x, y;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; a &gt;&gt; b &gt;&gt; m;
		int d = exgcd(a, m, x, y);
		if (b % d == 0) {
			cout &lt;&lt; (ll) b / d * x % m &lt;&lt; &#39;\n&#39;;
		} else {
			puts(&#34;impossible&#34;);
		}
	}
	return 0;
}
```

#### 中国剩余定理(TODO)

&gt; 设 $n_1, n_2, \dots, n_k$ 是两两互质的正整数，且 $N = n_1​ × n_2 ​× ⋯ × n_k$。如果我们有如下同余方程组：

$$
\begin{cases}
x \equiv a_1 \pmod{n_1} \\
x \equiv a_2 \pmod{n_2} \\
\vdots \\
x \equiv a_k \pmod{n_k}
\end{cases}
$$

那么这个方程组在模 N 下有唯一解 x ：
$$x \equiv \sum_{i=1}^{k} a_i \cdot M_i \cdot y_i \pmod{N}$$

其中，$M_i = \frac{N}{n_i}$，而 $y_i$ 是 $M_i$ 在模 $n_i$ 下的逆元，即：
$$M_i \cdot y_i \equiv 1 \pmod{n_i}$$

&gt; 最终解的表达式可以写为：

$$x = \left(\sum_{i=1}^{k} a_i \cdot M_i \cdot y_i\right) \mod N$$

#### 高斯消元
**例题1-AcWing 883. 高斯消元解线性方程组**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cmath&gt;
using namespace std;

const int N = 110, eps = 1e-8;
int n;
double a[N][N];

void out() {
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= n &#43; 1; j&#43;&#43;) printf(&#34;%10.2lf&#34;, a[i][j]);
		puts(&#34;&#34;);
	}
	puts(&#34;&#34;);
}


int gauss() {
	int r = 1;
	for (int c = 1; c &lt;= n; c&#43;&#43;) { // 枚举每一列
		int t = r;
		for (int i = r; i &lt;= n; i&#43;&#43;) {
			if (fabs(a[i][c]) &gt; fabs(a[t][c])) t = i;// 找出该列中绝对值最大的行
		}
		if (fabs(a[t][c]) &lt; eps) continue; // 若该行c列为0, 那么处理下一列
		for (int i = c; i &lt;= n &#43; 1; i&#43;&#43;) swap(a[t][i], a[r][i]);// 将绝对值最大的行与当前行互换
		for (int i = n &#43; 1; i &gt;= c; i--) a[r][i] /= a[r][c]; // 将行首系数化为1
		for (int i = r &#43; 1; i &lt;= n; i&#43;&#43;) {
			for (int j = n &#43; 1; j &gt;= c; j--) {
				a[i][j] -= a[r][j] * a[i][c];// 将该行行首元素化为0
			}
		}
//		out();
		r&#43;&#43;;// 处理下一行
	}
	if (r &lt;= n) { // 在某次执行过程中存在剩下的某列的系数全为0
		for (int i = r; i &lt;= n; i&#43;&#43;) {
			if (fabs(a[i][n &#43; 1]) &gt; eps) return 0;// 若方程右边不为0, 则无解
		}
		return 2;// 若方程右边全为0, 则多解
	}
	for (int i = n - 1; i &gt;= 1; i--) { // 末行已处理好, 因此从倒数第二行开始倒着处理每行
		for (int j = i &#43; 1; j &lt;= n; j&#43;&#43;) {
			a[i][n &#43; 1] -= a[i][j] * a[j][n &#43; 1];
		}
	}
	return 1;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= n &#43; 1; j&#43;&#43;) cin &gt;&gt; a[i][j];
	}
	int t = gauss();
	if (t == 0) puts(&#34;No solution&#34;);
	else if (t == 2) puts(&#34;Infinite group solutions&#34;);
	else {
		for (int i = 1; i &lt;= n; i&#43;&#43;) printf(&#34;%.2lf\n&#34;, a[i][n &#43; 1]);
	}
	return 0;
}
```

#### 组合数

##### 排列与组合

排列公式如下
$$
A^n_m = \frac{m!}{(m-n)!} = m\ \cdot\ (m-1)\ \cdot \ ... \ \cdot (\ m-(n-1)\ ) 
$$

```c&#43;&#43;
ll Permutation(int m, int n) {
	if (n &gt; m) return 0;
	if (n == 0) return 1;
	ll up = 1, down = 1;
	for (int i = 1; i &lt;= m; i&#43;&#43;) up *= i;
	for (int i = 1; i &lt;= (m - n); i&#43;&#43;) down *= i;
	return up / down;
}
```

组合公式如下

$$
C^n_m = \frac{m!}{n!\cdot(m-n)!} = \frac{m\cdot(m-1)\cdot\ ...\ \cdot (\ m-(n-1)\ )}{1\ \cdot \ 2\ \cdot\  ...\ \cdot (n-1)\ \cdot n}
$$

```c&#43;&#43;
ll combination(int m, int n) {
	if (m == 0) return 1;
	if (n &gt; m) return 0;
	ll up = 1, down = 1, res;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		up *= m - i;
		down *= i &#43; 1;
	}
	return  up / down;
}
```

##### $C_a^b$在多重场景下的求法
**例题1-AcWing885.求组合数1**
这道题因为 $1&lt;=a,b&lt;=2000$, 所以可以使用递推的方法初始化, 递推公式如下
$$
C_a^b\ = \ C_{a-1}^{b-1} \ &#43; \ C_{a-1}^b
$$
```c&#43;&#43;
void init() {
	for (int i = 0; i &lt; N; i&#43;&#43;) {
		for (int j = 0; j &lt;= i; j&#43;&#43;) {
			if (!j) c[i][j] = 1;
			else c[i][j] = (c[i - 1][j - 1] &#43; c[i - 1][j]) % mod;
		}
	}
}
```

**例题2-AcWing886.求组合数2**
这题因为$1&lt;=a,b&lt;=10^5$, 直接递推打表会$MLE$，因此我们可以使用费马小定理&#43;快速幂求逆元的方法来递推求解
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;
const int N = 1e5 &#43; 10, mod = 1e9 &#43; 7;

int fact[N], infact[N];

ll qmi(int a, int k, int p) {
	ll res = 1;
	while (k) {
		if (k &amp; 1) res = res * a % p;
		k &gt;&gt;= 1;
		a = (ll) a * a % p;
	}
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	fact[0] = infact[0] = 1;
	for (int i = 1; i &lt; N; i&#43;&#43;) {
		fact[i] = (ll) fact[i - 1] * i % mod;
		infact[i] = (ll) infact[i - 1] * qmi(i, mod - 2, mod) % mod;// 逆元累乘
	}
	int n, a, b;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; a &gt;&gt; b;
		cout &lt;&lt; (ll) fact[a] * infact[b] % mod * infact[a - b] % mod &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```
**例题3-AcWing887.求组合数3**
因为$1&lt;=a,b&lt;=10^{18}$, 所以这里需要用到下面这个卢卡斯定理
&gt; Lucas定理
$$
C_a^b\ = \ C_{a\%p}^{b\%p}\ *\  C_{a\div p}^{b\div p}\ (mod\ p)
$$
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

int qmi(int a, int k, int p) {
	int res = 1;
	while (k) {
		if (k &amp; 1) res = (ll)res * a % p;
		k &gt;&gt;= 1;
		a = (ll)a * a % p;
	}
	return res;
}

int C(int a, int b, int p) {
	int res = 1;
	if (a &lt; b) return 0;
	for (int i = 1, j = a; i &lt;= b; i&#43;&#43;, j--) {
		res = (ll) res * j % p;
		res = (ll) res * qmi(i, p - 2, p) % p;
	}
	return res;
}

int lucas(ll a, ll b, int p) {
	if (a &lt; p &amp;&amp; b &lt; p) return C(a, b, p);
	return (ll) C(a % p, b % p, p) * lucas(a / p, b / p, p) % p;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, a, b, c, p;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; a &gt;&gt; b &gt;&gt; p;
		cout &lt;&lt; lucas(a, b, p) &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**例题4-AcWing888.求组合数4**
这道题要求我们计算 $C_a^b$ 的精确数值, 不进行取模, 并且 $1&lt;=a,b&lt;=500$ ,因此我们这里需要用到分解质因数&#43;高精度乘法的方法

这里还需要用到下面这个定理来提高效率
![](imgs/image-20240824191901858.png)

![](imgs/image-20240824192012316.png)

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

const int N = 5010;
int primes[N], sum[N], cnt;
bool st[N];

void get_primes(int n) {
	for (int i = 2; i &lt;= n; i&#43;&#43;) {
		if (!st[i]) primes[cnt&#43;&#43;] = i;
		for (int j = 0; primes[j] &lt;= n / i; j&#43;&#43;) {
			st[primes[j]*i] = true;
			if (i % primes[j] == 0) break;
		}
	}
}

vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, int b) {
	vector&lt;int&gt;C;
	int t = 0;
	for (int i = 0; i &lt; A.size(); i&#43;&#43;) {
		t &#43;= A[i] * b;
		C.push_back(t % 10);
		t /= 10;
	}
	while (t) {
		C.push_back(t % 10);
		t /= 10;
	}
	return C;
}

int get(int n, int p) {
	int cnt2 = 0;
	while (n) {
		cnt2 &#43;= n / p;
		n /= p;
	}
	return cnt2;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int a, b;
	cin &gt;&gt; a &gt;&gt; b;
	get_primes(a);
	for (int i = 0; i &lt; cnt; i&#43;&#43;) {
		int p = primes[i];
		sum[i] = get(a, p) - get(b, p) - get(a - b, p);// 根据定理和公式分解质因数
	}
	vector&lt;int&gt;res;
	res.push_back(1);
	for (int i = 0; i &lt; cnt; i&#43;&#43;) {
		for (int j = 0; j &lt; sum[i]; j&#43;&#43;) {// 根据每个素数出现的次数将素数相乘
			res = mul(res, primes[i]);
		}
	}
	for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
	puts(&#34;&#34;);
	return 0;
}
```
#### 卡特兰数
$$
C_{2n}^{n}-C_{2n}^{n-1}\ = \ \frac{1}{n&#43;1} \cdot
 C_{2n}^n$$
**例题1-AcWing 889. 满足条件的01序列**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

const int mod = 1e9 &#43; 7;

ll qmi(int a, int k, int p) {
	int res = 1;
	while (k) {
		if (k &amp; 1) res = (ll)res * a % p;
		k &gt;&gt;= 1;
		a = (ll)a * a % p;
	}
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	int res = 1;
	for (int i = 2 * n; i &gt; n; i--) res = (ll)res * i % mod;// 组合数的分子
	for (int i = 1; i &lt;= n; i&#43;&#43;) res = (ll)res * qmi(i, mod - 2, mod) % mod;// 组合数的分母的逆元
	res = (ll) res * qmi(n &#43; 1, mod - 2, mod) % mod;
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 容斥原理(TODO)
**例题1-AcWing 890. 能被整除的数**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

const int N = 20;
int p[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m;
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; m; i&#43;&#43;) cin &gt;&gt; p[i];
	int res = 0;
	for (int i = 1; i &lt; 1 &lt;&lt; m; i&#43;&#43;) {// 枚举1到2^m-1每个数
		int t = 1, cnt = 0;
		for (int j = 0; j &lt; m; j&#43;&#43;) {
			if (i &gt;&gt; j &amp; 1) {
				cnt&#43;&#43;;
				if ((ll)t * p[j] &gt; n) {
					t -= 1;
					break;
				}
				t *= p[j];
			}
		}
		if (t != -1) {
			if (cnt &amp; 1) res &#43;= n / t;
			else res -= n / t;
		}
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 博弈论

**例题1-AcWing 891. Nim游戏**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x, res = 0;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; x;
		res ^= x;
	}
	if (res) cout &lt;&lt; &#34;Yes&#34; &lt;&lt; &#39;\n&#39;;
	else cout &lt;&lt; &#34;No&#34; &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**例题2-AcWing 893. 集合-Nim游戏**

![](imgs/image-20240825121512404.png)

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;set&gt;
using namespace std;

const int N = 110, M = 10010;
int n, m, s[N], f[N];// s表示可选的取法, f表示sg的值

int sg(int x) {
	if (f[x] != -1) return f[x];// 记忆化搜索
	set&lt;int&gt;S;
	for (int i = 0; i &lt; m; i&#43;&#43;) {// 遍历所有后继节点
		int sum = s[i];
		if (x &gt;= sum) S.insert(sg(x - sum));// 将所有后继节点的sg值插入集合
	}
	for (int i = 0;; i&#43;&#43;) {// mex()函数
		if (!S.count(i)) return f[x] = i;
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; m;
	for (int i = 0; i &lt; m; i&#43;&#43;) cin &gt;&gt; s[i];
	cin &gt;&gt; n;
	memset(f, -1, sizeof f);
	int res = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) {// 将每堆石子的sg值异或在一起
		int x;
		cin &gt;&gt; x;
		res ^= sg(x);
		printf(&#34;sg(%d) = %d\n&#34;, x, sg(x));
	}
	if (res) puts(&#34;Yes&#34;);
	else puts(&#34;No&#34;);
	return 0;
}
```



### 动态规划(Dynamic Programming, dp)

#### 背包问题(TODO)
&gt; Tips: 只有在01背包和分组背包问题中, 降维时需要考虑 j(容量) 的逆序遍历, 因为限制了每个或者每组物品只能用一次
&gt; 
&gt; 逆序遍历是为了确保物品只被使用一次

##### 01背包

&gt; 每件物品最多用一次

**二维数组法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10010;
int f[N][N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, w, v; // n是物品数量, m是背包容量, w是物品的价值, v是物品的体积
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d&#34;, &amp;v, &amp;w);
			for (int j = 1; j &lt;= m; j&#43;&#43;) {
				f[i][j] = f[i - 1][j]; // 默认初始化为不选第i个物品
//				将问题转化为不选当前物品和选当前物品两种情况
//				选取当前物品后, 当前物品的价值要加上之前f[i-1][j-v]情况的最优解
				if (j &gt;= v) f[i][j] = max(f[i][j], f[i - 1][j - v] &#43; w);
			}
		}
		cout &lt;&lt; f[n][m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**一维数组法(可以画个图辅助理解)**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10010;
int f[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, w, v;
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d&#34;, &amp;v, &amp;w);
//			这里需要从大到小逆序遍历
//			因为用的是一维数组, 更新当前数据需要用到前面的数据
//			如果逆序遍历, 前面的数据会被我们修改
			for (int j = m; j &gt;= v; j--) {
				f[j] = max(f[j], f[j - v] &#43; w);
			}
		}
		cout &lt;&lt; f[m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

##### 完全背包

&gt; 每件物品个数无限

**二维数组法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10010;
int f[N][N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, v, w;
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d&#34;, &amp;v, &amp;w);
			for (int j = 1; j &lt;= m; j&#43;&#43;) {
				f[i][j] = f[i - 1][j];
				if (j &gt;= v) f[i][j] = max(f[i][j], f[i][j - v] &#43; w);//状态转移方程
			}
		}
		cout &lt;&lt; f[n][m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**一维数组法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10010;
int f[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, v, w;
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d&#34;, &amp;v, &amp;w);
//			完全背包问题是在同一行内更新,所以顺序遍历即可
			for (int j = v; j &lt;= m; j&#43;&#43;) {
				f[j] = max(f[j], f[j - v] &#43; w);
			}
		}
		cout &lt;&lt; f[m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

##### 多重背包

&gt; 每件物品的个数有限

**暴力解法**

首先列出状态转移方程 `f[i][j] = max(f[i - 1][j - v * k] &#43; w * k)`

**二维朴素做法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int f[N][N];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, v, w, s;
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d%d&#34;, &amp;v, &amp;w, &amp;s);
			for (int j = 1; j &lt;= m; j&#43;&#43;) {
				for (int k = 0; k &lt;= s &amp;&amp; v * k &lt;= j; k&#43;&#43;) {
//					这里要注意的是, 当前的f[i][j]取得是与状态转移方程结果的最大值
					f[i][j] = max(f[i][j], f[i - 1][j - k * v] &#43; k * w);
				}
			}
		}
		cout &lt;&lt; f[n][m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**一维朴素做法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int f[N];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, v, w, s;
	while (cin &gt;&gt; n &gt;&gt; m) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d%d&#34;, &amp;v, &amp;w, &amp;s);
			for (int j = 1; j &lt;= m; j&#43;&#43;) {
				for (int k = 0; k &lt;= s &amp;&amp; v * k &lt;= j; k&#43;&#43;) {
					f[j] = max(f[j], f[j - k * v] &#43; k * w);
				}
			}
		}
		cout &lt;&lt; f[m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

**二进制优化**

**二维版本**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;

using namespace std;
const int N = 12010, M = 2010;

int n, m;
int v[N], w[N];
int f[N][M]; //二维数组版本，AcWing 5. 多重背包问题 II 内存限制是64MB
//只能通过滚动数组或者变形版本的一维数组，直接二维数组版本MLE

//多重背包的二进制优化
int main() {
    scanf(&#34;%d %d&#34;, &amp;n, &amp;m);

    int idx = 0;
    for (int i = 1; i &lt;= n; i&#43;&#43;) {
        int a, b, s;
        scanf(&#34;%d %d %d&#34;, &amp;a, &amp;b, &amp;s);
        //二进制优化,能打包则打包之，1,2,4,8,16,...
        int k = 1;
        while (k &lt;= s) {
            idx&#43;&#43;;
            v[idx] = a * k;
            w[idx] = b * k;
            s -= k;
            k *= 2;
        }
        //剩下的
        if (s &gt; 0) {
            idx&#43;&#43;;
            v[idx] = a * s;
            w[idx] = b * s;
        }
    }
    n = idx; //数量减少啦
    // 01背包
    for (int i = 1; i &lt;= n; i&#43;&#43;)
        for (int j = 1; j &lt;= m; j&#43;&#43;) {
            f[i][j] = f[i - 1][j];
            if (j &gt;= v[i]) f[i][j] = max(f[i][j], f[i - 1][j - v[i]] &#43; w[i]);
        }

    printf(&#34;%d\n&#34;, f[n][m]);
    return 0;
}

```

**一维版本**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;

using namespace std;
const int N = 12010, M = 2010;

int n, m;
int v[N], w[N];
int f[M];

//多重背包的二进制优化
int main() {
    scanf(&#34;%d %d&#34;, &amp;n, &amp;m);

    int cnt = 0;
    for (int i = 1; i &lt;= n; i&#43;&#43;) {
        int a, b, s;
        scanf(&#34;%d %d %d&#34;, &amp;a, &amp;b, &amp;s);
        //二进制优化,能打包则打包之，1,2,4,8,16,...
        int k = 1;
        while (k &lt;= s) {
            cnt&#43;&#43;;
            v[cnt] = a * k;
            w[cnt] = b * k;
            s -= k;
            k *= 2;
        }
        //剩下的
        if (s &gt; 0) {
            cnt&#43;&#43;;
            v[cnt] = a * s;
            w[cnt] = b * s;
        }
    }
    n = cnt; //数量减少啦
    // 01背包
    for (int i = 1; i &lt;= n; i&#43;&#43;)
        for (int j = m; j &gt;= v[i]; j--)
            f[j] = max(f[j], f[j - v[i]] &#43; w[i]);

    printf(&#34;%d\n&#34;, f[m]);
    return 0;
}

```

##### 分组背包

**二维数组做法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;

using namespace std;

const int N = 110;
int n, m;
int f[N][N], v[N][N], w[N][N], s[N];

int main() {
    cin &gt;&gt; n &gt;&gt; m;
    for (int i = 1; i &lt;= n; i&#43;&#43;) {
        cin &gt;&gt; s[i]; // 第i个分组中物品个数
        for (int j = 1; j &lt;= s[i]; j&#43;&#43;)
            cin &gt;&gt; v[i][j] &gt;&gt; w[i][j]; // 第i个分组中物品的体积和价值
    }

    for (int i = 1; i &lt;= n; i&#43;&#43;)
        for (int j = 0; j &lt;= m; j&#43;&#43;) {
            for (int k = 0; k &lt;= s[i]; k&#43;&#43;)
                if (j &gt;= v[i][k])
                    f[i][j] = max(f[i][j], f[i - 1][j - v[i][k]] &#43; w[i][k]); // 枚举每一个PK一下大小
        }
    // 输出打表结果
    printf(&#34;%d&#34;, f[n][m]);
    return 0;
}

```

**一维数组做法**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;

using namespace std;
const int N = 110;

int n, m;
int v[N][N], w[N][N], s[N];
int f[N];

int main() {
    cin &gt;&gt; n &gt;&gt; m;

    for (int i = 1; i &lt;= n; i&#43;&#43;) {
        cin &gt;&gt; s[i];
        for (int j = 1; j &lt;= s[i]; j&#43;&#43;)
            cin &gt;&gt; v[i][j] &gt;&gt; w[i][j];
    }

    for (int i = 1; i &lt;= n; i&#43;&#43;)
        for (int j = m; j &gt;= 0; j--)
            for (int k = 1; k &lt;= s[i]; k&#43;&#43;)
                if (j &gt;= v[i][k])
                    f[j] = max(f[j], f[j - v[i][k]] &#43; w[i][k]);

    printf(&#34;%d\n&#34;, f[m]);
    return 0;
}
```

#### 线性dp
**例题1-AcWing898. 数字三角形**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 510, INF = 1e9;
int a[N][N], f[N][N];


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= i; j&#43;&#43;) {
			scanf(&#34;%d&#34;, &amp;a[i][j]);
		}
	}
	for (int i = 0; i &lt;= n; i&#43;&#43;) {
		for (int j = 0; j &lt;= i &#43; 1; j&#43;&#43;) {
			f[i][j] = -INF;
		}
	}
	f[1][1] = a[1][1];// f[1][1]需要手动初始化
	for (int i = 2; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= i; j&#43;&#43;) {
			f[i][j] = max(f[i - 1][j - 1], f[i - 1][j]) &#43; a[i][j];
		}
	}
	int res = -INF;
	for (int i = 1; i &lt;= n; i&#43;&#43;) res = max(res, f[n][i]);
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**例题2-AcWing895. 最长上升子序列** 
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int a[N], f[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, res = 0;
	cin &gt;&gt; n;
	for (int i = 1; i &lt;= n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		f[i] = 1;
		for (int j = 1; j &lt; i; j&#43;&#43;) {
			if (a[j] &lt; a[i]) {
				f[i] = max(f[i], f[j] &#43; 1);
			}
			res = max(res, f[i]);
		}
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

可以使用下面的代码, 记录并输出状态转移路径
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int a[N], f[N], g[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, res = 0;
	cin &gt;&gt; n;
	for (int i = 1; i &lt;= n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		f[i] = 1;
		g[i] = 0;
		for (int j = 1; j &lt; i; j&#43;&#43;) {
			if (a[j] &lt; a[i]) {
				if (f[i] &lt; f[j] &#43; 1) {
					f[i] = f[j] &#43; 1;
					g[i] = j;
				}
			}
		}
	}
	int k = 1;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		if (f[k] &lt; f[i]) k = i;
	}
	cout &lt;&lt; f[k] &lt;&lt; &#39;\n&#39;;
	int len = f[k];
	for (int i = 1; i &lt;= len; i&#43;&#43;) {
		cout &lt;&lt; a[k] &lt;&lt; &#39; &#39;;
		k = g[k];
	}
	return 0;
}
```

**例题3-AcWing897. 最长公共子序列 **
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int f[N][N];
char a[N], b[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m;
	cin &gt;&gt; n &gt;&gt; m;
	scanf(&#34;%s%s&#34;, a &#43; 1, b &#43; 1);
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		for (int j = 1; j &lt;= m; j&#43;&#43;) {
			f[i][j] = max(f[i - 1][j], f[i][j - 1]);
			if (a[i] == b[j]) f[i][j] = max(f[i][j], f[i - 1][j - 1] &#43; 1);
//			cout &lt;&lt; i &lt;&lt; &#34; &#34; &lt;&lt; j &lt;&lt; &#34; &#34; &lt;&lt; f[i][j] &lt;&lt; &#39;\n&#39;;
		}
	}
	cout &lt;&lt; f[n][m] &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 区间dp
**例题1-AcWing282. 石子合并**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
int f[N][N], s[N];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n; cin &gt;&gt; n;
	memset(f, 0x3f, sizeof(f));
	for (int i = 1; i &lt;= n; i&#43;&#43;) scanf(&#34;%d&#34;, s &#43; i);
	for (int i = 1; i &lt;= n; i&#43;&#43;) s[i] &#43;= s[i - 1];
	for (int i = 1; i &lt;= n; i&#43;&#43;) f[i][i] = 0;// 自己和自己合并不需要代价
	for (int len = 2; len &lt;= n; len&#43;&#43;) {// 从2开始枚举长度
		for (int i = 1; i &#43; len - 1 &lt;= n; i&#43;&#43;) {// 枚举起点
			int l = i, r = i &#43; len - 1;
			for (int k = l; k &lt; r; k&#43;&#43;) {// 枚举分隔点
				f[l][r] = min(f[l][r], f[l][k] &#43; f[k &#43; 1][r] &#43; s[r] - s[l - 1]);
			}
		}
	}
	cout &lt;&lt; f[1][n] &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 计数类dp




#### 数位统计dp

#### 状态压缩dp

#### 树形dp

#### 记忆化搜索





### 贪心算法

#### 区间贪心

&gt; 区间贪心的算法可以尝试按照区间的某个端点进行排序

**例题1-AcWing905.区间选点**

**例题2-AcWing908.最大不相交区间数量**

这两道题方法和代码是一模一样的，可能会有一点不好理解，可以参考一下[这篇文章](https://www.cnblogs.com/littlehb/p/15469211.html)

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef pair&lt;int, int&gt;PII;

const int N = 1e5 &#43; 10;
vector&lt;PII&gt;a;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, l, r, res = 1;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
		a.push_back({r, l});
	}
	sort(a.begin(), a.end());
	int ed = a[0].first;
	for (int i = 1; i &lt; n; i&#43;&#43;) {
		if (a[i].second &gt; ed) {
			res&#43;&#43;;
			ed = a[i].first;
		}
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**例题3-AcWing906.区间分组**

解法一

&gt; Dilworth 定理：最小不相交分组数等于最大相交组的元素个数

因此求区间分组的问题就可以与下面的问题进行类比

&gt; 有若干个活动，第i个活动开始时间和结束时间是 `[Si,Ei]` ，同一个教室安排的活动之间不能交叠，求要安排所有活动，至少需要几个教室？

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
vector&lt;int&gt;v;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, l, r, res = 1, cnt = 0;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
//		通过奇偶性来标记左右端点
		v.push_back(l * 2);
		v.push_back(r * 2 &#43; 1);
	}
	sort(v.begin(), v.end());
	for (int i = 0; i &lt; v.size(); i&#43;&#43;) {
		if (v[i] % 2 == 0) cnt&#43;&#43;;
		else cnt--;
//		记录冲突最大的时刻
		res = max(res, cnt);
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

解法二(使用小根堆的做法) TODO

[参考文章](https://www.cnblogs.com/littlehb/p/15470606.html)

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;

struct Node {
	int l, r;
//	重载运算符
	const bool operator&lt; (const Node &amp;b) const {
		return l &lt; b.l;
	}
} range[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43; ) cin &gt;&gt; range[i].l &gt;&gt; range[i].r;
	sort(range, range &#43; n);
//	创建小根堆
	priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt; &gt;heap;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		Node t = range[i];
// 	如果当前队列为空，或者区间的端点小于小根堆的根（当前组的最小右端点）
//	新建一个组
		if (heap.empty() || heap.top() &gt;= t.l) heap.push(t.r);
//	加入当前的组中
		else heap.pop(), heap.push(t.r);
	}
	cout &lt;&lt; heap.size() &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**例题3-AcWing907.区间覆盖**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
struct Node {
	int l, r;
	const bool operator&lt; (const Node &amp;b) const {
		return l &lt; b.l;
	}
} range[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, l, r, st, ed, res = 0;
	bool flag = false;
	cin &gt;&gt; st &gt;&gt; ed &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;l, &amp;r);
		range[i] = {l, r};
	}
	sort(range, range &#43; n);
	for (int i = 0; i &lt; n;) {
		int j = i, r = -2e9;
		while (j &lt; n &amp;&amp; range[j].l &lt;= st) {
			r = max(r, range[j].r);
			j&#43;&#43;;
		}
		if (r &lt; st) {//找不到能覆盖st的区间
			cout &lt;&lt; &#34;-1&#34; &lt;&lt; &#39;\n&#39;;
			break;
		}
		res&#43;&#43;;
		if (r &gt;= ed) {//已经完全覆盖目标区间
			flag = true;
			cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
			break;
		}
		st = r;
		i = j;
	}
	if (!flag) cout &lt;&lt; &#34;-1&#34; &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 哈夫曼树

**例题1-AcWing148.合并果子**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

//升序队列、小顶堆
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt; &gt; q;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x, a, b, res = 0;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d&#34;, &amp;x);
		q.push(x);
	}
	while (q.size() &gt; 1) {
		a = q.top();
		q.pop();
		b = q.top();
		q.pop();
		res &#43;= a &#43; b;
		q.push(a &#43; b);
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```


## 数据结构
### 链表与邻接表
#### 单链表
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
const int N = 1e5 &#43; 10;

int e[N], ne[N], idx, head;

void init() {// 初始化
	head = -1;
	idx = 0;
}

void add_to_head(int x) {// 在头节点后插入元素
	e[idx] = x, ne[idx] = head, head = idx &#43;&#43;;
}

void add(int k, int x) {// 在下标为k的元素后插入一个元素
	e[idx] = x, ne[idx] = ne[k], ne[k] = idx&#43;&#43;;
}

void remove(int k) {// 删除下标为k的元素
	ne[k] = ne[ne[k]];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	init();
	int m, k, x;
	char op;
	cin &gt;&gt; m;
	while (m--) {
		cin &gt;&gt; op;
		if (op == &#39;H&#39;) {
			cin &gt;&gt; x;
			add_to_head(x);
		} else if (op == &#39;I&#39;) {
			cin &gt;&gt; k &gt;&gt; x;
			add(k - 1, x);
		} else {
			cin &gt;&gt; k;
			if (k == 0) head = ne[head];// 删除头节点
			else remove(k - 1);
		}
	}
	for (int i = head; i != -1; i = ne[i]) cout &lt;&lt; e[i] &lt;&lt; &#39; &#39;;
	return 0;
}
```
#### 双链表
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int e[N], l[N], r[N], idx;

void init() {
	r[0] = 1, l[1] = 0, idx = 2;
}

void add(int k, int x) {
	e[idx] = x, r[idx] = r[k], l[idx] = k;
	l[r[k]] = idx, r[k] = idx&#43;&#43;;
}

void remove(int k) {
	r[l[k]] = r[k], l[r[k]] = l[k];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	init();
	int m, k, x;
	string op;
	cin &gt;&gt; m;
	while (m--) {
		cin &gt;&gt; op;
		if (op == &#34;L&#34;) {
			cin &gt;&gt; x;
			add(0, x);// 0号点右边就是链表的最左边
		} else if (op == &#34;R&#34;) {
			cin &gt;&gt; x;
			add(l[1], x);// 1号点左边就是链表的最右边
		} else if (op == &#34;D&#34;) {
			cin &gt;&gt; k;
			remove(k &#43; 1);// 第一个插入元素的下标是2
		} else if (op == &#34;IL&#34;) {
			cin &gt;&gt; k &gt;&gt; x;
			add(l[k &#43; 1], x);
		} else if (op == &#34;IR&#34;) {
			cin &gt;&gt; k &gt;&gt; x;
			add(k &#43; 1, x);
		}
	}
	for (int i = r[0]; i != 1; i = r[i]) cout &lt;&lt; e[i] &lt;&lt; &#39; &#39;;
	// 当前节点的下标等于 1 时，退出循环
	return 0;
}
```

### 栈与队列
#### 模拟栈
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int stk[N], tt;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string cmd;
	int n, x;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; cmd;
		if (cmd == &#34;push&#34;) {
			cin &gt;&gt; x;
			stk[&#43;&#43;tt] = x;
		} else if (cmd == &#34;pop&#34;) {
			tt--;
		} else if (cmd == &#34;query&#34;) {
			cout &lt;&lt; stk[tt] &lt;&lt; &#39;\n&#39;;
		} else if (cmd == &#34;empty&#34;) {
			if (tt == 0) puts(&#34;YES&#34;);
			else puts(&#34;NO&#34;);
		}
	}
	return 0;
}
```
#### 模拟队列
**普通队列**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int q[N], hh, tt = -1;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string op;
	int n;
	cin &gt;&gt; n;
	while (n--) {
		cin &gt;&gt; op;
		if (op == &#34;push&#34;) {
			cin &gt;&gt; q[&#43;&#43;tt];
		} else if (op == &#34;pop&#34;) {
			hh&#43;&#43;;
		} else if (op == &#34;empty&#34;) {
			hh &gt; tt ? puts(&#34;YES&#34;) : puts(&#34;NO&#34;);
		} else if (op == &#34;query&#34;) {
			cout &lt;&lt; q[hh] &lt;&lt; &#39;\n&#39;;
		}
	}
	return 0;
}
```

#### 单调栈
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int stk[N], tt;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x;
	cin &gt;&gt; n;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		int x;
		cin &gt;&gt; x;
		while (tt &amp;&amp; stk[tt] &gt; x) tt--;// 找第一个小于x的元素
		if (tt == 0) cout &lt;&lt; &#34;-1 &#34;;
		else cout &lt;&lt; stk[tt] &lt;&lt; &#34; &#34;;
		stk[&#43;&#43;tt] = x;
	}
	return 0;
}
```

#### 单调队列
**例题1-AcWing 154. 滑动窗口**
```c&#43;&#43;
#include &lt;iostream&gt;  
using namespace std;  
  
const int N = 1e6 &#43; 10;  
int a[N], q[N];  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n, k;  
    cin &gt;&gt; n &gt;&gt; k;  
    for (int i = 0; i &lt; n; i&#43;&#43;) cin &gt;&gt; a[i];  
    int hh = 0, tt = -1;  
    for (int i = 0; i &lt; n; i&#43;&#43;) {  
        if (hh &lt;= tt &amp;&amp; i - k &#43; 1 &gt; q[hh]) hh&#43;&#43;; // 若超出窗口大小, 弹出队头元素  
        while (hh &lt;= tt &amp;&amp; a[q[tt]] &gt;= a[i]) tt--; // 弹出队内所有不小于a[i]的数, 并让更小的数字入队  
        q[&#43;&#43;tt] = i;  
//        printf(&#34;--%d-%d--\n &#34;, tt, i);  
        if (i &gt;= k - 1) printf(&#34;%d &#34;, a[q[hh]]);// 从窗口完全进入开始输出  
    }  
    puts(&#34;&#34;);  
    hh = 0, tt = -1;  
    for (int i = 0; i &lt; n; i&#43;&#43;) {  
        if (hh &lt;= tt &amp;&amp; i &#43; 1 - k &gt; q[hh]) hh&#43;&#43;;  
        while (hh &lt;= tt &amp;&amp; a[q[tt]] &lt;= a[i]) tt--;  
        q[&#43;&#43;tt] = i;  
        if (i &gt;= k - 1) printf(&#34;%d &#34;, a[q[hh]]);  
    }  
    return 0;  
}
```

#### 表达式求值
中缀转后缀&#43;求值(支持浮点数)
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;stack&gt;
#include &lt;string&gt;
using namespace std;

stack&lt;double&gt; num;
stack&lt;char&gt; op;
string post;

void init() {
	while (!op.empty()) op.pop();
	while (!num.empty()) num.pop();
	post.clear();
}

int pre(char op) {
	if (op == &#39;&#43;&#39; || op == &#39;-&#39;) return 1;
	if (op == &#39;*&#39; || op == &#39;/&#39;) return 2;
	return 0;
}

void eval() {
	double r = num.top();
	num.pop();
	double l = num.top();
	num.pop();
	char opcode = op.top();
	op.pop();
	post &#43;= opcode;
	if (opcode == &#39;&#43;&#39;) num.push(l &#43; r);
	if (opcode == &#39;-&#39;) num.push(l - r);
	if (opcode == &#39;*&#39;) num.push(l * r);
	if (opcode == &#39;/&#39;) num.push(l / r);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s;
	while (getline(cin, s)) {
		if (s == &#34;0&#34;) break;
		init();
		for (int i = 0; i &lt; s.size(); i&#43;&#43;) {
			if (isspace(s[i])) continue;
			if (isdigit(s[i])) {
				double t = 0;
				while (i &lt; s.size() &amp;&amp; isdigit(s[i])) {
					post &#43;= s[i];
					t = t * 10 &#43; s[i&#43;&#43;] - &#39;0&#39;;
				}
				i--;
				num.push(t);
			} else if (s[i] == &#39;(&#39;) op.push(s[i]);
			else if (s[i] == &#39;)&#39;) {
				while (!op.empty() &amp;&amp; op.top() != &#39;(&#39;) {
					eval();
				}
				op.pop();
			} else {
				while (!op.empty() &amp;&amp; pre(op.top()) &gt;= pre(s[i])) {
					eval();
				}
				op.push(s[i]);
			}
		}
		while (!op.empty()) {
			eval();
		}

		printf(&#34;%c&#34;, post[0]);
		for (int i = 1; i &lt; post.size(); i&#43;&#43;) {
			printf(&#34; %c&#34;, post[i]);
		}
		puts(&#34;&#34;);
		printf(&#34;%.2lf\n&#34;, num.top());
	}
	return 0;
}

```


### kmp
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 10010, M = 100010;
char p[N], s[M];
int ne[N];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m;
	cin &gt;&gt; n &gt;&gt; p &#43; 1 &gt;&gt; m &gt;&gt; s &#43; 1;
	// 求next数组
	for (int i = 2, j = 0; i &lt;= n; i&#43;&#43;) {
		while (j &amp;&amp; p[i] != p[j &#43; 1]) j = ne[j];
		if (p[i] == p[j &#43; 1]) j&#43;&#43;;
		ne[i] = j;
	}
//	for(int i=1;i&lt;=n;i&#43;&#43;) cout &lt;&lt; ne[i] &lt;&lt; &#39; &#39;;
//	puts(&#34;&#34;);
	// kmp进行匹配
	for (int i = 1, j = 0; i &lt;= m; i&#43;&#43;) {
		while (j &amp;&amp; s[i] != p[j &#43; 1]) j = ne[j];
		if (s[i] == p[j &#43; 1]) j&#43;&#43;;
		if (j == n) {// 字串匹配成功
			cout &lt;&lt; i - n &lt;&lt; &#39; &#39;;
			j = ne[j];// 尝试匹配下一次字串出现的位置
		}
	}
	return 0;
}
```

### Trie树
&gt; 用来高效存储和查找字符串集合的数据结构

**例题1-AcWing 835. Trie字符串统计**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 100010;
int son[N][26];// Trie树, 第一维表示串长度, 第二维表示a-z这26种可能
int cnt[N];// 表示以这个字符结尾的字符串有多少个
int idx;// 给每一个字符结点分配一个唯一的标识符
char str [N];

void insert(char str[]) {
	int p = 0;
	for (int i = 0; str[i]; i&#43;&#43;) {
		int u = str[i] - &#39;a&#39;;
		if (!son[p][u]) son[p][u] = &#43;&#43;idx;
		p = son[p][u];
	}
	cnt[p]&#43;&#43;;
}

int query(char str[]) {
	int p = 0;
	for (int i = 0; str[i]; i&#43;&#43;) {
		int u = str[i] - &#39;a&#39;;
		if (!son[p][u]) return 0;
		p = son[p][u];
	}
	return cnt[p];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	char op;
	scanf(&#34;%d&#34;, &amp;n);
	getchar();
	while (n--) {
		scanf(&#34;%c %s&#34;, &amp;op, &amp;str);
		getchar();
		if (op == &#39;I&#39;) {
			insert(str);
		} else {
			printf(&#34;%d\n&#34;, query(str));
		}
	}
	return 0;
}
```

### 并查集
&gt; 基本原理: 每个集合用一棵树来表示, 树根的编号就是集合的编号

**例题1-AcWing 836. 合并集合**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 100010;
int p[N];// 父节点数组

int find(int x) {// 返回x的祖宗节点 &#43; 路径压缩
	if (p[x] != x) p[x] = find(p[x]);
	return p[x];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, a, b;
	char op;
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	getchar();
	for (int i = 1; i &lt;= n; i&#43;&#43;) p[i] = i;
	while (m--) {
		scanf(&#34;%c %d %d&#34;, &amp;op, &amp;a, &amp;b);
		getchar();
		if (op == &#39;M&#39;) p[find(a)] = find(b);
		else {
			if (find(a) == find(b)) printf(&#34;YES\n&#34;);
			else printf(&#34;NO\n&#34;);
		}
	}
	return 0;
}
```
**例题2-AcWing 837. 连通块中点的数量**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 100010;
int p[N];// 父节点数组
int s[N];// 所属集合中元素的个数

int find(int x) {// 返回x的祖宗节点 &#43; 路径压缩
	if (p[x] != x) p[x] = find(p[x]);
	return p[x];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, a, b;
	char op[5];
	scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	for (int i = 1; i &lt;= n; i&#43;&#43;) p[i] = i, s[i] = 1;
	while (m--) {
		scanf(&#34;%s&#34;, op);
		if (op[0] == &#39;C&#39;) {
			scanf(&#34;%d%d&#34;, &amp;a, &amp;b);
			if (find(a) == find(b)) continue;
			s[find(b)] &#43;= s[find(a)];// 这两个步骤的顺序不能错
			p[find(a)] = find(b);
		} else if (op[0] == &#39;Q&#39; &amp;&amp; op[1] == &#39;1&#39;) {
			scanf(&#34;%d%d&#34;, &amp;a, &amp;b);
			if (find(a) == find(b)) printf(&#34;YES\n&#34;);
			else printf(&#34;NO\n&#34;);
		} else {
			scanf(&#34;%d&#34;, &amp;a);
			printf(&#34;%d\n&#34;, s[find(a)]);
		}
	}
	return 0;
}
```

例题1-ZJNUOJ-亲戚——高级

### 堆
#### 堆排序
**例题1-AcWing 838. 堆排序**
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int h[N], n, m, sz;

void down(int u) {
	int t = u;
	if (u * 2 &lt;= sz &amp;&amp; h[u * 2] &lt; h[t]) t = u * 2;
	if (u * 2 &#43; 1 &lt;= sz &amp;&amp; h[u * 2 &#43; 1] &lt; h[t]) t = u * 2 &#43; 1;
	if (u != t) {
		swap(h[t], h[u]);
		down(t);
	}
}

void up(int u) {
	while (u / 2 &amp;&amp; h[u / 2] &gt; h[u]) {
		swap(h[u / 2], h[u]);
		u /= 2;
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 1; i &lt;= n; i&#43;&#43;) cin &gt;&gt; h[i];
	sz = n;
	for (int i = n / 2; i; i--) down(i);
	while (m--) {
		cout &lt;&lt; h[1] &lt;&lt; &#39; &#39;;
		h[1] = h[sz--];
		down(1);
	}
	return 0;
}
```

#### 模拟堆
**例题2-AcWing 839. 模拟堆**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;string.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int k, x, sz;
int h[N];// 堆
int ph[N];// 输入序号 与 堆中序号映射关系, 第k个插入的元素在堆中的位置
int hp[N];// 堆中序号 与 输入序号映射关系

void heap_swap(int a, int b) {
	swap(ph[hp[a]], ph[hp[b]]);
	swap(hp[a], hp[b]);
	swap(h[a], h[b]);
}

void down(int u) {
	int t = u;
	if (u * 2 &lt;= sz &amp;&amp; h[u * 2] &lt; h[t]) t = u * 2;
	if (u * 2 &#43; 1 &lt;= sz &amp;&amp; h[u * 2 &#43; 1] &lt; h[t]) t = u * 2 &#43; 1;
	if (u != t) {
		heap_swap(h[t], h[u]);
		down(t);
	}
}

void up(int u) {
	while (u / 2 &amp;&amp; h[u / 2] &gt; h[u]) {
		swap(h[u / 2], h[u]);
		u /= 2;
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m = 0;
	cin &gt;&gt; n;
	while (n--) {
		char op[10];
		scanf(&#34;%s&#34;, op);
		if (!strcmp(op, &#34;I&#34;)) {
			scanf(&#34;%d&#34;, &amp;x);
			sz&#43;&#43;;
			m&#43;&#43;;
			ph[m] = sz, hp[sz] = m;
			h[sz] = x;
			up(sz);
		} 
		else if (!strcmp(op, &#34;PM&#34;)) printf(&#34;%d\n&#34;, h[1]);
		else if (!strcmp(op, &#34;DM&#34;)) {
			heap_swap(1, sz);
			sz--;
			down(1);
		} else if (!strcmp(op, &#34;D&#34;)) {
			scanf(&#34;%d&#34;, &amp;k);
			k = ph[k];// 获取第k个插入的元素在堆中的位置
			heap_swap(k, sz);
			sz--;
			down(k), up(k);
		} else {
			scanf(&#34;%d%d&#34;, &amp;k, &amp;x);
			k = ph[k];
			h[k] = x;
			down(k), up(k);
		}
	}
	return 0;
}
```

### 哈希表
**拉链法**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 1e5 &#43; 3;
int h[N];
int e[N], ne[N], idx;

void insert(int x) {// 单链表的插入
	int k = (x % N &#43; N) % N;
	e[idx] = x, ne[idx] = h[k], h[k] = idx&#43;&#43;;
}

bool find(int x) {
	int k = (x % N &#43; N) % N;
	for (int i = h[k]; i != -1; i = ne[i]) {
		if (e[i] == x) return true;
	}
	return false;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x;
	scanf(&#34;%d&#34;, &amp;n);
	memset(h, -1, sizeof h);
	while (n--) {
		char op[2];
		scanf(&#34;%s%d&#34;, op, &amp;x);
		if (*op == &#39;I&#39;) {
			insert(x);
		} else {
			if (find(x)) printf(&#34;Yes\n&#34;);
			else printf(&#34;No\n&#34;);
		}
	}
	return 0;
}
```
**开放地址法**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 200003, null = 0x3f3f3f3f;
int h[N];

int find(int x) {
	int k = (x % N &#43; N) % N;
	while (h[k] != null &amp;&amp; h[k] != x) {
		k&#43;&#43;;
		if (k == N) k = 0;
	}
	return k;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x;
	scanf(&#34;%d&#34;, &amp;n);
	memset(h, 0x3f, sizeof h);
	while (n--) {
		char op[2];
		scanf(&#34;%s%d&#34;, op, &amp;x);
		int k = find(x);
		if (*op == &#39;I&#39;) h[k] = x;
		else {
			if (h[k] != null) puts(&#34;Yes&#34;);
			else puts(&#34;No&#34;);
		}
	}
	return 0;
}
```

#### 字符串哈希
##### 字符串前缀哈希法

**例题1-AcWing 841. 字符串哈希**

```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef unsigned long long ULL;
const int N = 1e5 &#43; 10, P = 131;

int n, m;
char str[N];
ULL h[N], p[N];

ULL get(int l, int r) {
	return h[r] - h[l - 1] * p[r - l &#43; 1];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%d%d%s&#34;, &amp;n, &amp;m, str &#43; 1);
	p[0] = 1;
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		p[i] = p[i - 1] * P;
		h[i] = h[i - 1] * P &#43; str[i];
	}
	while (m--) {
		int l1, l2, r1, r2;
		scanf(&#34;%d%d%d%d&#34;, &amp;l1, &amp;r1, &amp;l2, &amp;r2);
		if (get(l1, r1) == get(l2, r2)) puts(&#34;Yes&#34;);
		else puts(&#34;No&#34;);
	}
	return 0;
}
```

### 树

#### 二叉查找树（BST）

```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

struct Node {
	Node *left, *right;
	char data;
	Node(char data): data(data), left(NULL), right(NULL) {};
};

Node *Insert(Node *root, char data) {
	if (root == NULL) return new Node(data);
	else if (root-&gt;data &lt; data) root-&gt;right = Insert(root-&gt;right, data);
	else root-&gt;left = Insert(root-&gt;left, data);
	return root;
}

void preOrder(Node *root) {
	if (root != NULL) {
		printf(&#34;%c &#34;, root-&gt;data);
		preOrder(root-&gt;left);
		preOrder(root-&gt;right);
	}
}

bool cmp(Node *root1, Node *root2) {
	if (root1 == NULL &amp;&amp; root2 == NULL) return true;
	else if ((root1 == NULL &amp;&amp; root2 != NULL) || (root1 != NULL &amp;&amp; root2 == NULL) || (root1-&gt;data != root2-&gt;data)) {
		return false;
	}
	return cmp(root1-&gt;left, root2-&gt;left) &amp;&amp; cmp(root1-&gt;right, root2-&gt;right);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	string s, t;
	Node *root1 = NULL;
	while (cin &gt;&gt; n) {
		if (n == 0) break;
		cin &gt;&gt; s;
		for (int i = 0; i &lt; s.size(); i&#43;&#43;) root1 = Insert(root1, s[i]);
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			Node *root2 = NULL;
			cin &gt;&gt; t;
			for (int j = 0; j &lt; t.size(); j&#43;&#43;) root2 = Insert(root2, t[j]);
			if (cmp(root1, root2)) puts(&#34;YES&#34;);
			else puts(&#34;NO&#34;);
		}
	}
	return 0;
}
```

## 遇到的一些问题

### 获取C&#43;&#43;中动态数组的长度

&gt; 可以使用 `.size()` 这个成员函数来获取 `vector` 或者 `map` 等的长度

### 获取C&#43;&#43;中 `string` 类型的长度

&gt; 可以使用 `.length()` 或者 `.size()` 成员函数来获取 `string` 的长度

### 字符串输入问题

&gt; C&#43;&#43;中可能无法使用C语言的字符数组，如 `char str[1005]` 这种
&gt; 因此我们可以使用读取 `string str` 来替代，需要使用 `getline(cin,str)` 或者 `cin &gt;&gt; str` 来读取输入

## 刷题记录

### AcWing算法基础课-课后习题

#### 快速排序

**789.快速排序**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 100010;
int a[N];

void quick_sort(int a[], int l, int r) {
	if (l &gt;= r) return;
	int x = a[l], i = l - 1, j = r &#43; 1;
	while (i &lt; j) {
		while (a[&#43;&#43;i] &lt; x);
		while (a[--j] &gt; x);
		if (i &lt; j) swap(a[i], a[j]);
	}
	quick_sort(a, l, j);
	quick_sort(a, j &#43; 1, r);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	scanf(&#34;%d&#34;, &amp;n);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	quick_sort(a, 0, n - 1);
	for (int i = 0; i &lt; n; i&#43;&#43;) printf(&#34;%d &#34;, a[i]);
	return 0;
}
```

**786.第k个数**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 100010;
int a[N];

int  quick_select(int a[], int l, int r, int k) {
	if (l &gt;= r) return a[l] ;
	int x = a[l], i = l - 1, j = r &#43; 1;
	while (i &lt; j) {
		while (a[&#43;&#43;i] &lt; x);
		while (a[--j] &gt; x);
		if (i &lt; j) swap(a[i], a[j]);
	}
	int sl = j - l &#43; 1;
	if (k &lt;= sl) return quick_select(a, l, j, k);
	else return quick_select(a, j &#43; 1, r, k - sl);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, k, res;
	scanf(&#34;%d%d&#34;, &amp;n, &amp;k);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	res = quick_select(a, 0, n - 1, k);
	printf(&#34;%d\n&#34;, res);
	return 0;
}
```

#### 归并排序

**787.归并排序**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 100010;
int a[N], tmp[N];

void merge_sort(int a[], int l, int r) {
	if (l &gt;= r) return;
	int mid = l &#43; r &gt;&gt; 1;
	merge_sort(a, l, mid);
	merge_sort(a, mid &#43; 1, r);
	int cnt = 0, i = l, j = mid &#43; 1;
	while (i &lt;= mid &amp;&amp; j &lt;= r) {
		if (a[i] &lt; a[j]) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
		else tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
	}
	while (i &lt;= mid) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
	while (j &lt;= r) tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
	for (int i = l, j = 0; i &lt;= r; i&#43;&#43;, j&#43;&#43;) a[i] = tmp[j];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n; scanf(&#34;%d&#34;, &amp;n);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	merge_sort(a, 0, n - 1);
	for (int i = 0; i &lt; n; i&#43;&#43;) printf(&#34;%d &#34;, a[i]);
	return 0;
}
```

**788.逆序对的数量**

暴力的做法（只能过部分样例）

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

const int N = 1e6 &#43; 10;
int a[N];


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	scanf(&#34;%d&#34;, &amp;n);
	ll cnt = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = i &#43; 1 ; j &lt; n; j&#43;&#43;) {
			if (a[j] &lt; a[i]) cnt&#43;&#43;;
		}
	}
	printf(&#34;%lld\n&#34;, cnt);
	return 0;
}
```

使用归并排序的做法

&gt; 这个方法可能稍微有点不太好理解，可以对着样例模拟一下
&gt; 
&gt; 就是利用分治思想，把每次递归中的结果加起来
&gt; 
&gt; 考虑的其实只有一种情况，就是逆序对的两个元素分布在mid两边的情况

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

const int N = 5e5 &#43; 10;
int a[N], tmp[N];

ll merge_sort(int l, int r) {
	if (l &gt;= r) return 0;
	int mid = l &#43; r &gt;&gt; 1;
	ll res = merge_sort(l, mid) &#43; merge_sort(mid &#43; 1, r);
	int cnt = 0, i = l, j = mid &#43; 1;
	while (i &lt;= mid &amp;&amp; j &lt;= r) {
		if (a[i] &lt;= a[j]) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
		else {
			tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
//			**算法的关键点**
			res &#43;= mid - i &#43; 1;
		}
	}
	while (i &lt;= mid) tmp[cnt&#43;&#43;] = a[i&#43;&#43;];
	while (j &lt;= r) tmp[cnt&#43;&#43;] = a[j&#43;&#43;];
	for (int i = l, j = 0; i &lt;= r; i&#43;&#43;, j&#43;&#43;) a[i] = tmp[j];
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	ll res = merge_sort(0, n - 1);
	printf(&#34;%lld&#34;, res);
	return 0;
}
```

####  二分

**ZJNUOJ-二分查找**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e3 &#43; 10;
int a[N];

int bin_searchh(int a[], int len, int x, int &amp;cnt) {
	int l = 0, r = len - 1, mid;
	while (l &lt;= r) {
		cnt&#43;&#43;;
		mid = l &#43; r &gt;&gt; 1;
		if (a[mid] &lt; x) l = mid &#43; 1;
		else if (a[mid] &gt; x) r = mid - 1;
		else return mid;
	}
	return -1;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, x, res, cnt = 0;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) cin &gt;&gt; a[i];
	cin &gt;&gt; x;
	res =  bin_searchh(a, n, x, cnt);
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39; &lt;&lt; cnt;
	return 0;
}
```

**AcWing-789.数的范围**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int a[N];

int binsearch_left(int l, int r, int x) {
	while (l &lt; r) {
		int mid = l &#43; r &gt;&gt; 1;
		if (a[mid] &gt;= x) r = mid;
		else l = mid &#43; 1;
	}
	return l;
}


int binsearch_right(int l, int r, int x) {
	while (l &lt; r) {
		int mid = l &#43; r &#43; 1 &gt;&gt; 1 ;
		if (a[mid] &lt;= x) l = mid;
		else r  = mid - 1;
	}
	return l;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, k, res;scanf(&#34;%d%d&#34;, &amp;n, &amp;m);
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	while (m--) {
		scanf(&#34;%d&#34;, &amp;k);
		res = binsearch_left(0, n - 1, k);
		if (a[res] != k) printf(&#34;-1 -1\n&#34;);
		else {
			printf(&#34;%d &#34;, res);
			res = binsearch_right(0, n - 1, k);
			printf(&#34;%d\n&#34;, res);
		}
	}
	return 0;
}
```

**AcWing-790.数的三次方根**
```c&#43;&#43;
#include&lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const double eps = 1e-8;

int main(){
	freopen(&#34;input.txt&#34;,&#34;r&#34;,stdin);
	double n,mid;scanf(&#34;%lf&#34;,&amp;n);
	double l=-100000,r=100000;
	while(r-l&gt;eps){
		mid = (l&#43;r)/2;
		if(mid*mid*mid&gt;n) r = mid;
		else l = mid;
	}
	printf(&#34;%.6lf\n&#34;,l);
	return 0;
}
```

#### 高精度

##### 高精度比较

例题1-ZJNUOJ1125-A == B ?——中级

&gt; 这道题主要考察了高精度的比较,以及 前导零 后导零 小数 负数 的判断及处理

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

bool process(string &amp;s) {
	bool is_negative = false;
	int cnt1, cnt2, len;
//	判断是否是负数
	if (s[0] == &#39;-&#39;) is_negative = true, s.erase(0, 1);
//	去除后导零和小数点
	int dot_pos = s.find(&#39;.&#39;);
	if (dot_pos != string::npos) {
		int k;
		for (k = s.size() - 1; k &gt; dot_pos &amp;&amp; s[k] == &#39;0&#39;; k--) s.erase(k, 1);
		if (s[k] == &#39;.&#39;) s.erase(k, 1);
	}
//	去除前导零
	cnt2 = 0, len = s.size();
	while (s[cnt2] == &#39;0&#39;) cnt2&#43;&#43;;
	s.erase(0, cnt2);
	if (s.empty()) s = &#34;0&#34;;
	return is_negative;
}

void compare(string a, string b, bool a_flag, bool b_flag) {
	if (a == b) {
		if (a == &#34;0&#34;) cout &lt;&lt; &#34;YES&#34; &lt;&lt; &#39;\n&#39;;
		else if (a_flag == b_flag) cout &lt;&lt; &#34;YES&#34; &lt;&lt; &#39;\n&#39;;
		else cout &lt;&lt; &#34;NO&#34; &lt;&lt; &#39;\n&#39;;
	} else cout &lt;&lt; &#34;NO&#34; &lt;&lt; &#39;\n&#39;;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a, b;
	bool a_flag, b_flag;
	while (cin &gt;&gt; a &gt;&gt; b) {
		a_flag = process(a);
		b_flag = process(b);
		compare(a, b, a_flag, b_flag);
	}
	return 0;
}
```

##### 高精度加法

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

vector&lt;int&gt;A, B, res;

// 高精度加法
vector&lt;int&gt; add(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {
	vector&lt;int&gt;C;
	int tmp = 0;
	for (int i = 0; i &lt; A.size() || i &lt; B.size(); i&#43;&#43;) {
		if (i &lt; A.size()) tmp &#43;= A[i];
		if (i &lt; B.size()) tmp &#43;= B[i];
		C.push_back(tmp % 10);
		tmp /= 10;
	}
	if (tmp != 0) C.push_back(1);
	return C;
}

// 处理前导零
vector&lt;int&gt; clean_Leadingzero(vector&lt;int&gt;&amp;res) {
	vector&lt;int&gt;tmp;
	int start = res.size() - 1;
	while (start &gt; 0 &amp;&amp; res[start] == 0) start--;
	for (int i = start; i &gt;= 0; i--) tmp.push_back(res[i]);
	return tmp;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a, b;cin &gt;&gt; a &gt;&gt; b;
	for (int i = a.size() - 1; i &gt;= 0; i--) A.push_back(a[i] - &#39;0&#39;);
	for (int i = b.size() - 1; i &gt;= 0; i--) B.push_back(b[i] - &#39;0&#39;);
	res = add(A, B);
	res = clean_Leadingzero(res);
	for (int i = 0; i &lt; res.size(); i&#43;&#43;) printf(&#34;%d&#34;, res[i]);
	return 0;
}
```

##### 高精度减法
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
vector&lt;int&gt;A, B, res;  
  
// 判断A &gt;= B ?  
bool cmp(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {  
    if (A.size() != B.size()) return A.size() &gt; B.size();  
    for (int i = A.size() - 1; i &gt;= 0; i--) {  
        if (A[i] != B[i]) return A[i] &gt; B[i];  
    }  
    return true;  
}  
  
vector&lt;int&gt; sub(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {  
    vector&lt;int&gt;C;  
    int tmp = 0;  
    for (int i = 0; i &lt; A.size(); i&#43;&#43;) {  
        tmp = A[i] - tmp;  
        if (i &lt; B.size()) tmp -= B[i];  
        C.push_back((tmp &#43; 10) % 10);  
        if (tmp &lt; 0) tmp = 1;  
        else tmp = 0;  
    }  
//    处理前导零,如果C的长度大于1，并且最后一位是0  
    while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();  
    return C;  
}  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    string a, b;  
    cin &gt;&gt; a &gt;&gt; b;  
//    这里要特别注意，string输入的是字符格式，需要先转换为int  
    for (int i = a.size() - 1; i &gt;= 0; i--) A.push_back(a[i] - &#39;0&#39;);  
    for (int i = b.size() - 1; i &gt;= 0; i--) B.push_back(b[i] - &#39;0&#39;);  
    if (cmp(A, B)) {  
        res = sub(A, B);  
        for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];  
    } else {  
        res = sub(B, A);  
        cout &lt;&lt; &#34;-&#34;;  
        for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];  
    }  
    return 0;  
}
```

##### 高精度乘法

**A \* b 的情况**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

vector&lt;int&gt;A, res;

vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, int b) {
	vector&lt;int&gt;C;
	int tmp = 0;
//	这里要注意，i结束了但是tmp还没处理完的情况
	for (int i = 0; i &lt; A.size() || tmp != 0; i&#43;&#43;) {
		if (i &lt; A.size()) tmp &#43;= A[i] * b;
		C.push_back(tmp % 10);
		tmp /= 10;
	}
//	处理前导零
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0)C.pop_back();
	return C;
}


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a;
	int b;
	cin &gt;&gt; a &gt;&gt; b;
	for (int i = a.size() - 1; i &gt;= 0; i--) A.push_back(a[i] - &#39;0&#39;);
	res = mul(A, b);
	for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
	return 0;
}
```

**A \* B 的情况**

例题1-ZJNUOJ-1174：大整数乘法
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

vector&lt;int&gt;A, B, res;

vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, vector&lt;int&gt;&amp;B) {
	int len = A.size() &#43; B.size();
	vector&lt;int&gt;C(len &#43; 1);
	for (int i = 0; i &lt; A.size(); i&#43;&#43;) {
		for (int j = 0; j &lt; B.size(); j&#43;&#43;) {
//			注意这里的下标是 i&#43;j , 并且每一位可能由多次结果相加得到
			C[i &#43; j] &#43;= A[i] * B[j];
		}
	}
	for (int i = 0; i &lt; len; i&#43;&#43;) {
		if (C[i] &gt; 9) {
			C[i &#43; 1] &#43;= C[i] / 10;
			C[i] = C[i] % 10;
		}
	}
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a, b;
	cin &gt;&gt; a &gt;&gt; b;
	for (int i = a.size() - 1; i &gt;= 0; i--) A.push_back(a[i] - &#39;0&#39;);
	for (int i = b.size() - 1; i &gt;= 0; i--) B.push_back(b[i] - &#39;0&#39;);
	res = mul(A, B);
	for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
	return 0;
}
```

##### 高精度除法

**A / b** 商是C, 余数是 tmp 的情况

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

vector&lt;int&gt;A, res;

vector&lt;int&gt; div(vector&lt;int&gt;&amp;A, int b, int &amp;tmp) {
	tmp = 0;
	vector&lt;int&gt;C;
	for (int i = A.size() - 1; i &gt;= 0; i--) {
		tmp = tmp * 10 &#43; A[i];
		C.push_back(tmp / b);
		tmp %= b;
	}
	// 因为除法情况下的前导零在前面，所以这里需要reverse一下便于去除前导零
	reverse(C.begin(), C.end());
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a;
	int b, tmp;
	cin &gt;&gt; a &gt;&gt; b;
	for (int i = a.size() - 1; i &gt;= 0; i--) A.push_back(a[i] - &#39;0&#39;);
	res = div(A, b, tmp);
	for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
	cout &lt;&lt; &#39;\n&#39; &lt;&lt; tmp;
	return 0;
}
```

#### 前缀和与差分

#### 最小生成树

##### Kruskal算法
**例题1-AcWing 859. Kruskal算法求最小生成树**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 200010;
int n, m;
int p[N];

struct Edge {
	int a, b, w;
	bool operator &lt; (const Edge &amp;W) const {
		return w &lt; W.w;
	}
} edges[N];

int find(int x) {
	if (p[x] != x) p[x] = find(p[x]);
	return p[x];
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; m; i&#43;&#43;) cin &gt;&gt; edges[i].a &gt;&gt; edges[i].b &gt;&gt; edges[i].w;
	sort(edges, edges &#43; m);
	for (int i = 1; i &lt;= n; i&#43;&#43;) p[i] = i;
	int res = 0, cnt = 0;
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		int a = edges[i].a, b = edges[i].b, w = edges[i].w;
		a = find(a), b = find(b);
		if (a != b) {
			p[a] = b;
			res &#43;= w;
			cnt &#43;&#43;;
		}
	}
	if (cnt &lt; n - 1) puts(&#34;impossible&#34;);
	else cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 数学基础

##### 排列与组合

**例题1-ZJNUOJ-RPG的错排（组合数&#43;错排）**
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

const int N = 25;
// 这里把a[0]设为1,是为了应对i=1的情况, 即全部猜对的情况
ll a[30] = {1, 0, 1};

//	错排公式：D(n) = (n-1) * ( D(n-1) &#43; D(n-2) )
void derange(ll a[]) {
	for (int i = 3; i &lt;= N; i&#43;&#43;) {
		a[i] = (i - 1) * (a[i - 1] &#43; a[i - 2]);
	}
}

// 求组合数
ll combination(int m, int n) {
	if (m == 0) return 1;
	ll up = 1, down = 1, res;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		up *= m - i;
		down *= i &#43; 1;
	}
	res = up / down;
	return res;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	derange(a);
	int n;
	while (cin &gt;&gt; n &amp;&amp; n) {
		ll sum = 0;
		for (int i = 0; i &lt;= (n &gt;&gt; 1); i&#43;&#43;) {
			sum &#43;= combination(n, i) * a[i];
		}
		cout &lt;&lt; sum &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### 动态规划
例题1-ZJNUOJ-1270：【例9.14】混合背包
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 205;
int f[N][N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int m, n, v, w, s;
	while (cin &gt;&gt; m &gt;&gt; n) {
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			scanf(&#34;%d%d%d&#34;, &amp;v, &amp;w, &amp;s);
			for (int j = 1; j &lt;= m; j&#43;&#43;) {
				for (int k = 0; k &lt;= j / v &amp;&amp; (k &lt;= s || s == 0); k&#43;&#43;) {
					f[i][j] = max(f[i][j], f[i - 1][j - k * v] &#43; k * w);
				}
			}
		}
		cout &lt;&lt; f[n][m] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```



#### 贪心

**AcWing 913.排队打水**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

const int N = 1e5 &#43; 10;
int a[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n ;
	cin &gt;&gt; n;
	ll res = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	sort(a, a &#43; n);
	for (int i = 0; i &lt; n; i&#43;&#43;) res &#43;= a[i] * (n - i - 1);
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**AcWing 104.货仓选址**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int a[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, res = 0;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
	sort(a, a &#43; n);
//	仓库选址在中位数或者中间两个数之间即可
	for (int i = 0; i &lt; n; i&#43;&#43;) res &#43;= abs(a[i] - a[n / 2]);
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**AcWing 125.耍杂技的牛**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 5e4 &#43; 10;
typedef pair&lt;int, int&gt;PII;
PII cow[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, w, s, res, sum;
	cin &gt;&gt; n;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d%d&#34;, &amp;w, &amp;s);
		cow[i] = {w &#43; s, w};
	}
	sort(cow, cow &#43; n);
	res = -2e9, sum = 0; // sum 表示这头牛需要承受的重量总和
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		int w = cow[i].second, s = cow[i].first - w;
		res = max(res, sum - s);
		sum &#43;= w;
	}
	cout &lt;&lt; res &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

**洛谷P1080-国王游戏（贪心&#43;高精度）**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

vector&lt;int&gt;mul_res, res;
const int N = 1010;

struct Person {
	int l, r;
// 重载运算符
	bool operator &lt; (const Person &amp;w) const {
		return l * r &lt; w.l * w.r;
	}
} person[N];

// 高精度乘法
vector&lt;int&gt; mul(vector&lt;int&gt;&amp;A, int &amp;b) {
	vector&lt;int&gt;C;
	int tmp = 0;
	for (int i = 0; i &lt; A.size() || tmp != 0; i&#43;&#43;) {
		if (i &lt; A.size()) tmp &#43;= A[i] * b;
		C.push_back(tmp % 10);
		tmp /= 10;
	}
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}

// 高精度除法
vector&lt;int&gt; div(vector&lt;int&gt;&amp;A, int b, int &amp;tmp) {
	vector&lt;int&gt;C;
	tmp = 0;
	for (int i = A.size() - 1; i &gt;= 0; i--) {
		tmp = 10 * tmp &#43; A[i];
		C.push_back(tmp / b);
		tmp %= b;
	}
	reverse(C.begin(), C.end());
	while (C.size() &gt; 1 &amp;&amp; C.back() == 0) C.pop_back();
	return C;
}

// 高精度比较
vector&lt;int&gt; max_vec(vector&lt;int&gt;A, vector&lt;int&gt;B) {
	if (A.size() &gt; B.size()) return A;
	if (A.size() &lt; B.size()) return B;
	for (int i = A.size() - 1; i &gt;= 0; i&#43;&#43;) {
		if (A[i] &gt; B[i]) return A;
		if (A[i] &lt; B[i]) return B;
	}
	return A;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, tmp;
	cin &gt;&gt; n;
	for (int i = 0; i &lt;= n; i&#43;&#43;) scanf(&#34;%d%d&#34;, &amp;person[i].l, &amp;person[i].r);
	sort(person &#43; 1, person &#43; n &#43; 1);
	mul_res.push_back(person[0].l);
	res.push_back(0);
	for (int i = 1; i &lt;= n; i&#43;&#43;) {
		res = max_vec(res, div(mul_res, person[i].r, tmp));
		mul_res = mul(mul_res, person[i].l);
	}
	for (int i = res.size() - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
	return 0;
}
```

### 晴问-2022浙大考研机试模拟（1）

#### 库洛值

```c&#43;&#43;
#include&lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
#define MAXN 1005

char s[MAXN];
bool isExist[128];
int main(){
	// freopen(&#34;input.txt&#34;,&#34;r&#34;,stdin);
	int n,len,sum=0;scanf(&#34;%d&#34;,&amp;n);
	while(n--){
		memset(isExist,false,sizeof(isExist));
		scanf(&#34;%s&#34;,&amp;s);
		len = strlen(s);
		 // 存储时会自动转换为Ascii值作为下标来进行存储
		for(int i=0;i&lt;len;i&#43;&#43;) isExist[s[i]] = true;
		for(char c = &#39;A&#39;;c&lt;=&#39;Z&#39;;c&#43;&#43;) sum&#43;=isExist[c];
		for(char c = &#39;a&#39;;c&lt;=&#39;z&#39;;c&#43;&#43;) sum&#43;=isExist[c];
	}
	printf(&#34;%d&#34;,sum);
	return 0;
}
```

#### 平衡素数
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
#define MAXN 11000000
typedef long long ll;

int nextbalance_prime[MAXN];
vector&lt;ll&gt;prime;
bool* isPrime = new bool[MAXN];

// 使用欧拉筛打出素数表
void findPrime(ll n) {
	memset(isPrime, true, sizeof(bool)*n);
	for (ll i = 2; i &lt;= n; i&#43;&#43;) {
		if (isPrime[i]) prime.push_back(i);
		for (ll prime_j : prime) {
			if (i * prime_j &gt; n) break;
			isPrime[i * prime_j] = false;
			if (i % prime_j == 0) break;
		}
	}
}

void find_nextbalance_prime() {
	int lastbalance_prime = 0;
//	2 没有上一个素数，所以它不可能是平衡素数
	for (int i = 1; i &lt; prime.size() - 1; i&#43;&#43;) {
		if (prime[i] * 2 == prime[i - 1] &#43; prime[i &#43; 1]) {
//			从上一个平衡素数的下一个开始，全部置为当前的平衡素数
			for (int j = lastbalance_prime &#43; 1; j &lt;= prime[i]; j&#43;&#43;) {
				nextbalance_prime[j] = prime[i];
			}
			lastbalance_prime = prime[i];
		}
	}
}

int main() {
	findPrime(MAXN);
	find_nextbalance_prime();
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, num;
	scanf(&#34;%d&#34;, &amp;n);
	while (n--) {
		scanf(&#34;%d&#34;, &amp;num);
		if (num == nextbalance_prime[num]) printf(&#34;Yes\n&#34;);
		else printf(&#34;No %d\n&#34;, nextbalance_prime[num]);
	}
	return 0;
}
```

#### 进击的二叉查找树

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef int elemType;
#define MAXN 100005

vector&lt;int&gt;pre1, pre2, post, layer;

// BitTree 相当于 BitNode*
typedef struct BitNode {
	elemType data;
	BitNode* lchild;
	BitNode* rchild;
} BitNode, *BitTree;

// pos用来确定插入结点的位置
// 如果遍历到的结点没有孩子，就返回双亲的位置
bool BST_Search(BitTree T, elemType key, BitTree parent, BitTree &amp;pos) {
	if (!T) {
		pos = parent;
		return false;
	} else if (T-&gt;data == key) {
		pos = T;
		return true;
	} else if (T-&gt;data &lt; key) {
		return BST_Search(T-&gt;rchild, key, T, pos);
	} else {
		return BST_Search(T-&gt;lchild, key, T, pos);
	}
}

bool BST_Inseart(BitTree &amp;T, elemType data) {
	BitTree pos = NULL;
	if (!BST_Search(T, data, NULL, pos)) {
		BitNode* s = new BitNode;
		s-&gt;data = data;
		s-&gt;lchild = s-&gt;rchild = NULL;
		if (!pos) {
			T = s;
		} else if (data &lt; pos-&gt;data) {
			pos-&gt;lchild = s;
		} else {
			pos-&gt;rchild = s;
		}
		return true;
	} else {
		return false;
	}
}

void PreOrder(vector&lt;int&gt;&amp;pre, BitTree T) {
	if (T) {
		pre.push_back(T-&gt;data);
		PreOrder(pre, T-&gt;lchild);
		PreOrder(pre, T-&gt;rchild);
	}
}

void PostOrder(vector&lt;int&gt;&amp;post, BitTree T) {
	if (T) {
		PostOrder(post, T-&gt;lchild);
		PostOrder(post, T-&gt;rchild);
		post.push_back(T-&gt;data);
	}
}

// 使用队列来实现二叉树的层序遍历
void LayerOrder(vector&lt;int&gt;&amp;layer, BitTree T) {
	if (T) {
		queue&lt;BitTree&gt;q;
		q.push(T);
		while (!q.empty()) {
			BitTree current = q.front();
			q.pop();
			layer.push_back(current-&gt;data);
			if (current-&gt;lchild) q.push(current-&gt;lchild);
			if (current-&gt;rchild) q.push(current-&gt;rchild);
		}
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	bool flag = true;
	BitTree T1 = NULL;
	BitTree T2 = NULL;
	elemType e;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d&#34;, &amp;e);
		BST_Inseart(T1, e);
	}
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d&#34;, &amp;e);
		BST_Inseart(T2, e);
	}
	PreOrder(pre1, T1);
	PreOrder(pre2, T2);
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		if (pre1[i] != pre2[i]) {
			flag = false;
			break;
		}
	}
	if (flag) printf(&#34;YES\n&#34;);
	else printf(&#34;NO\n&#34;);
	PostOrder(post, T1);
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		printf(&#34;%d&#34;, post[i]);
		if (i &lt; n - 1) printf(&#34; &#34;);
	}
	printf(&#34;\n&#34;);
	LayerOrder(layer, T1);
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		printf(&#34;%d&#34;, layer[i]);
		if (i &lt; n - 1) printf(&#34; &#34;);
	}
	return 0;
}
```

### 牛客-浙大考研复试上机题

#### 火星A&#43;B

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int arr[30];

//获得每一位对应的进制数组
void getScale(int arr[]) {
	int i, j, cnt = 0;
	for (i = 1; cnt &lt; 25; i&#43;&#43;) {
		for (j = 2; j &lt;= sqrt(i); j&#43;&#43;) {
			if (i % j == 0) break;
		}
		if (j &gt; sqrt(i)) {
			arr[cnt] = i;
			cnt&#43;&#43;;
		}
	}
}

//获取火星数每一位对应的乘数
int getMultip(int arr[], int pos) {
	int res = 1 ;
	for (int i = 0; i &lt; pos; i&#43;&#43;) {
		res *= arr[i];
	}
	return res;
}

//把火星数转换为对应的十进制数
int calc(char str[], int len, int arr[]) {
	int pos = 1, sum = 0, m = 0;
//	i-=2是为了跳过逗号
	for (int i = len - 1; i &gt;= 0; i -= 2) {
		m = str[i] - &#39;0&#39;;
//	因为题目中明确说明了火星数不会超过25位，第25位的素数刚好是89
//	因此下面这里可以只考虑大于0小于9的两位数的情况
//	增加了对i-1的判断防止数组越界
		if ((i - 1) &gt;= 0 &amp;&amp; str[i - 1] &gt; &#39;0&#39; &amp;&amp; str[i - 1] &lt; &#39;9&#39;)  {
			m &#43;= (str[--i] - &#39;0&#39;) * 10;
		}
		sum &#43;= m * getMultip(arr, pos);
		pos&#43;&#43;;
	}
	return sum;
}

//将得到的十进制结果转换为火星数
void trans(int sum, int arr[]) {
	int pos1 = 0, i = 0, trans_num[100];
	while (sum) {
		trans_num[i] = sum % arr[i &#43; 1];
		sum /= arr[i &#43; 1];
		i&#43;&#43;;
	}
	for (int j = i - 1; j &gt;= 0; j--) {
		printf(&#34;%d&#34;, trans_num[j]);
		if (j &gt; 0) printf(&#34;,&#34;);
	}
}

int main() {
	getScale(arr);
	int a_len, b_len, sum = 0;
	char a[100], b[100];
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	scanf(&#34;%s%s&#34;, &amp;a, &amp;b);
	a_len = strlen(a);
	b_len = strlen(b);
	sum = calc(a, a_len, arr) &#43; calc(b, b_len, arr);
//	printf(&#34;\n%d\n&#34;,sum);
	trans(sum, arr);
	return 0;
}
```

#### 统计同成绩学生人数

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
#define MAXN 1100

int a[MAXN];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(a, 0, sizeof(a));
	int n, tmp, target;
	while (scanf(&#34;%d&#34;, &amp;n) != EOF) {
		if (n == 0) break;
		while (n--) {
			scanf(&#34;%d&#34;, &amp;tmp);
			a[tmp]&#43;&#43;;
		}
		scanf(&#34;%d&#34;, &amp;target);
		printf(&#34;%d\n&#34;, a[target]);
	}
	return 0;
}
```

**使用 `map` 的做法**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

map&lt;int, int&gt;stu;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, tmp, target;
	while (scanf(&#34;%d&#34;, &amp;n) != EOF) {
		if (n == 0) break;
		while (n--) {
			scanf(&#34;%d&#34;, &amp;tmp);
			stu[tmp]&#43;&#43;;
		}
		scanf(&#34;%d&#34;, &amp;target);
//		使用count()方法检查map中是否存在target键，返回值是0或1
		if (stu.count(target))printf(&#34;%d\n&#34;, stu[target]);
		else printf(&#34;0\n&#34;);
	}
	return 0;
}
```

#### xxx定律
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n;  
    while (scanf(&#34;%d&#34;, &amp;n) != EOF) {  
        int cnt = 0;  
        while (n != 1) {  
            if (n &amp; 1) {  
                n = (3 * n &#43; 1) / 2;  
                cnt&#43;&#43;;  
            } else {  
                n /= 2;  
                cnt&#43;&#43;;  
            }  
        }  
        printf(&#34;%d\n&#34;, cnt);  
    }  
    return 0;  
}
```

#### A&#43;B for Matrices

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int a[100][100], b[100][100];
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	memset(a, 0, sizeof(a));
	int m, n;
	while (scanf(&#34;%d&#34;, &amp;m) != EOF) {
		scanf(&#34;%d&#34;, &amp;n);
		if (m == 0) break;
		int cnt = 0;
		for (int i = 0; i &lt; m; i&#43;&#43;) for (int j = 0; j &lt; n; j&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i][j]);
		for (int i = 0; i &lt; m; i&#43;&#43;) for (int j = 0; j &lt; n; j&#43;&#43;) scanf(&#34;%d&#34;, &amp;b[i][j]);
		for (int i = 0; i &lt; m; i&#43;&#43;) for (int j = 0; j &lt; n; j&#43;&#43;) a[i][j] &#43;= b[i][j];
		for (int i = 0; i &lt; m; i&#43;&#43;) {
			bool flag = true;
			for (int j = 0; j &lt; n; j&#43;&#43;) {
				if (a[i][j] != 0) {
					flag = false;
					break;
				}
			}
			if (flag) cnt&#43;&#43;;
		}
		for (int j = 0; j &lt; n; j&#43;&#43;) {
			bool flag = true;
			for (int i = 0; i &lt; m; i&#43;&#43;) {
				if (a[i][j] != 0) {
					flag = false;
					break;
				}
			}
			if (flag) cnt&#43;&#43;;
		}
		printf(&#34;%d\n&#34;, cnt);
	}
	return 0;
}
```

#### ZOJ

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

map&lt;char, int&gt; m ;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s;
	cin &gt;&gt; s;
	int len = s.length();
	for (int i = 0; i &lt; len; &#43;&#43;i) m[s[i]]&#43;&#43;;
	while (m[&#39;Z&#39;] &gt; 0 || m[&#39;O&#39;] &gt; 0 || m[&#39;J&#39;] &gt; 0) {
		if (m[&#39;Z&#39;] &gt; 0){
			printf(&#34;Z&#34;);
			m[&#39;Z&#39;]--;
		}
		if (m[&#39;O&#39;] &gt; 0){
			printf(&#34;O&#34;);
			m[&#39;O&#39;]--;
		}
		if (m[&#39;J&#39;] &gt; 0){
			printf(&#34;J&#34;);
			m[&#39;J&#39;]--;
		}
	}
	return 0;
}
```

#### 开门人和关门人

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	string id, sign_time, signout_time, open_id, close_id;
	string opentime = &#34;24:00:00&#34;;
	string closetime = &#34;00:00:00&#34;;
	while (n--) {
		cin &gt;&gt; id &gt;&gt; sign_time &gt;&gt; signout_time;
		if (sign_time &lt; opentime) {
			opentime = sign_time;
			open_id = id;
		}
		if (signout_time &gt; closetime) {
			closetime = signout_time;
			close_id = id;
		}
	}
	cout &lt;&lt; open_id &lt;&lt; &#34; &#34; &lt;&lt; close_id ;
	return 0;
}
```

**使用 `map` 的做法**

&gt;  `std::map` 是一个有序的关联容器，它会根据键自动进行排序。`std::map` 的迭代器可以用来遍历容器中的元素
&gt;  `.begin()` 成员函数返回容器中的第一个元素，`--map.end()` 返回容器中的最后一个元素
&gt;   在 `std::map` 中，`first` 和 `second` 是 `std::pair` 类型的成员，分别用来访问键和值

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;


map&lt;string, string&gt;signin;
map&lt;string, string&gt;signout;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	string id, signin_time, signout_time;
	while (n--) {
		cin &gt;&gt; id &gt;&gt; signin_time &gt;&gt; signout_time;
		signin[signin_time] = id ;
		signout[signout_time] = id;
	}
	//	迭代器可以&#43;&#43;、--，但不支持&#43;1
	cout &lt;&lt; (signin.begin()-&gt;second) &lt;&lt; &#34; &#34; &lt;&lt; ((--signout.end())-&gt;second);
	return 0;
}
```



#### 最小长方形

**使用 `vector` &#43; `sort()` 的做法**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;


vector&lt;int&gt; x, y;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int a, b;
	while (scanf(&#34;%d%d&#34;, &amp;a, &amp;b) != EOF) {
		if (a == 0 &amp;&amp; b == 0) {
			if (x.size() == 0) continue;
			sort(x.begin(), x.end());
			sort(y.begin(), y.end());
//			在 C&#43;&#43; 中，* 符号是解引用运算符，用于访问指针或迭代器指向的对象或元素的值。
			cout &lt;&lt; x[0] &lt;&lt; &#34; &#34; &lt;&lt; y[0] &lt;&lt; &#34; &#34; &lt;&lt; *(x.end() - 1) &lt;&lt; &#34; &#34; &lt;&lt; *(y.end() - 1) &lt;&lt; &#34;\n&#34;;
//			清空动态数组
			x.clear();
			y.clear();
		} else {
			x.push_back(a);
			y.push_back(b);
		}

	}
	return 0;
}
```

**直接记录最大值和最小值的做法，这里break不会导致多组样例出错**

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;
#define MAXN 1e18

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	ll x, y, x_min, y_min, x_max, y_max;
	x_min = y_min = MAXN;
	x_max = y_max = 0;
	while (scanf(&#34;%lld%lld&#34;, &amp;x, &amp;y) != EOF) {
		if (x == 0 &amp;&amp; y == 0) break;
		if (x &lt; x_min) x_min = x;
		if (x &gt; x_max) x_max = x;
		if (y &lt; y_min) y_min = y;
		if (y &gt; y_max) y_max = y;
	}
	printf(&#34;%lld %lld %lld %lld\n&#34;, x_min, y_min, x_max, y_max);
	return 0;
}
```

#### 畅通工程

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int MAXN = 1100;

int main() {
    int n, m, t;
    while (scanf(&#34;%d&#34;, &amp;amp;n) != EOF) {
        if (n == 0) break;
        scanf(&#34;%d&#34;, &amp;amp;m);
        t = n - 1;
        vector&amp;lt;int&amp;gt;v(MAXN, -1);
        while (m--) {
            int a, b;
            scanf(&#34;%d%d&#34;, &amp;amp;a, &amp;amp;b);
            while (v[a] != -1)a = v[a];
            while (v[b] != -1)b = v[b];
            if (a == b)continue;
            else v[b] = a, t -= 1;
        }
        v.clear();
        printf(&#34;%d\n&#34;, t);
    }
    return 0;
}
```

#### A&#43;B

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

string dot_clear(string &amp;s) {
	string tmp;
	for (int i = 0; i &lt; s.size(); i&#43;&#43;) {
		if (s[i] != &#39;,&#39;) tmp &#43;= s[i];
	}
	return tmp;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string a, b;cin &gt;&gt; a &gt;&gt; b;
	ll A, B;
	A = stoi(dot_clear(a));
	B = stoi(dot_clear(b));
	cout &lt;&lt; A &#43; B &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 还是A&#43;B
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

bool check(int a, int b, int k) {
	int num1, num2;
	while (k--) {
		num1 = a % 10, a /= 10;
		num2 = b % 10, b /= 10;
		if (num1 != num2) return false;
	}
	return true;
}


int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int a, b, k;
	while (cin &gt;&gt; a &gt;&gt; b &gt;&gt; k) {
		if (a == 0 &amp;&amp; b == 0)break;
		if (check(a, b, k)) cout &lt;&lt; &#34;-1&#34; &lt;&lt; &#39;\n&#39;;
		else cout &lt;&lt; a &#43; b &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### 统计字符

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

map&lt;char, int&gt;m;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s1, s2;
	while (getline(cin, s1)) {
		if (s1[0] == &#39;#&#39;) break;
		getline(cin, s2);
		for (int i = 0; i &lt; s2.size(); i&#43;&#43;) m[s2[i]]&#43;&#43;;
		for (int i = 0; i &lt; s1.size(); i&#43;&#43;) cout &lt;&lt; s1[i] &lt;&lt; &#34; &#34; &lt;&lt; m[s1[i]] &lt;&lt; &#39;\n&#39;;
		m.clear();
	}
	return 0;
}
```
#### A&#43;B

&gt; 这道题明确说了A和B是小于100的正整数，所以一共就两种情况，A和B是一位数或者两位数
&gt; 
&gt; 所以这道题直接判断一下位数，然后把运算符读掉再判断一下A&#43;B的结果是否为0，然后输出A&#43;B的结果即可

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int str2num(string s) {
	if (s == &#34;zero&#34;) return 0;
	else if (s == &#34;one&#34;) return 1;
	else if (s == &#34;two&#34;) return 2;
	else if (s == &#34;three&#34;) return 3;
	else if (s == &#34;four&#34;) return 4;
	else if (s == &#34;five&#34;) return 5;
	else if (s == &#34;six&#34;) return 6;
	else if (s == &#34;seven&#34;) return 7;
	else if (s == &#34;eight&#34;) return 8;
	else return 9;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int a, b, res;
	string str;
	while (cin &gt;&gt; str) {
		a = str2num(str);
		cin &gt;&gt; str;
		if (str != &#34;&#43;&#34;) {
			a *= 10;
			a &#43;= str2num(str);
			cin &gt;&gt; str;
		}
		cin &gt;&gt; str;
		b = str2num(str);
		cin &gt;&gt; str;
		if (str != &#34;=&#34;) {
			b *= 10;
			b &#43;= str2num(str);
			cin &gt;&gt; str;
		}
		res = a &#43; b;
		if (res != 0) cout &lt;&lt; a &#43; b &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### Median

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

vector&lt;ll&gt;v1, v2;
int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, tmp, target;
	ll ans;
	while (cin &gt;&gt; n) {
		for (int i = 0; i &lt; n; i&#43;&#43;) cin &gt;&gt; tmp, v1.push_back(tmp);
		cin &gt;&gt; m;
		for (int i = 0; i &lt; m; i&#43;&#43;) cin &gt;&gt; tmp, v2.push_back(tmp);
		target = n &#43; m &#43; 1 &gt;&gt; 1;
		int i = 0, j = 0;
		for (int k = 0; k != target; k&#43;&#43;) {
			if (v1[i] &lt;= v2[j]) ans = v1[i&#43;&#43;];
			else ans = v2[j&#43;&#43;];
		}
		cout &lt;&lt; ans &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### Sharing
```c&#43;&#43;
#include&lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e6 &#43; 10;
int hashh[N];
int main() {
    int s1, s2, n, start, next;
    char c;
    while (scanf(&#34;%d%d%d&#34;, &amp;s1, &amp;s2, &amp;n) != EOF) {
        memset(hashh, 0, sizeof(hashh));
        int flag = 0;
        for (int i = 0; i &lt; n; i&#43;&#43;) {
            scanf(&#34;%d %c %d&#34;, &amp;start, &amp;c, &amp;next);
            if (next != -1) hashh[next]&#43;&#43;;
        }
        for (int i = 0; i &lt; N; i&#43;&#43;) {
            if (hashh[i] &gt; 1) {
                printf(&#34;%05d\n&#34;, i);
                flag = 1;
                break;
            }
        }
        if (!flag)printf(&#34;-1\n&#34;);
    }
    return 0;
}
```

#### 最大连续子序列(dp)
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int k;
	while (cin &gt;&gt; k &amp;&amp; k) {
		vector&lt;int&gt;arr(k, 0), f(k, 0);
		int maxx = -1e9, head = 0, tail = -1;
		for (int i = 0; i &lt; k; i&#43;&#43;) {
			cin &gt;&gt; arr[i];
			if (i &gt; 0) f[i] = max(arr[i], f[i - 1] &#43; arr[i]);
			else f[i] = arr[i];
			if (f[i] &gt; maxx) maxx = f[i], tail = i;
		}
		if (tail == -1) cout &lt;&lt; &#34;0&#34; &lt;&lt; arr[0] &lt;&lt; &#34; &#34; &lt;&lt; arr[k - 1] &lt;&lt; &#39;\n&#39;;
		else {
			for (int i = tail; i &gt;= 0; i--) {
				if (f[i] &lt; 0) {
					head = i &#43; 1;
					break;
				}
			}
		}
		cout &lt;&lt; maxx &lt;&lt; &#34; &#34; &lt;&lt; arr[head] &lt;&lt; &#34; &#34; &lt;&lt; arr[tail] &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### 排名
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

struct Student {
	string id;
	int m, sum = 0;
	bool operator &lt;(const Student &amp;w) const {
		if (sum != w.sum) return sum &gt; w.sum; // 降序排序
		else return id &lt; w.id;
	}
} stu[1010];

int score[20];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, g, tmp;
	while (cin &gt;&gt; n &gt;&gt; m &gt;&gt; g &amp;&amp; n) {
		int cnt = 0;
		for (int i = 1; i &lt;= m; i&#43;&#43;) cin &gt;&gt; score[i];
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			cin &gt;&gt; stu[i].id &gt;&gt; stu[i].m;
			stu[i].sum = 0;
			for (int j = 0; j &lt; stu[i].m; j&#43;&#43;) {
				cin &gt;&gt; tmp;
				stu[i].sum &#43;= score[tmp];
			}
		}
		sort(stu, stu &#43; n);
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			if (stu[i].sum &gt;= g ) cnt &#43;&#43; ;
		}
		cout &lt;&lt; cnt &lt;&lt; &#39;\n&#39;;
		if (cnt &gt; 0) {
			for (int i = 0; i &lt; cnt; i&#43;&#43;) {
				cout &lt;&lt; stu[i].id &lt;&lt; &#34; &#34; &lt;&lt; stu[i].sum &lt;&lt; &#39;\n&#39;;
			}
		}
	}
	return 0;
}
```

#### Grading
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int max_func(int a, int b, int c) {
	int tmp = max(a, b);
	return max(tmp, c);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int p, t, g1, g2, g3, gj, tmp, tmp1, tmp2;
	double res;
	cin &gt;&gt; p &gt;&gt; t &gt;&gt; g1 &gt;&gt; g2 &gt;&gt; g3 &gt;&gt; gj;
	tmp = abs(g1 - g2);
	if (tmp &lt;= t) res = ((g1 * 1.0) &#43; g2) / 2;
	else {
		tmp1 = abs(g3 - g1);
		tmp2 = abs(g3 - g2);
		if ( tmp1 &lt;= t &amp;&amp; tmp2 &lt;= t) res = max_func(g1, g2, g3) * 1.0;
		else if (tmp1 &gt; t &amp;&amp; tmp &gt; t) res = gj * 0.1;
		if (tmp1 &lt;= t) res = ((0.1 * g1) &#43; g3) / 2;
		if (tmp2 &lt;= t ) res = ((0.1 * g1) &#43; g3) / 2;
	}
	printf(&#34;%.1lf\n&#34;, res);
	return 0;
}
```

#### ZOJ问题
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s;
	while (cin &gt;&gt; s) {
		int left = 0, middle = 0, right = 0;
		int len = s.size();
		int pos_z = s.find(&#39;z&#39;);
		int pos_j = s.find(&#39;j&#39;);
		left = pos_z;
		middle = pos_j - pos_z - 1;
		right = len - pos_j - 1;
		if (left == right &amp;&amp; middle &gt;= 1) cout &lt;&lt; &#34;Accepted&#34; &lt;&lt; &#39;\n&#39;;
		else if (left &gt; 0 &amp;&amp; right &gt; 0 &amp;&amp; left * middle == right) cout &lt;&lt; &#34;Accepted&#34; &lt;&lt; &#39;\n&#39;;
		else cout &lt;&lt; &#34;Wrong Answer&#34; &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### 游船出租
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1010;
struct ship {
	int time;
	bool condition = false;
};

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int a, c, d, time, cnt = 0, sum = 0;
	char b;
	vector&lt;ship&gt;s(110);
	while (scanf(&#34;%d %c %d:%d&#34;, &amp;a, &amp;b, &amp;c, &amp;d) != EOF) {
		if (a == 0) {
			if (cnt == 0) {
				cout &lt;&lt; 0 &lt;&lt; &#34; &#34; &lt;&lt; 0 &lt;&lt; &#39;\n&#39;;
			} else {
//				强制类型转换向上取整
				cout &lt;&lt; cnt &lt;&lt; &#34; &#34; &lt;&lt; int(double(sum) / double (cnt) &#43; 0.5) &lt;&lt; &#39;\n&#39;;
			}
			cnt = 0, sum = 0;
			s.clear();
		} else {
			time = 60 * c &#43; d;
			if (b == &#39;S&#39;) {
				s[a].time = time;
				s[a].condition = true;
			} else if (s[a].condition == true) {
				cnt &#43;&#43;;
				sum &#43;= time - s[a].time;
//				s[a].time = 0;
//				s[a].condition = false;
			}
		}
	}
	return 0;
}
```

#### 寻找大富翁 
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;
int a[N];

bool cmp(int a, int b) {
	return a &gt; b;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m;
	while (cin &gt;&gt; n &gt;&gt; m &amp;&amp; n) {
		for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;a[i]);
		sort(a, a &#43; n, cmp);
		if (n &gt;= m) {
			for (int i = 0; i &lt; m; i&#43;&#43;) printf(&#34;%d &#34;, a[i]);
		} else {
			for (int i = 0; i &lt; n; i&#43;&#43;) printf(&#34;%d &#34;, a[i]);
		}
		printf(&#34;\n&#34;);
	}
	return 0;
}
```

#### 毕业bg(dp)
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 50;
int f[N];

struct BG {
	int h, l, t;
	bool operator &lt; (const BG &amp;w) const {
		return t &lt; w.t;
	}
} bg[50];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	while (cin &gt;&gt; n &amp;&amp; n != -1) {
		for (int i = 0; i &lt; n; i&#43;&#43;) scanf(&#34;%d%d%d&#34;, &amp;bg[i].h, &amp;bg[i].l, &amp;bg[i].t);
		sort(bg, bg &#43; n);
		int max_happy = 0;
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			for (int j = bg[i].t; j &gt;= bg[i].l; j--) {
				f[j] = max(f[j], f[j - bg[i].l] &#43; bg[i].h);
				if (f[j] &gt; max_happy) max_happy = f[j];
			}
		}
		printf(&#34;%d\n&#34;, max_happy);
	}
	return 0;
}
```

#### 又一版 A&#43;B 
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;
int res[1010];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int m, a, b;
	ll tmp;
	while (cin &gt;&gt; m &gt;&gt; a &gt;&gt; b &amp;&amp; m ) {
		memset(res, 0, sizeof(res));
		int top = 0;
		tmp = a &#43; b;
		if (tmp == 0) res[top&#43;&#43;] = 0;
		while (tmp != 0) {
			res[top&#43;&#43;] = tmp % m;
			tmp /= m;
		}
		for (int i = top - 1; i &gt;= 0; i--) cout &lt;&lt; res[i];
		cout &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

####  Hello World for U 
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 80;

char arr[N][N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int len, pos, n1, n2, n3;
	string s;
	while (cin &gt;&gt; s) {
//		初始化数组
		for (int i = 0; i &lt; N; i&#43;&#43;) {
			for (int j = 0; j &lt; N; j&#43;&#43;) {
				arr[i][j] = &#39; &#39;;
			}
		}
		len = s.size();
		n1  = n3 = (len &#43; 2) / 3;
		n2 = len - n1 * 2;
//		cout &lt;&lt; len &lt;&lt; &#39;\n&#39;;
//		cout &lt;&lt; n1 &lt;&lt; &#34; &#34; &lt;&lt; n2 &lt;&lt; &#34; &#34; &lt;&lt; n3 &lt;&lt; &#39;\n&#39;;
		pos = 0;
		for (int i = 0; i &lt; n1; i&#43;&#43;) arr[i][0] = s[pos&#43;&#43;];
		for (int j = 1; j &lt; n2 &#43; 1; j&#43;&#43;) arr[n1 - 1][j] = s[pos&#43;&#43;];
		for (int k = n1 - 1; k &gt;= 0; k--) arr[k][n2 &#43; 1] = s[pos&#43;&#43;];
		for (int i = 0; i &lt; n1; i&#43;&#43;) {
			for (int j = 0; j &lt; n2 &#43; 2; j&#43;&#43;) {
				cout &lt;&lt; arr[i][j];
			}
			cout &lt;&lt; &#39;\n&#39;;
		}
		cout &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### 继续xxx定律
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, num;
	while (cin &gt;&gt; n &amp;&amp; n) {
		set&lt;int&gt;coverr;
		stack&lt;int&gt;keyy;
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			cin &gt;&gt; num;
			if (coverr.count(num)) continue;
			keyy.push(num);
			while (num != 1) {
				if (num &amp; 1) num = 3 * num &#43; 1 &gt;&gt; 1;
				else num &gt;&gt;= 1;
				coverr.insert(num);
			}
		}
		while (keyy.size()) {
			if (!coverr.count(keyy.top())) cout &lt;&lt; keyy.top() &lt;&lt; &#34; &#34;;
			keyy.pop();
		}
		puts(&#34;&#34;);
	}
	return 0;
}
```

#### 魔咒词典
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

map&lt;string, string&gt; m;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s, ans;
	int pos, n;
	while (1) {
		getline(cin, s);
		if (s == &#34;@END@&#34;) break;
		pos = s.find(&#39;]&#39;);
		m[s.substr(0, pos &#43; 1)] = s.substr(pos &#43; 2);
		m[s.substr(pos &#43; 2)] = s.substr(0, pos &#43; 1);
	}
	cin &gt;&gt; n;
	getchar();
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		getline(cin, s);
		ans = m[s];
		if (ans == &#34;&#34;) cout &lt;&lt; &#34;what?&#34; &lt;&lt; &#39;\n&#39;;
		else if (ans[0] == &#39;[&#39;) cout &lt;&lt; ans.substr(1, ans.size() - 2) &lt;&lt; &#39;\n&#39;;
		else cout &lt;&lt; ans &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```

#### Graduate Admission
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt; &gt; output;
const int N = 40010;
int quota[110];

struct Applicant {
	int id, Ge, Gi, rank, select[10];
	double final; // 这里要注意把final定义为double类型，要不然会出错
	bool operator &lt;(const Applicant &amp;w) const {
		if (final != w.final) return final &gt; w.final;
		else if (Ge != w.Ge) return Ge &gt; w.Ge;
		else return Gi &gt; w.Gi;
	}
} app[N];

struct RES {
	vector&lt;int&gt;applicant;
} res[110];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, k;
	cin &gt;&gt; n &gt;&gt; m &gt;&gt; k;
	for (int i = 0; i &lt; m; i&#43;&#43;) scanf(&#34;%d&#34;, &amp;quota[i]);
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		scanf(&#34;%d %d&#34;, &amp;app[i].Ge, &amp;app[i].Gi);
		app[i].final = (app[i].Ge &#43; app[i].Gi) * 0.1 / 2;
		app[i].id = i;
		for (int j = 0; j &lt; k; j&#43;&#43;) scanf(&#34;%d&#34;, &amp;app[i].select[j]);
	}
	sort(app, app &#43; n);
	app[0].rank = 1;
	int cnt = 1;
	for (int i = 1; i &lt; n; i&#43;&#43;) {
		cnt&#43;&#43;;
		if (app[i].final &lt; app[i - 1].final) {
			app[i].rank = cnt;
		} else {
			if (app[i].Ge &lt; app[i - 1].Ge) {
				app[i].rank = cnt;
			} else {
				if (app[i].Gi &lt; app[i - 1].Gi) {
					app[i].rank = cnt;
				} else {
					app[i].rank = app[i - 1].rank;
				}
			}
		}
	}

	for (int i = 0; i &lt; n; i&#43;&#43;) {
		for (int j = 0; j &lt; k; j&#43;&#43;) {
			int choice = app[i].select[j]; // choice表示选择学校的编号
			if (quota[choice] &gt; 0) {
				quota[choice]--;
				res[choice].applicant.push_back(i);
				break;
			} else {
				int target_rank = app[res[choice].applicant.back()].rank;
				if (app[i].rank == target_rank) {
					res[choice].applicant.push_back(i);
					break;
				}
			}
		}
	}

	for (int i = 0; i &lt; m; i&#43;&#43;) {
		for (auto x : res[i].applicant) {
			output.push(app[x].id);
		}
		while (!output.empty()) {
			cout &lt;&lt; output.top() &lt;&lt; &#34; &#34;;
			output.pop();
		}
		puts(&#34;&#34;);
	}
	return 0;
}
```

#### EXCEL排序
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 1e5 &#43; 10;

struct Student {
	int id, score;
	string name;
} stu[N];

bool cmp1(Student s1, Student s2) {
	return s1.id &lt; s2.id;
}

bool cmp2(Student s1, Student s2) {
	if (s1.name == s2.name) {
		return s1.id &lt; s2.id;
	}
	return s1.name &lt; s2.name;
}

bool cmp3(Student s1, Student s2) {
	if (s1.score == s2.score) {
		return s1.id &lt; s2.id;
	}
	return  s1.score &lt; s2.score;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, c ;
	while (cin &gt;&gt; n &gt;&gt; c &amp;&amp; n) {
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			cin &gt;&gt; stu[i].id &gt;&gt; stu[i].name &gt;&gt; stu[i].score;
		}
		if (c == 1) sort(stu, stu &#43; n, cmp1);
		else if (c == 2) sort(stu, stu &#43; n, cmp2);
		else sort(stu, stu &#43; n, cmp3);
		cout &lt;&lt; &#34;Case:&#34; &lt;&lt; &#39;\n&#39;;
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			printf(&#34;%06d &#34;, stu[i].id);
			cout &lt;&lt; stu[i].name &lt;&lt; &#34; &#34; &lt;&lt; stu[i].score &lt;&lt; &#39;\n&#39;;
		}
	}
	return 0;
}
```

#### 奥运排序问题
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

const int N = 10;
int tmp [N][3]; // 金牌数 奖牌数 人口/百万
float res[N][4]; // 金牌数 奖牌数 金牌人口比例 奖牌人口比例
int rankk[N][4]; // 四种比较方法对应的排名

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, id;
	while (cin &gt;&gt; n &gt;&gt; m &amp;&amp; n) {
		memset(rankk, 0, sizeof(rankk));
		for (int i = 0; i &lt; n; i&#43;&#43;) cin &gt;&gt; tmp[i][0] &gt;&gt; tmp[i][1] &gt;&gt; tmp[i][2];
		for (int i = 0; i &lt; m; i&#43;&#43;) {
			cin &gt;&gt; id;
			res[i][0] = tmp[id][0];
			res[i][1] = tmp[id][1];
			res[i][2] = tmp[id][0] ? tmp[id][0] * 1.0 / tmp[id][2] : 0;
			res[i][3] = tmp[id][1] ? tmp[id][1] * 1.0 / tmp[id][2] : 0;
		}
		for (int i = 0; i &lt; m; i&#43;&#43;) { // m表示需要比较的国家数
			for (int j = 0; j &lt; m; j&#43;&#43;) {
				for (int k = 0; k &lt; 4; k&#43;&#43;) {
					if (res[j][k] &gt; res[i][k]) { //就是判断有多少个j在i的前面
						rankk[i][k]&#43;&#43;;
					}
				}
			}
		}
		for (int i = 0; i &lt; m; i&#43;&#43;) {
			int minn = 0;
			for (int j = 1; j &lt; 4; j&#43;&#43;) {
				if (rankk[i][j] &lt; rankk[i][minn]) {
					minn = j;
				}
			}
			cout &lt;&lt; rankk[i][minn] &#43; 1 &lt;&lt; &#34;:&#34; &lt;&lt; minn &#43; 1 &lt;&lt; &#39;\n&#39;;
		}
		puts(&#34;&#34;);
	}
	return 0;
}
```

#### 还是畅通工程(Kruskal算法求最小生成树)
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 110;
int p[N], h[N];

struct Edge {
	int x, y, v;
	bool operator&lt;(const Edge &amp;w) const {
		return v &lt; w.v;
	}
} edge[5000];

int Find(int x) {
	if (x != p[x]) p[x] = Find(p[x]);
	return p[x];
}

void Union(int x, int y) {
	x = Find(x), y = Find(y);
	if (h[x] &lt; h[y])p[x] = y;
	else if (h[y] &lt; h[x]) p[y] = x;
	else p[y] = x, h[x]&#43;&#43;;
}

int kruskal(int n, int num) {
	int cost = 0;
	for (int i = 0; i &lt;= n; i&#43;&#43;) p[i] = i, h[i] = 0;
	for (int i = 0; i &lt; num; i&#43;&#43;) {
		int x = edge[i].x;
		int y = edge[i].y;
		if (Find(x) != Find(y)) {
			Union(x, y);
			cost &#43;= edge[i].v;
		}
	}
	return cost;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	while (scanf(&#34;%d&#34;, &amp;n) != EOF) {
		if (n == 0) break;
		int num = n * (n - 1) / 2;
		for (int i = 0; i &lt; num; i&#43;&#43;) {
			scanf(&#34;%d%d%d&#34;, &amp;edge[i].x, &amp;edge[i].y, &amp;edge[i].v);
		}
		sort(edge, edge &#43; num);
		int cost = kruskal(n, num);
		printf(&#34;%d\n&#34;, cost);
	}
	return 0;
}
```

#### 继续畅通工程(Kruskal算法求最小生成树)
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 110;
int p[N], h[N];

struct Edge {
	int x, y, v, st;
	bool operator &lt; (const Edge &amp;w) const {
		return v &lt; w.v;
	}
} edge[5000];

int Find(int x) {
	if (x != p[x]) p[x] = Find(p[x]);
	return p[x];
}

void Union(int x, int y) {
	x = Find(x), y = Find(y);
	if (h[x] &lt; h[y]) p[x]  = y;
	else if (h[y] &lt; h[x]) p[y] = x;
	else p[y] = x, h[x]&#43;&#43;;
}

int kruskal(int n, int num) {
	for (int i = 0; i &lt;= n; i&#43;&#43;) p[i] = i, h[i] = 0;
	int cost = 0;
	for (int i = 0; i &lt; num; i&#43;&#43;) {
		int x = edge[i].x;
		int y = edge[i].y;
		if (Find(x) != Find(y)) {
			Union(x, y);
			cost &#43;= edge[i].v;
		}
	}
	return cost;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	while (scanf(&#34;%d&#34;, &amp;n) != EOF) {
		if (n == 0) break;
		int num = n * (n - 1) / 2;
		for (int i = 0; i &lt; num; i&#43;&#43;) {
			scanf(&#34;%d%d%d%d&#34;, &amp;edge[i].x, &amp;edge[i].y, &amp;edge[i].v, &amp;edge[i].st);
			if (edge[i].st == 1) edge[i].v = 0;
		}
		sort(edge, edge &#43; num);
//		for (int i = 0; i &lt; num; i&#43;&#43;) {
//			printf(&#34;%d %d %d %d\n&#34;, edge[i].x, edge[i].y, edge[i].v, edge[i].st);
//		}
		int cost = kruskal(n, num);
		printf(&#34;%d\n&#34;, cost);
	}
	return 0;
}
```

#### 畅通工程
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 110;
int p[N], h[N];

struct Edge {
	int x, y, v;
	bool operator&lt;(const Edge &amp;w) const {
		return v &lt; w.v;
	}
} edge[5000];

int Find(int x) {
	if (x != p[x]) p[x] = Find(p[x]);
	return p[x];
}

void Union(int x, int y) {
	x = Find(x), y = Find(y);
	if (h[x] &lt; h[y]) p[x] = y;
	else if (h[y] &lt; h[x]) p[y] = x;
	else p[y] = x, h[x]&#43;&#43;;
}

int kruskal(int m, int n) {
	int cost = 0;
	for (int i = 0; i &lt;= m; i&#43;&#43;) p[i] = i, h[i] = 0;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		int x = edge[i].x;
		int y = edge[i].y;
		if (Find(x) != Find(y)) {
			Union(x, y);
			cost &#43;= edge[i].v;
		}
	}
	return cost;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m;
	while (scanf(&#34;%d&#34;, &amp;n) != EOF) {
		if (n == 0) break;
		scanf(&#34;%d&#34;, &amp;m);
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			scanf(&#34;%d%d%d&#34;, &amp;edge[i].x, &amp;edge[i].y, &amp;edge[i].v);
		}
		sort(edge, edge &#43; n);
		int cost = kruskal(m, n);
		int cnt = 0;
		for (int i = 1; i &lt;= m; i&#43;&#43;) {
			if (p[i] == i) cnt&#43;&#43;;
		}
		if (cnt == 1 &amp;&amp; n &gt;= m - 1) printf(&#34;%d\n&#34;, cost);
		else printf(&#34;?\n&#34;);
	}
	return 0;
}
```

#### 二叉搜索树
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;

struct Node {
	Node *left, *right;
	char data;
	Node(char data): data(data), left(NULL), right(NULL) {};
};

Node *Insert(Node *root, char data) {
	if (root == NULL) return new Node(data);
	else if (root-&gt;data &lt; data) root-&gt;right = Insert(root-&gt;right, data);
	else root-&gt;left = Insert(root-&gt;left, data);
	return root;
}

void preOrder(Node *root) {
	if (root != NULL) {
		printf(&#34;%c &#34;, root-&gt;data);
		preOrder(root-&gt;left);
		preOrder(root-&gt;right);
	}
}

bool cmp(Node *root1, Node *root2) {
	if (root1 == NULL &amp;&amp; root2 == NULL) return true;
	else if ((root1 == NULL &amp;&amp; root2 != NULL) || (root1 != NULL &amp;&amp; root2 == NULL) || (root1-&gt;data != root2-&gt;data)) {
		return false;
	}
	return cmp(root1-&gt;left, root2-&gt;left) &amp;&amp; cmp(root1-&gt;right, root2-&gt;right);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;
	string s, t;
	Node *root1 = NULL;
	while (cin &gt;&gt; n) {
		if (n == 0) break;
		cin &gt;&gt; s;
		for (int i = 0; i &lt; s.size(); i&#43;&#43;) root1 = Insert(root1, s[i]);
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			Node *root2 = NULL;
			cin &gt;&gt; t;
			for (int j = 0; j &lt; t.size(); j&#43;&#43;) root2 = Insert(root2, t[j]);
			if (cmp(root1, root2)) puts(&#34;YES&#34;);
			else puts(&#34;NO&#34;);
		}
	}
	return 0;
}
```

#### Head of a Gang

解法一
```c&#43;&#43;
#include &lt;iostream&gt;  
#include &lt;cstring&gt;  
#include &lt;algorithm&gt;  
using namespace std;  
  
const int N = 26;  
int sum[N], weight;  
  
struct person { // 成员  
    string name;  
    int parents;// 根节点  
    int weight;  
} p[N];  
  
struct gang { // 帮派  
    string head;  
    int number;// 成员数量  
    bool operator &lt; (const gang &amp;w) const {  
        return head &lt; w.head;  
    }  
} g[10];  
  
int findRoot(int x) {  
    if (p[x].parents &lt; 0) return x; // 根节点  
    else {  
        p[x].parents = findRoot(p[x].parents);  
        return p[x].parents;  
    }  
}  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n, k, no1, no2, weight, sum[N];  
    string name1, name2;  
    while (cin &gt;&gt; n &gt;&gt; k) {  
        for (int i = 0; i &lt; N; i&#43;&#43;) {// 初始化  
            p[i].parents = -1;  
            p[i].weight = 0;  
            sum[i] = 0;//帮派中交流的总权重  
        }  
        for (int i = 0; i &lt; n; i&#43;&#43;) {  
            cin &gt;&gt; name1 &gt;&gt; name2 &gt;&gt; weight;  
            no1 = name1[0] - &#39;A&#39;;  
            no2 = name2[0] - &#39;A&#39;;  
            p[no1].name = name1;  
            p[no1].weight &#43;= weight;  
            p[no2].name = name2;  
            p[no2].weight &#43;= weight;  
            int p1 = findRoot(no1);  
            int p2 = findRoot(no2);  
            if (p1 != p2) {  
                p[p1].parents &#43;= p[p2].parents;  
                p[p2].parents = p1;  
                sum[p1] &#43;= sum[p2] &#43; weight;// 两个集合的总权重合并  
            } else sum[p1] &#43;= weight;  
        }  
        int ans = 0;// 帮派数量  
        for (int i = 0; i &lt; N; i&#43;&#43;) {  
            if (p[i].parents &lt; -2 &amp;&amp; sum[i] &gt; k) {  
                g[ans].number = -p[i].parents;  
                int maxx = i;  
                for (int j = 0; j &lt; N; j&#43;&#43;) {  
                    if (findRoot(j) == i &amp;&amp; p[j].weight &gt; p[maxx].weight) {  
                        maxx = j;// 选择权值最大的作为头目  
                    }  
                }  
                g[ans].head = p[maxx].name;  
                ans&#43;&#43;;  
            }  
        }  
        cout &lt;&lt; ans &lt;&lt; &#39;\n&#39;;  
        sort(g, g &#43; ans);  
        for (int i = 0; i &lt; ans; i&#43;&#43;) {  
            cout &lt;&lt; g[i].head &lt;&lt; &#34; &#34; &lt;&lt; g[i].number &lt;&lt; &#39;\n&#39;;  
        }  
    }  
    return 0;  
}
```

解法二(TODO)
```

```

#### 简单计算器
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;stack&gt;
#include &lt;string&gt;
using namespace std;

stack&lt;double&gt; num;
stack&lt;char&gt; op;

void init() {
	while (!op.empty()) op.pop();
	while (!num.empty()) num.pop();
}

int pre(char op) {
	if (op == &#39;&#43;&#39; || op == &#39;-&#39;) return 1;
	if (op == &#39;*&#39; || op == &#39;/&#39;) return 2;
	return 0;
}

void eval() {
	double r = num.top();
	num.pop();
	double l = num.top();
	num.pop();
	char opcode = op.top();
	op.pop();
	if (opcode == &#39;&#43;&#39;) num.push(l &#43; r);
	if (opcode == &#39;-&#39;) num.push(l - r);
	if (opcode == &#39;*&#39;) num.push(l * r);
	if (opcode == &#39;/&#39;) num.push(l / r);
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	string s;
	while (getline(cin, s)) {
		if (s == &#34;0&#34;) break;
		init();
		for (int i = 0; i &lt; s.size(); i&#43;&#43;) {
			if (isspace(s[i])) continue;
			if (isdigit(s[i])) {
				double t = 0;
				while (i &lt; s.size() &amp;&amp; isdigit(s[i])) {
					t = t * 10 &#43; s[i&#43;&#43;] - &#39;0&#39;;
				}
				i--;
				num.push(t);
			} else if (s[i] == &#39;(&#39;) op.push(s[i]);
			else if (s[i] == &#39;)&#39;) {
				while (!op.empty() &amp;&amp; op.top() != &#39;(&#39;) {
					eval();
				}
				op.pop();
			} else {
				while (!op.empty() &amp;&amp; pre(op.top()) &gt;= pre(s[i])) {
					eval();
				}
				op.push(s[i]);
			}
		}
		while (!op.empty()) {
			eval();
		}
		printf(&#34;%.2lf\n&#34;, num.top());
	}
	return 0;
}

```

#### 欧拉回路
&gt; 欧拉回路是指不令笔离开纸面，可画过图中每条边仅一次，且可以回到起点的一条回路

判断欧拉回路的条件：
1. 除了孤立节点外，其它节点满足连通并且度为偶数
2. 图中只允许有一个连通分量

解法一：并查集
```c&#43;&#43;
#include &lt;iostream&gt;
using namespace std;
typedef long long ll;

const int N = 1010;
ll p[N], d[N], h[N], g[N];

ll Find(ll k) {
	if (p[k] != k) p[k] = Find(p[k]);
	return p[k];
}

void Union(ll a, ll b) {
	a = Find(a), b = Find(b);
	if (h[a] &lt; h[b]) p[a] = b;
	else if (h[b] &lt; h[a]) p[b] = a;
	else p[b] = a, h[a]&#43;&#43;;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n, m, a, b, t;
	while (cin &gt;&gt; n &amp;&amp; n) {
		cin &gt;&gt; m;
		for (int i = 0; i &lt;= n; i&#43;&#43;) p[i] = i, d[i] = 0;
		for (int i = 1; i &lt;= m; i&#43;&#43;) {
			cin &gt;&gt; a &gt;&gt; b;
			d[a]&#43;&#43;, d[b]&#43;&#43;;
			Union(a, b);
			t = a;// 记录其中一个连通图的点
		}
		int res = 0;
		bool flag = true;
		for (int i = 1; i &lt;= n; i&#43;&#43;) {
			if (Find(i) != Find(t) &amp;&amp; d[i] != 0) {// 存在多个连通分量
				flag = false;
				break;
			} else if (d[i] &amp; 1) {// 存在度不为偶数的点
				flag = false;
				break;
			}
		}
		if (flag) puts(&#34;1&#34;);
		else puts(&#34;0&#34;);
	}
	return 0;
}

```
解法二(dfs&#43;剪枝)
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;cstring&gt;
using namespace std;

const int N = 1010;
int n, m, x, y, g[N][N];

bool dfs(int st, int k, int cnt) {// 深搜&#43;剪枝
	if (st == k &amp;&amp; cnt == m) return true;// 回到起点并且经过m条边
	bool ret = false;
	for (int j = 1; j &lt;= n &amp;&amp; !ret; j&#43;&#43;) {
		if (g[k][j]) {
			g[k][j] = g[j][k] = 0;// 剪枝标记, 防止重复使用
			ret |= dfs(st, j, cnt &#43; 1);
			g[k][j] = g[j][k] = 1;// 恢复
		}
	}
	return ret;
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	while (cin &gt;&gt; n &amp;&amp; n) {
		cin &gt;&gt; m;
		memset(g, 0, sizeof g);
		for (int i = 0; i &lt; m; i&#43;&#43;) {
			cin &gt;&gt; x &gt;&gt; y;
			g[x][y] = g[y][x] = 1;
		}
		bool res = false;
		for (int i = 1; i &lt;= n &amp;&amp; !res; i&#43;&#43;) {
			res |= dfs(i, i, 0);// 只要有一条可行路径就行
		}
		if (res) puts(&#34;1&#34;);
		else puts(&#34;0&#34;);
	}
	return 0;
}
```

#### 找出直系亲属 

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

const int N = 26;
vector&lt;int&gt;g[N];
int n, m, depth;
string s;

void print(int depth, int flag) {// 用flag来区分parent和child的关系
	if (depth == 1) {
		if (flag == 1) puts(&#34;parent&#34;);
		else puts(&#34;child&#34;);
	} else if (depth == 2) {
		if (flag == 1) puts(&#34;grandparent&#34;);
		else puts(&#34;grandchild&#34;);
	} else {
		for (int i = 0; i &lt; depth - 2; i&#43;&#43;) {
			printf(&#34;great-&#34;);
		}
		if (flag == 1) puts(&#34;grandparent&#34;);
		else puts(&#34;grandchild&#34;);
	}
}

void dfs(int a, int b, int d) {
	if (a == b) {
		depth = d;
		return ;
	}
	for (int i = 0; i &lt; g[a].size(); i&#43;&#43;) {
		dfs(g[a][i], b, d &#43; 1);
	}
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	cin &gt;&gt; n &gt;&gt; m;
	for (int i = 0; i &lt; n; i&#43;&#43;) {
		cin &gt;&gt; s;
		if (s[1] != &#39;-&#39;) g[s[0] - &#39;A&#39;].push_back(s[1] - &#39;A&#39;);
		if (s[2] != &#39;-&#39;) g[s[0] - &#39;A&#39;].push_back(s[2] - &#39;A&#39;);
	}
	for (int i = 0; i &lt; m; i&#43;&#43;) {
		depth = -1;
		cin &gt;&gt; s;
		int a = s[0] - &#39;A&#39;, b = s[1] - &#39;A&#39;;
		dfs(a, b, 0);
		if (depth == -1) {
			dfs(b, a, 0);
			if (depth == -1)puts(&#34;-&#34;);
			else print(depth, 1);
		} else print(depth, 2);

	}
	return 0;
}
```

#### To Fill or Not to Fill(贪心)
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
using namespace std;

const int N = 510;
int cmax, d, davg, n; // 容量、目的地距离、每单位汽油能行驶的距离，加油站数量

struct Station {
	double price;
	int dist;
	bool operator &lt; (const Station &amp;w) const {
		return price &lt; w.price;
	}
} s[N];

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	while (cin &gt;&gt; cmax &gt;&gt; d &gt;&gt; davg &gt;&gt; n) {
		double cost = 0, per[d];
		for (int i = 0; i &lt; d; i&#43;&#43;) per[i] = -1;
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			cin &gt;&gt; s[i].price &gt;&gt; s[i].dist;
		}
		sort(s, s &#43; n);
		for (int i = 0; i &lt; n; i&#43;&#43;) {
			for (int j = s[i].dist; j &lt; s[i].dist &#43; cmax * davg &amp;&amp; j &lt; d; j&#43;&#43;) {
				if (per[j] &lt; 0) per[j] = s[i].price / davg;// 贪心
			}
		}
		int i = 0;
		for (i = 0; i &lt; d; i&#43;&#43;) {
			if (per[i] &lt; 0) {
				printf(&#34;The maximum travel distance = %.2f\n&#34;, double(i));
				break;
			}
			cost &#43;= per[i];
		}
		if (i == d) printf(&#34;%.2lf\n&#34;, cost);
	}
	return 0;
}
```

#### 最短路径问题(dijkstra算法&#43;vector数组存储图)
这题有点坑，使用传统邻接表存储会TLE
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;queue&gt;
#include &lt;cstring&gt;
using namespace std;
typedef pair&lt;int, int&gt;PII;
const int N = 1010, M = 1e5 &#43; 10, INF = 0x3f3f3f3f;
int n, m, a, b, d, p, s, t;
int dist[N], cost[N];
bool st[N];

struct Edge {
	int to, lenth, price;
	Edge(int b, int d, int p): to(b), lenth(d), price(p) {};
};

vector&lt;Edge&gt; g[M];// 元素为vector&lt;Edge&gt;的数组

PII dijkstra(int s, int t) {
	memset(dist, 0x3f, sizeof dist);
	memset(cost, 0x3f, sizeof cost);
	memset(st, 0, sizeof st);
	dist[s] = 0, cost[s] = 0;
	priority_queue&lt;PII, vector&lt;PII&gt;, greater&lt;PII&gt; &gt;heap;
	heap.push({0, s});
	while (!heap.empty()) {
		PII tmp = heap.top();// 取距离起点最近的点
		heap.pop();
		int elem = tmp.second, dis = tmp.first;
		if (st[elem]) continue;
		st[elem] = true;
		for (int i = 0; i &lt; g[elem].size(); i&#43;&#43;) { // 遍历所有邻接点
			int j = g[elem][i].to;
			int w = g[elem][i].lenth;
			int v = g[elem][i].price;
			if ((dist[j] &gt; dis &#43; w) || (dist[j] == dis &#43; w &amp;&amp; cost[j] &gt; cost[elem] &#43; v)) {
				dist[j] = dis &#43; w;
				cost[j] = cost[elem] &#43; v;
				heap.push({dist[j], j});
			}
		}
	}
	if (dist[t] == INF) return {INF, INF};
	else return {dist[t], cost[t]};
}

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	while (scanf(&#34;%d%d&#34;, &amp;n, &amp;m) != EOF) {
		if (n == 0 &amp;&amp; m == 0) break;
		memset(g, 0, sizeof g);
		for (int i = 0; i &lt; m; i&#43;&#43;) {
			scanf(&#34;%d%d%d%d&#34;, &amp;a, &amp;b, &amp;d, &amp;p);
			g[a].push_back(Edge(b, d, p));
			g[b].push_back(Edge(a, d, p));
		}
		cin &gt;&gt; s &gt;&gt; t;
		PII res = dijkstra(s, t);
		cout &lt;&lt; res.first &lt;&lt; &#34; &#34; &lt;&lt; res.second &lt;&lt; &#39;\n&#39;;
	}
	return 0;
}
```


### 苏州大学2022年机试真题
#### 编程题1
![](imgs/image-20240831002249866.png)


**解法一**
```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;algorithm&gt;
#include &lt;iomanip&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;set&gt;
using namespace std;

string getMostFrequent(const string&amp; numStr) {
	string resultStr = &#34;&#34;;
	set&lt;int&gt; numset;// 定义一个集合来去重
	vector&lt;int&gt; res;
	int maxx = 0;
	int n = numStr.size();
	int a = numStr[n - 1] - &#39;0&#39;;// 取出最后一位数
	for (int i = 0; i &lt; n - 1; i&#43;&#43;) {
		int cnt = 0;
		int tmp = 0;
		while (i &lt; n - 1 &amp;&amp; !isdigit(numStr[i])) i&#43;&#43;;// 找到第一个数字
		if (i &gt;= n - 1) break;
		int j = i;
		while (numStr[j] != &#39;,&#39;) {
			if (numStr[j] - &#39;0&#39; == a) cnt&#43;&#43;;
			tmp = tmp * 10 &#43; numStr[j] - &#39;0&#39;;
			j&#43;&#43;;
		}
		i = j;
		if (numset.count(tmp)) continue;// 如果这个数已经统计过，就处理下一个
		else if (cnt &gt; maxx) {
			maxx = cnt;
			res.clear();// 找到更大的情况就清空数组
			res.push_back(tmp);
		} else if (cnt == maxx) {
			res.push_back(tmp);
		}
		numset.insert(tmp);
	}
	if (maxx == 0) resultStr = &#34;-1&#34;;
	else {
		resultStr &#43;= to_string(res[0]);
		for (int i = 1; i &lt; res.size(); i&#43;&#43;) {
			resultStr &#43;= &#34;,&#34; &#43; to_string(res[i]);
		}
	}
	return resultStr;
}
```

**解法二**
```c&#43;&#43;
string getMostFrequent(const string&amp; numStr) {
	string resultStr = &#34;&#34;;
	string tmp;
	vector&lt;string&gt; res;
	vector&lt;string&gt; tmpstr;
	set&lt;string&gt; st;
	int len = numStr.size();
	int a = numStr[len - 1] - &#39;0&#39;;
	istringstream iss(numStr);
	int maxx = 0;
	while (getline(iss, tmp, &#39;,&#39;)) {
		tmp.erase(remove(tmp.begin(), tmp.end(), &#39; &#39;), tmp.end());// 删除空格
		tmpstr.push_back(tmp);
	}
	for (int i = 0; i &lt; tmpstr.size() - 1; i&#43;&#43;) { // 遍历每个字符串
		tmp = tmpstr[i];
		if (st.count(tmp)) continue;
		int cnt = 0;
		for (int i = 0; i &lt; tmp.size(); i&#43;&#43;) {
			if (tmp[i] - &#39;0&#39; == a) cnt&#43;&#43;;
		}
		if (cnt &gt; maxx) {
			maxx = cnt;
			res.clear();
			res.push_back(tmp);
		} else if (cnt == maxx) {
			res.push_back(tmp);
		}
		st.insert(tmp);
	}
	if (maxx == 0) return &#34;-1&#34;;
	resultStr = res[0];
	for (int i = 1; i &lt; res.size(); i&#43;&#43;) resultStr &#43;= &#39;,&#39; &#43; res[i];
	return resultStr;
}
```

#### 编程题2

![](imgs/image-20240901134740653.png)

```c&#43;&#43;
#include &lt;iostream&gt;
#include &lt;iomanip&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
using namespace std;

unsigned int getTrgNum(const vector&lt;unsigned int&gt;&amp; vec_uint) {
	unsigned int item = 0;   // 缺少的整数
	vector&lt;unsigned int&gt; a  = vec_uint;
	int n = a.size();
	sort(a.begin(), a.end());
	vector&lt;unsigned int&gt; diffs(n &#43; 10);
	for (int i = 1; i &lt; n; i&#43;&#43;) diffs[i - 1] = a[i] - a[i - 1];
	int pos = -1;
	int d;// 公差
	int dd;// 差分数组中的缺失值
	for (int i = 1; i &lt; n - 1; i&#43;&#43;) {
		if (diffs[i] == diffs[i - 1] &#43; diffs[i &#43; 1]) {// 差分数组缺失值在中间的情况
			if (i - 2 &gt;= 0) d = diffs[i - 1] - diffs[i - 2];
			else if (i &#43; 2 &lt;= n - 2) d = diffs[i &#43; 2] - diffs[i &#43; 1];
			dd = diffs[i - 1] &#43; d;
			item = a[i] &#43; dd;
		}
	}
	if ((diffs[1] - diffs[0] != diffs[2] - diffs[1]) &amp;&amp; (diffs[3] - diffs[2] == diffs[2] - diffs[1])) {// 差分数组缺失值在左侧
		d = diffs[2] - diffs[1];
		dd = diffs[1] - d;
		item = a[1] - dd;
	} else if ((diffs[n - 2] - diffs[n - 3] != diffs[n - 3] - diffs[n - 4]) &amp;&amp; (diffs[n - 3] - diffs[n - 4] == diffs[n - 4] - diffs[n - 5])) {
		// 差分数组缺失值在右侧
		d = diffs[n - 3] - diffs[n - 4];;
		dd = diffs[n - 3] &#43; d;
		item = a[n - 2] &#43; dd;
	}
	cout &lt;&lt; item &lt;&lt; &#39;\n&#39;;
	return item;
}

int main() {
	getTrgNum({1, 3, 6, 15, 21});
	getTrgNum({1, 4, 7, 11, 16});
	getTrgNum({1, 2, 4, 7, 11, 22});
	return 0;
}
```

#### 编程题3

![](imgs/image-20240901134820628.png)

解法一
```c&#43;&#43;
float getMostWeight(const string&amp; wordStr) {
	float value = 0;
	float maxx = 0;
	string tmp;
	istringstream iss(wordStr);
	while (getline(iss, tmp, &#39; &#39;)) {
		value = 0;
		for (int i = 0; i &lt; tmp.size(); i&#43;&#43;) {
			value &#43;= tmp[i];
		}
		value /= tmp.size();
		if (value &gt; maxx) maxx = value;
	}
	value = maxx;
	return value;
}
```

解法二
```c&#43;&#43;
float getMostWeight(const string&amp; wordStr) {
	float value = 0;
	int len = wordStr.size();
	for (int i = 0; i &lt; len; i&#43;&#43;) {
		int cnt = 0;
		float sum = 0;
		while (i &lt; len &amp;&amp; isalpha(wordStr[i])) {
			cnt&#43;&#43;;
			sum &#43;= wordStr[i];
			i&#43;&#43;;
		}
		if (sum != 0) {
			sum /= cnt;
			if (sum &gt; value) value = sum;
		}
	}
	cout &lt;&lt; value &lt;&lt; &#39;\n&#39;;
	return value;
}
```

#### 编程题4

![](imgs/image-20240901153536533.png)

```c&#43;&#43;
bool isSameCage(unsigned int heads, unsigned int feet) {
	bool flag = true;
	if (feet &amp; 1) return false;
	int y = feet / 2 - heads;
	int x = 2 * heads - feet / 2;
	if (x &lt; 0 || y &lt; 0) return false;
	else return true;
	return  flag;
}
```
#### 编程题5(TODO)

![](imgs/image-20240901154649873.png)

#### 编程题6

![](imgs/image-20240901164150764.png)

```c&#43;&#43;
struct BinaryNode {
	char data;
	BinaryNode* left, *right;
	BinaryNode(char entry) {
		data = entry;
		left = NULL;
		right = NULL;
	}
};

class BinaryTree {
	private:
		BinaryNode* root;
	public:
		BinaryTree() {  // 构造函数
			root = NULL;
		}
		~BinaryTree() {  // 析构函数
			release(root);
		}
		void release(BinaryNode*&amp; bt) {// 是否二叉树的递归成员函数
			if (bt) {
				release(bt-&gt;left);
				release(bt-&gt;right);
				delete bt;
				bt = NULL;
			}
		}
		BinaryNode* recursive_create(string&amp; preorder) { // 根据先序字符串创建二叉树的递归成员函数
			if (preorder.empty())
				return NULL;
			char data = preorder[0];
			preorder.erase(0, 1);
			if (data == &#39;#&#39;)
				return NULL;
			else {
				BinaryNode* new_root = new BinaryNode(data);
				new_root-&gt;left = recursive_create(preorder);
				new_root-&gt;right = recursive_create(preorder);
				return new_root;
			}
		}
		void create(string preorder) {  // 创建二叉树的成员函数
			root = recursive_create(preorder);
		}
		map&lt;char, BinaryNode*&gt; mcb; // 通过字符快速找到节点
		map&lt;BinaryNode*, int&gt; mbi; // 通过节点快速获取到最近子节点的距离
		int dfs(BinaryNode* root) {
			if (root == NULL) return 0;
			mcb[root-&gt;data] = root;
			int l = dfs(root-&gt;left);
			int r = dfs(root-&gt;right);
			mbi[root] = min(l, r);
			return mbi[root] &#43; 1;
		}
		int closestleaf(char x) {
			mcb.clear(), mbi.clear();
			dfs(root);
			return mbi[mcb[x]];
		}
};

int main() {
	string preorder = &#34;AaB##EF###bG##h##&#34;;
	BinaryTree bt;
	bt.create(preorder);
	cout &lt;&lt; bt.closestleaf(&#39;a&#39;) &lt;&lt; &#39;\n&#39;;
	cout &lt;&lt; bt.closestleaf(&#39;A&#39;) &lt;&lt; &#39;\n&#39;;
	return 0;
}
```

#### 编程题7(TODO)

![](imgs/image-20240901193331209.png)

```

```
#### 编程题8

![](imgs/image-20240901200538725.png)
DP做法(TODO)
```c&#43;&#43;
unsigned long getNumOfBallCombinations(unsigned int scores) {
	int N = 50;
	long long f[N][N] = {0};// 表示只允许使用前j种球，且第j种球至少出现一次的方案
	f[0][1] = 1;
	f[1][1] = 1;
	f[2][1] = 1;
	f[2][2] = 1;
	for (int i = 3; i &lt;= scores; i&#43;&#43;) {
		f[i][1] = 1;
		f[i][2] = f[i - 2][1] &#43; f[i - 2][2];
		f[i][3] = f[i - 3][1] &#43; f[i - 3][2] &#43; f[i - 3][3];
		f[i][4] = f[i][1] &#43; f[i][2] &#43; f[i][3];
	}
	return f[scores][4];
}
```
暴力枚举法
```c&#43;&#43;
unsigned long getNumOfBallCombinations(unsigned int scores) {
	int i = 0;
	if (scores == 0) return 0;
	long long count = 0;
	while (i * 3 &lt;= scores) {
// 遍历三分球的情况, 二分球有0~ (scores - 3 * i) / 2这几种取值
		count &#43;= (scores - 3 * i) / 2 &#43; 1;
		i&#43;&#43;;
	}
	return count;
}
```

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/552060f/  

