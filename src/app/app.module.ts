import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ParticlesModule } from "angular-particle";

import { AppComponent } from "./app.component";
import { OpenweatherService } from "./openweather.service";
import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  declarations: [AppComponent, WeatherCardComponent],
  bootstrap: [AppComponent],
  providers: [HttpClientModule, OpenweatherService]
})
export class AppModule {}
