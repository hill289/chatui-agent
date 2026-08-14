# 🤖 chatui agent

> A cloud-native AI chatbot interface running entirely in your browser, featuring a built‑in Pyodide Python runtime and an MCP toolchain. It enables you to accomplish AI conversations, code execution, and file processing in a single place. This project showcases what’s possible in the WebAssembly era: capabilities that traditionally required servers (Python runtime, file system) now run locally in your browser. The MCP protocol standardises AI tool invocation, the Subagent architecture offers an elegant way to decompose complex tasks, and most importantly – it demonstrates the viability of *decentralised AI applications*. Your data never leaves your device, yet you enjoy the full power of AI.

---

## 📖 Introduction

**chatui agent** is an open‑source chatbot frontend by hill289. Built with Vue 3 + Vuetify, it is delivered as a pure static HTML page that runs without any Node.js build step.

This is a full‑fledged AI assistant system that runs entirely in the browser – but it’s much more than just a chat interface.

Imagine:

✅ Running real Python code directly in your browser (yes, actual Python!)

✅ AI reading, writing, searching, and editing files

✅ Processing Word, Excel, PowerPoint, and PDF documents

✅ Full file system operations, with ZIP import/export

✅ Subagent mechanism for decomposing complex tasks

✅ Everything runs locally – no backend server required

---

## ✨ Features

🔒 **Privacy‑first**
- All processing happens locally in your browser
- No data is uploaded except for AI API calls
- You have complete control over your files and code

🐍 **Real Python runtime**
- Powered by Pyodide (Python 3.11 via WebAssembly)
- Supports NumPy, Pandas, Matplotlib, and many more
- Python code executes inside the browser sandbox

📁 **Virtual file system**
- Full POSIX file operations (read, write, search, edit)
- Process Word (.docx), Excel (.xlsx), PowerPoint (.pptx), and PDF documents
- Export/import your workspace as a ZIP archive

🛠️ **MCP tool system**
- `read_file` – smart document parsing (text, images, Office files, PDF)
- `write_file` – create and modify files
- `search_content` – regex‑based content search
- `replace_content` / `add_content` / `delete_content` – precise editing
- `run_python` – execute Python code (full standard library support)
- `run_subagent` – delegate complex tasks to focused sub‑agents

🤖 **Subagent architecture**
- Break down complex tasks into manageable sub‑tasks
- Dedicated conversation windows for focused processing
- Automatic task queue management to prevent conflicts

🎯 **Use cases**

| Scenario | Description |
|----------|-------------|
| Data analysis | Analyse CSV/Excel files, generate visualisations – no server needed |
| Document processing | Batch convert, merge, or extract content from Office documents |
| Code prototyping | Test Python snippets with AI assistance in an isolated environment |
| Privacy‑sensitive work | Process confidential files without uploading to the cloud |
| Education | Teach Python + AI concepts without any installation |

---

## 🧰 Technology Stack

| Category | Technologies |
|----------|--------------|
| Framework | Vue 3 (CDN), Vuetify 3, Pinia (with persistence), Vue I18n |
| Editors | CodeMirror 5, md‑editor‑v3 (Markdown preview) |
| Python runtime | Pyodide (WebAssembly) |
| Animations | Lottie (lottie‑web) |
| Drag & drop | vuedraggable (SortableJS) |
| Document parsing | mammoth.js, @iyulab/anydoc (WASM) |
| Spreadsheet export | SheetJS (xlsx) |
| Archiving | JSZip |

---

## 🚀 Quick Start

The project is **pure static HTML** – no build tools required. Place `index.html` together with the static assets in the same directory (see the list below) and serve it with any static web server:

```bash
# Option 1: directly open
unzip dist2.zip
# double‑click index.html
```

> **Note:** `index.html` references local JS/CSS files via relative paths. Ensure all files are present in the same directory.

---

## ⚙️ Configuration

Click the **gear icon** to the left of the input box to open the **Interface Configuration** dialog.

### Basic Settings
| Setting | Description | Default Example |
|---------|-------------|-----------------|
| API Key | Your model API key | empty |
| URL | API service endpoint | `https://api.deepseek.com` |
| Path | API path | `/chat/completions` |
| Model | Model name | `deepseek-v4-flash` |

### Advanced Settings
| Setting | Description |
|---------|-------------|
| HTTP Method | Request method (default POST) |
| Stream | Enable streaming output |
| MCP | Enable MCP tool calls |
| Max Tokens Prefix | `max_tokens` / `max_completion_tokens` / `max_new_tokens` |
| Max Token Value | Maximum generated tokens |
| Temperature | Randomness (0–2) |
| Top P | Nucleus sampling (0–1) |
| Content Type | Media type (default `application/json`) |
| Auth Prefix | Authentication prefix (Bearer / Base / Token) |
| Config File | Import JSON configuration file |

Configuration is automatically persisted in the browser’s **localStorage**.

---

## 🤝 MCP Prompt Templates

Click the **person icon** next to the chat input to open the list of MCP‑provided prompt templates (Prompts). Select one, fill in the parameters, and quickly generate conversation content.

---

## 📁 Project Structure (Reference)

```bash
.
├── index.html                     # Single‑page application entry (all code)
├── dist2/                         # Pyodide runtime directory
│   └── bundle.js                  # Pyodide core bundle
├── vue.global.prod.min.js         # Vue 3 runtime
├── vuetify.min.js                 # Vuetify components
├── vuetify.min.css                # Vuetify styles
├── pinia.iife.prod.js             # Pinia state management
├── md-editor-index.js             # Markdown editor
├── lottie.min.js                  # Lottie animation library
├── mammoth.browser.min.js         # Word document parser
├── anydoc_wasm_b64.js             # Office/PDF → Markdown (WASM)
├── codemirror.min.js              # CodeMirror 5 editor
├── xlsx.full.min.js               # Excel export
└── jszip.min.js                   # ZIP compression/decompression
```

---

## 🔒 Privacy Statement

- All configuration and history are stored **locally** (localStorage / sessionStorage)
- Python code executes inside the local Pyodide sandbox and is **never uploaded** to any server
- Conversation requests are sent directly from your browser to the API endpoint you configure

---

## 📄 License

Copyright hill289

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

This project uses the following open‑source tools, each under its respective license. For details, please refer to their official repositories:

- [Vue 3](https://github.com/vuejs)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Pinia](https://github.com/vuejs/pinia)
- [md-editor-v3](https://github.com/imzbf/md-editor-v3)
- [lottie-web](https://github.com/airbnb/lottie-web)
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- [mammoth](https://github.com/mwilliamson/mammoth.js)
- [anydoc](https://github.com/firecrawl/anydoc)

---

## 🙏 Acknowledgements

- [AIQL GitHub](https://github.com/AI-QL) – project author
- Pyodide community – providing the in‑browser Python runtime
- All authors and maintainers of the open‑source dependencies

中文简介：
# 🤖 chatui agent

> 一款运行在浏览器中的云原生 AI 聊天机器人界面，内置 Pyodide Python 运行时与 MCP 工具链，帮助你在浏览器中一站式完成 AI 对话、代码执行与文件处理。这个项目展示了 WebAssembly 时代的可能性：传统上需要服务器的功能（Python 运行时、文件系统），现在都能在浏览器实现。MCP 协议让 AI 工具调用标准化，Subagent 架构为复杂任务分解提供了优雅方案，最重要的是：它证明了”去中心化 AI 应用”的可行性。用户数据不必离开本地设备，同时享受完整的 AI 能力。

---

## 📖 项目简介

**chatui agent** 是 hill289 开源的一套聊天机器人前端界面。它采用 Vue 3 + Vuetify 构建，以纯静态 HTML 形式呈现，无需 Node.js 构建即可直接运行。

这是一个完全在浏览器中运行的 AI 智能助手系统，但它远不止是个聊天界面那么简单。

想象一下：

✅ 在浏览器里直接运行 Python 代码（是的，真实的 Python！）

✅ AI 能读写文件、搜索内容、执行代码

✅ 支持处理 Word、Excel、PowerPoint、PDF 文档

✅ 完整的文件系统操作，还能导出/导入 ZIP

✅ 子任务代理（Subagent）机制，让 AI 分解复杂任务

✅ 所有这些都在本地浏览器完成，无需后端服务器

---

## ✨ 功能特性

🔒 隐私优先

所有处理在浏览器本地完成

除AI API调用外，无数据上传

完全掌控你的文件和代码

🐍 真实Python运行时

基于Pyodide (Python 3.11 + WebAssembly)

支持NumPy、Pandas、Matplotlib等库

浏览器沙箱中直接执行Python代码

📁 虚拟文件系统

完整的POSIX文件操作（读、写、搜索、编辑）

处理Word (.docx)、Excel (.xlsx)、PowerPoint (.pptx)、PDF文档

导出/导入工作区为ZIP

🛠️ MCP工具系统

read_file - 智能文档解析（文本、图片、Office文件、PDF）

write_file - 创建和修改文件

search_content - 基于正则的内容搜索

replace_content / add_content / delete_content - 精确编辑

run_python - 执行Python代码（完整标准库支持）

run_subagent - 将复杂任务委托给专注的子代理

🤖 子代理架构

将复杂任务分解为可管理的子任务

独立对话窗口进行专注处理

自动任务队列管理防止冲突

🎯 使用场景
场景	说明
数据分析	分析CSV/Excel文件，生成可视化，无需后端
文档处理	批量转换、合并或提取Office文档内容
代码原型	在隔离环境中用AI辅助测试Python片段
隐私敏感工作	处理机密文件而不上传云端
教育	无需安装即可教授Python + AI概念
---

## 🧰 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Vue 3（CDN 引入）、Vuetify 3、Pinia（含持久化）、Vue I18n |
| 编辑器 | CodeMirror 5、md-editor-v3（Markdown 预览） |
| Python 运行时 | Pyodide（WebAssembly） |
| 动画 | Lottie（lottie-web） |
| 拖拽 | vuedraggable（SortableJS） |
| 文档解析 | mammoth.js、@iyulab/anydoc（WASM） |
| 表格导出 | SheetJS（xlsx） |
| 压缩包 | JSZip |

---

## 🚀 快速开始

项目为**纯静态页面**，无需构建工具。将 `index.html` 与其同目录下的静态资源（`vue.global.prod.min.js`、`vuetify.min.js`、`dist2/` 等）放在同一目录，用任意静态服务器访问即可：

```bash
# 方式一：直接打开
unzip dist2.zip
# 双击 index.html
'''


> 注意：`index.html` 依赖同目录下的本地 JS/CSS 文件（通过相对路径引用），请确保文件完整。

---

## ⚙️ 配置说明

点击输入框左侧的 **齿轮图标** 打开「接口配置」对话框。

### 基础配置
| 配置项 | 说明 | 默认值示例 |
| --- | --- | --- |
| API Key | 调用模型的密钥 | 空 |
| URL | API 服务地址 | `https://api.deepseek.com` |
| Path | 接口路径 | `/chat/completions` |
| Model | 模型名称 | `deepseek-v4-flash` |

### 高级配置
| 配置项 | 说明 |
| --- | --- |
| HTTP Method | 请求方法（默认 POST） |
| Stream | 是否流式输出 |
| MCP | 是否启用 MCP 工具调用 |
| Max Tokens Prefix | `max_tokens` / `max_completion_tokens` / `max_new_tokens` |
| Max Token Value | 最大生成令牌数 |
| Temperature | 温度（随机性），范围 0~2 |
| Top P | 核采样，范围 0~1 |
| Content Type | 媒体类型（默认 `application/json`） |
| Auth Prefix | 鉴权前缀（Bearer / Base / Token） |
| Config File | 导入 JSON 配置文件 |

配置会自动持久化到浏览器 **localStorage**。

---

## 🤝 MCP 提示词模板

在聊天输入框旁点击 **人物编辑图标**，可打开 MCP 提供的提示词模板列表（Prompts），选择后填写参数即可快速生成会话内容。

---

## 🗂️ 目录结构（参考）

```bash
.
├── index.html                     # 单页应用入口（全部代码）
├── dist2/                         # Pyodide 运行时目录
│   └── bundle.js                  # Pyodide 核心包
├── vue.global.prod.min.js         # Vue 3 运行时
├── vuetify.min.js                 # Vuetify 组件库
├── vuetify.min.css                # Vuetify 样式
├── pinia.iife.prod.js             # Pinia 状态管理
├── md-editor-index.js             # Markdown 编辑器
├── lottie.min.js                  # Lottie 动画库
├── mammoth.browser.min.js         # Word 文档解析
├── anydoc_wasm_b64.js             # Office/PDF → Markdown（WASM）
├── codemirror.min.js              # CodeMirror 5 代码编辑器
├── xlsx.full.min.js               # Excel 导出
└── jszip.min.js                   # ZIP 压缩/解压
```

---

## 🔒 隐私说明

- 所有配置、历史记录均保存在**本地浏览器**（localStorage / sessionStorage）
- Python 代码在浏览器本地 Pyodide 沙箱中执行，**不上传服务器**
- 对话请求直接由浏览器发送至你配置的 API 地址

---

## 📄 许可证

Copyright hill289

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

本项目使用了以下开源工具，各自遵循其相应许可证，详细内容请参阅各工具官方仓库：

- [Vue 3](https://github.com/vuejs)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Pinia](https://github.com/vuejs/pinia)
- [md-editor-v3](https://github.com/imzbf/md-editor-v3)
- [lottie-web](https://github.com/airbnb/lottie-web)
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- [mammoth](https://github.com/mwilliamson/mammoth.js)
- [anydoc](https://github.com/firecrawl/anydoc)
---

## 🙏 致谢

- [AIQL GitHub](https://github.com/AI-QL) — 项目作者
- Pyodide 社区 — 提供浏览器内 Python 运行时
- 所有开源依赖的作者与维护者

---
