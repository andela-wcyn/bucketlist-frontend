import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from "../user.service";


@Component({
    selector: 'register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    private messages: Array<string> = [];
    errorMessage: any;
    token_expired: any;
    // @Output() user = new EventEmitter<any>();
    // @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(){
        // $.getScript('../../../assets/js/material-dashboard.js');

    }
    
    constructor(private _userservice: UserService){

    }
    register() {
        this._userservice.registerUser("1234567", "molly")
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
                    // this.user.emit(`decoded: ${JSON.stringify(jwtHelper.decodeToken(token))}`);
                    // this.notify.emit('Click from nested component');
         },
                (error) => {
                    let errors = error.errors;
                    console.log("Errors: ", error);
                    this.errorMessage = `register failed: ${errors}`;
                }
            );
    }
}
