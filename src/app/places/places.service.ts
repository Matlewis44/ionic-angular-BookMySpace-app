import { Injectable } from '@angular/core';
import { title } from 'process';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

//Ce morceau de code permet d'inecter le service dans un autre component
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Chicago City',
      'La nouvelle mégapole',
      'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1665543787/acmhg2fqije0icvm2hzr.jpg',
      149.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p2',
      'Paris',
      'La ville des amoureux',
      'https://www.bvjhostelparis.com/wp-content/uploads/2016/09/activites-paris-nuit.jpg',
      189.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p3',
      'New York City',
      'La Big Apple',
      'https://lepetitjournal.com/sites/default/files/styles/main_article/public/2018-08/iStock-615398376.jpg?itok=1k6w3RiH',
      99.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p4',
      'Rome',
      'Ville cosmopolite où l\'art et l\'architecture rayonnent de presque 3 000 ans',
      'https://download.vikidia.org/vikidia/fr/images/9/90/Colis%C3%A9e_%28de_nuit%29_%C3%A0_Rome.jpg',
      129.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p5',
      'Florence',
      'La ville la plus charmante d\'Italie',
      'https://media.timeout.com/images/105879414/image.jpg',
      129.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p6',
      'Cômo',
      'Le lac enchanteur, refuge des stars et célèbre lieu de tournage ',
      'https://a.cdn-hotels.com/gdcs/production163/d1616/24e46678-07e1-4f27-93d3-9eb979c2ae5e.jpg?impolicy=fcrop&w=800&h=533&q=medium',
      149.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p7',
      'Dubrovnik',
      'La ville fortifiée de la mer adriatique',
      'https://resize-parismatch.lanmedia.fr/var/pm/public/media/image/2022/07/13/17/croatie-72-heures-a-dubrovnik.jpg?VersionId=IyPwn3J11RNlEKVARmO8BKdyuHXZRW6h',
      139.99,
      new Date('2023-01-01'),
      new Date('2023-12-31')
    )
  ]);

  get cloneAllPlaces() {
    //On retourne ces lieux comme observable pour pouvoir y souscrire de l'extérieur
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  /*Si nous devions l'ajouter, nous n'éditerions pas l'objet d'origine
  car on bosse sur un clône grâce au spread operator.
  --> Bon pattern
  */
  getPlace(id: string){
    return  {...this._places.find(lieu => lieu.id === id)};
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.forbes.fr/wp-content/uploads/2021/10/gettyimages-1289576127.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    /*Regarder s'il vous plaît mon lieu (le tab)
    abonne-toi y mais ne prend qu'un seul objet du tab et
    annule l'index 1 (la 'description')
   - Concat prend le tab où on l'appel,
    ajoute un nouvel emplacement et renvoie le nouveau tab
    */
    return this._places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
}
