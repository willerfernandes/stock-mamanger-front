import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private configurationService: ConfigurationService){}

  get_all_configurations(){
  	
  	this.configurations = [];
    this.configurationService.getAll().subscribe((res) =>{
        this.configurations = res;

    });  
  }
  
  get_configuration(id: number){
    this.configurationService.get(id).subscribe((res) =>{
    	this.configurations = [];
    	this.configurations.push(res);
    });
  }


  find_by_chave(key: string){
  	this.configurationService.search(key).subscribe((res) =>{
    	this.configurations = [];
    	this.configurations.push(res);
    	});
  }

  save_configuration(id: number, key: string, value: string){
  	this.configuration.id = id;
    this.configuration.chave = key;
    this.configuration.valor = value;
    this.configurationService.save(this.configuration).subscribe((res) =>{
        this.get_all_configurations();
    });
  }

  update_configuration(id: number, key: string, value: string){
    this.configurationService.update(fillConfigurationnumber(id, key, value)).subscribe((res) =>{
        this.get_all_configurations()
    });
  }

  delete_configuration(id: number){
    this.configurationService.delete(id).subscribe((res) =>{
    this.get_all_configurations();
    });
  }


  fillConfiguration(id: number, key: string, value: string): Config {
  	config: Config = {chave: "", valor: ""}
  	config.id = id;
  	config.chave = key;
  	config.valor = value;
  	return config;
  }


  constructor() { }

  ngOnInit() {
  	this.get_all_configurations();
  }

}
