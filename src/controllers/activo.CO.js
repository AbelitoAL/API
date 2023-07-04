import {consul} from "../db.js"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


export const createActivo = async (req, res) => {
    try {
        const { id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial} = req.body
        if(req.file == undefined){
            consul.query('INSERT INTO activoFijo (id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, "default.jpg"])
        }else{
            consul.query('INSERT INTO activoFijo (id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id,descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, req.file.filename])
        }
        res.send('activo registrado')
    } catch (error) {
        res.send("ERROR")
    }
}
export const getActivos = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getcantidadM = async (req, res) => {
    try {
        const resp = await consul.query('SELECT COUNT(*) AS cantidad_resultados FROM activoFijo WHERE id IN ( SELECT idaf  FROM mantenimiento WHERE idestado = ( SELECT id FROM estado WHERE id = 1 ))')
        res.status(200).json(resp.rows[0])
    } catch (error) {
        res.send("ERROR")
    }
}

export const deletegarantia = async (req,res) =>{
    try {
        await consul.query('DELETE FROM garantia WHERE id = $1', [req.params.id]);
        res.send(`Activo ${req.params.id} Eliminado`)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getImagen = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo where id = $1',[req.params.id]) 
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const imagePath = join(__dirname, `../public/img/${resp.rows[0].foto}`);
        if(await fs.existsSync(imagePath)){
            res.sendFile(imagePath)
        }else{
            const imagePath = join(__dirname, `../public/img/default.jpg`);
            res.sendFile(imagePath)
        }
    } catch (error) {
        res.send("ERROR")
    }
}

export const getActivosF = async (req, res) => {
    try {
        const Inicio = req.params.Inicio
        const Fin = req.params.Fin
        const resp = await consul.query('SELECT * FROM activoFijo where diacompra BETWEEN $1 AND $2',[Inicio,Fin])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getUbiActivo = async (req, res) => {
    try {
        const resp = await consul.query('SELECT ubicacion.* FROM activoFijo,ubicacion,localiza WHERE idActivo=activoFijo.id and idUbicacion=ubicacion.id and idActivo =$1',[req.params.id])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}



export const getGarActivo = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM garantia where activo_id = $1',[req.params.id])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getActivobyID = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo where id = $1',[req.params.id])                
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getActivobySerial = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM activoFijo where serial = $1',[req.params.serial])                
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}



export const updateActivo = async (req, res) => {
    try {
      const { descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto } = req.body;
      await consul.query('UPDATE activofijo SET descripcion=$1, diaCompra=$2, costo=$3, lugarCompra=$4, marca=$5, modelo=$6, serial=$7, foto=$8 WHERE id = $9', [descripcion, diaCompra, costo, lugarCompra, marca, modelo, serial, foto, req.params.id]);
      res.send(`activo ${req.params.id} actualizado`);
    } catch (error) {
      res.send("ERROR");
    }
  };


export const deleteActivo = async (req,res) =>{
    try {
        await consul.query('DELETE FROM reserva WHERE idActivoFijo = $1', [req.params.id]);

        const resp = await consul.query('DELETE FROM activoFijo WHERE id = $1',[req.params.id])
        res.send(`Activo ${req.params.id} Eliminado`)
    } catch (error) {
        res.send("ERROR")
    }
}
export const createReserva = async(req, res)=>{
    try {
        const { idActivoFijo, ciPersona, fecha, descripcion } = req.body
        console.log(req.body)
        await consul.query('INSERT INTO reserva (idActivoFijo, ciPersona, fecha, descripcion) VALUES ($1,$2,$3,$4)', [idActivoFijo, ciPersona, fecha, descripcion])
        res.send('activo reservado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const createGarantia = async(req, res)=>{
    try {
        const { id, caducidad, descripcion, adquirido } = req.body
        await consul.query('INSERT INTO garantia (activo_id, descripcion, caducidad, adquirido) VALUES ($1,$2,$3,$4)', [id, descripcion, caducidad,adquirido])
        res.send('garantia creada')
    } catch (error) {
        res.send("ERROR")
    }
}

export const getReservas = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM reserva')
        console.log(resp);
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR GET RESERVAS")
    }
}

export const updateReserva = async (req, res) => {
    try {
      const { idactivofijo, cipersona, fecha, descripcion } = req.body;
      await consul.query('UPDATE reserva SET idactivofijo=$1, cipersona=$2, fecha=$3, descripcion=$4 WHERE id = $5', [idactivofijo, cipersona, fecha, descripcion, req.params.id]);
      res.send(`Reserva ${req.params.id} actualizado`);
    } catch (error) {
      res.send("ERROR");
    }
  };