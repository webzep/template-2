import styled from '@emotion/styled';
import { FC } from 'react';
import { Button, Divider, MaterialIcon, Padding, Space, Typography } from 'ui';

import { firebaseAuth } from '@/core/configs/firebase';
import { PathNames } from '@/core/configs/paths';
import { SettingsTabItem } from '@/features/settings/components/SettingsTabItem';

const TabsContainer = styled.div`
	align-items: flex-end;
	background-color: ${({ theme }) => theme.palette.bg2};
	display: flex;
	flex: 1 0 220px;
	flex-direction: column;
	padding-top: 24px;
	max-height: 100%;
	overflow: scroll;
`;

const TabsGroup = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 200px;
`;

const Subtitle = styled(Typography)`
	margin-left: 16px;
	margin-top: 8px;
`;

export const SettingsTabGroup: FC = () => {
	const handleSignOutClicked = () => firebaseAuth.signOut();

	return (
		<TabsContainer>
			<TabsGroup>
				<Padding multiplier={6}>
					<Subtitle variant="overline">Account</Subtitle>
					<SettingsTabItem label="Profile" route={`/${PathNames.SETTINGS}/${PathNames.PROFILE}`} />
					<SettingsTabItem label="Preferences" route={`/${PathNames.SETTINGS}/${PathNames.PREFERENCES}`} />
					<Divider />
					<Subtitle variant="overline">Resources</Subtitle>
					<SettingsTabItem label="Privacy Policy" route={`/${PathNames.PRIVACY_POLICY}`} />
					<SettingsTabItem label="Terms of Service" route={`/${PathNames.TERMS_OF_SERVICE}`} />
					<SettingsTabItem label="Support" route={`/${PathNames.SUPPORT}`} />
					<Divider />
					<Button onClick={handleSignOutClicked} variant="text">
						<span>Sign Out</span>
						<Space size="12px" />
						<MaterialIcon icon="logout" />
					</Button>
				</Padding>
			</TabsGroup>
		</TabsContainer>
	);
};
