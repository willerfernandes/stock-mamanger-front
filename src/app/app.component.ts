import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataService} from './data.service'
import {ConfigurationService} from './configuration.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stock-manager-front';
  products = [];
  configurations = [];
  baseUrl='http://localhost:3000'

  constructor(private dataService: DataService, private configurationService: ConfigurationService){}

  get_configurations(){
    this.configurationService.getAll().subscribe((res) =>{
        this.configurations = res;
    });
  }


  save_configuration(){
    this.configurationService.save().subscribe((res) =>{
        console.log(res);
    });
  }

  get_products(){
    this.dataService.get_products().subscribe((res) =>{
        this.configurations = res;
    });
  }

}
