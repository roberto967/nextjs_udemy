import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const corsWhiteList = parseCorsWhitelist(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (
      origin: string | undefined, // Isso é do navegador e para proteger o cliente
      callback: (...args: any[]) => void,
    ) => {
      // Requisição sem origin ou que inclui uma origem conhecida
      // por corsWhiteList é permitida
      if (!origin || corsWhiteList.includes(origin)) {
        return callback(null, true); // Permitido
      }

      // Requisições com origin mas que não conhecemos
      // negamos.
      return callback(new Error('Not allowed by CORS'), false);
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true, // Retorna erro se houver propriedades não esperadas
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME!)
    .setDescription('API baseada em curso da Udemy')
    .setVersion(process.env.APP_VERSION!)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
