import { AuthModule } from '../modules/auth/auth.module';
import { TicketModule } from '../modules/ticket/ticket.module';

export const routes = [
  {
    path: 'api',
    children: [
      { path: 'auth', module: AuthModule },
      { path: 'tickets', module: TicketModule },
    ],
  },
];
