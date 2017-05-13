import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

export const APP_SERVER = 'http://localhost:5000/api/v1/';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [ FooterComponent, NavbarComponent, SidebarComponent ],
    exports: [ FooterComponent, NavbarComponent, SidebarComponent,
        CommonModule, RouterModule]
})
export class SharedModule{}
