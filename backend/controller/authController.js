import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingUser = await prisma.user.findUnique({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: { username, email, password: hashedPassword },
		});
		res.status(201).json({ message: 'User registered', user: newUser });
	} catch (err) {
		res.status(500).json({ message: 'Error registering user' });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) return res.status(400).json({ message: 'User not found' });

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return res.status(400).json({ message: 'Invalid password' });

		const token = jwt.sign({ userId: user.id, role: user.role }, 'secret', { expiresIn: '1h' });

		res.status(200).json({
			token,
			userId: user.id,
			role: user.role,
		});
		res.status(200).json({ message: 'Login successful' });
	} catch (err) {
		res.status(500).json({ message: 'Error logging in' });
	}
};
