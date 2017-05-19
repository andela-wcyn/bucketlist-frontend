import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions} from '@angular/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IBucketlist, IBucketlistPaginated, IMessage } from './bucketlist';
import {APP_SERVER, PAGINATION_LIMIT} from "../../shared/shared.module";
import { AuthHttp } from "angular2-jwt";


@Injectable()
export class BucketlistService {
    @Output() newBucketlist: EventEmitter<any> = new EventEmitter();
    @Output() editedBucketlist: EventEmitter<any> = new EventEmitter();
    @Output() queriedBucketlists: EventEmitter<any> = new EventEmitter();

    constructor(public authHttp: AuthHttp) {}

    getBucketlists(query="", page=1, limit=PAGINATION_LIMIT): Observable<IBucketlistPaginated> {
        let url = APP_SERVER + 'bucketlists/';
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json'}),
            search: 'q=' + query + '&page=' + page +'&limit=' + limit
        });
        return this.authHttp
            .get(url, options)
            .map((response: Response) => response.json())
            .do((data: string) => {
                console.log('Retrieved  bucketlists data');
                if (query) {
                    this.queriedBucketlists.emit(data);
                }
            })
            .catch(BucketlistService.handleError);
    }

    deleteBucketlist(id: number): Observable<IMessage> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .delete(APP_SERVER + 'bucketlists/' + id, options)
            .map((response: Response) => response.json())
            .do((data: IMessage) => console.log('Deleted bucketlist'))
            .catch(BucketlistService.handleError);
    }

    createBucketlist(bucketlist_data: object): Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .post(APP_SERVER + 'bucketlists/',
                JSON.stringify(bucketlist_data),
                options)
            .map((response: Response) => response.json())
            .do((data: string) => {
                this.newBucketlist.emit(data);
            })
            .catch(BucketlistService.handleError);
    }

    editBucketlist(bucketlist_data: object, bucketlist_id: number):
    Observable<IBucketlist> {
        let options: RequestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.authHttp
            .put(APP_SERVER + 'bucketlists/' + bucketlist_id,
                JSON.stringify(bucketlist_data),
                options)
            .map((response: Response) => response.json())
            .do((data: string) => {
                this.editedBucketlist.emit(data);
            })
            .catch(BucketlistService.handleError);
    }
    private static handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}