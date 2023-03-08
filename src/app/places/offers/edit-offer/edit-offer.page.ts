import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place | undefined;
  form!: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')!).subscribe(place => {
        this.place = place;
        /*On ititialise à l'intérieur dans le même gestionnaire de fontion asynchrone
         afin de ne pas initialiser avant que l'abonnement ne soit terminé et
          avant qu'il ne nous ait réallement attribué la valeur*/
        this.form = new FormGroup({
          //update sur une saisie floue du formulaire
          title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required]}),
          description: new FormControl(this.place.description, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)]})
        })
      });
    });

  }

  onUpdateOffer(){
    if(!this.form.valid) {
      return;
    }
    console.log(this.form);
  }

  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
