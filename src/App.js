import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom"

import ChatScreen from './components/ChatScreen';
import Layout from './components/Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import { useEffect, useState } from 'react';

function App() {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const oldToken = localStorage.getItem('token');
		const oldUserId = localStorage.getItem('userId');

		if (oldToken) {
			setToken(oldToken);
			setUserId(oldUserId);
			navigate("/");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	console.log(token);

  return (
    <div>
			<Layout>
				<Routes>
					<Route path="/chat" element={ <ChatScreen token={token}  userId={userId} /> } />

					<Route path='/signup' element={ <Signup /> } />

					<Route
						path='/'
						element={ <Login onSetToken={setToken} onSetUserId={setUserId} /> }
					/>
				</Routes>
			</Layout>
    </div>
  );
};

export default App;
