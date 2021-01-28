import { Component, OnInit } from '@angular/core';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: '[wf-certification-activity]',
  templateUrl: './certification-activity.component.html',
  styleUrls: ['./certification-activity.component.scss']
})
export class CertificationActivityComponent extends BaseActivityComponent implements OnInit {

    message: SafeHtml = null;
    certified = false;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.setContent();
    }

    setContent() {
        if (this.activity.message !== null && this.activity.message !== '') {
            let msg = this.replaceStandardVars(this.activity.message);
            if (this.activity.messageVars !== null) {
                msg = this.replaceVars(msg, this.activity.messageVars);
            }
            this.message = this.sanitizer.bypassSecurityTrustHtml(msg);
        }
        window.scroll(0, 0);
    }

    next() {
        this.workflowService.updateActivity(this.activity.activityId, { done: true, certified: this.certified }).subscribe(
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
