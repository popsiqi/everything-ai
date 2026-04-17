// src/plugins/index.ts

import type { Plugin, PluginName, Options } from '../types'

export class PluginManager {
  private plugins: Map<PluginName, Plugin> = new Map()
  private activePlugins: Set<PluginName> = new Set()

  /**
   * Register a plugin
   */
  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered`)
      return
    }
    this.plugins.set(plugin.name, plugin)
  }

  /**
   * Enable a plugin by name with options
   */
  enable(name: PluginName, options: Options): void {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      console.warn(`Plugin "${name}" is not registered`)
      return
    }
    if (this.activePlugins.has(name)) {
      console.warn(`Plugin "${name}" is already enabled`)
      return
    }
    plugin.install(options)
    this.activePlugins.add(name)
  }

  /**
   * Disable a plugin by name
   */
  disable(name: PluginName): void {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      console.warn(`Plugin "${name}" is not registered`)
      return
    }
    if (!this.activePlugins.has(name)) {
      console.warn(`Plugin "${name}" is not enabled`)
      return
    }
    plugin.uninstall()
    this.activePlugins.delete(name)
  }

  /**
   * Enable multiple plugins at once
   */
  enableAll(names: PluginName[], options: Options): void {
    for (const name of names) {
      this.enable(name, options)
    }
  }

  /**
   * Disable all active plugins
   */
  disableAll(): void {
    for (const name of this.activePlugins) {
      this.disable(name)
    }
  }

  /**
   * Get list of active plugin names
   */
  getActivePlugins(): PluginName[] {
    return Array.from(this.activePlugins)
  }
}