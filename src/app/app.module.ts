import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { OpenweatherService } from "./openweather.service";
import { WeatherCardComponent } from "./weather-card/weather-card.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, WeatherCardComponent],
  bootstrap: [AppComponent],
  providers: [HttpClientModule, OpenweatherService]
})
export class AppModule {}
