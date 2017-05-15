import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <div class="row">
            <div class="col-sm-12">
                <p>{{ title }}</p>
                <p>{{ message }}</p>
                <button type="button" md-raised-button
                        (click)="dialogRef.close(true)">OK</button>
                <button type="button" md-button
                        (click)="dialogRef.close()">Cancel</button>
            </div>
        </div>
    `,
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

    }
}