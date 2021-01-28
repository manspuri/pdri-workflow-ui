import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { PfUtils } from '@pfit2ng/common';

import { environment } from '../../environments/environment';

@Component({
    selector: 'wf-error-view',
    templateUrl: './error-view.component.html',
    styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent implements OnInit {
    errorMsg: SafeHtml = null;
    title: string = null;

    private defaultErrorMsgs = {
        WF_ERR_GENERAL: 'A problem occured. Please try again. If the problem persists please contact the approriate help desk.',
        WF_ERR_EXPIRED: 'This workflow has expired.',
        WF_ERR_UNAVAILABLE: 'This workflow is not yet available.',
        ERR_NOT_FOUND: 'Workflow not found.',
        WF_ERR_PROCTORED: 'This workflow may only be accessed from a proctored test center.'
    };

    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        const headerTitle = PfUtils.getLanguageInfo(PfUtils.getPageLanguage(), environment.headerTitle, {});
        this.title = headerTitle ? headerTitle.title : environment.headerTitle['default'].title;
        this.activeRoute.queryParams.subscribe(
            params => {
                let errorMsg = params['errMsg'];
                if (errorMsg !== undefined && errorMsg.length > 0) {
                    if (errorMsg.indexOf('~') === 0) {
                        errorMsg = atob(errorMsg.substring(1).replace(/-/g, '+').replace(/_/g, '/').replace(/%3[dD]/g, '='));
                    }
                } else {
                    errorMsg = 'WF_ERR_GENERAL';
                }
                if (this.defaultErrorMsgs[errorMsg]) {
                    errorMsg = `<div class="alert alert-danger">${this.defaultErrorMsgs[errorMsg]}</div>`;
                }
                this.errorMsg = this.sanitizer.bypassSecurityTrustHtml(errorMsg);
            }
        );
    }
}
