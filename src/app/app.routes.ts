import { Routes } from '@angular/router';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {authGuard} from './guards/auth.guard';
import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', canActivate: [authGuard], component:DashboardComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' }
];
