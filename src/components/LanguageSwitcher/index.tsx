import { useTranslation } from 'react-i18next';
import {Button, Space} from "antd";
import {useEffect} from "react";
import I18nConstants from "../../constants/I18nConstants.ts";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setLanguage} from "../../commons/languageActions.ts";
import I18nConfigProvider from "../I18nConfigProvider";

const LanguageSwitcher = ({children}) => {
    const { i18n } = useTranslation();
    const dispatch: Dispatch = useDispatch();

    const changeLanguageHandler = (language: string) => {
        i18n.changeLanguage(language)
            .then(x => dispatch(setLanguage({language: language})));
    };

    useEffect(() =>
    {
        i18n.on('languageChanged', (currentLang) => {
            // console.log("Current selected language: " + currentLang);
        });
    }, [])

    return (
        <div>
            <Space>
                <Button onClick={() => changeLanguageHandler(I18nConstants.LanguageEnglish)}>English</Button>
                <Button onClick={() => changeLanguageHandler(I18nConstants.LanguageFrench)}>Français</Button>
                <Button onClick={() => changeLanguageHandler(I18nConstants.LanguageChinese)}>中文</Button>
            </Space>

            {/*{React.Children.map(children, child => React.cloneElement(child, {currentLanguage}))}*/}
            <I18nConfigProvider>
                {children}
            </I18nConfigProvider>
        </div>
    );
}

export default LanguageSwitcher;