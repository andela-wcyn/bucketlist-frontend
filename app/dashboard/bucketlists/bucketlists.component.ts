import { IBucketlist } from './bucketlist';
import { BucketlistService } from './bucketlists.service';
import { Component, OnInit } from '@angular/core';

declare let $:any;

@Component({
    selector: 'bucketlists-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlists.component.html'
})

export class BucketlistsComponent implements OnInit {
    bucketlists: IBucketlist[];
    errorMessage: string;
    // Dependency Injection
    constructor(private _bucketlistService: BucketlistService) {

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
        let dialogRef = dialog.open(UserProfileComponent, {
            height: '400px',
            width: '600px',
        });

    }
}
