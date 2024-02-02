import { FastifyInstance } from 'fastify';

import { decodeTokenFromHeader } from '@/utils/authToken';

export const authenticateTokenOnRequest = (app: FastifyInstance) => {
	app.addHook('onRequest', (request, reply, done) => {
		const isHealthCheck = /health/i.test(request.url);
		if (isHealthCheck) {
			return done();
		}

		const token = decodeTokenFromHeader(request);
		if (!token) {
			return reply.status(400).send({ message: 'Token required' });
		}

		const isPreflight = /options/i.test(request.method);
		if (isPreflight) {
			return reply.send();
		}

		done();
	});
};
