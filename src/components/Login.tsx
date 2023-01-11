import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "../contexts/auth.context";
import { authenticate } from "../services/api.service";

interface ILoginProps {}

const Login = (props: ILoginProps) => {
	const { onSignIn } = useAuthContext();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		authenticate(email, password).then(
			(response) => {
				if (response.success && response.data) {
					var { token, ...userResponse } = response.data;

					localStorage.setItem("token", token);
					onSignIn(userResponse);
				} else {
					setError(response.error!);
				}
			},
			(error) => setError(error.message)
		);
	}

	return (
		<Form className="lobby" onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					placeholder="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Form.Control
					type="password"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Button
				variant="success"
				type="submit"
				disabled={!email || !password}
			>
				Login
			</Button>
			<span className="form-error">{error}</span>
		</Form>
	);
};

export default Login;
