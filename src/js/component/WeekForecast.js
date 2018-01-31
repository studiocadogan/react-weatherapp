import React from "react";

import DailyWeather from '../component/WeekForecast/DailyWeather';
import OpenWeatherStore from "../store/OpenWeatherStore";
import * as WeatherAction from '../action/WeatherAction';
import { IndexLink } from "react-router";
import Moment from 'moment';
export default class WeekForecast extends React.Component {

    constructor(){
        super();
        this.getWeekForecast = this.getWeekForecast.bind(this);
        this.state={
            loadedCityID:-1,
            cityWeatherWeekForecast:OpenWeatherStore.getCityWeatherWeekForecast()
        };
    }
    
    getWeekForecast(){
        this.setState({cityWeatherWeekForecast:OpenWeatherStore.getCityWeatherWeekForecast()});
    }

    loadCityWeatherWeekForecast(cityID,cityName){
        this.setState({loadedCityID:cityID});
        WeatherAction.loadWeekForecast(cityID,cityName);
    }

    componentWillReceiveProps(newProps){
        const {cityID} =newProps;
        const {cityName} = newProps;

        if (cityID!=this.state.loadedCityID) {
            this.loadCityWeatherWeekForecast(cityID, cityName);
            this.state.loadedCityID=cityID;
        }
    }

    componentDidMount(){
        const {cityID} =this.props;
        const {cityName} =this.props;

        this.loadCityWeatherWeekForecast(cityID,cityName);
        this.getWeekForecast();
    }

    componentWillMount() {
        OpenWeatherStore.on("change", this.getWeekForecast);
    }
    componentWillUnmount() {
        OpenWeatherStore.removeListener("change", this.getWeekForecast);
    }

    render() {
        
        if (!this.state.cityWeatherWeekForecast||!this.state.cityWeatherWeekForecast.length){
            return (
                <div id="day-slider" class="flex-row justify-center align-center">No weather information available for specified city. Please <IndexLink to="/">try again</IndexLink></div>
            );
        }

       /* var day5WeekForecast=[];

        for (var i = 0; i < this.state.cityWeatherWeekForecast.length; i++) {
            var dailyForecast = this.state.cityWeatherWeekForecast[i];

        }*/
        const weekForecast=this.state.cityWeatherWeekForecast.map((d,i)=> {
            var dayName=Moment.unix(d.dt).format('ddd Do');

            var iconID=d.weather[0].id;
            var iconURL=OpenWeatherStore.getIconURL(false,iconID);

            return <DailyWeather day={dayName} tempC={d.temp.day} weatherDescription={d.weather[0].description} weatherTitle={d.weather[0].main} key={i} iconURL={iconURL} />
        });

        return (
            <div id="day-slider" class="flex-row justify-center align-center">
                {weekForecast}
            </div>
        );
    }
}