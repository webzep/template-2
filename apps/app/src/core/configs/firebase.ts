import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

import { environment } from '@/core/configs/environment';
import { PathNames } from '@/core/configs/paths';

const firebaseConfig = {
	apiKey: environment.VITE_FIREBASE_API_KEY,
	appId: environment.VITE_FIREBASE_APP_ID,
	authDomain: `${environment.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	measurementId: environment.VITE_FIREBASE_MEASUREMENT_ID,
	messagingSenderId: environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
	projectId: `${environment.VITE_FIREBASE_PROJECT_ID}`,
	storageBucket: `${environment.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firebaseAnalytics = getAnalytics(firebaseApp);

export const firestore = getFirestore(firebaseApp);

export const firebaseUIConfig: firebaseui.auth.Config = {
	callbacks: {
		signInSuccessWithAuthResult: () => true,
	},
	privacyPolicyUrl: () => window.location.assign(`/${PathNames.PRIVACY_POLICY}`),
	// TODO: Add more sign in options
	signInFlow: 'popup',
	signInOptions: [
		GoogleAuthProvider.PROVIDER_ID,
		EmailAuthProvider.PROVIDER_ID,
		firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
	],
	signInSuccessUrl: `/${PathNames.HOST}`,
	tosUrl: () => window.location.assign(`/${PathNames.TERMS_OF_SERVICE}`),
};
