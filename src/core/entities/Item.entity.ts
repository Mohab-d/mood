export class Item {
  public id: string;
  public name: string;
  public addons: any;

  constructor(id: string, name: string, addons: any) {
    this.id = id;
    this.name = name;
    this.addons = addons;
  }
}
