import { IsInt, IsString, Min, MinLength } from 'class-validator'

export class CreatePokemonDto {
    
    @IsInt()
    @Min(1)
    no: number

    @IsString()
    @MinLength( 2 )
    name: string

}
