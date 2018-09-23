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

const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.65, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const floor = Matter.Bodies.rectangle(width / 2, height, width, boxSize, { isStatic: true,
    collisionFilter: { category: collisionCategories.wall }});             
const roof = Matter.Bodies.rectangle(width / 2, 0, width, boxSize, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const leftWall = Matter.Bodies.rectangle(0, height / 2, width * 0.05, height, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.10, width * 0.05, height * 0.40, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const rightWallLower = Matter.Bodies.rectangle(width, height, width * 0.05, height/2, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });

Matter.World.add(world, [leftWall, rightWallUpper, rightWallLower, specialTrampoline, roof]); 
export default LevelOne => {
    return {
        physics: { engine: engine, world: world },
        background: { source: require('../assets/img/green_gradient_reversed.png'), renderer: Background},
        roof: { body: roof, size: [width, boxSize], color: "#86E9BE", renderer: Box }, 
        leftWall: { body: leftWall, size: [width * 0.05, height], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        rightWallUpper: { body: rightWallUpper, size: [width * 0.05, height* 0.40], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        rightWallLower: { body: rightWallLower, size: [width * 0.05, height/2], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        specialTrampoline: { body: specialTrampoline, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}                                                               
    }
}





