import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  // validaciones para la propiedad
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  // validaciones para la propiedad
  @IsString()
  @MinLength(1)
  name: string;
}
