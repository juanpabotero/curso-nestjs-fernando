import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,

    // definir el modelo de la base de datos
    MongooseModule.forFeature([
      {
        // nombre del modelo, name viene de la extension de Document
        // que se hizo en la entidad, no es la propiedad name de la clase
        name: Pokemon.name,
        // schema de mongoose
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
