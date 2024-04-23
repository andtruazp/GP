import {Router} from 'express'
import { createAct, deleteAct, getAct, getUserId, updateAct, verActP, verMisAct, verUser } from '../controllers/actividades.controller.js'


const router = Router()

router.get('/actividad/:id',getAct)
router.get('/actividad/proyecto/:id', verActP)
router.get('/actividad/all/:id', verMisAct)
router.get('/actividad/user',verUser)
router.post('/actividad', createAct)
router.put('/actividad/:id',updateAct)
router.delete('/actividad/:id', deleteAct)
router.get('/actividad/getu', getUserId)

export default router