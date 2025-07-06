import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page.component/landing-page.component';
import { SignUpComponent } from './components/sign-up.component/sign-up.component';
import { LoginComponent } from './components/login.component/login.component';
import { UserProfileComponent } from './components/user-profile.component/user-profile.component';
import { YordicoinGamesComponent } from './components/yordicoin-games.component/yordicoin-games.component';

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
    },
    {
        path: 'userProfile', component: UserProfileComponent
    },
    {
        path: 'yordicoinGames', component: YordicoinGamesComponent
    }
];
