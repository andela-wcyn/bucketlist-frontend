import { ActivatedRoute } from '@angular/router';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BucketlistItemsService} from "./bucketlist-items.service";
import {IBucketlist} from "../bucketlists/bucketlist";
import {CreateBucketlistItemComponent} from "./create-bucketlist-item.component";
import {Modal, overlayConfigFactory} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {DataObjectsService} from "../data-objects.service";
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
                private _dialogService: ConfirmDialogService,
                private _bucketlistItemsService: BucketlistItemsService,
                public modal: Modal, private _toastyService: ToastyService,
                private _toastyConfig: ToastyConfig,
                private _dos: DataObjectsService,
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

    deleteBucketlistItem(id: number, item_id: number) {
        this._dialogService
            .confirm('Delete Item? ', 'Are you sure you want to delete this item? ')
            .subscribe((result) => {
                if (result) {
                    this._bucketlistItemsService.deleteBucketlistItem(id, item_id)
                        .subscribe(
                            (message) => {
                                // console.log("Success delete: ", message);
                                let toastOptions: ToastOptions = {
                                    title: "",
                                    msg: message,
                                    showClose: true,
                                    timeout: 5000,

                                };
                                // Add see all possible types in one shot
                                this._toastyService.success(toastOptions);
                                let index = this._dos.deepIndexOf(this.bucketlist.items, "id", item_id)
                                this.bucketlist.items.splice(index, 1);
                            },
                            error => this.errorMessage = <any>error);
                }
            });

    }

    createBucketlistItem() {
        return this.modal.open(CreateBucketlistItemComponent,
            overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    }
}
