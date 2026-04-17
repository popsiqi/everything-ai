// tests/scanner.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Scanner } from '../src/core/scanner'
import { defaultReplacements } from '../src/core/replacements'

describe('Scanner', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should find text nodes with loading text', () => {
    container.innerHTML = '<span>加载中...</span>'
    const scanner = new Scanner(defaultReplacements)
    const nodes = scanner.scan(container)
    expect(nodes.length).toBe(1)
    expect(nodes[0].textContent).toBe('加载中...')
  })

  it('should find multiple matching nodes', () => {
    container.innerHTML = '<span>加载中</span><div>Loading...</div>'
    const scanner = new Scanner(defaultReplacements)
    const nodes = scanner.scan(container)
    expect(nodes.length).toBe(2)
  })

  it('should ignore non-matching text', () => {
    container.innerHTML = '<span>已完成</span>'
    const scanner = new Scanner(defaultReplacements)
    const nodes = scanner.scan(container)
    expect(nodes.length).toBe(0)
  })

  it('should scan entire document body', () => {
    const testElement = document.createElement('span')
    testElement.textContent = '加载中'
    document.body.appendChild(testElement)
    const scanner = new Scanner(defaultReplacements)
    const nodes = scanner.scan()
    expect(nodes.length).toBeGreaterThan(0)
    document.body.removeChild(testElement)
  })

  it('should find text in nested elements', () => {
    container.innerHTML = '<div><p><span>正在处理</span></p></div>'
    const scanner = new Scanner(defaultReplacements)
    const nodes = scanner.scan(container)
    expect(nodes.length).toBe(1)
  })
})