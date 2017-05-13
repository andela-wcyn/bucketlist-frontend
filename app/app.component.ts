import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import { DASHBOARD_MODULE_ROUTES } from './dashboard/dashboard.routes';
import { Component, Input, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location} from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { BucketlistService } from './dashboard/bucketlists/bucketlists.service';

declare let $:any;

const APP_SERVER = 'http://localhost:5000/api/v1/';
@Component({
    selector: 'bl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    private messages: Array<string> = [];
    private show_sidebar: boolean = false;
    private no_sidebar_routes: string[] = ["", "/login", "/register"] ;
    errorMessage: any;
    token_expired: any;
    user: any;
    
    constructor(location:Location, public _router: Router,
    private _route: ActivatedRoute) {
        this.location = location;
        this._router.events.subscribe((val: NavigationEnd) => {
            this.setShowSidebar();
        });
    }

    setShowSidebar(): void {
        // let alias = JSON.stringify(this._route.pathFromRoot.toString);
        // console.log("path alias: " + alias); 
        let path = this.location.path()
        console.log("path: " + path); 
        if (this.no_sidebar_routes.includes(path)) {
            console.log("YAya!! Path!: ", path);
            this.show_sidebar = false;
        } else {
            this.show_sidebar = true;
        }
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

    loggedIn() {
        console.log("Not expired??  ", tokenNotExpired());
        return tokenNotExpired();
    }

    public isMaps(path: string){
        let title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice( 1 );
        if(path == title){
            return false;
        }
        else {
            return true;
        }
    }
}
