import { Injectable } from '@angular/core';
import { Address } from './address';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // http request
import { Observable } from 'rxjs/Observable' //Reactive extension for javascript "rxjs": "^5.5.2",
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import  { environment } from '../environments/environment';

@Injectable()
export class AddressService {

  constructor(private http: HttpClient) { }

  shipAddress(address:Address){
      const httpOptions = {
          headers: new HttpHeaders({
               'Content-Type':  'text/plain'    //application/x-www-form-urlencoded  multipart/form-data
            })
      };

      const addUrl1 = environment.app_url + '/api/paypal/payment/create';
      return this.http.post<Address>(addUrl1, address, httpOptions)
                      .catch(this.errorHandler)
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


}
