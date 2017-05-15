import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions} from '@angular/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SERVER } from "../../shared/shared.module";
import { AuthHttp } from "angular2-jwt";
import {IBucketlist} from "../../dashboard/bucketlists/bucketlist";


@Injectable()
export class SearchService {
    @Output() newBucketlist: EventEmitter<any> = new EventEmitter();
    @Output() editedBucketlist: EventEmitter<any> = new EventEmitter();

    constructor(public authHttp: AuthHttp) {}

    queryBucketlists(query: string): Observable<IBucketlist[]> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .get(APP_SERVER + 'bucketlists/' + '?q=' + query , options)
            .map((response: Response) => response.json().data[0])
            .do((data: string) => console.log('Got bucketlists Data: '))
            .catch(SearchService.handleError);
    }

    queryBucketlistItems(query: string, bucketlist_id: number): Observable<IBucketlist[]> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .get(APP_SERVER + 'bucketlists/' + '?q=' + query , options)
            .map((response: Response) => response.json().data[0])
            .do((data: string) => console.log('Got bucketlists Data: '))
            .catch(SearchService.handleError);
    }

    private static handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}