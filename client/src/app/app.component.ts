import { Component,OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private basketService: BasketService ,private accountService:AccountService){}

  ngOnInit() {
    this.loadBasket();
    this.loadCurrentUser();
  }
  loadCurrentUser(){
    const token=localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('loaded User');
      },error=>{
        console.log(error);
      });
  }

  loadBasket(){
    // ***  Persisting the basket on startup ***
    
    // we will check in our local storage to see if there is a basket or not
    const basketId = localStorage.getItem("basket_id");

    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() =>{
        console.log('basket initialized');
      },error => {
        console.log(error)
      });
    }
    
  }
}
