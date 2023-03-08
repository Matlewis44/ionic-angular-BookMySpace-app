import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[] = [];
  private placesSub: Subscription; //Instanciation d'un objet qui s'abonnera

  constructor(private placesService: PlacesService, private router : Router, private menuCtrl: MenuController) { }

  //On affecte l'abonnemeent
  ngOnInit() {
    this.placesSub = this.placesService.cloneAllPlaces.subscribe(places =>{
      this.offers = places;
    });
  }

  onEdit(offerID: string | undefined, slidingItem: IonItemSliding){
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerID])
    slidingItem.close();
  }

  //Destruction de la page pour éviter les fuites de mémoires
  ngOnDestroy(): void {
      if(this.placesSub){
        this.placesSub.unsubscribe();
      }
  }
}
