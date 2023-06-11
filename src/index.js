import express from 'express'
import bodyParser from "body-parser"
import morgan from "morgan"
import rutas from "./routes/persona.routes.js"
import activo from './routes/activo.routes.js'
import ubi from './routes/ubicacion.routes.js'

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(rutas)
app.use(activo)
app.use(ubi)

app.listen(process.env.PORT||5000)
