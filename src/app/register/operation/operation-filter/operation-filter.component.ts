import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationService } from './../../../services/operation.service';
import { Operation } from './../../../entities/operation';
import { User } from './../../../entities/user';
import { Stock } from './../../../entities/stock';

@Component({
  selector: 'app-operation-filter',
  templateUrl: './operation-filter.component.html',
  styleUrls: ['./operation-filter.component.css']
})
export class OperationFilterComponent implements OnInit {

  nome: string;

  title = 'operation-manager-front';
  operations: Operation[] = [];

  user: User = { id: 0, login: '', nome: '', senha: '' };
  papel: Stock = {
    id: 0,
    codEmpresaBovespa: "",
    operations: null,
    stockInfo: null,
    codPapel: "",
    empresaPapel: "",
    valor: 0,
    valorMaximo: 0,
    valorMinimo: 0
  }

  operation: Operation = {
    id: 0,
    dataOperacao: "",
    guid: "",
    quantidade: 0,
    valorPapel: 0,
    valorTotal: 0,
    tipoOperacao: '',
    usuario: this.user,
    papel: this.papel
  };
  isError;
  isEmpty;
  isSuccess;

  constructor(private operationService: OperationService) { }

  get_all_operations() {

    this.operations = [];
    this.operationService.getAll().subscribe((res) => {
      this.operations = res;
      this.handleResponse();
    });
  }

  find_by_chave(key: string) {
    this.operationService.search(key).subscribe((res) => {
      this.operations = [];
      if (res != null) {
        this.operations = res;
      } else {
        this.operations = [];
      }
      this.handleResponse();
    });
  }


  delete_operation(id: number) {
    this.operationService.delete(id).subscribe((res) => {
      this.get_all_operations();
    });
  }

  ngOnInit() {
    this.get_all_operations();
  }

  handleResponse() {
    this.isSuccess = this.operations.length > 0;
    this.isEmpty = this.operations.length === 0;
  }

}
