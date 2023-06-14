import { useState } from "react"

const Signup = ({ onSetToken, onSetUserId }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginHandler = async() => {
		const response = await fetch('http://localhost:8080/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password:password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json()
		console.log(data);

		onSetToken(data.token)
		onSetUserId(data.userId)

		localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);

		setEmail('');
		setPassword('');
	};


	return (
		<div>
			<div>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						id="email"
						name="email"
						type="text"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password">Password: </label>
					<input
						id="password"
						name="password"
						type="text"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				
				<button type="button" onClick={loginHandler} >Send</button>
			</div>
		</div>
	)
}

export default Signup;