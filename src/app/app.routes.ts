import { Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { DetallesComponent } from './libros/detalles/detalles.component';
import { ErrorComponent } from './error/error.component';
import { ListaComponent } from './lista/lista.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';


export const routes: Routes = [
    {
        path: '',
        component: LibraryComponent
    },
    {
        path: 'libros',
        component: LibrosComponent,
        children: [
            {
                path: 'detalles',
                component: DetallesComponent
            }]
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