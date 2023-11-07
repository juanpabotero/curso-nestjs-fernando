import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

// indica que este controlador se encargará de las rutas que comiencen con /brands
@Controller('brands')
// indica que este controlador usará un ValidationPipe para validar los datos de entrada
// en este caso se usa un ValidationPipe global en main.ts
// @UsePipes(ValidationPipe)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // indica que este método se encargará de las peticiones POST a la ruta /brands
  // @Body() obtener el cuerpo de la petición
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  // indica que este método se encargará de las peticiones GET a la ruta /brands
  // si no se especifica el decorador @Get() se asume que es un GET
  // si hay dos métodos con el mismo decorador y la misma ruta, se ejecuta el primero
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  // indica que este método se encargará de las peticiones GET a la ruta /brands/:id
  // @Param() obtener el parámetro id de la ruta
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  // indica que este método se encargará de las peticiones PATCH a la ruta /brands/:id
  // @Param() obtener el parámetro id de la ruta
  // @Body() obtener el cuerpo de la petición
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  // indica que este método se encargará de las peticiones DELETE a la ruta /brands/:id
  // @Param() obtener el parámetro id de la ruta
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.remove(id);
  }
}
