import { Component, OnInit } from '@angular/core';
import { CartService } from './shared/cart.service';
import { CartData } from './shared/cart-data.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartData[];
  totalAmount;

  constructor(public cartService: CartService) {
    this.cartData = cartService.cartData;
  }

  ngOnInit() {
    this.cartService.totalAmountObservable.subscribe(totalAmount => {
      this.totalAmount = totalAmount;
    });
  }
}
