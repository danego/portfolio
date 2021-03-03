import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { DisplayBgGradientService } from '../display-bg-gradient.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('projects') projects;

  constructor(private displayBgGradientService: DisplayBgGradientService) { }

  ngOnInit(): void {
    //necessary OnInit bc function is called before images load and thus scrollHeight is much smaller
    window.setTimeout(() => {
      this.checkLargestContentOrScreen(this.projects);
    }, 0);
  }

  checkLargestContentOrScreen(element) {
    //nav + header + content
    const projectsHeight = 60 + 30 + element.scrollHeight;
    //add style relative for footer
    if (projectsHeight > window.outerHeight) {
      return 'relative';
    }
    //add style absolute instead
    return 'absolute';
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.displayBgGradientService.onRemoveBgGradient();
    return true;
  }
}
