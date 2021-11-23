const setupDB = require('./support/cleanDatabase');

global.afterEach(async () => setupDB());
