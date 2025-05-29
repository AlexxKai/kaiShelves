import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LibraryComponent } from './library/library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 title='Kai Shelves';
}