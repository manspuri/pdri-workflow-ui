import { Component, OnInit } from '@angular/core';
import { PfUtils } from '@pfit2ng/common';

import { environment } from '../../environments/environment';

@Component({
    selector: 'wf-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    title: string = null;

    constructor() { }

    ngOnInit() {
        const headerTitle = PfUtils.getLanguageInfo(PfUtils.getPageLanguage(), environment.headerTitle, {});
        this.title = headerTitle ? headerTitle.title : environment.headerTitle['default'].title;
    }

}
