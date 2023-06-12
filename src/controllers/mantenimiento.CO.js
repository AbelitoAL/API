import {consul} from "../db.js"

export const getMantenimientos = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM mantenimiento')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR GET MANTENIMIENTOS")
    }
}

export const createMantenimiento = async (req, res) => {
    try {
        const { idaf,titulo, descripcion, fechaInicio, responsable,costo, idestado} = req.body
        consul.query('INSERT INTO mantenimiento (idaf,titulo, descripcion, fechaInicio, responsable,costo, idestado) VALUES ($1,$2,$3,$4,$5,$6,$7)', [idaf,titulo, descripcion, fechaInicio, responsable,costo, idestado])
        res.send('mantenimiento creado')
    } catch (error) {
        res.send("ERROR CREATE MANTENIMIENTO")
    }
}

export const updateMantenimiento = async (req, res) => {
    try {
      const { idaf,titulo, descripcion, fechaInicio, responsable,costo, idestado } = req.body;
      await consul.query('UPDATE mantenimiento SET idaf=$1, titulo=$2, descripcion=$3, fechaInicio=$4, responsable=$5, costo=$6, idestado=$7 WHERE id = $8', [idaf,titulo, descripcion, fechaInicio, responsable,costo, idestado, req.params.id]);
      res.send(`mantenimiento ${req.params.id} actualizado`);
    } catch (error) {
      res.send("ERROR UPDATE MANTENIMIENTO");
    }
  };

export const deleteMantenimiento = async (req,res) =>{
    try {
        const resp = await consul.query('DELETE FROM mantenimiento WHERE id = $1',[req.params.id])
        res.send(`mantenimiento ${req.params.id} Eliminado`)
    } catch (error) {
        res.send("ERROR DELETE MANTENIMIENTO")
    }
}