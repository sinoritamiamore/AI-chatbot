import { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';

const infoRoutes: FastifyPluginAsync = async (fastify, opts) => {
fastify.get('/info', async (request, reply) => {
// load demo faqs from data directory
const faqsPath = path.join(__dirname, '..', '..', 'data', 'demo', 'faqs.json');
const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));
const configPath = path.join(__dirname, '..', '..', 'config', 'site.config.json');
const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
return { site: siteConfig, faqs };
});
};
export default infoRoutes;
