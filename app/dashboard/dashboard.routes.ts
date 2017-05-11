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

export const MODULE_ROUTES: Route[] = [ 
    { path: 'bucketlists', component: BucketlistsComponent, canActivate: [AuthGuard] },
    { path: 'bucketlists/:id', component: BucketlistItemsComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent},
    { path: 'table', component: TableComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'upgrade', component: UpgradeComponent },
]

export const MODULE_COMPONENTS = [
    BucketlistsComponent,
    BucketlistItemsComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    UpgradeComponent
]
