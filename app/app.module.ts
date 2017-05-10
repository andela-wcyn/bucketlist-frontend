import { AuthGuard } from './auth/auth-guard.service';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { provideAuth }    from 'angular2-jwt';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthModule } from './auth/auth.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        AuthModule,
        DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        RouterModule.forRoot([])
    ],
    declarations: [ AppComponent, DashboardComponent],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, 
    provideAuth({
      headerPrefix: 'JWT'
    }), AuthGuard],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
