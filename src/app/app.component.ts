import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '100px',
        opacity: 1,
        backgroundColor: 'white'
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('2s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
    ]),
  ]
})
export class AppComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  array = [1];
  interval = "";
  people = "";

  onSubmit() {
      this.array = [1];
      for (let i = 2; i <= this.people; i++) {
        this.array.push(i);
      }
      setCircles(this.people);
  }

  setCircles(amount: string) {
      amount += "em";
      console.log(amount);
      document.querySelector("block-content").style.setProperty('$amount', amount);
  }

}
