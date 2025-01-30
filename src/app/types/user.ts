import type { Role } from './role';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface UserWithToken extends User {
  token: string;
}
