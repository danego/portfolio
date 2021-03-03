import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DisplayBgGradientService {
  removeBgGradient = new Subject<boolean>();

  onRemoveBgGradient() {
    this.removeBgGradient.next(false);
  }
 }