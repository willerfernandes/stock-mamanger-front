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
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  public isFakeServer = true;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;


  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue != null;
  }


  login(username: string, password: string): Observable<UserAuth> {
    // ao remover o fake service, remover também do auth guard
    console.log('Fake authorization! Aways logging');
    const user: UserAuth = {
      id: 1,
      login: username,
      nome: 'Fake User',
      token: '9123jhasdjaqs812318dajsd8q1j219e3j121234=çfasd.1//a~]-=dlaspiodmjapismda9da89ujd9q'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    this.generateMockedDefaultEntryClassesData();

    return of(user);
  }

  private generateMockedDefaultEntryClassesData(): void {
    const entryGroup1 = new CategoriaLancamento();
    entryGroup1.id = 1;
    entryGroup1.nome = 'Alimentação';
    entryGroup1.descricao = 'Despesas com alimentação';
    entryGroup1.tipo = 'DESPESA';

    const entryGroup2 = new CategoriaLancamento();
    entryGroup2.id = 2;
    entryGroup2.nome = 'Transporte';
    entryGroup2.descricao = 'Despesas com transporte';
    entryGroup2.tipo = 'DESPESA';

    const entryGroup3 = new CategoriaLancamento();
    entryGroup3.id = 3;
    entryGroup3.nome = 'Lazer';
    entryGroup3.descricao = 'Despesas com lazer';
    entryGroup3.tipo = 'DESPESA';

    const entryGroup4 = new CategoriaLancamento();
    entryGroup4.id = 4;
    entryGroup4.nome = 'Salário';
    entryGroup4.descricao = 'Recebimento do salário';
    entryGroup4.tipo = 'RECEITA';

    const allEntries = [entryGroup1, entryGroup2, entryGroup3, entryGroup4];

    localStorage.setItem('entryClasses', JSON.stringify(allEntries));

  }

  save(user): Observable<User> {
    return of(user);
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  loadExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport> {
    console.log('Local Storage expense report');

    const allEntries: Lancamento[] = JSON.parse(localStorage.getItem('entries'));
    const entryClasses: CategoriaLancamento[] = JSON.parse(localStorage.getItem('entryClasses'));

    if (allEntries == null || allEntries.length === 0) {
      return of(null);
    }

    const filterStartDate: Date = new Date(startDate);
    const filterEndDate: Date = new Date(endDate);

    const entries = allEntries.filter(entry => new Date(entry.data) >= filterStartDate && new Date(entry.data) <= filterEndDate );

    if (entries == null || entries.length === 0) {
      return of(null);
    }

    const report: ExpenseReport = new ExpenseReport();
    const entryGroupExpenseList: GrupoLancamento[] = [];
    const entryGroupReceiptList: GrupoLancamento[] = [];

    let entryGroupId = 1;
    let totalValueExpenses = 0;
    let totalValueReceipt = 0;
    entryClasses.forEach(entryClass => {
      const entriesOfThisClass = entries.filter(entry => entry.categoria.nome === entryClass.nome);
      if (entriesOfThisClass.length !== 0) {
        const newEntryGroup: GrupoLancamento = new GrupoLancamento();
        newEntryGroup.lancamentos = entriesOfThisClass;
        newEntryGroup.categoria = entryClass.nome;
        let totalGroupValue = 0;
        entriesOfThisClass.forEach(entryOfThiClass => {
          totalGroupValue += entryOfThiClass.valor;
        });

        newEntryGroup.valor = totalGroupValue;
        newEntryGroup.id = entryGroupId;

        if (entryClass.tipo === 'DESPESA') {
          totalValueExpenses += totalGroupValue;
          entryGroupExpenseList.push(newEntryGroup);
        } else if (entryClass.tipo === 'RECEITA') {
          totalValueReceipt += totalGroupValue;
          entryGroupReceiptList.push(newEntryGroup);
        }


        entryGroupId++;
      }
    });

    const graphInfoNames: string[] = [];
    const graphInfoValues: number[] = [];
    entryGroupExpenseList.forEach(entryGroup => {
      entryGroup.percentual = entryGroup.valor / totalValueExpenses;
      graphInfoNames.push(entryGroup.categoria);
      graphInfoValues.push(entryGroup.valor);
    });

    report.gruposLancamentosDespesas = entryGroupExpenseList;
    report.gruposLancamentosReceitas = entryGroupReceiptList;
    report.valorTotalDespesas = totalValueExpenses;
    report.valorTotalReceitas = totalValueReceipt;
    report.itemGrafico = new ItemGrafico();
    report.itemGrafico.nome = graphInfoNames;
    report.itemGrafico.valor = graphInfoValues;

    // --------- EMPTY EXPENSE REPORT ------------
    console.log('localStorage');
    console.log(localStorage);
    return of(report);
  }

  public saveEntry(entry: Lancamento): Observable<Lancamento> {
    let entries: Lancamento[] = JSON.parse(localStorage.getItem('entries'));
    let entryClasses: CategoriaLancamento[] = JSON.parse(localStorage.getItem('entryClasses'));

    if (entries == null || entries.length === 0) {
      entries = [];
    }

    entry.id = entries.length  + 1;

    if (entry.categoria.id == null) {
      const newEntryClass = new CategoriaLancamento();
      newEntryClass.id = entries.length + 1;
      newEntryClass.nome = entry.categoria.nome;
      newEntryClass.descricao = entry.categoria.descricao;
      newEntryClass.tipo = entry.categoria.tipo;

      if (entryClasses == null || entryClasses.length === 0) {
        entryClasses = [];
      }

      entryClasses.push(newEntryClass);
      localStorage.setItem('entryClasses', JSON.stringify(entryClasses));

    } else {
      const classWithEntryId = entryClasses.find(entryClass => entryClass.id === entry.categoria.id);
      entry.categoria = classWithEntryId;
    }


    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    return of(entry);
  }

  public deleteEntry(id: number): Observable<Lancamento> {
    const entries: Lancamento[] = JSON.parse(localStorage.getItem('entries'));
    const toBeDeleted = entries.findIndex(entry => entry.id === id);
    const deleted = entries.splice(toBeDeleted, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    return of(deleted[0]);
  }

  public loadEntryGroups(type: string): Observable<CategoriaLancamento[]> {
    /*const entryGroup1 = new CategoriaLancamento();
    entryGroup1.id = 1;
    entryGroup1.nome = 'Alimentacao';
    entryGroup1.descricao = 'Despesas com alimentação';
    entryGroup1.tipo = 'DESPESA';

    const entryGroup2 = new CategoriaLancamento();
    entryGroup2.id = 2;
    entryGroup2.nome = 'Trasporte';
    entryGroup2.descricao = 'Despesas com transporte';
    entryGroup2.tipo = 'DESPESA';

    const entryGroup3 = new CategoriaLancamento();
    entryGroup3.id = 3;
    entryGroup3.nome = 'Lazer';
    entryGroup3.descricao = 'Despesas com lazer';
    entryGroup3.tipo = 'DESPESA';

    const allEntries = [entryGroup1, entryGroup2, entryGroup3];*/

    const entryClasses: CategoriaLancamento[] = JSON.parse(localStorage.getItem('entryClasses'));
    if (entryClasses == null) {
      return of(null);
    }
    return of(entryClasses.filter(entryClass => entryClass.tipo === type));

  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('entryClasses');
    localStorage.removeItem('entries');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
