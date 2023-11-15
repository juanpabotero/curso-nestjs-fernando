import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      // cargar las variables de entorno con la configuracion de EnvConfiguration
      load: [EnvConfiguration],
      // validar las variables de entorno con la configuracion de JoiValidationSchema
      validationSchema: JoiValidationSchema,
    }),

    // servir contenido estatico, se debe instalar npm i @nestjs/serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // indicar la ruta de la base de datos
    // solo hay un forRoot, los demas son forFeature
    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
