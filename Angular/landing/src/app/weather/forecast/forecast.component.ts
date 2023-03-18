import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent {
  forecastData = [];

  constructor(private forecastService: ForecastService) {
    forecastService.getForecast().subscribe((forecastData) => {
      this.forecastData = forecastData;
    });
  }
}
