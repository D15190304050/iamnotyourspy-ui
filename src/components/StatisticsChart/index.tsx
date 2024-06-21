import {Column} from '@ant-design/plots';
import {useEffect, useState} from 'react';
import {ChartDataDto, IndexedChartDataDto} from "../../dtos/ChartDataDto.ts";
import {AverageWaitingDaysByApplicationType} from "../../dtos/StatisticsChartData.ts";
import {isNullOrUndefined} from "../../commons/Common.ts";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {QuestionnaireOptionBase} from "../../dtos/QuestionnaireOption.ts";

const data: ChartDataDto[] = [];

const StatisticsChart = ({waitingDaysResponse, localeApplicationTypes}) =>
{
    const { t } = useTranslation();

    const config = {
        data: data,
        xField: 'type',
        yField: 'value',
        style: {
            fill: "#f2d086",
            maxWidth: 80
        },
        label: {
            text: (originData: ChartDataDto) => {
                return originData.value + " " + t("days");
            },
            fill: "rgb(121,26,198)",
            offset: 10,
        },
        interaction: {
            tooltip: {
                render: (event, {title, items}) => title + " " + items[0].value + " " + t("days"),
            },
        },
        legend: false,
    };

    const currentLanguage = useSelector(state => state.language);
    const [barChartData, setBarChartData] = useState(config);

    useEffect(() =>
    {
        if (!isNullOrUndefined(waitingDaysResponse))
        {
            const averageWaitingDaysOfApplicationTypes: AverageWaitingDaysByApplicationType[] = waitingDaysResponse.averageWaitingDaysOfApplicationTypes;
            const applicationTypesForLocale: QuestionnaireOptionBase[] = localeApplicationTypes.filter(x => x.locale.startsWith(currentLanguage))[0].options;

            const chartData: IndexedChartDataDto[] = averageWaitingDaysOfApplicationTypes.map(x =>
                ({
                    type: x.applicationType,
                    value: x.averageWaitingDays,
                }));

            const chartDataWithLocaleXLabel: ChartDataDto[] = chartData.map(x =>
                ({
                    type: applicationTypesForLocale.filter(applicationType => x.type === applicationType.code)[0].optionText,
                    value: x.value
                }));

            setBarChartData({...config, data: chartDataWithLocaleXLabel});
        }
    }, [waitingDaysResponse, currentLanguage]);

    return (
        <div>
            <Column {...barChartData} />
        </div>
    );
}

export default StatisticsChart;