import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/common/entities/user';
import { UserService } from 'src/app/stocks/services/user.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  goBack(): void {
    this.location.back();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe((res) => {
      this.user = res;
    });
  }



  save(senha: string) {
    this.userService.update(this.fillConfiguration(this.user.id, senha)).subscribe((res) => {
      this.goBack();
    });
  }


  fillConfiguration(id: number, senha: string): User {
    const user: User = { id: null, nome: '', login: '', senha: '' };
    user.id = id;
    user.senha = senha;
    return user;
  }

}
