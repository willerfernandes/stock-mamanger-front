import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigurationService} from './../../../services/configuration.service';
import {Config} from './config';

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
  configuration: Config = {chave: "", valor: ""};
  baseUrl='http://localhost:3000';
  isError;
  isEmpty;
  isSuccess;

  constructor(private configurationService: ConfigurationService){}

  get_all_configurations(){
  	
  	this.configurations = [];
    this.configurationService.getAll().subscribe((res) =>{
        this.configurations = res;
        this.handleResponse(res);
    });  
  }

  find_by_chave(key: string){
  	this.configurationService.search(key).subscribe((res) =>{
    	this.configurations = [];
    	if(res != null && res.length > 0) {
    		this.configurations = res;
    	}
    	else{
    		this.configurations = [];
    	}
    	this.handleResponse(res);
    	});
  }


  delete_configuration(id: number){
    this.configurationService.delete(id).subscribe((res) =>{
    this.get_all_configurations();
    });
  }

  constructor() { }

  ngOnInit() {
  	this.get_all_configurations();
  }

  handleResponse(){
  	this.isSuccess = this.configurations.length > 0;
  	this.isEmpty = this.configurations.length === 0;
  }


}
