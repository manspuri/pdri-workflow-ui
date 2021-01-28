import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuardGuard } from './auth-guard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActivityViewComponent } from './activity/activity-view/activity-view.component';
import { ErrorViewComponent } from './error-view/error-view.component';

const routes: Routes = [
    { path: 'views/activity', component: ActivityViewComponent, canActivate: [AuthGuardGuard] },
    { path: 'views/error', component: ErrorViewComponent },
    { path: '', redirectTo: '/views/activity', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: !environment.production })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
