import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators';
import { User } from '../../databases/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ResourceTicketDto } from './dto/resource-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class TicketController {
  constructor(private blogService: TicketService) {}

  @Get()
  async list(@CurrentUser() user: User): Promise<ResourceTicketDto[]> {
    const result = await this.blogService.list(user?.id);

    return ResourceTicketDto.fromEntities(result);
  }

  @Get(':id/detail')
  async show(@CurrentUser() user: User, @Param('id') id: string): Promise<ResourceTicketDto> {
    const result = await this.blogService.detail(user?.id, id);

    return ResourceTicketDto.fromEntity(result);
  }

  @Post()
  async store(@CurrentUser() user: User, @Body() createTicketDto: CreateTicketDto): Promise<ResourceTicketDto> {
    const result = await this.blogService.create(user?.id, createTicketDto);

    return ResourceTicketDto.fromEntity(result);
  }

  @Put(':id')
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<ResourceTicketDto> {
    const result = await this.blogService.update(user?.id, id, updateTicketDto);

    return ResourceTicketDto.fromEntity(result);
  }

  @Delete(':id')
  async destroy(@CurrentUser() user: User, @Param('id') id: string): Promise<ResourceTicketDto> {
    const result = await this.blogService.delete(user?.id, id);

    return ResourceTicketDto.fromEntity(result);
  }
}
