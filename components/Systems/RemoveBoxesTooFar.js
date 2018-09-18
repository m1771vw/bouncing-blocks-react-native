const removeEntitiesThatHaveFallenTooFar = (entities, dispatch) => {
	let world = entities['physics'].world;
	let removals = Object.keys(entities).filter(
		key =>
			entities[key].body &&
            entities[key].body.position.y > 2000 ||
            entities[key].body.posit.x > 2000
	);

	removals.forEach(key => {
        console.log("Removing something out of bounds");
        Matter.World.remove(entities.physics.world, entities[key].body);
        dispatch({type:'increase-score'})
        console.log('dispatched');
        delete entities[key];
	});
    
	return entities;
};

export default (entities, { time, dispatch }) => {
	removeEntitiesThatHaveFallenTooFar(entities, dispatch);
	// checkIfMarioHasFallenOff(entities, dispatch);
	// updatePlatformCollisionFilters(entities);
	// updatePhysicsEngine(entities, time);
	// setMarioUpright(entities);

	return entities;
};