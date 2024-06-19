import './App.css'
import RoutePaths from "./constants/RoutePaths.ts";
import {Route, Routes} from "react-router-dom";
import GlobalLayout from "./components/GlobalLayout";
import Home from "./components/Home";
import EmailVerification from "./components/EmailVerification";
import i18n from "./commons/i18n.ts";

function App() {

    return (
        <GlobalLayout>
            <Routes>
                <Route path={RoutePaths.Home} element={<Home currentLanguage={i18n.language}/>}/>
                <Route path={RoutePaths.EmailVerification} element={<EmailVerification/>}/>
            </Routes>
        </GlobalLayout>
    );
}

export default App
