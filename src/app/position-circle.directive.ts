import { Directive, Input, HostBinding, OnChanges } from '@angular/core';

@Directive({
  selector: '[positionCircle]'
})

export class PositionCircleDirective implements OnChanges {
  circleRadius: number;
  numberOfElements: number = 12;

  //selector tag is also used to input piece number
  @Input('positionCircle') pieceNumber: string;
  @Input('pieceWidth') pieceWidth: string;
  @Input('pieceHeight') pieceHeight: string;
  @Input('circleSize') circleSize: number;
  @Input('rotationDisabled') rotationDisabled: boolean;

  @HostBinding('style.top') top: string;
  @HostBinding('style.bottom') bottom: string;
  @HostBinding('style.left') left: string;
  @HostBinding('style.right') right: string;
  @HostBinding('style.transform') rotate: string;

  constructor() {}

  ngOnChanges() {
    this.clearOldValues();

    this.circleRadius = +this.circleSize / 2;
    const piece = +this.pieceNumber;

    const degrees = this.convertToAngleDegrees(piece);
    const quadrant = this.findQuadrantNumber(degrees);

    this.convertToAngleCssCartesian(
      this.convertToXAxisTriangleDegrees(degrees, quadrant), 
      quadrant
    );

    if (!this.rotationDisabled) this.generateRotateDegrees(degrees);
  }

  convertToAngleDegrees(piece: number) {
    //piece 0 starts at 270deg / bottom
    const pieceSeprationDegrees = 360 / this.numberOfElements;
    let degrees = (piece * pieceSeprationDegrees) + 270;
    if (degrees > 360) degrees -= 360;
    return degrees;
  }

  findQuadrantNumber(degrees: number) {
    let quadrant;
    if (degrees >= 0 && degrees < 90) {
      quadrant = 2;
    }
    else if (degrees >= 90 && degrees < 180) {
      quadrant = 1;
    }
    else if (degrees >= 180 && degrees < 270) {
      quadrant = 4;
    }
    else {
      quadrant = 3;
    }
    return quadrant;
  }

  convertToXAxisTriangleDegrees(degrees: number, quadrant: number) {
    //triangle degrees is the angle between hypotenuse and X-axis
    //correspond piece number to quadrant to correctly calculate triangle degrees
    let triangleDegrees;
    switch(quadrant) {
      case 1: 
        triangleDegrees = 180 - degrees;
        break;
      case 2: 
        triangleDegrees = degrees;
        break;
      case 3: 
        triangleDegrees = 360 - degrees;
        break;
      case 4: 
        triangleDegrees = degrees - 180;
        break;
    };
    return triangleDegrees;
  }

  //takes the degree of triangle to X axis and the piece # to determine quadrant
  convertToAngleCssCartesian(triangleDegrees: number, quadrant: number) {
    //halve inputted dimensions for puzzle piece     
    const accountForPieceX = +this.pieceWidth / 2;
    const accountForPieceY = +this.pieceHeight / 2;
  
    //we must push from opposite direction and thus must add in radius
    const xLegPlusCircle = this.circleRadius * this.getCosFromDegrees(triangleDegrees);
    const yLegPlusCircle = this.circleRadius * this.getSinFromDegrees(triangleDegrees);

    const pushXAxis = Math.floor(xLegPlusCircle + this.circleRadius - accountForPieceX);
    const pushYAxis = Math.floor(yLegPlusCircle + this.circleRadius - accountForPieceY);
    
    //apply correct positioning values based on quadrant
    if (quadrant === 1) {
      this.left = pushXAxis.toString() + 'px';
      this.bottom = pushYAxis.toString() + 'px';
    }
    else if (quadrant === 2) {
      this.right = pushXAxis.toString() + 'px';
      this.bottom = pushYAxis.toString() + 'px';
    }
    else if (quadrant === 3) {
      this.right = pushXAxis.toString() + 'px';
      this.top = pushYAxis.toString() + 'px';
    }
    else {
      this.left = pushXAxis.toString() + 'px';
      this.top = pushYAxis.toString() + 'px';
    }
  }

  //Math.cos works in radians by default
  getCosFromDegrees(degrees) {
    return Math.cos(degrees * Math.PI / 180);
  }
  getSinFromDegrees(degrees) {
    return Math.sin(degrees * Math.PI / 180);
  }

  generateRotateDegrees(degrees: number) {
    //backwards switch statement w/ no breaks
    //piece (0) with largest degree value runs through all cases
    let rotationDegrees = 0;
    rotationDegrees = degrees - 90;
    this.rotate = `rotate(${rotationDegrees}deg)`;
  }

  clearOldValues() {
    if (this.top) this.top = null;
    if (this.bottom) this.bottom = null;
    if (this.left) this.left = null;
    if (this.right) this.right = null;
  }
}
