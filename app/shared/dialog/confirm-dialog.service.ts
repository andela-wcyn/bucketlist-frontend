import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
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