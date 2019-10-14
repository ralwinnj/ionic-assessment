import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'accounts', loadChildren: './pages/accounts/accounts.module#AccountsPageModule' },
  { path: 'account-detail', loadChildren: './pages/accounts/account-detail/account-detail.module#AccountDetailPageModule' },
  { path: 'withdraw', loadChildren: './pages/accounts/account-detail/withdraw/withdraw.module#WithdrawPageModule' },
  { path: 'deposit', loadChildren: './pages/accounts/account-detail/deposit/deposit.module#DepositPageModule' },
  { path: 'account-create', loadChildren: './pages/accounts/account-create/account-create.module#AccountCreatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
