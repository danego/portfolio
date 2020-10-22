import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-hover-photo',
  templateUrl: './hover-photo.component.html',
  styleUrls: ['./hover-photo.component.scss'],
  animations: [
    trigger('popupPhoto', [
      transition('void => *', [
        style({
          //opacity: 0.75,
          opacity: 0,
          //transform: 'translateX(200px)'
        }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({
          opacity: 0,
          //transform: 'translateX(200px)'
        }))
      ])
    ])
  ]
})


export class HoverPhotoComponent implements OnInit, OnDestroy {

  photoDropEnabled: Boolean = false;
  photoTimeout;
  photoReEnabled: Boolean = true;

  @Input() onHomePage: Boolean;

  @HostListener('mouseover') onHover() {
    if (!this.onHomePage && this.photoReEnabled) {
      this.photoDropEnabled = true;
      this.photoReEnabled = false;
    }
  }
  
  @HostListener('mouseleave') onLeave() {
    this.photoDropEnabled = false;

    //to stop animation & mouse ugliness
    //hence set to just longer than animation time
    this.photoTimeout = window.setTimeout(() => {
      this.photoReEnabled = true;
    }, 500);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    //unlikely to be needed, but just in case:
    clearTimeout(this.photoTimeout);
  }

}
