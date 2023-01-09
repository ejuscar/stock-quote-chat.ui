export default interface IUserModel {
	email: string;
	firstName: string;
	lastName: string;
}

export interface ILoginResponseModel extends IUserModel {
	token: string;
}
