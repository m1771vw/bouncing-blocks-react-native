import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import TrampolineCount from '../TrampolineCount';
import { collisionCategories } from "../Utilities/constants";
import Score from '../Score';
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
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.65, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const floor = Matter.Bodies.rectangle(width / 2, height, width, boxSize, { isStatic: true,
    collisionFilter: { category: collisionCategories.wall }});             // Entities will return an object 
const roof = Matter.Bodies.rectangle(width / 2, 0, width, boxSize, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const leftWall = Matter.Bodies.rectangle(0, height / 2, width * 0.05, height, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.10, width * 0.05, height/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const rightWallLower = Matter.Bodies.rectangle(width, height, width * 0.05, height/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const middleWall = Matter.Bodies.rectangle(width / 2, height * 0.55, width * 0.05, height * 0.25 - 25, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });


Matter.World.add(world, [initialBox, leftWall, middleWall, rightWallUpper, rightWallLower, initialTrampoline, roof]); // Add to the world
export default LevelTwo => {
    return {
        
        physics: { engine: engine, world: world },
        roof: { body: roof, size: [width, boxSize], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        leftWall: { body: leftWall, size: [width * 0.05, height], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        middleWall: { body: middleWall, size: [width * 0.05, height * 0.25 - - 25], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        rightWallUpper: { body: rightWallUpper, size: [width * 0.05, height/2], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        rightWallLower: { body: rightWallLower, size: [width * 0.05, height/2], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        floor: { body: floor, size: [width, boxSize], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        // 'box-0': { body: initialBox, size: [boxSize, boxSize], color: '#4441f4', box: true, renderer: Box},    
        specialTrampoline: { body: specialTrampoline, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}                                                                                                                          
                                                         
    }
}
