import Box from "../Box";
import Matter from "matter-js";
import _ from "lodash";

let boxIds = 0;

// Function that takes in a state and object of touches and screen
const CreateBox = (entities, { touches, screen }) => {
    let world = entities["physics"].world;  // From Game Engine - physics: { engine: engine, world: world, constraint: constraint }
                                            // World comes from Game Engine's entities. 
                                            // Entities will have physics passed in and a world as part of its object
	let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
	touches.filter(t => t.type === "press").forEach(t => { // Filte for 'press' types. For each type do the function.
		let body = Matter.Bodies.rectangle( // Body = rectangle(x, y, width, height, [options])
			t.event.pageX,
			t.event.pageY,
			boxSize,
			boxSize,
			{ frictionAir: 0.021 } // Faster it moves in space. Regular friction means how much it slides
		);
		Matter.World.add(world, [body]);

		entities[++boxIds] = { // Creates new Entity Property and creates entity
			body: body,
			size: [boxSize, boxSize],
			color: boxIds % 2 == 0 ? "pink" : "#B8E986",
			renderer: Box
		};
	});
    return entities; 
    /**
     * Entities is an object that has boxId properties { boxId: {body, size, color, renderer}, boxId2: ... }
     */
};

export default CreateBox;