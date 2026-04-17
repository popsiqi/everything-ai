// src/index.ts
import { Scanner } from './core/scanner'
import { Replacer } from './core/replacer'
import { Observer } from './core/observer'
import { defaultReplacements, addCustomRules } from './core/replacements'
import { PluginManager } from './plugins'
import { CursorPlugin } from './plugins/cursor'
import { PromptsPlugin } from './plugins/prompts'
import { IconPlugin } from './plugins/icon'
import { themeManager } from './themes'
import type { Options, ReplacementRule } from './types'

export type { Options, ReplacementRule, PluginName, Theme, CursorOptions, IconOptions, PromptsOptions } from './types'
export { Scanner } from './core/scanner'
export { Replacer } from './core/replacer'
export { Observer } from './core/observer'
export { defaultReplacements, getReplacement, addCustomRules } from './core/replacements'

export interface EverythingAI {
  destroy: () => void
  getReplacedCount: () => number
}

export function init(options: Options = {}): EverythingAI {
  // Build replacement rules
  let rules: ReplacementRule[] = [...defaultReplacements]

  // Apply theme rules if specified
  if (options.theme) {
    const theme = themeManager.get(options.theme)
    if (theme) {
      rules = [...rules, ...theme.replacements]
    }
  }

  // Add custom replacements if provided
  if (options.customReplacements) {
    rules = addCustomRules(options.customReplacements, rules)
  }

  // Create core instances
  const scanner = new Scanner(rules)
  const replacer = new Replacer(rules)
  const observer = new Observer(scanner, replacer)

  // Create and configure plugin manager
  const pluginManager = new PluginManager()
  pluginManager.register(new CursorPlugin())
  pluginManager.register(new PromptsPlugin())
  pluginManager.register(new IconPlugin())

  // Enable plugins based on options
  if (options.plugins && options.plugins.length > 0) {
    pluginManager.enableAll(options.plugins, options)
  }

  // Start observing
  observer.start()

  return {
    destroy: () => {
      pluginManager.disableAll()
      observer.stop()
      replacer.reset()
    },
    getReplacedCount: () => {
      return replacer.getReplacedCount()
    }
  }
}