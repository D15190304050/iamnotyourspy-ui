import {Col, Row} from "antd";
import Questionnaire from "../Questionnaire";
import {useTranslation} from "react-i18next";

const Home = () =>
{
    const {t} = useTranslation()

    return (
        <Row>
            <Col span={12}>
                {/*Left side, chart.*/}
            </Col>
            <Col span={12}>
                {/*Right side, questionnaire*/}
                <h2 style={{lineHeight: "30px"}}>{t("submitYourInfo")}</h2>
                <div style={{width: "40vw"}}>
                    <Questionnaire/>
                </div>
            </Col>
        </Row>
    );
}

export default Home;