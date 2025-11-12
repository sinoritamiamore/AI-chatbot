import { FastifyPluginAsync } from 'fastify';
import { simpleRetrieveAndAnswer } from '../services/rag';

const chatRoutes: FastifyPluginAsync = async (fastify, opts) => {
fastify.post('/chat', async (request, reply) => {
// expected body: { message: string, sessionId?: string }
const body = request.body as any;
if (!body || !body.message) {
return reply.status(400).send({ error: 'message is required' });
}
const message = String(body.message);
// use rag service to get an answer
const response = await simpleRetrieveAndAnswer(message);
return { answer: response.text, sources: response.sources };
});
};

export default chatRoutes;
