import { EndPoints } from 'common';
import { FastifyInstance } from 'fastify';

export const registerHealthRoutes = (app: FastifyInstance) => {
	app.get(EndPoints.HEALTH, async (_, reply) => reply.status(200).send({ message: 'OK' }));
};
