import { MenuService } from './../../menu/shared/menu.service';
import { CartData } from './cart-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {
  cartData: CartData[] = [];
  totalAmount = new BehaviorSubject<number>(0);
  totalAmountObservable = this.totalAmount.asObservable();

  constructor(public menuService: MenuService) {}

  /**
   * Add/Update item in "Cart"
   *
   * @param {number} id
   * @memberof CartService
   */
  addToCart(id: number): void {
    // Check if "id" available in "menuDataForView"
    if (this.menuService.isIdInMenuViewData(id)) {
      // If "id" is already in "Cart" then update that item
      if (this.isIdInCart(id)) {
        const singleCartRow = this.getCartDataByID(id);
        singleCartRow.quantity++;
        singleCartRow.totalPrice = singleCartRow.quantity * singleCartRow.price;

        // Update Menu View Quantity
        this.menuService.updateMenuViewQuantity(id, singleCartRow.quantity);
      } else {
        const singleMenuRow = this.menuService.getMenuItemById(id);

        // Set quantity
        const quantity: number = 1;

        // Set totalPrice
        const totalPrice: number = quantity * singleMenuRow.price;

        // Add New Item to Cart
        this.cartData.push(
          new CartData(
            id,
            singleMenuRow.item,
            singleMenuRow.price,
            quantity,
            totalPrice
          )
        );

        // Update Menu View Quantity
        this.menuService.updateMenuViewQuantity(id, quantity);
      }
    }
  }

  /**
   * Decrease Item Quantity and Remove at end
   *
   * @param {number} id
   * @memberof CartService
   */
  removeFromCart(id: number): void {
    // if item available in Cart
    if (this.cartData.length && this.isIdInCart(id)) {
      const singleCartRow = this.getCartDataByID(id);

      // Decrement Quantity
      singleCartRow.quantity--;

      // update "totalPrice" if quantity is 1+ otherwise remove that item
      if (singleCartRow.quantity >= 1) {
        singleCartRow.totalPrice = singleCartRow.quantity * singleCartRow.price;

        // Update Menu View Quantity
        this.menuService.updateMenuViewQuantity(id, singleCartRow.quantity);
      } else {
        // Remove singleCartRow
        this.cartData.splice(this.getIdIndexInCart(id), 1);

        // Update Menu View Quantity
        this.menuService.updateMenuViewQuantity(id, 0);
      }
    }
  }

  /**
   * To Check whether item has already been added into cart
   *
   * @param {number} id
   * @returns {boolean}
   * @memberof CartService
   */
  isIdInCart(id: number): boolean {
    // If "cartData" is not empty
    if (this.cartData.length !== 0) {
      // Check if "id" is already added to Cart
      return this.cartData.some(singleCartRow => {
        return singleCartRow.id === id;
      });
    } else {
      // If "cartData" is empty
      return false;
    }
  }

  /**
   * To get index of the "id" in "cartData"
   *
   * @param {number} id
   * @returns {number}
   * @memberof CartService
   */
  getIdIndexInCart(id: number): number {
    if (this.isIdInCart(id)) {
      const index: number = this.cartData.findIndex(singleCartRow => {
        return singleCartRow.id === id;
      });
      return index;
    }
  }

  /**
   * To Get Cart Data by ID
   *
   * @param {number} id
   * @returns {CartData}
   * @memberof CartService
   */
  getCartDataByID(id: number) {
    return this.cartData[this.getIdIndexInCart(id)];
  }

  getMenuQuantityById(id: number) {
    let quantity: number;
    if (this.isIdInCart(id)) {
      quantity = this.getCartDataByID(id).quantity;
    } else {
      quantity = 0;
    }
    return quantity;
  }

  updateTotalAmount() {
    this.totalAmount.next(0);
    if (this.cartData.length !== 0) {
      this.cartData.forEach(obj => {
        this.totalAmount.next(this.totalAmount.getValue() + obj.totalPrice);
      });
    }
  }
}
