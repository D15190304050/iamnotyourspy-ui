interface QuestionnaireOptionBase
{
    code: number,
    optionText: string,
}

interface LocaleQuestionnaireBase
{
    locale: string,
    options: QuestionnaireOptionBase[],
}

interface LocaleQuestionnaireOption
{
    locale: string,
    applicationStates: QuestionnaireOptionBase[]
    applicationSubmissionLocations: QuestionnaireOptionBase[]
    applicationTypes: QuestionnaireOptionBase[]
    countriesOfResidence: QuestionnaireOptionBase[]
    currentPassportCountries: QuestionnaireOptionBase[]
    genders: QuestionnaireOptionBase[]
    familyMembers: QuestionnaireOptionBase[]
}

export type {QuestionnaireOptionBase, LocaleQuestionnaireBase, LocaleQuestionnaireOption}