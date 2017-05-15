import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { IBucketlistNew } from "./bucketlist";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BucketlistService} from "./bucketlists.service";
import {ToastOptions, ToastyService} from "ng2-toasty";
import {Router} from "@angular/router";

export class CustomModalContext extends BSModalContext {}

@Component({
    selector: 'modal-content',
    moduleId: module.id,
    templateUrl: 'create-bucketlist.component.html',
})
export class CreateBucketlistComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {
    bucketlistForm: FormGroup;

    constructor(public dialog: DialogRef<CustomModalContext>,
                private _bucketlistService: BucketlistService,
                private _fb: FormBuilder, private _router: Router,
                private _toastyService: ToastyService) {
        this.context = dialog.context;
    }
    ngOnInit(): void {
        this.bucketlistForm = this._fb.group({
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

    create(model: IBucketlistNew, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
        if (isValid){
            this.createBucketlist(model);
        }
    }

    createBucketlist(bucketlistData: object) {
        this._bucketlistService.createBucketlist(bucketlistData)
            .subscribe(
                (data) => {
                    this.dialog.close();
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: "Bucketlist Successfully created",
                        showClose: true,

                    };
                    this._toastyService.success(toastOptions);
                    this._router.navigate(['bucketlists', data.id]);

                },
                error => {
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: error,
                        showClose: true,
                        timeout: 5000

                    };
                    this._toastyService.error(toastOptions);
                });
    }

    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.wrongAnswer;
    }
}
