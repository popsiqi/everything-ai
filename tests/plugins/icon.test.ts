// tests/plugins/icon.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { IconPlugin } from '../../src/plugins/icon'
import type { Options } from '../../src/types'

describe('IconPlugin', () => {
  let container: HTMLElement
  let plugin: IconPlugin

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    plugin = new IconPlugin()
  })

  afterEach(() => {
    plugin.uninstall()
    document.body.removeChild(container)
  })

  it('should replace spinner with AI icon', () => {
    container.innerHTML = '<div class="spinner">Loading...</div>'

    plugin.install({})

    const spinner = container.querySelector('.spinner')!
    expect(spinner.textContent).toBe('\u{1F9E0}') // brain emoji
    expect(spinner.classList.contains('ai-icon')).toBe(true)
  })

  it('should replace loading class elements', () => {
    container.innerHTML = '<span class="loading">Please wait...</span>'

    plugin.install({})

    const loading = container.querySelector('.loading')!
    expect(loading.textContent).toBe('\u{1F9E0}')
    expect(loading.classList.contains('ai-icon')).toBe(true)
  })

  it('should replace loading-icon class elements', () => {
    container.innerHTML = '<i class="loading-icon">Spinner</i>'

    plugin.install({})

    const loadingIcon = container.querySelector('.loading-icon')!
    expect(loadingIcon.textContent).toBe('\u{1F9E0}')
    expect(loadingIcon.classList.contains('ai-icon')).toBe(true)
  })

  it('should use custom icon type', () => {
    container.innerHTML = '<div class="spinner">Loading...</div>'

    const options: Options = {
      icon: {
        type: 'neural'
      }
    }
    plugin.install(options)

    const spinner = container.querySelector('.spinner')!
    expect(spinner.textContent).toBe('\u{1F52E}') // crystal ball emoji
  })

  it('should use chip icon type', () => {
    container.innerHTML = '<div class="loading">Loading...</div>'

    const options: Options = {
      icon: {
        type: 'chip'
      }
    }
    plugin.install(options)

    const loading = container.querySelector('.loading')!
    expect(loading.textContent).toBe('\u26A1') // lightning emoji
  })

  it('should use text icon type', () => {
    container.innerHTML = '<div class="spinner">Loading...</div>'

    const options: Options = {
      icon: {
        type: 'text'
      }
    }
    plugin.install(options)

    const spinner = container.querySelector('.spinner')!
    expect(spinner.textContent).toBe('AI')
  })

  it('should add animated class by default', () => {
    container.innerHTML = '<div class="spinner">Loading...</div>'

    plugin.install({})

    const spinner = container.querySelector('.spinner')!
    expect(spinner.classList.contains('ai-icon-animated')).toBe(true)
  })

  it('should not add animated class when animated is false', () => {
    container.innerHTML = '<div class="spinner">Loading...</div>'

    const options: Options = {
      icon: {
        animated: false
      }
    }
    plugin.install(options)

    const spinner = container.querySelector('.spinner')!
    expect(spinner.classList.contains('ai-icon-animated')).toBe(false)
  })

  it('should remove icons on uninstall', () => {
    container.innerHTML = '<div class="spinner">Original Spinner Text</div>'

    plugin.install({})

    const spinner = container.querySelector('.spinner')!
    expect(spinner.textContent).toBe('\u{1F9E0}')
    expect(spinner.classList.contains('ai-icon')).toBe(true)

    plugin.uninstall()

    expect(spinner.textContent).toBe('Original Spinner Text')
    expect(spinner.classList.contains('ai-icon')).toBe(false)
    expect(spinner.classList.contains('ai-icon-animated')).toBe(false)
  })

  it('should handle elements with class containing spinner', () => {
    container.innerHTML = '<div class="my-spinner-class">Loading...</div>'

    plugin.install({})

    const spinner = container.querySelector('.my-spinner-class')!
    expect(spinner.textContent).toBe('\u{1F9E0}')
    expect(spinner.classList.contains('ai-icon')).toBe(true)
  })

  it('should handle elements with class containing loading', () => {
    container.innerHTML = '<div class="my-loading-class">Loading...</div>'

    plugin.install({})

    const loading = container.querySelector('.my-loading-class')!
    expect(loading.textContent).toBe('\u{1F9E0}')
    expect(loading.classList.contains('ai-icon')).toBe(true)
  })

  it('should handle multiple spinners', () => {
    container.innerHTML = `
      <div class="spinner">Loading 1</div>
      <div class="loading">Loading 2</div>
      <div class="loading-icon">Loading 3</div>
    `

    plugin.install({})

    const elements = container.querySelectorAll('.ai-icon')
    expect(elements.length).toBe(3)

    elements.forEach(el => {
      expect(el.textContent).toBe('\u{1F9E0}')
    })
  })

  it('should restore all elements on uninstall', () => {
    container.innerHTML = `
      <div class="spinner">Original 1</div>
      <div class="loading">Original 2</div>
    `

    plugin.install({})

    plugin.uninstall()

    const spinner = container.querySelector('.spinner')!
    const loading = container.querySelector('.loading')!

    expect(spinner.textContent).toBe('Original 1')
    expect(loading.textContent).toBe('Original 2')
    expect(spinner.classList.contains('ai-icon')).toBe(false)
    expect(loading.classList.contains('ai-icon')).toBe(false)
  })

  it('should handle elements with no text content', () => {
    container.innerHTML = '<div class="spinner"></div>'

    plugin.install({})

    const spinner = container.querySelector('.spinner')!
    expect(spinner.textContent).toBe('\u{1F9E0}')
  })

  it('should not affect non-spinner elements', () => {
    container.innerHTML = `
      <div class="spinner">Spinner</div>
      <div class="content">Content</div>
    `

    plugin.install({})

    const content = container.querySelector('.content')!
    expect(content.textContent).toBe('Content')
    expect(content.classList.contains('ai-icon')).toBe(false)
  })
})