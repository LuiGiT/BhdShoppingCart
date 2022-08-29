import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    Swal.fire(
      'Producto eliminado',
      'Puedes continuar tu compra.',
      'success'
    )
  }
  emptycart(){
    this.cartService.removeAllCart();
    Swal.fire(
      'Has limpiado tu carrito',
      'Puedes continuar tu compra.',
      'success'
    )
  }

  checkout(){
    Swal.fire(
      'Felicidades por tu compra!!',
      'Total pagado: '+ this.grandTotal,
      'success'
    ).then((result) => {
      if (result.value) {
        this.emptycart()
      }
    })
  }
}
