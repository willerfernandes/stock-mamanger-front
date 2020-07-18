import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/stocks/services/category.service';
import { Category } from 'src/app/stocks/entities/category';


@Component({
  selector: 'app-expense-category-new',
  templateUrl: './expense-category-new.component.html',
  styleUrls: ['./expense-category-new.component.css']
})
export class ExpenseCategoryNewComponent implements OnInit {

  @Input() operation: Category;


  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(tipo: string, nome: string, descricao: string) {
    this.categoryService.save(this.fill(0, tipo, nome, descricao)).subscribe((res) => {
      this.goBack()
    });


  }

  fill(id: number, tipo: string, nome: string, descricao: string): Category {
    const category: Category = { id: 0, tipo: '', nome: '', descricao: '' };
    category.id = id;
    category.tipo = tipo;
    category.nome = nome;
    category.descricao = descricao;
    return category;
  }

  ngOnInit() {
  }

}
