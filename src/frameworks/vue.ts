// src/frameworks/vue.ts
import { ref, onUnmounted, type Ref } from 'vue'
import { Scanner } from '../core/scanner'
import { Replacer } from '../core/replacer'
import { Observer } from '../core/observer'
import { defaultReplacements, addCustomRules } from '../core/replacements'
import type { Options, ReplacementRule } from '../types'

export type { Options, ReplacementRule } from '../types'

interface UseEverythingAIResult {
  isRunning: Ref<boolean>
  replacedCount: Ref<number>
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * Vue composable for Everything AI
 */
export function useEverythingAI(options: Options = {}): UseEverythingAIResult {
  const isRunning = ref(false)
  const replacedCount = ref(0)

  let observer: Observer | null = null
  let replacer: Replacer | null = null
  let countInterval: ReturnType<typeof setInterval> | null = null

  const start = () => {
    if (observer) {
      return
    }

    let rules: ReplacementRule[] = [...defaultReplacements]
    if (options.customReplacements) {
      rules = addCustomRules(options.customReplacements, rules)
    }

    const scanner = new Scanner(rules)
    replacer = new Replacer(rules)
    observer = new Observer(scanner, replacer)

    observer.start()
    isRunning.value = true

    countInterval = setInterval(() => {
      if (replacer) {
        replacedCount.value = replacer.getReplacedCount()
      }
    }, 100)
  }

  const stop = () => {
    if (observer) {
      observer.stop()
      observer = null
      isRunning.value = false
    }
    if (countInterval) {
      clearInterval(countInterval)
      countInterval = null
    }
  }

  const reset = () => {
    if (replacer) {
      replacer.reset()
      replacedCount.value = 0
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    isRunning,
    replacedCount,
    start,
    stop,
    reset
  }
}

/**
 * Vue plugin for Everything AI
 */
export const EverythingAIPlugin = {
  install(app: any, options: Options = {}) {
    let observer: Observer | null = null
    let replacer: Replacer | null = null

    app.provide('everything-ai-options', options)

    app.mixin({
      onMounted() {
        if (!observer) {
          let rules: ReplacementRule[] = [...defaultReplacements]
          if (options.customReplacements) {
            rules = addCustomRules(options.customReplacements, rules)
          }

          const scanner = new Scanner(rules)
          replacer = new Replacer(rules)
          observer = new Observer(scanner, replacer)
          observer.start()
        }
      },
      onUnmounted() {
        if (observer) {
          observer.stop()
          observer = null
        }
      }
    })
  }
}
