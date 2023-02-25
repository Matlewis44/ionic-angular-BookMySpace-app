import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
/*ngOnInit() ne s'éxécutera pas à chaque fois que
*/
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[] = [];

 //On injecte nos lieux par le service qui le distribue
  constructor(private placesService: PlacesService) { }

  //Grace au service, on accède aux places du tab avec le getter du service
  ngOnInit() {
    this.loadedPlaces = this.placesService.clonePlaces;
  }

}
