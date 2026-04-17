// src/types.ts

export type PluginName = 'cursor' | 'icon' | 'prompts'

export interface ReplacementRule {
  from: string | RegExp
  to: string | string[]
}

export interface Theme {
  name: string
  replacements: ReplacementRule[]
  prompts?: string[]
}

export interface CursorOptions {
  symbol?: string
  speed?: number
  color?: string
}

export interface IconOptions {
  type?: 'brain' | 'neural' | 'chip' | 'text'
  animated?: boolean
}

export interface PromptsOptions {
  interval?: number
  position?: 'below' | 'tooltip' | 'replace'
}

export interface Options {
  plugins?: PluginName[]
  theme?: string
  customReplacements?: Record<string, string>
  cursor?: CursorOptions
  icon?: IconOptions
  prompts?: PromptsOptions
}

export interface Plugin {
  name: PluginName
  install: (options: Options) => void
  uninstall: () => void
}