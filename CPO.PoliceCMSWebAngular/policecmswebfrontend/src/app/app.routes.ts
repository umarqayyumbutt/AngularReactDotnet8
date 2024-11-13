// app.routes.ts
import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/components/sign-in/sign-in.component';
// import { ProvinceListComponent } from './features/province/components/province-list/province-list.component';
// import { ProvinceAddComponent } from './features/province/components/province-add/province-add.component';
// import { ProvinceEditComponent } from './features/province/components/province-edit/province-edit.component';

export const routes: Routes = [
  { path: 'auth/sign-in', component: SignInComponent },
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  {
    path: 'province',
    loadChildren: () => import('./features/province/province.module').then(m => m.ProvinceModule)//,
    //canActivate: [AuthGuard]  // Optional: protect route
  }
  // { path: 'province/provinces', component: ProvinceListComponent },
  // { path: 'province/add', component: ProvinceAddComponent },
  // { path: 'province/edit/:id', component: ProvinceEditComponent },
  // {
  //   path: 'province/provinces',
  //   loadChildren: () => import('./features/province/province.module').then(m => m.ProvinceModule),
  //   //canActivate: [AuthGuard]  // Protect the route with AuthGuard
  // }
  // Add other routes as needed, e.g., dashboard
  //{ path: 'dashboard', component: DashboardComponent }, // Example dashboard route
];
