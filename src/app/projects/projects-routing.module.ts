import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectsComponent } from "./projects.component";
import { CanDeactivateBg } from '../can-deactivate-bg.service';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canDeactivate: [CanDeactivateBg] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectsRoutingModule {}