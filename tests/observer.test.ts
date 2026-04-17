// tests/observer.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Observer } from '../src/core/observer'
import { Scanner } from '../src/core/scanner'
import { Replacer } from '../src/core/replacer'
import { defaultReplacements } from '../src/core/replacements'

describe('Observer', () => {
  let container: HTMLElement
  let scanner: Scanner
  let replacer: Replacer
  let observer: Observer

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    scanner = new Scanner(defaultReplacements)
    replacer = new Replacer(defaultReplacements)
    observer = new Observer(scanner, replacer)
  })

  afterEach(() => {
    observer.stop()
    document.body.removeChild(container)
  })

  it('should replace existing nodes on start', () => {
    container.innerHTML = '<span>加载中...</span>'

    observer.start(container)

    expect(container.querySelector('span')?.textContent).not.toBe('加载中...')
  })

  it('should observe DOM changes (added elements get replaced)', async () => {
    observer.start(container)

    // Add new element after observer started
    const span = document.createElement('span')
    span.textContent = '加载中...'
    container.appendChild(span)

    // Wait for MutationObserver to process
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(span.textContent).not.toBe('加载中...')
  })

  it('should stop observing when stop() called', async () => {
    observer.start(container)
    observer.stop()

    // Add new element after observer stopped
    const span = document.createElement('span')
    span.textContent = '加载中...'
    container.appendChild(span)

    // Wait for any potential mutations
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(span.textContent).toBe('加载中...')
  })

  it('should handle multiple additions', async () => {
    observer.start(container)

    // Add multiple elements
    for (let i = 0; i < 5; i++) {
      const span = document.createElement('span')
      span.textContent = 'Loading...'
      container.appendChild(span)
    }

    // Wait for MutationObserver to process
    await new Promise(resolve => setTimeout(resolve, 50))

    const spans = container.querySelectorAll('span')
    spans.forEach(span => {
      expect(span.textContent).not.toBe('Loading...')
    })
    expect(spans.length).toBe(5)
  })

  it('should handle nested element additions', async () => {
    observer.start(container)

    // Add nested elements
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div><span>加载中</span><span>Loading...</span></div>'
    container.appendChild(wrapper)

    // Wait for MutationObserver to process
    await new Promise(resolve => setTimeout(resolve, 50))

    const spans = container.querySelectorAll('span')
    spans.forEach(span => {
      expect(span.textContent).not.toBe('加载中')
      expect(span.textContent).not.toBe('Loading...')
    })
  })

  it('should not start twice', () => {
    observer.start(container)
    const firstObserver = (observer as unknown as { observer: MutationObserver }).observer

    observer.start(container)
    const secondObserver = (observer as unknown as { observer: MutationObserver }).observer

    expect(firstObserver).toBe(secondObserver)
    expect(observer.isActive()).toBe(true)
  })

  it('should report active status correctly', () => {
    expect(observer.isActive()).toBe(false)

    observer.start(container)
    expect(observer.isActive()).toBe(true)

    observer.stop()
    expect(observer.isActive()).toBe(false)
  })

  it('should use document.body as default root', () => {
    const testSpan = document.createElement('span')
    testSpan.textContent = '加载中...'
    document.body.appendChild(testSpan)

    observer.start()

    expect(testSpan.textContent).not.toBe('加载中...')

    observer.stop()
    document.body.removeChild(testSpan)
  })
})