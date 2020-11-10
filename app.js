const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(process.env.PORT, () => {
    console.log("Running on port: " + String(process.env.PORT))
});