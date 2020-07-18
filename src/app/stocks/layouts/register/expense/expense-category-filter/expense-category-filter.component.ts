import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/stocks/services/category.service';
import { Category } from 'src/app/stocks/entities/category';

@Component({
  selector: 'app-expense-category-filter',
  templateUrl: './expense-category-filter.component.html',
  styleUrls: ['./expense-category-filter.component.css']
})
export class ExpenseCategoryFilterComponent implements OnInit {

  categories: Category[] = [];
  isEmpty;
  isSuccess;
  isError;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.get_all_categories();
  }


  get_all_categories() {

    this.categories = [];
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
      this.handleResponse();
    });
  }


  find_by_chave(key: string) {
    this.categoryService.search(key).subscribe((res) => {
      this.categories = [];
      if (res != null && res.length > 0) {
        this.categories = res;
      } else {
        this.categories = [];
      }
      this.handleResponse();
    });
  }


  delete_category(id: number) {
    this.categoryService.delete(id).subscribe((res) => {
      this.get_all_categories();
    });
  }

  handleResponse() {
    this.isSuccess = this.categories.length > 0;
    this.isEmpty = this.categories.length === 0;
  }

}
