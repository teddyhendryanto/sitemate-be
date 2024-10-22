import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { Ticket } from '../../databases/entities';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>) {}

  async delete(userId: string, id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id, userId },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    ticket.deletedAt = new Date();

    return this.ticketRepository.save(ticket);
  }

  async detail(userId: string, id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id, userId },
    });

    if (!ticket) throw new NotFoundException('Ticket not found.');

    return ticket;
  }

  async findByAttribute(findOption: FindManyOptions<Ticket>): Promise<Ticket[]> {
    return await this.ticketRepository.find(findOption);
  }

  async findOneByAttribute(findOption: FindOneOptions<Ticket>): Promise<Ticket> {
    return await this.ticketRepository.findOne(findOption);
  }

  async list(userId: string): Promise<Ticket[]> {
    return this.findByAttribute({
      where: { userId },
      order: { createdAt: 'desc' },
    });
  }

  async create(userId: string, createTicketInput: CreateTicketDto): Promise<Ticket> {
    const { title, description } = createTicketInput;

    const ticketExists = await this.ticketRepository.findOne({
      where: { userId, title },
    });

    if (ticketExists) throw new BadRequestException('Ticket name exists.');

    const ticket = this.ticketRepository.create({
      title,
      description,
      userId,
    });

    return this.ticketRepository.save(ticket);
  }

  async update(userId: string, id: string, updateTicketInput: UpdateTicketDto): Promise<Ticket> {
    const { title, description } = updateTicketInput;

    const ticket = await this.ticketRepository.findOne({
      where: { userId, id },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    if (title) {
      const ticketExists = await this.ticketRepository.findOne({
        where: { userId, id: Not(id), title },
      });

      if (ticketExists) throw new BadRequestException('Ticket name exists.');
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;

    try {
      return this.ticketRepository.save(ticket);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update ticket due to ${error}`);
    }
  }
}
