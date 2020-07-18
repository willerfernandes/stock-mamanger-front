import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { Operation } from '../../../../entities/operation';
import { Stock } from '../../../../entities/stock';
import { OperationService } from 'src/app/stocks/services/operation.service';
import { User } from 'src/app/common/entities/user';

@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.css']
})
export class OperationDetailComponent implements OnInit {

  @Input() operation: Operation;

  constructor(private operationService: OperationService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getOperation();
  }

  goBack(): void {
    this.location.back();
  }

  getOperation() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.operationService.get(id).subscribe((res) => {
      this.operation = res;
    });
  }



  save(dataOperacao: string, quantidade: number, valorPapel: number, valorTotal: number) {
    this.operationService.update(this.fill(this.operation.id, this.operation.papel, this.operation.usuario, dataOperacao, quantidade, valorPapel, valorTotal)).subscribe((res) => {
      this.goBack();
    });
  }


  fill(id: number, papel: Stock, usuario: User, dataOperacao: string, quantidade: number, valorPapel: number, valorTotal: number): Operation {
    var operation: Operation = {id:0, guid:'', papel: null, usuario: null, tipoOperacao: "", dataOperacao: "", quantidade: 0, valorPapel: 0, valorTotal: 0 }
    operation.id = id;
    operation.papel = papel;
    operation.usuario = usuario;
    operation.dataOperacao = dataOperacao;
    operation.quantidade = quantidade;
    operation.valorPapel = valorPapel;
    operation.valorTotal = valorTotal;
    return operation;
  }
}
