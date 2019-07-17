import { Injectable } from '@angular/core';
import { interval } from 'rxjs/observable/interval'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/products';


@Injectable()
export class AppService {
  private dbUrl = "http://localhost:3000/api/product"

  constructor(private http: HttpClient) { }
  //  getseconds(){

  //    let secondsPast = interval(1000);
  //    return secondsPast.subscribe(x => console.log(`${x} seconds have past`))
  //   }

  // getNames(){
  //   const list = new Observable((observer) =>{
  //     let people = ['Autumn', 'Tom', 'Dave'];
  //     people.forEach(person => observer.next(person))
  //   })
  //   return list;
  // }

getProducts(){
  // return fetch(this.dbUrl)
    return this.http.get<any[]>(this.dbUrl)
}

}
