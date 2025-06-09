import { Router, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { DeviceService } from './device.service';
import { deviceGuard } from './device.guard';
import { authGuard } from './auth.guard';
import { LoginMovilComponent } from './login-movil/login-movil.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./library/library.component').then(m => m.LibraryComponent),
        canActivate: [deviceGuard]
    },
    {
        path: 'books',
        loadComponent: () => import('./book/book.component').then(m => m.BookComponent)
    },
    {
        path: 'library',
        loadComponent: () => import('./library/library.component').then(m => m.LibraryComponent)
    },
    {
        path: 'bookDetails',
        component: BookDetailsComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginMovilComponent,
    },
    {
        path: 'lista',
        loadComponent: () => import('./lista/lista.component').then(m => m.ListaComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'error'
    }];

