import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

interface ISendMessageFormProps {
	sendMessage: (message: string) => void;
}

const SendMessageForm = ({ sendMessage }: ISendMessageFormProps) => {
	const [message, setMessage] = useState("");
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage(message);
				setMessage("");
			}}
		>
			<InputGroup>
				<FormControl
					placeholder="Type a message..."
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				<Button variant="primary" type="submit" disabled={!message}>
					Send
				</Button>
			</InputGroup>
		</Form>
	);
};

export default SendMessageForm;
