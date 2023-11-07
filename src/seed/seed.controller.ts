import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

// indica que este controlador se encargará de las rutas que comiencen con /seed
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  // indica que este método se encargará de las peticiones GET a la ruta /seed
  // si no se especifica el decorador @Get() se asume que es un GET
  // si hay dos métodos con el mismo decorador y la misma ruta, se ejecuta el primero
  @Get()
  runSeed() {
    return this.seedService.populateDB();
  }
}
