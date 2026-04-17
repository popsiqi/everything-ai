// src/themes/index.ts
import type { Theme } from '../types'
import { gptTheme } from './gpt'
import { cnAiTheme } from './cn-ai'
import { enterpriseTheme } from './enterprise'

class ThemeManager {
  private themes: Map<string, Theme> = new Map()

  constructor() {
    // 注册内置主题
    this.register(gptTheme)
    this.register(cnAiTheme)
    this.register(enterpriseTheme)
  }

  /**
   * 注册主题
   */
  register(theme: Theme): void {
    this.themes.set(theme.name, theme)
  }

  /**
   * 获取主题
   */
  get(name: string): Theme | undefined {
    return this.themes.get(name)
  }

  /**
   * 返回所有主题
   */
  getAll(): Theme[] {
    return Array.from(this.themes.values())
  }
}

// 导出单例
export const themeManager = new ThemeManager()

// 导出主题
export { gptTheme } from './gpt'
export { cnAiTheme } from './cn-ai'
export { enterpriseTheme } from './enterprise'