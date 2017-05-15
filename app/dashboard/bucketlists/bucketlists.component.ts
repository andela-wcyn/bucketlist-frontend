import { IBucketlist } from './bucketlist';
import { BucketlistService } from './bucketlists.service';
import { Component, OnInit } from '@angular/core';
// import { CreateBucketlistComponent } from "./create-bucketlist.component";
import { MdDialog } from "@angular/material";
import {ConfirmDialogService} from "../../shared/dialog/dialog.service";

declare let $:any;

@Component({
    selector: 'bucketlists-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlists.component.html'
})

export class BucketlistsComponent implements OnInit {
    bucketlists: IBucketlist[];
    errorMessage: string;
    successMessage: object;
    result: any;
    // Dependency Injection
    constructor(private _bucketlistService: BucketlistService,
                private _dialogService: ConfirmDialogService) {

    }

    ngOnInit(): void {

        // location.reload();
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        // initDemo();
        // Retrieve all the bucketlists
        this._bucketlistService.getBucketlists()
            .subscribe(
                bucketlists => this.bucketlists = bucketlists,
                error => this.errorMessage = <any>error);
    }

    createBucketlist() {
        this._dialogService
            .confirm('Confirm Dialog', 'Are you sure you want to do this?')
            .subscribe((res) => this.result = res);

    }

    deleteBucketlist(id: number) {
        this._dialogService
            .confirm('Delete Bucketlist? ', 'Are you sure you want to delete this Bucketlist? ' + id)
            .subscribe((result) => {
                if (result) {
                    this._bucketlistService.deleteBucketlist(id)
                        .subscribe(
                            (message: object) => {
                                this.successMessage = message
                                console.log("Success delete: ", message);
                            },
                            error => this.errorMessage = <any>error);
                }
        });

    }
}
