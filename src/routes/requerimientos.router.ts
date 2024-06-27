import express from 'express'
import type {Request, Response} from 'express'
import myPool from '../libs/postgres'
import { Adquisiciones } from '../models/Adquisicion.model'

const router = express.Router()

const arrayToPostgresArray = (arrayToConvert: string[]) => {
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
        console.log(req.params)
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
        console.log(documentacion)
        const query = `INSERT into public.requerimientos (presupuesto, unidad, tipo, cantidad, valorunitario, fechaadquisicion, proveedor, documentacion) VALUES ('${requerimiento.presupuesto}', '${requerimiento.unidad}', '${requerimiento.tipo}', '${requerimiento.cantidad}', '${requerimiento.valorunitario}', '${requerimiento.fechaadquisicion}', '${requerimiento.proveedor}', '${documentacion}')`
        const response = await myPool.query(query)
        console.log(response)
        res.status(200)
        res.send({'status': '200', 'message': 'Requerimiento agregado con éxito'})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

export {router as requerimientosRouter }