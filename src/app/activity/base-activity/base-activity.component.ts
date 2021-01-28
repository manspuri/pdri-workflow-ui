import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { ActivityComponent } from '../activity.component';
import { L10nUtils } from '../../l10n.component';

@Component({
    selector: 'wf-base-activity',
    template: '<p>base-activity works!</p>',
    styles: []
})
export class BaseActivityComponent implements ActivityComponent {

    static NO_ERRORS = [];

    @HostBinding('class') private hostClass = 'container-fluid wf-activity-body';
    @Input() activity: any;
    @Output() errors = new EventEmitter<string[]>();
    @Output() done = new EventEmitter<boolean>();

    constructor() { }

    replaceStandardVars(template: string): string {
        let replaced = template.replace(/\$\{w.name\}/g, this.activity.workflow.name);
        replaced = replaced.replace(/\$\{w.reentryUrl\}/g, this.activity.workflow.reentryUrl);
        if (this.activity.candidate !== null) {
            replaced = replaced.replace(/\$\{c.firstName\}/g, this.activity.candidate.firstName !== null
                ? this.activity.candidate.firstName : '');
            replaced = replaced.replace(/\$\{c.lastName\}/g, this.activity.candidate.lastName !== null
                ? this.activity.candidate.lastName : '');
        } else {
            replaced = replaced.replace(/\$\{c.firstName\}/g, '');
            replaced = replaced.replace(/\$\{c.lastName\}/g, '');
        }

        return replaced;
    }

    replaceVars(template: string, vars: any[]): string {
        let replaced = template;
        for (const v of vars) {
            replaced = replaced.replace(new RegExp(`\\$\\{${v.name}\\}`, 'g'), v.value);
        }

        return replaced;
    }

    getLocalDateFmt() {
        return L10nUtils.getDateFmtForLanguage(this.activity.language);
    }

    getLocalDateTimeFmt() {
        return L10nUtils.getDateTimeFmtForLanguage(this.activity.language);
    }

}
