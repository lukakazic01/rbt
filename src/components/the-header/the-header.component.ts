import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AuthButtonComponent} from "../auth-buttons/auth-buttons.component";
import {UserProfileComponent} from "../auth-user/user.component";


@Component({
  styleUrl: 'the-header.component.scss',
  templateUrl: 'the-header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    AuthButtonComponent,
    UserProfileComponent
  ],
  selector: 'app-nav'
})

export class TheHeaderComponent {

}
