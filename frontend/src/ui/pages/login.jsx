import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: '',
		password: '',
	});
	const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
    setLoading(true);

		try {
			const res = await fetch('http://localhost:5000/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();
			setMessage(data.message);

			if (res.ok) {
				setForm({ username: '', password: '' });
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				localStorage.setItem('role', data.role);
				navigate('/app/home');
			}
		} catch (err) {
			console.error(err);
			setMessage('Somthing went wrong');
		}finally {
    setLoading(false);
  }
	};

	return (
		<div className='login-form'>
			<h2 className='login-form--title'>login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={form.username}
					onChange={handleChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
				/> <br />
				<button type='submit' disabled={loading}>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
			<p>{message}</p>
		</div>
	);
}
