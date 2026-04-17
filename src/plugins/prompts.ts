// src/plugins/prompts.ts
import type { Plugin, Options, PromptsOptions } from '../types'

export const defaultPrompts: string[] = [
  '正在调用 405B 参数模型...',
  '神经网络深度推理中...',
  '万亿参数模型运行...',
  'Transformer 注意力机制计算中...',
  '正在生成下一个 Token...'
]

export class PromptsPlugin implements Plugin {
  name: 'prompts' = 'prompts'
  private options: PromptsOptions = {}
  private intervalId: number | null = null
  private currentPromptIndex: number = 0
  private promptElement: HTMLElement | null = null
  private targetElement: HTMLElement | null = null

  install(options: Options): void {
    this.options = options.prompts || {}
    const { interval = 2000, position = 'below' } = this.options

    // Find a suitable target element (loading text or similar)
    this.targetElement = this.findTargetElement()

    if (this.targetElement) {
      this.showPrompt()
      this.startRotation(interval)
    }
  }

  uninstall(): void {
    this.stopRotation()
    this.removePrompt()
    this.targetElement = null
  }

  private findTargetElement(): HTMLElement | null {
    // Look for elements with AI-related text content
    const keywords = ['AI', '加载中', 'Loading', '处理中', '思考中', '生成中']
    const elements = document.querySelectorAll('*')

    for (const el of elements) {
      if (el.textContent && el.children.length === 0) {
        const text = el.textContent.trim()
        if (keywords.some(keyword => text.includes(keyword))) {
          return el as HTMLElement
        }
      }
    }

    // Default to body if no suitable element found
    return document.body
  }

  private showPrompt(): void {
    if (!this.targetElement) return

    const { position = 'below' } = this.options
    const prompt = this.getCurrentPrompt()

    this.removePrompt()

    if (position === 'replace') {
      // Replace the target element's content
      this.targetElement.textContent = prompt
      this.promptElement = this.targetElement
    } else {
      // Create a new element for the prompt
      this.promptElement = document.createElement('span')
      this.promptElement.textContent = prompt
      this.promptElement.className = 'everything-ai-prompt'
      this.promptElement.style.cssText = this.getPromptStyles(position)

      if (position === 'tooltip') {
        this.targetElement.style.position = 'relative'
        this.promptElement.style.position = 'absolute'
        this.promptElement.style.top = '0'
        this.promptElement.style.left = '100%'
        this.promptElement.style.whiteSpace = 'nowrap'
        this.promptElement.style.marginLeft = '8px'
        this.promptElement.style.padding = '4px 8px'
        this.promptElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        this.promptElement.style.color = '#fff'
        this.promptElement.style.borderRadius = '4px'
        this.promptElement.style.fontSize = '12px'
        this.promptElement.style.zIndex = '1000'
      }

      // Insert the prompt element
      if (position === 'below') {
        this.targetElement.insertAdjacentElement('afterend', this.promptElement)
      } else {
        this.targetElement.appendChild(this.promptElement)
      }
    }
  }

  private getPromptStyles(position: 'below' | 'tooltip' | 'replace'): string {
    if (position === 'below') {
      return 'display: block; margin-top: 8px; color: inherit; font-size: inherit;'
    }
    return ''
  }

  private getCurrentPrompt(): string {
    return defaultPrompts[this.currentPromptIndex]
  }

  private getNextPrompt(): string {
    this.currentPromptIndex = (this.currentPromptIndex + 1) % defaultPrompts.length
    return this.getCurrentPrompt()
  }

  private startRotation(interval: number): void {
    this.intervalId = window.setInterval(() => {
      if (this.promptElement) {
        const newPrompt = this.getNextPrompt()
        this.promptElement.textContent = newPrompt
      }
    }, interval)
  }

  private stopRotation(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private removePrompt(): void {
    if (this.promptElement && this.promptElement !== this.targetElement) {
      this.promptElement.remove()
    }
    this.promptElement = null
  }
}