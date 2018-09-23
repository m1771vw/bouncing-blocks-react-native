import Box from "../Box";
import { Dimensions } from 'react-native';
import Matter from "matter-js";
import _ from "lodash";
import { collisionCategories, boxColors } from "../Utilities/constants";

let boxIds = 1;

const randomNumber = () => {
	return Math.floor(Math.random() * boxColors.length)
}

const createBoxes = (entities) => {
	let world = entities["physics"].world; 
	const { width, height } = Dimensions.get("screen");
	const boxSize = Math.trunc(Math.max(width, height) * 0.075);
	let body = Matter.Bodies.rectangle( 
		100,
		50,
		boxSize,
		boxSize,
		{ frictionAir: 0.01, 
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
			borderWidth: 2,
			renderer: Box,
			box: true
		};
};

let lastSpawn = null;

export default (entities, { events, time, dispatch }) => {
	
	if (lastSpawn == null) {
		lastSpawn = time.current;
	}
	if (time.current - lastSpawn > 4000 && boxIds <= 100){
		lastSpawn = time.current;
		createBoxes(entities, events);
	}
	return entities;
};
