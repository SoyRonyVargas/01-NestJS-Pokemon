import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from './handlers/handleCreatePokemon';
import { PaginationDTO } from '../common/dto/PaginationDTO';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { GetPokemonQuery } from './types';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    
    try 
    { 
      
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      
      return pokemon

    } 
    catch (error){ handleError(error) }

  }

  async findAll( query : PaginationDTO ) {

    const { 
      limit = 10
    } = query

    const pokemons = await this.pokemonModel.find()
      .limit(limit)

    return pokemons

  }

  async findOne( query: GetPokemonQuery ) {
    
      let pokemon : Pokemon;

      if( query.id )
      {
        pokemon = await this.pokemonModel.findById(query.id! , { __v: 0 })
      }
      
      if( !pokemon && query.name )
      {
        pokemon = await this.pokemonModel.findOne( { name: query.name } , { __v: 0 })
      }

      if( !pokemon ) throw new NotFoundException('Pokemon not found');

      return pokemon


  }

  async update( id: ObjectId, updatePokemonDto: UpdatePokemonDto) {

    try
    {
    
      const updatedPokemon = await this.pokemonModel.findByIdAndUpdate( id , updatePokemonDto , { new: true })

      return updatedPokemon

    }catch(err){ handleError(err) }

  }

  async remove( id: ObjectId ) {
    
    const deleted = await this.pokemonModel.deleteOne({ _id : id  })
      
    if( deleted.deletedCount === 0 ) throw new BadRequestException(`No se pudo eliminar`);

    return id
   
  }
  
}
