import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  noHeaderVH: number;
  headerHeight = 60; //px
  mobileBottomBrowserHeight = 75; //px

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

  constructor() { }

  ngOnInit(): void {
    //check for already established height (only for mobile)
    const previousCalculatedHeight = +localStorage.getItem('noHeaderVH');
    if (previousCalculatedHeight) {
      this.noHeaderVH = previousCalculatedHeight;
    }
    //get current screen size to fill screen correctly (bc of separate nav bar)
    this.onResize();
  }

}
