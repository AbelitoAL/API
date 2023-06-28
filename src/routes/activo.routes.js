import { Router } from "express";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer'

import {createActivo,createReserva,deleteActivo,getActivobyID,getActivobySerial,getActivos,getActivosF,getGarActivo,getReservas,getUbiActivo, updateActivo, updateReserva}from "../controllers/activo.CO.js"

const activo = Router();


const __dirname = dirname(fileURLToPath(import.meta.url));
export const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, join(__dirname,'../public/img'))
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
})

const upload = multer(storage)

activo.post('/api/acti',upload.single('img'), createActivo)

activo.get('/api/acti', getActivos)

activo.get('/api/acti/:Inicio/:Fin', getActivosF)

activo.get('/api/acti/:id', getActivobyID)

activo.get('/api/Gacti',getGarActivo)

activo.get('/api/Gactivo',getUbiActivo)

activo.get('/api/acti/:serial', getActivobySerial)


activo.put('/api/acti/:id', updateActivo)

activo.delete('/api/acti/:id', deleteActivo)

activo.post('/api/acti/res', createReserva)

activo.get('/api/res', getReservas)

activo.put('/api/res/:id', updateReserva)
export default activo;