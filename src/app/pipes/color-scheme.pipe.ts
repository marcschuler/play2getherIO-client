import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'colorScheme'
})
export class ColorSchemePipe implements PipeTransform {



    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }

}
