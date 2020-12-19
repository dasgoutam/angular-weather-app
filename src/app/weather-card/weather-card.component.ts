import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OpenweatherService } from "../openweather.service";
import { timer, BehaviorSubject } from "rxjs";
import { interval, Observable } from "rxjs";
import { mergeMap, startWith } from "rxjs/operators";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.scss"]
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  constructor(private weatherService: OpenweatherService) {}
  @Input() name: any;
  // @Input() isoffline: any;

  weather: any;
  weather_today;
  show = false;
  notfound;
  subscription;
  src;

  private _offline = new BehaviorSubject<boolean>(null);
  @Input() set isoffline(value: boolean) {
    this._offline.next(value);
  }

  get isoffline() {
    return this._offline.getValue();
  }

  ngOnInit() {
    // console.log("Offline-", this.isoffline);
    this._offline.subscribe(data => {
      if (data == true) {
        let key = `panel_${this.name}`;
        if (localStorage.getItem(key) != null) {
          this.weather = JSON.parse(localStorage.getItem(key));
          this.show = true;
          this.weather_today = this.weather.weather[0].description;
          this.src = `https://openweathermap.org/img/wn/${
            this.weather.weather[0].icon
          }.png`;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close_card() {
    this.show = false;
    this.notfound = false;
    this.subscription.unsubscribe();
  }

  getWeather() {
    let target_id = `city_${this.name}`;
    let target_icon = `icon_${this.name}`;
    console.log(target_icon);
    let city_name = (<HTMLInputElement>document.getElementById(target_id))
      .value;

    this.subscription = timer(0, 30 * 1000)
      .pipe(mergeMap(() => this.weatherService.getWeatherDetails(city_name)))
      .subscribe(
        data => {
          this.show = true;
          this.weather = data;
          this.weather_today = this.weather.weather[0].description;
          this.src = `https://openweathermap.org/img/wn/${
            this.weather.weather[0].icon
          }.png`;

          localStorage.setItem(`panel_${this.name}`, JSON.stringify(data));
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
