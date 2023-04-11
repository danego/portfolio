import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, CanDeactivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CanDeactivateBg } from './services/can-deactivate-bg.service';
import { TilesComponent } from './tiles/tiles.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    data: {animation: 'home'},
    canDeactivate: [CanDeactivateBg]
  },
  { 
    path: 'about', 
    component: AboutComponent, 
    data: {animation: 'about'}, 
    canDeactivate: [CanDeactivateBg]
  },
  //{ path: 'projects', loadChildren: "./projects/projects.module#ProjectsModule" },
  { 
    path: 'projects', 
    loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule), 
    data: {animation: 'projects',
    //canDeactivate in projectsRoutingModule
  }},
  {
    path: 'tiles',
    component: TilesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule], 
})

export class AppRoutingModule { }
