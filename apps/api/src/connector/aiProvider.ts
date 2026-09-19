/**
 * Connector stub for external AI providers (e.g. Anthropic Claude, OpenAI).
 * 
 * TODO: When ready to connect to a real LLM API:
 * 1. Set the AI_API_KEY via `npx wrangler secret put AI_API_KEY` (or in .env for local).
 * 2. Implement the call below using `fetch('https://api.anthropic.com/v1/messages', ...)`.
 */

export interface AIProviderOptions {
  apiKey?: string;
  systemPrompt?: string;
  maxTokens?: number;
}

export async function callAIProvider(
  message: string,
  options: AIProviderOptions = {}
): Promise<string | null> {
  if (!options.apiKey) {
    // No API key provided, fall back to rule-based engine
    return null;
  }

  // Example placeholder for future LLM integration:
  /*
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': options.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: options.maxTokens || 1024,
      system: options.systemPrompt || 'You are an educational and career guidance mentor in Lao language...',
      messages: [{ role: 'user', content: message }]
    })
  });
  const data = await response.json();
  return data.content?.[0]?.text ?? null;
  */

  return null;
}
