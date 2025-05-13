import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {


  transform(value: unknown, ...args: unknown[]): string | null {
    if (typeof value !== 'string' || !value.trim()) return null;

    return value
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

}
