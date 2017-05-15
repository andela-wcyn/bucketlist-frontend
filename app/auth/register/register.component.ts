import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    private messages: Array<string> = [];
    errorMessage: any;
    token_expired: any;
    userForm: FormGroup;

    ngOnInit(){
        this.userForm = this._fb.group({
            username: ['', [ <any>Validators.required,
                <any>Validators.maxLength(100)]],
            email: ['', [ <any>Validators.required,
                <any>Validators.maxLength(100)]],
            password: ['', [ <any>Validators.required,
                <any>Validators.minLength(6)]]
        });
    }
    
    constructor(private _userservice: UserService,
                private _fb: FormBuilder,
                private _router: Router){

    }
    registerUser(userData: object) {
        this._userservice.registerUser(userData.password, userData.username, userData.email)
            .subscribe(
                    (data) => {
                    // save the token in local storage
                    let token = data.token;
                    console.log("User Token: " + token);
                    let jwtHelper: JwtHelper = new JwtHelper();
                    localStorage.setItem('token', token);
                    this.messages.push(`register successful, token saved.`);
            
                    this.messages.push(`expiration: ${jwtHelper.getTokenExpirationDate(token)}`);
                    this.token_expired = `is expired: ${jwtHelper.isTokenExpired(token)}`;
                        this._router.navigate(['login']);
         },
                (error) => {
                    let errors = error.errors;
                    console.log("Errors: ", error);
                    this.errorMessage = `registration failed: ${errors}`;
                }
            );
    }
}
