import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseActivityComponent } from '../base-activity/base-activity.component';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
    selector: '[wf-language-select-activity]',
    templateUrl: './language-select-activity.component.html',
    styleUrls: ['./language-select-activity.component.scss']
})
export class LanguageSelectActivityComponent extends BaseActivityComponent implements OnInit, OnDestroy {

    message: SafeHtml = null;
    language = '';
    currLanguage = '';
    availableLanguages: any = null;
    updating = false;

    private destroy$ = new Subject();

    constructor(private workflowService: WorkflowService, private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        if (this.activity.message !== null) {
            let message = this.replaceStandardVars(this.activity.message);
            if (this.activity.messageVars !== null) {
                message = this.replaceVars(message, this.activity.messageVars);
            }
            this.message = this.sanitizer.bypassSecurityTrustHtml(message);
            if (this.activity.currLanguage !== undefined) {
                this.language = this.activity.currLanguage;
            }
            this.workflowService.currentLanguage.pipe(takeUntil(this.destroy$)).subscribe(language => { this.currLanguage = language; this.language = language; });
            this.workflowService.availableLanguages.pipe(takeUntil(this.destroy$)).subscribe(availableLanguages => this.availableLanguages = availableLanguages);
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    languageChanged() {
        if (this.language !== this.currLanguage) {
            this.updateActivity({ language: this.language});
        }
    }

    next() {
        if (this.language !== '' && !this.updating) {
            this.updateActivity({ language: this.language, done: true });
        }
    }

    updateActivity(update) {
        this.updating = true;
        this.errors.emit(BaseActivityComponent.NO_ERRORS);
        this.workflowService.updateActivity(this.activity.activityId, update).subscribe(
            (resp: any) => {
                if (resp.languageSwitched) {
                    this.workflowService.switchLanguage(resp.currLanguage).subscribe(
                        () => {
                            window.scroll(0, 0);
                            this.updating = false;
                        },
                        (error: string) => {
                            this.errors.emit([error]);
                            window.scroll(0, 0);
                            this.updating = false;
                        }
                    );
                } else if (resp.status === 'DONE') {
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
