import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// extender de Document para que sea un documento de mongoose
// @Schema() definir que es un schema de base de datos
@Schema()
export class Pokemon extends Document {
  // id: string // Mongo me lo da

  // @Prop() definir que es una propiedad de la base de datos
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  // @Prop() definir que es una propiedad de la base de datos
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// crear el schema de mongoose, define el modelo de la base de datos
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
