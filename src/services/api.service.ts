import IApiResponseModel from "../models/api-response.model";
import IRoomModel from "../models/room.model";
import { ILoginResponseModel } from "../models/user.model";

const URL_API = "http://localhost:5230";

export async function authenticate(
	email: string,
	password: string
): Promise<IApiResponseModel<ILoginResponseModel>> {
	const response = await fetch(`${URL_API}/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return response.json();
}

export async function getRooms(): Promise<IApiResponseModel<IRoomModel[]>> {
	const token = localStorage.getItem("token");

	if (!token) return Promise.reject("Unauthorized");

	const response = await fetch(`${URL_API}/room`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return response.json();
}
