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
                private _toastyService: ToastyService, private _toastyConfig: ToastyConfig,
                public modal: Modal,
                vcRef: ViewContainerRef) {
        modal.overlay.defaultViewContainer = vcRef;
        // this._toastyService.position$.subscribe(pos => this.position = pos);
        this._toastyConfig.theme = 'material';
    }

    ngOnInit(): void {

        this._bucketlistService.getBucketlists()
            .subscribe(
                bucketlists => this.bucketlists = bucketlists,
                error => this.errorMessage = <any>error);
    }

    createBucketlist() {
        return this.modal.open(CreateBucketlistComponent,
            overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    }

    deleteBucketlist(id: number) {
        this._dialogService
            .confirm('Delete Bucketlist? ', 'Are you sure you want to delete this Bucketlist? ' + id)
            .subscribe((result) => {
                if (result) {
                    this._bucketlistService.deleteBucketlist(id)
                        .subscribe(
                            (message) => {
                                // console.log("Success delete: ", message);
                                let toastOptions: ToastOptions = {
                                    title: "",
                                    msg: message,
                                    showClose: true,
                                    timeout: 5000,
                                    position: 'bottom-right'

                                };
                                // Add see all possible types in one shot
                                this._toastyService.success(toastOptions);
                                // this._toastyService.default("Successfully Deleted!!");
                            },
                            error => this.errorMessage = <any>error);
                }
        });

    }
}
