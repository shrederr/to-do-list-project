import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype) {
      throw new ValidationException('Some problems with metatype');
    }
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      console.log(errors);
      const messages = errors.map((err) => {
        return `${err.property} - ${
          err.constraints ? Object.values(err.constraints).join(', ') : ''
        }`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
