import { consul } from "../db.js"

export const getClientes = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const Bit = async (req, res) => {
    try {
        const resp = await consul.query("SELECT id,fecha,accion,persona.nombre as culpable FROM bitacora,persona where culpable = ci ORDEN BY id DESC ")
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const BitF = async (req, res) => {
    try {
        const Inicio = req.params.Inicio
        const Fin = req.params.Fin
        const resp = await consul.query("SELECT fecha,accion,persona.nombre as culpable FROM bitacora,persona where culpable = ci AND fecha BETWEEN $1 AND $2",[Inicio,Fin])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const Inicio = async (req, res) => {
    try {
        const { culpable } = req.body
        const fecha = new Date()
        await consul.query('INSERT INTO bitacora (fecha,accion,culpable) VALUES ($1,$2,$3)', [fecha.toLocaleDateString('en-US'), 'Inicio Sesion', culpable ])
        res.send('')
    } catch (error) {
        res.send("ERROR")
    }
}

export const ERROR = async (req, res) => {
    try {

        const { UsuI } = req.body
        const resp = await consul.query('SELECT * FROM administrador where usuario = $1',[UsuI])
        if(resp.rowCount > 0){
            var intento = resp.rows[0].intentos
            intento = intento + 1
            var ci = resp.rows[0].cipersona
            await consul.query('UPDATE administrador SET intentos = $1 WHERE usuario = $2 AND ciPersona = $3', [intento, UsuI, ci ])
        }
        res.send('')
    } catch (error) {
        res.send("ERROR")
    }
}

export const cerrar = async (req, res) => {
    try {
        const { culpable } = req.body
        const fecha = new Date()
        await consul.query('INSERT INTO bitacora (fecha,accion,culpable) VALUES ($1,$2,$3)', [fecha.toLocaleDateString('en-US'), 'Cerro Sesion', culpable ])
        res.send('')
    } catch (error) {
        res.send("ERROR")
    }
}

export const getEmpleados = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona,empleado where ci=ciPersona')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getClientebyID = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona,cliente where ci = $1 and ci=ciPersona', [req.params.ci])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getempleados = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona,empleado where ci=ciPersona')
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getusuariobyID = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona,administrador where usuario = $1 and ci=ciPersona', [req.params.usuario])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const getEmpleadobyID = async (req, res) => {
    try {
        const resp = await consul.query('SELECT * FROM persona,empleado where ci = $1 and ci=ciPersona', [req.params.ci])
        res.status(200).json(resp.rows)
    } catch (error) {
        res.send("ERROR")
    }
}

export const createCliente = async (req, res) => {
    try {
        const { ci, nombre, direccion, ciudad, celular, email, descripcion, empresa } = req.body
        await consul.query('INSERT INTO persona (ci, nombre, direccion, ciudad, celular, email, descripcion) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ci, nombre, direccion, ciudad, celular, email, descripcion])
        await consul.query('INSERT INTO cliente (cipersona,empresa) VALUES ($1,$2)', [ci, empresa])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const createE = async (req, res) => {
    try {
        const { ci, nombre, id, celular, email, departamento, direccion, descripcion } = req.body
        await consul.query('INSERT INTO persona (ci, nombre, direccion, celular, email, descripcion) VALUES ($1,$2,$3,$4,$5,$6)', [ci, nombre, direccion, celular, email, descripcion])
        await consul.query('INSERT INTO empleado (id,cipersona) VALUES ($1,$2)', [id, ci])
        await consul.query('INSERT INTO localizaem (cipersona,idubicacion) VALUES ($1,$2)', [ci, departamento])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const Asig = async (req, res) => {
    try {
        const { idActivo, cipersona, fecha } = req.body
        await consul.query('INSERT INTO asignado (idactivofijo,cipersona,fechasalida) VALUES ($1,$2,$3)', [idActivo, cipersona, fecha])
        res.send('activo asignado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const createuser = async (req, res) => {
    try {
        const { nombre, email, ci, UsuI, Npass } = req.body
        await consul.query('INSERT INTO persona (ci, nombre, email) VALUES ($1,$2,$3)', [ci, nombre, email])
        await consul.query('INSERT INTO administrador (cipersona,usuario,contrasena) VALUES ($1,$2,$3)', [ci, UsuI, Npass])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const createEmpleado = async (req, res) => {
    try {
        const { ci, nombre, direccion, ciudad, celular, email, descripcion} = req.body
        consul.query('INSERT INTO persona (ci, nombre, direccion, ciudad, celular, email, descripcion) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ci, nombre, direccion, ciudad, celular, email, descripcion])
        consul.query('INSERT INTO empleado (cipersona) VALUES ($1)', [ci])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const Musuario = async (req, res) => {
    try {
        const { ci, nombre, direccion, ciudad, celular, email, descripcion, empresa } = req.body
        consul.query('INSERT INTO persona (ci, nombre, direccion, ciudad, celular, email, descripcion) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ci, nombre, direccion, ciudad, celular, email, descripcion])      
        consul.query('INSERT INTO empleado (cipersona) VALUES ($1)', [ci])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const deleteUser = async (req, res) => {
    try {
        const resp = await consul.query('DELETE FROM persona WHERE ci = $1', [req.params.ci])
        res.send(`Usuario ${req.params.ci} Eliminado`)
    } catch (error) {
        res.send("ERROR")
    }
}

export const MUser = async (req, res) => {
    try {
        const { nombre, usuario, direccion, ciudad, celular, email } = req.body
        await consul.query("UPDATE persona SET nombre = $1,direccion = $2,ciudad = $3,celular = $4,email = $5 WHERE ci = $6", [nombre, direccion, ciudad, celular, email, req.params.ci])
        await consul.query('UPDATE administrador SET usuario = $1 WHERE cipersona = $2 )', [usuario, req.params.ci])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}
export const Mcontra = async (req, res) => {
    try {
        const ci = req.params.ci
        const usuario = req.params.usuario
        const { Npass } = req.body
        await consul.query("UPDATE administrador SET contrasena = $1 WHERE usuario = $2 AND ciPersona = $3", [Npass,usuario,ci])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const Memp = async (req, res) => {
    try {
        const { ci, nombre, direccion, ciudad, celular, email, descripcion, empresa } = req.body
        await consul.query("UPDATE persona SET ci = $1, nombre = $2, direccion = $3, ciudad = $4, celular = $5, email = $6, descripcion = $7 WHERE ci = $8", [ci, nombre, direccion, ciudad, celular, email, descripcion, req.params.ci])
        res.send('usuario creado')
    } catch (error) {
        res.send("ERROR")
    }
}

export const AñadorBit = async (req, res) => {
    try {
      const { mensaje, culpable } = req.body;
      const fecha = new Date().toLocaleDateString('en-US');
      await consul.query('INSERT INTO bitacora (fecha, accion, culpable) VALUES ($1, $2, $3)', [fecha, mensaje, culpable]);
      res.send('Se añadió exitosamente');
    } catch (error) {
      res.send('ERROR');
    }
  };
  
