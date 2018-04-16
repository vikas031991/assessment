import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import * as connectivity from 'connectivity';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {

	city : string;
	showWeather : any;
	errorCode : any;
	showForcast : any;
	forecastList : any;
  isConnected : true;
  constructor(private _weatherService : WeatherService) { };

  ngOnInit() {
    localStorage.clear();
    // if(!this.isConnected) {
      setInterval(() => {
        if(!navigator.onLine || isConnected == false){
          this.isConnected = false;
        this.battleInit(); 
      }
      }, 5000);
    // }
  }

  battleInit(){
      this._weatherService.getOfflineData(this.isConnected)
      .subscribe(response => {
        this.showWeather = response;
        this.errorCode = false;
        this.isConnected = true;
      },
      error => {
        this.errorCode = error;
        this.showWeather = undefined;
      });
    console.log(navigator.onLine);
  }

  getWeather(){
  	this._weatherService.getWeather(this.city)
  		.subscribe(response => 	{
  			this.showWeather = response;
  			this.errorCode = false;
  		},
  		error => {
  			this.errorCode = error;
  			this.showWeather = undefined;
  		});
  }

  forcast() {
  	this._weatherService.forcastWeather(this.city)
  		.subscribe(response => {
  			this.showForcast = response;
  			this.forecastList = response.list;
  			this.errorCode = false;
  		},
  		error => {
  			this.showForcast = undefined;
  			this.errorCode = error;
  		})
  }

}
