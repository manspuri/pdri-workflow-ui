import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PfCommonModule, PF_AUTH_CONFIG, PfAuthInterceptor, PF_AUTH_INTERCEPTOR_CONFIG } from '@pfit2ng/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ActivityViewComponent } from './activity/activity-view/activity-view.component';
import { ActivityDirective } from './activity/activity.directive';
import { HtmlActivityComponent } from './activity/html-activity/html-activity.component';
import { StatusActivityComponent } from './activity/status-activity/status-activity.component';
import { GatekeeperActivityComponent } from './activity/gatekeeper-activity/gatekeeper-activity.component';
import { SimpleCompleteActivityComponent } from './activity/simple-complete-activity/simple-complete-activity.component';
import { BaseActivityComponent } from './activity/base-activity/base-activity.component';
import { ReportActivityComponent } from './activity/report-activity/report-activity.component';
import { WaitActivityComponent } from './activity/wait-activity/wait-activity.component';
import { LanguageSelectActivityComponent } from './activity/language-select-activity/language-select-activity.component';
import { CertificationActivityComponent } from './activity/certification-activity/certification-activity.component';
import { MenuActivityComponent } from './activity/menu-activity/menu-activity.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { AccommodationsActivityComponent } from './activity/accommodations-activity/accommodations-activity.component';
import { SetProctoredComponent } from './activity/set-proctored/set-proctored.component';
import { environment } from '../environments/environment';
import { WORKFLOW_SERVICE_CONFIG } from './services/workflow.service';
import { SchedulingActivityComponent } from './activity/scheduling-activity/scheduling-activity.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ActivityViewComponent,
        ActivityDirective,
        HtmlActivityComponent,
        StatusActivityComponent,
        GatekeeperActivityComponent,
        SimpleCompleteActivityComponent,
        BaseActivityComponent,
        ReportActivityComponent,
        WaitActivityComponent,
        LanguageSelectActivityComponent,
        CertificationActivityComponent,
        SetProctoredComponent,
        ErrorViewComponent,
        AccommodationsActivityComponent,
        MenuActivityComponent,
        ErrorViewComponent,
        SchedulingActivityComponent
    ],
    entryComponents: [
        HtmlActivityComponent,
        StatusActivityComponent,
        GatekeeperActivityComponent,
        SimpleCompleteActivityComponent,
        ReportActivityComponent,
        WaitActivityComponent,
        LanguageSelectActivityComponent,
        CertificationActivityComponent,
        SetProctoredComponent,
        ErrorViewComponent,
        AccommodationsActivityComponent,
        MenuActivityComponent,
        ErrorViewComponent,
        SchedulingActivityComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
        BsDropdownModule.forRoot(),
        PfCommonModule,
        AppRoutingModule
    ],
    providers: [
        { provide: PF_AUTH_CONFIG, useValue: { jwtName: 'WF_AUTH' } },
        { provide: HTTP_INTERCEPTORS, useClass: PfAuthInterceptor, multi: true },
        { provide: PF_AUTH_INTERCEPTOR_CONFIG, useValue: { authenticatedUrls: ['.*/workflowinstances/.*'] } },
        { provide: WORKFLOW_SERVICE_CONFIG, useValue: environment.workflowServiceConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
