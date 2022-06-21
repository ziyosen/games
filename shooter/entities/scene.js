// import Vector from '../vector.js';
import { Ray } from './index.js';

export class Scene {
  static getSightPolygon(position, boundaries) {
    // Get all unique points
    const points = [];
    boundaries.forEach(function(seg){
      points.push(seg.a,seg.b);
    });

    const set = {};
    const uniquePoints = points.filter(function(p){
      const key = p.x+","+p.y;
      if (key in set) {
        return false;
      } else {
        set[key]=true;
        return true;
      }
    });

    // Get all angles
    const uniqueAngles = [];
    for(var j=0;j<uniquePoints.length;j++){
      var uniquePoint = uniquePoints[j];
      var angle = Math.atan2(uniquePoint.y - position.y, uniquePoint.x - position.x);
      // uniquePoint.angle = angle;
      uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
    }

    // RAYS IN ALL DIRECTIONS
    var intersects = [];
    for(var j=0;j<uniqueAngles.length;j++){
      var angle = uniqueAngles[j];

      const ray = Ray.create({ position, angle });


      // Find CLOSEST intersection
      var closestIntersect = null;
      for(var i=0;i<boundaries.length;i++){
        var intersect = ray.cast(boundaries[i]);
        if(!intersect) continue;
        if(!closestIntersect || intersect.distance<closestIntersect.distance){
          closestIntersect=intersect;
        }
      }

      // Intersect angle
      if(!closestIntersect) continue;
      closestIntersect.angle = angle;

      // Add to list of intersects
      intersects.push(closestIntersect);

    }

    // Sort intersects by angle
    intersects = intersects.sort(function(a,b){
      return a.angle-b.angle;
    });

    // Polygon is intersects, in order of angle
    return intersects;
  }
}
