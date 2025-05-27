import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsInt()
  cityId: number;

  @IsString()
  cep: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  @IsOptional()
  complement?: string;
}
