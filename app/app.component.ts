import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { UserService } from './dashboard/user/user.service';
import { BucketlistService } from './dashboard/bucketlists/bucketlists.service';

declare var $:any;

const APP_SERVER = 'http://localhost:5000/api/v1/';
@Component({
    selector: 'bl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    providers: [UserService]
})

export class AppComponent implements OnInit{
    location: Location;
    private authenticated: boolean = false;
    private messages: Array<string> = [];
    errorMessage: any;
    token_expired: any;
    user: any;

    constructor(location:Location, private _userservice: UserService) {
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
        
    }

    login() {
        this._userservice.login("1234567", "molly")
            .subscribe(
                    (data) => {
                    // save the token in local storage
                    let token = data.token;
                    console.log("User Token: " + token);
                    let jwtHelper: JwtHelper = new JwtHelper();
                    localStorage.setItem('id_token', token);
                    this.messages.push(`Login successful, token saved.`);
                    this.authenticated = true;
            
                    this.messages.push(`expiration: ${jwtHelper.getTokenExpirationDate(token)}`);
                    this.token_expired = `is expired: ${jwtHelper.isTokenExpired(token)}`;
                    this.messages.push(`decoded: ${JSON.stringify(jwtHelper.decodeToken(token))}`);
            
                    // now get the protected resource
                    // this.getProtected();
                },
                (error) => {
                    let errors = error.errors;
                    console.log("Errors: ", error);
                    this.errorMessage = `Login failed: ${errors}`;
                }
            );
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
