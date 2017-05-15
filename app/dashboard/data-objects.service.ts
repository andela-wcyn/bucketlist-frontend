import { Injectable } from '@angular/core';

@Injectable()
export class DataObjectsService {

    deepIndexOf(data_array: any[], property: string, value: any ) {
        let i = 0;
        for (let entry of data_array) {
            if (entry[property] === value){
                return i
            }
            i++;
        }
        return -1;
    }
}