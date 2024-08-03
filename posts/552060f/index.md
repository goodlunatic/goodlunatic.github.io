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
#include &lt;bits/stdc&#43;&#43;.h&gt;
using namespace std;
typedef long long ll;

int main() {
	freopen(&#34;input.txt&#34;, &#34;r&#34;, stdin);
	int n;scanf(&#34;%d&#34;, &amp;n);
	int res = 1;
	for (int i = 0; i &lt; n; i&#43;&#43;) res = (res * 2) % 1007;
	printf(&#34;%d&#34;, res);
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

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/552060f/  

