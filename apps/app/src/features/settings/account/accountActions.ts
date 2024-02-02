import {
	AccountResponseDto,
	CreateAccountRequestDto,
	EndPoints,
	UpdateAccountRequestDto,
} from 'common';

import {
	createAsyncThunkFetchPatch,
	createAsyncThunkFetchPost,
	createAsyncThunkFetchPut,
} from '@/utils/createAsyncThunkFetch';

export const authenticateAccount = createAsyncThunkFetchPost<
	void,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.ACCOUNTS_AUTHENTICATE,
	},
	typePrefix: 'accounts/authenticateAccount',
});

export const createAccount = createAsyncThunkFetchPut<
	CreateAccountRequestDto,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.ACCOUNTS,
	},
	typePrefix: 'accounts/createAccount',
});

export const updateAccount = createAsyncThunkFetchPatch<
	UpdateAccountRequestDto,
	void,
	AccountResponseDto
>({
	requestConfig: {
		pathName: EndPoints.ACCOUNTS,
	},
	typePrefix: 'accounts/updateAccount',
});
