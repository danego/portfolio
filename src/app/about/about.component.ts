import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { DisplayBgGradientService } from '../services/display-bg-gradient.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  footerPositionValue: string = 'relative';
  @ViewChild('about') about;

  constructor(private displayBgGradientService: DisplayBgGradientService) { }

  ngOnInit(): void {
    //necessary OnInit bc function is called before images load and thus scrollHeight is much smaller
    window.setTimeout(() => {
      this.checkLargestContentOrScreen(this.about);
    }, 0);
  }

  checkLargestContentOrScreen(element) {
    //nav + header + content
    const aboutHeight = 60 + 30 + element.nativeElement.scrollHeight;
    //add style relative for footer
    if (aboutHeight > window.outerHeight) {
      this.footerPositionValue = 'relative';
    }
    //add style absolute instead
    else {
      this.footerPositionValue = 'absolute';
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.displayBgGradientService.onRemoveBgGradient();
    return true;
  }
}
