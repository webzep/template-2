import { Environments } from 'common';

export const corsWhitelistMap: Record<Environments, string[] | null> = {
	[Environments.DEVELOPMENT]: null,
	[Environments.PRODUCTION]: ['https://template-2-app.vercel.app/'],
};
