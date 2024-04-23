import {Router} from 'express'
import { register } from '../controllers/register.controller.js';

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', register);

export default router;
