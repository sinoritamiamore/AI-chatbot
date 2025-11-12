import Fastify from 'fastify';
import cors from 'fastify-cors';
import path from 'path';
import fastifyStatic from 'fastify-static';
import infoRoutes from './routes/info';
import calendarRoutes from './routes/calendar';
import resourcesRoutes from './routes/resources';
import chatRoutes from './routes/chat';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = Fastify({ logger: true });

server.register(cors, { origin: true });
server.register(fastifyStatic, {
root: path.join(__dirname, '..', 'public'),
prefix: '/resources/',
});


// register routes
server.register(infoRoutes, { prefix: '/api' });
server.register(calendarRoutes, { prefix: '/api' });
server.register(resourcesRoutes, { prefix: '/api' });
server.register(chatRoutes, { prefix: '/api' });

const start = async () => {
try {
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
await server.listen({ port, host: '0.0.0.0' });
console.log(Backend ready at http://localhost:${port});
} catch (err) {
server.log.error(err);
process.exit(1);
}
};

start();
