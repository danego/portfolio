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
    //add 1px to allow it to be scrolled away
    else if (window.innerWidth < 640) {
      this.noHeaderVH = window.innerHeight - this.headerHeight + this.mobileBottomBrowserHeight + 1;
    }
    else {
      this.noHeaderVH = window.innerHeight - this.headerHeight;
    }
  }

  constructor() { }

  ngOnInit(): void {
    //get current screen size to fill screen correctly (bc of separate nav bar)
    this.onResize();
  }

}
