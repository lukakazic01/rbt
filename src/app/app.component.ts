import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthButtonComponent} from "../components/auth-button/auth.component";
import {UserProfileComponent} from "../components/user/user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthButtonComponent, UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rbt-task';
}
