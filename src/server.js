const app = require('./app')
const config = require('./config/config')

app.listen(config.database.port || 3000)