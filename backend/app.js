import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js'

export const app = express()

app.use(json())


app.use('/api/users', userRoutes);

