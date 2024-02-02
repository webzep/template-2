import { FastifyRequest } from 'fastify';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export const decodeTokenFromHeader = async (request: FastifyRequest): Promise<DecodedIdToken> => {
	const bearerToken = request.headers?.authorization;
	const encodedToken = bearerToken?.split(' ')[1] ?? '';

	const decodedToken = await auth()
		.verifyIdToken(encodedToken)
		.then((decodedToken) => decodedToken);

	return decodedToken;
};
