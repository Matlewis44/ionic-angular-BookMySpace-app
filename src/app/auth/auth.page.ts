import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  /*On injecte un loading Controller pour empêcher vraiment toute activité
  pendant le chargement grâce à une superposition (overlay)*/
  private userIsAuthentificated = false;
  isLoading = false;
  isLogin= true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingController
    .create({ keyboardClose: true, message: 'Chargement en cours...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });

  }

  onSwitchAuthModel(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLogin){
      //Send a request to login Servers
    }else{
      //Send a request to signup Servers
    }
  }
}
