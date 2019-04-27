import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataService} from './data.service'
import {ConfigurationService} from './configuration.service'
import {ConfigComponent} from './config/config.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'stock-manager-front';
  products = [];
  configurations = [];
  configuration: ConfigComponent = {chave: "", valor: ""}
  baseUrl='http://localhost:3000'

  constructor(private dataService: DataService, private configurationService: ConfigurationService){}

  get_all_configurations(){
    this.configurationService.getAll().subscribe((res) =>{
        this.configurations = res;
    });
  }
  
  get_configuration(){
    this.configurationService.get(document.getElementById("key").value).subscribe((res) =>{
        this.configurations[0] = res;
    });
  }

  save_configuration(){
    this.configuration.chave = document.getElementById("key").value;
    this.configuration.valor = document.getElementById("value").value;
    this.configurationService.save(this.configuration).subscribe((res) =>{
        console.log(res);
    });
  }

  update_configuration(){
    this.configuration.chave = document.getElementById("key").value;
    this.configuration.valor = document.getElementById("value").value;
    this.configurationService.update(this.configuration).subscribe((res) =>{
        console.log(res);
    });
  }

  delete_configuration(){
    this.configurationService.delete(document.getElementById("key").value).subscribe((res) =>{
    });
  }

}
