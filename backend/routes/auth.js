import { Router } from 'express';
import { register, login } from '../controller/authController.js';
import { me } from '../controller/userController.js';
import {
	createTicket,
	getTickets,
	getTicketById,
	updateTicket,
	deleteTicket,
	addComment,
	updateTicketStatus,
} from '../controller/ticketController.js';

const router = Router();

// Auth
router.post('/register', register);
router.post('/login', login);
router.get('/me', me);

// Tickets
router.post('/tickets', createTicket);
router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);
router.post('/tickets/:ticketId/comments', addComment);
router.put('/tickets/:ticketId/status', updateTicketStatus);

export default router;
