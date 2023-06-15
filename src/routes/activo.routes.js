import { Router } from "express";

import {createActivo,createReserva,deleteActivo,getActivobyID,getActivobySerial,getActivos,getActivosF,getGarActivo,getReservas,getUbiActivo, updateActivo, updateReserva}from "../controllers/activo.CO.js"

const activo = Router();

activo.get('/api/acti', getActivos)

activo.get('/api/acti/:Inicio/:Fin', getActivosF)

activo.get('/api/acti/:id', getActivobyID)

activo.get('/api/Gacti',getGarActivo)

activo.get('/api/Gactivo',getUbiActivo)

activo.get('/api/acti/:serial', getActivobySerial)

activo.post('/api/acti', createActivo)

activo.put('/api/acti/:id', updateActivo)

activo.delete('/api/acti/:id', deleteActivo)

activo.post('/api/acti/res', createReserva)

activo.get('/api/res', getReservas)

activo.put('/api/res/:id', updateReserva)
export default activo;