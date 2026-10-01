import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Product } from '../product';
import { ProductData } from '../product-data';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css',
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  selectedProduct = signal<Product | undefined>(undefined);
  quantity = signal(1);
  products = signal(ProductData.products);

  onIncrease() {
    this.quantity.update(q => q + 1);
  }

  onDecrease() {
    this.quantity.update(q => q <= 0 ? 0 : q - 1);
  }
}
