import { Component, OnInit } from "@angular/core";
import { OpenweatherService } from "../openweather.service";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.scss"]
})
export class WeatherCardComponent implements OnInit {
  constructor(private weatherService: OpenweatherService) {}

  weather;
  weather_today;
  show = false;

  ngOnInit() {
    // this.weatherService.getWeatherDetails("mumbai").subscribe(data => {
    //   this.weather = data;
    //   this.weather_today = this.weather.weather[0].description;
    //   console.log(this.weather_today);
    // });
  }
}
