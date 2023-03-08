import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place | undefined;
  private placeSub: Subscription;

  /*Permet de souscrire aux modifications des params
  de route dans l'URL
  */
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  /*On s'abonne même si page non visible --> pas besoin ionViewWillEnter
  les abonnements des modifs dans les URL se font toujours en direct
  même après rechargement
  */
  ngOnInit() {
    //Externalisation de la logigue dans le service
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      /*On va chercher les lieux. S'éxecute sur tous les éléments du tab
      Si on trouve --> return true, retourne le lieu et le stock ici
      */
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')!).subscribe(place => {
        this.place = place;
      });
    });
  }

  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe()
    }
  }

}
