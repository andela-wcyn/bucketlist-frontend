import { ActivatedRoute } from '@angular/router';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BucketlistItemsService} from "./bucketlist-items.service";
import {IBucketlist} from "../bucketlists/bucketlist";
import {CreateBucketlistItemComponent} from "./create-bucketlist-item.component";
import {Modal, overlayConfigFactory} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {ToastyConfig, ToastyService} from "ng2-toasty";
declare let $:any;

@Component({
    selector: 'bucketlist-items-cmp',
    moduleId: module.id,
    templateUrl: 'bucketlist-items.component.html'
})

export class BucketlistItemsComponent implements OnInit{
    bucketlist: IBucketlist;
    products : any[] = [
        {"id": 1,"color": "blue"},
        {"id": 2,"color": "yellow"},
        {"id": 3,"color": "red"}
    ];
    private errorMessage: any;
    constructor(private _route: ActivatedRoute,
                private _bucketlistItemsService: BucketlistItemsService,
                public modal: Modal, private _toastyService: ToastyService, private _toastyConfig: ToastyConfig,
                vcRef: ViewContainerRef) {
        modal.overlay.defaultViewContainer = vcRef;
        this._toastyConfig.theme = 'material';
        
    }
    ngOnInit(){
        let bucketlist_id =  this._route.snapshot.params["id"];
        this._bucketlistItemsService.getBucketlistItems(bucketlist_id)
            .subscribe(res => {
                this.bucketlist = res;
                console.log("bucketlist here first: ", this.bucketlist);
            }, error => this.errorMessage = <any>error);
        console.log("bucketlist here: ", this.bucketlist);

        // this.sub = this._route.params.subscribe(params => {
        //     this.id = +params['id']; // (+) converts string 'id' to a number
        //
        //     // In a real app: dispatch action to load the details here.
        // });
        // let id = +this._route.snapshot.params["id"];

        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        // initDemo();
    }

    createBucketlistItem() {
        return this.modal.open(CreateBucketlistItemComponent,
            overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    }
}
