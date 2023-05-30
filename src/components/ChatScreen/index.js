import { useEffect, useState, useCallback } from "react";

const ChatScreen = () => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [newMessage, setNewMessage] = useState('')

	let content = <p>Write a message to star</p>;

	if(messages.length > 0) {
		content = messages.map(({message, id}) => (
			<div key={id} >
				<p>{message}</p>
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
			const response = await fetch('http://localhost:8080/');
			if(!response.ok) {
				throw new Error('Something whent wrong.')
			} 
			const data = await response.json();

			setMessages(data.messages);
		} catch (error) {
			setError(error.message);
		};
		setIsLoading(false);
	}, []);

	const addMessageHandler = async() => {
		const response = await fetch('http://localhost:8080/message', {
			method: 'POST',
			body: JSON.stringify({
				text: newMessage
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json()
		console.log(data);

		setNewMessage('')
	};

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