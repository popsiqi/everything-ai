// src/themes/gpt.ts
import type { Theme } from '../types'

export const gptTheme: Theme = {
  name: 'gpt',
  replacements: [
    // 英文风格
    { from: /^Loading(\.\.\.)?$/i, to: 'Thinking...' },
    { from: /^Processing(\.\.\.)?$/i, to: 'Computing...' },
    { from: /^Please wait$/i, to: 'Running inference...' },
    { from: /^Waiting for response$/i, to: 'Generating tokens...' },
  ],
  prompts: [
    'Generating tokens...',
    'Running inference...',
    'Next token prediction...',
  ],
}