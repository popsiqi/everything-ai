// src/themes/enterprise.ts
import type { Theme } from '../types'

export const enterpriseTheme: Theme = {
  name: 'enterprise',
  replacements: [
    // 企业转型风格
    { from: /^加载中(\.\.\.)?$/, to: '智能分析中...' },
    { from: /^正在加载$/, to: '数字化引擎预热中...' },
    { from: /^正在处理$/, to: '智能化处理中...' },
    { from: /^请稍候(\.\.\.)?$/, to: 'AI 能力调度中...' },
    { from: /^等待响应$/, to: '智能引擎响应中...' },
  ],
  prompts: [
    '数字化转型引擎运行中...',
    '智能化分析引擎工作...',
    'AI 能力中心调度...',
  ],
}