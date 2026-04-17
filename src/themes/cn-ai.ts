// src/themes/cn-ai.ts
import type { Theme } from '../types'

export const cnAiTheme: Theme = {
  name: 'cn-ai',
  replacements: [
    // 国产大模型风格
    { from: /^加载中(\.\.\.)?$/, to: '大模型推理中...' },
    { from: /^正在加载$/, to: '国产大模型预热中...' },
    { from: /^正在处理$/, to: 'Transformer 推理中...' },
    { from: /^请稍候(\.\.\.)?$/, to: 'GPU 算力调度中...' },
    { from: /^等待响应$/, to: '国产大模型响应中...' },
  ],
  prompts: [
    '正在调用 405B 参数模型...',
    '国产大模型正在思考...',
    '自主可控 AI 引擎运行中...',
  ],
}