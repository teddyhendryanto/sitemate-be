import { AuthModule } from '../modules/auth/auth.module';
import { BlogModule } from '../modules/blog/blog.module';

export const routes = [
  {
    path: 'api',
    children: [
      { path: 'auth', module: AuthModule },
      { path: 'blogs', module: BlogModule },
    ],
  },
];
