const { Pool } = require('pg')

const myPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'yotis',
  password: 'admin123',
  database: 'my_store'
})

export default myPool