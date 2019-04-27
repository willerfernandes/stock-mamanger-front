import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './config/config.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/config', pathMatch: 'full' },
  { path: 'config', component: ConfigComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
