import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Product } from '../product';
import { ProductData } from '../product-data';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css',
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  selectedProduct = signal<Product | undefined>(undefined);
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1,
  });
  products = signal(ProductData.products);

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'red' : 'green');

  onIncrease() {
    this.quantity.update((q) => q + 1);
  }

  onDecrease() {
    this.quantity.update((q) => (q <= 0 ? 0 : q - 1));
  }

  qtyEffect = effect(() => console.log('quantity', this.quantity()));
}
