import express from 'express'
import type {Request, Response} from 'express'
import myPool from '../libs/postgres'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM public.requerimientos'
        const response = await myPool.query(query)
        const rta = response.rows
        res.json(rta)
    } catch (error) {
        console.error(error)
    }
})

export {router as requerimientosRouter }