import { FirebaseOptions } from 'firebase/app';

export const environment: {
  readonly production: boolean;
  readonly apiBaseUrl: string;
  readonly firebase: FirebaseOptions;
} = {
  production: true,
  apiBaseUrl: '/api/v1',
  firebase: {
    apiKey: '__FIREBASE_API_KEY__',
    authDomain: '__FIREBASE_AUTH_DOMAIN__',
    projectId: '__FIREBASE_PROJECT_ID__',
    appId: '__FIREBASE_APP_ID__'
  }
};
