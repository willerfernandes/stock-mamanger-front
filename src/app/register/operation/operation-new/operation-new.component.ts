import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {OperationService} from './../../../services/operation.service';
import {Stock} from './../../../entities/stock';
import {User} from './../../../entities/user';

@Component({
  selector: 'app-operation-new',
  templateUrl: './operation-new.component.html',
  styleUrls: ['./operation-new.component.css']
})
export class OperationNewComponent implements OnInit {

	@Input() operation: Operation;


	constructor(private OperationService: OperationService, private route: ActivatedRoute, private location: Location) {}

	goBack(): void {
	this.location.back();
		}

	save(codPapel: string, tipoOperacao: string, quantidade: number, valorPapel: number){
	 this.OperationService.save(this.fill(0, codPapel, this.idUser, tipoOperacao, quantidade, valorPapel)).subscribe((res) =>{
	    this.goBack()
	});
	}


	fill(id: number, codPapel: string, idUser: number, tipoOperacao: string, quantidade: number, valorPapel: number): Operation {
		
		var operation: Operation = {papel: "", usuario: "", tipoOperacao: "", dataOperacao: "",quantidade: "", valorPapel: "", valorTotal: ""}
		var usuario: User = {id:"", nome:""}
		var papel: Stock = {id: "",  codPapel: "",  empresaPapel: "",  valor: "",  valorMaximo: "",  valorMinimo: ""}

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
