# Preparation For Programming Proficiency Exam

PTA Practice Record
&lt;!--more--&gt;

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

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/552060f/  

