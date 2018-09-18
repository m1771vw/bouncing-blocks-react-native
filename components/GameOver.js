import React, { PureComponent } from "react";
import Popup from "./Popup";
import Message from "./Message";


export default class GameOver extends PureComponent {
	render() {
		return (
			<Popup onPlayAgain={this.props.onPlayAgain} onQuit={this.props.onQuit}>
				<Message>
					Too many blocks died!
					Better luck next time!
				</Message>
			</Popup>
		);
	}
}

