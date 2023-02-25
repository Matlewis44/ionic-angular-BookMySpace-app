import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  /*on intègre la proriété "selectedPlace" de place-detail.ts pour la lié
  on utilise le même nom pour la cohérence
  */
@Input() selectedPlace: Place | undefined;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'Annuler', 'reservModal');
  }

  onBookPlace(){
    this.modalCtrl.dismiss({message: 'Message de test !'}, 'Valider', 'reservModal');
  }

}
