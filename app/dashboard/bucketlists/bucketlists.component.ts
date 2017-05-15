import { IBucketlist } from './bucketlist';
import { BucketlistService } from './bucketlists.service';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
// import { CreateBucketlistComponent } from "./create-bucketlist.component";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";
import {MdDialog} from "@angular/material";
import {CreateBucketlistComponent} from "./create-bucketlist.component";
import {BSModalContext, Modal} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from "angular2-modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IBucketlistItem} from "../bucketlist-items/bucketlist-item";
import {DataObjectsService} from "../data-objects.service";
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog.component";

declare let $:any;

@Component({
    selector: 'bucketlists-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlists.component.html'
})

export class BucketlistsComponent implements OnInit {
    bucketlists: IBucketlist[];
    errorMessage: string;
    successMessage: string;
    result: any;
    private position: string;
    // Dependency Injection
    constructor(private _bucketlistService: BucketlistService,
                private _dialogService: ConfirmDialogService,
                private _toastyService: ToastyService,
                private _toastyConfig: ToastyConfig,
                private _dos: DataObjectsService,
                public modal: Modal,
                vcRef: ViewContainerRef) {
        modal.overlay.defaultViewContainer = vcRef;
        this._toastyConfig.theme = 'material';
    }

    ngOnInit(): void {

        this._bucketlistService.getBucketlists()
            .subscribe(
                bucketlists => {
                    this.bucketlists = bucketlists
                    console.log("Bucketlists: ", this.bucketlists)
                },
                error => this.errorMessage = <any>error);
        this._bucketlistService.newBucketlist.subscribe(
            (data) => {
                console.log("Subscribed!!", data);
                this.bucketlists.push(data);
            })
        this._dialogService.confirm.subscribe((data: boolean) =>
        {
            console.log("Confirm in service? ", data);

        });
    }

    createBucketlist() {
        return this.modal.open(CreateBucketlistComponent,
            overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    }

    deleteBucketlist(id: number) {
        this.modal.open(ConfirmDialogComponent,
            overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
        this._dialogService.confirm
            .subscribe((result) => {
                if (result) {
                    this._bucketlistService.deleteBucketlist(id)
                        .subscribe(
                            (message) => {
                                let toastOptions: ToastOptions = {
                                    title: "",
                                    msg: message,
                                    showClose: true,
                                    timeout: 5000,

                                };
                                // Add see all possible types in one shot
                                this._toastyService.success(toastOptions);
                                let index = this._dos.deepIndexOf(this.bucketlists, "id", id)
                                this.bucketlists.splice(index, 1);
                            },
                            error => this.errorMessage = <any>error);
                }
        });

    }
}
