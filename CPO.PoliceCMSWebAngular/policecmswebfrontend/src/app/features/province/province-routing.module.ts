import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceListComponent } from './components/province-list/province-list.component';
//import { ProvinceAddComponent } from './components/province-add/province-add.component';
// import { ProvinceEditComponent } from './components/province-edit/province-edit.component';
// import { ProvinceViewComponent } from './components/province-view/province-view.component';

const routes: Routes = [
  // { path: '', component: ProvinceListComponent },
  // { path: 'add', component: ProvinceAddComponent },
  // { path: 'edit/:id', component: ProvinceEditComponent },
  // { path: 'view/:id', component: ProvinceViewComponent },
  { path: '', component: ProvinceListComponent },  // No need to declare in a module
  { path: 'add', loadComponent: () => import('./components/province-add/province-add.component').then(m => m.ProvinceAddComponent) },
  { path: 'edit/:id', loadComponent: () => import('./components/province-edit/province-edit.component').then(m => m.ProvinceEditComponent) },
  { path: 'view/:id', loadChildren: () => import('./components/province-view/province-view.component').then(m => m.ProvinceViewComponent) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
