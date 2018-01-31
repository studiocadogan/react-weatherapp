import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

class OpenWeatherStore extends EventEmitter {

    constructor() {
        super();
        this.defaultWeatherInfo={
            weather: [
                {
                    id: 800,
                    main: "--",
                    description: ""
                }
            ],
            main: {
                temp: "--",
                pressure: 1023.4,
                humidity: "--",
                temp_min: "--",
                temp_max: "--"
            },
            id: -1,
            name: "-"
            , sys: {
                sunset: 0,sunrise:0
            },

            dt:Date.now()/1000
        };

        this.cityWeatherInfo = this.defaultWeatherInfo;
        
        this.cityWeatherWeekForecast = {};
        this.cityWeatherDayForecast = {};

       /* this.isDay=this.isDay.bind(this);

        this.convertOpenWeatherIdToImgId=this.convertOpenWeatherIdToImgId.bind(this);
        this.getWeatherBackgroundURL=this.getWeatherBackgroundURL.bind(this);
        this.getIconURL=this.getIconURL.bind(this);*/
    }

    getCityWeatherInfo() {
        return this.cityWeatherInfo;
    }

    getCityWeatherWeekForecast() {
        return this.cityWeatherWeekForecast;
    }

    getCityWeatherDayForecast() {
        return this.cityWeatherDayForecast;
    }

    handleActions(action) {
        switch (action.type) {
            case "WEATHER_ERROR": {
                this.cityWeatherInfo = this.defaultWeatherInfo;
                this.emit("change");
                break;
            }
            case "WEATHER_CITY_UPDATE":
            {
                this.cityWeatherInfo = action.cityWeatherInfo;
                this.emit("change");
                break;
            }
            case "WEATHER_CITY_WEEK_FORECAST_UPDATE":
            {
                this.cityWeatherWeekForecast = action.cityWeatherWeekForecast.list;
                this.emit("change");
                break;
            }

            case "WEATHER_CITY_DAY_FORECAST_UPDATE":
            {
                this.cityWeatherDayForecast = action.cityWeatherDayForecast.list;
                this.emit("change");
                break;
            }
        }
    }

    isDay(currentUnix, sunsetUnix, sunriseUnix) {

        const w = this.cityWeatherInfo;
        currentUnix = w.dt;
        sunsetUnix = w.sys.sunset;
        sunriseUnix = w.sys.sunrise;
        return (currentUnix <= sunsetUnix && currentUnix >= sunriseUnix);
    }

    convertOpenWeatherIdToImgId(weatherID, useDayAndNight) {

        const w = this.cityWeatherInfo;

        var iconID;

        weatherID = weatherID ? weatherID : w.weather[0].id;

        iconID = String(weatherID).substring(0, 1);

        if (weatherID==800) {
            var dayNight = (!useDayAndNight || this.isDay()) ? "day" : "night";
            iconID = dayNight + "-8";

        }
        return iconID;
    }

    getWeatherBackgroundURL() {
        // var iconID=this.convertOpenWeatherIdToImgId(weatherId);

        var iconID = this.isDay() ? "day" : "night";
        return "img/bg/weather/" + iconID + ".jpg";//todo: use method to generate URL with global params
    }

    getIconURL(useDayAndNight, weatherID) {
        const iconID = this.convertOpenWeatherIdToImgId(weatherID, useDayAndNight);
        return "img/icon/weather/" + iconID + ".png";//todo: use method to generate URL with global params
    }

}

const openWeatherStore = new OpenWeatherStore;
dispatcher.register(openWeatherStore.handleActions.bind(openWeatherStore));

export default openWeatherStore;
