/**

Simple RAG: retrieve top docs by keyword overlap, then call LLM adapter to produce answer.
*/

import { findTopK, loadDemoDocs } from './vectorstore';
import { callOpenAI } from './llm-adapter';

loadDemoDocs();

export async function simpleRetrieveAndAnswer(question: string) {
// quick heuristic: if question matches FAQ exactly, return that
const top = findTopK(question, 3);
const sources = top.map(t => t.id);
const context = top.map(t => Document (${t.id}):\n${t.text}).join('\n\n');
const prompt = You are an academic assistant for Mekelle University. Use the context below to answer the question.\n\nCONTEXT:\n${context}\n\nQUESTION:\n${question}\n\nAnswer concisely and include 'Sources:' listing document ids used.;
const text = await callOpenAI(prompt);
return { text, sources };
}
