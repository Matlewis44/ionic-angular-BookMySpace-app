import { Injectable } from '@angular/core';
import { Place } from './place.model';

//Ce morceau de code permet d'inecter le service dans un autre component
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Chicago City',
      'La nouvelle mégapole',
      'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1665543787/acmhg2fqije0icvm2hzr.jpg',
      149.99
    ),
    new Place(
      'p2',
      'Paris',
      'La ville des amoureux',
      'https://www.bvjhostelparis.com/wp-content/uploads/2016/09/activites-paris-nuit.jpg',
      189.99
    ),
    new Place(
      'p3',
      'New York City',
      'La Big Apple',
      'https://lepetitjournal.com/sites/default/files/styles/main_article/public/2018-08/iStock-615398376.jpg?itok=1k6w3RiH',
      99.99
    ),
    new Place(
      'p4',
      'Rome',
      'Ville cosmopolite où l\'art et l\'architecture rayonnent de presque 3 000 ans',
      'https://download.vikidia.org/vikidia/fr/images/9/90/Colis%C3%A9e_%28de_nuit%29_%C3%A0_Rome.jpg',
      129.99
    ),
    new Place(
      'p5',
      'Florence',
      'La ville la plus charmante d\'Italie',
      'https://media.timeout.com/images/105879414/image.jpg',
      129.99
    ),
    new Place(
      'p6',
      'Cômo',
      'Le lac enchanteur, refuge des stars et lieux de tournage célèbre',
      'https://a.cdn-hotels.com/gdcs/production163/d1616/24e46678-07e1-4f27-93d3-9eb979c2ae5e.jpg?impolicy=fcrop&w=800&h=533&q=medium',
      149.99
    ),
    new Place(
      'p7',
      'Dubrovnik',
      'La ville fortifiée de la mer adriatique',
      'https://resize-parismatch.lanmedia.fr/var/pm/public/media/image/2022/07/13/17/croatie-72-heures-a-dubrovnik.jpg?VersionId=IyPwn3J11RNlEKVARmO8BKdyuHXZRW6h',
      139.99
    )
  ];

  get clonePlaces() {
    //On retourne une copie des lieux afin de pouvoir editer directement
    return [...this._places];
  }

  constructor() {}

  /*Si nous devions l'ajouter, nous n'éditerions pas l'objet d'origine
  car on bosse sur un clône grâce au spread operator.
  --> Bon pattern
  */
  getPlace(id: string){
    return  {...this._places.find(lieu => lieu.id === id)};
  }
}
