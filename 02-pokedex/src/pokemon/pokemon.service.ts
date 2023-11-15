import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    // inyectar el modelo de mongoose
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    // obtener el valor de la variable de entorno defaultLimit
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  // las consultas a la base de datos son asincronas, por eso se usa async
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      // insertar en la base de datos
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    // limit indica el número de registros que se van a mostrar
    // skip indica el número de registros que se van a saltar
    // sort indica el ordenamiento, 1 ascendente, -1 descendente, en este caso, por la columna no
    // select('-__v') indica que no se incluya el campo __v en la respuesta
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  // las consultas a la base de datos son asincronas, por eso se usa async
  async findOne(term: string) {
    let pokemon: Pokemon;

    // buscar por numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // buscar por MongoID
    // isValidObjectId valida si es un id de mongo
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // buscar por Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }

  // las consultas a la base de datos son asincronas, por eso se usa async
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      // actualizar en la base de datos
      // en este caso se ejecuta desde pokemon y no desde el modelo porq
      // ya se buscó el pokemon y devuelve un objeto de mongoose
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }

  // manejar los errores de la base de datos
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
