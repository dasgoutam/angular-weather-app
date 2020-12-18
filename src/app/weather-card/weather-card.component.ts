import { Component, OnInit, Input } from "@angular/core";
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
  @Input() name: any;

  ngOnInit() {
    // this.weatherService.getWeatherDetails("mumbai").subscribe(data => {
    //   this.weather = data;
    //   this.weather_today = this.weather.weather[0].description;
    //   console.log(this.weather_today);
    // });
  }

  getWeather() {
    console.log(this.name);
    // let city_name = (<HTMLInputElement>document.getElementById("city_name"))
    //   .value;
    // console.log(city_name);
    // this.weatherService.getWeatherDetails(city_name).subscribe(data => {
    //   this.weather = data;
    //   this.weather_today = this.weather.weather[0].description;
    //   this.show = true;
      // console.log(this.weather_today);
    // });
  }
}
