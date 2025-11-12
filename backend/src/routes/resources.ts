import { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';

const resourcesRoutes: FastifyPluginAsync = async (fastify, opts) => {
fastify.get('/resources', async (request, reply) => {
// scan public/resources directory for files
const resourcesDir = path.join(__dirname, '..', 'public', 'resources');
if (!fs.existsSync(resourcesDir)) {
return { resources: [] };
}
const files = fs.readdirSync(resourcesDir);
const list = files.map((filename) => {
return { id: filename, name: filename, url: /resources/${filename} };
});
return { resources: list };
});

// download is handled by fastify-static registered at /resources/
};

export default resourcesRoutes;
