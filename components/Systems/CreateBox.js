import Box from "../Box";
import { Dimensions } from 'react-native';
import Matter from "matter-js";
import _ from "lodash";
import { collisionCategories, boxColors } from "../Utilities/constants";

let boxIds = 1;

// Function that takes in a state and object of touches and screen
// const CreateBox = (entities, { touches, screen }) => {
//     let world = entities["physics"].world;  // From Game Engine - physics: { engine: engine, world: world, constraint: constraint }
//                                             // World comes from Game Engine's entities. 
//                                             // Entities will have physics passed in and a world as part of its object
// 	let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
// 	touches.filter(t => t.type === "press").forEach(t => { // Filte for 'press' types. For each type do the function.
// 		let body = Matter.Bodies.rectangle( // Body = rectangle(x, y, width, height, [options])
// 			t.event.pageX,
// 			t.event.pageY,
// 			boxSize,
// 			boxSize,
//             { frictionAir: 0.021,
//               friction: 0.01,
//               restitution: 1.5 } // Faster it moves in space. Regular friction means how much it slides
// 		);
// 		// Matter.World.add(world, [body]);

// 		entities[++boxIds] = { // Creates new Entity Property and creates entity
// 			body: body,
// 			size: [boxSize, boxSize],
// 			color: boxIds % 2 == 0 ? "#41d0f4" : "#689FF9",
// 			// color: "#4286f4",
// 			renderer: Box
// 		};
// 	});
//     return entities; 
//     /**
//      * Entities is an object that has boxId properties { boxId: {body, size, color, renderer}, boxId2: ... }
//      */
// };
const randomNumber = () => {
	return Math.floor(Math.random() * boxColors.length)
}
const createBoxes = (entities, events) => {
	let world = entities["physics"].world; 
	const { width, height } = Dimensions.get("screen");
	const boxSize = Math.trunc(Math.max(width, height) * 0.075);
	let body = Matter.Bodies.rectangle( // Body = rectangle(x, y, width, height, [options])
		100,
		100,
		boxSize,
		boxSize,
		{ frictionAir: 0.01, // Faster it moves in space. Regular friction means how much it slides
		friction: 0.0, 
		restitution: 1,
		collisionFilter: {
			category: collisionCategories.box,
			mask: collisionCategories.wall| collisionCategories.trampoline}} 
	);
		Matter.World.add(world, [body]);

		entities[`box-${boxIds++}`] = {
			body: body,
			size: [boxSize, boxSize],
			color: boxColors[randomNumber()],
			borderColor: 'grey',
			borderWidth: 0.5,
			// color: "#4286f4",
			renderer: Box,
			box: true
			
		};
};

let lastSpawn = null;


export default (entities, { events, time, dispatch }) => {
	
	if (lastSpawn == null) {
		lastSpawn = time.current;
	}
	if (time.current - lastSpawn > 1000 && boxIds <= 3){
		lastSpawn = time.current;
		createBoxes(entities, events);
	}
	return entities;
};
