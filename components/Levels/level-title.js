import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import { collisionCategories } from "../Utilities/constants";
import Title from '../Menus/Title';
import TitleButton from '../Menus/Button';

Matter.Common.isElement = () => false; 

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false });  
const world = engine.world;                                     
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, (boxSize) + 65, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.40, (boxSize) + 90, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline3 = Matter.Bodies.rectangle(width * 0.65, (boxSize) + 90, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline4 = Matter.Bodies.rectangle(width * 0.90, (boxSize) + 65, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const initialBox = Matter.Bodies.rectangle(boxSize, 100, boxSize, boxSize, 
  { frictionAir: 0.01, friction: 0.00, restitution: 1,	collisionFilter: 
  { category: collisionCategories.box, mask: collisionCategories.wall }});

export default LevelTitle => {
    return {
        physics: { engine: engine, world: world },
        specialTrampoline: { body: specialTrampoline, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline3: { body: specialTrampoline3, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                              
        specialTrampoline4: { body: specialTrampoline4, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},        
    }
}

