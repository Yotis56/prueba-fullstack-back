import express from 'express'
import { routerApi } from './src/routes'

const App = express()
const port = 3000

App.use(express.json())

routerApi(App)

App.listen(port, ()=>{
    console.log(`servidor inicializado en el puerto ${port}`)
})
