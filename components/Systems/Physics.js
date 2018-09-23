import Matter from "matter-js";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const updatePhysicsEngine = (entities,time) => {
	let engine = entities["physics"].engine;
	Matter.Engine.update(engine, time.delta);
	// return entities;
};

const removeEntitiesThatHaveFallenTooFar = (entities, dispatch) => {
	Object.keys(entities).filter(
        key => {
            if(key.includes('box')){
                
                if(entities[key].body.position.y > height && entities[key].body.position.x < width){
                    // console.log("PreMature Death: Removing something out of bounds");
                    Matter.World.remove(entities.physics.world, entities[key].body);
                    dispatch({type:'decrease-lives'})
                    delete entities[key];
                    dispatch({type:'remove-box'})
                } else if(entities[key].body.position.y > height || entities[key].body.position.x > width){
                    // console.log("Add Score: Removing something out of bounds");
                    Matter.World.remove(entities.physics.world, entities[key].body);
                    dispatch({type:'increase-score'})
                    delete entities[key];
                    dispatch({type:'remove-box'})
                }
            }
        }
	);    
	return entities;
};

export default (entities, { time, dispatch }) => {
	removeEntitiesThatHaveFallenTooFar(entities, dispatch);
	updatePhysicsEngine(entities, time);
	return entities;
};