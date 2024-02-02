import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeMode } from 'common';
import { FC } from 'react';
import { Card, Column, MaterialIcon, Row, Typography, useSnackbar } from 'ui';

import { useDispatch, useSelector } from '@/core/store/hooks';
import { updateAccount } from '@/features/settings/account/accountActions';
import { makeUpdateEntityOptions } from '@/features/settings/account/accountHelpers';
import { cloneObject } from '@/utils/helpers';
import { setAccount } from '../accountSlice';

type ThemeCardCss = {
	isSelected: boolean;
};

const ThemeCard = styled(Card)<ThemeCardCss>`
	${({ isSelected, theme }) => {
		return css`
			align-items: center;
			cursor: pointer;
			display: flex;
			flex-direction: row;
			font-size: 50px !important;
			height: 140px;
			justify-content: center;
			margin: 0px 8px 8px 0px;
			outline: ${isSelected && `3px solid ${theme.palette.darkAccent}`};
			width: 180px;

			&:hover {
				outline: ${`3px solid ${theme.palette.brand1}`};
			}
		`;
	}}
`;

type SystemColumnProps = {
	dark?: boolean;
};

const SystemColumn = styled.div<SystemColumnProps>`
	align-items: center;
	background-color: ${({ dark }) => (dark ? '#a3a3f7' : '')};
	display: flex;
	height: 100%;
	justify-content: center;
	padding: ${({ theme }) => `calc(${theme.sizes.padding} * 4)`};
	width: 50%;
`;

export const ThemeTiles: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const account = useSelector((state) => state.account);
	const { preferences } = useSelector((state) => state.account);

	const handleFailedToUpdate = () => snackbar.error('Failed to update theme');

	const handleTileClicked = (mode: ThemeMode) => async () => {
		if (mode !== preferences.theme) {
			const payload = cloneObject(account);
			payload.preferences.theme = mode;
			dispatch(setAccount(payload));

			try {
				const response = await dispatch(
					updateAccount(makeUpdateEntityOptions(payload))
				);
				if (updateAccount.fulfilled.match(response)) {
					snackbar.success('Theme successfully updated');
				} else {
					handleFailedToUpdate();
				}
			} catch {
				handleFailedToUpdate();
			}
		}
	};

	return (
		<Card themeBgColor="bg1">
			<Typography variant="overline">Theme</Typography>
			<Row justify="space-between" wrap>
				<Column align="center">
					<ThemeCard
						isSelected={preferences.theme === ThemeMode.LIGHT}
						onClick={handleTileClicked(ThemeMode.LIGHT)}
					>
						<MaterialIcon
							fontColor="#fcb63e"
							fontSize="80px"
							icon="light_mode"
						/>
					</ThemeCard>
					<Typography variant="overline">Light</Typography>
				</Column>
				<Column align="center">
					<ThemeCard
						bgColor="#a3a3f7"
						isSelected={preferences.theme === ThemeMode.DARK}
						onClick={handleTileClicked(ThemeMode.DARK)}
					>
						<MaterialIcon
							fontColor="#ffffff"
							fontSize="80px"
							icon="dark_mode"
						/>
					</ThemeCard>
					<Typography variant="overline">Dark</Typography>
				</Column>
				<Column align="center">
					<ThemeCard
						isSelected={preferences.theme === ThemeMode.SYSTEM}
						onClick={handleTileClicked(ThemeMode.SYSTEM)}
						padding="0"
					>
						<SystemColumn>
							<MaterialIcon
								fontColor="#fcb63e"
								fontSize="60px"
								icon="light_mode"
							/>
						</SystemColumn>
						<SystemColumn dark>
							<MaterialIcon
								fontColor="#ffffff"
								fontSize="60px"
								icon="dark_mode"
							/>
						</SystemColumn>
					</ThemeCard>
					<Typography variant="overline">System</Typography>
				</Column>
			</Row>
		</Card>
	);
};
