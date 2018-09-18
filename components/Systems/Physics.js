import Matter from "matter-js";

const updatePhysicsEngine = (entities,time) => {
	let engine = entities["physics"].engine;
	Matter.Engine.update(engine, time.delta);
	// return entities;
};

const removeEntitiesThatHaveFallenTooFar = entities => {
    let world = entities['physics'].world;
    // console.log('InitialBox: ', entities['initialBox'])
    // console.log(Object.keys(entities))
	Object.keys(entities).filter(
        key => {
            if(key.includes('box')){
                if(entities[key].body.position.y > 1000 || entities[key].body.position.x > 1000){
                    console.log("Removing something out of bounds");
                    Matter.World.remove(entities.physics.world, entities[key].body);
                    delete entities[key];
                }
            }
        }
        // key => 
        //     key === 'initialBox' &&
        //     entities[key].body.position.y > 1500 ||
        //     entities[key].body.position.x > 1500
        // console.log('EntityKey', entities["physics"].body)
            // key === 'initialBox' &&
            // entities[key].body &&
            // entities[key].body.position.y > 1500 ||
            // entities[key].body.position.x > 1500
	);

	// removals.forEach(key => {
    //     console.log("Removing something out of bounds");
    //     Matter.World.remove(entities.physics.world, entities[key].body);
    //     delete entities[key];
	// });
    
	return entities;
};

export default (entities, { time, dispatch }) => {
	removeEntitiesThatHaveFallenTooFar(entities);
	// checkIfMarioHasFallenOff(entities, dispatch);
	// updatePlatformCollisionFilters(entities);
	updatePhysicsEngine(entities, time);


	return entities;
};