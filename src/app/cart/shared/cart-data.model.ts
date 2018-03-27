export class CartData {
  constructor(
    public id: number,
    public item: string,
    public price: number,
    public quantity: number,
    public totalPrice: number
  ) {}
}
