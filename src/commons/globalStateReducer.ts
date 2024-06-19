import I18nConstants from "../constants/I18nConstants.ts";

const initialState = {
    language: I18nConstants.DefaultLanguage,
};

const globalStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case I18nConstants.Language:
            return { ...state, language: action.payload.language };
        // 添加更多cases
        default:
            return state;
    }
};

export default globalStateReducer;