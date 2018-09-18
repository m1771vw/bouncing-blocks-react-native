import Matter from "matter-js";
// import { remove } from "./index";
import { distance } from '../Utilities'

const DeleteTrampoline = (entities, dispatch) => {
	let entity = entities;
    // console.log(entity)
    // Array of Trampoline property key names
    let boxKeys = Object.keys(entities).filter(
        key => entities[key].box
    )
    // console.log('Box Keys: ', boxKeys)
    let trampolineKeys = Object.keys(entities).filter(
		key =>
			entities[key].trampoline
    );
    // console.log(trampolineKeys)

    boxKeys.forEach( b => {
        // console.log('b: ' , b)
        // console.log('entites outside: ' + Object.keys(entities))
        checkBoxHitTrampoline(b, trampolineKeys, entities)
    })
	// trampolineKeys.forEach( (k, i) => {
    //     let box = boxKeys['box-0'];
    //     let trampoline = entities[k];
    //     // console.log("Distance:",distance(trampoline.body.position, box.body.position))
	// 	if (distance(trampoline.body.position, box.body.position) < 80) {
    //         console.log("Deleting Distance:",distance(trampoline.body.position, box.body.position))
    //         Matter.Body.applyForce(box.body, box.body.position, {x:0.01, y:-0.15})
    //         entities[k].remove = true;
    //         Matter.World.remove(entities.physics.world, entities[k].body);
	// 		delete entities[k];
	// 	}
	// });
}

const checkBoxHitTrampoline = (boxKey, trampolines, entities) => {
    // console.log("checking box hit trampoline")
    // console.log('trampomlines: ' , trampolines);
    let box = entities[boxKey]

    // console.log('boxkey', boxKey)
    // console.log('entites inside: ' + Object.keys(entities), 'for boxKey: ' , boxKey)
    let trampolineKeys = Object.keys(entities).filter(
		key =>
			entities[key].trampoline
    );
    // console.log('trampoline keys: ' , trampolineKeys);
    trampolines.forEach( (k, i) => {
        // let box = boxKeys['box-0'];
        let trampoline = entities[k];
        // console.log("Trying to find: ",k, 'for bkey: ', boxKey)
        // console.log("Trampolines: ", trampoline)
        // console.log("Distance:",distance(trampoline.body.position, box.body.position))
        if(trampoline !== undefined) {
            if (distance(trampoline.body.position, box.body.position) < 80) {
                // console.log("Deleting Distance:",distance(trampoline.body.position, box.body.position))
                Matter.Body.applyForce(box.body, box.body.position, {x:0.01, y:-0.15})
                // entities[k].remove = true;
                if (entities[k].body)
                Matter.World.remove(entities.physics.world, entities[k].body);
                delete entities[k];
                return;
            }
        }
	});
}
// const remove = (id, entities) => {
// 	if (entities[id].body)
// 		Matter.Body.remove(entities.physics.world, entities[id].body);

// 	delete entities[id];
// };


export default (entities, { events, dispatch }) => {
	DeleteTrampoline(entities, {events})

	return entities;
};