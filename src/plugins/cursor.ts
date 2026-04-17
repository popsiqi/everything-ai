// src/plugins/cursor.ts

import type { Plugin, Options, CursorOptions } from '../types'

export class CursorPlugin implements Plugin {
  readonly name = 'cursor' as const

  private cursorElement: HTMLElement | null = null
  private blinkInterval: ReturnType<typeof setInterval> | null = null
  private options: Required<CursorOptions> = {
    symbol: '\u2588', // '█'
    speed: 500,
    color: 'inherit'
  }

  install(options: Options): void {
    // Merge cursor options with defaults
    if (options.cursor) {
      this.options = {
        symbol: options.cursor.symbol ?? '\u2588',
        speed: options.cursor.speed ?? 500,
        color: options.cursor.color ?? 'inherit'
      }
    }

    // Create cursor element
    this.cursorElement = document.createElement('span')
    this.cursorElement.className = 'ai-cursor'
    this.cursorElement.textContent = this.options.symbol
    this.cursorElement.style.cssText = `
      color: ${this.options.color};
      font-weight: bold;
      margin-left: 2px;
    `

    // Find AI text elements and append cursor
    this.appendCursor()

    // Start blinking
    this.startBlinking()
  }

  uninstall(): void {
    // Stop blinking
    this.stopBlinking()

    // Remove cursor element from DOM
    if (this.cursorElement && this.cursorElement.parentNode) {
      this.cursorElement.parentNode.removeChild(this.cursorElement)
    }
    this.cursorElement = null
  }

  private appendCursor(): void {
    // Find elements that contain AI-generated text
    // These are typically elements that have been replaced by the replacer
    const aiElements = document.querySelectorAll('[data-ai-replaced="true"]')

    if (aiElements.length > 0) {
      // Append cursor to the last AI element
      const lastElement = aiElements[aiElements.length - 1]
      lastElement.appendChild(this.cursorElement!)
    } else {
      // If no AI elements found, append to body as fallback
      document.body.appendChild(this.cursorElement!)
    }
  }

  private startBlinking(): void {
    if (!this.cursorElement) return

    this.blinkInterval = setInterval(() => {
      if (this.cursorElement) {
        this.cursorElement.style.opacity =
          this.cursorElement.style.opacity === '0' ? '1' : '0'
      }
    }, this.options.speed)
  }

  private stopBlinking(): void {
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval)
      this.blinkInterval = null
    }
  }
}