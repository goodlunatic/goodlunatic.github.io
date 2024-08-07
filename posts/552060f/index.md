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
| cin.getline() | `cin.getline(str, MAXN);`读取一整行的文本，末尾没有换行符                                            |
| getline()     | `getline(cin,str)`其中str是`string str`                                                 |
| sprintf()     | `sprintf(s, &#34;Integer: %d, Float: %.2f&#34;, num, fnum);`用于将格式化的数据写入到一个字符串中               |

## 一些函数

| 函数                     | 用法                          |
| ---------------------- | --------------------------- |
| `sprintf(字符数组,格式串,变量)` | 将变量按格式字符串的格式写入到字符数组         |
| `sscanf(字符数组,格式串,&amp;变量)` | 从字符数组中按格式串提取变量，返回成功提取的变量数量  |
| `strcspn(str,&#34;\\n&#34;)`   | 返回字符串 str 中第一个出现的字符 \\n 的位置 |
| `strcmp(s1,s2)`        | 比较两个字符串的字典序大小               |
| `strcat(s1,s2)`        | 将字符串`s2`拼接到`s1`后面           |
| `strcpy(s1,s2)`        | 将字符串s2复制到字符串s1中             |
|                        |                             |
## 常用算法
### 快速幂

```c&#43;&#43;
ll binPow(ll base, ll exp) {
	ll res = 1;
	while (exp) {
		if (exp &amp; 1) res *= base;
		base *= base;
		exp &gt;&gt;= 1;
	}
	return res;
}
```

### 筛法

#### 素数筛

&gt; 暴力枚举法，时间复杂度为O(n\*sqrt(n))

```c&#43;&#43;
vector&lt;int&gt;prime;
void findPrime(int start, int end) {
	for (int i = start; i &lt;= end; i&#43;&#43;) {
		bool flag = false;
		for (int j = 2; j &lt;= sqrt(i); j&#43;&#43;) {
			if (i % j == 0) {
				flag = true;
				break;
			}
		}
		if (!flag) prime.push_back(i);
	}
}
```

&gt; 埃氏筛，时间复杂度为O(n log n)

```c&#43;&#43;
bool isPrime[MAXN];
vector&lt;int&gt;prime;

void findPrime(int n) {
	memset(isPrime, true, sizeof(isPrime));
	isPrime[0] = isPrime[1] = false;
	for (int i = 2; i &lt;= n; i&#43;&#43;) {
		if (isPrime[i]) {
			prime.push_back(i);
//			因素只要筛到sqrt(n)即可，这里要用longlong来避免溢出
			if ((ll) i * i &gt; n) continue;
//			因为较小的倍数 i * 2, ..., i * (i-1) 在处理比 i 小的素数时就被筛除了
			for (int j = i * i; j &lt;= n; j &#43;= i) {
				isPrime[j] = false;
			}
		}
	}
}
```

&gt; 线性筛（欧拉筛），时间复杂度为O(n)，但是对空间的占用要求比较高

```c&#43;&#43;
vector&lt;ll&gt;prime;
// 在堆上使用动态内存分配，防止栈溢出
bool* isPrime = new bool[MAXN];
void findPrime(ll n) {
	memset(isPrime, true, sizeof(bool)*n);
	for (ll i = 2; i &lt;= n; &#43;&#43;i) {
		if (isPrime[i]) prime.push_back(i);
		for (int prime_j : prime) {
			if (i * prime_j &gt; n) break;
			isPrime[i * prime_j] = false;
//			关键步骤-防止一个合数被多次标记
//			prime_j是i的最小因子，直接退出这次循环
			if (i % prime_j == 0) break;
		}
	}
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

## 数据结构

### 树

#### 二叉查找树（BST）

```

```

## 遇到的一些问题

### 获取C&#43;&#43;中动态数组的长度

&gt; 可以使用 `.size()` 这个成员函数来获取 `vector` 或者 `map` 等的长度

### 获取C&#43;&#43;中 `string` 类型的长度

&gt; 可以使用 `.length()` 这个成员函数来获取 `string` 的长度

### 字符串输入问题

&gt; C&#43;&#43;中可能无法使用C语言的字符数组，如 `char str[1005]` 这种
&gt; 因此我们可以使用读取 `string str` 来替代，需要使用 `getline(cin,str)` 或者 `cin &gt;&gt; str` 来读取输入

## PAT(Basic Level) Practice（中文）

### 1001 害死人不偿命的(3n&#43;1)猜想
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

### 1002 写出这个数
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


### 1003 我要通过！

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

## 晴问-2022浙大考研机试模拟（1）

### 库洛值

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

### 平衡素数
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

### 进击的二叉查找树

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

## 牛客-浙大考研复试上机题

### 火星A&#43;B

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

### 统计同成绩学生人数

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

### xxx定律
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

### A&#43;B for Matrices

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

### ZOJ

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

### 开门人和关门人

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



### 最小长方形

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

### 畅通工程

```c&#43;&#43;
#include &amp;lt;bits/stdc&#43;&#43;.h&amp;gt;
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

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/552060f/  

