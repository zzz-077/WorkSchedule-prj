import { Routes } from '@angular/router';
import { UndefinedPageComponent } from './components/undefined-page/undefined-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  { path: 'schedule', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: UndefinedPageComponent },
];
