import config from "../config";
import dispatcher from "../dispatcher";
import $ from 'jquery';

export function loadWeekForecast(cityID,cityName) {
    if (!cityID) return;
    if (this.loadWeekForecastReq) this.loadWeekForecastReq.abort();

    this.loadWeekForecastReq=$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?id="+cityID+"&cnt=5&units=metric&appid="+config.OPEN_WEATHER_API.WEB_KEY, function (cityWeatherWeekForecast) {
        dispatcher.dispatch({type:"WEATHER_CITY_WEEK_FORECAST_UPDATE",cityWeatherWeekForecast});
    }.bind(this),function(err) {
        dispatcher.dispatch({type:"WEATHER_ERROR",message:"Failed to load week forecast for specified city: '"+cityName+"'"});
    }.bind(this));


}
export function loadDayForecast(cityID,cityName) {
    if (!cityID) return;
    if (this.loadDayForecastReq) this.loadDayForecastReq.abort();

    console.trace("loadDayForecast");
    
    this.loadDayForecastReq=$.getJSON("http://api.openweathermap.org/data/2.5/forecast?id="+cityID+"&units=metric&appid="+config.OPEN_WEATHER_API.WEB_KEY, function (cityWeatherDayForecast) {
        dispatcher.dispatch({type:"WEATHER_CITY_DAY_FORECAST_UPDATE",cityWeatherDayForecast});
    }.bind(this),function(err) {
        dispatcher.dispatch({type:"WEATHER_ERROR",message:"Failed to load day forecast for specified city: '"+cityName+"'"});
    }.bind(this));


}
export function searchCity(cityName) {

    console.trace("searchCity:"+cityName);
    if (this.searchCityReq) this.searchCityReq.abort();
    
    this.searchCityReq=$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid="+config.OPEN_WEATHER_API.WEB_KEY, function (cityWeatherInfo) {
        if (cityWeatherInfo.cod=="200"){
            dispatcher.dispatch({type:"WEATHER_CITY_UPDATE",cityWeatherInfo});
        } else {
            dispatcher.dispatch({type:"WEATHER_ERROR",message:"Failed to find city"});
        }


    }.bind(this),function(err) {
        dispatcher.dispatch({type:"WEATHER_ERROR",message:"Failed to load weather info for specified city: '"+cityName+"'"});
    }.bind(this));
}
