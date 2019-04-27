import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataService} from './../data.service';
import {ConfigurationService} from './../configuration.service';
import {Config} from './../config/config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

   chave: string;
   valor: string;

  title = 'stock-manager-front';
  products = [];
  configurations = [];
  configuration: Config = {chave: "", valor: ""}
  baseUrl='http://localhost:3000'

  constructor(private dataService: DataService, private configurationService: ConfigurationService){}

  get_all_configurations(){
  	
  	this.configurations = [];
    this.configurationService.getAll().subscribe((res) =>{
        this.configurations = res;

    });  
  }
  
  get_configuration(key: string){
    this.configurationService.get(key).subscribe((res) =>{
    	this.configurations = [];
    	this.configurations.push(res);
    });
  }

  save_configuration(key: string, value: string){
    this.configuration.chave = key;
    this.configuration.valor = value;
    this.configurationService.save(this.configuration).subscribe((res) =>{
        this.get_all_configurations();
    });
  }

  update_configuration(key: string, value: string){
    this.configuration.chave = key;
    this.configuration.valor = value;
    console.log(this.configuration);
    this.configurationService.update(this.configuration).subscribe((res) =>{
        this.get_all_configurations()
    });
  }

  delete_configuration(key: string){
    this.configurationService.delete(key).subscribe((res) =>{
    this.get_all_configurations();
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
