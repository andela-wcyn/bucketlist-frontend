import { NotFoundComponent } from './404/not-found.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { HomeComponent } from './home/home.component';
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
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        AuthModule,
        DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', component: NotFoundComponent }
        ])
    ],
    declarations: [ AppComponent, DashboardComponent, HomeComponent,
    LoginComponent, RegisterComponent, NotFoundComponent],
    providers: [ 
    provideAuth({
      headerPrefix: 'JWT'
    }), AuthGuard],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
