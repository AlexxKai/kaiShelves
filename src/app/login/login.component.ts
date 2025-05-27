import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  NgModel,
} from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  datos!: string;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private login: DatosService, private router: Router) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const { identifier, password } = this.loginForm.value;
      this.login.login(identifier, password).subscribe(
        (response: any) => {
          if (response.mensaje === 'ok') {
            console.log('Login exitoso', response.datos);
            localStorage.setItem('identifier', identifier)
            this.router.navigate(['']);
          } else {
            console.log('Login fallido');
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
        }
      );
    }
  }


  mostrar = true
  mostrar_boton() {
    this.mostrar = true
  }
  ocultar_boton() {
    this.mostrar = false
  }

}
