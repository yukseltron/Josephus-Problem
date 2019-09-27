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
        opacity: 1,
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
  isOpen = [];
  circleArray = [];
  styleArray = [];



  onSubmit() {
      this.theta = [];
      this.isOpen = [];
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
      let styleArray = [];
      for (let i = 0; i < n; i++) {
          let circle = document.createElement('div');
          circle.className = 'circle';
          circle.id = 'number' + i;
          circleArray.push(circle);
          this.isOpen.push(true);
          circleArray[i].posx = Math.round(rx * (Math.cos(this.theta[i]))) + 'px';
          circleArray[i].posy = Math.round(ry * (Math.sin(this.theta[i]))) + 'px';
          circleArray[i].style.position = "absolute";
          circleArray[i].style.backgroundColor = 'white';
          circleArray[i].style.width = w + 'px';
          circleArray[i].style.height = w + 'px';
          circleArray[i].style.borderRadius = '50%';
          circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
          circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
          let style = {
              position: 'absolute', backgroundColor: 'white', width: w + 'px', height: w + 'px', borderRadius: '50%',
              top: ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px',
              left: ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px'}
          styleArray.push(style);
      }
      console.log(this.circleArray[0]);
      this.circleArray = circleArray;
      this.styleArray = styleArray;

      /*
      for (let i = 0; i < circleArray.length; i += interval) {
          if (i += interval > circleArray.length) {
              i = ((i += interval)  - circleArray.length);
          }
      } */

  }

  toggle(i: number) {
      this.isOpen[i] = !this.isOpen[i];
      console.log(this.isOpen[i]);
  }
}
