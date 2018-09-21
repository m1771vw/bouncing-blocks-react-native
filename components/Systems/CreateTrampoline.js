import Trampoline from "../Trampoline";
import Matter from "matter-js";
import _ from "lodash";

let trampolineID = 0;

// Function that takes in a state and object of touches and screen
const CreateTrampoline = (entities, { touches, screen, dispatch }) => {
    
    let world = entities["physics"].world;  // From Game Engine - physics: { engine: engine, world: world, constraint: constraint }
                                            // World comes from Game Engine's entities. 
                                            // Entities will have physics passed in and a world as part of its object
    let trampolineWidth = 100;
    let trampolineHeight = 10;
    let numOfTrampolines = Object.keys(entities).filter(k => entities[k].trampoline)
    // console.log('Num of Trampolines: ', numOfTrampolines.length)
    if (numOfTrampolines.length <= 6) {
        touches.filter(t => t.type === "press").forEach(t => { // Filte for 'press' types. For each type do the function.
        // console.log("Creating trampoline at: x", t.event.pageX,t.event.pageY)
            // if( )
            let body = Matter.Bodies.rectangle( // Body = rectangle(x, y, width, height, [options])
                t.event.pageX,
                t.event.pageY,
                trampolineWidth,
                trampolineHeight,
                { isStatic: true,
                     } // Faster it moves in space. Regular friction means how much it slides
            );
            Matter.World.add(world, [body]);
            dispatch({ type: 'decrease-trampolines'});

            entities['createdTrampoline: '+ ++trampolineID] = { // Creates new Entity Property and creates entity
                body: body,
                size: [trampolineWidth, trampolineHeight],
                health: 3, 
                // color: boxIds % 2 == 0 ? "pink" : "#B8E986",
                color: '#2a2a2a',
                renderer: Trampoline,
                name: 'createdTrampoline: '+ trampolineID,
                trampoline: true
            };
        });
    } else {
        touches.filter(t => t.type === "press").forEach(t => {
            dispatch({type: 'not-enough-trampolines'})
        })
    }
    return entities; 
    /**
     * Entities is an object that has boxId properties { boxId: {body, size, color, renderer}, boxId2: ... }
     */
};

export default CreateTrampoline;

