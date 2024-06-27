import express from 'express'
import { routerApi } from './src/routes'
const cors = require('cors')

const App = express()
const port = 3000

App.use(express.json())

App.use(cors());


routerApi(App)

App.listen(port, ()=>{
    console.log(`servidor inicializado en el puerto ${port}`)
})
