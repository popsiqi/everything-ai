// tests/types.test.ts
import { describe, it, expectTypeOf } from 'vitest'
import type { Options, ReplacementRule, Theme, PluginName } from '../src/types'

describe('types', () => {
  it('Options should have correct structure', () => {
    expectTypeOf<Options>().toMatchTypeOf<{
      plugins?: PluginName[]
      theme?: string
      customReplacements?: Record<string, string>
    }>()
  })

  it('ReplacementRule should have from and to', () => {
    expectTypeOf<ReplacementRule>().toMatchTypeOf<{
      from: string
      to: string | string[]
    }>()
  })
})