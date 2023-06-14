import './layout.css'
import React from "react"
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
	return (
		<div>
			<header>
				<nav>
					<Link to="signup">Signup</Link>
					<Link to="/">Login</Link>
					<Link to="chat">Chat</Link>
				</nav>
			</header>
			<main>
				{children}
			</main>
		</div>
	)
};

export default Layout;
