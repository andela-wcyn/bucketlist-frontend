// import { IBucketlist } from './bucketlist';
// import { BucketlistService } from './bucketlists.service';
// import {Component, Inject, OnInit} from '@angular/core';
// // import { MD_DIALOG_DATA } from "@angular/material";
//
// declare let $:any;
//
// @Component({
//     selector: 'create-bucketlist-cmp',
//     moduleId: module.id,
//     templateUrl: 'create-bucketlist.component.html'
// })
//
// export class CreateBucketlistComponent implements OnInit {
//     bucketlist: IBucketlist;
//     errorMessage: string;
//     // Dependency Injection
//     constructor(private _bucketlistService: BucketlistService,
//                 @Inject(MD_DIALOG_DATA) public data: any) {
//
//     }
//
//     ngOnInit(): void {
//
//         // location.reload();
//         // $('[data-toggle="checkbox"]').each(function () {
//         //     if($(this).data('toggle') == 'switch') return;
//         //
//         //     var $checkbox = $(this);
//         //     $checkbox.checkbox();
//         // });
//         // initDemo();
//         // Retrieve all the bucketlists
//         this._bucketlistService.createBucketlist({})
//             .subscribe(
//                 bucketlist => this.bucketlist = bucketlist,
//                 error => this.errorMessage = <any>error);
//     }
//
// }
