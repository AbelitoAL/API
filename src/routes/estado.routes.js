import { Router } from "express";

import {createEstado} from "../controllers/estado.CO.js"

const estado = Router();

estado.post('/api/estado', createEstado)

export default estado;