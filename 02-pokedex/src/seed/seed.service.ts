import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    // inyectar el modelo de mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    // eliminar todos los registros de la colección
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no }); // [{ name: bulbasaur, no: 1 }]
    });

    // insertar varios registros en la colección
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
