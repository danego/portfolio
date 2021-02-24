import { trigger, transition, animate, style, query, group, animateChild } from "@angular/animations";

export const navigateAnimations = 
  trigger ('routeAnimations', [
    // To-the-Right Swipe
    transition('about => home, projects => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      group([
        query(':leave', [              
          animate('400ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%' }))
        ])
      ]),
    ]),
    // To-the-Left Swipe
    transition('home => *, about => projects', [
      style({ position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '100%' })
      ]),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ left: '-100%' }))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%' }))
        ])
      ]),
    ]),
  ]);