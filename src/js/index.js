import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";


import Layout from "./page/Layout";
import Overview from "./page/Overview";
import SearchCityForm from "./page/SearchCityForm";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={SearchCityForm} />
            <Route path="city(/:cityName)" name="cityWeatherOverview" component={Overview} />
        </Route>
    </Router>
, app);
