import "bootstrap/dist/css/bootstrap.min.css";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import React, { useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";

export interface IMessage {
	user: string;
	message: string;
}

const App = () => {
	const [connection, setConnection] = useState<HubConnection>();
	const [messages, setMessages] = useState<IMessage[]>([]);

	//prettier-ignore
	const joinRoom = async (user: string | undefined, room: string | undefined) => {
    try {
      // Create connection
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7173/chat")
      .configureLogging(LogLevel.Information)
      .build();

      connection.onclose(e => {
        setConnection(undefined);
        setMessages([]);
      })

      // Setup handlers
      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}])
      })

      // Start connection
      await connection.start();

      // Invoke joinroom method
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }

	const closeConnection = async () => {
		try {
			await connection?.stop();
		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = async (message: string) => {
		try {
			await connection?.invoke("SendMessage", message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="app">
			<h2>MyChat</h2>
			<hr className="line" />
			{!connection ? (
				<Lobby joinRoom={joinRoom} />
			) : (
				<Chat
					messages={messages}
					sendMessage={sendMessage}
					closeConnection={closeConnection}
				/>
			)}
		</div>
	);
};

export default App;
