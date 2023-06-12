import {consul} from "../db.js"

export const createEstado = async (req, res) => {
    try {
        const { nombre} = req.body
        consul.query('INSERT INTO estado (nombre) VALUES ($1,$2)', [nombre])
        res.send('estado creado')
    } catch (error) {
        res.send("ERROR CREATE ESTADO")
    }
}

