import { useState } from "react"

const Signup = () => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const createUserHandler = async() => {
		const response = await fetch('http://localhost:8080/auth/signup', {
			method: 'PUT',
			body: JSON.stringify({
				name: userName,
				email: email,
				password:password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json()
		console.log(data);

		setUserName('');
		setEmail('');
		setPassword('');
	};


	return (
		<div>
			<div>
				<div>
					<label htmlFor="userName">Name: </label>
					<input
						id="userName"
						name="userName"
						type="text"
						value={userName}
						onChange={(event) => setUserName(event.target.value)}
					/>
				</div>

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
				
				<button type="button" onClick={createUserHandler} >Send</button>
			</div>
		</div>
	)
}

export default Signup;