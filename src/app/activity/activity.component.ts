import { Type, EventEmitter } from '@angular/core';
import { GatekeeperActivityComponent } from './gatekeeper-activity/gatekeeper-activity.component';
import { HtmlActivityComponent } from './html-activity/html-activity.component';
import { StatusActivityComponent } from './status-activity/status-activity.component';
import { SimpleCompleteActivityComponent } from './simple-complete-activity/simple-complete-activity.component';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { WaitActivityComponent } from './wait-activity/wait-activity.component';
import { LanguageSelectActivityComponent } from './language-select-activity/language-select-activity.component';
import { CertificationActivityComponent } from './certification-activity/certification-activity.component';
import { SetProctoredComponent } from './set-proctored/set-proctored.component';
import { AccommodationsActivityComponent } from './accommodations-activity/accommodations-activity.component';
import { MenuActivityComponent } from './menu-activity/menu-activity.component';
import { SchedulingActivityComponent } from './scheduling-activity/scheduling-activity.component';

export interface ActivityComponent {
    activity: any;
    errors: EventEmitter<string[]>;
    done: EventEmitter<boolean>;
}

export class ActivityComponentResolver {
    static getActivityComponent(activity): Type<any> {
        switch (activity.activityType) {
            case 'GateKeeperActivity':
                return GatekeeperActivityComponent;
            case 'HtmlActivity':
                return HtmlActivityComponent;
            case 'LanguageSelectActivity':
                return LanguageSelectActivityComponent;
            case 'SimpleCompleteActivity':
                return SimpleCompleteActivityComponent;
            case 'StatusActivity':
                return StatusActivityComponent;
            case 'ReportActivity':
                return ReportActivityComponent;
            case 'ReportCompleteActivity':
                return ReportActivityComponent;
            case 'WaitActivity':
                return WaitActivityComponent;
            case 'CertificationActivity':
                return CertificationActivityComponent;
            case 'SetProctoredActivity':
                return SetProctoredComponent;
            case 'AccommodationsActivity':
                return AccommodationsActivityComponent;
            case 'MenuActivity':
                return MenuActivityComponent;
            case 'SchedulingActivity':
                return SchedulingActivityComponent;
            default:
                return null;
        }
    }
}
