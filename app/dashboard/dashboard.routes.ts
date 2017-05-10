import { AuthGuard } from '../auth/auth-guard.service';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistItemsComponent } from './bucketlist-items/bucketlist-items.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

export const MODULE_ROUTES: Route[] =[
    { path: 'dashboard', component: BucketlistsComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent},
    { path: 'table', component: TableComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    BucketlistsComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    UpgradeComponent,
    UnauthorizedComponent
]
