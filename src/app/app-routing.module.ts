import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { Authguard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [Authguard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    canActivate: [Authguard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
