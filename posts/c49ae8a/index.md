# CTF-数据安全

最近的CTF比赛中经常出现数据安全的板块，个人感觉这种东西是可以靠平常积累来提升解题速度的

因此准备写这样一篇博客来总结一下常见的考点
&lt;!--more--&gt;

## 个人信息数据规范

例如下面这张图片中`数据脱敏`的例子

![](imgs/image-20241125150247864.png)

### 身份证

### 手机号

### 中文字符

### IP地址


## 比赛中用到的一些脚本

```python
import csv
import hashlib
import base64

data_list = []
res_list = []

with open(&#34;data.csv&#34;, &#34;r&#34;, encoding=&#39;utf-8&#39;) as f:
    reader = csv.reader(f)
    for row in reader:
        data_list.append(row)

def basedecode(line):
    try:
        if line[-1] == &#34;Base32&#34;:
            for i in range(1,6):
                line[i] = base64.b32decode(line[i]).decode()
        elif line[-1] == &#34;Base64&#34;:
            for i in range(1,6):
                line[i] = base64.b64decode(line[i]).decode()
        elif line[-1] == &#34;Base85&#34;:
            for i in range(1,6):
                line[i] = base64.b85decode(line[i]).decode()
    except:
        pass


def username_solve(username):
    res = &#39;&#39;
    if len(username) == 2:
        res = username[0] &#43; &#39;*&#39;
    else:
        res = username[0] &#43; &#34;*&#34;*(len(username)-2)&#43;username[-1]
    return res


def password_solve(pwd):
    md5_hash = hashlib.md5()
    md5_hash.update(pwd.encode(&#39;utf-8&#39;))
    res = md5_hash.hexdigest()
    return res


def name_solve(name):
    sha1_hash = hashlib.sha1()
    sha1_hash.update(name.encode(&#39;utf-8&#39;))
    res = sha1_hash.hexdigest()
    return res


def id_solve(id):
    res = &#34;*&#34;*6 &#43; id[6:10] &#43; &#34;*&#34;*8
    return res


def phone_solve(phone):
    res = phone[:3] &#43; &#34;*&#34;*4 &#43; phone[7:]
    return res


if __name__ == &#34;__main__&#34;:
    data_list[0].remove(data_list[0][6])
    res_list.append(data_list[0])

    for line in data_list[1:]:
        basedecode(line)
        line[1] = username_solve(line[1])
        line[2] = password_solve(line[2])
        line[3] = name_solve(line[3])
        line[4] = id_solve(line[4])
        line[5] = phone_solve(line[5])
        line.remove(line[6])
        res_list.append(line)
        
    with open(&#39;data1.csv&#39;,&#34;w&#34;,newline=&#39;&#39;,encoding=&#39;utf-8&#39;) as f:
        writer = csv.writer(f)
        writer.writerows(res_list)
```



```python
import csv
import re
import string

data_list = []
res_list = []
phone_lst = [734, 735, 736, 737, 738, 739, 747, 748, 750, 751, 752, 757, 758, 759, 772,
778, 782, 783, 784, 787, 788, 795, 798, 730, 731, 732, 740, 745, 746, 755,
756, 766, 767, 771, 775, 776, 785, 786, 796, 733, 749, 753, 773, 774, 777,
780, 781, 789, 790, 791, 793, 799]
num_lst = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
check = [&#39;1&#39;,&#39;0&#39;,&#39;X&#39;,&#39;9&#39;,&#39;8&#39;,&#39;7&#39;,&#39;6&#39;,&#39;5&#39;,&#39;4&#39;,&#39;3&#39;,&#39;2&#39;]

def is_chinese(char):
    try:
        chinese = re.findall(r&#39;[\u4e00-\u9fff]&#39;, char)
        name = &#34;&#34;.join(chinese)
        if name == char:
            return True
        else:
            return False
    except:
        return False

def is_valid_id_number(id_number):
    tmp = 0
    if len(id_number) == 18:
        if(re.match(r&#39;\d{17}&#39;,id_number)):
            for i in range(17):
                tmp &#43;= int(id_number[i]) * num_lst[i]
            tmp = tmp % 11
            if id_number[17] == str(check[tmp]):
                return True
        else:
            return False
    else:
        return False

def is_valid_phone_number(phone_number):
    if len(phone_number)==11:
        if int(phone_number[:3]) in phone_lst:
            return True
        else:
            return False
    else:
        return False

if __name__ == &#34;__main__&#34;:
    # 读取csv文件
    with open(&#34;data.csv&#34;, &#34;r&#34;, encoding=&#39;utf-8&#39;) as f:
        reader = csv.reader(f) # 创建 CSV 读取器
        for row in reader:
            data_list.append(row)
    res_list.append([&#34;类型,数据值&#34;])
    for row in data_list[1:]:
        if is_chinese(row[0]):
            res_list.append([&#34;姓名,&#34;&#43;row[0]])
        if is_valid_phone_number(row[0]):
            res_list.append([&#34;手机号,&#34;&#43;row[0]])
        if is_valid_id_number(row[0]):
            res_list.append([&#34;身份证号,&#34;&#43;row[0]])

    print(res_list[:20])
    # 保存列表到csv文件
    with open(&#39;res.csv&#39;,&#34;w&#34;,newline=&#39;&#39;,encoding=&#39;utf-8&#39;) as f:
        writer = csv.writer(f)
        writer.writerows(res_list)
```

```python
import csv
import re

f = open(&#34;C:/Users/67300/Downloads/person_data.csv&#34;, &#34;r&#34;, encoding=&#34;utf-8&#34;)
c = list(csv.reader(f))[1:]

def is_chinese(char):
    if re.match(r&#39;[\u4e00-\u9fff]&#39;, char):
        return True
    else:
        return False

def is_md5(char):
    if re.match(r&#39;[a-f0-9]{32}&#39;, char):
        return True
    else:
        return False

def is_valid_id_number(id_number):
    pattern = r&#39;^[0-9]\d{5}(18|19|20|21|22)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$&#39;
    return bool(re.match(pattern, id_number))

def is_valid_phone_number(phone_number):
    pattern = re.compile(r&#39;^\d{7,15}$&#39;)
    if pattern.match(phone_number):
        return True
    else:
        return False

dt = []

for line in c:
    mp = {}
    for ele in line:
        if is_chinese(ele):
            if ele in [&#34;男&#34;, &#34;女&#34;]:
                mp[&#34;性别&#34;] = ele
            else:
                mp[&#34;姓名&#34;] = ele
            continue
        if ele.isdigit() and len(ele) == 8:
            mp[&#34;出生日期&#34;] = ele
            continue
        if is_md5(ele):
            mp[&#34;密码&#34;] = ele
            continue
        if is_valid_id_number(ele):
            mp[&#34;身份证号&#34;] = ele
            continue
        if is_valid_phone_number(ele):
            mp[&#34;手机号码&#34;] = ele
            continue
        if ele.isdigit() and 0 &lt;= int(ele) &lt;= 11000:
            mp[&#34;编号&#34;] = ele
            continue
        mp[&#34;用户名&#34;] = ele
    if len(mp.items()) != 8:
        print(line)
        exit()
    dt.append(mp)

# 将数据保存到CSV文件
with open(&#39;output.csv&#39;, &#39;w&#39;, newline=&#39;&#39;, encoding=&#34;utf-8&#34;) as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=[&#34;编号&#34;,&#34;用户名&#34;,&#34;密码&#34;,&#34;姓名&#34;,&#34;性别&#34;,&#34;出生日期&#34;,&#34;身份证号&#34;,&#34;手机号码&#34;])
    writer.writeheader()
    for row in dt:
        writer.writerow(row)
```

---

> Author: [Lunatic](https://goodlunatic.github.io)  
> URL: http://localhost:1313/posts/c49ae8a/  

