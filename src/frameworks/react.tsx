// src/frameworks/react.tsx
import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react'
import { Scanner } from '../core/scanner'
import { Replacer } from '../core/replacer'
import { Observer } from '../core/observer'
import { defaultReplacements, addCustomRules } from '../core/replacements'
import type { Options, ReplacementRule } from '../types'

export type { Options, ReplacementRule } from '../types'

interface UseEverythingAIResult {
  isRunning: boolean
  replacedCount: number
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * React hook for Everything AI
 */
export function useEverythingAI(options: Options = {}): UseEverythingAIResult {
  const [isRunning, setIsRunning] = useState(false)
  const [replacedCount, setReplacedCount] = useState(0)
  const observerRef = useRef<Observer | null>(null)
  const replacerRef = useRef<Replacer | null>(null)

  const start = useCallback(() => {
    if (observerRef.current) {
      return
    }

    let rules: ReplacementRule[] = [...defaultReplacements]
    if (options.customReplacements) {
      rules = addCustomRules(options.customReplacements, rules)
    }

    const scanner = new Scanner(rules)
    const replacer = new Replacer(rules)
    const observer = new Observer(scanner, replacer)

    replacerRef.current = replacer
    observerRef.current = observer

    observer.start()
    setIsRunning(true)
  }, [options])

  const stop = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.stop()
      observerRef.current = null
      setIsRunning(false)
    }
  }, [])

  const reset = useCallback(() => {
    if (replacerRef.current) {
      replacerRef.current.reset()
      setReplacedCount(0)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (replacerRef.current) {
        setReplacedCount(replacerRef.current.getReplacedCount())
      }
    }, 100)

    return () => {
      clearInterval(interval)
      stop()
    }
  }, [stop])

  return {
    isRunning,
    replacedCount,
    start,
    stop,
    reset
  }
}

interface EverythingAIProviderProps {
  options?: Options
  children: React.ReactNode
}

const EverythingAIContext = createContext<{
  isRunning: boolean
  replacedCount: number
  start: () => void
  stop: () => void
} | null>(null)

/**
 * React context provider for Everything AI
 */
export function EverythingAIProvider({ options, children }: EverythingAIProviderProps) {
  const { isRunning, replacedCount, start, stop } = useEverythingAI(options)

  return (
    <EverythingAIContext.Provider value={{ isRunning, replacedCount, start, stop }}>
      {children}
    </EverythingAIContext.Provider>
  )
}

/**
 * Hook to access Everything AI context
 */
export function useEverythingAIContext() {
  const context = useContext(EverythingAIContext)
  if (!context) {
    throw new Error('useEverythingAIContext must be used within EverythingAIProvider')
  }
  return context
}
