import {Layout, theme} from 'antd';
import LanguageSwitcher from "../LanguageSwitcher";
import {useTranslation} from "react-i18next";


const { Header, Content, Footer } = Layout;


const GlobalLayout = ({children}) => {
    const { t } = useTranslation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '95vh', width: "95vw" }}>
            <Header style={{ position: "sticky", alignItems: 'center', height: "100px" }}>
                <h2 style={{color: "white", textAlign: "center", lineHeight: "20px"}}>{t("endProfiling")}</h2>
                <h4 style={{color: "white", textAlign: "center", lineHeight: "20px", fontSize: "18px"}}>{t("noSpy")}</h4>
            </Header>
            <Content style={{padding: '0'}}>
                <div
                    style={{
                        background: colorBgContainer,
                        // minHeight: 280,
                        padding: 5,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <LanguageSwitcher>
                        {children}
                    </LanguageSwitcher>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {t("noSpy")} ©2024-{new Date().getFullYear()} Powered by Team NoSpy
            </Footer>
        </Layout>
    );
};

export default GlobalLayout;