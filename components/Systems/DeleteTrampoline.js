import Matter from "matter-js";
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
        checkTrampolineHitBoxes(k, boxKeys, entities, dispatch)
    })

}

const height = ({ body: { bounds } }) => bounds.max.y - bounds.min.y;

const width = ({ body: { bounds } }) => bounds.max.x - bounds.min.x;

const topLeft = ({ body }) => ({
	x: body.position.x - width({ body }) / 2,
	y: body.position.y - height({ body }) / 2
});
const topRight = ({ body }) => ({
	x: body.position.x + width({ body }) / 2,
	y: body.position.y - height({ body }) / 2
});

const bottomLeft = ({ body }) => ({
	x: body.position.x - width({ body }) / 2,
	y: body.position.y + height({ body }) / 2
});

const bottomRight = ({ body }) => ({
	x: body.position.x + width({ body }) / 2,
	y: body.position.y + height({ body }) / 2
});

const middleLeft = ({ body }) => ({
	x: body.position.x - width({ body }) / 2,
	y: body.position.y
});

const middleRight = ({ body }) => ({
	x: body.position.x + width({ body }) / 2,
	y: body.position.y
});

const checkTrampolineHitBoxes = (trampolineKey, boxes, entities, dispatch) => {
    let trampoline = entities[trampolineKey];
    for(let i = 0; i < boxes.length; i++) {
        let box = entities[boxes[i]]
        let bottomStart = bottomLeft(box);
		let bottomEnd = bottomRight(box);
        let topStart = topLeft(box);
        let topEnd = topRight(box);
        let middleStart = middleLeft(box);
        let middleEnd = middleRight(box);
        let bottomCollisions = Matter.Query.ray([trampoline.body, box.body], bottomStart, bottomEnd);
        if(bottomCollisions.length) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            if(!trampoline.specialTrampoline) {
                trampoline.health -= 1
                if(trampoline.health === 2) trampoline.color = '#7e7e7e'
                else if (trampoline.health === 1) trampoline.color = '#d3d3d3'
                else {
                    Matter.World.remove(entities.physics.world, trampoline.body);
                    delete entities[trampolineKey];
                    dispatch({type: 'increase-trampolines'})
                }
                break;
            }
        }

        let topCollisions = Matter.Query.ray([trampoline.body, box.body], topStart, topEnd);
        if(topCollisions.length) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            if(!trampoline.specialTrampoline) {
                trampoline.health -= 1
                if(trampoline.health === 2) trampoline.color = '#7e7e7e'
                else if (trampoline.health === 1) trampoline.color = '#d3d3d3'
                else {
                    Matter.World.remove(entities.physics.world, trampoline.body);
                    delete entities[trampolineKey];
                    dispatch({type: 'increase-trampolines'})
                }
                break;
            }
        }
   
        if (distance(trampoline.body.position, box.body.position) < 30) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            if(!trampoline.specialTrampoline) {
                trampoline.health -= 1
                if(trampoline.health === 2) trampoline.color = '#7e7e7e'
                else if (trampoline.health === 1) trampoline.color = '#d3d3d3'
                else {
                    Matter.World.remove(entities.physics.world, trampoline.body);
                    delete entities[trampolineKey];
                    dispatch({type: 'increase-trampolines'})
                }
                break;
            }
        }
    }
}

export default (entities, { events, dispatch }) => {
	DeleteTrampoline(entities, dispatch)
	return entities;
};