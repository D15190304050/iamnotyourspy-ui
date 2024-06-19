import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import i18n from "./commons/i18n.ts";
import {Provider} from "react-redux";
import store from "./commons/store.tsx";


i18n.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>,
)

