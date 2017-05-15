import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ConfirmDialogComponent } from "./dialog/confirm-dialog.component";
import { MaterialModule } from "@angular/material";
import { ConfirmDialogService } from "./dialog/confirm-dialog.service";
import { ToastComponent } from "./toast/toast.component";
import { ToastyModule } from "ng2-toasty";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const APP_SERVER = 'http://localhost:5000/api/v1/';
export const NO_SIDEBAR_ROUTES: string[] = ["", "/login", "/register"] ;

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastyModule.forRoot(),
        MaterialModule.forRoot()
    ],
    declarations: [ FooterComponent, NavbarComponent, SidebarComponent,
                    ConfirmDialogComponent, ToastComponent ],
    exports: [ FooterComponent, NavbarComponent, SidebarComponent,
        CommonModule, ConfirmDialogComponent, RouterModule, FormsModule, ReactiveFormsModule ],
    providers: [ ConfirmDialogService ],
    entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule{}
