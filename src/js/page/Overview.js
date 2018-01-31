import React from "react";
import TodayForecast from "../component/TodayForecast";
import TodayHumidity from "../component/TodayHumidity";
import WeekForecast from "../component/WeekForecast";
import DailyTemperatureLineChart from "../component/DailyTemperatureLineChart";
import OpenWeatherStore from "../store/OpenWeatherStore";
import * as WeatherAction from '../action/WeatherAction';

export default class Overview extends React.Component {
    
    constructor(props) {
        super(props);
        this.getCityWeatherInfo = this.getCityWeatherInfo.bind(this);
        const {cityName} =props.routeParams;
        this.state={
            cityWeatherInfo: OpenWeatherStore.getCityWeatherInfo()
        };
        this.cityName="";

        this.loadCityWeatherInfo(cityName);

    }
    
    componentWillMount() {
        OpenWeatherStore.on("change", this.getCityWeatherInfo);
    }

    componentWillReceiveProps(newProps){
        const {cityName} =newProps.routeParams;

        if (this.cityName==cityName) return;
        this.cityName=cityName;
        this.loadCityWeatherInfo(cityName);

    }

    componentDidMount() {
        //this.getCityWeatherInfo();
        //const {cityName} =this.props.routeParams;

        //this.loadCityWeatherInfo(cityName);
        
    }
    componentWillUnmount() {
        OpenWeatherStore.removeListener("change", this.getCityWeatherInfo);
        this.setState({
            cityWeatherInfo: {}
        });
    }

    loadCityWeatherInfo(cityName) {
        WeatherAction.searchCity(cityName);
    }

    getCityWeatherInfo() {

        this.setState({
            cityWeatherInfo: OpenWeatherStore.getCityWeatherInfo()
        });

        this.setState({
            weatherState: OpenWeatherStore.isDay(this.state.cityWeatherInfo.dt)?"day":"night"
        });
    }

    render() {
        const w=this.state.cityWeatherInfo;

        const currentTempIconURL=OpenWeatherStore.getIconURL(true);

        return (
            <main class="container overview flex-col justify-around align-center">
                <section id="today-forecast" class="flex-row justify-center align-center">
                    <TodayForecast city={w.name} countryCode={w.sys.country} minTempC={w.main.temp_min} currentTempC={w.main.temp} maxTempC={w.main.temp_max} currentWeatherDescription={w.weather[0].description} currentWeatherTitle={w.weather[0].main} currentTempIconURL={currentTempIconURL} />
                    <TodayHumidity humidityReading={w.main.humidity} />
                </section>
                <section>
                    <WeekForecast cityID={w.id} cityName={w.name} />
                </section>
                <section>
                    <DailyTemperatureLineChart cityID={w.id} cityName={w.name} />
                </section>
            </main>
        );
    }
}
