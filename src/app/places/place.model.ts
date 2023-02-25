/*On définit un modèle de données pour avoir une structure
de comment l'appli devrait ressembler
*/
export class Place {
/*Le ? indique que ces propriétés peuvent être optionnelles,
  elles peuvent être définies comme undefined lors de la création de l'objet.
*/
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public imageUrl?: string,
    public price?: number
  ) {}
}
