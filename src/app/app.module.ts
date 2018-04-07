import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GetWeatherService} from './service/getweather.service';
import {DetailsComponent} from './details/details.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'details', component: DetailsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent
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
