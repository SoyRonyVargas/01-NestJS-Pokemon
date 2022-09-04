import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonService } from '../pokemon/pokemon.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly httpService: HttpService,
  ){}

  async executeSeed(){
    
    const { data } = await this.httpService.axiosRef.get(`https://pokeapi.co/api/v2/pokemon?limit=650`)
    
    let promises = data.results.map( ( result , index ) => {

      const pokemon : CreatePokemonDto = {
        name: result.name,
        no: index
      }
      
      return this.pokemonService.create(pokemon)

    })

    try
    {
      
      await Promise.all(promises)

      return 'executed'

    }
    catch(err)
    {
      throw new BadRequestException(err)
    }

  }

}
