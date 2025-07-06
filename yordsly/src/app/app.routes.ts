import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page.component/landing-page.component';
import { SignUpComponent } from './components/sign-up.component/sign-up.component';
import { LoginComponent } from './components/login.component/login.component';

export const routes: Routes = [
    {
        path : '', redirectTo: 'landing', pathMatch: 'full'
    },
    {
        path: 'landing', component: LandingPageComponent
    },
    {
        path: 'signup', component: SignUpComponent
    },
    {
        path: 'login', component: LoginComponent
    }
];
