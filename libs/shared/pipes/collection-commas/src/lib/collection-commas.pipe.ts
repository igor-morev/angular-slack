import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionCommas',
  standalone: true,
})
export class CollectionCommasPipe implements PipeTransform {
  transform<T extends Record<string, any>>(array: T[], field: keyof T): string {
    return array.map((item) => item[field]).join(', ');
  }
}
