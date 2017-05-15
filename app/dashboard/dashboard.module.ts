import { BucketlistItemGuard } from './bucketlist-items/bucketlist-item.service.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, DASHBOARD_MODULE_ROUTES } from './dashboard.routes';
import { SharedModule } from "../shared/shared.module";
import { BucketlistService } from "./bucketlists/bucketlists.service";
import { BucketlistItemsService } from "./bucketlist-items/bucketlist-items.service";
import { CreateBucketlistComponent } from "./bucketlists/create-bucketlist.component";
import { CreateBucketlistItemComponent } from "./bucketlist-items/create-bucketlist-item.component";
import { DataObjectsService } from "./data-objects.service";
import { EditBucketlistItemComponent } from "./bucketlist-items/edit-bucketlist-item.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(DASHBOARD_MODULE_ROUTES),
    ],
    entryComponents: [ CreateBucketlistComponent, CreateBucketlistItemComponent,
                        EditBucketlistItemComponent],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ BucketlistItemGuard, BucketlistService, BucketlistItemsService,
    DataObjectsService]
})

export class DashboardModule{}
