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

  entireWeatherSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  forecastSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private getWeatherService: GetWeatherService) {
  }

  ngOnInit() {
    this.getWeatherService.getRandomBackgroundColor();
    this.getGeolocation();
    // this.callToWeatherService('(40.7141667,-74.0063889)', 'F');//for development
  }

  getGeolocation(temperatureUnit: string = 'C'): void {
    const localGeolocation = localStorage.getItem('geolocation');
    if (!localGeolocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let geolocation = '(' + position.coords.latitude + ',' + position.coords.longitude + ')';
        this.callToWeatherService(geolocation, temperatureUnit);
        localStorage.setItem('geolocation', geolocation);
      }, () => {
        this.callToWeatherService('(40.7141667,-74.0063889)', temperatureUnit = 'F');
      });
    } else {
      this.callToWeatherService(localGeolocation, temperatureUnit);
    }
  }

  callToWeatherService(geolocation: string, temperatureUnit: string): void {
    this.getWeatherService.getWeather(geolocation, temperatureUnit)
      .map(data => {
        return data['query'].results.channel;
      })
      .subscribe(weatherData => {
        this.entireWeatherObject = weatherData;
        this.forecastObject = weatherData.item.forecast;
        this.entireWeatherSubject.next(weatherData);
        this.forecastSubject.next(weatherData.item.forecast);
      });
  }

  ulReady(): void {
    if (this.forecastObject) {
      this.forecastObject.map((data, index) => {
        this.iconApplier(data.text, `[data-icon="${index}"]`);
      });
      this.removeLoader();
    }
  }

  removeLoader(): void {
    let loader = document.querySelector('[data-loader]');
    if (loader) {
      loader.remove();
    }
  }

  iconApplier(text: string, selector: string): void {
    let iconText = this.getWeatherService.singleWord(text);
    let elementChosen = document.querySelector(selector);
    if (elementChosen) {
      (this.getDayTime()) ? elementChosen.classList.add(`wi`, `wi-day-${iconText}`, `wi-${iconText}`) :
        elementChosen.classList.add(`wi`, `wi-night-${iconText}`, `wi-${iconText}`);
    }
  }

  getDayTime() {
    let time = parseInt(new Date().toString().split(' ')[4]);
    if (time > 18) {
      return false;
    } else return true;
  }

}
