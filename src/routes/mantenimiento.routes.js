import { Router } from "express";

import { createMantenimiento,getMantenimientos, deleteMantenimiento, updateMantenimiento,getMantF }from "../controllers/mantenimiento.CO.js"

const mantenimiento = Router();

mantenimiento.get('/api/mant', getMantenimientos)

mantenimiento.post('/api/mant', createMantenimiento)

mantenimiento.put('/api/mant/:id', updateMantenimiento)

mantenimiento.delete('/api/mant/:id', deleteMantenimiento)

mantenimiento.get('/api/mant/:Inicio/:Fin', getMantF)

export default mantenimiento;
