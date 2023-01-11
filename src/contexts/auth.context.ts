import { createContext, useContext } from "react";
import IUserModel from "../models/user.model";

export interface IAuthContext {
	user: IUserModel | null;
	onSignIn: (user: IUserModel) => void;
	onSignOut: () => void;
}

export const authContext = createContext<IAuthContext>({
	user: null,
	onSignIn: () => {},
	onSignOut: () => {},
});

export function useAuthContext() {
	return useContext(authContext);
}
