import { Component, OnInit } from '@angular/core';
import { Address }    from '../address';
import {AddressService} from '../address.service';



@Component({
  selector: 'app-ship-address',
  templateUrl: './ship-address.component.html',
  styleUrls: ['./ship-address.component.css']
})
export class ShipAddressComponent implements OnInit {

  constructor(public addressService:AddressService) { }

      // powers = ['Really Smart', 'Super Flexible',
      //           'Super Hot', 'Weather Changer'];

      address = new Address('Betsy Buyer',"111 First Street","Saratoga" ,"US","95070","CA");


      onSubmit(event) {
        this.address.recipient_name = event.target[0].value;
        this.address.line1 = event.target[1].value;
        this.address.city = event.target[2].value;
        this.address.country_code = event.target[3].value;
        this.address.postal_code = event.target[4].value;
        this.address.state = event.target[5].value;
        console.log(this.address);

          this.addressService.shipAddress(this.address)
                             .subscribe();

      }

  ngOnInit() {

  }

}
