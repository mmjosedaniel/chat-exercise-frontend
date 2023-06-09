import { useEffect, useState, useCallback } from "react";
import openSocket from 'socket.io-client'

const ChatScreen = ({ token, userId }) => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [newMessage, setNewMessage] = useState('')

	let content = <p>Write a message to star</p>;

	if(messages.length > 0) {
		content = messages.map(({message, id, creator}) => (
			<div key={id} >
				<p><span><strong>{creator}:</strong></span> {message}</p>
			</div>
		))
	}

	if(error) {
		content = <p>{error}</p>
	}

	if(isLoading) {
		content = <p>Loading</p>
	}

	const fetchMessages = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('http://localhost:8080/', {
				headers: {
					Authorization: 'Bearer ' + token
				}
			});
			if(!response.ok) {
				throw new Error('Something whent wrong.')
			} 
			const data = await response.json();

			console.log(data);

			setMessages(data.messages);
		} catch (error) {
			setError(error.message);
		};
		setIsLoading(false);
	}, [token]);

	const addMessageHandler = async() => {
		const response = await fetch('http://localhost:8080/message', {
			method: 'POST',
			body: JSON.stringify({
				text: newMessage
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		});
		const data = await response.json()
		console.log(data);

		setNewMessage('')
	};

	const addMessage = message => {
		setMessages(prevState => [...prevState, message])
	};

	useEffect(() => {
		const socket = openSocket('http://localhost:8080')
		socket.on('messages', data => {
			if(data.action === 'create') {
				console.log({data})
				addMessage(data.newMessage);
			}
		})
	}, []);

	useEffect(() => {
		fetchMessages();
	},[fetchMessages]);

	return (
		<div className="container">
			<div className="chat-window">
				{content}
			</div>
			
			<div>
				<input type="text" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
				<button type="button" onClick={addMessageHandler}>Send</button>
			</div>
		</div>
	);
};

export default ChatScreen