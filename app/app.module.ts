import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { provideAuth }    from 'angular2-jwt';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from "./auth/auth.module";
import { NotFoundComponent } from "./error-pages/not-found.component";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "@angular/material";
import { ToastService } from "./shared/toast/toast.sevice";
import {ToastyModule} from "ng2-toasty";
import {ModalModule, ModalOverlay} from "angular2-modal";
import {BootstrapModalModule, Modal} from 'angular2-modal/plugins/bootstrap';


@NgModule({
    imports:      [
        HttpModule,
        DashboardModule,
        AuthModule,
        BrowserModule,
        SharedModule,
        ToastyModule.forRoot(),
        MaterialModule.forRoot(),
        ModalModule.forRoot(),
        BootstrapModalModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', component: NotFoundComponent }
        ])
    ],
    declarations: [ AppComponent, DashboardComponent, HomeComponent, NotFoundComponent],
    providers: [
        provideAuth({
          headerPrefix: 'JWT'
        }), AuthGuard, ToastService, Modal],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
