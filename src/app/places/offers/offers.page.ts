import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
/*On utilise le service pour récupérer les lieux
et les mettre dans le tab d'offres
*/
export class OffersPage implements OnInit {
  offers: Place[] = [];

  constructor(private placesService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.offers = this.placesService.clonePlaces;
  }

}
