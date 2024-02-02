import styled from '@emotion/styled';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Avatar, Card, Padding, Space, Typography, useSnackbar } from 'ui';

import { firebaseAuth } from '@/core/configs/firebase';
import { useDispatch, useSelector } from '@/core/store/hooks';
import { makeUpdateEntityOptions } from '@/features/settings/account/accountHelpers';
import {
	ProfileState,
	setAccount,
} from '@/features/settings/account/accountSlice';
import { EditablePropertyRow } from '@/features/settings/account/profile/EditablePropertyRow';
import { updateAccount } from '../accountActions';
import { cloneObject } from '@/utils/helpers';

const ColorStrip = styled.div`
	background-color: #fcb63e;
	height: 60px;
	width: 100%;
`;

const ProfilePicture = styled.div`
	margin-left: 30px;
	margin-top: -25px;
`;

export const ProfileCard: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const account = useSelector((state) => state.account);
	const [profileUpdate, setProfileUpdate] = useState<ProfileState | null>(
		account.profile
	);

	const handleCancelClicked = () => setProfileUpdate(account.profile);

	const handleFieldChanged =
		(field: keyof ProfileState) => (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target as HTMLInputElement;
			setProfileUpdate((prev) => ({ ...prev, [field]: value.trim() }));
		};

	const handleFailedToUpdate = () =>
		snackbar.error('Failed to update profile');

	const handleSaveClicked = async () => {
		const payload = cloneObject(account);
		payload.profile = profileUpdate;
		dispatch(setAccount(payload));

		try {
			const response = await dispatch(
				updateAccount(makeUpdateEntityOptions(payload))
			);
			if (updateAccount.fulfilled.match(response)) {
				snackbar.success('Profile successfully updated');
			} else {
				handleFailedToUpdate();
			}
		} catch {
			handleFailedToUpdate();
		}
	};

	return (
		<Fragment>
			<Typography variant="h6">Profile</Typography>
			<Card themeBgColor="bg3" padding="0">
				<ColorStrip />
				<ProfilePicture>
					<Avatar src={firebaseAuth.currentUser?.photoURL} />
				</ProfilePicture>
				<Padding multiplier={4}>
					<Card>
						<EditablePropertyRow
							inputValue={profileUpdate.givenName}
							label="Given name"
							onCancel={handleCancelClicked}
							onChange={handleFieldChanged('givenName')}
							onSubmit={handleSaveClicked}
							existingValue={account.profile.givenName}
						/>
						<Space vertical size="12px" />
						<EditablePropertyRow
							inputValue={profileUpdate.surname}
							label="Family name"
							onCancel={handleCancelClicked}
							onChange={handleFieldChanged('surname')}
							onSubmit={handleSaveClicked}
							existingValue={account.profile.surname}
						/>
						<Space vertical size="12px" />
						<EditablePropertyRow
							descriptionOverride="We'll use this email address to contact you when required. This will not change the email address you use to sign in."
							inputValue={profileUpdate.email}
							label="Email"
							onCancel={handleCancelClicked}
							onChange={handleFieldChanged('email')}
							onSubmit={handleSaveClicked}
							existingValue={account.profile.email}
						/>
					</Card>
				</Padding>
			</Card>
		</Fragment>
	);
};
