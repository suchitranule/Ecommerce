import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../service/product-service';
import { Product } from '../../models/product.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList {

  public products: Product[] = [];

  constructor(private productService : ProductService , public cdr : ChangeDetectorRef) {}
  ngOnInit() {

    this.productService.getProducts().pipe(
      catchError(err => {
        console.error('API failed', err);
        return throwError(() => err);
      })).subscribe((res:any) => {
        this.cdr.markForCheck();
        this.products = res['products'];
        console.log(this.products);
      })
  }
                  
  trackById(index: number, product: Product): number {
    return product.id;
  }


}
