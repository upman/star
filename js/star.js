var constants = {
    starPointRadius: 5,
    numPointsOnStar: 12,
    color: [70, 130, 180],
    lineStrokeWeight: 2,
    pointStrokeWeight: 1
};

function setupConstants() {
    constants.starAnglePerPoint = (2 * Math.PI) / constants.numPointsOnStar;
    constants.screenCenterX = windowWidth / 2;
    constants.screenCenterY = windowHeight / 2;
    constants.starOuterRadius = Math.min(windowWidth, windowHeight) * 0.35;
    constants.starInnerRadius = Math.min(windowWidth, windowHeight) * 0.2;
    // mouseX and mouseY are set to 0 before a mouseMoved event is fired on the page.
    // Shows an ugly image that way
    // Ugly fix below for a pretty image
    mouseX = constants.screenCenterX + 1;
    mouseY = constants.screenCenterY;
}

function getAngleWithXAxis(originX, originY, pointX, pointY) {
    v1 = createVector(1, 0); // x-axis
    v2 = createVector(pointX - originX, pointY - originY); // Line to the point from the center
    angle = v1.angleBetween(v2); // This gives an angle between 0 and Pi radians, But we need this between 0 and 2 Pi
    // The hack below to work out this kink
    if(pointY > originY) {
        angle = -(2 * Math.PI - angle);
    } else {
        angle = -angle;
    }

    return angle;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setupConstants();
}

function draw() {

    clear();
    fill.apply(this, constants.color);
    stroke.apply(this, constants.color);
    strokeWeight(constants.pointStrokeWeight);
    innerStarPoints = [];
    outerStarPoints = [];
    var currentMouseAngle = getAngleWithXAxis(constants.screenCenterX, constants.screenCenterY, mouseX, mouseY);
    for( var i = 0; i < constants.numPointsOnStar; i++) {
        innerStarPoints.push({
             x: (
                    constants.starInnerRadius *
                    Math.cos(
                        (constants.starAnglePerPoint / 2) +
                        ( i * constants.starAnglePerPoint )
                    )
                ) + constants.screenCenterX,
             y: (
                    constants.starInnerRadius *
                    Math.sin(
                        (constants.starAnglePerPoint / 2) +
                        ( i * constants.starAnglePerPoint )
                    )
                ) + constants.screenCenterY
        });
        outerStarPoints.push({
            x: (
                    constants.starOuterRadius *
                    Math.cos(
                        currentMouseAngle +
                        (i * constants.starAnglePerPoint)
                    )
                ) + constants.screenCenterX,
            y: (
                    constants.starOuterRadius *
                    Math.sin(
                        currentMouseAngle +
                        (i * constants.starAnglePerPoint)
                    )
                ) + constants.screenCenterY
        });
        ellipse(innerStarPoints[i].x, innerStarPoints[i].y, constants.starPointRadius);
        ellipse(outerStarPoints[i].x, outerStarPoints[i].y, constants.starPointRadius);
    }

    noFill();
    strokeWeight(constants.lineStrokeWeight);
    for(var i = 0; i < outerStarPoints.length; i++) {
        var beforeIndex = (i === 0)? innerStarPoints.length - 1 : i - 1;
        line(outerStarPoints[i].x, outerStarPoints[i].y, innerStarPoints[beforeIndex].x, innerStarPoints[beforeIndex].y);
        line(outerStarPoints[i].x, outerStarPoints[i].y, innerStarPoints[i].x, innerStarPoints[i].y);
    }

}

function windowResized() {
    setupConstants();
    resizeCanvas(windowWidth, windowHeight);
}