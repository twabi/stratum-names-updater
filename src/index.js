import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import reportWebVitals from "./reportWebVitals";
import {init} from "d2";
import {HashRouter} from "react-router-dom";
import { Provider } from '@dhis2/app-runtime'
import LoginModal from "./loginModal";
import LoadData from "./LoadData";

const initialAuth = "Basic " + btoa(":");


const developmentServer = "https://covmw.com/namisdemo/api/";
export const withBaseUrl = (baseUrl, initialAuth) => {

    const appConfig = {
        baseUrl: 'https://covmw.com/namisdemo/',
        apiVersion: 0,
        headers:{
            Authorization: initialAuth,
            "Content-Type": "application/json",
            withCredentials: true
        }
    }

    init({
        baseUrl: baseUrl,
        headers: {
            Authorization: initialAuth,
            "Content-Type": "application/json",
            withCredentials: true
        },
    })
    ReactDOM.render(
        <Provider config={appConfig}>
            <HashRouter>
                <LoadData auth={initialAuth}/>
            </HashRouter>
        </Provider>
        , document.getElementById("root"));
};

fetch("https://covmw.com/namisdemo/api", {
    method: 'GET',
    headers: {
        'Authorization' : initialAuth,
        'Content-type': 'application/json',
    },
    credentials: "include"

}).then((response) => {

    if(response.status === 401){
        console.log("unauthorized");
        ReactDOM.render(
            <HashRouter>
                <LoginModal/>
            </HashRouter>
            , document.getElementById("root"));
    } else {
        withBaseUrl(developmentServer);
    }

}).catch((error) => {
    console.log(error);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();