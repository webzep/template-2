import { EndPoints } from 'common';
import { FastifyInstance } from 'fastify';

import { authenticate } from '@/routes/accounts/handlers/authenticate';
import { createAccount } from '@/routes/accounts/handlers/create-account';
import { getAccountById } from '@/routes/accounts/handlers/get-account-by-id';
import { updateAccountById } from '@/routes/accounts/handlers/update-account-by-id';

export const registerAccountRoutes = (app: FastifyInstance) => {
	app.get(EndPoints.ACCOUNTS_BY_ID, getAccountById);
	app.patch(EndPoints.ACCOUNTS_BY_ID, updateAccountById);
	app.post(EndPoints.ACCOUNTS_AUTHENTICATE, authenticate);
	app.put(EndPoints.ACCOUNTS, createAccount);
};
