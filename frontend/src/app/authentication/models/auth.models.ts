export interface AuthenticatedUser {
  readonly uid: string;
  readonly email: string | null;
  readonly displayName: string | null;
}

export interface RegisterCredentials {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}
