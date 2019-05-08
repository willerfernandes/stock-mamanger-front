import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserService} from './../../../services/user.service';
import {User} from './../../../entities/user';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {

  nome: string;

  title = 'stock-manager-front';
  products = [];
  users = [];
  user: User = {chave: "", valor: ""};
  baseUrl='http://localhost:3000';
  isError;
  isEmpty;
  isSuccess;

  constructor(private UserService: UserService){}

  get_all_users(){
  	
  	this.users = [];
    this.UserService.getAll().subscribe((res) =>{
        this.users = res;
        this.handleResponse(res);
    });  
  }

  find_by_chave(key: string){
  	this.UserService.search(key).subscribe((res) =>{
    	this.users = [];
    	if(res != null && res.length > 0) {
    		this.users = res;
    	}
    	else{
    		this.users = [];
    	}
    	this.handleResponse(res);
    	});
  }


  delete_user(id: number){
    this.UserService.delete(id).subscribe((res) =>{
    this.get_all_users();
    });
  }

  constructor() { }

  ngOnInit() {
  	this.get_all_users();
  }

  handleResponse(){
  	this.isSuccess = this.users.length > 0;
  	this.isEmpty = this.users.length === 0;
  }

}
