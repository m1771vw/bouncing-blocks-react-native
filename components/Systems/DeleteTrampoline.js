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
            console.log('bottom collision detected')
            if(!trampoline.specialTrampoline) {
                Matter.World.remove(entities.physics.world, trampoline.body);
                delete entities[trampolineKey];
                dispatch({type: 'increase-trampolines'})
                break;
            }
        }
        let topCollisions = Matter.Query.ray([trampoline.body, box.body], topStart, topEnd);
        if(topCollisions.length) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            console.log('top collision detected')
            if(!trampoline.specialTrampoline) {
                Matter.World.remove(entities.physics.world, trampoline.body);
                delete entities[trampolineKey];
                dispatch({type: 'increase-trampolines'})
                break;
            }
        }
        // let middleCollisions = Matter.Query.ray([trampoline.body, box.body], middleStart, middleEnd);
        // if(middleCollisions.length) {
        //     console.log('detecting middle collisions');
        //     Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
        //     if(!trampoline.specialTrampoline) {
        //         Matter.World.remove(entities.physics.world, trampoline.body);
        //         delete entities[trampolineKey];
        //         dispatch({type: 'increase-trampolines'})
        //         break;
        //     }
        // }
     
        // return (b1.collisionFilter.category & b2.collisionFilter.mask) !== 0 &&
        // (b1.collisionFilter.mask & b2.collisionFilter.category) !== 0;
        if (distance(trampoline.body.position, box.body.position) < 30) {
            Matter.Body.setVelocity(box.body, {x:2, y:-9.8})
            if(!trampoline.specialTrampoline) {
                Matter.World.remove(entities.physics.world, trampoline.body);
                delete entities[trampolineKey];
                dispatch({type: 'increase-trampolines'})
                break;
            }
        }
    }
}


export default (entities, { events, dispatch }) => {
	DeleteTrampoline(entities, dispatch)
	return entities;
};