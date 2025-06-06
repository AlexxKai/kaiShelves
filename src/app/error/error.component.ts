import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
