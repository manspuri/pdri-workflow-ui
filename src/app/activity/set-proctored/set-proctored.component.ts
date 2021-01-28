import { Component, OnInit } from '@angular/core';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '[wf-set-proctored]',
    templateUrl: './set-proctored.component.html',
    styleUrls: ['./set-proctored.component.scss']
  })
  export class SetProctoredComponent extends BaseActivityComponent implements OnInit {

    message: SafeHtml = '<p>You must continue this workflow from a proctored testing center.</p>';

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.setContent();
    }

    setContent() {
        if (this.activity.message) {
            let msg = this.replaceStandardVars(this.activity.message);
            if (this.activity.messageVars !== null) {
                msg = this.replaceVars(msg, this.activity.messageVars);
            }
            this.message = this.sanitizer.bypassSecurityTrustHtml(msg);
        }
        window.scroll(0, 0);
    }

}
