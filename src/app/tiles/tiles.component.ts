import { Component } from "@angular/core";

@Component({
    selector: 'tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss']
})

export class TilesComponent {

    rowCount = new Array(10);
    tileCount = new Array(20);
}