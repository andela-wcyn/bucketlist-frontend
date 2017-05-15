import {Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { IBucketlistItemNew } from "./bucketlist-item";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastOptions, ToastyService} from "ng2-toasty";
import {ActivatedRoute, Router} from "@angular/router";
import {BucketlistItemsService} from "./bucketlist-items.service";

export class CustomModalContext extends BSModalContext {}

@Component({
    selector: 'modal-content',
    moduleId: module.id,
    templateUrl: 'edit-bucketlist-item.component.html',
})
export class EditBucketlistItemComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {
    bucketlistItemForm: FormGroup;


    constructor(public dialog: DialogRef<CustomModalContext>,
                private _bucketlistService: BucketlistItemsService,
                private _fb: FormBuilder,
                private _toastyService: ToastyService, private _route: ActivatedRoute) {
        this.context = dialog.context;
    }
    ngOnInit(): void {
        this.bucketlistItemForm = this._fb.group({
            description: [this.context.description, [ <any>Validators.required,
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

    edit(model: IBucketlistItemNew, isValid: boolean) {

        this.submitted = true;
        console.log(model, isValid);
        if (isValid){
            console.log("Item context: ", this.context);
            model["bucketlist_id"] = this.context.bucketlist_id;
            model["item_id"] = this.context.item_id;
            this.editBucketlistItem(model);
        }
    }

    editBucketlistItem(bucketlistItemData: object) {
        this._bucketlistService.editBucketlistItem(bucketlistItemData,
            bucketlistItemData.bucketlist_id, bucketlistItemData.item_id)
            .subscribe(
                (data) => {
                    this.dialog.close();
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: "Bucketlist Item Successfully Edited",
                        showClose: true,

                    };
                    this._toastyService.success(toastOptions);
                    // this.bucketlist.items.splice(index, 1);

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
        return this.wrongAnswer;
    }
}
