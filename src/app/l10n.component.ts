import { PfUtils } from '@pfit2ng/common';

import { environment } from '../environments/environment';

const __infoMappings: any = {
    'default': { name: '', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'ar': { name: 'عربية', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'bn': { name: 'বাংলা', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'de': { name: 'Deutsch', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'de-AT': { name: 'Österreichisches Deutsch', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'de-CH': { name: 'Schweizer Hochdeutsch', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'en': { name: 'English', dateFmt: 'MM/dd/yyyy', dateTimeFmt: 'MM/dd/yyyy h:mm:ss a' },
    'en-AU': { name: 'Australian English', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'en-CA': { name: 'Canadian English', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'en-GB': { name: 'British English', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'en-US': { name: 'American English', dateFmt: 'MM/dd/yyyy', dateTimeFmt: 'MM/dd/yyyy h:mm:ss a' },
    'es': { name: 'Español', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'es-ES': { name: 'Español de España', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'es-MX': { name: 'Español de México', dateFmt: 'MM/dd/yyyy', dateTimeFmt: 'MM/dd/yyyy h:mm:ss a' },
    'fa': { name: 'فارسی', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'fr': { name: 'Français', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'fr-CA': { name: 'Français Canadien', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'fr-CH': { name: 'Français Suisse', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'he': { name: 'עברית', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'hi': { name: 'हिन्दी', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'it': { name: 'Italiano', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'ja': { name: '日本語', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'ko': { name: '한국어', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'nl': { name: 'Nederlands', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'pt': { name: 'Português', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'ro': { name: 'Română', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'ru': { name: 'Pусский', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'zh': { name: '中文', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'zh-Hans': { name: '简体中文', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' },
    'zh-Hant': { name: '繁體中文', dateFmt: 'yyyy-MM-dd', dateTimeFmt: 'yyyy-MM-dd h:mm:ss a' }
};

let __customMappings: any = {};

if (environment.languageInfo !== null) {
    for (const language of Object.keys(environment.languageInfo)) {
        const envInfo = environment.languageInfo[language];

        if (envInfo) {
            const currInfo = __infoMappings[language];

            if (currInfo) {
                if (envInfo.name !== null) {
                    currInfo.name = envInfo.name;
                }
                if (envInfo.shortDate !== null) {
                    currInfo.shortDate = envInfo.shortDate;
                }
            } else {
                __infoMappings[language] = envInfo;
            }
        }
    }
}

export class LanguageInfo {
    name: string = null;
    dateFmt: string = null;
    dateTimeFmt: string = null;
}

export class L10nUtils {

    static setCustomMappings(customMappings: any) {
        __customMappings = customMappings ? customMappings : {};
    }

    static getNameForLanguage(language): string {
        const languageInfo = PfUtils.getLanguageInfo(language, __infoMappings, __customMappings);

        return languageInfo ? languageInfo.name : __infoMappings['default'].name;
    }

    static getDateFmtForLanguage(language): string {
        const languageInfo = PfUtils.getLanguageInfo(language, __infoMappings, __customMappings);

        return languageInfo && languageInfo.dateFmt !== null ? languageInfo.dateFmt : __infoMappings['default'].dateFmt;
    }

    static getDateTimeFmtForLanguage(language): string {
        const languageInfo = PfUtils.getLanguageInfo(language, __infoMappings, __customMappings);

        return languageInfo && languageInfo.dateTimeFmt !== null ? languageInfo.dateTimeFmt : __infoMappings['default'].dateTimeFmt;
    }
}
