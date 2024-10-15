const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT,()=>
console.log('server started on 3001'))