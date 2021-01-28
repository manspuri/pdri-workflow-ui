import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faLanguage } from '@fortawesome/free-solid-svg-icons/faLanguage';
import { PfUtils } from '@pfit2ng/common';

import { environment } from '../../../environments/environment';
import { WorkflowService } from '../../services/workflow.service';
import { ActivityDirective } from '../activity.directive';
import { ActivityComponentResolver, ActivityComponent } from '../activity.component';
import { L10nUtils } from '../../l10n.component';

@Component({
    selector: '[wf-activity-view]',
    templateUrl: './activity-view.component.html',
    styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit, OnDestroy {

    @ViewChild(ActivityDirective) activityDisplay: ActivityDirective;
    activityErrors: string[] = [];
    generalError = false;
    currentLanguage: string;
    currentLanguageName: string;
    availableLanguages: any[] = null;
    enableLanguageSelection: false;
    generalErrorMsg: SafeHtml = null;
    faLanguage = faLanguage;
    title: string = null;
    postAction: string = null;
    postFields: any[] = null;

    private destroy$ = new Subject();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private activityViewElementRef: ElementRef,
        private sanitizer: DomSanitizer,
        private workflowService: WorkflowService) {
    }

    ngOnInit() {
        this.getSettngs();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getSettngs() {
        this.activityErrors = [];
        const headerTitle = PfUtils.getLanguageInfo(PfUtils.getPageLanguage(), environment.headerTitle, {});
        this.title = headerTitle ? headerTitle.title : environment.headerTitle['default'].title;
        this.workflowService.getSettings().subscribe(
            (resp: any) => {
                if (resp.availableLanguages !== null && resp.availableLanguages.length > 0) {
                    this.workflowService.currentLanguage.pipe(takeUntil(this.destroy$)).subscribe(language => this.currentLanguage = language);
                    this.currentLanguageName = L10nUtils.getNameForLanguage(this.currentLanguage);
                    this.workflowService.availableLanguages.pipe(takeUntil(this.destroy$)).subscribe(availableLanguages => this.availableLanguages = availableLanguages);
                    this.enableLanguageSelection = resp.enableLanguageSelection;
                }
                if (resp.customErrorMsgs && resp.customErrorMsgs.generalErrorMsg) {
                    this.generalErrorMsg = this.sanitizer.bypassSecurityTrustHtml(resp.customErrorMsgs.generalErrorMsg);
                }
                this.getActivity();
            },
            (error: string) => {
                this.displayErrors([error]);
                window.scroll(0, 0);
            }
        );
    }

    getActivity() {
        this.activityErrors = [];
        this.workflowService.getActivity().subscribe(
            (resp: any) => {
                if (resp.redirectUrl !== undefined && resp.redirectUrl.length > 0) {
                    if (resp.postData) {
                        this.postAction = resp.redirectUrl;
                        this.postFields = [];
                        for (const key of Object.keys(resp.postData)) {
                            let value = resp.postData[key];
                            if (typeof value === 'object') {
                                value = JSON.stringify(value);
                            }
                            this.postFields.push({ name: key, value: value });
                        }
                        setTimeout(() => {
                            this.activityViewElementRef.nativeElement.querySelector('#postFrm').submit();
                        }, 0);
                    } else {
                        window.location.href = resp.redirectUrl;
                    }
                } else {
                    this.displayActivity(resp);
                }
                window.scroll(0, 0);
            },
            (error: string) => {
                this.displayErrors([error]);
                window.scroll(0, 0);
            }
        );
    }

    displayActivity(activity) {
        const activityComponent = ActivityComponentResolver.getActivityComponent(activity);

        this.activityErrors = [];
        if (activityComponent !== null) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(activityComponent);
            const viewContainerRef = this.activityDisplay.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<ActivityComponent>componentRef.instance).activity = activity;
            (<ActivityComponent>componentRef.instance).errors.subscribe((errors) => {
                this.displayErrors(errors);
            });
            (<ActivityComponent>componentRef.instance).done.subscribe(() => {
                this.getActivity();
            });
        } else {
            console.error(`Unsupported activity: ${activity.activityType}`);
            this.displayErrors([WorkflowService.GENERAL_ERROR]);
            window.scroll(0, 0);
        }
    }

    displayErrors(errors: string[]) {
        if (errors && errors.length > 0 && errors[0] === WorkflowService.GENERAL_ERROR) {
            this.generalError = true;
            this.activityErrors = null;
        } else {
            this.generalError = false;
            this.activityErrors = errors;
        }
    }

    switchLanguage(language) {
        if (language !== this.currentLanguage) {
            this.activityErrors = [];
            this.workflowService.switchLanguage(language).subscribe(
                () => {
                    window.scroll(0, 0);
                },
                (error: string) => {
                    this.displayErrors([error]);
                    window.scroll(0, 0);
                }
            );
        }
    }

}
