import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";


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
                private _toastyConfig: ToastyConfig,
                private _toastyService: ToastyService){
        this._toastyConfig.theme = 'material';
    }
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
                    window.location.href = '/bucketlists';
                    },
                (error) => {
                    let errors = error.errors;
                    console.log("Errors: ", error);
                    let toastOptions: ToastOptions = {
                        title: "",
                        msg: errors,
                        showClose: true,
                        timeout: 5000,

                    };
                    this._toastyService.error(toastOptions);
                    this.errorMessage = `Login failed: ${errors}`;
                }
            );
    }
}
