import { Blog } from '../../../databases/entities';

export class ResourceBlogDto {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  static fromEntity(entity: Blog): ResourceBlogDto {
    const result = new ResourceBlogDto();
    result.id = entity.id;
    result.userId = entity.userId;
    result.title = entity.title;
    result.description = entity.description;
    result.createdAt = entity.createdAt;
    result.updatedAt = entity.updatedAt;
    result.deletedAt = entity.deletedAt;

    return result;
  }

  static fromEntities(entities: Blog[]): ResourceBlogDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
