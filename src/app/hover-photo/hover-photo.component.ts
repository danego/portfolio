import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-hover-photo',
  templateUrl: './hover-photo.component.html',
  styleUrls: ['./hover-photo.component.scss']
})


export class HoverPhotoComponent implements OnInit {

  photoDropEnabled: Boolean = false;

  @Input() onHomePage: Boolean;

  @HostListener('mouseover') onHover() {
    if (!this.onHomePage) {
      this.photoDropEnabled = true;
    }
  }
  
  @HostListener('mouseleave') onLeave() {
    this.photoDropEnabled = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
