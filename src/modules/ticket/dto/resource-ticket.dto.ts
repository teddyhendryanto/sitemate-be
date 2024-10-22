import { Ticket } from '../../../databases/entities';

export class ResourceTicketDto {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  static fromEntity(entity: Ticket): ResourceTicketDto {
    const result = new ResourceTicketDto();
    result.id = entity.id;
    result.userId = entity.userId;
    result.title = entity.title;
    result.description = entity.description;
    result.createdAt = entity.createdAt;
    result.updatedAt = entity.updatedAt;
    result.deletedAt = entity.deletedAt;

    return result;
  }

  static fromEntities(entities: Ticket[]): ResourceTicketDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
