/**

LLM adapter: calls OpenAI if key provided, else uses a fallback template.
*/

import OpenAI from 'openai';

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';

export async function callOpenAI(prompt: string) {
if (!OPENAI_KEY) {
// Fallback: echo prompt with a canned prefix
return Demo Answer (no OpenAI key): ${prompt.substring(0, 300)};
}
const client = new OpenAI({ apiKey: OPENAI_KEY });
const res = await client.chat.completions.create({
model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
messages: [{ role: 'user', content: prompt }],
max_tokens: 400
});
return res.choices?.[0]?.message?.content ?? 'No response';
}
