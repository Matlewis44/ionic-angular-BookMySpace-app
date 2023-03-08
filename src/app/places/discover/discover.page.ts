import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
/*ngOnInit() ne s'éxécutera pas à chaque fois que
*/
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  listedLoadedPlaces: Place[] = [];
  private placesSub: Subscription;

 //On injecte nos lieux par le service qui le distribue
  constructor(private placesService: PlacesService) { }

  //Grace au service, on accède aux places du tab avec le getter du service
  ngOnInit() {
    this.placesService.cloneAllPlaces.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }
  onFilterUpdate(event: any) {
    console.log('Nouvelle valeur sélectionnée :', event.detail.value);
    // Autres traitements à effectuer lors de la modification de la valeur du segment
  }

  ngOnDestroy(): void {
      if(this.placesSub){
        this.placesSub.unsubscribe();
      }
  }

}
