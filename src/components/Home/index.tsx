import {Col, Row, Spin} from "antd";
import Questionnaire from "../Questionnaire";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {isNullOrUndefined} from "../../commons/Common.ts";
import axiosWithInterceptor from "../../axios/axios.tsx";
import {LocaleQuestionnaireBase, LocaleQuestionnaireOption} from "../../dtos/QuestionnaireOption.ts";
import StatisticsChart from "../StatisticsChart";
import {WaitingDaysResponse} from "../../dtos/StatisticsChartData.ts";

const Home = () =>
{
    const {t} = useTranslation()

    const [localeQuestionnaireOptions, setLocaleQuestionnaireOptions] = useState<LocaleQuestionnaireOption[]>();
    const [loading, setLoading] = useState(true);
    const [waitingDaysResponse, setWaitingDaysResponse] = useState<WaitingDaysResponse>();
    const [localeApplicationTypes, setLocaleApplicationTypes] = useState<LocaleQuestionnaireBase[]>()

    useEffect(() => {
        (async () =>
        {
            if (isNullOrUndefined(localeQuestionnaireOptions) || isNullOrUndefined(waitingDaysResponse))
            {
                // Get options.
                const optionResponse = await axiosWithInterceptor.get("/api/questionnaire/options");
                const options: LocaleQuestionnaireOption[] = optionResponse.data.data as LocaleQuestionnaireOption[];
                setLocaleQuestionnaireOptions(options);

                const localeApplicationTypes: LocaleQuestionnaireBase[] = options.map(x => ({locale: x.locale, options: x.applicationTypes}));
                setLocaleApplicationTypes(localeApplicationTypes);

                // Get statistics data.
                const statisticsResponse = await axiosWithInterceptor.get("/api/questionnaire/statistics");
                const waitingDays: WaitingDaysResponse = statisticsResponse.data.data as WaitingDaysResponse;
                setWaitingDaysResponse(waitingDays);

                setLoading(false);
            }
            else
            {
                setLoading(false);
            }
        })()
    }, []);

    return (
        <Spin spinning={loading} size="large" tip="Loading..." delay={500}>
            <Row>
                <Col span={12}>
                    {/*Left side, chart.*/}
                    <h2 style={{lineHeight: "30px"}}>{t("viewAggregateData")}</h2>
                    <div>
                        <StatisticsChart waitingDaysResponse={waitingDaysResponse}
                                         localeApplicationTypes={localeApplicationTypes}/>
                    </div>
                </Col>
                <Col span={12}>
                    {/*Right side, questionnaire*/}
                    <h2 style={{lineHeight: "30px"}}>{t("submitYourInfo")}</h2>
                    <div style={{width: "40vw"}}>
                        <Questionnaire localeQuestionnaireOptions={localeQuestionnaireOptions}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{background: "rgba(78,159,207,0.6)", padding: 1}}>
                        <h1>{t("averageWaitingTime")} {waitingDaysResponse?.averageWaitingDays} {t("days")}</h1>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
}

export default Home;