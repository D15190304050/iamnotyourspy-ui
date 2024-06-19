import {GlobalLanguage} from "../dtos/GlobalLanguage.ts";
import I18nConstants from "../constants/I18nConstants.ts";

export const setLanguage = (globalLanguage: GlobalLanguage | null) => ({
    type: I18nConstants.Language,
    payload: globalLanguage,
});
