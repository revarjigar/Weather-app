import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  constructor(private homeComponent: HomeComponent) {
  }

  ngOnInit() {
    console.log('inside oninit', this.homeComponent.forecastObject);
  }

}
