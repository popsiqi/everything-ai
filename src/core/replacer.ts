// src/core/replacer.ts
import type { ReplacementRule } from '../types'
import { getReplacement } from './replacements'

export class Replacer {
  private rules: ReplacementRule[]
  private replacedNodes: Set<Text> = new Set()

  constructor(rules: ReplacementRule[]) {
    this.rules = rules
  }

  replace(node: Text): boolean {
    if (this.replacedNodes.has(node)) return false

    const originalText = node.textContent || ''
    const newText = getReplacement(originalText, this.rules)

    if (newText) {
      node.textContent = newText
      this.replacedNodes.add(node)
      return true
    }

    return false
  }

  replaceAll(nodes: Text[]): number {
    let count = 0
    for (const node of nodes) {
      if (this.replace(node)) count++
    }
    return count
  }

  getReplacedCount(): number {
    return this.replacedNodes.size
  }

  reset(): void {
    this.replacedNodes.clear()
  }
}