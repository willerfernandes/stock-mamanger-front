import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user.service';
import {LoginInfo} from './../../entities/login-info';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  
  constructor(private userService: UserService) { }

  isAuthorized: boolean;
  isUnauthorized: boolean;

  ngOnInit() {
  }


  login(username: String, password: String) {
  	var loginInfo: LoginInfo  = {username:"" , password: ""} ;

  	loginInfo.login = username;
  	loginInfo.senha = password;

  	this.userService.login(loginInfo).subscribe(res => {
  		this.isAuthorized = res;
  		this.isUnauthorized = !res;
  	});
  }



}
