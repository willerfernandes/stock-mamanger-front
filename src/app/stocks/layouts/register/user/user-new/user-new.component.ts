import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/stocks/services/user.service';
import { User } from 'src/app/common/entities/user';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(name: string, login: string, password: string) {
    this.userService.save(this.fillConfiguration(0, name, login, password)).subscribe((res) => {
      this.goBack()
    });
  }

  fillConfiguration(id: number, login: string, name: string, password: string): User {
    const user: User = { id: null, nome: '', login: '', senha: '' };
    user.id = id;
    user.nome = name;
    user.login = login;
    user.senha = password;
    return user;
  }

  ngOnInit() {
  }

}
