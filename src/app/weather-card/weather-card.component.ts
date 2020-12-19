import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OpenweatherService } from "../openweather.service";
import { interval, Observable } from "rxjs";
import { mergeMap, startWith } from "rxjs/operators";
import { timer } from "rxjs";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.scss"]
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  constructor(private weatherService: OpenweatherService) {}
  @Input() name: any;

  weather: any;
  weather_today;
  show = false;
  notfound;
  subscription;
  src;

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getWeather() {
    let target_id = `city_${this.name}`;
    let target_icon = `icon_${this.name}`;
    console.log(target_icon);
    let city_name = (<HTMLInputElement>document.getElementById(target_id))
      .value;
    // console.log(city_name);

    this.subscription = timer(0, 30 * 1000)
      .pipe(mergeMap(() => this.weatherService.getWeatherDetails(city_name)))
      .subscribe(
        data => {
          this.show = true;
          this.weather = data;
          this.weather_today = this.weather.weather[0].description;
          // (<HTMLInputElement>(
          //   document.getElementById(target_icon)
          // )).src = `https://openweathermap.org/img/wn/${
          //   this.weather.weather.icon
          // }@2x.png`;
          console.log(this.weather.weather.icon);
          this.src = `https://openweathermap.org/img/wn/${
            this.weather.weather[0].icon
          }.png`;
          console.log(this.weather_today);
        },
        error => {
          if (error.error.message == "city not found") this.notfound = true;
          console.log(error);
          this.subscription.unsubscribe();
        }
      );
  }
}
