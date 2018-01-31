import React from "react";

import Footer from "../component/layout/Footer";
import Nav from "../component/layout/Nav";
import OpenWeatherStore from "../store/OpenWeatherStore";
export default class Layout extends React.Component {

    constructor(){
        super();
        this.state={};
        this.getWeatherBackgroundURL=this.getWeatherBackgroundURL.bind(this);
    }

    componentWillMount() {
        OpenWeatherStore.on("change", this.getWeatherBackgroundURL);
    }


    componentDidMount() {
        //this.getCityWeatherInfo();
        //const {cityName} =this.props.routeParams;

        //this.loadCityWeatherInfo(cityName);

    }
    componentWillUnmount() {
        OpenWeatherStore.removeListener("change", this.getWeatherBackgroundURL);
        this.setState({
            weatherBackgroundURL: ""
        });
    }

    getWeatherBackgroundURL(){
        this.setState({
            weatherBackgroundURL: OpenWeatherStore.getWeatherBackgroundURL()
        });
    }


    render() {

        const mainStyle={backgroundImage:"url("+this.state.weatherBackgroundURL+")"};

        return (
            <div style={mainStyle} class="container">
                <Nav />
                {this.props.children}
            </div>
        );
    }
}
