import React from 'react';
import ChartistGraph from 'react-chartist';

import OpenWeatherStore from "../store/OpenWeatherStore";
import * as WeatherAction from '../action/WeatherAction';
import Moment from 'moment';

export default class DailyTemperatureLineChart extends React.Component {

    constructor(){
        super();
        this.getDayForecast = this.getDayForecast.bind(this);
        this.state={
            loadedCityID:-1,
            cityWeatherDayForecast:OpenWeatherStore.getCityWeatherDayForecast()
        };

        var currentTime=new Date();
        this.endTime=Moment().add(4,'days').endOf('day').unix();
    }

    getDayForecast(){
        this.setState({cityWeatherDayForecast:OpenWeatherStore.getCityWeatherDayForecast()});
    }


    loadCityWeatherDayForecast(cityID,cityName){
        this.setState({loadedCityID:cityID});
        WeatherAction.loadDayForecast(cityID,cityName);
    }

    componentWillReceiveProps(newProps){
        const {cityID} =newProps;
        const {cityName} =newProps;

        if (cityID!=this.state.loadedCityID) {
            this.loadCityWeatherDayForecast(cityID, cityName);
            this.state.loadedCityID=cityID;
        }
    }


    componentDidMount(){
        const {cityID} =this.props;
        const {cityName} =this.props;


        //this.loadCityWeatherDayForecast(cityID,cityName);
        this.getDayForecast();
    }
    componentWillMount() {
        OpenWeatherStore.on("change", this.getDayForecast);
    }
    componentWillUnmount() {
        OpenWeatherStore.removeListener("change", this.getDayForecast);
    }

    render() {

        const todayTemperatures=[];

        if (!this.state.cityWeatherDayForecast||!this.state.cityWeatherDayForecast.length){
            return (<div></div>);//todo display relevant error message to user
        }

        this.state.cityWeatherDayForecast.forEach(function(forecast){
            if (this.endTime>=forecast.dt){

                var time_label=Moment.unix(forecast.dt).format('ddd h a');
                time_label=time_label.split(' ');
                time_label=time_label[0]+"<br/>"+time_label.splice(1).join(' ');

                todayTemperatures.push({
                    temperature:parseFloat(forecast.main.temp),
                    time_label:time_label
                });
            }
        }.bind(this));


        const data={
            labels:[]
            ,series:[]
        };

        for (var i = 0; i < todayTemperatures.length; i++) {
            var tt = todayTemperatures[i];
            data.labels.push(tt.time_label);
            data.series.push(tt.temperature);
        }


        data.series=[data.series];

        if (data.series[0].length<=1){
            return (
                <div class="na-prompt">
                    Temperature Chart not available for today
                </div>
            );
        }
       /* const data = {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
            series: [
                [20, 15, 10, 25, 20, 15, 10, 20]
            ]
        };*/

        const options = {
            showGrid: false,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0.1
            }),
            fullWidth: true,
            chartPadding: {
                right: 40
            },
            showArea: true,
            low: 0,
            axisX: {
                showGrid: false
            },
            axisY: {
                showGrid: false
            }
        };

// In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
        const responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: true,
                showArea: true,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value.slice(0, 3);
                    }
                },
                chartPadding:{
                    left: -10,
                    right: 40,
                    top: 20,
                    bottom: 20
                },
            }],
            ['screen and (max-width: 640px)', {
                showLine: true,
                showArea: true,
                chartPadding: {
                    left: -15,
                    right: 10,
                    top: 10,
                    bottom: 10
                },
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        const type = 'Line';
        
        return (
            <div>
                <ChartistGraph data={data} options={options} type={type} responsiveOptions={responsiveOptions} className="hour-chart"/>
            </div>
        )
    }
}