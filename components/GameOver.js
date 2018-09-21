import React, { PureComponent } from "react";
import Popup from "./Popup";
import Message from "./Message";


export default class GameOver extends PureComponent {
	render() {
		return (
			<Popup onPlayAgain={this.props.onPlayAgain} nextLevel={this.props.nextLevel} onQuit={this.props.onQuit}>
				<Message>
					Game Over!
				</Message>
			</Popup>
		);
	}
}

