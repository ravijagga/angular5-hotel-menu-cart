import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { menuData } from './menu.data';

@Injectable()
export class MenuService {
  menuData = menuData;

  menuDataForView = new BehaviorSubject<any[]>([]);
  menuDataForViewObs = this.menuDataForView.asObservable();

  currCatMenuDataForView = new BehaviorSubject<any[]>([]);
  currCatMenuDataForViewObs = this.currCatMenuDataForView.asObservable();

  activeCategory: string = 'Non Veg';

  constructor() {
    // Declare menuDataForView[]
    this.menuData.forEach(singleMenuData => {
      const obj = {};
      for (const key in singleMenuData) {
        if (singleMenuData.hasOwnProperty(key)) {
          obj[key] = singleMenuData[key];
        }
      }
      obj['quantity'] = 0;

      const newMenuDataForView = this.menuDataForView.getValue();
      newMenuDataForView.push(obj);
      this.menuDataForView.next(newMenuDataForView);
    });

    /**
     * Update Category Menu View when any
     * menu item data changes
     */
    this.menuDataForViewObs.subscribe(value => {
      this.updateCurrCatMenuDataForView();
    });
  }

  /**
   * Update Current Category Menu Data for View
   *
   * @memberof MenuService
   */
  updateCurrCatMenuDataForView(): void {
    const arr = this.menuDataForView
      .getValue()
      .filter((value, index, array) => {
        return value.category === this.activeCategory;
      });
    this.currCatMenuDataForView.next(arr);
  }

  /**
   * Update Search Results
   *
   * @param {string} searchString
   * @memberof MenuService
   */
  updateSearchResult(searchString: string): void {
    const arr = this.menuDataForView.getValue().filter(value => {
      const regex = new RegExp(searchString, 'i');
      return value.item.search(regex) !== -1;
    });
    this.currCatMenuDataForView.next(arr);
  }

  getMenuItemById(id: number) {
    const index = this.menuDataForView
      .getValue()
      .findIndex(singleMenuDataRow => {
        return singleMenuDataRow.id === id;
      });
    return this.menuDataForView.getValue()[index];
  }

  updateMenuViewQuantity(id: number, quantity: number) {
    this.getMenuItemById(id).quantity = quantity;
  }

  /**
   * To Check whether id available in menuDataForView
   *
   * @param {number} id
   * @returns {boolean}
   * @memberof MenuService
   */
  isIdInMenuViewData(id: number): boolean {
    // If "menuDataForView" is not empty
    if (this.menuDataForView.getValue().length !== 0) {
      // Check if "id" is already added to Cart
      return this.menuDataForView.getValue().some(singleMenuRow => {
        return singleMenuRow.id === id;
      });
    } else {
      // If "menuDataForView" is empty
      return false;
    }
  }

  /**
   * To Get Only Unique Categories Array
   *
   * @returns {string[]}
   * @memberof MenuService
   */
  getUniqueCategories(): string[] {
    const categories: string[] = this.menuDataForView
      .getValue()
      .map((value, index, array) => {
        return value.category;
      });
    const uniqueCategories: string[] = categories.filter(
      (value, index, array) => {
        return array.indexOf(value) === index;
      }
    );
    return uniqueCategories;
  }
}
