const app = require('./app');
const config = require('./config/config');

app.listen(process.env.DB_PORT || config.database.port || 3000);
