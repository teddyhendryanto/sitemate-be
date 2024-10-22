import bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities';

export class SeedDefaultUser1729595175661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = Number(process.env.JWT_SECRET);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash('123456', salt);

    await queryRunner.manager.save(User, {
      name: 'test',
      email: 'test@sitemate.com',
      password: hashed,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: 'test@sitemate.com' });
  }
}
