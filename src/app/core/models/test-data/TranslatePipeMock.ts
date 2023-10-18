import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'translate'})
export default class TranslateMockPipe implements PipeTransform {
    transform(value: number): number {
        //Do stuff here, if you want
        return value;
    }
    get(value: number): number {
        //Do stuff here, if you want
        return value;
    }
}