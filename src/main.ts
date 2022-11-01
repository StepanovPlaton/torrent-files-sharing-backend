import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const swaggerConfiguration = new DocumentBuilder()
      .setTitle('Torrent files sharing')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(
      app,
      swaggerConfiguration,
    );
    SwaggerModule.setup('/documentation', app, swaggerDocument);

    await app.listen(5000);
  } catch (e) {
    console.log(e);
    await app.listen(5000);
  }
}
bootstrap();
