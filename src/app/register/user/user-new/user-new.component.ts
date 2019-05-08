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

  	save(name: string, password: string){
     this.UserService.save(this.fillConfiguration(0 , name, password)).subscribe((res) =>{
        this.goBack()
    });
    }

	fillConfiguration(id: number, name: string, password: string): User {
		var user: User = {nome: ""}
		user.id = id;
		user.nome = name;
		return user;
	}

	ngOnInit() {
	}

}
