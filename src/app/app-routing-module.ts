import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [{
    path: 'login',
    component: Login,
},
{
    path: 'signup',
    component: Registration,
},
{
    path: 'product',
    loadChildren: () => import('./product/product-module').then(m => m.ProductModule),
    canActivate:[AuthGuard],
},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
