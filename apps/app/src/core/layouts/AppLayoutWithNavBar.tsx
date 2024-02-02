import styled from '@emotion/styled';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { Container, Padding } from 'ui';

import { appBarHeight } from '@/core/configs/constants';

const AppLayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
`;

const SectionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	margin-top: ${appBarHeight}px;
	max-width: 100vw;
	overflow: scroll;
	width: 100vw;
`;

type AppLayoutWithNavBarProps = {
	appbar?: React.ReactNode;
};

export const AppLayoutWithNavBar: FC<AppLayoutWithNavBarProps> = ({ appbar }) => {
	return (
		<AppLayoutContainer>
			{appbar}
			<Padding multiplier={8}>
				<SectionsContainer>
					<Container>
						<Outlet />
					</Container>
				</SectionsContainer>
			</Padding>
		</AppLayoutContainer>
	);
};
