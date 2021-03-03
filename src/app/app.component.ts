import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { navigateAnimations } from './navigateAnimations'; 
import { DisplayBgGradientService } from './display-bg-gradient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    navigateAnimations
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'portfolio';
  route: Subscription;
  onHome: boolean;
  onAbout: boolean;
  onProjects: boolean;
  displayMobileNav: boolean = false;
  displayGradient: boolean = false;
  displayGradientLockEngaged: boolean = false;

  displayGradientSub: Subscription;

  @HostListener('window:resize') checkWindowSizeForNav() {
    if (window.innerWidth < 640) this.displayMobileNav = true;
    else this.displayMobileNav = false;
  }

  constructor(private router: Router, private displayBgGradientService: DisplayBgGradientService) {}

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
        }

        //exit out of popupNavigation if on mobile
        this.checkWindowSizeForNav();

        //load background gradient
        this.checkToDisplayGradient();

        //subscribe to service to disable bg gradient during route changes
        this.displayGradientSub = this.displayBgGradientService.removeBgGradient.subscribe((currentlyDisabled) => {
          this.displayGradient = currentlyDisabled;
          this.displayGradientLockEngaged = true;

          window.setTimeout(() => {
            this.displayGradientLockEngaged = false;
            this.checkToDisplayGradient();
          }, 407) //page slide animation duration = 400ms
        });
      }
    });
  }

  resetPageValuesToFalse() {
    this.onHome = false;
    this.onAbout = false;
    this.onProjects = false;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  checkToDisplayGradient() {
    if (this.onHome || this.displayGradientLockEngaged) this.displayGradient = false;
    else this.displayGradient = true;

    //window.setTimeout(() => {
    //}, 300);
  }
  
  ngOnDestroy() {
    this.route.unsubscribe();
    if (this.displayGradientSub) this.displayGradientSub.unsubscribe();
  }
}
