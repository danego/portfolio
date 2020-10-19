import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'portfolio';
  route: Subscription;
  onHome: boolean;
  onAbout: boolean;
  onProjects: boolean;
  onContact: boolean;

  constructor(private router: Router) {}

  //used this way instead of repeating nav-link code on each page 
  ngOnInit() {
    this.route = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.resetPageValuesToFalse();
        switch(event.url) {
          case '/':
            this.onHome = true;
            break;
          case '/about':
            this.onAbout = true;
            break;
          case '/projects':
            this.onProjects = true;
            break;
          case '/contact':
            this.onContact = true;
            break;
        }
      }
    });
  }

  resetPageValuesToFalse() {
    this.onHome = false;
    this.onAbout = false;
    this.onProjects = false;
    this.onContact = false;
  }
  
  ngOnDestroy() {
    this.route.unsubscribe();
  }
}
