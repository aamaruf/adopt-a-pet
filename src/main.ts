import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ENV } from './ENV';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ENV.API_PREFIX)
  app.useGlobalPipes(new ValidationPipe());

  // app.use(bodyParser.json({ limit: '50mb' }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const options = new DocumentBuilder()
    .setTitle(ENV.API_TITLE)
    .setDescription(ENV.API_DESC)
    .setVersion(ENV.API_VERSION)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authorization'
    )
    .setBasePath(ENV.API_PREFIX)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(ENV.PORT);
  console.log(`\nAdopt a Pet running on port ==>`, await app.getUrl() + '/docs', `\n`);
}
bootstrap();
