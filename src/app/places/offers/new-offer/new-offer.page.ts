import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form!: FormGroup;

  constructor(private placesService: PlacesService, private route: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      //update sur une saisie floue du formulaire
      title: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
      description: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)]}),
      price: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.min(1)]}),
      dateFrom: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
      dateTo: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]})
    })
  }

  onCreateOffer(){
    // '+' pour le mettre en number
    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      +this.form.value.price,
      new Date(this.form.value.dateFrom),
      new Date (this.form.value.dateTo)
    );
    this.form.reset();
    this.route.navigate(['/places/tabs/offers']);
  }

}
