export default interface IMessageModel {
	id: string;
	timestamp: number;
	body: string;
	userId: number;
	roomId: number;
}

export interface IChatMessageModel {
	timestamp: number;
	message: string;
	username: string;
}
