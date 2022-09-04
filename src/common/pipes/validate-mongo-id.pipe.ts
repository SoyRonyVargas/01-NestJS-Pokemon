import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform {
  
  transform( value: any ) : ObjectId {

    if( value === undefined ) return;
    
    const validObjectId = Types.ObjectId.isValid(value)

    if( !validObjectId ) throw new BadRequestException('Invalid ObjectId');

    return Types.ObjectId.createFromHexString(value);

  }

}
