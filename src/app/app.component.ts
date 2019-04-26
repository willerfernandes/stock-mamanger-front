import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stock-manager-front';
  products = [];
  baseUrl='http://localhost:3000'

  constructor(private httpClient: HttpClient){}

  get_products(){
        this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
        console.log(res);
        this.products = res;
        });
    }
}
