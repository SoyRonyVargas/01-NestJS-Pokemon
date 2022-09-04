import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ValidateMongoIdPipe } from '../common/pipes/validate-mongo-id.pipe';
import { PaginationDTO } from '../common/dto/PaginationDTO';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { ObjectId } from 'mongodb';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get('all')
  findAll(
    @Query() query: PaginationDTO,
  ) {
    return this.pokemonService.findAll(query);
  }

  @Get()
  findOne(
    @Query( 'id' , ValidateMongoIdPipe ) id: ObjectId,
    @Query( 'name' ) name: string
  ) {
    
    return this.pokemonService.findOne({
      id,
      name
    });

  }

  @Patch(':id')
  update(
    @Param( 'id' , ValidateMongoIdPipe ) id: ObjectId,
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update( id, updatePokemonDto);
  }

  @Delete(':id')
  remove( @Param( 'id' , ValidateMongoIdPipe ) id: ObjectId) {
    return this.pokemonService.remove(id);
  }
}
