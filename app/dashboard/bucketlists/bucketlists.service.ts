import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IBucketlist } from './bucketlist';

@Injectable()
export class BucketlistService {
    private _bucketlistsUrl = 'http://127.0.0.1:5000/api/v1/bucketlists/'
    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'JWT ' +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNDk0NDIwOTI5LCJpYXQiOjE0OTQzOTA5MjksIm5iZiI6MTQ5NDM5MDkyOX0.MzCiFAmVRu5btXqzI0kJIkCsV5qjmkuYph9FS-FMZIE"); 
    }

    constructor(private _http: Http) {}

    getBucketlists(): Observable<IBucketlist[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this._bucketlistsUrl, {headers: headers})
                    .map((response: Response) => <IBucketlist[]>response.json().data[0])
                    .do(data=> console.log('All: ' + JSON.stringify(data)))
                    .catch(this.handleError);
        // return [
        // {"id": 1,"description": "My first Item", "detailsLink": "link1", "itemCount": 3, "items": []},
        // {"id": 2,"description": "My Other item", "detailsLink": "link2", "itemCount": 1, "items": []},
        // {"id": 3,"description": "And another item", "detailsLink": "link3", "itemCount": 2, "items": []},
 
        // ]
    }

    private handleError (error: Response) {
        console.log(error);
        return Observable.throw(error.json() || "Server Error")
    }
}