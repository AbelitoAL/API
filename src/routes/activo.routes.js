import { Router } from "express";

import {createActivo,deleteActivo,getActivobyID,getActivobySerial,getActivos,getGarActivo,getUbiActivo, updateActivo }from "../controllers/activo.CO.js"

const activo = Router();

activo.get('/api/acti', getActivos)

activo.get('/api/acti/:id', getActivobyID)

activo.get('/api/Gacti',getGarActivo)

activo.get('/api/Gacti',getUbiActivo)

activo.get('/api/acti/:serial', getActivobySerial)

activo.post('/api/acti', createActivo)

activo.post('/api/acti/:id', updateActivo)

activo.delete('/api/acti/:id', deleteActivo)

export default activo;