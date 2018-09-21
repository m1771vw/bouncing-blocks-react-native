import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import TrampolineCount from '../TrampolineCount';
import { collisionCategories } from "../Utilities/constants";
import Score from '../Score';
import Title from '../Menus/Title';
import TitleButton from '../Menus/Button';
Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement
const { width, height } = Dimensions.get("screen");

const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false });  // Required for Physics
const world = engine.world;                                     // Required for Physics
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, (boxSize) + 65, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.40, (boxSize) + 90, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline3 = Matter.Bodies.rectangle(width * 0.65, (boxSize) + 90, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline4 = Matter.Bodies.rectangle(width * 0.90, (boxSize) + 65, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
// const specialTrampoline5/ = Matter.Bodies.rectangle(width * 0.85, (boxSize) + 90, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
// const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
// const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.35, height - (boxSize), 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
// const specialTrampoline3 = Matter.Bodies.rectangle(width * 0.65, height - (boxSize), 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
// const specialTrampoline4 = Matter.Bodies.rectangle(width * 0.85, height - (boxSize) - 50, 100, 10, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const initialBox = Matter.Bodies.rectangle(boxSize, 100, boxSize, boxSize, 
  { frictionAir: 0.01, friction: 0.00, restitution: 1,	collisionFilter: 
  { category: collisionCategories.box, mask: collisionCategories.wall }});

// Matter.World.add(world, [initialBox, floor, leftWall, rightWallUpper, rightWallLower, specialTrampoline, roof]); // Add to the world
export default LevelTitle => {
    // - Returns an entity
    // console.log(floor);
    return {
        // physics: { engine: engine, world: world, constraint: constraint },
        physics: { engine: engine, world: world },
        // button: { renderer: TitleButton},
        // title: { renderer: Title},
        specialTrampoline: { body: specialTrampoline, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline3: { body: specialTrampoline3, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                              
        specialTrampoline4: { body: specialTrampoline4, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},
        // specialTrampoline5: { body: specialTrampoline5, size: [100, 10], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}                                                               
        
    }
}

