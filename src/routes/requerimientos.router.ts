import express from 'express'
import type {Request, Response} from 'express'
import myPool from '../libs/postgres'
import { Adquisiciones } from '../models/Adquisicion.model'

const router = express.Router()
const today = new Date()

const arrayToPostgresArray = (documentacion: string) => {
    const arrayToConvert = documentacion.split(';')
    let newString = ''
    arrayToConvert.forEach( item => {
        newString += `"${item}",`
    })
    newString = newString.slice(0, -1)
    newString = `{${newString}}`
    return newString
} 

router.get('/', async (req: Request, res: Response) => {
    try {
        // console.log(req.query)
        //con req-query obtengo un objeto con key: value. Debería ver si el objeto viene vacío, o si trae algo, caso en el cual la query debe tener un WHERE.
        const query = 'SELECT * FROM public.requerimientos'
        const response = await myPool.query(query)
        const rta = response.rows
        res.json(rta)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    // Tengo que modificar este para que devuelva el historial completo.
    try {
        const { id } = req.params
        const query = `SELECT * FROM public.requerimientos WHERE id = ${id}` 
        const response = await myPool.query(query)
        const rta = response.rows
        res.json(rta)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {
        const requerimiento: Adquisiciones = req.body
        const documentacion = arrayToPostgresArray(requerimiento.documentacion)
        const query1 = `INSERT into public.requerimientos (presupuesto, unidad, tipo, cantidad, valorunitario, fechaadquisicion, proveedor, documentacion, createdat) VALUES ('${requerimiento.presupuesto}', '${requerimiento.unidad}', '${requerimiento.tipo}', '${requerimiento.cantidad}', '${requerimiento.valorunitario}', '${requerimiento.fechaadquisicion}', '${requerimiento.proveedor}', '${documentacion}', '${today.toISOString()}') RETURNING id`
        const response1 = await myPool.query(query1)
        const query2 = `INSERT into public.historial (requerimiento_id, presupuesto, unidad, tipo, cantidad, valorunitario, fechaadquisicion, proveedor, documentacion, createdat) VALUES ('${response1.rows[0].id}',  '${requerimiento.presupuesto}', '${requerimiento.unidad}', '${requerimiento.tipo}', '${requerimiento.cantidad}', '${requerimiento.valorunitario}', '${requerimiento.fechaadquisicion}', '${requerimiento.proveedor}', '${documentacion}', '${today.toISOString()}')`
        const response2 = await myPool.query(query2)
        res.status(201)
        res.send({status: 201, message: "Solicitud de Adquisición agregada de manera exitosa"})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const requerimiento = req.body
        const { id } = req.params
        const documentacion = arrayToPostgresArray(requerimiento.documentacion)
        const query1 = `UPDATE public.requerimientos SET presupuesto = '${requerimiento.presupuesto}', unidad = '${requerimiento.unidad}', tipo = '${requerimiento.tipo}', cantidad = '${requerimiento.cantidad}', valorunitario = '${requerimiento.valorunitario}', fechaadquisicion = '${requerimiento.fechaadquisicion}', proveedor = '${requerimiento.proveedor}', documentacion = '${documentacion}', createdat = '${today.toISOString()}' WHERE id = ${id}`
        const response1 = await myPool.query(query1)
        const query2 = `INSERT into public.historial (requerimiento_id, presupuesto, unidad, tipo, cantidad, valorunitario, fechaadquisicion, proveedor, documentacion, createdat) VALUES ('${id}',  '${requerimiento.presupuesto}', '${requerimiento.unidad}', '${requerimiento.tipo}', '${requerimiento.cantidad}', '${requerimiento.valorunitario}', '${requerimiento.fechaadquisicion}', '${requerimiento.proveedor}', '${documentacion}', '${today.toISOString()}')`
        const response2 = await myPool.query(query2)
        res.status(201)
        res.send({status: 201, message: "solicitur de adquisición modificada con éxito"})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

router.delete('/:id',async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const query = `DELETE from public.requerimientos WHERE id = ${id}`
        const query2 = `DELETE from public.historial WHERE requerimiento_id = ${id}`
        await myPool.query(query)
        await myPool.query(query2)
        res.status(200)
        res.send({status: 200, message: 'Solicitud de adquisición eliminada con éxito'})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

export {router as requerimientosRouter }