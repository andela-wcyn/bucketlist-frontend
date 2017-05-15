import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class BucketlistItemGuard implements CanActivate {
    
    constructor(private _router: Router) {}

    public canActivate(_route: ActivatedRouteSnapshot):  boolean {
        let id = +_route.url[1].path;
        if (isNaN(id) || id < 1 ){
            this._router.navigate(['bucketlists'])
            return false;
        } 
        return true;
        // throw new Error('Not implemented yet.');
    }
}