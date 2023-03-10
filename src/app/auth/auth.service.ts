import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthentificated = true;
  private _userId = 'abc';

  //On englobe l'état et on le récupère
  get getUserIsAuthentificated() {
    return this._userIsAuthentificated;
  }

  constructor() { }

  get userId(){
    return this._userId;
  }

/*De cette façon on évite l'écrasement accidentelle de la variable,
en créant une accessibilté unique par méthode
*/
  login() {
    this._userIsAuthentificated = true;
  }

  logout() {
    this._userIsAuthentificated = false;
  }

}

