import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place | undefined;

  //private router: Router
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modelCtrl: ModalController
  ) {}

  //Ce composant sera l'initialisation du lieux cliquer avec la présentat° et les actions qui s'en suivent
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId')!);
    });
  }

  onBookPlace() {
    //Wrong
    //this.router.navigateByUrl('/places/tabs/discover');

    //Yes
    //this.navCtrl.navigateBack('/places/tabs/discover');
    /*Pareil mais le NavController définit une config permettant
    la lecture de la bonne animation en lisant bien vers l'arrière et non vers l'avant
    */

    //Wrong
    //this.navCtrl.pop();
    //Fait apparaitre la dernière page de la pile. Mais si F5 sur le 2ème page --> impossible de revenir sur la 1ère

    /*On crée le modal + on ajoute promesse pour le présenter
    componentProps --> transmettre des données
    */
    this.modelCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place },
        id:'reservModal'
      })
      .then((myModal) => {
        myModal.present();
        return myModal.onDidDismiss();
      })
      .then(resulData => {
        console.log(resulData.data, resulData.role);
        if(resulData.role == 'Valider') {
          console.log('Réservation résussie !');
        }
      });
  }
}
