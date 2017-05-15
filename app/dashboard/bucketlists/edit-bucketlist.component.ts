import {Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastOptions, ToastyService} from "ng2-toasty";
import {ActivatedRoute} from "@angular/router";
import {BucketlistService} from "./bucketlists.service";
import {IBucketlistNew} from "./bucketlist";

export class CustomModalContext extends BSModalContext {}

@Component({
    selector: 'modal-content',
    moduleId: module.id,
    templateUrl: 'edit-bucketlist.component.html',
})
export class EditBucketlistComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {
    bucketlistForm: FormGroup;


    constructor(public dialog: DialogRef<CustomModalContext>,
                private _bucketlistService: BucketlistService,
                private _fb: FormBuilder,
                private _toastyService: ToastyService, private _route: ActivatedRoute) {
        this.context = dialog.context;
    }
    ngOnInit(): void {
        this.bucketlistForm = this._fb.group({
            description: [this.context.description, [ <any>Validators.required,
                <any>Validators.maxLength(100)]]
        });
    }

    context: CustomModalContext;
    submitted = false;
    data: string;
    description: string;



    closeModal(){
        this.dialog.close();
    }

    edit(model: IBucketlistNew, isValid: boolean) {

        this.submitted = true;
        console.log(model, isValid);
        if (isValid){
            console.log("Item context: ", this.context);
            model["bucketlist_id"] = this.context.bucketlist_id;
            this.editBucketlistItem(model);
        }
    }

    editBucketlistItem(bucketlistData: object) {
        this._bucketlistService.editBucketlist(bucketlistData,
            bucketlistData.bucketlist_id)
            .subscribe(
                (data) => {
                    this.dialog.close();
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: "Bucketlist Successfully Edited",
                        showClose: true,

                    };
                    this._toastyService.success(toastOptions);

                },
                error => {
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: error,
                        showClose: true,

                    };
                    this._toastyService.error(toastOptions);
                });
    }

    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
    }
}
