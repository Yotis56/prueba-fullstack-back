
const Express = require('express')

const App = Express()
const port = 3000

App.get('/', (req: Request, res: Response) =>{
    console.log('se hizo una petición')
})

App.listen(port, ()=>{
    console.log(`servidor inicializado en el puerto ${port}`)
})
