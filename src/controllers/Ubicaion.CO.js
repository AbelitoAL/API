import {consul} from "../db.js"

// Controlador para obtener todos los ubicacions
export const getUbicaciones = async (req, res) => {
    try {
      const resp = await consul.query('SELECT * FROM ubicacion');
      res.status(200).json(resp.rows);
    } catch (error) {
      res.send("ERROR");
    }
  };
  
  // Controlador para crear un nuevo ubicacion
  export const createUbicacion = async (req, res) => {
    try {
      const { sitio,localizacion, departamento } = req.body;  //preguntar por id o es autoincrementable?
      await consul.query('INSERT INTO ubicacion (sitio,localizacion, departamento) VALUES ($1, $2, $3)', [sitio,localizacion, departamento]);
      res.send('ubicacion registrada');
    } catch (error) {
      res.send("ERROR");
    }
  };
  
  // Controlador para obtener información de un ubicacion por su ID
  export const getUbicacionByID = async (req, res) => {
    try {
      const resp = await consul.query('SELECT * FROM ubicacion WHERE id = $1', [req.params.id]);
      res.status(200).json(resp.rows);
    } catch (error) {
      res.send("ERROR");
    }
  };
  
  // Controlador para actualizar la información de un ubicacion
  export const updateUbicacion = async (req, res) => {
    try {
      const { sitio,localizacion, departamento } = req.body;
      await consul.query('UPDATE ubicacion SET sitio = $1, localizacion = $2, departamento = $3 WHERE id = $4', [sitio,localizacion, departamento, req.params.id]);
      res.send(`ubicacion ${req.params.id} actualizado`);
    } catch (error) {
      res.send("ERROR");
    }
  };
  
  // Controlador para eliminar un ubicacion por su ID
  export const deleteUbicacion = async (req, res) => {
    try {
      await consul.query('DELETE FROM ubicacion WHERE id = $1', [req.params.id]);
      res.send(`ubicacion ${req.params.id} eliminado`);
    } catch (error) {
      res.send("ERROR");
    }
  };