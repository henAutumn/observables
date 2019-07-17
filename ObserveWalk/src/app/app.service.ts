import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import  *  as RX from 'rxjs/operators';
import { pipe } from 'rxjs/Rx'




@Injectable()
export class AppService {

  constructor() { }

  public getStuff() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const numbersIWant = of(list);
    const newNums = RX.map((x:any) => x*x);
    const filNums = RX.filter((x:any)=> x % 2 !==0);

     const other = numbersIWant.pipe(newNums, filNums).subscribe((x:any) => console)
  }    
}



