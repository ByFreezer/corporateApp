import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol
  ]
})
export class ProductosPage implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }
}