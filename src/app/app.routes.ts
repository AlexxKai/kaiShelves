import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';


export const routes: Routes = [
    {
        path: '',
        component: LibraryComponent
    },
    {
        path: 'books',
        component: BookComponent,
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