# Ticket Management App

Simple ticket system with backend (Node.js + Express + Prisma) and frontend (React).  
Admins see all tickets, can update status and add comments.  
Users create tickets and see their own.

---

## How to run

### Backend

cd backend
npm install
nodemon index.js


### Frontend

cd frontend
npm install
npm run dev


Open frontend in browser, register or log in.  
Admin users can manage all tickets.  
Regular users can create tickets and view their own.

---

## Tech
- Backend: Node.js, Express, Prisma  
- Frontend: React  
- Database: SQLite 

Store `userId` and `role` in localStorage for frontend access control.
