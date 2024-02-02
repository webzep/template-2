import { AccountResponseDto, CreateAccountRequestDto } from 'common';

import {
	createNewAccount,
	createNewPreferences,
	createNewProfile,
} from '@/entity/Account';
import { PutRequestHandler } from '@/types/requestTypes';
import { accountsCollection } from '@/services/firebase';

export const createAccount: PutRequestHandler<
	CreateAccountRequestDto,
	AccountResponseDto
> = async (request, reply) => {
	const { id, profile } = request.body;

	const preferences = createNewPreferences();

	const newProfile = createNewProfile(
		profile.email,
		profile.givenName,
		profile.surname,
		profile.displayName
	);

	const account = createNewAccount(id, newProfile, preferences);

	if (account) {
		const accountRef = accountsCollection.doc(id);

		accountRef.set(account).catch((error) => {
			console.error(error);

			return reply.status(500).send();
		});
	}

	return reply.status(201).send({ data: account });
};
