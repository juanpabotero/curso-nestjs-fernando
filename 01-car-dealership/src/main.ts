import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  // crea una instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // indica que la aplicación usará un ValidationPipe para validar los datos de entrada
  /* whitelist: true indica que solo se aceptarán los datos que estan definidos en el DTO,
  los demás serán ignorados */
  /* forbidNonWhitelisted: true indica que si se envía un dato que no está definido en el DTO
  se lanzará un error */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // escucha en el puerto 3000
  await app.listen(3000);
}
// ejecuta la funcion bootstrap para levantar la aplicación
bootstrap();
