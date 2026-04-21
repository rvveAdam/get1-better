import Anthropic from '@anthropic-ai/sdk'
import type { Message } from '../types/index'


const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function sendMessage(
  messages: Message[],
  systemPrompt: string
): Promise<string> {

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    })

    if (response.content[0].type === 'text') { return response.content[0].text }
    throw new Error('Nieoczekiwany typ odpowiedzi')
   
  } catch (error) {
    throw new Error(`Błąd API: ${error}`)
  }
  
}
