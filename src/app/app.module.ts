import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {AddressService} from './address.service';
import { AppComponent } from './app.component';
import { ShipAddressComponent } from './ship-address/ship-address.component';
import { HttpClientModule } from '@angular/common/http';    // http
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ShipAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,    // http
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
