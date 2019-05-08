import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from './../../../services/user.service';
import {User} from './../../../entities/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: Config;

	constructor(private UserService: UserService, private route: ActivatedRoute, private location: Location) {}

	ngOnInit() {
			this.getUser();
		}

	goBack(): void {
    this.location.back();
  	}

	getUser(){
		const id = +this.route.snapshot.paramMap.get('id');
		this.UserService.get(id).subscribe((res) =>{
    		this.user = res;
    });
	}

	

  	save(value: string){
     this.UserService.update(this.fillConfiguration(this.user.id, value)).subscribe((res) =>{
        this.goBack()
    });
    }


	fillConfiguration(id: number, nome: string): User {
		var user: User = {nome: ""}
		user.id = id;
		user.nome = nome;
		return user;
	}

}
