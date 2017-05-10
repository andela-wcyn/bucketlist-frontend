import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../dashboard/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar-routes.config';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { JwtHelper } from "angular2-jwt";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    providers: [UserService]
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    user: any = "Guest";
    constructor(location:Location, private _router: Router) {
        this.location = location;
        this._router.events.subscribe((val: NavigationEnd) => {
            // see also 
            let token = localStorage.getItem('token');
            console.log("token: ", token)
            let jwtHelper: JwtHelper = new JwtHelper();
            this.user = `${JSON.stringify(jwtHelper.decodeToken(token))}`        
            this.user = JSON.parse(this.user);
            console.log("Routed USer!: " + this.user.username);
            console.log(val instanceof NavigationEnd )
            console.log(val instanceof NavigationEnd) 
    });
}

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    }
    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

}
