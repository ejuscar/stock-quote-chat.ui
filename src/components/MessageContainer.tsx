import { useEffect, useRef } from "react";
import { IChatMessageModel } from "../models/message.model";

interface IMessageContainerProps {
	messages: IChatMessageModel[];
}

const MessageContainer = ({ messages }: IMessageContainerProps) => {
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageRef && messageRef.current) {
			const { scrollHeight, clientHeight } = messageRef.current;

			messageRef.current.scrollTo({
				left: 0,
				top: scrollHeight - clientHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	return (
		<div ref={messageRef} className="message-container">
			{messages.map((m, index) => (
				<div key={index} className="user-message">
					<div className="message bg-primary">{m.message}</div>
					<div className="from-user">{m.username}</div>
				</div>
			))}
		</div>
	);
};

export default MessageContainer;
