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
        //@TODO remove -- right now just mocking out schdeduling activity data
        activity.activityType = "SchedulingActivity"
        activity.accommodations = { type: "STATIC", value: "Extra Time"}
        activity.workflow = {
            name: "Scheduling Activity"
        }
        activity.rescheduleExamButtonText = "Reschedule Exam"
        activity.scheduleExamButtonText = "Schedule Exam"
        activity.textForNoSchedule = "No Available Exams"
        activity.cancelExamButtonText = "Cancel Exam"
        activity.textForTableOfScheduledExams = "Exams"
        activity.candidateIdStrategy = "externalOrgId"
        activity.clientId = "123asldni-94823"
        activity.examSeriesCode = "12345"
        activity.examSchedulingBegin = "12/31/2020"
        activity.examSchedulingEnd = "2/28/2021"
        activity.workflowInstanceAppointment = {
            _id: '123123',
            provider: 'pearson',
            providerAppointmentId: 'alne23124',
            candidateId: '12413124',
            providerCandidateId: '9234nise',
            appointmentStartTimestamp: 1614448800,
            appointmentEndTimestamp: 1614456000,
            status: 'CREATED',
            statusHistory: 'CREATED',
            scheduled: true,
            exams: [
                // assuming that there is always one object in the array
                {
                    examSeriesCode: 'EA938',
                    examName: 'Pearson USA Hire Exam'
                }
            ],
            testCenter: {
                testCenterName: 'Harriton Testing Center',
                testCenterAddress: {
                    address1: '123 Main Street',
                    city: 'Philadelphia',
                    state: 'PA',
                    postalCode: '12334',
                    country: 'United States of America'
                }
            }
        },
        activity.candidateAppointments = [
            {
                _id: '12382743',
                provider: 'pearson',
                providerAppointmentId: 'alne231283',
                candidateId: '12413124',
                providerCandidateId: '9234nise',
                appointmentStartTimestamp: 1614448800,
                appointmentEndTimestamp: 1614456000,
                status: 'PROVISIONED',
                statusHistory: 'PROVISIONED',
                scheduled: false,
                exams: [
                    {
                        examSeriesCode: 'EA938',
                        examName: 'Pearson USA Hire Exam'
                    }
                ],
                testCenter: {
                    testCenterName: 'Harriton Testing Center 2',
                    testCenterAddress: {
                        address1: '555 Main Street',
                        city: 'Philadelphia',
                        state: 'PA',
                        postalCode: '12334',
                        country: 'United States of America'
                    }
                }
            }
        ]
        // end @TODO

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
