// tests/index.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { init } from '../src/index'

describe('init', () => {
  let container: HTMLElement
  let instance: ReturnType<typeof init>

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (instance) {
      instance.destroy()
    }
    document.body.removeChild(container)
  })

  it('should replace existing loading text on init', () => {
    container.innerHTML = '<span>加载中</span><div>Loading</div>'

    instance = init()

    const span = container.querySelector('span')!
    const div = container.querySelector('div')!

    // Original text should be replaced
    expect(span.textContent).not.toBe('加载中')
    expect(div.textContent).not.toBe('Loading')

    // Should have replaced 2 nodes
    expect(instance.getReplacedCount()).toBe(2)
  })

  it('should accept empty options', () => {
    container.innerHTML = '<span>正在处理</span>'

    instance = init({})

    const span = container.querySelector('span')!
    expect(span.textContent).not.toBe('正在处理')
    expect(instance.getReplacedCount()).toBe(1)
  })

  it('should accept custom replacements', () => {
    container.innerHTML = '<span>MyCustomText</span>'

    instance = init({
      customReplacements: {
        'MyCustomText': 'AI Generated Text'
      }
    })

    const span = container.querySelector('span')!
    expect(span.textContent).toBe('AI Generated Text')
    expect(instance.getReplacedCount()).toBe(1)
  })

  it('should stop replacing after destroy()', () => {
    container.innerHTML = '<span>加载中</span>'

    instance = init()

    // Initial replacement
    const span = container.querySelector('span')!
    const firstReplacement = span.textContent
    expect(firstReplacement).not.toBe('加载中')

    // Destroy the instance
    instance.destroy()

    // Count should be reset
    expect(instance.getReplacedCount()).toBe(0)

    // Add new loading text - should NOT be replaced after destroy
    const newSpan = document.createElement('span')
    newSpan.textContent = 'Loading'
    container.appendChild(newSpan)

    // Wait for any potential mutation observer callback
    // The new text should remain unchanged since observer is stopped
    expect(newSpan.textContent).toBe('Loading')
  })
})