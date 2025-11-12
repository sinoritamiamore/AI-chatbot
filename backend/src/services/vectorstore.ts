/**

Simple in-memory document store for demo. Stores docs in memory with basic token set.

For production, replace with real embeddings & vector DB (Pinecone / Supabase / FAISS).
*/

import fs from 'fs';
import path from 'path';

type Doc = { id: string; text: string; tokens: Set<string> };

const docs: Doc[] = [];

export function loadDemoDocs() {
const demoDir = path.join(__dirname, '..', '..', 'data', 'resources');
if (!fs.existsSync(demoDir)) return;
const files = fs.readdirSync(demoDir);
files.forEach((f) => {
const text = fs.readFileSync(path.join(demoDir, f), 'utf-8');
const tokens = new Set(text.toLowerCase().split(/\W+/).filter(Boolean));
docs.push({ id: f, text, tokens });
});

// also load faqs as small docs
const faqsPath = path.join(__dirname, '..', '..', 'data', 'demo', 'faqs.json');
if (fs.existsSync(faqsPath)) {
const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));
faqs.forEach((fq: any, idx: number) => {
const text = ${fq.question}\n\n${fq.answer};
const tokens = new Set(text.toLowerCase().split(/\W+/).filter(Boolean));
docs.push({ id: faq-${idx}, text, tokens });
});
}
}

export function findTopK(query: string, k = 3) {
const qtokens = new Set(query.toLowerCase().split(/\W+/).filter(Boolean));
const scored = docs.map((d) => {
let score = 0;
qtokens.forEach((t) => { if (d.tokens.has(t)) score++; });
return { doc: d, score };
});
scored.sort((a, b) => b.score - a.score);
return scored.slice(0, k).filter(s => s.score > 0).map(s => s.doc);
}

export function getAllDocs() {
return docs;
}
