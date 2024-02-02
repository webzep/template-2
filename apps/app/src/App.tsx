import { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, SnackbarProvider, ThemeProvider } from 'ui';

import { FullScreenLoader } from '@/components/FullScreenLoader/FullScreenLoader';
import { useFirebaseAuth } from '@/core/hooks/useFirebaseAuth';
import { SiteRouter } from '@/core/routes/SiteRouter';
import { useSelector } from '@/core/store/hooks';
import { store } from '@/core/store/store';
import { appNameTitleCase } from '@/core/configs/constants';

const App: FC = () => {
	const { preferences } = useSelector((state) => state.account);
	useFirebaseAuth();

	return (
		<ThemeProvider
			theme={createTheme({
				mode: preferences.theme,
				rootFontSize: preferences.fontSize,
			})}
		>
			<SnackbarProvider>
				<Helmet>
					<title>{appNameTitleCase}</title>
				</Helmet>
				<SiteRouter />
			</SnackbarProvider>
			<FullScreenLoader />
		</ThemeProvider>
	);
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
