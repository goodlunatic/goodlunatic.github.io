# AI相关内容的学习

**与时俱进，还得是学习一下AI相关内容的学习**
<!--more-->

参考链接：https://www.huasheng.ai/orange-books/

## CLI工具

> 如果要导出codex和claude的历史对话，可以使用waylog：
> 
> https://github.com/shayne-snap/WayLog
> 
> https://github.com/shayne-snap/waylog-cli
> 
> 安装好后直接 `waylog run codex` 或者 `waylog run claude` 即可
> 
> 如果是用的IDE插件的话，直接启用即可


### Codex

https://github.com/openai/codex

> /help 可以查看帮助菜单
> 
> /model 可以切换模型和推理强度
> 
> /permission 可以调整codex的权限





### Claude-Code

https://github.com/anthropics/claude-code

> 可以使用 `claude --dangerously-skip-permissions` 给 claude 更高的权限
> 
> 如果是在root权限下，上面这个命令会用不了，可以在前面加上 `IS_SANDBOX=1`:
> 
> `IS_SANDBOX=1 claude --dangerously-skip-permissions`


## MCP

> MCP: Model Context Protocol，模型上下文协议
> 
> MCP 是 Anthropic 提出的一个开放协议，用来让 AI 应用更标准地连接外部工具、数据源和系统



### ida-pro-mcp

https://github.com/mrexodia/ida-pro-mcp


### jadx-ai-mcp

https://github.com/zinja-coder/jadx-ai-mcp





## RAG

> RAG: Retrieval-Augmented Generation，检索增强生成

通俗讲，它是让大模型在回答前先去“查资料”，再基于查到的资料生成答案。

普通大模型回答问题时主要靠训练时学到的知识；

RAG 会额外接一个知识库，比如公司文档、PDF、网页、数据库、Notion、代码仓库等。流程通常是：

1. 用户提问

2. 系统把问题拿去知识库里检索相关内容

3. 把检索到的片段塞进大模型上下文

4. 大模型基于这些资料回答，并且最好附引用来源


## SKILLS

> skills是一组可复用的说明、模板、脚本或参考文件，用来教AI怎么稳定地完成某类特定任务。

SKILLS开源仓库：https://skills.sh

Agent Skills: https://agentskills.io/home

> Agent Skills are a simple, open format for giving agents new capabilities and expertise.


## 提示词

> 提示词如果有能力的话还是尽量用英文，毕竟英文比中文省token

#### CTF相关

CTF-web题

```java
public static boolean isIllegalCmdParams(String str) {
    return str == null || str.contains("|") || str.contains("&") || str.contains(";") || str.contains("") || str.contains("$(");
}
```

> 我现在想要出一道CTF题来考察这个漏洞，请你帮我写一份本地可运行的带有这个漏洞的靶场源码，并写一份官方解题报告

CTF-通用

> 现在有一道CTF题目，我已把本题的所有附件都放到此目录下，请你分析并解决这个问题
> 
> 题目名称：
> 
> 题目描述：
> 
> 题目环境：
> 
> 提示1：

#### 写脚本

> 要求脚本尽可能的简单易懂，允许你安装并使用第三方库，但是不要外部传参




### 生图提示词

> 这里可以发AI一张参考图，然后让它去逆向生图的提示词
> 
> 示例：请你帮我逆向一下生成这张图片的提示词，越详细越好


## Agent智能体相关

### 开源开发框架
#### langchain

https://github.com/langchain-ai/langchain

> LangChain 是一个用来开发 LLM 应用和 AI Agent 的开源框架

### 开源智能体系统
#### openclaw

https://github.com/openclaw/openclaw

> Your own personal AI assistant. Any OS. Any Platform. The lobster way.


#### Hermes Agent

https://github.com/nousresearch/hermes-agent

> The agent that grows with you

个人认为Hermes和openclaw最大的区别就是：Hermes会自己改进学习后保存为skills

Hermes中文社区：https://hermesagent.org.cn/docs/

Hermes官方文档：https://hermes-agent.nousresearch.com/docs






---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/50888d4/  

