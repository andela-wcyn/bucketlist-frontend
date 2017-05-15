import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ConfirmDialogComponent } from "./dialog/confirm-dialog.component";
import { MaterialModule } from "@angular/material";
import { DialogService } from "./dialog/dialog.service";

export const APP_SERVER = 'http://localhost:5000/api/v1/';
export const NO_SIDEBAR_ROUTES: string[] = ["", "/login", "/register"] ;

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule.forRoot(),
    ],
    declarations: [ FooterComponent, NavbarComponent, SidebarComponent,
                    ConfirmDialogComponent ],
    exports: [ FooterComponent, NavbarComponent, SidebarComponent,
        CommonModule, RouterModule,ConfirmDialogComponent ],
    providers: [ DialogService ],
    entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule{}
