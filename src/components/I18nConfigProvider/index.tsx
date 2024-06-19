import {ConfigProvider, ConfigProviderProps} from "antd";
import {useEffect, useState} from "react";
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import zhCN from 'antd/locale/zh_CN';
import {useSelector} from "react-redux";
import I18nConstants from "../../constants/I18nConstants.ts";

type Locale = ConfigProviderProps['locale'];

const I18nConfigProvider = ({children}) =>
{
    // Set locale for antd components.
    let locale: Locale = enUS;
    const currentLanguage = useSelector(state => state.language);
    switch (currentLanguage)
    {
        case I18nConstants.LanguageEnglish:
            locale = enUS;
            break;
        case I18nConstants.LanguageFrench:
            locale = frFR;
            break;
        case I18nConstants.LanguageChinese:
            locale = zhCN;
            break;
    }

    return (
        <ConfigProvider locale={locale}>
            {children}
        </ConfigProvider>
    );
}

export default I18nConfigProvider;