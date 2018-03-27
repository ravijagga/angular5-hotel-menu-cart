import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from './../shared/menu.service';
import { CartService } from './../../cart/shared/cart.service';
import { MenuData } from './../shared/menu-data.model';

@Component({
  selector: '[app-menu-row]',
  templateUrl: './menu-row.component.html',
  styleUrls: ['./menu-row.component.scss']
})
export class MenuRowComponent implements OnInit {
  menuDataForView;
  @Input() singleMenuDataRow;
  quantity: number;

  constructor(
    public menuService: MenuService,
    public cartService: CartService
  ) {
    this.menuDataForView = menuService.currCatMenuDataForView;
  }

  ngOnInit() {}

  /**
   * To add items in Cart
   */
  increment() {
    // Add Current Item into Cart
    this.cartService.addToCart(this.singleMenuDataRow.id);

    // Update Total Amount
    this.cartService.updateTotalAmount();
  }

  /**
   * To remove items from Cart
   */
  decrement() {
    this.cartService.removeFromCart(this.singleMenuDataRow.id);

    // Update Total Amount
    this.cartService.updateTotalAmount();
  }
}
