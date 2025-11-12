/**

Simple seeder: creates the SQLite DB and inserts no users (demo).

Also copies the demo resource placeholders into backend/public/resources if not present.
*/
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
console.log('Seeding demo data...');
// ensure public/resources exists
const publicResources = path.join(__dirname, '..', 'public', 'resources');
if (!fs.existsSync(publicResources)) fs.mkdirSync(publicResources, { recursive: true });

const demoResourcesDir = path.join(__dirname, '..', '..', 'data', 'resources');
if (fs.existsSync(demoResourcesDir)) {
const files = fs.readdirSync(demoResourcesDir);
for (const f of files) {
const src = path.join(demoResourcesDir, f);
const dest = path.join(publicResources, f.replace('.txt', '.pdf')); // instruct user to replace
if (!fs.existsSync(dest)) {
// copy placeholder content (as .txt for demo) but give .pdf extension to simulate resource
const content = fs.readFileSync(src, 'utf-8');
fs.writeFileSync(dest, content);
console.log(Copied demo resource to ${dest});
}
}
}
// run prisma migrate? We'll ensure the DB exists by touching it
const dbPath = path.join(__dirname, '..', 'dev.db');
if (!fs.existsSync(dbPath)) {
fs.writeFileSync(dbPath, '');
console.log('Created empty dev.db (Prisma will populate on first run).');
}
console.log('Seed complete.');
await prisma.$disconnect();
}

seed().catch((e) => {
console.error(e);
process.exit(1);
});
