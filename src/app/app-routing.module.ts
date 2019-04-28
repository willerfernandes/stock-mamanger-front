import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './config/config.component';
import {ConfigDetailComponent} from './config-detail/config-detail.component';
import {ConfigNewComponent} from './config-new/config-new.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/config', pathMatch: 'full' },
  { path: 'config', component: ConfigComponent },
  { path: 'config/new', component: ConfigNewComponent },
  { path: 'config/:id', component: ConfigDetailComponent }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
