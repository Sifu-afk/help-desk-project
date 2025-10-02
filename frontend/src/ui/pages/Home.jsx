import { useEffect, useState } from 'react';

const fetchTicketsAPI = async () => {
	const res = await fetch('http://localhost:5000/api/v1/auth/tickets');
	if (!res.ok) throw new Error('Failed to fetch tickets');
	return res.json();
};

const createTicketAPI = async (ticket) => {
	const res = await fetch('http://localhost:5000/api/v1/auth/tickets', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ticket),
	});
	if (!res.ok) throw new Error('Failed to create ticket');
	return res.json();
};

const updateTicketStatusAPI = async (ticketId, status) => {
	const res = await fetch(
		`http://localhost:5000/api/v1/auth/tickets/${ticketId}/status`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status }),
		}
	);
	if (!res.ok) throw new Error('Failed to update status');
	return res.json();
};

const addCommentAPI = async (ticketId, userId, message) => {
	const res = await fetch(
		`http://localhost:5000/api/v1/auth/tickets/${ticketId}/comments`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: userId, message }),
		}
	);
	if (!res.ok) throw new Error('Failed to add comment');
	return res.json();
};

export default function Home() {
	const [form, setForm] = useState({ description: '', priority: 'LOW' });
	const [message, setMessage] = useState('');
	const [tickets, setTickets] = useState([]);

	const role = localStorage.getItem('role');
	const userId = Number(localStorage.getItem('userId'));

	const fetchTickets = async () => {
		try {
			const data = await fetchTicketsAPI();
			const visibleTickets =
				role === 'ADMIN'
					? data
					: data.filter((ticket) => ticket.user.id === userId);
			setTickets(visibleTickets);
		} catch (err) {
			3;
			console.error(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newTicket = { ...form, user_id: userId };
			const created = await createTicketAPI(newTicket);
			setMessage(`✅ Ticket created with ID ${created.id}`);
			setForm({ description: '', priority: 'LOW' });
			fetchTickets();
		} catch (err) {
			console.error(err);
			setMessage('❌ Error creating ticket');
		}
	};

	const handleAdminAction = async (ticketId, action, value) => {
		try {
			if (action === 'status') await updateTicketStatusAPI(ticketId, value);
			if (action === 'comment') await addCommentAPI(ticketId, userId, value);
			fetchTickets();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	return (
		<div className='home-form'>
			<form onSubmit={handleSubmit} className='home-form--ticket'>
				<h2>Create Ticket</h2>
				<div>
					<label>Description</label>
					<textarea
						name='description'
						value={form.description}
						onChange={(e) => setForm({ ...form, description: e.target.value })}
						required
					/>
				</div>
				<div>
					<label>Priority</label>
					<select
						name='priority'
						value={form.priority}
						onChange={(e) => setForm({ ...form, priority: e.target.value })}
					>
						{['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<button type='submit'>Create Ticket</button>
			</form>

			{message && <p>{message}</p>}

			<h2>All Tickets</h2>
			<ul>
				{tickets.map((ticket) => (
					<li key={ticket.id} style={{ marginBottom: '20px' }}>
						<p>
							<strong>ID:</strong> {ticket.id}
						</p>
						<p>
							<strong>User:</strong> {ticket.user.username}
						</p>
						<p>
							<strong>Priority:</strong> {ticket.priority}
						</p>
						<p>
							<strong>Status:</strong> {ticket.status}
						</p>
						<p>
							<strong>Description:</strong> {ticket.description}
						</p>
						<p>
							<strong>Comments:</strong>
						</p>
						<ul>
							{ticket.comments.map((c) => (
								<li key={c.id}>
									<strong>{c.user.username}:</strong> {c.message}
								</li>
							))}
						</ul>

						{role === 'ADMIN' && (
							<div style={{ marginTop: '10px' }}>
								<select
									value={ticket.status}
									onChange={(e) =>
										handleAdminAction(ticket.id, 'status', e.target.value)
									}
								>
									{['OPEN', 'IN_PROGRESS', 'UNDER_REVIEW', 'CLOSED'].map(
										(s) => (
											<option key={s} value={s}>
												{s}
											</option>
										)
									)}
								</select>

								<input
									type='text'
									placeholder='Add comment'
									onKeyDown={(e) => {
										if (e.key === 'Enter' && e.target.value.trim()) {
											handleAdminAction(ticket.id, 'comment', e.target.value);
											e.target.value = '';
										}
									}}
								/>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
