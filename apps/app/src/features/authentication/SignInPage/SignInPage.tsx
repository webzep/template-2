import 'firebaseui/dist/firebaseui.css';

import styled from '@emotion/styled';
import * as firebaseui from 'firebaseui';
import { FC, useEffect, useRef } from 'react';
import { Typography } from 'ui';

import { FullScreenLoader } from '@/components/FullScreenLoader/FullScreenLoader';
import { appNameTitleCase } from '@/core/configs/constants';
import { firebaseAuth, firebaseUIConfig } from '@/core/configs/firebase';
import { useSelector } from '@/core/store/hooks';
import { SignInBackground } from '@/features/authentication/SignInPage/SignInBackground';

const SignInPageContainer = styled.div`
	align-items: center;
	background-color: transparent;
	display: flex;
	flex-direction: column;
	height: 100vh;
	margin-top: 30vh;
	width: 100vw;
`;

/**
 * @docs https://github.com/firebase/firebaseui-web#starting-the-sign-in-flow
 */
export const SignInPage: FC = () => {
	const { isAuthenticating } = useSelector((state) => state.authentication);
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (ref.current) {
			const existingInstance = firebaseui.auth.AuthUI.getInstance();
			if (existingInstance) {
				existingInstance.start('#firebaseui-auth-container', firebaseUIConfig);
			} else {
				const ui = new firebaseui.auth.AuthUI(firebaseAuth);
				ui.start('#firebaseui-auth-container', firebaseUIConfig);
			}
		}
	}, [firebaseAuth.currentUser, ref]);

	return (
		<SignInPageContainer>
			<SignInBackground />
			<Typography fontColor="black" variant="h1">
				{isAuthenticating ? 'Finishing up...' : appNameTitleCase}
			</Typography>
			<div id="firebaseui-auth-container" ref={ref} />

			<FullScreenLoader />
		</SignInPageContainer>
	);
};
