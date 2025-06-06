import { Component, signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  NgModel,
} from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { DatosService } from '../datos.service';
import { Validacionespropias } from '../validacionespropias';


@Component({
  selector: 'app-login-movil',
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './login-movil.component.html',
  styleUrl: './login-movil.component.css'
})
export class LoginMovilComponent {
  private datosService = inject(DatosService);

  datos!: string;
  loginForm!: FormGroup;

  resultado!: string;
  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder, private registro: DatosService, private fbl: FormBuilder, private login: DatosService, private router: Router) {
    this.formularioRegistro = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      passw: ['', [Validacionespropias.comprobar]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.loginForm = this.fbl.group({
      usuario: ['', [Validators.required]],
      passw: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formularioRegistro.valid) {
      let { usuario, passw, email } = this.formularioRegistro.value;
      this.registro.registro(usuario, email, passw).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Registro exitoso', response.message);
            this.resultado = "Registro completado con éxito";
            this.formularioRegistro.reset();
            this.router.navigate(['']);
          } else {
            this.resultado = "Error en el registro: " + response.message;
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
          this.resultado = "Error en la comunicación con el servidor";
        }
      );
    } else {
      this.resultado = "Por favor, complete todos los campos correctamente";
    }
  }

  reset() {
    this.formularioRegistro.reset();
    this.resultado = ""
  }

  // Señales para controlar visibilidad de modales
  showLogin = signal(true);
  showRegister = signal(false);

  // Método para abrir el modal de login
  openLogin(): void {
    this.showLogin.set(true);
    this.showRegister.set(false); // Cierra registro si está abierto
  }

  // Método para cerrar el modal de login
  closeLogin(): void {
    this.showLogin.set(false);
  }

  // Método para abrir el modal de registro
  openRegister(): void {
    this.showRegister.set(true);
    this.showLogin.set(false); // Cierra login si está abierto
  }

  // Método para cerrar el modal de registro
  closeRegister(): void {
    this.showRegister.set(false);
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const { usuario, passw } = this.loginForm.value;
      this.login.login(usuario, passw).subscribe(
        (response: any) => {
          if (response.mensaje === 'ok') {
            console.log('Login exitoso', response.datos);
            localStorage.setItem('usuario', usuario)
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
}
