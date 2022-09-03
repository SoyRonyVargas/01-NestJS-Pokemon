import { BadRequestException } from '@nestjs/common'
import { MongoError } from 'mongodb'
import { Error } from 'mongoose'

export const handleError = ( err : any ) => {

    if( err instanceof Error.ValidationError )
    {

    }

    if( ( err as MongoError).code === 11000 )
    {
        throw new BadRequestException(`Registro duplicado`)
    }

    throw new BadRequestException(err)

}