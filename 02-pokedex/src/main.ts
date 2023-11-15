import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // crea una instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // agregar prefijo a todas las rutas
  app.setGlobalPrefix('api/v2');

  // indica que la aplicación usará un ValidationPipe para validar los datos de entrada
  /* whitelist: true indica que solo se aceptarán los datos que estan definidos en el DTO,
  los demás serán ignorados */
  /* forbidNonWhitelisted: true indica que si se envía un dato que no está definido en el DTO,
  se lanzará un error */
  /* transform: true transformar los dtos en el tipo de dato que estamos esperando */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // escucha en el puerto indicado
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${process.env.PORT}`);
}
// ejecuta la funcion bootstrap para levantar la aplicación
bootstrap();
