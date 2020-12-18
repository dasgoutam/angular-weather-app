import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OpenweatherService {
  constructor(private http: HttpClient) {}

  getWeatherDetails(city) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=809b243eee532606c961d2891affe86b`
    );
  }
}
