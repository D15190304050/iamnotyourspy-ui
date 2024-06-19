import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enResources from "../assets/i18n/en-us.json"
import frResources from "../assets/i18n/fr-fr.json"
import zhResources from "../assets/i18n/zh-cn.json"
import I18nConstants from "../constants/I18nConstants.ts";

// 语言资源
const resources = {
    "en": {
        translation: enResources,
    },
    "fr": {
        translation: frResources,
    },
    "zh": {
        translation: zhResources,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: I18nConstants.DefaultLanguage, // 设置默认语言
        fallbackLng: I18nConstants.DefaultLanguage, // 如果找不到翻译，默认使用哪种语言
        interpolation: {
            escapeValue: false, // 不转义HTML标签
        },
    });

export default i18n;