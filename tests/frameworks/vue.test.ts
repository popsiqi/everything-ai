import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock Vue reactivity since Vue is a peer dependency
vi.mock('vue', () => ({
  ref: (value: any) => ({ value }),
  onUnmounted: (fn: () => void) => {
    // Store for later cleanup
    ;(globalThis as any).__vueUnmounted = fn
  },
  type: { Ref: {} }
}))

describe('Vue Plugin', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    vi.clearAllMocks()
  })

  afterEach(() => {
    document.body.removeChild(container)
    delete (globalThis as any).__vueUnmounted
  })

  describe('EverythingAIPlugin', () => {
    it('should have install method', async () => {
      const { EverythingAIPlugin } = await import('../../src/frameworks/vue')

      expect(EverythingAIPlugin).toHaveProperty('install')
      expect(typeof EverythingAIPlugin.install).toBe('function')
    })

    it('should call provide and mixin on install', async () => {
      const { EverythingAIPlugin } = await import('../../src/frameworks/vue')

      const mockApp = {
        mixin: vi.fn(),
        provide: vi.fn()
      }

      EverythingAIPlugin.install(mockApp as any)

      expect(mockApp.mixin).toHaveBeenCalled()
      expect(mockApp.provide).toHaveBeenCalledWith('everything-ai-options', expect.any(Object))
    })

    it('should start observer on mounted', async () => {
      const { EverythingAIPlugin } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const mockApp = {
        mixin: vi.fn(),
        provide: vi.fn()
      }

      EverythingAIPlugin.install(mockApp as any)

      // Get the mixin object
      const mixinCall = mockApp.mixin.mock.calls[0][0]

      // Call onMounted handler
      mixinCall.onMounted()

      // Text should be replaced after observer starts
      const span = container.querySelector('span')!
      expect(span.textContent).not.toBe('Loading')
    })

    it('should stop observer on unmounted', async () => {
      const { EverythingAIPlugin } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const mockApp = {
        mixin: vi.fn(),
        provide: vi.fn()
      }

      EverythingAIPlugin.install(mockApp as any)

      const mixinCall = mockApp.mixin.mock.calls[0][0]

      // Initialize
      mixinCall.onMounted()
      expect(container.querySelector('span')!.textContent).not.toBe('Loading')

      // Cleanup
      mixinCall.onUnmounted()

      // Add new content after destroy
      const newSpan = document.createElement('span')
      newSpan.textContent = 'Loading'
      container.appendChild(newSpan)

      // New content should not be replaced after destroy
      expect(newSpan.textContent).toBe('Loading')
    })

    it('should accept custom options', async () => {
      const { EverythingAIPlugin } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>CustomText</span>'

      const mockApp = {
        mixin: vi.fn(),
        provide: vi.fn()
      }

      EverythingAIPlugin.install(mockApp as any, {
        customReplacements: {
          'CustomText': 'AI Generated'
        }
      })

      const mixinCall = mockApp.mixin.mock.calls[0][0]
      mixinCall.onMounted()

      expect(container.querySelector('span')!.textContent).toBe('AI Generated')
    })
  })

  describe('useEverythingAI', () => {
    it('should return composable functions', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      const result = useEverythingAI()

      expect(result).toHaveProperty('isRunning')
      expect(result).toHaveProperty('replacedCount')
      expect(result).toHaveProperty('start')
      expect(result).toHaveProperty('stop')
      expect(result).toHaveProperty('reset')
      expect(typeof result.start).toBe('function')
      expect(typeof result.stop).toBe('function')
      expect(typeof result.reset).toBe('function')
    })

    it('should start observing when start is called', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const result = useEverythingAI()
      result.start()

      expect(result.isRunning.value).toBe(true)
      expect(container.querySelector('span')!.textContent).not.toBe('Loading')
    })

    it('should stop observing when stop is called', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const result = useEverythingAI()
      result.start()
      result.stop()

      expect(result.isRunning.value).toBe(false)

      // Add new content after stop
      const newSpan = document.createElement('span')
      newSpan.textContent = 'Loading'
      container.appendChild(newSpan)

      expect(newSpan.textContent).toBe('Loading')
    })

    it('should reset count when reset is called', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const result = useEverythingAI()
      result.start()

      // Wait for replacement to happen
      expect(container.querySelector('span')!.textContent).not.toBe('Loading')

      result.reset()

      expect(result.replacedCount.value).toBe(0)
    })

    it('should accept custom replacements', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>MyCustomText</span>'

      const result = useEverythingAI({
        customReplacements: {
          'MyCustomText': 'AI Custom Result'
        }
      })
      result.start()

      expect(container.querySelector('span')!.textContent).toBe('AI Custom Result')
    })

    it('should not start if already running', async () => {
      const { useEverythingAI } = await import('../../src/frameworks/vue')

      container.innerHTML = '<span>Loading</span>'

      const result = useEverythingAI()
      result.start()
      const firstContent = container.querySelector('span')!.textContent

      // Call start again - should be a no-op
      result.start()

      // Content should remain the same
      expect(container.querySelector('span')!.textContent).toBe(firstContent)
    })
  })

  describe('exports', () => {
    it('should export Options and ReplacementRule types', async () => {
      const vueModule = await import('../../src/frameworks/vue')

      // These are type exports, just verify the module can be imported
      expect(vueModule.EverythingAIPlugin).toBeDefined()
      expect(vueModule.useEverythingAI).toBeDefined()
    })
  })
})