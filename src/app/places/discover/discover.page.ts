import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

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
  listedLoadedPlaces: Place[] = [];

 //On injecte nos lieux par le service qui le distribue
  constructor(private placesService: PlacesService) { }

  //Grace au service, on accède aux places du tab avec le getter du service
  ngOnInit() {
    this.loadedPlaces = this.placesService.cloneAllPlaces;
    this.listedLoadedPlaces = this.placesService.cloneAllPlaces;
  }
  onFilterUpdate(event: any) {
    console.log('Nouvelle valeur sélectionnée :', event.detail.value);
    // Autres traitements à effectuer lors de la modification de la valeur du segment
  }


}
