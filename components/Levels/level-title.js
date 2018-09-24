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
const specialTrampolineSize = { width: 100, height: 10 }

const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, (boxSize) + 65, specialTrampolineSize.width, specialTrampolineSize.height, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.40, (boxSize) + 90, specialTrampolineSize.width, specialTrampolineSize.height, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline3 = Matter.Bodies.rectangle(width * 0.65, (boxSize) + 90, specialTrampolineSize.width, specialTrampolineSize.height, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });
const specialTrampoline4 = Matter.Bodies.rectangle(width * 0.90, (boxSize) + 65, specialTrampolineSize.width, specialTrampolineSize.height, { isStatic: true, collisionFilter: { category: collisionCategories.trampoline }  });

export default LevelTitle => {
    return {
        physics: { engine: engine, world: world },
        specialTrampoline: { body: specialTrampoline, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline3: { body: specialTrampoline3, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                              
        specialTrampoline4: { body: specialTrampoline4, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},        
    }
}

