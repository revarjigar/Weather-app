import {Component, OnInit} from '@angular/core';
import {GetWeatherService} from '../service/getweather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  entireWeatherObject: any;
  forecastObject: any;

  constructor(private getWeatherService: GetWeatherService) {
  }

  ngOnInit() {
    this.getWeatherService.entireWeatherSubject
      .filter(data => {
        if (data) {
          return data;
        }
      })
      .subscribe(data => {
        this.entireWeatherObject = data;
        this.forecastObject = data.item.forecast;
      });
  }

  test(e) {
    alert(`Name is submitted for ${e}`);
  }

  callIconApplierDetails(text: string, selector: string): void {
    this.getWeatherService.iconApplier(text, selector);
  }

  changeTemperatureUnitDetails(temperatureUnit: string): void {
    localStorage.setItem('geoTemperature', temperatureUnit);
    this.getWeatherService.getGeolocation(temperatureUnit);
  }
}
