import { Component, OnInit, Input } from "@angular/core";
import { OpenweatherService } from "../openweather.service";
import { interval, Observable } from 'rxjs';
import { mergeMap, startWith } from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.scss"]
})
export class WeatherCardComponent implements OnInit {
  constructor(private weatherService: OpenweatherService) {}

  weather:any;
  weather_today;
  show = false;
  notfound;
  @Input() name: any;

  ngOnInit() {
    // this.weatherService.getWeatherDetails("mumbai").subscribe(data => {
    //   this.weather = data;
    //   this.weather_today = this.weather.weather[0].description;
    //   console.log(this.weather_today);
    // });
  }

  getWeather() {
    let target_id = `city_${this.name}`
    let city_name = (<HTMLInputElement>document.getElementById(target_id))
      .value;
    console.log(city_name);

    timer(0, 30*1000)
    .pipe(
        mergeMap(() => this.weatherService.getWeatherDetails(city_name))
    ).subscribe(data => {
      this.weather = data;
      this.weather_today = this.weather.weather[0].description;
      this.show = true;
      console.log(this.weather_today);
    }, (error) => {
      this.notfound= true;
    });

    // this.weatherService.getWeatherDetails(city_name).subscribe(data => {
    //   this.weather = data;
    //   this.weather_today = this.weather.weather[0].description;
    //   this.show = true;
    //   console.log(this.weather_today);
    // }, (error) => {
    //   this.notfound= true;
    // });
  }
}
