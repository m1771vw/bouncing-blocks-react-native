import Matter from "matter-js";
// import { remove } from "./index";
import { distance } from '../Utilities'

const DeleteTrampoline = (entities, dispatch) => {
    // console.log('type of dispatch', typeof dispatch)
	let entity = entities;
    let boxKeys = Object.keys(entities).filter(
        key => entities[key].box
    )
    let trampolineKeys = Object.keys(entities).filter(
		key =>
			entities[key].trampoline
    );

    trampolineKeys.forEach( k => {
        checkTrampolineHitBoxes(k, boxKeys, entities, dispatch)
    })

}

const checkTrampolineHitBoxes = (trampolineKey, boxes, entities, dispatch) => {
    let trampoline = entities[trampolineKey];
    for(let i = 0; i < boxes.length; i++) {
        let box = entities[boxes[i]]
        if (distance(trampoline.body.position, box.body.position) < 80) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            Matter.World.remove(entities.physics.world, trampoline.body);
            delete entities[trampolineKey];
            dispatch({type: 'increase-trampolines'})
            break;
        }
    }
}


export default (entities, { events, dispatch }) => {
    // console.log("dispatch type:", dispatch)
	DeleteTrampoline(entities, dispatch)

	return entities;
};