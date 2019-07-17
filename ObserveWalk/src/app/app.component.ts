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

