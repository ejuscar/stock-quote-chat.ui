import IRoomModel from "./room.model";

export default interface IUserModel {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

export interface ILoginResponseModel extends IUserModel {
	token: string;
}

export interface IUserConnectionModel {
	user: IUserModel;
	room: IRoomModel;
}
