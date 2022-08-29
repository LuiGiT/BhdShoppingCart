import { CartService } from '../../services/cart.service';
import { ProductsApiService } from './../../services/products-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;

  constructor(private productsApiService : ProductsApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productsApiService.getProduct()
    .subscribe(result=>{
      this.productList = result;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    });
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
}
