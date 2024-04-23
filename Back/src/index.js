import express from "express"
import cors from 'cors'
import proyectoRoutes from './routes/proyecto.routes.js'
import actRoutes from './routes/actividad.routes.js'
import login from './routes/login.routes.js';
import register from './routes/register.routes.js';
import {PORT} from './config.js'

const app= express()

app.use(express.json())
app.use(cors())

app.use(proyectoRoutes)
app.use(actRoutes)
app.use(login);
app.use(register);

app.listen(PORT)
console.log('Server is running on port 3002')