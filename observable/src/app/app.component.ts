import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
// import { Product } from './models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 products=[0];

  constructor(public service: AppService){
  }
  ngOnInit(){
    this.service.getProducts().subscribe(res => this.products = res) 
  }

}
