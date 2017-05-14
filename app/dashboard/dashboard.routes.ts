import { BucketlistItemGuard } from './bucketlist-items/bucketlist-item.service.guard';
import { AuthGuard } from '../auth/auth-guard.service';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistItemsComponent } from './bucketlist-items/bucketlist-items.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ProfileComponent } from "./profile/profile.component";

export const DASHBOARD_MODULE_ROUTES: Route[] = [ 
    { path: 'bucketlists', component: BucketlistsComponent},
    { path: 'bucketlists/:id', component: BucketlistItemsComponent,
        canActivate: [BucketlistItemGuard]}, // canActivate: [AuthGuard]
    { path: 'profile', component: ProfileComponent},
    { path: 'table', component: TableComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'upgrade', component: UpgradeComponent },
]

export const MODULE_COMPONENTS = [
    BucketlistsComponent,
    BucketlistItemsComponent,
    ProfileComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    UpgradeComponent
]
