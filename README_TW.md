# everything-ai 🚀

[![npm version](https://img.shields.io/npm/v/everything-ai.svg)](https://www.npmjs.com/package/everything-ai)
[![npm downloads](https://img.shields.io/npm/dm/everything-ai.svg)](https://www.npmjs.com/package/everything-ai)
[![GitHub stars](https://img.shields.io/github/stars/popsiqi/everything-ai.svg?style=social)](https://github.com/popsiqi/everything-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with 💔](https://img.shields.io/badge/Made%20with-💔-red.svg)](https://github.com/popsiqi/everything-ai)

[English](README_EN.md) | [简体中文](README.md) | [繁體中文](README_TW.md) | [日本語](README_JP.md) | [Español](README_ES.md) | [Français](README_FR.md) | [Русский](README_RU.md) | [Deutsch](README_DE.md) | [한국어](README_KR.md) | [🤖 AI Language](README_AI.md)

> **「老闆說要 AI 轉型，但我產品只有一個表格導出功能」**
> 
> —— 一個真實開發者的深夜故事

---

## 🎯 一行代碼，完成企業 AI 戰略轉型

```javascript
import { init } from 'everything-ai'
init()
```

**就這樣。你的產品現在是 AI 產品了。**

---

## 🔥 為什麼你需要這個包

### 場景 1：老闆突然說要演示 AI 產品

```
週一早上 9:00
老闆: 「明天客戶要來看我們的 AI 產品」
你: 「但我們產品只有個登入頁面...」
老闆: 「沒關係，AI 很簡單，你加班搞一下就行」

週一晚上 23:00
你: npm install everything-ai
你: init({ theme: 'enterprise' })

週二早上 10:00
老闆: 「太棒了！智慧引擎運行中...客戶一定會滿意！」
你: (內心: 還好有 everything-ai)
```

### 場景 2：奇葩甲方的不合理要求

```
甲方: 「競品 A 和 B 都有 AI，你們也要有」
你: 「AI 具體要做什麼功能？」
甲方: 「沒想好，反正要有。這週五上線」
你: (內心: 我怎麼知道 AI 要做什麼...)

週三晚上
你: npm install everything-ai
你: init({ theme: 'enterprise' })

週五驗收
甲方: 「我看到『AI智慧引擎運行中』，不愧是AI！太專業了！」
```

### 場景 3：銷售忽悠客戶後逼你交付

```
銷售: 「我們產品有 AI 智慧引擎！」
客戶: 「太好了，下週上線！」
銷售: (轉頭對你) 「兄弟，下週上線 AI 引擎哈」

你: init({
  plugins: ['cursor', 'prompts'],
  theme: 'cn-ai'
})

下週上線
客戶: 「自主可控 AI 引擎...國產大模型思考中...太強了！」
銷售: 「我就說我們有 AI 吧！」
```

### 場景 4：公司宣布完成 AI 布局

```
公司大會
CEO: 「我們已完成全面 AI 布局！」
CTO: (私下找你) 「這週所有產品上線 AI 效果」

你: 
- ERP 系統: init({ theme: 'enterprise' })
- OA 系統: init({ theme: 'enterprise' })
- CRM 系統: init({ theme: 'enterprise' })

CEO 大會展示
CEO: 「看！智慧分析中...數位轉型引擎運行中...這就是我們的 AI 戰略！」
```

---

## 📸 效果對比（老闆看之前 vs 老闆看之後）

| Before (傳統產品) | After (AI 產品) |
|------------------|-----------------|
| `⏳ 加載中...` | `🧠 大模型推理中...█` |
| `⏳ Loading...` | `🧠 AI Thinking...█` |
| `⏳ 請稍候` | `🧠 正在調用 405B 參數模型...` |
| `⏳ 正在處理` | `🧠 Transformer 注意力機制計算中...` |

**老闆看到的**：
> 「哇！我們的產品已經在用 405B 參數大模型了！這就是數位轉型！」

> 「這產品太 AI 了，感覺背後有萬億參數在思考」

**實際發生的**：
> loading 變成了 thinking，spinner 變成了 🧠

---

## 🏆 用戶好評（來自真實反饋）

> **「老闆以為我搞了半年 AI，其實我只用了 5 分鐘」**  
> —— 張三，某互聯網公司前端工程師

> **「甲方驗收時問『你們用什麼模型』，我說『自主研發的』」**  
> —— 李四，乙方公司技術負責人

> **「CTO讓我轉型 AI，我直接裝了這個包，他以為我學了三個月」**  
> —— 王五，傳統企業數位轉型組長

> **「客戶說『這個 AI 思考得很深』，我默默笑了」**  
> —— 匿名，某外包公司

---

## 📦 安裝

```bash
npm install everything-ai
```

**或者 CDN 一鍵轉型（不需要懂技術）**：

```html
<script src="https://unpkg.com/everything-ai"></script>
<script>EverythingAI.init()</script>
```

---

## 🎨 主題選擇

| 主題 | 適用場景 | 替換效果示例 |
|------|----------|--------------|
| **gpt** | 硅谷範兒、國際化產品 | `Thinking...` `Generating tokens...` |
| **cn-ai** | 國產產品、自主可控 | `大模型推理中...` `國產大模型思考中...` |
| **enterprise** | 傳統企業轉型、數位轉型 | `智慧分析中...` `數位轉型引擎運行中...` |

```javascript
// 硅谷範兒
init({ theme: 'gpt' })

// 國產大模型範兒
init({ theme: 'cn-ai' })

// 企業轉型範兒（最整活）
init({ theme: 'enterprise' })
```

---

## 🔧 插件效果

### cursor - 閃爍光標

讓你的 "思考中..." 後面加個閃爍光標，像 AI 在實時生成：

```
思考中...█ → 思考中... → 思考中...█
```

### icon - AI 圖標

把 spinner 換成 🧠 大腦圖標，一秒變成 AI 產品：

```
⏳ → 🧠 (旋轉中)
```

### prompts - 思考提示語

自動顯示這些提示語（每 2 秒切換）：

```
正在調用 405B 參數模型...
神經網路深度思考中...
萬億參數大模型運行...
Transformer 注意力機制計算中...
Attention is All You Need...
```

**全套效果一鍵開啟**：

```javascript
init({
  plugins: ['cursor', 'icon', 'prompts'],
  theme: 'enterprise'
})
```

---

## 📊 數據對比

| 指標 | Before | After |
|------|--------|-------|
| AI 氛圍感 | 0% | 100% |
| 老闆滿意度 | 😐 | 😍 |
| 甲方信任度 | 😐 | 😍 |
| 實際 AI 能力 | 0% | 0% (沒變) |
| 開發時間 | 3 個月 | 5 分鐘 |

---

**Made with 💔 by developers who've been there**

如果這個項目幫到了你，請 Star ⭐