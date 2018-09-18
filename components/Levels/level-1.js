import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import { collisionCategories } from "../Utilities/constants";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement
const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false }); // Required for Physics
const world = engine.world;                                     // Required for Physics
/*  rectangle(x, y, width, height, [options])
    Friction Air:  How slow something moves. Higher the number, slower it goes
    Friction: How much something slides
    restitution: Elasticity. 0 is inelastic, no bouncing. 0.8 means it will bounce back w/ 80% of its kinetic energy 
*/
// const initialCircle = Matter.Bodies.circle(boxSize, 100, boxSize, { frictionAir: 0.01, friction: 0.00, restitution: 0 });
const initialBox = Matter.Bodies.rectangle(boxSize, 100, boxSize, boxSize, 
  { frictionAir: 0.01, friction: 0.00, restitution: 1,	collisionFilter: 
  { category: collisionCategories.box, mask: collisionCategories.wall }});
const initialTrampoline = Matter.Bodies.rectangle(width, height - (boxSize * 2) - 50, 100, 10, { isStatic: true });
const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true,
    collisionFilter: { category: collisionCategories.wall }});             // Entities will return an object 
const roof = Matter.Bodies.rectangle(width / 2, 0, width, boxSize, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const leftWall = Matter.Bodies.rectangle(0, height / 2, width * 0.05, height, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.25 , width * 0.05, height/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const rightWallLower = Matter.Bodies.rectangle(width, height , width * 0.05, height/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
// - Matter.World.add(world, [body, floor]);
// Matter.Resolver._restingThresh = 0.01
Matter.World.add(world, [initialBox,  leftWall, rightWallUpper, rightWallLower, initialTrampoline, floor]); // Add to the world
export default LevelOne => {
    // - Returns an entity
    // console.log(floor);
    return {
        // physics: { engine: engine, world: world, constraint: constraint },
        physics: { engine: engine, world: world },
        roof: { body: roof, size: [width, boxSize], color: "#86E9BE", renderer: Box }, // Renderer takes in a function!! 
        leftWall: { body: leftWall, size: [width * 0.05, height], color: "#86E9BE", renderer: Box }, // Renderer takes in a function!! 
        rightWallUpper: { body: rightWallUpper, size: [width * 0.05, height/2], color: "#86E9BE", renderer: Box }, // Renderer takes in a function!! 
        rightWallLower: { body: rightWallLower, size: [width * 0.05, height/2], color: "#86E9BE", renderer: Box }, // Renderer takes in a function!! 
        floor: { body: floor, size: [width, boxSize], color: "#86E9BE", renderer: Box }, // Renderer takes in a function!! 
                                                                                       // Each property has a value that has renderer and renderer's props
        'box-0': { body: initialBox, size: [boxSize, boxSize], color: '#4441f4', box: true, renderer: Box},    
        // initialCircle: { body: initialCircle, size: [boxSize], color: '#4441f4', renderer: Box},    
        // initialTrampoline: { body: initialTrampoline, size: [100, 10], color: 'black', trampoline: true, renderer: Trampoline}                                                               
    }
}


/** from <GameEngine/> Will cycle through each entity and apply system?
 * Takes in array of systems. Adds on to the newState object?
 * this.state.entities is the initial value. 
 * State is the accumulator and is the newState
 * Sys is a function that takes in the state and arguments? and adds on to the newState (accumulator)
 * arr.reduce(callback[, initialValue])
 * const reducer = (accumulator, currentValue) => accumulator + currentValue;
 *
 *     let newState = this.props.systems.reduce(
      (state, sys) => sys(state, args), this.state.entities
    );
 */

 /**
  * From MDN:
  * // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15
    // The 5 is initial value
  */



/**
 * 
 * This is rectangle
 * Object {
   "_original": Object {
     "density": 0.001,
     "friction": 0.1,
     "inertia": 894531.25,
     "inverseInertia": 0.0000011179039301310044,
     "inverseMass": 0.05333333333333334,
     "mass": 18.75,
     "restitution": 0,
   },
   "angle": 0,
   "anglePrev": 0,
   "angularSpeed": 0,
   "angularVelocity": 0,
   "area": 18750,
   "axes": Array [
     Object {
       "x": 0,
       "y": 1,
     },
     Object {
       "x": -1,
       "y": 0,
     },
   ],
   "bounds": Object {
     "max": Object {
       "x": 375,
       "y": 667,
     },
     "min": Object {
       "x": 0,
       "y": 617,
     },
   },
   "collisionFilter": Object {
     "category": 1,
     "group": 0,
     "mask": 4294967295,
   },
   "constraintImpulse": Object {
     "angle": 0,
     "x": 0,
     "y": 0,
   },
   "density": Infinity,
   "force": Object {
     "x": 0,
     "y": 0,
   },
   "friction": 1,
   "frictionAir": 0.01,
   "frictionStatic": 0.5,
   "id": 1,
   "inertia": Infinity,
   "inverseInertia": 0,
   "inverseMass": 0,
   "isSensor": false,
   "isSleeping": false,
   "isStatic": true,
   "label": "Rectangle Body",
   "mass": Infinity,
   "motion": 0,
   "parent": [Circular],
   "parts": Array [
     [Circular],
   ],
   "plugin": Object {},
   "position": Object {
     "x": 187.5,
     "y": 642,
   },
   "positionImpulse": Object {
     "x": 0,
     "y": 0,
   },
   "positionPrev": Object {
     "x": 187.5,
     "y": 642,
   },
   "render": Object {
     "fillStyle": "#2e2b44",
     "lineWidth": 0,
     "opacity": 1,
     "sprite": Object {
       "xOffset": 0.5,
       "xScale": 1,
       "yOffset": 0.5,
       "yScale": 1,
     },
     "strokeStyle": "#000",
     "visible": true,
   },
   "restitution": 0,
   "sleepCounter": 0,
   "sleepThreshold": 60,
   "slop": 0.05,
   "speed": 0,
   "timeScale": 1,
   "torque": 0,
   "totalContacts": 0,
   "type": "body",
   "velocity": Object {
     "x": 0,
     "y": 0,
   },
   "vertices": Array [
     Object {
       "body": [Circular],
       "index": 0,
       "isInternal": false,
       "x": 0,
       "y": 617,
     },
     Object {
       "body": [Circular],
       "index": 1,
       "isInternal": false,
       "x": 375,
       "y": 617,
     },
     Object {
       "body": [Circular],
       "index": 2,
       "isInternal": false,
       "x": 375,
       "y": 667,
     },
     Object {
       "body": [Circular],
       "index": 3,
       "isInternal": false,
       "x": 0,
       "y": 667,
     },
   ],
 }


 */