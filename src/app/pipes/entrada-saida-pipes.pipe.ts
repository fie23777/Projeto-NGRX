import { Pipe, PipeTransform } from '@angular/core';
import { EntradaSaida } from '../models/input-output.model';

@Pipe({
  name: 'entradaSaidaPipes'
})
export class EntradaSaidaPipesPipe implements PipeTransform {

  transform(value: EntradaSaida[]): EntradaSaida[] {
      return value.sort((a, b)=>{
        if(a.type ==='entrada'){
          return -1;

        }else{
          return 1
        }
      });
  }

}
