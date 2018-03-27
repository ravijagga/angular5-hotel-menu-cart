import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuRowComponent } from './menu/menu-row/menu-row.component';
import { CartComponent } from './cart/cart.component';
import { CartRowComponent } from './cart/cart-row/cart-row.component';

// Import Services
import { MenuService } from './menu/shared/menu.service';
import { CartService } from './cart/shared/cart.service';
import { SlickSliderComponent } from './menu/slick-slider/slick-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CartComponent,
    MenuRowComponent,
    CartRowComponent,
    SlickSliderComponent
  ],
  imports: [BrowserModule, FormsModule, NgbModule.forRoot()],
  providers: [MenuService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule {}
