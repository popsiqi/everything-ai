import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup, act } from '@testing-library/react'
import { createElement, useState } from 'react'
import { EverythingAIProvider, useEverythingAI, useEverythingAIContext } from '../../src/frameworks/react'

// Mock the core modules
vi.mock('../../src/core/scanner', () => ({
  Scanner: vi.fn(() => ({
    scan: vi.fn()
  }))
}))

vi.mock('../../src/core/replacer', () => ({
  Replacer: vi.fn(() => ({
    replace: vi.fn(),
    reset: vi.fn(),
    getReplacedCount: vi.fn(() => 5)
  }))
}))

vi.mock('../../src/core/observer', () => ({
  Observer: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn()
  }))
}))

vi.mock('../../src/core/replacements', () => ({
  defaultReplacements: [],
  addCustomRules: vi.fn((custom, rules) => rules)
}))

// Test component that uses the hook directly
function TestComponent({ options = {} }: { options?: Parameters<typeof useEverythingAI>[0] }) {
  const { isRunning, replacedCount, start, stop, reset } = useEverythingAI(options)
  return createElement('div', null,
    createElement('span', { 'data-testid': 'running' }, isRunning ? 'running' : 'stopped'),
    createElement('span', { 'data-testid': 'count' }, String(replacedCount)),
    createElement('button', { 'data-testid': 'start', onClick: start }, 'Start'),
    createElement('button', { 'data-testid': 'stop', onClick: stop }, 'Stop'),
    createElement('button', { 'data-testid': 'reset', onClick: reset }, 'Reset')
  )
}

// Test component that uses the context
function ContextTestComponent() {
  const { isRunning, replacedCount, start, stop } = useEverythingAIContext()
  return createElement('div', null,
    createElement('span', { 'data-testid': 'context-running' }, isRunning ? 'running' : 'stopped'),
    createElement('span', { 'data-testid': 'context-count' }, String(replacedCount)),
    createElement('button', { 'data-testid': 'context-start', onClick: start }, 'Start'),
    createElement('button', { 'data-testid': 'context-stop', onClick: stop }, 'Stop')
  )
}

describe('useEverythingAI hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('should return initial state with isRunning false', () => {
    render(createElement(TestComponent))

    expect(screen.getByTestId('running').textContent).toBe('stopped')
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('should start and stop correctly', () => {
    const { container } = render(createElement(TestComponent))

    // Click start
    act(() => {
      screen.getByTestId('start').click()
    })
    expect(screen.getByTestId('running').textContent).toBe('running')

    // Click stop
    act(() => {
      screen.getByTestId('stop').click()
    })
    expect(screen.getByTestId('running').textContent).toBe('stopped')
  })

  it('should reset replaced count', async () => {
    const { container } = render(createElement(TestComponent))

    // Start to get some counts
    act(() => {
      screen.getByTestId('start').click()
    })

    // Advance timers to trigger interval
    act(() => {
      vi.advanceTimersByTime(150)
    })

    // Reset
    act(() => {
      screen.getByTestId('reset').click()
    })

    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})

describe('EverythingAIProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('should render children', () => {
    render(
      createElement(EverythingAIProvider, null,
        createElement('span', null, 'Hello World')
      )
    )

    expect(screen.getByText('Hello World')).toBeDefined()
  })

  it('should provide context through useEverythingAIContext', () => {
    render(
      createElement(EverythingAIProvider, null,
        createElement(ContextTestComponent)
      )
    )

    expect(screen.getByTestId('context-running').textContent).toBe('stopped')
    expect(screen.getByTestId('context-count').textContent).toBe('0')
  })

  it('should allow starting and stopping via context', () => {
    render(
      createElement(EverythingAIProvider, null,
        createElement(ContextTestComponent)
      )
    )

    // Start
    act(() => {
      screen.getByTestId('context-start').click()
    })
    expect(screen.getByTestId('context-running').textContent).toBe('running')

    // Stop
    act(() => {
      screen.getByTestId('context-stop').click()
    })
    expect(screen.getByTestId('context-running').textContent).toBe('stopped')
  })
})

describe('useEverythingAIContext error handling', () => {
  it('should throw error when used outside provider', () => {
    // Suppress the error boundary warning in console
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(createElement(ContextTestComponent))
    }).toThrow('useEverythingAIContext must be used within EverythingAIProvider')

    consoleSpy.mockRestore()
  })
})

describe('exports', () => {
  it('should export useEverythingAI hook', () => {
    expect(useEverythingAI).toBeDefined()
    expect(typeof useEverythingAI).toBe('function')
  })

  it('should export EverythingAIProvider component', () => {
    expect(EverythingAIProvider).toBeDefined()
    expect(typeof EverythingAIProvider).toBe('function')
  })

  it('should export useEverythingAIContext hook', () => {
    expect(useEverythingAIContext).toBeDefined()
    expect(typeof useEverythingAIContext).toBe('function')
  })
})