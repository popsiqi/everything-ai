// src/core/observer.ts
import type { Scanner } from './scanner'
import type { Replacer } from './replacer'

export class Observer {
  private scanner: Scanner
  private replacer: Replacer
  private observer: MutationObserver | null = null
  private isObserving: boolean = false

  constructor(scanner: Scanner, replacer: Replacer) {
    this.scanner = scanner
    this.replacer = replacer
  }

  start(root?: Element): void {
    if (this.isObserving) return

    const targetRoot = root || document.body

    // First scan and replace existing nodes
    const existingNodes = this.scanner.scan(targetRoot)
    this.replacer.replaceAll(existingNodes)

    // Then observe DOM changes
    this.observer = new MutationObserver((mutations) => {
      this.handleMutations(mutations)
    })

    this.observer.observe(targetRoot, {
      childList: true,
      subtree: true,
    })

    this.isObserving = true
  }

  stop(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.isObserving = false
  }

  private handleMutations(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          this.processAddedNode(node)
        }
      }
    }
  }

  private processAddedNode(node: Node): void {
    if (node instanceof Element) {
      // Scan the added element and its descendants
      const textNodes = this.scanner.scan(node)
      this.replacer.replaceAll(textNodes)
    } else if (node instanceof Text) {
      // Process single text node
      this.replacer.replace(node)
    }
  }

  isActive(): boolean {
    return this.isObserving
  }
}