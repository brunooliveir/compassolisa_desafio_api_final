const app = require('./app')
const config = require('./config/config.json')

app.listen(config.database.port || 3000)