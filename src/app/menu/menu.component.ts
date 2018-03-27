import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  ComponentRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from './shared/menu.service';
import { SlickSliderComponent } from './slick-slider/slick-slider.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  menuDataForView;
  searchString: string;
  constructor(public menuService: MenuService) {
    menuService.currCatMenuDataForViewObs.subscribe(value => {
      this.menuDataForView = value;
    });
  }

  ngOnInit() {}

  ngOnChanges() {}

  printSearchString() {
    if (this.searchString) {
      this.menuService.updateSearchResult(this.searchString);
    }
  }
}
