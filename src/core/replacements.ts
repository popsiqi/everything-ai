// src/core/replacements.ts
import type { ReplacementRule } from '../types'

export const defaultReplacements: ReplacementRule[] = [
  // 英文
  { from: /^Loading(\.\.\.)?$/i, to: ['Thinking...', 'AI Thinking...', 'Analyzing...', 'Generating tokens...'] },
  { from: /^Processing(\.\.\.)?$/i, to: ['Computing...', 'AI Processing...', '推理中...'] },
  { from: /^Please wait$/i, to: ['AI warming up...', 'GPU scheduling...'] },
  { from: /^Waiting for response$/i, to: ['等待 AI 响应', 'Token 生成中...'] },

  // 中文
  { from: /^加载中(\.\.\.)?$/, to: ['思考中...', 'AI 分析中...', '大模型推理中...', '神经网络计算中...'] },
  { from: /^正在加载$/, to: ['AI 正在加载', '模型预热中...'] },
  { from: /^正在处理$/, to: ['AI 正在推理', '模型计算中...', 'Transformer 注意力机制计算中...'] },
  { from: /^请稍候(\.\.\.)?$/, to: ['模型预热中...', 'GPU 算力调度中...', '请稍候，AI 正在工作...'] },
  { from: /^等待响应$/, to: ['等待 AI 响应', 'Token 生成中...'] },
]

export function getReplacement(text: string, rules: ReplacementRule[]): string | undefined {
  const trimmedText = text.trim()

  for (const rule of rules) {
    if (typeof rule.from === 'string') {
      if (trimmedText === rule.from) {
        return pickRandom(rule.to)
      }
    } else {
      if (rule.from.test(trimmedText)) {
        return pickRandom(rule.to)
      }
    }
  }

  return undefined
}

function pickRandom(options: string | string[]): string {
  if (typeof options === 'string') return options
  return options[Math.floor(Math.random() * options.length)]
}

export function addCustomRules(
  custom: Record<string, string>,
  existing: ReplacementRule[]
): ReplacementRule[] {
  const newRules: ReplacementRule[] = Object.entries(custom).map(([from, to]) => ({
    from,
    to
  }))
  return [...newRules, ...existing]
}