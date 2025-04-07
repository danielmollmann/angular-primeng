import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; // Importando NavbarComponent

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent], // Adicionando NavbarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrigindo 'styleUrl' para 'styleUrls'
})
export class AppComponent {
  title = 'angular-primeng';
}
