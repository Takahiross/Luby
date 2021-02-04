const express = require('express');

const routes = require('./src/routes');
require('./src/config/database'); 

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});