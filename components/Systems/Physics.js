import Matter from "matter-js";

export default Physics = (entities, { time }) => {
	let engine = entities["physics"].engine;
	Matter.Engine.update(engine, time.delta);
	return entities;
};