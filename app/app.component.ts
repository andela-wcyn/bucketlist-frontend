import { Component, Input, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { BucketlistService } from './dashboard/bucketlists/bucketlists.service';

declare var $:any;

const APP_SERVER = 'http://localhost:5000/api/v1/';
@Component({
    selector: 'bl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    private authenticated: boolean = tokenNotExpired();
    private messages: Array<string> = [];
    errorMessage: any;
    token_expired: any;
    user: any;
    
    constructor(location:Location) {
        this.location = location;
    }
    
      // get the unprotected resource
//   getUnprotected() {
//     this.messages.push('Requesting unprotected resource');
//     this.http
//       .get(APP_SERVER + 'bucketlists')
//       .map((response: Response) => response.json())
//       .subscribe(
//       (data) => {
//         this.messages.push(`Got unprotected response: ${data.message}`);
 
//         this.login();
//       },
//       (error) => {
//         this.messages.push(`Unprotected request error: ${error}`);
//       }
//       );
//   }
 
  // get a protected resource the the token
//   getProtected() {
//     this.messages.push('Requesting protected resource');
//     this.authHttp
//       .get(APP_SERVER + 'bucketlists')
//       .map((response: Response) => response.json())
//       .subscribe(
//       (data) => {
//         this.messages.push(`Got protected resource: msg: ${data.message}, identity: ${data.current_identity}`);
//       },
//       (error) => {
//         this.messages.push(`Protected request failed: ${error}`);
//       }
//       );
//   }

    ngOnInit(){
        $.getScript('../assets/js/material-dashboard.js');
        $.getScript('../assets/js/initMenu.js');
        // this.user = this.getUser.emit()
    }

    loggedIn() {
        console.log("USer: ", this.user)
        console.log("Logged IN? " + tokenNotExpired());
        return tokenNotExpired();
    }

    public isMaps(path: string){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }
}
