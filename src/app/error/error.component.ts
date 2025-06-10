import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-error',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  randomImage = signal<string>('');
  public datosService = inject(DatosService);


  constructor() {
    this.setRandomImage();
  }

  private setRandomImage() {
    const images = [
      'error1.png',
      'error2.png',
      'error3.png',
      'error4.png',
      'error1.jpg',
      'error2.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    this.randomImage.set(`/error/${images[randomIndex]}`);
  }
}