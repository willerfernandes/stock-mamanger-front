import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OperationService} from './../../../services/operation.service';
import {Operation} from './../../../entities/operation';
import {User} from './../../../entities/user';

@Component({
  selector: 'app-operation-filter',
  templateUrl: './operation-filter.component.html',
  styleUrls: ['./operation-filter.component.css']
})
export class OperationFilterComponent implements OnInit {

  nome: string;

  title = 'operation-manager-front';
  operations = [];

  user: User = {nome: "", senha: ""}
  papel: Stock = {
  codPapel: "",
  empresaPapel: "",
  valor: "",
  valorMaximo: "",
  valorMinimo: ""}

  operation: Operation = {
  	dataOperacao: "",	
  	guid: "",	
  	quantidade: "",	
  	valorPapel: "",	
  	valorTotal: "",
  	tipoOperacao: "",	
  	usuario: this.user,
  	papel: this.papel };
  isError;
  isEmpty;
  isSuccess;

  constructor(private OperationService: OperationService){}

  get_all_operations(){
  	
  	this.operations = [];
    this.OperationService.getAll().subscribe((res) =>{
        this.operations = res;
        this.handleResponse(res);
    });  
  }

  find_by_chave(key: string){
  	this.OperationService.search(key).subscribe((res) =>{
    	this.operations = [];
    	if(res != null && res.length > 0) {
    		this.operations = res;
    	}
    	else{
    		this.operations = [];
    	}
    	this.handleResponse(res);
    	});
  }


  delete_operation(id: number){
    this.OperationService.delete(id).subscribe((res) =>{
    this.get_all_operations();
    });
  }

  constructor() { }

  ngOnInit() {
  	this.get_all_operations();
  }

  handleResponse(){
  	this.isSuccess = this.operations.length > 0;
  	this.isEmpty = this.operations.length === 0;
  }

}
