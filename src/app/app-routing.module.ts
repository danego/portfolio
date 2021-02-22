import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {animation: 'home'}},
  { path: 'about', component: AboutComponent, data: {animation: 'about'} },
  //{ path: 'projects', loadChildren: "./projects/projects.module#ProjectsModule" },
  { path: 'projects', loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule), data: {animation: 'projects'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
