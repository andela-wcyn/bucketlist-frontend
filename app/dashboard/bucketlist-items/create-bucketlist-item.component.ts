import {Component, OnInit} from '@angular/core';

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
    templateUrl: 'create-bucketlist-item.component.html',
})
export class CreateBucketlistItemComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {
    bucketlistItemForm: FormGroup;

    constructor(public dialog: DialogRef<CustomModalContext>,
                private _bucketlistService: BucketlistItemsService,
                private _fb: FormBuilder, private _router: Router,
                private _toastyService: ToastyService, private _route: ActivatedRoute) {
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

    create(model: IBucketlistItemNew, isValid: boolean) {
        let bucketlist_id = this._route.snapshot.params["id"]
        this.submitted = true;
        console.log(model, isValid);
        if (isValid){
            this.createBucketlistItem(model, bucketlist_id);
        }
    }

    createBucketlistItem(bucketlistItemData: object, bucketlist_id: number) {
        this._bucketlistService.createBucketlistItem(bucketlistItemData, bucketlist_id)
            .subscribe(
                (data) => {
                    console.log("Success create: ", data);
                    this.dialog.close();
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: "Bucketlist Item Successfully created",
                        showClose: true,

                    };
                    this._toastyService.success(toastOptions);
                    this._router.navigate(['bucketlists', bucketlist_id]);

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
