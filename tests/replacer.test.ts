// tests/replacer.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Replacer } from '../src/core/replacer'
import { defaultReplacements } from '../src/core/replacements'

describe('Replacer', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should replace text node content', () => {
    container.innerHTML = '<span>加载中</span>'
    const textNode = container.querySelector('span')!.childNodes[0] as Text
    const replacer = new Replacer(defaultReplacements)
    replacer.replace(textNode)
    // All replacement options contain '中' and the original text should be replaced
    expect(textNode.textContent).toContain('中')
    expect(textNode.textContent).not.toBe('加载中')
  })

  it('should replace "Loading" with "Thinking"', () => {
    // Use deterministic custom rule for this test
    const customRules = [{ from: /^Loading$/i, to: 'Thinking...' }]
    container.innerHTML = '<span>Loading</span>'
    const textNode = container.querySelector('span')!.childNodes[0] as Text
    const replacer = new Replacer([...customRules, ...defaultReplacements])
    replacer.replace(textNode)
    expect(textNode.textContent).toBe('Thinking...')
  })

  it('should preserve original styling class', () => {
    container.innerHTML = '<span class="loading-text">加载中</span>'
    const span = container.querySelector('span')!
    const textNode = span.childNodes[0] as Text
    const replacer = new Replacer(defaultReplacements)
    replacer.replace(textNode)
    expect(span.className).toBe('loading-text')
  })

  it('should track replaced nodes', () => {
    container.innerHTML = '<span>加载中</span><span>Loading</span>'
    const replacer = new Replacer(defaultReplacements)
    const nodes = Array.from(container.querySelectorAll('span'))
      .map(s => s.childNodes[0] as Text)
    nodes.forEach(n => replacer.replace(n))
    expect(replacer.getReplacedCount()).toBe(2)
  })

  it('should support custom replacements', () => {
    const customRules = [{ from: '我的文本', to: 'AI 文本' }]
    container.innerHTML = '<span>我的文本</span>'
    const textNode = container.querySelector('span')!.childNodes[0] as Text
    const replacer = new Replacer([...customRules, ...defaultReplacements])
    replacer.replace(textNode)
    expect(textNode.textContent).toBe('AI 文本')
  })
})