// tests/themes.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { themeManager, gptTheme, cnAiTheme, enterpriseTheme } from '../src/themes'
import type { Theme } from '../src/types'

describe('themes', () => {
  describe('built-in themes', () => {
    it('should have gpt theme', () => {
      const theme = themeManager.get('gpt')
      expect(theme).toBeDefined()
      expect(theme?.name).toBe('gpt')
      expect(theme?.replacements).toBeDefined()
      expect(theme?.replacements.length).toBeGreaterThan(0)
      expect(theme?.prompts).toBeDefined()
      expect(theme?.prompts).toContain('Generating tokens...')
      expect(theme?.prompts).toContain('Running inference...')
      expect(theme?.prompts).toContain('Next token prediction...')
    })

    it('should have cn-ai theme', () => {
      const theme = themeManager.get('cn-ai')
      expect(theme).toBeDefined()
      expect(theme?.name).toBe('cn-ai')
      expect(theme?.replacements).toBeDefined()
      expect(theme?.replacements.length).toBeGreaterThan(0)
      expect(theme?.prompts).toBeDefined()
      expect(theme?.prompts).toContain('正在调用 405B 参数模型...')
      expect(theme?.prompts).toContain('国产大模型正在思考...')
      expect(theme?.prompts).toContain('自主可控 AI 引擎运行中...')
    })

    it('should have enterprise theme', () => {
      const theme = themeManager.get('enterprise')
      expect(theme).toBeDefined()
      expect(theme?.name).toBe('enterprise')
      expect(theme?.replacements).toBeDefined()
      expect(theme?.replacements.length).toBeGreaterThan(0)
      expect(theme?.prompts).toBeDefined()
      expect(theme?.prompts).toContain('数字化转型引擎运行中...')
      expect(theme?.prompts).toContain('智能化分析引擎工作...')
      expect(theme?.prompts).toContain('AI 能力中心调度...')
    })

    it('should return undefined for unknown theme', () => {
      const theme = themeManager.get('unknown-theme')
      expect(theme).toBeUndefined()
    })

    it('should get all themes', () => {
      const allThemes = themeManager.getAll()
      expect(allThemes.length).toBe(3)
      const names = allThemes.map(t => t.name)
      expect(names).toContain('gpt')
      expect(names).toContain('cn-ai')
      expect(names).toContain('enterprise')
    })
  })

  describe('ThemeManager', () => {
    it('should register themes', () => {
      const customTheme: Theme = {
        name: 'custom-test',
        replacements: [
          { from: 'Loading', to: 'Custom Loading...' }
        ],
        prompts: ['Custom prompt...']
      }
      themeManager.register(customTheme)
      const retrieved = themeManager.get('custom-test')
      expect(retrieved).toBeDefined()
      expect(retrieved?.name).toBe('custom-test')
      expect(retrieved?.prompts).toContain('Custom prompt...')
    })

    it('should get theme by name', () => {
      const theme = themeManager.get('gpt')
      expect(theme).toBeDefined()
      expect(theme?.name).toBe('gpt')
    })
  })

  describe('gpt theme replacements', () => {
    it('should replace Loading with Thinking...', () => {
      const theme = gptTheme
      const loadingRule = theme.replacements.find(r => {
        if (typeof r.from === 'string') return r.from === 'Loading'
        return r.from.test('Loading')
      })
      expect(loadingRule).toBeDefined()
      expect(loadingRule?.to).toBe('Thinking...')
    })
  })

  describe('cn-ai theme replacements', () => {
    it('should replace 加载中 with 大模型推理中...', () => {
      const theme = cnAiTheme
      const rule = theme.replacements.find(r => {
        if (typeof r.from === 'string') return r.from === '加载中'
        return r.from.test('加载中')
      })
      expect(rule).toBeDefined()
      expect(rule?.to).toBe('大模型推理中...')
    })
  })

  describe('enterprise theme replacements', () => {
    it('should replace 加载中 with 智能分析中...', () => {
      const theme = enterpriseTheme
      const rule = theme.replacements.find(r => {
        if (typeof r.from === 'string') return r.from === '加载中'
        return r.from.test('加载中')
      })
      expect(rule).toBeDefined()
      expect(rule?.to).toBe('智能分析中...')
    })
  })
})