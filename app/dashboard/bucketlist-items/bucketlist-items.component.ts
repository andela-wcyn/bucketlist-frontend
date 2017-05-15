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
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog.component";
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
                private _confirmDialogService: ConfirmDialogService,
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
            }, error => this.errorMessage = <any>error);
        this._bucketlistItemsService.newBucketlistItem.subscribe(
            (data) => {
                this.bucketlist.items.push(data);
            })
    }

    createBucketlistItem() {
        return this.modal.open(CreateBucketlistItemComponent,
            overlayConfigFactory({}, BSModalContext));
    }

    editBucketlistItem(id: number, item_id: number, bucketlistItem: object) {
        this.modal.open(ConfirmDialogComponent,
            overlayConfigFactory(bucketlistItem, BSModalContext));
        this._confirmDialogService.confirm
            .subscribe((result) => {
                if (result) {
                    this._bucketlistItemsService.deleteBucketlistItem(id, item_id)
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
                                let index = this._dos.deepIndexOf(this.bucketlist.items, "id", item_id)
                                this.bucketlist.items.splice(index, 1);
                            },
                            error => this.errorMessage = <any>error);
                }
            });
    }

    deleteBucketlistItem(id: number, item_id: number) {
        this.modal.open(ConfirmDialogComponent,
            overlayConfigFactory({ }, BSModalContext));
        this._confirmDialogService.confirm
            .subscribe((result) => {
                if (result) {
                    this._bucketlistItemsService.deleteBucketlistItem(id, item_id)
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
                                let index = this._dos.deepIndexOf(this.bucketlist.items, "id", item_id)
                                this.bucketlist.items.splice(index, 1);
                            },
                            error => this.errorMessage = <any>error);
                }
            });
    }

    setItemDone(event: any){
        console.log("Checked button: ", event.target.checked);
    }
}
