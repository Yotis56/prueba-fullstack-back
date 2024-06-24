const Express = require('express')
import type { Request, Response } from 'express'
import myPool from "./libs/postgres"

const App = Express()
const port = 3000

App.use(Express.json())
App.get('/', async (req: Request, res: Response) =>{
    try {
        const query = 'SELECT * FROM public.requerimientos'
        const response = await myPool.query(query)
        const rta = response.rows
        res.json(rta)
    } catch (error) {
        console.error(error)
    }
    console.log('se hizo una petición')
})

App.listen(port, ()=>{
    console.log(`servidor inicializado en el puerto ${port}`)
})
