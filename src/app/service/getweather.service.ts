import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GetWeatherService implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  getWeather(place1: string, format: string) {
    const locationQuery = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place1}") and u="${format}"`;
    const locationUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + decodeURI(locationQuery) + '&format=json&env=store://datatables.org/alltableswithkeys';
    return this.httpClient.get(locationUrl);
  }

  singleWord(words: string): string {
    if (words) {
      let n = words.toLowerCase().split(' ');
      return n[n.length - 1];
    }
  }
}
