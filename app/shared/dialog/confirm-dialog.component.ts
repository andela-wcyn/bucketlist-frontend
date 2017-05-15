import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastOptions, ToastyService} from "ng2-toasty";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmDialogService} from "./confirm-dialog.service";

export class CustomModalContext extends BSModalContext {}

@Component({
    selector: 'confirm-dialog',
    moduleId: module.id,
    templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {
    bucketlistItemForm: FormGroup;


    constructor(public dialog: DialogRef<CustomModalContext>,
                private _fb: FormBuilder, private _router: Router,
                private _toastyService: ToastyService,
                private _route: ActivatedRoute,
                private _confirmDialogService: ConfirmDialogService) {
        this.context = dialog.context;
    }
    ngOnInit(): void {
        this.bucketlistItemForm = this._fb.group({
            description: ['', [ <any>Validators.required,
                <any>Validators.maxLength(100)]]
        });
    }

    context: CustomModalContext;
    submitted = false;
    data: string;
    description: string;

    public wrongAnswer: boolean;


    closeModal(){
        this.dialog.close();
    }

    confirm(confirm: boolean) {
        this._confirmDialogService.confirmAction = confirm;
        this.closeModal();
    }


    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.wrongAnswer;
    }
}
