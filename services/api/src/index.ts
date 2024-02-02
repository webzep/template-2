import 'reflect-metadata';
import '@/services/firebase';

import createFastifyInstance from 'fastify';

import { environment } from '@/configs/environment';
import { applyCorsOnRequest } from '@/hooks/applyCorsOnRequest';
import { authenticateTokenOnRequest } from '@/hooks/authenticateTokenOnRequest';
import { registerRoutes } from '@/routes/register-routes';

const app = createFastifyInstance();
applyCorsOnRequest(app);
authenticateTokenOnRequest(app);
registerRoutes(app);

const host = '0.0.0.0';
const port = Number(environment.PORT);
app.listen({ host, port }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Listening on ${address}`);
});
