import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';

// indica que este controlador se encargará de las rutas que comiencen con /pokemon
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // indica que este método se encargará de las peticiones POST a la ruta /pokemon
  // @Body() obtener el cuerpo de la petición
  @Post()
  // si se quiere cambiar el codigo de respuesta
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  // indica que este método se encargará de las peticiones GET a la ruta /pokemon
  // si no se especifica el decorador @Get() se asume que es un GET
  // si hay dos métodos con el mismo decorador y la misma ruta, se ejecuta el primero
  // @Query obtiene los queryParams de la url
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  // indica que este método se encargará de las peticiones GET a la ruta /pokemon/:term
  // @Param() obtener el parámetro term de la ruta
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  // indica que este método se encargará de las peticiones PATCH a la ruta /pokemon/:term
  // @Param() obtener el parámetro term de la ruta
  // @Body() obtener el cuerpo de la petición
  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  // indica que este método se encargará de las peticiones DELETE a la ruta /pokemon/:id
  // @Param() obtener el parámetro id de la ruta
  // ParseMongoIdPipe es un pipe personalizado que valida si el id es un id de mongo
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
