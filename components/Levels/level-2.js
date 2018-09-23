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
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize) - 50, 75, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.65 - 25, height - (boxSize) - 0, 75, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const floor = Matter.Bodies.rectangle(width / 2, height, width, boxSize, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});           
const roof = Matter.Bodies.rectangle(width / 2, 0, width, boxSize, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const leftWall = Matter.Bodies.rectangle(0, height / 2, width * 0.05, height, { isStatic: true, collisionFilter: { category: collisionCategories.wall }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.10, width * 0.05, height * 0.1, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const rightWallLower = Matter.Bodies.rectangle(width, height, width * 0.05, height * 0.75, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });
const middleWall = Matter.Bodies.rectangle(width / 2, height * 0.65, width * 0.03, height * 0.25, { isStatic: true, collisionFilter: { category: collisionCategories.wall } });

Matter.World.add(world, [leftWall, middleWall, rightWallUpper, rightWallLower, specialTrampoline, specialTrampoline2, roof]); 

export default LevelTwo => {
    return {     
        physics: { engine: engine, world: world },
        background: { source: require('../assets/img/yellow_circle_gradient.png'), renderer: Background},
        roof: { body: roof, size: [width, boxSize], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        leftWall: { body: leftWall, size: [width * 0.05, height], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        middleWall: { body: middleWall, size: [width * 0.03, height * 0.25], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        rightWallUpper: { body: rightWallUpper, size: [width * 0.05, height * 0.1], borderColor: '#f4f142', color: "#f4f142", renderer: Box }, 
        rightWallLower: { body: rightWallLower, size: [width * 0.05, height * 0.75], borderColor: '#f4f142', color: "#f4f142", renderer: Box },    
        specialTrampoline: { body: specialTrampoline, size: [75, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [75, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}
    }
}
