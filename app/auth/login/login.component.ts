import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{
    private messages: Array<string> = [];
    errorMessage: any;
    token_expired: any;
    userForm: FormGroup;

    ngOnInit(){
        this.userForm = this._fb.group({
            username: ['', [
                <any>Validators.maxLength(100)]],
            password: ['', [ <any>Validators.required]]
        });
    }
    
    constructor(private _userservice: UserService,
                private _fb: FormBuilder,
                private _router: Router){}
    loginUser(userData: object) {
        this._userservice.logIn(userData.password, userData.username)
            .subscribe(
                    (data) => {
                    // save the token in local storage
                    let token = data.token;
                    let jwtHelper: JwtHelper = new JwtHelper();
                    localStorage.setItem('token', token);
                    this.messages.push(`Login successful, token saved.`);
            
                    this.messages.push(`expiration: ${jwtHelper.getTokenExpirationDate(token)}`);
                    this.token_expired = `is expired: ${jwtHelper.isTokenExpired(token)}`;
                    // this._router.navigate(['/bucketlists']);
                        window.location.href = '/bucketlists';
         },
                (error) => {
                    let errors = error.errors;
                    console.log("Errors: ", error);
                    this.errorMessage = `Login failed: ${errors}`;
                }
            );
    }
}
