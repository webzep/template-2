import {
	AccountResponseDto,
	AccountType,
	UpdateAccountRequestDto,
} from 'common';

import { Account } from '@/entity/Account';
import { PatchRequestHandler } from '@/types/requestTypes';
import { decodeTokenFromHeader } from '@/utils/authToken';
import { accountsCollection } from '@/services/firebase';

export const updateAccountById: PatchRequestHandler<
	UpdateAccountRequestDto,
	AccountResponseDto
> = async (request, reply) => {
	const { id } = request.params as { id: string };
	const {
		forceSignOut,
		hasAcceptedTerms,
		preferences,
		profile,
		role,
		status,
	} = request.body;

	console.log(JSON.stringify(request.body, null, 2));

	// Check target account exists
	const account = await accountsCollection
		.doc(id)
		.get()
		.then((snapshot) => snapshot.data() as Account);

	if (!account) {
		return reply.status(404).send({ message: 'Target account not found' });
	}

	// Check account requesting to make the change exists
	const { uid: requestingAccountId } = await decodeTokenFromHeader(request);
	const requestingAccount = await accountsCollection
		.doc(requestingAccountId)
		.get()
		.then((snapshot) => snapshot.data() as Account);

	if (!requestingAccount) {
		return reply
			.status(404)
			.send({ message: 'Requesting account not found' });
	}

	// Make changes if authorised
	const isAdmin = [AccountType.ADMIN, AccountType.OWNER].includes(
		requestingAccount.role
	);
	const requestingToUpdateRole = role && role !== account.role;
	const requestingToUpdateStatus = status && status !== account.status;
	const unauthorisedTryingToChangeOwner =
		requestingAccount.role !== AccountType.OWNER &&
		account.role === AccountType.OWNER;
	if (requestingToUpdateRole || requestingToUpdateStatus) {
		if (isAdmin && !unauthorisedTryingToChangeOwner) {
			account.role = role ?? account.role;
			account.status = status ?? account.status;
		} else {
			return reply.status(403).send({ message: 'Not authorised' });
		}
	}

	account.dateUpdated = new Date().toISOString();
	account.forceSignOut = forceSignOut ?? account.forceSignOut;
	account.hasAcceptedTerms = hasAcceptedTerms ?? account.hasAcceptedTerms;

	const curPrefs = account.preferences;
	curPrefs.fontSize = preferences?.fontSize ?? curPrefs.fontSize;
	curPrefs.theme = preferences?.theme ?? curPrefs.theme;

	const curProfile = account.profile;
	curProfile.displayName = profile?.displayName ?? curProfile.displayName;
	curProfile.email = profile?.email ?? curProfile.email;
	curProfile.givenName = profile?.givenName ?? curProfile.email;
	curProfile.surname = profile?.surname ?? curProfile.email;

	await accountsCollection
		.doc(account.id)
		.update(account)
		.catch((error) => {
			console.error(error);

			return reply.status(500).send({ message: 'Internal server error' });
		});

	return reply.status(200).send({ data: account });
};
