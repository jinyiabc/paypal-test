import { Component, OnInit } from '@angular/core';
import { Hero }    from '../hero';
import { Address }    from '../address';



@Component({
  selector: 'app-ship-address',
  templateUrl: './ship-address.component.html',
  styleUrls: ['./ship-address.component.css']
})
export class ShipAddressComponent implements OnInit {


      powers = ['Really Smart', 'Super Flexible',
                'Super Hot', 'Weather Changer'];

      model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
      address = new Address('Betsy Buyer',"111 First Street","Saratoga" ,"US","95070","CA");


      submitted = false;

      onSubmit() { this.submitted = true; }

      // TODO: Remove this when we're done
      get diagnostic() { return JSON.stringify(this.model); }

      newHero() {
        this.model = new Hero(42, '', '');
      }

      skyDog(): Hero {
        let myHero =  new Hero(42, 'SkyDog',
                               'Fetch any object at any distance',
                               'Leslie Rollover');
        console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
        return myHero;
      }

      //////// NOT SHOWN IN DOCS ////////

      // Reveal in html:
      //   Name via form.controls = {{showFormControls(heroForm)}}
      showFormControls(form: any) {
        return form && form.controls['name'] &&
        form.controls['name'].value; // Dr. IQ
      }


  constructor() { }

  ngOnInit() {
  }

}
