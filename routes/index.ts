import express from 'express'
import type { Express } from 'express'
import { requerimientosRouter } from './requerimientos.router'

function routerApi(App: Express) {
    const router = express.Router()
    App.use('/', router)
    router.use('/requerimientos', requerimientosRouter)
}

export { routerApi }