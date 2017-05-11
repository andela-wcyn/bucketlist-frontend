import { UserService } from './user/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: [UserService]
})

export class DashboardModule{}
