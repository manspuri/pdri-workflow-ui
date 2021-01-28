import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from '../../services/workflow.service';

@Component({
    selector: '[wf-html-activity]',
    templateUrl: './html-activity.component.html',
    styleUrls: ['./html-activity.component.scss']
})
export class HtmlActivityComponent extends BaseActivityComponent implements OnInit {

    currentContent: SafeHtml = null;
    updating = false;

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.setContent();
    }

    setContent() {
        let content = this.replaceStandardVars(this.activity.pages[this.activity.currentPage]);
        if (this.activity.pageVars !== null) {
            content = this.replaceVars(content, this.activity.pageVars);
        }
        this.currentContent = this.sanitizer.bypassSecurityTrustHtml(content);
        window.scroll(0, 0);
    }

    next() {
        if (!this.updating) {
            this.activity.currentPage++;
            if (this.activity.currentPage >= this.activity.pages.length) {
                this.activity.currentPage = this.activity.pages.length - 1;
                this.updateActivity({ done: true, currentPage: this.activity.currentPage });
            } else {
                this.setContent();
                this.updateActivity({ currentPage: this.activity.currentPage });
            }
        }
    }

    back() {
        if (!this.updating) {
            this.activity.currentPage--;
            if (this.activity.currentPage < 0) {
                this.activity.currentPage = 0;
            }
            this.setContent();
            this.updateActivity({ currentPage: this.activity.currentPage });
        }
    }

    private updateActivity(update) {
        this.updating = true;
        this.errors.emit(BaseActivityComponent.NO_ERRORS);
        this.workflowService.updateActivity(this.activity.activityId, update).subscribe(
            (resp: any) => {
                this.activity = resp;
                if (this.activity.status === 'DONE') {
                    this.done.emit(true);
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
