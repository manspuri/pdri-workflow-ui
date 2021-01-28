import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PfAuthService, delayedRetry } from '@pfit2ng/common';

import { environment } from '../../environments/environment';
import { L10nUtils } from '../l10n.component';

export const WORKFLOW_SERVICE_CONFIG = new InjectionToken('WORKFLOW_SERVICE_CONFIG');

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {

    static GENERAL_ERROR = 'GENERAL_ERROR';

    private languageSrc = new BehaviorSubject('');
    currentLanguage = this.languageSrc.asObservable();
    private availableLanguagesSrc = new BehaviorSubject(null);
    availableLanguages = this.availableLanguagesSrc.asObservable();

    constructor(private http: HttpClient, private authService: PfAuthService, @Inject(WORKFLOW_SERVICE_CONFIG) private config: any) { }

    setLanguage(language: string) {
        this.languageSrc.next(language);
    }

    setAvailableLanguages(availableLanguages: any) {
        this.availableLanguagesSrc.next(availableLanguages);
    }

    getSettings(): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any>(`${environment.serviceEndpoints.workflow}/workflowinstances/current/settings?instanceId=${this.authService.getCurrentSub()}`)
            .pipe(
                delayedRetry(
                    Number.isInteger(this.config.retryDelayMs) ? this.config.retryDelayMs : 250,
                    Number.isInteger(this.config.maxRetries) ? this.config.maxRetries : 1
                ),
                catchError(this.handleError),
                tap(resp => {
                    if (resp.availableLanguages !== null && resp.availableLanguages.length > 0) {
                        this.setLanguage(resp.language);
                        L10nUtils.setCustomMappings(resp.languageInfo);
                        const languageName = L10nUtils.getNameForLanguage(resp.language);
                        const availableLanguages = [{ language: resp.language, name: languageName }];
                        for (const language of resp.availableLanguages) {
                            if (language !== resp.language) {
                                availableLanguages.push({ language: language, name: L10nUtils.getNameForLanguage(language) });
                            }
                        }
                        this.setAvailableLanguages(availableLanguages.sort((l1, l2) => l1.name.localeCompare(l2.name)));
                    }
                })
            );
    }

    getActivity(): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any>(`${environment.serviceEndpoints.workflow}/workflowinstances/current/activity?instanceId=${this.authService.getCurrentSub()}`)
            .pipe(
                delayedRetry(
                    Number.isInteger(this.config.retryDelayMs) ? this.config.retryDelayMs : 250,
                    Number.isInteger(this.config.maxRetries) ? this.config.maxRetries : 1
                ),
                catchError(this.handleError)
            );
    }

    updateActivity(id, data): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.put<any>(`${environment.serviceEndpoints.workflow}/workflowinstances/current/activity/${id}?instanceId=${this.authService.getCurrentSub()}`, data)
            .pipe(
                delayedRetry(
                    Number.isInteger(this.config.retryDelayMs) ? this.config.retryDelayMs : 250,
                    Number.isInteger(this.config.maxRetries) ? this.config.maxRetries : 1
                ),
                catchError(this.handleError)
            );
    }

    switchLanguage(language): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.put<any>(`${environment.serviceEndpoints.workflow}/workflowinstances/current/language?instanceId=${this.authService.getCurrentSub()}`, { language: language })
            .pipe(
                delayedRetry(
                    Number.isInteger(this.config.retryDelayMs) ? this.config.retryDelayMs : 250,
                    Number.isInteger(this.config.maxRetries) ? this.config.maxRetries : 1
                ),
                catchError(this.handleError),
                tap(resp => {
                    if (resp.redirectUrl !== undefined && resp.redirectUrl.length > 0) {
                        window.location.href = resp.redirectUrl;
                    }
                })
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        let errorMsg = '';

        switch (error.status) {
            case 400: {
                if (error.error !== undefined && error.error.errors !== undefined && error.error.errors.length > 0) {
                    console.error(error.error.errors[0].code);
                }
                errorMsg = WorkflowService.GENERAL_ERROR;
                break;
            }
            case 401: {
                errorMsg = 'You are not authenticated.';
                break;
            }
            case 403: {
                errorMsg = 'You are not authorized to view this page.';
                break;
            }
            case 404: {
                errorMsg = 'Not Found';
                break;
            }
            default: {
                errorMsg = WorkflowService.GENERAL_ERROR;
                break;
            }
        }

        return throwError(errorMsg);
    }
}
