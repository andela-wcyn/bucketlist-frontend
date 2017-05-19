import { BucketlistItemGuard } from './bucketlist-items/bucketlist-item.service.guard';
import { AuthGuard } from '../auth/auth-guard.service';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistItemsComponent } from './bucketlist-items/bucketlist-items.component';
import {CreateBucketlistComponent} from "./bucketlists/create-bucketlist.component";
import {CreateBucketlistItemComponent} from "./bucketlist-items/create-bucketlist-item.component";
import {EditBucketlistItemComponent} from "./bucketlist-items/edit-bucketlist-item.component";
import {EditBucketlistComponent} from "./bucketlists/edit-bucketlist.component";

export const DASHBOARD_MODULE_ROUTES: Route[] = [ 
    { path: 'bucketlists', component: BucketlistsComponent,
        canActivate: [AuthGuard]},
    { path: 'bucketlists/:id', component: BucketlistItemsComponent,
        canActivate: [BucketlistItemGuard, AuthGuard]}
]

export const MODULE_COMPONENTS = [
    BucketlistsComponent,
    BucketlistItemsComponent,
    CreateBucketlistComponent,
    CreateBucketlistItemComponent,
    EditBucketlistItemComponent,
    EditBucketlistComponent
]
