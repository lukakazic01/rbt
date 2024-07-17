import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrl: 'loader.component.scss',
  standalone: true,
  imports: [CommonModule]
})

export class LoaderComponent {

  @Input('isLoading') isLoading: boolean = false;
}
