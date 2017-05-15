import { BucketlistItemGuard } from './bucketlist-items/bucketlist-item.service.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, DASHBOARD_MODULE_ROUTES } from './dashboard.routes';
import { SharedModule } from "../shared/shared.module";
import { BucketlistService } from "./bucketlists/bucketlists.service";
import { BucketlistItemsService } from "./bucketlist-items/bucketlist-items.service";
import {CreateBucketlistComponent} from "./bucketlists/create-bucketlist.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(DASHBOARD_MODULE_ROUTES),
    ],
    entryComponents: [CreateBucketlistComponent],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ BucketlistItemGuard, BucketlistService, BucketlistItemsService ]
})

export class DashboardModule{}
