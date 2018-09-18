import Matter from "matter-js";
// import { remove } from "./index";
import { distance } from '../Utilities'

const DeleteTrampoline = (entities, dispatch) => {
	let entity = entities;
    let boxKeys = Object.keys(entities).filter(
        key => entities[key].box
    )
    let trampolineKeys = Object.keys(entities).filter(
		key =>
			entities[key].trampoline
    );

    trampolineKeys.forEach( k => {
        checkTrampolineHitBoxes(k, boxKeys, entities)
    })

}

const checkTrampolineHitBoxes = (trampolineKey, boxes, entities) => {
    let trampoline = entities[trampolineKey];
    for(let i = 0; i < boxes.length; i++) {
        let box = entities[boxes[i]]
        if (distance(trampoline.body.position, box.body.position) < 80) {
            Matter.Body.applyForce(box.body, box.body.position, {x:0.01, y:-0.15})
            Matter.World.remove(entities.physics.world, trampoline.body);
            delete entities[trampolineKey];
            break;
        }
    }
}


export default (entities, { events, dispatch }) => {
	DeleteTrampoline(entities, {events})

	return entities;
};