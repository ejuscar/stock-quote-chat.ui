import { Card, Button } from "react-bootstrap";
import IRoomModel from "../models/room.model";

interface IRoomProps {
	room: IRoomModel;
	joinRoom: (room: IRoomModel) => void;
}

const Room = ({ room, joinRoom }: IRoomProps) => {
	return (
		<Card style={{ marginRight: "10px" }}>
			<Card.Body>{room.name}</Card.Body>
			<Button
				variant="success"
				type="button"
				onClick={() => joinRoom(room)}
			>
				Join
			</Button>
		</Card>
	);
};

export default Room;
