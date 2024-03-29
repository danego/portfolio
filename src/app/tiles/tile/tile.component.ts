import { Component, Input } from "@angular/core";

const OPACITY_STEP_DOWN = 0.4; 

@Component({
    selector: 'tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class TileComponent {
    opacity: number = 1;
    stabilized: boolean = false;

    @Input() even: boolean;


    // running on border entry too !!
    reduceOpacity() {
        if (this.stabilized) return;
        
        if (this.opacity > 0) this.opacity = +(this.opacity - OPACITY_STEP_DOWN).toFixed(1);
        console.log(this.opacity);
    }

    stabilize() {
        this.stabilized = true;
    }
}