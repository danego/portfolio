import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  noHeaderVH: number;
  headerHeight = 60; //px

  @HostListener('window:resize', ['$event']) onResize(event?) {
    //if on mobile, use outerHeight to account for browser bars
    if (window.innerWidth < 768) {
      this.noHeaderVH = window.outerHeight - this.headerHeight;
    }
    this.noHeaderVH = window.innerHeight - this.headerHeight;
  }

  constructor() { }

  ngOnInit(): void {
    //get current screen size to fill screen correctly (bc of separate nav bar)
    this.onResize();
  }

}
