import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
baseUrl:string = "http://localhost:3000";

constructor(private httpClient : HttpClient) {}

get_products(){
	console.log("Aqui no DataService")
    return this.httpClient.get(this.baseUrl + '/products');
}
}