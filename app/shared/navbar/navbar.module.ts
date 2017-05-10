import { UserService } from '../../dashboard/user/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { JwtHelper } from "angular2-jwt";

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
