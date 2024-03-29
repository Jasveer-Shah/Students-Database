require('./models/db')
const port = process.env.PORT || 5000
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
// express phbs
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const studentController = require('./controllers/StudentController')

var app = express();
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.send(
        `<h2>Welcome to student database!!</h2>
        <h3>Click here to get access to the <b>
        <a href="/student/list">
        Database</a></b>
        </h3>`
    );
})

app.set('views', path.join(__dirname, '/views/'))

app.engine(
    "hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname:"hbs",
        defaultLayout: "MainLayout",
        layoutDir: __dirname + '/views/layouts/'
    })
)

app.set("view engine", "hbs");

app.listen(port, (err)=>{
    if(err)console.log(err);
    console.log('server started at port', port)
})

app.use('/student', studentController);