// src/plugins/icon.ts

import type { Plugin, Options, IconOptions } from '../types'

const ICONS: Record<Required<IconOptions>['type'], string> = {
  brain: '\u{1F9E0}',  // 🧠
  neural: '\u{1F52E}', // 🔮
  chip: '\u26A1',      // ⚡
  text: 'AI'
}

const SELECTORS = [
  '.spinner',
  '.loading',
  '.loading-icon',
  '[class*="spinner"]',
  '[class*="loading"]'
].join(', ')

interface OriginalElement {
  element: Element
  originalContent: string
  wasReplaced: boolean
}

export class IconPlugin implements Plugin {
  readonly name = 'icon' as const

  private options: Required<IconOptions> = {
    type: 'brain',
    animated: true
  }

  private originalElements: OriginalElement[] = []

  install(options: Options): void {
    // Merge icon options with defaults
    if (options.icon) {
      this.options = {
        type: options.icon.type ?? 'brain',
        animated: options.icon.animated ?? true
      }
    }

    // Find and replace spinner/loading elements
    this.replaceSpinners()
  }

  uninstall(): void {
    // Restore all original elements
    for (const { element, originalContent, wasReplaced } of this.originalElements) {
      if (wasReplaced && element.parentNode) {
        element.textContent = originalContent
        element.classList.remove('ai-icon', 'ai-icon-animated')
      }
    }
    this.originalElements = []
  }

  private replaceSpinners(): void {
    const elements = document.querySelectorAll(SELECTORS)

    elements.forEach(element => {
      // Store original content
      const originalContent = element.textContent || ''

      // Create icon element
      const icon = this.createIcon()

      // Replace content with icon
      element.textContent = ''
      element.appendChild(icon)
      element.classList.add('ai-icon')
      if (this.options.animated) {
        element.classList.add('ai-icon-animated')
      }

      // Store for restoration
      this.originalElements.push({
        element,
        originalContent,
        wasReplaced: true
      })
    })
  }

  private createIcon(): HTMLSpanElement {
    const iconSpan = document.createElement('span')
    iconSpan.className = 'ai-icon-inner'
    iconSpan.textContent = ICONS[this.options.type]

    if (this.options.animated) {
      iconSpan.style.cssText = `
        display: inline-block;
        animation: ai-icon-pulse 1.5s ease-in-out infinite;
      `
    }

    return iconSpan
  }
}