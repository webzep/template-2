import { AccountResponseDto } from 'common';

import { Account } from '@/entity/Account';
import { GetRequestHandler } from '@/types/requestTypes';
import { accountsCollection } from '@/services/firebase';

export const getAccountById: GetRequestHandler<AccountResponseDto> = async (
	request,
	reply
) => {
	const { id } = request.params;

	const account = await accountsCollection
		.doc(id)
		.get()
		.then((snapshot) => snapshot.data() as Account);

	if (account) {
		return reply.status(200).send({ data: account });
	}

	return reply.status(404).send({ message: 'Account not found' });
};
