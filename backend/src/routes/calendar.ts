import { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';

const calendarRoutes: FastifyPluginAsync = async (fastify, opts) => {
fastify.get('/calendar', async (request, reply) => {
const calendarPath = path.join(__dirname, '..', '..', 'data', 'demo', 'calendar.json');
const calendar = JSON.parse(fs.readFileSync(calendarPath, 'utf-8'));
return { events: calendar };
});
};

export default calendarRoutes;
