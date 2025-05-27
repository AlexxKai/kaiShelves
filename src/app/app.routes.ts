import { Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { DetallesComponent } from './libros/detalles/detalles.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { ErrorComponent } from './error/error.component';
import { ListaComponent } from './lista/lista.component';

export const routes: Routes = [
    {
        path: '',
        component: LibrosComponent
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
        path: 'login',
        component: LoginComponent,
        children: [
            {
                path: 'registro',
                component: RegistroComponent
            }]
    },
    {
        path:'lista',
        component:ListaComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'error'
    }];