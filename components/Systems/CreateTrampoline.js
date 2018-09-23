import Trampoline from "../Trampoline";
import Matter from "matter-js";
import _ from "lodash";

let trampolineID = 0;

// Function that takes in a state and object of touches and screen
const CreateTrampoline = (entities, { touches, dispatch }) => {
    let world = entities["physics"].world;  
    let trampolineWidth = 100;
    let trampolineHeight = 10;
    let numOfTrampolines = Object.keys(entities).filter(k => entities[k].trampoline)

    if (numOfTrampolines.length <= 6) {
        touches.filter(t => t.type === "press").forEach(t => { 
            let body = Matter.Bodies.rectangle( 
                t.event.pageX,
                t.event.pageY,
                trampolineWidth,
                trampolineHeight,
                { isStatic: true } 
            );
            Matter.World.add(world, [body]);
            dispatch({ type: 'decrease-trampolines'});

            entities['createdTrampoline: '+ ++trampolineID] = { 
                body: body,
                size: [trampolineWidth, trampolineHeight],
                health: 3, 
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
};

export default CreateTrampoline;

