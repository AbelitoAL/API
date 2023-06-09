import { Router } from "express";

import {
    getClientes,
    createCliente,
    getClientebyID,
    MUser,
    deleteUser,
    createEmpleado,
    createuser,
    getusuariobyID,
    Musuario,
    createE,
    Asig,
    Memp,
    getEmpleados,
    Inicio,
    cerrar,
    Bit
} from "../controllers/persona.CO.js"

const rutas = Router();

rutas.get('/api/user', getClientes)

rutas.get('/api/bitac', Bit)

rutas.get('/api/user/:ci', getClientebyID)

rutas.get('/api/emp', getEmpleados)

rutas.get('/api/usuar/:usuario', getusuariobyID)

rutas.post('/api/user', createCliente)

rutas.post('/api/I', Inicio)

rutas.post('/api/C', cerrar)

rutas.post('/api/user/createE', createE)

rutas.post('/api/user/Asig', Asig)

rutas.post('/api/createuser', createuser)

rutas.post('/api/userE', createEmpleado)

rutas.put('/api/user/:ci', MUser)

rutas.put('/api/emp/:ci', Memp)

rutas.delete('/api/user/:ci', deleteUser)

export default rutas;