import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { IBucketlistItem } from './bucketlist-items';
declare var $:any;

@Component({
    selector: 'bucketlist-items-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlist-items.component.html'
})

export class BucketlistItemsComponent implements OnInit{
    products : any[] = [
        {"id": 1,"color": "blue"},
        {"id": 2,"color": "yellow"},
        {"id": 3,"color": "red"}
                    ]
    items : IBucketlistItem​​[] = [

    ]
    ngOnInit(){
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        // initDemo();
    }
}
