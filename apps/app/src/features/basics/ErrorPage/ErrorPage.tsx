import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { Button, Column, Container, Row, Typography, useSnackbar, useTheme } from 'ui';

import { LottiePlayer } from '@/components/LottiePlayer/LottiePlayer';
import { useDispatch } from '@/core/store/hooks';
import { setIsAuthenticating } from '@/features/authentication/athenticationSlice';
import { authenticateAccount } from '@/features/settings/account/accountActions';
import animation from './no-connection.json';

const PageContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 15vh;
	position: fixed;
	width: 100vw;
`;

export const ErrorPage: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const theme = useTheme();
	const [isRetrying, setIsRetrying] = useState(false);

	useEffect(() => {
		dispatch(setIsAuthenticating(false));

		return () => {
			dispatch(setIsAuthenticating(true));
			dispatch(authenticateAccount());
		};
	}, []);

	const handleTryAgain = async () => {
		setIsRetrying(true);
		const authenticateResponse = await dispatch(authenticateAccount());
		const fulfilled = authenticateAccount.fulfilled.match(authenticateResponse);
		if (fulfilled) {
			location.pathname = '/';
		} else {
			setIsRetrying(false);
			snackbar.error('Still no luck. Try again shortly.');
		}
	};

	return (
		<PageContainer>
			<Container fixedWidth={theme.breakpoints.md}>
				<Row align="center" justify="center">
					<LottiePlayer src={JSON.stringify(animation)} />
					<Column>
						<Typography variant="h6">
							It looks like you&apos;re having trouble connecting to our servers.
						</Typography>
						<Typography variant="body">Try again shortly.</Typography>

						<Button disabled={isRetrying} loading={isRetrying} onClick={handleTryAgain}>
							Try again
						</Button>
					</Column>
				</Row>
			</Container>
		</PageContainer>
	);
};
