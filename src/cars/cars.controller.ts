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
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

// indica que este controlador se encargará de las rutas que comiencen con /cars
@Controller('cars')
// indica que este controlador usará un ValidationPipe para validar los datos de entrada
// en este caso se usa un ValidationPipe global en main.ts
// @UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // indica que este método se encargará de las peticiones GET a la ruta /cars
  // si no se especifica el decorador @Get() se asume que es un GET
  // si hay dos métodos con el mismo decorador y la misma ruta, se ejecuta el primero
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  // indica que este método se encargará de las peticiones GET a la ruta /cars/:id
  // @Param() obtener el parámetro id de la ruta
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  // indica que este método se encargará de las peticiones POST a la ruta /cars
  // @Body() obtener el cuerpo de la petición
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  // indica que este método se encargará de las peticiones PATCH a la ruta /cars/:id
  // @Param() obtener el parámetro id de la ruta
  // @Body() obtener el cuerpo de la petición
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  // indica que este método se encargará de las peticiones DELETE a la ruta /cars/:id
  // @Param() obtener el parámetro id de la ruta
  // ParseUUIDPipe convierte el parámetro id en un uuid
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
