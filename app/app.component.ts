import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { NO_SIDEBAR_ROUTES } from "./shared/shared.module";

declare let $:any;

@Component({
    selector: 'bl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    private messages: Array<string> = [];
    private show_sidebar: boolean = false;
    errorMessage: any;
    token_expired: any;
    user: any;
    
    constructor(location:Location, public _router: Router) {
        this.location = location;
        this._router.events.subscribe((val: NavigationEnd) => {
            this.setShowSidebar();
        });
    }

    setShowSidebar(): void {
        let path = this.location.path()
        this.show_sidebar = !NO_SIDEBAR_ROUTES.includes(path);
    }

    ngOnInit(){
        $.getScript('../assets/js/material-dashboard.js');
        $.getScript('../assets/js/initMenu.js');
    }

    loggedIn() {
        return tokenNotExpired();
    }

    public isMaps(path: string){
        let title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice( 1 );
        return path == title;
    }
}
