import Trampoline from "../Trampoline";
import Matter from "matter-js";
import _ from "lodash";

let boxIds = 0;

// Function that takes in a state and object of touches and screen
const CreateTrampoline = (entities, { touches, screen }) => {
    let world = entities["physics"].world;  // From Game Engine - physics: { engine: engine, world: world, constraint: constraint }
                                            // World comes from Game Engine's entities. 
                                            // Entities will have physics passed in and a world as part of its object
    let trampolineWidth = 100;
    let trampolineHeight = 10;
	touches.filter(t => t.type === "press").forEach(t => { // Filte for 'press' types. For each type do the function.
		let body = Matter.Bodies.rectangle( // Body = rectangle(x, y, width, height, [options])
			t.event.pageX,
			t.event.pageY,
			trampolineWidth,
			trampolineHeight,
            { isStatic: true,
                 } // Faster it moves in space. Regular friction means how much it slides
		);
		Matter.World.add(world, [body]);

		entities['createdTrampoline: '+ ++boxIds] = { // Creates new Entity Property and creates entity
			body: body,
			size: [trampolineWidth, trampolineHeight],
            // color: boxIds % 2 == 0 ? "pink" : "#B8E986",
            color: 'grey',
            renderer: Trampoline,
            name: 'createdTrampoline: '+ boxIds,
            trampoline: true
		};
	});
    return entities; 
    /**
     * Entities is an object that has boxId properties { boxId: {body, size, color, renderer}, boxId2: ... }
     */
};

export default CreateTrampoline;