import { IBucketlist } from './bucketlist';
import { BucketlistService } from './bucketlists.service';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

declare var $:any;

@Component({
    selector: 'bucketlists-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlists.component.html',
    providers: [BucketlistService]
})

export class BucketlistsComponent implements OnInit{
    items : IBucketlist[];
    // Dependency Injection
    constructor(private _bucketlistService: BucketlistService){
         
    }
    ngOnInit(): void{
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        // initDemo();
        // Retrieve all the bucketlists
        this.items = this._bucketlistService.getBucketlists();
    }
}
