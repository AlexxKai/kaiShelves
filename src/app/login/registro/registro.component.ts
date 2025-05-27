import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validacionespropias } from '../../validacionespropias';
import { DatosService } from '../../datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre = '';
  apellido = '';

  resultado!: string;
  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder, private registro: DatosService) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validacionespropias.comprobar]],
    });
  }

submit() {
  if (this.formularioRegistro.valid) {
    let { nombre, mail, contraseña } = this.formularioRegistro.value;
    this.registro.registro(nombre, mail, contraseña).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Registro exitoso', response.message);
          this.resultado = "Registro completado con éxito";
          this.formularioRegistro.reset();
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
}


// submit() {
//   if (this.formularioRegistro.valid){
//     this.resultado = "Todos los datos son válidos";
//     this.formularioRegistro.reset();
//   }else{
//     this.resultado = "Hay datos inválidos en el formulario";
// }}