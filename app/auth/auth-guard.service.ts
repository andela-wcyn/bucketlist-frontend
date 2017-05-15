// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
    user: any;
  constructor(private router: Router) {}

  canActivate() {
    if(tokenNotExpired()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}