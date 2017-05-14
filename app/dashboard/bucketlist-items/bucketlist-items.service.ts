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

    // createBucketlist(bucketlist_data: object): Observable<IBucketlist> {
    //     let options: RequestOptions = new RequestOptions({
    //         headers: new Headers({ 'Content-Type': 'application/json' })
    //     });
    //
    //     return this.authHttp
    //         .post(APP_SERVER + 'auth/login',
    //             JSON.stringify(bucketlist_data),
    //             options)
    //         .map((response: Response) => response.json().data[0])
    //         .do((data: string) => console.log('USer Data: ' + JSON.stringify(data)))
    //         .catch(BucketlistService.handleError);
    // }

    // getBucketlists(): Observable<IBucketlist[]> {
    //     let headers = new Headers();
    //     this.createAuthorizationHeader(headers);
    //     return this._http.get(this._bucketlistsUrl, {headers: headers})
    //                 .map((response: Response) => <IBucketlist[]>response.json().data[0])
    //                 .do(data=> console.log('All: bucketlists retrieved'))
    //                 .catch(this.handleError);
    //     // return [
    //     // {"id": 1,"description": "My first Item", "detailsLink": "link1", "itemCount": 3, "items": []},
    //     // {"id": 2,"description": "My Other item", "detailsLink": "link2", "itemCount": 1, "items": []},
    //     // {"id": 3,"description": "And another item", "detailsLink": "link3", "itemCount": 2, "items": []},
    //
    //     // ]
    // }

    private static handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}