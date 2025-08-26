import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { ProductList } from './component/product-list/product-list';
import { ProductService } from './service/product-service';

const routes: Routes = [
  { path: 'list', component: ProductList }
];

@NgModule({
  declarations: [ProductList],
  imports: [
    CommonModule,
    HttpClientModule,
    ScrollingModule,
    NgOptimizedImage,
    RouterModule.forChild(routes) // define routing here directly
  ],
  providers: [
    ProductService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductModule { }
