import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);

  //Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Ticket API')
    .setDescription(
      'This is the API for the Ticket service. It allows you to search for skills and get skill details.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3002);
}
bootstrap();
