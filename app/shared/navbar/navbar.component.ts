import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import {ROUTES} from "../sidebar/sidebar-routes.config";
import {NO_SIDEBAR_ROUTES} from "../shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BucketlistService} from "../../dashboard/bucketlists/bucketlists.service";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    user: any = {"username": "(Guest)"};
    searchForm: FormGroup;

    constructor(location:Location, private _router: Router,
                private _fb: FormBuilder, private _route: ActivatedRoute,
                private _bucketlistService: BucketlistService) {
        this.location = location;
        this._router.events.subscribe((val: NavigationEnd) => {
            let token = localStorage.getItem('token');
            if (token) {
                let jwtHelper: JwtHelper = new JwtHelper();
                if (tokenNotExpired()) {
                    this.user = `${JSON.stringify(jwtHelper.decodeToken(token))}`
                    this.user = JSON.parse(this.user);
                }
            }
        });
    }


    logout() {
        // Log the user out by deleting their token from storage
        localStorage.removeItem("token");
        this._router.navigate(['/home'])
    }

    loggedIn() {
        return tokenNotExpired();
    }
    
    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        this.searchForm = this._fb.group({
            query: ['', [
                <any>Validators.maxLength(30)]]
        });
    }

    queryObjects(queryData: object){
        let path = this.location.path();
        console.log("Path? ", path);
        if(path === '/bucketlists'){

        }
        this._bucketlistService.getBucketlists(queryData.query)
            .subscribe(
                bucketlists => {
                    console.log("Got bucketlists");
                },
                error => this.errorMessage = <any>error);
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
