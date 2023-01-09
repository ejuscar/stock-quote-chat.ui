import "bootstrap/dist/css/bootstrap.min.css";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import React, { useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import { authContext } from "./contexts/auth.context";
import IUserModel from "./models/user.model";
import Login from "./components/Login";
import IRoomModel from "./models/room.model";
import { getRooms } from "./services/api.service";
import Room from "./components/Room";

export interface IMessage {
	user: string;
	message: string;
}

const App = () => {
	const [connection, setConnection] = useState<HubConnection>();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [user, setUser] = useState<IUserModel | null>(null);

	function onSignIn(user: IUserModel) {
		setUser(user);
	}

	function onSignOut() {
		setUser(null);
		localStorage.removeItem("token");
	}

	return (
		<authContext.Provider value={{ user, onSignIn, onSignOut }}>
			<div className="app">
				<h2>MyChat</h2>
				<hr className="line" />
				{!user ? <Login /> : <Lobby />}
			</div>
		</authContext.Provider>
	);
};

export default App;
