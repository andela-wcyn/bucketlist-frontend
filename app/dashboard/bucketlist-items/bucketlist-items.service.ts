import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SERVER } from "../../shared/shared.module";
import { AuthHttp } from "angular2-jwt";
import { IBucketlist } from "../bucketlists/bucketlist";

@Injectable()
export class BucketlistItemsService {
    constructor(public authHttp: AuthHttp) {}

    getBucketlistItems(id: number): Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .get(APP_SERVER + 'bucketlists/' + id, options)
            .map((response: Response) => response.json().data.bucketlist)
            .do((data: string) => console.log('Got bucketlistItems Data: ',
                JSON.stringify(data)))
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
            .do((data: string) => console.log('New Item Data: ' + JSON.stringify(data)))
            .catch(BucketlistItemsService.handleError);
    }

    deleteBucketlistItem(id: number, item_id: number): Observable<object> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .delete(APP_SERVER + 'bucketlists/' + id + '/' + item_id, options)
            .map((response: Response) => response.json().message)
            .do((data: any) => console.log('Delete Message: ',
                data))
            .catch(BucketlistItemsService.handleError);
    }


    private static handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}