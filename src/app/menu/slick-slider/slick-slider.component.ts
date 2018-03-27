import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { MenuService } from './../shared/menu.service';
import * as jQuery from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-slick-slider',
  templateUrl: './slick-slider.component.html',
  styleUrls: ['./slick-slider.component.scss']
})
export class SlickSliderComponent implements OnInit, AfterViewInit {
  uniqueMenuCategories;
  sliderContainer;

  constructor(
    private menuService: MenuService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.sliderContainer = el.nativeElement;
    this.uniqueMenuCategories = menuService.getUniqueCategories();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Instantiate Slick Slider
    jQuery(this.sliderContainer).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });

    // Activate First Category Tab
    const firstCategoryTab = this.sliderContainer.querySelector(
      '.category-item'
    );
    this.renderer.addClass(firstCategoryTab, 'active-tab');
    this.menuService.activeCategory = firstCategoryTab.textContent;
    this.menuService.updateCurrCatMenuDataForView();
  }

  updateActiveTab(event: any): void {
    event.preventDefault();
    const currElem = event.target;
    const parentElem = currElem.parentElement.parentElement.parentElement;
    const activeTabElem = parentElem.querySelector('.active-tab');
    if (activeTabElem) {
      this.renderer.removeClass(activeTabElem, 'active-tab');
    }
    this.renderer.addClass(currElem, 'active-tab');

    this.menuService.activeCategory = currElem.textContent;
    this.menuService.updateCurrCatMenuDataForView();
  }
}
