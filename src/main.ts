import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const appName = configService.get<string>('APP_NAME', 'SITEMATE-BE');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: configService.get('NODE_ENV') === 'development',
    }),
  );

  const port = configService.get('PORT');

  await app.listen(port, () => {
    logger.log(`${appName} running on port: ${port}`);
  });
}
bootstrap();
