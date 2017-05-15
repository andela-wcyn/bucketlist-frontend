import {EventEmitter, Injectable, Input, Output} from '@angular/core';

@Injectable()
export class ConfirmDialogService {
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    constructor() { }

    @Input('confirmAction')
    set confirmAction(value: boolean) {
        this.confirm.emit(value);
    }
}