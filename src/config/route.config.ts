import { AuthModule } from '../modules/auth/auth.module';

export const routes = [
  {
    path: 'api',
    children: [{ path: 'auth', module: AuthModule }],
  },
];
