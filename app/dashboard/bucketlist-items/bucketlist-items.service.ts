import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions} from '@angular/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SERVER } from "../../shared/shared.module";
import { AuthHttp } from "angular2-jwt";
import { IBucketlist } from "../bucketlists/bucketlist";

@Injectable()
export class BucketlistItemsService {
    @Output() newBucketlistItem: EventEmitter<any> = new EventEmitter();
    @Output() editedBucketlistItem: EventEmitter<any> = new EventEmitter();
    @Output() queriedBucketlistItems: EventEmitter<any> = new EventEmitter();
    constructor(public authHttp: AuthHttp) {}

    getBucketlistItems(id: number, query?: string): Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        let url = APP_SERVER;
        if (query) {
            url += 'bucketlists/' + id + "?q=" + query;
        } else{
            url += 'bucketlists/' + id;
        }

        return this.authHttp
            .get(url, options)
            .map((response: Response) => response.json().data.bucketlist)
            .do((data: string) => {
                if (query) {
                    this.queriedBucketlistItems.emit(data);
                }
            })
            .catch(BucketlistItemsService.handleError);
    }

    createBucketlistItem(bucketlist_item_data: object, bucketlist_id: number): Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        return this.authHttp
            .post(APP_SERVER + 'bucketlists/' + bucketlist_id,
                JSON.stringify(bucketlist_item_data),
                options)
            .map((response: Response) => response.json())
            .do((data: string) => {
                this.newBucketlistItem.emit(data);
            })
            .catch(BucketlistItemsService.handleError);
    }

    editBucketlistItem(bucketlist_item_data: object, bucketlist_id: number, item_id: number):
        Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .put(APP_SERVER + 'bucketlists/' + bucketlist_id + "/" + item_id,
                JSON.stringify(bucketlist_item_data),
                options)
            .map((response: Response) => response.json())
            .do((data: string) => {
                this.editedBucketlistItem.emit(data);
            })
            .catch(BucketlistItemsService.handleError);
    }

    deleteBucketlistItem(id: number, item_id: number): Observable<object> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .delete(APP_SERVER + 'bucketlists/' + id + '/' + item_id, options)
            .map((response: Response) => response.json().message)
            .do((data: any) => console.log('Delete Message: '))
            .catch(BucketlistItemsService.handleError);
    }


    private static handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}