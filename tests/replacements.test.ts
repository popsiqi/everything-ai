// tests/replacements.test.ts
import { describe, it, expect } from 'vitest'
import { defaultReplacements, getReplacement } from '../src/core/replacements'

describe('replacements', () => {
  it('should have default replacements', () => {
    expect(defaultReplacements.length).toBeGreaterThan(0)
  })

  it('should match "加载中"', () => {
    const result = getReplacement('加载中', defaultReplacements)
    expect(result).toBeDefined()
    expect(['思考中...', 'AI 分析中...', '大模型推理中...', '神经网络计算中...']).toContain(result)
  })

  it('should match "Loading"', () => {
    const result = getReplacement('Loading', defaultReplacements)
    expect(result).toBeDefined()
    expect(['Thinking...', 'AI Thinking...', 'Analyzing...', 'Generating tokens...']).toContain(result)
  })

  it('should match "正在处理"', () => {
    const result = getReplacement('正在处理', defaultReplacements)
    expect(result).toBeDefined()
  })

  it('should return undefined for non-matching text', () => {
    const result = getReplacement('已完成', defaultReplacements)
    expect(result).toBeUndefined()
  })

  it('should return random replacement when multiple options exist', () => {
    const results = new Set()
    for (let i = 0; i < 100; i++) {
      results.add(getReplacement('加载中', defaultReplacements))
    }
    expect(results.size).toBeGreaterThan(1) // 有多个替换选项
  })
})