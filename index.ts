import express from 'express'
import { routerApi } from './routes'

const App = express()
const port = 3000

App.use(express.json())
// App.get('/', async (req: Request, res: Response) =>{
//     try {
//         const query = 'SELECT * FROM public.requerimientos'
//         const response = await myPool.query(query)
//         const rta = response.rows
//         res.json(rta)
//     } catch (error) {
//         console.error(error)
//     }
//     console.log('se hizo una petición')
// })

routerApi(App)

App.listen(port, ()=>{
    console.log(`servidor inicializado en el puerto ${port}`)
})
