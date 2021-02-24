import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-navigate-mobile',
  templateUrl: './navigate-mobile.component.html',
  styleUrls: ['./navigate-mobile.component.scss'],
  animations: [
    trigger('mobileNavFade', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({
          opacity: 0
        }))
      ]),
    ])
  ]
})
export class NavigateMobileComponent implements OnInit {
  displayPopupNav: boolean = false;


  constructor() { }

  ngOnInit(): void { }

  onEnterNav() {
    this.displayPopupNav = true;
  }

  onExitNav() {
    this.displayPopupNav = false;
  }

  checkToCloseOnClick(targetElement) {
    if (targetElement.id && targetElement.id === 'nav-popup') {
      this.onExitNav();
    }
  }
}
