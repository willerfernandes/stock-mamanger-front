import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from './../../../services/user.service';
import {User} from './../../../entities/user';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @Input() user: User;

	constructor(private UserService: UserService, private route: ActivatedRoute, private location: Location) {}

	goBack(): void {
    this.location.back();
  	}

  	save( name: string, login: string, password: string){
     this.UserService.save(this.fillConfiguration(0 , name, login, password)).subscribe((res) =>{
        this.goBack()
    });
    }

	fillConfiguration(id: number, login: string, name: string, password: string): User {
		var user: User = {id: "", nome: "", login: ""}
		user.id = id;
		user.nome = name;
    user.login = login;
    user.senha = password;
		return user;
	}

	ngOnInit() {
	}

}
