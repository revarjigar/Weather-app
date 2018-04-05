import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GetWeatherService} from './service/getweather.service';
import {IconComponent} from './icon/icon.component';

const appRoutes: Routes = [
  {
    path: 'home', children: [
    {path: '', component: IconComponent}], component: HomeComponent
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    GetWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
