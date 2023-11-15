import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// un pipe permite transformar los datos
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // value es el valor que recibe el pipe
  // metadata son los metadatos de la peticion
  transform(value: string, metadata: ArgumentMetadata) {
    // isValidObjectId valida si es un id de mongo
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }

    return value;
  }
}
