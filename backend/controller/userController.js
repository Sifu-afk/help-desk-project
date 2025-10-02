import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const me = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		if (users.length === 0) {
			return res.status(204).json({ message: 'No users' });
		}
		return res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: 'Error finding users' });
	}
};
