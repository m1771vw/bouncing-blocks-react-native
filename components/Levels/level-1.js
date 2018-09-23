import { Dimensions } from "react-native";
import Matter from "matter-js";
import Box from '../Box';
import Trampoline from '../Trampoline';
import { collisionCategories } from "../Utilities/constants";
import Background from '../Background'

Matter.Common.isElement = () => false; 
const { width, height } = Dimensions.get("screen");
const greenBackground = require('../assets/img/green_gradient_reversed.png')
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false });  
const world = engine.world;                                     

const floorSize = { width: width, height: boxSize }
const roofSize = { width: width, height: boxSize } 
const leftWallSize = { width: width * 0.05, height: height }
const rightWallUpperSize = { width: width * 0.05, height: height * 0.40 }
const rightWallLowerSize = { width: width * 0.05, height: height / 2 }
const specialTrampolineSize = { width: 100, height: 10 }

/* Creating entities */
const floor = Matter.Bodies.rectangle(width / 2, height, 
                                      floorSize.width, floorSize.height, 
                                      { isStatic: true,
                                        collisionFilter: { 
                                        category: collisionCategories.wall 
                                      }});             
const roof = Matter.Bodies.rectangle(width / 2, 0, 
                                     roofSize.width, roofSize.height, 
                                     { isStatic: true, 
                                       collisionFilter: { 
                                       category: collisionCategories.wall 
                                      }});
const leftWall = Matter.Bodies.rectangle(0, height / 2, 
                                         leftWallSize.width, leftWallSize.height, 
                                        { isStatic: true, 
                                          collisionFilter: { 
                                          category: collisionCategories.wall 
                                        }});
const rightWallUpper = Matter.Bodies.rectangle(width, height * 0.10, 
                                               rightWallUpperSize.width, rightWallUpperSize.height, 
                                              { isStatic: true, collisionFilter: { 
                                                category: collisionCategories.wall 
                                              }});
const rightWallLower = Matter.Bodies.rectangle(width, height, 
                                               rightWallLowerSize.width, rightWallLowerSize.height, 
                                               { isStatic: true, 
                                                 collisionFilter: { 
                                                 category: collisionCategories.wall 
                                               }});
const specialTrampoline = Matter.Bodies.rectangle(width * 0.15, height - (boxSize * 2), 
                                                  specialTrampolineSize.width, specialTrampolineSize.height, 
                                                  { isStatic: true, 
                                                    collisionFilter: { 
                                                    category: collisionCategories.trampoline 
                                                  }});
const specialTrampoline2 = Matter.Bodies.rectangle(width * 0.65, height - (boxSize * 2), 
                                                   specialTrampolineSize.width, specialTrampolineSize.height,  
                                                   { isStatic: true, 
                                                     collisionFilter: { 
                                                     category: collisionCategories.trampoline 
                                                   }});

Matter.World.add(world, [leftWall, rightWallUpper, rightWallLower, specialTrampoline, specialTrampoline2, roof]); 
export default LevelOne => {
    return {
        physics: { engine: engine, world: world },
        background: { source: greenBackground, renderer: Background},
        roof: { body: roof, size: [roofSize.width, roofSize.height], color: "#86E9BE", renderer: Box }, 
        leftWall: { body: leftWall, size: [leftWallSize.width, leftWallSize.height], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        rightWallUpper: { body: rightWallUpper, size: [rightWallUpperSize.width, rightWallUpperSize.height], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        rightWallLower: { body: rightWallLower, size: [rightWallLowerSize. width, rightWallLowerSize.height], borderColor: '#86E9BE', color: "#86E9BE", renderer: Box }, 
        specialTrampoline: { body: specialTrampoline, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline},                                                               
        specialTrampoline2: { body: specialTrampoline2, size: [specialTrampolineSize.width, specialTrampolineSize.height], specialTrampoline: true, trampoline: true, color: 'black', renderer: Trampoline}                                                               
    }
}





