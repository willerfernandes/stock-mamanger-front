import { Injectable } from '@angular/core';
import { Credentials } from '../entities/credentials';
import { UserAuth } from '../entities/user-auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpenseReport } from '../entities/expense-report';
import { ItemGrafico } from '../entities/item-grafico';
import { GrupoLancamento } from '../entities/grupo-lancamento';
import { Lancamento } from '../entities/lancamento';
import { User } from '../entities/user';
import { CategoriaLancamento } from '../entities/categoria-lancamento';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;


  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string): Observable<UserAuth> {
    // ao remover o fake service, remover também do auth guard
    console.log('Fake authorization! Aways logging');
    const user: UserAuth = {
      id: 1,
      login: 'willerfernandes',
      nome: 'Willer Santos',
      token: '9123jhasdjaqs812318dajsd8q1j219e3j121234=çfasd.1//a~]-=dlaspiodmjapismda9da89ujd9q'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return of(user);
  }

  save(user): Observable<User> {
    return of(user);
  }

  loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    console.log('Fake expense report');

    // --------- EXPENSE REPORT ------------
    const report = new ExpenseReport();
    report.itemGrafico = new ItemGrafico();
    report.valorTotal = 503.67;
    report.itemGrafico.nome = ['Alimentação', 'Transporte'];
    report.itemGrafico.valor = [400.12, 103.55];

    //grupo 1
    const grupo1 = new GrupoLancamento();
    grupo1.id = 1;
    grupo1.categoria = 'Alimentacao';
    grupo1.valor = 37.68;
    grupo1.percentual = 0.75;

    const lancamento1 = new Lancamento();
    lancamento1.id = 1;
    lancamento1.tipo = 'DESPESA';
    lancamento1.valor = 12.56;
    lancamento1.data = '2020-01-22T04:31:01.315+0000';
    lancamento1.descricao = 'Almoço no trabalho';

    const lancamento2 = new Lancamento();
    lancamento2.id = 2;
    lancamento2.tipo = 'DESPESA';
    lancamento2.valor = 15.56;
    lancamento2.data = '2020-02-22T04:31:01.315+0000';
    lancamento2.descricao = 'Almoço no trabalho na sexta';

    grupo1.lancamentos = [lancamento1, lancamento2];


    //grupo 2
    const grupo2 = new GrupoLancamento();
    grupo1.id = 2;
    grupo2.categoria = 'Uber';
    grupo2.valor = 555.68;
    grupo2.percentual = 0.15;

    const lancamento3 = new Lancamento();
    lancamento3.id = 3;
    lancamento3.tipo = 'DESPESA';
    lancamento3.valor = 11.56;
    lancamento3.data = '2020-01-25T04:31:01.315+0000';
    lancamento3.descricao = 'Almoço no trabalho';

    const lancamento4 = new Lancamento();
    lancamento4.id = 4;
    lancamento4.tipo = 'DESPESA';
    lancamento4.valor = 10.56;
    lancamento4.data = '2020-02-23T04:31:01.315+0000';
    lancamento4.descricao = 'Almoço no trabalho na sexta';

    grupo1.lancamentos = [lancamento1, lancamento2];
    grupo2.lancamentos = [lancamento3, lancamento4];

    report.gruposLancamentos = [grupo1, grupo2];

    // return of(report);
    // ----------------------------------------


    // --------- EMPTY EXPENSE REPORT ------------
    return of(null);
  }

  public saveEntry(entry: Lancamento): Observable<Lancamento> {
    return of(entry);
  }

  public deleteEntry(id: number): Observable<Lancamento> {
    const entry = new Lancamento();
    return of(entry);
  }

  public loadEntryGroups(): Observable<CategoriaLancamento[]> {
    const entryGroup1 = new CategoriaLancamento();
    entryGroup1.id = 1;
    entryGroup1.nome = 'Alimentacao';
    entryGroup1.descricao = 'Despesas com alimentação';
    entryGroup1.tipo = 'DESPESA';

    const entryGroup2 = new CategoriaLancamento();
    entryGroup2.id = 2;
    entryGroup2.nome = 'Uber';
    entryGroup2.descricao = 'Despesas com transporte de Uber';
    entryGroup2.tipo = 'DESPESA';

    const entryGroup3 = new CategoriaLancamento();
    entryGroup3.id = 3;
    entryGroup3.nome = 'Roupas';
    entryGroup3.descricao = 'Despesas com roupas';
    entryGroup3.tipo = 'DESPESA';

    const allEntries = [entryGroup1, entryGroup2, entryGroup3];

    return of(allEntries);
  }
}
