import { BucketlistItemGuard } from './bucketlist-items/bucketlist-item.service.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, DASHBOARD_MODULE_ROUTES } from './dashboard.routes';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(DASHBOARD_MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ BucketlistItemGuard ]
})

export class DashboardModule{}
