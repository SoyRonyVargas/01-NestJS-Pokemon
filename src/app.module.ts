import { PokemonModule } from './pokemon/pokemon.module'
// import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
// import { join } from 'path'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    // ServeStaticModule.forRoot({
    //   rootPath: join( __dirname , '..' , 'public' ),
    //   exclude: ['/api*'],
    // }),
    PokemonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}