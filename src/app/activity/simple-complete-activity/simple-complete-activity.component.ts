import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { PfAuthService } from '@pfit2ng/common';

import { BaseActivityComponent } from '../base-activity/base-activity.component';

@Component({
    selector: '[wf-simple-complete-activity]',
    templateUrl: './simple-complete-activity.component.html',
    styleUrls: ['./simple-complete-activity.component.scss']
})
export class SimpleCompleteActivityComponent extends BaseActivityComponent implements OnInit {

    message: SafeHtml = null;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        if (this.activity.message !== null) {
            let message = this.replaceStandardVars(this.activity.message);
            if (this.activity.messageVars !== null) {
                message = this.replaceVars(message, this.activity.messageVars);
            }
            this.message = this.sanitizer.bypassSecurityTrustHtml(message);
        }
    }

}

