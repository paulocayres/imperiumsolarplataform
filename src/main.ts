import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs'

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public/css'));
  app.useStaticAssets(join(__dirname, '..', 'public/js'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.enableCors();

  app.use(
    require('node-sass-middleware')({
      src: join(__dirname, '..', 'public/css'),
      dest: join(__dirname, '..', 'public/css'),
      debug: true,
      outputStyle: 'compressed',
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
