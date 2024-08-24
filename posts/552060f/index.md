# Preparation For Programming Proficiency Exam

时间过得真快呀，回想上次做算法题应该是大一的时候了

没想到现在回过头来，依旧需要重新拾起自己的算法功底
&lt;!--more--&gt;

## 输入与输出

| 函数            | 用法                                                                                   |
| ------------- | ------------------------------------------------------------------------------------ |
| scanf()       | 默认是以空白字符（空格、制表符、换行符）为分隔，当有多组样例的时候，可以使用`while(scanf(&#34;%d&#34;,&amp;a)!=EOF)`来进行多组样例的输入         |
| getchar()     | 从标准输入流中读取一个字符，常用来处理上一行末尾留下的换行符                                                       |
| fgets()       | `fgets(a,MAX_LEN,stdin);`读取一整行的文本，末尾会多一个换行符；可使用`str[strcspn(str, &#34;\n&#34;)] = &#39;\0&#39;;`进行处理 |
| cin.getline() | `cin.getline(str, MAXN);` 其中 str 是 `char[]`，读取一整行的文本，末尾没有换行符                         |
| getline()     | `getline(cin,str)`其中 str 是 `string str`，读取一整行的文本，末尾没有换行符                             |
| sprintf()     | `sprintf(s, &#34;Integer: %d, Float: %.2f&#34;, num, fnum);`用于将格式化的数据写入到一个字符串中               |

## 一些函数

### 字符串相关的一些函数

| 函数                      | 用法                                                                          |
| ----------------------- | --------------------------------------------------------------------------- |
| `substr(pos,len)`       | `s.substr(pos,len)`返回从字符串的 `pos` 位置开始，长度为 `len` 的子字符串                       |
| `sprintf(字符数组,格式串,变量)`  | 将变量按格式字符串的格式写入到字符数组                                                         |
| `sscanf(字符数组,格式串,&amp;变量)`  | 从字符数组中按格式串提取变量，返回成功提取的变量数量                                                  |
| `strcspn(str,&#34;\\n&#34;)`    | 返回字符串 str 中第一个出现的字符 \\n 的位置                                                 |
| `strcmp(s1,s2)`         | 比较两个字符串的字典序大小                                                               |
| `strcat(s1,s2)`         | 将字符串`s2`拼接到`s1`后面                                                           |
| `strcpy(s1,s2)`         | 将字符串s2复制到字符串s1中                                                             |
| `string.erase(pos,len)` | `.erase()` 是 `string` 类型的成员函数,用于删除从 `pos` 开始长度为 `len` 的字符串                  |
| `stoi(str)`             | 将 `string` 类型的字符串转换为 `int` 类型，并且`stoi` 会隐式地将 `char` 数组转换为 `string`，然后再转换为整数 |
|                         |                                                                             |
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

#### map 关联容器
&gt; `map`会自动按照键值排序

| 成员函数      | 用法                                   |
| --------- | ------------------------------------ |
| `size()`  | 返回容器当前包含元素的数量                        |
| `empty()` | 检查当前的数组是否为空, 是则返回`true`, 否则返回`false` |
| `begin()` | 返回数组第一个元素的迭代器                        |
| `end()`   | 返回数组最后一个元素后一个位置的迭代器                  |

#### pair 模板类
```c&#43;&#43;
using namespace std;
typedef pair&lt;int, int&gt; PII;
vector&lt;PII&gt; v;

cout &lt;&lt; v[i].first &lt;&lt; &#34; &#34; &lt;&lt; v[i].second &lt;&lt; &#39;\n&#39;;
```

#### queue 队列
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

| 成员函数       | 用法                                                           |
| ---------- | ------------------------------------------------------------ |
| `insert()` | 将元素插入到集合中                                                    |
| `erase()`  | 删除指定元素, 比如                                                   |
| `find()`   | 查找指定元素, 并返回指向该元素的迭代器, 如果找不到则返回 `set.end()`, 可以通过 `*it` 来访问元素 |
| `size()`   | 返回集合中的元素数量                                                   |
| `count()`  | 判断某个元素是否存在, 返回0或1                                            |

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


### 并查集

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
const int MAXN = 100005;  
vector&lt;int&gt;v(MAXN &#43; 1), num(MAXN &#43; 1);  
  
void initt(int n) {  
    for (int i = 1; i &lt;= n; &#43;&#43;i) {  
        v[i] = i;  
        num[i] = 1;  
    }  
}  
  
int findd(int x) {  
    if (v[x] != x) v[x] = findd(v[x]);  
    return v[x];  
}  
  
void unionn(int x, int y) {  
    int a = findd(x);  
    int b = findd(y);  
    if (a != b) {  
        v[b] = a;  
        num[a] &#43;= num[b];  
    }  
}  
  
int main() {  
    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n, m, a, b, c;  
    scanf(&#34;%d%d&#34;, &amp;n, &amp;m);  
    getchar();  
    initt(n);  
    char opcode;  
    while (m--) {  
        scanf(&#34;%c&#34;, &amp;opcode);  
        if (opcode == &#39;M&#39;) {  
            scanf(&#34;%d%d&#34;, &amp;a, &amp;b);  
            getchar();  
            unionn(a, b);  
        } else if (opcode == &#39;Q&#39;) {  
            scanf(&#34;%d&#34;, &amp;c);  
            getchar();  
            printf(&#34;%d\n&#34;, num[findd(c)]);  
        }  
    }  
    return 0;  
}
```

例题1-ZJNUOJ-亲戚——高级

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

### 搜索
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
 
### 树

#### 二叉查找树（BST）

```

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


### PAT(Basic Level) Practice（中文）

#### 1001 害死人不偿命的(3n&#43;1)猜想
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;

int main() {
	int n;cin &gt;&gt; n;
	int cnt = 0;
	while (n &gt; 1) {
		if (n % 2 == 1)n = (3 * n &#43; 1) / 2;
		else n /= 2;
		cnt&#43;&#43;;
	}
	cout&lt;&lt;cnt&lt;&lt;endl;
	return 0;
}
```

#### 1002 写出这个数
```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
string table[10] = {&#34;ling&#34;, &#34;yi&#34;, &#34;er&#34;, &#34;san&#34;, &#34;si&#34;, &#34;wu&#34;, &#34;liu&#34;, &#34;qi&#34;, &#34;ba&#34;, &#34;jiu&#34;};  
vector&lt;int&gt;v;  
int main() {  
//    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    long long sum = 0;  
    string s;  
    cin &gt;&gt; s;  
    long long len = s.length();  
    for (int i = 0; i &lt; len; i&#43;&#43;) {  
        sum &#43;= int(s[i]) - int(&#39;0&#39;) ;  
    }  
    while (sum) {  
        int tmp = sum % 10;  
        v.push_back(tmp);  
        sum /= 10;  
    }  
    for (int i = v.size() - 1; i &gt; 0; i--) {  
        cout &lt;&lt; table[v[i]] &lt;&lt; &#39; &#39;;  
    }  
    cout &lt;&lt; table[v[0]];  
    return 0;  
}
```


#### 1003 我要通过！

```c&#43;&#43;
#include &lt;bits/stdc&#43;&#43;.h&gt;  
using namespace std;  
  
int main() {  
//    freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);  
    int n;  
    cin &gt;&gt; n;  
    string s;  
    while (n--) {  
        cin &gt;&gt; s;  
        map&lt;char, int&gt; m;  
        int l=0, r=0;  
        int len = s.length();  
        for (int i = 0; i &lt; len; i&#43;&#43;) {  
            m[s[i]]&#43;&#43;;  
            if (s[i] == &#39;P&#39;) l = i;  
            if (s[i] == &#39;T&#39;) r = i;  
        }  
        if (m[&#39;P&#39;] == 1 &amp;&amp; m[&#39;A&#39;] != 0 &amp;&amp; m[&#39;T&#39;] == 1 &amp;&amp; m.size() == 3 &amp;&amp; (r - l) != 1 &amp;&amp; l * (r - l - 1) == (len - r - 1)) {  
            cout &lt;&lt; &#34;YES&#34; &lt;&lt; endl;  
        } else cout &lt;&lt; &#34;NO&#34; &lt;&lt; endl;  
    }  
    return 0;  
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

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/552060f/  

