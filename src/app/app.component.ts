import { Component, HostBinding } from '@angular/core';
import {Circular} from './circular';
import {
  trigger,
  state,
  style,
  animate,
  stagger,
  query,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      state('default', style({
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
  deaths = [];
  survivor = '';


  onSubmit() {
      (<HTMLElement>document.querySelector('#results')).style.visibility = 'hidden';
      this.theta = [];
      let isOpen = [];
      let frags = 360 / this.people;
      for (let i = 0; i <= this.people; i++) {
          this.theta.push((frags / 180) * i * Math.PI);
      }
      let n = this.people;
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
          isOpen.push(true);
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
      this.circleArray = circleArray;
      this.styleArray = styleArray;
      this.isOpen = isOpen;
  }

  start() {
      (<HTMLElement>document.querySelector('#results')).style.visibility = 'visible';
      this.deaths = this.josephus(this.people, this.interval);
      this.survivor = this.deaths.pop();
      let list = [];
      for (let i = 0; i < this.people; i++) {
          list.push(i);
      }
      let circles = new Circular(list);
      let x = 1;
      while (circles.arr.length > 1) {
          //console.log("b",circles.arr.length, x, circles.current());
          if (x % this.interval == 0) {
              let index = circles.current();
              circles.next();
              x += 1;
              this.toggle(circles.arr[index]);
              circles.arr.splice(index,1);
          } else {
              circles.next();
              x += 1;
          }
      }
  }

  toggle(index: number) {
      this.isOpen[index] = false;
      //console.log("done",index, this.isOpen);
  }

  josephus (n: number, interval: number) {
      let people = [];
      let deaths = [];

      for (let i = 0; i < n; i += 1) {
          people[i] = i;
      }

      let index = 0;
      let len = people.length;
      while (len = people.length) {
          index = (index + interval) % len;
          deaths.push(people[index]);
          people.splice(index, 1);
      }

      return deaths;
  }
}
