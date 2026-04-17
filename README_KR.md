# everything-ai 🚀

[![npm version](https://img.shields.io/npm/v/everything-ai.svg)](https://www.npmjs.com/package/everything-ai)
[![npm downloads](https://img.shields.io/npm/dm/everything-ai.svg)](https://www.npmjs.com/package/everything-ai)
[![GitHub stars](https://img.shields.io/github/stars/popsiqi/everything-ai.svg?style=social)](https://github.com/popsiqi/everything-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with 💔](https://img.shields.io/badge/Made%20with-💔-red.svg)](https://github.com/popsiqi/everything-ai)

[English](README_EN.md) | [简体中文](README.md) | [繁體中文](README_TW.md) | [日本語](README_JP.md) | [Español](README_ES.md) | [Français](README_FR.md) | [Русский](README_RU.md) | [Deutsch](README_DE.md) | [한국어](README_KR.md) | [🤖 AI Language](README_AI.md)

> **"상사가 AI 전환을 요구했는데, 내 제품은 테이블 내보내기 기능만 있다"**
> 
> —— 한 실제 개발자의 밤새 이야기

---

## 🎯 한 줄 코드로, 기업 AI 전략 전환 완료

```javascript
import { init } from 'everything-ai'
init()
```

**이게 끝. 당신의 제품은 이제 AI 제품입니다.**

---

## 🔥 이 패키지가 필요한 이유

### 시나리오 1: 상사가 갑자기 AI 제품 데모를 요구

```
월요일 오전 9:00
상사: "내일 클라이언트가 우리 AI 제품을 보고 싶어"
나: "하지만 우리 제품은 로그인 페이지만..."
상사: "문제 없어, AI는 간단해, 야근해서 해"

월요일 밤 23:00
나: npm install everything-ai
나: init({ theme: 'enterprise' })

화요일 오전 10:00
상사: "완벽해! 지능형 엔진 실행 중... 클라이언트가 만족할 거야!"
나: (내심: everything-ai 다행히 있어서)
```

### 시나리오 2: 클라이언트의 무리한 AI 요구

```
클라이언트: "경쟁사 A와 B 모두 AI 있어, 당신도 있어야"
나: "AI로 어떤 기능이 필요?"
클라이언트: "아직 생각 안 했지만, 있어야 해. 이번 주 금요일 출시"
나: (내심: AI가 무슨 기능 하는지 내가 어떻게 알아...)

수요일 밤
나: npm install everything-ai
나: init({ theme: 'enterprise' })

금요일 검증
클라이언트: "'AI 지능형 엔진 실행 중' 보여, 진짜 AI다! 매우 전문적!"
```

### 시나리오 3: 영업이 클라이언트에 AI 약속, 당신이 납품해야

```
영업: "우리 제품에 AI 지능형 엔진 있어!"
클라이언트: "좋아요, 다음 주 출시!"
영업: (당신에게) "형, 다음 주 AI 엔진 출시해"

나: init({
  plugins: ['cursor', 'prompts'],
  theme: 'cn-ai'
})

다음 주 출시
클라이언트: "자체 개발 AI 엔진... 국산 대형 모델 생각 중... 대박!"
영업: "내가 AI 있다고 했잖아!"
```

### 시나리오 4: CEO가 AI 전략 완료 발표

```
사내 회의
CEO: "우리는 완전한 AI 전략을 완료했다!"
CTO: (개인적으로 당신에게) "이번 주 모든 제품 AI 효과 추가"

나:
- ERP 시스템: init({ theme: 'enterprise' })
- OA 시스템: init({ theme: 'enterprise' })
- CRM 시스템: init({ theme: 'enterprise' })

CEO 프레젠테이션
CEO: "보라! 지능형 분석 중... 디지털 전환 엔진 실행 중... 이게 우리 AI 전략!"
```

---

## 📸 전후 비교 (상사가 보는 것)

| Before (传统产品) | After (AI 产品) |
|------------------|-----------------|
| `⏳ 로딩 중...` | `🧠 AI 생각 중...█` |
| `⏳ Loading...` | `🧠 AI Thinking...█` |
| `⏳ 잠시만 기다려주세요` | `🧠 405B 파라미터 모델 호출 중...` |
| `⏳ 처리 중` | `🧠 Transformer 어텐션 메커니즘 계산 중...` |

**상사가 보는 것**:
> "와! 우리 제품이 405B 파라미터 대형 모델을 사용하고 있다! 이게 디지털 전환!"

> "이 제품 너무 AI다, 뒤에 조 파라미터가 생각하는 느낌"

**실제로 일어난 것**:
> loading이 thinking으로, spinner가 🧠으로

---

## 🏆 사용자 평 (실제 피드백 스타일)

> **"상사가 내가 6달 AI 했다고 생각, 실제는 5분만 사용"**  
> —— 김철수, 모 IT 회사 프론트엔드 엔지니어

> **"클라이언트가 '어떤 모델 쓰냐' 물어, '자체 개발' 답변"**  
> —— 박민수,乙方 회사 기술 책임자

> **"CTO가 AI 전환 하라고, 이 패키지 설치, 3달 공부했다고 생각"**  
> —— 이영호,传统 기업 디지털 전환组长

> **"클라이언트가 '이 AI 깊게 생각한다' 말하, 내심 웃음"**  
> ——匿名,모外包 회사

---

## 📦 설치

```bash
npm install everything-ai
```

**또는 CDN 일키 전환 (기술 지식 필요 없음):**

```html
<script src="https://unpkg.com/everything-ai"></script>
<script>EverythingAI.init()</script>
```

---

## 🎨 테마 선택

| 테마 | 사용 케이스 | 교체 예시 |
|------|------------|----------|
| **gpt** | 실리콘밸리 스타일, 국제 제품 | `Thinking...` `Generating tokens...` |
| **cn-ai** | 국산 제품, 자체 제어 | `大模型推理中...` `国产大模型思考中...` |
| **enterprise** | 传统 기업 전환, 디지털 전환 | `智能分析中...` `数字化转型引擎运行中...` |

```javascript
// 실리콘밸리 스타일
init({ theme: 'gpt' })

// 국산 대형 모델 스타일
init({ theme: 'cn-ai' })

// 기업 전환 스타일 (最大整活)
init({ theme: 'enterprise' })
```

---

## 🔧 플러그인 효과

### cursor - 깜빡이는 커서

"생각 중..." 뒤에 깜빡이는 커서 추가, AI가 실시간 생성하는 것 같이:

```
생각 중...█ → 생각 중... → 생각 중...█
```

### icon - AI 아이콘

spinner를 🧠 뇌 아이콘으로 교체, 일초에 AI 제품:

```
⏳ → 🧠 (회전 중)
```

### prompts - 생각 프롬프트

자동으로 이 프롬프트 표시 (2초마다 변경):

```
405B 파라미터 모델 호출 중...
신경망 깊은 생각 중...
조 파라미터 대형 모델 실행 중...
Transformer 어텐션 메커니즘 계산 중...
Attention is All You Need...
```

**모든 효과 일키 활성화:**

```javascript
init({
  plugins: ['cursor', 'icon', 'prompts'],
  theme: 'enterprise'
})
```

---

## 📊 데이터 비교

| 지표 | Before | After |
|------|--------|-------|
| AI 분위기 | 0% | 100% |
| 상사 만족도 | 😐 | 😍 |
| 클라이언트 신뢰 | 😐 | 😍 |
| 실제 AI 능력 | 0% | 0% (변화 없음) |
| 개발 시간 | 3달 | 5분 |

---

**Made with 💔 by developers who've been there**

이 프로젝트가 도움이 되면, Star ⭐