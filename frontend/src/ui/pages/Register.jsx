import { useState } from 'react';

export default function Register() {
	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:5000/api/v1/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();
			setMessage(data.message);

			if (res.ok) {
				setForm({ username: '', email: '', password: '' });
			}
		} catch (err) {
			console.error(err);
			setMessage('Somthing went wrong');
		}
	};

	return (
		<div className='register-form'>
			<h2 className='register-form--title'>Register</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={form.username}
					onChange={handleChange}
				/>
				<input
					type='text'
					name='email'
					placeholder='Email'
					value={form.email}
					onChange={handleChange}
				/>
				<input
					type='text'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
				/> <br />
				<button type='submit'>Register</button>
			</form>
			<p>{message}</p>
		</div>
	);
}
