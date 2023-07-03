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
    Bit,
    ERROR,
    BitF,
    Mcontra,
    AñadorBit,
    createuserM,
    getusuariobyIDM,
    backup,
    Restore
} from "../controllers/persona.CO.js"

const rutas = Router();

rutas.get('/api/user', getClientes)

rutas.get('/api/bitac', Bit)

rutas.get('/api/bitac/:Inicio/:Fin', BitF)

rutas.get('/api/user/:ci', getClientebyID)

rutas.get('/api/emp', getEmpleados)

rutas.get('/api/usuar/:usuario', getusuariobyID)
rutas.post('/api/usuarM', getusuariobyIDM)

rutas.post('/api/user', createCliente)

rutas.post('/api/I', Inicio)

rutas.post('/api/error', ERROR)

rutas.post('/api/C', cerrar)

rutas.post('/api/user/createE', createE)

rutas.post('/api/user/Asig', Asig)

rutas.post('/api/createuser', createuser)
rutas.post('/api/createuserM', createuserM)

rutas.post('/api/userE', createEmpleado)

rutas.put('/api/user/:ci', MUser)

rutas.put('/api/user/:ci/:usuario', Mcontra)

rutas.put('/api/emp/:ci', Memp)

rutas.delete('/api/user/:ci', deleteUser)

rutas.post('/bita/A',AñadorBit)

rutas.get('/backup',backup)
rutas.get('/restore',Restore)

export default rutas;