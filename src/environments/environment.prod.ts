export const environment = {
    production: true,
    headerTitle: window['pfHeaderTitle'] !== undefined ? window['pfHeaderTitle']
        : { 'default': { title: 'PerformanceFIT' } },
    serviceEndpoints: window['pfServiceEndpoints'] !== undefined ? window['pfServiceEndpoints'] : { workflow: '/wf/v1' },
    languageCssUrls: window['pfLanguageCssUrls'] !== undefined ? window['pfLanguageCssUrls']
        : [
            { language: 'ar', cssUrl: '/assets/l10n/rtl.css' },
            { language: 'he', cssUrl: '/assets/l10n/rtl.css' }
        ],
    languageInfo: window['pfLanguageInfo'] !== undefined ? window['pfLanguageInfo'] : null,
    workflowServiceConfig: window['pfWorkflowServiceConfig'] !== undefined ? window['pfWorkflowServiceConfig'] : {}
};
