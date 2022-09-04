import { PokemonModule } from '../pokemon/pokemon.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
    PokemonModule
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
