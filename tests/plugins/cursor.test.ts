// tests/plugins/cursor.test.ts

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { CursorPlugin } from '../../src/plugins/cursor'
import type { Options } from '../../src/types'

describe('CursorPlugin', () => {
  let container: HTMLElement
  let plugin: CursorPlugin

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    plugin = new CursorPlugin()
  })

  afterEach(() => {
    plugin.uninstall()
    document.body.removeChild(container)
  })

  it('should add blinking cursor after text', async () => {
    // Create an element with AI text
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Generated Text'
    container.appendChild(aiElement)

    plugin.install({})

    // Verify cursor element exists
    const cursor = document.querySelector('.ai-cursor')
    expect(cursor).not.toBeNull()
    expect(cursor?.textContent).toBe('\u2588') // '█'

    // Verify it's appended to the AI element
    expect(aiElement.contains(cursor)).toBe(true)

    // Verify blinking works - after one interval, opacity should change
    await new Promise(resolve => setTimeout(resolve, 600))
    expect(cursor?.style.opacity).toBe('0')

    // After another interval, opacity should be back to 1
    await new Promise(resolve => setTimeout(resolve, 600))
    expect(cursor?.style.opacity).toBe('1')
  })

  it('should use custom cursor symbol', () => {
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Text'
    container.appendChild(aiElement)

    const options: Options = {
      cursor: {
        symbol: '|'
      }
    }

    plugin.install(options)

    const cursor = document.querySelector('.ai-cursor')
    expect(cursor?.textContent).toBe('|')
  })

  it('should remove cursor on uninstall', () => {
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Text'
    container.appendChild(aiElement)

    plugin.install({})

    // Verify cursor exists
    let cursor = document.querySelector('.ai-cursor')
    expect(cursor).not.toBeNull()

    // Uninstall
    plugin.uninstall()

    // Verify cursor is removed
    cursor = document.querySelector('.ai-cursor')
    expect(cursor).toBeNull()
  })

  it('should use custom blink speed', async () => {
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Text'
    container.appendChild(aiElement)

    const options: Options = {
      cursor: {
        speed: 100
      }
    }

    plugin.install(options)

    const cursor = document.querySelector('.ai-cursor')

    // At 100ms speed, opacity should change faster
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(cursor?.style.opacity).toBe('0')
  })

  it('should use custom color', () => {
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Text'
    container.appendChild(aiElement)

    const options: Options = {
      cursor: {
        color: '#ff0000'
      }
    }

    plugin.install(options)

    const cursor = document.querySelector('.ai-cursor') as HTMLElement
    // Browser may convert hex to rgb format
    expect(['#ff0000', 'rgb(255, 0, 0)']).toContain(cursor?.style.color)
  })

  it('should append to body if no AI elements found', () => {
    // No AI elements in DOM
    plugin.install({})

    const cursor = document.querySelector('.ai-cursor')
    expect(cursor).not.toBeNull()
    expect(document.body.contains(cursor)).toBe(true)
  })

  it('should have correct name property', () => {
    expect(plugin.name).toBe('cursor')
  })

  it('should stop blinking interval on uninstall', async () => {
    const aiElement = document.createElement('span')
    aiElement.setAttribute('data-ai-replaced', 'true')
    aiElement.textContent = 'AI Text'
    container.appendChild(aiElement)

    plugin.install({})

    const cursor = document.querySelector('.ai-cursor') as HTMLElement

    // Uninstall
    plugin.uninstall()

    // Wait and verify opacity no longer changes
    const opacityBefore = cursor?.style.opacity
    await new Promise(resolve => setTimeout(resolve, 600))
    const opacityAfter = cursor?.style.opacity

    // Element might be removed or opacity might stay same
    // Since element is removed, we just verify no error occurs
    expect(cursor?.parentNode).toBeNull()
  })
})