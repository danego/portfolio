import { Component } from "@angular/core";

@Component({
    selector: 'tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss']
})

export class TilesComponent {

    rowCount = new Array(11);  // 20 w/o offset
    tileCount = new Array(11); //10 without offset
}