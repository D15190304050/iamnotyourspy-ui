import {useEffect, useState} from "react";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import AuthKeys from "../../constants/AuthKeys.ts";
import {isNullOrUndefined} from "../../commons/Common.ts";
import axiosWithInterceptor from "../../axios/axios.tsx";
import {Button} from "antd";

const EmailVerification = () =>
{
    const [promptText, setPromptText] = useState("Verifying...");
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    const location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const redirectUrlParam: string | null = queryParams.get(AuthKeys.Code);

    const navigate: NavigateFunction = useNavigate();

    const jumpToHome = () => navigate("/");
    
    useEffect(() =>
    {


        if (!isNullOrUndefined(redirectUrlParam))
        {
            axiosWithInterceptor.get("/api/verification/code", {params: {code: redirectUrlParam}})
                .then(response =>
                {
                    console.log("Verification response.data = ", response.data);

                    if (response.data.success)
                    {
                        setPromptText("Verification success, click the button below to jump to home page.");
                        setVerificationSuccess(true);
                    }
                    else
                        setPromptText("Verification failed.");
                });
        }
    }, []);
    
    return (
        <div>
            <h3>
                {promptText}
            </h3>
            {
                verificationSuccess &&
                <Button onClick={jumpToHome}>Home</Button>
            }
        </div>
    );
}

export default EmailVerification;