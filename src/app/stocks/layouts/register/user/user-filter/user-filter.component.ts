import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/entities/user';
import { UserService } from 'src/app/stocks/services/user.service';


@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {

  nome: string;

  title = 'stock-manager-front';
  products = [];
  users: User[] = [];
  user: User = { id: null, nome: '', login: '', senha: '' };
  baseUrl = 'http://localhost:3000';
  isError;
  isEmpty;
  isSuccess;

  constructor(private userService: UserService) { }

  get_all_users() {

    this.users = [];
    this.userService.getAll().subscribe((res) => {
      this.users = res;
      this.handleResponse();
    });
  }

  find_by_chave(key: string) {
    this.userService.search(key).subscribe((res) => {
      this.users = [];
      if (res != null) {
        this.users = res;
      } else {
        this.users = [];
      }
      this.handleResponse();
    });
  }


  delete_user(id: number) {
    this.userService.delete(id).subscribe((res) => {
      this.get_all_users();
    });
  }


  ngOnInit() {
    this.get_all_users();
  }

  handleResponse() {
    this.isSuccess = this.users.length > 0;
    this.isEmpty = this.users.length === 0;
  }

}
