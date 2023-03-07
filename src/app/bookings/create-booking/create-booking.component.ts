import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedMode: 'select' | 'random' | undefined;
  @ViewChild('formulaire') form!: NgForm; //Sélecteur TypeScript
  startDate: string | undefined;
  endDate: string | undefined;
  /*on intègre la proriété "selectedPlace" de place-detail.ts pour la lié
  on utilise le même nom pour la cohérence
  */
  @Input() selectedPlace: Place | undefined;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = this.selectedPlace?.availableFrom ?? new Date();
    const availableTo = this.selectedPlace?.availableTo ?? new Date();
    /*const availableFrom = this.selectedPlace ? this.selectedPlace.availableFrom : new Date();
    const availableTo = this.selectedPlace ? this.selectedPlace.availableTo : new Date();*/

    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      /*Ici, nous calculons d'abord une date de début aléatoire.
      Ensuite, nous calculons la date de fin en ajoutant 7 jours à la date de début,
      puis en ajoutant un nombre aléatoire de millisecondes supp. dans l'intervalle restant
       entre la date de début et la date de fin maximale autorisée.
       Cela garantit que la date de fin est toujours au moins une semaine après la date de début.
      */
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          7 * 24 * 60 * 60 * 1000 +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime() -
              7 * 24 * 60 * 60 * 1000)
      ).toISOString();
    }

  }


  onCancel(){
    this.modalCtrl.dismiss(null, 'Annuler', 'reservModal');
  }

  /*onBookPlace(){
    this.modalCtrl.dismiss({message: 'Message de test !'}, 'Valider', 'reservModal');
  }*/

  onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['firstName'],
          lastName: this.form.value['lastName'],
          guestNumber: this.form.value['guestNumber'],
          startDate: this.form.value['dateFrom'],
          endDate: this.form.value['dateTo']
        }
      },
      'Valider',
      'reservModal'
    );
  }

  datesValid() {
    const startDate = new Date(this.form.value['dateFrom']);
    const endDate = new Date(this.form.value['dateTo']);
    return endDate > startDate;
  }
}
