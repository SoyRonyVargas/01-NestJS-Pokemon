import {
    IsNumber,
    IsOptional,
    Min
} from 'class-validator'

export class PaginationDTO {
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number
    
    @IsOptional()
    @IsNumber()
    offset?: number

}