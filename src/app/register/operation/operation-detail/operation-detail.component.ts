import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import {OperationService} from './../../../services/operation.service';
import {Operation} from './../../../entities/operation';
import {User} from './../../../entities/user';

@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.css']
})
export class OperationDetailComponent implements OnInit {

  @Input() operation: Operation;

	constructor(private OperationService: OperationService, private route: ActivatedRoute, private location: Location) {}

	ngOnInit() {
			this.getOperation();
		}

	goBack(): void {
    this.location.back();
  	}

	getOperation(){
		const id = +this.route.snapshot.paramMap.get('id');
		this.OperationService.get(id).subscribe((res) =>{
    		this.operation = res;
    });
	}

	

  	save(dataOperacao: string,quantidade: number, valorPapel: number, valorTotal: number){
     this.OperationService.update(this.fill(this.operation.id, this.operation.papel, this.operation.user, dataOperacao, quantidade, valorPapel, valorTotal)).subscribe((res) =>{
        this.goBack()
    });
    }


	fill(id: number, papel: Papel, usuario: User,  dataOperacao: string,quantidade: number, valorPapel: number, valorTotal: number): Operation {
		var operation: Operation = {papel: "", usuario: "", tipoOperacao: "", dataOperacao: "",quantidade: "", valorPapel: "", valorTotal: ""}
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
