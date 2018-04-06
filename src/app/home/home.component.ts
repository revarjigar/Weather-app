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
    const localGeolocation = localStorage.getItem('geolocation');
    if (!localGeolocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let geolocation = '(' + position.coords.latitude + ',' + position.coords.longitude + ')';
        this.callToWeatherService(geolocation);
        localStorage.setItem('geolocation', geolocation);
      }, () => {
        this.callToWeatherService('(40.7141667,-74.0063889)');
      });
    } else {
      this.callToWeatherService(localGeolocation);
    }

    // this.callToWeatherService('(40.7141667,-74.0063889)');//for development
  }

  callToWeatherService(geolocation: string): void {
    this.getWeatherService.getWeather(geolocation, 'C')
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
    this.forecastObject.map((data, index) => {
      this.iconApplier(data.text, `[data-icon="${index}"]`, true);
    });
    this.removeLoader();
  }

  removeLoader(): void {
    let loader = document.querySelector('[data-loader]');
    if (loader) {
      loader.remove();
    }
  }

  iconApplier(text: string, selector: string, isFontWeather: boolean): void {
    let iconText = this.getWeatherService.singleWord(text);
    let elementChosen = document.querySelector(selector);
    if (elementChosen) {
      (this.getDayTime()) ? elementChosen.classList.add(`wi`, `wi-day-${iconText}`, `wi-${iconText}`) :
        elementChosen.classList.add(`wi`, `wi-night-${iconText}`, `wi-${iconText}`);
    }
  }

  getDayTime() {
    let test = parseInt(new Date().toString().split(' ')[4]);
    if (test > 18) {
      return false;
    } else return true;
  }

}
