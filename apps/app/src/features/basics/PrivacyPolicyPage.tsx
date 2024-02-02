import { FC, Fragment } from 'react';
import { Card, Typography } from 'ui';

import { appNameTitleCase } from '@/core/configs/constants';

export const PrivacyPolicyPage: FC = () => {
	return (
		<Fragment>
			<Typography variant="h2">Privacy Policy</Typography>
			<Card>
				<Typography variant="body">
					{appNameTitleCase} is a web application that allows users to ________ with each other. This Privacy
					Policy describes how your personal information is collected, used, and shared when you...
				</Typography>
			</Card>
		</Fragment>
	);
};
