// main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const viewsPath = join(__dirname, '../public/views');
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

/*   app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public/css'));
  app.useStaticAssets(join(__dirname, '..', 'public/js'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials')); */
  app.enableCors();

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(
    require('node-sass-middleware')({
      src: join(__dirname, '..', 'public/css'),
      dest: join(__dirname, '..', 'public/css'),
      debug: true,
      outputStyle: 'compressed',
    }),
  );


  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
