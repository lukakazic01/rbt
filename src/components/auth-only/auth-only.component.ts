import {Component} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-auth-only',
  styleUrl: 'auth-only.component.scss',
  templateUrl: 'auth-only.component.html',
  standalone: true,
  imports: [CommonModule]
})

export class AuthOnlyComponent {

  constructor(public authService: AuthService) {
  }
}
