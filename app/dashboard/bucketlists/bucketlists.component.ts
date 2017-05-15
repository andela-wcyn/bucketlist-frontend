import { IBucketlist } from './bucketlist';
import { BucketlistService } from './bucketlists.service';
import { Component, OnInit} from '@angular/core';
// import { CreateBucketlistComponent } from "./create-bucketlist.component";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";
import {MdDialog} from "@angular/material";
import {CreateBucketlistComponent} from "./create-bucketlist.component";
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
                public dialog: MdDialog) {
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
        this.dialog.open(CreateBucketlistComponent);
        // this._dialogService
        //     .confirm('Confirm Dialog', 'Are you sure you want to do this?')
        //     .subscribe((res) => this.result = res);

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
