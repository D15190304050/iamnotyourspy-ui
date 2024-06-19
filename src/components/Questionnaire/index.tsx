import React, {useEffect, useState} from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    FormProps,
    Input,
    InputNumber,
    Mentions,
    Select,
    Spin,
    message,
    TreeSelect,
} from 'antd';
import axiosWithInterceptor, {jsonHeader} from "../../axios/axios.tsx";
import {LocaleQuestionnaireOption} from "../../dtos/QuestionnaireOption.ts";
import {isNullOrUndefined} from "../../commons/Common.ts";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const datePickerWidth = {width: "200px"};

const Questionnaire = () => {
    const currentLanguage = useSelector(state => state.language);
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [optionsOfSelectedLocale, setOptionsOfSelectedLocale] = useState<LocaleQuestionnaireOption>();
    const [localeQuestionnaireOptions, setLocaleQuestionnaireOptions] = useState<LocaleQuestionnaireOption[]>();
    const [separatedWithFamilyChecked, setSeparatedWithFamilyChecked] = useState(false);
    const [delayedEnrollmentChecked, setDelayedEnrollmentChecked] = useState(false);
    const [unableToChangeJobChecked, setUnableToChangeJobChecked] = useState(false);

    const refreshOptionLocale = (options: LocaleQuestionnaireOption[]) =>
    {
        const optionsOfSelectedLocale = options?.filter(x => x.locale.startsWith(currentLanguage))[0];
        setOptionsOfSelectedLocale(optionsOfSelectedLocale);
    }

    const onSeparatedWithFamilyCheckedChange = (e) =>
    {
        setSeparatedWithFamilyChecked(e.target.checked);
    }

    const onDelayedEnrollmentCheckedChange = (e) =>
    {
        setDelayedEnrollmentChecked(e.target.checked);
    }

    const onUnableToChangeJobChecked = (e) =>
    {
        setUnableToChangeJobChecked(e.target.checked);
    }

    const onFinish: FormProps['onFinish'] = (values) =>
    {
        values.applicationSubmissionDate = (new Date(values.applicationSubmissionDate)).getTime();
        values.applicationEndDate = (new Date(values.applicationEndDate)).getTime();
        values.dateOfEnteringSecurityScreening = (new Date(values.dateOfEnteringSecurityScreening)).getTime();
        values.dateOfClearingSecurityScreening = (new Date(values.dateOfClearingSecurityScreening)).getTime();
        values.lastUpdateDateFromIrcc = (new Date(values.lastUpdateDateFromIrcc)).getTime();
        values.originalSchoolStartDate = (new Date(values.originalSchoolStartDate)).getTime();
        values.originalSchoolEndDate = (new Date(values.originalSchoolEndDate)).getTime();

        // console.log("Form data to submit = ", values);

        axiosWithInterceptor.post("/api/questionnaire/submit", values, jsonHeader)
            .then(response =>
            {
                const data = response.data;

                if (data.success)
                    message.info("We've sent you an email, please check it ASAP.");
                else
                    message.error(data.message);
            });
    };

    useEffect(() => {
        if (isNullOrUndefined(localeQuestionnaireOptions))
        {
            axiosWithInterceptor.get("/api/questionnaire/options")
                .then(response => {
                    const options = response.data.data as LocaleQuestionnaireOption[];
                    setLocaleQuestionnaireOptions(options);
                    refreshOptionLocale(options);
                    setLoading(false);
                });
        }
        else
        {
            refreshOptionLocale(localeQuestionnaireOptions as LocaleQuestionnaireOption[]);
            setLoading(false);
        }
    }, [currentLanguage])

    return (
        <Spin spinning={loading} size="large" tip="Loading..." delay={500}>
            <Form
                {...formItemLayout}
                style={{textAlign: "left"}}
                onFinish={onFinish}
            >
                <Form.Item label={t("emailAddress")} name="emailAddress" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={t("applicationType")} name="applicationType" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.applicationTypes.map(option => ({label: t(option.optionText), value: option.code}))}/>
                </Form.Item>

                <Form.Item label={t("applicationSubmissionLocation")} name="applicationSubmissionLocation" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.applicationSubmissionLocations.map(option => ({label: t(option.optionText), value: option.code}))}/>
                </Form.Item>

                <Form.Item label={t("countryOfResidence")} name="countryOfResidence" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.countriesOfResidence.map(option => ({label: t(option.optionText), value: option.code}))}/>
                </Form.Item>

                <Form.Item label={t("currentPassportCountry")} name="currentPassportCountry" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.currentPassportCountries.map(option => ({label: t(option.optionText), value: option.code}))}/>
                </Form.Item>

                <Form.Item label={t("gender")} name="gender" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.genders.map(option => ({label: t(option.optionText), value: option.code}))}/>
                </Form.Item>

                <Form.Item
                    label={t("applicationSubmissionDate")}
                    name="applicationSubmissionDate"
                    rules={[{ required: true, message: t('pleaseInput') }]}
                >
                    <DatePicker style={datePickerWidth}/>
                </Form.Item>

                <Form.Item
                    label={t("applicationEndDate")}
                    name="applicationEndDate"
                >
                    <DatePicker style={datePickerWidth}/>
                </Form.Item>

                <Form.Item
                    label={t("dateOfEnteringSecurityScreening")}
                    name="dateOfEnteringSecurityScreening"
                    rules={[{ required: true, message: t('pleaseInput') }]}
                >
                    <DatePicker style={datePickerWidth}/>
                </Form.Item>

                <Form.Item
                    label={t("dateOfClearingSecurityScreening")}
                    name="dateOfClearingSecurityScreening"
                >
                    <DatePicker style={datePickerWidth}/>
                </Form.Item>

                <Form.Item label={t("currentApplicationState")} name="currentApplicationState" rules={[{ required: true, message: t('pleaseInput') }]}>
                    <Select options={optionsOfSelectedLocale?.applicationStates.map(option => ({label: option.optionText, value: option.code}))}/>
                </Form.Item>

                <Form.Item
                    name="separatedWithFamily"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox onChange={onSeparatedWithFamilyCheckedChange}>{t("separatedWithFamily")}</Checkbox>
                </Form.Item>

                {
                    separatedWithFamilyChecked &&
                    (
                        <Form.Item
                            label={t("separateFamilyMembers")}
                            name="separateFamilyMembers"
                            rules={[{ required: separatedWithFamilyChecked, message: t('pleaseInput') }]}
                        >
                            <Select options={optionsOfSelectedLocale?.familyMembers.map(option => ({label: option.optionText, value: option.code}))}/>
                        </Form.Item>
                    )
                }

                {
                    separatedWithFamilyChecked &&
                    (
                        <Form.Item
                            label={t("separationTimeInMonths")}
                            name="separationWithFamilyInMonths"
                            rules={[{ required: separatedWithFamilyChecked, message: t('pleaseInput') }]}
                        >
                            <InputNumber min={1} max={999} precision={0}/>
                        </Form.Item>
                    )
                }

                <Form.Item
                    name="delayedEnrollment"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox onChange={onDelayedEnrollmentCheckedChange}>{t("delayedEnrollment")}</Checkbox>
                </Form.Item>

                {
                    delayedEnrollmentChecked &&
                    (
                        <Form.Item
                            label={t("originalSchoolStartDate")}
                            name="originalSchoolStartDate"
                            rules={[{ required: delayedEnrollmentChecked, message: t('pleaseInput') }]}
                        >
                            <DatePicker style={datePickerWidth}/>
                        </Form.Item>
                    )
                }

                {
                    delayedEnrollmentChecked &&
                    (
                        <Form.Item
                            label={t("originalSchoolEndDate")}
                            name="originalSchoolEndDate"
                            rules={[{ required: delayedEnrollmentChecked, message: t('pleaseInput') }]}
                        >
                            <DatePicker style={datePickerWidth}/>
                        </Form.Item>
                    )
                }

                <Form.Item
                    name="unableToChangeJob"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox onChange={onUnableToChangeJobChecked}>{t("unableToChangeJob")}</Checkbox>
                </Form.Item>

                {
                    unableToChangeJobChecked &&
                    (
                        <Form.Item
                            label={t("currentSalaryInCad")}
                            name="currentSalaryInCad"
                            rules={[{ required: unableToChangeJobChecked, message: t('pleaseInput') }]}
                        >
                            <InputNumber/>
                        </Form.Item>
                    )
                }

                {
                    unableToChangeJobChecked &&
                    (
                        <Form.Item
                            label={t("estimatedSalaryInCad")}
                            name="estimatedSalaryInCad"
                            rules={[{ required: unableToChangeJobChecked, message: t('pleaseInput') }]}
                        >
                            <InputNumber/>
                        </Form.Item>
                    )
                }

                <Form.Item
                    label={t("lastUpdateDateFromIrcc")}
                    name="lastUpdateDateFromIrcc"
                    rules={[{ required: true, message: t('pleaseInput') }]}
                >
                    <DatePicker style={datePickerWidth}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {t("submit")}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Questionnaire;