import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './register/configuration/config/config.component';
import {ConfigDetailComponent} from './register/configuration/config-detail/config-detail.component';
import {ConfigNewComponent} from './register/configuration/config-new/config-new.component';
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
