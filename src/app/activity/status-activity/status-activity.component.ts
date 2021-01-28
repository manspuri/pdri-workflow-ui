import { Component, OnInit } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '[wf-status-activity]',
    templateUrl: './status-activity.component.html',
    styleUrls: ['./status-activity.component.scss']
})
export class StatusActivityComponent extends BaseActivityComponent implements OnInit {

    topMessage: SafeHtml = null;
    bottomMessage: SafeHtml = null;
    dateFmt: string;
    updating = false;
    faSquare = faSquare;
    faCheckSquare = faCheckSquare;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.setContent();
        this.dateFmt = this.getLocalDateFmt();
    }

    setContent() {
        if (this.activity.topMessage !== null) {
            let topMsg = this.replaceStandardVars(this.activity.topMessage);
            if (this.activity.messageVars !== null) {
                topMsg = this.replaceVars(topMsg, this.activity.messageVars);
            }
            this.topMessage = this.sanitizer.bypassSecurityTrustHtml(topMsg);
        }
        if (this.activity.bottomMessage !== null) {
            let bottomMsg = this.replaceStandardVars(this.activity.bottomMessage);
            if (this.activity.messageVars !== null) {
                bottomMsg = this.replaceVars(bottomMsg, this.activity.messageVars);
            }
            this.bottomMessage = this.sanitizer.bypassSecurityTrustHtml(bottomMsg);
        }
        window.scroll(0, 0);
    }

    getStatusClass(status) {
        if (status === 'COMPLETED' || status === 'DONE' || status === 'SKIPPED') {
            return 'wf-status-complete';
        } else if (status === 'IN_PROGRESS') {
            return 'wf-status-inprogress';
        } else {
            return 'wf-status-pending';
        }
    }

    getAriaStatus(status) {
        if (status === 'IN_PROGRESS') {
            return 'In Progress';
        } else if (status === 'COMPLETED' || status === 'DONE' || status === 'SKIPPED') {
            return 'Completed';
        } else {
            return 'Pending';
        }
    }

    next() {
        this.workflowService.updateActivity(this.activity.activityId, { done: true }).subscribe(
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
