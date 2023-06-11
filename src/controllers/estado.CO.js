import {consul} from "../db.js"

export const createEstado = async (req, res) => {
    try {
        const { id, nombre} = req.body
        consul.query('INSERT INTO estado (id,nombre) VALUES ($1,$2)', [id, nombre])
        res.send('estado creado')
    } catch (error) {
        res.send("ERROR CREATE ESTADO")
    }
}

