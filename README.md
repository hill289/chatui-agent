# 🤖 ChatUI agent

> 一款运行在浏览器中的云原生 AI 聊天机器人界面，内置 Pyodide Python 运行时与 MCP 工具链，帮助你在浏览器中一站式完成 AI 对话、代码执行与文件处理。

---

## 📖 项目简介

**ChatUI agent** 是 hill289 开源的一套聊天机器人前端界面。它采用 Vue 3 + Vuetify 构建，以纯静态 HTML 形式呈现，无需 Node.js 构建即可直接运行。

该界面不仅是一个普通的 AI 聊天框，还内置了：

- **PGPy 编辑器**：基于 Pyodide（WebAssembly）的浏览器内 Python 运行环境，可执行 Python 代码、操作虚拟文件系统；
- **MCP 工具服务**：内置 `filesystem-service`，提供文件读写、搜索、编辑等 8 个工具，供大模型（LLM）调用；
- **智能体看板**：拖拽式卡片管理，可将任务描述注入为系统提示词；
- **多语言支持**：英文、意大利语、日语、瑞典语、简体中文。

---

## ✨ 功能特性

### 💬 聊天功能
- 兼容 **OpenAI Chat Completions** 协议（支持自定义 URL / 路径 / 模型）
- 支持 **流式输出（Stream）** 与普通输出
- 支持上传**图片**并以 `image_url` 形式发送（多模态）
- 支持消息**复制、编辑、删除、重新生成、发起新对话**
- 支持 **Reasoning Content（思维链）** 展示与折叠
- Markdown 渲染、代码折叠
- 消息自动滚动到底部

### 🐍 PGPy Python 编辑器
- 基于 **Pyodide**（Python 在浏览器中通过 WebAssembly 运行）
- CodeMirror 5 编辑器：行号、括号匹配、自动补全、撤销/重做
- 快捷键：`Ctrl + Enter` 运行
- 内置示例：Hello World / Fibonacci / 列表推导 / Micropip
- 执行结果支持：
  - 文本输出（stdout / stderr）
  - **表格渲染**（可点击列头排序）
  - **导出 Excel**（.xlsx，基于 SheetJS）
- Python 脚本历史记录（localStorage 保存，最多 50 条）
- **AI 模式**：将编辑器中的代码发送给聊天模型，由 AI 分析/运行

### 📁 文件系统（Pyodide FS）
- 导入文件或 ZIP 压缩包到浏览器虚拟文件系统
- 导出整个工作区为 ZIP 下载
- 文件列表浏览：支持文本预览、Office 文档解析预览
- **Office 文档解析**（基于 @iyulab/anydoc / mammoth）：
  - `.docx / .xlsx / .pptx / .xls / .pdf` 自动转为 Markdown/文本预览

### 🛠️ MCP 工具（filesystem-service）
内置 8 个工具，供 LLM 在对话中自动调用：

| 工具名 | 说明 |
| --- | --- |
| `read_file` | 读取文件内容（支持文本、图片、PDF、Jupyter Notebook） |
| `write_file` | 写入文件（自动创建父目录） |
| `delete_file` | 删除文件或目录 |
| `add_content` | 按行号在指定行前插入内容 |
| `delete_content` | 按行号范围删除内容 |
| `replace_content` | 按行号范围替换内容 |
| `search_content` | 使用正则表达式搜索文件内容 |
| `run_python` | 在本地 Pyodide 沙箱中运行 Python 代码 |

### 🧠 智能体看板（Agent）
- 看板式任务管理（PROMPT / BACKUP 两列），卡片支持**拖拽排序**
- 卡片可填写任务描述与**参考文件**（.docx / .md / .txt）
- 启用后，卡片内容会作为 **System Prompt** 注入对话，辅助 AI 完成任务

### 📜 历史记录
- 会话自动保存在浏览器 **localStorage** 中
- 支持查看、选择、删除、下载单条/全部历史（JSON）

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

```
.
├── index.html                     # 单页应用入口（全部代码）
├── dist2/                         # Pyodide 运行时
│   └── bundle.js
├── vue.global.prod.min.js         # Vue 3
├── vuetify.min.js / .css          # Vuetify
├── pinia.iife.prod.js             # Pinia
├── md-editor-index.js             # Markdown 编辑器
├── lottie.min.js                  # Lottie 动画
├── mammoth.browser.min.js         # Word 文档解析
├── anydoc_wasm_b64.js             # Office/PDF → Markdown（WASM）
├── codemirror.min.js              # CodeMirror 5
├── xlsx.full.min.js               # Excel 导出
├── jszip.min.js                   # ZIP 导入/导出
└── ...                            # 其他静态资源
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
