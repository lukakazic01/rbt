import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthButtonComponent} from "../components/auth-buttons/auth-buttons.component";
import {UserProfileComponent} from "../components/auth-user/user.component";
import {TheHeaderComponent} from "../components/the-header/the-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthButtonComponent, UserProfileComponent, TheHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rbt-task';
}
