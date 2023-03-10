import { Button } from "react-bootstrap";
import { IChatMessageModel } from "../models/message.model";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

interface IChatProps {
	messages: IChatMessageModel[];
	sendMessage: (message: string) => void;
	closeConnection: () => void;
}

const Chat = ({ messages, sendMessage, closeConnection }: IChatProps) => {
	return (
		<div>
			<div className="leave-room">
				<Button variant="danger" onClick={() => closeConnection()}>
					Leave Room
				</Button>
			</div>
			<div className="chat">
				<MessageContainer messages={messages} />
				<SendMessageForm sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
