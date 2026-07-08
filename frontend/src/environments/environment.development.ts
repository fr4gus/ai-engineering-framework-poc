import { FirebaseOptions } from 'firebase/app';

export const environment: {
  readonly production: boolean;
  readonly apiBaseUrl: string;
  readonly firebase: FirebaseOptions;
} = {
  production: false,
  apiBaseUrl: '/api/v1',
  firebase: {
    apiKey: 'local-firebase-api-key',
    authDomain: 'local-firebase-auth-domain',
    projectId: 'local-firebase-project-id',
    appId: 'local-firebase-app-id'
  }
};
