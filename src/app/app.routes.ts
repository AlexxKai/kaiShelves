import { Router, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { DeviceService } from './device.service';
import { inject } from '@angular/core';
import { deviceGuard } from './device.guard';

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
        path: 'lista',
        component: ListaComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'error'
    }];

