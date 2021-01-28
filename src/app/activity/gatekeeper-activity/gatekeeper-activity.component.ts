import { Component, HostBinding } from '@angular/core';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';

@Component({
    selector: '[wf-gatekeeper-activity]',
    templateUrl: './gatekeeper-activity.component.html',
    styleUrls: ['./gatekeeper-activity.component.scss']
})
export class GatekeeperActivityComponent extends BaseActivityComponent {

    constructor(private workflowService: WorkflowService) {
        super();
     }

    proceed() {
        this.workflowService.updateActivity(this.activity.activityId, { proceed: true }).subscribe(
            (resp: any) => {
                this.activity = resp;
                if (this.activity.status === 'DONE') {
                    this.done.emit(true);
                    return;
                }
            },
            (error: string) => {
                // this.activityErrors.push(error);
                window.scroll(0, 0);
            }
        );
    }
}
