import { FastifyInstance } from 'fastify';

import { corsWhitelistMap } from '@/configs/corsWhitelist';
import { environment } from '@/configs/environment';

export const applyCorsOnRequest = (app: FastifyInstance) => {
	app.addHook('onRequest', (request, reply, done) => {
		reply.header('Access-Control-Allow-Headers', '*');
		reply.header('Access-Control-Allow-Methods', '*');
		reply.header('Access-Control-Max-Age', '3600');
		const allowCors = (url = '*') => reply.header('Access-Control-Allow-Origin', url);

		const origin = request.headers.origin ?? '';
		const whitelistItems = corsWhitelistMap[environment.ENVIRONMENT];
		if (!whitelistItems) {
			allowCors();
		} else if (whitelistItems.some((item) => item.includes(origin))) {
			allowCors(origin);
		}

		const isPreflight = /options/i.test(request.method);
		if (isPreflight) {
			return reply.send();
		}

		done();
	});
};
