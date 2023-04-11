import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HoverPhotoComponent } from './hover-photo/hover-photo.component';
import { PositionCircleDirective } from './directives/position-circle.directive';
import { NavigateMobileComponent } from './navigate-mobile/navigate-mobile.component';
import { TilesComponent } from './tiles/tiles.component';
import { TileComponent } from './tiles/tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HoverPhotoComponent,
    PositionCircleDirective,
    NavigateMobileComponent,
    TilesComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
