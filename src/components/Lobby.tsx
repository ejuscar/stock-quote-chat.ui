import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/auth.context";
import IRoomModel from "../models/room.model";
import { getRooms } from "../services/api.service";
import Chat from "./Chat";
import Room from "./Room";

interface ILobbyProps {}

export interface IMessage {
	user: string;
	message: string;
}

const Lobby = (props: ILobbyProps) => {
	const [rooms, setRooms] = useState<IRoomModel[]>([]);
	const [connection, setConnection] = useState<HubConnection>();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const { user, onSignOut } = useAuthContext();

	useEffect(() => {
		getRooms().then((response) => {
			if (response.success && response.data) setRooms(response.data);
		});
	}, []);

	const joinRoom = async (room: IRoomModel) => {
		try {
			const token = localStorage.getItem("token")
				? localStorage.getItem("token")
				: "";

			// Create connection
			const connection = new HubConnectionBuilder()
				.withUrl("https://localhost:7173/chat", {
					accessTokenFactory: () => token!,
				})
				.configureLogging(LogLevel.Information)
				.build();

			connection.onclose((e) => {
				setConnection(undefined);
				setMessages([]);
			});

			// Setup handlers
			connection.on("ReceiveMessage", (user, message) => {
				setMessages((messages) => [
					...messages.slice(-49),
					{ user, message },
				]);
			});

			// Start connection
			await connection.start();

			// Invoke joinroom method
			await connection.invoke("JoinRoom", { user, room });
			setConnection(connection);
		} catch (error) {
			console.log(error);
		}
	};

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

	return !connection ? (
		<>
			<div className="leave-room">
				<Button variant="danger" onClick={() => onSignOut()}>
					Log Out
				</Button>
			</div>
			<div style={{ display: "flex" }}>
				{rooms.map((room) => (
					<Room key={room.id} room={room} joinRoom={joinRoom} />
				))}
			</div>
		</>
	) : (
		<Chat
			messages={messages}
			sendMessage={sendMessage}
			closeConnection={closeConnection}
		/>
	);
};

export default Lobby;
