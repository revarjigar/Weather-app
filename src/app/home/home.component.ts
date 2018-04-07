import {Component, OnInit} from '@angular/core';
import {GetWeatherService} from '../service/getweather.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  entireWeatherObject: any;
  forecastObject: any;

  constructor(private getWeatherService: GetWeatherService) {
  }

  ngOnInit() {
    this.getWeatherService.getRandomBackgroundColor();
    this.getWeatherService.entireWeatherSubject
      .filter(data => data)
      .subscribe(data => {
        this.entireWeatherObject = data;
        this.forecastObject = data.item.forecast;
      });
  }

  changeTemperatureUnit(temperatureUnit: string): void {
    this.getWeatherService.getGeolocation(temperatureUnit);
  }

  ulReady(): void {
    if (this.forecastObject) {
      this.forecastObject.map((data, index) => {
        this.getWeatherService.iconApplier(data.text, `[data-icon="${index}"]`);
      });
      this.getWeatherService.removeLoader();
    }
  }

  callIconApplier(text: string, selector: string): void {
    if (text) {
      this.getWeatherService.iconApplier(text, selector);
    }
  }
}
