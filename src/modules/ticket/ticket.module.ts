import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../databases/entities';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  exports: [TicketService],
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
