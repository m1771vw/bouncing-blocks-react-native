import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import { collisionCategories } from "../Utilities/constants";
import Background from '../Background'

Matter.Common.isElement = () => false; 
const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false }); 
const world = engine.world;                                     
const initialBox = Matter.Bodies.rectangle(boxSize, 100, boxSize, boxSize, 
  { frictionAir: 0.01, friction: 0.00, restitution: 1,	collisionFilter: 
  { category: collisionCategories.box, mask: collisionCategories.wall }});
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize) , 75, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.30, height - (boxSize), 75, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const floor = Matter.Bodies.rectangle(width / 2, height, width, boxSize, { isStatic: true,
    collisionFilter: { category: collisionCategories.wall }});  
const roof = Matter.Bodies.rectangle(width / 2, 0, width, boxSize/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const leftWall = Matter.Bodies.rectangle(0, height / 2, width * 0.05, height, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.10, width * 0.05, height * 0.1, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const rightWallLower = Matter.Bodies.rectangle(width, height, width * 0.05, height * 0.75, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const wallOne = Matter.Bodies.rectangle(width * 0.25, height * 0.30, width * 0.03, height * 0.10, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const wallTwo = Matter.Bodies.rectangle(width * 0.66, height * 0.60, width * 0.03, height * 0.10, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });


Matter.World.add(world, [leftWall, wallOne, wallTwo, rightWallUpper, rightWallLower, specialTrampoline, specialTrampoline2, roof]); 
export default LevelFour => {
    return {
        physics: { engine: engine, world: world },
        background: { source: require('../assets/img/blue_circle_gradient.png'), renderer: Background},
        roof: { body: roof, size: [width, boxSize], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        leftWall: { body: leftWall, size: [width * 0.05, height], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        wallOne: { body: wallOne, size: [width * 0.03, height * 0.10], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        wallTwo: { body: wallTwo, size: [width * 0.03, height * 0.10], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        rightWallUpper: { body: rightWallUpper, size: [width * 0.05, height*0.1], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        rightWallLower: { body: rightWallLower, size: [width * 0.05, height*0.75], borderColor: '#65c6de', color: "#71dcf7", renderer: Box }, 
        specialTrampoline: { body: specialTrampoline, size: [75, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [75, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}                                                                                                               
    }
}
