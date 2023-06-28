import express from 'express'
import { dirname,join } from "path";
import {fileURLToPath} from 'url';
import bodyParser from "body-parser"
import morgan from "morgan"
import rutas from "./routes/persona.routes.js"
import activo from './routes/activo.routes.js'
import ubi from './routes/ubicacion.routes.js'
import mant from './routes/mantenimiento.routes.js'
import estado from './routes/estado.routes.js'
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, 'public')))

app.use(rutas)
app.use(activo)
app.use(ubi)
app.use(mant)
app.use(estado)
app.listen(process.env.PORT||5000)