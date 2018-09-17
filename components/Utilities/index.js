const distance = ({x: x1, y: y1 }, { x: x2, y: y2 }) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const remove = (id, entities) => {
	if (entities[id].body)
		Matter.Composite.remove(entities.physics.world, entities[id].body);

	delete entities[id];
};
export { distance, remove}