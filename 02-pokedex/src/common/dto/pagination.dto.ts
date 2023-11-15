import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  // validaciones para la propiedad
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  // validaciones para la propiedad
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
