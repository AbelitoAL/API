import { Router } from "express";

import {getUbicaciones, createUbicacion,deleteUbicacion,getUbicacionByID,updateUbicacion }from "../controllers/Ubicaion.CO.js"

const ubi = Router();

ubi.get('/api/ubi', getUbicaciones)

ubi.get('/api/ubi/:id', getUbicacionByID)

ubi.post('/api/ubi', createUbicacion)

ubi.post('/api/ubi/:id', updateUbicacion)
//activo.put('/api/acti/:id', MUser)

ubi.put('/api/ubi/:id', updateUbicacion) //asdas

ubi.delete('/api/ubi/:id', deleteUbicacion)

export default ubi;