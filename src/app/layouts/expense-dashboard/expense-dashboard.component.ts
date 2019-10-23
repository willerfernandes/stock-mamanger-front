import { Component, OnInit } from '@angular/core';
import {ExpenseService} from './../../services/expense.service';
import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule, DateAdapter} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

// Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType = 'pie';

  public dataInicial;
  public dataFinal;

  gruposLancamentos;

  public isSuccess = true;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  get_expenses_resume(dataInicial: string, dataFinal: string) {
    this.ExpenseService.get(dataInicial, dataFinal).subscribe(res => {
    console.log(res);
    this.pieChartLabels = res.itemGrafico.nome;
    this.pieChartData = res.itemGrafico.valor;
    this.gruposLancamentos = res.gruposLancamentos;
    this.isSuccess = res.itemGrafico !== null;
    }).orElse(this.isSuccess = false);
  }

  constructor(private ExpenseService: ExpenseService, private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this._adapter.setLocale('br');
    const dataInicial = new Date();
    dataInicial.setMonth(dataInicial.getMonth() - 1);
    this.dataInicial = new FormControl(dataInicial);
    this.dataFinal = new FormControl(new Date(Date.now()));
    this.get_expenses_resume(this.dataInicial.value.toISOString(), this.dataFinal.value.toISOString());
  }

  openModal(id: string) {
    this.modalService.open(id);
}

}
