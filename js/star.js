function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    clear();
    var NumPointsOnStar = 15;
    var screenCenterX = windowWidth / 2;
    var screenCenterY = windowHeight / 2;
    var starOuterRadius = Math.min(windowWidth, windowHeight) * 0.35;
    var starInnerRadius = Math.min(windowWidth, windowHeight) * 0.2;
    var starPointRadius = 5;
    v1 = createVector(1, 0);
    v2 = createVector(mouseX - screenCenterX, mouseY - screenCenterY);
    var mouseAngle = v1.angleBetween(v2);
    var innerStarAnglePartition = (2 * Math.PI) / NumPointsOnStar;
    var outerStarAnglePartition = (2 * Math.PI) / (NumPointsOnStar);
    fill(70,130,180);
    stroke(70,130,180);
    strokeWeight(1);
    innerStarPoints = [];
    outerStarPoints = [];
    for( var i = 0; i < NumPointsOnStar; i++) {
        innerStarPoints.push({
             x: (starInnerRadius * Math.cos(i * innerStarAnglePartition )) + screenCenterX,
             y: (starInnerRadius * Math.sin(i * innerStarAnglePartition )) + screenCenterY
        });
        outerStarPoints.push({
            x: (starOuterRadius * Math.cos( (-outerStarAnglePartition / 2) +  mouseAngle +  (i * outerStarAnglePartition) )) + screenCenterX,
            y: (starOuterRadius * Math.sin((-outerStarAnglePartition / 2) + mouseAngle + (i * outerStarAnglePartition) )) + screenCenterY
        });
        ellipse(innerStarPoints[i].x, innerStarPoints[i].y, starPointRadius);
        ellipse(outerStarPoints[i].x, outerStarPoints[i].y, starPointRadius);
    }

    noFill();
    strokeWeight(2);
    for(var i = 0; i < outerStarPoints.length; i++) {
        var beforeIndex = (i === 0)? innerStarPoints.length - 1 : i - 1;
        line(outerStarPoints[i].x, outerStarPoints[i].y, innerStarPoints[beforeIndex].x, innerStarPoints[beforeIndex].y);
        line(outerStarPoints[i].x, outerStarPoints[i].y, innerStarPoints[i].x, innerStarPoints[i].y);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}