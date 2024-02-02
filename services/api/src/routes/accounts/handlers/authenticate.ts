import { AccountResponseDto } from 'common';

import { Account } from '@/entity/Account';
import { PostRequestHandler } from '@/types/requestTypes';
import { decodeTokenFromHeader } from '@/utils/authToken';
import { accountsCollection } from '@/services/firebase';

type AuthenticateRequest = {
	token: string;
};

export const authenticate: PostRequestHandler<
	AuthenticateRequest,
	AccountResponseDto
> = async (request, reply) => {
	const { user_id } = await decodeTokenFromHeader(request);

	const account = await accountsCollection
		.doc(user_id)
		.get()
		.then((snapshot) => snapshot.data() as Account)
		.catch(console.log);

	if (!account) {
		return reply.status(200).send({ message: 'Account not found' });
	}

	return reply.status(200).send({ data: account });
};
