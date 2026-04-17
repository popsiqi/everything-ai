// src/core/scanner.ts
import type { ReplacementRule } from '../types'
import { getReplacement } from './replacements'

export class Scanner {
  private rules: ReplacementRule[]

  constructor(rules: ReplacementRule[]) {
    this.rules = rules
  }

  scan(root?: Element): Text[] {
    const targetRoot = root || document.body
    const matchingNodes: Text[] = []

    const walker = document.createTreeWalker(
      targetRoot,
      NodeFilter.SHOW_TEXT,
      null
    )

    let node: Text | null
    while ((node = walker.nextNode() as Text | null)) {
      if (node.textContent && getReplacement(node.textContent, this.rules)) {
        matchingNodes.push(node)
      }
    }

    return matchingNodes
  }
}