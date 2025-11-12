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
