import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { DisplayBgGradientService } from '../services/display-bg-gradient.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  noHeaderVH: number;
  headerHeight = 60; //px
  mobileBottomBrowserHeight = 75; //px
  profileSurroundingCircleSize = 220; //px
  circleIconsDisplayed: boolean = true;
  circlePositions = {
    iconOne: 0,
    iconTwo: 0,
    iconThree: 0,
    iconOneFinal: 4,
    iconTwoFinal: 6,
    iconThreeFinal: 8,
    firstPosition: 11
  };

  @HostListener('window:resize', ['$event']) onResize(event?) {
    //mobile landscape orientation
    if (window.innerHeight < 505) {
      //default minimum height value
      this.noHeaderVH = 569;
    }
    //if on mobile, still use innerHeight, but account for browser bar
    //add 2px to allow it to be scrolled away
    //only allow to be defined once to prevent scrolling/resizing effect
    else if (window.innerWidth < 640) {
      if (!this.noHeaderVH) {
        this.noHeaderVH = window.innerHeight - this.headerHeight + this.mobileBottomBrowserHeight + 1;
        localStorage.setItem('noHeaderVH', this.noHeaderVH.toString());
      }
    }
    else {
      this.noHeaderVH = window.innerHeight - this.headerHeight;
    }
  }

  constructor(private displayBgGradientService: DisplayBgGradientService) { }

  ngOnInit(): void {
    //check for already established height (only for mobile)
    const previousCalculatedHeight = +localStorage.getItem('noHeaderVH');
    if (previousCalculatedHeight) {
      this.noHeaderVH = previousCalculatedHeight;
    }
    //get current screen size to fill screen correctly (bc of separate nav bar)
    this.onResize();

    this.animateCircleElements();
  }

  animateCircleElements(startingGateValue: number = 1) {
    if (this.circlePositions.iconOne > this.circlePositions.iconOneFinal || startingGateValue === 1) {
      window.setTimeout(() => {
        if (startingGateValue >= 1 && (this.circlePositions.iconOne > this.circlePositions.iconOneFinal || this.circlePositions.iconOne === 0)) {
          this.circlePositions.iconOne === 0 ? 
            this.circlePositions.iconOne = this.circlePositions.firstPosition:
            this.circlePositions.iconOne--;
        }
        if (startingGateValue >= 3 && (this.circlePositions.iconTwo > this.circlePositions.iconTwoFinal || this.circlePositions.iconTwo === 0)) {
          this.circlePositions.iconTwo === 0 ? 
            this.circlePositions.iconTwo = this.circlePositions.firstPosition:
            this.circlePositions.iconTwo--;
        }
        if (startingGateValue >= 5 && (this.circlePositions.iconThree > this.circlePositions.iconThreeFinal || this.circlePositions.iconThree === 0)) {
          this.circlePositions.iconThree === 0 ? 
            this.circlePositions.iconThree = this.circlePositions.firstPosition:
            this.circlePositions.iconThree--;
        } 

        this.animateCircleElements(++startingGateValue);
      }, 150);
    }
  }

  animateCircleElementsReset(startingGateValue: number = 1) {
    if (this.circlePositions.iconOne > 0 || this.circlePositions.iconTwo > 0 || this.circlePositions.iconThree > 0) {
      window.setTimeout(() => {
        if (this.circlePositions.iconOne !== 0) {
          this.circlePositions.iconOne--;
        }
        if (this.circlePositions.iconTwo !== 0 ) { 
          this.circlePositions.iconTwo--;
        }
        if (this.circlePositions.iconThree !== 0) {
          this.circlePositions.iconThree--;
        } 

        this.animateCircleElementsReset(--startingGateValue);
      }, 150);
    }
  }

  //when clicked, call correct animation then toggle state
  onAnimateCircleElements() {
    this.circleIconsDisplayed ?
      this.animateCircleElementsReset(0) :
      this.animateCircleElements();
    this.circleIconsDisplayed = !this.circleIconsDisplayed;
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.displayBgGradientService.onRemoveBgGradient();
    return true;
  }
}
