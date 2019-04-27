import { Pipe, PipeTransform } from '@angular/core';
import { getAlias } from 'app/libs/meta-ui/util/meta/alias';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let alias = getAlias(args);
    let alia = alias.find(a => a.value == value);
    return alia ? alia.alias : value;
  }

}
