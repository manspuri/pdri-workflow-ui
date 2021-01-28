
import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { WorkflowService } from './../../services/workflow.service';
import { BaseActivityComponent } from '../base-activity/base-activity.component';
@Component({
    selector: '[wf-report-activity]',
    templateUrl: './report-activity.component.html',
    styleUrls: ['./report-activity.component.scss']
})
export class ReportActivityComponent extends BaseActivityComponent implements OnInit {

    instructions: SafeHtml = null;
    updating = false;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.setInstructions();
    }

    setInstructions() {
        if (this.activity.instructions !== null) {
            let instructions = this.replaceStandardVars(this.activity.instructions);
            if (this.activity.instructionVars !== null) {
                instructions = this.replaceVars(instructions, this.activity.instructionVars);
            }
            this.instructions = this.sanitizer.bypassSecurityTrustHtml(instructions);
        }
        window.scroll(0, 0);
    }

    next() {
        if (!this.updating) {
            this.errors.emit(BaseActivityComponent.NO_ERRORS);
            this.workflowService.updateActivity(this.activity.activityId, { done: true }).subscribe(
                (resp: any) => {
                    this.activity = resp;
                    if (this.activity.status === 'DONE') {
                        this.done.emit(true);
                        return;
                    }
                    this.updating = false;
                },
                (error: string) => {
                    this.errors.emit([error]);
                    window.scroll(0, 0);
                    this.updating = false;
                }
            );
        }
    }

}
