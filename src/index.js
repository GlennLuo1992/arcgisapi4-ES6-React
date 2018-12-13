import "@dojo/shim/Promise";
import "./config";
import "./function/function"
import {HashRouter,Route,Link} from "react-router-dom"

import React from "react";
import ReactDOM from "react-dom";


import "./css/main.scss";
import {App} from "./App";
import Switch from "react-router/es/Switch";
import Config from "./layouts/Config";

// const URL="https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer";
// const URL="https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer";
const addDOMNode = () => {
    const appNode = document.createElement("div");
    appNode.id = "app";
    document.body.appendChild(appNode);
    return appNode;
};

export default class WebApp extends React.Component{
    render() {
        return (
            <div>
               <HashRouter>
                   <Switch>
                       <Route path="/app" component={App}/>
                       <Route path="/config" component={Config}/>
                   </Switch>
               </HashRouter>
            </div>
        );
    }
}


ReactDOM.render(<WebApp/>,
    addDOMNode()
);