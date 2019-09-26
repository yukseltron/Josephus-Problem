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
  interval = 0;
  people = 0;
  theta = [];

  onSubmit() {
      document.getElementById('main').innerHTML = '';
      this.theta = [];
      let frags = 360 / this.people;
      for (let i = 0; i <= this.people; i++) {
          this.theta.push((frags / 180) * i * Math.PI);
      }
      let n = +this.people;
      let rx = 250;
      let ry = 250;
      let id = 'main';
      let w = 500/n;

      let main = document.getElementById(id);
      let mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
      let circleArray = [];
      for (let i = 0; i < n; i++) {
          let circle = document.createElement('div');
          circle.className = 'circle number' + i;
          circleArray.push(circle);
          circleArray[i].posx = Math.round(rx * (Math.cos(this.theta[i]))) + 'px';
          circleArray[i].posy = Math.round(ry * (Math.sin(this.theta[i]))) + 'px';
          circleArray[i].style.position = "absolute";
          circleArray[i].style.backgroundColor = 'white';
          circleArray[i].style.width = w + 'px';
          circleArray[i].style.height = w + 'px';
          circleArray[i].style.borderRadius = '50%';
          console.log(circle);
          circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
          circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
          main.appendChild(circleArray[i]);
      }

  }

}
