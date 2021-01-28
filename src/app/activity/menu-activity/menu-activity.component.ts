import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: '[wf-menu-activity]',
    templateUrl: './menu-activity.component.html',
    styleUrls: ['./menu-activity.component.scss']
})
export class MenuActivityComponent extends BaseActivityComponent implements OnInit {

    updating = false;
    selectedValue = null;
    question: SafeHtml = null;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        if (this.activity.question) {
            this.question = this.sanitizer.bypassSecurityTrustHtml(this.activity.question);
        }
    }

    next(value) {
        if (!this.updating) {
            this.errors.emit(BaseActivityComponent.NO_ERRORS);
            this.workflowService.updateActivity(this.activity.activityId, { done: true, answer: value }).subscribe(
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
