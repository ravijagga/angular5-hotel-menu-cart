import { Component, OnInit, Input } from '@angular/core';
import { CartService } from './../shared/cart.service';
import { CartData } from './../shared/cart-data.model';

@Component({
  selector: '[app-cart-row]',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.scss']
})
export class CartRowComponent implements OnInit {
  @Input() currentCartDataRow: CartData;
  constructor(public cartService: CartService) {}

  ngOnInit() {}

  /**
   * To add items in Cart
   */
  increment() {
    // Add Current Item into Cart
    this.cartService.addToCart(this.currentCartDataRow.id);

    // Update Total Amount
    this.cartService.updateTotalAmount();
  }

  /**
   * To remove items from Cart
   */
  decrement() {
    this.cartService.removeFromCart(this.currentCartDataRow.id);

    // Update Total Amount
    this.cartService.updateTotalAmount();
  }
}
