import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
  templateUrl: './task2.component.html',
  selector: 'app-task2',
  standalone: true,
})
export class Task2Component {
  @ViewChild('table') tableEl: ElementRef<HTMLTableElement> | null = null;
  scrollToTable() {
    if(this.tableEl) this.tableEl.nativeElement?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
