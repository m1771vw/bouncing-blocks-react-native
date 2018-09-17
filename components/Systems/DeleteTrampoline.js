import Matter from "matter-js";
// import { remove } from "./index";
import { distance } from '../Utilities'

const DeleteTrampoline = (entities, dispatch) => {
	let entity = entities;
    // console.log(entity)
    // Array of Trampoline property key names
    let trampolineKeys = Object.keys(entities).filter(
		key =>
			entities[key].trampoline
    );
    // console.log(trampolineKeys)
	trampolineKeys.forEach(k => {
        let box = entities.initialBox;
        let trampoline = entities[k];
        // console.log('Trampoline: ', trampoline)
        // console.log("Distance:",distance(trampoline.body.position, box.body.position))
		if (distance(trampoline.body.position, box.body.position) < 35) {
            // console.log("trying to delete")
            entities[k].remove = true;
            Matter.World.remove(entities.physics.world, entities[k].body);
			delete entities[k];
		}
	});

};

// const remove = (id, entities) => {
// 	if (entities[id].body)
// 		Matter.Body.remove(entities.physics.world, entities[id].body);

// 	delete entities[id];
// };


export default (entities, { events, dispatch }) => {
	DeleteTrampoline(entities, {events})

	return entities;
};