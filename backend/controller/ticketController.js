import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async (req, res) => {
	try {
		const { user_id, description, priority } = req.body;

		if (!user_id || !description || !priority) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		const newTicket = await prisma.ticket.create({
			data: {
				user_id: Number(user_id),
				description,
				priority,
			},
		});
		return res.status(200).json(newTicket);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error creating ticket' });
	}
};

export const getTickets = async (req, res) => {
	try {
		const tickets = await prisma.ticket.findMany({
			include: {
				user: true,
				comments: {
					include: { user: true }, // include user of each comment
				},
			},
		});
		return res.status(200).json(tickets);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error fetching tickets' });
	}
};

export const getTicketById = async (req, res) => {
	try {
		const { id } = req.params;

		const ticket = await prisma.ticket.findUnique({
			where: { id: parseInt(id) },
			include: {
				user: true,
				comments: true,
			},
		});

		if (!ticket) {
			return res.status(204).json({ message: 'Ticket not found' });
		}
		return res.status(200).json(ticket);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error fetching ticket' });
	}
};

export const updateTicket = async (req, res) => {
	try {
		const { id } = req.params;
		const { description, status, priority } = req.body;

		const updateTicket = await prisma.ticket.update({
			where: { id: parseInt(id) },
			data: {
				description,
				status,
				priority,
			},
		});
		return res.status(200).json(updateTicket);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error updating ticket' });
	}
};

export const deleteTicket = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.ticket.delete({
			where: { id: parseInt(id) },
		});

		return res.status(204).send();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error deleting ticket' });
	}
};

export const addComment = async (req, res) => {
	try {
		const { ticketId } = req.params;
		const { user_id, message } = req.body;

		const comment = await prisma.comment.create({
			data: {
				ticket_id: parseInt(ticketId),
				user_id,
				message,
			},
		});

		return res.status(201).json(comment);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error adding comment' });
	}
};

export const updateTicketStatus = async (req, res) => {
	try {
		const { ticketId } = req.params;
		const { status } = req.body;

		const updatedTicket = await prisma.ticket.update({
			where: { id: parseInt(ticketId) },
			data: { status },
		});

		return res.status(200).json(updatedTicket);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error updating ticket' });
	}
};
