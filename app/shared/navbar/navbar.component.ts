import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import {ROUTES} from "../sidebar/sidebar-routes.config";
import {NO_SIDEBAR_ROUTES} from "../shared.module";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    user: any = {"username": "(Guest)"};
    constructor(location:Location, private _router: Router) {
        this.location = location;
        this._router.events.subscribe((val: NavigationEnd) => {
            // see also 
            let token = localStorage.getItem('token');
            console.log("token here: ", token)
            if (token) {
                let jwtHelper: JwtHelper = new JwtHelper();
                if (tokenNotExpired()) {
                    this.user = `${JSON.stringify(jwtHelper.decodeToken(token))}`
                    this.user = JSON.parse(this.user);
                    console.log("Routed Users: " + this.user.username);
                    console.log(val instanceof NavigationEnd)
                }
            }
        });
    }
    logout() {
        // Log the user out by deleting their token from storage
        localStorage.removeItem("token");
        console.log("Logged out! ");
    }

    loggedIn() {
        return tokenNotExpired();
    }
    
    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
    getTitle(){
        let title = this.location.prepareExternalUrl(this.location.path());
        if(title.charAt(0) === '#'){
            title = title.slice( 2 );
        }
        for(let item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === title){
                return this.listTitles[item].title;
            }
        }
        let path = this.location.path()
        if (NO_SIDEBAR_ROUTES.includes(path)) {
            return 'Buzz Buckets';
        } else {
            return '';
        }
    }

}
