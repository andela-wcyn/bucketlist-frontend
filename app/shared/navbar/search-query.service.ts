import {EventEmitter, Injectable, Input, Output} from '@angular/core';

@Injectable()
export class SearchQueryService {
    @Output() query: EventEmitter<any> = new EventEmitter();
    constructor() { }

    @Input('queryString')
    set queryString(value: string) {
        this.query.emit(value);
    }
}