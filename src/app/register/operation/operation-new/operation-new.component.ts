import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OperationService } from './../../../../app/stocks/services/operation.service';
import { Stock } from './../../../entities/stock';
import { User } from './../../../entities/user';
import { Operation } from './../../../entities/operation';

@Component({
  selector: 'app-operation-new',
  templateUrl: './operation-new.component.html',
  styleUrls: ['./operation-new.component.css']
})
export class OperationNewComponent implements OnInit {

  @Input() operation: Operation;


  constructor(private operationService: OperationService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(codPapel: string, tipoOperacao: string, quantidade: number, valorPapel: number) {
    this.operationService.save(this.fill(0, codPapel, 0, tipoOperacao, quantidade, valorPapel)).subscribe((res) => {
      this.goBack();
    });


  }

	/*private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }*/


  fill(id: number, codPapel: string, idUser: number, tipoOperacao: string, quantidade: number, valorPapel: number): Operation {

    var operation: Operation = {id: 0, guid: '', papel: null, usuario: null, tipoOperacao: "", dataOperacao: "", quantidade: 0, valorPapel: 0, valorTotal: 0 };
    var usuario: User = { id: 0, nome: "" , login: "", senha: ""};
    var papel: Stock = { id: 0, codPapel: '', codEmpresaBovespa: '', empresaPapel: "", valor: 0, valorMaximo:0, valorMinimo: 0, stockInfo: null, operations: null };

    usuario.id = idUser;
    papel.codPapel = codPapel;

    operation.id = id;
    operation.papel = papel;
    operation.usuario = usuario;
    operation.tipoOperacao = tipoOperacao;
    operation.quantidade = quantidade;
    operation.valorPapel = valorPapel;
    return operation;
  }

  ngOnInit() {
  }


}
