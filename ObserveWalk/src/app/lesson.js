/* 
                    Observables
What are they?
    - Observables are what we use to package connections between our "publishiser" and "subscribers", 
    or what creates the data, and what wants that data.
    -They can be almost any kind ( events, responses, and even object literals), but the idea is to basically
    tell our code, hey this is something i want to keep track of. I want to know whats happening whenever something 
    happens here. 
    -Theyre considered "lazy", meaning they only go where theyre called. And while they can be defined at anytime, they 
    wont be visible until subscribed to. Like a newsletter, its still being created and sent out everyweek, but until you 
    go sign up, its not accessible to you.

When do we use them? 
    -When data (of any kind) is "publshied" and we want to be made aware of its existence and change. Info we want to
    "subscribe" to.
    -When there is data that is changing and updating constantly or consistenly. A cool thing about observables is that
    the value of them can be changed and updated! So when new data comes in, we can bring that new data in. Its like 
    were constantly listening for something to happen( a websocket, or our nodemon). 
    -When we need to stop listening to something, we can unsubscribe as well

Why do we need them?
    -Because of the nature of asynchronous  programming, observables can be very helpful in sending data as soon as 
    it is available. When dealing with data "producers" and "consumers" most things in JavaScript are data pullers. 
    So they wait until all data is available in order to send it all over at once. Observables are considered data
    pushers. As soon as they get data, they send it out. It can help when there is a large amount of data to go get and 
    an immediate call to manipulate that data. A fetch and immediate function can sometimes cause an error

So what is RxJS?
    - RxJS (Reactive Extentions for JavaScript) is an implementation of Observables that makes it easier to keep track 
    of that data. What that means is basically were taking an action thats occuring in javascript and turning it into a 
    variable that we can actually keep track of. Since this is a library, that means there are set RxJS options to pick 
    and choose which ones would help in different situations. 

Making Observables
 
these steps will be done by the students, with the cli commands as a refresher
1. create new angular app 
2.create new component 
3. create new service 
4. clear out the old html from app

*********************************************************************************************
once both service and component are created, have them enter service
5. FOR INTERVALS
app.service
            import { Injectable } from '@angular/core';
            import { HttpClient, HttpHeaders } from '@angular/common/http'
            import { Observable} from 'rxjs';
            import { interval } from 'rxjs/observable/interval';

            @Injectable()
            export class AppService {
            private dbUrl= 'http://localhost:3000/api/product'

            constructor(private http: HttpClient ) { }
            

            public getStuff(){

            let secondsPast = interval(1000)
            return secondsPast.subscribe(x => console.log(`${x} seconds has past`));

            }
            }

app.component

            import { Component, OnInit } from '@angular/core';
            import { Observable } from 'rxjs/Observable'
            import { AppService } from './app.service';

            @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
            })


            export class AppComponent implements OnInit {

            constructor(public service: AppService){}
            
            ngOnInit(){
                this.service.getStuff()
            }
            }

*********************************************************************************************
6. FOR LIST OF NAMES
app.service
            import { Injectable } from '@angular/core';
            import { Observable } from 'rxjs';


            @Injectable()
            export class AppService {

            constructor( ) { }
            

            public getStuff(){
                const list$ = new Observable((observer) => {
                let people = ['Tom', 'Autumn', 'Dave'];
                    people.forEach( person =>
                                                    { if(person === 'Autumn'){
                                                        observer.error('Autumn should not be in this array')
                                                        } else {
                        observer.next(person);
                                                    }
                    })

                    })
                    return list$
                }  
            }

app.component
                import { Component, OnInit } from '@angular/core';
                import { Observable } from 'rxjs/Observable'
                import { AppService } from './app.service';

                @Component({
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
                })


                export class AppComponent implements OnInit {
                public stuffs = [];

                constructor(public service: AppService){}
                
                ngOnInit(){
                    this.service.getStuff().subscribe((data) => this.stuffs.push(data))
                    this.stuffs
                    
                }
                }
*********************************************************************************************
7.
FOR HTTP CLIENT VS FETCH
SHOW HOW TO SLOW DOWN CONNECTION ON CHROME!
app.service
                import { Injectable } from '@angular/core';
                import { Observable} from 'rxjs';

                @Injectable()
                export class AppService {
                private dbUrl= 'http://localhost:3000/api/product'

                constructor() { }
                

                public getStuff(){
                    return fetch(this.dbUrl)
                }  


                }

app.component
            import { Component, OnInit } from '@angular/core';
            import { Observable } from 'rxjs/Observable'
            import { AppService } from './app.service';

            @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
            })


            export class AppComponent implements OnInit {

            constructor(public service: AppService){}
            
            ngOnInit(){
                this.service.getStuff().then(res => console.log(res.json()) )
            }
            }
*********************************************************************************************
            SHOW HOW TO SLOW DOWN CONNECTION

            THEN SHOW HTTP CLIENT
*********************************************************************************************
app.service
            import { Injectable } from '@angular/core';
            import { HttpClient, HttpHeaders } from '@angular/common/http'
            import { Observable} from 'rxjs';
            import { interval } from 'rxjs/observable/interval';

            @Injectable()
            export class AppService {
            private dbUrl= 'http://localhost:3000/api/product'

            constructor(private http: HttpClient ) { }
            

            public getStuff(){
                return this.http.get<any>(this.dbUrl)
            } 
            }

app.component
            import { Component, OnInit } from '@angular/core';
            import { Observable } from 'rxjs/Observable'
            import { AppService } from './app.service';

            @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
            })


            export class AppComponent implements OnInit {

            constructor(public service: AppService){}
            
            ngOnInit(){
                this.service.getStuff().subscribe(data => console.log(data))
            }()
            }
*********************************************************************************************
8. 
FOR PIPE() MAP() & FILTER()

































*********************************************************************************************
9.
FOR SORTING THROUGH NESTED ARRAYS
app.html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Observables!
  </h1>
  <h1>
    &
  </h1>
  <h1>
    RxJS!
  </h1>
  <div>
    <ul *ngFor="let loc of locNames" >
      <li>{{loc.display_name}}</li>
    </ul>
  </div>
</div>


app.component
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
   public locNames = [];

  constructor(public service: AppService){}
  
  ngOnInit(){
    this.service.helpDaniel().subscribe((locals:any) => {this.locNames= locals})
    
    
  }
}



app.service
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';



@Injectable()
export class AppService {
  // public list$:Array<number>;

  constructor() { }

  public helpDaniel (){
    const locArr = {
      name:'Bojack',
      locations:[
        {"display_name":'Netflix'},
        {"display_name":'Hulu'},
        {"display_name":'Amazon'},
      ]
    }

    const locals = of(locArr.locations); 
     return locals;
    }
  }



 
















