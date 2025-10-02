import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js'

const app = express();

app.use(cors());
app.use(express.json()); //parse JSON req

app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) =>{
	res.send('Help Desk API running 🚀')
})


const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
