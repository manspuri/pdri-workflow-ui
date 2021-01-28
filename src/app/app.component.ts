import { Component, AfterContentInit } from '@angular/core';
import { PfAuthService, PfUtils } from '@pfit2ng/common';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
    title = 'app';

    constructor(private authService: PfAuthService) {
        const jwt = window.location.hash;
        if (jwt !== undefined) {
            window.location.hash = '';
            if (jwt.length > 1) {
                this.authService.setCurrentJwt(jwt.substr(1, jwt.length));
            }
        }
    }

    ngAfterContentInit() {
        if (environment.languageCssUrls !== null) {
            let language = PfUtils.getPageLanguage();
            if (language !== undefined) {
                language = PfUtils.removeLanguageRegion(language);
                for (const languageCssUrl of environment.languageCssUrls) {
                    if (languageCssUrl.language === language) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = languageCssUrl.cssUrl;
                        document.head.appendChild(link);
                        break;
                    }
                }
            }
        }
    }
}
